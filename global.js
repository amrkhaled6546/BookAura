
document.addEventListener('DOMContentLoaded', () => {
  const userAction = document.getElementById("user-action");
  const profilePic = document.querySelector(".profile-pic");

  if (!userAction || !profilePic) return;

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = localStorage.getItem("username");

  if (isLoggedIn === "true" && username) {
    userAction.innerHTML = `
      <div class="user-menu">
        <span class="username">${username}</span>
      </div>
    `;

    profilePic.addEventListener("click", () => {
      let menu = document.querySelector(".dropdown-menu");
      if (menu) {
        menu.remove(); 
      } else {
        const dropdown = document.createElement("div");
        dropdown.classList.add("dropdown-menu");
        dropdown.innerHTML = `
          <ul>
            <li><a href="Profile.html">👤 Profile</a></li>
            <li id="logoutBtn">🚪 Logout</li>
          </ul>
        `;
        userAction.appendChild(dropdown);

        document.getElementById("logoutBtn").addEventListener("click", () => {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          window.location.href = "Login_Register.html";
        });
      }
    });

  } else {
    userAction.innerHTML = `<button id="loginBtn" class="login-btn">Login</button>`;
    document.getElementById("loginBtn").addEventListener("click", () => {
      window.location.href = "Login_Register.html";
    });
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   const favBtn = document.getElementById("favBtn");
//   const downloadBtn = document.getElementById("downloadBtn");

//   // بيانات الكتاب الحالي (هنتأكد إن العناصر موجودة)
//   const bookTitle = document.querySelector(".book-title")?.textContent;
//   const bookImage = document.querySelector(".book-img")?.src;

//   // بس اشتغل لو احنا في صفحة فيها أزرار الكتاب
//   if (favBtn && downloadBtn && bookTitle) {
//     const currentBook = {
//       title: bookTitle,
//       image: bookImage || "",
//       pdf: "book.pdf" // غيّرها حسب لينك الكتاب الحقيقي
//     };

//     favBtn.addEventListener("click", () => {
//       let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//       if (!favorites.some(book => book.title === currentBook.title)) {
//         favorites.push(currentBook);
//         localStorage.setItem("favorites", JSON.stringify(favorites));
//         // alert("✅ Book added to Favorites!");
//       } else {
//         // alert("⚠️ Already in Favorites!");
//       }
//     });

//     downloadBtn.addEventListener("click", () => {
//       let downloads = JSON.parse(localStorage.getItem("downloads")) || [];
//       if (!downloads.some(book => book.title === currentBook.title)) {
//         downloads.push(currentBook);
//         localStorage.setItem("downloads", JSON.stringify(downloads));
//         alert("✅ Book added to Downloads!");
//       } else {
//         alert("⚠️ Already in Downloads!");
//       }
//     });
//   }

//   // لو احنا في صفحة البروفايل
//   const favoritesContainer = document.getElementById("favorites");
//   const downloadsContainer = document.getElementById("downloads");

//   if (favoritesContainer && downloadsContainer) {
//     const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     const downloads = JSON.parse(localStorage.getItem("downloads")) || [];

//     favorites.forEach(book => {
//       const card = document.createElement("div");
//       card.classList.add("book-card");
//       card.innerHTML = `
//         <img src="${book.image}" alt="${book.title}">
//         <p>${book.title}</p>
//       `;
//       favoritesContainer.appendChild(card);
//     });

//     downloads.forEach(book => {
//       const card = document.createElement("div");
//       card.classList.add("book-card");
//       card.innerHTML = `
//         <img src="${book.image}" alt="${book.title}">
//         <p>${book.title}</p>
//         <a href="${book.pdf}" download>📥 Download Again</a>
//       `;
//       downloadsContainer.appendChild(card);
//     });
//   }
// });


// document.addEventListener("DOMContentLoaded", () => {
//   const favBtn = document.getElementById("favBtn");
//   const downloadBtn = document.getElementById("downloadBtn");
//   const readBtn = document.getElementById("readBtn");

//   // نحاول نجيب بيانات الكتاب من الصفحة
//   const bookTitle = document.querySelector(".book-title")?.textContent?.trim();
//   const bookImage = document.querySelector(".book-img")?.src || "";
//   const bookPDF = document.querySelector("#downloadBtn")?.getAttribute("data-pdf") || "book.pdf";

//   if (!bookTitle) return; // لو مفيش بيانات كتاب، نخرج

//   const currentBook = {
//     title: bookTitle,
//     image: bookImage,
//     pdf: bookPDF
//   };

//   // ✅ زرار "Add to Favorites"
//   favBtn?.addEventListener("click", () => {
//     let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     const exists = favorites.some(book => book.title === currentBook.title);

//     if (!exists) {
//       favorites.push(currentBook);
//       localStorage.setItem("favorites", JSON.stringify(favorites));
//       favBtn.textContent = "❤️ Added to Favorites";
//       alert("✅ Book added to Favorites!");
//     } else {
//       alert("⚠️ This book is already in your favorites!");
//     }
//   });

//   // ✅ زرار "Download PDF"
//   downloadBtn?.addEventListener("click", () => {
//     let downloads = JSON.parse(localStorage.getItem("downloads")) || [];
//     const exists = downloads.some(book => book.title === currentBook.title);

//     if (!exists) {
//       downloads.push(currentBook);
//       localStorage.setItem("downloads", JSON.stringify(downloads));
//       alert("✅ Book added to Downloads!");
//     } else {
//       alert("⚠️ This book is already in your downloads!");
//     }

//     // تحميل فعلي للملف
//     const link = document.createElement("a");
//     link.href = bookPDF;
//     link.download = bookTitle + ".pdf";
//     link.click();
//   });

//   // ✅ زرار "Read Online" (بس يفتح الـ PDF في نافذة جديدة)
//   readBtn?.addEventListener("click", () => {
//     window.open(bookPDF, "_blank");
//   });
// });


// زر البحث لو عايز تضغطه بدل الكتابة الحية
searchBtn.addEventListener("click", () => {
  searchInput.dispatchEvent(new Event("input"));
});
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
