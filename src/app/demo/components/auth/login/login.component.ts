import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/demo/api/user';
import { UserService } from 'src/app/demo/service/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    email: string = '';
    valCheck: string[] = ['remember'];

    password!: string;
    user: User = {};
    submitted: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private userService: UserService
    ) { }

    login(): void {
        this.userService.loginUser(this.user).subscribe({
            next: (data: any) => {
                localStorage.setItem("data", JSON.stringify(data));
                if (data.role_name === "ADMINISTRADOR") {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.router.navigate(['/pages/appointment-client']);
                }
            },
            error: () => {
                // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales inválidas', life: 3000 }); 
            }
        });
    }
}
