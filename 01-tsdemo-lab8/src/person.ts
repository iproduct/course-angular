export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contact? : Contact;
}

export interface Contact {
    country: string;
    city?: string;
    address?: string;
    phone?: string;
}