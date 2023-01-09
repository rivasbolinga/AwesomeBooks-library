const addBtn = document.querySelector('.add-book-btn');
const newTitleInput = document.querySelector('.add-title-input');
const newAuthorInput = document.querySelector('.add-author-input');
const libraryContainer = document.querySelector('.library-wrapper');

const library = [];

const Book = function (title, author) {
  this.title = title;
  this.author = author;
};

// Function to add and display new books.
const addBook = function (e) {
  e.preventDefault();
  const newTitle = newTitleInput.value;
  const newAuthor = newAuthorInput.value;
  if (newTitle && newAuthor) {
    const newBook = new Book(newTitle, newAuthor);
    library.push(newBook);
    const html = ` <div class="book-wrapper">
  <p class="title-display">${newTitle}</p>
  <p class="author-display">${newAuthor}</p>
  <button class="remove-btn">Remove</button>
  <div class="grey-line"></div>
</div>`;
    libraryContainer.innerHTML += html;
  }
};

// Event Listeners

addBtn.addEventListener('click', addBook);