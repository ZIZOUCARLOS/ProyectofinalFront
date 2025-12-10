// =======================================================
//   MENU MOBILE
// =======================================================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  document.querySelectorAll("#nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}


// =========================================
//   Cargar productos con FETCH desde JSON
// =========================================
let products = [];

async function loadProductsFromJSON() {
  try {
    const res = await fetch("producto.json");
    products = await res.json();
    loadProducts(); 
  } catch (error) {
    console.error("Error cargando productos.json", error);
  }
}



// =======================================================
//   🛒 CARRITO (localStorage)
// =======================================================
let cart = JSON.parse(localStorage.getItem("cart")) || {};

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const count = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").textContent = count;
}


// =======================================================
//   ➕ AGREGAR AL CARRITO CON CANTIDAD
// =======================================================
function addToCart(id, qty = 1) {
  const product = products.find(p => p.id === id);

  if (!cart[id]) {
    cart[id] = { ...product, qty };
  } else {
    cart[id].qty += qty;
  }

  saveCart();
  updateCartCount();
  renderCart();
  showToast("Producto agregado al carrito");
}


// =======================================================
//   🛍️ RENDER DEL CARRITO (con +, − e input number)
// =======================================================
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;

  Object.values(cart).forEach(item => {
    total += item.qty * item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <p>${item.title}</p>
        <p>$${item.price}</p>

        <div class="qty-cart">
          <button class="qty-btn minus" data-id="${item.id}">−</button>
          <input type="number" class="qty-cart-input" value="${item.qty}" min="1" data-id="${item.id}">
          <button class="qty-btn plus" data-id="${item.id}">+</button>
        </div>

        <button class="btn btn-danger btn-sm remove-btn" data-id="${item.id}">Eliminar</button>
      </div>
    `;
  });

  cartTotal.textContent = "$" + total;

  // Botón Eliminar
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = Number(e.target.dataset.id);
      delete cart[id];
      saveCart();
      updateCartCount();
      renderCart();
    });
  });

  // Botón +
  document.querySelectorAll(".plus").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = Number(e.target.dataset.id);
      cart[id].qty++;
      saveCart();
      renderCart();
      updateCartCount();
    });
  });

  // Botón −
  document.querySelectorAll(".minus").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = Number(e.target.dataset.id);
      if (cart[id].qty > 1) {
        cart[id].qty--;
      }
      saveCart();
      renderCart();
      updateCartCount();
    });
  });

  // Input manual
  document.querySelectorAll(".qty-cart-input").forEach(input => {
    input.addEventListener("change", e => {
      const id = Number(e.target.dataset.id);
      const value = Number(e.target.value);
      cart[id].qty = value < 1 ? 1 : value;
      saveCart();
      updateCartCount();
      renderCart();
    });
  });
}


// =======================================================
//   🛒 MODAL DEL CARRITO
// =======================================================
document.getElementById("openCartBtn").addEventListener("click", () => {
  document.getElementById("cartModal").style.display = "block";
  renderCart();
});

document.getElementById("closeCartBtn").addEventListener("click", () => {
  document.getElementById("cartModal").style.display = "none";
});


// =======================================================
//   🎞️ CREAR SLIDER CON INPUT NUMBER
// =======================================================
function loadProducts() {
  const slider = document.getElementById("productSlider");
  slider.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>

      <div class="qty-container">
        <label>Cantidad:</label>
        <input type="number" class="qty-input" min="1" value="1" id="qty-${product.id}">
      </div>

      <button class="buy-btn" data-id="${product.id}">Comprar</button>
    `;

    slider.appendChild(card);
  });

  // Botón comprar
  document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = Number(e.target.dataset.id);
      const qty = Number(document.getElementById(`qty-${id}`).value);
      addToCart(id, qty);
    });
  });
}


// =======================================================
//   🎚️ CONTROLES DEL SLIDER
// =======================================================
function initSliderControls() {
  const slider = document.getElementById("productSlider");
  const btnPrev = document.querySelector(".prev");
  const btnNext = document.querySelector(".next");

  if (!slider || !btnPrev || !btnNext) return;

  btnNext.addEventListener("click", () => {
    slider.scrollLeft += 300;
  });

  btnPrev.addEventListener("click", () => {
    slider.scrollLeft -= 300;
  });
}


// =======================================================
//   📩 FORMULARIO FORMSpree
// =======================================================
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  try {
    const response = await fetch("https://formspree.io/f/movajebp", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      showToast("Mensaje enviado correctamente");
      form.reset();
    } else {
      showToast("No se pudo enviar");
    }

  } catch (error) {
    showToast("Error de conexión");
  }
});


// =======================================================
//   🔔 TOAST GENERAL
// =======================================================
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}


// =======================================================
//   🚀 INICIALIZACIÓN
// =======================================================
document.addEventListener("DOMContentLoaded", () => {
  loadProductsFromJSON(); // ahora carga con fetch
  initSliderControls();
  updateCartCount();
});

