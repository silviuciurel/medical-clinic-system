import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { AdminComponent } from './components/admin/admin.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MedicFormComponent } from './components/medic-form/medic-form.component';
import { ReceptionerFormComponent } from './components/receptioner-form/receptioner-form.component';
import { MedicListComponent } from './components/medic-list/medic-list.component';
import { ReceptionerListComponent } from './components/receptioner-list/receptioner-list.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'medics',
        component: MedicListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'receptioners',
        component: ReceptionerListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user/medic',
        component: MedicFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user/receptioner',
        component: ReceptionerFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edituser/:id',
        component: UserFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'editmedic/:id',
        component: MedicFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'editreceptioner/:id',
        component: ReceptionerFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'newuser',
        component: UserFormComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
