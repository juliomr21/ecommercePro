import { Routes } from '@angular/router';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { CartComponent } from './shared/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { SearchPageComponent } from './Components/search-page/search-page.component';
import { register } from 'module';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'product-detail/:id',
        component: ProductDetailComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'products/:category',
        component: ProductsComponent
    },
    {
        path: 'checkout',
        component: PaymentComponent
    },
    {
        path: 'search',
        component:SearchPageComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [authGuard]
        
    }
];
