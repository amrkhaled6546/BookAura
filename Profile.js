const openTab = (evt, tabName) => {
  const contents = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-button");

  contents.forEach(c => c.classList.remove("active"));
  buttons.forEach(b => b.classList.remove("active"));

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
};

const renderBookList = (containerId, data, emptyMessage) => {
  const container = document.getElementById(containerId);
  let bookListContainer = container.querySelector('.book-list-container');
  
  if (!bookListContainer) {
    bookListContainer = document.createElement('div');
    bookListContainer.classList.add('book-list-container');
    container.appendChild(bookListContainer);
  }
  
  bookListContainer.innerHTML = ''; 
  if (data && data.length > 0) {
    data.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('profile-book-card');
      
      bookCard.innerHTML = `
        <img src="${book.image}" alt="${book.title}" class="profile-book-img" onerror="this.src='https://via.placeholder.com/80x110/194850/FFFFFF?text=No+Image'">
        <div class="profile-book-details">
          <h4>${book.title}</h4>
          <p>By ${book.author}</p>
        </div>
        <div class="card-actions">
          <button data-id="${book.id}" class="btn-remove">Remove</button> 
          <button data-id="${book.id}" class="btn-view-details">View Details</button>
        </div>
      `;
      
      bookCard.querySelector('.btn-view-details').addEventListener('click', () => {
        localStorage.setItem('selectedBook', book.id);
       const currentPage = window.location.pathname.includes("books_details.html")  ? "books_details.html"  : "book_details.html";
 
 

window.location.href = currentPage;

      });
      
      bookCard.querySelector('.btn-remove').addEventListener('click', () => {
        if (confirm(`Are you sure you want to remove "${book.title}" from this list?`)) {
          removeBookFromList(book.id, containerId);
        }
      });

      bookListContainer.appendChild(bookCard);
    });
  } else {
    bookListContainer.innerHTML = `<p class="empty-message">${emptyMessage}</p>`;
  }
};
const removeBookFromList = (bookId, listName) => {
    const storageKey = listName === 'favorites' ? 'favorites' : 'downloadedBooks';
    let list = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    const updatedList = list.filter(book => book.id !== bookId);
    
    localStorage.setItem(storageKey, JSON.stringify(updatedList));
    
    const favoriteEmptyMessage = 'You have no books in your favorites yet. Go to the "Books" page to add some!';
    const downloadEmptyMessage = 'You have not downloaded any books yet. Download books from the book details page.';

    renderBookList(listName, updatedList, listName === 'favorites' ? favoriteEmptyMessage : downloadEmptyMessage);
};

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.profile-name').textContent = localStorage.getItem('username') || 'Guest User';
    document.querySelector('.profile-email').textContent = localStorage.getItem('email') || 'user@bookaura.com';
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const downloaded = JSON.parse(localStorage.getItem('downloadedBooks')) || [];
    
    renderBookList('favorites', favorites, 'You have no books in your favorites yet. Go to the "Books" page to add some!');
    renderBookList('downloads', downloaded, 'You have not downloaded any books yet. Go to the "Books" page to add some!');
    
    document.querySelector('.tab-button.active')?.click();
});
window.openTab = openTab;