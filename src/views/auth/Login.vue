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
    <button class="btn">Log in</button>
  </form>
</template>

<script setup>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const { error, login } = useLogin();

const handleSubmit = async () => {
  await login(email.value, password.value);

  if (!error.value) {
    console.log("Logged in");
  }
};
</script>

<style scoped></style>
