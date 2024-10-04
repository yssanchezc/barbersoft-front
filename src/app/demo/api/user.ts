export interface User {
    id?: number;
    names?: string;
    lastname?: string;
    date_birth?: Date;
    email?: string;
    phone?: number;
    address?: string;
    password?: string;
    status?: string;
    role_id?: string;
}

export interface LoginUser {
    email?: string;
    password?: string;
}