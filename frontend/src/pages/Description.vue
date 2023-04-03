<script setup>
import { inject } from 'vue'

const userId = inject('userId')


</script>

<template>
  <div class="container">
    <h2>Welcome {{ userId }}</h2>
    
    This is a social app where you can also manage your todos. <br>
    This frontend is just for overall demonstration purpose and does NOT consume all the APIs created as part of the backend (which is our primary focus).
    <div><br></div>
    GitHub link for the code and API request guide:<br>
    <a href="https://github.com/AmandeepPooni/social">https://github.com/AmandeepPooni/social</a>

    <div><br></div>
    Here is a snapshot of unit tests for backend
    <img src="/tests-screenshot.png" alt="" class="tests-image">
  </div>
</template>

<style scoped>
.container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100vh;
    box-sizing: border-box;
    overflow: auto;
}

h2{
    margin-top: 0;
}


.tests-image{
    width: 100%;
    object-fit: 0 100%;
}

</style>