import { defineStore } from "pinia";
import { computed, ref } from "vue";


interface IUser {
  id: number;
  email: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null as IUser | null);

  const isAuthenticated = computed(() => {
    return !!user.value;
  });

  const getUser = computed(() => user);

  async function setUser(newUser: IUser) {
    user.value = newUser;
  }

  return { user, isAuthenticated, getUser, setUser };
});
