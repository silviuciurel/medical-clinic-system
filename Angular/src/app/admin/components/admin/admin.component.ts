import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MenuItem } from 'primeng/api'
import { TokenStorageService } from '../../../auth/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board: string;
  errorMessage: string;
  
  items1: MenuItem[];
  activeItem: MenuItem;

  constructor(private userService: UserService,
              private token: TokenStorageService) { }
 
  ngOnInit() {
    this.items1 = [
      {label: 'Lista utilizatorilor', routerLink: ['/admin/users']},
      {label: 'Adaugă utilizator', routerLink: ['/admin/newuser']},
      {label: 'Lista medicilor', routerLink: ['/admin/medics']},
      {label: 'Lista recepționerilor', routerLink:['/admin/receptioners']},
      {label: 'Deconectare', command: (event) => {this.logout()}}
  ];


    this.userService.getAdminBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
  logout() {
    this.token.signOut();
    window.location.reload();
  }
}