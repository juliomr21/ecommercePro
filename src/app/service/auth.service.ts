import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, Subject, of, findIndex } from 'rxjs';
import { register } from 'module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private respLogin$: Subject<any>;
  constructor() {
    this.respLogin$ = new Subject();
  }
  login(cpf: string, password: string): Observable<any> {

    let status: any;
    let bdUser = localStorage.getItem('bdUser');
    let pos = -1;
    let currentUser = '';

    if (bdUser) {
      let tempBD: any[] = JSON.parse(bdUser);

      pos = tempBD.findIndex(item => {
        if (item.cpf == this.decod_cpf(cpf) && password == item.senha) {

          currentUser = item.name.split(" ")[0];

          return true;
        }
        return false;
      });


    }
    if (pos == -1) {
      status = { status: 401, user: 'User',token:'' };

    } else {
       let tokenGenerado = this.fakejwt(cpf,password);
      status = { status: 200, user: currentUser, token:tokenGenerado }

    }
    return of(status);
  }
  fakejwt(cpf:string, password:string){
    const header = {
      alg: 'HS256', // Algoritmo de firma
      typ: 'JWT' // Tipo de token
    };
    
    const payload = {
      cpf: cpf, 
      password: password, 
      // exp: Math.floor(Date.now() / 1000) + (60 * 60) // Tiempo de expiración (1 hora desde ahora)
    };
    
    // Codificar el encabezado y el payload en Base64
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    
    // Simular la firma (en un JWT real, esta sería la parte que estaría firmada con una clave secreta)
    const signature = btoa('firma_fake') ;    
    // Construir el JWT uniendo el encabezado, la carga útil y la firma con puntos
    const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;
    return jwt;
  }
  register(obj: any): Observable<any> {
    let status: any;
    let bdUser = localStorage.getItem('bdUser');
    if (bdUser) {
      let tempBD = JSON.parse(bdUser);
      let pos = tempBD.findIndex((item: { cpf: any; }) => item.cpf == obj.cpf);
      if (pos == -1) {
        tempBD.push(obj);
        localStorage.setItem('bdUser', JSON.stringify(tempBD));
        status = { status: 201, msg: 'User successefully created' }
      } else {
        status = { status: 400, msg: 'User already exists' }
      }

    } else {

      let tempBD = '[' + JSON.stringify(obj) + ']'
      localStorage.setItem('bdUser', tempBD);
      status = { status: 201, msg: 'User successefully created' }
    }

    return of(status)
  }
  decod_cpf(cpf: string) {
    return cpf.replace(/[.-]/g, '')
  }
}
