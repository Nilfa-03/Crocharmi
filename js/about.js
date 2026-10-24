/* ========================================
   CROCHARMI
   ABOUT PAGE JAVASCRIPT
   ======================================== */


document.addEventListener("DOMContentLoaded", function () {


    /* ========================================
       OUR PROMISE BUTTON
       ======================================== */

    const promiseButton =
        document.getElementById("about-promise-button");


    /*
        Stop if the button does not exist.
    */

    if (!promiseButton) {
        return;
    }



    /* ========================================
       BUTTON CLICK
       ======================================== */

    promiseButton.addEventListener("click", function () {


        const promiseContent = `

            <p>
                At Crocharmi, we believe that handmade pieces
                are more than just products. They are small
                creations made with time, patience, and care.
            </p>

            <p>
                We aim to provide simple crochet pieces that
                can be used, gifted, and enjoyed for special
                moments.
            </p>

            <p>
                Every piece represents the time and effort
                behind handmade work.
            </p>

            <p>
                Thank you for supporting handmade creations
                and choosing Crocharmi.
            </p>

        `;



        /* ========================================
           OPEN EXISTING MODAL
           ======================================== */

        if (typeof showModal === "function") {


            showModal(

                "Our Promise",

                promiseContent,

                `
                    <button
                        type="button"
                        class="modal-button"
                        onclick="closeModal()"
                    >
                        Close
                    </button>
                `

            );


        } else {


            /*
                Backup message if modal.js
                is unavailable.
            */

            alert(
                "Crocharmi creates handmade crochet pieces with care."
            );

        }

    });

});