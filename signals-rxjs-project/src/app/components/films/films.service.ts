import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Film } from './film.interface';

import { map } from 'rxjs/operators';

Injectable();
export class FilmsService {
  private readonly STAR_WARS_FILMS_URL: string = 'https://swapi.dev/api/films';
  private httpClient: HttpClient = inject(HttpClient);

  private films$ = this.httpClient.get<Film[]>(this.STAR_WARS_FILMS_URL).pipe(
    map((data: any) => data.results),
    map((films) =>
      Array.from(films).map((film: any) => ({
        title: film['title'],
        director: film['director'],
      }))
    )
  );

  //readonly signal
  films = toSignal<Film[], Film[]>(this.films$, { initialValue: [] as Film[] });
  selectedFilm = signal<Film | undefined>(undefined);

  onSelectFilm(filmTitle: string): void {
    const foundFilm = this.films().find((f: Film) => f['title'] === filmTitle);
    this.selectedFilm.set(foundFilm);
  }
}
