import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '@shared/components/dialog/dialog.component'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({})

  toppings = new FormControl('')
  toppingList: string[] = ['admin', 'user', 'mod']

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ])
    })
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        animal: 'panda',
        name: 'juan'
      },
    });
  }

  register():void{
    const {username, password} = this.formLogin.value
    console.log(username, password)
  }
}
