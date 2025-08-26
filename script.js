const productGrid = document.getElementById("product-grid");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");

/**
 * Subtask 2: Fetch products dynamically from FakeStore API
 * Subtask 1: Display them in responsive grid layout
 */
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    errorBox.textContent = "⚠️ Error loading products. Please try again later.";
    console.error(error);
  } finally {
    loading.style.display = "none"; // Hide loading text
  }
}

// Generate product cards dynamically
function displayProducts(products) {
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" loading="lazy">
      <h3>${product.title}</h3>
      <p class="price">$${product.price}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;

    productGrid.appendChild(card);
  });
}

// Run on page load
fetchProducts();
