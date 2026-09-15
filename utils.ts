// Приводит ответ пользователя к единому виду для сравнения:
// убирает пробелы, приводит к нижнему регистру, игнорирует лишнюю пунктуацию.
export function normalizeAnswer(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[.,!?"'«»]/g, "")
    .replace(/\s+/g, "");
}

export function isCorrectAnswer(value: string, accepted: string[]): boolean {
  const normalized = normalizeAnswer(value);
  if (normalized.length === 0) return false;
  return accepted.some((answer) => normalizeAnswer(answer) === normalized);
}
