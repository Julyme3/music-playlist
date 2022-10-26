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
      <button
        v-if="ownershitp"
        @click="handleDeletePlaylist"
        type="button"
        :disabled="isPending"
      >
        Delete Playlist
      </button>
    </div>

    <div class="playlist-details-songs">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet.
      </div>
      <ul v-else>
        <li
          v-for="song in playlist.songs"
          :key="song.id"
          class="playlist-details-song"
        >
          <div>
            <h3 class="playlist-details-song-title">{{ song.title }}</h3>
            <p class="playlist-details-song-artist">{{ song.artist }}</p>
          </div>
          <button
            v-if="ownershitp"
            type="button"
            class="playlist-details-btn"
            @click="handleDeleteSong(song.id)"
            :disabled="isPending"
          >
            Delete
          </button>
        </li>
      </ul>
      <AddSong v-if="ownershitp" :playlist="playlist" />
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import AddSong from "@/components/AddSong.vue";

const props = defineProps({
  id: String,
});
const router = useRouter();

const { error, document: playlist } = getDocument("playlists", props.id);

const { user } = getUser();
const ownershitp = computed(
  () => playlist.value && user.value?.uid === playlist.value.userId
);

const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
const { deleteImage } = useStorage();
const isPending = ref(false);
const handleDeletePlaylist = async () => {
  isPending.value = true;
  await deleteImage(playlist.value?.filePath);
  await deleteDoc();
  isPending.value = false;
  router.push({ name: "Home" });
};

const handleDeleteSong = async (id) => {
  const filteredSongs = playlist.value.songs.filter((song) => song.id !== id);
  isPending.value = true;
  await updateDoc({ songs: filteredSongs });
  isPending.value = false;
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

  &-song {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
}
</style>
