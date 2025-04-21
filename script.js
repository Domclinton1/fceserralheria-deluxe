const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const menuLinks = document.querySelectorAll('.menu a');

function closeMenu() {
  hamburger.classList.remove('active');
  menu.classList.remove('show');
  overlay.classList.remove('show');
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menu.classList.toggle('show');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', closeMenu);

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
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