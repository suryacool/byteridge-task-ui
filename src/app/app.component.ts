import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, UserService } from './_services';
import { User } from './_models';

import './_content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    showAuditDashboard: boolean = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.authenticationService.currentUser.subscribe(x => {
            this.currentUser = x;
        });
        this.userService.getClientIPAddress()
        this.userService.currentUserRole.subscribe((role) => {
            this.showAuditDashboard = (role) ? role.toLowerCase().includes("auditor") : false;
        })
    }

    logout() {
        this.authenticationService.logout()
            .subscribe(() => {
                localStorage.removeItem('currentUser');
                this.authenticationService.setUserValue(null)
                this.router.navigate(['/login']);
            });;

    }
}