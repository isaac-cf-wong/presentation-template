// Custom JavaScript for your presentation template

// Wait for Reveal.js to be ready
Reveal.addEventListener("ready", function (event) {
  console.log("🎯 Presentation template loaded successfully!");

  // Add any initialization code here
  initializeCustomFeatures();
});

// Initialize custom features
function initializeCustomFeatures() {
  // Add slide counter to console for debugging
  console.log(`📊 Total slides: ${Reveal.getTotalSlides()}`);

  // Add keyboard shortcuts
  addCustomKeyboardShortcuts();

  // Initialize any custom interactions
  initializeInteractions();

  // Setup analytics (if needed)
  // setupAnalytics();
}

// Custom keyboard shortcuts
function addCustomKeyboardShortcuts() {
  document.addEventListener("keydown", function (event) {
    // Custom shortcut: 'T' for theme toggle (example)
    if (event.key === "t" || event.key === "T") {
      if (!event.ctrlKey && !event.metaKey) {
        toggleTheme();
        event.preventDefault();
      }
    }
  });
}

// Theme toggle functionality (example)
function toggleTheme() {
  const themeLink = document.getElementById("theme");
  const currentTheme = themeLink.getAttribute("href");

  if (currentTheme.includes("black")) {
    themeLink.setAttribute(
      "href",
      "node_modules/reveal.js/dist/theme/white.css"
    );
    console.log("🎨 Switched to white theme");
  } else {
    themeLink.setAttribute(
      "href",
      "node_modules/reveal.js/dist/theme/black.css"
    );
    console.log("🎨 Switched to black theme");
  }
}

// Presentation mode toggle
function togglePresentationMode() {
  const reveal = document.querySelector(".reveal");
  reveal.classList.toggle("presentation-mode");

  if (reveal.classList.contains("presentation-mode")) {
    console.log("📺 Presentation mode ON");
    // Add any presentation-specific styling or behavior
  } else {
    console.log("📺 Presentation mode OFF");
  }
}

// Initialize custom interactions
function initializeInteractions() {
  // Add click handlers for custom elements
  const customButtons = document.querySelectorAll(".custom-button");
  customButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      console.log("🔘 Custom button clicked:", this.textContent);
      // Add custom button behavior here
    });
  });

  // Add hover effects for enhanced interactivity
  addHoverEffects();
}

// Add hover effects
function addHoverEffects() {
  const slides = document.querySelectorAll(".slides section");

  slides.forEach((slide) => {
    const images = slide.querySelectorAll("img");
    images.forEach((img) => {
      img.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.05)";
        this.style.transition = "transform 0.3s ease";
      });

      img.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
      });
    });
  });
}

// Slide event listeners
Reveal.addEventListener("slidechanged", function (event) {
  const indices = Reveal.getIndices();
  const slideNumber =
    indices.v > 0 ? `${indices.h + 1}.${indices.v + 1}` : `${indices.h + 1}`;
  console.log(`📍 Moved to slide ${slideNumber}`);

  // Add any slide-specific behavior here
  handleSlideChange(event);
});

// Handle slide change events
function handleSlideChange(event) {
  const currentSlide = event.currentSlide;

  // Example: Auto-play videos on certain slides
  const videos = currentSlide.querySelectorAll("video");
  videos.forEach((video) => {
    if (video.hasAttribute("data-autoplay")) {
      video.play();
    }
  });

  // Example: Trigger animations based on slide content
  if (currentSlide.hasAttribute("data-background-gradient")) {
    console.log("🌈 Gradient background slide detected");
  }
}

// Utility functions
const PresentationUtils = {
  // Get current slide info
  getCurrentSlideInfo: function () {
    const indices = Reveal.getIndices();
    return {
      horizontal: indices.h,
      vertical: indices.v,
      total: Reveal.getTotalSlides(),
    };
  },

  // Navigate to specific slide
  goToSlide: function (h, v = 0) {
    Reveal.slide(h, v);
  },

  // Get all slide titles
  getSlideTitles: function () {
    const slides = document.querySelectorAll(".slides section");
    return Array.from(slides).map((slide) => {
      const title = slide.querySelector("h1, h2, h3");
      return title ? title.textContent : "Untitled";
    });
  },

  // Export current state
  exportState: function () {
    return {
      currentSlide: this.getCurrentSlideInfo(),
      theme: document.getElementById("theme").getAttribute("href"),
      titles: this.getSlideTitles(),
    };
  },
};

// Make utilities available globally for debugging
window.PresentationUtils = PresentationUtils;

// Optional: Setup analytics tracking
function setupAnalytics() {
  // Example Google Analytics or other tracking
  // Only add if you need presentation analytics

  Reveal.addEventListener("slidechanged", function (event) {
    // Track slide views
    if (typeof gtag !== "undefined") {
      gtag("event", "slide_view", {
        slide_number: event.indexh + 1,
        slide_title:
          event.currentSlide.querySelector("h1, h2, h3")?.textContent ||
          "Untitled",
      });
    }
  });
}

// Development helpers (remove in production)
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  console.log("🛠️ Development mode detected");

  // Add development shortcuts
  window.addEventListener("keydown", function (event) {
    // Ctrl/Cmd + D for debug info
    if ((event.ctrlKey || event.metaKey) && event.key === "d") {
      console.table(PresentationUtils.exportState());
      event.preventDefault();
    }
  });
}
