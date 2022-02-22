import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MedicModule } from './medic/medic.module';
import { ReceptionerModule } from './receptioner/receptioner.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { DataShareService } from './services/data-share.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    AuthModule,
    SharedModule,
    AdminModule,
    MedicModule,
    ReceptionerModule,
    AppRoutingModule,
    
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders, UserService, DataShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
