/* ========================================
   CROCHARMI AUTHENTICATION
   ======================================== */


/*
   Local Storage Keys
*/

const USERS_KEY = "crocharmiUsers";

const CURRENT_USER_KEY = "crocharmiCurrentUser";



/* ========================================
   GET REGISTERED USERS
   ======================================== */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(USERS_KEY)
        ) || [];

    } catch (error) {

        return [];

    }

}



/* ========================================
   SAVE REGISTERED USERS
   ======================================== */

function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}



/* ========================================
   SHOW / HIDE PASSWORD
   ======================================== */

function setupPasswordToggles() {

    const toggleButtons =
        document.querySelectorAll(
            ".password-toggle"
        );


    toggleButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const targetId =
                    button.getAttribute(
                        "data-target"
                    );


                const passwordInput =
                    document.getElementById(
                        targetId
                    );


                if (!passwordInput) {
                    return;
                }


                if (
                    passwordInput.type ===
                    "password"
                ) {

                    passwordInput.type =
                        "text";

                    button.textContent =
                        "Hide";

                    button.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                } else {

                    passwordInput.type =
                        "password";

                    button.textContent =
                        "Show";

                    button.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                }

            }
        );

    });

}



/* ========================================
   CLEAR SIGN UP ERRORS
   ======================================== */

function clearSignupErrors() {

    clearFieldError(
        document.getElementById(
            "signup-name"
        )
    );


    clearFieldError(
        document.getElementById(
            "signup-email"
        )
    );


    clearFieldError(
        document.getElementById(
            "signup-password"
        )
    );


    clearFieldError(
        document.getElementById(
            "signup-confirm-password"
        )
    );

}



/* ========================================
   CLEAR SIGN IN ERRORS
   ======================================== */

function clearSigninErrors() {

    clearFieldError(
        document.getElementById(
            "signin-email"
        )
    );


    clearFieldError(
        document.getElementById(
            "signin-password"
        )
    );

}



/* ========================================
   SIGN UP
   ======================================== */

function setupSignup() {

    const signupForm =
        document.getElementById(
            "signup-form"
        );


    if (!signupForm) {
        return;
    }


    signupForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nameInput =
                document.getElementById(
                    "signup-name"
                );


            const emailInput =
                document.getElementById(
                    "signup-email"
                );


            const passwordInput =
                document.getElementById(
                    "signup-password"
                );


            const confirmPasswordInput =
                document.getElementById(
                    "signup-confirm-password"
                );


            const name =
                nameInput.value.trim();


            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();


            const password =
                passwordInput.value;


            const confirmPassword =
                confirmPasswordInput.value;


            const message =
                document.getElementById(
                    "signup-message"
                );


            message.textContent = "";

            message.className =
                "auth-message";


            clearSignupErrors();



            /* Validate name */

            if (name.length < 2) {

                showFieldError(
                    nameInput,
                    "Please enter your full name."
                );

                return;

            }



            /* Validate email */

            const emailValidation =
                validateEmail(email);


            if (!emailValidation.valid) {

                showFieldError(
                    emailInput,
                    emailValidation.message
                );

                return;

            }



            /* Validate password */

            const passwordValidation =
                validatePassword(
                    password
                );


            if (!passwordValidation.valid) {

                showFieldError(
                    passwordInput,
                    passwordValidation.message
                );

                return;

            }



            /* Confirm password */

            const passwordMatchValidation =
                validatePasswordMatch(
                    password,
                    confirmPassword
                );


            if (
                !passwordMatchValidation.valid
            ) {

                showFieldError(
                    confirmPasswordInput,
                    passwordMatchValidation.message
                );

                return;

            }



            const users = getUsers();



            /* Check duplicate email */

            const existingUser =
                users.find(
                    function(user) {

                        return (
                            user.email ===
                            email
                        );

                    }
                );


            if (existingUser) {

                showFieldError(
                    emailInput,
                    "An account with this email already exists."
                );

                return;

            }



            /* Create user */

            const newUser = {

                id: Date.now(),

                name: name,

                email: email,

                password: password

            };



            users.push(newUser);

            saveUsers(users);



            /*
               IMPORTANT:
               Do NOT create a current session
               here.

               The user must sign in after
               creating an account.
            */

            localStorage.removeItem(
                CURRENT_USER_KEY
            );



            /* Success message */

            showAuthMessage(
                message,
                "Account created successfully! Redirecting to Sign In...",
                "success"
            );



            /* Optional toast */

            if (
                typeof showToast ===
                "function"
            ) {

                showToast(
                    "Account created successfully!",
                    "success"
                );

            }



            /*
               Return to Sign In
            */

            setTimeout(
                function() {

                    window.location.href =
                        "signin.html";

                },
                1000
            );

        }
    );

}



/* ========================================
   SIGN IN
   ======================================== */

function setupSignin() {

    const signinForm =
        document.getElementById(
            "signin-form"
        );


    if (!signinForm) {
        return;
    }


    signinForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const emailInput =
                document.getElementById(
                    "signin-email"
                );


            const passwordInput =
                document.getElementById(
                    "signin-password"
                );


            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();


            const password =
                passwordInput.value;


            const message =
                document.getElementById(
                    "signin-message"
                );


            message.textContent = "";

            message.className =
                "auth-message";


            clearSigninErrors();



            /* Validate email */

            const emailValidation =
                validateEmail(email);


            if (!emailValidation.valid) {

                showFieldError(
                    emailInput,
                    emailValidation.message
                );

                return;

            }



            /* Validate password */

            const passwordValidation =
                validateRequired(
                    password,
                    "Password"
                );


            if (!passwordValidation.valid) {

                showFieldError(
                    passwordInput,
                    passwordValidation.message
                );

                return;

            }



            /* Find account */

            const users = getUsers();


            const user =
                users.find(
                    function(account) {

                        return (
                            account.email ===
                            email
                        );

                    }
                );



            /* Account doesn't exist */

            if (!user) {

                showFieldError(
                    emailInput,
                    "No account was found with this email."
                );

                return;

            }



            /* Wrong password */

            if (
                user.password !==
                password
            ) {

                showFieldError(
                    passwordInput,
                    "Incorrect password. Please try again."
                );

                return;

            }



            /*
               Create current session
            */

            const currentUser = {

                id: user.id,

                name: user.name,

                email: user.email

            };


            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify(currentUser)
            );



            /* Success */

            showAuthMessage(
                message,
                "Signed in successfully! Redirecting...",
                "success"
            );



            /* Optional toast */

            if (
                typeof showToast ===
                "function"
            ) {

                showToast(
                    "Signed in successfully!",
                    "success"
                );

            }



            /*
               IMPORTANT:
               After login, go to the
               NEW CUSTOMER HOME.

               The public index.html is
               only for logged-out visitors.
            */

            setTimeout(
                function() {

                    window.location.href =
                        "home.html";

                },
                800
            );

        }
    );

}



/* ========================================
   AUTH MESSAGE
   ======================================== */

function showAuthMessage(
    element,
    text,
    type
) {

    element.textContent = text;

    element.className =
        "auth-message " + type;

}



/* ========================================
   INITIALIZE
   ======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupPasswordToggles();

        setupSignup();

        setupSignin();

    }
);