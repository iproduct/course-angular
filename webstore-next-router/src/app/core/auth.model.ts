import { User } from '../core/users.model';

export interface Authenticate {
    username: string;
    password: string;
}

export interface AuthenticationResult {
  auth: boolean;
  token: string;
  user: User;
}

