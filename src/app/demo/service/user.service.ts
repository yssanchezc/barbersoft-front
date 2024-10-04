import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginUser, User } from '../api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getUsers() {
    return this.http.get<any>(`${this.baseUrl}/users`)
  }

  createUser(user: User) {
    return this.http.post<any>(`${this.baseUrl}/users`, user)
  }

  updateUser(user: User) {
    return this.http.put<any>(`${this.baseUrl}/users/${user.id}`, user)
  }

  loginUser(login: LoginUser) {
    return this.http.post<any>(`${this.baseUrl}/users/login`, login)
  }
}
