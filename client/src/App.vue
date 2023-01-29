<script setup lang="ts">
import Header from './components/Header.vue'
import { useAuthStore } from "@/store/store";
import { onBeforeMount } from 'vue'
import { auth } from "./http/userApi"

const authStore = useAuthStore();

//fix refresh page bug when user is logged in later
onBeforeMount(() => {
  if (localStorage.getItem('token')) {
        auth()
          .then(data => {
            authStore.setUser(data)
          })
          .catch(() => {
            localStorage.removeItem('token')
          })
      }
})

</script>

<template>

  <Header></Header>

  <main>
    <RouterView></RouterView>
  </main>

</template>

<style scoped>

</style>
