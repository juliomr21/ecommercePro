import { Component,OnInit } from '@angular/core';
import { HttpConectionService } from '../../service/http-conection.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService, carTypeObj } from '../../service/data.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  // producto = { id: 0, images: [], thumbnail: '', price: 0, title: '', description: '', category: '' };
 
 producto = {"id":0,"title":"","description":"","price":0,"discountPercentage":0,"rating":0,"stock":0,"brand":"","category":"","thumbnail":"","images":[]}
  lista_productos_similares:any = []
  img_principal =  "";
  list_img_aux:string[] = [];
  cant = 1;
  img = "";
  badge = 0;
  constructor(
    private http_serv: HttpConectionService, 
    private act_router: ActivatedRoute,
    private router: Router,
    private data:DataService, 
    private toastr: ToastrService) { }
  
  // producto:any 
 ngOnInit(){
    
      window.scrollTo({ top: 0});
       this.act_router.params.subscribe(param => {
      let producto_aux: any = param;
      this.img_principal =  "";
      let urlProducto = `https://dummyjson.com/products/${producto_aux.id}`;
      this.http_serv.get(urlProducto).subscribe(resp => {
        let aux: any = resp;
        this.producto = aux;
        this.img_principal = this.producto.thumbnail;
        this.list_img_aux = this.producto.images;
        this.http_serv.get(`https://dummyjson.com/products/category/${this.producto.category}?limit=10`).subscribe(
        list_similar => {
          let list_temp:any = list_similar;
          this.lista_productos_similares = list_temp.products;
          }
        );
      });
      // this.http_serv.get()
    });

  }
 f(){
  this.data.set_badge(3);
  this.data.get_badge$().subscribe(resp => this.badge = resp);
 }
  scroll(amount: number) {
    let container = document.querySelector('.foto-list-container')!;
    container.scrollLeft += amount;
  }
 
  detail_product(id:any){
    let url = `product-detail/${id}`;
    this.scrollToTop()
    // this.producto = { id: 0, images: [], thumbnail: '', price: 0, title: '', description: '', category: '' };
    this.list_img_aux = [];
    this.router.navigate([url]);
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  actualizar_img(img:string){
    this.img_principal = img;
  }
  add_to_cart(){
    // let tempProducto:carTypeObj = {cant:this.cant, product: this.producto.title,value:this.producto.price,image:this.producto.thumbnail};
    // this.http_serv.set_cart(tempProducto);
  }
  add(){
    let obj:carTypeObj = {cant:this.cant,product:this.producto.title,value:this.producto.price,image:this.producto.thumbnail,id:this.producto.id};
   if(this.cant < 1)
   {
      this.toastr.error('It is not possible to add ' + this.cant + ' '+ this.producto.title)
   }else
   {
 this.data.add_to_cart(obj,this.cant);
      this.toastr.success( '+' + this.cant +' '+ this.producto.title,'Add to cart',{timeOut:1500});
   }
   
  }
}
