<template>
  <div class="container">
    <Sidebar />
    <div class="tareas-canjes-admin">
      <div class="tareas-canjes-admin-box">
        <h1 class="welcome-text">Tareas y Canjes</h1>
        <h2 class="center-text">Tareas y Canjes del Grupo {{ nombreGrupo }}</h2>
        <div class="content">
          <div>
            <h3>Tareas:</h3>
            <ul>
              <li v-for="tarea in grupo.Tareas" :key="tarea.ID">
                <div>
                  <span>{{ tarea.Nombre }} - {{ tarea.Descripcion }} - Puntaje: {{ tarea.Puntaje
                    }}</span>
                  <div class="buttons">
                    <button @click="iniciarEdicionTarea(tarea)">Editar</button>
                    <button @click="confirmarEliminacion(() => eliminarTarea(tarea.ID))">Eliminar</button>
                  </div>
                </div>
              </li>
            </ul>
            <div v-if="tareaEnEdicion">
              <h3>Editar Tarea</h3>
              <form @submit.prevent="guardarTareaEditada">
                <label>Nombre: <input v-model="tareaEnEdicion.Nombre" /></label><br />
                <label>Descripción: <input v-model="tareaEnEdicion.Descripcion" /></label><br />
                <label>Puntaje: <input type="number" v-model="tareaEnEdicion.Puntaje" /></label><br />
                <button type="submit">Guardar</button>
                <button @click="cancelarEdicionTarea">Cancelar</button>
              </form>
            </div>
          </div>
          <div>
            <h3>Agregar Nueva Tarea</h3>
            <form @submit.prevent="agregarNuevaTarea">
              <label>Nombre: <input v-model="nuevaTarea.Nombre" /></label><br />
              <label>Descripción: <input v-model="nuevaTarea.Descripcion" /></label><br />
              <label>Puntaje: <input type="number" v-model="nuevaTarea.Puntaje" /></label><br />
              <button type="submit">Agregar</button>
            </form>
          </div>
        </div>
        <div class="content">
          <div>
            <h3>Canjes:</h3>
            <ul>
              <li v-for="canje in grupo.Canjes" :key="canje.ID">
                <div>
                  <span>{{ canje.Nombre }} - {{ canje.Descripcion }} - Puntaje Requerido: {{
                    canje.PuntajeRequerido }}</span>
                  <div class="buttons">
                    <button @click="iniciarEdicionCanje(canje)">Editar</button>
                    <button @click="confirmarEliminacion(() => eliminarCanje(canje.ID))">Eliminar</button>
                  </div>
                </div>
              </li>
            </ul>
            <div v-if="canjeEnEdicion">
              <h3>Editar Canje</h3>
              <form @submit.prevent="guardarCanjeEditado">
                <label>Nombre: <input v-model="canjeEnEdicion.Nombre" /></label><br />
                <label>Descripción: <input v-model="canjeEnEdicion.Descripcion" /></label><br />
                <label>Puntaje Requerido: <input type="number"
                    v-model="canjeEnEdicion.PuntajeRequerido" /></label><br />
                <button type="submit">Guardar</button>
                <button @click="cancelarEdicionCanje">Cancelar</button>
              </form>
            </div>
          </div>
          <div>
            <h3>Agregar Nuevo Canje</h3>
            <form @submit.prevent="agregarNuevoCanje">
              <label>Nombre: <input v-model="nuevoCanje.Nombre" /></label><br />
              <label>Descripción: <input v-model="nuevoCanje.Descripcion" /></label><br />
              <label>Puntaje Requerido: <input type="number" v-model="nuevoCanje.PuntajeRequerido" /></label><br />
              <button type="submit">Agregar</button>
            </form>
          </div>
        </div>
        <div class="content">
          <div>
            <h3>Usuarios:</h3>
            <ul>
              <li v-for="usuario in grupo.Usuarios" :key="usuario.ID">
                <div>
                  <span>{{ usuario.Nombre }} - {{ usuario.Apodo }} - {{ usuario.Correo }}</span>
                  <div class="buttons">
                    <button @click="confirmarEliminacion(() => eliminarUsuario(usuario.ID))">Eliminar</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '../common/Sidebar.vue'
import '@/assets/global.css';

