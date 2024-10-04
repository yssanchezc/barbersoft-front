export interface Appointment {
    id?: string;
    service_id?: number;
    client_id?: number;
    client_name?: string;
    service_name?: string;
    description?: string;
    date?: Date;
    status?: string;
    service_count?: number;
}