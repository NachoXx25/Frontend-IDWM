import { Gender } from './gender';

export interface User {
    id:       number;
    rut:      string;
    name:     string;
    birthday: Date;
    email:    string;
    isActive: boolean;
    gender:   Gender;
}
