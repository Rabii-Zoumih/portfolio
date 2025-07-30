// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetID = this.getAttribute('href');
    const target = document.querySelector(targetID);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll fade-in animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('section, .project-card, .profile-photo, .about-text').forEach(el => {
  observer.observe(el);
});

// Add "fade-in" animation styles dynamically (optional if not in CSS)
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 1 !important;
    transform: translateY(0px) !important;
    transition: opacity 1s ease, transform 1s ease;
  }

  section, .project-card, .profile-photo, .about-text {
    opacity: 0;
    transform: translateY(30px);
  }
`;
document.head.appendChild(style);

// Optional: Highlight nav link on scroll
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Lightbox functions
function showFull(img) {
  const fullSrc = img.src;
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = fullSrc;
  lightbox.style.display = "flex";
}

function hideFull() {
  document.getElementById("lightbox").style.display = "none";
}

// Add click event listeners to project images for lightbox
document.querySelectorAll('.project-img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => showFull(img));
});
