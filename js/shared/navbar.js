/* ================================
   CROCHARMI NAVBAR AUTH
================================ */

function updateNavbar() {

    const authLinks =
        document.getElementById("auth-links");

    if (!authLinks) {
        return;
    }


    /* ========================================
       GET CURRENT USER
    ======================================== */

    let currentUser = null;

    try {

        currentUser =
            JSON.parse(
                localStorage.getItem(
                    "crocharmiCurrentUser"
                )
            );

    } catch (error) {

        currentUser = null;

    }


    /* ========================================
       CHECK IF CURRENT PAGE IS INSIDE /pages/
    ======================================== */

    const isInsidePages =
        window.location.pathname.includes("/pages/");


    /* ========================================
       NAVIGATION PATHS
    ======================================== */

    const ordersPath =
        isInsidePages
            ? "orders.html"
            : "pages/orders.html";


    const profilePath =
        isInsidePages
            ? "profile.html"
            : "pages/profile.html";


    const signinPath =
        isInsidePages
            ? "signin.html"
            : "pages/signin.html";


    const signupPath =
        isInsidePages
            ? "signup.html"
            : "pages/signup.html";



    /* ========================================
       LOGGED-IN USER
    ======================================== */

    if (currentUser) {

        authLinks.innerHTML = `

            <a href="${ordersPath}">
                My Orders
            </a>

            <a href="${profilePath}">
                Profile
            </a>

            <span class="welcome-user">
                Hi, ${currentUser.name}
            </span>

            <a
                href="#"
                id="logout-link"
            >
                Logout
            </a>

        `;


        /* ========================================
           LOGOUT
        ======================================== */

        const logoutLink =
            document.getElementById(
                "logout-link"
            );


        if (logoutLink) {

            logoutLink.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    localStorage.removeItem(
                        "crocharmiCurrentUser"
                    );


                    window.location.href =
                        isInsidePages
                            ? "../index.html"
                            : "index.html";

                }
            );

        }


    } else {


        /* ========================================
           LOGGED-OUT USER
        ======================================== */

        authLinks.innerHTML = `

            <a href="${signinPath}">
                Sign In
            </a>

            <a
                href="${signupPath}"
                class="sign-up-link"
            >
                Sign Up
            </a>

        `;

    }

}



/* ========================================
   LOAD NAVBAR
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    updateNavbar
);