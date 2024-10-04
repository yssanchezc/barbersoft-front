import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/demo/api/user';
import { UserService } from 'src/app/demo/service/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
        transform:scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
    }
`]
})
export class RegisterComponent {
  names: string = '';
  lastname: string = '';
  date_birth: Date;
  phone: number;
  email: string = '';
  password: string = '';
  address: string = '';
  user: User = {};
  submitted: boolean = false;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private userService: UserService
  ) { }

  signUp(): void {
    this.userService.createUser(this.user).subscribe({
      next: () => {
        this.router.navigate(["/auth/login"]);
      },
      error: () => {
        console.log("Ocurrió un error");
      }
    });
  }

  isFormValid(): boolean {
    return !this.user.names
      || !this.user.lastname
      || !this.user.date_birth
      || !this.user.email
      || !this.user.password
      || !this.user.phone;
  }
}
