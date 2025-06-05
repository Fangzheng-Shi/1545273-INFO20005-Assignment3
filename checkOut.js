/* Open side bar */
function openSideBar() {
    document.getElementById("sidebar").classList.add("visible");
    document.getElementById("overlay").classList.add("visible");
}

/* Close side bar */
document.getElementById("closeSidebar").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("visible");
    document.getElementById("overlay").classList.remove("visible");
});

/* Side bar Overlay */
document.getElementById("overlay").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("visible");
    document.getElementById("overlay").classList.remove("visible");
});

/* Click the cart icon to go to shoppingCart */
document.addEventListener("DOMContentLoaded", () => {
    const headerCart = document.getElementById("headerCart");
    if (headerCart) {
        headerCart.style.cursor = "pointer";
        headerCart.addEventListener("click", () => {
            window.location.href = "shoppingCart.html";
        });
    }
});

/* Checkout page rendering */
document.addEventListener("DOMContentLoaded", () => {
    /* The shopping cart icon in the upper right corner remains synchronized */
    const cartCountSpan = document.getElementById("cartCount");
    if (cartCountSpan) {
        cartCountSpan.textContent = parseInt(localStorage.getItem("cartCount")) || 0;
    }

    const cartItemsContainer = document.querySelector(".cart-items");
    const totalAmountSpan    = document.getElementById("totalAmount");

    /* Products' data */
    const products = {
        uber20off: {
            name: "Uber ride $20 OFF",
            price: 4.99,
            imageSrc: "sources/product_uber.png"
        },
        maccaMeal: {
            name: "Macca Meal Coupon",
            price: 2.99,
            imageSrc: "sources/product_mega.png"
        }
    };

    /* Buy Now Process */
    const buyNowId = localStorage.getItem("buyNowItem");
    if (buyNowId && products[buyNowId]) {
        // The quantity is fixed to 1
        renderCard(buyNowId, 1);
        totalAmountSpan.textContent = products[buyNowId].price.toFixed(2);
        // Clear immediately when the process finished
        localStorage.removeItem("buyNowItem");
        return;
    }

    /* Regular shopping cart process */
    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || {};
    const idsInCart    = Object.keys(shoppingCart).filter(id => (shoppingCart[id] > 0));

    if (idsInCart.length === 0) {
        cartItemsContainer.innerHTML = "<p style='font-size:18px;color:#555;margin:40px'>Your cart is empty.</p>";
        totalAmountSpan.textContent  = "0";
        return;
    }

    let total = 0;
    idsInCart.forEach(id => {
        const qty = parseInt(shoppingCart[id], 10);
        renderCard(id, qty);
        total += qty * products[id].price;
    });
    totalAmountSpan.textContent = total.toFixed(2);

    /* Rendering a single product card */
    function renderCard(id, qty) {
        const { name, price, imageSrc } = products[id];
        const card = document.createElement("div");
        card.className = "cart-card";

        // The image on left side
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "card-img";
        const img = document.createElement("img");
        img.src = imageSrc; img.alt = name;
        imgWrapper.appendChild(img);

        // Info on right side
        const info = document.createElement("div");
        info.className = "card-info";

        const title = document.createElement("p");
        title.className = "item-title";
        title.textContent = `${name} × ${qty}`;
        info.appendChild(title);

        const priceP = document.createElement("p");
        priceP.className = "item-qty-price";
        priceP.innerHTML = `Price: <span style="color:#e74c3c;">${(price*qty).toFixed(2)}</span>`;
        info.appendChild(priceP);

        const sent = document.createElement("p");
        sent.className = "item-sent";
        sent.textContent = "Sent to your email in 24 hours";
        info.appendChild(sent);

        card.appendChild(imgWrapper);
        card.appendChild(info);
        cartItemsContainer.appendChild(card);
    }
});

/* After clicking Apple Pay, a pop-up window showing “Payment Successful” appears */
document.addEventListener("DOMContentLoaded", () => {
    // FInd the Apple Pay button
    const applePayBtn = document.querySelector(".apple-pay-btn");
    // Find the mask layer container we just added in HTML
    const successOverlay = document.getElementById("successOverlay");

    if (applePayBtn && successOverlay) {
        applePayBtn.addEventListener("click", function (e) {
            e.preventDefault();
            // Display mask layer
            successOverlay.style.display = "block";
            // Disable body scrolling
            document.body.style.overflow = "hidden";
        });

        // Allow clicking any blank area of ​​the mask layer to close the pop-up window:
        successOverlay.addEventListener("click", function (e) {
            // If the click is outside the modal (that is, the overlay area), it will be closed
            if (e.target === successOverlay) {
                hideSuccessModal();
            }
        });

        // After clicking the "back to home" link, the mask layer is automatically closed (and then jumps back to the home page)
        const backHomeLink = successOverlay.querySelector(".back-home-link");
        if (backHomeLink) {
            backHomeLink.addEventListener("click", function () {
                hideSuccessModal();
            });
        }
    }

    // Hide the popup and restore scrolling
    function hideSuccessModal() {
        successOverlay.style.display = "none";
        document.body.style.overflow = "";
    }
});

/* Credit Card Payment renders */
document.addEventListener("DOMContentLoaded", () => {
    // Find the "VISA/MasterCard/PayPal" group button
    const cardLogos = document.querySelector(".card-logos");
    // Payment pop-up mask layer
    const paymentOverlay = document.getElementById("paymentOverlay");
    // Payment Modal innermost white frame
    const paymentModal = paymentOverlay ? paymentOverlay.querySelector(".payment-modal") : null;
    // “CheckOut” button
    const cardCheckoutBtn = document.getElementById("cardCheckoutBtn");
    // The already defined Success Modal
    const successOverlay = document.getElementById("successOverlay");

    // If cardLogos & paymentOverlay both exist, bind click event
    if (cardLogos && paymentOverlay) {
        cardLogos.style.cursor = "pointer";
        cardLogos.addEventListener("click", function (e) {
            // Display Payment Modal
            paymentOverlay.style.display = "block";
            // Disable body scrolling
            document.body.style.overflow = "hidden";
        });
    }

    // Click the “CheckOut” button in the Payment Modal
    if (cardCheckoutBtn) {
        cardCheckoutBtn.addEventListener("click", function () {
            // Hide Payment Modal
            paymentOverlay.style.display = "none";
            // Restore body scrolling
            document.body.style.overflow = "";
            // Show Success Modal directly (same as Apple Pay)
            if (successOverlay) {
                successOverlay.style.display = "block";
                document.body.style.overflow = "hidden";
            }
        });
    }

    // I can also close the Payment Overlay by clicking on the blank area
    if (paymentOverlay) {
        paymentOverlay.addEventListener("click", function (e) {
            if (e.target === paymentOverlay) {
                paymentOverlay.style.display = "none";
                document.body.style.overflow = "";
            }
        });
    }

    // parallel to the existing Success Modal logic: click on the blank space to hide Success
    if (successOverlay) {
        successOverlay.addEventListener("click", function (e) {
            if (e.target === successOverlay) {
                successOverlay.style.display = "none";
                document.body.style.overflow = "";
            }
        });
    }
});
