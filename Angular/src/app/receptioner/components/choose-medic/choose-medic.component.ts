import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicService } from '../../../services/medic.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-choose-medic',
  templateUrl: './choose-medic.component.html',
  styleUrls: ['./choose-medic.component.css']
})
export class ChooseMedicComponent implements OnInit {

  medicform: FormGroup;
  display: boolean;
  submitted: boolean;
  private medics;

  constructor(private formBuilder: FormBuilder,
              private medicService: MedicService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMedics();
    this.display = true;

    this.medicform = this.formBuilder.group({
      medic: ['', Validators.required]
    })
  }

  getMedics(){
    this.medicService.getMedics().subscribe(
      data => {this.medics = data},
      err => console.error(err)
    )
  }

  onSubmit(){
    this.submitted = true;
    this.router.navigate(['receptioner/appointments', this.medicform.value.medic.id]);
  }

}
