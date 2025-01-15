const menu = document.getElementById("menu");
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

let quantity = 1;
let price = 125;

let slideIndex = 1;
updateQuantityAndPrice();
slideShow(slideIndex);

openMenu.addEventListener("click", () => {
  menu.classList.add("open");
});

closeMenu.addEventListener("click", () => {
  menu.classList.remove("open");
});

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
  productPrice.innerHTML = `$${price * quantity}.00`;
}

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

function slideShow(index) {
  if (index > products.length) slideIndex = 1;
  if (index < 1) slideIndex = products.length;

  for (const index of Object.keys(products)) {
    products[index].style.display = "none";
    products2[index].style.display = "none";
  }

  for (const index of Object.keys(thumbnails)) {
    thumbnails[index].classList.remove("current");
    thumbnails2[index].classList.remove("current");
  }

  products[slideIndex - 1].style.display = "block";
  products2[slideIndex - 1].style.display = "block";
  thumbnails[slideIndex - 1].classList.add("current");
  thumbnails2[slideIndex - 1].classList.add("current");
}

closeModal.addEventListener("click", () => {
  modal.classList.remove("lg:flex");
});

openModal.addEventListener("click", () => {
  modal.classList.add("lg:flex");
});
