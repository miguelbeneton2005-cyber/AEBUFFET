/**
 * AE Buffet e Eventos - Script da Página de Detalhe do Prato (prato.js)
 * Carrega dinamicamente o prato selecionado via URL (?id=X),
 * gerencia a alternância de porções (5, 10 e 15 pessoas),
 * exibe a lista de ingredientes calibrada e integra com o carrinho e WhatsApp.
 */

let currentDish = null;
let currentPortion = 5; // Padrão: 5 pessoas

document.addEventListener('DOMContentLoaded', () => {
  loadDishFromUrl();
  buffetCart.updateGlobalBadges();
  
  // Escuta alterações do carrinho para atualizar badge na página
  buffetCart.subscribe(() => {
    buffetCart.updateGlobalBadges();
  });
});

/**
 * Lê o ID do prato da query string (?id=X)
 */
function loadDishFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const dishId = parseInt(urlParams.get('id'), 10) || 1;

  currentDish = DISHES_DATA.find(d => d.id === dishId) || DISHES_DATA[0];

  renderDishDetails();
  renderOtherDishes();
}

/**
 * Preenche todos os dados do prato na tela
 */
function renderDishDetails() {
  if (!currentDish) return;

  // Atualiza título da aba e breadcrumb
  document.title = `${currentDish.name} - Detalhes e Ingredientes | AE Buffet`;
  
  const breadcrumbEl = document.getElementById('breadcrumb-dish-name');
  if (breadcrumbEl) breadcrumbEl.textContent = currentDish.name;

  // Imagem e Textos
  const imgEl = document.getElementById('dish-main-image');
  if (imgEl) {
    imgEl.src = currentDish.image;
    imgEl.alt = `${currentDish.name} - AE Buffet e Eventos`;
  }

  const categoryEl = document.getElementById('dish-category');
  if (categoryEl) categoryEl.textContent = currentDish.category;

  const titleEl = document.getElementById('dish-title');
  if (titleEl) titleEl.textContent = currentDish.name;

  const descEl = document.getElementById('dish-desc');
  if (descEl) descEl.textContent = currentDish.shortDesc;

  // Preenche os valores dos cards de 5, 10 e 15 pessoas
  document.getElementById('card-price-5').textContent = formatCurrency(currentDish.prices[5]);
  document.getElementById('card-price-10').textContent = formatCurrency(currentDish.prices[10]);
  document.getElementById('card-price-15').textContent = formatCurrency(currentDish.prices[15]);

  // Atualiza visualização da porção selecionada
  selectPortion(currentPortion);
}

/**
 * Seleciona a porção desejada (5, 10 ou 15 pessoas)
 * e atualiza dinamicamente os ingredientes, quantidades e valor total.
 */
function selectPortion(people) {
  currentPortion = Number(people);

  // Atualiza botões
  const portionButtons = document.querySelectorAll('.portion-card-btn');
  portionButtons.forEach(btn => {
    const isCurrent = Number(btn.getAttribute('data-portion')) === currentPortion;
    btn.classList.toggle('active', isCurrent);
  });

  // Atualiza indicação de porção
  const badgeEl = document.getElementById('ingredients-badge');
  if (badgeEl) badgeEl.textContent = `Quantidades calculadas para ${currentPortion} Pessoas`;

  const labelEl = document.getElementById('selected-portion-label');
  if (labelEl) labelEl.textContent = `${currentPortion} pessoas`;

  // Atualiza valor em destaque
  const priceDisplay = document.getElementById('dish-current-price');
  if (priceDisplay && currentDish) {
    priceDisplay.textContent = formatCurrency(currentDish.prices[currentPortion]);
  }

  // Renderiza a lista de ingredientes com as quantidades calibradas para a porção escolhida
  renderIngredientsList();
}

/**
 * Renderiza a lista de ingredientes para a porção ativa
 */
function renderIngredientsList() {
  const container = document.getElementById('ingredients-list-container');
  if (!container || !currentDish) return;

  container.innerHTML = currentDish.ingredients.map(ing => {
    const qty = ing.qty[currentPortion] || 'Porção adequada';
    return `
      <li class="ingredient-item">
        <span class="ingredient-name">
          <i class="fa-solid fa-check" style="color: var(--primary); margin-right: 8px;"></i>
          ${ing.name}
        </span>
        <span class="ingredient-qty">${qty}</span>
      </li>
    `;
  }).join('');
}

/**
 * Ação: Adicionar ao Carrinho
 */
function addCurrentToCart() {
  if (!currentDish) return;
  buffetCart.addItem(currentDish.id, currentPortion, 1);
}

/**
 * Ação: Fazer Pedido
 * Adiciona ao carrinho e abre diretamente a aba de Pedidos no site principal
 */
function orderNowCurrentDish() {
  if (!currentDish) return;
  buffetCart.addItem(currentDish.id, currentPortion, 1);
  
  // Abre ou redireciona para a aba de pedidos do site principal
  window.location.href = `index.html?tab=pedidos`;
}

/**
 * Inicia conversa no WhatsApp sobre este prato específico
 */
function askDishOnWhatsApp(waTargetNumber) {
  if (!currentDish) return;
  const config = waTargetNumber === 2 ? BUFFET_CONFIG.whatsapp2 : BUFFET_CONFIG.whatsapp1;
  const price = formatCurrency(currentDish.prices[currentPortion]);

  const text = `Olá! Estou vendo o *${currentDish.name}* no site do AE Buffet para *${currentPortion} pessoas* (${price}). Gostaria de tirar algumas dúvidas sobre a contratação!`;
  const url = `https://wa.me/${config.number}?text=${encodeURIComponent(text)}`;
  
  window.open(url, '_blank');
}

/**
 * Renderiza recomendações de outros pratos na parte inferior da página
 */
function renderOtherDishes() {
  const container = document.getElementById('other-dishes-grid');
  if (!container || !currentDish) return;

  // Filtra outros pratos para exibir 3 sugestões
  const others = DISHES_DATA.filter(d => d.id !== currentDish.id).slice(0, 3);

  container.innerHTML = others.map(dish => `
    <div class="dish-card">
      <a href="prato.html?id=${dish.id}" class="dish-card-link">
        <div class="dish-image-box">
          <img src="${dish.image}" alt="${dish.name}" class="dish-img">
        </div>
        <div class="dish-content">
          <span class="dish-category-tag">${dish.category}</span>
          <h4 class="dish-title">${dish.name}</h4>
          <div class="dish-action-hint">
            <span>Ver detalhes e ingredientes</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </a>
    </div>
  `).join('');
}
