import { Component, OnInit } from '@angular/core';
 
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { AuthLoginInfo } from '../login-info';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
 
  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) { }
 
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }
 
  onSubmit() {
    console.log(this.form);
 
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);
 
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        console.log(this.tokenStorage);
 
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        //this.reloadPage();
        switch (this.roles[0]){
          case "ROLE_ADMIN":
          this.router.navigateByUrl("admin/users");
          break;
          case "ROLE_MEDIC":
          this.router.navigateByUrl("medic/pacients");
          break;
          case "ROLE_RECEPTIONER":
          this.router.navigateByUrl("receptioner/pacients");
          break;
        }

      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }
 
  reloadPage() {
    window.location.reload();
  }
}