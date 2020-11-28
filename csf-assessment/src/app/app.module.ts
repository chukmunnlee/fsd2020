import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CountryListComponent } from './components/country-list.component';
import { TopHeadlinesComponent } from './components/top-headlines.component';
import { SettingsComponent } from './components/settings.component';
import {AppDatabase} from './app.database';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewsService} from './news.service';

const ROUTES: Routes = [
	{ path: '', component: CountryListComponent },
	{ path: 'country-list', component: CountryListComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: 'top-headlines/:country', component: TopHeadlinesComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    TopHeadlinesComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
	  FormsModule, ReactiveFormsModule,
	  RouterModule.forRoot(ROUTES)
  ],
  providers: [ AppDatabase, NewsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
