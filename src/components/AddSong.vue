<template>
  <div class="add-song">
    <button v-if="!showForm" type="button" @click="showForm = true">
      Add songs
    </button>
    <form v-if="showForm" class="add-song-form" @submit.prevent="handleSubmit">
      <h3 class="add-song-title">Add a new Song</h3>
      <input type="text" v-model="title" placeholder="Music title" required />
      <input type="text" v-model="artist" placeholder="Artist" required />
      <button>Add</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showForm = ref(false);
const title = ref("");
const artist = ref("");

const handleSubmit = () => {
  const newSong = {
    title: title.value,
    artist: artist.value,
    id: Math.floor(Math.random() * 1000000),
  };

  console.log(newSong);
};
</script>

<style scoped lang="less">
.add-song {
  text-align: center;
  margin-top: 40px;

  &-form {
    max-width: 100%;
    text-align: left;
  }
}
</style>
