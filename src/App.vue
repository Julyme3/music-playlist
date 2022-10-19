<template>
  <Navbar />
  <div class="content">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
</script>

<style lang="less" scoped>
.content {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
</style>
