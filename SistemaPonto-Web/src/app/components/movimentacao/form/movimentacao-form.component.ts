import { Component, OnInit } from '@angular/core';
import { Movimentacao } from 'src/app/models/entidades/movimentacao';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';

@Component({
  selector: 'app-movimentacao-form',
  templateUrl: './movimentacao-form.component.html',
  styleUrls: ['./movimentacao-form.component.css']
})
export class MovimentacaoFormComponent implements OnInit {

  movimentacaoForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private movimentacaoService: MovimentacaoService, 
    private router: Router, private activatedRoute: ActivatedRoute) { 
    this.createMovimentacaoForm();    
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.id){
      this.movimentacaoService.getById(this.activatedRoute.snapshot.params.id).subscribe((movimentacao: Movimentacao) => {
        this.movimentacaoForm = this.formBuilder.group({  
          id: movimentacao.id,  
          dataMovimentacao: movimentacao.dataMovimentacao   
        });
      });    
    }   
  }

  createMovimentacaoForm(){
      this.movimentacaoForm = this.formBuilder.group({    
        dataMovimentacao: undefined     
      });       
  }

  save() {
    var dados = this.movimentacaoForm.value;
    debugger;
    dados.dataMovimentacao = new Date(dados.dataMovimentacao).toISOString();
    if (dados.id){
      this.movimentacaoService.put(this.movimentacaoForm.value).subscribe((success) => {
        this.router.navigate(['/movimentacao']);
      });;
    } else {
      this.movimentacaoService.post(this.movimentacaoForm.value).subscribe((success) => {
        this.router.navigate(['/movimentacao']);
      });;
    }
  }
}
