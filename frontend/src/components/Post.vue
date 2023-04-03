<script setup>

const props = defineProps(['post'])


</script>

<template>
  <div class="post">
    <div class="user">
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        class="profile-image">
        <span class="profile-link">
        <router-link :to="{ path: '/users/', query:{id:post.author}}">{{ post.author }}</router-link>
      </span>
      {{ (new Date(post.created)).toLocaleDateString() }}
    </div>
    <pre class="content">
      {{ post.content }}
    </pre>
    <router-link :to="{ path: '/comments', query: { post: post.id }}">
    <div class="comments">
      View comments
    </div>
  </router-link>
  </div>
</template>

<style scoped>
.post {
  width: 100%;
  /* background-color: #0001; */
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.user {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: 0.7rem;
  color: #0009;
}

.profile-image {
  width: 2rem;
  border-radius: 100px;
}

.profile-link{
  flex: 1;
}
.profile-link > a{
  text-decoration: none;
  color: #059;
}

.content {
  margin: 0;
  padding: 1rem 1rem;
  color: #000;
  white-space: pre-line;
  font-family: Arial, Helvetica, sans-serif;
  /* background-color: #5551; */
}

.comments{
  display: flex;
  justify-content: end;
  padding: 0.2rem 0.7rem;
  border-top: 1px solid #eee;
  font-size: small;
  cursor: pointer;
}

.comments:hover{
  color: #059;
}
</style>