<template>
  <li v-for="playlist in playlists" :key="playlist.id" class="playlist">
    <router-link
      :to="{ name: 'PlayListDetails', params: { id: playlist.id } }"
      class="playlist-inner"
    >
      <div class="playlist-thumbnail">
        <img
          class="playlist-img"
          :src="playlist.coverUrl"
          :alt="playlist.title"
        />
      </div>
      <div class="playlist-info">
        <h3 class="playlist-title">{{ playlist.title }}</h3>
        <span>{{ playlist.userName }}</span>
      </div>
      <span class="playlist-song-number">{{ playlist.songs.length }}</span>
    </router-link>
  </li>
</template>

<script setup>
defineProps({
  playlists: Object,
});
</script>

<style scoped lang="less">
.playlist {
  &-inner {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    margin: 16px 0;
    transition: all ease 0.2s;
    cursor: pointer;

    &:hover {
      box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
      transform: scale(1.02);
      transition: all ease 0.2s;
    }
  }

  &-thumbnail {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 10px;
  }

  &-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-info {
    margin: 0 30px;
  }

  &-song-number {
    margin-left: auto;
  }
}
</style>
