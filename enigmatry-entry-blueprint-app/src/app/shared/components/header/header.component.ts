import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ErrorService } from '@app/services/error.service';
import { CommentsService } from '@features/home/comments/comments.service';
import { MaterialModule } from '@shared/material.module';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Language, setCurrentLanguage } from 'src/i18n/language';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private commentsService = inject(CommentsService);
  private errorService = inject(ErrorService);
  private debounceTimeMs = 500;

  searchTextPlaceholder = $localize`:@@header.search.placeholder:Search comments`;
  searchControl = new FormControl('');
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

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceTimeMs),
        distinctUntilChanged(),
        switchMap(term => {
          if (term === null) {
            return this.commentsService.loadFirstPage();
          }
          return this.commentsService.search(term.trim());
        })
      )
      .subscribe({
        error: err => {
          this.errorService.showError(err.message);
        }
      });
  }

  onLanguageSelect(lang: string) {
    setCurrentLanguage(lang as Language);
    location.reload();
  }
}
