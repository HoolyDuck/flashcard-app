import Auth from "../components/Auth.vue";
import MainPage from "../components/MainPage.vue";
import TopicPage from "../components/TopicPage.vue";

const routes = [
  { path: "/", component: MainPage },
  { path: "/login", component: Auth },
  { path: "/register", component: Auth },
  { path: "/topics", component: TopicPage, meta: { auth: true } },
];

export default routes;
