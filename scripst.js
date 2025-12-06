const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks'); 
const openCartBtn = document.getElementById('open-cart-btn');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCountEl = document.getElementById('cart-count');         
const cartItemsEl = document.getElementById('items-carrito');     
const cartTotalEl = document.getElementById('total-carrito');     

let cart = []; 

// Menú de Hamburguesa) 
if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active'); 
        burger.classList.toggle('toggle'); 
    });
}

// Carrito 
if (openCartBtn && cartDropdown) {
    document.addEventListener('click', (e) => {
        if (!cartDropdown.contains(e.target) && !openCartBtn.contains(e.target) && cartDropdown.classList.contains('show')) {
            cartDropdown.classList.remove('show');
        }
    });
    openCartBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        cartDropdown.classList.toggle('show');
    });
}
//galeria
function changeImage(imageId, newImagePath) {
    const mainImage = document.getElementById(imageId); 
    if (mainImage) {
        mainImage.src = newImagePath; 
    } else {
        console.error("Imagen principal no encontrada con el ID:", imageId);
    }
}


function addToCart(product) {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCartUI(); 
    alert(`"${product.name}" ha sido agregado al carrito.`);
}

//item en el carrito
function changeQuantity(productId, change, e) {
    if (e) e.stopPropagation(); 
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            removeFromCart(productId, e); 
        } else {
            updateCartUI();
        }
    }
}

function removeFromCart(productId, e) {
    if (e) e.stopPropagation();

    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function clearCart() {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        cart = []; 
        updateCartUI();
        cartDropdown.classList.remove('show'); 
    }
}

function updateCartUI() {
    if (!cartItemsEl || !cartTotalEl || !cartCountEl) return;

    cartItemsEl.innerHTML = ''; 
    let total = 0;
    let totalItemsInCart = 0;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('cart-item', 'cart-item-manageable');
            
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <p>${item.name}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)} c/u</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="changeQuantity(${item.id}, -1, event)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1, event)">+</button>
                    <button class="remove-item-btn" onclick="removeFromCart(${item.id}, event)">❌</button>
                </div>
            `;
            cartItemsEl.appendChild(itemEl);
            
            total += item.price * item.quantity;
            totalItemsInCart += item.quantity;
        });
    }

    cartTotalEl.textContent = total.toFixed(2);
    cartCountEl.textContent = totalItemsInCart; 
}

let slideIndex = 0;
function showSlides() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active-slide');
    });
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    
    if (slides.length > 0) {
        slides[slideIndex-1].classList.add('active-slide');
    }
    
    setTimeout(showSlides, 4000); 
}


window.changeImage = changeImage;
window.addToCart = addToCart;
window.clearCart = clearCart;
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;

document.addEventListener('DOMContentLoaded', (event) => {
    showSlides();
});

/*boton Scroll*/
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const fullHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
    const triggerPoint = fullHeight - viewportHeight - 480;

    if (currentScrollPosition >= triggerPoint) {
        scrollToTopBtn.style.display = "flex"; 
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}

window.scrollToTop = scrollToTop;

/* API CLIMA */
const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=-34.61&longitude=-58.38&current_weather=true';

fetch(apiUrl)

  .then(response => {
    if (!response.ok) {
        throw new Error('Error de red: ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    const temperatura = data.current_weather.temperature;
    const temperaturaElemento = document.getElementById('temperatura');

    if (temperaturaElemento && temperatura !== undefined) {
        temperaturaElemento.textContent = `Temperatura actual   ${temperatura}°C`;
    } else if (temperaturaElemento) {
        temperaturaElemento.textContent = 'Error: No se encontró el dato de temperatura.';
    }
  })

  .catch(error => {
    console.error('Hubo un problema con la operación fetch:', error);
    const temperaturaElemento = document.getElementById('temperatura');
    if (temperaturaElemento) {
        temperaturaElemento.textContent = 'Error al cargar el clima.';
    }
  });