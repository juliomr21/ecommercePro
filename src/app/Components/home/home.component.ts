import { Component } from '@angular/core';
import { HttpConectionService } from '../../service/http-conection.service';
import { BannerCarouselComponent } from '../../shared/banner-carousel/banner-carousel.component';
import { Router } from '@angular/router';
import { DataService, carTypeObj } from '../../service/data.service';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [BannerCarouselComponent]
})
export class HomeComponent {
  list_original:any = [];
  list_products_show:any = [];
  list_categories:any = [];
  constructor(
    private http:HttpConectionService,
    private router:Router,
    private data:DataService){

  }
  ngOnInit():void{
    // let url = 'assets/data.json';
        let url = 'https://dummyjson.com/products/';
    // this.http.get(url).subscribe(resp => console.log(resp));
   
    // let urlCat = 'https://dummyjson.com/products/categories'
    this.http.get(url).subscribe( {
      next: resp =>{
        this.list_original = resp;
        // this.list_products_show = this.list_original.products.filter((item: { rating: number; }) => item.rating > 4.85);
        this.list_products_show = this.list_original.products;
        
      }
     
    })  
    // this.http_serv.get(urlCat).subscribe( {
    //   next: resp =>{
    //     this.list_categories = resp;
               
    //   }
     
    // })  
      
  }
  scroll(amount: number) {
    let container = document.querySelector('.foto-list-container')!;
    container.scrollLeft += amount;
  }
  detail_product(id:any){
    let url = `product-detail/${id}`;
    this.router.navigate([url]);
  }
  show_category(category:any){
    // let url = `store/products/category/${category}`
    // this.router.navigate([url])
  }
  add_cart(){
    // let obj:carTypeObj = {cant:2,product:'xxxx',value:5,image:''};
    // obj.cant = 2;
    // obj.product = 'xxxx';
    // obj.value = 5;
    // this.http_serv.set_cart(obj);
  }
  add(title:string,price:number,image:string,id:number){
    let obj:carTypeObj = {cant:1,product:title,value:price,image:image,id:id};
    this.data.add_to_cart(obj,1);
  }
}
