// Mobilni izbornik
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function toggleMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

hamburger.addEventListener("click", toggleMenu);

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
            toggleMenu();
        }
    });
});

// --- Animacije sekcija prilikom skrolanja ---

// Helper funkcija za animaciju brojeva
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Koristimo Math.floor da dobijemo cijele brojeve
        element.textContent = Math.floor(progress * (end - start) + start) + "+"; 
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
             // Osiguraj da na kraju piše točno ciljni broj + plus
             element.textContent = end + "+";
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer za fade-in i brojanje
const sections = document.querySelectorAll('section'); // Dohvati sve sekcije

const observerOptions = {
    root: null, // Promatraj viewport
    rootMargin: '0px',
    threshold: 0.15 // Pokreni animaciju kada 15% sekcije uđe u viewport
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Dodaj klasu za fade-in animaciju
            entry.target.classList.add('animate-on-scroll');
            
            // Provjeri je li ovo sekcija sa statistikom
            if (entry.target.id === 'statistika') {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(numElement => {
                    // Provjeri da animacija nije već pokrenuta (za svaki slučaj)
                    if (!numElement.classList.contains('animated')) { 
                        const target = +numElement.getAttribute('data-target'); 
                        animateValue(numElement, 0, target, 1500); // Animiraj od 0 do target u 1.5 sekundi
                        numElement.classList.add('animated'); // Označi kao animirano
                    }
                });
            }

            // Prekini promatranje ove sekcije nakon što je animirana
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Pokreni promatranje za svaku sekciju
sections.forEach(section => {
    sectionObserver.observe(section);
});

