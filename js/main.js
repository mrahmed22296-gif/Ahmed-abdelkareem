// ===== NAVIGATION TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-label', 
        navMenu.classList.contains('open') ? 'إغلاق القائمة' : 'فتح القائمة'
    );
});

// Close nav when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Header shadow on scroll
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Animate elements on scroll - Intersection Observer alternative
    animateOnScroll();
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SKILL BARS ANIMATION ON SCROLL =====
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            const width = bar.style.width;
            // Reset and animate
            if (!bar.dataset.animated) {
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.dataset.animated = 'true';
                }, 200);
            }
        }
    });
};

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const animateOnScroll = () => {
    // Animate timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }
    });

    // Animate qualification cards
    document.querySelectorAll('.qual-card').forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }
    });

    // Animate skills groups
    document.querySelectorAll('.skills-group').forEach((group, index) => {
        const rect = group.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }
    });

    // Animate project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });

    // Animate contact items
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }
    });
};

// ===== INITIAL ANIMATION ON LOAD =====
window.addEventListener('load', () => {
    animateSkills();
    animateOnScroll();
    
    // Animate home content
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
        homeContent.style.opacity = '1';
        homeContent.style.transform = 'translateY(0)';
    }
    
    const homeImage = document.querySelector('.home-image');
    if (homeImage) {
        homeImage.style.opacity = '1';
        homeImage.style.transform = 'scale(1)';
    }
});

// ===== SKILLS ANIMATION ON SCROLL =====
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ===== OBSERVER FOR REPEATED ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Re-animate skill bars in this section
            const bars = entry.target.querySelectorAll('.skill-progress');
            bars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
        }
    });
}, { threshold: 0.3 });

// Observe skills sections
document.querySelectorAll('.skills-group').forEach(group => {
    observer.observe(group);
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    btn.disabled = true;

    // Simulate sending
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال';
        btn.style.background = '#38a169';
        btn.style.borderColor = '#38a169';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 1500);
});
