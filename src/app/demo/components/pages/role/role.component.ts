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
  roleDialogUpdate: boolean = false;
  roles: Role[] = [];
  role: Role = {};
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
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

    this.statuses = [
      { label: 'ACTIVO', value: true },
      { label: 'INACTIVO', value: false },
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

  editRole(role: Role) {
    this.role = { ...role };
    this.roleDialogUpdate = true;
  }

  hideDialog() {
    this.roleDialog = false;
    this.roleDialogUpdate = false;
    this.submitted = false;
  }

  createRole() {
    this.roleService.createRole(this.role).subscribe({
      next: () => {
        this.roles = [...this.roles];
        this.roleDialog = false;
        this.getRoles();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role creado correctamente', life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el rol', life: 3000 });
      }
    });
  }

  updateRole() {
    this.roleService.updateRole(this.role).subscribe({
      next: () => {
        this.roles = [...this.roles];
        this.roleDialogUpdate = false;
        this.getRoles();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role actualizado correctamente', life: 3000 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el rol', life: 3000 });
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  isFormValid(): boolean {
    return !this.role.name;
  }
}
