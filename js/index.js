class Bike {
    constructor(id, nombre, precio, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

class ElementoCarrito {
    constructor(bici, cantidad) {
        this.bici = bici;
        this.cantidad = cantidad;
    }
}

//Constantes

const estandarDolaresAmericanos = Intl.NumberFormat('en-US');

//Arrays de bicis
const bicis = [];
const elementosCarrito = [];

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");

//Ejecución de funciones

cargarBicis();
cargarCarrito();
dibujarCarrito();
dibujarCatalogoBicis();

//Definiciones de funciones

function cargarBicis() {
    bicis.push(new Bike(1231, 'Santa Cruz V10', 5000, './img/SantaCruzV10.png'));
    bicis.push(new Bike(1232, 'Santa Cruz Bronson', 7000, './img/SantaCruzBronson.png'));
    bicis.push(new Bike(1233, 'Santa Cruz Bullit', 6000, './img/SantaCruzBullit.png'));
    bicis.push(new Bike(1234, 'Juliana Roubion', 5500, './img/JulianaRoubion.png'));
    bicis.push(new Bike(1235, 'Juliana Furtado', 4000, './img/JulianaFurtado.png'));
    bicis.push(new Bike(1236, 'Juliana Joplin', 6500, './img/JulianaJoplin.png'));
    bicis.push(new Bike(1237, 'Trek Marlin 5', 4500, './img/TrekMarlin5.png'));
    bicis.push(new Bike(1238, 'Trek X-Caliber 8', 7000, './img/TrekXCaliber8.png'));
    bicis.push(new Bike(1239, 'Trek Marlin 6', 5500, './img/TrekMarlin6.png'));
}

function cargarCarrito() {
    /*let elementoCarrito = new ElementoCarrito(
        new Bike(1231, 'Santa Cruz V10', 5000, './img/SantaCruzV10.png'),
        1
    );

    elementosCarrito.push(elementoCarrito);*/
}

function dibujarCarrito() {

    let sumaCarrito = 0;
    contenedorCarritoCompras.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td>${elemento.bici.id}</td>
                <td>${elemento.bici.nombre}</td>
                <td><input id="cantidad-producto-${elemento.bici.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                <td>$ ${elemento.bici.precio}</td>
                <td>$ ${estandarDolaresAmericanos.format(elemento.bici.precio*elemento.cantidad)}</td>
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito+=elemento.cantidad*elemento.bici.precio;

            //Evento carrito
            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.bici.id}`);
            
            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });

        }
    );

    //contenedor CarritoCompras
    
    if(elementosCarrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">El carrito está vacío</th>
        `;
    } else {
        contenedorFooterCarrito.innerHTML = `
            <th scope="row" colspan="5">Total de la compra: $${estandarDolaresAmericanos.format(sumaCarrito)}</th>
        `;
    }

}

let finalizar=document.getElementById("comprarAhora");
finalizar.onclick=()=>{
    Swal.fire({
        title: '¡Pedido confirmado!',
        text: 'Estamos preparando todo para el envío.',
    });
}


function crearCard(bici) {
    //Button
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-dark";
    botonAgregar.innerText = "Agregar";

    //Card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${bici.nombre}</h5>
        <p>$ ${bici.precio} USD</p>
    `;
    cuerpoCarta.append(botonAgregar);

    //Imagen
    let imagen = document.createElement("img");
    imagen.src = bici.foto;
    imagen.className = "card-img-top";
    imagen.alt = bici.nombre;

    //Card
    let carta = document.createElement("div");
    carta.className = "card m-2 p-2";
    carta.style = "width: 18rem";
    carta.append(imagen);
    carta.append(cuerpoCarta);


    //Eventos
    botonAgregar.onclick = () => {
      

        let elementoCarrito = new ElementoCarrito(bici, 1);
        elementosCarrito.push(elementoCarrito);

        dibujarCarrito();

        swal({
            title: "¡Bici agregada!",
            text: `${bici.nombre} se agregó al carrito de compra.`,
            icon: "success",
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false
                },
                carrito: {
                    text: "Ver carrito",
                    value: true
                }
            }
        }).then((irACarrito) => {

            if(irACarrito) {
                //swal("Ir al carrito");
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);

            }
        });

    } 
    
    return carta;

}

function dibujarCatalogoBicis() {
    contenedorProductos.innerHTML = "";

    bicis.forEach(
        (bici) => {
            let contenedorCarta = crearCard(bici);
            contenedorProductos.append(contenedorCarta);
        }
    );

}


//E. de teclado
let campoNombre=document.getElementById("nombre");

campoNombre.oninput=()=>{
    if(isNaN(campoNombre.value)){
        campoNombre.style.color="black";
    }else{
        campoNombre.style.color="red";
    }
}

//E. Submit
let formulario=document.getElementById("formulario");
formulario.addEventListener("submit",validarFormulario);

function validarFormulario(ev){
    if((campoNombre.value=="")||(!isNaN(campoNombre.value))){
        ev.preventDefault();
        Swal.fire("Ingrese nombre válido");
    }
}


//Fetch

function obtenerJsonLocal(){
    const URLJSON="users.json";
    fetch(URLJSON)
        .then( resp => resp.json())
        .then( data => {
            console.log(data.usuarios);
        })
}

obtenerJsonLocal();