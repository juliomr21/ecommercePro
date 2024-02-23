import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../../shared/cart/cart.component';
import { HttpConectionService } from '../../service/http-conection.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CartComponent,FormsModule],
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
