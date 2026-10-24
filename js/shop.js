document.addEventListener("DOMContentLoaded", function() {

    const categoryButtons = document.querySelectorAll(".category-btn");
    const productCards = document.querySelectorAll(".product-card");
    const searchInput = document.getElementById("product-search");
    const favoriteButtons = document.querySelectorAll(".favorite-btn");

    let activeCategory = "all";


    /* ========================================
       SEARCH + CATEGORY FILTER
       ======================================== */

    function filterProducts() {

        const searchTerm = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        let visibleProducts = 0;


        productCards.forEach(function(card) {

            const category = card.dataset.category || "";

            const productNameElement = card.querySelector("h2");

            const productName = productNameElement
                ? productNameElement.textContent.trim().toLowerCase()
                : "";


            const categoryMatch =
                activeCategory === "all" ||
                category === activeCategory;


            const searchMatch =
                productName.includes(searchTerm);


            if (categoryMatch && searchMatch) {

                card.classList.remove("hidden");

                visibleProducts++;

            } else {

                card.classList.add("hidden");

            }

        });


        updateNoProductsMessage(visibleProducts);

    }


    categoryButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            activeCategory = button.dataset.category;


            categoryButtons.forEach(function(item) {
                item.classList.remove("active");
            });


            button.classList.add("active");


            filterProducts();

        });

    });


    if (searchInput) {

        searchInput.addEventListener("input", function() {

            filterProducts();

        });

    }


    function updateNoProductsMessage(visibleProducts) {

        const existingMessage =
            document.querySelector(".no-products-message");


        if (visibleProducts === 0) {

            if (!existingMessage) {

                const message = document.createElement("p");

                message.className = "no-products-message";

                message.textContent =
                    "No products found. Try another search or category.";


                const productGrid =
                    document.querySelector(".product-grid");


                if (productGrid) {

                    productGrid.appendChild(message);

                }

            }

        } else {

            if (existingMessage) {

                existingMessage.remove();

            }

        }

    }


    /* ========================================
       FAVORITES
       ======================================== */

    let favorites =
        JSON.parse(localStorage.getItem("crocharmiFavorites")) || [];


    function updateFavoriteButtons() {

        favoriteButtons.forEach(function(button) {

            const productId = button.dataset.productId;

            const isFavorite =
                favorites.includes(productId);


            if (isFavorite) {

                button.classList.add("active");

                button.textContent = "♥";

                button.setAttribute(
                    "aria-label",
                    "Remove from favorites"
                );

            } else {

                button.classList.remove("active");

                button.textContent = "♡";

                button.setAttribute(
                    "aria-label",
                    "Add to favorites"
                );

            }

        });

    }


    favoriteButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const productId = button.dataset.productId;


            if (favorites.includes(productId)) {

                favorites =
                    favorites.filter(function(id) {
                        return id !== productId;
                    });

            } else {

                favorites.push(productId);

            }


            localStorage.setItem(
                "crocharmiFavorites",
                JSON.stringify(favorites)
            );


            updateFavoriteButtons();

        });

    });


    /* ========================================
       INITIALIZE
       ======================================== */

    filterProducts();

    updateFavoriteButtons();

});