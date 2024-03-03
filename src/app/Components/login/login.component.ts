import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router, RouterModule } from '@angular/router';
import { findIndex } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { NgxMaskDirective } from 'ngx-mask';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule,NgxMaskDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  cpf = '';
  password = '';
  constructor(private data: DataService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,
    private cookie: CookieService) {

  }
  ngOnInit() {
    this.data.set_Shownav(false);

  }
  ngOnDestroy() {
    this.data.set_Shownav(true);
  }
  login() {
    this.auth.login(this.cpf, this.password).subscribe(resp => {
      let respTemp: any = resp;
      if (respTemp.status == 200) {
        this.data.set_user(respTemp.user);
        localStorage.setItem('token',respTemp.token);
        localStorage.setItem('user',respTemp.user);
        this.router.navigateByUrl('');
      } else {
        this.toastr.error('Incorrect CPF or Password')
      }
    })

  }

}
