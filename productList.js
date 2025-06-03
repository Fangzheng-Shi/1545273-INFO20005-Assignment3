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
/**
 * productList.js
 * 只针对 Uber (uber20off) 和 Macca (maccaMeal) 这两个商品的 Add to cart 按钮，
 * 实现：
 *  1. 点击某个按钮，将 localStorage 中的 cartCount +1，
 *  2. 同时将具体商品数量存到 localStorage.shoppingCart 对象里，
 *  3. 更新页面头部 #cartCount 数字。
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. 找到“头部购物车计数”节点
    const cartCountSpan = document.getElementById("cartCount");
  
    // 2. 初始化：从 localStorage 读取 cartCount
    const savedCount = parseInt(localStorage.getItem("cartCount")) || 0;
    cartCountSpan.textContent = savedCount;
  
    // 3. 初始化：如果 localStorage.shoppingCart 为空，先给个空对象，否则解析它
    const shoppingCartObj = JSON.parse(localStorage.getItem("shoppingCart")) || {};
  
    // 4. 绑定所有 .add-to-cart 按钮的点击事件
    const addButtons = document.querySelectorAll(".add-to-cart");
    addButtons.forEach(function(btn) {
      btn.addEventListener("click", function(event) {
        event.stopPropagation();
  
        // —— a) 更新总数量 cartCount —— 
        const currentCount = parseInt(cartCountSpan.textContent) || 0;
        const newCount = currentCount + 1;
        cartCountSpan.textContent = newCount;
        localStorage.setItem("cartCount", newCount);
  
        // —— b) 更新具体商品 ID 在 shoppingCartObj 中的数量 —— 
        const prodId = this.dataset.id; // "uber20off" 或 "maccaMeal"
  
        // 如果该 prodId 不存在，就默认为 0，再 +1
        const prevQty = parseInt(shoppingCartObj[prodId]) || 0;
        shoppingCartObj[prodId] = prevQty + 1;
  
        // 存回 localStorage
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartObj));
      });
    });
  
    // 5. （可选）绑定“点击头部购物车图标”跳转到购物车页面
    const headerCart = document.getElementById("headerCart");
    if (headerCart) {
      headerCart.style.cursor = "pointer";
      headerCart.addEventListener("click", function() {
        window.location.href = "shoppingCart.html";
      });
    }
  });
  