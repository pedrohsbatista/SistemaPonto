import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetorComponent } from './components/setor/lista/setor.component';
import { SetorFormComponent } from './components/setor/form/setor-form/setor-form.component';

const routes: Routes = [
  { path: 'setor', component: SetorComponent },
  { path: 'setorForm/:id', component: SetorFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }