import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/demo/api/appointment';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
import { AppointmentService } from 'src/app/demo/service/appointment.service';
import { ServiceService } from 'src/app/demo/service/service.service';
import { Service } from 'src/app/demo/api/service';
import { User } from 'src/app/demo/api/user';

@Component({
  selector: 'app-appointment-client',
  templateUrl: './appointment-client.component.html',
  providers: [MessageService]
})
export class AppointmentClientComponent implements OnInit {

  appointmentDialog: boolean = false;
  appointmentDialogUpdate: boolean = false;
  deleteAppointmentDialog: boolean = false;
  deleteAppointmentsDialog: boolean = false;
  appointments: Appointment[] = [];
  services: Service[] = [];
  appointment: Appointment = {};
  selectedAppointments: Appointment[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  minDate: Date;
  user: User = {};

  constructor(
    private messageService: MessageService,
    private appointmentService: AppointmentService,
    private serviceService: ServiceService
  ) {
    this.minDate = new Date();
    this.user = JSON.parse(localStorage.getItem("data"));
  }

  ngOnInit() {

    this.getAppointmentByUser();
    this.getServices();

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'status', header: 'Estado' },
      { field: 'description', header: 'Descripcion' },
      { field: 'date', header: 'Fecha' }
    ];

    this.statuses = [
      { label: 'PENDIENTE', value: "PENDIENTE" },
      { label: 'CANCELADO', value: "CANCELADO" },
    ];
  }

  getServices() {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.services = data.map(service => ({
          label: `${service.name} - (${service.price})`,
          value: service.id
        }));
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getAppointmentByUser() {
    this.appointmentService.getAppointmentByUser(this.user.id).subscribe({
      next: (data) => {
        this.appointments = data
      },
      error: (error) => {
        console.log(error);
      }
    });
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
    if (typeof this.appointment.date === 'string') {
      this.appointment.date = new Date(this.appointment.date);
    }
    this.appointmentDialogUpdate = true;
  }

  hideDialog() {
    this.appointmentDialog = false;
    this.appointmentDialogUpdate = false;
  }

  saveAppointment() {
    this.submitted = true;
    this.appointment.client_id = this.user.id;

    if (this.appointment.id) {
      this.updateAppointment();
    } else {
      this.createAppointment();
    }
  }

  createAppointment() {
    this.appointmentService.createAppointment(this.appointment).subscribe({
      next: () => {
        this.appointments = [...this.appointments];
        this.appointmentDialog = false;
        this.getAppointmentByUser();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cita creada correctamente', life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la cita', life: 3000 });
      }
    });
  }

  updateAppointment() {
    this.appointmentService.updateAppointment(this.appointment).subscribe({
      next: () => {
        this.appointments = [...this.appointments];
        this.appointmentDialogUpdate = false;
        this.getAppointmentByUser();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cita actualizada correctamente', life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la cita', life: 3000 });
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  isFormValid(): boolean {
    return !this.appointment.service_id
      || !this.appointment.description
      || !this.appointment.date
  }

}
