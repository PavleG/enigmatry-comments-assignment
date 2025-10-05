import { ErrorHandler, NgModule } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { GlobalErrorHandler } from '@services/global-error-handler';
import { PageTitleStrategy } from '@services/page-title-strategy';
import { provideDatePipeOptions } from './i18n/localization';

@NgModule({
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategy
    },
    provideDatePipeOptions()
  ]
})
export class CoreModule { }
