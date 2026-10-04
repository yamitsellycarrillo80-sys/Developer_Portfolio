export const SUPPORTED_LANGUAGES = ['es', 'en'] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: LanguageCode = 'es';

export function isSupportedLanguage(value: unknown): value is LanguageCode {
  return SUPPORTED_LANGUAGES.some((language) => language === value);
}
