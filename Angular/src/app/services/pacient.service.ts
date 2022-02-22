import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pacient } from '../models/pacient';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PacientService {
  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getPacients(){
    return this.http.get(this.baseUrl+'/pacients');
  }

  getPacientsMedic(){
    return this.http.get(this.baseUrl+'/medic/pacients');
  }

  getPacient(id: Number){
    return this.http.get(this.baseUrl+'/pacient/'+id);
  }

  createPacient(pacient: Pacient): Observable<Pacient>{
    const body = JSON.stringify(pacient);
    return this.http.post<Pacient>(this.baseUrl+'/newpacient', body, httpOptions);
  }

  updatePacient(pacient: Pacient): Observable<Pacient>{
    const body = JSON.stringify(pacient);
    return this.http.put<Pacient>(this.baseUrl+'/editpacient/'+pacient.id, body, httpOptions);
  }

  deletePacient(id: Number){
    return this.http.delete(this.baseUrl+'/deletepacient/'+id, httpOptions);
  }
}
