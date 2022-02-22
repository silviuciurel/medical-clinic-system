import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receptioner } from '../models/receptioner';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}; 

@Injectable({
  providedIn: 'root'
})
export class ReceptionerService {
  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getReceptioners(){
    return this.http.get(this.baseUrl+'/admin/receptioners');
  }

  getReceptioner(id: Number): Observable<Receptioner>{
    return this.http.get<Receptioner>(this.baseUrl+'/receptioner/'+id);
  }

  createReceptioner(receptioner: Receptioner): Observable<Receptioner>{
    const body = JSON.stringify(receptioner);
    return this.http.post<Receptioner>(this.baseUrl+"/user/receptioner", body, httpOptions);
  }

  updateReceptioner(receptioner: Receptioner): Observable<Receptioner>{
    const body = JSON.stringify(receptioner);
    return this.http.put<Receptioner>(this.baseUrl+'/editreceptioner/'+receptioner.id, body, httpOptions);
  }
}
