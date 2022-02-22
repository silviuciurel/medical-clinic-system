import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { ReceptionerComponent } from './components/receptioner/receptioner.component';
import { PacientListComponent } from './components/pacient-list/pacient-list.component';
import { PacientFormComponent } from './components/pacient-form/pacient-form.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { ChooseMedicComponent } from './components/choose-medic/choose-medic.component';


const routes: Routes = [
  {
    path: 'receptioner',
    component: ReceptionerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'pacients',
        component: PacientListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'newpacient',
        component: PacientFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'appointments/:id',
        component: AppointmentsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'choosemedic',
        component: ChooseMedicComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'editpacient/:id',
        component: PacientFormComponent,
        canActivate: [AuthGuard]
      }
    ]
  } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionerRoutingModule { }
