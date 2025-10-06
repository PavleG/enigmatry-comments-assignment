import { Injectable } from '@angular/core';
import { environment } from '@env';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  error(error: unknown, context?: string) {
    if (!environment.production) {
      // eslint-disable-next-line no-console
      console.error(context, error);
    }
  }
}
