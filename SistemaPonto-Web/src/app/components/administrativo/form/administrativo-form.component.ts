import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
        this.administrativoForm = this.formBuilder.group({  
          id: administrativo.id,  
          nome: administrativo.nome     
        });
      });    
    }   
  }

  createAdministrativoForm(){
      this.administrativoForm = this.formBuilder.group({    
        nome: undefined     
      });       
  }

  save() {
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
