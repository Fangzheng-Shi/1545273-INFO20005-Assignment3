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

/* Checkout page: Rendering the shopping cart & calculating the total price —— */
document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalAmountSpan = document.getElementById("totalAmount");
  
    // Define product metadata mapping: productId -> { name, price, imageSrc }
    const products = {
        // be consistent when using data-id="uber20off" in productList.js
        uber20off: {
            name: "Uber ride $20 OFF",
            price: 4.99,
            imageSrc: "sources/product_uber.png"
        },
        // data-id="maccaMeal" in productList.js
        maccaMeal: {
            name: "Macca Meal Coupon",
            price: 2.99,
            imageSrc: "sources/product_macca.png"
        }
    };
  
    // Read the shopping cart object from localStorage
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || {};
  
    // If the cart is empty:
    const productIds = Object.keys(shoppingCart);
    if (productIds.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "Your cart is empty.";
        emptyMsg.style.fontSize = "18px";
        emptyMsg.style.color = "#555";
        emptyMsg.style.margin = "40px";
        cartItemsContainer.appendChild(emptyMsg);
        // at the same time, total is set to 0
        totalAmountSpan.textContent = "0";
        return;
    }
  
    // Traverse each item in the shopping cart and dynamically generate .cart-card
    let totalPrice = 0;
    let hasPositiveItem = false;

    productIds.forEach(function(productId) {
        const qty = parseInt(shoppingCart[productId], 10) || 0;
        // Only render products with qty > 0
        if (qty > 0 && products[productId]) {
            hasPositiveItem = true;
            const { name, price, imageSrc } = products[productId];

            // Calculate the total price of this item
            totalPrice += qty * price;

            // Create the outermost node of the card
            const card = document.createElement("div");
            card.classList.add("cart-card");

            // The picture part on left-side
            const imgWrapper = document.createElement("div");
            imgWrapper.classList.add("card-img");
            const imgEl = document.createElement("img");
            imgEl.src = imageSrc;
            imgEl.alt = name;
            imgWrapper.appendChild(imgEl);

            // Product info section on right side 
            const infoWrapper = document.createElement("div");
            infoWrapper.classList.add("card-info");

            // Product title + quantity (× qty)
            const titleEl = document.createElement("p");
            titleEl.classList.add("item-title");
            titleEl.textContent = `${name} × ${qty}`;
            infoWrapper.appendChild(titleEl);

            // Single price information
            const priceEl = document.createElement("p");
            priceEl.classList.add("item-qty-price");
            priceEl.innerHTML = `Price: <span style="color:#e74c3c;">${(price * qty).toFixed(2)}</span>`;
            infoWrapper.appendChild(priceEl);

            // “Sent it in 24 hours” texts
            const sentEl = document.createElement("p");
            sentEl.classList.add("item-sent");
            sentEl.textContent = "Sent it in 24 hours";
            infoWrapper.appendChild(sentEl);

            // Assemble the left and right parts into the card
            card.appendChild(imgWrapper);
            card.appendChild(infoWrapper);

            // Insert the card into the .cart-items container
            cartItemsContainer.appendChild(card);
        }
    });

    // If there is no product with qty > 0 in the entire shopping cart, it will display "Your cart is empty"
    if (!hasPositiveItem) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "Your cart is empty.";
        emptyMsg.style.fontSize = "18px";
        emptyMsg.style.color = "#555";
        emptyMsg.style.margin = "40px";
        cartItemsContainer.appendChild(emptyMsg);
        totalPrice = 0;
    }

    // The total price is displayed at the bottom of the page, with two decimal places
    totalAmountSpan.textContent = totalPrice.toFixed(2);

    // display the shopping cart quantity in the upper right corner of the checkout page
    const cartCountSpan = document.getElementById("cartCount");
    if (cartCountSpan) {
        const savedCount = parseInt(localStorage.getItem("cartCount")) || 0;
        cartCountSpan.textContent = savedCount;
    }
});
  