import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin:boolean = false

  mainMenu: {
    defaultOptions: Array<any>
  } = { defaultOptions: []}

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.authSvc.Admin.subscribe(res => this.isAdmin = res)

    if(this.isAdmin){ // Admin | Moderator menu
      this.mainMenu.defaultOptions=[
        {
          name: 'Remesas',
          icon: 'uil uil-estate',
          router: ['/'],
        },
        {
          name: 'Agregar Usuario',
          icon: 'uil uil-plus',
          router: ['/', 'register'],
        },
        {
          name: 'Actualizar Usuario',
          icon: 'uil uil-edit-alt',
          router: ['/', 'actualizar']
        },
      ]
    }else{ // User menu
      this.mainMenu.defaultOptions=[
        {
          name: 'Remesas',
          icon: 'uil uil-estate',
          router: ['/'],
        },
      ]
    }
  }
}
