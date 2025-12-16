<template>
  <div class="container flex-center">
    <div class="card login-card slide-in">
      <div class="card-header">
        <h2 class="retro-font text-center">{{ loginMethod === 'password' ? 'PASSWORD AUTH' : 'SSEO SECURE' }}</h2>
      </div>

      <!-- TOGGLE SWITCH -->
      <div class="auth-switch">
        <button @click="loginMethod = 'password'" :class="{active: loginMethod === 'password'}"><i class="fas fa-key"></i></button>
        <button @click="loginMethod = 'sseo'" :class="{active: loginMethod === 'sseo'}"><i class="fas fa-shield-alt"></i></button>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
            <i class="fas fa-user input-icon"></i>
            <input v-model="form.username" placeholder="USERNAME" class="input-field" required>
        </div>

        <!-- PASSWORD INPUT -->
        <div v-if="loginMethod === 'password'" class="input-group slide-fade">
            <i class="fas fa-lock input-icon"></i>
            <input v-model="form.password" type="password" placeholder="PASSWORD" class="input-field" required>
        </div>

        <!-- SSEO CODE INPUT -->
        <div v-else class="input-group slide-fade">
            <i class="fas fa-barcode input-icon"></i>
            <input v-model="form.sseoCode" placeholder="ACCESS CODE" class="input-field sseo-input" maxlength="6" required>
        </div>

        <button type="submit" class="btn w-full retro-font">
            {{ loginMethod === 'password' ? 'LOGIN' : 'VERIFY CODE' }}
        </button>
      </form>

      <div class="footer-link">
        <router-link to="/register">Create New Identity</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const loginMethod = ref('password'); // 'password' or 'sseo'
const form = reactive({ username: '', password: '', sseoCode: '' });

const handleLogin = async () => {
  try {
    const payload = {
        username: form.username,
        method: loginMethod.value,
        password: form.password,
        sseoCode: form.sseoCode
    };
    
    await auth.login(payload);
    router.push('/profile');
  } catch(e) {
    if(e.message === 'BANNED') router.push('/banned');
    else alert('ACCESS DENIED: ' + (e.response?.data?.message || 'Invalid Credentials'));
  }
};
</script>

<style scoped>
.flex-center { display: flex; align-items: center; justify-content: center; height: 80vh; }
.login-card { width: 100%; max-width: 400px; padding: 30px; border: 1px solid var(--primary); box-shadow: 0 0 20px rgba(29, 78, 216, 0.2); }
.card-header { margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px; }

.auth-switch { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
.auth-switch button { 
    background: #111; border: 1px solid #333; color: #666; width: 50px; height: 40px; cursor: pointer; transition: 0.3s;
}
.auth-switch button.active { background: var(--primary); color: white; border-color: var(--accent); box-shadow: 0 0 10px var(--primary); }

.input-group { position: relative; margin-bottom: 15px; }
.input-icon { position: absolute; left: 15px; top: 15px; color: #666; }
.input-field { padding-left: 40px; font-family: 'Roboto'; }
.sseo-input { text-align: center; letter-spacing: 5px; font-family: 'Press Start 2P'; color: var(--accent); }

.footer-link { text-align: center; margin-top: 20px; font-size: 0.8rem; }
.footer-link a { color: var(--accent); text-decoration: underline; }

.slide-fade { animation: fadeUp 0.3s ease-out; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
