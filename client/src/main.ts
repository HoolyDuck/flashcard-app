import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import routes from "./routes/routes";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";

import { useAuthStore } from "./store/authStore";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

library.add(faAt, faLock);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);

const authStore = useAuthStore();

router.beforeEach((to, from, next) => {
  authStore.checkAuth();
  if (to.meta.auth) {
    if (authStore.isAuthenticated) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

app.use(router);

app.mount("#app");
