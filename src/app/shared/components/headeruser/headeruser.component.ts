import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headeruser',
  templateUrl: './headeruser.component.html',
  styleUrls: ['./headeruser.component.css']
})
export class HeaderuserComponent implements OnInit {
  username = 'Admin'
  clients: Array<string> = ['213456', '32456778', '291199834', '228117119517']

  selected: Array<any> = ['213456']
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.selected)
  }

  goTo(client:string){
    this.router.navigate([client])
    console.log(this.selected)
  }
}
