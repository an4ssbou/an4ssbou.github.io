'use strict';

document.documentElement.classList.add('js');

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu(returnFocus = false) {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  if (returnFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
});

const cards = [...document.querySelectorAll('.project-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
const count = document.querySelector('#project-count');
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  let visible = 0;
  cards.forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
    if (!card.hidden) visible += 1;
  });
  count.textContent = `${visible} projet${visible === 1 ? '' : 's'}`;
}));

const dialog = document.querySelector('#project-dialog');
const title = document.querySelector('#dialog-title');
const content = document.querySelector('#dialog-content');
let opener;
cards.forEach(card => {
  card.querySelector('.project-open').addEventListener('click', event => {
    opener = event.currentTarget;
    title.textContent = card.querySelector('h3').firstChild.textContent.trim();
    content.replaceChildren(...[...card.querySelector('.project-details').childNodes].map(node => node.cloneNode(true)));
    dialog.showModal();
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => opener?.focus());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});

const motion = document.querySelector('.motion-control');
const art = document.querySelector('.orbital-art');
motion.addEventListener('click', () => {
  const paused = motion.getAttribute('aria-pressed') !== 'true';
  motion.setAttribute('aria-pressed', String(paused));
  art.classList.toggle('is-paused', paused);
  motion.replaceChildren();
  const symbol = document.createElement('span');
  symbol.setAttribute('aria-hidden', 'true');
  symbol.textContent = paused ? '▷' : 'Ⅱ';
  motion.append(symbol, document.createTextNode(paused ? ' Reprendre l’animation' : ' Mettre en pause l’animation'));
});
