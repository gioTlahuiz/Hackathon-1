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
    btn.style.backgroundColor = "#4CAF50";
    btn.style.color = "white";
    btn.style.borderColor = "#4CAF50";
    e.target.reset();
  });
}

// Carga segura
window.addEventListener("load", initApp);
