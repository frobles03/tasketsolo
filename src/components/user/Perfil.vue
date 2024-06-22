<template>
  <div class="container">
    <Sidebar />
    <div class="perfil">
      <div class="perfil-box">
        <h1 class="welcome-text">Perfil</h1>
        <p class="user-info">Nombre: Fernando Robles</p>
        <p class="user-info">Alias: fernando03</p>
        <p class="user-info">Email: f.robles03@ufromail.cl</p>
        <div class="grupos-container">
          <div class="user-info scrollable-section">
            <h2 class="center-text">Grupos que administras</h2>
            <ul>
              <li><router-link to="/tareas-canjes-admin" class="router-link">Grupo 1</router-link></li>
              <li>Grupo 2</li>
              <li>Grupo 3</li>
              <li>Grupo 4</li>
              <li>Grupo 5</li>
            </ul>
          </div>

          <div class="user-info scrollable-section">
            <h2 class="center-text">Grupos en los que participas</h2>
            <ul>
              <li>Grupo 1</li>
              <li>Grupo 2</li>
              <li>Grupo 3</li>
              <li>Grupo 4</li>
              <li>Grupo 5</li>
              <li>Grupo 6</li>
              <li>Grupo 7</li>
              <li>Grupo 8</li>
              <li>Grupo 9</li>
              <li>Grupo 10</li>
              <li>Grupo 11</li>
              <li>Grupo 12</li>
              <li>Grupo 13</li>
              <li>Grupo 14</li>
              <li>Grupo 15</li>
              <li>Grupo 16</li>
              <li>Grupo 17</li>
              <li>Grupo 18</li>
              <li>Grupo 19</li>
              <li>Grupo 20</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../common/Sidebar.vue';
import '@/assets/global.css';

export default {
  name: 'Perfil',
  components: {
    Sidebar
  }
};
</script>

<style scoped> /**Estilos CSS que se aplican solo a este componente */
.container {
  display: flex;
}

.perfil {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-left: 220px;
}

.perfil-box {
  border: 1px solid #000;
  padding: 2vh;
  width: 80vw;
  max-width: 600px;
  background-color: #FE923C;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: auto;
}

.welcome-text {
  background-color: orange;
  padding: 1vh;
  color: #fff;
  border-radius: 5px;
  text-align: center;
}

.user-info {
  margin-top: 1vh;
  font-size: 16px;
}

.router-link {
  color: blue;
  cursor: pointer;
}

.grupos-container {
  display: flex;
  justify-content: space-between;
}

.scrollable-section {
  flex: 1;
  max-height: 150px;
  overflow-y: auto;
  margin: 0 10px;
  border-top: 1px solid #ccc;
  padding-top: 1vh;
}
</style>
