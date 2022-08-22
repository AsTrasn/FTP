import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { SendDataService } from '@shared/services/send-data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-headeruser',
  templateUrl: './headeruser.component.html',
  styleUrls: ['./headeruser.component.css']
})
export class HeaderuserComponent implements OnInit {
  username = 'Admin'
  clients: Array<string> = []

  selected: string = this.clients[0]
  clientCodes:any

  constructor(private router: Router, private sendDataSvc: SendDataService, private cookie: CookieService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.sendDataSvc.callback.emit(this.clients[0])
    }, 500);

    let user_data = this.cookie.get('user_info')
    this.clientCodes = JSON.parse(user_data)
    this.clientCodes = Object.values(this.clientCodes.clientCodes[0])
    
    this.clientCodes.map((code:string) => {
      if(code) this.clients.push(code)
    })
    this.selected = this.clients[0]
  }

  sendData($event:any){
    this.sendDataSvc.callback.emit($event)
  }

  searchRem($event:any){
    this.sendDataSvc.searchRem.emit($event)
  }
}
