document.addEventListener("DOMContentLoaded", function () {

  /* ================================
     LOADER — REMOVE AFTER 1 SECOND
  ================================= */

  const loader = document.getElementById("loader");

  setTimeout(function () {
    if (loader) {
      loader.classList.add("hide");
    }

    document.body.classList.remove("lock");
  }, 1000);


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

    menuToggle.addEventListener("click", function () {

      mainNav.classList.toggle("open");

      const opened =
        mainNav.classList.contains("open");

      menuToggle.setAttribute(
        "aria-expanded",
        opened ? "true" : "false"
      );

    });


    const links = mainNav.querySelectorAll("a");

    links.forEach(function (link) {

      link.addEventListener("click", function () {

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* ================================
     NAVIGATION SCROLL
  ================================= */

  const nav = document.getElementById("nav");

  function checkScroll() {

    if (!nav) return;

    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", checkScroll);

  checkScroll();


  /* ================================
     SCROLL REVEAL
  ================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      }, {
        threshold: 0.1
      });


    revealElements.forEach(function (element) {

      observer.observe(element);

    });

  } else {

    revealElements.forEach(function (element) {

      element.classList.add("visible");

    });

  }


  /* ================================
     PHOTO LIGHTBOX
  ================================= */

  const galleryItems =
    Array.from(
      document.querySelectorAll(".gallery-item")
    );

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
     OPEN PHOTO
  ================================= */

  function showImage(index) {

    if (!galleryItems.length) return;

    currentIndex =
      (index + galleryItems.length) %
      galleryItems.length;

    const item =
      galleryItems[currentIndex];

    const image =
      item.querySelector("img");

    const imagePath =
      item.dataset.image ||
      image.getAttribute("src");

    const title =
      item.dataset.title ||
      image.getAttribute("alt") ||
      "";

    const category =
      item.dataset.category ||
      "";


    if (lightboxImage) {

      lightboxImage.src = imagePath;
      lightboxImage.alt = title;

    }


    if (lightboxNumber) {

      lightboxNumber.textContent =
        String(currentIndex + 1).padStart(2, "0");

    }


    if (lightboxTitle) {

      lightboxTitle.textContent = title;

    }


    if (lightboxCategory) {

      lightboxCategory.textContent = category;

    }


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
     CLOSE PHOTO
  ================================= */

  function closeBox() {

    if (lightbox) {

      lightbox.classList.remove("open");

      lightbox.setAttribute(
        "aria-hidden",
        "true"
      );

    }

    document.body.classList.remove("lock");

  }


  /* ================================
     CLICK GALLERY PHOTOS
  ================================= */

  galleryItems.forEach(function (item, index) {

    item.addEventListener("click", function () {

      showImage(index);

    });

  });


  /* ================================
     LIGHTBOX BUTTONS
  ================================= */

  if (closeLightbox) {

    closeLightbox.addEventListener(
      "click",
      closeBox
    );

  }


  if (prevImage) {

    prevImage.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();

        showImage(currentIndex - 1);

      }
    );

  }


  if (nextImage) {

    nextImage.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();

        showImage(currentIndex + 1);

      }
    );

  }


  /* ================================
     CLICK OUTSIDE PHOTO TO CLOSE
  ================================= */

  if (lightbox) {

    lightbox.addEventListener(
      "click",
      function (event) {

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
    function (event) {

      if (
        !lightbox ||
        !lightbox.classList.contains("open")
      ) {
        return;
      }


      if (event.key === "Escape") {

        closeBox();

      }


      if (event.key === "ArrowLeft") {

        showImage(currentIndex - 1);

      }


      if (event.key === "ArrowRight") {

        showImage(currentIndex + 1);

      }

    }
  );


  /* ================================
     MOBILE SWIPE
  ================================= */

  let startX = 0;

  if (lightbox) {

    lightbox.addEventListener(
      "touchstart",
      function (event) {

        startX =
          event.changedTouches[0].screenX;

      },
      { passive: true }
    );


    lightbox.addEventListener(
      "touchend",
      function (event) {

        const endX =
          event.changedTouches[0].screenX;

        const distance =
          startX - endX;


        if (Math.abs(distance) < 50) {
          return;
        }


        if (distance > 0) {

          showImage(currentIndex + 1);

        } else {

          showImage(currentIndex - 1);

        }

      },
      { passive: true }
    );

  }


  /* ================================
     PRELOAD PHOTOS
  ================================= */

  galleryItems.forEach(function (item) {

    const imagePath =
      item.dataset.image;

    if (!imagePath) return;

    const image =
      new Image();

    image.src = imagePath;

  });

});
