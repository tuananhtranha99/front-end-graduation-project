import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role.name === "ROLE_MANAGER";
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role.name ==="ROLE_USER";
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/authenticate/login`, { email, password })
      .pipe(
        map(res => {
          // login successful if there's a jwt token in the response
          if (res.statusCode == 200) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            let user = res.content;
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                'Bạn đã đăng nhập thành công 🎉',
                '👋 Xin chào ' + user.name + '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            // this.currentUserSubject.next(user);
            return user.role.name;
          } else if(res.statusCode == 401){
            return null;
          }

   
        })
      );
  }

  register(username: string, email: string, password: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/authenticate/register`, { username, email, password })
      .pipe(
        map(res => {
          if (res.statusCode == 200) {
            let user = res.content;
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Display welcome toast!
            this.login(user.email, user.password);

            // notify
            // this.currentUserSubject.next(user);
            return "ROLE_USER";
          } else if(res.statusCode == 409){
            return null;
          }

   
        })
      );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
}
