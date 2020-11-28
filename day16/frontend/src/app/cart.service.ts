import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from './models';

@Injectable()
export class CartService {
  constructor(private http: HttpClient) { }

  async getCart(): Promise<CartItem[]> {
    return await this.http.get<CartItem[]>('http://localhost:3000/cart')
      .toPromise()
  }

  async getItem(id: string): Promise<CartItem> {
    return await this.http.get<CartItem>(`http://localhost:3000/cart/${id}`)
      .toPromise()
  }

  async updateItem(id: string, item: CartItem): Promise<any> {
    return await this.http.put<any>(`http://localhost:3000/cart/${id}`, item)
      .toPromise()
  }

}
