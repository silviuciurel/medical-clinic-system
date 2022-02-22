import { Component, OnInit } from '@angular/core';
import { MedicService } from '../../../services/medic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.css']
})
export class MedicListComponent implements OnInit {
  private medics;
  display: boolean;

  constructor(private medicService: MedicService,
              private router: Router) { }

  ngOnInit() {
    this.getMedics();
  }

  getMedics(){
    this.medicService.getMedics().subscribe(
      data => {this.medics = data},
      err => console.log(err),
      () => console.log('medics loaded')
    );
  }

  editMedicClick(medicId: number){
    this.router.navigate(['admin/editmedic', medicId]);
  }

}
