<template>
  <div class="banned-container">
    <div class="banned-card">
        <i class="fas fa-ban fa-5x" style="color:red; margin-bottom:20px;"></i>
        <h1 class="retro-font blink">ACCOUNT TERMINATED</h1>
        <p>YOUR CONNECTION HAS BEEN SEVERED.</p>
        <div class="reason">
            REASON: HEALTH CRITICAL (0%)<br>
            STATUS: PERMANENT BAN
        </div>
        <p style="font-size:0.7rem; color:#666; margin-top:30px;">ID: {{ auth.user?._id || 'UNKNOWN' }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';
const auth = useAuthStore();
</script>

<style scoped>
.banned-container { height: 100vh; background: #000; display: flex; align-items: center; justify-content: center; color: red; text-align: center; }
.banned-card { border: 2px solid red; padding: 50px; background: #1a0000; box-shadow: 0 0 50px red; }
.reason { margin-top: 30px; font-family: 'Courier New'; border: 1px dashed red; padding: 10px; font-weight: bold; }
.blink { animation: blink 0.5s infinite; font-size: 2rem; }
@keyframes blink { 50% { opacity: 0; } }
</style>
