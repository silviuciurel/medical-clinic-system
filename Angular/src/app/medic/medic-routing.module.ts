import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { MedicComponent} from './components/medic/medic.component';
import { ConsultFormComponent } from './components/consult-form/consult-form.component';
import { PacientListComponent } from './components/pacient-list/pacient-list.component';
import { ConsultListComponent } from './components/consult-list/consult-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';

const routes: Routes = [
  {
    path: 'medic',
    component: MedicComponent,
    canActivate: [AuthGuard],
    children: [
    {
      path: 'pacients',
      component: PacientListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'newconsult',
      component: ConsultFormComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'consults',
      component: ConsultListComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'appointments',
      component: AppointmentListComponent,
      canActivate: [AuthGuard]
    }
    ]
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MedicRoutingModule { }