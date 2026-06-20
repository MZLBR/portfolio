// ===== TYPEWRITER (page d'accueil uniquement) =====
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = "> Étudiant en BUT Réseaux & Télécoms · passionné d'infrastructure · en recherche d'alternance 2026";
    let index = 0;
    subtitle.textContent = '';
    function typeWriter() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 35);
        }
    }
    window.addEventListener('load', typeWriter);
}

// ===== HACKER TEXT EFFECT =====
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&/*<>";
document.querySelectorAll('.hacker-text').forEach(element => {
    element.addEventListener('mouseover', event => {
        let iterations = 0;
        const targetValue = event.target.dataset.value;
        if (!targetValue) return;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, i) => {
                    if (i < iterations) return targetValue[i];
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");
            if (iterations >= targetValue.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    });
});

// ===== SMOOTH SCROLL (ancres internes seulement) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== NAVBAR SCROLL =====
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.92)';
            header.style.backdropFilter = 'blur(12px)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
        }
    });
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(link =>
        link.addEventListener('click', () => navLinks.classList.remove('open'))
    );
}

// ===== LIGHTBOX (galeries) =====
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    document.querySelectorAll('.screenshot-card img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
        });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('active'); });
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .skill-card, .project-card, .detail-block, .ref-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
    observer.observe(card);
});