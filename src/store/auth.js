import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', {
    state: () => ({
      user: null,
      loggedOutAt: null,
    }),
    actions: {
      setUser(userData) {
        this.user = userData;
      },
      logOut() {
        this.user = null;
        this.loggedOutAt = Date.now();
      }
    },
  });