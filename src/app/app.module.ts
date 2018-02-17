import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { BooksService } from './services/books.service';
import { BooksComponent } from './components/home/books/books.component';
import { MomentPipe } from './pipes/momet.pipe';
import { OnlyEngLettersPipe } from './pipes/onlyEngLetters.pipe';
import { UpFirstLetterPipe } from './pipes/upFirstLetter.pipe';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    BooksComponent,
    MomentPipe,
    OnlyEngLettersPipe,
    UpFirstLetterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
