const cartlength = document.querySelector("#cart-length");
const loader = document.querySelector(".loader");

function fetchCart() {
  fetch("https://shopping-cart-database.vercel.app/cart")
    .then((res) => res.json())
    .then((data) => {
      cartlength.innerHTML = data.length;
    });
}
fetchCart();
