import './Sass/style.scss';

let cartIcon = document.querySelector(".cart-icon");
let cartcard = document.querySelector(".cart-card");
let quantityButton = document.querySelectorAll(".quantity-button");
let quantityDisplay = document.getElementById("quantity");
let cartButton = document.querySelector(".cart-btn");
let cartproducts = document.querySelector(".cart-products");
let productReview;


// hide the cart-card
let cartvisible = false
cartcard.style.display = "none"

// Add event to show the cart
cartIcon.addEventListener("click", () => {
    cartcard.style.display = "block"

    switch (cartvisible) {
        case true:
            cartcard.style.display = "none";
            cartvisible = false;
            break;
        case false:
            cartcard.style.display = "block";
            cartvisible = true;

    }
})

// Function to calculate product quantity

let quantity = 1;

function updateQuantity() {
    quantityDisplay.textContent = quantity;
}

quantityButton.forEach(button => {
    button.addEventListener("click", (e) => {
        const click = e.target.getAttribute("data-action")

        if (click === "decrement" && quantity > 1) {
            quantity--;
        } else if (click === "increment") {
            quantity++;
        }
        updateQuantity();
    })
});
updateQuantity();

// Add event and function to add  product to  cart

let productPrice = 125.00;
let productName = document.getElementById("product-name");
let showCheckoutButton = false;
let removeItem;
let cartQuantity = 0;

function calculateTotalPrice() {
    return quantity * productPrice;
}
function addToCart() {
    const totalPrice = calculateTotalPrice();
    const totalPriceElement = document.createElement("h4")
    totalPriceElement.className = "total-price";
    totalPriceElement.textContent = `$${totalPrice}.00`;


    const itemName = productName.innerHTML;
    const itemNameElement = document.createElement("span");
    itemNameElement.className = "item-name";
    itemNameElement.innerHTML = itemName;

    productReview = document.querySelector(".product-review");
    const productImage = productReview.src;

    const itemList = document.createElement("li");
    removeItem = document.createElement("span");
    removeItem.className = "delete-button";
    removeItem.addEventListener("click", (e) => {
        itemList.remove();

        cartQuantity -= quantity;
        updateCartNotification()
        showCartNotification();
        // check the last index of the cart to remove the check out button

        if (cartproducts.children.length === 0) {
            removeCheckoutButton();
            showCartMassage();
            hideCartNotification();
            cartQuantity = 0;
        }

    });

    const cartImage = document.createElement("img");
    cartImage.src = productImage;


    itemList.appendChild(cartImage);

    // create the container to wrap the price details

    const productDetails = document.createElement("div");
    productDetails.className = "product-details";

    // create a container for the price and quantity

    const productPriceDetails = document.createElement("div");
    productPriceDetails.className = "price-details";


    const productPriceElement = document.createElement("p");
    productPriceElement.innerText = `$${productPrice}`;

    const productQuantityElement = document.createElement("p");
    productQuantityElement.innerHTML = ` x ${quantity}`;

    productPriceDetails.append(productPriceElement, productQuantityElement, totalPriceElement);
    productDetails.append(itemNameElement, productPriceDetails);

    itemList.appendChild(productDetails);
    itemList.appendChild(removeItem);
    cartproducts.appendChild(itemList);

    // check if there is a checkout button 

    if (!showCheckoutButton) {
        showCheckoutButton = true;
        checkout();
    }

    //  hide the cart massage  and 

    if (cartproducts.children.length !== 0) {
        hideCartMassage();

        // show Notification

        cartQuantity += quantity;
        updateCartNotification()
        showCartNotification();
    }
}
// function to update the quantity Notification
let cartNotify = document.querySelector(".cart-notify");
cartNotify.style.display = "none";

const updateCartNotification = () => {
    if (cartNotify) {
        cartNotify.textContent = cartQuantity;
    }
}
// Function to hide the cart notification
const hideCartNotification = () => {
    if (cartNotify) {
        cartNotify.style.display = "none";
    }
}

// Function to show the cart notification
const showCartNotification = () => {
    if (cartNotify) {
        cartNotify.style.display = "block";

    }
}

// create a checkout button
const checkout = () => {
    let checkoutButton = document.createElement("button");
    checkoutButton.className = "checkout-Button";
    checkoutButton.innerHTML = "Checkout";
    cartcard.appendChild(checkoutButton);
    removeItem = document.createElement("span");


}
// function to remove the checkout button
const removeCheckoutButton = () => {
    const checkoutButton = document.querySelector(".checkout-Button");
    if (checkoutButton) {
        checkoutButton.remove();
        showCheckoutButton = false;
    }
}
// add event to Add to cart button
cartButton.addEventListener("click", () => {
    addToCart();
})

// function to show and hide cart massage

let cartEmptyMassage;

const showCartMassage = () => {
    cartEmptyMassage = document.querySelector(".cart-massage");
    cartEmptyMassage.style.display = "block";
}
// function to hide the cart massage 

const hideCartMassage = () => {
    cartEmptyMassage = document.querySelector(".cart-massage");
    cartEmptyMassage.style.display = "none";
}

// Add click  event listener to image thumbnails to show full size image in product review

let thumbnailContainer = document.querySelectorAll(".thumbnail-container");


thumbnailContainer.forEach(thumbnail => {
    thumbnail.addEventListener("click", (event) => {
        thumbnailContainer.forEach(thumb => {
            thumb.classList.remove("active-thumbnail")
            thumbnail.classList.add('active-thumbnail');
        })
        const fullImage = event.currentTarget.querySelector(".product-thumbnail").getAttribute("data-image");
        productReview = document.querySelector(".product-review");
        productReview.src = fullImage;
    })
});



// Add function to popout image gallery and review

let productGallery = document.querySelector(".product-page-review");
let productView = document.querySelector(".product-image");
let cloneproductView = document.querySelector(".product-image-pop");

cloneproductView.style.display = "none"


let isCloned = false;
let clone;


// function to create cloneproductView

let cloneProductPageReview;
let clonethumbnailContainer;
let cloneproductReview;


const createClone = () => {
    if (!isCloned) {
        clone = productView.cloneNode(true);
        cloneproductView.appendChild(clone);
        isCloned = true;

        document.body.classList.add("blurred")
        cloneproductView.style.display = "block"

        clonethumbnails = clone.querySelectorAll(".product-thumbnail");
        clonethumbnailContainer = clone.querySelectorAll(".thumbnail-container");
        cloneproductReview = clone.querySelector(".product-review");


        clonethumbnailContainer.forEach(thumbnail => {
            thumbnail.addEventListener("click", (event) => {
                clonethumbnailContainer.forEach(clonethumb => {
                    clonethumb.classList.remove("active-thumbnail");
                });

                thumbnailContainer.forEach(thumb => {
                    thumb.classList.remove("active-thumbnail")
                })

                thumbnail.classList.add('active-thumbnail');

                const cloneimagesrc = event.currentTarget.querySelector(".product-thumbnail").getAttribute("data-image");
                productReview = document.querySelector(".product-review");

                productReview.src = cloneimagesrc;
                cloneproductReview.src = cloneimagesrc;
            })
        });

        // call and append buttons to cloneProductPageReview

        cloneProductPageReview = clone.querySelector(".product-page-review")

        cloneProductPageReview.appendChild(backButton);
        cloneProductPageReview.appendChild(nextButton);


        // call and append the close cloneproductView
        cloneproductView.appendChild(hideCloneButton)


    } else {
        clone = productView.cloneNode(false);

    }
}
// check if ismobile view before creating clone

const isMobile = window.innerWidth <= 768;

if (!isMobile) {
    productGallery.addEventListener("click", createClone);
}


// function to create back and next button

let currentThumbnail = 0;

let thumbnails = document.querySelectorAll(".product-thumbnail")
let clonethumbnails;

let updateproductReview = () => {

    clonethumbnails = clone.querySelectorAll(".product-thumbnail");
    productReview = document.querySelector(".product-review");


    productReview.src = thumbnails[currentThumbnail].getAttribute("data-image");
    cloneproductReview.src = clonethumbnails[currentThumbnail].getAttribute("data-image");
}

// function for removing and adding active thumbnails

let updateActiveThumbnail = () => {
    thumbnailContainer.forEach(thumb => {
        thumb.classList.remove("active-thumbnail")
    })
    thumbnailContainer[currentThumbnail].classList.add("active-thumbnail");

    clonethumbnailContainer.forEach(clonethumb => {
        clonethumb.classList.remove("active-thumbnail");
    });

    clonethumbnailContainer[currentThumbnail].classList.add("active-thumbnail");
}

// function for previous and nexting

let backButton;
let nextButton;

function createButton() {

    backButton = document.createElement("span");
    backButton.className = "back-button";


    backButton.addEventListener("click", () => {
        if (currentThumbnail > 0 && clonethumbnails.length > 0) {
            currentThumbnail--;

            updateActiveThumbnail()
            updateproductReview();

        }
    })

    nextButton = document.createElement("span");
    nextButton.className = "next-Button";

    nextButton.addEventListener("click", () => {

        if (currentThumbnail < thumbnails.length - 1) {
            if (currentThumbnail < clonethumbnails.length - 1) {
                currentThumbnail++;
            }

            updateActiveThumbnail()
            updateproductReview();
        }
    })
}

createButton();





// Add function to hide case image gallery and review

let hideCloneButton;

function closeclone() {
    hideCloneButton = document.createElement("span");
    hideCloneButton.className = "hide-button";


    hideCloneButton.addEventListener("click", () => {
        if (isCloned) {
            // Check if the clone is a child of cloneproductView before removing
            if (cloneproductView.contains(clone)) {
                cloneproductView.removeChild(clone);
            }
            isCloned = false;
        }

        document.body.classList.remove("blurred");
        cloneproductView.style.display = "none";
    })

}
closeclone()

// function for previous and nexting for mobile

let updateMobileproductReview = () => {
    productReview = document.querySelector(".product-review");
    productReview.src = thumbnails[currentThumbnail].getAttribute("data-image");
}

const backBtn = document.querySelector(".back-btn")
const nextBtn = document.querySelector(".next-btn")

backBtn.addEventListener("click", () => {
    if (currentThumbnail > 0) {
        currentThumbnail--;
        updateMobileproductReview()
    }

})
nextBtn.addEventListener("click", () => {
    if (currentThumbnail < thumbnails.length) {
        currentThumbnail++;
        updateMobileproductReview()
    }

})

// for menu slide in mobile screen 

let navLinks = document.getElementById("nav-links");
let menuBar = document.querySelector(".menu-bar");

menuBar.addEventListener("click", () => {
    const showMenu = navLinks.getAttribute("data-visible");
    
if (showMenu === "false") {
    navLinks.setAttribute("data-visible", true)
    document.body.classList.add("blurred")
    document.body.classList.add("no-scroll")

}else if (showMenu === "true") {
    navLinks.setAttribute("data-visible", false)
    document.body.classList.remove("blurred")
    document.body.classList.remove("no-scroll")
}
if (menuBar.src.includes("icon-menu.svg")) {
    menuBar.src = "./images/icon-close.svg"; 
    menuBar.classList.add("active-menu")
} else {
    menuBar.src = "./images/icon-menu.svg";
    menuBar.classList.remove("active-menu");

  }
})