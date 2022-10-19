<template>
  <form class="create-form" @submit.prevent="handleSubmit">
    <input v-model="title" type="text" placeholder="Playlist Title" />
    <textarea
      v-model="description"
      placeholder="Playlist description"
    ></textarea>
    <label class="create-form-label"
      >Upload playlist cover image<input class="create-from-upload" type="file"
    /></label>
    <button class="btn">Create</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const title = ref("");
const description = ref("");

const handleSubmit = async () => {
  console.log(title.value, description.value);
};
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
