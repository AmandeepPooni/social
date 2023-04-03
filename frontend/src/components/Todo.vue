<script setup>
import { ref, inject } from 'vue'
import { onMounted } from 'vue';

const jwt = inject('jwt')

const props = defineProps(['todo'])

const deleted = ref(false)

onMounted(() => {

})

function updateTodo(status){
  fetch("https://api-riuwhqsd3q-uc.a.run.app/todos/" + props.todo.id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt.value
    },
    body: JSON.stringify({ status: status?'complete':'pending' })
  })
}

function deleteTodo() {
  fetch("https://api-riuwhqsd3q-uc.a.run.app/todos/" + props.todo.id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt.value
    }
  })
  deleted.value = true
}

</script>

<template>
  <div class="todo" v-if="!deleted">
    <label class="todo-content">
      <input type="checkbox" :value="todo.id" :checked="todo.status === 'complete'" @input="event=>updateTodo(event.target.checked)">
      {{ todo.content }}
    </label>

    <div class="delete-button" @click="deleteTodo()">
      <span class="delete-span">_</span>
    </div>
    <div class="todo-background"></div>
  </div>
</template>

<style scoped>
.todo {
  position: relative;
  padding: 0.4rem 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

input {
  margin-right: 1rem;
}

.todo-content {
  z-index: 10;
}

.delete-button {
  margin-left: auto;
  cursor: pointer;
  position: relative;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: rgb(210, 59, 59);
  color: aliceblue;
  z-index: 10;
  overflow: hidden;
}

.todo-background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #00000009;
}

.delete-button:hover+.todo-background {
  background-color: rgba(255, 0, 0, 0.201);
  z-index: -1;
}

.delete-span {
  position: absolute;
  transform: translate(9px, -8px);
}
</style>