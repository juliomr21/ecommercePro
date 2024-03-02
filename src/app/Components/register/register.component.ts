import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { HttpConectionService } from '../../service/http-conection.service';
import { DataService } from '../../service/data.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { type } from 'os';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective, ReactiveFormsModule, RouterModule],
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
  month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  year = ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034'];
  form: FormGroup;
  style_input_error = {"color":"#ca2e2e","border":"#ca2e2e 1px solid"};
  style_label_error = {"color":"#ca2e2e"}
  style_Input_success = {"color":"#268426","border":"#268426 1px solid"};
  style_Label_success = {"color":"#268426","border":"#268426 "};
  style_neutro = {"color":"","border":""};
  arrayStyleInput = [{}];
  arrayStyleLabel = [{}];
  constructor(private http: HttpConectionService,
    private fb: FormBuilder,
    private data: DataService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    this.form = fb.group({
      name: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      senha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      rsenha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      cell: ['', [Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
    })
  }
  ngOnInit() {
    this.data.set_Shownav(false);
    for(let i = 0; i < 6; i++)
    {
      this.arrayStyleInput[i] = this.style_neutro;
      this.arrayStyleLabel[i] = this.style_neutro;
    }
      

  }
  ngOnDestroy() {
    this.data.set_Shownav(true);
  }
  search_cep() {
    this.cepTemp = this.form.value.cep;
    let url = 'https://viacep.com.br/ws/' + this.cepTemp + '/json/'
    this.http.get(url).subscribe(resp => {
      let temp: any = resp;
      this.cep = temp;
    }
    );
  }
  register() {
    if (this.validar_form()) {
     
      this.auth.register(this.form.value).subscribe(resp => {
        let status = resp.status;
        if (status == 201) {
          this.auth.login(this.form.value.cpf, this.form.value.senha).subscribe(respl => {
            let respTemp: any = respl;
              if (respTemp.status == 200) {
              this.data.set_user(respTemp.user);
              this.router.navigateByUrl('');
            } else {
              this.toastr.error('Error')
            }
          })
        } else {
          this.toastr.error('User already exists');
        }
      });
    }


  }
  validar_form() {
   
    // let controls = this.form.controls[0];
    let it = 0;
    let Merror = true;
    Object.keys(this.form.controls).forEach(element => {
    this.validar_campo(it,element);
    it++;
    
   });
  

   
   if(this.form.value['senha']!= this.form.value['rsenha'])
   {
     this.toastr.error('Passwords do not match','Enter the same password in both fields');
    return false;
   }
   return !this.form.invalid;
  
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
}
