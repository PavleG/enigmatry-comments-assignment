import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '@shared/material.module';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message-container',
  standalone: true,
  imports: [RouterLink, MaterialModule],
  templateUrl: './message-container.component.html',
  styleUrl: './message-container.component.scss'
})
export class MessageContainerComponent implements OnInit {
  isDismissed = false;

  constructor(private messageService: MessageService, private router: Router) {}

  ngOnInit() {
    this.isDismissed = this.messageService.isDismissed();
  }

  dismiss(event: MouseEvent) {
    event.stopPropagation();
    this.messageService.dismissMessage();
    this.isDismissed = true;
  }
}
