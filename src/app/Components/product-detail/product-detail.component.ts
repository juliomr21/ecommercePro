import { Component,OnInit } from '@angular/core';
import { HttpConectionService } from '../../service/http-conection.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService, carTypeObj } from '../../service/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  // producto = { id: 0, images: [], thumbnail: '', price: 0, title: '', description: '', category: '' };
 
 producto = {"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple","price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones","thumbnail":"https://cdn.dummyjson.com/product-images/1/thumbnail.jpg","images":["https://cdn.dummyjson.com/product-images/1/1.jpg","https://cdn.dummyjson.com/product-images/1/2.jpg","https://cdn.dummyjson.com/product-images/1/3.jpg","https://cdn.dummyjson.com/product-images/1/4.jpg","https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"]}
  lista_productos_similares:any = []
  img_principal =  "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg";
  list_img_aux:string[] = [];
  cant = 1;
  img = "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg";
  badge = 0;
  constructor(
    private http_serv: HttpConectionService, 
    private act_router: ActivatedRoute,
    private router: Router,
    private data:DataService) { }
  
  // producto:any 
 ngOnInit(){
    
      window.scrollTo({ top: 0});
      // window.scrollTo({top:0,behavior: 'smooth'}); 
    // this.data.get_badge().subscribe(resp => console.log(resp));
    this.act_router.params.subscribe(param => {
      let producto_aux: any = param;
      console.log('producto aux',producto_aux.id);
      let urlProducto = `https://dummyjson.com/products/${producto_aux.id}`;
      this.http_serv.get(urlProducto).subscribe(resp => {
        let aux: any = resp;
        this.producto = aux;
        this.img_principal = this.producto.thumbnail;
        this.list_img_aux.push(this.img_principal);
        this.list_img_aux = this.list_img_aux.concat(this.producto.images);
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
  this.data.get_badge().subscribe(resp => this.badge = resp);
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
    this.data.add_to_cart(obj,this.cant);
  }
}
