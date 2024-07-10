// Cart Page

document.addEventListener("DOMContentLoaded", () => {
  const cartItemContainer = document.getElementById("cart-item-container");

  function renderCartItem() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems.length >= 1) {
      cartItemContainer.innerHTML = "";
      cartItems.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div class="card-image-container">
                      <img src="${item.image}" alt="">
                  </div>
                  <p class="card-title">${item.name}</p>
                  <p class="card-title">$${item.price}</p>
                  <div class="cart-card-actions">
                      <input type="number" min="1" class="cart-item-quantity" value="${item.quantity}">
                      <button class="remove-item-btn">Remove</button>
                  </div>
        `;
        // Accessing quantity input field and remove button
        const quantity = card.querySelector(".cart-item-quantity");
        const removeButton = card.querySelector(".remove-item-btn");
        // Adding eventlistener to quantity input field and remove button
        quantity.addEventListener("change", () => {
          if (quantity.value < 1) {
            window.alert("Quantity must be greater than or equal to 1.");
            quantity.value = (JSON.parse(localStorage.getItem("cart")) || [])[
              index
            ].quantity;
          }
          updateQuantity(quantity.value, index);
        });
        removeButton.addEventListener("click", () => {
          card.remove();
          removeCartItem(index);
          renderCartItem();
        });
        // Append cart item to cartList
        cartItemContainer.appendChild(card);
      });
    } else {
      cartItemContainer.innerHTML = "Your cart is empty";
    }
  }
  // Remove cart item from database
  function removeCartItem(index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateTotal();
  }
  // Update quantity in database on changing quantity input field
  function updateQuantity(quantity, index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateTotal();
  }

  // Update total
  function updateTotal() {
    const totalLabel = document.getElementById("amount");
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cartItems);
    const cartTotal = cartItems.reduce((total, item) => {
      return item.quantity * item.price + total;
    }, 0);
    totalLabel.textContent = cartTotal;
  }

  // Checkout button
  const checkoutButton = document.querySelector(".checkout-button");
  checkoutButton.addEventListener("click", () => {
    window.alert("Proceed to checkout.");
  });

  // Initial rendering
  renderCartItem();
  updateTotal();
});
