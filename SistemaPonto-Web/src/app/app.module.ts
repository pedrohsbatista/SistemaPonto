import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SetorComponent } from './components/setor/lista/setor.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './utilities/custom-paginator-configuration';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { SetorFormComponent } from './components/setor/form/setor-form/setor-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmExclusionDialogComponent } from './utilities/confirm-exclusion-dialog/confirm-exclusion-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { ColaboradorComponent } from './components/colaborador/lista/colaborador.component';
import { ColaboradorFormComponent } from './components/colaborador/form/colaborador-form.component';
import { AdministrativoComponent } from './components/administrativo/lista/administrativo.component';
import { AdministrativoFormComponent } from './components/administrativo/form/administrativo-form.component';
import { MovimentacaoComponent } from './components/movimentacao/lista/movimentacao.component';
import { MovimentacaoFormComponent } from './components/movimentacao/form/movimentacao-form.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ValidatorFormComponent } from './utilities/validator-form/validator-form.component';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    SetorComponent,
    SetorFormComponent,    
    ConfirmExclusionDialogComponent, 
    ColaboradorComponent, 
    ColaboradorFormComponent, 
    AdministrativoComponent, 
    AdministrativoFormComponent, 
    MovimentacaoComponent, 
    MovimentacaoFormComponent,
    LoginComponent, 
    HomeComponent, 
    ValidatorFormComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    HttpClientModule,    
    MatMenuModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
