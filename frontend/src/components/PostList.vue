<script setup>
import { ref, inject } from 'vue'
import { onMounted } from 'vue';
import Post from './Post.vue';

const jwt = inject('jwt')

const posts = ref([])
const newPost = ref("")

onMounted(() => {
  loadPosts()

})


function loadPosts() {
  fetch("https://api-riuwhqsd3q-uc.a.run.app/posts", {
    headers: { Authorization: 'Bearer ' + jwt.value }
  })
    .then(response => response.json())
    .then(json => {
      posts.value = json
    })
}

function createPost() {
  if (!newPost.value) return
  fetch("https://api-riuwhqsd3q-uc.a.run.app/posts", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt.value
    },
    body: JSON.stringify({ content: newPost.value })
  })
    .then(response => {
      loadPosts()
    })
  newPost.value = ""
}

</script>

<template>
  <div class="posts">
    <div class="create-post">
      <textarea class="post-area" cols="30" rows="5" placeholder="What's on your mind" v-model.trim="newPost"></textarea>
      <button class="post-button" @click="createPost()">CREATE POST</button>
    </div>
    <div class="post-list-container">
      <Post v-for="post in posts" :post="post" :key="post.id" />
    </div>
  </div>
</template>

<style scoped>
.posts {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  border-left: 1px solid #0392;
  /* border-right: 1px solid #0391; */
}

.post-area {
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  outline: 1px solid #0396;
  border: none;
  padding: 0.5rem 0.7rem;
}

.post-button {
  cursor: pointer;
  width: 100%;
  background-color: rgba(0, 139, 238);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.4rem;
  margin-top: 0.4rem;
}

.post-button:hover {
  background-color: rgb(2, 87, 148);
}

.post-list-container {
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.create-post {
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #5551;
  border-bottom: 1px solid #0391;
}
</style>
