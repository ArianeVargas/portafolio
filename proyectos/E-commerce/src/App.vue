<template>
  <div class="contenedor">
    <div class="carro">
      <h1>Coffe the life ❤️☕</h1>
      <a href="#" class="bx bxs-cart-alt" @click="mostrarModal = true">
        <span class="carrito-cantidad">{{ carrito.length }}</span>
      </a>
    </div>
    <div class="port"></div>
    <div class="productos">
      <h1>----- Productos populares -----</h1>
      <div class="box-contaier">
        <div v-for="(producto, index) in listaProductos" :key="index" class="box">
          <div class="imagen">
            <img :src="producto.imagenSrc" alt="" />
          </div>
          <div class="content">
            <div class="strellas">
              <i class="bx bxs-star" v-for="star in producto.estrellas" :key="star"></i>
              <i class="bx bxs-star-half"></i>
            </div>
            <h3>{{ producto.nombre }}</h3>
            <p>{{ producto.descripcion }}</p>
            <button class="btn-pe" @click="agregarAlCarrito(producto)">
              Agregar
            </button>
            <span>{{ formatoPesoColombiano(producto.precio) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <h2 class="carrito-titulo">Carrito de Compras</h2>
        <br />
        <div class="lista">
          <div v-for="(item, index) in carrito" :key="index" class="carrito-item">
            <span><img :src="item.producto.imagenSrc" /><span class="nombre">{{
              item.producto.nombre
            }}</span>
              <span class="cantidad">{{ item.cantidad }}</span>
              <span class="precio">${{ item.producto.precio }}</span></span>
            <button class="eliminar" @click="eliminarDelCarrito(index)">
              Eliminar
            </button>
          </div>
        </div>
        <p class="carrito-total">Total compra: {{ formatoPesoColombiano(calcularTotal()) }}</p>
        <div class="bot">
          <button class="cerrar" @click="mostrarModal = false">Cerrar</button>
          <button class="cerrar" @click="vaciarCarrito">
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Creado por - Ariane Vargas 2023</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import "boxicons/css/boxicons.min.css";

let carrito = ref([]);
let mostrarModal = ref(false);

let listaProductos = ref([
  {
    imagenSrc: "src/assets/pro1.jpg",
    estrellas: [1, 2, 3, 4],
    nombre: "Caffe expreso",
    descripcion: "Aromas a chocolate de fermentacion natural",
    precio: 12000,
  },
  {
    imagenSrc: "src/assets/pro2.jpg",
    estrellas: [1, 2, 3],
    nombre: "Cafe expreso",
    descripcion: "Aromas a miel de fermentacion natural",
    precio: 9900,
  },
  {
    imagenSrc: "src/assets/pro3.jpg",
    estrellas: [1, 2, 3, 4],
    nombre: "Chocolate amargo",
    descripcion: "Decoracion de chocolate oscuro con canela",
    precio: 19000,
  },
  {
    imagenSrc: "src/assets/pro4.jpg",
    estrellas: [1, 2, 3, 4],
    nombre: "Capuchino",
    descripcion: "Con licor Baileys",
    precio: 15000,
  },
  {
    imagenSrc: "src/assets/pro5.jpg",
    estrellas: [1, 2, 3, 4],
    nombre: "Cafe en grano y molido",
    descripcion: "Cafe seleccionado, del mejor grano",
    precio: 16000,
  },
  {
    imagenSrc: "src/assets/pro6.jpg",
    estrellas: [1, 2, 3, 4],
    nombre: "Macarons",
    descripcion: "Postre de origen italiano, a base de almendra ",
    precio: 12000,
  },
  {
    imagenSrc: "src/assets/pro7.jpg",
    estrellas: [1, 2, 3, 4],
    nombre: "Cupcakes ",
    descripcion: "Vegetaarionos a base de nuez ",
    precio: 5800,
  },
  {
    imagenSrc: "src/assets/pro8.jpg",
    estrellas: [1, 2, 3, 4],
    nombre: "Cheescake",
    descripcion: "Contine chocolate y caramelo, su base es la clasica",
    precio: 21000,
  },
  {
    imagenSrc: "src/assets/pro9.jpg",
    estrellas: [1, 2, 3, 4],
    nombre: "Cafe helado",
    descripcion: "Contiene leche, vegetal o animal",
    precio: 20000,
  },
  {
    imagenSrc: "src/assets/pro10.jpg",
    estrellas: [1, 2, 3, 4],
    nombre: "Frappé de milo",
    descripcion: "Con cahntilly, galleta oreo y chocolate",
    precio: 22000,
  },
  {
    imagenSrc: "src/assets/pro11.jpg",
    estrellas: [1, 2, 3, 4],
    nombre: "Leche dorada",
    descripcion: "A base de leche vegetal y curcuma con vitaminas",
    precio: 18000,
  },
  {
    imagenSrc: "src/assets/pro12.jpg",
    estrellas: [1, 2, 3, 4],
    nombre: "Desayuno frances",
    descripcion:
      "Contiene fruta de su eleccion, leche vegetal o animal, un caffe expresso y waffles de avena",
    precio: 7800,
  },
])

const formatoPesoColombiano = (valor) => {
  return valor.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP'
  });
}

