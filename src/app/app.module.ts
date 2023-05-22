import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomusComponent } from './homus/homus.component';
import { RegistrusComponent } from './registrus/registrus.component';
import { LoginusComponent } from './loginus/loginus.component';
import { OfertusComponent } from './ofertus/ofertus.component';
import { TestusComponent } from './testus/testus.component';
import { MenusComponent } from './menus/menus.component';
import { OfertuspodgladusComponent } from './ofertuspodgladus/ofertuspodgladus.component';
import { RankingusComponent } from './rankingus/rankingus.component';
import { ProfilusComponent } from './profilus/profilus.component';

@NgModule({
  declarations: [
    AppComponent,
    HomusComponent,
    RegistrusComponent,
    LoginusComponent,
    OfertusComponent,
    TestusComponent,
    MenusComponent,
    OfertuspodgladusComponent,
    RankingusComponent,
    ProfilusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
