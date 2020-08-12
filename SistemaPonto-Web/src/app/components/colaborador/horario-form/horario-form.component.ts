import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { DiaSemana } from 'src/app/models/enums/dia-semana.enum';
import { newArray } from '@angular/compiler/src/util';
import { MatDialogRef } from '@angular/material/dialog';
import { ColaboradorFormComponent } from '../form/colaborador-form.component';
import { Horario } from 'src/app/models/entidades/horario';

@Component({
  selector: 'app-horario-form',
  templateUrl: './horario-form.component.html',
  styleUrls: ['./horario-form.component.css']
})
export class HorarioFormComponent implements OnInit {
  horarioForm: FormGroup;
  dias = [
    { value: DiaSemana.Domingo, text: "Dom" },
    { value: DiaSemana.Segunda, text: "Seg" },
    { value: DiaSemana.Terca, text: "Ter" },
    { value: DiaSemana.Quarta, text: "Quar" },
    { value: DiaSemana.Quinta, text: "Qui" },
    { value: DiaSemana.Sexta, text: "Sex" },
    { value: DiaSemana.Sabado, text: "Sáb" }    
  ];
  isValidate: boolean = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<ColaboradorFormComponent>) { 
    this.createHorarioForm();
  }

  ngOnInit(): void {
  }

  createHorarioForm(){
    this.horarioForm = this.formBuilder.group({
      dias: new FormArray([], minSelecionado()),
      inicio: [undefined, [Validators.required]],
      fim: [undefined, [Validators.required]]
    });
    this.addCheckboxes();
  }

  get diasFormArray() {
    return this.horarioForm.controls.dias as FormArray;
  }

  addCheckboxes(){
    this.dias.forEach(() => this.diasFormArray.push(new FormControl(false)))
  }

  cancelar() {
    this.dialogRef.close();
  }

  adicionar() {
    this.isValidate = true;
    if(this.horarioForm.valid){
      var horarios: Horario[] = [];

      var diasSelecionado = this.horarioForm.value.dias
      .map((checked, i) => checked ? this.dias[i].value : null)
      .filter(v => v !== null);

      diasSelecionado.forEach(element => {
        var horario = {
          diaSemana: element,
          inicio: this.horarioForm.controls.inicio.value,
          fim: this.horarioForm.controls.fim.value
        } as Horario;
     
        horarios.push(horario);
      });

      this.dialogRef.close(horarios);
    }
  }
}

function minSelecionado(min = 1) {
  const validator: ValidatorFn = (formArray : FormArray) => {
    const totalSelecionado = formArray.controls.map(control => control.value).reduce((prev, next) => next ? prev + next : prev, 0);
    return totalSelecionado >= min ? null : { "customValidator" : "Selecione pelo menos " + min };
  };
  return validator;
}
