// Core application state management
const state = {
    cart: JSON.parse(localStorage.getItem('palmyra-cart') || '[]'),
    likedProducts: JSON.parse(localStorage.getItem('palmyra-liked-products') || '[]'),
    currentView: 'home',
    selectedNutCategory: null,
    isCartOpen: false,
    showCartPage: false
};

// Cart management functions
const cartManager = {
    addItem(item) {
        const existingItem = state.cart.find(i => i.id === `${item.name}-${item.weight}`);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.cart.push({
                ...item,
                id: `${item.name}-${item.weight}`,
                quantity: 1
            });
        }
        this.saveCart();
        this.updateCartUI();
    },

    removeItem(id) {
        state.cart = state.cart.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartUI();
    },

    updateQuantity(id, quantity) {
        const item = state.cart.find(i => i.id === id);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeItem(id);
            }
        }
        this.saveCart();
        this.updateCartUI();
    },

    clearCart() {
        state.cart = [];
        this.saveCart();
        this.updateCartUI();
    },

    saveCart() {
        localStorage.setItem('palmyra-cart', JSON.stringify(state.cart));
    },

    getTotalItems() {
        return state.cart.reduce((total, item) => total + item.quantity, 0);
    },

    getSubtotal() {
        return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getShippingCharge() {
        const subtotal = this.getSubtotal();
        return subtotal >= 1000 ? 0 : 100;
    },

    getFinalTotal() {
        return this.getSubtotal() + this.getShippingCharge();
    },

    isFreeDelivery() {
        return this.getSubtotal() >= 1000;
    },

    updateCartUI() {
        // Update cart count in header
        const cartCount = document.querySelector('#cart-count');
        if (cartCount) {
            cartCount.textContent = this.getTotalItems().toString();
        }

        // Update cart panel if open
        if (state.isCartOpen) {
            renderCartPanel();
        }

        // Update cart page if visible
        if (state.showCartPage) {
            renderCartPage();
        }
    }
};

// Like management functions
const likeManager = {
    toggleLike(productName) {
        const index = state.likedProducts.indexOf(productName);
        if (index === -1) {
            state.likedProducts.push(productName);
        } else {
            state.likedProducts.splice(index, 1);
        }
        this.saveLikes();
        this.updateLikeUI(productName);
    },

    isLiked(productName) {
        return state.likedProducts.includes(productName);
    },

    saveLikes() {
        localStorage.setItem('palmyra-liked-products', JSON.stringify(state.likedProducts));
    },

    updateLikeUI(productName) {
        const likeButtons = document.querySelectorAll(`[data-like-product="${productName}"]`);
        likeButtons.forEach(button => {
            button.classList.toggle('liked', this.isLiked(productName));
        });
    }
};

// View management
function updateView() {
    const root = document.getElementById('root');
    if (!root) return;

    switch (state.currentView) {
        case 'home':
            renderHomePage();
            break;
        case 'nuts':
            renderNutsPage();
            break;
        case 'nut-category':
            renderNutCategoryPage();
            break;
        default:
            renderHomePage();
    }
}

// Initialize application
function initApp() {
    updateView();
    cartManager.updateCartUI();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Export necessary functions and objects
export { state, cartManager, likeManager, updateView };