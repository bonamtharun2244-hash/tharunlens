document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const nav = document.getElementById("nav");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const year = document.getElementById("year");

  // Hide loading screen
  setTimeout(() => {
    if (loader) loader.classList.add("hide");
    document.body.classList.remove("lock");
  }, 900);

  // Current year
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Navbar background on scroll
  window.addEventListener("scroll", () => {
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    }
  });

  // Scroll reveal animations
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // Lightbox
  const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
  );

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxNumber = document.getElementById("lightboxNumber");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCategory = document.getElementById("lightboxCategory");
  const closeLightbox = document.getElementById("closeLightbox");
  const prevImage = document.getElementById("prevImage");
  const nextImage = document.getElementById("nextImage");

  let currentIndex = 0;

  function showImage(index) {
    if (!galleryItems.length) return;

    currentIndex =
      (index + galleryItems.length) % galleryItems.length;

    const item = galleryItems[currentIndex];

    lightboxImage.src = item.dataset.image;
    lightboxImage.alt =
      item.querySelector("img")?.alt || item.dataset.title || "";

    lightboxNumber.textContent =
      String(currentIndex + 1).padStart(2, "0");

    lightboxTitle.textContent = item.dataset.title || "";
    lightboxCategory.textContent = item.dataset.category || "";

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lock");
  }

  function closeBox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lock");
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      showImage(index);
    });
  });

  if (closeLightbox) {
    closeLightbox.addEventListener("click", closeBox);
  }

  if (prevImage) {
    prevImage.addEventListener("click", () => {
      showImage(currentIndex - 1);
    });
  }

  if (nextImage) {
    nextImage.addEventListener("click", () => {
      showImage(currentIndex + 1);
    });
  }

  // Close when clicking outside the image
  if (lightbox) {
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeBox();
      }
    });
  }

  // Keyboard controls
  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") {
      closeBox();
    }

    if (event.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showImage(currentIndex + 1);
    }
  });
});
