import { Buffer } from 'buffer';

export function ensureBuffer() {
  if (typeof globalThis !== 'undefined' && typeof (globalThis as any).Buffer === 'undefined') {
    (globalThis as any).Buffer = Buffer;
  }
}
