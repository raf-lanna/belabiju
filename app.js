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

var currentProduct = null;
var currentImageIndex = 0;
var isZoomed = false;

function closeModal() {
  const modal = document.getElementById('productModal');
  if(modal) modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  currentProduct = null;
  isZoomed = false;
}

function loadCarouselImages(productCode) {
  const carouselImages = document.getElementById('carouselImages');
  const dotsContainer = document.getElementById('dotsContainer');
  if(!carouselImages || !dotsContainer) return;

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
  if(!carouselImages) return;
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
const productModalEl = document.getElementById('productModal');
if (productModalEl) {
  productModalEl.addEventListener('click', function(e) {
    if (!e.target.closest('.modal-body')) {
      closeModal();
    }
  });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (currentProduct) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  }
});

// Filter functionality
var currentPage = 1;
const itemsPerPage = 10;

function filterProducts(category, clickedBtn) {
  const cards = document.querySelectorAll('.card');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  
  if (clickedBtn) {
    clickedBtn.classList.add('active');
  } else {
    // Find button for this category
    const targetBtn = Array.from(buttons).find(btn => btn.dataset.filter === category);
    if(targetBtn) targetBtn.classList.add('active');
  }

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

  currentPage = 1;
  updatePagination();
}

// Attach filter listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    filterProducts(btn.dataset.filter, btn);
  });
});

function updatePagination() {
  const cards = document.querySelectorAll('.card:not(.hidden)');
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const paginationContainer = document.getElementById('paginationContainer');
  
  if(!paginationContainer) return;

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

// Frete calculator
const originAddress = 'Rua da Carioca 508 ap. 601 CEP 38411046 Patrimônio';
let originCoords = null;

async function geocode(address){
  const url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(address);
  try{
    const res = await fetch(url, {headers:{'Accept':'application/json'}});
    const data = await res.json();
    if(data && data.length) return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), display_name: data[0].display_name };
    throw new Error('Não encontrado');
  }catch(e){ throw e; }
}

function toRad(v){ return v * Math.PI / 180; }
function haversine(lat1, lon1, lat2, lon2){
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const calcBtn = document.getElementById('calc-frete-btn');
const openUberBtn = document.getElementById('open-uber-btn');
const freteResult = document.getElementById('frete-result');

// Pre-geocode origin once
(async ()=>{
  try{ originCoords = await geocode(originAddress); }catch(e){ originCoords = null; }
})();

if(calcBtn) {
  calcBtn.addEventListener('click', async ()=>{
    const destInput = document.getElementById('frete-dest');
    const dest = destInput.value.trim();
    if(!dest){ alert('Por favor, informe o endereço de destino.'); destInput.focus(); return; }
    if(freteResult) freteResult.textContent = 'Calculando...';
    calcBtn.disabled = true;
    try{
      const destCoords = await geocode(dest);
      if(!originCoords) originCoords = await geocode(originAddress);
      if(!originCoords){ throw new Error('Falha ao localizar origem.'); }
      const distanceKm = haversine(originCoords.lat, originCoords.lon, destCoords.lat, destCoords.lon);
      const distance = Math.max(0.1, distanceKm); // avoid zero
      // estimation formula (example): base + per_km * distance
      const base = 6.00;
      const perKm = 2.50; // adjust as desired
      const estimate = base + perKm * distance;
      const etaMinutes = Math.max(5, Math.round((distance / 25) * 60)); // assume 25km/h avg in city

      if(freteResult) freteResult.innerHTML = `<strong>Distância:</strong> ${distance.toFixed(2)} km<br/>
        <strong>Tempo estimado:</strong> ~${etaMinutes} min<br/>
        <strong>Estimativa de frete:</strong> R$ ${estimate.toFixed(2)}<br/>
        <div style="margin-top:8px;color:var(--muted);font-size:0.9rem">Base R$${base.toFixed(2)} + R$${perKm.toFixed(2)}/km</div>`;

      // enable open-uber button and store coordinates in dataset for deep link
      if(openUberBtn) {
        openUberBtn.disabled = false;
        openUberBtn.style.opacity = '1';
        openUberBtn.dataset.dest = destCoords.lat + ',' + destCoords.lon;
        openUberBtn.dataset.destAddress = destCoords.display_name || dest;
      }
    }catch(err){
      if(freteResult) freteResult.innerHTML = '<span style="color:crimson">Erro ao calcular: ' + (err.message||err) + '</span>';
    }finally{ calcBtn.disabled = false; }
  });
}

// Open Uber deep link using formatted addresses when available
if(openUberBtn) {
  openUberBtn.addEventListener('click', ()=>{
    const destAddress = openUberBtn.dataset.destAddress || (document.getElementById('frete-dest') ? document.getElementById('frete-dest').value.trim() : '');
    const pickup = originAddress;
    const base = 'https://m.uber.com/ul/?action=setPickup';
    const params = new URLSearchParams();
    params.set('pickup[formatted_address]', pickup);
    params.set('dropoff[formatted_address]', destAddress);
    const url = base + '&' + params.toString();
    window.open(url, '_blank');
  });
}
