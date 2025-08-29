function loadCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');
  const checkoutBtn = document.getElementById('checkout-btn');

  cartContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    checkoutBtn.disabled = true;
    totalPriceEl.textContent = "Total: ₹0";
    return;
  }

  cart.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.classList.add('cart-item');

    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="50">
      <span>${item.name} (Size: ${item.size})</span>
      <div class="quantity-control">
        <button class="decrease">-</button>
        <input type="number" value="${item.quantity}" min="1">
        <button class="increase">+</button>
      </div>
      <span>₹${item.price * item.quantity}</span>
      <button class="remove-btn">Remove</button>
    `;

    cartContainer.appendChild(itemEl);

    // Quantity buttons
    const qtyInput = itemEl.querySelector('input[type="number"]');
    itemEl.querySelector('.decrease').addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
        updateCart(cart);
      }
    });

    itemEl.querySelector('.increase').addEventListener('click', () => {
      item.quantity++;
      updateCart(cart);
    });

    qtyInput.addEventListener('change', () => {
      let val = parseInt(qtyInput.value);
      if (val < 1 || isNaN(val)) val = 1;
      item.quantity = val;
      updateCart(cart);
    });

    // Remove button
    itemEl.querySelector('.remove-btn').addEventListener('click', () => {
      cart.splice(index, 1);
      updateCart(cart);
    });

    total += item.price * item.quantity;
  });

  totalPriceEl.textContent = `Total: ₹${total}`;
  checkoutBtn.disabled = false;
}

// Update cart and reload UI
function updateCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

document.addEventListener('DOMContentLoaded', loadCart);

// Checkout button action
document.getElementById('checkout-btn').addEventListener('click', () => {
  alert("Proceeding to checkout...");
  // You can redirect: window.location.href = "checkout.html";
});
