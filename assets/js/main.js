(function() {
    'use strict';

    // DOM Elements
    const elements = {
        loader: document.getElementById('loader'),
        navbar: document.getElementById('navbar'),
        navMenu: document.getElementById('nav-menu'),
        mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
        themeToggle: document.getElementById('theme-toggle'),
        backToTop: document.getElementById('back-to-top'),
        typingText: document.getElementById('typing-text'),
        contactForm: document.getElementById('contact-form'),
        particles: document.getElementById('particles')
    };

    // Configuration
    const config = {
        typingSpeed: 100,
        typingDelay: 2000,
        animationOffset: 100,
        particleCount: 50
    };

    // State
    let isTypingComplete = false;
    let currentSection = 'home';

    // Initialize the application
    function init() {
        setupEventListeners();
        setupIntersectionObserver();
        setupTypingAnimation();
        setupParticles();
        setupScrollNavigation();
        setupSkillBars();
        setupCounters();
        hideLoader();
    }

    // Event Listeners
    function setupEventListeners() {
        // Mobile menu toggle
        if (elements.mobileMenuToggle) {
            elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Theme toggle
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', toggleTheme);
        }

        // Back to top button
        if (elements.backToTop) {
            elements.backToTop.addEventListener('click', scrollToTop);
        }

        // Contact form
        if (elements.contactForm) {
            elements.contactForm.addEventListener('submit', handleContactForm);
        }

        // Navigation links
        document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
            link.addEventListener('click', handleNavClick);
        });

        // Scroll events
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Keyboard navigation
        document.addEventListener('keydown', handleKeydown);
    }

    // Intersection Observer for animations
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add animation classes based on element type
                    if (element.classList.contains('animate-fade-in')) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                    
                    if (element.classList.contains('animate-slide-up')) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                    
                    if (element.classList.contains('animate-scale-in')) {
                        element.style.opacity = '1';
                        element.style.transform = 'scale(1)';
                    }

                    // Animate skill bars
                    if (element.classList.contains('skills-section')) {
                        animateSkillBars();
                    }

                    // Animate counters
                    if (element.classList.contains('stat-number')) {
                        animateCounter(element);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: `${config.animationOffset}px`
        });

        // Observe all animated elements
        document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-scale-in, .skills-section, .stat-number').forEach(el => {
            // Set initial states
            if (el.classList.contains('animate-fade-in') || el.classList.contains('animate-slide-up')) {
                el.style.opacity = '0';
                el.style.transform = el.classList.contains('animate-fade-in') ? 'translateY(30px)' : 'translateY(50px)';
                el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            }
            
            if (el.classList.contains('animate-scale-in')) {
                el.style.opacity = '0';
                el.style.transform = 'scale(0.9)';
                el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            }

            observer.observe(el);
        });
    }

    // Typing animation
    function setupTypingAnimation() {
        const text = "Crafting scalable solutions through innovative full-stack development";
        const typingElement = elements.typingText;
        
        if (!typingElement) return;

        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, config.typingSpeed);
            } else {
                isTypingComplete = true;
                // Hide cursor after completion
                setTimeout(() => {
                    const cursor = document.querySelector('.cursor');
                    if (cursor) cursor.style.display = 'none';
                }, 2000);
            }
        }

        // Start typing after a delay
        setTimeout(typeWriter, 500);
    }

    // Particle system
    function setupParticles() {
        if (!elements.particles) return;

        for (let i = 0; i < config.particleCount; i++) {
            createParticle();
        }
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        // Random size variation
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        elements.particles.appendChild(particle);
    }

    // Scroll navigation
    function setupScrollNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                            currentSection = sectionId;
                        }
                    });
                }
            });
        });
    }

    // Skill bars animation
    function setupSkillBars() {
        // Set initial width to 0
        document.querySelectorAll('.skill-progress').forEach(bar => {
            bar.style.width = '0%';
        });
    }

    function animateSkillBars() {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const targetWidth = bar.getAttribute('data-skill') + '%';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, Math.random() * 500);
        });
    }

    // Counter animation
    function setupCounters() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            counter.textContent = '0';
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Event Handlers
    function toggleMobileMenu() {
        elements.navMenu.classList.toggle('active');
        elements.mobileMenuToggle.classList.toggle('active');
    }

    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        
        // Save theme preference
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Update theme icon
        const themeIcon = elements.themeToggle.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = isLight ? '🌙' : '🌓';
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            elements.navMenu.classList.remove('active');
            elements.mobileMenuToggle.classList.remove('active');
        }
    }

    function handleScroll() {
        const scrolled = window.pageYOffset;
        
        // Navbar background opacity
        if (elements.navbar) {
            const opacity = Math.min(scrolled / 100, 0.95);
            elements.navbar.style.background = `rgba(10, 10, 10, ${opacity})`;
        }

        // Back to top button visibility
        if (elements.backToTop) {
            if (scrolled > 300) {
                elements.backToTop.classList.add('visible');
            } else {
                elements.backToTop.classList.remove('visible');
            }
        }

        // Parallax effect for hero section
        const heroSection = document.getElementById('home');
        if (heroSection && scrolled < window.innerHeight) {
            const parallaxSpeed = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallaxSpeed}px)`;
        }
    }

    function handleResize() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            elements.navMenu.classList.remove('active');
            elements.mobileMenuToggle.classList.remove('active');
        }
    }

    function handleKeydown(e) {
        // Accessibility: Close mobile menu with Escape key
        if (e.key === 'Escape') {
            elements.navMenu.classList.remove('active');
            elements.mobileMenuToggle.classList.remove('active');
        }

        // Quick navigation with keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            const shortcuts = {
                '1': 'home',
                '2': 'about',
                '3': 'skills',
                '4': 'projects',
                '5': 'experience',
                '6': 'blog',
                '7': 'contact'
            };

            const sectionId = shortcuts[e.key];
            if (sectionId) {
                e.preventDefault();
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }

    async function handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const submitText = submitBtn.querySelector('#submit-text');
        const submitLoader = submitBtn.querySelector('#submit-loader');
        
        submitText.classList.add('hidden');
        submitLoader.classList.remove('hidden');
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await simulateFormSubmission(data);
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            e.target.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitText.classList.remove('hidden');
            submitLoader.classList.add('hidden');
            submitBtn.disabled = false;
        }
    }

    // Utility Functions
    function validateForm(data) {
        const errors = {};
        
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        // Subject validation
        if (!data.subject || data.subject.trim().length < 5) {
            errors.subject = 'Subject must be at least 5 characters long';
        }
        
        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long';
        }
        
        // Display errors
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}-error`);
            if (errorElement) {
                errorElement.textContent = errors[field];
            }
        });
        
        // Clear previous errors for valid fields
        ['name', 'email', 'subject', 'message'].forEach(field => {
            if (!errors[field]) {
                const errorElement = document.getElementById(`${field}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
        
        return Object.keys(errors).length === 0;
    }

    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-out',
            maxWidth: '300px',
            backgroundColor: type === 'success' ? '#00ff88' : type === 'error' ? '#ff4757' : '#00d4ff'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    function hideLoader() {
        setTimeout(() => {
            if (elements.loader) {
                elements.loader.classList.add('hidden');
                setTimeout(() => {
                    elements.loader.style.display = 'none';
                }, 500);
            }
        }, 1500);
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            const themeIcon = elements.themeToggle?.querySelector('.theme-icon');
            if (themeIcon) themeIcon.textContent = '🌙';
        }
    }

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

    // Lazy loading for images
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize on DOM content loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Load saved theme
    loadTheme();

    // Setup lazy loading
    setupLazyLoading();

    // Optimize scroll performance
    window.addEventListener('scroll', debounce(handleScroll, 16));

    // Service Worker registration (optional)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

})();