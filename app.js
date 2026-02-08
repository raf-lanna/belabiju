// Accessible full-screen modal for 'Sobre nós'
(function(){
  const openBtn = document.getElementById('open-modal-btn');
  const modal = document.getElementById('modal-sobre-nos');
  const overlay = modal;
  const closeBtn = modal && modal.querySelector('.modal-close-full');
  const mainEl = document.querySelector('main');
  let lastFocused = null;

  function getFocusable(container){
    if(!container) return [];
    return Array.from(container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
  }

  function trapFocus(e){
    if(!modal.classList.contains('active')) return;
    const focusable = getFocusable(modal);
    if(focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length -1];
    if(e.key === 'Tab'){
      if(e.shiftKey){
        if(document.activeElement === first){ e.preventDefault(); last.focus(); }
      } else {
        if(document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
    }
  }

  function openModal(){
    lastFocused = document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden','false');
    modal.setAttribute('aria-modal','true');
    document.body.style.overflow = 'hidden';
    if(mainEl) mainEl.setAttribute('aria-hidden','true');
    const focusable = getFocusable(modal);
    (focusable[0] || closeBtn).focus();
    document.addEventListener('keydown', trapFocus);
  }

  function closeModal(){
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden','true');
    modal.removeAttribute('aria-modal');
    document.body.style.overflow = '';
    if(mainEl) mainEl.removeAttribute('aria-hidden');
    document.removeEventListener('keydown', trapFocus);
    try{ lastFocused && lastFocused.focus(); }catch(e){}
  }

  openBtn && openBtn.addEventListener('click', openModal);
  closeBtn && closeBtn.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });
})();

// Frete modal from header button
const freteOpenBtn = document.getElementById('open-frete-btn');
const freteModal = document.getElementById('modal-frete');
if(freteOpenBtn && freteModal){
  freteOpenBtn.addEventListener('click', ()=>{
    freteModal.classList.add('active');
    freteModal.setAttribute('aria-hidden','false');
  });
}
document.querySelectorAll('#modal-frete .modal-close-full').forEach(b=>{
  b.addEventListener('click', ()=>{
    freteModal.classList.remove('active');
    freteModal.setAttribute('aria-hidden','true');
  });
});
  const products = {
    'BLB-001': {
      code: 'Código BLB-001',
      price: 'R$ 90,00',
      desc: 'Colar com corda náutica azul de 5 mm, pingente de cerâmica esmaltada em alta temperatura na cor azul e acabamentos em metal dourado. <br/>Medidas:<br/>Colar: 31 cm<br/>Pingente: 11cm x 4 cm',
      whatsapp: 'https://wa.me/5534992569311?text=Olá!%20Tenho%20interesse%20no%20colar%20BLB-001.%20Poderia%20me%20passar%20mais%20informações%3F'
    },
    'BLB-002': {
      code: 'Código BLB-002',
      price: 'R$ 65,00',
      desc: 'Colar de criação autoral com cordão de seda de 3 mm na cor preta , pingente de cerâmica esmaltada em alta temperatura na cor azul contrastando com a cerâmica natural , conta em resina na cor azul. <br/>Medidas:<br/>Colar: tamanho ajustável até 40 cm<br/>Pingente: 3 cm x 3 cm',
      whatsapp: 'https://wa.me/5534992569311?text=Olá!%20Tenho%20interesse%20no%20colar%20BLB-002.%20Poderia%20me%20passar%20mais%20informações%3F'
    },
    'BLB-003': {
      code: 'Código BLB-003',
      price: 'R$ 63,00',
      desc: 'Ótima opção para presente. Colar com cordão de seda de 3 mm na cor preta , pingente de cerâmica esmaltada em alta temperatura na cor azul com decoração em alto relevo e contas em resina azul. <br/>Medidas:<br/>Colar: tamanho ajustável até 45 cm<br/>Pingente: diâmetro de 5 cm.',
      whatsapp: 'https://wa.me/5534992569311?text=Olá!%20Tenho%20interesse%20no%20colar%20BLB-003.%20Poderia%20me%20passar%20mais%20informações%3F'
    },
    'BLB-004': {
      code: 'Código BLB-004',
      price: 'R$ 75,00',
      desc: 'Ótima opção para presente. Colar com cordão de seda de 3 mm na cor preta , pingente de cerâmica esmaltada em alta temperatura na cor azul com decoração em alto relevo e contas em resina azul. <br/>Medidas:<br/>Colar: tamanho ajustável até 45 cm<br/>Pingente: diâmetro de 5 cm.',
      whatsapp: 'https://wa.me/5534992569311?text=Olá!%20Tenho%20interesse%20no%20colar%20BLB-004.%20Poderia%20me%20passar%20mais%20informações%3F'
    },
    'BLB-005': {
      code: 'Código BLB-005',
      price: 'R$ 73,00',
      desc: 'Peça exclusiva e original. Colar com cordão de corda náutica de 3 mm na cor verde, pingente de cerâmica esmaltada em alta temperatura com duas peças sobrepostas em 2 tons de verde.<br/>Medidas:<br/>Colar: ajustável até 57 cm<br/>Pingente: diâmetro de 5 cm.',
      whatsapp: 'https://wa.me/5534992569311?text=Olá!%20Tenho%20interesse%20no%20colar%20BLB-005.%20Poderia%20me%20passar%20mais%20informações%3F'
    },
    'BLB-006': {
      code: 'Código BLB-006',
      price: 'R$ 55,00',
      desc: 'Ideal para o verão. Colar com cordão de corda náutica de 8 mm na cor laranja pigmentado de preto, pingente de cerâmica esmaltada em alta temperatura com forma orgânica e textura com motivo floral.<br/>Medidas:<br/>Colar: comprimento 29 cm<br/>Pingente: diâmetro de 4 cm.',
      whatsapp: 'https://wa.me/5534992569311?text=Olá!%20Tenho%20interesse%20no%20colar%20BLB-006.%20Poderia%20me%20passar%20mais%20informações%3F'
    },
    'BLB-007': {
      code: 'Código BLB-007',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-008': {
      code: 'Código BLB-008',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-009': {
      code: 'Código BLB-009',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-010': {
      code: 'Código BLB-010',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-011': {
      code: 'Código BLB-011',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-012': {
      code: 'Código BLB-012',
      price: 'R$ 85,00',
      desc: 'Esta peça traz a beleza da natureza para o seu visual.<br/>Colar com corda náutica dourada, pingente de pedra ágata e acabamentos dourados.<br/>Medidas:<br/>Colar: 34 cm<br/>Pingente: 6 cm.',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-013': {
      code: 'Código BLB-013',
      price: 'R$ 48,00',
      desc: 'Uma peça casual e contemporânea.<br/>Colar com corda de camurça, pingente e contas em resina verde musgo.<br/>Medidas:<br/>Colar: 40 cm<br/>Pingente: 6,5 cm.',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-014': {
      code: 'Código BLB-014',
      price: 'R$ 72,00',
      desc: 'Uma peça que destaca seu look.<br/>Colar com corda náutica verde de 3mm e duas peças de cerâmica esmaltada em alta temperatura na cor verde musgo com textura.<br/>Medidas:<br/>Colar: 34 cm<br/>Pingente: o círculo tem 4 cm de diâmetro e a peça retangular 3,5 x 4 cm',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-015': {
      code: 'Código BLB-015',
      price: 'R$ 62,00',
      desc: 'A beleza da cerâmica traz um charme ao seu visual.<br/>Colar com fio de seda preto e pingente de cerâmica esmaltada em alta temperatura em preto e vermelho.<br/>Medidas:<br/>Colar: ajustável até 44 cm<br/>Pingente: 6 x 3 cm',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-016': {
      code: 'Código BLB-016',
      price: 'R4 66,00',
      desc: 'Peça feita a mão com design atemporal.<br/>Colar com fio de seda preta e pingente de cerâmica em alto relevo, esmaltada em alta temperatura na cor azul.<br/>Medidas:<br/>Colar: 35 cm<br/>Pingente: 4,5 x 2,5 cm',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-017': {
      code: 'Código BLB-017',
      price: 'R$ 71,00',
      desc: 'A beleza da cerâmica trazendo um charme para seu visual.<br/>Colar com fio de seda preta e pingente de cerâmica esmaltada em alta temperatura na cor verde folha.<br/>Medidas:<br/>Colar: 35 cm<br/>Pingente: 5,5 cm de diâmetro',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-018': {
      code: 'Código BLB-018',
      price: 'R$ 42,00',
      desc: 'Uma peça jovial para ser usada em diversas ocasiões.<br/>Colar com fio de seda preta e pingente de cerâmica esmaltada em alta temperatura na cor azul royal.<br/>Medidas:<br/>Colar: 31 cm<br/>Pingente: 4 cm de diâmetro',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-019': {
      code: 'Código BLB-019',
      price: 'R$ 65,00',
      desc: 'Uma peça clássica que ser usada em diversas ocasiões.<br/>Colar com fio de seda preta, contas em resina e pingente de cerâmica esmaltada em alta temperatura na cor vermelha.<br/>Medidas:<br/>Colar: ajustável até 47 cm<br/>Pingente: 6,5 x 4cm de diâmetro',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-020': {
      code: 'Código BLB-020',
      price: 'R$ 62,00',
      desc: 'Uma peça orgânica e contemporânea que destaca seu visual.<br/>Colar com fio camurça marrom, conta em resina verde musgo e pingente de cerâmica esmaltada em alta temperatura na cor verde musgo.<br/>Medidas:<br/>Colar: 42 cm<br/>Pingente: 6 x 4 cm',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-021': {
      code: 'Código BLB-021',
      price: 'R$ 98,00',
      desc: 'Uma colar elegante e refinado que reaça seu visual.<br/>Colar com fio camurça preto e pingente de metal dourado, verde com detalhe perolado.<br/>Medidas:<br/>Colar: 40 cm<br/>Pingente: 6 cm',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-022': {
      code: 'Código BLB-022',
      price: 'R$ 60,00',
      desc: 'Este colar é a declaração de um estilo e personalidade.<br/>Colar com fio coreano duplo na cor marrom, contas de resina e pingente de cerâmica na cor natural e com acabamento de verniz transparente.<br/>Medidas:<br/>Colar: 34 cm<br/>Pingente: 5 x 5 cm',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-023': {
      code: 'Código BLB-023',
      price: 'R$ 72,00',
      desc: 'Este colar tem um design marcante e original valorizando o seu estilo.<br/>Colar com fio de seda na cor marrom, conta de resina e pingente de cerâmica na cor verde com tons marrons.<br/>Medidas:<br/>Colar: 43 cm<br/>Pingente: 6 x 3 cm',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-024': {
      code: 'Código BLB-024',
      price: 'R$ 60,00',
      desc: 'Esta peça traz romantismo e jovialidade para o seu look.<br/>Colar com cordão de seda preto e pingente de coração em cerâmica esmaltada em alta temperatura na cor vermelha.<br/>Medidas:<br/>Colar: 36 cm<br/>Pingente: 5,5 x 5 cm',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-025': {
      code: 'Código BLB-025',
      price: 'R$ 62,00',
      desc: 'Este é um colar que marca presença.<br/>Colar com cordão de seda preto, conta em resina e pingente em cerâmica esmaltada em alta temperatura nas cores azul e vermelha.<br/>Medidas:<br/>Colar: 42 cm<br/>Pingente: 6 cm de diâmetro',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-026': {
      code: 'Código BLB-026',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-027': {
      code: 'Código BLB-027',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-028': {
      code: 'Código BLB-028',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-029': {
      code: 'Código BLB-029',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-030': {
      code: 'Código BLB-030',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-031': {
      code: 'Código BLB-031',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-032': {
      code: 'Código BLB-032',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-033': {
      code: 'Código BLB-033',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    },
    'BLB-034': {
      code: 'Código BLB-034',
      price: '',
      desc: '',
      whatsapp: 'https://wa.me/5534992569311'
    }

  };

  let currentProduct = null;
  let currentImageIndex = 0;
  let isZoomed = false;

  function openModal(productCode) {
    currentProduct = productCode;
    currentImageIndex = 0;
    isZoomed = false;

    const product = products[productCode];

    // Set product info
    document.getElementById('modalCode').textContent = product.code;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalDesc').innerHTML = product.desc;
    document.getElementById('modalWhatsApp').href = product.whatsapp;

    // Load images
    loadCarouselImages(productCode);

    // Show modal
    const modal = document.getElementById('productModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProduct = null;
    isZoomed = false;
  }

  function loadCarouselImages(productCode) {
    const carouselImages = document.getElementById('carouselImages');
    const dotsContainer = document.getElementById('dotsContainer');

    carouselImages.innerHTML = '';
    dotsContainer.innerHTML = '';

    // Create image elements
    const imageA = document.createElement('div');
    imageA.className = 'carousel-image';
    imageA.innerHTML = `<img src="images/${productCode}-A.jpeg" alt="${productCode} - A" onclick="toggleZoom()">`;

    const imageB = document.createElement('div');
    imageB.className = 'carousel-image';
    imageB.innerHTML = `<img src="images/${productCode}-B.jpeg" alt="${productCode} - B" onclick="toggleZoom()">`;

    carouselImages.appendChild(imageA);
    carouselImages.appendChild(imageB);

    // Create dots
    const dotA = document.createElement('div');
    dotA.className = 'carousel-dot active';
    dotA.onclick = () => goToImage(0);

    const dotB = document.createElement('div');
    dotB.className = 'carousel-dot';
    dotB.onclick = () => goToImage(1);

    dotsContainer.appendChild(dotA);
    dotsContainer.appendChild(dotB);
  }

  function goToImage(index) {
    currentImageIndex = index;
    updateCarousel();
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % 2;
    updateCarousel();
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + 2) % 2;
    updateCarousel();
  }

  function toggleZoom() {
    isZoomed = !isZoomed;
    updateCarousel();
  }

  function updateCarousel() {
    const carouselImages = document.getElementById('carouselImages');
    const translateX = -currentImageIndex * 100;
    carouselImages.style.transform = `translateX(${translateX}%)`;

    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentImageIndex);
    });

    // Update carousel zoom state
    if (isZoomed) {
      carouselImages.classList.add('zoomed');
    } else {
      carouselImages.classList.remove('zoomed');
    }
  }

  // Close modal when clicking outside
  document.getElementById('productModal').addEventListener('click', function(e) {
    if (!e.target.closest('.modal-body')) {
      closeModal();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (currentProduct) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    }
  });

  // Filter functionality
  let currentPage = 1;
  const itemsPerPage = 10;

  function filterProducts(category) {
    const cards = document.querySelectorAll('.card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update button states
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter cards
    cards.forEach(card => {
      if (category === 'all') {
        card.classList.remove('hidden');
      } else {
        const cardCategory = card.getAttribute('data-category');
        if (cardCategory === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      }
    });

    // Reset pagination
    currentPage = 1;
    updatePagination();
  }

  function updatePagination() {
    const cards = document.querySelectorAll('.card:not(.hidden)');
    const totalPages = Math.ceil(cards.length / itemsPerPage);
    const paginationContainer = document.getElementById('paginationContainer');

    // Show/hide cards based on current page
    cards.forEach((card, index) => {
      const pageNumber = Math.floor(index / itemsPerPage) + 1;
      if (pageNumber === currentPage) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    // Create pagination buttons
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return; // No pagination needed

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.textContent = '← Anterior';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        updatePagination();
        window.scrollTo(0, 0);
      }
    };
    paginationContainer.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.className = 'pagination-btn';
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active');
      btn.onclick = () => {
        currentPage = i;
        updatePagination();
        window.scrollTo(0, 0);
      };
      paginationContainer.appendChild(btn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.textContent = 'Próximo →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
        window.scrollTo(0, 0);
      }
    };
    paginationContainer.appendChild(nextBtn);
  }

  // Initialize pagination on page load
