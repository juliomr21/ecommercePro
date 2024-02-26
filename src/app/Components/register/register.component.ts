import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { HttpConectionService } from '../../service/http-conection.service';
import { DataService } from '../../service/data.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,NgxMaskDirective,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  cep = {
    "cep": "",
    "logradouro": "",
    "complemento": "",
    "bairro": "",
    "localidade": "",
    "uf": "",
    "ibge": "2111300",
    "gia": "",
    "ddd": "98",
    "siafi": "0921"
  };
  cepTemp = '';
  month = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  year = ['2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034'];
  form:FormGroup
  constructor(private http: HttpConectionService, private fb:FormBuilder,private data:DataService){
    this.form = fb.group({
      name: ['',[Validators.required]],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      senha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      rsenha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      cell: ['', [Validators.required, Validators.minLength(5)]],
      cep: ['',[Validators.required,Validators.maxLength(8), Validators.minLength(8)]],
      number: ['',[Validators.required]],
      complemento: ['']
    })
  }
  ngOnInit(){
    this.data.set_Shownav(false);
  }
  ngOnDestroy(){
    this.data.set_Shownav(true);
  }
  search_cep(){
    this.cepTemp = this.form.value.cep;
    let url = 'https://viacep.com.br/ws/'+this.cepTemp + '/json/'
    this.http.get(url).subscribe(resp =>{
    let temp:any = resp;
    this.cep = temp;
    }
    );
  }
  register(){
    let obj = this.form.value;
    let bdUser = localStorage.getItem('bdUser');
    if(bdUser){
     // console.log('ya esta creado') 
      let tempBD = JSON.parse(bdUser);
      tempBD.push(obj);
      // let user =JSON.stringify(tempBD);
      localStorage.setItem('bdUser',JSON.stringify(tempBD));
    }else{
      // let user = JSON.stringify(obj)
      let tempBD = '[' + JSON.stringify(obj) + ']'
      localStorage.setItem('bdUser',tempBD);
    }
    

  }
}
