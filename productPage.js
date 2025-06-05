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

/* Side bar overplay */
document.getElementById("overlay").addEventListener("click", () => {
  document.getElementById("sidebar").classList.remove("visible");
  document.getElementById("overlay").classList.remove("visible");
});

/* Initialize after page load */
document.addEventListener("DOMContentLoaded", () => {
  /* Top shopping cart corner label */
  const cartCountSpan = document.getElementById("cartCount");
  if (cartCountSpan) cartCountSpan.textContent = parseInt(localStorage.getItem("cartCount")) || 0;

  /* Shopping cart icon redirect */
  const cartRegion = document.getElementById("headerCart");
  if (cartRegion) {
      cartRegion.style.cursor = "pointer";
      cartRegion.addEventListener("click", () => (window.location.href = "shoppingCart.html"));
  }

  /* Quantity selector logics */
  const minusBtn = document.querySelector(".qty-btn.minus");
  const plusBtn  = document.querySelector(".qty-btn.plus");
  const qtyNumberSpan = document.querySelector(".qty-number");
  const addToCartBtn = document.querySelector(".add-to-cart");
  const stockP = document.querySelector(".stock");

  const maxStock = parseInt(stockP.getAttribute("data-stock")) || 1;
  let currentQty = 1;
  qtyNumberSpan.textContent = currentQty;

  minusBtn.addEventListener("click", () => {
      if (currentQty > 1) {
          currentQty -= 1;
          qtyNumberSpan.textContent = currentQty;
      }
  });
  plusBtn.addEventListener("click", () => {
      if (currentQty < maxStock) {
          currentQty += 1;
          qtyNumberSpan.textContent = currentQty;
      }
  });

  /* Add to Cart renders */
  addToCartBtn.addEventListener("click", () => {
      // This page has a fixed product ID
      const productId = "maccaMeal";
      let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || {};
      const prevQty = parseInt(shoppingCart[productId]) || 0;
      const newQty  = prevQty + currentQty;
      shoppingCart[productId] = newQty;
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
      
      const prevCartCount = parseInt(localStorage.getItem("cartCount")) || 0;
      const newCartCount  = prevCartCount + currentQty;
      localStorage.setItem("cartCount", newCartCount);
      if (cartCountSpan) cartCountSpan.textContent = newCartCount;

      addToCartBtn.textContent = "Added ✓";
      setTimeout(() => (addToCartBtn.textContent = "Add to Cart"), 1000);
  });

  /* Buy Now only settles the current item */
  const buyNowBtn = document.querySelector(".buy-now-button");
  if (buyNowBtn) {
      buyNowBtn.addEventListener("click", () => {
          /* Get the data-id on the button */
          const productId = buyNowBtn.dataset.id || "maccaMeal";

          /* Store the id in localStorage.buyNowItem for checkOut.js to read */
          localStorage.setItem("buyNowItem", productId);

          /* Move directly to the checkout page without modifying the shopping cart */
          window.location.href = "checkOut.html";
      });
  }
});
