import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service } from '../api/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getServices() {
    return this.http.get<any>(`${this.baseUrl}/services`)
  }

  createService(service: Service) {
    return this.http.post<any>(`${this.baseUrl}/services`, service)
  }

  updateService(service: Service) {
    return this.http.put<any>(`${this.baseUrl}/services/${service.id}`, service)
  }
}
