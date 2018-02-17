import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  books: Book[];
  addBook: boolean;

  constructor(public booksService: BooksService) {
  }

  ngOnInit() {

    this.getAllBooksHome();
    this.addBook = true;
  }

  bookDel(book) {

    this.booksService.isLoaded = false;
    this.booksService.deleteBasicApi('books', +book.id)
      .subscribe(() => {
        this.getAllBooksHome();
      });
  }

  bookEdit(addBook) {
    this.addBook = addBook;
  }

  bookChange(book) {
    this.booksService.isLoaded = false;
    this.booksService.putBasicApi('books/' + book.id, book)
      .subscribe(() => {
        this.getAllBooksHome();
      });
  }

  onAdd() {

    this.addBook = false;
    const bookTemp = new Book('', '', '');
    this.books.unshift(bookTemp);

  }

  private getAllBooksHome() {
    this.booksService.getAllBooks()
      .subscribe((books: Book[]) => {
        books.forEach((element) => {
          this.books = books;
          this.booksService.isLoaded = true;
        });
      });
  }

}
