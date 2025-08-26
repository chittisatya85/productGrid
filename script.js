const productGrid = document.getElementById("product-grid");
const modal = document.getElementById("product-detail");
const closeDetail = document.getElementById("close-detail");
const detailImage = document.getElementById("detail-image");
const detailTitle = document.getElementById("detail-title");
const detailDescription = document.getElementById("detail-description");
const detailPrice = document.getElementById("detail-price");
const totalPrice = document.getElementById("total-price");
const feedback = document.getElementById("feedback");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProduct = null;
let quantity = 1;

// Fetch products
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(products => {
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" width="150">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
      `;
      card.addEventListener("click", () => openProductDetail(product));
      productGrid.appendChild(card);
    });
  })
  .catch(() => { productGrid.innerHTML="<p>Failed to load products.</p>"; });

// Open modal
function openProductDetail(product){
  currentProduct = product;
  detailImage.src = product.image;
  detailTitle.textContent = product.title;
  detailDescription.textContent = product.description;
  detailPrice.textContent = product.price.toFixed(2);
  quantity = 1;
  document.getElementById("quantity").value = quantity;
  document.getElementById("size-select").value = "S";
  document.getElementById("color-select").value = "Red";
  updateTotal();
  modal.style.display = "block";
  feedback.style.display = "none";
}

// Close modal
closeDetail.addEventListener("click", ()=> modal.style.display="none");

// Quantity controls
document.getElementById("increase").addEventListener("click", ()=>{ quantity++; document.getElementById("quantity").value=quantity; updateTotal(); });
document.getElementById("decrease").addEventListener("click", ()=>{ if(quantity>1){ quantity--; document.getElementById("quantity").value=quantity; updateTotal(); } });
document.getElementById("quantity").addEventListener("input",(e)=>{ let val=parseInt(e.target.value); if(val>0){quantity=val;updateTotal();}else e.target.value=quantity; });

// Update total
function updateTotal(){
  if(!currentProduct) return;
  totalPrice.textContent = (currentProduct.price*quantity).toFixed(2);
}

// Add to cart
document.getElementById("add-to-cart").addEventListener("click", ()=>{
  const size = document.getElementById("size-select").value;
  const color = document.getElementById("color-select").value;

  // Check duplicate
  let existing = cart.find(item=>item.id===currentProduct.id && item.size===size && item.color===color);
  if(existing) existing.quantity += quantity;
  else cart.push({...currentProduct, size, color, quantity});

  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.textContent = `🛒 Cart (${cart.length})`;
  feedback.style.display="block";
  setTimeout(()=>feedback.style.display="none",2000);
});

// Initialize cart count
cartCount.textContent = `🛒 Cart (${cart.length})`;

// Image zoom effect
const zoomLens = document.getElementById("zoom-lens");
detailImage.addEventListener("mousemove",(e)=>{
  zoomLens.style.display="block";
  const rect = detailImage.getBoundingClientRect();
  const x = e.clientX - rect.left - zoomLens.offsetWidth/2;
  const y = e.clientY - rect.top - zoomLens.offsetHeight/2;
  zoomLens.style.left = `${x}px`;
  zoomLens.style.top = `${y}px`;
});
detailImage.addEventListener("mouseleave",()=>{ zoomLens.style.display="none"; });
