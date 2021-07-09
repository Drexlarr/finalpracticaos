import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {UrgenciesComponent} from "./pages/urgencies/urgencies.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'guardians/:id/urgencies', component: UrgenciesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
