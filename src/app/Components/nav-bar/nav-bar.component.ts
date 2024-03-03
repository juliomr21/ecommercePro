import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';
import { CartComponent } from '../../shared/cart/cart.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CartComponent, RouterModule,FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  variable: number = 0;
  badge: number = 0;
  showCart = false;
  menuMovil = false;
  smartphoneLaptop = false;
  oilfragance = false;
  homedecoration = false;
  mens = false;
  womens = false;
  automotive = false;
  category_temp = '';
  search = '';
  showNav = true;
  currentUser = '';
  cargImg = false;

  constructor(private data: DataService, private router: Router, private cookie:CookieService) {

  }
 
  ngOnInit(): void {
    this.show_badge();
    this.data.get_Shownav$().subscribe(resp => this.showNav = resp);
    this.currentUser = this.data.get_user();
    this.data.get_user$().subscribe(resp => {this.currentUser = resp;
        });
    
    this.data.get_closeMenu$().subscribe(resp => this.showCart = resp);
  }
  show_badge() {
    this.badge = this.data.get_badge();
    this.data.get_badge$().subscribe(resp => this.badge = resp);
  }
  go_to_product() {
    this.router.navigateByUrl('/products/all');
    // this.showCart = false;
    this.data.set_closeMenu(false);
  }
  go_to_payment() {
    if (this.badge != 0)
      this.router.navigateByUrl('/checkout');
    // this.showCart = false;
    this.data.set_closeMenu(false);
  }
  menu_close() {
    // this.showCart = false;
    this.data.set_closeMenu(false);
    this.menuMovil = false;
    this.select_category(this.category_temp)
  }
  go_to_category(cat: string) {
    const urlTemp = '/products/' + cat;
    this.menu_close();
    this.router.navigateByUrl(urlTemp);
   
  }
  select_category(category: string) {
    if (category == this.category_temp) {
      this.category_temp = '';
      this.change_status(category);
      return;
    }
    if(this.category_temp == ''){
      this.change_status(category);
      this.category_temp = category;
    }
    else{
      this.change_status(this.category_temp);
      this.change_status(category);
      this.category_temp = category;
    }
  

  }
  change_status(category: string) {
    switch (category) {
      case 'smartphoneLaptop': { this.smartphoneLaptop = !this.smartphoneLaptop; break; }
      case 'oilfragance': { this.oilfragance = !this.oilfragance; break; }
      case 'homedecoration': { this.homedecoration = !this.homedecoration; break; }
      case 'mens': { this.mens = !this.mens; break; }
      case 'womens': { this.womens = !this.womens; break; }
      case 'automotive': { this.automotive = !this.automotive; break; }
    }
  }
  go_to_search(){
    
    this.router.navigate(['/search'],{queryParams:{q:this.search}});
    this.search='';
  }
  logout(){
    // this.data.set_user('User');
    this.data.set_user('User');
    localStorage.removeItem('token');
    localStorage.removeItem('user')
   
    this.menuMovil = false;
  }
  print(){
    // console.log('cargo imagen')
    this.cargImg =true
  }
  set_cart(modo:boolean){
    this.data.set_closeMenu(modo);
  }
}

