<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input
      type="password"
      placeholder="Password"
      v-model="password"
      autocomplete
    />
    <span v-if="error" class="error">{{ error }}</span>
    <button class="btn" :disabled="isPending">Sign up</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import useSignup from "@/composables/useSignup";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const displayName = ref("");
const { signup, error, isPending } = useSignup();

const handleSubmit = async () => {
  await signup(email.value, password.value, displayName.value);

  if (!error.value) {
    router.push({ name: "UserPlaylists" });
  }
};
</script>

<style scoped></style>
