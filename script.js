// Portfolio JavaScript for navigation and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const contactForm = document.querySelector('.contact-form');

    // Navbar scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    function toggleMobileMenu() {
        mobileNav.classList.toggle('active');
        
        // Toggle hamburger animation
        const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
        hamburgers.forEach((hamburger, index) => {
            if (mobileNav.classList.contains('active')) {
                if (index === 0) {
                    hamburger.style.transform = 'rotate(45deg) translate(5px, 5px)';
                } else if (index === 1) {
                    hamburger.style.opacity = '0';
                } else {
                    hamburger.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
            } else {
                hamburger.style.transform = 'none';
                hamburger.style.opacity = '1';
            }
        });
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Smooth scrolling for navigation links
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
            
            smoothScroll(target);
        });
    });

    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!firstName || !lastName || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<svg class="btn-icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Skill badge interactions
    const skillBadges = document.querySelectorAll('.skill-badge, .tech-badge');
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Project card interactions
    const projectCards = document.querySelectorAll('.project-card, .mini-project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading class to buttons on click
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Typing animation restart on scroll
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const restartTypingAnimation = () => {
            typingText.style.animation = 'none';
            typingText.offsetHeight; // Trigger reflow
            typingText.style.animation = 'typing 3s steps(40) 1s both, blink 1s infinite';
        };

        // Restart typing animation when hero comes into view
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    restartTypingAnimation();
                }
            });
        }, { threshold: 0.5 });

        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroObserver.observe(heroSection);
        }
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current section's nav link
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Initialize active nav link
    updateActiveNavLink();

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll-heavy functions
    const debouncedScroll = debounce(() => {
        handleScroll();
        updateActiveNavLink();
    }, 10);

    window.addEventListener('scroll', debouncedScroll);

    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Focus management for mobile menu
    mobileMenuBtn.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--tech-blue)';
    });

    mobileMenuBtn.addEventListener('blur', function() {
        this.style.outline = 'none';
    });

    console.log('Portfolio JavaScript loaded successfully!');
});
