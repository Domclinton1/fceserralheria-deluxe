const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const menuLinks = document.querySelectorAll('.menu a');

function closeMenu() {
  hamburger.classList.remove('active');
  menu.classList.remove('show');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}


hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menu.classList.toggle('show');
  overlay.classList.toggle('show');

  document.body.style.overflow = menu.classList.contains('show') ? 'hidden' : '';
});

overlay.addEventListener('click', closeMenu);

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});
const closeBtn = document.querySelector('.close-menu');
if (closeBtn) closeBtn.addEventListener('click', closeMenu);



let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 60) {
    // Rolando para baixo
    nav.style.transform = 'translateY(-100%)';
  } else {
    // Rolando para cima
    nav.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
});

window.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const hero = document.querySelector('.hero');

  if (nav && hero) {
    const navHeight = nav.offsetHeight;
    hero.style.paddingTop = navHeight + 'px';
  }
});


function scrollGallery(direction) {
    const track = document.getElementById("galleryTrack");
    const scrollAmount = 300;
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}


document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});


const track = document.getElementById("carouselTrack");
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  const originalItems = totalItems / 2; // metade é clone
  let index = 0;
  const itemWidth = items[0].offsetWidth + 20;
  let isTransitioning = false;

  function moveSlide(dir = 1) {
    if (isTransitioning) return;
    isTransitioning = true;
    index += dir;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${itemWidth * index}px)`;

    // Reset se for o último clone
    setTimeout(() => {
      if (index >= totalItems - originalItems) {
        track.style.transition = "none";
        index = 0;
        track.style.transform = `translateX(0px)`;
      }
      isTransitioning = false;
    }, 500);
  }

  // Setas
  document.querySelector(".carousel-btn.right").addEventListener("click", () => moveSlide(1));
  document.querySelector(".carousel-btn.left").addEventListener("click", () => moveSlide(-1));

  // Auto slide
  setInterval(() => {
    moveSlide(1);
  }, 4000); // muda a cada 4s




  const galleryTrack = document.getElementById('galleryTrack');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  function centerImage(index) {
    const item = galleryItems[index];
    if (!item) return;

    const itemLeft = item.offsetLeft;
    const itemWidth = item.offsetWidth;
    const trackWidth = galleryTrack.offsetWidth;

    const scrollTo = itemLeft - (trackWidth / 2) + (itemWidth / 2);
    galleryTrack.scrollTo({ left: scrollTo, behavior: 'smooth' });

    // Atualiza destaque visual
    galleryItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  }

  function scrollGallery(direction) {
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= galleryItems.length) currentIndex = galleryItems.length - 1;

    centerImage(currentIndex);
  }

  window.addEventListener('load', () => {
    centerImage(currentIndex);
  });

  galleryTrack.addEventListener('scroll', () => {
    // Debounce visual highlight (sem scroll automático)
    window.requestAnimationFrame(() => {
      let center = galleryTrack.scrollLeft + galleryTrack.offsetWidth / 2;
      let closestItem = null;
      let closestDistance = Infinity;

      galleryItems.forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(center - itemCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestItem = item;
          currentIndex = index;
        }
      });

      galleryItems.forEach(i => i.classList.remove('active'));
      if (closestItem) closestItem.classList.add('active');
    });
  });
