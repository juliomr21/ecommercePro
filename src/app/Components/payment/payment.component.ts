import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../../shared/cart/cart.component';
import { HttpConectionService } from '../../service/http-conection.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { time } from 'console';
import { delay } from 'rxjs';
import { Data, Router } from '@angular/router';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CartComponent,FormsModule,NgxMaskDirective,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
 
  cepError = {
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
  }
  cep:any = this.cepError;
  cepTemp = '';
  month = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  year = ['2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034'];
  style_input_error = {"color":"#ca2e2e","border":"#ca2e2e 1px solid"};
  style_label_error = {"color":"#ca2e2e"}
  style_Input_success = {"color":"#268426","border":"#268426 1px solid"};
  style_Label_success = {"color":"#268426","border":"#268426 "};
  style_neutro = {"color":"","border":""};
  arrayStyleInput = [{}];
  arrayStyleLabel = [{}];
  form:FormGroup;
  constructor(private http: HttpConectionService,private fb: FormBuilder, private toastr: ToastrService,private router: Router,private data:DataService){
    this.form = fb.group(
      {
        name: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
        cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
        cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        numero: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        cell: ['', [Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
        complement: [''],
        card: ['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
        cvv: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
        nameCard: ['',[Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      }
    )
  }
  ngOnInit(){
    
    
  } 
  search_cep(){
    // console.log(this.form.controls['cep'].invalid)
    if(this.form.controls['cep'].invalid)
    {
      this.toastr.error('Invalid CEP format')
      this.cep = this.cepError;
      this.arrayStyleInput[4] = this.style_input_error;
      this.arrayStyleLabel[4] = this.style_label_error
      return;
    }else{
      let url = 'https://viacep.com.br/ws/'+this.form.value['cep'] + '/json/'
      this.http.get(url).subscribe(resp =>{
      let temp:any = resp;
      if(temp.erro)
      {
        this.toastr.error('Invalid CEP');
        this.cep =  this.cepError;
        this.arrayStyleInput[4] = this.style_input_error;
        this.arrayStyleLabel[4] = this.style_label_error
      }
      else
      this.cep = temp;
      }
      );
    }
    
  }
  validar_campo(campo:number,nombre:string){
   
    if(this.form.controls[nombre].invalid){
      this.arrayStyleInput[campo] = this.style_input_error;
      this.arrayStyleLabel[campo] = this.style_label_error
    }else{
      this.arrayStyleInput[campo] = this.style_Input_success;
      this.arrayStyleLabel[campo] = this.style_Label_success;
     
    }     
  }
  pagar(){
   if(this.form.invalid)
   {
    this.toastr.error('Complete all fields to continue with payment','')
   }else
   {
    this.data.clear_cart();
    this.toastr.info(' Thank you for using FakeStore. An email will be sent informing details of your purchase', this.form.value['name'],{positionClass:'toast-top-full-width'})
    setTimeout(() =>{this.router.navigateByUrl('');},5000)
   }
    
    
   
  }
}
