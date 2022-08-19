import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from '@/_services';

@Injectable({ providedIn: 'root' })
export class AuditAuthGuard implements CanActivate {
    showAuditDashboard: boolean = false;
    constructor(
        private router: Router,
        private userService: UserService
    ) {
        this.userService.currentUserRole.subscribe((role) => {
            this.showAuditDashboard = (role) ? role.toLowerCase().includes("auditor") : false;
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.showAuditDashboard) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}