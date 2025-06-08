document.addEventListener("DOMContentLoaded", () => {
    // Product Data
    const products = [
        {
            id: 1,
            name: "Blue Dream UI Kit",
            image: "https://via.placeholder.com/150/5DADE2/FFFFFF?text=UI+Kit",
            description: "A complete UI kit for modern web applications with a soothing blue palette.",
            price: 49.99
        },
        {
            id: 2,
            name: "Cosmic Blue Icon Pack",
            image: "https://via.placeholder.com/150/3498DB/FFFFFF?text=Icons",
            description: "100+ vector icons with a captivating cosmic blue theme for all your needs.",
            price: 19.99
        },
        {
            id: 3,
            name: "Aqua Wave Ebook",
            image: "https://via.placeholder.com/150/2ECC71/FFFFFF?text=Ebook",
            description: "Dive deep into advanced CSS animations and design principles in this ebook.",
            price: 29.99
        },
        {
            id: 4,
            name: "Deep Sea Theme",
            image: "https://via.placeholder.com/150/1ABC9C/FFFFFF?text=Theme",
            description: "A responsive WordPress theme designed for creative agencies, inspired by deep ocean hues.",
            price: 59.99
        },
        {
            id: 5,
            name: "Midnight Sky Preset Pack",
            image: "https://via.placeholder.com/150/34495E/FFFFFF?text=Presets",
            description: "Professional photo editing presets for Lightroom, capturing the mood of a midnight sky.",
            price: 34.99
        },
        {
            id: 6,
            name: "Cyber Blue Font Pack",
            image: "https://via.placeholder.com/150/6C3483/FFFFFF?text=Fonts",
            description: "An exclusive font collection for futuristic and cyberpunk-themed designs.",
            price: 24.99
        },
        {
            id: 7,
            name: "Azure Soundscapes",
            image: "https://via.placeholder.com/150/4B87C2/FFFFFF?text=Audio",
            description: "Ambient soundscapes and audio loops with a calming azure feel.",
            price: 39.99
        },
        {
            id: 8,
            name: "Sapphire 3D Models",
            image: "https://via.placeholder.com/150/008080/FFFFFF?text=3D",
            description: "A collection of stunning 3D models textured with rich sapphire tones.",
            price: 69.99
        }
    ];

    const productGrid = document.getElementById('product-grid');
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const paymentModal = document.getElementById('payment-modal');
    const closeButtons = document.querySelectorAll('.modal .close-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const checkoutButton = document.getElementById('checkout-button');

    let cart = [];

    // Function to render products
    function renderProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                addToCart(productId);
            });
        });
    }

    // Add to Cart function
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCartUI();
            cartModal.classList.add('active'); // Open cart modal when item is added
        }
    }

    // Remove from Cart function
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
    }

    // Update Cart UI
    function updateCartUI() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
            checkoutButton.disabled = true;
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                    </div>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
            checkoutButton.disabled = false;
        }
        cartTotalAmount.textContent = `$${total.toFixed(2)}`;

        // Add event listeners to new remove buttons
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.remove-item-btn').dataset.id);
                removeFromCart(productId);
            });
        });
    }

    // Modal functionality
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.classList.add('active');
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('active');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target == cartModal) {
            cartModal.classList.remove('active');
        }
        if (e.target == paymentModal) {
            paymentModal.classList.remove('active');
        }
    });

    checkoutButton.addEventListener('click', () => {
        cartModal.classList.remove('active');
        paymentModal.classList.add('active');
    });

    // Dummy payment form submission
    const creditCardForm = document.getElementById('credit-card-form');
    if (creditCardForm) {
        creditCardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Payment successful! (This is a dummy payment simulation.)');
            paymentModal.classList.remove('active');
            cart = []; // Clear cart after dummy payment
            updateCartUI();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll animations
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // Initial render
    renderProducts();
    updateCartUI();
});