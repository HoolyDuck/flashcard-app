import Login from '../components/Login.vue';
import MainPage from '../components/MainPage.vue';
import TopicPage from '../components/TopicPage.vue';

const routes = [
    { path: '/', component: MainPage },
    { path: '/login', component: Login },
    { path: '/topics', component: TopicPage },

];

export default routes;