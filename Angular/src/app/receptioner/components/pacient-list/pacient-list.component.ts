import { Component, OnInit } from '@angular/core';
import { PacientService } from '../../../services/pacient.service';
import { ConfirmationService } from 'primeng/api';
import { DataShareService } from '../../../services/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacient-list',
  templateUrl: './pacient-list.component.html',
  styleUrls: ['./pacient-list.component.css'],
  providers: [ConfirmationService]
})
export class PacientListComponent implements OnInit {
  private pacients;
  cols: any[];
  display: boolean;
  constructor(private pacientService: PacientService,
              private shareService: DataShareService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit() {
    this.cols=[
      {field: 'id', header: 'ID'},
      {field: 'nume', header: 'Nume'},
      {field: 'cnp', header: 'CNP'},
      {field: 'dataNasterii', header: 'Data nașterii'},
      {field: 'adresa', header: 'Adresa'},
      {field: 'telefon', header: 'Telefon'},
      {field: 'email', header: "Email"},
      {field: 'programare'},
      {field: 'edit'},
      {field: 'delete'}
    ]

    this.getPacients();
  }

  getPacients(){
    this.pacientService.getPacients().subscribe(
      data => {this.pacients = data},
      err => console.log(err),
      () => console.log('pacients loaded')
    );
  }

  deletePacient(pacient)
  {
    this.pacientService.deletePacient(pacient.id).subscribe();
  }

  confirm(pacient) {
    this.confirmationService.confirm({
        message: 'Sigur doriți să ștergeți pacientul?',
        header: 'Confirmare',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.deletePacient(pacient),
            location.reload()
        },
        reject: () => {
          this.ngOnInit();
        }
    });
  }

  editPacientClick(pacientId: number){
    this.router.navigate(['receptioner/editpacient', pacientId]);
  }

  addAppointmentClick(pacientId: number){
    this.shareService.sendMessage(pacientId);
    this.router.navigate(['receptioner/choosemedic']);
  }

}
