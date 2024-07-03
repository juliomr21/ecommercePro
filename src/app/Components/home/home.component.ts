import { Component } from '@angular/core';
import { HttpConectionService } from '../../service/http-conection.service';
import { BannerCarouselComponent } from '../../shared/banner-carousel/banner-carousel.component';
import { Router } from '@angular/router';
import { DataService, carTypeObj } from '../../service/data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { log, time } from 'console';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [BannerCarouselComponent, UpperCasePipe],

})
export class HomeComponent {
  list_original: any = [];
  list_products_show: any = [];
  list_categories: any = [];
  list_trending: any = [];
  popular = false;
  category = false;
  trend = false;
  constructor(
    private http: HttpConectionService,
    private router: Router,
    private data: DataService,
    private toastr: ToastrService) {

  }
  ngOnInit(): void {

    let url = 'https://dummyjson.com/products?limit=0';


    this.http.get(url).subscribe({
      next: resp => {
        this.list_original = resp;
        this.list_products_show = this.list_original.products.filter((item: { id: number; }) => {
          if (item.id / 3 > 5)
            this.popular = true;
          if ((item.id) % 3 == 0)
            return true;
          return false;
        })

        this.build_lista_categoria();
       
        this.list_trending = this.list_original.products.filter((item: { id: number; }) => {
          if (item.id / 9 > 5)
            this.trend = true;
          if ((item.id) % 9 == 0)
            return true;
          return false;
        })
      }
    });



  }
  build_lista_categoria() {
    let urlCat = 'https://dummyjson.com/products/category-list';
    this.http.get(urlCat).subscribe({
      next: resp => {
        // this.list_categories = resp;
        this.category = true
        let listAux:any = [];
       
        listAux = resp
        // for(let i = 0; i < this.list_original.products.length; i++)
        //   console.log(this.list_original.products[i])
        listAux.forEach((element: any) => {
       
          let itemAux = this.list_original.products.find((item: any) => item.category == element)
         let representCategory = { category: itemAux.category, img: itemAux.thumbnail}
         console.log(representCategory)
         this.list_categories.push(representCategory);
        });
       
      }
    })
  }
  scroll(amount: number, selector: string) {
    let container = document.querySelector(selector)!;
    container.scrollLeft += amount;
  }
  detail_product(id: any) {
    let url = `product-detail/${id}`;
    this.router.navigate([url]);
  }
  go_to_category(cat: string) {
    const urlTemp = '/products/' + cat;
    this.router.navigateByUrl(urlTemp);
  }
  add_cart() {

  }
  add(title: string, price: number, image: string, id: number) {
    let obj: carTypeObj = { cant: 1, product: title, value: price, image: image, id: id };
    this.data.add_to_cart(obj, 1);
    let msg = 'Add ' + title + ' to cart';
    this.toastr.success(title, 'Add to cart', { timeOut: 1500 });
  }
}
