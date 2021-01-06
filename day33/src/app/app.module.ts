import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { MainComponent } from './components/main.component';
import { AuthService } from './auth.service';
import { ErrorComponent } from './components/error.component';
import { CanLeaveService } from './can-leave.service';

const ROUTES: Routes = [
	{ path: '', component: LoginComponent },
	{
    path: 'main', component: MainComponent,
    canDeactivate: [ CanLeaveService ]
    //canActivate: [ AuthService ]
  },
	{ path: 'error', component: ErrorComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule,
	  HttpClientModule, RouterModule.forRoot(ROUTES)
  ],
  providers: [ AuthService, CanLeaveService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
