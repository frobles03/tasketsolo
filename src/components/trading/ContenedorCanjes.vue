<template>

    <div class="container">
        <TarjetaCanje></TarjetaCanje>
        <TarjetaCanje></TarjetaCanje>
        <TarjetaCanje></TarjetaCanje>
        <TarjetaCanje></TarjetaCanje>
        <TarjetaCanje></TarjetaCanje>
        <TarjetaCanje></TarjetaCanje>
        <TarjetaCanje></TarjetaCanje>
        <TarjetaCanje></TarjetaCanje>
        <TarjetaCanje></TarjetaCanje>
        
    </div>
    
   

</template>

<script setup>
import TarjetaCanje from '../user/TarjetaCanje.vue';
import '@/assets/global.css';

</script>

<style scoped>

.container{

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-left: 5%;
    padding-right: 5%;
}

</style>