// UI rendering functions

function renderHeader() {
    const header = document.createElement('header');
    header.className = 'sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 mobile-safe-area';
    header.innerHTML = `
        <div class="mobile-container">
            <div class="text-center py-4 sm:py-6 md:py-8">
                <h1 class="brand-header animate-fade-in">Palmyra</h1>
                <p class="text-muted-foreground mt-1 sm:mt-2 text-responsive-sm animate-fade-in px-2 sm:px-4">
                    Premium Nuts, Seeds & Gourmet Treats
                </p>
            </div>
            <nav class="flex items-center justify-between py-2 sm:py-3 md:py-4">
                <div class="mobile-nav">
                    <button onclick="scrollToSection('home')" class="mobile-nav-item">
                        <span class="hidden sm:inline">🏠</span>
                        <span class="sm:ml-1">Home</span>
                    </button>
                    <button onclick="scrollToSection('nuts')" class="mobile-nav-item">
                        <span class="hidden sm:inline">🥜</span>
                        <span class="sm:ml-1">Nuts</span>
                    </button>
                    <button onclick="scrollToSection('seeds')" class="mobile-nav-item">
                        <span class="hidden sm:inline">🌱</span>
                        <span class="sm:ml-1">Seeds</span>
                    </button>
                </div>
                <button id="cart-button" class="p-2 hover:bg-secondary rounded-full transition-colors">
                    <span class="relative inline-block">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        <span id="cart-count" class="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
                    </span>
                </button>
            </div>
        </div>
    `;
    return header;
}

