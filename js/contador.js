// Función para actualizar el contador del carrito en todas las páginas
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const totalCantidad = carrito.reduce((sum, prod) => sum + prod.cantidad, 0);
  const contador = document.getElementById('carrito-contador');
  if (contador) contador.innerText = totalCantidad;
}

// Actualizar el contador cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  actualizarContadorCarrito();
});

// Escuchar cambios en el localStorage para actualizar el contador en tiempo real
window.addEventListener('storage', function(e) {
  if (e.key === 'carrito') {
    actualizarContadorCarrito();
  }
});