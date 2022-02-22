import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedModule } from '../shared/shared.module';
import { ReceptionerRoutingModule } from './receptioner-routing.module';

import { ReceptionerComponent } from './components/receptioner/receptioner.component';
import { PacientListComponent } from './components/pacient-list/pacient-list.component';
import { PacientFormComponent } from './components/pacient-form/pacient-form.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ChooseMedicComponent } from './components/choose-medic/choose-medic.component';

@NgModule({
  declarations: [
    ReceptionerComponent,
    PacientListComponent,
    PacientFormComponent,
    AppointmentsComponent,
    ChooseMedicComponent
  ],
  imports: [
    ReceptionerRoutingModule,
    SharedModule,
    FullCalendarModule
  ]
})
export class ReceptionerModule { }
