import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    private currentUserRoleSubject: BehaviorSubject<string>;
    public currentUserRole: Observable<string>;
    constructor(private http: HttpClient) {
        this.currentUserRoleSubject = new BehaviorSubject<string>("auditor");
        this.currentUserRole = this.currentUserRoleSubject.asObservable();
    }
    public get currentUserRoleValue(): string {
        return this.currentUserRoleSubject.value;
    }

    setUserRoleValue(value: string) {
        this.currentUserRoleSubject.next(value);
    }


    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }

    getClientIPAddress() {
        this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
            sessionStorage.setItem("clientip", res.ip)
            return res.ip;
        });
    }

    getAllAudits(skip, limit) {
        return this.http.get(`${config.apiUrl}/users/audit?skip=${skip}&limit=${limit}`);
    }


}