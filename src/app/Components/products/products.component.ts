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
  brand_list: brandType[] = [];
  categoryMark: string[] = [];
  brandMark: brandType[] = [];
  orderType = 1;
  categoryHeight = { "height": "195px", "overflow-y": "hidden", "overflow-x": "hidden" }
  brandHeight = {
    "height": "195px", "overflow-y": "hidden", "overflow-x": "hidden"

  }
  price_min = 0;
  price_max = 10000;
  filterVar = false
  show_brand = true;
  show_category = true;
  constructor(private http: HttpConectionService,
    private router: Router,
    private activate_route: ActivatedRoute
  ) {

  }
  ngOnInit() {

    this.init_data();
  }

  init_data() {
    this.activate_route.params.subscribe(resp => {
      {
        this.category_list = [];
        this.brand_list = [];
        this.categoryMark = [];
        this.brandMark = [];
        this.filterVar = false;
        // this.orderType = 1;
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
      this.http.get('https://dummyjson.com/products' + '?limit=0').subscribe(resp => {
      let aux: any = resp;
      this.full_list = aux.products;

      for (let item of this.full_list) {
        if (item.id % 5 == 0)
          this.category_list.push(item.category);

      }
      if (this.category != 'all')
        this.add_categ(this.category)
    })
    });
    
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
  add_categ(categorySelect: string) {
    const length_init = this.categoryMark.length;

    this.categoryMark = this.categoryMark.filter(item => item != categorySelect);
    if (this.categoryMark.length == length_init) {
      this.categoryMark.push(categorySelect);
      this.add_brand(categorySelect);
    } else {
      this.delete_brand(categorySelect);
    }

  }
  add_brand(category: string) {
    for (let item of this.full_list) {
      if (item.category == category) {
        if (!this.brand_list.find(it => item.brand == it.brand && it.category == category))
          this.brand_list.push({ brand: item.brand, category: item.category });
      }
    }
  }
  delete_brand(category: string) {
    this.brand_list = this.brand_list.filter(item => item.category != category);
    this.brandMark = this.brandMark.filter(item => item.category != category);
  }
  mark_brand(obj: brandType) {
    const length_init = this.brandMark.length;

    this.brandMark = this.brandMark.filter(item => item.brand != obj.brand);
    if (this.brandMark.length == length_init) {
      this.brandMark.push(obj);

    }
  }
  filter_show() {
    this.filterVar = false;
    if (this.categoryMark.length == 0 && this.brandMark.length == 0) {
      this.show_list_products = this.full_list.filter(item => item.price >= this.price_min && item.price <= this.price_max);
      this.my_sort();
      return;
    }

    if (this.brandMark.length == 0 && this.categoryMark.length != 0) {
      this.show_list_products = this.full_list.filter(item => this.categoryMark.find(it => it == item.category) && (item.price >= this.price_min && item.price <= this.price_max))
      this.my_sort();
      return;
    }
    this.show_list_products = this.full_list.filter(item =>
      this.brandMark.find(it => item.brand == it.brand && item.category == it.category) && item.price >= this.price_min && item.price <= this.price_max);
    this.my_sort();
  }
  my_sort() {
    if (this.orderType == 1)
      this.sort_feat();
    if (this.orderType == 2)
      this.sort_high_to_low()
    if (this.orderType == 3)
      this.sort_low_to_high()
  }
  sort_high_to_low() {
    this.show_list_products.sort((a, b) => {
      return a.price - b.price;
    });
    this.orderType = 2;
  }
  sort_low_to_high() {
    this.show_list_products.sort((a, b) => {
      return b.price - a.price;
    })
    this.orderType = 3;
  }
  sort_feat() {
    this.show_list_products.sort((a, b) => a.rating - b.rating);
    this.orderType = 1;
  }
}
export interface brandType {
  brand: '',
  category: ''
}