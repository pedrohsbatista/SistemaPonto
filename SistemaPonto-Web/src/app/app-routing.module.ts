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

const routes: Routes = [
  { path: 'setor', component: SetorComponent },
  { path: 'setorForm/:id', component: SetorFormComponent },
  { path: 'colaborador', component: ColaboradorComponent  },
  { path: 'colaboradorForm/:id', component: ColaboradorFormComponent },
  { path: 'administrativo', component: AdministrativoComponent  },
  { path: 'administrativoForm/:id', component: AdministrativoFormComponent },
  { path: 'movimentacao', component: MovimentacaoComponent  },
  { path: 'movimentacaoForm/:id', component: MovimentacaoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }