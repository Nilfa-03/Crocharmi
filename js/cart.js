/* ========================================
   CROCHARMI SHOPPING CART
   ======================================== */


/* ========================================
   PRODUCT IMAGES
   ======================================== */

const productImages = {

    "keychain": "../assets/images/keychain.jpg",

    "flower": "../assets/images/flower.jpg",

    "bag": "../assets/images/mini-bag.jpg",

    "heart-keychain": "../assets/images/heart-keychain.jpg",

    "tulip": "../assets/images/tulip.jpg",

    "tote": "../assets/images/mini-tote.jpg"

};


/* ========================================
   GET CART
   ======================================== */

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem("crocharmiCart")
        ) || [];

    } catch (error) {

        return [];

    }

}


/* ========================================
   SAVE CART
   ======================================== */

function saveCart(cart) {

    localStorage.setItem(
        "crocharmiCart",
        JSON.stringify(cart)
    );

}


/* ========================================
   FORMAT PRICE
   ======================================== */

function formatPrice(price) {

    return `₱${Number(price).toLocaleString()}`;

}


/* ========================================
   GET PRODUCT IMAGE
   ======================================== */

function getProductImage(item) {

    if (productImages[item.id]) {

        return productImages[item.id];

    }

    return "";

}


/* ========================================
   DISPLAY CART
   ======================================== */

