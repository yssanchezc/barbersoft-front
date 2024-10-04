import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit(): void {
        let user: any = JSON.parse(localStorage.getItem('data'));

        const allItems = [
            {
                label: 'Principal',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/dashboard']
            },
            {
                label: 'Roles',
                icon: 'pi pi-fw pi-calendar',
                routerLink: ['/pages/role']
            },
            {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-user',
                routerLink: ['/pages/user']
            },
            {
                label: 'Servicios',
                icon: 'pi pi-fw pi-circle-off',
                routerLink: ['/pages/service']
            },
            {
                label: 'Citas',
                icon: 'pi pi-fw pi-circle-off',
                routerLink: ['/pages/appointment']
            },
            {
                label: 'Citas',
                icon: 'pi pi-fw pi-circle-off',
                routerLink: ['/pages/appointment-client']
            }
        ];

        // Filtra los elementos según el rol
        if (user.role_name === 'ADMINISTRADOR') {
            this.model = [
                {
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    items: allItems.filter(item => item.routerLink[0] !== '/pages/appointment-client')
                }
            ];
        } else if (user.role_name === 'CLIENTE') {
            // Si el rol es cliente, solo muestra 'appointment-client'
            this.model = [
                {
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    items: allItems.filter(item => item.routerLink[0] === '/pages/appointment-client')
                }
            ];
        }
    }
}
