document.addEventListener('DOMContentLoaded', () => {

    // 1. 打字机效果 (Hero Section)
    const typeWriterElement = document.querySelector('.typewriter-xinrui');
    if (typeWriterElement) {
        const textToType = "XINRUI";
        let charIndex = 0;

        // 追加光标元素
        const cursorSpan = document.createElement('span');
        cursorSpan.classList.add('cursor');
        typeWriterElement.parentElement.appendChild(cursorSpan);

        function type() {
            if (charIndex < textToType.length) {
                typeWriterElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 200); // 打字速度
            }
        }
        setTimeout(type, 600); // 延迟一点启动
    }

    // 2. 鼠标悬停高级光晕特效跟随 (适配浅色)
    const cursorGlow = document.querySelector('.cursor-glow');
    let glowX = window.innerWidth / 2;
    let glowY = window.innerHeight / 2;
    let mouseX = glowX;
    let mouseY = glowY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const hoverElements = document.querySelectorAll('a, .btn, .glass-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.width = '400px';
            cursorGlow.style.height = '400px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(0,113,227,0.12) 0%, rgba(52,199,89,0.08) 40%, rgba(0,0,0,0) 70%)';
        });
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.width = '300px';
            cursorGlow.style.height = '300px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(0,113,227,0.08) 0%, rgba(175,82,222,0.05) 40%, rgba(0,0,0,0) 70%)';
        });
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        cursorGlow.style.transform = `translate(${glowX - 150}px, ${glowY - 150}px)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // 3. 滚动渐显动画 (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.id === 'skills') {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('style').split(':')[1];
                        bar.style.width = targetWidth;
                    });
                }
            }
        });
    };
    const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    // 4. 导航栏滚动变色
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

});
