// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Loading Animation
    const loadingScreen = document.querySelector('.loading-screen');
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.classList.add('loaded');
        }, 1500);
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            
            // In a real application, you would send this data to a server
            // For now, we'll just show an alert
            alert(`Thank you, ${name}! We have received your message about ${service}. We will contact you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Header background on scroll
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Scroll animations
    function checkScroll() {
        const fadeElements = document.querySelectorAll('.fade-in');
        const slideLeftElements = document.querySelectorAll('.slide-in-left');
        const slideRightElements = document.querySelectorAll('.slide-in-right');
        
        const triggerBottom = window.innerHeight * 0.8;
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('appear');
            }
        });
        
        slideLeftElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('appear');
            }
        });
        
        slideRightElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('appear');
            }
        });
    }
    
    // Initial check on page load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Parallax effect for floating shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Text animation for features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Animate pricing cards on scroll
    const pricingPlans = document.querySelectorAll('.pricing-plan');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease-out ${entry.target.dataset.delay || '0s'} forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    pricingPlans.forEach((plan, index) => {
        plan.style.opacity = '0';
        plan.style.transform = 'translateY(30px)';
        plan.dataset.delay = `${index * 0.2}s`;
        observer.observe(plan);
    });
    
    // Add animation to tools on hover
    const tools = document.querySelectorAll('.tool');
    tools.forEach(tool => {
        tool.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(5deg)';
        });
        
        tool.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });
    
    // Animate mission vision items
    const mvItems = document.querySelectorAll('.mv-item');
    mvItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Add typing animation to hero tagline
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        // Ensure the typing animation works on all devices
        setTimeout(() => {
            heroTagline.style.animation = 'none';
            setTimeout(() => {
                heroTagline.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
            }, 10);
        }, 100);
    }
});
