import { Component, inject } from '@angular/core';

import { FilmsService } from './films.service';

@Component({
  standalone: true,
  templateUrl: './films.component.html',
  providers: [FilmsService],
})
export class FilmsComponent {
  private filmsService = inject(FilmsService);
  films = this.filmsService.films;
}
