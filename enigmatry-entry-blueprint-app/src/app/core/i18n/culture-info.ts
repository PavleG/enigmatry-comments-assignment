/* eslint-disable @typescript-eslint/quotes */
import { nl, enUS, srLatn, Locale } from 'date-fns/locale';
import { Language } from 'src/i18n/language';

export interface CultureInfo {
  datePipeFormat: string;
  matDateFormat: string;
  matDateLocale: Locale;
}

export const cultures: Record<Language, CultureInfo> = {
  en: {
    datePipeFormat: "EEEE, MMMM d, y 'at' HH:mm",
    matDateFormat: "EEEE, MMMM d, y 'at' HH:mm",
    matDateLocale: enUS
  },
  nl: {
    datePipeFormat: "EEEE, MMMM d, y 'om' HH:mm",
    matDateFormat: "EEEE, MMMM d, y 'om' HH:mm",
    matDateLocale: nl
  },
  sr: {
    datePipeFormat: "EEEE, MMMM d, y 'u' HH:mm",
    matDateFormat: "EEEE, MMMM d, y 'u' HH:mm",
    matDateLocale: srLatn
  }
};
