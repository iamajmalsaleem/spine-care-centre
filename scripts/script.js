document.addEventListener('DOMContentLoaded', function() {
    loadData('news');
    loadData('courses');
    loadData('therapists');
    loadData('faqs');
});

function loadData(dataType) {
    fetch(`data/${dataType}.json`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(`${dataType}-container`);
            data[dataType].forEach(item => {
                const element = createElementFromData(dataType, item);
                container.appendChild(element);
            });
        })
        .catch(error => console.error('Error loading data:', error));
}

function createElementFromData(dataType, item) {
    const div = document.createElement('div');
    div.className = `${dataType}-item`;

    switch(dataType) {
        case 'news':
        case 'courses':
            div.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            `;
            break;
        case 'therapists':
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Location: ${item.location}</p>
                <p>Contact: ${item.contact}</p>
            `;
            break;
        case 'faqs':
            div.innerHTML = `
                <h3>${item.question}</h3>
                <p>${item.answer}</p>
            `;
            break;
    }

    return div;
}

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission (you'll need to implement the actual form submission logic)
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Form submitted! (This is a dummy action)');
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .portfolio-item').forEach(item => {
        observer.observe(item);
    });
});

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();
