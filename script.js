const addBtn = document.querySelector('.add-book-btn');
const newTitleInput = document.querySelector('.add-title-input');
const newAuthorInput = document.querySelector('.add-author-input');
const libraryContainer = document.querySelector('.library-wrapper');
let newId = 0;

//class constructor of the book object
class Book {
  constructor(title,author,id) {
    this.author = author;
    this.title = title;
    this.id = id;
  }
}

//Local Storage

class Storage {
  static getbooks() {
    let books;
    if(localStorage.getItem('book') === null) {
      books = [];
    } else {
      books = JSON.parse(getItem('books'));
    }
    return books
  }
  static addBook(book) {
    const books = Storage.getbooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  
}

class UI {
  static displayBook() {
    const books = Storage.getbooks();
    books.forEach((newBook) => {
      UI.addBooktoLibrary(newBook);
    });
  }

  static addBooktoLibrary(newBook){
    newBook.id = newId;
    const html = `
    <div>
      <p class="book-position">${newBook.title}</p>
      <p class="book-title">${newBook.author}</p>
      <button id="${newBook.id}" class="remove-btn">Remove</button>
      <div class="line-bottom"></div>
    </div>
  `;
  libraryContainer.innerHTML += html;
  newId += 1;
  }
}

  
// display new book

const displayBook = function (newBook) {
  const html = ` <div class="book-wrapper">
  <p class="title-display">${newBook.title}</p>
  <p class="author-display">${newBook.author}</p>
  <button class="remove-btn" id="${newBook.newId}">Remove </button>
  <div class="grey-line"></div>
</div>`;
  libraryContainer.innerHTML += html;
  localStorage.setItem('book', JSON.stringify(library)); // LOCAL STORAGE
};
