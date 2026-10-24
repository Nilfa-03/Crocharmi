/* ========================================
   CROCHARMI
   Form Validation
   ======================================== */


/* ========================================
   REQUIRED FIELD
   ======================================== */

function validateRequired(value, fieldName) {

    if (!value || value.trim() === "") {

        return {
            valid: false,
            message: fieldName + " is required."
        };

    }

    return {
        valid: true,
        message: ""
    };

}


/* ========================================
   EMAIL
   ======================================== */

function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email.trim())) {

        return {
            valid: false,
            message: "Please enter a valid email address."
        };

    }

    return {
        valid: true,
        message: ""
    };

}


/* ========================================
   PASSWORD
   ======================================== */

function validatePassword(password) {

    if (!password || password.length < 6) {

        return {
            valid: false,
            message: "Password must be at least 6 characters."
        };

    }

    return {
        valid: true,
        message: ""
    };

}


/* ========================================
   CONFIRM PASSWORD
   ======================================== */

function validatePasswordMatch(password, confirmPassword) {

    if (password !== confirmPassword) {

        return {
            valid: false,
            message: "Passwords do not match."
        };

    }

    return {
        valid: true,
        message: ""
    };

}


/* ========================================
   SHOW ERROR
   ======================================== */

function showFieldError(field, message) {

    if (!field) {
        return;
    }

    field.classList.add("input-error");

    let errorElement =
        field.parentElement.querySelector(".field-error");


    if (!errorElement) {

        errorElement =
            document.createElement("small");

        errorElement.className =
            "field-error";

        field.parentElement.appendChild(
            errorElement
        );

    }


    errorElement.textContent = message;

}


/* ========================================
   CLEAR ERROR
   ======================================== */

function clearFieldError(field) {

    if (!field) {
        return;
    }

    field.classList.remove("input-error");

    const errorElement =
        field.parentElement.querySelector(
            ".field-error"
        );


    if (errorElement) {

        errorElement.remove();

    }

}