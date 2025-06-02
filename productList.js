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

// To change the number when click "adding to cart"
document.addEventListener("DOMContentLoaded", function() {
    // Initialization: get the cartCount number from localStorage
    const cartCountSpan = document.getElementById("cartCount");
    // if localStorage already has the count number, show it, otherwise show 0
    const savedCount = parseInt(localStorage.getItem("cartCount")) || 0;
    cartCountSpan.textContent = savedCount;
  
    // Bind a click event
    const addButtons = document.querySelectorAll(".add-to-cart");
    addButtons.forEach(function(btn) {
        btn.addEventListener("click", function(event) {

            event.stopPropagation();
            // +1
            const currentCount = parseInt(cartCountSpan.textContent) || 0;
            const newCount = currentCount + 1;
  
            // Update the count number
            cartCountSpan.textContent = newCount;
  
            // store in localStorage
            localStorage.setItem("cartCount", newCount);
        });
    });
});

// Go to shopping cart
document.addEventListener("DOMContentLoaded", function() {
    const cartRegion = document.getElementById("headerCart");
    if (cartRegion) {
        cartRegion.style.cursor = "pointer";
        cartRegion.addEventListener("click", function() {
            window.location.href = "shoppingCart.html";
        });
    }
});
  
