import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAppointmentsMedic(id: Number){
    return this.http.get(this.baseUrl+'/appointments/'+id);
  }

  getAppointmentsMedicUsername(username: String){
    return this.http.get(this.baseUrl+'/appointment/'+username);
  }

  createAppointment(appointment: Appointment): Observable<Appointment>{
    const body = JSON.stringify(appointment);
    return this.http.post<Appointment>(this.baseUrl+'/newappointment', body, httpOptions);
  }

  deleteAppointment(id: Number){
    return this.http.delete(this.baseUrl+'/deleteappointment/'+id, httpOptions);
  }
}
