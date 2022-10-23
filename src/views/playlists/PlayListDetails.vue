<template>
  <span v-if="error" class="error">{{ error }}</span>
  <article v-if="playlist" class="playlist-details">
    <div class="playlist-details-info">
      <div class="playlist-details-cover">
        <img
          class="playlist-details-img"
          :src="playlist.coverUrl"
          :alt="playlist.title"
        />
      </div>

      <h2 class="playlist-details-title">{{ playlist.title }}</h2>
      <span class="playlist-details-user"
        >Created by {{ playlist.userName }}</span
      >
      <p class="playlist-details-desc">{{ playlist.description }}</p>
    </div>

    <ul class="playlist-details-songs">
      Songs
    </ul>
  </article>
</template>

<script setup>
import getDocument from "@/composables/getDocument";

const props = defineProps({
  id: String,
});

const { error, document: playlist } = getDocument("playlists", props.id);
</script>

<style scoped lang="less">
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;

  &-cover {
    border-radius: 20px;
    overflow: hidden;
  }

  &-img {
    display: block;
    max-width: 100%;
    object-fit: cover;
  }

  &-info {
    text-align: center;
  }

  &-title {
    text-transform: capitalize;
    font-size: 28px;
    margin: 20px 0 0;
  }

  &-desc {
    text-align: left;
  }

  &-user {
    color: #999;
  }
}
</style>
