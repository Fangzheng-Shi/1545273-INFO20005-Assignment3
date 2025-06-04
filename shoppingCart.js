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

document.addEventListener("DOMContentLoaded", function() {
    const cartCountSpan = document.getElementById("cartCount");
    // read the number of cart number from cartCount
    const savedCount = parseInt(localStorage.getItem("cartCount")) || 0;
    cartCountSpan.textContent = savedCount;
});

// To implement functions for shopping cart
document.addEventListener("DOMContentLoaded", function() {
    // Define the information of two products I am going to use
    const products = {
        "uber20off": {
            id: "uber20off",
            name: "Uber Ride $20 OFF",
            price: 4.99,
            imgSrc: "sources/product_uber.png"
        },
        "maccaMeal": {
            id: "maccaMeal",
            name: "Macca Meal Coupon",
            price: 2.99,
            imgSrc: "sources/product_mega.png"
        }
    };
  
    const cartItemsContainer  = document.getElementById("cartItemsContainer");
    const cartTotalContainer  = document.getElementById("cartTotalContainer");
    const cartTotalValue      = document.getElementById("cartTotalValue");
    const headerCartCountSpan = document.getElementById("cartCount");
  
    // Read data from localStorage
    const cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
    headerCartCountSpan.textContent = cartCount;
  
    // Read data from shoppingCart（{ uber20off: x, maccaMeal: y }）
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || {};
  
    // The function to render the cart
    function renderCartItems() {
        cartItemsContainer.innerHTML = ""; // Clean old contents
        let totalPrice = 0;
        let hasAnyItem = false;
  
        // Traverse “uber20off” and “maccaMeal” two keys
        Object.keys(products).forEach(prodId => {
            const quantity = parseInt(shoppingCart[prodId]) || 0;
            if (quantity > 0) {
                hasAnyItem = true;
                const prod = products[prodId];
                const lineTotal = prod.price * quantity;
                totalPrice += lineTotal;
  
                // Create product items within the cart page
                const itemDiv = document.createElement("div");
                itemDiv.className = "cart-item";
                itemDiv.dataset.prodid = prodId;
                itemDiv.innerHTML = `
                    <img src="${prod.imgSrc}" alt="${prod.name}" />
                    <div class="cart-item-details">
                        <span class="item-name">${prod.name}</span>
                        <div class="quantity-controls">
                            <button class="qty-decrease">−</button>
                            <span class="qty-value">${quantity}</span>
                            <button class="qty-increase">+</button>
                        </div>
                        <span class="line-total">$${lineTotal.toFixed(2)}</span>
                    </div>
                `;
                cartItemsContainer.appendChild(itemDiv);
  
                // bind “+” button
                const btnInc = itemDiv.querySelector(".qty-increase");
                btnInc.addEventListener("click", function() {
                    shoppingCart[prodId] = (shoppingCart[prodId] || 0) + 1;
                    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  
                    // cartCount +1 as well
                    const newCartCount = parseInt(localStorage.getItem("cartCount")) + 1;
                    localStorage.setItem("cartCount", newCartCount);
                    headerCartCountSpan.textContent = newCartCount;
  
                    renderCartItems(); // re-render
                });
  
                // bind “−” button
                const btnDec = itemDiv.querySelector(".qty-decrease");
                btnDec.addEventListener("click", function() {
                    const prev = parseInt(shoppingCart[prodId]) || 0;
                    if (prev > 0) {
                        shoppingCart[prodId] = prev - 1;
                        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  
                        // cartCount −1 as well
                        const newCartCount = Math.max(0, parseInt(localStorage.getItem("cartCount")) - 1);
                        localStorage.setItem("cartCount", newCartCount);
                        headerCartCountSpan.textContent = newCartCount;
  
                        renderCartItems(); // re-render
                    }
                });
            }
        });
  
        // Decided whether to show the total price and corresponding info according to hasAnyItem
        // or just nothing here...
        if (hasAnyItem) {
            cartTotalValue.textContent = `$${totalPrice.toFixed(2)}`;
            cartTotalContainer.style.display = "flex";
            const emptyP = cartItemsContainer.querySelector(".empty-content");
            if (emptyP) emptyP.remove();
        } else {
            // Tell users it is empty in the cart if nothing has been added
            if (!cartItemsContainer.querySelector(".empty-content")) {
                const p = document.createElement("p");
                p.className = "empty-content";
                p.textContent = "Nothing Here. Go check out what you want~";
                cartItemsContainer.appendChild(p);
            } else {
                cartItemsContainer.querySelector(".empty-content").style.display = "block";
            }
            cartTotalContainer.style.display = "none";
        }
    }
  
    // first time render
    renderCartItems();

    // Go to checkOut page when click the button
    const buyNowBtn = document.querySelector(".buy-now-button");
    if (buyNowBtn) {
        buyNowBtn.addEventListener("click", function() {
            // Double check whether shoppingCart has a product satisfying qty > 0
            const hasItems = Object.values(shoppingCart).some(qty => parseInt(qty, 10) > 0);
            if (hasItems) {
                window.location.href = "checkOut.html";
            }
        });
    }
});

