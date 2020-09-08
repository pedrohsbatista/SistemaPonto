import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from  '@angular/forms';
import { SetorService } from 'src/app/services/setor.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Setor } from 'src/app/models/entidades/setor';
import { NotificationService } from 'src/app/utilities/notification.service';

@Component({
  selector: 'app-setor-form',
  templateUrl: './setor-form.component.html',
  styleUrls: ['./setor-form.component.css']
})
export class SetorFormComponent implements OnInit {

  setorForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private setorService: SetorService, 
    private router: Router, private activatedRoute: ActivatedRoute, private notification: NotificationService) { 
    this.createSetorForm();    
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.id){
      this.setorService.getById(this.activatedRoute.snapshot.params.id).subscribe((setor: Setor) => {
        this.setorForm.controls['id'].setValue(setor.id);
        this.setorForm.controls['nome'].setValue(setor.nome);         
      }, (response) => {
        this.notification.openSnackBarDanger(response.error);
      });    
    }   
  }

  createSetorForm(){
      this.setorForm = this.formBuilder.group({ 
        id: undefined,   
        nome: [undefined, [Validators.required, Validators.maxLength(100)]]
      });       
  }

  save() {
    if(this.setorForm.valid){
      var dados = this.setorForm.value;
      if (dados.id){
        this.setorService.put(this.setorForm.value).subscribe((success) => {
          this.router.navigate(['/setor']);
        }, (response) => {
          this.notification.openSnackBarDanger(response.error);
        });
      } else {
        this.setorService.post(this.setorForm.value).subscribe((success) => {
          this.router.navigate(['/setor']);
        }, (response) => {
          this.notification.openSnackBarDanger(response.error);
        });
      }
    }    
  }
}
