/* ========================================
   CROCHARMI AUTH GUARD
======================================== */

(function () {

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


    /*
       If the user is not logged in,
       return to the public Crocharmi
       front page.
    */

    if (!currentUser) {

        window.location.replace(
            "../index.html"
        );

    }

})();