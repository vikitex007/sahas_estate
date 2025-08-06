// DOM Elements
const loadingAnimation = document.getElementById("loadingAnimation");
const header = document.getElementById("header");
const navLinks = document.querySelectorAll(".nav-link");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxContent = document.getElementById("lightboxContent");
const contactForm = document.getElementById("contactForm");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const languageToggle = document.getElementById("languageToggle");

// Media Posts Data (will be loaded from CMS)
let mediaPosts = [];

// Loading Animation
window.addEventListener("load", () => {
  setTimeout(() => {
    loadingAnimation.classList.add("hidden");
    setTimeout(() => {
      loadingAnimation.style.display = "none";
    }, 500);
  }, 1000);
});

// Smooth Scrolling for Navigation Links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active Navigation Link on Scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll(".section");
  const scrollPos = window.scrollY + header.offsetHeight + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLink) {
        navLink.classList.add("active");
      }
    }
  });
}

// Header Background on Scroll
function updateHeaderBackground() {
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
}

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Performance optimizations
let scrollTimeout;
let resizeTimeout;

// Throttled scroll handler
function throttledScrollHandler() {
  if (scrollTimeout) return;

  scrollTimeout = setTimeout(() => {
    updateActiveNavLink();
    updateHeaderBackground();
    scrollTimeout = null;
  }, 16); // ~60fps
}

// Throttled resize handler
function throttledResizeHandler() {
  if (resizeTimeout) return;

  resizeTimeout = setTimeout(() => {
    // Handle responsive adjustments
    resizeTimeout = null;
  }, 250);
}

// Observe elements for animations
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");
  const slideElements = document.querySelectorAll(".slide-in");

  fadeElements.forEach((el) => observer.observe(el));
  slideElements.forEach((el) => observer.observe(el));

  // Add event listeners with throttling
  window.addEventListener("scroll", throttledScrollHandler, { passive: true });
  window.addEventListener("resize", throttledResizeHandler, { passive: true });

  // Initialize mobile menu
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });
  }

  // Initialize language toggle
  if (languageToggle) {
    languageToggle.addEventListener("click", toggleLanguage);
  }

  // Initialize media gallery tabs
  setupMediaGallery();

  // Initialize lightbox
  setupLightbox();

  // Initialize form validation
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
});

// Mobile Menu Toggle (already handled in DOMContentLoaded)
// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
  });
});

// Lightbox Functionality
function setupLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item, .media-post");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title =
        item.querySelector("h4, .media-post-title")?.textContent || "";
      const description =
        item.querySelector("p, .media-post-description")?.textContent || "";

      if (img && lightboxContent) {
        lightboxContent.innerHTML = `
          <img src="${img.src}" alt="${img.alt}" class="lightbox-image">
          <div class="lightbox-info">
            <h3 class="lightbox-title">${title}</h3>
            <p class="lightbox-description">${description}</p>
          </div>
        `;

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });
}

// Close lightbox
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

// Tab Functionality
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetTab = btn.getAttribute("data-tab");

    // Remove active class from all buttons and contents
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button and corresponding content
    btn.classList.add("active");
    document.getElementById(targetTab).classList.add("active");

    // Load content based on tab
    if (targetTab === "photos") {
      loadPhotoPosts();
    } else if (targetTab === "videos") {
      loadVideoPosts();
    }
  });
});

// Media Gallery Functionality
function setupMediaGallery() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      btn.classList.add("active");
      document.getElementById(`${targetTab}-tab`).classList.add("active");
    });
  });

  // Preload videos for better performance
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.preload = "metadata";
    video.addEventListener("loadedmetadata", () => {
      video.style.opacity = "1";
    });
    video.addEventListener("error", () => {
      console.error("Video loading error:", video.src);
      video.style.display = "none";
    });
  });
}

// Initialize media gallery
document.addEventListener("DOMContentLoaded", function () {
  setupMediaGallery();
});

