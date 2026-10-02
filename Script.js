/* =========================================
   THARUN LENS
   Main JavaScript
========================================= */

"use strict";


/* =========================================
   LOADING SCREEN
========================================= */

function hideLoadingScreen() {

    const loadingScreen =
        document.getElementById("loading-screen");

    if (!loadingScreen) {
        return;
    }

    loadingScreen.classList.add("hide");

}


/*
   Hide the loading screen after the page
   is ready.
*/

window.addEventListener("load", function () {

    setTimeout(function () {

        hideLoadingScreen();

    }, 700);

});


/*
   Safety fallback.

   Even if an image or another resource
   takes too long to load, the website
   will NOT remain stuck on the splash screen.
*/

setTimeout(function () {

    hideLoadingScreen();

}, 3000);



/* =========================================
   MOBILE MENU
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.getElementById("navLinks");


    if (menuButton && navLinks) {

        menuButton.addEventListener("click", function () {

            navLinks.classList.toggle("active");

        });


        /*
           Close menu after clicking a link.
        */

        const links =
            navLinks.querySelectorAll("a");


        links.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

            });

        });

    }


    /* =====================================
       LIGHTBOX
    ===================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const closeLightbox =
        document.getElementById("closeLightbox");


    if (
        galleryItems.length > 0 &&
        lightbox &&
        lightboxImage
    ) {

        galleryItems.forEach(function (item) {

            item.addEventListener("click", function () {

                const image =
                    item.querySelector("img");

                if (!image) {
                    return;
                }

                lightboxImage.src =
                    image.src;

                lightboxImage.alt =
                    image.alt || "Portfolio image";

                lightbox.classList.add("show");

                document.body.style.overflow =
                    "hidden";

            });

        });

    }


    /*
       Close lightbox
    */

    if (closeLightbox && lightbox) {

        closeLightbox.addEventListener(
            "click",
            closeImage
        );

    }


    /*
       Close by clicking outside image
    */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {

                    closeImage();

                }

            }
        );

    }


    /*
       Close with ESC key
    */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeImage();

            }

        }
    );


    function closeImage() {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("show");

        document.body.style.overflow =
            "";

        if (lightboxImage) {

            lightboxImage.src = "";

        }

    }



    /* =====================================
       BOOKING FORM
    ===================================== */

    const bookingForm =
        document.getElementById("bookingForm");


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById("name").value.trim();

                const phone =
                    document.getElementById("phone").value.trim();

                const email =
                    document.getElementById("email").value.trim();

                const service =
                    document.getElementById("service").value;

                const date =
                    document.getElementById("date").value;

                const message =
                    document.getElementById("message").value.trim();


                /*
                   Basic validation
                */

                if (
                    !name ||
                    !phone ||
                    !email ||
                    !service ||
                    !date ||
                    !message
                ) {

                    alert(
                        "Please fill in all booking details."
                    );

                    return;

                }


                /*
                   Create WhatsApp booking message.
                */

                const whatsappMessage =
                    "Hello Tharun Lens,%0A%0A" +

                    "I would like to book a photography session.%0A%0A" +

                    "Name: " +
                    encodeURIComponent(name) +

                    "%0APhone: " +
                    encodeURIComponent(phone) +

                    "%0AEmail: " +
                    encodeURIComponent(email) +

                    "%0AService: " +
                    encodeURIComponent(service) +

                    "%0ADate: " +
                    encodeURIComponent(date) +

                    "%0AMessage: " +
                    encodeURIComponent(message);


                /*
                   WhatsApp number
                   Replace this number if needed.
                */

                const whatsappNumber =
                    "919121497402";


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    whatsappMessage;


                /*
                   Open WhatsApp
                */

                window.open(
                    whatsappURL,
                    "_blank"
                );


                /*
                   Reset form
                */

                bookingForm.reset();

            }
        );

    }


    /* =====================================
       CURRENT YEAR
    ===================================== */

    const yearElements =
        document.querySelectorAll("[data-year]");


    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


});


/* =========================================
   ERROR PROTECTION
========================================= */

/*
   If an unexpected JavaScript error occurs,
   make sure the loading screen is removed.
*/

window.addEventListener(
    "error",
    function () {

        hideLoadingScreen();

    }
);


window.addEventListener(
    "unhandledrejection",
    function () {

        hideLoadingScreen();

    }
);
