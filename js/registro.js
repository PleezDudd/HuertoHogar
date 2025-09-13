document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const msg = document.getElementById('mensaje');

    // Si hay datos en el localStorage, cargarlos
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Formulario de registro
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const usuario = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();

        // Validación de campos
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

        // Verificar si el email ya está registrado
        if (usuarios.some(user => user.email === email)) {
            msg.textContent = 'El correo ya está registrado.';
            msg.style.color = 'red';
        } else {
            // Asignar un ID único
            const id = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

            // Guardar el nuevo usuario con los nuevos atributos
            usuarios.push({ id, usuario, email, password, address, phone, rol: 'Usuario' });
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            msg.textContent = 'Registro exitoso.';
            msg.style.color = 'green';
            form.reset();
        }
    });

    // Función para eliminar usuario
    window.eliminarUsuario = (id) => {
        usuarios = usuarios.filter(usuario => usuario.id !== id);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        mostrarUsuarios(); // Actualizar la lista después de eliminar
    };

    // Función para editar usuario
    window.editarUsuario = (id) => {
        // Redirigir a la página de editar usuario pasando el ID en la URL
        window.location.href = `editar_usuario.html?id=${id}`;
    };

    // Función para mostrar los usuarios
    const mostrarUsuarios = () => {
        const listaUsuarios = document.getElementById('usuarios-lista');
        listaUsuarios.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

        if (usuarios.length > 0) {
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
                <tbody>
            `;

            // Mostrar los usuarios en la tabla
            usuarios.forEach(usuario => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.rol || 'Usuario'}</td>
                    <td>${usuario.address}</td>
                    <td>${usuario.phone}</td>
                    <td>
                        <button class="btn btn-outline" onclick="editarUsuario(${usuario.id})">Editar</button>
                        <button class="btn btn-outline" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                    </td>
                `;
                tabla.querySelector('tbody').appendChild(fila);
            });

            tabla.innerHTML += '</tbody>';
            listaUsuarios.appendChild(tabla);
        } else {
            listaUsuarios.innerHTML = '<p>No hay usuarios registrados.</p>';
        }
    };

    // Mostrar los usuarios al cargar la página
    mostrarUsuarios();
});