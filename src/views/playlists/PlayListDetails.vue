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

    <div class="playlist-details-songs">
      <AddSong />
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";
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

const { deleteDoc } = useDocument("playlists", props.id);
const { deleteImage } = useStorage();
const handleDelete = async () => {
  await deleteImage(playlist.value?.filePath);
  await deleteDoc();

  router.push({ name: "Home" });
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
