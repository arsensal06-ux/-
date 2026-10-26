const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const openingScene = document.querySelector('.opening-scene');
const blindSlats = [...document.querySelectorAll('.blind-slat')];

function updateOpening() {
  if (!openingScene || blindSlats.length === 0) return;
  const travel = openingScene.offsetHeight - window.innerHeight;
  const progress = travel <= 0 ? 1 : Math.max(0, Math.min(1, -openingScene.getBoundingClientRect().top / travel));
  openingScene.style.setProperty('--open-progress', progress.toFixed(3));
  blindSlats.forEach((slat, index) => {
    const stagger = index * 0.018;
    const slatProgress = Math.max(0, Math.min(1, (progress - stagger) / (1 - stagger)));
    slat.style.setProperty('--slat-open', slatProgress.toFixed(3));
  });
}

window.addEventListener('scroll', updateOpening, { passive: true });
window.addEventListener('resize', updateOpening);
updateOpening();
