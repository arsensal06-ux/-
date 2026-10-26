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

// Start from the entrance even when a mobile browser restores the previous scroll position.
if (window.scrollY > 0) window.scrollTo(0, 0);

const openingScene = document.querySelector('.opening-scene');
const curtainPanels = [...document.querySelectorAll('.curtain-panel')];

function updateOpening() {
  if (!openingScene || curtainPanels.length !== 2) return;
  const travel = openingScene.offsetHeight - window.innerHeight;
  const progress = travel <= 0 ? 1 : Math.max(0, Math.min(1, -openingScene.getBoundingClientRect().top / travel));
  openingScene.style.setProperty('--open-progress', progress.toFixed(3));
  curtainPanels.forEach((panel) => {
    const direction = panel.classList.contains('curtain-left') ? -1 : 1;
    const shift = direction * progress * 104;
    panel.style.transform = `translate3d(${shift.toFixed(1)}%, 0, 0)`;
  });
}

window.addEventListener('scroll', updateOpening, { passive: true });
window.addEventListener('resize', updateOpening);
updateOpening();
