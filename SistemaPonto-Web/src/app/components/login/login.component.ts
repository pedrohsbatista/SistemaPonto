import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { App } from 'src/app/utilities/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
     this.createLoginForm();
  }

  ngOnInit(): void {
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
        login: undefined,
        senha: undefined
    });
  }
  
  logar(){
    this.loginService.login(this.loginForm.value).subscribe((success) => {
      App.usuario = success.usuario;
      window.localStorage.setItem('token', success.token);
      this.router.navigate(['/setor']);
    });
  }
}