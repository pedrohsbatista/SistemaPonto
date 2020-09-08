import { Component, OnInit } from '@angular/core';
import { Movimentacao } from 'src/app/models/entidades/movimentacao';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovimentacaoService } from 'src/app/services/movimentacao.service';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-movimentacao-form',
  templateUrl: './movimentacao-form.component.html',
  styleUrls: ['./movimentacao-form.component.css']
})
export class MovimentacaoFormComponent implements OnInit {

  movimentacaoForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private movimentacaoService: MovimentacaoService, 
    private activatedRoute: ActivatedRoute, private notification : NotificationService) { 
    this.createMovimentacaoForm();    
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.id){
      this.movimentacaoService.getById(this.activatedRoute.snapshot.params.id).subscribe((movimentacao: Movimentacao) => {
        this.movimentacaoForm = this.formBuilder.group({  
          id: movimentacao.id,  
          dataMovimentacao: movimentacao.dataMovimentacao   
        }, (response) => {
          this.notification.openSnackBarDanger(response.error);
        });
      });    
    }   
  }

  createMovimentacaoForm(){
      this.movimentacaoForm = this.formBuilder.group({    
        dataMovimentacao: undefined     
      });       
  }
}
