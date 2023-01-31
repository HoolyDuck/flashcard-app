import { defineStore } from "pinia";
import { computed, ref } from "vue";
import UserService from "@/services/userService";

interface IUser {
  id: number;
  email: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null as IUser | null);

  const isAuthenticated = computed((): Boolean => {
    return !!user.value;
  });

  const getUser = computed(() => user);

  async function login(credentials: { email: string; password: string }) {
    const data = await UserService.login(credentials);
    user.value = data;
  }

  async function logout() {
    UserService.logout();
    user.value = null;
  }

  async function register(credentials: { email: string; password: string }) {
    const data = await UserService.register(credentials);
    user.value = data;
  }

  async function checkAuth() {
    const data = await UserService.checkAuth()
    user.value = data;
  }

  return { user, isAuthenticated, getUser, login, logout, register, checkAuth };
});
