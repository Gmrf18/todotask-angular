import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./todo/todo.component').then(m => m.TodoComponent),
    title: 'Todo List',
  }
,
  {
    path: '**',
    redirectTo: '',
  }];
