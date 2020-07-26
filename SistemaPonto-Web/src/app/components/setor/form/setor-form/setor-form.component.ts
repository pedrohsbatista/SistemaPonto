import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from  '@angular/forms';
import { SetorService } from 'src/app/services/setor.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Setor } from 'src/app/models/setor';

@Component({
  selector: 'app-setor-form',
  templateUrl: './setor-form.component.html',
  styleUrls: ['./setor-form.component.css']
})
export class SetorFormComponent implements OnInit {

  setorForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private setorService: SetorService, 
    private router: Router, private activatedRoute: ActivatedRoute) { 
    this.createSetorForm();    
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.id){
      this.setorService.getById(this.activatedRoute.snapshot.params.id).subscribe((setor: Setor) => {
        this.setorForm = this.formBuilder.group({  
          id: setor.id,  
          nome: setor.nome     
        });
      });    
    }   
  }

  createSetorForm(){
      this.setorForm = this.formBuilder.group({    
        nome: undefined     
      });       
  }

  save() {
    this.setorService.save(this.setorForm.value).subscribe((success) => {
      this.router.navigate(['/setor']);
    });;
  }

}
