//DATOS DE LOS PRODUCTOS

const productos = [
  {
    id: 1,
    nombre: "Top Performance V2",
    precio: 45.0,
    imagen: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  },
  {
    id: 2,
    nombre: "Short Compresión Elite",
    precio: 38.0,
    imagen: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e",
  },
  {
    id: 3,
    nombre: "Zapatillas Velocity X",
    precio: 115.0,
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
];

// 🔹 CARRITO
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//RENDERIZAMOS DE LOS PRODUCTOS
function renderProductos() {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  productos.forEach((prod) => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card bg-dark text-white h-100">
          <img src="${prod.imagen}" class="card-img-top">
          <div class="card-body">
            <h5>${prod.nombre}</h5>
            <p>$${prod.precio.toFixed(2)}</p>

            <button class="btn btn-light add-cart"
              data-name="${prod.nombre}"
              data-price="${prod.precio}">
              AGREGAR AL CARRITO
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

//ACTUALIZAR CONTADOR
function updateCartUI() {
  const count = document.getElementById("cart-count");
  if (count) count.textContent = cart.length;
}

//EVENTO GLOBAL
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-cart")) {
    const product = {
      name: e.target.dataset.name,
      price: Number(e.target.dataset.price),
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUI();
    renderCheckout();

    // feedback visual
    e.target.textContent = "✔ Agregado";
    setTimeout(() => {
      e.target.textContent = "AGREGAR AL CARRITO";
    }, 1000);
  }
});

//RENDERIZAMOS EL CHECKOUT
function renderCheckout() {
  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  if (!container || !totalEl) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    container.innerHTML += `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
      </div>
    `;
  });

  totalEl.textContent = total.toFixed(2);
}

//FUNCION DEL CHECKOUT
function checkout() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) {
    alert("Completa todos los campos");
    return;
  }

  if (cart.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  // guardar orden
  localStorage.setItem("lastOrder", JSON.stringify(cart));

  // limpiar carrito
  localStorage.removeItem("cart");
  cart = [];

  updateCartUI();
  renderCheckout();

  alert("✅ Compra realizada exitosamente");
}

//NAVBAR SCROLL
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ===============================
// 🔹 INIT APP
// ===============================
function initApp() {
  renderProductos();
  updateCartUI();
  renderCheckout();

  // iconos
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

window.addEventListener("load", initApp);