import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../../models/login-usuario';
import { TokenService } from '../../service/token.service';
import { OtpService } from '../../service/otp.service';
import { ToastrService } from 'ngx-toastr';
import { OtpUsuario } from '../../models/otp-usuario';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  otp:number;
  roles: string[];
  isAdmin = false;

  isLogged = false;
  isLoginFail = false;
  otpUsuario: OtpUsuario;
  phoneNo: string;
  errMsj: string;

  constructor(
    private otpService: OtpService,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  verifyOtp(){
    this.otpUsuario = new OtpUsuario(null, this.otp);
    this.otpService.phoneNumber(this.otpUsuario).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.toastr.success('OTP enviado Correctamente', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/transacciones']);
      },
      err => {
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
    
  }

}
