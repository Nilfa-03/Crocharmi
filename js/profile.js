/* ========================================
   CROCHARMI PROFILE
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       GET ELEMENTS
    ======================================== */

    const profileForm =
        document.getElementById("profile-form");

    const profileName =
        document.getElementById("profile-name");

    const profileEmail =
        document.getElementById("profile-email");

    const profilePhone =
        document.getElementById("profile-phone");

    const profileAddress =
        document.getElementById("profile-address");

    const profileUserName =
        document.getElementById("profile-user-name");

    const profileInitial =
        document.getElementById("profile-initial");

    const profileImage =
        document.getElementById("profile-image");

    const profileImageInput =
        document.getElementById("profile-image-input");

    const removePhotoButton =
        document.getElementById("remove-photo");

    const logoutButton =
        document.getElementById("logout-btn");


    /* ========================================
       GET CURRENT USER
    ======================================== */

    let currentUser = null;

    try {

        currentUser = JSON.parse(
            localStorage.getItem(
                "crocharmiCurrentUser"
            )
        );

    } catch (error) {

        currentUser = null;

    }


    /* ========================================
       AUTH CHECK
    ======================================== */

    if (!currentUser) {

        window.location.replace(
            "../index.html"
        );

        return;
    }


    /* ========================================
       UPDATE USER INITIAL
    ======================================== */

    function updateInitial() {

        const name =
            currentUser.name || "User";

        const firstLetter =
            name.trim().charAt(0).toUpperCase() || "U";


        /* Profile picture initial */

        if (profileInitial) {

            profileInitial.textContent =
                firstLetter;

        }


        /* Name below profile picture */

        if (profileUserName) {

            profileUserName.textContent =
                name;

        }

    }


    /* ========================================
       LOAD PROFILE INFORMATION
    ======================================== */

    function loadProfile() {

        profileName.value =
            currentUser.name || "";

        profileEmail.value =
            currentUser.email || "";

        profilePhone.value =
            currentUser.phone || "";

        profileAddress.value =
            currentUser.address || "";


        updateInitial();


        /* ========================================
           LOAD PROFILE IMAGE
        ======================================== */

        if (
            currentUser.profileImage &&
            profileImage
        ) {

            profileImage.src =
                currentUser.profileImage;

            profileImage.style.display =
                "block";


            if (profileInitial) {

                profileInitial.style.display =
                    "none";

            }

        } else {

            if (profileImage) {

                profileImage.src = "";

                profileImage.style.display =
                    "none";

            }


            if (profileInitial) {

                profileInitial.style.display =
                    "block";

            }

        }

    }


    /* ========================================
       LOAD PROFILE
    ======================================== */

    loadProfile();


    /* ========================================
       SAVE USER TO LOCAL STORAGE
    ======================================== */

    function saveUserData() {

        localStorage.setItem(
            "crocharmiCurrentUser",
            JSON.stringify(currentUser)
        );


        /* ========================================
           UPDATE USERS LIST
        ======================================== */

        let users = [];

        try {

            users = JSON.parse(
                localStorage.getItem(
                    "crocharmiUsers"
                )
            ) || [];

        } catch (error) {

            users = [];

        }


        /*
         * Find the current user.
         * We use the updated email first,
         * then fall back to the original email.
         */

        const userIndex =
            users.findIndex(function (user) {

                return (
                    user.email === currentUser.email
                );

            });


        if (userIndex !== -1) {

            users[userIndex] =
                {
                    ...users[userIndex],
                    ...currentUser
                };

            localStorage.setItem(
                "crocharmiUsers",
                JSON.stringify(users)
            );

        }

    }


    /* ========================================
       PROFILE FORM SUBMIT
    ======================================== */

    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    profileName.value.trim();

                const email =
                    profileEmail.value.trim();

                const phone =
                    profilePhone.value.trim();

                const address =
                    profileAddress.value.trim();


                /* ========================================
                   VALIDATION
                ======================================== */

                if (!name) {

                    if (typeof showToast === "function") {

                        showToast(
                            "Please enter your name.",
                            "error"
                        );

                    } else {

                        alert(
                            "Please enter your name."
                        );

                    }

                    profileName.focus();

                    return;
                }


                if (!email) {

                    if (typeof showToast === "function") {

                        showToast(
                            "Please enter your email address.",
                            "error"
                        );

                    } else {

                        alert(
                            "Please enter your email address."
                        );

                    }

                    profileEmail.focus();

                    return;
                }


                /* ========================================
                   UPDATE CURRENT USER
                ======================================== */

                currentUser.name =
                    name;

                currentUser.email =
                    email;

                currentUser.phone =
                    phone;

                currentUser.address =
                    address;


                /* Save */

                saveUserData();


                /* Update displayed name */

                updateInitial();


                /* ========================================
                   SUCCESS MESSAGE
                ======================================== */

                if (typeof showToast === "function") {

                    showToast(
                        "Profile updated successfully.",
                        "success"
                    );

                } else {

                    alert(
                        "Profile updated successfully."
                    );

                }

            }
        );

    }


    /* ========================================
       PROFILE IMAGE UPLOAD
    ======================================== */

    if (profileImageInput) {

        profileImageInput.addEventListener(
            "change",
            function (event) {

                const file =
                    event.target.files[0];


                if (!file) {

                    return;

                }


                /* ========================================
                   CHECK FILE TYPE
                ======================================== */

                const allowedTypes = [
                    "image/jpeg",
                    "image/png",
                    "image/webp"
                ];


                if (
                    !allowedTypes.includes(
                        file.type
                    )
                ) {

                    if (typeof showToast === "function") {

                        showToast(
                            "Please choose a JPG, PNG, or WEBP image.",
                            "error"
                        );

                    } else {

                        alert(
                            "Please choose a JPG, PNG, or WEBP image."
                        );

                    }


                    profileImageInput.value =
                        "";

                    return;

                }


                /* ========================================
                   CHECK FILE SIZE
                   Maximum: 2 MB
                ======================================== */

                const maxSize =
                    2 * 1024 * 1024;


                if (file.size > maxSize) {

                    if (typeof showToast === "function") {

                        showToast(
                            "Profile picture must be 2MB or smaller.",
                            "error"
                        );

                    } else {

                        alert(
                            "Profile picture must be 2MB or smaller."
                        );

                    }


                    profileImageInput.value =
                        "";

                    return;

                }


                /* ========================================
                   READ IMAGE
                ======================================== */

                const reader =
                    new FileReader();


                reader.onload =
                    function (readerEvent) {

                        const imageData =
                            readerEvent.target.result;


                        /* Save image */

                        currentUser.profileImage =
                            imageData;


                        /* Display image */

                        if (profileImage) {

                            profileImage.src =
                                imageData;

                            profileImage.style.display =
                                "block";

                        }


                        /* Hide initial */

                        if (profileInitial) {

                            profileInitial.style.display =
                                "none";

                        }


                        /* Save user */

                        saveUserData();


                        /* Success */

                        if (
                            typeof showToast ===
                            "function"
                        ) {

                            showToast(
                                "Profile picture updated.",
                                "success"
                            );

                        }

                    };


                reader.readAsDataURL(file);

            }
        );

    }


    /* ========================================
       REMOVE PROFILE PHOTO
    ======================================== */

    if (removePhotoButton) {

        removePhotoButton.addEventListener(
            "click",
            function () {

                /* Remove stored image */

                delete currentUser.profileImage;


                /* Reset image */

                if (profileImage) {

                    profileImage.src =
                        "";

                    profileImage.style.display =
                        "none";

                }


                /* Show initial */

                if (profileInitial) {

                    profileInitial.style.display =
                        "block";

                }


                /* Reset file input */

                if (profileImageInput) {

                    profileImageInput.value =
                        "";

                }


                /* Save */

                saveUserData();


                /* Success message */

                if (typeof showToast === "function") {

                    showToast(
                        "Profile picture removed.",
                        "success"
                    );

                }

            }
        );

    }


    /* ========================================
       LOGOUT
    ======================================== */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {

                    return;

                }


                /* Remove current logged-in user */

                localStorage.removeItem(
                    "crocharmiCurrentUser"
                );


                /* Redirect to public homepage */

                window.location.replace(
                    "../index.html"
                );

            }
        );

    }

});