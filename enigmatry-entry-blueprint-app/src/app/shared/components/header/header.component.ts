import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '@shared/material.module';
import { Language, setCurrentLanguage } from 'src/i18n/language';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MaterialModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchTerm = '';
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

  onSearch(term: string) {
    // eslint-disable-next-line no-console
    console.log('Search term:', term);
    // TODO: Inject comments service
  }

  onLanguageSelect(lang: string) {
    setCurrentLanguage(lang as Language);
    location.reload();
  }
}
