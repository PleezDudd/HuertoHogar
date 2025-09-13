// Funciones para el manejo del carrito de compras

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contenedor = document.getElementById('carrito-lista');
  const miniLista = document.getElementById('mini-lista');
  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>El carrito está vacío.</p>';
    if (miniLista) miniLista.innerHTML = '<li>— (Aún no agregas productos)</li>';
    document.getElementById('carrito-total').innerText = '$0 CLP';
    actualizarContadorCarrito();
    return;
  }

  if (miniLista) {
    miniLista.innerHTML = carrito.map(producto => `
      <li>${producto.nombre} x${producto.cantidad}</li>
    `).join('');
  }

  contenedor.innerHTML = `
    <div class="grid-productos">
      ${carrito.map(producto => {
        const precioMatch = producto.precio.match(/\d{1,3}(?:\.\d{3})*|\d+/);
        const precioNum = precioMatch ? parseInt(precioMatch[0].replace(/\./g, '')) : 0;
        total += precioNum * producto.cantidad;
        return `
          <article class="producto">
            <img src="${producto.img}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p class="precio">${producto.precio}</p>
            <div style="display:flex;align-items:center;gap:8px;">
              <span>Cantidad: ${producto.cantidad}</span>
            </div>
            <button class="btn btn-primary btn-eliminar" data-id="${producto.id}">Eliminar</button>
          </article>
        `;
      }).join('')}
    </div>
  `;

  document.getElementById('carrito-total').innerText = `$${total.toLocaleString('es-CL')} CLP`;
  actualizarContadorCarrito();

  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = this.getAttribute('data-id');
      eliminarProducto(id);
    });
  });
}

function eliminarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(producto => producto.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const totalCantidad = carrito.reduce((sum, prod) => sum + prod.cantidad, 0);
  const contador = document.getElementById('carrito-contador');
  if (contador) contador.innerText = totalCantidad;
}

// Inicializar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  mostrarCarrito();
});
