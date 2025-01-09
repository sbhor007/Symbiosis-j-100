import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import path from 'path';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // navMenus:any = ['Home','Movies']
  navMenus:any = [
    {
      item:'Home',
      path:''
    },{
      item:'Movies',
      path:'/home/movies'
    },
    {
      item:'Feedback',
      path:'/home/footer'
    }
  ]
}
