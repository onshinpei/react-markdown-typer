import { act, createRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { MarkdownTyper, MarkdownTyperCMD, MarkdownTyperCMDRef } from '../../src';

function mount(element: React.ReactElement): { unmount: () => void; rerender: (next: React.ReactElement) => void; getText: () => string } {
  const container = document.createElement('div');
  document.body.appendChild(container);
  let root: Root;
  act(() => {
    root = createRoot(container);
    root.render(element);
  });
  return {
    rerender: (next) => {
      act(() => {
        root.render(next);
      });
    },
    getText: () => container.textContent || '',
    unmount: () => {
      act(() => {
        root.unmount();
      });
      container.remove();
    },
  };
}

function stripWhitespace(value: string): string {
  return value.replace(/\s+/g, '');
}

describe('typing behavior', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('onBeforeTypedChar percent is finite for the first character', async () => {
    jest.useFakeTimers();
    const ref = createRef<MarkdownTyperCMDRef>();
    const onBeforeTypedChar = jest.fn().mockResolvedValue(undefined);

    mount(<MarkdownTyperCMD ref={ref} interval={1} onBeforeTypedChar={onBeforeTypedChar} />);

    await act(async () => {
      ref.current?.push('A');
      await Promise.resolve();
      await jest.runAllTimersAsync();
      await Promise.resolve();
    });

    expect(onBeforeTypedChar).toHaveBeenCalled();
    const firstPercent = onBeforeTypedChar.mock.calls[0][0]?.percent;
    expect(Number.isFinite(firstPercent)).toBe(true);
    expect(firstPercent).toBe(0);
  });

  test('disableTyping mode reports cumulative content in onEnd', () => {
    const ref = createRef<MarkdownTyperCMDRef>();
    const onEnd = jest.fn();

    mount(<MarkdownTyperCMD ref={ref} interval={1} disableTyping onEnd={onEnd} />);

    act(() => {
      ref.current?.push('a');
      ref.current?.push('b');
    });

    expect(onEnd).toHaveBeenCalledTimes(2);
    expect(onEnd.mock.calls[0][0]?.str).toBe('a');
    expect(onEnd.mock.calls[1][0]?.str).toBe('ab');
  });

  test('restart keeps grapheme clusters intact', async () => {
    jest.useFakeTimers();
    const ref = createRef<MarkdownTyperCMDRef>();
    const onTypedChar = jest.fn();
    const emoji = '👨‍👩‍👧‍👦';

    mount(<MarkdownTyperCMD ref={ref} interval={1} onTypedChar={onTypedChar} />);

    await act(async () => {
      ref.current?.push(emoji);
      await jest.runAllTimersAsync();
      await Promise.resolve();
    });

    const firstRunChars = onTypedChar.mock.calls.map((call) => call[0]?.currentChar);
    onTypedChar.mockClear();

    await act(async () => {
      ref.current?.restart();
      await jest.runAllTimersAsync();
      await Promise.resolve();
    });

    const secondRunChars = onTypedChar.mock.calls.map((call) => call[0]?.currentChar);
    expect(secondRunChars).toEqual(firstRunChars);
  });

  test('MarkdownTyper does not log on unmount', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const app = mount(<MarkdownTyper interval={1}>hello</MarkdownTyper>);
    app.unmount();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('experimentalIncrementalRender handles prefix changes by typing only new suffix', async () => {
    jest.useFakeTimers();
    const onTypedChar = jest.fn();
    const app = mount(
      <MarkdownTyper interval={1} experimentalIncrementalRender onTypedChar={onTypedChar}>
        abcde
      </MarkdownTyper>,
    );

    await act(async () => {
      await jest.runAllTimersAsync();
      await Promise.resolve();
    });

    onTypedChar.mockClear();
    app.rerender(
      <MarkdownTyper interval={1} experimentalIncrementalRender onTypedChar={onTypedChar}>
        abcXY
      </MarkdownTyper>,
    );

    await act(async () => {
      await jest.runAllTimersAsync();
      await Promise.resolve();
    });

    const typed = onTypedChar.mock.calls.map((call) => call[0]?.currentChar).join('');
    expect(typed).toBe('XY');
    app.unmount();
  });

  test.each([
    {
      name: 'setext heading',
      before: 'Title\n=====\n\nalpha',
      after: 'Title\n=====\n\nbeta',
      expectedTyped: 'beta',
      expectedTextIncludes: 'beta',
    },
    {
      name: 'gfm table',
      before: '| col | val |\n| --- | --- |\n| a | 1 |\n',
      after: '| col | val |\n| --- | --- |\n| a | 2 |\n',
      expectedTyped: '2 |\n',
      expectedTextIncludes: '2',
    },
    {
      name: 'blockquote and list',
      before: '> quoted line\n\n- item one\n- item two',
      after: '> quoted line\n\n- item one\n- item three',
      expectedTyped: 'hree',
      expectedTextIncludes: 'item three',
    },
  ])('experimentalIncrementalRender keeps block integrity for $name', async ({ before, after, expectedTyped, expectedTextIncludes }) => {
    jest.useFakeTimers();
    const onTypedChar = jest.fn();
    const app = mount(
      <MarkdownTyper interval={1} experimentalIncrementalRender onTypedChar={onTypedChar}>
        {before}
      </MarkdownTyper>,
    );

    await act(async () => {
      await jest.runAllTimersAsync();
      await Promise.resolve();
    });

    onTypedChar.mockClear();
    app.rerender(
      <MarkdownTyper interval={1} experimentalIncrementalRender onTypedChar={onTypedChar}>
        {after}
      </MarkdownTyper>,
    );

    await act(async () => {
      await jest.runAllTimersAsync();
      await Promise.resolve();
    });

    const typed = onTypedChar.mock.calls.map((call) => call[0]?.currentChar).join('');
    expect(typed).toBe(expectedTyped);
    expect(stripWhitespace(app.getText())).toContain(stripWhitespace(expectedTextIncludes));
    app.unmount();
  });
});
