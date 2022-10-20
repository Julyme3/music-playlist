<template>
  <form class="create-form" @submit.prevent="handleSubmit">
    <input v-model="title" type="text" placeholder="Playlist Title" />
    <textarea
      v-model="description"
      placeholder="Playlist description"
    ></textarea>
    <label class="create-form-label"
      >Upload playlist cover image<input
        @change="handleChangeImage"
        class="create-from-upload"
        type="file"
        accept="image/*"
    /></label>
    <button class="btn" :disabled="!isValidForm || isPending">
      {{ textBtn }}
    </button>
  </form>
</template>

<script setup>
import { computed, ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import { timestamp } from "@/firebase/config";
import getUser from "@/composables/getUser";

const title = ref("");
const description = ref("");
const file = ref(null);

const isValidForm = computed(
  () => title.value && description.value && file.value
);

const { url, filePath, uploadImage } = useStorage();
const { user } = getUser();
const { error, addDoc } = useCollection("playlists");
const isPending = ref(false);
const handleSubmit = async () => {
  if (file.value) {
    isPending.value = true;
    await uploadImage(file.value);
    await addDoc({
      title: title.value,
      description: description.value,
      userId: user.value.uid,
      userName: user.value.displayName,
      coverUrl: url.value,
      filePath: filePath.value,
      songs: [],
      createdAt: timestamp(),
    });
    isPending.value = false;

    if (!error.value) {
      console.log("Uploaded image, url: ", url.value);
    }
  }
};

const handleChangeImage = (e) => {
  const selected = e.target.files[0];

  if (selected) {
    file.value = selected;
  } else {
    file.value = null;
  }
};

const textBtn = computed(() => (isPending.value ? "Saving" : "Create"));
</script>

<style scoped lang="less">
.create-form {
  &-upload {
    border: 0;
    padding: 0;
  }
  &-label {
    display: block;
    font-size: 12px;
    margin-top: 30px;
  }

  .btn {
    margin-top: 20px;
  }
}
</style>
