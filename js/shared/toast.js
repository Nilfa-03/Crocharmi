/* ========================================
   CROCHARMI
   Toast Notifications
   ======================================== */

function showToast(message, type = "success") {

    let toast = document.getElementById("crocharmi-toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "crocharmi-toast";

        document.body.appendChild(toast);
    }


    toast.textContent = message;

    toast.className = "crocharmi-toast " + type;


    // Show toast

    requestAnimationFrame(function() {

        toast.classList.add("show");

    });


    // Remove previous timeout if one exists

    if (toast.hideTimeout) {

        clearTimeout(toast.hideTimeout);

    }


    // Hide after 3 seconds

    toast.hideTimeout = setTimeout(function() {

        toast.classList.remove("show");

    }, 3000);

}