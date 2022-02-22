import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {
  private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getDiagnostics(){
    return this.http.get(this.baseUrl+"/diagnostics");
  }
}
