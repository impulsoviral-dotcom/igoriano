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
    initLazyLoading();
    initPerformanceOptimizations();
    initDarkMode();
    initNotifications();
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

// Lazy Loading de Imagens
function initLazyLoading() {
    // Criar observer para lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    // Observar todas as imagens com data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Adicionar estilos para lazy loading
    const style = document.createElement('style');
    style.textContent = `
        img.lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        img.loaded {
            opacity: 1;
        }
        .loading-placeholder {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    `;
    document.head.appendChild(style);
}

// Otimizações de Performance
function initPerformanceOptimizations() {
    // Debounce para scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
        }, 16); // ~60fps
    };

    // Preload de recursos críticos
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];

    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });

    // Service Worker para cache
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
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

// Dark Mode Toggle
function initDarkMode() {
    // Criar o botão de toggle se não existir
    if (!document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = `
            <i class="fas fa-sun sun-icon"></i>
            <i class="fas fa-moon moon-icon"></i>
        `;
        document.body.appendChild(themeToggle);
    }

    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar tema salvo
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Event listener para o toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animação suave
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        // Mostrar notificação
        showNotification(`Tema ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado!`, 'success');
    });

    // Detectar preferência do sistema
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }
}

// Sistema de Notificações
function initNotifications() {
    // Criar container de notificações se não existir
    if (!document.querySelector('.notifications-container')) {
        const container = document.createElement('div');
        container.className = 'notifications-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 3000) {
    const container = document.querySelector('.notifications-container');
    const notification = document.createElement('div');
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };

    notification.style.cssText = `
        background: ${colors[type]};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-weight: 500;
        pointer-events: auto;
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 400px;
        text-align: center;
    `;
    
    notification.textContent = message;
    container.appendChild(notification);

    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);

    // Remover após duração especificada
    setTimeout(() => {
        notification.style.transform = 'translateY(-20px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);

    // Clique para fechar
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateY(-20px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

    // Formulário de Contato
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            // Desabilitar botão e mostrar loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Coletar dados do formulário
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            try {
                // Simular envio (aqui você integraria com seu backend)
                await simulateFormSubmission(data);
                
                // Sucesso
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success', 5000);
                form.reset();
                
                // Analytics tracking
                if (window.gtag) {
                    gtag('event', 'form_submit', {
                        event_category: 'Contact',
                        event_label: data.subject
                    });
                }
                
            } catch (error) {
                // Erro
                showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato por email.', 'error', 5000);
                console.error('Erro no formulário:', error);
            } finally {
                // Restaurar botão
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });

        // Validação em tempo real
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remover erros anteriores
        clearFieldError(e);
        
        let isValid = true;
        let errorMessage = '';
        
        // Validações específicas
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Email inválido';
        } else if (field.type === 'tel' && value && !isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Telefone inválido';
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }

    function clearFieldError(e) {
        const field = e.target;
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '';
    }

    function showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            display: block;
        `;
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    async function simulateFormSubmission(data) {
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simular sucesso (90% das vezes)
        if (Math.random() > 0.1) {
            console.log('Formulário enviado:', data);
            return { success: true };
        } else {
            throw new Error('Erro simulado');
        }
    }

    // Analytics e Tracking
    function initAnalytics() {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            // Tracking de páginas
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: 'Método Igoriano',
                page_location: window.location.href
            });
            
            // Tracking de eventos importantes
            trackImportantEvents();
        }
        
        // Tracking personalizado
        trackUserBehavior();
    }

    function trackImportantEvents() {
        // Cliques em CTAs
        document.querySelectorAll('.btn-primary, .btn-secondary, .btn-planilha').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const buttonText = e.target.textContent.trim();
                if (window.gtag) {
                    gtag('event', 'cta_click', {
                        event_category: 'Engagement',
                        event_label: buttonText
                    });
                }
            });
        });

        // Scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                maxScroll = scrollPercent;
                if (window.gtag) {
                    gtag('event', 'scroll', {
                        event_category: 'Engagement',
                        event_label: `${scrollPercent}%`
                    });
                }
            }
        });

        // Tempo na página
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            if (window.gtag && timeSpent > 10) {
                gtag('event', 'timing_complete', {
                    name: 'page_view_time',
                    value: timeSpent
                });
            }
        });
    }

    function trackUserBehavior() {
        // Tracking de cliques em robôs
        document.querySelectorAll('.robot-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const robotName = e.target.closest('.robot-card').querySelector('h3').textContent;
                console.log('Clique no robô:', robotName);
                
                if (window.gtag) {
                    gtag('event', 'robot_click', {
                        event_category: 'Product Interest',
                        event_label: robotName
                    });
                }
            });
        });

        // Tracking de cliques em ferramentas
        document.querySelectorAll('.tool-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const toolName = e.target.closest('.tool-card').querySelector('h3').textContent;
                console.log('Clique na ferramenta:', toolName);
                
                if (window.gtag) {
                    gtag('event', 'tool_click', {
                        event_category: 'Product Interest',
                        event_label: toolName
                    });
                }
            });
        });

        // Tracking de mudança de tema
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const theme = document.documentElement.getAttribute('data-theme');
                if (window.gtag) {
                    gtag('event', 'theme_change', {
                        event_category: 'User Preference',
                        event_label: theme
                    });
                }
            });
        }
    }

// Enhanced Mobile Navigation
function initEnhancedNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }
    
    // Mobile dropdown functionality
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownLink && dropdownMenu) {
            dropdownLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close if it's a dropdown toggle
            if (!link.parentElement.classList.contains('dropdown') || window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Update DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initPerformanceOptimizations();
    initDarkMode();
    initNotifications();
    initContactForm();
    initAnalytics();
    initEnhancedNavigation(); // Add this line
    initAdvancedAnimations();
    
    // Validação em tempo real
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
});

// Advanced Animations and Scroll Effects
function initAdvancedAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Add scroll animation classes to elements
    const animatedElements = document.querySelectorAll('.metodologia-card, .robot-card, .tool-card, .step-card, .planilha-card, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Smooth scroll for navigation links
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

    // Button loading animation
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-robot, .btn-tool, .btn-planilha').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.href && this.href.startsWith('http')) {
                this.classList.add('btn-loading');
                setTimeout(() => {
                    this.classList.remove('btn-loading');
                }, 2000);
            }
        });
    });

    // Card hover effects with mouse tracking
    document.querySelectorAll('.metodologia-card, .robot-card, .tool-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current).toLocaleString() + (stat.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString() + (stat.textContent.includes('+') ? '+' : '');
            }
        };
        
        // Start animation when element is visible
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    statObserver.unobserve(entry.target);
                }
            });
        });
        
        statObserver.observe(stat);
    });

    // Form validation with animations
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.btn-submit');
            
            // Add loading state
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Mensagem enviada com sucesso!', 'success');
                this.reset();
            }, 2000);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidation);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing validation
        clearValidation(e);
        
        let isValid = true;
        let message = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'Este campo é obrigatório';
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            message = 'Email inválido';
        }
        
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }
    }

    function clearValidation(e) {
        const field = e.target;
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Performance optimization: Throttle scroll events
    let ticking = false;
    function updateScrollEffects() {
        // Update any scroll-based animations here
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}