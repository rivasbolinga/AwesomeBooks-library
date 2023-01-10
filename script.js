const addBtn = document.querySelector('.add-book-btn');
const newTitleInput = document.querySelector('.add-title-input');
const newAuthorInput = document.querySelector('.add-author-input');
const libraryContainer = document.querySelector('.library-wrapper');

const store = JSON.parse(localStorage.getItem('book'));

let library = store || [];

// Display book from local storage

for (let i = 0; i < library.length; i += 1) {
  const html = `
    <div>
      <p class="book-position">${library[i].title}</p>
      <p class="book-title">${library[i].author}</p>
      <button id="${library[i].id}" class="remove-btn">Remove</button>
      <div class="line-bottom"></div>
    </div>
  `;
  libraryContainer.innerHTML += html;
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

const Book = function (id, title, author) {
  this.id = id;
  this.title = title;
  this.author = author;
};

// Function to add and display new books.

const addBook = function (e) {
  e.preventDefault();
  const newTitle = newTitleInput.value;
  const newAuthor = newAuthorInput.value;
  let newId;
  const len = library.length;
  if (len === 0 || len === null) {
    newId = 0;
  } else {
    newId = library[len - 1].id + 1;
  }
  if (newTitle && newAuthor) {
    const newBook = new Book(newId, newTitle, newAuthor);
    library.push(newBook);
    displayBook(newBook);
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

// Event Listeners

addBtn.addEventListener('click', addBook);
libraryContainer.addEventListener('click', removeBook);