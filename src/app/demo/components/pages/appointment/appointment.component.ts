import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/demo/api/appointment';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
  providers: [MessageService]
})
export class AppointmentComponent implements OnInit {

  appointmentDialog: boolean = false;

  deleteAppointmentDialog: boolean = false;

  deleteAppointmentsDialog: boolean = false;

  appointments: Appointment[] = [];

  appointment: Appointment = {};

  selectedAppointments: Appointment[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.productService.getAppointments().then(data => this.appointments = data);

    console.log(this.appointment);

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'status', header: 'Estado' }
    ];
  }

  openNew() {
    this.appointment = {};
    this.submitted = false;
    this.appointmentDialog = true;
  }

  deleteSelectedAppointments() {
    this.deleteAppointmentsDialog = true;
  }

  editAppointment(appointment: Appointment) {
    this.appointment = { ...appointment };
    this.appointmentDialog = true;
  }

  deleteAppointment(appointment: Appointment) {
    this.deleteAppointmentDialog = true;
    this.appointment= { ...appointment };
  }

  confirmDeleteSelected() {
    this.deleteAppointmentsDialog = false;
    this.appointments = this.appointments.filter(val => !this.selectedAppointments.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Appointments Deleted', life: 3000 });
    this.selectedAppointments = [];
  }

  confirmDelete() {
    this.deleteAppointmentDialog = false;
    this.appointments = this.appointments.filter(val => val.id !== this.appointment.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Deleted', life: 3000 });
    this.appointment = {};
  }

  hideDialog() {
    this.appointmentDialog = false;
    this.submitted = false;
  }

  saveAppointment() {
    this.submitted = true;

    if (this.appointment.service_name?.trim()) {
      if (this.appointment.id) {
        // @ts-ignore
        this.appointments[this.findIndexById(this.appointment.id)] = this.appointment;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Updated', life: 3000 });
      } else {
        this.appointment.id = this.createId();
        // @ts-ignore
        this.appointments.push(this.appointment);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Created', life: 3000 });
      }

      this.appointments = [...this.appointments];
      this.appointmentDialog = false;
      this.appointment = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.appointments.length; i++) {
      if (this.appointments[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
