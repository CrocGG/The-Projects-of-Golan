import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fruits } from './fruits/fruits';

const routes: Routes = [
  { path: 'fruits', component: Fruits },
  { path: '', children: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
