import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'role', loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
        { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
        { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
        { path: 'service', loadChildren: () => import('./service/service.module').then(m => m.ServiceModule) },
        { path: 'appointment', loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentModule) },
        { path: 'inventory', loadChildren: () => import('./entrance/entrance.module').then(m => m.EntranceModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
