import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomusComponent } from './homus/homus.component';
import { LoginusComponent } from './loginus/loginus.component';
import { OfertusComponent } from './ofertus/ofertus.component';
import { RegistrusComponent } from './registrus/registrus.component';
import { TestusComponent } from './testus/testus.component';

const routes: Routes = [
  {path: "homus", component: HomusComponent},
  {path: "loginus", component: LoginusComponent},
  {path: "ofertus", component: OfertusComponent},
  {path: "registrus", component: RegistrusComponent},
  {path: "testus", component: TestusComponent},
  {path: "**", component: HomusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
