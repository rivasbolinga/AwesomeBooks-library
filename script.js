const addBtn = document.querySelector('.add-book-btn');
const newTitleInput = document.querySelector('.add-title-input');
const newAuthorInput = document.querySelector('.add-author-input');
const libraryContainer = document.querySelector('.library-wrapper');
let library = [];
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
    const newBook = new Book(newId,newTitle, newAuthor);
    library.push(newBook);
    const html = ` <div class="book-wrapper">
  <p class="title-display">${newTitle}</p>
  <p class="author-display">${newAuthor}</p>
  <button class="remove-btn" id="${newId}">Remove </button>
  <div class="grey-line"></div>
</div>`;
    libraryContainer.innerHTML += html;
  }
};
//Function to remove new Book
const removeBook = function(e) {
  if(e.target.classList.contains('remove-btn')){
    const { id } = e.target;
    library = library.filter((bk) => JSON.stringify(bk.id) !== id);
    localStorage.setItem('local', JSON.stringify(library)); // LOCAL STORAGE
    e.target.parentElement.remove();
  }
}
// Event Listeners
addBtn.addEventListener('click', addBook);
libraryContainer.addEventListener('click',removeBook);