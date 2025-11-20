# 🛍️ Tienda LAPRADA – Proyecto Final

Este proyecto es una tienda online desarrollada como parte de un trabajo práctico final. Está construida con **HTML**, **CSS**, **JavaScript**, **Bootstrap** y funcionalidades dinámicas hechas desde cero.

La página simula un e-commerce real con un catálogo de productos, slider navegable, carrito de compras persistente, formulario de contacto funcional mediante Formspree y un diseño responsive.

---

## Características principales

###  **1. Slider dinámico de productos**
- Muestra una lista de productos cargados desde un array en `script.js`.
- Se puede navegar con flechas izquierda/derecha.
- Cada producto incluye imagen, título, precio y botón *Comprar*.

###  **2. Carrito de compras funcional**
- Los productos se agregan al carrito con el botón *Comprar*.
- El carrito se guarda en **localStorage** para persistencia.
- Modal con detalle del carrito: imagen, nombre, precio y cantidad.
- Permite eliminar productos.
- Muestra el total en tiempo real.

###  **3. Notificaciones tipo toast**
- Cada vez que un producto se agrega al carrito, aparece un mensaje visual.
- También se muestran mensajes de éxito o error del formulario.

###  **4. Formulario de contacto operativo**
- Enviado mediante **Formspree (modo free)**.
- Valida campos obligatorios.
- Muestra notificaciones de envío.
- Código optimizado usando `FormData()`.

###  **5. Diseño responsive y moderno**
- Estilos hechos con CSS personalizado y Bootstrap 5.
- Header con menú adaptable (nav responsive).
- Secciones ordenadas: Hero, Productos, Reseñas, Contacto y Footer.

---

##  Estructura del proyecto
