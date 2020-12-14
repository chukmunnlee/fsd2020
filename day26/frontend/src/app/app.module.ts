import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { CountryListComponent } from './components/country-list.component';
import {WineService} from './wine.service';

const ROUTES: Routes = [
	{ path: '', component: CountryListComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent
  ],
  imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(ROUTES)
  ],
  providers: [ WineService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
