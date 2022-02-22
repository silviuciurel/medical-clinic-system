import { Component, OnInit, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { User } from '../../../models/user';
import { Medic } from '../../../models/medic';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { UserService } from '../../../services/user.service';
import { MedicService } from '../../../services/medic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataShareService } from '../../../services/data-share.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers: [MessageService]
})
export class UserFormComponent implements OnInit {
  user: User = {
    id: null,
    username: null,
    password: null,
    role: null
  };
  display: boolean;
  userform: FormGroup;
  submitted: boolean;
  roles: SelectItem[];
  pageTitle: String;

  constructor(private userService: UserService, 
              private shareService: DataShareService, 
              private fb: FormBuilder, 
              private messageService: MessageService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.display = true;

    this.userform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      role: ['', Validators.required],
    });

    this.roles = [];
    this.roles.push({label: 'Selectează rolul utilizatorului', value:''});
    this.roles.push({label: 'administrator', value:'ROLE_ADMIN'});
    this.roles.push({label: 'medic', value:'ROLE_MEDIC'});
    this.roles.push({label: 'receptioner', value:'ROLE_RECEPTIONER'});
    
    this.route.paramMap.subscribe(params => {
      const userId = +params.get('id');
      if(userId){
        this.pageTitle = "Editează utilizator";
        this.getUser(userId);
      }
      else{
        this.pageTitle = "Utilizator nou";
        this.user = {
          id: null,
          username: null,
          password: null,
          role: null
        }
      }
    });

    /*this.userform.get('role').valueChanges.subscribe(role => {
      //if (role == 'ROLE_ADMIN')
        //this.userform.get('medicform').reset();
        //this.userform['controls'].medicform.disable();
      //if (role == 'ROLE_MEDIC')
        //this.userform['controls'].medicform.enable();
      switch (role) {
        case "ROLE_ADMIN":
        this.userform.get('medicform').reset();
        this.userform['controls'].medicform.disable();
        break;
        case "ROLE_MEDIC":
        this.userform['controls'].medicform.enable();
        break;
        case "ROLE_RECEPTIONER":
        this.userform.controls.medicform.disable();
      } 
    })*/
  }

  MapFormValuesToUserModel(){
    this.user.username = this.userform.value.username;
    this.user.password = this.userform.value.password;
    this.user.role = this.userform.value.role;
  }

  getUser(id: number){
    this.userService.getUser(id).subscribe(
      (user: User) => {
        this.editUser(user)
        this.user = user
      },
      (err: any) => console.error(err)
    );
  }

  editUser(user: User){
    this.userform.patchValue({
      username: user.username,
      password: user.password,
      role: user.role
    });
  }



  onSubmit(){
    this.submitted = true;
    this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
    this.MapFormValuesToUserModel();

    this.shareService.sendMessage(this.user.username);
    
    if(this.user.id){
      this.userService.updateUser(this.user).subscribe(
        () => this.router.navigate(['admin/users']),
        err => console.log(err)
        );
    }
    else{
      this.userService.createUser(this.user).subscribe(
        data => {
          console.log(data);
        },
        err => console.log(err),
      )
  
      switch (this.user.role){
        case "ROLE_MEDIC":
        
        this.router.navigateByUrl("admin/user/medic");
        
        break;
        case "ROLE_RECEPTIONER":
        this.router.navigateByUrl("admin/user/receptioner");
        break;
      }
    }
  }



  get diagnostic() {return JSON.stringify(this.userform.value);}

}
