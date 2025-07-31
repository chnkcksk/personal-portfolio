document.addEventListener('DOMContentLoaded', () => {

    // --- HEADER SCROLL EFFECT --- //
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- THEME SWITCHER --- //
    const themeCheckbox = document.getElementById('theme-checkbox');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeCheckbox.checked = true;
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- TYPING ANIMATION --- //
    if (typeof Typed !== 'undefined') {
        new Typed('.typing', {
            strings: ['Develop Websites.', 'Design Interfaces.', 'Solve Problems.'],
            typeSpeed: 70,
            backSpeed: 60,
            loop: true
        });
    }

    // --- MOBILE MENU --- //
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- ACTIVE LINK ON SCROLL --- //
    const sections = document.querySelectorAll('main section');
    const navLi = document.querySelectorAll('nav .nav-links li a');
    window.addEventListener('scroll', () => {
        let current = 'hero';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 85) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- FADE-IN ANIMATION ON SCROLL --- //
    const faders = document.querySelectorAll('.fade-in');
    if (window.IntersectionObserver) {
        const appearOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -100px 0px"
        };
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            });
        }, appearOptions);
        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }

    // --- PROJECT FILTERING --- //
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;

                projectCards.forEach(card => {
                    card.style.transition = 'all 0.4s ease';
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                        setTimeout(() => { card.style.display = 'block'; }, 400);
                    } else {
                        card.style.transform = 'scale(0.8)';
                        card.style.opacity = '0';
                        setTimeout(() => { card.style.display = 'none'; }, 400);
                    }
                });
            });
        });
    }

    // --- BACK TO TOP BUTTON --- //
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        });
    }

    // --- CONTACT FORM VALIDATION --- //
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.elements.name.value;
            const email = this.elements.email.value;
            const message = this.elements.message.value;
            if (name && email && message) {
                alert('Thank you for your message!');
                this.reset();
            } else {
                alert('Please fill out all fields.');
            }
        });
    }
});