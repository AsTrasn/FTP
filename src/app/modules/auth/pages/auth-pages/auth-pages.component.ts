import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '@modules/auth/services/auth.service'
// import { SweetAlert }

@Component({
  selector: 'app-auth-pages',
  templateUrl: './auth-pages.component.html',
  styleUrls: ['./auth-pages.component.css']
})
export class AuthPagesComponent implements OnInit {
  errorSession: boolean = false
  formLogin: FormGroup = new FormGroup({})
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
    const {username, password} = this.formLogin.value
    this.authSvc.login(username, password)
    .subscribe((response) => {
      console.log(response)
    },
    err=>{
      this.errorSession = true
      console.log(err.error.message)
    })
  }
}
