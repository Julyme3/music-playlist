<template>
  <main class="home">
    <span v-if="error" class="error">Could not fetch the playlists</span>
    <ul v-if="documents" class="home-playlists">
      <List :playlists="documents" />
    </ul>
  </main>
</template>

<script setup>
import getCollection from "@/composables/getCollection";
import List from "@/components/List.vue";

const { documents, error } = getCollection("playlists");
</script>
