import { Component } from '@angular/core';
import { CartComponent } from '../../shared/cart/cart.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

}