export default {
  name: 'TareasCanjesAdmin',
  components: {
    Sidebar
  },
  data() {
    return {
      grupo: {
        Nombre: '',
        Tareas: [],
        Canjes: [],
        Usuarios: []
      },
      tareaEnEdicion: null,
      canjeEnEdicion: null,
      nuevaTarea: {
        Nombre: '',
        Descripcion: '',
        Puntaje: 0
      },
      nuevoCanje: {
        Nombre: '',
        Descripcion: '',
        PuntajeRequerido: 0
      }
    };
  },
  computed: {
    nombreGrupo() {
      return this.grupo?.Nombre || 'seleccionado';
    }
  },
  methods: {
    async cargarDatos() {
      try {
        const response = await axios.get('http://localhost:3000/grupos');
        this.grupo = response.data[0];
      } catch (error) {
        console.error('Error al cargar datos desde JSON Server:', error);
      }
    },
    async guardarTareaEditada() {
      try {
        const tareaIndex = this.grupo.Tareas.findIndex(t => t.ID === this.tareaEnEdicion.ID);
        if (tareaIndex !== -1) {
          this.grupo.Tareas[tareaIndex] = { ...this.tareaEnEdicion };
        }
        await axios.put(`http://localhost:3000/grupos/${this.grupo.id}`, this.grupo);
      } catch (error) {
        console.error('Error al guardar tarea editada:', error);
      }
      this.tareaEnEdicion = null;
    },
    async guardarCanjeEditado() {
      try {
        const canjeIndex = this.grupo.Canjes.findIndex(c => c.ID === this.canjeEnEdicion.ID);
        if (canjeIndex !== -1) {
          this.grupo.Canjes[canjeIndex] = { ...this.canjeEnEdicion };
        }
        await axios.put(`http://localhost:3000/grupos/${this.grupo.id}`, this.grupo);
      } catch (error) {
        console.error('Error al guardar canje editado:', error);
      }
      this.canjeEnEdicion = null;
    },
    async eliminarTarea(id) {
      try {
        this.grupo.Tareas = this.grupo.Tareas.filter(t => t.ID !== id);
        await axios.put(`http://localhost:3000/grupos/${this.grupo.id}`, this.grupo);
      } catch (error) {
        console.error('Error al eliminar tarea:', error);
      }
    },
    async eliminarCanje(id) {
      try {
        this.grupo.Canjes = this.grupo.Canjes.filter(c => c.ID !== id);
        await axios.put(`http://localhost:3000/grupos/${this.grupo.id}`, this.grupo);
      } catch (error) {
        console.error('Error al eliminar canje:', error);
      }
    },
    async eliminarUsuario(id) {
      try {
        this.grupo.Usuarios = this.grupo.Usuarios.filter(u => u.ID !== id);
        await axios.put(`http://localhost:3000/grupos/${this.grupo.id}`, this.grupo);
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    },
    iniciarEdicionTarea(tarea) {
      this.tareaEnEdicion = { ...tarea };
    },
    iniciarEdicionCanje(canje) {
      this.canjeEnEdicion = { ...canje };
    },
    cancelarEdicionTarea() {
      this.tareaEnEdicion = null;
    },
    cancelarEdicionCanje() {
      this.canjeEnEdicion = null;
    },
    async agregarNuevaTarea() {
      try {
        const nuevaTareaConID = { ...this.nuevaTarea, ID: Date.now() };
        this.grupo.Tareas.push(nuevaTareaConID);
        await axios.put(`http://localhost:3000/grupos/${this.grupo.id}`, this.grupo);
        this.nuevaTarea = { Nombre: '', Descripcion: '', Puntaje: 0 };
      } catch (error) {
        console.error('Error al agregar nueva tarea:', error);
      }
    },
    async agregarNuevoCanje() {
      try {
        const nuevoCanjeConID = { ...this.nuevoCanje, ID: Date.now() };
        this.grupo.Canjes.push(nuevoCanjeConID);
        await axios.put(`http://localhost:3000/grupos/${this.grupo.id}`, this.grupo);
        this.nuevoCanje = { Nombre: '', Descripcion: '', PuntajeRequerido: 0 };
      } catch (error) {
        console.error('Error al agregar nuevo canje:', error);
      }
    },
    confirmarEliminacion(accion) {
      if (confirm('¿Estás seguro de que deseas eliminar esto?')) {
        accion();
      }
    }
  },
  mounted() {
    this.cargarDatos();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  background-color: #f3f4f6;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

.tareas-canjes-admin {
  flex: 1;
  padding: 20px;
  margin-left: 220px;
  /* Ajuste para evitar superposición con la barra lateral */
  background-color: #fdfdfd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.tareas-canjes-admin-box {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  background-color: #f5f5f5;
}

.welcome-text {
  background-color: #ff9800;
  color: #fff;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 20px;
}

.center-text {
  text-align: center;
  font-size: 1.3em;
  margin-bottom: 20px;
  color: #555;
}

.content {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.content>div {
  flex: 1;
  background-color: #fff8e1;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.content h3 {
  font-size: 1.2em;
  margin-bottom: 15px;
  color: #ff9800;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 1em;
  color: #333;
  display: flex;
  flex-direction: column;
}

li:last-child {
  border-bottom: none;
}

li .buttons {
  margin-top: 10px;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #333;
}

input[type="text"],
input[type="number"] {
  width: calc(100% - 10px);
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

button {
  background-color: #ff9800;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e68900;
}

@media (max-width: 768px) {
  .tareas-canjes-admin {
    margin-left: 0;
    padding: 10px;
  }

  .content {
    flex-direction: column;
  }

  .content>div {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
