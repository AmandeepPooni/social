<script setup>
import { ref, onMounted, provide } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()
const jwt = ref(null)
const userId = ref(null)
const loggedIn = ref(false)

provide('jwt', jwt)
provide('userId', userId)


onMounted(() => {
  let refresh = localStorage.getItem('token')
  let id = localStorage.getItem('id')
  if (refresh) {
    fetch("https://api-riuwhqsd3q-uc.a.run.app/auth/token", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, refresh })
    })
      .then(response => response.json())
      .then(json => {
        jwt.value = json.token
        userId.value = id
        localStorage.setItem('token', json.refresh)
        loggedIn.value = true
      })
  }
  else {
    router.replace({ name: 'login' })
  }
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped></style>
