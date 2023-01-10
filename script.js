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
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));//
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



const addBookPressed = function (e) {

  e.preventDefault();
  const books = Storage.getBooks();
  const newTitle = newTitleInput.value;
  const newAuthor = newAuthorInput.value;
  let newId;
  const len = books.length;
  if (len === 0 || len === null) {
    newId = 0;
  } else {
    newId = books[len - 1].id + 1;
  }
  if (newTitle && newAuthor) {
    const newBook = new Book(newTitle, newAuthor, newId); //
    UI.addBooktoLibrary(newBook);
  }
};

// Function to remove new Book

const removeBook = function (e) {
  if (e.target.classList.contains('remove-btn')) {
    const { id } = e.target;
    library = library.filter((bk) => JSON.stringify(bk.id) !== id);
    localStorage.setItem('book', JSON.stringify(library)); // LOCAL STORAGE
    e.target.parentElement.remove();
  }
};

  
///// EVENT LISTENERS

addBtn.addEventListener('click', addBookPressed);
libraryContainer.addEventListener('click', removeBook);