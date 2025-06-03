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

    const cartCountSpan = document.getElementById("cartCount");
  
    // Initialization：read cartCount data from localStorage
    const savedCount = parseInt(localStorage.getItem("cartCount")) || 0;
    cartCountSpan.textContent = savedCount;
  
    // Initialization：if localStorage.shoppingCart is empty，assign it to a empty set
    const shoppingCartObj = JSON.parse(localStorage.getItem("shoppingCart")) || {};
  
    // Bind all .add-to-cart buttons
    const addButtons = document.querySelectorAll(".add-to-cart");
    addButtons.forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            event.stopPropagation();
  
            // Update numbers in cartCount 
            const currentCount = parseInt(cartCountSpan.textContent) || 0;
            const newCount = currentCount + 1;
            cartCountSpan.textContent = newCount;
            localStorage.setItem("cartCount", newCount);
  
            // Update the specific product ID and show its amount in shoppingCartObj
            const prodId = this.dataset.id; // "uber20off" or "maccaMeal"
  
            // If the prodId does not exist，default 0，then +1
            const prevQty = parseInt(shoppingCartObj[prodId]) || 0;
            shoppingCartObj[prodId] = prevQty + 1;
  
            // store in localStorage
            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartObj));
        });
    });
  
    // Bind "click the shopping cart icon in the head" to jump to the shopping cart page
    const headerCart = document.getElementById("headerCart");
    if (headerCart) {
        headerCart.style.cursor = "pointer";
        headerCart.addEventListener("click", function() {
            window.location.href = "shoppingCart.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // First get the Filter button and menu
    const filterBtn = document.getElementById("filterBtn");
    const dropdown = document.getElementById("filterDropdown");

    if (filterBtn && dropdown) {
        // When click the button：switch class to .show in css
        filterBtn.addEventListener("click", function(event) {
            event.stopPropagation(); 
            // switch the class name of show
            dropdown.classList.toggle("show");
        });

        // Click anywhere to close the menu
        document.addEventListener("click", function() {
            // if.show exists，then remove it
            if (dropdown.classList.contains("show")) {
                dropdown.classList.remove("show");
            }
        });

        // When clicking on an item inside a menu: you can prevent event bubbling
        dropdown.addEventListener("click", function(event) {
            event.stopPropagation();
            // const selected = event.target.innerText;
            // console.log("click：", selected);
            dropdown.classList.remove("show"); // Click the filter choices and the menu closes
        });
    }
});
