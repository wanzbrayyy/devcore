import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'https://wanzofc-dev.vercel.app/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin'
  },
  actions: {
    async login(payload) { // payload bisa {username, password} atau {username, sseoCode, method}
      try {
          const res = await axios.post(`${API_URL}/auth/login`, payload);
          this.setUserData(res.data);
          // Apply Font
          this.applyFont(res.data.fontPreference);
          return true;
      } catch (e) {
          if (e.response && e.response.data.message === 'ACCOUNT_BANNED') {
              throw new Error('BANNED');
          }
          throw e;
      }
    },
    
    async fetchProfile() {
      if (!this.token) return;
      try {
        const res = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${this.token}` }
        });
        this.setUserData(res.data, false);
        this.applyFont(res.data.fontPreference);
      } catch (e) {
        if(e.response && e.response.status === 403 && e.response.data.message === 'ACCOUNT_BANNED') {
            this.logout();
            window.location.href = '/banned'; // Force redirect
        }
      }
    },

    setUserData(data, updateToken = true) {
      this.user = data;
      localStorage.setItem('user', JSON.stringify(data));
      if (updateToken && data.token) {
          this.token = data.token;
          localStorage.setItem('token', data.token);
      }
    },

    applyFont(fontName) {
        const body = document.body;
        body.classList.remove('font-roboto', 'font-press', 'font-fira', 'font-hack');
        if(fontName === 'Press Start 2P') body.classList.add('font-press');
        else if(fontName === 'Fira Code') body.classList.add('font-fira');
        else if(fontName === 'Hack') body.classList.add('font-hack');
        else body.classList.add('font-roboto');
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});
