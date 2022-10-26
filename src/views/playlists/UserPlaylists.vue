<template>
  <div class="user-playlist">
    <h2>My playlists</h2>
    <List v-if="playlists" :playlists="playlists" />
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a new Playlist</router-link
    >
  </div>
</template>

<script setup>
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";
import List from "@/components/List.vue";

const { user } = getUser();
const { documents: playlists } = getCollection("playlists", [
  "userId",
  "==",
  user.value.uid,
]);
</script>

<style scoped lang="less"></style>
