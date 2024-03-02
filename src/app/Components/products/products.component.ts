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
  checkBrand: brType[] = [{ id: 0, category: 'all', brand: 'all', mark: true, select: true, idPai: 0 }];
  checkCategory: categType[] = [{ id: 0, category: 'all', mark: true }]
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
  prontaCateg = false;
  dp: number[] = [0];
  contCateg = 0;
  noFound = false;
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
       
        this.filterVar = false;
        this.dp[0] = 0;
        this.contCateg = 0;
        this.noFound = false;

        let temp: any = resp;
        this.category = temp.category;
        if (this.category != 'all') {
          this.url = 'https://dummyjson.com/products' + '/category/' + this.category;
          this.contCateg = 1;
        } else {
          this.url = 'https://dummyjson.com/products' + '?limit=0'
          this.checkCategory[0].mark = true;
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
        let idCategory = 0;
        for (let item of this.full_list) {
          if (item.id % 5 == 0) {
            let pos = Math.floor(item.id / 5);
           this.checkCategory[pos] = { id: pos, category: item.category, mark: item.category == this.category }
            if (item.category == this.category) {
              idCategory = pos;
            }
            this.dp[pos] = 0;
          }
          let posBrand = Number(item.id)
          this.checkBrand[posBrand] = { id: posBrand, category: item.category, mark: item.category == this.category, brand: item.brand, select: false, idPai: Math.floor(Number(posBrand - 1) / 5) + 1 }

        }
        if (idCategory != 0) {
               this.checkCategory[0].mark = false;
        }
      })
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
  add_categ(idCategory: number) {
    if (this.checkCategory[idCategory].mark) {
      this.delete_brand(this.checkCategory[idCategory].category);
      this.dp[0] -= this.dp[idCategory];
      this.dp[idCategory] = 0;
      this.contCateg--;
      if (this.contCateg == 0)
        this.checkCategory[0].mark = true
    }
    else {
      this.add_brand(this.checkCategory[idCategory].category, idCategory);
      this.checkCategory[0].mark = false;
      this.checkBrand[0].mark = false;
      this.contCateg++;
    }
    this.checkCategory[idCategory].mark = !this.checkCategory[idCategory].mark;

  }
  add_brand(category: string, idCategory: number) {
    this.checkBrand = this.checkBrand.map(item => {
      let itemAux = item;
      if (item.category == category) {
        itemAux.idPai = idCategory;
        itemAux.mark = true;
      }
      return itemAux;
    });

  }
  delete_brand(category: string) {
    this.checkBrand = this.checkBrand.map(item => {
      let tempBrand = item;
      if (item.category == category) {
        tempBrand.mark = false;
        tempBrand.select = false;
      }

      return tempBrand;
    })
  }
  changeBrand(obj: brType) {
    let idCategory = obj.idPai;
    this.checkBrand[obj.id].select = !this.checkBrand[obj.id].select;
    if (this.checkBrand[obj.id].select) {
      this.dp[idCategory]++;
      this.checkBrand[obj.id].select = true;
      this.dp[0]++;
    } else {
      this.dp[idCategory]--;
      this.checkBrand[obj.id].select = false;
      this.dp[0]--;
    }
  }
  filter_show() {
    this.filterVar = false;
    this.noFound = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.checkCategory[0].mark) {
      this.show_list_products = this.full_list.filter(item => item.price >= this.price_min && item.price <= this.price_max);
      this.my_sort()
      return;
    }
    this.show_list_products = this.full_list.filter(item => {
      let posCat = Math.floor((item.id - 1) / 5) + 1;
      if (((this.checkCategory[posCat].mark && this.dp[posCat] == 0) || (this.checkBrand[item.id].select)) && (this.price_max >= item.price && this.price_min <= item.price)) {
        return true;
      }
      return false;
    })
    this.my_sort();
    if (this.show_list_products.length == 0)
      this.noFound = true;
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

export interface categType {
  category: string,
  id: number,
  mark: boolean;
}
export interface brType {
  category: string,
  id: number,
  mark: boolean,
  brand: string,
  select: boolean,
  idPai: number
}