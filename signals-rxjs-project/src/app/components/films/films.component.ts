import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsService } from './films.service';
import { Film } from './film.interface';
import { ZoomDirective } from '../../shared/zoom.directive';

@Component({
  standalone: true,
  templateUrl: './films.component.html',
  styleUrl: './film.component.scss',
  providers: [FilmsService],
  imports: [CommonModule, ZoomDirective],
})
export class FilmsComponent {
  private filmsService = inject(FilmsService);
  films = this.filmsService.films;
  selectedFilm = this.filmsService.selectedFilm;
  pageTitle = computed(() => {
    return this.selectedFilm()
      ? `Director of \"${this.selectedFilm()?.['title']}\" is ${this.selectedFilm()?.['director']}`
      : '';
  });
  error = this.filmsService.error;

  logSelectedFilm = effect(() => {
    if (this.selectedFilm() !== undefined) {
      console.log(`Selected film is \"${this.selectedFilm()?.['title']}\"`);
    }
  });

  filmsLogger = effect(() => console.log(this.films()));

  onSelectFilm(filmTitle: string): void {
    this.filmsService.onSelectFilm(filmTitle);
  }

  onRemoveFilm(film: Film): void {
    this.filmsService.removeFilm(film);
  }
}
