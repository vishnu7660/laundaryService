/* ============================================================
   PureWash Laundry Service - Main JavaScript
   Author : PureWash Team
   Folder : js/main.js
   Note   : Central place for all site-wide behaviour:
            1. Shared header/footer loader
            2. Header scroll micro-interaction
            3. Hero bubble animation
            4. Active navigation highlighting
   ============================================================ */

/* ------------------------------------------------------------
   0. Small helper to detect if the page lives inside /pages/
      (used to build correct relative links for shared parts)
   ------------------------------------------------------------ */
const BASE_URL = document.body.getAttribute('data-base') || './';

/* ------------------------------------------------------------
   1. Component Loader (Header + Footer)
   Every page contains:
     <div id="header-placeholder"></div>
     <div id="footer-placeholder"></div>
   This loader fetches components/header.html & footer.html and
   injects them. Edit the components once - all pages update.

   It ALSO injects the shared css/header-footer.css stylesheet
   so the header and footer are always styled correctly.
   ------------------------------------------------------------ */
function loadSharedStyles() {
    const linkId = 'header-footer-css';
    if (document.getElementById(linkId)) return; // already loaded
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = BASE_URL + 'css/header-footer.css';
    document.head.appendChild(link);
}

/* ------------------------------------------------------------
   1b. Component Link Rewriter
   The header/footer files use paths relative to the PROJECT
   ROOT (e.g. ./index.html, ./images/logo.jpeg). When they are
   injected into a page inside /pages/, those links would point
   to the wrong place. This prefixes the BASE_URL (./ or ../)
   so every link works correctly from ANY page depth.
   ------------------------------------------------------------ */
function rewriteComponentLinks(container) {
    ['a[href]', 'img[src]'].forEach((selector) => {
        container.querySelectorAll(selector).forEach((el) => {
            const attr = el.hasAttribute('href') ? 'href' : 'src';
            const val = el.getAttribute(attr);
            // Only rewrite internal root-relative links (start with ./)
            if (val && val.indexOf('./') === 0) {
                el.setAttribute(attr, BASE_URL + val.slice(2));
            }
        });
    });
}

function loadComponent(id, file) {
    const holder = document.getElementById(id);
    if (!holder) return Promise.resolve();
    return fetch(BASE_URL + file)
        .then((res) => res.text())
        .then((html) => {
            holder.innerHTML = html;
            // Fix relative links so they work from /pages/ too
            rewriteComponentLinks(holder);
            // Shared header/footer stylesheet (once)
            loadSharedStyles();
            // After injecting the header, mark the active menu item
            if (id === 'header-placeholder') initActiveNav();
            initMobileMenu();
        })
        .catch(() => {
            // If fetch fails (e.g. opened via file://), show a friendly hint
            holder.innerHTML = '<p class="text-center py-10 text-on-surface-variant">Header could not load. Please run this project through XAMPP (http://localhost/Laundary/).</p>';
        });
}

/* ------------------------------------------------------------
   2. Active Navigation Highlighting
   Reads the current file name from the URL and adds the
   "active" styles (bold + secondary colour) to the matching
   header link.
   ------------------------------------------------------------ */
function initActiveNav() {
    const path = window.location.pathname.split('/').pop();
    const page = path === '' ? 'index.html' : path;
    // Desktop + mobile nav links both carry data-page
    const links = document.querySelectorAll('a[data-page]');
    links.forEach((link) => {
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });
}

/* ------------------------------------------------------------
   3. Mobile Menu Toggle
   Shows / hides the mobile dropdown nav when the hamburger
   icon is tapped on small screens.
   ------------------------------------------------------------ */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    const setMenuState = (isOpen) => {
        mobileMenu.classList.toggle('open', isOpen);
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        menuBtn.textContent = isOpen ? 'close' : 'menu';
    };

    const toggleMenu = (event) => {
        if (event) event.preventDefault();
        const isOpen = !mobileMenu.classList.contains('open');
        setMenuState(isOpen);
    };

    menuBtn.addEventListener('click', toggleMenu);
    menuBtn.addEventListener('touchstart', (event) => {
        event.preventDefault();
        toggleMenu();
    }, { passive: false });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuState(false));
    });
}

/* ------------------------------------------------------------
   4. Header Scroll Micro-Interaction
   Shrinks the top app bar and adds a stronger shadow after
   the user scrolls down a little.
   ------------------------------------------------------------ */
function initHeaderScroll() {
    const header = document.getElementById('top-app-bar');
    if (!header) return;

    const applyState = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', applyState);
    applyState(); // set correct state on first load
}

/* ------------------------------------------------------------
   5. Hero Bubble Background Generator
   Creates soft translucent bubbles that float upward inside
   the hero section (#bubble-container).
   ------------------------------------------------------------ */
function initBubbles() {
    const container = document.getElementById('bubble-container');
    if (!container) return;

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        // random size between 20px and 80px
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        bubble.style.opacity = Math.random() * 0.5;

        // subtle floating animation
        const duration = Math.random() * 10 + 10;
        bubble.style.transition = `all ${duration}s linear`;

        container.appendChild(bubble);

        // move upward + fade out after a tiny delay
        setTimeout(() => {
            bubble.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * -200 - 100}px)`;
            bubble.style.opacity = '0';
        }, 100);

        // remove bubble from DOM once animation is done
        setTimeout(() => bubble.remove(), duration * 1000);
    }

    // initial batch
    for (let i = 0; i < 10; i++) createBubble();
    // keep creating bubbles periodically
    setInterval(createBubble, 1500);
}

/* ------------------------------------------------------------
   5b. Trust Banner Stats Counter
   Animates the numbers in the "Why PureWash" trust banner from
   0 up to their data-target value when the stats scroll into
   view. Elements without a data-target (e.g. the static "4.9"
   rating and "24h" turnaround) are left untouched.
   ------------------------------------------------------------ */
function initStatsCounter() {
    const stats = document.querySelectorAll('.trust-stat__num[data-target]');
    if (!stats.length) return;

    // Fallback for browsers without IntersectionObserver (e.g. very old)
    const runCounter = (el) => {
        const target = parseFloat(el.getAttribute('data-target')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800; // ms
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out cubic for a smooth finish
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);
            el.textContent = value + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
        // No observer support: just run immediately
        stats.forEach(runCounter);
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                obs.unobserve(entry.target); // run once
            }
        });
    }, { threshold: 0.4 });

    stats.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------
   6. Boot everything once the DOM is ready
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
    initBubbles();
    initStatsCounter();
    // Load shared components; header scroll is initialized after
    // the header HTML is injected (it depends on #top-app-bar).
    Promise.all([
        loadComponent('header-placeholder', 'components/header.html'),
        loadComponent('footer-placeholder', 'components/footer.html'),
    ]).then(() => {
        initHeaderScroll();
    });
});

