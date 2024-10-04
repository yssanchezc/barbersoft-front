import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../api/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getRoles() {
    return this.http.get<any>(`${this.baseUrl}/roles`)
  }

  createRole(role: Role) {
    return this.http.post<any>(`${this.baseUrl}/roles`, role)
  }

  updateRole(role: Role) {
    return this.http.put<any>(`${this.baseUrl}/roles/${role.id}`, role)
  }
}
