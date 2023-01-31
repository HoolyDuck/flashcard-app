<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";
import { ref, watch } from "vue";

const router = useRouter();
const authStore = useAuthStore();

const currentRoute = ref(router.currentRoute.value.path);

let email = ref("");
let password = ref("");

let isLoading = ref(false)
let errorMessage = ref("")

watch(router.currentRoute, (route) => {
    currentRoute.value = route.path;
});

async function loginAction(e: Event) {
    e.preventDefault();
    try {
        isLoading.value = true
        //prob move it elsewhere (to store or something)
        authStore.login(
            {
                email: email.value,
                password: password.value
            }).then(() => {
                errorMessage.value = ""
                router.push("/topics");
            });
    }
    catch (e: any) {
        errorMessage.value = !!e.response ? e.response.data.message : "Something went wrong";
    }
    finally {
        isLoading.value = false;
    }
}

async function registerAction(e: Event) {
    e.preventDefault();
    try {
        //prob move it elsewhere (to store or something)
        authStore.register(
            {
                email: email.value,
                password: password.value
            });
        errorMessage.value = ""
        router.push("/topics");
    }
    catch (e: any) {
        errorMessage.value = e.response.data.message
    }
}


</script>


<template>
    <div class="login-box-wrapper">

        <form class="login-box">

            <h1 v-if="currentRoute === '/register'">Sign up</h1>
            <h1 v-else>Sign in</h1>
            <div class="login-box-inputs">
                <div class="login-element"> <!-- prob make it a component -->
                    <font-awesome-icon icon="at" />
                    <input id="email" v-model="email" type="email" placeholder="Enter email" />
                </div>

                <div class="login-element"> <!-- prob make it a component -->
                    <font-awesome-icon icon="lock" />
                    <input id="password" v-model="password" type="password" placeholder="Enter password" />
                </div>

                <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>

                <button v-if="currentRoute === '/register'" class="login-btn" @click="registerAction">Register</button>
                <button v-else class="login-btn" @click="loginAction">{{ isLoading? "loading...": "Login" }}</button>

                <router-link v-if="currentRoute === '/register'" to="/login">Have an account? Sign in</router-link>
                <router-link v-else to="/register">Don't have an account? Sign up</router-link>

            </div>
        </form>

    </div>
</template>


<style scoped>
h1 {
    margin-bottom: .5rem;
    background: var(--generic-gradient-c-db-reverse);
    color: transparent;
    font-weight: 600;

    background-clip: text;

}

.login-box-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
}

.login-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 20rem;
    min-height: 25rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    background: var(--generic-gradient-ss-s);
    border-radius: 10px;
}

.login-box-inputs {
    display: flex;
    flex-direction: column;
    gap: .6rem;
    justify-content: center;
    align-items: center;
    margin: 1rem;
}


.login-element input {
    background-color: transparent;
    border: none;
    padding: 0.5rem;
    margin: 0.5rem;
    font-size: 1rem;
    outline: none;
}

.login-element {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.15);
    padding: 0 .5rem 0 1rem;
    border-radius: 10px;
}



.login-btn {
    font-size: 1rem;
    padding: 1rem;

    border: none;
    border-radius: 10px;
    background: var(--generic-gradient-c-db);
    cursor: pointer;
    float: right;
    transition: .4s;
    width: 100%;

}



.login-btn:hover {
    color: white;
}

.errorMessage {
    color: red;
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
}
</style>