import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomusComponent } from './homus/homus.component';
import { LoginusComponent } from './loginus/loginus.component';
import { OfertusComponent } from './ofertus/ofertus.component';
import { RegistrusComponent } from './registrus/registrus.component';

const routes: Routes = [
  {path: "homus", component: HomusComponent},
  {path: "loginus", component: LoginusComponent},
  {path: "ofertus", component: OfertusComponent},
  {path: "registrus", component: RegistrusComponent},
  {path: "..", component: HomusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
