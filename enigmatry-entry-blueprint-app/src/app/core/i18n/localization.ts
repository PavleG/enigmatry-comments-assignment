import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Provider } from '@angular/core';
import { getCurrentLanguage } from 'src/i18n/language';
import { cultures } from './culture-info';

export const provideDatePipeOptions = (): Provider => {
  return {
    provide: DATE_PIPE_DEFAULT_OPTIONS,
    useFactory: () => {
      return { dateFormat: cultures[getCurrentLanguage()].datePipeFormat };
    }
  };
};