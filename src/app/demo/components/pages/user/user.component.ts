import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/demo/api/user';
import { ProductService } from 'src/app/demo/service/product.service';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [MessageService]
})
export class UserComponent implements OnInit {

  userDialog: boolean = false;
  userDialogUpdate: boolean = false;
  users: any[] = [];
  user: User = {};
  selectedUsers: User[] = [];
  submitted: boolean = false;

  cols: any[] = [];

  roles: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  statuses: any[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getUsers();

    this.cols = [
      { field: 'names', header: 'Name' },
      { field: 'lastname', header: 'Lastname' },
      { field: 'date_birth', header: 'Date birth' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'status', header: 'Status' },
      { field: 'address', header: 'Address' }
    ];

    this.roles = [
      { label: 'CLIENTE', value: 2 },
      { label: 'ADMINISTRADOR', value: 1 },
    ];

    this.statuses = [
      { label: 'ACTIVO', value: true },
      { label: 'INACTIVO', value: false },
    ];
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialogUpdate = true;
  }

  hideDialog() {
    this.userDialog = false;
    this.userDialogUpdate = false;
    this.submitted = false;
  }

  createUser() {
    this.userService.createUser(this.user).subscribe({
      next: () => {
        this.users = [...this.users];
        this.userDialog = false;
        this.getUsers();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario creado correctamente', life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el usuario', life: 3000 });
      }
    });
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        this.users = [...this.users];
        this.userDialogUpdate = false;
        this.getUsers();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario actualizado correctamente', life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el usuario', life: 3000 });
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  isFormValid(): boolean {
    return !this.user.names 
    || !this.user.lastname
    || !this.user.date_birth
    || !this.user.email
    || !this.user.password
    || !this.user.phone
    || !this.user.role_id;
  }

  isFormValidUpdate(): boolean {
    return !this.user.names 
    || !this.user.lastname
    || !this.user.date_birth
    || !this.user.email
    || !this.user.phone
    || !this.user.role_id;
  }
}
