import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministrativoService } from 'src/app/services/administrativo.service';
import { Administrativo } from 'src/app/models/entidades/administrativo';

@Component({
  selector: 'app-administrativo-form',
  templateUrl: './administrativo-form.component.html',
  styleUrls: ['./administrativo-form.component.css']
})
export class AdministrativoFormComponent implements OnInit {

  administrativoForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private administrativoService: AdministrativoService, 
    private router: Router, private activatedRoute: ActivatedRoute) { 
    this.createAdministrativoForm();    
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.id){
      this.administrativoService.getById(this.activatedRoute.snapshot.params.id).subscribe((administrativo: Administrativo) => {
        this.administrativoForm.controls['id'].setValue(administrativo.id);
        this.administrativoForm.controls['nome'].setValue(administrativo.nome);
        this.administrativoForm.controls['login'].setValue(administrativo.login);
        this.apllyValidation();       
      });    
    }   
  }

  createAdministrativoForm(){
      this.administrativoForm = this.formBuilder.group({    
        id: undefined,
        nome: [undefined, [Validators.required, Validators.maxLength(100)]],
        login: [undefined, [Validators.required, Validators.maxLength(100)]] ,
        senha: [undefined, [Validators.required, Validators.maxLength(50), Validators.minLength(6)]],
        confirmarSenha: [undefined, [confirmarSenhaValidator]]           
      }); 
  }

  apllyValidation(){
    if(this.administrativoForm.controls['id'].value && !this.administrativoForm.controls['senha'].value){
      this.administrativoForm.controls['senha'].clearValidators();
      this.administrativoForm.controls['senha'].updateValueAndValidity();
      this.administrativoForm.controls['confirmarSenha'].clearValidators();
      this.administrativoForm.controls['confirmarSenha'].updateValueAndValidity();
    }else{
      this.administrativoForm.controls['senha'].setValidators([Validators.required, Validators.maxLength(100), Validators.minLength(6)]);
      this.administrativoForm.controls['senha'].updateValueAndValidity();
      this.administrativoForm.controls['confirmarSenha'].setValidators([confirmarSenhaValidator]);
      this.administrativoForm.controls['confirmarSenha'].updateValueAndValidity();
    }   
  }

  save() {
    if(this.administrativoForm.valid){
      var dados = this.administrativoForm.value;
      if (dados.id){
        this.administrativoService.put(this.administrativoForm.value).subscribe((success) => {
          this.router.navigate(['/administrativo']);
        });;
      } else {
        this.administrativoService.post(this.administrativoForm.value).subscribe((success) => {
          this.router.navigate(['/administrativo']);
        });;
      }
    }   
  }
}

function confirmarSenhaValidator(control: AbstractControl): { [key: string]: string } | null {
  var administradorForm = control.parent;
  if (administradorForm && control.value !== control.parent.controls['senha'].value) {
    return { "customValidator": "As senhas informadas são diferentes"} 
  }
  return null;
}