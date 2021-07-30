import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;
  showImages = false;
  idImagen: number;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  nextLogin(){
    this.showImages=true;
  }

  onLogin(img: number): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password, img);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        document.location.reload();
        this.showImages = false;
        this.isLogged = false;
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        
        // console.log(err.error.message);
      }
    );
  }

  imagen1(){
    this.idImagen=1;
    this.onLogin(this.idImagen);
  }

  imagen2(){
    this.idImagen=2;
    this.onLogin(this.idImagen);
  }

  imagen3(){
    this.idImagen=3;
    this.onLogin(this.idImagen);
  }

  imagen4(){
    this.idImagen=4;
    this.onLogin(this.idImagen);
  }

  imagen5(){
    this.idImagen=5;
    this.onLogin(this.idImagen);
  }

  imagen6(){
    this.idImagen=6;
    this.onLogin(this.idImagen);
  }

}
