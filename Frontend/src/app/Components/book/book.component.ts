import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../Models/book';
import { BookService } from '../../Services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  @ViewChild('myModal') model : ElementRef | undefined;
  bookList: Book[] = [];
  bookService = inject(BookService);
  bookForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.setFormState();
    this.getBooks();
  }

  openModal()
  {
    const empModal = document.getElementById('myModal');
    if(empModal != null)
    {
      empModal.style.display = 'block';
    }
  }

  closeModal() {
    this.setFormState();
    if(this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  getBooks()
  {
    this.bookService.getAllBooks().subscribe((res) => {
      this.bookList = res;
    })
  }

  // Initialize the form group with necessary validators
  setFormState() {
    this.bookForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      publicationdate: ['', [Validators.required]], // Custom validator
    });
  }
  formValues : any;
  onSubmit(){
    console.log(this.bookForm.value);
    if(this.bookForm.invalid)
    {
      alert('Please Fill All Fields');
      return;
    }
    if(this.bookForm.value.id == 0)
    {
      this.formValues = this.bookForm.value;
      this.bookService.addBook(this.formValues).subscribe((res) => {
      alert('Book Added Successfully');
      this.getBooks();
      this.bookForm.reset();
      this.closeModal();
    });
    }
    else{
      this.formValues = this.bookForm.value;
      this.bookService.updateBook(this.formValues).subscribe((res) => {
      alert('Book Updated Successfully');
      this.getBooks();
      this.bookForm.reset();
      this.closeModal();
    });
    }
  }

  onEdit(book: Book)
  {
    this.openModal();
    this.bookForm.patchValue(book);
  }

  onDelete(book: Book)
  {
    const isConfirm = confirm("Are you sure you want to delete this Book " + book.title);
    if(isConfirm)
    {
      this.bookService.deleteBook(book.id).subscribe((res) => {
        alert("Book Deleted Successfully");
        this.getBooks();
      });
    }
    
  }

}
