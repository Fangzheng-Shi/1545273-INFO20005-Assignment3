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
  
/* After the page is loaded, initialize the shopping cart number and button events */
document.addEventListener("DOMContentLoaded", function() {
    /* Click the shopping cart icon to leave */
    const cartRegion = document.getElementById("headerCart");
    if (cartRegion) {
        cartRegion.style.cursor = "pointer";
        cartRegion.addEventListener("click", function() {
            window.location.href = "shoppingCart.html";
        });
    }
  
    /* read localStorage.cartCount and display it in <span id="cartCount"> */
    const cartCountSpan = document.getElementById("cartCount");
    if (cartCountSpan) {
        const savedCount = parseInt(localStorage.getItem("cartCount")) || 0;
        cartCountSpan.textContent = savedCount;
    }
  
    /* Get the element that needs to be operated in DOM */
    const minusBtn = document.querySelector(".qty-btn.minus");
    const plusBtn  = document.querySelector(".qty-btn.plus");
    const qtyNumberSpan = document.querySelector(".qty-number");
    const addToCartBtn = document.querySelector(".add-to-cart");
    const stockP = document.querySelector(".stock");

    /* Read inventory limit I wrote in the text in html */
    const maxStock = parseInt(stockP.getAttribute("data-stock")) || 1;
    // The minimum initialization number is 1
    let currentQty = 1;
    qtyNumberSpan.textContent = currentQty;
  
    /* “−” button functions as decreasing quantity */
    minusBtn.addEventListener("click", function() {
        if (currentQty > 1) {
            currentQty -= 1;
            qtyNumberSpan.textContent = currentQty;
        }
        // minus until it is equal to 1
    });
  
    /* “+” button functions as increasing quantity */
    plusBtn.addEventListener("click", function() {
        if (currentQty < maxStock) {
            currentQty += 1;
            qtyNumberSpan.textContent = currentQty;
        }
    });
  
    /* "Add to Cart" button functions as writing the current quantity to the shopping cart */
    addToCartBtn.addEventListener("click", function() {
        // First get the existing shopping cart object from localStorage
        let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || {};
  
        // Get the product ID corresponding to this page (must be consistent with the key in productList.js)
        const productId = "maccaMeal";
  
        // Get the previous quantity of the product in local storage (0 if none)
        const prevQty = parseInt(shoppingCart[productId]) || 0;
  
        /* Accumulate the quantity */
        const newQty = prevQty + currentQty;
        shoppingCart[productId] = newQty;
  
        // store the updated shopping cart object to localStorage
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  
        /* Update localStorage.cartCount */
        // get the previous total cartCount
        const prevCartCount = parseInt(localStorage.getItem("cartCount")) || 0;
        // The amount to be increased this time = currentQty
        const delta = currentQty;
        const newCartCount = prevCartCount + delta;
        localStorage.setItem("cartCount", newCartCount);
        if (cartCountSpan) {
            cartCountSpan.textContent = newCartCount;
        }
  
        // Give the user a visual feedback of checked
        addToCartBtn.textContent = "Added ✓";
        setTimeout(() => {
            addToCartBtn.textContent = "Add to Cart";
        }, 1000);
    });
});
  
  