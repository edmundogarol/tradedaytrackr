export interface CustomWindow extends Window {
  host: string;
  navigator: any;
  baseURL: string;
}

export enum Privileges {
  SUPER = "super",
  ADMIN = "admin",
}

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone?: string;
  birth_date?: string;
  logged_in: boolean;
  is_staff: boolean;
  verified: boolean;
}
