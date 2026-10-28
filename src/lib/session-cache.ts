const TTL_MS = 5 * 60 * 1000;

type CacheEntry<T> = { value: T; expires: number };

function storage(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.sessionStorage : null;
  } catch {
    return null;
  }
}

export function readCache<T>(key: string): T | null {
  const store = storage();
  if (!store) return null;
  try {
    const raw = store.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (!entry || typeof entry.expires !== "number" || Date.now() > entry.expires) {
      store.removeItem(key);
      return null;
    }
    return entry.value;
  } catch {
    return null;
  }
}

export function writeCache<T>(key: string, value: T, ttlMs = TTL_MS) {
  const store = storage();
  if (!store) return;
  try {
    const entry: CacheEntry<T> = { value, expires: Date.now() + ttlMs };
    store.setItem(key, JSON.stringify(entry));
  } catch {
    // quota / private mode
  }
}