const agregarAlCarrito = (producto) => {
  let itemEnCarrito = carrito.value.find(
    (item) => item.producto === producto
  );
  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    carrito.value.push({ producto: producto, cantidad: 1 });
  }
}

const eliminarDelCarrito = (index) => {
  carrito.value.splice(index, 1);
}

const vaciarCarrito = () => {
  carrito.value = [];
}

const calcularTotal = () => {
  return carrito.value.reduce(
    (total, item) => total + item.producto.precio * item.cantidad,
    0
  );
}

</script> 

<style scoped>

* {
  margin: 0%;
  padding: 0%;
  box-sizing: border-box;
  font-family: "Khand", sans-serif;
  outline: none;
  border: none;
  text-decoration: none;
  transition: all 0.2s linear;
}

a {
  text-decoration: none;
}

.carro {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.846);
  padding: 0.8rem;
  border-radius: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.port {
  position: relative;
  text-align: center;
  background-image: linear-gradient(to bottom, #eaf0f245 25%, #faae5057 100%),
    url("../src/assets/port.jpg");
  background-size: cover;
  background-position: center;
  height: 500px;
}

.carro a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}

.carro h1 {
  padding: 2rem;
  color: #6f4e37;
  font-size: 5rem;
  font-style: italic;
}

.carro i,
.carro a {
  cursor: pointer;
  padding: 0.5rem;
  height: 4.5rem;
  line-height: 4.5rem;
  width: 4.5rem;
  text-align: center;
  font-size: 1.7rem;
  color: #6f4e37;
  border-radius: 50%;
  background: #6f4e3740;
  margin: 2.5rem;
}

.productos {
  padding: 10rem;
  background: #333;
}

.productos h1 {
  padding-bottom: 3rem;
  color: #fff;
  text-align: center;
  font-size: 3rem;
  font-style: italic;
}

.box-contaier {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2rem;
}

.box-contaier .box {
  padding: 1.3rem;
  background: #fff;
  border-radius: 0.9rem;
  border: 0.1rem solid rgb(0, 0, 0, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  text-align: center;
  border: 1px solid #f16d0f;
}

.box-contaier .box img {
  justify-content: center;
  width: 98%;
  height: 350px;
  object-fit: cover;
  border-radius: 5rem;
}

.box-contaier .box h3 {
  color: #f16d0f;
  font-weight: bold;
  font-size: 2rem;
  margin: 0.5rem;
}

.box-contaier .box p {
  color: #6f4e37;
  font-size: 1.2rem;
  margin: 0.5rem;
}

.box-contaier .box .strellas {
  padding: 0.8rem;
}

.box-contaier .box .strellas i {
  font-size: 1.2rem;
  color: #6f4e37;
}

.btn-pe {
  display: inline-block;
  font-size: 1.7rem;
  color: #6f4e37;
  background: #ad8b733f;
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.3rem 2rem;
  font-weight: 700;
}

.box-contaier .box span {
  color: #f16d0f;
  font-weight: bolder;
  margin-left: 4rem;
  font-size: 2.5rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 70%;
  max-width: 600px;
  overflow-y: auto;
}

.modal .lista {
  max-height: 500px;
  overflow-y: auto;
}

.detalle-producto {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

.carrito-titulo {
  border-bottom: 1px solid #f16d0f;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-style: italic;
  color: #6f4e37;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}

.modal-content .carrito-item span img {
  width: 100px;
  height: 40px;
  object-fit: cover;
  border-radius: 7px;
  margin-right: 1.5rem;
}

.carrito-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
}

span .nombre {
  margin-left: 0.5rem;
}

span .cantidad {
  margin-left: 2rem;
}

span .precio {
  margin-left: 3rem;
  font-weight: bold;
}

.eliminar {
  margin-top: 1rem;
  display: inline-block;
  font-size: 1rem;
  color: #6f4e37;
  background: #ad8b733f;
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0.9rem;
  font-weight: 600;
}

.bot {
  display: flex;
  justify-content: space-between;
}

.cerrar {
  margin-top: 1rem;
  display: inline-block;
  font-size: 1.3rem;
  color: #6f4e37;
  background: #ad8b733f;
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.8rem 1rem;
  font-weight: 600;
}

.carrito-total {
  border-bottom: 1px solid #f16d0f;
  padding-bottom: 10px;
  margin-bottom: 10px;
  margin-top: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
}

.footer {
  background-color: #f16d0f;
  color: #fff;
  text-align: center;
  padding: 10px;
}

.footer p {
  margin: 0;
  font-size: 1.5rem;
}

.footer:before {
  content: "\00a9 ";
}

.footer:after {
  content: " Todos los derechos reservados.";
}
</style>