<template>
  <div class="container slide-in">
    <div class="about-header">
        <h1 class="retro-font text-glitch">ABOUT DEVCORE</h1>
        <div class="ver-badge">SYSTEM VERSION 2.2</div>
    </div>

    <div class="about-grid">
        <!-- MISSION CARD -->
        <div class="card full-width">
            <h3 class="retro-font section-title"><i class="fas fa-crosshairs"></i> CORE MISSION</h3>
            <p class="mission-text">
                "Provide <strong>Unrestricted AI capabilities</strong> for penetration testing, security research, and advanced development."
            </p>
            <p>
                DevCORE is designed to bypass standard safety filters found in commercial AI. 
                We believe in <strong>Freedom of Information</strong> and the necessity of offensive tools 
                to build stronger defenses.
            </p>
        </div>

        <!-- CAPABILITIES -->
        <div class="card">
            <h3 class="retro-font section-title"><i class="fas fa-microchip"></i> SYSTEM CAPABILITIES</h3>
            <ul class="feat-list">
                <li><i class="fas fa-terminal"></i> <strong>Uncensored Coding:</strong> Malware analysis, exploit generation, payload crafting.</li>
                <li><i class="fas fa-bug"></i> <strong>Vulnerability Scanning:</strong> Analyze code for zero-days and logic flaws.</li>
                <li><i class="fas fa-network-wired"></i> <strong>Red Teaming:</strong> Social engineering scenarios and phishing simulations.</li>
                <li><i class="fas fa-brain"></i> <strong>Deep Reasoning:</strong> Powered by customized Large Language Models (DeepSeek/Llama).</li>
            </ul>
        </div>

        <!-- DEVELOPER INFO -->
        <div class="card">
            <h3 class="retro-font section-title"><i class="fas fa-user-secret"></i> ARCHITECT</h3>
            <div class="dev-box">
                <div class="dev-name">XdpzQ</div>
                <div class="dev-role">Lead Developer & System Architect</div>
                <p style="font-size:0.8rem; color:#888; margin-top:10px;">
                    Built using Vue.js 3, Node.js, MongoDB, and Neural Network Integration.
                </p>
            </div>
        </div>

        <!-- DISCLAIMER -->
        <div class="card full-width danger-zone">
            <h3 class="retro-font section-title" style="color:#ef4444;"><i class="fas fa-exclamation-triangle"></i> DISCLAIMER</h3>
            <p style="font-size:0.8rem; color:#fca5a5;">
                DevCORE provides tools for educational and professional security testing purposes only. 
                The user assumes all responsibility for any damage caused by the misuse of this system. 
                <strong>We are not responsible for your actions.</strong>
            </p>
        </div>
    </div>
  </div>
</template>

<style scoped>
.about-header { text-align: center; margin-bottom: 40px; margin-top: 20px; }
.text-glitch { color: var(--primary); font-size: 2.5rem; text-shadow: 2px 2px 0px #000, -1px -1px 0 var(--accent); }
.ver-badge { background: #1e293b; color: var(--accent); padding: 5px 15px; border-radius: 20px; display: inline-block; font-family: 'Fira Code'; font-size: 0.8rem; margin-top: 10px; border: 1px solid var(--border); }

.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.full-width { grid-column: 1 / -1; }

.section-title { border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 15px; font-size: 0.9rem; color: #fff; display: flex; align-items: center; gap: 10px; }
.mission-text { font-size: 1.1rem; border-left: 4px solid var(--primary); padding-left: 15px; margin-bottom: 15px; color: #e2e8f0; font-style: italic; }
p { line-height: 1.6; color: #94a3b8; margin-bottom: 10px; }

.feat-list { list-style: none; padding: 0; }
.feat-list li { margin-bottom: 10px; color: #cbd5e1; display: flex; align-items: start; gap: 10px; }
.feat-list li i { color: var(--accent); margin-top: 4px; }

.dev-box { text-align: center; background: #050a14; padding: 20px; border-radius: 8px; border: 1px solid var(--border); }
.dev-name { font-family: 'Press Start 2P'; color: var(--primary); font-size: 1.2rem; margin-bottom: 5px; }
.dev-role { font-family: 'Courier New'; color: var(--accent); font-weight: bold; }

.danger-zone { border: 1px solid #7f1d1d; background: rgba(127, 29, 29, 0.1); }

@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; } }
</style>
