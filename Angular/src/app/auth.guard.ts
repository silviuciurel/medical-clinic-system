import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { TokenStorageService } from './auth/token-storage.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    info: any;
    constructor(
        private router: Router,
        private token: TokenStorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.info = this.token.getToken();
        if (this.info) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['auth/login']);
        return false;
    }
}