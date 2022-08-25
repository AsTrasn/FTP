import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateService } from '@modules/updateuser/services/update.service';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  formUpdate: FormGroup = new FormGroup({})

  constructor(private updatePassSvc: UpdateService) { }

  ngOnInit(): void {
    this.formUpdate = new FormGroup({
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

  update(): void{
    const { username, password } = this.formUpdate.value
    console.log(username, password)
    this.updatePassSvc.updatePassword$(username, password).subscribe(
      res => {
        if(res){
          Swal.fire(
            'Contraseña actualizada',
            `Sus nuevas credenciales de acceso son:<br>
              <strong>Usuario:</strong> ${username}<br> <strong>Contraseña:</strong> ${password}`
          )
        }
      }
    )
  }
}
