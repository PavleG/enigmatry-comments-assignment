import { Injectable, ErrorHandler } from '@angular/core';

/**
 * Extends default error handling to report errors to an external service - Azure Application Insights.
 * - https://angular.io/api/core/ErrorHandler
 */
@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  override handleError(error: any) {
    // Default error handler prints error messages to the console
    super.handleError(error);
  }
}