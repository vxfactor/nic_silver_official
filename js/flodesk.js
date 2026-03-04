/* ==========================================================================
   Voice DNA Codex Modal — Silver AI Consulting
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('voice-dna-modal');
  var btn = document.getElementById('voice-dna-btn');
  var closeBtn = document.getElementById('modal-close');
  var iframe = document.getElementById('fd-iframe');
  var loaded = false;

  if (!modal || !btn || !closeBtn || !iframe) return;

  function openModal() {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    if (!loaded) {
      iframe.src = 'https://aiwithsoul.myflodesk.com/cejr8k47os';
      loaded = true;
    }
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
});
