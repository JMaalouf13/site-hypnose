document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const btn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('mobile-menu-overlay');

    if (btn && overlay) {
        const icon = btn.querySelector('i');
        let isMenuOpen = false;

        const toggleMenu = (open) => {
            isMenuOpen = open;
            if (isMenuOpen) {
                overlay.classList.remove('hidden');
                overlay.classList.add('flex');
                document.body.classList.add('overflow-hidden');
                if (icon) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            } else {
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
                document.body.classList.remove('overflow-hidden');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        };

        btn.addEventListener('click', () => {
            toggleMenu(!isMenuOpen);
        });

        overlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });
    }

    // Scroll Animation - Premium Reveal
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // Get animation type from data attribute or default to fade-up
                const animationClass = target.dataset.animate || 'animate-fade-up';

                // Handle Staggering delay
                if (target.dataset.delay) {
                    target.style.animationDelay = `${target.dataset.delay}ms`;
                }

                target.classList.add(animationClass);
                target.classList.remove('opacity-0');
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Auto-detect elements to animate - ONLY if they have the class in HTML
    const observeElements = () => {
        // Select ALL elements that have 'data-animate' OR 'opacity-0' manually added
        const animatedElements = document.querySelectorAll('[data-animate], .opacity-0');

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    };

    observeElements();

    // Contact Form Simulation
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Merci pour votre message ! (Simulation)');
        });
    }
});
