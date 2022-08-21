import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headeruser',
  templateUrl: './headeruser.component.html',
  styleUrls: ['./headeruser.component.css']
})
export class HeaderuserComponent implements OnInit {
  username = 'Admin'
  clients: Array<string> = ['213456', '32456778', '291199834']

  selected: Array<any> = ['213456']
  constructor() { }

  ngOnInit(): void {
  }

}
