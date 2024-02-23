import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { provideAnimations } from '@angular/platform-browser/animations';

import { ToastrService, provideToastr } from 'ngx-toastr';





@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavBarComponent]
})

export class AppComponent {
  title = 'ecommerce';
  constructor(private toastr: ToastrService){

  }
 }