// Load Media Posts from CMS
async function loadMediaPosts() {
  try {
    // In a real implementation, this would fetch from your CMS
    // For now, we'll use sample data
    const samplePosts = [
      {
        id: 1,
        title: "Beautiful Land for Sale",
        description:
          "Prime 5-acre lot with stunning mountain views. Perfect for residential development.",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
        video: null,
        type: "photo",
        date: "2024-01-15",
      },
      {
        id: 2,
        title: "Luxury Home Tour",
        description:
          "Take a virtual tour of our featured luxury home with modern amenities.",
        image: null,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        type: "video",
        date: "2024-01-10",
      },
      {
        id: 3,
        title: "Commercial Property Available",
        description:
          "High-traffic retail space with excellent visibility and parking.",
        image:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
        video: null,
        type: "photo",
        date: "2024-01-05",
      },
      {
        id: 4,
        title: "Property Investment Guide",
        description:
          "Learn about the best investment opportunities in our local market.",
        image: null,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        type: "video",
        date: "2024-01-01",
      },
    ];

    mediaPosts = samplePosts;
    renderMediaPosts();
  } catch (error) {
    console.error("Error loading media posts:", error);
    showNotification("Error loading media content", "error");
  }
}

// Render Media Posts
function renderMediaPosts() {
  const photosContainer = document.getElementById("photos");
  const videosContainer = document.getElementById("videos");

  if (!photosContainer || !videosContainer) return;

  // Clear existing content
  photosContainer.innerHTML = "";
  videosContainer.innerHTML = "";

  // Separate photos and videos
  const photoPosts = mediaPosts.filter((post) => post.type === "photo");
  const videoPosts = mediaPosts.filter((post) => post.type === "video");

  // Render photos
  if (photoPosts.length > 0) {
    const photosGrid = document.createElement("div");
    photosGrid.className = "media-posts-grid";

    photoPosts.forEach((post) => {
      const postElement = createMediaPostElement(post);
      photosGrid.appendChild(postElement);
    });

    photosContainer.appendChild(photosGrid);
  } else {
    photosContainer.innerHTML =
      '<div class="loading-state">No photo posts available</div>';
  }

  // Render videos
  if (videoPosts.length > 0) {
    const videosGrid = document.createElement("div");
    videosGrid.className = "media-posts-grid";

    videoPosts.forEach((post) => {
      const postElement = createMediaPostElement(post);
      videosGrid.appendChild(postElement);
    });

    videosContainer.appendChild(videosGrid);
  } else {
    videosContainer.innerHTML =
      '<div class="loading-state">No video posts available</div>';
  }

  // Setup lightbox for new elements
  setupLightbox();
}

// Create Media Post Element
function createMediaPostElement(post) {
  const postElement = document.createElement("div");
  postElement.className = "media-post";
  postElement.dataset.postId = post.id;

  const content = `
    ${
      post.image
        ? `<img src="${post.image}" alt="${post.title}" class="media-post-image">`
        : ""
    }
    ${
      post.video
        ? `<iframe src="${post.video}" class="media-post-video" frameborder="0" allowfullscreen></iframe>`
        : ""
    }
    <div class="media-post-content">
      <h4 class="media-post-title">${post.title}</h4>
      <p class="media-post-description">${post.description}</p>
      <div class="media-post-date">${formatDate(post.date)}</div>
    </div>
  `;

  postElement.innerHTML = content;
  return postElement;
}

// Format Date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Load Photo Posts
function loadPhotoPosts() {
  const photoPosts = mediaPosts.filter((post) => post.type === "photo");
  const photosContainer = document.getElementById("photos");

  if (!photosContainer) return;

  photosContainer.innerHTML = "";

  if (photoPosts.length > 0) {
    const photosGrid = document.createElement("div");
    photosGrid.className = "media-posts-grid";

    photoPosts.forEach((post) => {
      const postElement = createMediaPostElement(post);
      photosGrid.appendChild(postElement);
    });

    photosContainer.appendChild(photosGrid);
  } else {
    photosContainer.innerHTML =
      '<div class="loading-state">No photo posts available</div>';
  }

  setupLightbox();
}

// Load Video Posts
function loadVideoPosts() {
  const videoPosts = mediaPosts.filter((post) => post.type === "video");
  const videosContainer = document.getElementById("videos");

  if (!videosContainer) return;

  videosContainer.innerHTML = "";

  if (videoPosts.length > 0) {
    const videosGrid = document.createElement("div");
    videosGrid.className = "media-posts-grid";

    videoPosts.forEach((post) => {
      const postElement = createMediaPostElement(post);
      videosGrid.appendChild(postElement);
    });

    videosContainer.appendChild(videosGrid);
  } else {
    videosContainer.innerHTML =
      '<div class="loading-state">No video posts available</div>';
  }
}

// Contact Form Handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Basic validation
  if (!data.name || !data.email || !data.message) {
    showNotification("Please fill in all required fields.", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showNotification("Please enter a valid email address.", "error");
    return;
  }

  // Simulate form submission
  showNotification(
    "Thank you for your message! We'll get back to you soon.",
    "success"
  );
  contactForm.reset();
});

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#2563eb"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Parallax Effect for Hero Section
function parallaxEffect() {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector(".home-section");
  if (heroSection) {
    const rate = scrolled * -0.5;
    heroSection.style.transform = `translateY(${rate}px)`;
  }
}

