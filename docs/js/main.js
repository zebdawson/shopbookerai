// Main JavaScript for Hormozi-Style ShopBooker AI Website
// All interactive features and animations

// ==========================================
// INITIALIZE ON DOM LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeAllFeatures();
});

// ==========================================
// MAIN INITIALIZATION FUNCTION
// ==========================================
function initializeAllFeatures() {
    // Navigation & Mobile Menu
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();

    // Interactive Elements
    initROICalculator();
    initAnimatedCounters();
    initTestimonialCarousel();
    initFAQAccordion();
    initBackToTop();

    // Forms
    initFormValidation();
    initGoHighLevelForms();

    // Urgency Elements
    initSpotsCountdown();
    initTimerCountdown();

    // Animations
    initAOS();

    // Update copyright year
    updateCopyrightYear();
}

// ==========================================
// UPDATE COPYRIGHT YEAR
// ==========================================
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.copyright-year');

    copyrightElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

    if (!mobileMenuBtn || !mobileMenu) return;

    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close when clicking menu links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// ==========================================
// STICKY HEADER
// ==========================================
function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');

            // Hide on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 300) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// ROI CALCULATOR WITH CHART.JS
// ==========================================
function initROICalculator() {
    const missedCallsSlider = document.getElementById('missedCalls');
    const avgTicketSlider = document.getElementById('avgTicket');
    const missedCallsValue = document.getElementById('missedCallsValue');
    const avgTicketValue = document.getElementById('avgTicketValue');
    const weeklyLostDisplay = document.getElementById('weeklyLost');
    const monthlyLostDisplay = document.getElementById('monthlyLost');
    const yearlyLostDisplay = document.getElementById('yearlyLost');
    const monthlySavingsDisplay = document.getElementById('monthlySavings');
    const roiPercentageDisplay = document.getElementById('roiPercentage');
    const chartCanvas = document.getElementById('roiChart');

    if (!missedCallsSlider || !avgTicketSlider || !chartCanvas) return;

    const shopBookerCost = 797;
    let roiChart = null;

    // Initialize Chart.js
    const ctx = chartCanvas.getContext('2d');
    roiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Monthly Lost Revenue', 'ShopBooker Cost', 'Net Monthly Savings'],
            datasets: [{
                label: 'Amount ($)',
                data: [0, shopBookerCost, 0],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',   // Red for lost revenue
                    'rgba(249, 115, 22, 0.8)',   // Orange for cost
                    'rgba(34, 197, 94, 0.8)'     // Green for savings
                ],
                borderColor: [
                    'rgb(239, 68, 68)',
                    'rgb(249, 115, 22)',
                    'rgb(34, 197, 94)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        },
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 11,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Calculate and update ROI
    function calculateROI() {
        const missedCalls = parseInt(missedCallsSlider.value);
        const avgTicket = parseInt(avgTicketSlider.value);

        // Update slider value displays
        missedCallsValue.textContent = missedCalls;
        avgTicketValue.textContent = '$' + avgTicket.toLocaleString();

        // Calculate lost revenue
        const weeklyLost = missedCalls * avgTicket;
        const monthlyLost = weeklyLost * 4;
        const yearlyLost = monthlyLost * 12;

        // Calculate savings and ROI
        const monthlySavings = monthlyLost - shopBookerCost;
        const roiPercentage = Math.floor((monthlySavings / shopBookerCost) * 100);

        // Update displays with animation
        animateValue(weeklyLostDisplay, 0, weeklyLost, 500);
        animateValue(monthlyLostDisplay, 0, monthlyLost, 500);
        animateValue(yearlyLostDisplay, 0, yearlyLost, 500);
        animateValue(monthlySavingsDisplay, 0, monthlySavings, 500);
        animateValue(roiPercentageDisplay, 0, roiPercentage, 500);

        // Update chart
        if (roiChart) {
            roiChart.data.datasets[0].data = [monthlyLost, shopBookerCost, monthlySavings];
            roiChart.update('active');
        }
    }

    // Event listeners
    missedCallsSlider.addEventListener('input', calculateROI);
    avgTicketSlider.addEventListener('input', calculateROI);

    // Initial calculation
    calculateROI();
}

// ==========================================
// ANIMATED VALUE COUNTER
// ==========================================
function animateValue(element, start, end, duration) {
    if (!element) return;

    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(function() {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// ==========================================
// ANIMATED STAT COUNTERS (Hero Section)
// ==========================================
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// ==========================================
// TESTIMONIAL CAROUSEL
// ==========================================
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;

    const testimonials = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (testimonials.length === 0) return;

    let currentIndex = 0;
    let autoplayInterval = null;

    // Create dots
    if (dotsContainer) {
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    function updateCarousel() {
        // Update testimonial cards
        testimonials.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentIndex) {
                card.classList.add('active');
            }
        });

        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentIndex) {
                    dot.classList.add('active');
                }
            });
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoplay();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateCarousel();
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });
    }

    // Keyboard navigation
    carousel.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carousel.addEventListener('mouseleave', startAutoplay);

    // Initial setup
    updateCarousel();
    startAutoplay();
}

// ==========================================
// FAQ ACCORDION
// ==========================================
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Close all other items (optional - comment out for multi-open)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });

        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// FORM VALIDATION
