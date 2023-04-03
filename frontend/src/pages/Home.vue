<script setup>
import { ref, onMounted, inject } from 'vue'
import PostList from '../components/PostList.vue';
import TodoList from '../components/TodoList.vue';

const jwt = inject('jwt')

</script>

<template>
  <div class="container" v-if="jwt">
    <TodoList />
    <PostList />
    <div class="nested-router">
      <router-view v-slot="{ Component, route }">
        <transition>
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.nested-router {
  width: 30%;
}
</style>