export class LoginUsuario {
    nombreUsuario: string;
    password: string;
    idImg: number;

    constructor(nombreUsuario: string, password: string, idImg: number) {
        this.nombreUsuario = nombreUsuario;
        this.password = password;
        this.idImg = idImg;
    }
}
