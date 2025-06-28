import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { Language, setCurrentLanguage } from 'src/i18n/language';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  languages = [
    {
      description: 'English',
      icon: 'language',
      aria: 'Language icon',
      short: 'en'
    },
    {
      description: 'Dutch',
      icon: 'language',
      aria: 'Language icon',
      short: 'nl'
    },
    {
      description: 'Serbian',
      icon: 'language',
      aria: 'Language icon',
      short: 'sr'
    }
  ];

  onLanguageSelect(lang: string) {
    setCurrentLanguage(lang as Language);
    location.reload();
  }
}
