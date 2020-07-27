import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Colaborador } from 'src/app/models/entidades/colaborador';

@Component({
  selector: 'app-colaborador-form',
  templateUrl: './colaborador-form.component.html',
  styleUrls: ['./colaborador-form.component.css']
})
export class ColaboradorFormComponent implements OnInit {

  colaboradorForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private colaboradorService: ColaboradorService, 
    private router: Router, private activatedRoute: ActivatedRoute) { 
    this.createColaboradorForm();    
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.id){
      this.colaboradorService.getById(this.activatedRoute.snapshot.params.id).subscribe((colaborador: Colaborador) => {
        this.colaboradorForm = this.formBuilder.group({  
          id: colaborador.id,  
          nome: colaborador.nome     
        });
      });    
    }   
  }

  createColaboradorForm(){
      this.colaboradorForm = this.formBuilder.group({    
        nome: undefined     
      });       
  }

  save() {
    var dados = this.colaboradorForm.value;
    if (dados.id){
      this.colaboradorService.put(this.colaboradorForm.value).subscribe((success) => {
        this.router.navigate(['/colaborador']);
      });;
    } else {
      this.colaboradorService.post(this.colaboradorForm.value).subscribe((success) => {
        this.router.navigate(['/colaborador']);
      });;
    }
  }
}