// ==========================================
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate="true"]');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateForm(form)) {
                // Form is valid, proceed with submission
                handleFormSubmit(form);
            }
        });

        // Real-time validation on blur
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            // Remove error on input
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    removeFieldError(this);
                }
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';

    // Check if required
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    else if (type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Phone validation (if has pattern)
    else if (type === 'tel' && value !== '') {
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }

    // URL validation
    else if (type === 'url' && value !== '') {
        try {
            new URL(value);
        } catch (_) {
            isValid = false;
            errorMessage = 'Please enter a valid URL';
        }
    }

    // Update field state
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
        removeFieldError(field);
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    removeFieldError(field);

    const errorDiv = document.createElement('div');
    errorDiv.classList.add('field-error');
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');

    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// ==========================================
// GOHIGHLEVEL FORM INTEGRATION
// ==========================================
function initGoHighLevelForms() {
    const forms = document.querySelectorAll('.ghl-form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleGoHighLevelSubmit(form);
        });
    });
}

async function handleGoHighLevelSubmit(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';

    // TODO: Replace with your actual GoHighLevel webhook URL
    // Get your webhook URL from: GoHighLevel > Settings > Integrations > Webhooks
    const GOHIGHLEVEL_WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';

    // Show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
    }

    try {
        // Collect form data
        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Add timestamp and source
        data.timestamp = new Date().toISOString();
        data.source = 'ShopBooker AI Website';
        data.page = window.location.pathname;

        // Send to GoHighLevel
        const response = await fetch(GOHIGHLEVEL_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Success
            showNotification('success', 'Thank you! We\'ll be in touch shortly.');
            form.reset();

            // Redirect to thank you page (optional)
            // window.location.href = '/thank-you.html';

            // Track conversion (optional - add your tracking code)
            trackConversion('form_submission', data);
        } else {
            throw new Error('Failed to submit form');
        }

    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('error', 'Oops! Something went wrong. Please try again or call us directly.');
    } finally {
        // Restore button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    }
}

// Alternative: Handle standard form submission
async function handleFormSubmit(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
    }

    try {
        const formData = new FormData(form);

        // If form has action attribute, use it
        if (form.action) {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showNotification('success', 'Thank you! We\'ll be in touch shortly.');
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } else {
            // No action - show message to configure
            console.warn('Form has no action attribute. Please configure GoHighLevel webhook.');
            showNotification('error', 'Form not configured. Please contact support.');
        }

    } catch (error) {
        console.error('Form error:', error);
        showNotification('error', 'Something went wrong. Please try again.');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    }
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(type, message) {
    // Remove any existing notifications
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.classList.add('notification-toast', type);
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : '!'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" aria-label="Close">&times;</button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });

    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ==========================================
// SPOTS COUNTDOWN
// ==========================================
function initSpotsCountdown() {
    // Get all spots remaining elements (multiple on homepage)
    const spotsElements = [
        document.getElementById('spotsRemaining'),
        document.getElementById('spotsRemaining2'),
        document.getElementById('spotsRemaining3')
    ].filter(el => el !== null);

    if (spotsElements.length === 0) return;

    // Start with a number between 8-15
    let spotsRemaining = Math.floor(Math.random() * 8) + 8;

    // Update all spots elements
    function updateAllSpots(value) {
        spotsElements.forEach(el => {
            el.textContent = value;
        });
    }

    updateAllSpots(spotsRemaining);

    // Decrease spots occasionally to create urgency
    setInterval(function() {
        if (spotsRemaining > 3 && Math.random() > 0.7) {
            spotsRemaining--;
            updateAllSpots(spotsRemaining);

            // Add pulse animation to all elements
            spotsElements.forEach(el => {
                el.classList.add('pulse');
                setTimeout(() => el.classList.remove('pulse'), 600);
            });
        }
    }, 30000); // Check every 30 seconds
}

// ==========================================
// TIMER COUNTDOWN (Optional)
// ==========================================
function initTimerCountdown() {
    const timerElement = document.getElementById('countdownTimer');
    if (!timerElement) return;

    // Set countdown to 24 hours from now
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            timerElement.textContent = 'Offer Expired';
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ==========================================
// AOS (ANIMATE ON SCROLL) INITIALIZATION
// ==========================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
            anchorPlacement: 'top-bottom'
        });
    }
}

// ==========================================
// CONVERSION TRACKING
// ==========================================
function trackConversion(eventName, data) {
    // Google Analytics (GA4)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'Form',
            event_label: data.page || window.location.pathname,
            value: 1
        });
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: eventName,
            content_category: 'Form Submission'
        });
    }

    // Custom tracking
    console.log('Conversion tracked:', eventName, data);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==========================================
// CONSOLE BRANDING (Optional - Fun Easter Egg)
// ==========================================
console.log('%c🚀 ShopBooker AI', 'font-size: 20px; font-weight: bold; color: #F97316;');
console.log('%cPowered by AI. Built for Auto Shops.', 'font-size: 12px; color: #1E3A8A;');
console.log('%cInterested in our technology? Visit shopbookerai.com/careers', 'font-size: 11px; color: #6B7280;');

// ==========================================
// EXPORT FOR MODULE USAGE (if needed)
// ==========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAllFeatures,
        showNotification,
        trackConversion
    };
}
