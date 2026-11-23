export function getResponseErrorMessage(text: string, fallback: string): string {
  try {
    return JSON.parse(text).message || fallback;
  } catch {
    return fallback;
  }
}
