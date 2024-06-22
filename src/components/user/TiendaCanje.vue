<template> 
    <Sidebar/>
        <div class="titulo">
         <h2>Tienda de canje</h2>
    
         <ContenedorCanjes></ContenedorCanjes>
        </div>
        
     
     </template>
     
     <script setup>
    import ContenedorCanjes from '../trading/ContenedorCanjes.vue'
    import Sidebar from '../common/Sidebar.vue'
     import '@/assets/global.css';
    
     
     </script>
     
     <style scoped>
     
     
     .titulo{
         background: #FE923C;
         color: black;
         padding: 8px;
         border-radius: 10px;
         margin-left: 250px;
         font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
         text-align: center
    
     }
     
     </style>