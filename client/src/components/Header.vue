
<template>
    <header>
        <router-link to="/">
            <img class="logo" src="../assets/icons8-education-64.png" alt="flashcard app logo" />
        </router-link>

        <router-link v-if="authStore.isAuthenticated" to="/">
            <button @click="logout" class="login-btn">Logout</button>
        </router-link>

        <router-link v-else to="/login">
            <button class="login-btn">Login</button>
        </router-link>
    </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore.js";

const authStore = useAuthStore();

function logout() {
    authStore.logout();
}

</script>

<style scoped>
.logo {
    width: 50px;
    height: 50px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #bffff3;
}

.login-btn {
    border: none;
    font-size: 1.2rem;
    font-weight: bold;


    background: linear-gradient(to right, #2c73d2, #009ce9);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    cursor: pointer;
}
</style>