import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NotificationService } from '../../utilities/notification.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService,
    private notification: NotificationService) {
     this.createLoginForm();
  }

  ngOnInit(): void {
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
        login: [undefined, [Validators.required]],
        senha: [undefined, [Validators.required]]
    });
  } 
  
  logar(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value).subscribe((success) => {
        window.localStorage.setItem('usuario', success.usuario);
        window.localStorage.setItem('token', success.token);
        this.router.navigate(['/movimentacao']);
      }, (response) => {
        this.notification.openSnackBarDanger(response.error);
      });
    }
  }
}