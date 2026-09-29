/**
 * AE Buffet e Eventos - Gerenciador de Carrinho (Cart Engine)
 * Sincroniza pedidos via localStorage para permitir que novas abas e a página principal
 * compartilhem o mesmo carrinho em tempo real.
 */

const CART_STORAGE_KEY = 'ae_buffet_cart_v1';

class BuffetCart {
  constructor() {
    this.listeners = [];
    this._initStorageListener();
  }

  // Obtém todos os itens do carrinho salvos
  getItems() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Erro ao ler carrinho do localStorage:', e);
      return [];
    }
  }

  // Salva os itens e notifica ouvintes
  saveItems(items) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      this._notifyListeners();
    } catch (e) {
      console.error('Erro ao salvar carrinho no localStorage:', e);
    }
  }

  // Adiciona um prato com uma porção específica (5, 10 ou 15 pessoas)
  addItem(dishId, portionPeople, quantity = 1) {
    const dish = DISHES_DATA.find(d => d.id === Number(dishId));
    if (!dish) {
      console.error(`Prato ID ${dishId} não encontrado.`);
      return false;
    }

    const portion = Number(portionPeople);
    const unitPrice = dish.prices[portion];
    if (!unitPrice) {
      console.error(`Preço para porção de ${portion} pessoas não definido para o prato ${dish.name}.`);
      return false;
    }

    const items = this.getItems();
    // Chave única para o item considerando o prato e a porção escolhida
    const itemKey = `${dish.id}_p${portion}`;
    const existingIndex = items.findIndex(item => item.key === itemKey);

    if (existingIndex > -1) {
      items[existingIndex].quantity += Number(quantity);
    } else {
      items.push({
        key: itemKey,
        dishId: dish.id,
        name: dish.name,
        category: dish.category,
        image: dish.image,
        portionPeople: portion,
        unitPrice: unitPrice,
        quantity: Number(quantity)
      });
    }

    this.saveItems(items);
    this.showToast(`✨ ${dish.name} (Para ${portion} pessoas) adicionado ao pedido!`);
    return true;
  }

  // Atualiza a quantidade de um item
  updateQuantity(itemKey, delta) {
    const items = this.getItems();
    const itemIndex = items.findIndex(item => item.key === itemKey);

    if (itemIndex > -1) {
      items[itemIndex].quantity += delta;
      if (items[itemIndex].quantity <= 0) {
        items.splice(itemIndex, 1);
        this.showToast("Item removido do pedido.");
      }
      this.saveItems(items);
    }
  }

  // Remove um item completamente
  removeItem(itemKey) {
    const items = this.getItems().filter(item => item.key !== itemKey);
    this.saveItems(items);
    this.showToast("Item removido do pedido.");
  }

  // Limpa o carrinho
  clearCart() {
    this.saveItems([]);
    this.showToast("O carrinho de pedidos foi esvaziado.");
  }

  // Quantidade total de itens
  getTotalCount() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Valor total financeiro em R$
  getTotalPrice() {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  // Ouvinte para atualizar quando outra aba do navegador modificar o carrinho
  _initStorageListener() {
    window.addEventListener('storage', (event) => {
      if (event.key === CART_STORAGE_KEY) {
        this._notifyListeners();
      }
    });
  }

  // Adiciona callbacks para re-renderização de componentes
  subscribe(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  }

  _notifyListeners() {
    const items = this.getItems();
    const totalCount = this.getTotalCount();
    const totalPrice = this.getTotalPrice();

    this.listeners.forEach(cb => {
      try {
        cb({ items, totalCount, totalPrice });
      } catch (err) {
        console.error('Erro no listener do carrinho:', err);
      }
    });

    // Atualiza badges globais se existirem no DOM
    this.updateGlobalBadges();
  }

  updateGlobalBadges() {
    const count = this.getTotalCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  // Feedback visual com Toast estilizado
  showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    toast.innerHTML = `
      <div class="toast-body">
        <span>${message}</span>
      </div>
    `;

    container.appendChild(toast);

    // Animação de entrada
    requestAnimationFrame(() => {
      toast.classList.add('toast-show');
    });

    // Remove após 3.5 segundos
    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
}

// Instância global do carrinho
const buffetCart = new BuffetCart();
