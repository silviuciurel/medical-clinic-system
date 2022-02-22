import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from '../../../auth/token-storage.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {
  board: string;
  errorMessage: string;

  items1: MenuItem[];
  activeItem: MenuItem;

  constructor(private userService: UserService,
              private token: TokenStorageService) { }

  ngOnInit() {
    this.items1 = [
      {label: 'Lista pacienților', routerLink: ['/medic/pacients']},
      {label: 'Consultațiile mele', routerLink: ['/medic/consults']},
      {label: 'Programările mele', routerLink: ['/medic/appointments']},
      {label: 'Deconectare', command: (event) => {this.logout()}}
    ]

    this.userService.getMedicBoard().subscribe(
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
