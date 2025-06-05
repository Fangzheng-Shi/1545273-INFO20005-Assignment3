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

/* Overlay */
document.getElementById("overlay").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("visible");
    document.getElementById("overlay").classList.remove("visible");
});

/* Shopping cart badge synchronization */
document.addEventListener("DOMContentLoaded", () => {
    const cartCountSpan = document.getElementById("cartCount");
    cartCountSpan.textContent = parseInt(localStorage.getItem("cartCount")) || 0;

    /* “Add to cart” button, maintain the original shopping cart logic */
    const cartObj = JSON.parse(localStorage.getItem("shoppingCart")) || {};
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            const id = btn.dataset.id;
            cartObj[id] = (parseInt(cartObj[id]) || 0) + 1;
            localStorage.setItem("shoppingCart", JSON.stringify(cartObj));

            const newCount = (parseInt(localStorage.getItem("cartCount")) || 0) + 1;
            localStorage.setItem("cartCount", newCount);
            cartCountSpan.textContent = newCount;
        });
    });

    /* Shopping cart icon to Shopping cart page */
    const headerCart = document.getElementById("headerCart");
    if (headerCart) {
        headerCart.style.cursor = "pointer";
        headerCart.addEventListener("click", () => (window.location.href = "shoppingCart.html"));
    }
});

/* Buy Now" only settles the current item */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".buy-now").forEach(btn => {
        btn.addEventListener("click", e => {
            e.stopPropagation();
            const productId = btn.getAttribute("data-id");
            if (!productId) return;

            /* Write the current product ID into buyNowItem, indicating the "buy now" process */
            localStorage.setItem("buyNowItem", productId);

            /* Jump directly to the checkout page (do not change the shopping cart content, nor update cartCount */
            window.location.href = "checkOut.html";
        });
    });
});

/* Filter drop-down menu, keep the original logic */
document.addEventListener("DOMContentLoaded", () => {
    const filterBtn   = document.getElementById("filterBtn");
    const dropdown    = document.getElementById("filterDropdown");
    if (!filterBtn || !dropdown) return;

    filterBtn.addEventListener("click", e => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    });
    document.addEventListener("click", () => dropdown.classList.remove("show"));
    dropdown.addEventListener("click", e => {
        e.stopPropagation();
        dropdown.classList.remove("show");
    });
});
