import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendDataService } from '@shared/services/send-data.service';

@Component({
  selector: 'app-headeruser',
  templateUrl: './headeruser.component.html',
  styleUrls: ['./headeruser.component.css']
})
export class HeaderuserComponent implements OnInit {
  username = 'Admin'
  clients: Array<string> = ['213456', '32456778', '291199834', '228117119517']

  selected: string = this.clients[0]
  constructor(private router: Router, private sendDataSvc: SendDataService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.sendDataSvc.callback.emit(this.clients[0])
    }, 500);
  }

  sendData($event:any){
    this.sendDataSvc.callback.emit($event)
  }
}
