import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from '../../../auth/token-storage.service';

@Component({
  selector: 'app-receptioner',
  templateUrl: './receptioner.component.html',
  styleUrls: ['./receptioner.component.css']
})
export class ReceptionerComponent implements OnInit {
  board: string;
  errorMessage: string;
 
  items1: MenuItem[];
  activeItem: MenuItem;

  constructor(private userService: UserService,
              private token: TokenStorageService) { }
 
  ngOnInit() {
    this.items1 = [
      {label: 'Lista pacienților', routerLink: ['/receptioner/pacients']},
      {label: 'Adaugă pacient', routerLink: ['/receptioner/newpacient']},
      {label: 'Deconectare', command: (event) => {this.logout()}}
  ];

    this.userService.getReceptionerBoard().subscribe(
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
