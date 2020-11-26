import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

// start lottie animation
import { LottieModule } from 'ngx-lottie'
import player from 'lottie-web'

export function playerFactory() {
  return player
}
// end lottie animation

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { SearchComponent } from './components/search.component';
import { SearchListComponent } from './components/search-list.component';
import { ResultsComponent } from './components/results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimeDatabase } from './anime.database';

const ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'search-list', component: SearchListComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:genre/:q', component: ResultsComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent, SearchComponent, SearchListComponent, ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(ROUTES), HttpClientModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [ AnimeDatabase ],
  bootstrap: [AppComponent]
})
export class AppModule { }
