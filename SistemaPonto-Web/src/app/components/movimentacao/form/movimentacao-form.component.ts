import { Component, OnInit } from '@angular/core';
import { Movimentacao } from 'src/app/models/entidades/movimentacao';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { NotificationService } from 'src/app/utilities/notification.service';
import * as moment from 'moment';
import { TipoMovimentacao } from 'src/app/models/enums/tipo-movimentacao.enum';

@Component({
  selector: 'app-movimentacao-form',
  templateUrl: './movimentacao-form.component.html',
  styleUrls: ['./movimentacao-form.component.css']
})
export class MovimentacaoFormComponent implements OnInit {

  movimentacaoForm: FormGroup;
  imagem: string;
  imagemColaborador: string;

  constructor(private formBuilder: FormBuilder, private movimentacaoService: MovimentacaoService, 
    private activatedRoute: ActivatedRoute, private notification : NotificationService) { 
    this.createMovimentacaoForm();    
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.id){
      this.movimentacaoService.getById(this.activatedRoute.snapshot.params.id).subscribe((movimentacao: Movimentacao) => {
          this.movimentacaoForm.controls['id'].setValue(movimentacao.id);  
          this.movimentacaoForm.controls['dataMovimentacao'].setValue(moment(movimentacao.dataMovimentacao).format("yyyy-MM-DDTHH:mm"));
          this.movimentacaoForm.controls['tipoMovimentacao'].setValue(this.enumToLabel(movimentacao.tipoMovimentacao));
          this.movimentacaoForm.controls['colaborador'].setValue(movimentacao.colaborador.nome);          
          this.imagem = "data:image/jpeg;base64," + movimentacao.imagem;
          this.imagemColaborador = "data:image/jpeg;base64," + movimentacao.colaborador.imagem;
        }, (response) => {
          this.notification.openSnackBarDanger(response.error);
        });      
    }   
  }

  createMovimentacaoForm(){
      this.movimentacaoForm = this.formBuilder.group({ 
        id: undefined,   
        dataMovimentacao: undefined,
        tipoMovimentacao: undefined,
        colaborador: undefined    
      });       
  }

  enumToLabel(tipoMovimentacao: TipoMovimentacao){
    switch(tipoMovimentacao){
      case TipoMovimentacao.Entrada: return "Entrada";
      case TipoMovimentacao.Saida: return "Saída";
    }
  } 
}
