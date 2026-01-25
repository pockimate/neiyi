// Product Data
const products = [
    {
        id: 1,
        name: 'Silk Lace Set',
        description: 'Delicate French lace with silk trim',
        price: 89.99,
        category: 'Bras & Sets',
        badge: 'New',
        gradient: 'from-pink-100 to-pink-50'
    },
    {
        id: 2,
        name: 'Satin Bodysuit',
        description: 'Luxurious satin with adjustable straps',
        price: 129.99,
        category: 'Bodysuits',
        badge: 'Bestseller',
        gradient: 'from-purple-100 to-pink-50'
    },
    {
        id: 3,
        name: 'Mesh Teddy',
        description: 'Sheer mesh with floral embroidery',
        price: 79.99,
        category: 'Bodysuits',
        badge: null,
        gradient: 'from-rose-100 to-pink-50'
    },
    {
        id: 4,
        name: 'Velvet Bralette',
        description: 'Soft velvet with gold hardware',
        price: 69.99,
        category: 'Bras & Sets',
        badge: null,
        gradient: 'from-pink-100 to-rose-50'
    },
    {
        id: 5,
        name: 'Lace Chemise',
        description: 'Romantic lace with satin bow detail',
        price: 59.99,
        originalPrice: 89.99,
        category: 'Chemises',
        badge: 'Sale',
        gradient: 'from-purple-100 to-rose-50'
    },
    {
        id: 6,
        name: 'Corset Set',
        description: 'Structured corset with garter straps',
        price: 149.99,
        category: 'Corsets',
        badge: null,
        gradient: 'from-rose-100 to-purple-50'
    },
    {
        id: 7,
        name: 'Lace Bralette',
        description: 'Delicate lace with scalloped edges',
        price: 54.99,
        category: 'Bras & Sets',
        badge: null,
        gradient: 'from-pink-100 to-rose-50'
    },
    {
        id: 8,
        name: 'Satin Chemise',
        description: 'Flowing satin with lace trim',
        price: 74.99,
        category: 'Chemises',
        badge: 'New',
        gradient: 'from-purple-100 to-pink-50'
    },
    {
        id: 9,
        name: 'Mesh Bodysuit',
        description: 'Sheer mesh with strategic coverage',
        price: 94.99,
        category: 'Bodysuits',
        badge: null,
        gradient: 'from-rose-100 to-pink-50'
    },
    {
        id: 10,
        name: 'Lace Teddy',
        description: 'All-over lace with snap closure',
        price: 84.99,
        category: 'Bodysuits',
        badge: 'Bestseller',
        gradient: 'from-pink-100 to-purple-50'
    },
    {
        id: 11,
        name: 'Satin Robe Set',
        description: 'Matching robe and chemise set',
        price: 119.99,
        category: 'Chemises',
        badge: null,
        gradient: 'from-purple-100 to-rose-50'
    },
    {
        id: 12,
        name: 'Velvet Corset',
        description: 'Luxe velvet with boning',
        price: 159.99,
        category: 'Corsets',
        badge: 'New',
        gradient: 'from-rose-100 to-pink-50'
    }
];

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = products.map(product => `
        <div class="glass-card rounded-2xl overflow-hidden border border-pink-200 hover-lift cursor-pointer group">
            <div class="relative overflow-hidden bg-gradient-to-br ${product.gradient} aspect-[3/4]">
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center p-8">
                        <svg class="w-24 h-24 text-primary/20 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                        <p class="text-sm text-slate-400">Product Image</p>
                    </div>
                </div>
                ${product.badge ? `<div class="absolute top-4 right-4 ${product.badge === 'Sale' ? 'bg-cta' : product.badge === 'Bestseller' ? 'bg-primary' : 'bg-cta'} text-white px-3 py-1 rounded-full text-sm font-semibold">${product.badge}</div>` : ''}
            </div>
            <div class="p-6">
                <h3 class="font-display text-xl font-semibold mb-2 text-textPrimary">${product.name}</h3>
                <p class="text-slate-600 text-sm mb-4">${product.description}</p>
                <div class="flex items-center justify-between">
                    ${product.originalPrice ? 
                        `<div>
                            <span class="font-display text-2xl font-bold text-primary">$${product.price.toFixed(2)}</span>
                            <span class="text-slate-400 line-through ml-2">$${product.originalPrice.toFixed(2)}</span>
                        </div>` :
                        `<span class="font-display text-2xl font-bold text-primary">$${product.price.toFixed(2)}</span>`
                    }
                    <button onclick="quickAddToCart(${product.id})" class="bg-primary hover:bg-pink-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function quickAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        size: 'M',
        color: 'Default',
        quantity: 1
    };
    
    addToCart(cartItem);
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', renderProducts);
