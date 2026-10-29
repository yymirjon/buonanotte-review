'use strict';
const citationDialog = document.querySelector('#citation-dialog');
const citationStatus = document.querySelector('#copy-status');
document.querySelector('#cite-open').addEventListener('click', () => { citationStatus.textContent = ''; citationDialog.showModal(); });
document.querySelector('.dialog-close').addEventListener('click', () => citationDialog.close());
citationDialog.addEventListener('click', event => { if(event.target === citationDialog) { const rect = citationDialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) citationDialog.close(); } });
document.querySelector('#copy-citation').addEventListener('click', async () => { try { await navigator.clipboard.writeText(document.querySelector('#citation-text').textContent); citationStatus.textContent = 'Citation copied.'; } catch { citationStatus.textContent = 'Select the citation text above to copy it.'; } });
document.querySelector('#print').addEventListener('click', () => window.print());
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.sidebar a[href^="#"]')];
  const observer = new IntersectionObserver(entries => { for(const entry of entries) { if(entry.isIntersecting) { links.forEach(link => { const active = link.hash === '#' + entry.target.id; link.classList.toggle('active', active); if(active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); }); } } }, {rootMargin:'-5% 0px -65% 0px', threshold:0});
  links.forEach(link => { const section = document.getElementById(link.hash.slice(1)); if(section) observer.observe(section); });
}
