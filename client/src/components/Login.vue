<template>
    <div class="login-box-wrapper">
        <form class="login-box">

            <div class="login-element"> <!-- prob make it a component -->
                <label for="email">Email</label>
                <input id="email" v-model="email" type="email" placeholder="Enter email" />
            </div>

            <div class="login-element"> <!-- prob make it a component -->
                <label for="password">Password</label>
                <input id="password" v-model="password" type="password" placeholder="Enter password" />
            </div>

            <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>

            <button class="login-btn" @click="loginAction">Login</button>

        </form>

    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/store";
import { login } from "../http/userApi";
import { ref } from "vue";
import type { AxiosError } from "axios";

const router = useRouter();
const authStore = useAuthStore();

let email = ref("");
let password = ref("");

let errorMessage = ref("")

async function loginAction(e: Event) {
    e.preventDefault();
    try {
        //prob move it elsewhere (to store or something)
        const response = await login(
            {
                email: email.value,
                password: password.value
            });

        authStore.setUser(response)
        errorMessage.value = ""
        router.push("/");
    }
    catch (e: any) {
        errorMessage.value = e.response.data.message
    }

}

</script>

<style scoped>
.login-box-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.login-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 25rem;
    min-height: 25rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    background: var(--generic-gradient-ss-s);
    border-radius: 10px;
}

.login-element input {
    background-color: transparent;
    border: none;
    border-bottom: 4px solid rgba(0, 0, 0, 0.3);
    text-align: right;
    padding: 0.5rem;
    margin: 0.5rem;
    width: 100%;
}

.login-element label {
    font-weight: bolder;
    font-size: 1.1rem;
    margin: 0;
    padding: 0;
    color: var(--generic-gradient-darker-blue);
}

.login-element {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
}


.login-btn {
    margin: 1rem;
    padding: 0.5rem;
    border: 1px solid black;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    float: right;
}

.login-btn:hover {
    background-color: #ccc;
}

.errorMessage {
    color: red;
    font-size: 0.8rem;
}
</style>