import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChestionarComponent } from './chestionar/chestionar.component';
import { CategorieSelectionComponent } from './categorie-selection/categorie-selection.component';
import { ChestionarStartPageComponent } from './chestionar-start-page/chestionar-start-page.component';
import { ChestionarEndComponent } from './chestionar-end/chestionar-end.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component:  CategorieSelectionComponent},
  { path: 'chestionar', component:  ChestionarStartPageComponent},
  { path: 'test', component:  ChestionarComponent},
  { path: 'chestionar-end', component:  ChestionarEndComponent},
  { path: 'admin', component:  AdminDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
