<template>
  <div class="navbar">
    <nav class="navbar-container">
      <img class="navbar-img" src="@/assets/images/ninja.png" alt="Logo" />
      <h1 class="navbar-title">
        <router-link :to="{ name: 'Home' }">Music playlist</router-link>
      </h1>
      <div class="navbar-links">
        <button
          @click="handleClick"
          class="btn"
          type="button"
          :disabled="isPending"
        >
          Logout
        </button>
        <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
        <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import useLogout from "@/composables/useLogout";

const router = useRouter();

const { error, logout, isPending } = useLogout();
const handleClick = async () => {
  await logout();

  if (!error.value) {
    console.log("logout");
    router.push({ name: "Login" });
  }
};
</script>

<style scoped lang="less">
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background-color: white;

  &-container {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  &-title {
    margin-left: 20px;
  }

  &-links {
    margin-left: auto;
  }

  .btn {
    margin-left: 16px;
    font-size: 14px;
  }

  &-img {
    max-height: 60px;
  }
}
</style>
