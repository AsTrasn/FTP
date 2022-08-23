import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { ClientService } from '@modules/register/services/client.service'
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
  dataClients:any=[]

  constructor(public dialog: MatDialog, private clientSvc: ClientService) { }

  async ngOnInit():Promise<void> {
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
      ]),
      role: new FormControl('',[
        Validators.required
      ])
    })
    this.getClient()
  }
  
  async openDialog() {
    this.dialog.open(DialogComponent, {
      data: this.dataClients
    });
  }

  register():void{
    const {username, password} = this.formLogin.value
  }

  getClient(){
    this.clientSvc.getAllClients$().subscribe((response:any) => {
      response.map((el:any) => {
        this.dataClients.push(el)
      })
      console.log(response)
    })
  }
}
