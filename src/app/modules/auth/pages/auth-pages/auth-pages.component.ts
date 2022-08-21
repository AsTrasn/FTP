import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-pages',
  templateUrl: './auth-pages.component.html',
  styleUrls: ['./auth-pages.component.css']
})
export class AuthPagesComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({})
  constructor() { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  sendLogin(): void{
    const body = this.formLogin.value
    console.log(body)
  }
}
