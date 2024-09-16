import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Role } from 'src/app/demo/api/role';
import { ProductService } from 'src/app/demo/service/product.service';
import { RoleService } from 'src/app/demo/service/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
  providers: [MessageService]
})
export class RoleComponent implements OnInit {

  roleDialog: boolean = false;

  deleteRoleDialog: boolean = false;

  deleteRolesDialog: boolean = false;

  roles: Role[] = [];

  role: Role = {};

  selectedRoles: Role[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private roleService: RoleService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getRoles();

    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'status', header: 'Estado' }
    ];
  }

  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (data) => {
        this.roles = data
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openNew() {
    this.role = {};
    this.submitted = false;
    this.roleDialog = true;
  }

  deleteSelectedRoles() {
    this.deleteRolesDialog = true;
  }

  editRole(role: Role) {
    this.role = { ...role };
    this.roleDialog = true;
  }

  deleteRole(role: Role) {
    this.deleteRoleDialog = true;
    this.role = { ...role };
  }

  confirmDeleteSelected() {
    this.deleteRolesDialog = false;
    this.roles = this.roles.filter(val => !this.selectedRoles.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedRoles = [];
  }

  confirmDelete() {
    this.deleteRoleDialog = false;
    this.roles = this.roles.filter(val => val.id !== this.role.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.role = {};
  }

  hideDialog() {
    this.roleDialog = false;
    this.submitted = false;
  }

  saveRole() {
    this.submitted = true;

    if (this.role.name?.trim()) {
      if (this.role.id) {
        this.roles[this.findIndexById(this.role.id)] = this.role;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role actualizado', life: 3000 });
      } else {
        this.roleService.createRole(this.role).subscribe({
          next: () => {
            this.roles = [...this.roles];
            this.roleDialog = false;
            this.getRoles();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role creado correctamente', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error', life: 3000 });
          }
        });
      }
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].id === id) {
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
