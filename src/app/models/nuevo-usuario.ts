export class NuevoUsuario {
    nombre: string;
    nombreUsuario: string;
    email: string;
    password: string;
    idImg: number;

    constructor(nombre: string, nombreUsuario: string, email: string, password: string, idImg: number) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
        this.idImg = idImg;
    }
}
