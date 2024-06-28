import { Gender } from './gender';
import { Role } from './role';

export interface User {
    id: number;
    rut: string;
    name: string;
    birthdate: string;
    email: string;
    isActive: boolean;
    gender:   Gender;
    role: Role;
}
