/* ================================
   CHECKOUT
================================ */

const CART_KEY = "crocharmiCart";
const ORDERS_KEY = "crocharmiOrders";


function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}


function saveOrders(orders) {
    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(orders)
    );
}


/* ================================
   DISPLAY ORDER
================================ */

function displayCheckout() {

    const cart = getCart();

    const itemsContainer =
        document.getElementById("checkout-items");

    const itemCount =
        document.getElementById("checkout-item-count");

    const subtotalElement =
        document.getElementById("checkout-subtotal");

    const totalElement =
        document.getElementById("checkout-total");


    if (cart.length === 0) {

        itemsContainer.innerHTML = `
            <div class="checkout-empty">
                <p>Your cart is empty.</p>
            </div>
        `;

        itemCount.textContent = "0";
        subtotalElement.textContent = "₱0";
        totalElement.textContent = "₱0";

        return;
    }


    let subtotal = 0;
    let totalItems = 0;


    itemsContainer.innerHTML = cart.map(item => {

        const itemSubtotal =
            item.price * item.quantity;

        subtotal += itemSubtotal;
        totalItems += item.quantity;


        return `
            <div class="checkout-item">

                <div class="checkout-item-info">

                    <div class="checkout-item-name">
                        ${item.name}
                    </div>

                    <div class="checkout-item-details">
                        Quantity: ${item.quantity}
                        <br>
                        Color: ${item.color || "Not specified"}

                        ${
                            item.note
                                ? `<br>Note: ${item.note}`
                                : ""
                        }
                    </div>

                </div>


                <div class="checkout-item-price">
                    ₱${itemSubtotal.toLocaleString()}
                </div>

            </div>
        `;

    }).join("");


    itemCount.textContent = totalItems;

    subtotalElement.textContent =
        `₱${subtotal.toLocaleString()}`;

    totalElement.textContent =
        `₱${subtotal.toLocaleString()}`;
}


/* ================================
   PREFILL USER INFORMATION
================================ */

function prefillUserInformation() {

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "crocharmiCurrentUser"
            )
        );


    if (!currentUser) {
        return;
    }


    const nameInput =
        document.getElementById("customer-name");

    const emailInput =
        document.getElementById("customer-email");


    if (nameInput && currentUser.name) {
        nameInput.value = currentUser.name;
    }


    if (emailInput && currentUser.email) {
        emailInput.value = currentUser.email;
    }
}


/* ================================
   CHECKOUT FORM
================================ */

function setupCheckoutForm() {

    const form =
        document.getElementById("checkout-form");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function(event) {

        event.preventDefault();


        const cart = getCart();


        if (cart.length === 0) {

            showCheckoutMessage(
                "Your cart is empty.",
                "error"
            );

            return;
        }


        const name =
            document.getElementById(
                "customer-name"
            ).value.trim();


        const email =
            document.getElementById(
                "customer-email"
            ).value.trim();


        const phone =
            document.getElementById(
                "customer-phone"
            ).value.trim();


        const address =
            document.getElementById(
                "customer-address"
            ).value.trim();


        const deliveryOption =
            document.getElementById(
                "delivery-option"
            ).value;


        const notes =
            document.getElementById(
                "order-notes"
            ).value.trim();


        if (
            !name ||
            !email ||
            !phone ||
            !address ||
            !deliveryOption
        ) {

            showCheckoutMessage(
                "Please complete all required fields.",
                "error"
            );

            return;
        }


        /* Calculate total */

        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
        });


        /* Create order */

        const order = {

            id: "ORD-" + Date.now(),

            customer: {
                name: name,
                email: email,
                phone: phone,
                address: address
            },

            deliveryOption: deliveryOption,

            notes: notes,

            items: cart,

            total: total,

            status: "Pending",

            createdAt: new Date().toISOString()

        };


        /* Save order */

        const existingOrders =
            JSON.parse(
                localStorage.getItem(ORDERS_KEY)
            ) || [];


        existingOrders.push(order);

        saveOrders(existingOrders);


        /* Clear cart */

        localStorage.removeItem(CART_KEY);


        /* Show success */

        showOrderSuccess(order);

    });
}


/* ================================
   SUCCESS MESSAGE
================================ */

function showOrderSuccess(order) {

    const checkoutPage =
        document.querySelector(".checkout-page");


    checkoutPage.innerHTML = `

        <div class="container">

            <div class="checkout-success">

                <p class="section-label">
                    ORDER RECEIVED
                </p>

                <h1>Thank You!</h1>

                <p>
                    Your order has been successfully placed.
                </p>

                <div class="order-confirmation">

                    <p>
                        <strong>Order Number</strong>
                    </p>

                    <h2>
                        ${order.id}
                    </h2>

                    <p>
                        Total:
                        <strong>
                            ₱${order.total.toLocaleString()}
                        </strong>
                    </p>

                    <p>
                        Delivery:
                        <strong>
                            ${order.deliveryOption}
                        </strong>
                    </p>

                </div>


                <div class="success-actions">

                    <a
                        href="../index.html"
                        class="btn btn-primary"
                    >
                        Back to Home
                    </a>

                    <a
                        href="shop.html"
                        class="btn btn-secondary"
                    >
                        Continue Shopping
                    </a>

                </div>

            </div>

        </div>

    `;
}


/* ================================
   MESSAGE
================================ */

function showCheckoutMessage(
    message,
    type
) {

    const messageElement =
        document.getElementById(
            "checkout-message"
        );


    messageElement.textContent = message;

    messageElement.className =
        `checkout-message ${type}`;
}


/* ================================
   START
================================ */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCheckout();

        prefillUserInformation();

        setupCheckoutForm();

    }
);