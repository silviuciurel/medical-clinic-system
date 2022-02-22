import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicService } from '../../../services/medic.service';
import { Medic } from '../../../models/medic';
import { MessageService } from 'primeng/api';
import { DataShareService } from '../../../services/data-share.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medic-form',
  templateUrl: './medic-form.component.html',
  styleUrls: ['./medic-form.component.css'],
  providers: [MessageService]
})
export class MedicFormComponent implements OnInit {
  
  usernameChild: String;

  medic: Medic = {
    id: null,
    nume: null,
    codParafa: null,
    specialitate: null,
    email: null,
    dataAngajarii: null,
    username: null
  }
  display: boolean;
  medicform: FormGroup;
  submitted: boolean;
  pageTitle: String;

  constructor(private medicService: MedicService,
              private shareService: DataShareService, 
              private formBuilder: FormBuilder, 
              private messageService: MessageService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  this.display = true;

  this.shareService.castMessage.subscribe(message => this.usernameChild = message);


  this.medicform = this.formBuilder.group({
    nume: ['', Validators.required],
    codParafa: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    specialitate: ['', Validators.required],
    email: [''],
    dataAngajarii: ['', Validators.required]
  })

  this.route.paramMap.subscribe(params => {
    const medicId = +params.get('id');
    if(medicId){
      this.pageTitle = "Editează medic";
      this.getMedic(medicId);
    }
    else{
      this.pageTitle = "Medic nou";
      this.medic  = {
        id: null,
        nume: null,
        codParafa: null,
        specialitate: null,
        email: null,
        dataAngajarii: null,
        username: null
      }
    }
  })
  }

  MapFormValuesToMedicModel(){
    this.medic.nume = this.medicform.value.nume;
    this.medic.codParafa = this.medicform.value.codParafa;
    this.medic.specialitate = this.medicform.value.specialitate;
    this.medic.email = this.medicform.value.email;
    this.medic.dataAngajarii = this.medicform.value.dataAngajarii;
    this.medic.username = this.usernameChild;
  }

  getMedic(id: number){
    this.medicService.getMedic(id).subscribe(
      (medic: Medic) => {
        this.editMedic(medic)
        this.medic = medic
      },
      (err: any) => console.error(err)
    );
  }

  editMedic(medic: Medic){
    this.medicform.patchValue({
      nume: medic.nume,
      codParafa: medic.codParafa,
      specialitate: medic.specialitate,
      email: medic.email,
      dataAngajarii: medic.dataAngajarii
    })
  }

  onSubmit(){
    this.submitted = true;
    this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
    this.MapFormValuesToMedicModel();

    if(this.medic.id){
      this.medicService.updateMedic(this.medic).subscribe(
        () => this.router.navigate(['admin/medics']),
        err => console.error(err)
      );
    }
      else{
        this.medicService.createMedic(this.medic).subscribe(
          data => {
            console.log(data);
          },
          err => console.error(err),
          () => this.router.navigate(['admin/medics']),
          )
        }
  }

  onCancel(){
    if(this.medic.id){
      this.router.navigate(['admin/medics']);
    }
    else{
      this.router.navigate(['admin/users']);
    }
  }

  get diagnostic() {return JSON.stringify(this.medicform.value)}

}
