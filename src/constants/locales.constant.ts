import { fr, es, Locale } from "date-fns/locale";

interface Locales {
  [key: string]: Locale;
}

export const locales: Locales = {
  fr: fr,
  es: es,
};
