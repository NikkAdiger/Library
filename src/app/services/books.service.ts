import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { isUndefined } from 'util';
import 'rxjs/add/operator/map';

import { BasicApi } from '../core/basic-api';
import { Book } from '../models/book';
import { Count } from '../models/count';


@Injectable()
export class BooksService extends BasicApi {

  booksPerPage = 5;

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllBooks(): Observable<Book[]> {

    return this.getBasicApi('books');
  }

  getbooksPage(page: number): Observable<Book[]> {

//    return this.getBasicApi('books/?' + 'offset=' + (page - 1) * this.booksPerPage + '&limit=' + this.booksPerPage);
    return this.getBasicApi('books');
  }

  getCountPage(): Observable<Count> {

    return this.getBasicApi('count');
  }

  addBook(book: Book): Observable<Book> {

    return this.postBasicApi('books', book);
  }

  changeBook(book: Book): Observable<Book> {

    return this.putBasicApi('books', book);
  }

  delBook(id: string): Observable<any> {

    return this.deleteBasicApi('books', id);
  }

  getBookByTittle(tittle: string): Observable<any> {

    return this.getBasicApi(`books?tittle=${tittle}`)
      .map((response: Response) => response[0] ? response[0] : isUndefined(response));
  }


}
