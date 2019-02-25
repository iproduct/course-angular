import { IdType } from './shared-types';

export interface Person {
    id: IdType;
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