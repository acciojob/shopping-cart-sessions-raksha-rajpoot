// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = loadCartFromSession();

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

 // Attach event listeners
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
	 cartList.innerHTML = ""; // Clear existing
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button class="remove-from-cart-btn" data-index="${index}">Remove</button>`;
    cartList.appendChild(li);
}
 // Attach remove listeners
  document.querySelectorAll(".remove-from-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-index"));
      removeFromCart(index);
    });
  });
}
			   

// Add item to cart
function addToCart(productId) {
	const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    saveCartToSession();
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
	cart.splice(productId, 1);
  saveCartToSession();
  renderCart();
}

// Clear cart
function clearCart() {
	  cart = [];
  saveCartToSession();
  renderCart();
}

	// Load cart from sessionStorage
	function loadCartFromSession() {
  const data = sessionStorage.getItem("shoppingCart");
  return data ? JSON.parse(data) : [];
}

// Save cart to sessionStorage
function saveCartToSession() {
  sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Event listener for clear cart
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
