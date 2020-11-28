import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { CreateComponent } from './components/create.component';
import { TodoComponent } from './components/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoDatabase } from './todo.database';
import { TodoDetailComponent } from './components/todo-detail.component';

const ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'create', component: CreateComponent },
  { path: 'todo/:todoId', component: TodoDetailComponent  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent, CreateComponent, TodoComponent, TodoDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule, ReactiveFormsModule
  ],
  providers: [ TodoDatabase ],
  bootstrap: [AppComponent]
})
export class AppModule { }
