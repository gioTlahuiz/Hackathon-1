// Variable global para las animaciones
let revealObserver;

function initApp() {
  // Inicializar Lucide
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Navbar dinámico
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (nav) {
      if (window.scrollY > 80) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }
  });

  // Animaciones de revelado al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  // Manejo del formulario de contacto
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showModal();
      e.target.reset();
    });
  }

  // Eventos de cierre de modal (Contacto)
  const closeModalBtn = document.getElementById("closeModal");
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  
  const okBtn = document.getElementById("okBtn");
  if (okBtn) okBtn.addEventListener("click", closeModal);
  
  // Eventos de cierre de modal (Checkout)
  const closeCheckoutBtn = document.getElementById("closeCheckout");
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener("click", closeCheckoutModal);

  window.addEventListener("click", (e) => {
    const modalSuccess = document.getElementById("successModal");
    const modalCheckout = document.getElementById("checkoutModal");
    if (e.target === modalSuccess) closeModal();
    if (e.target === modalCheckout) closeCheckoutModal();
  });

  // Funcionalidad de icono de carrito (ABRIR MODAL)
  const cartIconContainer = document.getElementById("cart-icon-container");
  if (cartIconContainer) {
    cartIconContainer.addEventListener("click", openCheckoutModal);
  }

  // --- INICIALIZACIÓN DE PRODUCTOS Y CARRITO ---
  renderProductos(productos);
  updateCartUI();
  renderCheckout();

  // --- INICIALIZACIÓN DEL CARRUSEL ---
  initCarousel();
}

// FUNCIONES DEL MODAL DE CONTACTO
function showModal() {
  const modal = document.getElementById("successModal");
  if (!modal) return;
  modal.style.display = "block";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0,0,0,0.8)";
  modal.style.zIndex = "2000";
  const content = modal.querySelector(".modal-content");
  if (content) {
    content.style.background = "#283593"; 
    content.style.color = "#fff";
    content.style.margin = "15% auto";
    content.style.padding = "40px";
    content.style.borderRadius = "12px";
    content.style.width = "90%";
    content.style.maxWidth = "500px";
    content.style.textAlign = "center";
    content.style.boxShadow = "0 8px 16px rgba(0,0,0,0.5)";
    content.style.border = "3px solid #64b5f6";
  }
}

function closeModal() {
  const modal = document.getElementById("successModal");
  if (modal) modal.style.display = "none";
}

// FUNCIONES MODAL CHECKOUT
function openCheckoutModal() {
    const modal = document.getElementById("checkoutModal");
    if (modal) {
        modal.style.display = "block";
        document.body.classList.add('modal-open-blur');
    }
}

function closeCheckoutModal() {
    const modal = document.getElementById("checkoutModal");
    if (modal) {
        modal.style.display = "none";
        document.body.classList.remove('modal-open-blur');
    }
}

// FUNCIONES DEL CARRUSEL
function initCarousel() {
  const carousel = document.querySelector('#carouselCards');
  if (carousel) {
    new bootstrap.Carousel(carousel, {
      interval: 3000,
      wrap: true
    });
  }
}

// Carga segura de la app
window.addEventListener("load", initApp);


// --- DATOS DEL CATÁLOGO ---
const productos = [
  { id: 1, nombre: "HACKATHON Camiseta", precio: 25.00, imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600" },
  { id: 2, nombre: "Veloce Black Edition", precio: 35.00, imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600" },
  { id: 3, nombre: "Velocity X Tenis", precio: 120.00, imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600" },
  { id: 4, nombre: "Top Performance V2", precio: 45.00, imagen: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600" },
  { id: 5, nombre: "Short Compresión Elite", precio: 38.00, imagen: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600" },
  { id: 6, nombre: "Veloce White Tee", precio: 30.00, imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProductos(lista) {
  const contenedor = document.querySelector('.grid-products');
  if(!contenedor) return;
  contenedor.innerHTML = "";

  lista.forEach(prod => {
    contenedor.innerHTML += `
      <div class="card producto-catalogo-card reveal">
        <div class="card-img">
          <img src="${prod.imagen}" alt="${prod.nombre}">
        </div>
        <div class="card-info">
          <h3>${prod.nombre}</h3>
          <p>$${prod.precio.toFixed(2)}</p>
          <button class="btn add-cart" 
            data-id="${prod.id}"
            data-name="${prod.nombre}" 
            data-price="${prod.precio}"
            style="padding: 10px 20px; font-size: 0.7rem; margin-top: 10px; width: 100%;">
            AGREGAR AL CARRITO
          </button>
        </div>
      </div>
    `;
  });

  if (revealObserver) {
    document.querySelectorAll(".producto-catalogo-card.reveal").forEach(el => {
      revealObserver.observe(el);
    });
  }
}

function updateCartUI() {
  const count = document.getElementById("cart-count");
  if (count) count.textContent = cart.length;
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-cart")) {
    const product = {
      id: e.target.dataset.id,
      name: e.target.dataset.name,
      price: Number(e.target.dataset.price),
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUI();
    renderCheckout();

    const originalText = e.target.textContent;
    e.target.textContent = "✔ Agregado";
    e.target.style.backgroundColor = "#4CAF50";
    e.target.disabled = true;
    setTimeout(() => {
      e.target.textContent = originalText;
      e.target.style.backgroundColor = "var(--primary)";
      e.target.disabled = false;
    }, 1000);
  }
});

function renderCheckout() {
  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  if (!container || !totalEl) return;

  if (cart.length === 0) {
     container.innerHTML = '<p class="text-muted text-center py-3">El carrito está vacío.</p>';
     totalEl.textContent = "0.00";
     return;
  }

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    container.innerHTML += `
      <div class="d-flex justify-content-between align-items-center mb-2 p-2 bg-dark rounded">
        <div>
           <span class="text-white fw-bold" style="font-size:0.8rem">${item.name}</span>
        </div>
        <div class="d-flex align-items-center">
            <span class="text-primary me-2" style="font-size:0.8rem">$${item.price.toFixed(2)}</span>
            <button class="btn btn-sm btn-danger p-1" onclick="removeFromCart(${index})" style="line-height:1; font-size:0.7rem;">&times;</button>
        </div>
      </div>
    `;
  });

  totalEl.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
  renderCheckout();
}

function checkout() {
  const name = document.getElementById("checkout-name").value;
  const email = document.getElementById("checkout-email").value;

  if (cart.length === 0) {
    alert("❌ Tu carrito está vacío.");
    return;
  }

  if (!name || !email) {
    alert("⚠️ Completa tu nombre y correo para el envío.");
    return;
  }

  alert(`✅ ¡Gracias por tu compra, ${name}! Te hemos enviado los detalles a ${email}.`);
  
  cart = [];
  localStorage.removeItem("cart");
  
  updateCartUI();
  renderCheckout();
  document.getElementById("checkout-name").value = "";
  document.getElementById("checkout-email").value = "";
  closeCheckoutModal();
}