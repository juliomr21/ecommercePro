import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Router, RouterModule } from '@angular/router';
import { findIndex } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  cpf = '';
  password = '';
  constructor(private data:DataService, private toastr: ToastrService,private router:Router){

  }
  ngOnInit(){
    this.data.set_Shownav(false);
    
  }
  ngOnDestroy(){
    this.data.set_Shownav(true);
  }
login(){
  let bdUser = localStorage.getItem('bdUser');
  let pos = -1;
  let currentUser = '';
  
  if(bdUser)
  {
    let tempBD:any[] = JSON.parse(bdUser);
   
    pos =  tempBD.findIndex(item => {
     if(item.cpf == this.decod_cpf() && this.password == item.senha)
     {
      
      currentUser = item.name.split(" ")[0];
     
      return true;
     }
     return false;
       });
    

  }
 if(pos == -1){
  this.toastr.error('Incorrect CPF or Password')
 }else
 {
  this.data.set_user(currentUser);
  this.router.navigateByUrl('');
 }
}
decod_cpf(){
 return this.cpf.replace(/[.-]/g, '')
}
}
