<template>
  <div class="container">
    <Sidebar/> <!-- se llama al componente Sidebar -->

    <div class="content">
      <nav>
        <h1 class="centered-text">"Tasket: Simplifica tus tareas, encesta tus objetivos" </h1> 
        <div class="boards">
          <div class="board" v-for="board in boards" :key="board.id" :class="{ minimized: board.isMinimized }"> <!-- tablero individual con iteracion de sobre los arreglos -->
            <div class="board-header" @click="toggleBoard(board.id)">
              <label :for="'board-name-' + board.id">
                <span>{{ board.name }}</span> <!-- Nombre del tablero -->
              </label>
              <span class="toggle-button">{{ board.isMinimized ? '▶' : '▼' }}</span> <!-- Botón de minimizar -->
            </div>
            <ul v-show="!board.isMinimized">
              <li v-for="item in board.items" :key="item.id">
                <div class="task-header" @click="openModal(item)">
                  <label :for="'task-title-' + item.id">
                    <span>{{ item.title }}</span> <!-- Título de la tarea -->
                  </label>
                </div>
              </li>
              <li v-if="!board.items.length">
                <div class="empty-list-message">No hay tareas asignadas</div> <!-- Mensaje si la lista esta vacía -->
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="showModal = false">&times;</span> <!-- Botón de cerrar -->
        <h2>{{ selectedItem.title }}</h2> <!-- Título del elemento seleccionado -->
        <p>{{ selectedItem.description }}</p> <!-- Descripción del elemento seleccionado -->
        <p>Puntos: {{ selectedItem.points }}</p> <!-- Puntos del elemento seleccionado -->
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './common/Sidebar.vue'; // Importa el componente Sidebar

export default {
  components: {
    Sidebar // Declara el componente Sidebar dentro de este componente
  },
  data() {
    return {
      boards: [], // Inicializa boards como un arreglo vacío
      showModal: false, // Inicializa showModal como false
      selectedItem: {} // Inicializa selectedItem como un objeto vacío
    };
  },
  methods: {
    toggleBoard(id) {
      // Lógica para minimizar o maximizar el tablero con el id dado
    },
    openModal(item) {
      this.selectedItem = item; // Establece el elemento seleccionado
      this.showModal = true; // Muestra el modal
    }
  }
};
</script>




<script setup>
import { ref, reactive } from "vue";
import Sidebar from './common/Sidebar.vue'; 
import datosHome from './utils/datosHome.js'; 
import '@/assets/global.css'; 
//gestio de estado 
let boards = reactive(datosHome); // Asignar datos a la variable boards de manera reactiva
let showModal = ref(false); // controla si se debe mostrar (o no ) la interfaz de usuario  p
let selectedItem = reactive({}); // Objeto del elemento seleccionado

function openModal(item) {
  selectedItem = item; // Establecer el elemento seleccionado
  showModal.value = true; // Mostrar el modal
}

function toggleBoard(boardId) {
  const board = boards.find(b => b.id === boardId); // Encontrar el tablero con el ID dado
  if (board) {
    board.isMinimized = !board.isMinimized; // Alternar el estado minimizado del tablero
  }
}

</script>

<style scoped>
.centered-text {
  text-align: center;
}

.empty-list-message {
  color: red;
  text-align: center;
}
.boards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}.board {
  background: #EF9E5F;
  padding: 15px;
  flex: 1 0 200px;
  transition: height 0.3s ease;
  border-radius: 10%;
}

.board ul {
  height: 200px; /* Establecer la altura predeterminada */
  max-height: 400px; /* Ajustar este valor según tus necesidades */
  overflow-y: auto; /* Agregar una barra de desplazamiento cuando el contenido exceda la altura máxima */
}

.board.minimized {
  height:10px; /* Reducir el tamaño del cuadro minimizado */
}


.board-header {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.toggle-button {
  font-size: 1.2em; /* Reduce el tamaño de la flecha */
  cursor: pointer;
  position: relative;
  top: -0.1em; /* Mueve la flecha un poco hacia arriba */
}
.content {
  padding-left: 250px;
}

.task-header {
  cursor: pointer;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  position: relative; /* Añade esta línea */
  background-color: #FFDAB9;
  margin: 15% auto;
  padding: 20px;
  border: 5px solid #888;
  width: 80%;
  border-radius: 20px;
}

.close-button {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
}

/* Media queries para hacer que el diseño sea responsivo */
@media (max-width: 768px) {
  .content {
    padding-left: 0;
  }
}

@media (max-width: 480px) {
  .board {
    flex: 1 0 100%; /* En pantallas pequeñas, las tarjetas ocuparán todo el ancho */
  }
}
</style>