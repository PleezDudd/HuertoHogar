document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const msg = document.getElementById('mensaje');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const usuario = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!usuario || !email || !password || !confirmPassword) {
            msg.textContent = 'Por favor, complete todos los campos.';
            msg.style.color = 'red';
            return;
        }
        if (password !== confirmPassword) {
            msg.textContent = 'Las contraseñas no coinciden.';
            msg.style.color = 'red';
            return;
        }
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.some(user => user.email === email)) {
            msg.textContent = 'El correo ya está registrado.';
            msg.style.color = 'red';
        } else {
            usuarios.push({ usuario, email, password });
            console.log("guardando usuario", usuarios);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            msg.textContent = 'Registro exitoso.';
            msg.style.color = 'green';
            form.reset();
        }
 })
});