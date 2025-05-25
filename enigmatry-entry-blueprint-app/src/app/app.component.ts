import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SizeService } from '@services/size.service';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'enigmatry-entry-blueprint-app';

  constructor(private readonly element: ElementRef,
    private readonly sizeService: SizeService) { }

  ngOnInit(): void {
    this.sizeService.startTrackingResizeOf(this.element);
  }
}
