import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Service } from 'src/app/demo/api/service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
  providers: [MessageService]
})
export class ServiceComponent implements OnInit {

  serviceDialog: boolean = false;

  deleteServiceDialog: boolean = false;

  deleteServicesDialog: boolean = false;

  services: any[] = [];

  service: Service = {};

  selectedServices: Service[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.productService.getServices().then(data => this.services = data);

    console.log(this.services);

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'price', header: 'Price' },
      { field: 'status', header: 'Status' }
    ];

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.service = {};
    this.submitted = false;
    this.serviceDialog = true;
  }

  deleteSelectedServices() {
    this.deleteServicesDialog = true;
  }

  editService(service: Service) {
    this.service = { ...service };
    this.serviceDialog = true;
  }

  deleteService(service: Service) {
    this.deleteServiceDialog = true;
    this.service = { ...service };
  }

  confirmDeleteSelected() {
    this.deleteServicesDialog = false;
    this.services = this.services.filter(val => !this.selectedServices.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Services Deleted', life: 3000 });
    this.selectedServices = [];
  }

  confirmDelete() {
    this.deleteServiceDialog = false;
    this.services = this.services.filter(val => val.id !== this.service.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Deleted', life: 3000 });
    this.service = {};
  }

  hideDialog() {
    this.serviceDialog = false;
    this.submitted = false;
  }

  saveService() {
    this.submitted = true;

    if (this.service.name?.trim()) {
      if (this.service.id) {
        this.services[this.findIndexById(this.service.id)] = this.service;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Updated', life: 3000 });
      } else {
        this.service.id = this.createId();
        this.services.push(this.service);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Service Created', life: 3000 });
      }

      this.services = [...this.services];
      this.serviceDialog = false;
      this.service = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].id === id) {
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
