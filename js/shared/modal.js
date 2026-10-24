/* ========================================
   CROCHARMI
   Modal System
   ======================================== */

function showModal(title, content, buttons = "") {

    let modal = document.getElementById("crocharmi-modal");

    if (!modal) {

        modal = document.createElement("div");

        modal.id = "crocharmi-modal";

        modal.className = "crocharmi-modal";

        modal.innerHTML = `
            <div class="modal-overlay"></div>

            <div class="modal-box">

                <button
                    type="button"
                    class="modal-close"
                    aria-label="Close modal"
                >
                    ×
                </button>

                <div class="modal-content">

                    <h2 class="modal-title"></h2>

                    <div class="modal-body"></div>

                    <div class="modal-actions"></div>

                </div>

            </div>
        `;

        document.body.appendChild(modal);


        /* Close button */

        modal
            .querySelector(".modal-close")
            .addEventListener("click", function() {

                closeModal();

            });


        /* Overlay */

        modal
            .querySelector(".modal-overlay")
            .addEventListener("click", function() {

                closeModal();

            });

    }


    modal.querySelector(".modal-title").textContent = title;

    modal.querySelector(".modal-body").innerHTML = content;

    modal.querySelector(".modal-actions").innerHTML = buttons;


    modal.classList.add("show");

    document.body.classList.add("modal-open");

}


/* ========================================
   CLOSE MODAL
   ======================================== */

function closeModal() {

    const modal = document.getElementById("crocharmi-modal");

    if (!modal) {
        return;
    }

    modal.classList.remove("show");

    document.body.classList.remove("modal-open");

}


/* ========================================
   ESC KEY
   ======================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeModal();

    }

});