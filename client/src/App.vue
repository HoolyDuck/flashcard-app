<script setup lang="ts">
import Header from './components/Header.vue'
import { useAuthStore } from "@/store/authStore";
import { onBeforeMount } from 'vue'
import { auth } from "./http/userApi"

const authStore = useAuthStore();

</script>

<template>

  <Header></Header>

  <main>
    <RouterView></RouterView>
  </main>

</template>

<style scoped>

</style>
