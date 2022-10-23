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
      <button v-if="ownershitp" @click="handleDelete" type="button">
        Delete Playlist
      </button>
    </div>

    <ul class="playlist-details-songs">
      Songs
    </ul>
  </article>
</template>

<script setup>
import { computed } from "vue";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";

const props = defineProps({
  id: String,
});

const { error, document: playlist } = getDocument("playlists", props.id);

const { user } = getUser();
const ownershitp = computed(
  () => playlist.value && user.value?.uid === playlist.value.userId
);

const { deleteDoc } = useDocument("playlists", props.id);
const handleDelete = () => {
  deleteDoc();
};
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
