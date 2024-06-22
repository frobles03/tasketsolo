<template>
  <Sidebar/>
  <div class="register">
    <h2>Registrarse</h2>
    <form @submit="register">
      <label for="fullName">Nombre completo:</label>
      <input type="text" id="fullName" v-model="fullName" required>
      <label for="email">Correo electrónico:</label>
      <input type="email" id="email" v-model="email" required>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required>
      <label for="confirmPassword">Confirmar contraseña:</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      <label for="birthDate">Fecha de nacimiento:</label>
      <input type="date" id="birthDate" v-model="birthDate" required>
      <label for="gender">Género:</label>
      <select id="gender" v-model="gender" required>
        <option disabled value="">Por favor selecciona un género</option>
        <option>Masculino</option>
        <option>Femenino</option>
        <option>Otro</option>
      </select> 
      <br>
      <button type="submit">Registrarse</button>
    </form>
   
  </div>
</template>
<script>
import Sidebar from '../common/Sidebar.vue'
import '@/assets/global.css';

export default {
  name: 'Register',
  components: {
    Sidebar
  },
  data() { // Devuelve un objeto con los datos iniciales del componente
    return {
      fullName: '', // Inicializa fullName como una cadena vacía
      email: '', // Inicializa email como una cadena vacía 
      password: '',
      confirmPassword: '',
      birthDate: '',
      gender: ''
    }
  },
  methods: { 
    register() {
      // Verificar que las contraseñas sean iguales
      if (this.password !== this.confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, verifica e intenta de nuevo.');
        return;
      }

      // Validar la fecha de nacimiento
      const year = new Date(this.birthDate).getFullYear();
      if (isNaN(year) || year.toString().length !== 4) {
        alert('Por favor, introduce un año válido con 4 dígitos en la fecha de nacimiento.');
        return;
      }

      console.log('Registrarse');
    }
  }
}
</script>

  <style scoped>
  .register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%; /* Reduce aún más el ancho de la caja a 60% del ancho del contenedor */
  height: 80vh;
  margin: auto auto auto 350px; /* Cambia el margen para mover la caja a la derecha */
  background-color: #FFB877;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
}

/* Añade una consulta de medios para hacer que la clase .register sea responsiva */
@media (max-width: 768px) {
  .register {
    margin-left: 0; /* Elimina el margen izquierdo en pantallas pequeñas */
    padding: 10px; /* Reduce el padding en pantallas pequeñas */
  }
}

.register h2 {
  margin-bottom: 20px;
}

.register form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.register form label {
  margin-bottom: 5px;
}

.register form input, .register form select {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.register form button {
  width: 30%; /* Establece el ancho del botón al 50% del contenedor del formulario */
  padding: 8px; /* Disminuido de 10px a 8px */
  border-radius: 5px;
  border: none;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  margin: auto; /* Centra el botón horizontalmente */
}

.register form button:hover {
  background-color: #0056b3;
}

.register a {
  color: #007BFF;
  text-decoration: none;
  display: block;
  text-align: center;
}

.register a:hover {
  text-decoration: underline;
}
  </style>