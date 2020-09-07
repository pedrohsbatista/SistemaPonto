import { Component, OnInit } from '@angular/core';
import { App } from 'src/app/utilities/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: string;
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.usuario = window.localStorage.getItem('usuario');
  }

  logout(){
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
