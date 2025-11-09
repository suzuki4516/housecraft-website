// ==========================================
// Hero Slider
// ==========================================

class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.init();
    }

    init() {
        if (this.slides.length > 0) {
            this.startSlider();
        }
    }

    startSlider() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 6000); // 6秒ごとにスライド切り替え
    }

    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
    }

    stop() {
        clearInterval(this.slideInterval);
    }
}

// ==========================================
// Scroll Animations
// ==========================================

class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.scroll-fade, .feature-item, .news-item, .style-card, .work-card, .service-card');
        this.init();
    }

    init() {
        this.observeElements();
        this.handleScroll(); // 初期チェック
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // 順次表示のための遅延
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, observerOptions);

        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    handleScroll() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        this.animatedElements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top + scrollPosition;

            if (scrollPosition + windowHeight > elementPosition + 100) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 50);
            }
        });
    }
}

// ==========================================
// Header Scroll Effect
// ==========================================

class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            this.header.style.padding = '15px 0';
            this.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            this.header.style.padding = '20px 0';
            this.header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }

        this.lastScroll = currentScroll;
    }
}

// ==========================================
// Smooth Scroll
// ==========================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                // #だけの場合はトップへ
                if (href === '#' || href === '#top') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ==========================================
// Mobile Menu
// ==========================================

class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.nav = document.querySelector('.header-nav');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (!this.menuToggle) return;

        this.menuToggle.addEventListener('click', () => {
            this.toggle();
        });

        // メニュー項目クリック時に閉じる
        const navLinks = this.nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) {
                    this.toggle();
                }
            });
        });

        // ウィンドウリサイズ時の処理
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            this.open();
        } else {
            this.close();
        }
    }

    open() {
        this.nav.style.display = 'block';
        this.nav.style.position = 'fixed';
        this.nav.style.top = '70px';
        this.nav.style.left = '0';
        this.nav.style.width = '100%';
        this.nav.style.backgroundColor = 'white';
        this.nav.style.padding = '30px 20px';
        this.nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        this.nav.style.zIndex = '999';

        const navList = this.nav.querySelector('.nav-list');
        navList.style.flexDirection = 'column';
        navList.style.gap = '20px';

        // ハンバーガーアイコンをXに変換
        this.menuToggle.classList.add('active');
        const spans = this.menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';

        // 背景スクロールを防止
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.nav.style.display = '';
        this.nav.style.position = '';
        this.nav.style.top = '';
        this.nav.style.left = '';
        this.nav.style.width = '';
        this.nav.style.backgroundColor = '';
        this.nav.style.padding = '';
        this.nav.style.boxShadow = '';

        const navList = this.nav.querySelector('.nav-list');
        navList.style.flexDirection = '';
        navList.style.gap = '';

        // ハンバーガーアイコンを元に戻す
        this.menuToggle.classList.remove('active');
        const spans = this.menuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';

        // 背景スクロールを有効化
        document.body.style.overflow = '';
    }
}

// ==========================================
// Image Lazy Loading (追加の最適化)
// ==========================================

class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        if ('loading' in HTMLImageElement.prototype) {
            // ブラウザがネイティブlazyloadingをサポートしている場合
            // 何もしない（HTMLの属性が機能する）
        } else {
            // Intersection Observerを使用したフォールバック
            this.observeImages();
        }
    }

    observeImages() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        this.images.forEach(img => imageObserver.observe(img));
    }
}

// ==========================================
// Parallax Effect (視差効果)
// ==========================================

class ParallaxEffect {
    constructor() {
        this.parallaxElements = document.querySelectorAll('.hero-image');
        this.init();
    }

    init() {
        if (this.parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            this.handleScroll();
        }, { passive: true });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;

        this.parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ==========================================
// Counter Animation (数字カウントアップ)
// ==========================================

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.counter');
        this.init();
    }

    init() {
        if (this.counters.length === 0) return;

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }
}

// ==========================================
// Form Validation (フォームバリデーション)
// ==========================================

class FormValidation {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        if (this.forms.length === 0) return;

        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                this.showError(input, '必須項目です');
            } else {
                this.clearError(input);
            }

            // メールバリデーション
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    this.showError(input, '有効なメールアドレスを入力してください');
                }
            }
        });

        return isValid;
    }

    showError(input, message) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
        } else {
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = message;
            error.style.color = 'red';
            error.style.fontSize = '12px';
            error.style.marginTop = '5px';
            input.parentElement.appendChild(error);
        }
        input.style.borderColor = 'red';
    }

    clearError(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        input.style.borderColor = '';
    }
}

// ==========================================
// Page Loading Animation
// ==========================================

class PageLoader {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');

            // ページロード後のアニメーション開始
            setTimeout(() => {
                const heroTitle = document.querySelector('.hero-title');
                const heroSubtitle = document.querySelector('.hero-subtitle');

                if (heroTitle) heroTitle.style.opacity = '1';
                if (heroSubtitle) heroSubtitle.style.opacity = '1';
            }, 300);
        });
    }
}

// ==========================================
// Performance Optimization
// ==========================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // スクロールイベントのスロットル
        this.throttle = (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };

        // プリフェッチの設定
        this.setupPrefetch();
    }

    setupPrefetch() {
        // 画像のプリロード
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = img.dataset.src;
            document.head.appendChild(link);
        });
    }
}

// ==========================================
// Initialize All Components
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 各コンポーネントの初期化
    const heroSlider = new HeroSlider();
    const scrollAnimations = new ScrollAnimations();
    const headerScroll = new HeaderScroll();
    const smoothScroll = new SmoothScroll();
    const mobileMenu = new MobileMenu();
    const lazyImageLoader = new LazyImageLoader();
    const parallaxEffect = new ParallaxEffect();
    const counterAnimation = new CounterAnimation();
    const formValidation = new FormValidation();
    const pageLoader = new PageLoader();
    const performanceOptimizer = new PerformanceOptimizer();

    // デバッグ用コンソールログ
    console.log('🏠 HOUSECRAFT Website Initialized');
    console.log('✅ All animations and interactions are ready');
});

// ==========================================
// Service Worker Registration (PWA対応)
// ==========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service Workerがある場合のみ登録
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}
