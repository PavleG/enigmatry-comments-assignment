import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '@shared/material.module';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message-container',
  standalone: true,
  imports: [RouterLink, MaterialModule],
  templateUrl: './message-container.component.html',
  styleUrl: './message-container.component.scss'
})
export class MessageContainerComponent {
  messageService = inject(MessageService);
  dismiss(event: MouseEvent) {
    event.stopPropagation();
    this.messageService.dismissMessage();
  }
}
