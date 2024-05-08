const shop = document.querySelector("#shop");
const cartlength = document.querySelector("#cart-length");
const totalEl = document.querySelector("#total");
const message = document.querySelector(".message");
const loader = document.querySelector(".loader");
const url = "https://shopping-cart-database.vercel.app";

let total = 0;
let products = [];

function fetchCart() {
  fetch(`${url}/cart`)
    .then((response) => response.json())
    .then((data) => {
      products = data;
      renderHTML(data);
    })
    .then(() => {
      shop.addEventListener("click", (event) => {
        const removeid = event.target.dataset.removeid;
        const type = event.target.dataset.type;
        const id = event.target.dataset.id;
        if (removeid) {
          removeProduct(removeid);
        }
        if (type && id) {
          handleQuantaity(type, id);
        }
      });
    })
    .finally(() => {
      loader.classList.add("hide-loader");
    });
}
fetchCart();

function renderHTML(products) {
  shop.innerHTML = "";
  products.forEach((product) => {
    /*html*/
    shop.innerHTML += `
    <tr>
    <td>${product.name}</td>
    <td>
    <img width="50px" height="50px" src=${product.image} alt="${product.image}">
    </td>
    <td>${product.price}</td>
    <td>
      <div class="cart-quantaity">
        <button data-type="down" data-id=${product.id} class="btn primary decreas">-</button>
        <p>${product.quantity}</p>
        <button data-type="up" data-id=${product.id} class="btn primary increase">+</button>
      </div>
    </td>
    <td>
    <button data-removeid=${product.id} class="btn red cart">Remove</button>
    </td>
  </tr>
      `;
  });
  calulateTotal(products);
  if (products.length !== 0) {
    message.classList.add("hide");
  }
}
let counter = 0;
function handleQuantaity(type, id) {
  const currentProduct = products.find((item) => item.id === +id);
  counter = currentProduct.quantity;
  if (type === "down") {
    counter--;
  }
  if (type === "up") {
    counter++;
  }
  if (counter >= 0) {
    fetch(`${url}/cart/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...currentProduct,
        quantity: counter,
      }),
    }).then(() => {
      fetchCart();
    });
  }
}
function calulateTotal(products) {
  total = products.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  totalEl.innerHTML = `Total Price : ${total}`;
}

function removeProduct(id) {
  fetch(`${url}/cart/${id}`, {
    method: "delete",
  }).then(() => {
    fetchCart();
  });
}
