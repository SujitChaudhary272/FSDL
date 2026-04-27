const $ = id => document.getElementById(id), cart = {}, rupee = "\u20B9";
const products = [...document.querySelectorAll(".list .item")].map(item => ({
  id: +item.dataset.id,
  name: item.dataset.name,
  price: +item.dataset.price
}));
const find = id => products.find(p => p.id == id);

function renderCart() {
  const ids = Object.keys(cart);
  $("cartItems").innerHTML = ids.length ? ids.map(id => {
    const p = find(id), q = cart[id];
    return `
      <div class="item">
        <div>
          <h4>${p.name}</h4>
          <small>${rupee}${p.price} each</small>
        </div>
        <div>
          <div class="qty">
            <button onclick="changeQty(${id},-1)">-</button>
            <span>${q}</span>
            <button onclick="changeQty(${id},1)">+</button>
          </div>
          <small>${rupee}${p.price * q}</small>
        </div>
      </div>
    `;
  }).join("") : "<div class='empty'>Your cart is empty.</div>";
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}

function changeQty(id, value) {
  cart[id] += value;
  if (cart[id] < 1) delete cart[id];
  renderCart();
}

function clearCart() {
  for (let id in cart) delete cart[id];
  renderCart();
}

function checkout() {
  const total = Object.keys(cart).reduce((sum, id) => sum + find(id).price * cart[id], 0);
  if (!total) return alert("Your cart is empty. Add products first.");
  alert(`Order placed successfully. Amount paid: ${rupee}${total}`);
  clearCart();
}

renderCart();
