<template>
  <div class="container slide-in">
    <h1 class="retro-font text-center" style="margin-bottom:10px; color:var(--primary)">UPGRADE MEMBERSHIP</h1>
    <p class="text-center" style="color:#888; margin-bottom:40px;">Unlock Full Potential of DevCORE AI</p>
    
    <div class="pricing-grid">
        
        <!-- PLAN 1: PREMIUM -->
        <div class="price-card">
            <h2 class="retro-font plan-title">PREMIUM</h2>
            <div class="price">15K <span style="font-size:1rem; color:#888;">/ mo</span></div>
            <ul class="features">
                <li><i class="fas fa-check"></i> 5,000 Token API Limit</li>
                <li><i class="fas fa-check"></i> Access Terminal</li>
                <li class="disabled"><i class="fas fa-times"></i> No Photo Upload</li>
                <li class="disabled"><i class="fas fa-times"></i> No Custom AI Name</li>
                <li class="disabled"><i class="fas fa-times"></i> No Custom Dev Name</li>
                <li><i class="fas fa-shield-alt"></i> Role: <strong>PREMIUM</strong></li>
            </ul>
            <!-- BUTTON WITH WA LINK -->
            <button @click="buyPlan('premium')" class="btn btn-buy">BUY PREMIUM</button>
        </div>

        <!-- PLAN 2: DEMON (SPECIAL) -->
        <div class="price-card demon-card">
            <div class="best-badge">BEST VALUE</div>
            <h2 class="retro-font plan-title" style="color:#ef4444;">DEMON</h2>
            <div class="price">25K <span style="font-size:1rem; color:#fca5a5;">/ life</span></div>
            <ul class="features">
                <li><i class="fas fa-check"></i> <strong>UNLIMITED TOKEN</strong></li>
                <li><i class="fas fa-check"></i> Upload & Analyze Images</li>
                <li><i class="fas fa-check"></i> Custom AI & Dev Name</li>
                <li><i class="fas fa-skull"></i> Role: <strong>DEMON</strong></li>
            </ul>

            <!-- DEMON FEATURES TOGGLE -->
            <div class="demon-extras">
                <button @click="showDemon = !showDemon" class="btn-toggle">
                    <i class="fas" :class="showDemon ? 'fa-chevron-up' : 'fa-chevron-down'"></i> 
                    SHOW DEMON CAPABILITIES
                </button>
                
                <div v-if="showDemon" class="extra-list slide-down">
                    <div class="extra-item">1. Steal Token</div>
                    <div class="extra-item">2. Ban User Premium (-10 Health)</div>
                    <div class="extra-item">3. Steal Limit Token</div>
                    <div class="extra-item">4. IP Logger</div>
                    <div class="extra-item">5. Force Logout Target</div>
                    <div class="extra-item">6. Bypass Maintenance</div>
                    <div class="extra-item">7. View Target Chat History</div>
                    <div class="extra-item">8. Inject System Prompt</div>
                    <div class="extra-item">9. Priority Queue</div>
                    <div class="extra-item">10. Invisible Mode</div>
                </div>
            </div>

            <!-- BUTTON WITH WA LINK -->
            <button @click="buyPlan('demon')" class="btn btn-demon">BECOME DEMON</button>
        </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const showDemon = ref(false);

const buyPlan = (plan) => {
    const phoneNumber = "6288801074059";
    let message = "";

    if (plan === 'premium') {
        message = "Halo Admin DevCORE, saya ingin membeli paket PREMIUM (15K). Mohon info pembayarannya.";
    } else if (plan === 'demon') {
        message = "Halo Admin DevCORE, saya ingin membeli paket DEMON (25K) untuk akses Unlimited & Fitur Jahat. Mohon info pembayarannya.";
    }

    // Encode URL agar spasi dan karakter khusus terbaca
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Buka di tab baru
    window.open(url, '_blank');
};
</script>

<style scoped>
.pricing-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; }
.price-card { 
    background: #020617; border: 1px solid #1e293b; padding: 30px; 
    border-radius: 10px; width: 350px; position: relative; text-align: center;
}
.plan-title { font-size: 1.5rem; margin-bottom: 10px; color: var(--accent); }
.price { font-size: 2.5rem; font-weight: bold; color: white; margin-bottom: 20px; font-family: 'Courier New'; }
.features { list-style: none; text-align: left; padding: 0; margin-bottom: 30px; }
.features li { margin-bottom: 10px; color: #ccc; font-size: 0.9rem; }
.features li i { margin-right: 10px; color: var(--success); }
.features li.disabled { color: #555; }
.features li.disabled i { color: #555; }

.btn-buy { background: transparent; border: 1px solid var(--accent); width: 100%; color: var(--accent); }
.btn-buy:hover { background: var(--accent); color: white; }

/* DEMON CARD STYLE */
.demon-card { border: 1px solid #ef4444; background: linear-gradient(180deg, #1a0505 0%, #000 100%); transform: scale(1.05); }
.best-badge { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #ef4444; color: white; padding: 5px 15px; font-size: 0.7rem; font-weight: bold; border-radius: 20px; }
.features li i { color: #ef4444; } 
.btn-demon { background: #ef4444; border: none; width: 100%; color: white; font-weight: bold; }
.btn-demon:hover { background: #b91c1c; box-shadow: 0 0 15px rgba(239,68,68,0.5); }

/* DEMON EXTRAS */
.demon-extras { margin-bottom: 20px; border-top: 1px dashed #ef4444; padding-top: 15px; }
.btn-toggle { background: none; border: none; color: #fca5a5; font-size: 0.7rem; cursor: pointer; width: 100%; }
.extra-list { text-align: left; background: #2a0a0a; padding: 10px; border-radius: 5px; margin-top: 10px; border: 1px solid #7f1d1d; }
.extra-item { color: #fca5a5; font-family: 'Courier New'; font-size: 0.8rem; margin-bottom: 5px; }
.extra-item::before { content: "• "; color: #ef4444; }

@media (max-width: 768px) { .demon-card { transform: scale(1); } }
</style>
