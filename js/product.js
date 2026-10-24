/* ========================================
   CROCHARMI PRODUCT DETAILS
======================================== */


/* ========================================
   PRODUCT DATA
======================================== */

const products = {

    "keychain": {
        name: "Crochet Keychain",
        category: "Keychains",
        price: 150,
        image: "../assets/images/keychain.jpg",
        description:
            "A small handmade crochet keychain that adds a simple handmade touch to your keys, bags, or everyday accessories."
    },

    "flower": {
        name: "Crochet Flower",
        category: "Flowers",
        price: 250,
        image: "../assets/images/flower.jpg",
        description:
            "A handmade crochet flower designed as a thoughtful gift or a simple decorative piece that can be enjoyed for a long time."
    },

    "bag": {
        name: "Mini Crochet Bag",
        category: "Bags",
        price: 450,
        image: "../assets/images/mini-bag.jpg",
        description:
            "A compact handmade crochet bag that is simple, lightweight, and suitable for carrying small everyday essentials."
    },

    "heart-keychain": {
        name: "Crochet Heart Keychain",
        category: "Keychains",
        price: 180,
        image: "../assets/images/heart-keychain.jpg",
        description:
            "A cute handmade crochet heart keychain that works well as a small personal accessory or a simple handmade gift."
    },

    "tulip": {
        name: "Crochet Tulip",
        category: "Flowers",
        price: 280,
        image: "../assets/images/tulip.jpg",
        description:
            "A handmade crochet tulip that brings a soft decorative touch without needing the care of a real flower."
    },

    "tote": {
        name: "Crochet Mini Tote",
        category: "Bags",
        price: 500,
        image: "../assets/images/mini-tote.jpg",
        description:
            "A handmade mini crochet tote designed for small everyday items while keeping a simple handmade appearance."
    }

};


/* ========================================
   LOAD PRODUCT
======================================== */

function loadProduct() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const productId =
        params.get("id");

    const product =
        products[productId];


    if (!product) {

        document.getElementById(
            "product-name"
        ).textContent =
            "Product Not Found";

        document.getElementById(
            "product-category"
        ).textContent = "";

        document.getElementById(
            "product-price"
        ).textContent = "";

        document.getElementById(
            "product-description"
        ).textContent =
            "Sorry, we could not find this product.";


        const addButton =
            document.getElementById(
                "add-to-cart"
            );

        if (addButton) {
            addButton.disabled = true;
        }

        return;
    }


    /* Product information */

    document.getElementById(
        "product-name"
    ).textContent =
        product.name;

    document.getElementById(
        "product-category"
    ).textContent =
        product.category;

    document.getElementById(
        "product-price"
    ).textContent =
        `₱${product.price}`;

    document.getElementById(
        "product-description"
    ).textContent =
        product.description;


    /* Product image */

    const productImage =
        document.getElementById(
            "product-image-placeholder"
        );

    productImage.innerHTML = `
        <img
            src="${product.image}"
            alt="${product.name}"
        >
    `;


    /* Save current product */

    window.currentProduct = {
        id: productId,
        ...product
    };


    /* Update favorite */

    updateFavoriteButton();

}


/* ========================================
   QUANTITY CONTROL
======================================== */

function setupQuantity() {

    const quantityInput =
        document.getElementById(
            "product-quantity"
        );

    const minusButton =
        document.getElementById(
            "quantity-minus"
        );

    const plusButton =
        document.getElementById(
            "quantity-plus"
        );


    if (
        !quantityInput ||
        !minusButton ||
        !plusButton
    ) {
        return;
    }


    minusButton.addEventListener(
        "click",
        function() {

            let quantity =
                parseInt(
                    quantityInput.value,
                    10
                ) || 1;


            if (quantity > 1) {
                quantity--;
            }


            quantityInput.value =
                quantity;

        }
    );


    plusButton.addEventListener(
        "click",
        function() {

            let quantity =
                parseInt(
                    quantityInput.value,
                    10
                ) || 1;


            if (quantity < 20) {
                quantity++;
            }


            quantityInput.value =
                quantity;

        }
    );


    quantityInput.addEventListener(
        "change",
        function() {

            let quantity =
                parseInt(
                    quantityInput.value,
                    10
                ) || 1;


            if (quantity < 1) {
                quantity = 1;
            }


            if (quantity > 20) {
                quantity = 20;
            }


            quantityInput.value =
                quantity;

        }
    );

}


