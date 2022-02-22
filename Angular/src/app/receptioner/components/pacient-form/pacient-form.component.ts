import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DataShareService } from '../../../services/data-share.service';
import { Pacient } from '../../../models/pacient';
import { PacientService } from '../../../services/pacient.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pacient-form',
  templateUrl: './pacient-form.component.html',
  styleUrls: ['./pacient-form.component.css'],
  providers: [MessageService]
})
export class PacientFormComponent implements OnInit {

  pacient: Pacient = {
    id: null,
    nume: null,
    cnp: null,
    dataNasterii: null,
    adresa: null,
    telefon: null,
    email: null
  }
  display: boolean;
  pacientform: FormGroup;
  submitted: boolean;
  pageTitle: String;


  constructor(private pacientService: PacientService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.display = true;

    this.pacientform = this.formBuilder.group({
      nume: ['', Validators.required],
      cnp: ['', Validators.compose([Validators.required, Validators.minLength(13), Validators.maxLength(13)])],
      dataNasterii: ['', Validators.required],
      adresa: ['', Validators.required],
      telefon: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(15)])],
      email: ['']
    })

    this.route.paramMap.subscribe(params => {
      const pacientId = +params.get('id');
      if (pacientId) {
        this.pageTitle = "Editează pacient";
        this.getPacient(pacientId);
      }
      else {
        this.pageTitle = "Pacient nou";
        this.pacient = {
          id: null,
          nume: null,
          cnp: null,
          dataNasterii: null,
          adresa: null,
          telefon: null,
          email: null
        }
      }
    })


  }

  MapFormValuesToPacientModel() {
    this.pacient.nume = this.pacientform.value.nume;
    this.pacient.cnp = this.pacientform.value.cnp;
    this.pacient.dataNasterii = this.pacientform.value.dataNasterii;
    this.pacient.adresa = this.pacientform.value.adresa;
    this.pacient.telefon = this.pacientform.value.telefon;
    this.pacient.email = this.pacientform.value.email;
  }

  getPacient(id: number) {
    this.pacientService.getPacient(id).subscribe(
      (pacient: Pacient) => {
        this.editPacient(pacient)
        this.pacient = pacient
      },
      (err: any) => console.error(err)
    );
  }

  editPacient(pacient: Pacient) {
    this.pacientform.patchValue({
      nume: pacient.nume,
      cnp: pacient.cnp,
      dataNasterii: pacient.dataNasterii,
      adresa: pacient.adresa,
      telefon: pacient.telefon,
      email: pacient.email
    })
  }

  onSubmit() {
    this.submitted = true;
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
    this.MapFormValuesToPacientModel();
    if (this.pacient.id) {
      this.pacientService.updatePacient(this.pacient).subscribe(
        () => this.router.navigate(['receptioner/pacients']),
        err => console.error(err)
      );
    }
    else {
      this.pacientService.createPacient(this.pacient).subscribe(
        data => {
          console.log(data);
        },
        err => console.log(err),
        () => this.router.navigate(['receptioner/pacients'])
      )
    }
  }

  get diagnostic() { return JSON.stringify(this.pacientform.value) }

}
