import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  mainMenu: {
    defaultOptions: Array<any>
  } = { defaultOptions: []}

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions=[
      {
        name: 'Inicio',
        icon: 'uil uil-estate',
        router: ['/']
      },
      // {
      //   name: 'Admin',
      //   icon: 'uil uil-shield-exclamation',
      //   router: ['/', 'admin']
      // },
      {
        name: 'Agregar Usuario',
        icon: 'uil uil-plus',
        router: ['/', 'register']
      },
      {
        name: 'Actualizar Usuario',
        icon: 'uil uil-edit-alt',
        router: ['/', 'actualizar']
      },
    ]
  }
}
