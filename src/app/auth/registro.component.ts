import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario: NuevoUsuario;
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  errMsj: string;
  isLogged = false;
  showImages2 = false;
  idImg: number;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  nextRegister(){
    this.showImages2=true;
  }

  onRegister(img: number): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario, this.email, this.password, img);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this.toastr.success('Cuenta Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.router.navigate(['/login']);
      },
      err => {
        document.location.reload();
        this.showImages2 = false;
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        // console.log(err.error.message);
      }
    );
  }

  img1(){
    this.idImg=1;
    this.onRegister(this.idImg);
  }

  img2(){
    this.idImg=2;
    this.onRegister(this.idImg);
  }

  img3(){
    this.idImg=3;
    this.onRegister(this.idImg);
  }

  img4(){
    this.idImg=4;
    this.onRegister(this.idImg);
  }

  immg5(){
    this.idImg=5;
    this.onRegister(this.idImg);
  }

  img6(){
    this.idImg=6;
    this.onRegister(this.idImg);
  }

}
