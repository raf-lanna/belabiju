    // Load products from JSON file
    let allProducts = [];
    fetch('_data/products.json')
      .then(res => res.json())
      .then(data => {
        allProducts = data;
        populateProductsGrid();
      })
      .catch(err => console.error('Erro ao carregar produtos:', err));

    function populateProductsGrid(){
      const grid = document.querySelector('.grid');
      grid.innerHTML = '';

      allProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = `card ${product.category ? 'hidden' : ''}`;
        card.setAttribute('data-category', product.category || 'ceramica');

        card.innerHTML = `
          <div style="cursor: pointer;" onclick="openModalFromData('${product.code}')">
            <img src="images/${product.code}-A.jpeg" alt="Colar ${product.code}" loading="lazy">
          </div>
          <div class="code">Código ${product.code}</div>
          <div class="price">${product.price}</div>
          <div class="desc">${product.desc}</div>
          <div class="buy">
            <a href="${product.whatsapp}" target="_blank">Pergunte no WhatsApp</a>
          </div>
        `;
        grid.appendChild(card);
      });

      currentPage = 1;
      filterProducts('all');
    }

    function openModalFromData(productCode){
      const product = allProducts.find(p => p.code === productCode);
      if(!product) return;

      currentProduct = productCode;
      currentImageIndex = 0;
      isZoomed = false;

      document.getElementById('modalCode').textContent = `Código ${product.code}`;
      document.getElementById('modalPrice').textContent = product.price;
      document.getElementById('modalDesc').innerHTML = product.desc;
      document.getElementById('modalWhatsApp').href = product.whatsapp;

      loadCarouselImages(productCode);
      document.getElementById('productModal').classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Sobre nós modal already exists with id modal-sobre-nos
    const sobreModal = document.getElementById('modal-sobre-nos');
    const sobreOpenBtn = document.getElementById('open-modal-btn');
    if(sobreOpenBtn){
      sobreOpenBtn.addEventListener('click', ()=>{ openSobreNos(); });
    }
    // functions to open/close the Sobre Nós modal (used by drawer link)
    function openSobreNos(){ if(sobreModal){ sobreModal.classList.add('active'); sobreModal.setAttribute('aria-hidden','false'); } }
    function closeSobreNos(){ if(sobreModal){ sobreModal.classList.remove('active'); sobreModal.setAttribute('aria-hidden','true'); } }
    const sobreClose = sobreModal && sobreModal.querySelector('.modal-close-full');
    if(sobreClose) sobreClose.addEventListener('click', closeSobreNos);

    // Frete modal
    const freteModal = document.getElementById('modal-frete');
    const freteOpenBtn = document.getElementById('open-frete-btn');
    function openFrete(){ if(freteModal){ freteModal.classList.add('active'); freteModal.setAttribute('aria-hidden','false'); } }
    function closeFrete(){ if(freteModal){ freteModal.classList.remove('active'); freteModal.setAttribute('aria-hidden','true'); } }
    if(freteOpenBtn) freteOpenBtn.addEventListener('click', openFrete);
    document.querySelectorAll('#modal-frete .modal-close-full').forEach(b=>b.addEventListener('click', closeFrete));

    // Frete calculator: geocode addresses (Nominatim), compute haversine distance, estimate price
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

    calcBtn.addEventListener('click', async ()=>{
      const destInput = document.getElementById('frete-dest');
      const dest = destInput.value.trim();
      if(!dest){ alert('Por favor, informe o endereço de destino.'); destInput.focus(); return; }
      freteResult.textContent = 'Calculando...';
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

        freteResult.innerHTML = `<strong>Distância:</strong> ${distance.toFixed(2)} km<br/>
          <strong>Tempo estimado:</strong> ~${etaMinutes} min<br/>
          <strong>Estimativa de frete:</strong> R$ ${estimate.toFixed(2)}<br/>
          <div style="margin-top:8px;color:var(--muted);font-size:0.9rem">Base R$${base.toFixed(2)} + R$${perKm.toFixed(2)}/km</div>`;

        // enable open-uber button and store coordinates in dataset for deep link
        openUberBtn.disabled = false;
        openUberBtn.style.opacity = '1';
        openUberBtn.dataset.dest = destCoords.lat + ',' + destCoords.lon;
        openUberBtn.dataset.destAddress = destCoords.display_name || dest;
      }catch(err){
        freteResult.innerHTML = '<span style="color:crimson">Erro ao calcular: ' + (err.message||err) + '</span>';
      }finally{ calcBtn.disabled = false; }
    });

    // Open Uber deep link using formatted addresses when available
    openUberBtn.addEventListener('click', ()=>{
      const destAddress = openUberBtn.dataset.destAddress || document.getElementById('frete-dest').value.trim();
      const pickup = originAddress;
      const base = 'https://m.uber.com/ul/?action=setPickup';
      const params = new URLSearchParams();
      params.set('pickup[formatted_address]', pickup);
      params.set('dropoff[formatted_address]', destAddress);
      const url = base + '&' + params.toString();
      window.open(url, '_blank');
    });
