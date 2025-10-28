const btn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  btn.style.display = document.documentElement.scrollTop > 300 ? "block" : "none";
};
btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

document.addEventListener("DOMContentLoaded", () => {

  setTimeout(() => {

    document.querySelectorAll(".books").forEach((section) => {
      const slider = section.querySelector(".book-slider");
      const prevBtn = section.querySelector(".prev");
      const nextBtn = section.querySelector(".next");

      if (!slider || !prevBtn || !nextBtn) return;

      let autoScrollInterval;

      nextBtn.addEventListener("click", () => {
        slider.scrollBy({ left: 200, behavior: "smooth" });
        resetAutoScroll();
      });

      prevBtn.addEventListener("click", () => {
        slider.scrollBy({ left: -200, behavior: "smooth" });
        resetAutoScroll();
      });

      function autoScroll() {
        autoScrollInterval = setInterval(() => {
          if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
            slider.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            slider.scrollBy({ left: 250, behavior: "smooth" });
          }
        }, 4000);
      }

      function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScroll();
      }

      autoScroll();
    });

  }); 
  

  const bookCards = document.querySelectorAll(".book-card");
  bookCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h4").textContent.trim();
      const book = booksData.find(b => b.title.toLowerCase() === title.toLowerCase());

      if (book) {
        localStorage.setItem("selectedBook", book.id);
        window.location.href = "books_details.html";
      } else {
        alert("❌ Book not found in data!");
      }
    });
  });

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    ["popular-slider", "novel-slider", "book-slider"].forEach(id => {
      const container = document.getElementById(id);
      container.innerHTML = "";

      const books = booksData.filter(book => book.category === getCategoryById(id));
      books
        .filter(book => book.title.toLowerCase().includes(query))
        .forEach(book => {
          const card = document.createElement("div");
          card.classList.add("book-card");
          card.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h4>${book.title}</h4>
            <p>${book.author}</p>
          `;
          card.addEventListener("click", () => {
            localStorage.setItem("selectedBook", book.id);
            window.location.href = "books_details.html";
          });
          container.appendChild(card);
        });
    });
  });

  function getCategoryById(id) {
    switch(id) {
      case "popular-slider": return "Popular Books";
      case "novel-slider": return "Novels";
      case "book-slider": return "Self Improvement";
      default: return "";
    }
  }

  searchBtn.addEventListener("click", () => {
    searchInput.dispatchEvent(new Event("input"));
  });

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});
