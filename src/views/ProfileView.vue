<template>
  <div class="container slide-in">
    <!-- HEADER WITH SETTINGS ICON -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
        <div></div> <!-- Spacer -->
        <h1 class="retro-font" style="color:var(--primary); margin:0;">USER PROFILE</h1>
        <router-link to="/settings" class="btn-setting">
            <i class="fas fa-cog"></i>
        </router-link>
    </div>
    
    <div class="profile-grid">
        <!-- Identity Card -->
        <div class="card">
            <h3 class="retro-font section-title">IDENTITY</h3>
            <div class="avatar-box">
                <img :src="auth.user?.avatarUrl" class="avatar-img" alt="Avatar">
            </div>
            <div class="info-row">
                <label>USERNAME</label>
                <div class="val">{{ auth.user?.username }}</div>
            </div>
            <div class="info-row">
                <label>ROLE</label>
                <div class="val" style="color:var(--accent)">{{ auth.user?.role?.toUpperCase() }}</div>
            </div>
            <div class="info-row">
                <label>STATUS</label>
                <div class="val" :style="{color: auth.user?.isApproved ? '#10b981' : '#fbbf24'}">
                    {{ auth.user?.isApproved ? 'APPROVED' : 'PENDING' }}
                </div>
            </div>
            <!-- LIMIT COUNTER UNTUK USER PENDING -->
            <div v-if="!auth.user?.isApproved && auth.user?.role !== 'admin'" class="info-row">
                <label>FREE LIMIT</label>
                <div class="val text-gold">{{ auth.user?.promptCount || 0 }} / 100</div>
            </div>
        </div>

        <!-- STATISTICS CARD -->
        <div class="card">
            <h3 class="retro-font section-title">STATISTICS</h3>
            <div class="stat-box">
                <div class="info-row">
                    <label>API REQUESTS</label>
                    <div class="val">{{ auth.user?.apiReqCount || 0 }} Hits</div>
                </div>
                <div class="info-row">
                    <label>TOKEN USAGE ⚡</label>
                    <div class="val text-gold">{{ auth.user?.tokenUsage || 0 }} Tokens</div>
                </div>
                <div class="info-row">
                    <label>ACCOUNT HEALTH 💗</label>
                    <div class="val" style="color:#f472b6;">{{ auth.user?.healthStatus || '100% (HEALTHY)' }}</div>
                </div>
            </div>
        </div>

        <!-- API KEY CARD -->
        <div class="card full-width">
            <h3 class="retro-font section-title">DEVELOPER API</h3>
            <p style="font-size:0.8rem; color:#888; margin-bottom:15px;">
                Access DevCORE via external tools.
                <router-link to="/docs" style="color:var(--accent)">Read Docs</router-link>.
            </p>
            
            <div class="api-box">
                <div class="key-display">
                    {{ auth.user?.personalApiKey || 'NO API KEY GENERATED' }}
                </div>
                <button @click="generateKey" class="btn">
                    <i class="fas fa-sync"></i> {{ auth.user?.personalApiKey ? 'REGENERATE' : 'GENERATE' }}
                </button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import axios from 'axios';

const auth = useAuthStore();
const API = 'https://wanzofc-dev.vercel.app/api';
const headers = { headers: { Authorization: `Bearer ${auth.token}` } };

const generateKey = async () => {
    if(!confirm('Generate new API Key? Old key will stop working.')) return;
    try {
        await axios.post(`${API}/auth/generate-key`, {}, headers);
        auth.fetchProfile(); 
        alert('New API Key Generated!');
    } catch(e) { alert('Error generating key'); }
};

onMounted(() => { auth.fetchProfile(); });
</script>

<style scoped>
.btn-setting { color: #666; font-size: 1.2rem; transition: 0.3s; }
.btn-setting:hover { color: var(--accent); transform: rotate(90deg); }
.profile-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.full-width { grid-column: 1 / -1; }
.section-title { border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 20px; font-size: 0.8rem; color: #fff; }
.avatar-box { text-align: center; margin-bottom: 20px; }
.avatar-img { width: 100px; height: 100px; border-radius: 50%; border: 2px solid var(--primary); background: #000; }
.info-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.8rem; border-bottom: 1px solid #111; padding-bottom: 5px; align-items: center; }
.info-row label { color: #666; font-size: 0.7rem; font-weight: bold; }
.info-row .val { color: #ccc; font-family: 'Courier New'; font-weight: bold; }
.text-gold { color: #fbbf24; }
.api-box { display: flex; gap: 10px; align-items: center; background: #000; padding: 15px; border: 1px solid var(--accent); border-radius: 4px; }
.key-display { flex: 1; font-family: 'Courier New'; font-size: 1rem; color: var(--accent); letter-spacing: 1px; word-break: break-all; }
</style>