// Scroll Event Listeners
window.addEventListener("scroll", () => {
  updateActiveNavLink();
  updateHeaderBackground();
  parallaxEffect();
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateActiveNavLink();
  updateHeaderBackground();
  loadMediaPosts();

  // Add CSS for mobile menu
  const style = document.createElement("style");
  style.textContent = `
        @media (max-width: 768px) {
            .nav {
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                padding: 2rem;
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            }
            
            .nav.active {
                transform: translateY(0);
            }
            
            .nav-list {
                flex-direction: column;
                gap: 1rem;
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
  document.head.appendChild(style);
});

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
    navMenu.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
  }
});

// Performance Optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    updateActiveNavLink();
    updateHeaderBackground();
    parallaxEffect();
  }, 16)
); // ~60fps

// Lazy Loading for Images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages);

// Smooth reveal animation for service cards
function animateServiceCards() {
  const serviceCards = document.querySelectorAll(".service-card");
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("slide-in");
          }, index * 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  serviceCards.forEach((card) => cardObserver.observe(card));
}

// Initialize service card animations
document.addEventListener("DOMContentLoaded", animateServiceCards);

// Enhanced hover effects
function addHoverEffects() {
  const interactiveElements = document.querySelectorAll(
    ".btn, .service-card, .team-member, .gallery-item, .video-item, .media-post"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transform = this.style.transform + " scale(1.02)";
    });

    element.addEventListener("mouseleave", function () {
      this.style.transform = this.style.transform.replace(" scale(1.02)", "");
    });
  });
}

// Initialize hover effects
document.addEventListener("DOMContentLoaded", addHoverEffects);

// Form validation enhancement
function enhanceFormValidation() {
  const inputs = contactForm.querySelectorAll("input, textarea, select");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        validateField(this);
      }
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Remove existing error styling
  field.classList.remove("error");

  // Validation rules
  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "This field is required.";
  } else if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = "Please enter a valid email address.";
    }
  } else if (field.type === "tel" && value) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""))) {
      isValid = false;
      errorMessage = "Please enter a valid phone number.";
    }
  }

  // Apply validation result
  if (!isValid) {
    field.classList.add("error");
    showFieldError(field, errorMessage);
  } else {
    removeFieldError(field);
  }
}

function showFieldError(field, message) {
  removeFieldError(field);

  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;

  field.parentNode.appendChild(errorDiv);
}

function removeFieldError(field) {
  const existingError = field.parentNode.querySelector(".field-error");
  if (existingError) {
    existingError.remove();
  }
}

// Initialize form validation
document.addEventListener("DOMContentLoaded", enhanceFormValidation);

// Add error styling to CSS
const errorStyles = document.createElement("style");
errorStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;
document.head.appendChild(errorStyles);

// Language Toggle Functionality
let currentLanguage = "en";

function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "ne" : "en";
  updateLanguage();
  updateLanguageToggle();
}

function updateLanguage() {
  const elements = document.querySelectorAll("[data-en][data-ne]");
  elements.forEach((element) => {
    if (currentLanguage === "ne") {
      element.textContent = element.getAttribute("data-ne");
      // Update placeholder attributes for form inputs
      if (element.hasAttribute("placeholder")) {
        element.placeholder = element.getAttribute("data-ne");
      }
    } else {
      element.textContent = element.getAttribute("data-en");
      // Update placeholder attributes for form inputs
      if (element.hasAttribute("placeholder")) {
        element.placeholder = element.getAttribute("data-en");
      }
    }
  });
}

function updateLanguageToggle() {
  const toggle = document.getElementById("languageToggle");
  const langText = toggle.querySelector(".lang-text");

  if (currentLanguage === "ne") {
    langText.textContent = "English";
    toggle.setAttribute("data-current", "ne");
  } else {
    langText.textContent = "नेपाली";
    toggle.setAttribute("data-current", "en");
  }
}

// Language toggle is already initialized in the main DOMContentLoaded event listener

// Form submission handler
function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  // Basic validation
  if (!name || !email || !message) {
    showNotification("Please fill in all required fields", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  // Simulate form submission
  showNotification(
    "Thank you! Your message has been sent successfully.",
    "success"
  );
  contactForm.reset();
}
