import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Colaborador } from 'src/app/models/entidades/colaborador';
import { SetorService } from 'src/app/services/setor.service';
import { Setor } from 'src/app/models/entidades/setor';
import { Horario } from 'src/app/models/entidades/horario';
import { Guid } from 'guid-typescript';
import { MatTableDataSource } from '@angular/material/table';
import { HorarioFormComponent } from '../horario-form/horario-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CameraComponent } from 'src/app/utilities/camera/camera.component';
import { DiaSemana } from 'src/app/models/enums/dia-semana.enum';
import { NotificationService } from 'src/app/utilities/notification.service';
import { CepService } from '../../../utilities/cep.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-colaborador-form',
  templateUrl: './colaborador-form.component.html',
  styleUrls: ['./colaborador-form.component.css']
})
export class ColaboradorFormComponent implements OnInit {
  colaboradorForm: FormGroup;
  setores: Setor[];
  displayedColumns: string[] = ['diaSemana', 'inicio', 'fim', 'commands'];
  horarios: MatTableDataSource<Horario>;
  imagem: string;

  constructor(private formBuilder: FormBuilder, private colaboradorService: ColaboradorService, 
    private router: Router, private activatedRoute: ActivatedRoute, private setorService: SetorService,
    private dialog: MatDialog, private notification: NotificationService,
    private cepService : CepService) { 
    this.createColaboradorForm();    
    this.setorService.get().subscribe((setores: Setor[]) => {	
      this.setores = setores;	
    }, (response) => {
      this.notification.openSnackBarDanger(response.error);
    });
    this.horarios = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.id){
      this.colaboradorService.getById(this.activatedRoute.snapshot.params.id).subscribe((colaborador: Colaborador) => {
        this.colaboradorForm.controls['id'].setValue(colaborador.id);  
        this.colaboradorForm.controls['nome'].setValue(colaborador.nome); 
        this.colaboradorForm.controls['login'].setValue(colaborador.login); 
        this.colaboradorForm.controls['dataNascimento'].setValue(colaborador.dataNascimento ? formatDate(colaborador.dataNascimento, 'yyyy-MM-dd', 'en') : null); 
        this.colaboradorForm.controls['cpf'].setValue(colaborador.cpf); 
        this.colaboradorForm.controls['setor'].setValue(colaborador.setor); 
        this.colaboradorForm.controls['cargo'].setValue(colaborador.cargo); 
        this.horarios.data = colaborador.horarios;
        this.colaboradorForm.controls['logradouro'].setValue(colaborador.logradouro); 
        this.colaboradorForm.controls['numeroLogradouro'].setValue(colaborador.numeroLogradouro); 
        this.colaboradorForm.controls['bairro'].setValue(colaborador.bairro); 
        this.colaboradorForm.controls['municipio'].setValue(colaborador.municipio); 
        this.colaboradorForm.controls['uf'].setValue(colaborador.uf); 
        this.colaboradorForm.controls['complemento'].setValue(colaborador.complemento); 
        this.colaboradorForm.controls['cep'].setValue(colaborador.cep);
        this.colaboradorForm.controls['email'].setValue(colaborador.email); 
        this.colaboradorForm.controls['telefone'].setValue(colaborador.telefone); 
        this.colaboradorForm.controls['celular'].setValue(colaborador.celular);
        this.colaboradorForm.controls['personId'].setValue(colaborador.personId);
        this.colaboradorForm.controls['persistedFaceId'].setValue(colaborador.persistedFaceId);
        this.imagem = colaborador.imagem ? "data:image/jpeg;base64," + colaborador.imagem : undefined;
        this.apllyValidation();
      }, (response) => {
        this.notification.openSnackBarDanger(response.error);
      });    
    }   
  }

  createColaboradorForm(){
      this.colaboradorForm = this.formBuilder.group({ 
        id: undefined,   
        nome: [undefined, [Validators.required, Validators.maxLength(100)]],
        login: [undefined, [Validators.required, Validators.maxLength(100)]],
        password: [undefined, [Validators.required, Validators.maxLength(50), Validators.minLength(6)]],
        confirmPassword: [undefined, [confirmPasswordValidator]],
        dataNascimento: undefined,
        cpf: [undefined, [Validators.maxLength(11)]],
        imagem: undefined,
        setor: [undefined, [Validators.required]],
        cargo: [undefined, [Validators.required, Validators.maxLength(100)]],
        logradouro: [undefined, [Validators.maxLength(100)]],
        numeroLogradouro: [undefined, [Validators.maxLength(10)]],
        bairro: [undefined, [Validators.maxLength(100)]],
        municipio: [undefined, [Validators.maxLength(100)]],
        uf: [undefined, [Validators.maxLength(2)]],       
        cep: [undefined, [Validators.maxLength(8)]],
        complemento: [undefined, [Validators.maxLength(100)]],
        email: [undefined, [Validators.maxLength(100)]],
        telefone: [undefined, [Validators.maxLength(10)]],
        celular: [undefined, [Validators.maxLength(11)]],
        personId: Guid.EMPTY,
        persistedFaceId: Guid.EMPTY,
      });     
  }

  apllyValidation(){
    if(this.colaboradorForm.controls['id'].value && !this.colaboradorForm.controls['password'].value){
      this.colaboradorForm.controls['password'].clearValidators();
      this.colaboradorForm.controls['password'].updateValueAndValidity();
      this.colaboradorForm.controls['confirmPassword'].clearValidators();
      this.colaboradorForm.controls['confirmPassword'].updateValueAndValidity();
    }else{
      this.colaboradorForm.controls['password'].setValidators([Validators.required, Validators.maxLength(50), Validators.minLength(6)]);
      this.colaboradorForm.controls['password'].updateValueAndValidity();
      this.colaboradorForm.controls['confirmPassword'].setValidators([confirmPasswordValidator]);
      this.colaboradorForm.controls['confirmPassword'].updateValueAndValidity();
    }   
  }

  compareFunction(o1: any, o2: any) {
    return (o2 && o1.id == o2.id);
  }

  getEndereco(){
    this.cepService.getEndereco(this.colaboradorForm.controls['cep'].value).subscribe((endereco: Object) => {
       this.colaboradorForm.controls['logradouro'].setValue(endereco["logradouro"]);
       this.colaboradorForm.controls['bairro'].setValue(endereco["bairro"]);
       this.colaboradorForm.controls['municipio'].setValue(endereco["localidade"]);
       this.colaboradorForm.controls['logradouro'].setValue(endereco["logradouro"]);
       this.colaboradorForm.controls['uf'].setValue(endereco["uf"]);
    });
  }

  save() {
    if(this.colaboradorForm.valid){
      var dados = this.colaboradorForm.value;
      dados.horarios = this.horarios.data;

      if(this.imagem)
      {
        dados.imagem = this.imagem.replace("data:image/jpeg;base64,", "");
      }
      
      if (dados.id){
        this.colaboradorService.put(dados).subscribe((success) => {
          this.router.navigate(['/colaborador']);
        }, (response) => {
          this.notification.openSnackBarDanger(response.error);
        });
      } else {
        this.colaboradorService.post(dados).subscribe((success) => {
          this.router.navigate(['/colaborador']);
        }, (response) => {
          this.notification.openSnackBarDanger(response.error);
        });
      }
    }
  }

  openHorarioForm(){
    const dialogRef = this.dialog.open(HorarioFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.addHorario(result);    
      }          
    });
  }

  addHorario(horarios: Horario[]){
    var data = this.horarios.data;
    data = data.concat(horarios);
    this.horarios.data = data;
  }

  deleteHorario(id: Guid){
    var horarios = this.horarios.data;
    var index = this.horarios.data.findIndex(horario => horario.id == id);
    this.horarios.data.splice(index, 1);
    this.horarios.data = horarios;
  }

  enumToLabel(diaSemana: DiaSemana){    
    switch(diaSemana){
      case DiaSemana.Domingo: return "Domingo";
      case DiaSemana.Segunda: return "Segunda-Feira";
      case DiaSemana.Terca: return "Terça-Feira";
      case DiaSemana.Quarta: return "Quarta-Feira";
      case DiaSemana.Quinta: return "Quinta-Feira";
      case DiaSemana.Sexta: return "Sexta-Feira";
      case DiaSemana.Sabado: return "Sábado";
    }
  }

  openCam(){
     const dialogRef = this.dialog.open(CameraComponent);

     dialogRef.afterClosed().subscribe(result => {
       if (result) {
         this.imagem = result;
       }
     });
  }  

  removerImagem(){
    this.imagem = null;
  }
}

function confirmPasswordValidator(control: AbstractControl): { [key: string]: string } | null {
  var administradorForm = control.parent;
  if (administradorForm && control.value !== control.parent.controls['password'].value) {
    return { "customValidator": "As senhas informadas são diferentes"} 
  }
  return null;
}