document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const msg = document.getElementById("loginMensaje");


    if (!localStorage.getItem("usuarios")) {
        const usuarios = [
            { email: "test@correo.com", password: "1234" },
            { email: "admin@empresa.com", password: "admin" }
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
        } else {
            msg.textContent = "Correo o contraseña incorrectos.";
            msg.style.color = "red";
        }

        form.reset();
    });
});
