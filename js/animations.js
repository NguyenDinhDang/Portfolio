document.addEventListener('DOMContentLoaded', () => {
    // 1. Tự động đóng màn hình Intro
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 1200);
    }

    // 2. Spotlight lưới nền (chuột đi tới đâu sáng tới đó)
    window.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // 3. Hiệu ứng 3D Tilt khi hover vào thẻ (Chỉ xoay .id-card, không can thiệp .lanyard-wrapper)
    const idCard = document.getElementById('idCard');
    if (idCard) {
        idCard.addEventListener('mousemove', (e) => {
            const rect = idCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (-y / rect.height) * 25;
            const rotateY = (x / rect.width) * 25;
            
            idCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        idCard.addEventListener('mouseleave', () => {
            idCard.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }
    // Chọn các thành phần cần hiệu ứng trên tất cả các trang
    const animatedElements = document.querySelectorAll(`
        .section-heading, .section-label, .about-intro, .about-content p, 
        .stat-card, .project-card, .skill-card, .timeline-item, 
        .cta-text h2, .cta-text p, .button, .contact-form, .blog-card
    `);

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Chỉ chạy 1 lần khi scroll tới
            }
        });
    }, { 
        threshold: 0.1, // Chạy hiệu ứng khi phần tử lọt vào khung hình 10%
        rootMargin: "0px 0px -50px 0px" // Kích hoạt sớm hơn 1 chút trước khi tới đáy
    });

    // Gắn class và delay nối tiếp (staggered delay)
    let currentDelay = 0;
    animatedElements.forEach((el, index) => {
        el.classList.add('vid-fade-up');
        
        // Tạo hiệu ứng nối tiếp: Các thẻ gần nhau sẽ hiện cách nhau 100ms
        // Reset delay về 0 nếu là thẻ đầu tiên của một nhóm mới
        if (index > 0 && el.getBoundingClientRect().top - animatedElements[index - 1].getBoundingClientRect().top > 100) {
            currentDelay = 0;
        } else {
            currentDelay += 100; 
        }
        
        // Giới hạn delay tối đa là 400ms để không bắt người dùng đợi quá lâu
        el.style.transitionDelay = `${Math.min(currentDelay, 400)}ms`;
        
        scrollObserver.observe(el);
    });

    // ==========================================
    // HIỆU ỨNG CHUYỂN TRANG MƯỢT (Trừ trang chủ có sẵn màn intro)
    // ==========================================
    if (!document.getElementById('preloader')) {
        document.body.classList.add('smooth-page-load');
    }

    // ==========================================
    // 4. FLOW SCROLL: Camera Lùi -> Thu Nhỏ -> Mờ
    // ==========================================
    const heroGrid = document.querySelector('.hero-grid');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        if (!heroGrid || !heroSection) return;
        
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        let progress = scrollY / heroHeight;
        if (progress > 1) progress = 1;

        // System thu nhỏ (từ 1 xuống 0.75)
        const scale = 1 - (progress * 0.25);
        
        // Opacity giảm dần (từ 1 xuống 0, fade out nhanh hơn 1 chút)
        const opacity = 1 - (progress * 1.5);
        
        // Camera lùi: tạo cảm giác đẩy content xuống dưới nền 
        const translateY = scrollY * 0.4;

        heroGrid.style.transformOrigin = "center center";
        heroGrid.style.transform = `translateY(${translateY}px) scale(${scale})`;
        heroGrid.style.opacity = Math.max(opacity, 0);
    });

    // ==========================================
    // 5. FLOW SCROLL: About Section trồi lên
    // ==========================================
    const aboutSection = document.querySelector('.about-preview');
    if (aboutSection) {
        // Thêm class ẩn trạng thái ban đầu
        aboutSection.classList.add('fade-up-hidden'); 
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add('is-visible');
                }
            });
        }, { threshold: 0.2 }); // Kích hoạt khi About hiện lên 20%
        
        observer.observe(aboutSection);
    }

    // 6. Hiệu ứng gõ chữ (Typewriter)
    const textElement = document.getElementById('typewriter-text');
    if (textElement) {
        const roles = [
            "Python & FastAPI Specialist",
            "High Performance Backend",
            "Cloud & Database Architect"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                textElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? 30 : 60;

            if (!isDeleting && charIndex === currentRole.length) {
                speed = 2000; 
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 400;
            }
            setTimeout(type, speed);
        }
        type();
    }
    const revealSelectors = [
        '.project-card', 
        '.skill-card', 
        '.timeline-item', 
        '.technology-list span', // Các tag công nghệ
        '.stat-card',
        '.section-heading',
        '.about-intro',
        'article'
    ].join(', ');

    const revealElements = document.querySelectorAll(revealSelectors);

    const pptObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ppt-visible');
                observer.unobserve(entry.target); // Chỉ animate 1 lần khi cuộn tới
            }
        });
    }, { 
        threshold: 0.15, // Kích hoạt khi phần tử hiện 15%
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach((el, index) => {
        el.classList.add('ppt-hidden');
        
        // Tính toán delay sole nhau (stagger) để các thẻ không hiện ra cùng 1 lúc
        let delay = 0;
        if (el.tagName === 'SPAN') {
            // Các tag công nghệ nhỏ sẽ hiện nối tiếp nhau nhanh hơn
            delay = (index % 10) * 50; 
        } else {
            // Các card hoặc section lớn
            delay = (index % 4) * 100; 
        }
        
        el.style.transitionDelay = `${delay}ms`;
        pptObserver.observe(el);
    });
});