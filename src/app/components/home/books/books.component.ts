import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Book } from '../../../models/book';
import { BooksService } from '../../../services/books.service';
import { Message } from '../../../models/message';
import { Regex } from '../../../utils/regex';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  @Output() bookDel = new EventEmitter<Book>();
  @Output() bookChange = new EventEmitter<Book>();
  @Output() bookEdit = new EventEmitter<boolean>();
  @Input() book: Book;
  @Input() books: Book[];

  newBook = false;

  form: FormGroup;
  message: Message;
  isEdit = false;

  bookTemp = {
    tittle: '',
    author: '',
    date: ''
  };

  constructor(public booksService: BooksService) {
  }

  ngOnInit() {

    this.bookTemp = {
      tittle: this.book.tittle,
      author: this.book.author,
      date: this.book.date
    };

    this.message = new Message('', '');
    this.form = new FormGroup({
      'tittle': new FormControl(null, [Validators.required], this.isBusyTittle.bind(this)),
      'author': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required, Validators.pattern(Regex.validDate)])
    });

    if (this.book.tittle === '') {
      this.newBook = true;
      this.isEdit = true;
    }

  }

  onEdit() {
    this.isEdit = !this.isEdit;
  }

  onDelete() {
    this.bookDel.emit(this.book);
  }

  onSave() {
    if (this.newBook) {
      this.booksService.postBasicApi('books', this.book)
        .subscribe((book: Book) => {
          this.bookChange.emit(book);
        });
    } else {
      this.bookChange.emit(this.book);
    }
    this.isEdit = false;
    this.bookEdit.emit(true);
  }

  onCancel() {

    console.log(this.form);

    if (this.newBook) {
      this.books.splice(0, 1);
    } else {
      this.book.tittle = this.bookTemp.tittle;
      this.book.author = this.bookTemp.author;
      this.book.date = this.bookTemp.date;
    }
    this.isEdit = false;
    this.bookEdit.emit(true);
  }

  isBusyTittle(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.booksService.getBookByTittle(control.value)
        .subscribe((book: Book) => {
          if (book && book.id !== this.book.id) {
            return resolve({isBusy: true});
          } else {
            return resolve(null);
          }
        });
    });
  }
}
