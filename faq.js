document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
  }
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      item.classList.toggle('active');
    });
  });

  const searchInput = document.querySelector('.faq-search input');
  
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      const faqItems = document.querySelectorAll('.faq-item');
      
      if (searchTerm === '') {
        faqItems.forEach(item => {
          item.style.display = 'block';
        });
        return;
      }
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = 'block';
          
          if (!item.classList.contains('active')) {
            item.classList.add('active');
          }
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  const smoothScrollToFAQ = () => {
    const faqSection = document.querySelector('.faq-section');
    if (faqSection) {
      faqSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  document.addEventListener('keydown', function(e) {
    const activeItem = document.querySelector('.faq-item.active');
    
    if (!activeItem) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextItem = activeItem.nextElementSibling;
      if (nextItem && nextItem.classList.contains('faq-item')) {
        activeItem.classList.remove('active');
        nextItem.classList.add('active');
        nextItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevItem = activeItem.previousElementSibling;
      if (prevItem && prevItem.classList.contains('faq-item')) {
        activeItem.classList.remove('active');
        prevItem.classList.add('active');
        prevItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else if (e.key === 'Escape') {
      faqItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  });

  faqItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeFAQ: function() {
      document.addEventListener('DOMContentLoaded', function() {
      });
    }
  };
}