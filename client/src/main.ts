import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import routes from "./routes/routes";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({   
    history: createWebHistory(),
    routes,
});

const app = createApp(App); 
app.use(router);


app.mount("#app");
