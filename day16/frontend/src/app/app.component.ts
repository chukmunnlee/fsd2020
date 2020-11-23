import { HttpClient  } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

import { CartItem } from './models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cartContent: CartItem[] = []
  cartItem: CartItem;

  // fb - Service, dependency injection -
  //constructor(private http: HttpClient) { }
  constructor(private cartSvc: CartService) { }

  async ngOnInit() {
    // convert to promise
    //this.cartContent = await this.http.get<CartItem[]>('http://localhost:3000/cart')
      //.toPromise()
    this.cartContent = await this.cartSvc.getCart()
    console.info('>> contents: ', this.cartContent)
  }

  async itemSelected($event: string) {
    console.info('AppCompnent: ', $event)
    // GET /cart/:id
    //this.cartItem = await this.http.get<CartItem>(`http://localhost:3000/cart/${$event}`)
      //.toPromise()
    this.cartItem = await this.cartSvc.getItem($event)
  }

  async updateCart($event: CartItem) {
    console.info('>>> updateCart: ', $event)

    // PUT /cart/:id
    await this.cartSvc.updateItem($event.id, $event)
    this.cartContent = await this.cartSvc.getCart()
    /*
    await this.http.put<any>(`http://localhost:3000/cart/${$event.id}`, $event)
      .toPromise()

    // Refresh the list
    this.cartContent = await this.http.get<CartItem[]>('http://localhost:3000/cart')
      .toPromise()
    */
  }
}
