const addBtn = document.querySelector('.add-book-btn');
const newTitleInput = document.querySelector('.add-title-input');
const newAuthorInput = document.querySelector('.add-author-input');
const libraryContainer = document.querySelector('.library-wrapper');
let newId = 0;
const bookLine = document.querySelector('book-wrapper');
// class constructor of the book object
class Book {
  constructor(title, author, id) {
    this.author = author;
    this.title = title;
    this.id = id;
  }
}
// Class for Local Storage
class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));//
    }
    return books;
  }
  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
}
// Class for interaction with UI
class UI {
  static displayBook() {
    const books = Storage.getBooks();
    books.forEach((newBook) => {
      UI.addBooktoLibrary(newBook);
    });
  }
  static addBooktoLibrary(newBook) {
    newBook.id = newId;
    const html = `
    <div class="book-wrapper" id ="${newBook.id}">
      <p class="book-position">"${newBook.title}" by ${newBook.author}</p>
      <button id="${newBook.id}" class="remove-btn">Remove</button>
      <div class="line-bottom"></div>
    </div>
  `;
    libraryContainer.innerHTML += html;
    newId += 1;
    if (newBook.id % 2 === 0) {
      document.querySelectorAll('.book-wrapper').forEach((e) => e.style.backgroundColor = 'rgba(206, 203, 203, 0.525)');
    }
  }
  static clearFields(){
    newTitleInput.value = "";
    newAuthorInput.value = "";
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
    Storage.addBook(newBook);
    UI.addBooktoLibrary(newBook);
    UI.clearFields();
  }
};
// Function to remove new Book
const removeBook = function (e) {
  if (e.target.classList.contains('remove-btn')) {
    let library = Storage.getBooks();
    const { id } = e.target;
    library = library.filter((bk) => JSON.stringify(bk.id) !== id);
    localStorage.setItem('books', JSON.stringify(library));
    e.target.parentElement.remove();
  }
};
/// // EVENT LISTENERS
addBtn.addEventListener('click', addBookPressed);
libraryContainer.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', UI.displayBook);