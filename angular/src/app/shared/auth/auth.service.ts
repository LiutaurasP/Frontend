import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from './userModel';


@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  token: string;

  updatePass(user: UserModel){
      return this.http.put('https://api.alphahuntsman.com/users/' + user._id, user)
        .pipe(map(user => {
            return "done";
      }));
  }
  
  signupUser(user: UserModel) {
    return this.http.post('https://api.alphahuntsman.com/users/register', user)
      .pipe(map(user => {
        return "done";
    }));
  }

  signinUser(username: string, password: string) {
    return this.http.post<any>('https://api.alphahuntsman.com/users/authenticate', { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
    }));
  }
  
  forgotPass(username: string) {
    return this.http.post<any>('https://api.alphahuntsman.com/users/forgot', { username })
      .pipe(map(user => {
        return "done";
    }));
  }

  forgotPassKey(key: string) {
    return this.http.post<any>('https://api.alphahuntsman.com/users/forgotKey', { key })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
    }));
  }

  logout() {  
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken() {    
    this.doPing();
    return this.token;
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token 
    return true;
  }
  
  doPing(){
    //Ping API
    if(this.currentUserValue){
      this.http.get<string[]>('https://api.alphahuntsman.com/users/ping?ID=' + this.currentUserValue.tempAPI).subscribe((data_ret: string[]) => {
          let results = new String(data_ret);
          if(results.localeCompare("OK") != 0){
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
          }
      });
    }
  }
}
