const cartlength = document.querySelector("#cart-length");
const loader = document.querySelector(".loader");

function fetchCart() {
  fetch("http://localhost:3000/cart")
    .then((res) => res.json())
    .then((data) => {
      cartlength.innerHTML = data.length;
    });
}
fetchCart();
