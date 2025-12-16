<template>
  <div class="container slide-in">
    <h1 class="retro-font text-center" style="margin-bottom:30px; color:var(--primary)">SYSTEM CONFIG</h1>
    
    <div class="settings-grid">
        
        <!-- DISPLAY FONT SELECTION -->
        <div class="card">
            <h3 class="retro-font section-title">VISUAL INTERFACE</h3>
            <div class="setting-item">
                <label>TERMINAL FONT</label>
                <select v-model="settings.font" @change="saveSettings" class="input-field">
                    <option value="Roboto">Standard (Roboto)</option>
                    <option value="Press Start 2P">Retro (Press Start 2P)</option>
                    <option value="Fira Code">Coder (Fira Code)</option>
                    <option value="Hack">Hacker (Monospace)</option>
                </select>
            </div>
        </div>

        <!-- AUTHENTICATION (SSEO) -->
        <div class="card">
            <h3 class="retro-font section-title">SECURE LOGIN (SSEO)</h3>
            <div class="setting-item">
                <label>ENABLE SSEO (LOGIN WITH CODE)</label>
                <div class="switch-box">
                    <button @click="toggleSSEO" :class="settings.sseoEnabled ? 'btn-on' : 'btn-off'">
                        {{ settings.sseoEnabled ? 'ENABLED' : 'DISABLED' }}
                    </button>
                </div>
            </div>
            
            <div class="setting-item" v-if="settings.sseoEnabled">
                <label>ACCESS CODE (PASSKEY)</label>
                <div class="code-display">
                    <input v-model="settings.sseoCode" class="input-code" maxlength="6">
                    <button @click="saveSettings" class="btn-save"><i class="fas fa-save"></i></button>
                </div>
                <small style="color:#666;">Use this code to login without password.</small>
            </div>
        </div>

        <!-- A2F (2 FACTOR AUTH) -->
        <div class="card">
            <h3 class="retro-font section-title">2-FACTOR AUTH (A2F)</h3>
            <div class="qr-box">
                <!-- Fake QR Generation using API based on secret -->
                <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${auth.user?.twoFactorSecret}`" class="qr-img">
                <div class="secret-key">
                    SECRET KEY: <span style="color:var(--accent)">{{ auth.user?.twoFactorSecret }}</span>
                </div>
            </div>
            <p style="font-size:0.8rem; color:#888; margin-top:10px;">
                Scan with Google Authenticator. This is your unique identity token.
            </p>
        </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import axios from 'axios';

const auth = useAuthStore();
const settings = reactive({
    font: 'Roboto',
    sseoEnabled: false,
    sseoCode: ''
});
const API = 'https://wanzofc-dev.vercel.app/api';
const headers = { headers: { Authorization: `Bearer ${auth.token}` } };

const loadSettings = () => {
    if(auth.user) {
        settings.font = auth.user.fontPreference || 'Roboto';
        settings.sseoEnabled = auth.user.sseoEnabled || false;
        settings.sseoCode = auth.user.sseoCode || '';
    }
};

const toggleSSEO = () => {
    settings.sseoEnabled = !settings.sseoEnabled;
    saveSettings();
};

const saveSettings = async () => {
    try {
        await axios.post(`${API}/auth/settings`, {
            font: settings.font,
            sseoEnabled: settings.sseoEnabled,
            sseoCodeNew: settings.sseoCode
        }, headers);
        
        // Update Local Store
        auth.fetchProfile();
        alert('Settings Saved.');
    } catch(e) { alert('Failed to save settings'); }
};

onMounted(() => {
    auth.fetchProfile().then(loadSettings);
});
</script>

<style scoped>
.settings-grid { display: grid; gap: 20px; max-width: 800px; margin: 0 auto; }
.section-title { border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 20px; font-size: 0.8rem; color: var(--primary); }
.setting-item { margin-bottom: 20px; }
.setting-item label { display: block; font-size: 0.7rem; color: #888; margin-bottom: 8px; font-weight: bold; }

.switch-box button { width: 100%; padding: 10px; border: none; font-weight: bold; cursor: pointer; border-radius: 4px; font-family: 'Press Start 2P'; font-size: 0.7rem; }
.btn-on { background: var(--success); color: black; box-shadow: 0 0 10px var(--success); }
.btn-off { background: #333; color: #666; }

.code-display { display: flex; gap: 10px; }
.input-code { flex: 1; background: #000; border: 1px solid var(--accent); color: var(--accent); font-family: 'Press Start 2P'; font-size: 1rem; text-align: center; padding: 10px; letter-spacing: 5px; }
.btn-save { background: var(--primary); border: none; color: white; width: 50px; cursor: pointer; }

.qr-box { text-align: center; background: white; padding: 10px; border-radius: 5px; width: fit-content; margin: 0 auto; }
.qr-img { width: 150px; height: 150px; }
.secret-key { margin-top: 10px; font-family: 'Courier New'; font-size: 0.9rem; background: #000; color: white; padding: 5px; border-radius: 4px; display: inline-block; }
</style>
