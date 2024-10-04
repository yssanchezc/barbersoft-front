import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment } from '../api/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getAppointments() {
    return this.http.get<any>(`${this.baseUrl}/appointments`)
  }

  getAppointmentByUser(id: number) {
    return this.http.get<any>(`${this.baseUrl}/appointments/users/${id}`)
  }

  createAppointment(appointment: Appointment) {
    return this.http.post<any>(`${this.baseUrl}/appointments`, appointment)
  }

  updateAppointment(appointment: Appointment) {
    return this.http.put<any>(`${this.baseUrl}/appointments/update/${appointment.id}`, appointment)
  }

  completeAppointment(appointment: Appointment) {
    return this.http.put<any>(`${this.baseUrl}/appointments/complete/${appointment.id}`, {})
  }

  countAppointment() {
    return this.http.get<any>(`${this.baseUrl}/appointments/count`)
  }

}
