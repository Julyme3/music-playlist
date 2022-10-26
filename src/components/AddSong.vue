<template>
  <div class="add-song">
    <button v-if="!showForm" type="button" @click="showForm = true">
      Add songs
    </button>
    <form v-if="showForm" class="add-song-form" @submit.prevent="handleSubmit">
      <h3 class="add-song-title">Add a new Song</h3>
      <input type="text" v-model="title" placeholder="Music title" required />
      <input type="text" v-model="artist" placeholder="Artist" required />
      <button :disabled="isPending">Add</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useDocument from "@/composables/useDocument";

const props = defineProps({
  playlist: Object,
});
const showForm = ref(false);
const title = ref("");
const artist = ref("");

const { updateDoc, isPending, error } = useDocument(
  "playlists",
  props.playlist.id
);
const handleSubmit = async () => {
  const newSong = {
    title: title.value,
    artist: artist.value,
    id: Math.floor(Math.random() * 1000000),
  };

  await updateDoc({ songs: [...props.playlist.songs, newSong] });

  if (!error.value) {
    resetForm();
  }
};

const resetForm = () => {
  title.value = "";
  artist.value = "";
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
