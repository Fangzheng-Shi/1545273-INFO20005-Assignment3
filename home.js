/* The carousel part */
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelector(".carousel-indicators");
let currentIndex = 0;
let slideInterval;

slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
        goToSlide(index);
        resetInterval();
    });
    indicators.appendChild(dot);
});

function goToSlide(index) {
    const offset = -index * 100;
    document.querySelector(".slides").style.transform = `translateX(${offset}%)`;
    currentIndex = index;
    updateIndicators();
}

function updateIndicators() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}

function nextSlide() {
    const newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
}

function prevSlide() {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(newIndex);
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}

resetInterval();

function openSideBar() {
    
}
