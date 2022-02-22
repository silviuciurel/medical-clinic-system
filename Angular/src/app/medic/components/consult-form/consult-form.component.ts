import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Consult } from '../../../models/consult';
import { MessageService } from 'primeng/api';
import { ConsultService } from '../../../services/consult.service';
import { DiagnosticService } from '../../../services/diagnostic.service';
import { DataShareService } from '../../../services/data-share.service';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consult-form',
  templateUrl: './consult-form.component.html',
  styleUrls: ['./consult-form.component.css'],
  providers: [MessageService]
})
export class ConsultFormComponent implements OnInit {

  consult: Consult = {
    id: null,
    dataConsult: null,
    anamneza: null,
    diagnostic: null,
    medicUsername: null,
    pacientId: null,
    pacient: null
  }

  pacientId: String;
  medicUsername: String;
  diagnostics: any;
  display: boolean;
  consultform: FormGroup;
  submitted: boolean;
  pageTitle: String;

  constructor(private consultService: ConsultService,
              private diagnosticService: DiagnosticService,
              private shareService: DataShareService,
              private token: TokenStorageService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDiagnostics();

    this.display = true;

    this.shareService.castMessage.subscribe(message => this.pacientId = message);
    this.medicUsername = this.token.getUsername();

    this.consultform = this.formBuilder.group({
      dataConsult: ['', Validators.required],
      anamneza: ['', Validators.required],
      diagnostic: ['', Validators.required]
    })

    this.route.paramMap.subscribe(params => {
      const consultId = +params.get('id');
      if(consultId){
        this.pageTitle = "Detalii consultație";
        this.getConsult(consultId);
      }
      else{
        this.pageTitle = "Consultație nouă";
        this.consult  = {
          id: null,
          dataConsult: null,
          anamneza: null,
          diagnostic: null,
          medicUsername: null,
          pacientId: null,
          pacient: null
        }
      }
    })
  }

  getDiagnostics(){
    this.diagnosticService.getDiagnostics().subscribe(
      data => {this.diagnostics = data},
      err => console.error(err),
      () => console.log('Diagnostics loaded')
    );
  }

  MapFormValuesToConsultModel(){
    this.consult.dataConsult = this.consultform.value.dataConsult;
    this.consult.anamneza = this.consultform.value.anamneza;
    this.consult.diagnostic = this.consultform.value.diagnostic;
    this.consult.medicUsername = this.medicUsername;
    this.consult.pacientId = this.pacientId;
  }

  getConsult(id: number){
    this.consultService.getConsult(id).subscribe(
      (consult: Consult)  => {
        this.viewConsult(consult)
        this.consult = consult
      },
      (err: any) => console.error(err)
    );
  }

  viewConsult(consult: Consult){
    this.consultform.patchValue({
      dataConsult: consult.dataConsult,
      anamneza: consult.anamneza
    })
  }

  onSubmit(){
    this.submitted = true;
    this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
    this.MapFormValuesToConsultModel();

    this.consultService.createConsult(this.consult).subscribe(
      data => {
        console.log(data);
      },
      err => console.error(err),
      () => this.router.navigate(['medic/consults'])
    )
  }


  get diagnostic() {return JSON.stringify(this.consultform.value)+JSON.stringify(this.consult)}
}
