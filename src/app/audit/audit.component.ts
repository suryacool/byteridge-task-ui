import { UserService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
export interface Options {
    size: number,
    page: number;
}
@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit {

    users: any[] = [];
    datasource: any[] = [];
    options: Options = {
        page: 1,
        size: 5,
    };
    loading = true;
    skip: number = 0

    constructor(private userService: UserService,private route: ActivatedRoute,private router: Router) { }

    ngOnInit(): void {
        this.getUsers()
    }

    getUsers(skip = 0, limit = 5) {
        this.userService.getAllAudits(skip, limit)
            .subscribe((users: any) => {
                if(users.success === false){
                    this.router.navigate(['/']);
                }
                this.users = users;
                this.loading = false;
            })
    }

    getSkipValue() {
        this.skip = Number((this.options.page - 1) * this.options.size)
        return this.skip
    }

    next() {
        this.options.page++;
        this.getUsers(this.getSkipValue(), this.options.size)
    }

    prev() {
        this.options.page--;
        if (this.options.page > 0) {

            this.getUsers(this.getSkipValue(), this.options.size)

        } else {
            this.options.page = 0
        }

    }

}