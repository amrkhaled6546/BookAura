document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const successMsg = document.getElementById("successMessage");

    if (form && successMsg) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            successMsg.textContent = "Message sent ✅";
            successMsg.style.display = "block";
            form.reset();
            
            setTimeout(() => {
                successMsg.style.display = "none";
            }, 5000);
        });
    }
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }
});