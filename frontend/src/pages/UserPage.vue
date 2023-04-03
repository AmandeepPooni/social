<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import { useRoute } from "vue-router"

const jwt = inject('jwt')
const route = useRoute()
const todos = ref([])

onMounted(() => {
  loadTodos()
})

watch(
  () => route.query['id'],
  async (id) => loadTodos(id)
)

function loadTodos() {
  if (!route.query.id) return
  todos.value = []
  fetch("https://api-riuwhqsd3q-uc.a.run.app/todos?author=" + route.query.id, {
    headers: { Authorization: 'Bearer ' + jwt.value }
  })
    .then(response => response.json())
    .then(json => {
      todos.value = json
    })
}

</script>

<template>
  <div class="user-con">
    <h2 v-if="route.query.id">{{ route.query.id }}'s todos</h2>

    <ul>
      <li :class="{'completed': todo.status==='complete'}" v-for="todo in todos"><span style="color:black">{{ todo.content }}</span></li>
    </ul>
  </div>
</template>

<style scoped>
.user-con {
  padding: 1rem;
  border-left: 1px solid rgba(65, 105, 225, 0.2);
  height: 100vh;
  box-sizing: border-box;
}

h2 {
  margin: 0 0 1rem 0;
}

li{
  color: #0002;
}

.completed{
  color: green;
}

</style>