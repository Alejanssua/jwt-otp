export class OtpUsuario {
    phoneNo: string;
    otp: number;
    constructor(phoneNo: string, otp: number) {
        this.phoneNo=phoneNo; 
        this.otp=otp;
    }
}
