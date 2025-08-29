// Load cart from localStorage (or empty array if none)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart Buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const product = button.closest(".product");

    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);
    const image = product.dataset.image;
    const quantity = parseInt(product.querySelector("input[type='number']").value);

    // Check if item already in cart
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ id, name, price, image, quantity });
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to cart! 🛒`);
  });
});

// Quantity controls (+ and -) inside product cards
document.querySelectorAll(".increase").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.previousElementSibling;
    input.value = parseInt(input.value) + 1;
  });
});

document.querySelectorAll(".decrease").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.nextElementSibling;
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
    }
  });
});
