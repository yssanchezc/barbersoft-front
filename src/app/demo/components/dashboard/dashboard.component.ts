import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppointmentService } from '../../service/appointment.service';
import { Appointment } from '../../api/appointment';
import * as moment from 'moment';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];
    products!: Product[];
    chartData: any;
    chartOptions: any;
    appointments: Appointment[] = [];
    subscription!: Subscription;
    total_scheduled: number = 0;
    total_cancelled: number = 0;
    total_completed: number = 0;
    total_pending: number = 0;
    total_rescheduled: number = 0;

    constructor(
        public layoutService: LayoutService,
        private appointmentService: AppointmentService
    ) {
    }

    ngOnInit() {
        this.countAppointment();
        this.getAppointments();
    }

    countAppointment() {
        this.appointmentService.countAppointment().subscribe({
            next: (data) => {
                this.total_scheduled = data.total_scheduled;
                this.total_cancelled = data.total_cancelled;
                this.total_completed = data.total_completed;
                this.total_pending = data.total_pending;
                this.total_rescheduled = data.total_rescheduled;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    getAppointments() {
        this.appointmentService.getAppointments().subscribe({
            next: (data) => {
                this.appointments = data;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    isMorning(date: string): boolean {
        return moment(date).hour() < 12;
    }
}
