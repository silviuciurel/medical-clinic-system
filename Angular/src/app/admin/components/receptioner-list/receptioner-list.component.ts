import { Component, OnInit } from '@angular/core';
import { ReceptionerService } from '../../../services/receptioner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receptioner-list',
  templateUrl: './receptioner-list.component.html',
  styleUrls: ['./receptioner-list.component.css']
})
export class ReceptionerListComponent implements OnInit {
  private receptioners;
  display: boolean;

  constructor(private receptionerService: ReceptionerService,
              private router: Router) { }

  ngOnInit() {
    this.getReceptioners();
  }

  getReceptioners(){
    this.receptionerService.getReceptioners().subscribe(
      data => {this.receptioners = data},
      err => console.log(err),
      () => console.log("receptioners loaded")
    );
  }

  editReceptionerClick(receptionerId: number){
    this.router.navigate(['admin/editreceptioner', receptionerId]);
  }

}
