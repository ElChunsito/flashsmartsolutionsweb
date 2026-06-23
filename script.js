document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const yearSpan = document.getElementById('year');
    const robotBubble = document.getElementById('robot-bubble');
    const robotHeadIndicator = document.getElementById('robot-head-indicator');
    const robotTrigger = document.getElementById('robot-trigger');
    const robotNavMenu = document.getElementById('robot-nav-menu');

    // Configuración del globo de guía (Ciclo interactivo)
    let bubbleInterval;
    let welcomeTimeout;

    function showRobotBubbleCycle() {
        if (!robotBubble) return;
        // Solo muestra el globo si el menú no está abierto
        if (robotNavMenu && !robotNavMenu.classList.contains('open')) {
            robotBubble.classList.add('show');
            // Ocultar a los 3 segundos
            welcomeTimeout = setTimeout(() => {
                robotBubble.classList.remove('show');
            }, 3000);
        }
    }

    function startBubbleCycle() {
        clearInterval(bubbleInterval);
        clearTimeout(welcomeTimeout);
        // Dispara la primera vez en 2s si acaba de cargar, o simplemente respeta el ciclo
        bubbleInterval = setInterval(showRobotBubbleCycle, 10000);
    }

    if (robotBubble) {
        // Ejecución inicial rápida y luego entra en el ciclo
        setTimeout(showRobotBubbleCycle, 2000);
        startBubbleCycle();
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

    // 2. Observer Sincronizado para los Iconos de la Cabeza
    const robotObserverOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    let currentRobotIconId = '';

    const robotObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && robotHeadIndicator) {
                const currentSection = entry.target.getAttribute('id');
                console.log(`[Robot] Sección detectada en viewport: ${currentSection}`);
                
                const data = robotSectionsData.find(s => s.id === currentSection) || robotSectionsData[0];
                
                if (currentRobotIconId !== data.id) {
                    currentRobotIconId = data.id;
                    robotHeadIndicator.classList.remove('show');
                    
                    const robotAssistant = document.getElementById('robot-assistant');
                    if(robotAssistant) {
                        robotAssistant.style.transform = 'translateY(-50%) scale(1.1)';
                    }
                    
                    setTimeout(() => {
                        robotHeadIndicator.innerHTML = data.iconSvg;
                        robotHeadIndicator.classList.add('show');
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

    // 3. Eventos de interacción del Robot (Persistente)
    if (robotTrigger && robotNavMenu) {
        robotTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Si el globo de texto sigue mostrándose, lo cerramos inmediatamente
            if (robotBubble && robotBubble.classList.contains('show')) {
                robotBubble.classList.remove('show');
            }
            // Resetea el ciclo para no interrumpir al usuario
            startBubbleCycle();
            
            robotNavMenu.classList.toggle('open');
            // Al abrir el menú, se oculta el indicador de la cabeza; al cerrar, reaparece
            if (robotHeadIndicator) {
                if (robotNavMenu.classList.contains('open')) {
                    robotHeadIndicator.classList.remove('show');
                } else {
                    robotHeadIndicator.classList.add('show');
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (!robotNavMenu.contains(e.target) && !robotTrigger.contains(e.target)) {
                if (robotNavMenu.classList.contains('open')) {
                    robotNavMenu.classList.remove('open');
                    startBubbleCycle(); // Reinicia al cerrar clickeando fuera
                }
                if (robotHeadIndicator) robotHeadIndicator.classList.add('show');
            }
        });
    }
});
