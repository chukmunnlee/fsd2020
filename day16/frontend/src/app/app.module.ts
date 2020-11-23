import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list.component';
import { ItemDetailComponent } from './components/item-detail.component';
import { CartService } from './cart.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [ CartService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
