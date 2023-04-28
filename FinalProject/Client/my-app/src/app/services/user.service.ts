import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http : HttpClient ) { }

  //This is a service that will check if the user is logged in
  //pipe is to chain an operator that will catch the error of when the session is expired and remove the user from localStorage
  checkLogin() : Observable<any> {
    return this.http
      .get('/api/v1/who')
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            localStorage.removeItem('user');
          }
          return of(null);
        })
      );
  }

  //This is a service that will be used to login
  login(email: string, password: string) : Observable<any> {
    return this.http
      .post('/api/v1/login', {
        email: email,
        password: password,
      });
  }

  //This is a service that will be used to logout
  logout() : Observable<any> {
    return this.http
      .post('/api/v1/logout', {});
  }
  
  //This is a function that will be used to check if the user is logged in
  isLoggedIn() : boolean {
    this.checkLogin().subscribe();
    return !!localStorage.getItem('user');
  }

  //This is a function that will be used to check if the user is an admin
  isAdmin() : boolean {
    return !!localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') ?? '{}').role == 'admin';
  }

  //this is a service that will be used to update the user's career and skills
  updateUserCareerAndSkills(career : string, skills : string) : Observable<any> {
    var user = JSON.parse(localStorage.getItem('user') ?? '{}');
    var id = user._id;
    return this.http.put('/api/v1/users/'+id+'/ck', {
      career,
      skills,
    }
  );
  }

  //This is a service that returns the authenticated user
  getAuthUser() : Observable<any> {
    return this.http
      .get('/api/v1/who');
  }

  //This is a service that will be used to get all of the users
  getUsers() : Observable<any> {
    return this.http
      .get('/api/v1/users');
  }

  //This is a service that will be used to search for users by name which will be sent in the query parameter (/api/v1/users/name?name=)
  searchUsers(name: string) : Observable<any> {
    return this.http
      .get('/api/v1/users/name/'+name);
  }

  //This is a service that is used to delete a user
  deleteUser(id: string) : Observable<any> {
    return this.http
      .delete('/api/v1/users/'+id);
  }

  //This is a service that is used to register a user
  registerUser(username : string, password : string, email : string) : Observable<any> {
    return this.http
      .post('/api/v1/users', {
        email : email,
        password : password,
        name : username,
        role : 'user',
      });
  }
}

