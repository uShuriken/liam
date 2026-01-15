// Gallery Configuration - Add your images here
const galleryImages = [
  // 2025 Prizegiving
  { src: './assets/gallery/prizegiving2025.jpg', caption: '2025 Prizegiving Ceremony', span: 'md:col-span-2' },
  { src: './assets/gallery/prizegiving-2.jpg', caption: 'Academic Excellence 2025', span: 'md:col-span-1' },
  { src: './assets/gallery/prizegiving-3.jpg', caption: 'Awards Presentation 2025', span: 'md:col-span-1' },

  // Business & Enterprise (YES, EIA)
  { src: './assets/gallery/yes-nationals-presentation.jpeg', caption: 'YES Nationals Presentation', span: 'md:col-span-2' },
  { src: './assets/gallery/young-enterprise-scheme-nationals.jpg', caption: 'Young Enterprise Scheme Nationals', span: 'md:col-span-1' },
  { src: './assets/gallery/eia-team.jpg', caption: 'EIA Team', span: 'md:col-span-1' },
  { src: './assets/gallery/EIA.jpg', caption: 'Entrepreneurship in Action', span: 'md:col-span-1' },
  { src: './assets/gallery/deloitte-accelerator-day.jpg', caption: 'Deloitte Accelerator Day', span: 'md:col-span-2' },

  // Leadership & Community (Model EU, Council, Youth Voice)
  { src: './assets/gallery/model-eu-scholarship-winner.jpg', caption: 'Model EU Scholarship Winner', span: 'md:col-span-1' },
  { src: './assets/gallery/model-eu-team.jpg', caption: 'Model EU Team', span: 'md:col-span-2' },
  { src: './assets/gallery/youth-voice-meeting-with-mayor.jpg', caption: 'Youth Voice: Meeting with the Mayor', span: 'md:col-span-2' },
  { src: './assets/gallery/youth-voice-burger-blast.jpg', caption: 'Youth Voice Burger Blast', span: 'md:col-span-1' },
  { src: './assets/gallery/memorial-hall-youth-voice-social-media-campaign.jpg', caption: 'Memorial Hall Campaign', span: 'md:col-span-1' },
  { src: './assets/gallery/student-council.jpg', caption: 'Student Council', span: 'md:col-span-1' },
  { src: './assets/gallery/council-submission.jpg', caption: 'Council Submission', span: 'md:col-span-1' },

  // Projects & Initiatives
  { src: './assets/gallery/te-whero-times-launch.jpg', caption: 'Te Whero Times Launch', span: 'md:col-span-2' },
  { src: './assets/gallery/te-whero-times-articles.jpg', caption: 'Te Whero Times Publishing', span: 'md:col-span-1' },
  { src: './assets/gallery/40h-challenge-conference.jpg', caption: '40h Challenge Conference', span: 'md:col-span-1' },
  { src: './assets/gallery/40h-challenge-fundraiser.jpg', caption: '40h Challenge Fundraiser', span: 'md:col-span-1' },
  { src: './assets/gallery/rubbish-collection-run-80kg.jpg', caption: 'Rubbish Collection Run (80kg+)', span: 'md:col-span-1' },
  { src: './assets/gallery/recycle-a-device.jpg', caption: 'Recycle a Device', span: 'md:col-span-1' },

  // Misc
  { src: './assets/gallery/careers.jpg', caption: 'Careers Event', span: 'md:col-span-1' },
];

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initSpotlightCards();
});

