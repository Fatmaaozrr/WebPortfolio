// Hamburger Menü (Daha Güvenli Sürüm)
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });
  }

  // Navbar Scroll (Throttle Eklenmiş)
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', throttle(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      
      // Aşağı kaydırma kontrolü
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
      }
      if (currentScroll > lastScroll && !navLinks.classList.contains('active')) {
        navbar.classList.add('scroll-down');
        navbar.classList.remove('scroll-up');
      } else {
        navbar.classList.add('scroll-up');
        navbar.classList.remove('scroll-down');
      }
      lastScroll = currentScroll;
    }, 100));
  }

  // Smooth Scroll (Güncellenmiş)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // URL hash güncelleme
        history.pushState(null, null, targetId);
      }
    });
  });

  // Popup Yönetimi (Modern Yaklaşım)
  const popup = document.getElementById('popup');
  const btnTalk = document.querySelector('.btn-talk');
  const closeBtn = document.querySelector('.close-btn');

  const togglePopup = (show) => {
    if (popup) {
      popup.style.display = show ? 'flex' : 'none';
      document.body.style.overflow = show ? 'hidden' : '';
    }
  };

  if (btnTalk) {
    btnTalk.addEventListener('click', (e) => {
      e.preventDefault();
      togglePopup(true);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => togglePopup(false));
  }

  window.addEventListener('click', (e) => {
    if (e.target === popup) togglePopup(false);
  });

  // Stars Canvas (Optimize Edilmiş)
  const initStars = () => {
    const stars = document.getElementById('stars');
    if (!stars) return;

    const ctx = stars.getContext('2d');
    let starArray = [];
    let animationId;

    const resize = () => {
      stars.width = window.innerWidth;
      stars.height = window.innerHeight;
    };

    const initStarArray = () => {
      starArray = Array.from({ length: 150 }, () => ({
        x: Math.random() * stars.width,
        y: Math.random() * stars.height,
        radius: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      }));
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, stars.width, stars.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      
      starArray.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      moveStars();
      animationId = requestAnimationFrame(drawStars);
    };

    const moveStars = () => {
      starArray.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        
        if (star.x < 0 || star.x > stars.width) star.vx *= -1;
        if (star.y < 0 || star.y > stars.height) star.vy *= -1;
      });
    };

    const handleResize = () => {
      cancelAnimationFrame(animationId);
      resize();
      initStarArray();
      drawStars();
    };

    // Başlatma
    resize();
    initStarArray();
    drawStars();
    
    // Responsive için
    window.addEventListener('resize', debounce(handleResize, 200));
    
    // Temizleme fonksiyonu
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  };

  // Typing Effect (Geliştirilmiş)
  const initTypingEffect = () => {
    const typingElement = document.querySelector('.typing');
    if (!typingElement) return;

    const typingText = ['Yazılım Geliştirici...', 'Web Tasarımcı...', 'Freelancer...', 'Problem Çözücü...', 'Takım Oyuncusu...'];
    let count = 0;
    let index = 0;
    let currentText = '';
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      currentText = typingText[count];
      
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, index--);
        typingSpeed = 50;
        
        if (index === 0) {
          isDeleting = false;
          count = (count + 1) % typingText.length;
        }
      } else {
        typingElement.textContent = currentText.substring(0, index++);
        typingSpeed = 100;
        
        if (index > currentText.length) {
          typingSpeed = 1000;
          isDeleting = true;
        }
      }
      
      setTimeout(type, typingSpeed);
    };

    type();
  };

  // Yardımcı Fonksiyonlar
  function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // Başlatıcılar
  initStars();
  initTypingEffect();

  // ScrollReveal (Kontrol Edilmiş)
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.about-container', {
      duration: 1200,
      distance: '60px',
      origin: 'bottom',
      reset: false,
      delay: 300,
      opacity: 0,
      easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });
  }
});

// EmailJS (Güvenli Sürüm)
emailjs.init("VuAEUOz9IV_kkp9QV");// Public Key'i buraya ekleyin EmailJS hesabınızdan alabilirsiniz.

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    emailjs.sendForm(
        "service_kz24ymo", // Service ID
        "template_lubprqu", // Template ID
        this
    )
    .then(() => {

        alert("Mesajınız başarıyla gönderildi.");

        form.reset();

    })
    .catch((error) => {

        alert("Bir hata oluştu.");

        console.log(error);

    });

});

// Dil Değiştirme (Geliştirilmiş)
const translations = {
    tr: {
        home: "ANASAYFA",
        about: "HAKKIMDA",
        projects: "PROJELER",
        contact: "İLETİŞİM",
        talk: "İLETİŞİME GEÇ"
    },

    en: {
        home: "HOME",
        about: "ABOUT",
        projects: "PROJECTS",
        contact: "CONTACT",
        talk: "LET'S TALK"
    }
};