function displayCart() {

    const cart = getCart();

    const emptyCart =
        document.getElementById("empty-cart");

    const cartContent =
        document.getElementById("cart-content");

    const cartItems =
        document.getElementById("cart-items");

    const cartItemCount =
        document.getElementById("cart-item-count");


    /* ====================================
       EMPTY CART
       ==================================== */

    if (cart.length === 0) {

        emptyCart.classList.remove("hidden");

        cartContent.classList.add("hidden");

        if (cartItemCount) {

            cartItemCount.textContent = "0 items";

        }

        updateSummary([]);

        return;

    }


    /* ====================================
       CART HAS PRODUCTS
       ==================================== */

    emptyCart.classList.add("hidden");

    cartContent.classList.remove("hidden");

    cartItems.innerHTML = "";


    /* ====================================
       DISPLAY ITEM COUNT
       ==================================== */

    let totalItems = 0;

    cart.forEach(function(item) {

        totalItems += Number(item.quantity) || 0;

    });


    if (cartItemCount) {

        cartItemCount.textContent =
            totalItems +
            (totalItems === 1 ? " item" : " items");

    }


    /* ====================================
       DISPLAY EACH ITEM
       ==================================== */

    cart.forEach(function(item, index) {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        const subtotal =
            price * quantity;

        const image =
            getProductImage(item);


        const cartItem =
            document.createElement("article");

        cartItem.className = "cart-item";


        /* ====================================
           IMAGE
           ==================================== */

        let imageHTML = "";

        if (image) {

            imageHTML = `
                <img
                    src="${image}"
                    alt="${item.name}"
                >
            `;

        } else {

            imageHTML = `
                <span>
                    ${item.name}
                </span>
            `;

        }


        /* ====================================
           CART ITEM HTML
           ==================================== */

        cartItem.innerHTML = `

            <div class="cart-item-image">

                ${imageHTML}

            </div>


            <div class="cart-item-info">

                <h2>
                    ${item.name}
                </h2>

                <p class="cart-item-category">
                    ${item.category}
                </p>

                <p class="cart-item-detail">
                    <strong>Color:</strong>
                    ${item.color || "Natural"}
                </p>

                ${
                    item.note
                    ? `
                        <p class="cart-item-detail">
                            <strong>Note:</strong>
                            ${item.note}
                        </p>
                    `
                    : ""
                }

            </div>


            <div class="cart-item-right">

                <div>

                    <p class="cart-item-price">
                        ${formatPrice(price)} each
                    </p>

                    <p class="cart-item-subtotal">
                        ${formatPrice(subtotal)}
                    </p>

                </div>


                <div>

                    <p class="cart-quantity-label">
                        Quantity
                    </p>

                    <div class="cart-quantity-control">

                        <button
                            type="button"
                            class="quantity-minus"
                            data-index="${index}"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <span>
                            ${quantity}
                        </span>

                        <button
                            type="button"
                            class="quantity-plus"
                            data-index="${index}"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    type="button"
                    class="remove-item"
                    data-index="${index}"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    setupQuantityButtons();

    setupRemoveButtons();

    updateSummary(cart);

}


/* ========================================
   QUANTITY BUTTONS
   ======================================== */

function setupQuantityButtons() {

    const minusButtons =
        document.querySelectorAll(".quantity-minus");

    const plusButtons =
        document.querySelectorAll(".quantity-plus");


    /* ====================================
       DECREASE
       ==================================== */

    minusButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const index =
                    parseInt(
                        button.getAttribute("data-index"),
                        10
                    );


                const cart = getCart();

                if (!cart[index]) return;


                let quantity =
                    Number(cart[index].quantity) || 1;


                if (quantity > 1) {

                    quantity--;

                }


                cart[index].quantity = quantity;

                saveCart(cart);

                displayCart();

            }
        );

    });


    /* ====================================
       INCREASE
       ==================================== */

    plusButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const index =
                    parseInt(
                        button.getAttribute("data-index"),
                        10
                    );


                const cart = getCart();

                if (!cart[index]) return;


                let quantity =
                    Number(cart[index].quantity) || 1;


                if (quantity < 20) {

                    quantity++;

                }


                cart[index].quantity = quantity;

                saveCart(cart);

                displayCart();

            }
        );

    });

}


/* ========================================
   REMOVE ITEM
   ======================================== */

function setupRemoveButtons() {

    const removeButtons =
        document.querySelectorAll(".remove-item");


    removeButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const index =
                    parseInt(
                        button.getAttribute(
                            "data-index"
                        ),
                        10
                    );


                const cart = getCart();


                if (!cart[index]) return;


                cart.splice(index, 1);


                saveCart(cart);


                displayCart();


                if (typeof showToast === "function") {

                    showToast(
                        "Item removed from your cart.",
                        "info"
                    );

                }

            }
        );

    });

}


/* ========================================
   CLEAR CART
   ======================================== */

function setupClearCart() {

    const clearButton =
        document.getElementById("clear-cart");


    if (!clearButton) return;


    clearButton.addEventListener(
        "click",
        function() {

            const cart = getCart();


            if (cart.length === 0) {

                return;

            }


            const confirmed =
                confirm(
                    "Are you sure you want to clear your cart?"
                );


            if (!confirmed) {

                return;

            }


            localStorage.removeItem(
                "crocharmiCart"
            );


            displayCart();


            if (typeof showToast === "function") {

                showToast(
                    "Your cart has been cleared.",
                    "info"
                );

            }

        }
    );

}


/* ========================================
   UPDATE SUMMARY
   ======================================== */

function updateSummary(cart) {

    let totalItems = 0;

    let subtotal = 0;


    cart.forEach(function(item) {

        const quantity =
            Number(item.quantity) || 0;

        const price =
            Number(item.price) || 0;


        totalItems += quantity;

        subtotal +=
            price * quantity;

    });


    document.getElementById(
        "summary-items"
    ).textContent = totalItems;


    document.getElementById(
        "summary-subtotal"
    ).textContent =
        formatPrice(subtotal);


    document.getElementById(
        "summary-total"
    ).textContent =
        formatPrice(subtotal);

}


/* ========================================
   CHECKOUT
   ======================================== */

function setupCheckout() {

    const checkoutButton =
        document.getElementById("checkout-button");


    if (!checkoutButton) return;


    checkoutButton.addEventListener(
        "click",
        function() {

            const cart = getCart();


            if (cart.length === 0) {

                if (typeof showToast === "function") {

                    showToast(
                        "Your cart is empty.",
                        "error"
                    );

                } else {

                    alert("Your cart is empty.");

                }

                return;

            }


            window.location.href =
                "checkout.html";

        }
    );

}


/* ========================================
   INITIALIZE
   ======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCart();

        setupClearCart();

        setupCheckout();

    }
);