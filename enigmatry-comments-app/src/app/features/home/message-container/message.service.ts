import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { MessagesClient } from 'src/app/api/messages-api.service';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messagesClient = inject(MessagesClient);

  private isDismissedFlag = signal<boolean>(false);

  readonly isDismissed = this.isDismissedFlag.asReadonly();

  constructor() {
    this.messagesClient.isDismissed().subscribe({
      next: dismissed => this.isDismissedFlag.set(dismissed),
      error: () => this.isDismissedFlag.set(false)
    });
  }

  dismissMessage(): void {
    this.isDismissedFlag.set(true);
    this.messagesClient.dismiss().subscribe();
  }

  canAccessMessagesPage() {
    return this.messagesClient.isDismissed().pipe(
      map(dismissed => !dismissed)
    );
  }
}
