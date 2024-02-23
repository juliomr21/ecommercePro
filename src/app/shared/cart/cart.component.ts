import { Component } from '@angular/core';
import { DataService, carTypeObj } from '../../service/data.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  listProducts:carTypeObj[] = [];
  val:number = 0;
  total = 0;
  constructor(private data:DataService,private router: Router, private toastr: ToastrService){

  }
  ngOnInit():void{
    this.listProducts = this.data.get_cartContent();
    this.total = this.data.get_total();
   }
   change_cant(){
    this.data.change_cant();
    this.total = this.data.get_total();
   }
   delete_product(id:number, title:any,cant:number){
    this.data.delete_product(id);
    this.listProducts = this.data.get_cartContent();
    this.total = this.data.get_total();
    this.toastr.success( '('+cant+') '+ title + ' removed','',{timeOut:2000});
   }
   go_to_product(){
    this.router.navigateByUrl('/products/1');
   }

}
