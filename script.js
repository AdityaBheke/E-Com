// Products Page
const productListContainer = document.getElementById('products-list');

async function fetchProducts() {
    try {
      const response = await fetch("./products.json");
      const result = await response.json();
      result.forEach(product => {
        const colContainer = document.createElement('div');
        colContainer.classList.add('col-lg-3', 'col-md-4', 'col-sm-6');
        colContainer.innerHTML = `<div class="card">
                        <img src=${product.image} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><small class="text-body-secondary">$${product.price}</small></p>
                            <a href="#" class="btn btn-primary">Add to cart</a>
                        </div>
                    </div>`;
        productListContainer.append(colContainer);
    });
      console.log(result);
    } catch (error) {
        console.log('Error while fetching products');
    }
}
fetchProducts();

// Cart Page

document.addEventListener('DOMContentLoaded',()=>{
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
          if (quantity.value<1) {
            window.alert('Quantity must be greater than or equal to 1.')
            quantity.value = (JSON.parse(localStorage.getItem("cart")) || [])[index].quantity; 
          }
          updateQuantity(quantity.value,index);
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
    cartItems.splice(index,1);
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
    const totalLabel = document.getElementById('amount');
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cartItems);
    const cartTotal = cartItems.reduce((total, item)=>{
      return (item.quantity * item.price)+total;
    },0);
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
})


