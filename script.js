// Page Navigation
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const indicators = document.querySelectorAll('.indicator');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

let currentPage = 1;

// Show specific page
function showPage(pageNum) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(`page${pageNum}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation
    updateNav(pageNum);
    
    currentPage = pageNum;
}

// Update navigation links and indicators
function updateNav(pageNum) {
    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageNum.toString()) {
            link.classList.add('active');
        }
    });

    // Update indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
        if (indicator.getAttribute('data-page') === pageNum.toString()) {
            indicator.classList.add('active');
        }
    });

    // Close mobile menu
    if (navMenu) {
        navMenu.classList.remove('active');
    }
}

// Event listeners for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageNum = parseInt(link.getAttribute('data-page'));
        showPage(pageNum);
    });
});

// Event listeners for indicators
indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        const pageNum = parseInt(indicator.getAttribute('data-page'));
        showPage(pageNum);
    });
});

// Hamburger menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentPage < 7) {
        showPage(currentPage + 1);
    } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        showPage(currentPage - 1);
    }
});

// Mouse wheel navigation
let wheelTimeout;
document.addEventListener('wheel', (e) => {
    if (wheelTimeout) return;
    
    if (e.deltaY > 0 && currentPage < 7) {
        showPage(currentPage + 1);
    } else if (e.deltaY < 0 && currentPage > 1) {
        showPage(currentPage - 1);
    }

    wheelTimeout = setTimeout(() => {
        wheelTimeout = null;
    }, 1000);
}, { passive: true });

// Initialize - show first page
showPage(1);

// Smooth scroll behavior for nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.page').forEach(page => {
    observer.observe(page);
});

// Parallax effect for flower decorations
document.addEventListener('mousemove', (e) => {
    const flowers = document.querySelectorAll('.flower-decoration');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    flowers.forEach((flower, index) => {
        const offsetX = (x - 0.5) * (index + 1) * 10;
        const offsetY = (y - 0.5) * (index + 1) * 10;
        
        flower.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});

// Social media link animation
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.contact-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add touch support for mobile navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchStartX - touchEndX > swipeThreshold && currentPage < 7) {
        // Swiped left
        showPage(currentPage + 1);
    }
    
    if (touchEndX - touchStartX > swipeThreshold && currentPage > 1) {
        // Swiped right
        showPage(currentPage - 1);
    }
}

// Initialize page at first load
window.addEventListener('load', () => {
    // Ensure first page is visible
    showPage(1);
    
    // Add loading complete class for any additional styling
    document.body.classList.add('loaded');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Portfolio tab is hidden');
    } else {
        console.log('Portfolio tab is visible');
    }
});
