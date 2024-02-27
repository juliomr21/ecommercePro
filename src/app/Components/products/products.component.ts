import { Component } from '@angular/core';
import { HttpConectionService } from '../../service/http-conection.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  category: string = 'all';
  url: string = 'https://dummyjson.com/products';
  list_products: any[] = [];
  show_list_products: any[] = [];
  constructor(private http: HttpConectionService,
    private router: Router,
    private activate_route: ActivatedRoute
  ) {

  }
  ngOnInit() {

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
}
