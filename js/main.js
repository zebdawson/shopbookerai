// ShopBooker AI - Main JavaScript File

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize all features
    initMobileMenu();
    initCounters();
    initROICalculator();
    initBackToTop();
    initLogoFallback();
    initSmoothScroll();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');

            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('show')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}

// Animated Counter
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ROI Calculator
function initROICalculator() {
    const missedCallsSlider = document.getElementById('missed-calls');
    const ticketSizeSlider = document.getElementById('ticket-size');
    const missedCallsValue = document.getElementById('missed-calls-value');
    const ticketSizeValue = document.getElementById('ticket-size-value');
    const monthlyLost = document.getElementById('monthly-lost');
    const annualLost = document.getElementById('annual-lost');
    const roiMultiplier = document.getElementById('roi-multiplier');
    const roiText = document.getElementById('roi-text');

    if (!missedCallsSlider || !ticketSizeSlider) return;

    function calculateROI() {
        const missedCalls = parseInt(missedCallsSlider.value);
        const ticketSize = parseInt(ticketSizeSlider.value);

        // Update display values
        missedCallsValue.textContent = missedCalls;
        ticketSizeValue.textContent = ticketSize.toLocaleString();

        // Calculate lost revenue
        const weeklyLost = missedCalls * ticketSize;
        const monthlyLostValue = weeklyLost * 4;
        const annualLostValue = monthlyLostValue * 12;

        // ShopBooker AI cost
        const shopBookerCost = 797;

        // Calculate ROI
        const roiValue = Math.floor(monthlyLostValue / shopBookerCost);

        // Update DOM
        if (monthlyLost) {
            monthlyLost.textContent = monthlyLostValue.toLocaleString();
        }
        if (annualLost) {
            annualLost.textContent = annualLostValue.toLocaleString();
        }
        if (roiMultiplier) {
            roiMultiplier.textContent = roiValue;
        }
        if (roiText) {
            roiText.textContent = '$' + roiValue;
        }
    }

    // Event listeners for sliders
    missedCallsSlider.addEventListener('input', calculateROI);
    ticketSizeSlider.addEventListener('input', calculateROI);

    // Initial calculation
    calculateROI();
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Logo Fallback - Show text logo if image doesn't load
function initLogoFallback() {
    const logoImages = document.querySelectorAll('#logo-img, #footer-logo-img');

    logoImages.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });

        img.addEventListener('error', function() {
            // Keep hidden if image fails to load
            this.style.display = 'none';
        });

        // Check if image is already loaded (cached)
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignore empty hash or just #
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed nav

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation (for contact and demo forms)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        // Remove previous error states
        field.classList.remove('error');
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Validate field
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            showError(field, 'This field is required');
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            field.classList.add('error');
            showError(field, 'Please enter a valid email address');
        } else if (field.type === 'tel' && !isValidPhone(field.value)) {
            isValid = false;
            field.classList.add('error');
            showError(field, 'Please enter a valid phone number');
        } else {
            field.classList.add('success');
        }
    });

    return isValid;
}

function showError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Toast Notification
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ?
        '<i class="fas fa-check-circle text-green-500 text-2xl"></i>' :
        '<i class="fas fa-exclamation-circle text-red-500 text-2xl"></i>';

    toast.innerHTML = `
        ${icon}
        <span class="font-medium">${message}</span>
    `;

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 5000);
}

// Handle Form Submission (Generic)
function handleFormSubmit(formId, successMessage = 'Thank you! We\'ll be in touch soon.') {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm(formId)) {
            showToast('Please fix the errors in the form', 'error');
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const submitButton = form.querySelector('[type="submit"]');

        // Disable submit button
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            submitButton.classList.add('loading');
        }

        try {
            // TODO: Replace with actual GoHighLevel webhook URL
            // const response = await fetch('YOUR_GOHIGHLEVEL_WEBHOOK_URL', {
            //     method: 'POST',
            //     body: formData
            // });

            // Simulate API call for now
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            showToast(successMessage, 'success');

            // Reset form
            form.reset();

            // Remove success classes
            form.querySelectorAll('.success').forEach(field => {
                field.classList.remove('success');
            });

        } catch (error) {
            console.error('Form submission error:', error);
            showToast('Oops! Something went wrong. Please try again.', 'error');
        } finally {
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
                submitButton.classList.remove('loading');
            }
        }
    });
}

// Initialize forms on contact and demo pages
if (document.getElementById('contact-form')) {
    handleFormSubmit('contact-form', 'Thanks for reaching out! We\'ll get back to you within 24 hours.');
}

if (document.getElementById('demo-form')) {
    handleFormSubmit('demo-form', 'Demo booked! Check your email for confirmation and next steps.');
}

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to navigation based on current page
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a[href]');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('text-secondary-orange', 'font-bold');
        }
    });
}

highlightCurrentPage();

// Performance: Prefetch links on hover
if ('IntersectionObserver' in window) {
    const prefetchLinks = document.querySelectorAll('a[href^="/"]:not([href^="//"]), a[href$=".html"]');

    prefetchLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const href = this.getAttribute('href');
            if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
                const prefetch = document.createElement('link');
                prefetch.rel = 'prefetch';
                prefetch.href = href;
                document.head.appendChild(prefetch);
            }
        });
    });
}

// Console Welcome Message (Easter Egg)
console.log('%c🚗 ShopBooker AI - Never Miss Another Customer!', 'color: #F97316; font-size: 18px; font-weight: bold;');
console.log('%cInterested in working with us? Email: support@shopbookerai.com', 'color: #1E3A8A; font-size: 14px;');

// Export functions for use in other scripts
window.ShopBookerAI = {
    validateForm,
    showToast,
    handleFormSubmit
};
