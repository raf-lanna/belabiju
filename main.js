// Load products from JSON file
let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/products.json')
    .then(res => res.json())
    .then(data => {
      // Suporte para array puro ou objeto do CMS
      allProducts = data.products || data;
      populateProductsGrid();
    })
    .catch(err => console.error('Erro ao carregar produtos:', err));
});

function populateProductsGrid(){
  const grid = document.getElementById('products-container');
  if (!grid) return console.error('Elemento #products-container não encontrado no HTML.');
  grid.innerHTML = '';

  allProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
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
