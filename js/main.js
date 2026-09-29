/**
 * AE Buffet e Eventos - Script Principal (main.js)
 * Controla navegação por abas, renderização dos 10 pratos,
 * gerenciamento do carrinho na aba Pedidos e checkout via WhatsApp.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  renderDishesGrid();
  renderCartView();
  buffetCart.updateGlobalBadges();

  // Escuta atualizações do carrinho para re-renderizar a aba Pedidos em tempo real
  buffetCart.subscribe(() => {
    renderCartView();
  });
});

/**
 * Controle de Alternância de Abas (Pratos, Quem Somos, Contato, Pedidos)
 */
function switchTab(tabId) {
  // Atualiza botões
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    const isTarget = btn.getAttribute('data-tab') === tabId;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  // Atualiza painéis
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabPanes.forEach(pane => {
    pane.classList.remove('active');
  });

  const activePane = document.getElementById(`tab-${tabId}`);
  if (activePane) {
    activePane.classList.add('active');
    // Rola suavemente até o início do conteúdo se estiver no mobile
    if (window.innerWidth <= 768) {
      activePane.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Se abriu a aba de pedidos, garante que ela esteja atualizada
  if (tabId === 'pedidos') {
    renderCartView();
  }

  // Atualiza hash na URL sem recarregar
  history.replaceState(null, '', `?tab=${tabId}`);
}

/**
 * Lê parâmetros da URL na carga inicial (ex: index.html?tab=pedidos)
 */
function initTabs() {
  const urlParams = new URLSearchParams(window.location.search);
  const requestedTab = urlParams.get('tab');
  if (requestedTab && ['pratos', 'quem-somos', 'contato', 'pedidos'].includes(requestedTab)) {
    switchTab(requestedTab);
  }
}

/**
 * Renderiza os 10 pratos na Aba "Pratos"
 * Conforme solicitado: no card inicial aparece somente o nome e a foto do prato,
 * e ao clicar abre uma nova aba (target="_blank") com detalhes, ingredientes e valores.
 * Também inclui botões de ação rápida para "Fazer Pedido" e "Adicionar ao Carrinho".
 */
function renderDishesGrid() {
  const container = document.getElementById('dishes-grid');
  if (!container) return;

  container.innerHTML = DISHES_DATA.map(dish => `
    <div class="dish-card" id="dish-card-${dish.id}">
      <!-- Link principal que abre em NOVA ABA com os ingredientes e valores detalhados -->
      <a href="prato.html?id=${dish.id}" target="_blank" class="dish-card-link" title="Clique para abrir detalhes do ${dish.name} em nova aba">
        <div class="dish-image-box">
          <img src="${dish.image}" alt="${dish.name} - AE Buffet" class="dish-img" loading="lazy">
          <span class="dish-open-badge">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Abrir em nova aba
          </span>
        </div>
        <div class="dish-content">
          <span class="dish-category-tag">${dish.category}</span>
          <h3 class="dish-title">${dish.name}</h3>
          <div class="dish-action-hint">
            <span>Ver ingredientes e valores (5, 10 e 15 pessoas)</span>
            <i class="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </a>

      <!-- Botões de ação solicitados: Fazer Pedido e Adicionar ao Carrinho -->
      <div class="dish-card-footer">
        <button class="btn btn-secondary btn-sm" onclick="quickAddToCart(${dish.id})" title="Adicionar porção padrão de 5 pessoas ao carrinho">
          <i class="fa-solid fa-cart-plus"></i> Adicionar
        </button>
        <button class="btn btn-primary btn-sm" onclick="quickOrder(${dish.id})" title="Abrir opções e fazer pedido agora">
          <i class="fa-solid fa-bolt"></i> Fazer Pedido
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Ação rápida de adicionar ao carrinho a partir da lista principal (porção padrão de 5 pessoas)
 */
function quickAddToCart(dishId) {
  buffetCart.addItem(dishId, 5, 1);
}

/**
 * Ação rápida de fazer pedido: abre a página em nova aba com as opções completas
 */
function quickOrder(dishId) {
  window.open(`prato.html?id=${dishId}`, '_blank');
}

/**
 * Renderiza a visão da Aba "Pedidos" (Carrinho)
 */
function renderCartView() {
  const itemsContainer = document.getElementById('cart-items-container');
  const itemsCountEl = document.getElementById('summary-items-count');
  const peopleEstimateEl = document.getElementById('summary-people-estimate');
  const totalPriceEl = document.getElementById('summary-total-price');

  if (!itemsContainer) return;

  const items = buffetCart.getItems();
  const totalCount = buffetCart.getTotalCount();
  const totalPrice = buffetCart.getTotalPrice();

  // Calcula total estimado de pessoas
  const totalPeople = items.reduce((sum, item) => sum + (item.portionPeople * item.quantity), 0);

  // Atualiza resumo
  if (itemsCountEl) itemsCountEl.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'itens'}`;
  if (peopleEstimateEl) peopleEstimateEl.textContent = `Aprox. ${totalPeople} convidados`;
  if (totalPriceEl) totalPriceEl.textContent = formatCurrency(totalPrice);

  // Se carrinho estiver vazio
  if (items.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">
          <i class="fa-solid fa-basket-shopping"></i>
        </div>
        <h4>Seu pedido ainda está vazio</h4>
        <p>Explore nosso catálogo com os 10 pratos artesanais e adicione suas opções preferidas.</p>
        <button class="btn btn-primary" onclick="switchTab('pratos')">
          <i class="fa-solid fa-utensils"></i> Explorar Pratos do Buffet
        </button>
      </div>
    `;
    return;
  }

  // Renderiza linhas dos itens
  itemsContainer.innerHTML = items.map(item => `
    <div class="cart-item-row" id="cart-row-${item.key}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
      
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <div>
          <span class="cart-portion-badge">
            <i class="fa-solid fa-users"></i> Para ${item.portionPeople} pessoas
          </span>
        </div>
        <span class="cart-item-unit-price">
          Valor unitário: <strong>${formatCurrency(item.unitPrice)}</strong>
        </span>
      </div>

      <!-- Controles de Quantidade -->
      <div class="qty-control">
        <button class="qty-btn" onclick="buffetCart.updateQuantity('${item.key}', -1)" title="Diminuir quantidade">
          <i class="fa-solid fa-minus"></i>
        </button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn" onclick="buffetCart.updateQuantity('${item.key}', 1)" title="Aumentar quantidade">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>

      <!-- Subtotal e Remoção -->
      <div style="display: flex; align-items: center; gap: 14px;">
        <span class="cart-item-subtotal">${formatCurrency(item.unitPrice * item.quantity)}</span>
        <button class="cart-item-remove" onclick="buffetCart.removeItem('${item.key}')" title="Remover prato do pedido">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Finaliza o Pedido enviando resumo estruturado diretamente via WhatsApp
 * para o número escolhido pelo cliente (WhatsApp 1 ou WhatsApp 2)
 */
function checkoutViaWhatsApp() {
  const items = buffetCart.getItems();
  if (items.length === 0) {
    buffetCart.showToast("Adicione ao menos um prato antes de finalizar o pedido.", "warning");
    switchTab('pratos');
    return;
  }

  const clientName = document.getElementById('order-client-name')?.value.trim() || 'Cliente';
  const eventDate = document.getElementById('order-client-date')?.value || 'A definir';
  
  // Identifica para qual dos 2 WhatsApps enviar
  const selectedTarget = document.querySelector('input[name="order-wa-target"]:checked')?.value || '1';
  const waConfig = selectedTarget === '2' ? BUFFET_CONFIG.whatsapp2 : BUFFET_CONFIG.whatsapp1;

  const totalPeople = items.reduce((sum, item) => sum + (item.portionPeople * item.quantity), 0);
  const totalPrice = buffetCart.getTotalPrice();

  // Formata os itens em texto elegante
  let itemsListText = items.map((item, index) => {
    return `${index + 1}. *${item.name}* (Porção para ${item.portionPeople} pessoas)\n   Qtd: ${item.quantity}x | Subtotal: ${formatCurrency(item.unitPrice * item.quantity)}`;
  }).join('\n\n');

  // Monta a mensagem completa
  const message = `✨ *SOLICITAÇÃO DE PEDIDO - AE BUFFET E EVENTOS* ✨\n\n` +
    `Olá! Montei meu pedido através do site do buffet e gostaria de confirmar a contratação.\n\n` +
    `👤 *Nome do Cliente:* ${clientName}\n` +
    `📅 *Data Prevista do Evento:* ${eventDate}\n` +
    `👥 *Total estimado de convidados:* ~${totalPeople} pessoas\n\n` +
    `📋 *PRATOS SELECIONADOS:*\n${itemsListText}\n\n` +
    `💰 *VALOR TOTAL ESTIMADO:* ${formatCurrency(totalPrice)}\n\n` +
    `Canal selecionado: ${waConfig.label}\n` +
    `Poderiam me informar a disponibilidade e formas de pagamento?`;

  const waUrl = `https://wa.me/${waConfig.number}?text=${encodeURIComponent(message)}`;
  
  // Abre o WhatsApp em nova aba
  window.open(waUrl, '_blank');
}

/**
 * Trata o envio do formulário de contato
 */
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('contact-name').value;
  const phone = document.getElementById('contact-phone').value;
  const date = document.getElementById('contact-date').value || 'Não informada';
  const message = document.getElementById('contact-message').value;

  const waText = `Olá! Meu nome é *${name}* (${phone}). Gostaria de informações para evento em *${date}*:\n\n"${message}"`;
  const url = `https://wa.me/${BUFFET_CONFIG.whatsapp1.number}?text=${encodeURIComponent(waText)}`;
  
  window.open(url, '_blank');
  buffetCart.showToast("Mensagem pronta! Abrindo WhatsApp oficial do AE Buffet...");
  event.target.reset();
}

/**
 * Modal simples ou seletor para os 2 WhatsApps a partir do Hero
 */
function openWhatsAppModal() {
  const choose = confirm("Deseja falar com o WhatsApp 1 (Orçamentos & Cardápios)?\n\nClique em OK para WhatsApp 1 ou Cancelar para WhatsApp 2 (Coordenação de Eventos).");
  if (choose) {
    window.open(`https://wa.me/${BUFFET_CONFIG.whatsapp1.number}`, '_blank');
  } else {
    window.open(`https://wa.me/${BUFFET_CONFIG.whatsapp2.number}`, '_blank');
  }
}
