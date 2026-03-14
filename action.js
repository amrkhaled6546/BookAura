const scrollTopBtn = document.getElementById("scrollTopBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const newsletterForm = document.getElementById("newsletterForm");
const newsletterSuccess = document.getElementById("newsletterSuccess");
const currentYear = document.getElementById("currentYear");

const categoryMap = {
  "popular-slider": "Popular Books",
  "novel-slider": "Novels",
  "book-slider": "Self Improvement",
};

const sliderIds = Object.keys(categoryMap);

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("book-card");
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Open details for ${book.title} by ${book.author}`);

  card.innerHTML = `
    <img src="${book.image}" alt="${book.title} cover">
    <h4>${book.title}</h4>
    <p>${book.author}</p>
  `;

  const openDetails = () => {
    localStorage.setItem("selectedBook", book.id);
    window.location.href = "books_details.html";
  };

  card.addEventListener("click", openDetails);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetails();
    }
  });

  return card;
}

function renderSection(containerId, query = "") {
  const container = document.getElementById(containerId);
  const emptyState = document.getElementById(`${containerId}-empty`);

  if (!container || !emptyState) return;

  const books = booksData
    .filter((book) => book.category === categoryMap[containerId])
    .filter((book) => book.title.toLowerCase().includes(query.toLowerCase()));

  container.innerHTML = "";

  books.forEach((book) => {
    container.appendChild(createBookCard(book));
  });

  emptyState.hidden = books.length > 0;
}

function initializeSearch() {
  if (!searchInput || !searchBtn) return;

  const renderAllSections = (query = "") => {
    sliderIds.forEach((id) => renderSection(id, query));
  };

  searchInput.addEventListener("input", () => renderAllSections(searchInput.value));
  searchBtn.addEventListener("click", () => renderAllSections(searchInput.value));
}

function initializeSliderControls() {
  document.querySelectorAll(".books").forEach((section) => {
    const slider = section.querySelector(".book-slider");
    const prevBtn = section.querySelector(".prev");
    const nextBtn = section.querySelector(".next");

    if (!slider || !prevBtn || !nextBtn) return;

    let autoScrollInterval;

    const autoScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          slider.scrollBy({ left: 250, behavior: "smooth" });
        }
      }, 4000);
    };

    const resetAutoScroll = () => {
      clearInterval(autoScrollInterval);
      autoScroll();
    };

    nextBtn.addEventListener("click", () => {
      slider.scrollBy({ left: 220, behavior: "smooth" });
      resetAutoScroll();
    });

    prevBtn.addEventListener("click", () => {
      slider.scrollBy({ left: -220, behavior: "smooth" });
      resetAutoScroll();
    });

    slider.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
    slider.addEventListener("mouseleave", resetAutoScroll);

    autoScroll();
  });
}

function initializeScrollTopButton() {
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = document.documentElement.scrollTop > 300 ? "block" : "none";
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initializeNewsletter() {
  if (!newsletterForm || !newsletterSuccess) return;

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = newsletterForm.querySelector("input[type='email']");
    const email = emailInput?.value.trim();

    if (!email) return;

    newsletterSuccess.hidden = false;
    newsletterForm.reset();

    setTimeout(() => {
      newsletterSuccess.hidden = true;
    }, 5000);
  });
}

function initializeRevealAnimation() {
  const animatedElements = document.querySelectorAll(
    ".books, .benefits, .reviews, .newsletter, .trust-strip"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  sliderIds.forEach((id) => renderSection(id));

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  initializeSearch();
  initializeSliderControls();
  initializeScrollTopButton();
  initializeNewsletter();
  initializeRevealAnimation();

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger?.addEventListener("click", () => {
    navLinks?.classList.toggle("show");
  });
});
