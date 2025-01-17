import { Routes } from '@angular/router';
import { FilmsComponent } from './components/films/films.component';

export const routes: Routes = [
    {
        path: '',
        component: FilmsComponent,
        pathMatch: 'full'
    }
];
