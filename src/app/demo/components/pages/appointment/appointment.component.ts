import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/demo/api/appointment';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { AppointmentService } from 'src/app/demo/service/appointment.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
  providers: [MessageService]
})
export class AppointmentComponent implements OnInit {
  appointmentDialog: boolean = false;
  appointments: Appointment[] = [];
  completedAppointment: boolean = false;
  appointment: Appointment = {};
  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private messageService: MessageService,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit() {
    this.getAppointments();

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'status', header: 'Estado' }
    ];
  }

  getAppointments() {
    this.appointmentService.getAppointments().subscribe({
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

  completeAppointment(appointment: Appointment) {
    this.appointment = appointment;
    this.completedAppointment = true;
  }

  confirmComplete() {
    this.completedAppointment = false;
    this.appointmentService.completeAppointment(this.appointment).subscribe({
      next: () => {
        this.getAppointments();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Cita completada correctamente', life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo completar la cita', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.appointmentDialog = false;
    this.submitted = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
