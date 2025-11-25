document.addEventListener('DOMContentLoaded', function() {
    // Theme Switcher
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Time-Based Greeting
    const greetingElement = document.getElementById('greeting');
    
    // Section Toggling
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Buttons that navigate to sections
    const sectionButtons = document.querySelectorAll('[data-section]');

    // Initialize
    initTheme();
    updateGreeting();
    initSkillBars();

    // Theme Switcher
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeButton(savedTheme);
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });

    function updateThemeButton(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
            themeToggle.title = 'Switch to Light Mode';
        } else {
            themeIcon.textContent = '🌙';
            themeToggle.title = 'Switch to Dark Mode';
        }
    }

    // Time-Based Greeting
    function updateGreeting() {
        const hour = new Date().getHours();
        let greeting = '';
        
        if (hour < 12) {
            greeting = 'Good Morning';
        } else if (hour < 18) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }
        
        greetingElement.textContent = greeting;
    }

    // Update greeting every minute
    setInterval(updateGreeting, 60000);

    // Section Toggling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section, hide others
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });

            // Animate skill bars when about section is shown
            if (targetSection === 'about') {
                setTimeout(animateSkillBars, 300);
            }
        });
    });

    // Section navigation buttons
    sectionButtons.forEach(button => {
        if (button.hasAttribute('data-section')) {
            button.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-section');
                
                // Update active nav link
                navLinks.forEach(nav => {
                    nav.classList.remove('active');
                    if (nav.getAttribute('data-section') === targetSection) {
                        nav.classList.add('active');
                    }
                });
                
                // Show target section, hide others
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetSection) {
                        section.classList.add('active');
                    }
                });

                // Animate skill bars when about section is shown
                if (targetSection === 'about') {
                    setTimeout(animateSkillBars, 300);
                }
            });
        }
    });

    // Skill Bars Animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }

    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        });
    }

    // Contact Form Validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            showError(nameError, 'Name is required');
            isValid = false;
        } else {
            hideError(nameError);
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailError, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError(emailError);
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            showError(messageError, 'Message is required');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageError, 'Message must be at least 10 characters long');
            isValid = false;
        } else {
            hideError(messageError);
        }

        if (isValid) {
            // Simulate form submission
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        }
    });

    // Real-time validation
    nameInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            hideError(nameError);
        }
    });

    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.trim() !== '' && emailRegex.test(this.value)) {
            hideError(emailError);
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.value.trim() !== '' && this.value.trim().length >= 10) {
            hideError(messageError);
        }
    });

    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function hideError(errorElement) {
        errorElement.style.display = 'none';
    }

    // Smooth scrolling for anchor links
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
});