document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const yearSpan = document.getElementById('year');
    const robotBubble = document.getElementById('robot-bubble');
    const robotTrigger = document.getElementById('robot-trigger');
    const robotNavMenu = document.getElementById('robot-nav-menu');

    // Configuración inicial del robot
    if (robotBubble) {
        setTimeout(() => robotBubble.classList.add('show'), 1000);
    }

    // Set current year in footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Toggle Mobile Menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if(icon) {
                if(navMenu.classList.contains('active')){
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Close Mobile Menu when a link is clicked
    if (navLinks && navMenu && hamburger) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Navbar background effect on scroll
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Highlight active link based on scroll position
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        fadeElements.forEach(el => observer.observe(el));
    }

    // Robot Assistant Logic con Array Sincronizado
    const robotSectionsData = [
        {
            id: 'inicio',
            label: 'Inicio',
            iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>'
        },
        {
            id: 'servicios',
            label: 'Servicios',
            iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>'
        },
        {
            id: 'nosotros',
            label: 'Nosotros',
            iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
        },
        {
            id: 'contacto',
            label: 'Contacto',
            iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>'
        }
    ];

    // 1. Inyectar botones en el menú
    if (robotNavMenu) {
        robotSectionsData.forEach(sec => {
            const btn = document.createElement('button');
            btn.className = 'robot-nav-btn';
            btn.setAttribute('data-target', sec.id);
            btn.setAttribute('aria-label', sec.label);
            btn.innerHTML = sec.iconSvg;
            robotNavMenu.appendChild(btn);
            
            // Listener de navegación
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetSection = document.getElementById(sec.id);
                if (targetSection) {
                    robotNavMenu.classList.remove('open');
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // 2. Observer sincronizado
    const robotObserverOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    let currentRobotIconId = '';

    const robotObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && robotBubble) {
                const currentSection = entry.target.getAttribute('id');
                const data = robotSectionsData.find(s => s.id === currentSection) || robotSectionsData[0];
                
                if (currentRobotIconId !== data.id) {
                    currentRobotIconId = data.id;
                    robotBubble.classList.remove('show');
                    const robotAssistant = document.getElementById('robot-assistant');
                    if(robotAssistant) {
                        robotAssistant.style.transform = 'translateY(-50%) scale(1.1)';
                    }
                    
                    setTimeout(() => {
                        robotBubble.innerHTML = data.iconSvg;
                        robotBubble.classList.add('show');
                        if(robotAssistant) {
                            robotAssistant.style.transform = 'translateY(-50%) scale(1)';
                        }
                    }, 300);
                }
            }
        });
    }, robotObserverOptions);

    const sectionsForRobot = document.querySelectorAll('section, header, footer');
    if (sectionsForRobot.length > 0) {
        sectionsForRobot.forEach(sec => robotObserver.observe(sec));
    }

    if (robotTrigger && robotNavMenu) {
        robotTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            robotNavMenu.classList.toggle('open');
            if (robotNavMenu.classList.contains('open')) {
                if(robotBubble) robotBubble.classList.remove('show');
            } else {
                if(robotBubble) robotBubble.classList.add('show');
            }
        });

        document.addEventListener('click', (e) => {
            if (!robotNavMenu.contains(e.target) && !robotTrigger.contains(e.target)) {
                robotNavMenu.classList.remove('open');
                if(robotBubble) robotBubble.classList.add('show');
            }
        });
    }
});
