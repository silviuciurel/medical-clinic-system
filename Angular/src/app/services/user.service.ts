import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private medicUrl = 'http://localhost:8080/api/test/medic';
  private receptionerUrl = 'http://localhost:8080/api/test/receptioner';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  private baseUrl = 'http://localhost:8080/api';

  

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.baseUrl+'/users');
  }

  getUser(id:Number): Observable<User>{
    return this.http.get<User>(this.baseUrl+'/user/'+id);
  }

  deleteUser(id:Number){
    return this.http.delete(this.baseUrl+'/deleteuser/'+id, httpOptions);
  }

  createUser(user: User): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.post<User>(this.baseUrl+'/newuser', body, httpOptions);
  }

  updateUser(user: User): Observable<User>{
    const body = JSON.stringify(user);
    return this.http.put<User>(this.baseUrl+'/edituser/'+user.id, body, httpOptions);
  }

  getMedicBoard(): Observable<string>{
    return this.http.get(this.medicUrl, {responseType: 'text'});
  }

  getReceptionerBoard(): Observable<string>{
    return this.http.get(this.receptionerUrl, {responseType: 'text'});
  }

  getAdminBoard(): Observable<string>{
    return this.http.get(this.adminUrl, {responseType: 'text'});
  }
}
