document.addEventListener('DOMContentLoaded', function() {
    // Función para cerrar sesión
    function cerrarSesion() {
        // Limpiar cualquier dato de sesión almacenado
        localStorage.removeItem('usuarioActual');
        localStorage.removeItem('sesionActiva');
        
        // Mostrar mensaje de confirmación
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            // Redirigir al index principal
            window.location.href = '../Index.html';
        }
    }

    // Buscar el enlace de cerrar sesión en el menú
    const logoutLink = document.querySelector('a[href="#"]:last-child');
    if (logoutLink && logoutLink.textContent.trim() === 'Cerrar sesión') {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            cerrarSesion();
        });
    }

    // También buscar cualquier elemento con id o clase relacionada con logout
    const logoutButton = document.getElementById('logout') || document.querySelector('.logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            cerrarSesion();
        });
    }
});
