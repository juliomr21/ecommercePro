import { Component } from '@angular/core';
import { HttpConectionService } from '../../service/http-conection.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  category: string = 'all';
  url: string = 'https://dummyjson.com/products';
  list_products: any[] = [];
  show_list_products: any[] = [];
  full_list: any[] = [];
  category_list: string[] = [];
  brand_list:brandType[] = [];
  categoryMark:string[] = [];
  brandMark:brandType[] = [];
  categoryHeight = {  "height": "195px", "overflow-y": "hidden", "overflow-x": "hidden"}
  brandHeight = {
    "height": "195px", "overflow-y": "hidden", "overflow-x": "hidden"

  }
  price_min = 0;
  price_max = 10000;
  
  show_brand = true;
  show_category = true;
  constructor(private http: HttpConectionService,
    private router: Router,
    private activate_route: ActivatedRoute
  ) {

  }
  ngOnInit() {

   
    
    this.category_list = [];
    this.brand_list = [];
    this.categoryMark = [];
    this.brandMark = [];
    this.init_data();
   
    // this.change_ruta();
   
   

  }
  
  init_data() {
    this.activate_route.params.subscribe(resp => {
      next: {
        let temp: any = resp;
        this.category = temp.category;
        if (this.category != 'all') {
          this.url = 'https://dummyjson.com/products' + '/category/' + this.category;
         
        
        } else {
          this.url = 'https://dummyjson.com/products' + '?limit=0'
        }
       
        this.http.get(this.url).subscribe(resp => {

          let templist_products: any = resp;
          this.list_products = templist_products.products;
          this.show_list_products = this.list_products;
          
        })
      }
    });
    this.http.get('https://dummyjson.com/products' + '?limit=0').subscribe(resp => {
      let aux: any = resp;
      this.full_list = aux.products;
     
      for (let item of this.full_list) {
        if (item.id % 5 == 0)
          this.category_list.push(item.category);
       
      }
     
    })
  }
  change_ruta() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.init_data()
      }
    });
  }
  go_to_product_detail(id: number) {
    this.router.navigateByUrl(`/product-detail/${id}`);
  }
  less_brand() {
    this.brandHeight = {
      "height": "195px", "overflow-y": "hidden", "overflow-x": "hidden"
    }
    this.show_brand = !this.show_brand;
  }
  more_brand() {
    this.brandHeight = {
      "height": "100%", "overflow-y": "hidden", "overflow-x": "hidden"
    }
    this.show_brand = !this.show_brand;
  }
  less_category() {
    this.categoryHeight = {
      "height": "195px", "overflow-y": "hidden", "overflow-x": "hidden"
    }
    this.show_category = !this.show_category;
  }
  more_category() {
    this.categoryHeight = {
      "height": "100%", "overflow-y": "hidden", "overflow-x": "hidden"
    }
    this.show_category = !this.show_category;
  }
  add_categ(categorySelect:string){
    const length_init = this.categoryMark.length;
   
   this.categoryMark =  this.categoryMark.filter(item => item != categorySelect);
    if(this.categoryMark.length == length_init)
    { 
      this.categoryMark.push(categorySelect);
      this.add_brand(categorySelect);
    }else{
      this.delete_brand(categorySelect);
    }
    
  }
  add_brand(category:string){
    for(let item of this.full_list){
      if(item.category == category)
      {
        if(!this.brand_list.find(it => item.brand == it.brand && it.category == category))
        this.brand_list.push({brand:item.brand,category: item.category});
      }
    }
  }
  delete_brand(category:string){
    this.brand_list = this.brand_list.filter(item => item.category != category);
    this.brandMark = this.brandMark.filter(item => item.category != category);
  }
  mark_brand(obj:brandType){
    const length_init = this.brandMark.length;
   
   this.brandMark =  this.brandMark.filter(item => item.brand != obj.brand);
    if(this.brandMark.length == length_init)
    { 
      this.brandMark.push(obj);
    
    }
    console.log(this.brandMark)
  }
  filter_show(){
   
    if(this.categoryMark.length == 0 && this.brandMark.length == 0)
    {
      
      this.show_list_products = this.full_list.filter(item => item.price >= this.price_min && item.price <= this.price_max);
      return;
    }
   
    if(this.brandMark.length == 0 && this.categoryMark.length != 0){
     
      this.show_list_products = this.full_list.filter(item => this.categoryMark.find(it => it == item.category) && (item.price >= this.price_min && item.price <= this.price_max))
      return;
    }
    this.show_list_products = this.full_list.filter(item => 
      this.brandMark.find(it => item.brand == it.brand && item.category == it.category) && item.price >= this.price_min && item.price <= this.price_max);
  }
}
export interface brandType{
 brand:'',
 category: ''
}