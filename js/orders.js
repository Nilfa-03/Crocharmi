/* ================================
   ORDERS
================================ */

const ORDERS_KEY = "crocharmiOrders";


function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(
            "crocharmiCurrentUser"
        )
    );

}


function getOrders() {

    return JSON.parse(
        localStorage.getItem(
            ORDERS_KEY
        )
    ) || [];

}


/* ================================
   DISPLAY ORDERS
================================ */

function displayOrders() {

    const container =
        document.getElementById(
            "orders-container"
        );


    const currentUser =
        getCurrentUser();


    /*
       User must be signed in
    */

    if (!currentUser) {

        container.innerHTML = `

            <div class="orders-login">

                <h2>Sign In Required</h2>

                <p>
                    Please sign in to view your orders.
                </p>

                <a
                    href="signin.html"
                    class="btn btn-primary"
                >
                    Sign In
                </a>

            </div>

        `;

        return;
    }


    const orders =
        getOrders();


    /*
       Show only this user's orders
    */

    const userOrders =
        orders.filter(order =>
            order.customer &&
            order.customer.email === currentUser.email
        );


    /*
       No orders
    */

    if (userOrders.length === 0) {

        container.innerHTML = `

            <div class="orders-empty">

                <h2>No Orders Yet</h2>

                <p>
                    You haven't placed an order yet.
                </p>

                <a
                    href="shop.html"
                    class="btn btn-primary"
                >
                    Start Shopping
                </a>

            </div>

        `;

        return;
    }


    /*
       Newest orders first
    */

    userOrders.reverse();


    container.innerHTML =
        userOrders.map(order => {

            const orderDate =
                new Date(order.createdAt)
                    .toLocaleString();


            const itemsHTML =
                order.items.map(item => {

                    const subtotal =
                        item.price *
                        item.quantity;


                    return `

                        <div class="order-item">

                            <div>

                                <div class="order-item-name">
                                    ${item.name}
                                </div>

                                <div class="order-item-details">

                                    Quantity:
                                    ${item.quantity}

                                    <br>

                                    Color:
                                    ${item.color || "Not specified"}

                                    ${
                                        item.note
                                            ? `<br>Note: ${item.note}`
                                            : ""
                                    }

                                </div>

                            </div>


                            <div class="order-item-price">
                                ₱${subtotal.toLocaleString()}
                            </div>

                        </div>

                    `;

                }).join("");


            return `

                <article class="order-card">

                    <div class="order-card-header">

                        <div>

                            <div class="order-number">
                                ${order.id}
                            </div>

                            <div class="order-date">
                                ${orderDate}
                            </div>

                        </div>


                        <div class="order-status">
                            ${order.status}
                        </div>

                    </div>


                    <div class="order-items">

                        ${itemsHTML}

                    </div>


                    <div class="order-card-footer">

                        <div class="order-delivery">

                            Delivery:
                            <strong>
                                ${order.deliveryOption}
                            </strong>

                        </div>


                        <div class="order-total">

                            Total:
                            ₱${order.total.toLocaleString()}

                        </div>

                    </div>

                </article>

            `;

        }).join("");

}


/* ================================
   START
================================ */

document.addEventListener(
    "DOMContentLoaded",
    displayOrders
);