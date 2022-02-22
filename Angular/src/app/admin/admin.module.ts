import { NgModule } from '@angular/core';


import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './components/admin/admin.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReceptionerFormComponent } from './components/receptioner-form/receptioner-form.component';
import { MedicFormComponent } from './components/medic-form/medic-form.component';
import { MedicListComponent } from './components/medic-list/medic-list.component';
import { ReceptionerListComponent } from './components/receptioner-list/receptioner-list.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    UserListComponent,
    UserFormComponent,
    MedicListComponent,
    MedicFormComponent,
    ReceptionerListComponent,
    ReceptionerFormComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
