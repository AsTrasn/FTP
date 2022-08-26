import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '@modules/auth/services/auth.service'
import Swal from 'sweetalert2'
// import { SweetAlert }

@Component({
  selector: 'app-auth-pages',
  templateUrl: './auth-pages.component.html',
  styleUrls: ['./auth-pages.component.css']
})
export class AuthPagesComponent implements OnInit {
  errorSession: boolean = false
  formLogin: FormGroup = new FormGroup({})
  login:boolean = false

  constructor(private authSvc: AuthService) { }

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
    this.login = true
    const {username, password} = this.formLogin.value
    this.authSvc.login(username, password)
    .subscribe((response) => {
      if(response){
        this.login = false
      }
      return response
    },
    err=>{
      this.login = false
      this.errorSession = true
      Swal.fire({
        title: 'Error!',
        text: `${err.error.message}`,
        icon: 'error',

      })
    })
  }
}
