import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medic } from '../models/medic';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MedicService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getMedics(){
    return this.http.get(this.baseUrl+'/admin/medics');
  }

  getMedic(id: Number): Observable<Medic>{
    return this.http.get<Medic>(this.baseUrl+'/medic/'+id);
  }

  createMedic(medic: Medic): Observable<Medic>{
    const body = JSON.stringify(medic);
    return this.http.post<Medic>(this.baseUrl+'/user/medic', body, httpOptions);
  }

  updateMedic(medic: Medic): Observable<Medic>{
    const body = JSON.stringify(medic);
    return this.http.put<Medic>(this.baseUrl+'/editmedic/'+medic.id, body, httpOptions);
  }
}
