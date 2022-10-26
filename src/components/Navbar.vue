<template>
  <div class="navbar">
    <nav class="navbar-container">
      <img class="navbar-img" src="@/assets/images/ninja.png" alt="Logo" />
      <h1 class="navbar-title">
        <router-link :to="{ name: 'Home' }">Music playlist</router-link>
      </h1>
      <div class="navbar-links">
        <template v-if="user">
          <router-link class="btn" :to="{ name: 'CreatePlaylist' }"
            >Create Playlist</router-link
          >
          <router-link class="btn" :to="{ name: 'UserPlaylists' }"
            >My Playlists</router-link
          >
          <span class="navbar-username">Hi there, {{ user.displayName }}</span>
          <button
            @click="handleClick"
            class="btn"
            type="button"
            :disabled="isPending"
          >
            Logout
          </button></template
        >

        <template v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
        </template>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";

const router = useRouter();
const { user } = getUser();

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

  &-username {
    display: inline-block;
    margin-left: 30px;
    font-size: 14px;
  }
}
</style>
