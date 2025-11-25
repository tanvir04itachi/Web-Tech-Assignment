document.addEventListener('DOMContentLoaded', function() {
    // Array of image objects with URLs and information
    const images = [
        {
            url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            title: "Mountain Paradise",
            description: "Discover the breathtaking beauty of mountain ranges around the world"
        },
        {
            url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            title: "Tropical Beach",
            description: "Relax on pristine white sand beaches with crystal clear waters"
        },
        {
            url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            title: "Northern Lights",
            description: "Witness the magical aurora borealis in arctic regions"
        },
        {
            url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            title: "Desert Adventure",
            description: "Explore vast desert landscapes and experience unique cultures"
        },
        {
            url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            title: "City Skylines",
            description: "Experience the vibrant energy of world-class metropolitan cities"
        }
    ];

    // DOM Elements
    const mainImage = document.getElementById('mainImage');
    const imageTitle = document.getElementById('imageTitle');
    const imageDescription = document.getElementById('imageDescription');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.querySelector('.dots-container');

    let currentIndex = 0;
    let slideInterval;

    // Initialize dots
    function initializeDots() {
        dotsContainer.innerHTML = '';
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Update slide content
    function updateSlide() {
        mainImage.src = images[currentIndex].url;
        imageTitle.textContent = images[currentIndex].title;
        imageDescription.textContent = images[currentIndex].description;
        
        // Add animation
        mainImage.classList.add('fade-in');
        setTimeout(() => {
            mainImage.classList.remove('fade-in');
        }, 800);
        
        // Update dots
        updateDots();
    }

    // Update active dot
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlide();
        resetInterval();
    }

    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide();
    }

    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlide();
    }

    // Start automatic slideshow
    function startInterval() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    // Reset interval
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startInterval();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });

    // Initialize slider
    initializeDots();
    startInterval();
});