/* ========================================
   FAVORITES
======================================== */

function getFavorites() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "crocharmiFavorites"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}


function updateFavoriteButton() {

    const favoriteButton =
        document.getElementById(
            "product-favorite"
        );


    if (
        !favoriteButton ||
        !window.currentProduct
    ) {
        return;
    }


    const favorites =
        getFavorites();


    const isFavorite =
        favorites.includes(
            window.currentProduct.id
        );


    if (isFavorite) {

        favoriteButton.classList.add(
            "active"
        );

        favoriteButton.textContent =
            "♥";

        favoriteButton.setAttribute(
            "aria-label",
            "Remove from favorites"
        );

        favoriteButton.setAttribute(
            "aria-pressed",
            "true"
        );

    } else {

        favoriteButton.classList.remove(
            "active"
        );

        favoriteButton.textContent =
            "♡";

        favoriteButton.setAttribute(
            "aria-label",
            "Add to favorites"
        );

        favoriteButton.setAttribute(
            "aria-pressed",
            "false"
        );

    }

}


function setupFavorite() {

    const favoriteButton =
        document.getElementById(
            "product-favorite"
        );


    if (!favoriteButton) {
        return;
    }


    favoriteButton.addEventListener(
        "click",
        function() {

            if (!window.currentProduct) {
                return;
            }


            let favorites =
                getFavorites();


            const productId =
                window.currentProduct.id;


            if (
                favorites.includes(
                    productId
                )
            ) {

                favorites =
                    favorites.filter(
                        function(id) {

                            return id !== productId;

                        }
                    );


                showProductToast(
                    window.currentProduct.name +
                    " removed from favorites.",
                    "info"
                );

            } else {

                favorites.push(
                    productId
                );


                showProductToast(
                    window.currentProduct.name +
                    " added to favorites.",
                    "success"
                );

            }


            localStorage.setItem(
                "crocharmiFavorites",
                JSON.stringify(
                    favorites
                )
            );


            updateFavoriteButton();

        }
    );

}


/* ========================================
   ADD TO CART
======================================== */

function setupAddToCart() {

    const addButton =
        document.getElementById(
            "add-to-cart"
        );


    if (!addButton) {
        return;
    }


    addButton.addEventListener(
        "click",
        function() {

            if (!window.currentProduct) {
                return;
            }


            const quantityInput =
                document.getElementById(
                    "product-quantity"
                );


            let quantity =
                parseInt(
                    quantityInput.value,
                    10
                ) || 1;


            if (quantity < 1) {
                quantity = 1;
            }


            if (quantity > 20) {
                quantity = 20;
            }


            quantityInput.value =
                quantity;


            const color =
                document.getElementById(
                    "product-color"
                ).value;


            const note =
                document.getElementById(
                    "product-note"
                ).value.trim();


            let cart = [];


            try {

                cart =
                    JSON.parse(
                        localStorage.getItem(
                            "crocharmiCart"
                        )
                    ) || [];

            } catch (error) {

                cart = [];

            }


            const cartItem = {

                id:
                    window.currentProduct.id,

                name:
                    window.currentProduct.name,

                category:
                    window.currentProduct.category,

                price:
                    window.currentProduct.price,

                quantity:
                    quantity,

                color:
                    color,

                note:
                    note

            };


            cart.push(
                cartItem
            );


            localStorage.setItem(
                "crocharmiCart",
                JSON.stringify(
                    cart
                )
            );


            showProductToast(
                window.currentProduct.name +
                " added to your cart!",
                "success"
            );

        }
    );

}


/* ========================================
   PRODUCT TOAST
======================================== */

function showProductToast(
    message,
    type = "success"
) {

    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            message,
            type
        );

        return;
    }


    const messageElement =
        document.getElementById(
            "product-message"
        );


    if (!messageElement) {
        return;
    }


    messageElement.textContent =
        message;


    messageElement.className =
        "product-message " +
        type;


    setTimeout(
        function() {

            messageElement.textContent =
                "";

            messageElement.className =
                "product-message";

        },
        2500
    );

}


/* ========================================
   INITIALIZE
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadProduct();

        setupQuantity();

        setupFavorite();

        setupAddToCart();

    }
);