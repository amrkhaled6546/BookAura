const selectedId = localStorage.getItem('selectedBook');
const book = booksData.find(b => b.id === selectedId);

const coverImg = document.getElementById('coverImg');
const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookGenre = document.getElementById('bookGenre');
const bookDescription = document.getElementById('bookDescription');
const bookRatingStars = document.getElementById('bookRatingStars');
const bookRatingValue = document.getElementById('bookRatingValue');
const authorImg = document.getElementById('authorImg');
const authorBio = document.getElementById('authorBio');
const relatedBooksContainer = document.getElementById('relatedBooks');
const searchBox = document.querySelector('.nav-search input'); 


if (!book) {
  document.body.innerHTML = `
    <div style="padding:40px;font-family:Poppins, sans-serif;text-align:center;">
      <h2>Book not found!</h2>
      <p>Please go back to the books page and select a book.</p>
      <a href="books.html" style="color:#14464d;font-weight:bold;">Back to Books</a>
    </div>
  `;
} else {
  coverImg.src = book.image;
  coverImg.alt = book.title;
  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookGenre.textContent = book.category;
  bookDescription.textContent = book.description || '';
  
  bookRatingValue.textContent = `${book.rating}/5`;
  bookRatingStars.innerHTML = '★'.repeat(Math.round(book.rating)) + '☆'.repeat(5 - Math.round(book.rating));
  
  authorImg.src = book.authorImage;
  authorImg.alt = book.author;
  authorBio.textContent = book.authorBio;

  const related = booksData.filter(b => b.category === book.category && b.id !== book.id).slice(0,4);
  related.forEach(r => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <img src="${r.image}" alt="${r.title}" onerror="this.src='https://via.placeholder.com/200x300/14464d/FFFFFF?text=No+Image'">
      <h4>${r.title}</h4>
      <p>By ${r.author}</p>
    `;
    card.addEventListener('click', () => {
      localStorage.setItem('selectedBook', r.id);
      window.location.href = 'book_details.html';
    });
    relatedBooksContainer.appendChild(card);
  });
}

const favBtn = document.getElementById('favBtn');
if (favBtn && book){
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isFavorite = favorites.some(fav => fav.id === book.id);
  
  favBtn.textContent = isFavorite ? '❤️ Added to Favorites' : '♡ Add to Favorites';
  if(isFavorite) favBtn.classList.add('btn-toggled'); 

  favBtn.addEventListener('click', () => {
    favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex(fav => fav.id === book.id);
    
    const bookDataToSave = { 
      id: book.id, 
      title: book.title, 
      author: book.author, 
      image: book.image 
    };

    if (index > -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      favBtn.textContent = '♡ Add to Favorites';
      favBtn.classList.remove('btn-toggled');
      alert('❌ Removed from Favorites');
    } else {
      favorites.push(bookDataToSave);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      favBtn.textContent = '❤️ Added to Favorites';
      favBtn.classList.add('btn-toggled');
      alert('✅ Book added to Favorites!');
    }
  });
}

const downloadBtn = document.getElementById('downloadBtn');
const readBtn = document.getElementById('readBtn');

if (downloadBtn && book) {
    downloadBtn.addEventListener('click', () => {
        let downloaded = JSON.parse(localStorage.getItem('downloadedBooks')) || [];
        const bookDataToSave = { 
            id: book.id, 
            title: book.title, 
            author: book.author, 
            image: book.image 
        };
                const isDownloaded = downloaded.some(d => d.id === book.id);
        if (!isDownloaded) {
            downloaded.push(bookDataToSave);
            localStorage.setItem('downloadedBooks', JSON.stringify(downloaded));
            alert('✅ Book added to Downloaded Books list!');
        } else {
            alert('⚠️ This book is already in your Downloaded Books list!');
        }        
    });
}

readBtn.addEventListener('click', () => {
    alert('📖 Online reading feature would be implemented here!');
});

const reviewBtn = document.getElementById('reviewBtn');
const reviewForm = document.getElementById('reviewForm');
const submitReview = document.getElementById('submitReview');
const starContainer = document.getElementById('starRating');
let selectedRating = 0;

reviewBtn.addEventListener('click', () => {
  reviewForm.style.display = reviewForm.style.display === 'block' ? 'none' : 'block';
});

if (starContainer) {
  const stars = starContainer.querySelectorAll('span');

  stars.forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
      stars.forEach((s, i) => s.classList.toggle('hovered', i <= index));
    });

    star.addEventListener('mouseleave', () => {
      stars.forEach((s) => s.classList.remove('hovered'));
    });

    star.addEventListener('click', () => {
      selectedRating = index + 1;
      stars.forEach((s, i) => s.classList.toggle('active', i < selectedRating));
    });
  });
}

if (submitReview) {
  submitReview.addEventListener('click', () => {
    const name = document.getElementById('reviewerName').value.trim();
    const text = document.getElementById('reviewText').value.trim();

    if (!name || !text || selectedRating === 0) {
      alert('⚠️ Please fill in all fields and select a rating!');
      return;
    }

    const newReview = document.createElement('div');
    newReview.classList.add('review');
    newReview.innerHTML = `
      <h4>${'★'.repeat(selectedRating) + '☆'.repeat(5 - selectedRating)} ${name}'s Review</h4>
      <p>"${text}"</p>
      <span>- ${name}</span>
    `;

    const reviewsSection = document.querySelector('.reviews');
    reviewsSection.insertBefore(newReview, reviewBtn.nextSibling); 

    document.getElementById('reviewerName').value = '';
    document.getElementById('reviewText').value = '';
    selectedRating = 0;
    starContainer.querySelectorAll('span').forEach((s) => s.classList.remove('active'));
    reviewForm.style.display = 'none';
  });
}

const relatedContainer = document.querySelector('.related-container');
let isDown = false;
let startX;
let scrollLeft;

if (relatedContainer) {
  relatedContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    relatedContainer.classList.add('active');
    startX = e.pageX - relatedContainer.offsetLeft;
    scrollLeft = relatedContainer.scrollLeft;
  });

  relatedContainer.addEventListener('mouseleave', () => {
    isDown = false;
    relatedContainer.classList.remove('active');
  });

  relatedContainer.addEventListener('mouseup', () => {
    isDown = false;
    relatedContainer.classList.remove('active');
  });

  relatedContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - relatedContainer.offsetLeft;
    const walk = (x - startX) * 1.5; 
    relatedContainer.scrollLeft = scrollLeft - walk;
  });
}

if (searchBox) {
  searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchBox.value.trim();
      if (query) {
        localStorage.setItem('searchQuery', query);
        window.location.href = 'books.html';
      }
    }
  });
}