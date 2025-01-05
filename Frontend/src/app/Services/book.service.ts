import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../Models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:5149/api/Book'

  constructor() { }

  http = inject(HttpClient)

  getAllBooks()
  {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(data : any)
  {
    return this.http.post(this.apiUrl, data);
  }

  updateBook(book :Book)
  {
    return this.http.put(`${this.apiUrl}/${book.id}`, book)
    
  }

  deleteBook(id: number)
  {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
