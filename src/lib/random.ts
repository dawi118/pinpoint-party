export function createId(prefix = "id"): string {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${prefix}-${Date.now().toString(36)}-${randomString(12)}`;
}

export function randomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) return 0;

  const values = new Uint32Array(1);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(values);
    return values[0] % maxExclusive;
  }

  return Math.floor(Math.random() * maxExclusive);
}

function randomString(length: number): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => alphabet[randomInt(alphabet.length)]).join("");
}
