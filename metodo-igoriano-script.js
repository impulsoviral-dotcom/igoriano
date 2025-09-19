// Método Igoriano - JavaScript Interativo

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initNavigation();
    initScrollAnimations();
    initCounters();
    initSmoothScroll();
    initMobileMenu();
    initRobotCards();
    initToolCards();
    initPlanilhaTracking();
});

// Navegação e Menu Mobile
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Menu Mobile Responsivo
function initMobileMenu() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: left 0.3s ease;
                z-index: 999;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
            
            .nav-menu a {
                font-size: 1.2rem;
                padding: 1rem;
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Scroll suave para âncoras
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animações de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.metodologia-card, .robot-card, .tool-card, .step-card, .planilha-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // CSS para animações
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .metodologia-card, .robot-card, .tool-card, .step-card, .planilha-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animationStyle);
}

// Contador animado para estatísticas
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Formatar número baseado no conteúdo original
            const originalText = counter.textContent;
            if (originalText.includes('K')) {
                counter.textContent = Math.floor(current) + 'K+';
            } else if (originalText.includes('%')) {
                counter.textContent = Math.floor(current) + '%';
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };
    
    // Observar contadores para iniciar animação
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Interações com cards de robôs
function initRobotCards() {
    const robotCards = document.querySelectorAll('.robot-card');
    
    robotCards.forEach(card => {
        // Efeito hover aprimorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        // Tracking de cliques nos links dos robôs
        const robotLink = card.querySelector('.robot-link');
        if (robotLink) {
            robotLink.addEventListener('click', function(e) {
                const robotName = card.querySelector('h3').textContent;
                
                // Analytics tracking (se disponível)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'robot_access', {
                        'robot_name': robotName,
                        'event_category': 'engagement'
                    });
                }
                
                // Feedback visual
                this.style.background = '#38a169';
                setTimeout(() => {
                    this.style.background = '#667eea';
                }, 200);
                
                console.log(`Acessando robô: ${robotName}`);
            });
        }
    });
}

// Interações com cards de ferramentas
function initToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        const toolLink = card.querySelector('.tool-link');
        
        if (toolLink) {
            toolLink.addEventListener('click', function(e) {
                const toolName = card.querySelector('h3').textContent;
                
                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'tool_access', {
                        'tool_name': toolName,
                        'event_category': 'engagement'
                    });
                }
                
                console.log(`Acessando ferramenta: ${toolName}`);
            });
        }
    });
}

// Tracking da planilha principal
function initPlanilhaTracking() {
    const planilhaLinks = document.querySelectorAll('a[href*="docs.google.com"]');
    
    planilhaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'planilha_access', {
                    'event_category': 'conversion',
                    'event_label': 'planilha_completa'
                });
            }
            
            // Feedback visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            console.log('Acessando planilha completa do Método Igoriano');
        });
    });
}

// Efeito parallax sutil no hero
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Lazy loading para melhor performance
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Scroll to top button
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffect();
    initLazyLoading();
    initScrollToTop();
});

// Preloader simples
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <i class="fas fa-rocket"></i>
            <p>Carregando Método Igoriano...</p>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        text-align: center;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .preloader-content i {
            font-size: 3rem;
            margin-bottom: 1rem;
            animation: bounce 1s infinite;
        }
        
        .preloader-content p {
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Inicializar preloader
initPreloader();

// Função para copiar links
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Mostrar feedback de sucesso
        const toast = document.createElement('div');
        toast.textContent = 'Link copiado!';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #38a169;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    });
}

// Adicionar botões de compartilhamento
function initSocialSharing() {
    const shareButtons = document.createElement('div');
    shareButtons.className = 'share-buttons';
    shareButtons.innerHTML = `
        <button onclick="shareOnWhatsApp()" class="share-btn whatsapp">
            <i class="fab fa-whatsapp"></i> Compartilhar
        </button>
        <button onclick="shareOnTelegram()" class="share-btn telegram">
            <i class="fab fa-telegram"></i> Telegram
        </button>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .share-buttons {
            position: fixed;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 1000;
        }
        
        .share-btn {
            padding: 10px 15px;
            border: none;
            border-radius: 25px;
            color: white;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .share-btn.whatsapp {
            background: #25d366;
        }
        
        .share-btn.telegram {
            background: #0088cc;
        }
        
        .share-btn:hover {
            transform: translateX(5px);
        }
        
        @media (max-width: 768px) {
            .share-buttons {
                position: static;
                transform: none;
                flex-direction: row;
                justify-content: center;
                margin: 20px 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(shareButtons);
}

// Funções de compartilhamento
function shareOnWhatsApp() {
    const text = encodeURIComponent('Descobri o Método Igoriano - Sistema completo para nunca mais travar em anúncios! 🚀');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

function shareOnTelegram() {
    const text = encodeURIComponent('Método Igoriano - Nunca mais trave para fazer anúncios!');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}

// Inicializar compartilhamento
document.addEventListener('DOMContentLoaded', function() {
    initSocialSharing();
});

// Console log para debug
console.log('🚀 Método Igoriano - Site carregado com sucesso!');
console.log('📊 Todas as funcionalidades JavaScript ativas');
console.log('🤖 Robôs e ferramentas prontos para uso');