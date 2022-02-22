import { Component, OnInit } from '@angular/core';
import { ConsultService } from '../../../services/consult.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Pacient } from 'src/app/models/pacient';

@Component({
  selector: 'app-consult-list',
  templateUrl: './consult-list.component.html',
  styleUrls: ['./consult-list.component.css']
})
export class ConsultListComponent implements OnInit {
  private consults;
  cols: any[];
  medicUsername: String;

  constructor(private consultService: ConsultService,
              private token: TokenStorageService) { }

  ngOnInit() {
    this.medicUsername = this.token.getUsername();

    this.cols=[
      {field: 'pacient', header: 'Nume pacient'},
      {field: 'cnp', header: 'CNP pacient'},
      {field: 'dataConsult', header: 'Data consultației'},
      {field: 'anamneza', header: 'Anamneza'},
      {field: 'diagnostic', header:'Diagnostic'}
    ]

    this.getConsultsMedic();
    }

  getConsultsMedic(){
    this.consultService.getConsultsMedic(this.medicUsername).subscribe(
      data => {this.consults = data},
      err => console.error(err),
      () => console.log('consults loaded')
    );
  }
}

