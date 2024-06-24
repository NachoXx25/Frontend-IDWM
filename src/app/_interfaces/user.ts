import { Gender } from './gender';
import { Role } from './role';

export interface User {
    id:       number;
    rut:      string;
    name:     string;
    birthday: Date;
    email:    string;
    isActive: boolean;
    gender:   Gender;
    role: Role;
}
