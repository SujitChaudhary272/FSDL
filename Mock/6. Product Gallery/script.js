const products = [
  { name: "Laptop", price: 50000, img: "images/p1.jpg" },
  { name: "Mobile", price: 20000, img: "images/p2.jpg" },
  { name: "Headphones", price: 2000, img: "images/p3.jpg" },
  { name: "Keyboard", price: 1500, img: "images/p4.jpg" },
  { name: "Mouse", price: 800, img: "images/p5.jpg" },
  { name: "Monitor", price: 12000, img: "images/p6.jpg" },
  { name: "Speaker", price: 3000, img: "images/p7.jpg" },
  { name: "Camera", price: 25000, img: "images/p8.jpg" }
]

document.getElementById("products").innerHTML = products.map(p => `
  <div class="card">
    <img src="${p.img}">
    <h3>${p.name}</h3>
    <p class="price">Rs.${p.price}</p>
    <button onclick="buy('${p.name}')">Buy Now</button>
  </div>
`).join("")

function buy(name) {
  alert(name + " purchased!")
}
