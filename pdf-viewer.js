(function () {
  const PDF_URL = 'menue.pdf';
  const WORKER_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
  const container = document.getElementById('pdf-viewer');
  if (!container || typeof pdfjsLib === 'undefined') return;

  pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_URL;

  pdfjsLib.getDocument(PDF_URL).promise.then(async (pdf) => {
    const dpr = window.devicePixelRatio || 1;
    const slots = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1 });
      const wrapper = document.createElement('div');
      wrapper.className = 'pdf-page';
      wrapper.style.aspectRatio = viewport.width + ' / ' + viewport.height;
      container.appendChild(wrapper);
      slots.push({ page, wrapper, rendered: false });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const slot = slots.find((s) => s.wrapper === entry.target);
        if (!slot || slot.rendered) return;
        slot.rendered = true;
        observer.unobserve(slot.wrapper);
        renderPage(slot);
      });
    }, { rootMargin: '400px 0px' });

    slots.forEach((s) => observer.observe(s.wrapper));

    async function renderPage(slot) {
      const targetWidth = slot.wrapper.clientWidth;
      const baseViewport = slot.page.getViewport({ scale: 1 });
      const scale = (targetWidth / baseViewport.width) * dpr;
      const viewport = slot.page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      slot.wrapper.appendChild(canvas);
      await slot.page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    }
  }).catch((err) => {
    console.error('PDF load failed:', err);
    container.innerHTML = '<p class="pdf-error">PDF konnte nicht geladen werden. <a href="menue.pdf" target="_blank" rel="noopener">Hier herunterladen</a>.</p>';
  });
})();