function renderHomePage() {
    const root = document.getElementById('root');
    root.innerHTML = '';
    root.appendChild(renderHeader());

    const main = document.createElement('main');
    main.className = 'mobile-container py-6';
    main.innerHTML = `
        <section id="home" class="py-8">
            <div class="relative rounded-lg overflow-hidden aspect-[16/9] md:aspect-[21/9]">
                <img src="src/assets/nuts.jpg" alt="Hero" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
                    <div class="p-6 md:p-8 lg:p-12 text-white">
                        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Premium Quality Nuts</h2>
                        <p class="text-sm md:text-base lg:text-lg mb-6">Discover our selection of premium nuts</p>
                        <button onclick="scrollToSection('nuts')" class="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary-hover transition-colors">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section id="nuts" class="py-8">
            <h2 class="text-2xl font-bold mb-6">Our Nut Selection</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                ${products.nutCategories.map(category => `
                    <div class="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <img src="${category.image}" alt="${category.name}" class="w-full aspect-[4/3] object-cover">
                        <div class="p-4">
                            <h3 class="text-lg font-semibold">${category.name}</h3>
                            <p class="text-muted-foreground text-sm mt-2">${category.description}</p>
                            <p class="text-sm mt-2">${category.varietyCount} varieties available</p>
                            <button onclick="handleNutCategoryClick(${JSON.stringify(category)})" class="mt-4 w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-hover transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="simple-products" class="py-8">
            <h2 class="text-2xl font-bold mb-6">Other Products</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                ${products.simpleProducts.map(product => `
                    <div class="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <img src="${product.image}" alt="${product.name}" class="w-full aspect-[4/3] object-cover">
                        <div class="p-4">
                            <h3 class="text-lg font-semibold">${product.name}</h3>
                            <p class="text-muted-foreground text-sm mt-2">${product.description}</p>
                            <p class="text-primary font-semibold mt-2">From ₹${product.basePrice}</p>
                            <button onclick="handleAddToCart(${JSON.stringify(product)})" class="mt-4 w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-hover transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
    root.appendChild(main);
}

function renderNutCategoryPage() {
    const root = document.getElementById('root');
    root.innerHTML = '';
    root.appendChild(renderHeader());

    const main = document.createElement('main');
    main.className = 'mobile-container py-6';

    if (!state.selectedNutCategory) {
        main.innerHTML = '<p>No category selected</p>';
        root.appendChild(main);
        return;
    }

    main.innerHTML = `
        <div class="py-4">
            <button onclick="handleBackToNuts()" class="flex items-center text-primary hover:text-primary-hover transition-colors">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back to Categories
            </button>
        </div>

        <h2 class="text-2xl font-bold mb-6">${state.selectedNutCategory.name}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${state.selectedNutCategory.varieties.map(variety => `
                <div class="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <img src="${variety.image}" alt="${variety.name}" class="w-full aspect-[4/3] object-cover">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold">${variety.name}</h3>
                        <p class="text-muted-foreground text-sm mt-2">${variety.description}</p>
                        <p class="text-primary font-semibold mt-2">From ₹${variety.basePrice}</p>
                        ${variety.isWeightBased ? `
                            <div class="mt-4 space-y-2">
                                ${variety.weights.map(weight => `
                                    <button 
                                        onclick="handleAddToCart(${JSON.stringify({ ...variety, weight: weight.value, price: variety.basePrice * weight.multiplier })})" 
                                        class="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                        ${weight.value} - ₹${variety.basePrice * weight.multiplier}
                                    </button>
                                `).join('')}
                            </div>
                        ` : `
                            <button onclick="handleAddToCart(${JSON.stringify(variety)})" class="mt-4 w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-hover transition-colors">
                                Add to Cart
                            </button>
                        `}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    root.appendChild(main);
}

function renderCartPanel() {
    const cartPanel = document.createElement('div');
    cartPanel.className = 'fixed inset-0 z-50 overflow-hidden';
    cartPanel.innerHTML = `
        <div class="absolute inset-0 bg-black/50" onclick="handleCloseCart()"></div>
        <div class="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-background shadow-xl mobile-safe-area">
            <div class="flex flex-col h-full">
                <div class="flex items-center justify-between p-4 md:p-6 border-b border-border">
                    <h2 class="text-lg md:text-xl font-bold flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        <span>Your Cart</span>
                    </h2>
                    <button onclick="handleCloseCart()" class="p-2 hover:bg-secondary rounded-full transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto p-6">
                    ${state.cart.length === 0 ? `
                        <div class="text-center text-muted-foreground py-12">
                            <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                            <p>Your cart is empty</p>
                        </div>
                    ` : `
                        <div class="space-y-4">
                            ${state.cart.map(item => `
                                <div class="flex items-center space-x-4">
                                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                                    <div class="flex-1">
                                        <h3 class="font-medium">${item.name}</h3>
                                        <p class="text-sm text-muted-foreground">${item.weight || ''}</p>
                                        <p class="text-sm font-medium">₹${item.price}</p>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})" class="p-1 hover:bg-secondary rounded-full transition-colors">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                                            </svg>
                                        </button>
                                        <span class="w-8 text-center">${item.quantity}</span>
                                        <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})" class="p-1 hover:bg-secondary rounded-full transition-colors">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>

                ${state.cart.length > 0 ? `
                    <div class="border-t border-border p-6 space-y-4">
                        <div class="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>₹${cartManager.getSubtotal()}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span>${cartManager.isFreeDelivery() ? 'Free' : `₹${cartManager.getShippingCharge()}`}</span>
                        </div>
                        <div class="flex justify-between font-medium">
                            <span>Total</span>
                            <span>₹${cartManager.getFinalTotal()}</span>
                        </div>
                        <button onclick="handleShowCartPage()" class="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-hover transition-colors">
                            Proceed to Checkout
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    document.body.appendChild(cartPanel);
}

function renderCartPage() {
    const root = document.getElementById('root');
    root.innerHTML = '';
    root.appendChild(renderHeader());

    const main = document.createElement('main');
    main.className = 'mobile-container py-6';
    main.innerHTML = `
        <div class="py-4">
            <button onclick="handleBackFromCart()" class="flex items-center text-primary hover:text-primary-hover transition-colors">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back to Shopping
            </button>
        </div>

        <h2 class="text-2xl font-bold mb-6">Your Cart</h2>

        ${state.cart.length === 0 ? `
            <div class="text-center text-muted-foreground py-12">
                <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <p>Your cart is empty</p>
                <button onclick="handleBackFromCart()" class="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary-hover transition-colors">
                    Continue Shopping
                </button>
            </div>
        ` : `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 space-y-4">
                    ${state.cart.map(item => `
                        <div class="flex items-center space-x-4 bg-card p-4 rounded-lg">
                            <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded">
                            <div class="flex-1">
                                <h3 class="font-medium">${item.name}</h3>
                                <p class="text-sm text-muted-foreground">${item.weight || ''}</p>
                                <p class="text-sm font-medium">₹${item.price}</p>
                                <div class="flex items-center space-x-2 mt-2">
                                    <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})" class="p-1 hover:bg-secondary rounded-full transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                                        </svg>
                                    </button>
                                    <span class="w-8 text-center">${item.quantity}</span>
                                    <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})" class="p-1 hover:bg-secondary rounded-full transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <button onclick="cartManager.removeItem('${item.id}')" class="p-2 hover:bg-secondary rounded-full transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    `).join('')}
                </div>

                <div class="lg:col-span-1">
                    <div class="bg-card p-6 rounded-lg sticky top-24">
                        <h3 class="text-lg font-semibold mb-4">Order Summary</h3>
                        <div class="space-y-4">
                            <div class="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>₹${cartManager.getSubtotal()}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span>${cartManager.isFreeDelivery() ? 'Free' : `₹${cartManager.getShippingCharge()}`}</span>
                            </div>
                            <div class="flex justify-between font-medium text-lg">
                                <span>Total</span>
                                <span>₹${cartManager.getFinalTotal()}</span>
                            </div>
                            <button class="w-full bg-primary text-primary-foreground px-4 py-3 rounded-md hover:bg-primary-hover transition-colors">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `}
    `;
    root.appendChild(main);
}

// Event handlers
function handleNutCategoryClick(category) {
    state.selectedNutCategory = category;
    state.currentView = 'nut-category';
    updateView();
}

function handleBackToNuts() {
    state.currentView = 'nuts';
    state.selectedNutCategory = null;
    updateView();
}

function handleAddToCart(product) {
    cartManager.addItem(product);
}

function handleShowCartPage() {
    state.showCartPage = true;
    state.isCartOpen = false;
    updateView();
}

function handleBackFromCart() {
    state.showCartPage = false;
    updateView();
}

function handleCloseCart() {
    state.isCartOpen = false;
    const cartPanel = document.querySelector('.fixed.inset-0.z-50');
    if (cartPanel) {
        cartPanel.remove();
    }
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (e.target.id === 'cart-button') {
            state.isCartOpen = true;
            renderCartPanel();
        }
    });
});

export { renderHeader, renderHomePage, renderNutCategoryPage, renderCartPanel, renderCartPage };