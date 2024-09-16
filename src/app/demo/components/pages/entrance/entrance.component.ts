import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Entrance } from 'src/app/demo/api/entrance';

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrl: './entrance.component.scss',
  providers: [MessageService]
})
export class EntranceComponent implements OnInit {

  entranceDialog: boolean = false;
  issueDialog: boolean = false;

  deleteEntranceDialog: boolean = false;

  deleteEntrancesDialog: boolean = false;

  entrances: Entrance[] = [];

  entrance: Entrance = {};

  selectedEntrances: Entrance[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.productService.getEntrances().then(data => this.entrances = data);

    console.log(this.entrance);

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'status', header: 'Estado' }
    ];
  }

  openEntrance() {
    this.entrance = {};
    this.submitted = false;
    this.entranceDialog = true;
  }

  openIssue() {
    this.entrance = {};
    this.submitted = false;
    this.issueDialog = true;
  }

  deleteSelectedEntrances() {
    this.deleteEntrancesDialog = true;
  }

  editEntrance(entrance: Entrance) {
    this.entrance = { ...entrance };
    this.entranceDialog = true;
  }

  deleteEntrance(entrance: Entrance) {
    this.deleteEntranceDialog = true;
    this.entrance= { ...entrance };
  }

  confirmDelete() {
    this.deleteEntranceDialog = false;
    this.entrances = this.entrances.filter(val => val.id !== this.entrance.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entrance Deleted', life: 3000 });
    this.entrance = {};
  }

  hideDialog() {
    this.entranceDialog = false;
    this.submitted = false;
  }

  saveEntrance() {
    this.submitted = true;

    if (this.entrance.amount?.trim()) {
      if (this.entrance.id) {
        // @ts-ignore
        this.entrances[this.findIndexById(this.entrance.id)] = this.entrance;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entrance Updated', life: 3000 });
      } else {
        this.entrance.id = this.createId();
        // @ts-ignore
        this.entrances.push(this.entrance);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entrance Created', life: 3000 });
      }

      this.entrances = [...this.entrances];
      this.entranceDialog = false;
      this.entrance = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.entrances.length; i++) {
      if (this.entrances[i].id === id) {
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