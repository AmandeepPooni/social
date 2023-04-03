<script setup>
import { ref, inject, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Comment from './Comment.vue';

const jwt = inject('jwt')

const route = useRoute()

const comments = ref([])
const newComment = ref("")
const loading = ref(false)

onMounted(() => {
    loadComments(route.query['post'])
})

watch(
    () => route.query['post'],
    async (id) => loadComments(id)
)


function loadComments(post) {
    if(!post) return
    loading.value = true
    fetch("https://api-riuwhqsd3q-uc.a.run.app/comments?post=" + post, {
        headers: { Authorization: 'Bearer ' + jwt.value }
    })
        .then(response => response.json())
        .then(json => {
            comments.value = json
            loading.value = false
        })
}

function createComment() {
    if (!newComment.value) return
    fetch("https://api-riuwhqsd3q-uc.a.run.app/comments", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt.value
        },
        body: JSON.stringify({ content: newComment.value, post: route.query['post'] })
    })
        .then(response => {
            loadComments(route.query['post'])
        })
    newComment.value = ""
}

</script>

<template>
    <div class="posts">
        <form @submit.prevent="createComment()" class="create-comment">
            <input type="text" placeholder="Write a comment on this post" v-model.trim="newComment">
        </form>
        <div class="post-list-container">
            <Comment v-for="post in comments" :post="post" :key="post.id" />
        </div>
        <div class="loading-text" v-if="loading">
            Loading comments
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

.create-comment {
    display: flex;
    padding: 1rem;
    gap: 0.5rem;
}

.create-comment input {
    flex: 1;
    border-radius: 5px;
    border: none;
    outline: 1px solid #0002;
    padding: 0.5rem 1rem;
}

.loading-text{
    text-align: center;
    color: grey;
}
</style>
