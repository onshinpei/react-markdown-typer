import { CozeMessageEnum, CozeMessageI } from './define';

export function parseSSEData(rawData: string) {
  const events: CozeMessageI[] = [];
  const lines = rawData.split('\n');
  let currentEvent: Partial<CozeMessageI> = {};

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue; // 忽略空行

    // 解析 event 行
    if (trimmedLine.startsWith('event:')) {
      currentEvent.type = trimmedLine.trim() as CozeMessageEnum;
    } else if (trimmedLine.startsWith('data:')) {
      // 解析 data 行
      try {
        const jsonString = trimmedLine.slice(5).trim();
        currentEvent.data = JSON.parse(jsonString);
        events.push(currentEvent as CozeMessageI); // 保存完整事件
        currentEvent = {}; // 重置临时对象
      } catch (e) {
        console.error('JSON 解析失败:', e);
      }
    }
  }

  return events;
}
