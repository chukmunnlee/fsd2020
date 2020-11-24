import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { CatComponent } from './components/cat.component';
import { DogComponent } from './components/dog.component';

// Configure all the routes/views
const ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'cat', component: CatComponent },
  { path: 'dog', component: DogComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CatComponent,
    DogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
