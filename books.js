
document.addEventListener('DOMContentLoaded', function() {
    const books = document.querySelectorAll('.book-card');
    
    books.forEach(book => {
        book.addEventListener('click', function() {
            const bookId = this.getAttribute('data-id');
            localStorage.setItem('selectedBook', bookId);
            window.location.href = 'book_details.html';
        });
    });
});