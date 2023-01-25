<template>
    <button v-on:click="login">Login</button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function login() {
    console.log("login");
    router.push("/topics");
}

</script>

<style scoped>

</style>