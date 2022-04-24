import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChestionarComponent } from './chestionar/chestionar.component';
import { CategorieSelectionComponent } from './categorie-selection/categorie-selection.component';
import { ChestionarStartPageComponent } from './chestionar-start-page/chestionar-start-page.component';
import { ChestionarEndComponent } from './chestionar-end/chestionar-end.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ChestionarComponent,
    CategorieSelectionComponent,
    ChestionarStartPageComponent,
    ChestionarEndComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
