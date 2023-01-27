import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

import routes from "./routes/routes";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";

const router = createRouter({   
    history: createWebHistory(),
    routes,
});

const pinia = createPinia()


const app = createApp(App); 
app.use(router);
app.use(pinia);

app.mount("#app");
