import { HttpClient  } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { CartItem } from './models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cartContent: CartItem[] = []

  // fb - Service, dependency injection -
  constructor(private http: HttpClient) { }

  async ngOnInit() {
    // convert to promise
    this.cartContent = await this.http.get<CartItem[]>('http://localhost:3000/cart')
      .toPromise()
    console.info('>> contents: ', this.cartContent)
  }

  itemSelected($event: string) {
    console.info('AppCompnent: ', $event)
  }
}
