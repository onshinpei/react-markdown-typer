import { act, createRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { MarkdownTyper, MarkdownTyperCMD, MarkdownTyperCMDRef } from '../../src';

function mount(element: React.ReactElement): { unmount: () => void } {
  const container = document.createElement('div');
  document.body.appendChild(container);
  let root: Root;
  act(() => {
    root = createRoot(container);
    root.render(element);
  });
  return {
    unmount: () => {
      act(() => {
        root.unmount();
      });
      container.remove();
    },
  };
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
});
