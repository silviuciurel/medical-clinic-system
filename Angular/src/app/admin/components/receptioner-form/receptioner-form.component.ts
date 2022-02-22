import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DataShareService } from '../../../services/data-share.service';
import { Receptioner } from '../../../models/receptioner';
import { ReceptionerService } from '../../../services/receptioner.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receptioner-form',
  templateUrl: './receptioner-form.component.html',
  styleUrls: ['./receptioner-form.component.css'],
  providers: [MessageService]
})
export class ReceptionerFormComponent implements OnInit {
  usernameChild: String;

  receptioner: Receptioner = {
    id: null,
    nume: null,
    email: null,
    dataAngajarii: null,
    username: null
  }
  display: boolean;
  receptionerform: FormGroup;
  submitted: boolean;
  pageTitle: String;

  constructor(private receptionerService: ReceptionerService,
              private shareService: DataShareService,
              private formBuilder: FormBuilder, 
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.display = true;

    this.shareService.castMessage.subscribe(message => this.usernameChild = message);

    this.receptionerform = this.formBuilder.group({
      nume: ['', Validators.required],
      email: [''],
      dataAngajarii: ['', Validators.required]
    })

    this.route.paramMap.subscribe(params => {
      const receptionerId = +params.get('id');
      if(receptionerId){
        this.pageTitle = "Editează recepționer";
        this.getReceptioner(receptionerId);
      }
      else{
        this.pageTitle = "Recepționer nou";
        this.receptioner = {
          id: null,
          nume: null,
          email: null,
          dataAngajarii: null,
          username: null
        }
      }
    })
  }

  MapFormValuesToReceptionerModel(){
    this.receptioner.nume = this.receptionerform.value.nume;
    this.receptioner.email = this.receptionerform.value.email;
    this.receptioner.dataAngajarii = this.receptionerform.value.dataAngajarii;
    this.receptioner.username = this.usernameChild;
  }

  getReceptioner(id: number){
    this.receptionerService.getReceptioner(id).subscribe(
      (receptioner: Receptioner) => {
        this.editReceptioner(receptioner)
        this.receptioner = receptioner
      },
      (err: any) => console.error(err)
    );
  }

  editReceptioner(receptioner: Receptioner){
    this.receptionerform.patchValue({
      nume: receptioner.nume,
      email: receptioner.email,
      dataAngajarii: receptioner.dataAngajarii
    })
  }

  onSubmit(){
    this.submitted = true;
    this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
    this.MapFormValuesToReceptionerModel();

    if(this.receptioner.id){
      this.receptionerService.updateReceptioner(this.receptioner).subscribe(
        () => this.router.navigate(['admin/receptioners']),
        err => console.error(err)
      );
    }
    else{
      this.receptionerService.createReceptioner(this.receptioner).subscribe(
        data => {
          console.log(data);
        },
        err => console.error(err),
        () => this.router.navigate(['admin/receptioners']),
        )
    }
  }

  onCancel(){
    if(this.receptioner.id){
      this.router.navigate(['admin/receptioners']);
    }
    else{
      this.router.navigate(['admin/users']);
    }
  }

  get diagnostic() {return JSON.stringify(this.receptionerform.value);}

}
