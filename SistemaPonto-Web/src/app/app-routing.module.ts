import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetorComponent } from './components/setor/lista/setor.component';
import { SetorFormComponent } from './components/setor/form/setor-form/setor-form.component';
import { ColaboradorComponent } from './components/colaborador/lista/colaborador.component';
import { ColaboradorFormComponent } from './components/colaborador/form/colaborador-form.component';
import { AdministrativoComponent } from './components/administrativo/lista/administrativo.component';
import { AdministrativoFormComponent } from './components/administrativo/form/administrativo-form.component';
import { MovimentacaoComponent } from './components/movimentacao/lista/movimentacao.component';
import { MovimentacaoFormComponent } from './components/movimentacao/form/movimentacao-form.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CapturaComponent } from './components/captura/captura.component';

const routes: Routes = [
  { path: '', component: LoginComponent, children: [ { path: 'login', component: LoginComponent } ] },
  { path: '', component: HomeComponent, children: [ { path: 'setor', component: SetorComponent  } ] },
  { path: '', component: HomeComponent, children: [ { path: 'setorForm', component: SetorFormComponent } ] },
  { path: '', component: HomeComponent, children: [ { path: 'setorForm/:id', component: SetorFormComponent } ] },
  { path: '', component: HomeComponent, children: [ { path: 'colaborador', component: ColaboradorComponent } ] },
  { path: '', component: HomeComponent, children: [ { path: 'colaboradorForm', component: ColaboradorFormComponent } ] },
  { path: '', component: HomeComponent, children: [ { path: 'colaboradorForm/:id', component: ColaboradorFormComponent } ] },
  { path: '', component: HomeComponent, children: [ { path: 'administrativo', component: AdministrativoComponent  } ] },
  { path: '', component: HomeComponent, children: [ { path: 'administrativoForm', component: AdministrativoFormComponent } ] },
  { path: '', component: HomeComponent, children: [ { path: 'administrativoForm/:id', component: AdministrativoFormComponent } ] },
  { path: '', component: HomeComponent, children: [ { path: 'movimentacao', component: MovimentacaoComponent  } ] },
  { path: '', component: HomeComponent, children: [ { path: 'movimentacaoForm/:id', component: MovimentacaoFormComponent } ] },
  { path: '', component: CapturaComponent, children: [ { path: 'captura', component: CapturaComponent } ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }