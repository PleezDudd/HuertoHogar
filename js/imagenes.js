
    /* ===== LÓGICA MÁS SENCILLA POSIBLE: CLICK PARA INTERCAMBIAR =====
       Al hacer click en una miniatura: se intercambia su src con el de la imagen principal.
       (Funciona perfecto en móvil y escritorio, sin hover).
    */
    function intercambiar(imgThumb) {
      const main = document.getElementById('main-img');
      const tmp = main.src;
      main.src = imgThumb.src;
      imgThumb.src = tmp;
    }

    // Actualiza el contador del carrito
    function actualizarContadorCarrito() {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const totalCantidad = carrito.reduce((sum, prod) => sum + prod.cantidad, 0);
      const contador = document.getElementById('carrito-contador');
      if (contador) contador.innerText = totalCantidad;
    }

    // Datos de productos
    const productos = {
      FR001: {
        nombre: "Manzanas Fuji",
        precio: "$1.200 CLP / kg",
        img: "img/Manzanas.png",
        imagenes: ["img/Manzanas.png", "img/Manzanas2.png", "img/Manazanas3.png", "img/Manzanas4.png"],
        descripcion: " Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.",
        max: 150
      },
      FR002: {
        nombre: "Naranjas Valencia",
        precio: "$1.000 CLP / kg",
        img: "img/Naranjas.png",
        imagenes: ["img/Naranjas.png", "img/Naranjas2.png", "img/Naranjas3.png", "img/Naranjas4.jpg"],
        descripcion: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.",
        max: 200
      },
      FR003: {
        nombre: "Plátanos Cavendish",
        precio: "$800 CLP / kg",
        img: "img/Platanos.png",
        imagenes: ["img/Platanos.png", "img/Platanos2.png", "img/Platanos.png", "img/Platanos4.png"],
        descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.",
        max: 250
      },
      VR001: {
        nombre: "Zanahorias Orgánicas", precio: "$900 CLP / kg", img: "img/Zanahorias.png",
        imagenes: ["img/Zanahorias.png", "img/Zanahorias2.png", "img/Zanahorias3.png", "img/Zanahorias4.png"],
        descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable", max: 100
      },
      VR002: {
        nombre: "Espinacas Frescas", precio: "$700 CLP / bolsa de 500g", img: "img/Espinacas.png",
        imagenes: ["img/Espinacas.png", "img/Espinacas2.png", "img/Espinacas3.png", "img/Espinacas4.png"],
        descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.", max: 80
      },
      VR003: {
        nombre: "Pimientos Tricolores", precio: "$1.500 CLP / kg", img: "img/Pimientos.png",
        imagenes: ["img/Pimientos.png", "img/Pimientos2.png", "img/Pimientos3.png", "img/Pimientos4.jpg"],
        descripcion: " Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta.", max: 120
      },
      PO001: {
        nombre: "Miel Orgánica", precio: "$5.000 CLP por frasco de 500g", img: "img/Miel.png",
        imagenes: ["img/Miel.png", "img/Miel2.png", "img/Miel3.jpg", "img/Miel4.jpg"],
        descripcion: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.", max: 50
      }
    };

    // Obtener el ID del producto de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const producto = productos[id];

    // Render miniaturas para el producto actual (con click)
    function renderMiniaturasProducto(producto) {
      const cont = document.getElementById('miniaturas');
      if (!cont) return;

      const imgs = (producto.imagenes && producto.imagenes.length) ? producto.imagenes : [producto.img];
      const thumbs = imgs.slice(1); // miniaturas (omitimos la principal)

      cont.innerHTML = thumbs.map((src, i) =>
        `<img src="${src}" alt="${producto.nombre}" class="img-thumb"
              style="width:60px;height:60px;object-fit:cover;border-radius:8px;cursor:pointer;"
              onclick="intercambiar(this)">`
      ).join('');
    }

    // Relacionados (excluye el producto actual)
    function renderRelacionados(productos, idActual) {
      const relacionados = Object.entries(productos)
        .filter(([pid]) => pid !== idActual)
        .slice(0, 4)
        .map(([pid, prod]) =>
          `<a href="Detalle_productos.html?id=${pid}" style="text-decoration:none;color:inherit;">
             <div class="producto" style="height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1px solid #ddd;border-radius:8px;padding:10px;cursor:pointer;">
               <img src="${prod.img}" alt="${prod.nombre}" style="width:80px;height:80px;">
               <p style="margin-top:8px;font-size:0.9em;text-align:center;">${prod.nombre}</p>
             </div>
           </a>`
        ).join('');
      document.getElementById('relacionados').innerHTML = relacionados;
    }

    if (producto) {
      // Imagen principal por defecto
      const principal = (producto.imagenes && producto.imagenes.length > 0) ? producto.imagenes[0] : producto.img;
      const main = document.getElementById('main-img');
      main.src = principal;
      main.alt = producto.nombre;

      // Texto e info
      document.getElementById('nombre-producto').innerText = producto.nombre;
      document.getElementById('precio-producto').innerText = producto.precio;
      document.getElementById('desc-producto').innerText = producto.descripcion;
      document.getElementById('cantidad').max = producto.max;
      document.getElementById('cantidad').value = 1;

      // Botón carrito
      document.getElementById('agregar-carrito').onclick = function () {
        const cantidad = Math.max(1, Math.min(parseInt(document.getElementById('cantidad').value), producto.max));
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const existente = carrito.find(p => p.id === id);
        if (existente) {
          existente.cantidad = Math.min(existente.cantidad + cantidad, producto.max);
        } else {
          carrito.push({ id, nombre: producto.nombre, precio: producto.precio, img: producto.img, cantidad });
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
      };

      // Render
      renderMiniaturasProducto(producto);   // miniaturas con click
      renderRelacionados(productos, id);    // relacionados
    }

    actualizarContadorCarrito();