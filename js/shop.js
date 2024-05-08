const shop = document.querySelector("#shop");
const cartlength = document.querySelector("#cart-length");
const loader = document.querySelector(".loader");
const url = "https://shopping-cart-database.vercel.app";

let cart = [];
let products = [];

function fetchCart() {
  fetch(`${url}/cart`)
    .then((response) => response.json())
    .then((data) => {
      cartlength.innerHTML = data.length;
      cart = data;
      renderHTML(products);
    });
}
function fetchProducts() {
  fetch(`${url}/products`)
    .then((response) => response.json())
    .then((data) => {
      products = data;
      shop.addEventListener("click", (event) => {
        const id = event.target.dataset.id;
        const removeId = event.target.dataset.remove;
        if (removeId) {
          removeFromCart(removeId);
        }
        if (id) {
          addToCart(id);
        }
      });
    })
    .finally(() => {
      loader.classList.add("hide-loader");
    });
}
fetchProducts();
fetchCart();

function renderHTML(products) {
  shop.innerHTML = "";
  products.forEach((product) => {
    let inCart =
      cart.length !== 0 && cart.find((item) => item.id === +product.id);

    shop.innerHTML += `
    <div class="card">
    ${inCart ? `<div class="in-cart">IN CART</div>` : ""}
    <div class="card-image">
    <img  class="img-fluid" src=${product.image} alt="${product.image}">
    ${
      inCart
        ? `<button data-remove=${product.id} class="btn cart red">REMOVE</button>`
        : `<button data-id=${product.id} class="btn cart">ADD TO CART</button>`
    }
    
    </div>
    <div class="content">
      <div class="category">
        <span>${product.category}</span>
      </div>
      <h3 class="title">${product.name.slice(0, 20)}...</h3>
      <span class="price">$${product.price}</span>
    </div>
  </div>
    `;
  });
}

function addToCart(id) {
  const currentProduct = products.find((item) => item.id === +id);
  fetch(`${url}/cart`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...currentProduct, quantity: 1 }),
  }).then(() => {
    fetchCart();
  });
}
function removeFromCart(id) {
  fetch(`${url}/cart/${id}`, {
    method: "delete",
  }).then(() => {
    fetchCart();
  });
}
