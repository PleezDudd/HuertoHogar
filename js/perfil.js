document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos del usuario (ya verificamos que existe en el script anterior)
    const usuarioActualStr = localStorage.getItem('usuarioActual');
    const perfilInfo = document.getElementById('perfil-info');
    
    if (!perfilInfo) {
        console.error('No se encontró el elemento perfil-info');
        return;
    }
    
    let usuarioActual = null;
    try {
        usuarioActual = JSON.parse(usuarioActualStr);
    } catch (e) {
        console.error('Error al parsear usuario actual:', e);
        // Si hay error, redirigir al login
        window.location.href = './Registro.html';
        return;
    }
    
    // Mostrar los datos del usuario
    perfilInfo.innerHTML = `
        <div class="profile-data">
            <div class="profile-field">
                <label>ID de Usuario:</label>
                <span>${usuarioActual.id || 'No disponible'}</span>
            </div>
            <div class="profile-field">
                <label>Nombre de Usuario:</label>
                <span>${usuarioActual.usuario || 'No disponible'}</span>
            </div>
            <div class="profile-field">
                <label>Correo Electrónico:</label>
                <span>${usuarioActual.email || 'No disponible'}</span>
            </div>
            <div class="profile-field">
                <label>Rol:</label>
                <span class="role-badge ${(usuarioActual.rol || 'usuario').toLowerCase()}">${usuarioActual.rol || 'Usuario'}</span>
            </div>
            <div class="profile-field">
                <label>Dirección:</label>
                <span>${usuarioActual.address || 'No especificada'}</span>
            </div>
            <div class="profile-field">
                <label>Teléfono:</label>
                <span>${usuarioActual.phone || 'No especificado'}</span>
            </div>
        </div>
        <div class="profile-actions">
            <button class="btn btn-outline" onclick="editarPerfil()">Editar Perfil</button>
            <button class="btn btn-danger" onclick="cerrarSesion()">Cerrar Sesión</button>
        </div>
    `;
});

// Función para editar perfil (placeholder)
function editarPerfil() {
    alert('Función de editar perfil próximamente disponible');
}

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('usuarioActual');
        localStorage.removeItem('sesionActiva');
        window.location.href = './Index.html';
    }
}
