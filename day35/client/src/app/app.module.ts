import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { PlayComponent } from './components/play.component';
import {GameService} from './game.service';
import {Globals} from './models';

const ROUTES: Routes = [
	{ path: '', component: MainComponent },
	{ path: 'play', component: PlayComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
	  RouterModule.forRoot(ROUTES)
  ],
  providers: [ GameService ],
  bootstrap: [AppComponent]
})
export class AppModule { 
	constructor(injector: Injector) {
		Globals.injector = injector
	}
}
