// The interface language, as the server knows it.
//
// Server-authored text that reaches the user — the remedy on a failed import, a note
// pushed into a run — used to be written in one fixed language, because the server has
// no navigator and no localStorage. The browser now mirrors its locale switch into the
// non-secret UI_LOCALE setting (src/i18n/localeSync.ts), so every server message can ask
// here instead of guessing. Unset uses this fork's Korean default.
import { getKey } from './keystore.ts';

// Modified 2026-10-23: recognize Korean and use it as the default UI locale.
export type UiLocale = 'ko' | 'zh' | 'en' | 'it' | 'ru';

const LOCALES: ReadonlySet<string> = new Set(['ko', 'zh', 'en', 'it', 'ru']);

export function parseUiLocale(value: unknown): UiLocale | null {
  const tag = typeof value === 'string' ? value.trim().toLowerCase() : '';
  return LOCALES.has(tag) ? (tag as UiLocale) : null;
}

export function uiLocale(): UiLocale {
  return parseUiLocale(getKey('UI_LOCALE')) ?? 'ko';
}

/** Pick the UI language; optional translations fall back to English. */
export function localized<T>(variants: { zh: T; en: T; ru?: T; it?: T; ko?: T }, locale: UiLocale = uiLocale()): T {
  if (locale === 'ko') return variants.ko ?? variants.en;
  if (locale === 'zh') return variants.zh;
  if (locale === 'ru') return variants.ru ?? variants.en;
  if (locale === 'it') return variants.it ?? variants.en;
  return variants.en;
}
