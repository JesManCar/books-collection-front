const btnUsers = document.getElementById("btnUsers");
const btnBooks = document.getElementById("btnBooks");
const container = document.getElementById("container");
/* LOADER */
const loader = document.getElementById('loader');
const content = document.getElementById('content');

function getUsers(){
    const url = "http://localhost:4000/users";
    loader.style.display = 'block';
    container.innerHTML = "";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(user => {
                container.innerHTML += `
                    <div class="card">
                    <h3>${user.nombre} ${user.apellidos}</h3>
                    <p>Email: ${user.correo}</p>
                    <h5>Coleccion:</h5>
                    ${user.coleccion.map(book => `<p class="book">${book}</p>`).join("")}
                    <h5>Wishlist:</h5>
                    ${user.wishlist.map(book => `<p class="book">${book}</p>`).join("")}
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("Error:", error);
            container.innerHTML = "<p>Error al cargar los datos</p>";
        })
        /* FINALLY: Promesa que se ejecuta siempre, da igual si termina en error o de forma correcta*/
        .finally(() => {
            loader.style.display = 'none';
        });
}
function getBooks(){
    const url = "http://localhost:4000/books";
    loader.style.display = 'block';
    container.innerHTML = "";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(book => {
                container.innerHTML += `
                    <div class="card">
                    <h3>${book.titulo}</h3>
                    <div class="img-container">
                    <img src="${book.imagen}" alt="${book.titulo}"></img>
                    </div>
                    <p>Autor: ${book.autor}</p>
                    <p>Fecha: ${book.fechaPublicacion}</p>
                `;
            });
        })
        .catch(error => {
            console.error("Error:", error);
            container.innerHTML = "<p>Error al cargar los datos</p>";
        })
        /* FINALLY: Promesa que se ejecuta siempre, da igual si termina en error o de forma correcta*/
        .finally(() => {
            loader.style.display = 'none';
        });
}


btnUsers.addEventListener("click", getUsers);
btnBooks.addEventListener("click", getBooks);