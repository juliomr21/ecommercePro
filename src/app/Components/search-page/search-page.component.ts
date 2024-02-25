
import { Component,OnInit } from '@angular/core';
import { HttpConectionService } from '../../service/http-conection.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  url = 'https://dummyjson.com/products/search?q=';
  show_list_products:any[] = [];
  notfound = true;
constructor(private http:HttpConectionService,private queryRoute:ActivatedRoute, private router: Router){

}

ngOnInit(){
  
   this.queryRoute.queryParams.subscribe(params => {
    let temp:any = params;
    this.http.get(this.url + temp.q).subscribe(resp => {
      let list_aux:any = resp;
      this.show_list_products = list_aux.products;
      if(this.show_list_products.length != 0)
      this.notfound = false;
      
    })
})
}
go_to_product_detail(id:number){
  this.router.navigateByUrl(`/product-detail/${id}`);
}

}
