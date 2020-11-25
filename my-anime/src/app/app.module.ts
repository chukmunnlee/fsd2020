import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

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

const ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'search-list', component: SearchListComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent, SearchComponent, SearchListComponent, ResultsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
