import { Component, OnInit } from '@angular/core';
import { PacientService } from '../../../services/pacient.service';
import { DataShareService } from '../../../services/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacient-list',
  templateUrl: './pacient-list.component.html',
  styleUrls: ['./pacient-list.component.css']
})
export class PacientListComponent implements OnInit {
  private pacients;
  cols: any[];
  constructor(private pacientService: PacientService,
              private shareService: DataShareService,
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
      {field: 'edit'}
    ]
    
    this.getPacientsMedic();
  }
  getPacientsMedic(){
    this.pacientService.getPacientsMedic().subscribe(
      data => {this.pacients = data},
      err => console.log(err),
      () => console.log('pacients loaded')
    );
  }

  createConsultClick(id: String){
    this.shareService.sendMessage(id);
    this.router.navigate(['/medic/newconsult']);
  }

}
