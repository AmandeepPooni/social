<script setup>
import { computed, ref, inject } from 'vue'
import { onMounted } from 'vue';
import Todo from './Todo.vue';

const jwt = inject('jwt')
const userId = inject('userId')

const todos = ref([])
const newTodo = ref("")
const creating = ref(false)

const search = ref("")

const filteredTodos = computed(() => {
  if (!search.value) return todos.value
  return todos.value.filter(t => t.content.toLowerCase().includes(search.value.toLowerCase()))
})

onMounted(() => {
  loadTodos()
})

function loadTodos() {
  fetch("https://api-riuwhqsd3q-uc.a.run.app/todos?author=" + userId.value, {
    headers: { Authorization: 'Bearer ' + jwt.value }
  })
    .then(response => response.json())
    .then(json => {
      newTodo.value = ""
      todos.value = json
      creating.value = false
    })
}

function createTodo() {
  if (!newTodo.value) return
  creating.value = true
  fetch("https://api-riuwhqsd3q-uc.a.run.app/todos", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt.value
    },
    body: JSON.stringify({ content: newTodo.value, status: 'pending' })
  })
    .then(response => {
      loadTodos()
    })
}

</script>

<template>
  <div class="todos">
    <div class="search-con">
      <input type="text" placeholder="Search your todos" v-model.trim="search">
    </div>
    <form @submit.prevent="createTodo()" class="create-todo">
      <input type="text" placeholder="Write a new todo and press enter" v-model.trim="newTodo">
    </form>
    <span v-if="!todos.length" class="todo-message">Your todos will show up here</span>
    <div class="todo-list-con" v-if="!creating">
      <Todo v-for="todo in filteredTodos" :todo="todo" :key="todo.id" />
    </div>
  </div>
</template>

<style scoped>
.todos {
  width: 30%;
  min-width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.search-con {
  padding: 1rem;
}

.search-con>input {
  width: 100%;
  box-sizing: border-box;
  padding: .5rem 1rem;
  border-radius: 5px;
  border: none;
  outline: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.search-con>input:focus {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
}

.todo-list-con {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
}

.todo-message {
  color: #888;
  text-align: center;
}

.create-todo {
  display: flex;
  padding: 1rem;
  gap: 0.5rem;
}

.create-todo input {
  flex: 1;
  border-radius: 5px;
  border: none;
  outline: none;
}
</style>