function initSpotlightCards() {
  const cards = document.querySelectorAll('.glass'); // Apply to all existing glass cards

  cards.forEach(card => {
    card.classList.add('spotlight-card'); // Ensure they have the CSS class

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  const INITIAL_SHOW_COUNT = 8;
  let currentCount = 0;

  const renderImages = (start, end) => {
    galleryImages.slice(start, end).forEach((img, index) => {
      const item = document.createElement('div');
      item.className = `gallery-item group ${img.span || ''} opacity-0`;
      // Stagger animation based on index relative to this batch
      item.style.animation = `fadeIn 0.6s ease-out forwards ${index * 0.1}s`;

      item.innerHTML = `
            <img src="${img.src}" alt="${img.caption}" loading="lazy">
            <div class="gallery-overlay">
                <p class="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${img.caption}</p>
            </div>
        `;

      item.addEventListener('click', () => openLightbox(img.src, img.caption));
      grid.appendChild(item);
    });
    currentCount = end;
  };

  // Initial Render
  renderImages(0, Math.min(INITIAL_SHOW_COUNT, galleryImages.length));

  // "See More" Button Logic
  if (galleryImages.length > INITIAL_SHOW_COUNT) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'text-center mt-12';

    const seeMoreBtn = document.createElement('button');
    seeMoreBtn.className = 'px-8 py-3 border border-primary text-primary font-heading font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:text-dark transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:shadow-[0_0_40px_rgba(0,243,255,0.4)]';
    seeMoreBtn.textContent = 'See More';

    buttonContainer.appendChild(seeMoreBtn);
    grid.parentElement.appendChild(buttonContainer);

    seeMoreBtn.addEventListener('click', () => {
      renderImages(currentCount, galleryImages.length);
      buttonContainer.remove(); // Remove button after showing all
    });
  }

  // Create Lightbox
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.className = 'fixed inset-0 z-[100] hidden bg-black/90 flex items-center justify-center p-4 cursor-pointer transition-opacity duration-300 opacity-0';
  lightbox.innerHTML = `
        <div class="relative max-w-7xl max-h-screen">
            <img id="lightbox-img" src="" alt="Lightbox Image" class="rounded-lg">
            <p id="lightbox-caption" class="text-white text-center mt-4 text-xl font-light"></p>
            <div class="absolute top-4 right-4 text-white hover:text-primary text-4xl">&times;</div>
        </div>
    `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('#lightbox-img');
  const lightboxCaption = lightbox.querySelector('#lightbox-caption');

  window.openLightbox = (src, caption) => {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.remove('hidden');
    // Trigger reflow
    void lightbox.offsetWidth;
    lightbox.classList.remove('opacity-0');
    document.body.style.overflow = 'hidden';
  };

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.add('opacity-0');
      setTimeout(() => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------
     Intersection Observer for Scroll Animations
  ------------------------------------------------ */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  /* ------------------------------------------------
     Canvas Particle System
  ------------------------------------------------ */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  let particlesArray;
  let iconsArray = [];

  // Font Awesome Icons (Unicode) to draw
  // f0b1 (briefcase), f121 (code), f0ac (globe), f004 (heart), f1fa (at)
  const icons = ['\uf0b1', '\uf121', '\uf0ac', '\uf45d', '\uf201'];

  // Resize Canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
  }

  window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  // Particle Class
  class Particle {
    constructor(isIcon = false) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.directionX = (Math.random() * 2) - 1;
      this.directionY = (Math.random() * 2) - 1;
      this.size = (Math.random() * 3) + 1;

      // Colors: Cyan, Blue, White-ish
      const colors = ['#00f3ff', '#0066ff', 'rgba(255,255,255,0.7)'];
      this.color = colors[Math.floor(Math.random() * colors.length)];

      this.isIcon = isIcon;
      if (isIcon) {
        this.icon = icons[Math.floor(Math.random() * icons.length)];
        this.size = Math.random() * 20 + 15; // Larger size for icons
        this.directionX = (Math.random() * 1) - 0.5; // Slower movement
        this.directionY = (Math.random() * 1) - 0.5;
      }
    }

    draw() {
      ctx.beginPath();
      if (this.isIcon) {
        ctx.font = `900 ${this.size}px "Font Awesome 6 Free"`;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.2; // Keep icons subtle
        ctx.fillText(this.icon, this.x, this.y);
        ctx.globalAlpha = 1;
      } else {
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    update() {
      // Check if particle is still within canvas
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      // Mouse Interaction - flee/attract
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
          this.x += 1;
        }
        if (mouse.x > this.x && this.x > this.size * 10) {
          this.x -= 1;
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
          this.y += 1;
        }
        if (mouse.y > this.y && this.y > this.size * 10) {
          this.y -= 1;
        }
      }

      this.x += this.directionX;
      this.y += this.directionY;

      this.draw();
    }
  }

  function init() {
    particlesArray = [];
    iconsArray = [];

    // Standard Particles
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(false));
    }

    // Icon Particles (fewer)
    let numberOfIcons = 15;
    for (let i = 0; i < numberOfIcons; i++) {
      particlesArray.push(new Particle(true));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }

    // Draw lines between nearby particles (constellation effect)
    connect();
  }

  function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        if (particlesArray[a].isIcon || particlesArray[b].isIcon) continue; // Don't connect lines to icons

        let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
          + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          opacityValue = 1 - (distance / 20000);
          ctx.strokeStyle = 'rgba(0, 243, 255,' + opacityValue * 0.2 + ')'; // Cyan lines
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
    init();
  });

  window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
  })

  init();
  animate();
});
