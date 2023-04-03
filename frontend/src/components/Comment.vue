<script setup>

const props = defineProps(['post'])


</script>

<template>
  <div class="comment">
    <div class="user">
        <span class="profile-link">
        <router-link :to="{ path: '/users', query:{id:post.author}}">{{ post.author }}</router-link>
      </span>
      {{ (new Date(post.created)).toLocaleDateString() }}
    </div>
    <div class="content">
      {{ post.content }}
    </div>
  </div>
</template>

<style scoped>
.comment {
  width: 100%;
  background-color: #00000007;
  border-radius: 5px;
}

.user {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: 0.2rem 0.5rem;
  border-bottom: 1px solid#0001;
  color: #0009;
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
  padding: 0.4rem 0.5rem;
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