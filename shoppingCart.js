document.addEventListener("DOMContentLoaded", function() {
    const cartCountSpan = document.getElementById("cartCount");
    // read the number of cart number from cartCount
    const savedCount = parseInt(localStorage.getItem("cartCount")) || 0;
    cartCountSpan.textContent = savedCount;
});

// To implement functions for shopping cart
document.addEventListener("DOMContentLoaded", function() {
    // Store information for usage
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
            imgSrc: "sources/product_macca.png"
        }
    };
  
    const cartItemsContainer  = document.getElementById("cartItemsContainer");
    const cartTotalContainer  = document.getElementById("cartTotalContainer");
    const cartTotalValue      = document.getElementById("cartTotalValue");
    const headerCartCountSpan = document.getElementById("cartCount");

    // Read localStorage'data
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || {};
  
    // Update the cart amount number
    function updateHeaderCartCount() {
        let totalCount = 0;
        for (const prodId in shoppingCart) {
            totalCount += shoppingCart[prodId];
        }
        headerCartCountSpan.textContent = totalCount;
    }

    // Render the shopping cart content to the page
    function renderCartItems() {
        // To clean it first
        cartItemsContainer.innerHTML = "";

        let totalPrice = 0;
        let hasAnyItem = false;
  
        // Traverse localStorage's' shoppingCart obejctives
        for (const prodId in shoppingCart) {
            const quantity = shoppingCart[prodId] || 0;
            // Only when number is bigger than 0 and the id exists, it renders
            if (quantity > 0 && products.hasOwnProperty(prodId)) {
                hasAnyItem = true;
                const prod = products[prodId];

                const lineTotal = prod.price * quantity;
                totalPrice += lineTotal;
  
                // Create cart-item element
                const itemDiv = document.createElement("div");
                itemDiv.className = "cart-item";
                itemDiv.dataset.prodid = prodId;
  
                // The html structure: images + info
                itemDiv.innerHTML = `
                    <img src="${prod.imgSrc}" alt="${prod.name}" />
                    <div class="cart-item-details">
                        <div class="item-info">
                            <span class="item-name">${prod.name}</span>
                            <div class="quantity-controls">
                                <button class="qty-decrease">−</button>
                                <span class="qty-value">${quantity}</span>
                                <button class="qty-increase">+</button>
                            </div>
                            <span class="item-price">$${prod.price.toFixed(2)}</span>
                        </div>
                        <span class="line-total">$${lineTotal.toFixed(2)}</span>
                    </div>
                `;
  
                // Insert a new row into the container
                cartItemsContainer.appendChild(itemDiv);
  
                // for "+" button add clickevent
                const btnIncrease = itemDiv.querySelector(".qty-increase");
                btnIncrease.addEventListener("click", function() {
                    // +1 after click
                    shoppingCart[prodId] = (shoppingCart[prodId] || 0) + 1;

                    /// reset localStorage
                    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

                    // update the amount count
                    renderCartItems();
                    updateHeaderCartCount();
                });
                
                // for "-" button add clickevent
                const btnDecrease = itemDiv.querySelector(".qty-decrease");
                btnDecrease.addEventListener("click", function() {
                    // to minus the item amount only if when it is  bigger than 0
                    const currentQty = shoppingCart[prodId] || 0;
                    if (currentQty > 0) {
                        shoppingCart[prodId] = currentQty - 1;
                        
                        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
                        
                        renderCartItems();
                        updateHeaderCartCount();
                    }
                });
            }
        }
  
        // Decide whether to show it by checking whether it is empty
        if (hasAnyItem) {
            // empty prompt words
            const emptyP = document.querySelector(".empty-content");
            if (emptyP) emptyP.style.display = "none";
  
            // Update the total pay amount and show the corresponding text content
            cartTotalValue.textContent = `$${totalPrice.toFixed(2)}`;
            cartTotalContainer.style.display = "flex";
        } else {
            // hide empty prompt words when the product added
            if (!document.querySelector(".empty-content")) {
                // if it is deleted, show the prompt words
                const p = document.createElement("p");
                p.className = "empty-content";
                p.textContent = "Nothing Here. Go check out what you want~";
                cartItemsContainer.appendChild(p);
            } else {
                // to show it if it existed
                document.querySelector(".empty-content").style.display = "block";
            }
            cartTotalContainer.style.display = "none";
        }
    }

    // Update the count at the beginning
    renderCartItems();
    updateHeaderCartCount();
});

