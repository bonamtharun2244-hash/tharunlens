document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     PAGE LOADER
  ================================= */
  const loader = document.getElementById("loader");

  setTimeout(() => {
    if (loader) {
      loader.classList.add("hide");
    }

    document.body.classList.remove("lock");
  }, 900);


  /* ================================
     FOOTER YEAR
  ================================= */
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* ================================
     MOBILE MENU
  ================================= */
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    // Close menu after clicking a link
    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(link => {

      link.addEventListener("click", () => {

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* ================================
     NAVBAR SCROLL EFFECT
  ================================= */
  const nav = document.getElementById("nav");

  window.addEventListener("scroll", () => {

    if (!nav) return;

    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

  });


  /* ================================
     SCROLL REVEAL ANIMATION
  ================================= */
  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


    revealElements.forEach((element) => {

      observer.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add("visible");

    });

  }


  /* ================================
     PHOTO GALLERY
  ================================= */

  const galleryItems =
    Array.from(document.querySelectorAll(".gallery-item"));

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImage =
    document.getElementById("lightboxImage");

  const lightboxNumber =
    document.getElementById("lightboxNumber");

  const lightboxTitle =
    document.getElementById("lightboxTitle");

  const lightboxCategory =
    document.getElementById("lightboxCategory");

  const closeLightbox =
    document.getElementById("closeLightbox");

  const prevImage =
    document.getElementById("prevImage");

  const nextImage =
    document.getElementById("nextImage");


  let currentIndex = 0;


  /* ================================
     PHOTO FILE NAMES
     
     All photos are in repository root.
  ================================= */

  const photos = [
    "peacock-sunset.jpg",
    "clouds-mountain.jpg",
    "sunset-reflection.jpg",
    "sky-column.jpg",
    "storm-sky.jpg",
    "temple.jpg",
    "sunset-mountains.jpg",
    "lightning-night.jpg",
    "birds-sky.jpg"
  ];


  /* ================================
     SHOW PHOTO
  ================================= */

  function showImage(index) {

    if (!galleryItems.length) return;

    currentIndex =
      (index + galleryItems.length) %
      galleryItems.length;


    const item =
      galleryItems[currentIndex];


    /*
      Get image directly from data-image.
      If data-image is missing, use the
      photo filename from the photos array.
    */

    let imagePath =
      item.dataset.image;


    if (!imagePath) {

      imagePath =
        photos[currentIndex];

    }


    // Remove incorrect "images/" path if present
    imagePath =
      imagePath.replace(/^images\//, "");


    /* Display image */

    if (lightboxImage) {

      lightboxImage.src = imagePath;

      lightboxImage.alt =
        item.querySelector("img")?.alt ||
        item.dataset.title ||
        "Tharun Lens Photography";

    }


    /* Photo number */

    if (lightboxNumber) {

      lightboxNumber.textContent =
        String(currentIndex + 1).padStart(2, "0");

    }


    /* Photo title */

    if (lightboxTitle) {

      lightboxTitle.textContent =
        item.dataset.title || "";

    }


    /* Photo category */

    if (lightboxCategory) {

      lightboxCategory.textContent =
        item.dataset.category || "";

    }


    /* Open lightbox */

    if (lightbox) {

      lightbox.classList.add("open");

      lightbox.setAttribute(
        "aria-hidden",
        "false"
      );

    }


    document.body.classList.add("lock");

  }


  /* ================================
     CLOSE LIGHTBOX
  ================================= */

  function closeBox() {

    if (!lightbox) return;

    lightbox.classList.remove("open");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove("lock");

  }


  /* ================================
     GALLERY CLICK
  ================================= */

  galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

      showImage(index);

    });

  });


  /* ================================
     CLOSE BUTTON
  ================================= */

  if (closeLightbox) {

    closeLightbox.addEventListener(
      "click",
      closeBox
    );

  }


  /* ================================
     PREVIOUS PHOTO
  ================================= */

  if (prevImage) {

    prevImage.addEventListener(
      "click",
      () => {

        showImage(currentIndex - 1);

      }
    );

  }


  /* ================================
     NEXT PHOTO
  ================================= */

  if (nextImage) {

    nextImage.addEventListener(
      "click",
      () => {

        showImage(currentIndex + 1);

      }
    );

  }


  /* ================================
     CLICK OUTSIDE PHOTO
  ================================= */

  if (lightbox) {

    lightbox.addEventListener(
      "click",
      (event) => {

        if (event.target === lightbox) {

          closeBox();

        }

      }
    );

  }


  /* ================================
     KEYBOARD CONTROLS
  ================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        !lightbox ||
        !lightbox.classList.contains("open")
      ) {
        return;
      }


      // ESC = close
      if (event.key === "Escape") {

        closeBox();

      }


      // LEFT ARROW = previous
      if (event.key === "ArrowLeft") {

        showImage(currentIndex - 1);

      }


      // RIGHT ARROW = next
      if (event.key === "ArrowRight") {

        showImage(currentIndex + 1);

      }

    }
  );


  /* ================================
     FIX BROKEN IMAGE PATHS
     
     This automatically changes:
     
     images/photo.jpg
     
     into:
     
     photo.jpg
     
     ================================= */

  const allImages =
    document.querySelectorAll("img");


  allImages.forEach((img) => {

    const src = img.getAttribute("src");

    if (src && src.startsWith("images/")) {

      img.src =
        src.replace(/^images\//, "");

    }

  });


  /* ================================
     FIX GALLERY DATA-IMAGE PATHS
  ================================= */

  galleryItems.forEach((item) => {

    const image =
      item.getAttribute("data-image");

    if (
      image &&
      image.startsWith("images/")
    ) {

      item.setAttribute(
        "data-image",
        image.replace(/^images\//, "")
      );

    }

  });


});
