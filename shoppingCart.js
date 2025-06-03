document.addEventListener("DOMContentLoaded", function() {
    const cartCountSpan = document.getElementById("cartCount");
    // read the number of cart number from cartCount
    const savedCount = parseInt(localStorage.getItem("cartCount")) || 0;
    cartCountSpan.textContent = savedCount;
});

// To implement functions for shopping cart
document.addEventListener("DOMContentLoaded", function() {
    // 1. 定义这两个商品的静态信息
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
  
    // 2. 获取 DOM 引用
    const cartItemsContainer  = document.getElementById("cartItemsContainer");
    const cartTotalContainer  = document.getElementById("cartTotalContainer");
    const cartTotalValue      = document.getElementById("cartTotalValue");
    const headerCartCountSpan = document.getElementById("cartCount");
  
    // 3. 读取 localStorage
    const cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
    headerCartCountSpan.textContent = cartCount;
  
    // 4. 读取 shoppingCart 对象（{ uber20off: x, maccaMeal: y }）
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || {};
  
    // 5. 渲染购物车项的函数
    function renderCartItems() {
        cartItemsContainer.innerHTML = ""; // 清空旧内容
        let totalPrice = 0;
        let hasAnyItem = false;
  
        // 遍历 “uber20off” 和 “maccaMeal” 这两个 key
        Object.keys(products).forEach(prodId => {
            const quantity = parseInt(shoppingCart[prodId]) || 0;
            if (quantity > 0) {
                hasAnyItem = true;
                const prod = products[prodId];
                const lineTotal = prod.price * quantity;
                totalPrice += lineTotal;
  
                // 创建商品行
                const itemDiv = document.createElement("div");
                itemDiv.className = "cart-item";
                itemDiv.dataset.prodid = prodId;
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
                cartItemsContainer.appendChild(itemDiv);
  
                // 5.1 绑定 “+” 按钮
                const btnInc = itemDiv.querySelector(".qty-increase");
                btnInc.addEventListener("click", function() {
                    shoppingCart[prodId] = (shoppingCart[prodId] || 0) + 1;
                    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  
                    // cartCount 也要 +1
                    const newCartCount = parseInt(localStorage.getItem("cartCount")) + 1;
                    localStorage.setItem("cartCount", newCartCount);
                    headerCartCountSpan.textContent = newCartCount;
  
                    renderCartItems(); // 重新渲染
                });
  
                // 5.2 绑定 “−” 按钮
                const btnDec = itemDiv.querySelector(".qty-decrease");
                btnDec.addEventListener("click", function() {
                    const prev = parseInt(shoppingCart[prodId]) || 0;
                    if (prev > 0) {
                        shoppingCart[prodId] = prev - 1;
                        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  
                        // cartCount 也要 −1
                        const newCartCount = Math.max(0, parseInt(localStorage.getItem("cartCount")) - 1);
                        localStorage.setItem("cartCount", newCartCount);
                        headerCartCountSpan.textContent = newCartCount;
  
                        renderCartItems(); // 重新渲染
                    }
                });
            }
        });
  
        // 6. 根据 hasAnyItem 决定是否显示 “您应支付” 和隐藏/显示“Nothing Here”
        if (hasAnyItem) {
            cartTotalValue.textContent = `$${totalPrice.toFixed(2)}`;
            cartTotalContainer.style.display = "flex";
            const emptyP = cartItemsContainer.querySelector(".empty-content");
            if (emptyP) emptyP.remove();
        } else {
            // 如果没有任何商品，则插入 “空” 提示
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
  
    // 页面加载时首次渲染
    renderCartItems();
});
  