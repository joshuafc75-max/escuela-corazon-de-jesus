/* Escuela Mixta Barrio Corazón de Jesús — comportamiento del sitio.
   Todo es opcional: sin JavaScript el sitio sigue funcionando. */
(() => {
  'use strict';

  /* ---------- Menú del celular ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('menu');

  if (toggle && nav) {
    const desktop = window.matchMedia('(min-width: 62rem)');

    const setOpen = (open, returnFocus = false) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      if (!open && returnFocus) toggle.focus();
    };

    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));

    // Cerrar al elegir un enlace, al tocar fuera, con Escape o al agrandar la pantalla.
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('is-open') && !e.target.closest('.site-header')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false, true);
    });
    desktop.addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- Año del pie de página ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Botón "Imprimir" (página de matrículas) ---------- */
  const printBtn = document.querySelector('[data-print]');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  // Al imprimir, abre todos los desplegables para que salga toda la información.
  const closedBeforePrint = [];
  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('details:not([open])').forEach((d) => {
      d.open = true;
      closedBeforePrint.push(d);
    });
  });
  window.addEventListener('afterprint', () => {
    closedBeforePrint.splice(0).forEach((d) => { d.open = false; });
  });
})();
