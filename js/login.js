document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const msg = document.getElementById("loginMensaje");


    if (!localStorage.getItem("usuarios")) {
    const usuarios = [
        { 
            id: 1,
            usuario: "Test User",
            email: "test@correo.com", 
            password: "1234",
            rol: "Usuario",
            address: "Calle Falsa 123",
            phone: "+56911111111"
        },
        { 
            id: 2,
            usuario: "Admin",
            email: "admin@empresa.com", 
            password: "admin",
            rol: "Administrador",
            address: "Av. Principal 1000",
            phone: "+56922222222"
        }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

    
    form.addEventListener("submit", function (e) {
        e.preventDefault(); 
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const usuarios = JSON.parse(localStorage.getItem("usuarios"));
        const usuario = usuarios.find(user => user.email === email && user.password === password);
        if (usuario) {
            msg.textContent = "Inicio de sesión exitoso.";
            msg.style.color = "green";

            // Guardar información del usuario logueado (sin contraseña)
            const usuarioLogueado = {
                id: usuario.id,
                usuario: usuario.usuario,
                email: usuario.email,
                rol: usuario.rol,
                address: usuario.address,
                phone: usuario.phone
            };
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioLogueado));
            localStorage.setItem('sesionActiva', 'true');

            // Redirección si es admin
            if (email === "admin@empresa.com") {
                window.location.href = "./admin/home.html"; // Redirige al home del admin
            } else {
                window.location.href = "./Perfil.html"; // Redirige al perfil del usuario
            }

        } else {
            msg.textContent = "Correo o contraseña incorrectos.";
            msg.style.color = "red";
        }

        form.reset();
    });
});
