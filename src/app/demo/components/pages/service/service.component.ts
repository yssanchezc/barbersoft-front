import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Service } from 'src/app/demo/api/service';
import { ProductService } from 'src/app/demo/service/product.service';
import { ServiceService } from 'src/app/demo/service/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
  providers: [MessageService]
})
export class ServiceComponent implements OnInit {

  serviceDialog: boolean = false;
  serviceDialogUpdate: boolean = false;

  services: any[] = [];

  service: Service = {};

  selectedServices: Service[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private serviceService: ServiceService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getServices();

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'price', header: 'Price' },
      { field: 'status', header: 'Status' }
    ];

    this.statuses = [
      { label: 'ACTIVO', value: true },
      { label: 'INACTIVO', value: false },
    ];
  }

  getServices() {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.services = data
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openNew() {
    this.service = {};
    this.submitted = false;
    this.serviceDialog = true;
  }

  editService(service: Service) {
    this.service = { ...service };
    this.serviceDialogUpdate = true;
  }

  hideDialog() {
    this.serviceDialog = false;
    this.serviceDialogUpdate = false;
    this.submitted = false;
  }

  saveService() {
    this.submitted = true;
    if (this.service.id) {
      this.updateService();
    } else {
      this.createService();
    }
  }

  createService() {
    this.serviceService.createService(this.service).subscribe({
      next: () => {
        this.services = [...this.services];
        this.serviceDialog = false;
        this.getServices();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Servicio creado correctamente', life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el servicio', life: 3000 });
      }
    });
  }

  updateService() {
    this.serviceService.updateService(this.service).subscribe({
      next: () => {
        this.services = [...this.services];
        this.serviceDialogUpdate = false;
        this.getServices();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Servicio actualizado correctamente', life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el servicio', life: 3000 });
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  isFormValid(): boolean {
    return !this.service.name 
    || !this.service.price;
  }
}
