import { Gender } from './gender';
import { Role } from './role';

export interface User {
    id: number; // Identificador del usuario
    rut: string; // RUT del usuario
    name: string; // Nombre del usuario
    birthday: Date; // Fecha de nacimiento del usuario
    email: string; // Correo electrónico del usuario
    isActive: boolean; // Estado del usuario
    gender:   Gender; // Género del usuario
    role: Role; // Rol del usuario
}
