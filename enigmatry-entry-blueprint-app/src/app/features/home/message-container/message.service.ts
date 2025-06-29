import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private dismissedKey = 'appMessageDismissed';

  isDismissed(): boolean {
    return localStorage.getItem(this.dismissedKey) === 'true';
  }

  dismissMessage() {
    localStorage.setItem(this.dismissedKey, 'true');
  }

  canAccessMessagesPage(): boolean {
    return !this.isDismissed();
  }
}
