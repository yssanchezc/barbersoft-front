import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { User } from '../api/user';
import { Service } from '../api/service';
import { Appointment } from '../api/appointment';
import { Entrance } from '../api/entrance';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getRoles() {
        return this.http.get<any>('assets/demo/data/roles.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getUsers() {
        return this.http.get<any>('assets/demo/data/users.json')
            .toPromise()
            .then(res => res.data as User[])
            .then(data => data);
    }

    getServices() {
        return this.http.get<any>('assets/demo/data/services.json')
            .toPromise()
            .then(res => res.data as Service[])
            .then(data => data);
    }

    getAppointments() {
        return this.http.get<any>('assets/demo/data/appointments.json')
            .toPromise()
            .then(res => res.data as Appointment[])
            .then(data => data);
    }

    getEntrances() {
        return this.http.get<any>('assets/demo/data/inventories.json')
            .toPromise()
            .then(res => res.data as Entrance[])
            .then(data => data);
    }

    
}
