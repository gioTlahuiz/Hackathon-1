// botones de funcionalidades, por ejemplo una alerta cuando el usuario de click en el icono de carrito de compra
function initApp() {
  // Inicializar Lucide
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Navbar dinámico
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (window.scrollY > 80) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Animaciones de revelado al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  // Manejo del formulario (evitar recarga de página)
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = e.target.querySelector("button");
    btn.textContent = "¡ENVIADO CON ÉXITO!";
    alert("Mensaje Enviado Exitosamente")
    btn.style.backgroundColor = "#4CAF50";
    btn.style.color = "white";
    btn.style.borderColor = "#4CAF50";
    e.target.reset();
  });
}

// Carga segura
window.addEventListener("load", initApp);


// esto es pueba 
const productos = [
  {
    id: 1,
    nombre: "Top Performance V2",
    precio: 45.00,
    imagen: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    categoria: "ropa"
  },
  {
    id: 2,
    nombre: "Short Compresión Elite",
    precio: 38.00,
    imagen: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop",
    categoria: "ropa"
  },
  {
    id: 3,
    nombre: "Zapatillas Velocity X",
    precio: 115.00,
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop",
    categoria: "calzado"
  },
  {
    id: 4,
    nombre: "Mancuernas Pro 10kg",
    precio: 60.00,
    imagen: "https://images.unsplash.com/photo-1599058917214-0c8f9c7f3c3c?q=80&w=800",
    categoria: "pesas"
  }
];

//

function renderProductos(lista) {
  const contenedor = document.querySelector('.grid-products');
  contenedor.innerHTML = ""; // limpiar antes de renderizar

  lista.forEach(prod => {
    contenedor.innerHTML += `
      <div class="card reveal">
        <div class="card-img">
          <img src="${prod.imagen}" alt="${prod.nombre}">
        </div>
        <div class="card-info">
          <h3>${prod.nombre}</h3>
          <p>$${prod.precio.toFixed(2)}</p>
        </div>
      </div>
    `;
  });
}

// Render inicial
renderProductos(productos);