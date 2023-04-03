<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()

const id = ref("")
const password = ref("")


onMounted(() => {
})

function signin() {
  fetch("https://api-riuwhqsd3q-uc.a.run.app/auth/signin", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id.value, password: password.value })
  })
    .then(response => {
      return response.json()
    })
    .then(json => {
      localStorage.setItem('token', json.refresh)
      localStorage.setItem('id', id.value)
      window.location = "/"
    })
}

function signup() {
  fetch("https://api-riuwhqsd3q-uc.a.run.app/auth/signup", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id.value, password: password.value })
  })
    .then(response => {
      return signin()
    })
}

</script>

<template>
  <div class="login-con">
    <div class="login-form">
      <input type="text" class="login-input" placeholder="User ID" v-model.trim="id">
      <input type="password" class="login-input" placeholder="Password" v-model="password">
      <button class="login-button" @click="signin()" >SIGNIN</button>
      <button class="login-button" @click="signup()" >SIGNUP</button>
    </div>
  </div>
</template>

<style scoped>
.login-form{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
}

input, button{
  width: 300px;
  box-sizing: border-box;
  padding: 0.4rem 1rem;
}

</style>