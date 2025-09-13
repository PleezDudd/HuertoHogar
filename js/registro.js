document.addEventListener('DOMContentLoaded', () => {

    // Leer usuarios desde localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // --- FORMULARIO (solo si existe) ---
    const form = document.getElementById('registroForm');
    const msg = document.getElementById('mensaje');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const usuario = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const address = document.getElementById('address').value.trim();
            const phone = document.getElementById('phone').value.trim();

            // Validación
            if (!usuario || !email || !password || !confirmPassword || !address || !phone) {
                msg.textContent = 'Por favor, complete todos los campos.';
                msg.style.color = 'red';
                return;
            }
            if (password !== confirmPassword) {
                msg.textContent = 'Las contraseñas no coinciden.';
                msg.style.color = 'red';
                return;
            }
            if (usuarios.some(u => u.email === email)) {
                msg.textContent = 'El correo ya está registrado.';
                msg.style.color = 'red';
                return;
            }

            // Asignar ID
            const id = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

            // Guardar usuario
            usuarios.push({ id, usuario, email, password, address, phone, rol: 'Usuario' });
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            msg.textContent = 'Registro exitoso.';
            msg.style.color = 'green';
            form.reset();

            // Actualizar tabla si existe contenedor
            mostrarUsuarios();
        });
    }

    // --- FUNCIONES PARA LA TABLA DE USUARIOS ---
    const mostrarUsuarios = () => {
        const listaUsuarios = document.getElementById('usuarios-lista');
        if (!listaUsuarios) return; // Si no existe el contenedor, salir

        // Siempre leer del localStorage
        usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        listaUsuarios.innerHTML = '';

        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = '<p>No hay usuarios registrados.</p>';
            return;
        }

        const tabla = document.createElement('table');
        tabla.classList.add('tabla');
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        const tbody = tabla.querySelector('tbody');

        usuarios.forEach(u => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${u.id || ''}</td>
                <td>${u.usuario || ''}</td>
                <td>${u.email || ''}</td>
                <td>${u.rol || 'Usuario'}</td>
                <td>${u.address || '-'}</td>
                <td>${u.phone || '-'}</td>
                <td>
                    <button class="btn btn-outline" onclick="editarUsuario(${u.id})">Editar</button>
                    <button class="btn btn-outline" onclick="eliminarUsuario(${u.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });

        listaUsuarios.appendChild(tabla);
    };

    // --- ELIMINAR Y EDITAR ---
    window.eliminarUsuario = (id) => {
        usuarios = usuarios.filter(u => u.id !== id);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        mostrarUsuarios();
    };

    window.editarUsuario = (id) => {
        window.location.href = `editar_usuario.html?id=${id}`;
    };

    // --- Mostrar usuarios al cargar la página ---
    mostrarUsuarios();
});