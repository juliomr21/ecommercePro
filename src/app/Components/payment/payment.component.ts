import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../../shared/cart/cart.component';
import { HttpConectionService } from '../../service/http-conection.service';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CartComponent,FormsModule,NgxMaskDirective],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
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

  constructor(private http: HttpConectionService){

  }
  ngOnInit(){
    
    
  }
  search_cep(){
    let url = 'https://viacep.com.br/ws/'+this.cepTemp + '/json/'
    this.http.get(url).subscribe(resp =>{
    let temp:any = resp;
    this.cep = temp;
    }
    );
  }
}
