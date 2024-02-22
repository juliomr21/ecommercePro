import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';
import { CartComponent } from '../../shared/cart/cart.component';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CartComponent,RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  variable:number = 0;
  badge:number = 0;
  showCart = false;

  constructor(private data: DataService, private router: Router ){

  }

  ngOnInit():void{
    this.show_badge();
 
  }
  show_badge(){
    this.data.get_badge().subscribe(resp => this.badge = resp);
  }
  go_to_product(){
    this.router.navigateByUrl('/products/1');
    this.showCart = false;
   }
   go_to_payment(){
    this.router.navigateByUrl('/checkout');
    this.showCart = false;
   }
  
}
 
 