import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consult } from '../models/consult';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ConsultService {
  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getConsultsMedic(username: String){
    return this.http.get(this.baseUrl+'/medic/consults/'+username);
  }

  getConsult(id: Number){
    return this.http.get(this.baseUrl+'/consult'+id);
  }

  createConsult(consult: Consult): Observable<Consult>{
    const body = JSON.stringify(consult);
    return this.http.post<Consult>(this.baseUrl+'/newconsult', body, httpOptions);
  }
}
