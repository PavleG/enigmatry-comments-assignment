import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { CoreModule } from '@app/core.module';

import { acceptLanguageInterceptor, EntryCommonModule } from '@enigmatry/entry-components';
import { SharedModule } from '@shared/shared.module';
import { routes } from './app.routes';

export const appConfig = (i18n: { localeId: 'en-US' | 'nl-NL' | 'sr-Latn' }): ApplicationConfig => ({
    providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(
            withInterceptors([acceptLanguageInterceptor])
        ),
        importProvidersFrom([
            BrowserModule,
            BrowserAnimationsModule,
            CoreModule,
            SharedModule,
            EntryCommonModule.forRoot()
        ]),
        { provide: LOCALE_ID, useValue: i18n.localeId }
    ]
});
