import { NgModule } from '@angular/core';

import { MedicRoutingModule } from './medic-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MedicComponent } from './components/medic/medic.component';
import { PacientListComponent } from './components/pacient-list/pacient-list.component';
import { ConsultFormComponent } from './components/consult-form/consult-form.component';
import { ConsultListComponent } from './components/consult-list/consult-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';

@NgModule({
  declarations: [
    MedicComponent,
    PacientListComponent,
    ConsultFormComponent,
    ConsultListComponent,
    AppointmentListComponent
  ],
  imports: [
    MedicRoutingModule,
    SharedModule
  ]
})
export class MedicModule { }
