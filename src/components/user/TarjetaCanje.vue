<template>

    <div class="imagen">
        <img  alt="" src="../assets/imagen.png">
        <p class="descripcion">Lorem Ipsum</p>
        <p class="precio">Puntos: 30</p>
        <button class="btn" @click="canjear">Canjear</button>
    </div>
    
    
    </template>
    
    <script>

    export default{
    
        methods:{
            canjear(){
    
                alert('El canjeo se ha realizado con exito')
            }
    
        }
    }
    
    </script>
    
    <style>
    
    img{
        width: 25%;
    }
    
    .descripcion{
        color: black;
    }
    
    .precio{
        color: black;
    }
    
    .imagen{
        border: solid;
        border-radius: 15px;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        background: #FFF8F1;
        margin: 10px;
    }
    
    .btn{
        border-radius: 25px;
        margin: 10px;
        padding: 5px;
        background: bisque;
        font-family:'Times New Roman', Times, serif
    }
    
    </style>