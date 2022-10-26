<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input
      type="password"
      placeholder="Password"
      v-model="password"
      autocomplete
    />
    <span v-if="error" class="error">{{ error }}</span>
    <button class="btn" :disabled="isPending">Log in</button>
  </form>
</template>

<script setup>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const { error, login, isPending } = useLogin();

const handleSubmit = async () => {
  await login(email.value, password.value);

  if (!error.value) {
    router.push({ name: "UserPlaylists" });
  }
};
</script>

<style scoped></style>
