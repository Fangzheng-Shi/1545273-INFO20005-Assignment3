/* The carousel part */
const slides = document.querySelectorAll(".slide"); // Select all slide elements
const indicators = document.querySelector(".carousel-indicators"); // Select the container for the indicator dots
let currentIndex = 0;
let slideInterval; // Timer for automatic slideshow

// Create a dot indicator for each slide
slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    // Add click event to jump to the corresponding slide and reset the timer
    dot.addEventListener("click", () => {
        goToSlide(index);
        resetInterval();
    });
    indicators.appendChild(dot);
});

// Navigate to the slide at the given index
function goToSlide(index) {
    const offset = -index * 100;
    document.querySelector(".slides").style.transform = `translateX(${offset}%)`;
    currentIndex = index;
    updateIndicators();
}

// Update dot indicators to reflect current slide
function updateIndicators() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}

// Move to the next slide (looping back to the first)
function nextSlide() {
    const newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
}

// Move to the previous slide (looping from the beginning)
function prevSlide() {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(newIndex);
}

// Clear and restart the auto-sliding timer
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}
// Initilize the carousel
resetInterval();

/* Open side bar */
function openSideBar() {
    document.getElementById("sidebar").classList.add("visible");
    document.getElementById("overlay").classList.add("visible");
}

/* Close side bar */
document.getElementById("closeSidebar").addEventListener("click", function() {
    document.getElementById("sidebar").classList.remove("visible");
    document.getElementById("overlay").classList.remove("visible");
});

// click the overplay area to close sidebar
document.getElementById("overlay").addEventListener("click", function () {
    document.getElementById("sidebar").classList.remove("visible");
    document.getElementById("overlay").classList.remove("visible");
});

// Go to shopping cart and sync cartCount
document.addEventListener("DOMContentLoaded", function() {

    const cartRegion = document.getElementById("headerCart");
    if (cartRegion) {
        cartRegion.style.cursor = "pointer";
        cartRegion.addEventListener("click", function() {
            window.location.href = "shoppingCart.html";
        });
    }

    // Read localStorage.cartCount and show it on <span id="cartCount">
    const cartCountSpan = document.getElementById("cartCount");
    if (cartCountSpan) {
        // If localStorage has cartCount，use it；otherwise 0
        const savedCount = parseInt(localStorage.getItem("cartCount")) || 0;
        cartCountSpan.textContent = savedCount;
    }
});