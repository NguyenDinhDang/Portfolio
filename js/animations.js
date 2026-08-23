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
});