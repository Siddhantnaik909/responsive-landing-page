document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Loading Screen
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000); // Simulate load time

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Dark/Light Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Check Local Storage for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if(theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // 4. Navbar Scroll, Scroll Progress & Sliding Selector Interactivity
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');
    const indicator = document.querySelector('.nav-indicator-slide');

    function updateIndicator(activeLink) {
        if (!activeLink || window.innerWidth <= 768 || !indicator) {
            if (indicator) indicator.style.opacity = '0';
            return;
        }
        indicator.style.left = `${activeLink.offsetLeft}px`;
        indicator.style.width = `${activeLink.offsetWidth}px`;
        indicator.style.opacity = '1';
    }

    // Set initial indicator position after a short delay to ensure rendering completes
    setTimeout(() => {
        const activeLink = document.querySelector('.nav-link.active');
        updateIndicator(activeLink);
    }, 200);

    // Attach hover listener to each navigation link
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            updateIndicator(link);
        });
    });

    // Reset the sliding indicator to the active page section when the cursor leaves the nav area
    if (navLinks) {
        navLinks.addEventListener('mouseleave', () => {
            const activeLink = document.querySelector('.nav-link.active');
            if (activeLink) {
                updateIndicator(activeLink);
            } else {
                if (indicator) indicator.style.opacity = '0';
            }
        });
    }

    // Recalculate indicator position on window resizing
    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.nav-link.active');
        updateIndicator(activeLink);
    });

    window.addEventListener('scroll', () => {
        // Navbar bg/morph change
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }

        // Scroll Progress Bar
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';

        // Keep sliding indicator aligned dynamically on scroll
        const activeLink = document.querySelector('.nav-link.active');
        updateIndicator(activeLink);
    });

    // 5. Scroll Reveal & Active Menu Item (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Scroll Reveal Animation
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a stats section, trigger counters
                if (entry.target.classList.contains('about')) {
                    startCounters();
                }

                // Active Link Highlighting
                const currentId = entry.target.getAttribute('id');
                links.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${currentId}`) {
                        item.classList.add('active');
                        updateIndicator(item);
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
        // Also observe individual reveal items inside sections
        const innerReveals = section.querySelectorAll('.reveal');
        innerReveals.forEach(el => sectionObserver.observe(el));
    });

    // 6. Counter Animation
    let countersStarted = false;
    function startCounters() {
        if(countersStarted) return;
        countersStarted = true;
        
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // Lower is faster

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + (target > 50 ? '+' : '');
                }
            };
            updateCount();
        });
    }

    // 7. Typing Text Effect
    const typingSpan = document.querySelector('.typing-text');
    const words = ["Innovation.", "Design.", "Technology.", "Web Apps."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect after a short delay
    setTimeout(typeEffect, 1500);

    // 8. Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // 9. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
                btn.style.background = '#28a745';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
