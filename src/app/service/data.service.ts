
import { Injectable } from '@angular/core';
import { Subject, findIndex } from 'rxjs';
import { CartComponent } from '../shared/cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cartContent: carTypeObj[] = [];
  private badge: number = 0;
  private badge$: Subject<number> = new Subject<number>();
  private cartContent$: Subject<carTypeObj[]> = new Subject <carTypeObj[]>();
  private total:number = 0;
  private total$:Subject<number> = new Subject();
  private showNav:boolean;
  private showNav$: Subject<boolean>;
  private user:string = 'user';
  private user$:Subject<string>;
  private closeMenu: boolean;
  private closeMenu$: Subject<boolean> 

  constructor() {
    this.badge$.next(this.badge)
    this.cartContent$.next(this.cartContent);
    this.total$.next(this.total);
    this.showNav = true;
    this.showNav$ = new Subject()
    this.showNav$.next(this.showNav);
    this.closeMenu = true;
    this.closeMenu$ = new Subject()
    this.closeMenu$.next(this.showNav);
    this.user$ = new Subject();
    this.user$.next(this.user);
  }
  get_badge() {
    return this.badge$.asObservable();
  }
  set_badge(cant: number) {
    this.badge = this.badge + cant;
    this.badge$.next(this.badge);
  }
  add_to_cart(objCart: carTypeObj, cant: number) {
    let pos = this.cartContent.findIndex(item => item.id == objCart.id);
    if (pos == -1)
      this.cartContent.push(objCart);
    else
      this.cartContent[pos].cant += cant;
    
    this.badge = this.cartContent.length;
    this.badge$.next(this.badge);
    this.total += (cant * objCart.value);
     this.total$.next(this.total);
  }
  get_cartContent(){
    return this.cartContent;
  }
  get_cartContent$(){
    this.cartContent$.next(this.cartContent);
    return this.cartContent$.asObservable();
  }
  change_cant(){
     this.get_total()
  }
  change_cant_p(objCart: carTypeObj, cant: number){
    let pos = this.cartContent.findIndex(item => objCart.id == item.id);
    if(pos == -1){
      this.cartContent.push(objCart);
    }else{
      this.cartContent[pos].cant = cant;
    }
    this.badge = this.cartContent.length;
    this.badge$.next(this.badge);
    this.total += (cant * objCart.value);
    this.total$.next(this.total);
 }
  delete_product(id:number){
    this.cartContent = this.cartContent.filter(item => item.id != id);
    this.badge--;
    this.badge$.next(this.badge);
  }
  get_total(){
    let sum = 0;
    this.cartContent.forEach(item => sum += item.cant * item.value);
    this.total = sum;
    return this.total;
  }
  get_total$(){
    this.total$.next(this.total)
    return this.total$.asObservable();
  }
  set_Shownav(modo:boolean){
    this.showNav = modo;
    this.showNav$.next(this.showNav);
  }
  get_Shownav$(){
    return this.showNav$.asObservable();
  }
  set_closeMenu(modo:boolean){
    this.closeMenu = modo;
    this.closeMenu$.next(this.closeMenu);
  }
  get_closeMenu$(){
    return this.closeMenu$.asObservable();
  }
  get_user$(){
    return this.user$.asObservable();
  }
  set_user(currentUser:string){
    this.user = currentUser;
    this.user$.next(this.user);
  }
}

export interface carTypeObj {
  product: String;
  cant: number;
  value: number;
  image: string;
  id: number;
}