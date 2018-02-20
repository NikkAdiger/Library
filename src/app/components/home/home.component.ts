import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';
import { Count } from '../../models/count';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  books: Book[];
  totalPages = [1];
  currentPage = 0;
  isLoaded = false;

  addBook: boolean;

  constructor(public booksService: BooksService) {
  }

  ngOnInit() {

    this.booksService.getCountPage()
      .subscribe((count: Count) => {
        this.totalPages = Array(Math.ceil(count.counts / this.booksService.booksPerPage)) || [1];
      });

    this.showPage(1);
    this.addBook = true;
  }

  bookDel(book) {

    this.isLoaded = false;
    this.booksService.deleteBasicApi('books', +book.id)
      .subscribe(() => {
        this.showPage(this.currentPage);
      });
  }

  bookEdit(addBook) {
    this.addBook = addBook;
  }

  bookChange(book) {
    this.isLoaded = false;
    this.booksService.putBasicApi('books/' + book.id, book)
      .subscribe(() => {
        this.showPage(this.currentPage);
      });
  }

  onAdd() {

    this.addBook = false;
    const bookTemp = new Book('', '', '');
    this.books.unshift(bookTemp);

  }

  showPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > this.totalPages.length) {
      return;
    }
    this.isLoaded = false;
    this.currentPage = pageNumber;

    this.booksService.getbooksPage(pageNumber)
      .subscribe((books: Book[]) => {
        books.forEach((element) => {
          this.books = books;
          this.isLoaded = true;
        });
      });
  }

  disabledPage(indexPage: number): string {
    return indexPage === this.currentPage ? 'disabled' : 'waves-effect';
  }

  activePage(indexPage: number): string {
    return indexPage === this.currentPage ? 'active' : 'waves-effect';
  }

}
