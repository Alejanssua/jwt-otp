import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OtpUsuario } from '../models/otp-usuario';
import { JwtDTO } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  mobileURL = 'http://localhost:8080/mobileNo';
  OtpURL = 'http://localhost:8080/otp';
  

  constructor(private httpClient: HttpClient) { }

  public phoneNumber(otpUsuario: OtpUsuario): Observable<any> {
    return this.httpClient.post<any>(this.mobileURL, otpUsuario.phoneNo);
  }

  public otpNumber(otpUsuario: OtpUsuario): Observable<any> {
    return this.httpClient.post<any>(this.mobileURL, otpUsuario);
  }



}
