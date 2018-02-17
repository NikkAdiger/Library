export class Book {

  public author: string;
  public date: string;
  public tittle: string;
  public id: number;

  constructor(author: string,
              date: string,
              tittle: string,
              id?: number) {

    this.author = author;
    this.tittle = tittle;
    this.date = date;
    this.id = id;
  }
}
