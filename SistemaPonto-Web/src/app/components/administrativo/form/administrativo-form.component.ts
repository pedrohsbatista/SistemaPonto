import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministrativoService } from 'src/app/services/administrativo.service';
import { Administrativo } from 'src/app/models/entidades/administrativo';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-administrativo-form',
  templateUrl: './administrativo-form.component.html',
  styleUrls: ['./administrativo-form.component.css']
})
export class AdministrativoFormComponent implements OnInit {

  administrativoForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private administrativoService: AdministrativoService, 
    private router: Router, private activatedRoute: ActivatedRoute, private notification: NotificationService) { 
    this.createAdministrativoForm();    
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.id){
      this.administrativoService.getById(this.activatedRoute.snapshot.params.id).subscribe((administrativo: Administrativo) => {
        this.administrativoForm.controls['id'].setValue(administrativo.id);
        this.administrativoForm.controls['nome'].setValue(administrativo.nome);
        this.administrativoForm.controls['login'].setValue(administrativo.login);
        this.applyValidation();       
      }, (response) => {
        this.notification.openSnackBarDanger(response.error);
      });    
    }   
  }

  createAdministrativoForm(){
      this.administrativoForm = this.formBuilder.group({    
        id: undefined,
        nome: [undefined, [Validators.required, Validators.maxLength(100)]],
        login: [undefined, [Validators.required, Validators.maxLength(100)]] ,
        password: [undefined, [Validators.required, Validators.maxLength(50), Validators.minLength(6)]],
        confirmPassword: [undefined, [confirmPasswordValidator]]           
      }); 
  }

  applyValidation(){
    if(this.administrativoForm.controls['id'].value && !this.administrativoForm.controls['password'].value){
      this.administrativoForm.controls['password'].clearValidators();
      this.administrativoForm.controls['password'].updateValueAndValidity();
      this.administrativoForm.controls['confirmPassword'].clearValidators();
      this.administrativoForm.controls['confirmPassword'].updateValueAndValidity();
    }else{
      this.administrativoForm.controls['password'].setValidators([Validators.required, Validators.maxLength(50), Validators.minLength(6)]);
      this.administrativoForm.controls['password'].updateValueAndValidity();
      this.administrativoForm.controls['confirmPassword'].setValidators([confirmPasswordValidator]);
      this.administrativoForm.controls['confirmPassword'].updateValueAndValidity();
    }   
  }

  save() {
    if(this.administrativoForm.valid){
      var dados = this.administrativoForm.value;
      if (dados.id){
        this.administrativoService.put(dados).subscribe((success) => {
          this.router.navigate(['/administrativo']);
        }, (response) => {
          this.notification.openSnackBarDanger(response.error);
        });
      } else {
        this.administrativoService.post(dados).subscribe((success) => {
          this.router.navigate(['/administrativo']);
        }, (response) => {
          this.notification.openSnackBarDanger(response.error);
        });
      }
    }   
  }
}

function confirmPasswordValidator(control: AbstractControl): { [key: string]: string } | null {
  var administradorForm = control.parent;
  if (administradorForm && control.value !== control.parent.controls['password'].value) {
    return { "customValidator": "As senhas informadas são diferentes"} 
  }
  return null;
}