import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [ConfirmationService]
})
export class UserListComponent implements OnInit {
  private users;
  display: boolean;

  constructor(private userService: UserService,
              private confirmationService: ConfirmationService, 
              private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => { this.users = data },
      err => console.error(err),
      () => console.log('users loaded')
    );
  }

  deleteUser(user)
  {
    this.userService.deleteUser(user.id).subscribe();
    
  }

  confirm(user) {
    this.confirmationService.confirm({
        message: 'Sigur doriți să ștergeți utilizatorul?',
        header: 'Confirmare',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.deleteUser(user),
            location.reload()       
        },
        reject: () => {
          this.ngOnInit();
        }
    });
}

  editUserClick(userId: number){
    this.router.navigate(['admin/edituser', userId]);

  }

}
