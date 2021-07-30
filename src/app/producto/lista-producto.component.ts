import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import { OtpService } from '../service/otp.service';
import { OtpUsuario } from '../models/otp-usuario';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  roles: string[];
  isAdmin = false;

  isLogged = false;
  isLoginFail = false;
  otpUsuario: OtpUsuario;
  phoneNo: string;
  errMsj: string;

  constructor(
    private productoService: ProductoService,
    private otpService: OtpService,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    // this.cargarProductos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  sendNumber(){
    this.otpUsuario = new OtpUsuario(this.phoneNo, null);
    this.otpService.phoneNumber(this.otpUsuario).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.toastr.success('OTP enviado Correctamente', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/verification']);
      },
      err => {
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
    
  }
  

}
