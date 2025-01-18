import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Film } from './film.interface';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

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
    ),
    catchError((err: HttpErrorResponse) => {
      console.error(err.message);
      this.error.set(err.message);
      return of([])
    })
  );

  //readonly signal
  films = toSignal<Film[], Film[]>(this.films$, { initialValue: [] as Film[] });
  selectedFilm = signal<Film | undefined>(undefined);
  error = signal<string | null>(null);

  onSelectFilm(filmTitle: string): void {
    const foundFilm = this.films().find((f: Film) => f['title'] === filmTitle);
    this.selectedFilm.set(foundFilm);
  }
}
