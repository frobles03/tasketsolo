<template>
  <div class="sidebar">
    <header>
      <h1 class="center-text"  style="color: white" >Tasket</h1>
    </header>
    
    <main class="main-content">
      <nav>
        <ul class="large-list">
          <li style="color: white; margin-right: 5px;"><router-link to="/"><font-awesome-icon icon="home" style="color: white; margin-right: 5px;" />Inicio</router-link></li><br>
          <li style="color: white; margin-right: 5px;"><font-awesome-icon icon="bell" style="color: white; margin-right: 5px;" />Notificaciones</li><br>
          <li style="color: white; margin-right: 5px;"><router-link to="/perfil"><font-awesome-icon icon="user" style="color: white; margin-right: 5px;" />Perfil</router-link></li><br>
          <li style="color: white; margin-right: 5px;"><router-link to="/TiendaCanje"><font-awesome-icon icon="shopping-cart" style="color: white; margin-right: 5x;" />Tienda de Canje</router-link></li><br>
          <li style="color: white; margin-right: 5px;"><font-awesome-icon icon="cog" style="color: white; margin-right: 5px;" />Configuración</li>
        </ul>
        
        <h2 class="center-text"  style="color: white" >Grupos</h2>
    <nav>
      <ul class="scrollable-list"  style="color: white" >
        <li>Personal</li>
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

      </ul>
        </nav>
      </nav>
    </main>

 <footer class="footer-content">
    <button @click="login">Iniciar sesión</button>
    <br>
    <button @click="logout">Cerrar sesión</button>
  </footer>
  </div>
</template>

<script>
export default {
  methods: {
    login() { // Método para redirigir a la página de inicio de sesión
      this.$router.push('/login');
    },
    logout() { // Método para redirigir a la página de inicio
      this.$router.push('/');

    }
  }
}
</script>
<style scoped>
.sidebar {
  border: 3px solid #AF3800;
  background-color: #FE621D;
  width: 200px;
  min-width: 200px;
  position: fixed;
  height: 94%;
  overflow: auto;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 50vw;
  }
}

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

ul.large-list {
  font-size: 1.2em;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.center-text {
  text-align: center;
}
.scrollable-list {
  max-height: 100px; 
  overflow-y: auto;
}
</style>