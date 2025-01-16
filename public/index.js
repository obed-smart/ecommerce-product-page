const menu = document.getElementById("menu");
const addButton = document.getElementById("add-cart-btn");
const openMenu = document.getElementById("open-menu");
const closeMenu = document.getElementById("close-menu");
const modal = document.getElementById("modal");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const products = document.querySelectorAll(".product");
const products2 = document.querySelectorAll(".product2");
const thumbnails = document.querySelectorAll(".thumnail");
const thumbnails2 = document.querySelectorAll(".thumnail2");
const slideButton = document.querySelectorAll(".slide-btn");
const slideButton2 = document.querySelectorAll(".slide-btn2");
const addQuantityButton = document.querySelectorAll(".add-quantity");
const productQuantity = document.querySelector(".quantity");
const productPrice = document.querySelector(".product-price");
const cartButton = document.querySelector(".cart-icon");
const cartContainer = document.querySelector(".cart");

let quantity = 1;
let price = 125;
let cart = {};

let slideIndex = 1;
updateQuantityAndPrice();
slideShow(slideIndex);
cartMessage();

// open mobile menu

openMenu.addEventListener("click", () => {
  menu.classList.add("open");
});

// close mobile menu
closeMenu.addEventListener("click", () => {
  menu.classList.remove("open");
});

// select the index on the active product image

function currentSlide(index) {
  slideShow((slideIndex = index));
}

thumbnails.forEach((thumnail, index) => {
  thumnail.addEventListener("click", function (e) {
    currentSlide(index + 1);
  });
});

thumbnails2.forEach((thumnail, index) => {
  thumnail.addEventListener("click", function (e) {
    currentSlide(index + 1);
  });
});

slideButton.forEach((button, index) => {
  button.addEventListener("click", function (e) {
    if (index === 0) slideShow((slideIndex -= 1));
    if (index === 1) slideShow((slideIndex += 1));
  });
});

slideButton2.forEach((button, index) => {
  button.addEventListener("click", function (e) {
    if (index === 0) slideShow((slideIndex -= 1));
    if (index === 1) slideShow((slideIndex += 1));
  });
});

function updateQuantityAndPrice() {
  productQuantity.textContent = quantity;
  productPrice.textContent = price * quantity;
}

function addToCart(e) {
  const productId = e.currentTarget.parentNode.parentNode.dataset.id;
  const productIMage = document.querySelector(".product").src;
  const productName = document.querySelector(".product-name").textContent;
  const productCartPrice = price;
  const productCartQuantity = Number(productQuantity.textContent);
  const productTotalPrice = productCartPrice * productCartQuantity;

  if (cart[productId]) {
    cart[productId].productCartQuantity += Number(productQuantity.textContent);
    cart[productId].productTotalPrice =
      cart[productId].productCartQuantity * productCartPrice;
    displayCart();
  }

  if (!cart[productId]) {
    cart[productId] = {
      productIMage,
      productName,
      productCartPrice,
      productCartQuantity,
      productTotalPrice,
    };
  }

  quantity = 1;
  document.querySelector(".cart-list").classList.remove("empty");
  updateQuantityAndPrice();
  displayCart();
  cartMessage();
}

// console.log(cart);

addQuantityButton.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (index === 0 && quantity > 1) {
      quantity--;
      updateQuantityAndPrice();
    }

    if (index === 1) {
      quantity++;
      updateQuantityAndPrice();
    }
  });
});

// add product to the cart
addButton.addEventListener("click", (e) => {
  const productId = e.currentTarget.parentNode.parentNode.dataset.id;

  addToCart(e);
});

// display cart notification

function cartMessage() {
  const productMsgQuantity = document.querySelector(".cart-msg");
  let productNotification = 0;
  productMsgQuantity.textContent = productNotification;

  for (const product of Object.values(cart)) {
    productNotification += product.productCartQuantity;

    productMsgQuantity.textContent = productNotification;
  }
}

// open and close the product cart

cartButton.addEventListener("click", () => {
  cartContainer.classList.toggle("show-cart");
});

// display the product on the cart

function displayCart() {
  const cartList = document.querySelector(".cart-list");
  let product;
  for (const item of Object.values(cart)) {
    product = `<div data-id="${item.productId}" class=" relative mt-3 lg:mt-2">
  <div class="flex gap-4 items-center ">
    <img src="../images/image-product-1.jpg" alt="" class="w-16 aspect-square rounded-lg lg:w-14">
    <div class="space-y-2">
      <h1 class="text-[1.1rem] text-darkGrayishBlue font-bold">${item.productName}</h1>
      <p class="text-xl">
        <span class="text-darkGrayishBlue">$${item.productCartPrice}.00</span> x
        <span class="text-darkGrayishBlue">${item.productCartQuantity}</span>
        <span class="text-veryDarkBlue font-bold">$${item.productTotalPrice}.00</span>
      </p>
    </div>
    <img id="delete-cart-btn" src="../images/icon-delete.svg" alt="" class="absolute cursor-pointer right-0 top-10 w-4">
  </div>
  <button id="checkout-btn"   class="w-full lg:mt-4 lg:py-2 lg:text-xl mt-8 text-2xl font-semibold bg-customOrange py-4 rounded-lg">
    Checkout
  </button>
  </div>`;
    cartList.innerHTML = product;
    deleteCartproduct(item, cartList);
  }

  const checkOutButton = document.getElementById("checkout-btn");

  checkOutButton.addEventListener("click", () => {
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
}

// slide to the clicked , next or previous product image

function slideShow(index) {
  // return to the first index when the product reach last

  if (index > products.length) slideIndex = 1;
  if (index < 1) slideIndex = products.length;

  // hide the privious index of the product when moving to another

  for (const index of Object.keys(products)) {
    products[index].style.display = "none";
    products2[index].style.display = "none";
  }

  // remove the active state on the thumbnails

  for (const index of Object.keys(thumbnails)) {
    thumbnails[index].classList.remove("current");
    thumbnails2[index].classList.remove("current");
  }

  // display the first image and thumbnail of the product

  products[slideIndex - 1].style.display = "block";
  products2[slideIndex - 1].style.display = "block";
  thumbnails[slideIndex - 1].classList.add("current");
  thumbnails2[slideIndex - 1].classList.add("current");
}

// open modal

openModal.addEventListener("click", () => {
  modal.classList.add("lg:flex");
});

// close modal
closeModal.addEventListener("click", () => {
  modal.classList.remove("lg:flex");
});

function deleteCartproduct(item, cartList) {
  const deleteCartProductBtn = document.getElementById("delete-cart-btn");
  const productsId = item.productId;

  if (!deleteCartProductBtn) return;

  const cartId = Object.keys(cart).find(
    (item) => cart[item].productId === productsId
  );
  if (!cart[cartId]) return;
  const emptyMg = document.querySelector(".cart-list");

  deleteCartProductBtn.addEventListener("click", (e) => {
    cartList.innerHTML = `<p class="text-darkGrayishBlue group-[&:not(.empty)]:hidden  text-xl font-semibold">Your cart is empty</p>`;
    emptyMg.classList.add("empty");

    e.target.parentNode.parentNode.remove();
    delete cart[cartId];

    cartMessage();
  });
}
