/**
 * ============================================================================
 * MY LIFE OS — ULTRA PRO EXPANSION ENGINE V3 (os-pro.js)
 * Complete Visual & 3D Interactive Overhaul for all 9 Life OS Modules:
 * 1. HEALTH & GYM STUDIO 3D: Gender-based Onboarding (Male/Female), Body Stats,
 *    Target Weight, Macro/Calorie Engine, 3D Muscle Map, Real Photo Exercise Cards,
 *    Built-in Rest Timer, & Custom Meal Plan.
 * 2. VISION BOARD & LIFE GOALS: Photo-backed 3D Vision Cards, Milestones & AI Coach.
 * 3. HABITS & ROUTINES STUDIO: Morning/Evening Visual Decks, Detox Shield & 30-Day Matrix.
 * 4. TIME INTELLIGENCE 24H: Visual Day Breakdown, Efficiency Score & Chronotype.
 * 5. SECOND BRAIN (PARA + 3D GRAPH): Interactive Node Canvas & Knowledge Cards.
 * 6. LEARNING CENTER 3D SHELF: Visual Bookshelf, Reading Speed Calculator & Course->Cal.
 * 7. LIFE EXPERIENCES & BUCKET LIST: Photo Destination Cards & Memory Passport.
 * 8. VIP CONTACTS CRM: Relationship Health Radar & Meeting Vault.
 * 9. DAILY JOURNAL, LIFE TIMELINE & AUTOMATION CENTER: Mood Studio & Smart Rules.
 * + Preserves 4 Themes, Collapsible Sidebar, Quick Capture, Timestamp Focus V6 & 14-Ch Mixer!
 * ============================================================================
 */

const OSProStore = {
  get(key, fallback = []) {
    try {
      const raw = localStorage.getItem("MY_LIFE_OS_PRO_" + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem("MY_LIFE_OS_PRO_" + key, JSON.stringify(val));
    } catch (e) {}
  }
};

function B() {
  return window.MyLifeOSBridge || {};
}

function esc(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function toast(msg, type = "success") {
  if (B().showToast) B().showToast(msg, type);
}

function today() {
  return B().todayISO ? B().todayISO() : new Date().toISOString().split("T")[0];
}

/* ============================================================================
   0. AUTO-INJECT SCOPED CSS FOR 3D GYM STUDIO & VISUAL PRO MODULES
   ============================================================================ */
function injectOSProVisualStyles() {
  if (document.getElementById("os-pro-v3-visual-styles")) return;
  const st = document.createElement("style");
  st.id = "os-pro-v3-visual-styles";
  st.textContent = `
    .pro-hero-banner {
      position: relative;
      border-radius: 22px;
      overflow: hidden;
      padding: 26px 28px;
      margin-bottom: 22px;
      border: 1px solid rgba(212, 167, 44, 0.42);
      background-size: cover;
      background-position: center;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75);
    }
    .pro-hero-overlay {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 18px;
    }
    .gym-gender-switch {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 16px;
    }
    .gender-select-card {
      background: rgba(15, 22, 38, 0.9);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 14px;
      transition: all 0.25s ease;
    }
    .gender-select-card.active {
      border-color: var(--gold-primary);
      background: linear-gradient(135deg, rgba(212, 167, 44, 0.22), rgba(16, 185, 129, 0.1));
      box-shadow: 0 0 25px rgba(212, 167, 44, 0.25);
    }
    .gender-select-card img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--gold-primary);
    }

    /* بطاقات التمارين المصورة + 3D Badge */
    .gym-layout-split {
      display: grid;
      grid-template-columns: 330px 1fr;
      gap: 20px;
      align-items: flex-start;
    }
    @media (max-width: 1100px) {
      .gym-layout-split {
        grid-template-columns: 1fr;
      }
    }
    .muscle-3d-stage {
      background: radial-gradient(circle at 50% 35%, rgba(33, 197, 197, 0.16), rgba(9, 13, 25, 0.96));
      border: 1px solid rgba(212, 167, 44, 0.35);
      border-radius: 20px;
      padding: 18px;
      text-align: center;
      position: sticky;
      top: 88px;
    }
    .muscle-svg-interactive {
      width: 100%;
      max-width: 240px;
      height: 330px;
      margin: 10px auto;
      filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.85));
    }
    .muscle-zone {
      fill: rgba(148, 163, 184, 0.28);
      stroke: rgba(212, 167, 44, 0.55);
      stroke-width: 1.5;
      cursor: pointer;
      transition: all 0.22s ease;
    }
    .muscle-zone:hover,
    .muscle-zone.active {
      fill: #19B889;
      stroke: #ffffff;
      filter: drop-shadow(0 0 12px #19B889);
    }

    .exercise-photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    .exercise-pro-card {
      background: linear-gradient(165deg, rgba(18, 25, 42, 0.95), rgba(10, 14, 24, 0.98));
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.6);
    }
    .exercise-pro-card:hover {
      transform: translateY(-5px);
      border-color: var(--gold-primary);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.8), 0 0 22px rgba(212, 167, 44, 0.18);
    }
    .exercise-img-box {
      position: relative;
      height: 185px;
      width: 100%;
      overflow: hidden;
      background: #070a12;
    }
    .exercise-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.45s ease;
    }
    .exercise-pro-card:hover .exercise-img-box img {
      transform: scale(1.07);
    }
    .exercise-3d-tag {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(9, 13, 25, 0.88);
      border: 1px solid var(--gold-primary);
      color: var(--gold-primary);
      padding: 3px 10px;
      border-radius: 99px;
      font-size: 0.72rem;
      font-weight: 800;
      backdrop-filter: blur(8px);
    }
    .exercise-sets-pill {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: linear-gradient(135deg, #19B889, #059669);
      color: #05070e;
      padding: 4px 12px;
      border-radius: 99px;
      font-size: 0.78rem;
      font-weight: 800;
      font-family: 'Inter', sans-serif;
    }
    .exercise-body {
      padding: 15px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }
    .exercise-steps-box {
      background: rgba(255, 255, 255, 0.03);
      border-right: 3px solid var(--gold-primary);
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 0.8rem;
      color: var(--text-secondary);
    }

    /* كروت Vision Board والسفر والكتب المصورة */
    .visual-cover-card {
      background: linear-gradient(165deg, rgba(18, 25, 42, 0.94), rgba(10, 14, 24, 0.98));
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.25s ease;
    }
    .visual-cover-card:hover {
      transform: translateY(-4px);
      border-color: var(--gold-primary);
    }
    .visual-cover-img {
      height: 155px;
      width: 100%;
      background-size: cover;
      background-position: center;
      position: relative;
      display: flex;
      align-items: flex-end;
      padding: 10px 12px;
    }
    .visual-cover-img::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(9, 13, 25, 0.95), transparent 70%);
    }
    .visual-cover-img > * {
      position: relative;
      z-index: 2;
    }
    .visual-cover-body {
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }
    .macro-ring-box {
      background: rgba(15, 22, 38, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 12px 14px;
      text-align: center;
    }
  `;
  document.head.appendChild(st);
}

/* ============================================================================
   SUPER TOPBAR DOCK + PRO ENGINEERING WHITEBOARD (MINDMAP BRANCHES + IMAGES)
   + PRIVATE .MP4 VIDEO RECORDER STUDIO
   ============================================================================ */
let topbarScreenRecStream = null;
let topbarScreenRecorder = null;
let topbarScreenChunks = [];
let topbarRadioPlaying = false;

// دالة اختيار أفضل ترميز فيديو MP4 مدعوم في المتصفح ليعمل على كل الأجهزة
function getBestMP4MimeType() {
  const types = [
    "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
    "video/mp4;codecs=h264,aac",
    "video/mp4",
    "video/webm;codecs=h264",
    "video/webm;codecs=vp9,opus",
    "video/webm"
  ];
  for (const t of types) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t)) {
      return t;
    }
  }
  return "";
}

function initThemeAndSidebarSystem() {
  injectOSProVisualStyles();
  injectSuperTopbarStyles();

  const savedTheme = localStorage.getItem("MY_LIFE_OS_THEME_V6") || "midnight-gold";
  applyOSTheme(savedTheme, false);

  const isCollapsed = localStorage.getItem("MY_LIFE_OS_SIDEBAR_COLLAPSED") === "1";
  if (isCollapsed) {
    document.getElementById("app-shell")?.classList.add("sidebar-collapsed");
  }

  const topbarStart = document.querySelector(".topbar-start");
  if (topbarStart && !document.getElementById("btn-collapse-sidebar")) {
    const collapseBtn = document.createElement("button");
    collapseBtn.id = "btn-collapse-sidebar";
    collapseBtn.className = "btn-icon";
    collapseBtn.title = "تصغير / تكبير القائمة الجانبية (Sidebar)";
    collapseBtn.innerHTML = `<i class="fa-solid fa-bars-staggered gold-text"></i>`;
    collapseBtn.onclick = () => {
      const shell = document.getElementById("app-shell");
      const collapsed = shell?.classList.toggle("sidebar-collapsed");
      localStorage.setItem("MY_LIFE_OS_SIDEBAR_COLLAPSED", collapsed ? "1" : "0");
    };
    topbarStart.prepend(collapseBtn);
  }

  const topbarEnd = document.querySelector(".topbar-end");
  if (topbarEnd && !document.getElementById("btn-quick-capture")) {
    const qcBtn = document.createElement("button");
    qcBtn.id = "btn-quick-capture";
    qcBtn.className = "btn btn-gold btn-sm";
    qcBtn.title = "تسجيل فوري لفكرة أو مهمة أو يومية في ثوانٍ (Alt+N)";
    qcBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> <span>تسجيل سريع</span>`;
    qcBtn.onclick = openQuickCaptureModal;
    topbarEnd.prepend(qcBtn);
  }

  // شريط الأدوات العلوي الاحترافي النقي (بدون أيقونة المياه)
  if (topbarEnd && !document.getElementById("os-super-topbar-dock")) {
    const dock = document.createElement("div");
    dock.id = "os-super-topbar-dock";
    dock.className = "os-super-topbar-dock";

    dock.innerHTML = `
      <button type="button" id="btn-top-cairo-radio" class="super-dock-pill" title="تشغيل/إيقاف إذاعة القرآن الكريم من القاهرة في الخلفية">
        <i class="fa-solid fa-radio gold-text"></i>
        <span>إذاعة القاهرة</span>
      </button>

      <button type="button" id="btn-top-whiteboard" class="super-dock-pill" title="استوديو السبورة الهندسية والشرح الشجري المتفرع والصور">
        <i class="fa-solid fa-diagram-project gold-text"></i>
        <span>السبورة والتفريع</span>
      </button>

      <button type="button" id="btn-top-screen-rec" class="super-dock-pill" title="تسجيل فيديو MP4 بخصوصية تامة">
        <i class="fa-solid fa-video gold-text"></i>
        <span id="top-rec-label">تسجيل MP4</span>
      </button>

      <button type="button" id="btn-top-sci-calc" class="btn-icon" title="الآلة الحاسبة العلمية والبرمجية السريعة">
        <i class="fa-solid fa-calculator"></i>
      </button>

      <button type="button" id="btn-top-telemetry" class="super-dock-pill" title="رادار حالة الجهاز والبطارية">
        <i class="fa-solid fa-microchip gold-text"></i>
        <span id="top-battery-lbl">⚡ 100%</span>
      </button>
    `;

    topbarEnd.prepend(dock);
    bindSuperTopbarDockEvents();
  }

  const themeBtn = document.getElementById("btn-theme-toggle");
  if (themeBtn) {
    themeBtn.title = "اختيار الثيم أو تصميم ثيمك الخاص";
    themeBtn.onclick = openThemeSelectorModal;
  }

  window.addEventListener("keydown", (e) => {
    if (e.altKey && e.key.toLowerCase() === "n") {
      e.preventDefault();
      openQuickCaptureModal();
    }
  });
}

function injectSuperTopbarStyles() {
  if (document.getElementById("super-topbar-dock-styles")) return;
  const st = document.createElement("style");
  st.id = "super-topbar-dock-styles";
  st.textContent = `
    .os-super-topbar-dock {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 4px 10px;
      border-radius: 99px;
      background: rgba(15, 22, 38, 0.65);
      border: 1px solid rgba(212, 167, 44, 0.3);
      margin-inline-end: 6px;
    }
    html[data-theme="pure-light"] .os-super-topbar-dock,
    html[data-theme="light"] .os-super-topbar-dock {
      background: #f1f5f9;
      border-color: rgba(15, 23, 42, 0.14);
    }
    .super-dock-pill {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--text-primary);
      padding: 5px 12px;
      border-radius: 99px;
      font-family: inherit;
      font-size: 0.76rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      transition: all 0.2s ease;
    }
    html[data-theme="pure-light"] .super-dock-pill,
    html[data-theme="light"] .super-dock-pill {
      background: #ffffff;
      border-color: rgba(15, 23, 42, 0.12);
      color: #0f172a;
    }
    .super-dock-pill:hover {
      border-color: var(--gold-primary);
      transform: translateY(-1px);
    }
    .super-dock-pill.live-active {
      background: rgba(25, 184, 137, 0.18) !important;
      border-color: #19B889 !important;
      color: #19B889 !important;
      box-shadow: 0 0 15px rgba(25, 184, 137, 0.3);
    }
    .super-dock-pill.rec-active {
      background: rgba(239, 68, 68, 0.22) !important;
      border-color: #ef4444 !important;
      color: #fca5a5 !important;
      animation: blinkDot 1s infinite;
    }

    /* استوديو السبورة الهندسية والتفريع الشجري الاحترافي */
    .wb-studio-toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
      justify-content: space-between;
      background: rgba(9, 13, 25, 0.95);
      border: 1px solid rgba(212, 167, 44, 0.35);
      border-radius: 14px;
      padding: 10px 12px;
      margin-bottom: 10px;
    }
    .wb-tool-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--text-primary);
      padding: 6px 11px;
      border-radius: 9px;
      font-family: inherit;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.18s ease;
    }
    .wb-tool-btn:hover {
      border-color: var(--gold-primary);
    }
    .wb-tool-btn.active {
      background: var(--gold-primary);
      color: #05070e;
      border-color: var(--gold-primary);
      box-shadow: 0 0 14px rgba(212, 167, 44, 0.4);
    }
    .whiteboard-canvas-box {
      width: 100%;
      height: 520px;
      background: #080d1a;
      border: 2px solid var(--gold-primary);
      border-radius: 16px;
      cursor: crosshair;
      touch-action: none;
      display: block;
    }
    .wb-studio-fullscreen {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      max-width: 100vw !important;
      max-height: 100vh !important;
      z-index: 999999 !important;
      border-radius: 0 !important;
      padding: 16px 24px !important;
    }
.modal-overlay:has(.wb-studio-fullscreen) {
      padding: 0 !important;
    }
    .modal-card.wide-lab-modal.wb-studio-fullscreen,
    .modal-card.wb-studio-fullscreen {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      max-width: 100vw !important;
      height: 100vh !important;
      max-height: 100vh !important;
      margin: 0 !important;
      border-radius: 0 !important;
      padding: 12px 20px !important;
      z-index: 999999 !important;
    }
    .wb-studio-fullscreen .whiteboard-canvas-box {
      height: calc(100vh - 180px) !important;
    }
    /* إخفاء أليكس والسبحة والمسودة تماماً عند فتح السبورة أو تكبيرها */
    body.wb-fullscreen-mode #alex-mascot-Root,
    body.wb-fullscreen-mode #floating-tasbeeh-widget,
    body.wb-fullscreen-mode #btn-toggle-scratchpad,
    body.wb-fullscreen-mode #scratchpad-drawer {
      display: none !important;
    }
    .calc-grid-buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-top: 12px;
    }
    .calc-btn {
      padding: 12px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(17, 24, 39, 0.85);
      color: #fff;
      font-family: 'Inter', monospace;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
    }
    .calc-btn:hover {
      border-color: var(--gold-primary);
      background: rgba(212, 167, 44, 0.2);
    }
  `;
  document.head.appendChild(st);
}

function bindSuperTopbarDockEvents() {
  // 1. إذاعة القرآن الكريم من القاهرة
  const radioBtn = document.getElementById("btn-top-cairo-radio");
  if (radioBtn) {
    radioBtn.onclick = () => {
      const player = document.getElementById("quran-audio-player");
      if (!player) return;
      if (!topbarRadioPlaying || player.paused) {
        document.getElementById("btn-cairo-radio-quick")?.click();
        topbarRadioPlaying = true;
        radioBtn.classList.add("live-active");
        radioBtn.innerHTML = `<span class="live-dot"></span> <span>إذاعة القاهرة (شغالة)</span>`;
      } else {
        player.pause();
        topbarRadioPlaying = false;
        radioBtn.classList.remove("live-active");
        radioBtn.innerHTML = `<i class="fa-solid fa-radio gold-text"></i> <span>إذاعة القاهرة</span>`;
        toast("تم إيقاف البث المباشر مؤقتاً 📻", "info");
      }
    };
  }

  // 2. فتح استوديو السبورة الهندسية والشرح المتفرع
  document.getElementById("btn-top-whiteboard")?.addEventListener("click", () => openSmartWhiteboardModal());

  // 3. الآلة الحاسبة العلمية
  document.getElementById("btn-top-sci-calc")?.addEventListener("click", openScientificCalcModal);

  // 4. استوديو تسجيل الفيديو MP4 بخصوصية تامة
  const recBtn = document.getElementById("btn-top-screen-rec");
  if (recBtn) {
    recBtn.onclick = () => {
      if (topbarScreenRecorder && topbarScreenRecorder.state === "recording") {
        topbarScreenRecorder.stop();
        topbarScreenRecStream?.getTracks().forEach(t => t.stop());
        recBtn.classList.remove("rec-active");
        const lbl = document.getElementById("top-rec-label");
        if (lbl) lbl.textContent = "تسجيل MP4";
        return;
      }
      openPrivateMP4RecorderModal();
    };
  }

  // 5. رادار البطارية والأداء
  if ("getBattery" in navigator) {
    navigator.getBattery().then(bat => {
      const updateBat = () => {
        const pct = Math.round(bat.level * 100);
        const lbl = document.getElementById("top-battery-lbl");
        if (lbl) lbl.textContent = `${bat.charging ? "⚡" : "🔋"} ${pct}%`;
      };
      updateBat();
      bat.addEventListener("levelchange", updateBat);
      bat.addEventListener("chargingchange", updateBat);
    }).catch(() => {});
  }

  document.getElementById("btn-top-telemetry")?.addEventListener("click", () => {
    const mem = performance.memory ? `${Math.round(performance.memory.usedJSHeapSize / 1048576)} MB` : "أداء مثالي (خفيف)";
    const cores = navigator.hardwareConcurrency || 8;
    B().openFormModal("⚡ رادار أداء النظام والجهاز الحي (System Telemetry)", `
      <div class="kpi-grid" style="grid-template-columns:repeat(2,1fr);">
        <div class="subject-progress-box text-center">
          <small class="small-muted">أنوية المعالج المنطقية (CPU Cores)</small>
          <h3 class="gold-text mt-1">${cores} Cores</h3>
        </div>
        <div class="subject-progress-box text-center">
          <small class="small-muted">استهلاك ذاكرة النظام (RAM Heap)</small>
          <h3 style="color:#19B889;" class="mt-1">${mem}</h3>
        </div>
        <div class="subject-progress-box text-center">
          <small class="small-muted">حالة الاتصال السحابي (Firebase)</small>
          <h3 style="color:#21C5C5;" class="mt-1">${navigator.onLine ? "متصل لحظياً 🟢" : "أوفلاين 🔴"}</h3>
        </div>
        <div class="subject-progress-box text-center">
          <small class="small-muted">حالة بطارية الجهاز</small>
          <h3 class="gold-text mt-1">${document.getElementById("top-battery-lbl")?.textContent || "100%"}</h3>
        </div>
      </div>
    `, async () => {});
    const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
    if (saveBtn) saveBtn.style.display = "none";
  });
}

/* ============================================================================
   PRO VIDEO RECORDER STUDIO V2 (SCREEN / WINDOW / TAB / WHITEBOARD +
   MIC & SYSTEM AUDIO MIXER + DRAGGABLE FACECAM PIP + .MP4 / .WEBM / .MKV)
   ============================================================================ */
const ProRecState = {
  targetSource: "monitor", // monitor | window | browser | whiteboard
  extension: "mp4",        // mp4 | webm | mkv
  micEnabled: true,
  sysAudioEnabled: true,
  facecamEnabled: true,
  facecamShape: "rounded", // rounded | circle
  facecamCorner: "br",     // br (أسفل يمين) | bl | tr | tl
  facecamStream: null,
  micStream: null,
  displayStream: null,
  audioCtx: null,
  compositorCanvas: null,
  compositorInterval: null
};

function getSupportedMimeForExt(ext) {
  const candidates = ext === "mp4"
    ? [
        "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
        "video/mp4;codecs=h264,aac",
        "video/mp4",
        "video/webm;codecs=h264,opus",
        "video/webm;codecs=vp9,opus",
        "video/webm"
      ]
    : [
        "video/x-matroska;codecs=avc1",
        "video/webm;codecs=vp9,opus",
        "video/webm;codecs=vp8,opus",
        "video/webm"
      ];
  for (const t of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t)) {
      return t;
    }
  }
  return "";
}

function ensureFacecamOverlayWidget() {
  let widget = document.getElementById("os-facecam-floating-box");
  if (widget) return widget;

  widget = document.createElement("div");
  widget.id = "os-facecam-floating-box";
  widget.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 210px;
    height: 158px;
    background: #05070e;
    border: 3px solid var(--gold-primary, #d4af37);
    border-radius: 18px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 25px rgba(212,175,55,0.35);
    z-index: 2000000;
    overflow: hidden;
    cursor: grab;
    user-select: none;
    touch-action: none;
    display: none;
  `;

  widget.innerHTML = `
    <video id="os-facecam-video" autoplay muted playsinline style="width:100%; height:100%; object-fit:cover; transform:scaleX(-1); pointer-events:none;"></video>
    <div style="position:absolute; top:6px; left:6px; right:6px; display:flex; justify-content:space-between; align-items:center; pointer-events:auto;">
      <span style="background:rgba(9,13,25,0.8); color:#19B889; font-size:0.68rem; font-weight:800; padding:2px 8px; border-radius:99px; border:1px solid #19B889;">📷 LIVE CAM</span>
      <div style="display:flex; gap:4px;">
        <button type="button" id="btn-facecam-pip" title="تثبيت الكاميرا فوق البرامج الخارجية (PiP)" style="background:rgba(9,13,25,0.85); color:#d4af37; border:1px solid #d4af37; border-radius:6px; width:24px; height:24px; cursor:pointer; font-size:0.7rem;"><i class="fa-solid fa-up-right-from-square"></i></button>
        <button type="button" id="btn-facecam-shape" title="تغيير الشكل (مربع / دائري)" style="background:rgba(9,13,25,0.85); color:#fff; border:1px solid rgba(255,255,255,0.2); border-radius:6px; width:24px; height:24px; cursor:pointer; font-size:0.7rem;"><i class="fa-solid fa-circle-half-stroke"></i></button>
        <button type="button" id="btn-facecam-size" title="تكبير/تصغير الكاميرا" style="background:rgba(9,13,25,0.85); color:#fff; border:1px solid rgba(255,255,255,0.2); border-radius:6px; width:24px; height:24px; cursor:pointer; font-size:0.7rem;"><i class="fa-solid fa-expand"></i></button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  // سحب وتحريك الكاميرا في أي مكان على الشاشة
  let isDrag = false, sx = 0, sy = 0, il = 0, it = 0;
  const startDrag = (e) => {
    if (e.target.closest("button")) return;
    isDrag = true;
    widget.style.cursor = "grabbing";
    const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const cy = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    sx = cx; sy = cy;
    const r = widget.getBoundingClientRect();
    il = r.left; it = r.top;
  };
  const moveDrag = (e) => {
    if (!isDrag) return;
    const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const cy = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const nl = Math.max(8, Math.min(window.innerWidth - widget.offsetWidth - 8, il + (cx - sx)));
    const nt = Math.max(8, Math.min(window.innerHeight - widget.offsetHeight - 8, it + (cy - sy)));
    widget.style.left = `${nl}px`;
    widget.style.top = `${nt}px`;
    widget.style.right = "auto";
    widget.style.bottom = "auto";
  };
  const endDrag = () => {
    isDrag = false;
    widget.style.cursor = "grab";
  };

  widget.addEventListener("mousedown", startDrag);
  window.addEventListener("mousemove", moveDrag);
  window.addEventListener("mouseup", endDrag);
  widget.addEventListener("touchstart", startDrag, { passive: true });
  window.addEventListener("touchmove", moveDrag, { passive: true });
  window.addEventListener("touchend", endDrag);

  widget.querySelector("#btn-facecam-shape").onclick = () => {
    ProRecState.facecamShape = ProRecState.facecamShape === "circle" ? "rounded" : "circle";
    if (ProRecState.facecamShape === "circle") {
      widget.style.width = "170px";
      widget.style.height = "170px";
      widget.style.borderRadius = "50%";
    } else {
      widget.style.width = "210px";
      widget.style.height = "158px";
      widget.style.borderRadius = "18px";
    }
  };

  let sizeIdx = 0;
  widget.querySelector("#btn-facecam-size").onclick = () => {
    sizeIdx = (sizeIdx + 1) % 3;
    const scales = [
      { w: 210, h: 158 },
      { w: 280, h: 210 },
      { w: 160, h: 120 }
    ];
    const s = scales[sizeIdx];
    widget.style.width = ProRecState.facecamShape === "circle" ? `${s.h}px` : `${s.w}px`;
    widget.style.height = `${s.h}px`;
  };

  widget.querySelector("#btn-facecam-pip").onclick = async () => {
    const v = widget.querySelector("#os-facecam-video");
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else if (v && v.srcObject) await v.requestPictureInPicture();
    } catch (err) {
      toast("نافذة الكاميرا العائمة جاهزة داخل الشاشة", "info");
    }
  };

  return widget;
}

async function startFacecamOverlay() {
  const widget = ensureFacecamOverlayWidget();
  const videoEl = widget.querySelector("#os-facecam-video");
  try {
    if (!ProRecState.facecamStream) {
      ProRecState.facecamStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
        audio: false
      });
    }
    videoEl.srcObject = ProRecState.facecamStream;
    await videoEl.play().catch(() => {});

    // ضبط الزاوية المختارة
    widget.style.top = "auto"; widget.style.bottom = "auto";
    widget.style.left = "auto"; widget.style.right = "auto";
    if (ProRecState.facecamCorner === "br") { widget.style.bottom = "24px"; widget.style.right = "24px"; }
    else if (ProRecState.facecamCorner === "bl") { widget.style.bottom = "24px"; widget.style.left = "24px"; }
    else if (ProRecState.facecamCorner === "tr") { widget.style.top = "80px"; widget.style.right = "24px"; }
    else { widget.style.top = "80px"; widget.style.left = "24px"; }

    if (ProRecState.facecamShape === "circle") {
      widget.style.width = "170px"; widget.style.height = "170px"; widget.style.borderRadius = "50%";
    } else {
      widget.style.width = "210px"; widget.style.height = "158px"; widget.style.borderRadius = "18px";
    }
    widget.style.display = "block";
    return videoEl;
  } catch (err) {
    toast("تعذر فتح الكاميرا — تأكد من إعطاء صلاحية الكاميرا للمتصفح", "error");
    return null;
  }
}

function stopAllProRecordingStreams() {
  if (ProRecState.compositorInterval) {
    clearInterval(ProRecState.compositorInterval);
    ProRecState.compositorInterval = null;
  }
  [ProRecState.facecamStream, ProRecState.micStream, ProRecState.displayStream, topbarScreenRecStream].forEach(st => {
    if (st) {
      try { st.getTracks().forEach(t => t.stop()); } catch (e) {}
    }
  });
  ProRecState.facecamStream = null;
  ProRecState.micStream = null;
  ProRecState.displayStream = null;
  topbarScreenRecStream = null;

  if (ProRecState.audioCtx) {
    try { ProRecState.audioCtx.close(); } catch (e) {}
    ProRecState.audioCtx = null;
  }
  const camWidget = document.getElementById("os-facecam-floating-box");
  if (camWidget) camWidget.style.display = "none";
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch(() => {});
  }
}

async function buildCombinedVideoAndAudioStream(baseVideoStream) {
  let finalVideoTrack = baseVideoStream.getVideoTracks()[0];
  let camVideoEl = null;

  if (ProRecState.facecamEnabled) {
    camVideoEl = await startFacecamOverlay();
  }

  // دمج الكاميرا الشخصية (Facecam) داخل الفيديو المسجل نفسه في المربع السفلي الأيمن
  if (ProRecState.facecamEnabled && camVideoEl && ProRecState.facecamStream) {
    const srcVideo = document.createElement("video");
    srcVideo.srcObject = new MediaStream([finalVideoTrack]);
    srcVideo.muted = true;
    srcVideo.playsInline = true;
    await srcVideo.play().catch(() => {});

    const compCanvas = document.createElement("canvas");
    const settings = finalVideoTrack.getSettings?.() || {};
    compCanvas.width = settings.width || 1280;
    compCanvas.height = settings.height || 720;
    const cCtx = compCanvas.getContext("2d");

    ProRecState.compositorInterval = setInterval(() => {
      if (srcVideo.readyState >= 2) {
        cCtx.drawImage(srcVideo, 0, 0, compCanvas.width, compCanvas.height);
      }
      if (camVideoEl && camVideoEl.readyState >= 2) {
        const cw = Math.round(compCanvas.width * 0.2);
        const ch = ProRecState.facecamShape === "circle" ? cw : Math.round(cw * 0.75);
        const pad = 28;
        let cx = compCanvas.width - cw - pad;
        let cy = compCanvas.height - ch - pad;
        if (ProRecState.facecamCorner === "bl") { cx = pad; cy = compCanvas.height - ch - pad; }
        else if (ProRecState.facecamCorner === "tr") { cx = compCanvas.width - cw - pad; cy = pad; }
        else if (ProRecState.facecamCorner === "tl") { cx = pad; cy = pad; }

        cCtx.save();
        cCtx.beginPath();
        if (ProRecState.facecamShape === "circle") {
          cCtx.arc(cx + cw / 2, cy + ch / 2, cw / 2, 0, Math.PI * 2);
        } else {
          cCtx.roundRect(cx, cy, cw, ch, 18);
        }
        cCtx.clip();
        // رسم الكاميرا معكوسة أفقياً كمرآة طبيعية
        cCtx.translate(cx + cw, cy);
        cCtx.scale(-1, 1);
        cCtx.drawImage(camVideoEl, 0, 0, cw, ch);
        cCtx.restore();

        // إطار ذهبي حول الكاميرا داخل الفيديو
        cCtx.save();
        cCtx.strokeStyle = "#D4A72C";
        cCtx.lineWidth = 4;
        cCtx.beginPath();
        if (ProRecState.facecamShape === "circle") {
          cCtx.arc(cx + cw / 2, cy + ch / 2, cw / 2, 0, Math.PI * 2);
        } else {
          cCtx.roundRect(cx, cy, cw, ch, 18);
        }
        cCtx.stroke();
        cCtx.restore();
      }
    }, 33); // 30 FPS

    const compStream = compCanvas.captureStream(30);
    if (compStream.getVideoTracks().length > 0) {
      finalVideoTrack = compStream.getVideoTracks()[0];
    }
  }

  // دمج صوت المايكروفون (صوتك وأنت بتشرح) + صوت الجهاز الداخلي في مسار صوتي واحد نقي
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  ProRecState.audioCtx = audioCtx;
  const dest = audioCtx.createMediaStreamDestination();
  let hasAnyAudio = false;

  if (ProRecState.sysAudioEnabled && baseVideoStream.getAudioTracks().length > 0) {
    const sysSrc = audioCtx.createMediaStreamSource(new MediaStream([baseVideoStream.getAudioTracks()[0]]));
    const sysGain = audioCtx.createGain();
    sysGain.gain.value = 0.85;
    sysSrc.connect(sysGain).connect(dest);
    hasAnyAudio = true;
  }

  if (ProRecState.micEnabled) {
    try {
      ProRecState.micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: false
      });
      const micSrc = audioCtx.createMediaStreamSource(ProRecState.micStream);
      const micGain = audioCtx.createGain();
      micGain.gain.value = 1.35; // تقوية صوت الشرح ليكون واضحاً جداً
      micSrc.connect(micGain).connect(dest);
      hasAnyAudio = true;
    } catch (micErr) {
      toast("⚠️ لم يتم تفعيل المايكروفون — تأكد من السماح بالمايك من المتصفح", "error");
    }
  }

  const finalTracks = [finalVideoTrack];
  if (hasAnyAudio && dest.stream.getAudioTracks().length > 0) {
    finalTracks.push(dest.stream.getAudioTracks()[0]);
  }
  return new MediaStream(finalTracks);
}

function openPrivateMP4RecorderModal() {
  B().openFormModal("🎥 استوديو تسجيل الشروحات والفيديو الاحترافي (صوت + صورة + كاميرا شخصية)", `
    <p class="small-muted mb-2">حدد ماذا تريد أن تسجل، واختر امتداد الملف، وفعل المايك والكاميرا الشخصية في الزاوية أثناء الشرح:</p>

    <!-- 1. اختيار مصدر التسجيل -->
    <div class="form-group">
      <label class="gold-text"><i class="fa-solid fa-desktop"></i> 1. ماذا تريد أن تسجل؟</label>
      <div class="dashboard-grid" style="grid-template-columns: repeat(2, 1fr); gap:10px;">
        <label class="check-pill ${ProRecState.targetSource === "monitor" ? "completed" : ""}" style="padding:12px;">
          <input type="radio" name="rec_src" value="monitor" ${ProRecState.targetSource === "monitor" ? "checked" : ""} />
          <span>🖥️ <strong>الشاشة كلها بالكامل</strong> (Entire Screen)</span>
        </label>
        <label class="check-pill ${ProRecState.targetSource === "window" ? "completed" : ""}" style="padding:12px;">
          <input type="radio" name="rec_src" value="window" ${ProRecState.targetSource === "window" ? "checked" : ""} />
          <span>🪟 <strong>تطبيق أو نافذة محددة</strong> (VS Code / برنامج)</span>
        </label>
        <label class="check-pill ${ProRecState.targetSource === "browser" ? "completed" : ""}" style="padding:12px;">
          <input type="radio" name="rec_src" value="browser" ${ProRecState.targetSource === "browser" ? "checked" : ""} />
          <span>🌐 <strong>موقع أو تاب محدد</strong> (Browser Tab)</span>
        </label>
        <label class="check-pill ${ProRecState.targetSource === "whiteboard" ? "completed" : ""}" style="padding:12px;">
          <input type="radio" name="rec_src" value="whiteboard" ${ProRecState.targetSource === "whiteboard" ? "checked" : ""} />
          <span>🎨 <strong>السبورة التفاعلية فقط</strong> (خصوصية 100%)</span>
        </label>
      </div>
    </div>

    <!-- 2. اختيار الامتداد والصوت -->
    <div class="dashboard-grid" style="grid-template-columns: 1fr 1fr; gap:12px;">
      <div class="form-group">
        <label class="gold-text"><i class="fa-solid fa-file-video"></i> 2. اختر امتداد وصيغة الفيديو:</label>
        <select id="pro-rec-ext-select">
          <option value="mp4" ${ProRecState.extension === "mp4" ? "selected" : ""}>🎬 .MP4 (قياسي يشتغل على كل الأجهزة والموبايلات)</option>
          <option value="webm" ${ProRecState.extension === "webm" ? "selected" : ""}>⚡ .WEBM (جودة فائقة للويب واليوتيوب)</option>
          <option value="mkv" ${ProRecState.extension === "mkv" ? "selected" : ""}>🎞️ .MKV (Matroska HD للمحاضرات الطويلة)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="gold-text"><i class="fa-solid fa-microphone-lines"></i> 3. إعدادات الصوت أثناء التصوير:</label>
        <div style="display:flex; flex-direction:column; gap:6px;">
          <label class="check-pill ${ProRecState.micEnabled ? "completed" : ""}">
            <input type="checkbox" id="pro-rec-mic-chk" ${ProRecState.micEnabled ? "checked" : ""} />
            <span>🎙️ تسجيل صوتي بالمايكروفون وأنا بشرح</span>
          </label>
          <label class="check-pill ${ProRecState.sysAudioEnabled ? "completed" : ""}">
            <input type="checkbox" id="pro-rec-sys-chk" ${ProRecState.sysAudioEnabled ? "checked" : ""} />
            <span>🔊 تسجيل صوت الجهاز الداخلي مع الشرح</span>
          </label>
        </div>
      </div>
    </div>

    <!-- 3. إعدادات الكاميرا الشخصية (Facecam PIP) -->
    <div class="subject-progress-box" style="border:1.5px solid var(--gold-primary);">
      <div class="flex-between" style="flex-wrap:wrap; gap:8px;">
        <label class="check-pill ${ProRecState.facecamEnabled ? "completed" : ""}" style="margin:0;">
          <input type="checkbox" id="pro-rec-cam-chk" ${ProRecState.facecamEnabled ? "checked" : ""} />
          <span>📷 <strong>إظهار الكاميرا الشخصية (Facecam) في مربع صغير أثناء الشرح</strong></span>
        </label>
        <button type="button" id="btn-test-facecam-now" class="btn btn-xs btn-outline">
          <i class="fa-solid fa-camera gold-text"></i> معاينة وتحريك الكاميرا الآن
        </button>
      </div>

      <div class="dashboard-grid mt-2" style="grid-template-columns: 1fr 1fr; gap:10px;">
        <div>
          <label class="small-muted">مكان الكاميرا الافتراضي (قابلة للسحب بالماوس):</label>
          <select id="pro-rec-cam-corner" class="select-sm" style="width:100%;">
            <option value="br" ${ProRecState.facecamCorner === "br" ? "selected" : ""}>↘️ أسفل اليمين (Bottom-Right)</option>
            <option value="bl" ${ProRecState.facecamCorner === "bl" ? "selected" : ""}>↙️ أسفل اليسار (Bottom-Left)</option>
            <option value="tr" ${ProRecState.facecamCorner === "tr" ? "selected" : ""}>↗️ أعلى اليمين (Top-Right)</option>
            <option value="tl" ${ProRecState.facecamCorner === "tl" ? "selected" : ""}>↖️ أعلى اليسار (Top-Left)</option>
          </select>
        </div>
        <div>
          <label class="small-muted">شكل إطار الكاميرا:</label>
          <select id="pro-rec-cam-shape" class="select-sm" style="width:100%;">
            <option value="rounded" ${ProRecState.facecamShape === "rounded" ? "selected" : ""}>▭ مربع بحواف ذهبية ناعمة</option>
            <option value="circle" ${ProRecState.facecamShape === "circle" ? "selected" : ""}>⭕ دائري احترافي</option>
          </select>
        </div>
      </div>
    </div>

    <div class="config-actions mt-4">
      <button type="button" id="btn-start-pro-recording" class="btn btn-gold btn-block btn-luxury-shine" style="font-size:1.05rem; padding:14px;">
        <i class="fa-solid fa-circle-dot"></i> ابدأ التسجيل الآن (فيديو + صوت + كاميرا) 🔴
      </button>
    </div>
  `, async () => {});

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  // تحديث الاختيارات عند التغيير
  document.querySelectorAll('input[name="rec_src"]').forEach(rad => {
    rad.onchange = () => {
      ProRecState.targetSource = rad.value;
      document.querySelectorAll('input[name="rec_src"]').forEach(r => r.closest(".check-pill")?.classList.toggle("completed", r.checked));
    };
  });

  document.getElementById("pro-rec-ext-select").onchange = (e) => { ProRecState.extension = e.target.value; };
  document.getElementById("pro-rec-mic-chk").onchange = (e) => {
    ProRecState.micEnabled = e.target.checked;
    e.target.closest(".check-pill")?.classList.toggle("completed", e.target.checked);
  };
  document.getElementById("pro-rec-sys-chk").onchange = (e) => {
    ProRecState.sysAudioEnabled = e.target.checked;
    e.target.closest(".check-pill")?.classList.toggle("completed", e.target.checked);
  };
  document.getElementById("pro-rec-cam-chk").onchange = (e) => {
    ProRecState.facecamEnabled = e.target.checked;
    e.target.closest(".check-pill")?.classList.toggle("completed", e.target.checked);
  };
  document.getElementById("pro-rec-cam-corner").onchange = (e) => { ProRecState.facecamCorner = e.target.value; };
  document.getElementById("pro-rec-cam-shape").onchange = (e) => { ProRecState.facecamShape = e.target.value; };

  document.getElementById("btn-test-facecam-now").onclick = async () => {
    ProRecState.facecamEnabled = true;
    document.getElementById("pro-rec-cam-chk").checked = true;
    await startFacecamOverlay();
    toast("📷 الكاميرا ظهرت أسفل اليمين! يمكنك سحبها بالماوس لأي مكان", "success");
  };

  // بدء التسجيل الفعلي
  document.getElementById("btn-start-pro-recording").onclick = async () => {
    const ext = ProRecState.extension || "mp4";
    const srcType = ProRecState.targetSource || "monitor";
    const recBtn = document.getElementById("btn-top-screen-rec");
    const lbl = document.getElementById("top-rec-label");

    document.getElementById("universal-modal")?.classList.add("hidden");

    // إذا اختار تسجيل السبورة الداخلية فقط
    if (srcType === "whiteboard") {
      openSmartWhiteboardModal(false);
      setTimeout(async () => {
        const wbCanvas = document.getElementById("smart-whiteboard-canvas");
        if (!wbCanvas) return;
        const rawCanvasStream = wbCanvas.captureStream(30);
        const finalStream = await buildCombinedVideoAndAudioStream(rawCanvasStream);
        startMediaRecorderWithStream(finalStream, ext, recBtn, lbl);
      }, 300);
      return;
    }

    // تسجيل الشاشة كلها / نافذة تطبيق / تاب متصفح
    try {
      const displayConstraints = {
        video: {
          displaySurface: srcType, // monitor | window | browser
          frameRate: { ideal: 30, max: 60 }
        },
        audio: ProRecState.sysAudioEnabled,
        selfBrowserSurface: srcType === "browser" ? "include" : "exclude"
      };

      ProRecState.displayStream = await navigator.mediaDevices.getDisplayMedia(displayConstraints);
      const finalStream = await buildCombinedVideoAndAudioStream(ProRecState.displayStream);

      // لو المستخدم ضغط "Stop Sharing" من شريط المتصفح نفسه
      ProRecState.displayStream.getVideoTracks()[0].onended = () => {
        if (topbarScreenRecorder && topbarScreenRecorder.state === "recording") {
          topbarScreenRecorder.stop();
        }
      };

      startMediaRecorderWithStream(finalStream, ext, recBtn, lbl);
    } catch (err) {
      stopAllProRecordingStreams();
      toast("تم إلغاء بدء التسجيل", "info");
    }
  };
}

function startMediaRecorderWithStream(finalStream, ext, recBtn, lbl) {
  topbarScreenRecStream = finalStream;
  const mime = getSupportedMimeForExt(ext);
  topbarScreenRecorder = mime
    ? new MediaRecorder(finalStream, { mimeType: mime, videoBitsPerSecond: 4500000 })
    : new MediaRecorder(finalStream);

  topbarScreenChunks = [];
  topbarScreenRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) topbarScreenChunks.push(e.data);
  };

  topbarScreenRecorder.onstop = () => {
    stopAllProRecordingStreams();
    const blobType = ext === "mp4" ? "video/mp4" : ext === "mkv" ? "video/x-matroska" : "video/webm";
    const blob = new Blob(topbarScreenChunks, { type: blobType });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `MY-LIFE-OS-Recording-${today()}.${ext}`;
    a.click();
    recBtn?.classList.remove("rec-active");
    if (lbl) lbl.textContent = "تسجيل فيديو";
    toast(`🎬 تم حفظ وتصدير الفيديو بالصوت والكاميرا بصيغة (.${ext.toUpperCase()}) بنجاح!`);
  };

  topbarScreenRecorder.start(200);
  recBtn?.classList.add("rec-active");
  if (lbl) lbl.textContent = `إيقاف وحفظ .${ext.toUpperCase()} 🔴`;
  toast(`🔴 بدأ التسجيل الآن (فيديو + صوت ${ProRecState.facecamEnabled ? "+ كاميرا" : ""})! اضغط على زر الشريط العلوي للإيقاف والحفظ.`, "success");
}

/* ============================================================================
   ULTIMATE ENGINEERING WHITEBOARD, IMAGE ANNOTATOR & MULTI-BRANCH TREE STUDIO
   ============================================================================ */
const WBState = {
  tool: "select", // select | pen | laser | highlight | line | arrow | rect | circle | text | eraser
  bgMode: "grid", // grid | dots | dark | white
  color: "#D4A72C",
  size: 4,
  strokes: [],
  nodes: [
    { id: "n_root", text: "🌟 الموضوع الرئيسي للشرح", shape: "rect", x: 450, y: 75, w: 220, h: 48, color: "#D4A72C", parentId: null }
  ],
  images: [],
  selectedNodeId: "n_root",
  selectedImgId: null,
  selectedStrokeIdx: null,
  laserPoints: [],
  undoStack: [],
  isRecordingCanvas: false,
  canvasRecorder: null,
  canvasRecChunks: [],
  micStream: null
};

function pushWBUndoSnapshot() {
  WBState.undoStack.push(JSON.stringify({
    strokes: WBState.strokes,
    nodes: WBState.nodes
  }));
  if (WBState.undoStack.length > 30) WBState.undoStack.shift();
}

function openSmartWhiteboardModal(autoStartPrivateRecord = false) {
  // إخفاء أليكس تلقائياً أثناء فتح السبورة لعدم التغطية على الشرح
  document.body.classList.add("wb-fullscreen-mode");

  B().openFormModal("🎨 استوديو السبورة الهندسية، الخرائط المتفرعة، والشرح على الصور", `
    <!-- الشريط الأول: أدوات الرسم والأشكال والنصوص القابلة للتحريك -->
    <div class="wb-studio-toolbar">
      <div class="filters-row" style="gap:5px;">
        <button type="button" class="wb-tool-btn ${WBState.tool === "select" ? "active" : ""}" data-wb-tool="select" title="تحديد وتحريك أي نص أو دائرة أو مستطيل أو صورة"><i class="fa-solid fa-arrows-up-down-left-right"></i> تحريك وتعديل</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "pen" ? "active" : ""}" data-wb-tool="pen"><i class="fa-solid fa-pen"></i> قلم</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "laser" ? "active" : ""}" data-wb-tool="laser" title="مؤشر ليزر للشرح يختفي تلقائياً"><i class="fa-solid fa-wand-magic-sparkles"></i> ليزر</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "highlight" ? "active" : ""}" data-wb-tool="highlight"><i class="fa-solid fa-highlighter"></i> تظليل</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "arrow" ? "active" : ""}" data-wb-tool="arrow"><i class="fa-solid fa-arrow-trend-up"></i> سهم</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "line" ? "active" : ""}" data-wb-tool="line"><i class="fa-solid fa-slash"></i> خط</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "rect" ? "active" : ""}" data-wb-tool="rect" title="ارسم مستطيلاً واكتب بداخله نصاً"><i class="fa-regular fa-square"></i> مستطيل (+نص)</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "circle" ? "active" : ""}" data-wb-tool="circle" title="ارسم دائرة واكتب بداخلها نصاً"><i class="fa-regular fa-circle"></i> دائرة (+نص)</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "text" ? "active" : ""}" data-wb-tool="text" title="إضافة نص حر قابل للتحريك والتكبير"><i class="fa-solid fa-font"></i> نص حر</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "eraser" ? "active" : ""}" data-wb-tool="eraser"><i class="fa-solid fa-eraser"></i> ممحاة</button>
      </div>

      <div class="filters-row" style="gap:6px;">
        <input type="color" id="wb-color" value="${WBState.color}" style="width:36px; height:32px; padding:1px; cursor:pointer;" title="اللون" />
        <input type="range" id="wb-size" min="2" max="18" value="${WBState.size}" style="width:70px;" title="السمك وحجم الخط" />
        <select id="wb-bg-select" class="select-sm" style="min-width:115px; padding:4px 8px;">
          <option value="grid" ${WBState.bgMode === "grid" ? "selected" : ""}>📐 شبكة هندسية</option>
          <option value="dots" ${WBState.bgMode === "dots" ? "selected" : ""}>⠿ نقاط رقمية</option>
          <option value="dark" ${WBState.bgMode === "dark" ? "selected" : ""}>🌑 كحلي سادة</option>
          <option value="white" ${WBState.bgMode === "white" ? "selected" : ""}>⬜ سبورة بيضاء</option>
        </select>
      </div>
    </div>

    <!-- الشريط الثاني: التفريع الشجري (مستطيل/دائرة) + تحجيم الصور والعناصر + التسجيل -->
    <div class="wb-studio-toolbar" style="background:rgba(15, 23, 42, 0.94);">
      <div class="filters-row" style="gap:5px;">
        <button type="button" id="btn-wb-add-root" class="btn btn-xs btn-gold" title="إضافة عقدة رئيسية (مستطيل أو دائرة)">
          <i class="fa-solid fa-sitemap"></i> + شكل رئيسي
        </button>
        <button type="button" id="btn-wb-toggle-shape" class="btn btn-xs btn-outline" title="تحويل شكل الفرع المحدد بين مستطيل ودائرة ومعين">
          <i class="fa-solid fa-shapes gold-text"></i> شكل الفرع (مستطيل/دائرة)
        </button>
        <button type="button" id="btn-wb-spawn-branches" class="btn btn-xs btn-gold" style="background:linear-gradient(135deg,#19B889,#059669)!important; color:#05070e!important;">
          <i class="fa-solid fa-code-branch"></i> + فرّع عدة فروع
        </button>
        <button type="button" id="btn-wb-edit-node" class="btn btn-xs btn-outline">
          <i class="fa-solid fa-pen-to-square gold-text"></i> تعديل النص
        </button>
        <label class="btn btn-xs btn-outline" style="cursor:pointer; margin:0;">
          <i class="fa-regular fa-image gold-text"></i> إدراج صورة
          <input type="file" id="wb-img-upload-inp" accept="image/*" class="hidden" />
        </label>
        <button type="button" id="btn-wb-scale-up" class="btn btn-xs btn-outline" title="تكبير الصورة أو الشكل أو النص المحدد"><i class="fa-solid fa-magnifying-glass-plus gold-text"></i> تكبير العنصر</button>
        <button type="button" id="btn-wb-scale-down" class="btn btn-xs btn-outline" title="تصغير الصورة أو الشكل أو النص المحدد"><i class="fa-solid fa-magnifying-glass-minus gold-text"></i> تصغير العنصر</button>
        <button type="button" id="btn-wb-del-node" class="btn btn-xs btn-outline text-danger" title="حذف العنصر المحدد (فرع / صورة / شكل / نص)">
          <i class="fa-solid fa-xmark"></i> حذف المحدد
        </button>
      </div>

      <div class="filters-row" style="gap:5px;">
        <button type="button" id="btn-wb-undo" class="btn btn-xs btn-outline"><i class="fa-solid fa-rotate-left"></i> تراجع</button>
        <button type="button" id="btn-wb-clear" class="btn btn-xs btn-danger"><i class="fa-solid fa-trash"></i> مسح الكل</button>
        <button type="button" id="btn-wb-rec-mp4" class="btn btn-xs btn-outline" style="border-color:#19B889;">
          <i class="fa-solid fa-video gold-text"></i> <span id="wb-rec-btn-lbl">تسجيل MP4 (خاص 🔒)</span>
        </button>
        <button type="button" id="btn-wb-download" class="btn btn-xs btn-gold"><i class="fa-solid fa-download"></i> حفظ صورة PNG</button>
        <button type="button" id="btn-wb-fullscreen" class="btn btn-xs btn-gold" title="ملء الشاشة بالكامل"><i class="fa-solid fa-expand"></i> ملء الشاشة</button>
      </div>
    </div>

    <canvas id="smart-whiteboard-canvas" class="whiteboard-canvas-box"></canvas>
    <div class="flex-between mt-1 small-muted">
      <span>💡 <strong>تحكم كامل:</strong> بأداة <strong>(تحريك وتعديل)</strong> اسحب أي نص أو دائرة أو مستطيل أو صورة، أو اسحب المربع الذهبي <strong>(↘)</strong> بزاوية الصورة لتكبيرها وتصغيرها، أو اضغط دبل كليك على أي دائرة/مستطيل للكتابة بداخله!</span>
      <span id="wb-selected-node-indicator" class="gold-text">المحدد: الموضوع الرئيسي</span>
    </div>
  `, async () => {});

  const modalCard = document.querySelector("#universal-modal .modal-card");
  modalCard?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  // إعادة إظهار أليكس عند إغلاق السبورة
  const closeBtn = document.getElementById("btn-close-modal");
  const origClose = closeBtn?.onclick;
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      document.body.classList.remove("wb-fullscreen-mode");
      modalCard?.classList.remove("wb-studio-fullscreen");
      if (origClose) origClose(e);
    };
  }

  const canvas = document.getElementById("smart-whiteboard-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const resizeBoard = () => {
    canvas.width = canvas.clientWidth || 960;
    canvas.height = canvas.clientHeight || 520;
    renderWhiteboardScene(ctx, canvas.width, canvas.height);
  };
  setTimeout(resizeBoard, 40);

  let isDraggingNode = null;
  let isDraggingImg = null;
  let isResizingImg = null;
  let isDraggingStroke = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let isDrawingStroke = false;
  let currentStroke = null;

  const getPos = (e) => {
    const r = canvas.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);
    return { x: clientX - r.left, y: clientY - r.top };
  };

  const findNodeAt = (x, y) => {
    for (let i = WBState.nodes.length - 1; i >= 0; i--) {
      const nd = WBState.nodes[i];
      if (x >= nd.x - nd.w / 2 && x <= nd.x + nd.w / 2 && y >= nd.y - nd.h / 2 && y <= nd.y + nd.h / 2) {
        return nd;
      }
    }
    return null;
  };

  const findImgAt = (x, y) => {
    for (let i = WBState.images.length - 1; i >= 0; i--) {
      const im = WBState.images[i];
      // فحص مقبض تغيير الحجم في الزاوية السفلية اليمنى للصورة (22x22)
      if (x >= im.x + im.w - 20 && x <= im.x + im.w + 10 && y >= im.y + im.h - 20 && y <= im.y + im.h + 10) {
        return { img: im, resize: true };
      }
      if (x >= im.x && x <= im.x + im.w && y >= im.y && y <= im.y + im.h) {
        return { img: im, resize: false };
      }
    }
    return null;
  };

  // البحث عن أي نص حر أو دائرة أو مستطيل مرسوم لتحريكه أو الكتابة بداخله
  const findMovableStrokeAt = (x, y) => {
    for (let i = WBState.strokes.length - 1; i >= 0; i--) {
      const s = WBState.strokes[i];
      if (s.type === "text") {
        const approxW = Math.max(60, (s.text || "").length * (s.size * 2.6));
        const approxH = Math.max(28, s.size * 5);
        if (x >= s.x - 10 && x <= s.x + approxW + 10 && y >= s.y - approxH && y <= s.y + 12) {
          return { stroke: s, idx: i };
        }
      } else if (s.type === "rect") {
        const minX = Math.min(s.x1, s.x2), maxX = Math.max(s.x1, s.x2);
        const minY = Math.min(s.y1, s.y2), maxY = Math.max(s.y1, s.y2);
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          return { stroke: s, idx: i };
        }
      } else if (s.type === "circle") {
        const r = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
        if (Math.hypot(x - s.x1, y - s.y1) <= r + 8) {
          return { stroke: s, idx: i };
        }
      }
    }
    return null;
  };

  const setIndicator = (txt) => {
    const ind = document.getElementById("wb-selected-node-indicator");
    if (ind) ind.textContent = txt;
  };

  canvas.onmousedown = (e) => {
    const { x, y } = getPos(e);
    WBState.color = document.getElementById("wb-color")?.value || "#D4A72C";
    WBState.size = Number(document.getElementById("wb-size")?.value || 4);

    if (WBState.tool === "select" || e.shiftKey) {
      const hitNode = findNodeAt(x, y);
      if (hitNode) {
        WBState.selectedNodeId = hitNode.id;
        WBState.selectedImgId = null;
        WBState.selectedStrokeIdx = null;
        isDraggingNode = hitNode;
        dragOffsetX = x - hitNode.x;
        dragOffsetY = y - hitNode.y;
        setIndicator(`المحدد: فرع "${hitNode.text}"`);
        renderWhiteboardScene(ctx, canvas.width, canvas.height);
        return;
      }

      const hitImgObj = findImgAt(x, y);
      if (hitImgObj) {
        WBState.selectedImgId = hitImgObj.img.id;
        WBState.selectedNodeId = null;
        WBState.selectedStrokeIdx = null;
        if (hitImgObj.resize) {
          isResizingImg = hitImgObj.img;
        } else {
          isDraggingImg = hitImgObj.img;
          dragOffsetX = x - hitImgObj.img.x;
          dragOffsetY = y - hitImgObj.img.y;
        }
        setIndicator(`المحدد: صورة (اسحب زاويتها الذهبية ↘ لتكبيرها أو تصغيرها)`);
        renderWhiteboardScene(ctx, canvas.width, canvas.height);
        return;
      }

      const hitSt = findMovableStrokeAt(x, y);
      if (hitSt) {
        WBState.selectedStrokeIdx = hitSt.idx;
        WBState.selectedNodeId = null;
        WBState.selectedImgId = null;
        isDraggingStroke = hitSt.stroke;
        dragOffsetX = x;
        dragOffsetY = y;
        setIndicator(`المحدد: ${hitSt.stroke.type === "text" ? "نص حر" : hitSt.stroke.type === "circle" ? "دائرة" : "مستطيل"} (دبل كليك لتعديل النص بداخله)`);
        renderWhiteboardScene(ctx, canvas.width, canvas.height);
        return;
      }
      return;
    }

    if (WBState.tool === "text") {
      const txt = prompt("✍️ اكتب النص (يمكنك تحريكه وتكبيره لاحقاً بأداة التحريك):");
      if (txt && txt.trim()) {
        pushWBUndoSnapshot();
        WBState.strokes.push({
          type: "text",
          text: txt.trim(),
          x,
          y,
          color: WBState.color,
          size: WBState.size
        });
        WBState.selectedStrokeIdx = WBState.strokes.length - 1;
        renderWhiteboardScene(ctx, canvas.width, canvas.height);
      }
      return;
    }

    if (WBState.tool === "laser") {
      isDrawingStroke = true;
      WBState.laserPoints = [{ x, y }];
      return;
    }

    pushWBUndoSnapshot();
    isDrawingStroke = true;
    currentStroke = {
      type: WBState.tool,
      color: WBState.color,
      size: WBState.size,
      points: [{ x, y }],
      x1: x,
      y1: y,
      x2: x,
      y2: y,
      innerText: ""
    };
    WBState.strokes.push(currentStroke);
  };

  canvas.onmousemove = (e) => {
    const { x, y } = getPos(e);
    if (isDraggingNode) {
      isDraggingNode.x = x - dragOffsetX;
      isDraggingNode.y = y - dragOffsetY;
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
      return;
    }
    if (isResizingImg) {
      isResizingImg.w = Math.max(60, x - isResizingImg.x);
      isResizingImg.h = Math.max(60, y - isResizingImg.y);
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
      return;
    }
    if (isDraggingImg) {
      isDraggingImg.x = x - dragOffsetX;
      isDraggingImg.y = y - dragOffsetY;
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
      return;
    }
    if (isDraggingStroke) {
      const dx = x - dragOffsetX;
      const dy = y - dragOffsetY;
      dragOffsetX = x;
      dragOffsetY = y;
      if (isDraggingStroke.type === "text") {
        isDraggingStroke.x += dx;
        isDraggingStroke.y += dy;
      } else {
        isDraggingStroke.x1 += dx;
        isDraggingStroke.y1 += dy;
        isDraggingStroke.x2 += dx;
        isDraggingStroke.y2 += dy;
      }
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
      return;
    }

    if (!isDrawingStroke) return;

    if (WBState.tool === "laser") {
      WBState.laserPoints.push({ x, y });
      if (WBState.laserPoints.length > 25) WBState.laserPoints.shift();
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
      return;
    }

    if (!currentStroke) return;
    if (currentStroke.type === "pen" || currentStroke.type === "highlight" || currentStroke.type === "eraser") {
      currentStroke.points.push({ x, y });
    } else {
      currentStroke.x2 = x;
      currentStroke.y2 = y;
    }
    renderWhiteboardScene(ctx, canvas.width, canvas.height);
  };

  window.addEventListener("mouseup", () => {
    if (isDrawingStroke && currentStroke && (currentStroke.type === "rect" || currentStroke.type === "circle")) {
      const dist = Math.hypot(currentStroke.x2 - currentStroke.x1, currentStroke.y2 - currentStroke.y1);
      if (dist > 30) {
        const shapeLabel = currentStroke.type === "circle" ? "الدائرة" : "المستطيل";
        const insideTxt = prompt(`✍️ اكتب النص الذي يظهر داخل ${shapeLabel} (أو اتركه فارغاً):`, "");
        if (insideTxt && insideTxt.trim()) {
          currentStroke.innerText = insideTxt.trim();
        }
        WBState.selectedStrokeIdx = WBState.strokes.length - 1;
      }
    }
    isDraggingNode = null;
    isDraggingImg = null;
    isResizingImg = null;
    isDraggingStroke = null;
    isDrawingStroke = false;
    currentStroke = null;
    WBState.laserPoints = [];
    renderWhiteboardScene(ctx, canvas.width, canvas.height);
  });

  // دبل كليك على أي عقدة أو دائرة أو مستطيل أو نص حر لتعديل الكلام بداخله فوراً!
  canvas.ondblclick = (e) => {
    const { x, y } = getPos(e);
    const hitNode = findNodeAt(x, y);
    if (hitNode) {
      WBState.selectedNodeId = hitNode.id;
      const newTxt = prompt("✏️ تعديل النص داخل الشكل:", hitNode.text);
      if (newTxt !== null && newTxt.trim()) {
        pushWBUndoSnapshot();
        hitNode.text = newTxt.trim();
        hitNode.w = Math.max(130, hitNode.text.length * 9 + 40);
        renderWhiteboardScene(ctx, canvas.width, canvas.height);
      }
      return;
    }

    const hitSt = findMovableStrokeAt(x, y);
    if (hitSt) {
      const s = hitSt.stroke;
      if (s.type === "text") {
        const newTxt = prompt("✏️ تعديل النص الحر:", s.text);
        if (newTxt !== null && newTxt.trim()) {
          s.text = newTxt.trim();
          renderWhiteboardScene(ctx, canvas.width, canvas.height);
        }
      } else if (s.type === "rect" || s.type === "circle") {
        const newTxt = prompt("✏️ اكتب أو عدّل النص داخل هذا الشكل:", s.innerText || "");
        if (newTxt !== null) {
          s.innerText = newTxt.trim();
          renderWhiteboardScene(ctx, canvas.width, canvas.height);
        }
      }
    }
  };

  // تكبير وتصغير أي صورة أو شكل أو نص محدد ببكرة الماوس!
  canvas.addEventListener("wheel", (e) => {
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    if (WBState.selectedImgId) {
      e.preventDefault();
      const im = WBState.images.find(i => i.id === WBState.selectedImgId);
      if (im) {
        im.w = Math.max(50, Math.round(im.w * factor));
        im.h = Math.max(50, Math.round(im.h * factor));
        renderWhiteboardScene(ctx, canvas.width, canvas.height);
      }
    } else if (WBState.selectedStrokeIdx !== null && WBState.strokes[WBState.selectedStrokeIdx]) {
      e.preventDefault();
      const s = WBState.strokes[WBState.selectedStrokeIdx];
      if (s.type === "text") {
        s.size = Math.max(2, Math.min(28, s.size * factor));
      } else {
        s.x2 = s.x1 + (s.x2 - s.x1) * factor;
        s.y2 = s.y1 + (s.y2 - s.y1) * factor;
      }
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
    }
  }, { passive: false });

  const scaleSelectedElement = (factor) => {
    if (WBState.selectedImgId) {
      const im = WBState.images.find(i => i.id === WBState.selectedImgId);
      if (im) {
        im.w = Math.max(50, Math.round(im.w * factor));
        im.h = Math.max(50, Math.round(im.h * factor));
      }
    } else if (WBState.selectedNodeId) {
      const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
      if (nd) {
        nd.w = Math.max(90, Math.round(nd.w * factor));
        nd.h = Math.max(36, Math.round(nd.h * factor));
      }
    } else if (WBState.selectedStrokeIdx !== null && WBState.strokes[WBState.selectedStrokeIdx]) {
      const s = WBState.strokes[WBState.selectedStrokeIdx];
      if (s.type === "text") s.size = Math.max(2, Math.min(30, s.size * factor));
      else {
        s.x2 = s.x1 + (s.x2 - s.x1) * factor;
        s.y2 = s.y1 + (s.y2 - s.y1) * factor;
      }
    }
    renderWhiteboardScene(ctx, canvas.width, canvas.height);
  };

  document.getElementById("btn-wb-scale-up").onclick = () => scaleSelectedElement(1.18);
  document.getElementById("btn-wb-scale-down").onclick = () => scaleSelectedElement(0.84);

  document.querySelectorAll("[data-wb-tool]").forEach(btn => {
    btn.onclick = () => {
      WBState.tool = btn.dataset.wbTool;
      document.querySelectorAll("[data-wb-tool]").forEach(b => b.classList.toggle("active", b === btn));
      canvas.style.cursor = WBState.tool === "select" ? "grab" : "crosshair";
    };
  });

  document.getElementById("wb-bg-select").onchange = (e) => {
    WBState.bgMode = e.target.value;
    renderWhiteboardScene(ctx, canvas.width, canvas.height);
  };

  document.getElementById("btn-wb-add-root").onclick = () => {
    const title = prompt("🌟 اكتب النص داخل الشكل الجديد:", "عنصر رئيسي جديد");
    if (!title || !title.trim()) return;
    const isCircle = confirm("اضغط (موافق OK) لجعله دائرة ⭕، أو (إلغاء Cancel) لجعله مستطيلاً ▭:");
    pushWBUndoSnapshot();
    const id = "nd_" + Date.now();
    const c = document.getElementById("wb-color")?.value || "#D4A72C";
    const w = Math.max(140, title.trim().length * 9 + 42);
    WBState.nodes.push({
      id,
      text: title.trim(),
      shape: isCircle ? "circle" : "rect",
      x: canvas.width / 2,
      y: 110 + (WBState.nodes.length % 4) * 55,
      w: isCircle ? Math.max(110, w * 0.75) : w,
      h: isCircle ? Math.max(110, w * 0.75) : 48,
      color: c,
      parentId: null
    });
    WBState.selectedNodeId = id;
    WBState.tool = "select";
    document.querySelectorAll("[data-wb-tool]").forEach(b => b.classList.toggle("active", b.dataset.wbTool === "select"));
    renderWhiteboardScene(ctx, canvas.width, canvas.height);
  };

  // تبديل شكل العقدة المحددة بين مستطيل ودائرة ومعين
  document.getElementById("btn-wb-toggle-shape").onclick = () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (!nd) return;
    const shapes = ["rect", "circle", "diamond"];
    nd.shape = shapes[(shapes.indexOf(nd.shape || "rect") + 1) % shapes.length];
    if (nd.shape === "circle") {
      const d = Math.max(95, nd.text.length * 6.5 + 36);
      nd.w = d;
      nd.h = d;
    } else {
      nd.w = Math.max(140, nd.text.length * 9 + 40);
      nd.h = 48;
    }
    renderWhiteboardScene(ctx, canvas.width, canvas.height);
  };

  document.getElementById("btn-wb-spawn-branches").onclick = () => {
    const parent = WBState.nodes.find(n => n.id === WBState.selectedNodeId) || WBState.nodes[0];
    if (!parent) {
      toast("أضف شكلاً رئيسياً أولاً!", "error");
      return;
    }
    const raw = prompt(
      `🌿 تفريع من (${parent.text}):\nاكتب أسماء الفروع المتفرعة وافصل بين كل فرع بفاصلة ( , ):`,
      "الفرع الأول, الفرع الثاني, الفرع الثالث"
    );
    if (!raw || !raw.trim()) return;
    const parts = raw.split(/[،,]/).map(s => s.trim()).filter(Boolean);
    if (!parts.length) return;

    pushWBUndoSnapshot();
    const c = document.getElementById("wb-color")?.value || "#19B889";
    const spreadW = Math.min(canvas.width - 120, parts.length * 195);
    const startX = parent.x - spreadW / 2 + (spreadW / (parts.length * 2));
    const stepX = parts.length > 1 ? spreadW / parts.length : 0;
    const childY = Math.min(canvas.height - 60, parent.y + 125);

    parts.forEach((txt, idx) => {
      WBState.nodes.push({
        id: "nd_" + Date.now() + "_" + idx,
        text: txt,
        shape: parent.shape || "rect",
        x: Math.max(85, Math.min(canvas.width - 85, parts.length === 1 ? parent.x : startX + idx * stepX)),
        y: childY,
        w: Math.max(130, txt.length * 9 + 36),
        h: parent.shape === "circle" ? 95 : 44,
        color: c,
        parentId: parent.id
      });
    });

    WBState.tool = "select";
    document.querySelectorAll("[data-wb-tool]").forEach(b => b.classList.toggle("active", b.dataset.wbTool === "select"));
    renderWhiteboardScene(ctx, canvas.width, canvas.height);
    toast(`تم توليد ${parts.length} فروع متشعبة! 🌿✨`);
  };

  document.getElementById("btn-wb-edit-node").onclick = () => {
    if (WBState.selectedNodeId) {
      const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
      if (nd) {
        const txt = prompt("✏️ تعديل نص الفرع:", nd.text);
        if (txt !== null && txt.trim()) {
          pushWBUndoSnapshot();
          nd.text = txt.trim();
          nd.w = Math.max(130, nd.text.length * 9 + 36);
          nd.color = document.getElementById("wb-color")?.value || nd.color;
          renderWhiteboardScene(ctx, canvas.width, canvas.height);
        }
      }
    } else if (WBState.selectedStrokeIdx !== null && WBState.strokes[WBState.selectedStrokeIdx]) {
      const s = WBState.strokes[WBState.selectedStrokeIdx];
      const curTxt = s.type === "text" ? s.text : (s.innerText || "");
      const txt = prompt("✏️ تعديل النص:", curTxt);
      if (txt !== null) {
        if (s.type === "text") s.text = txt.trim();
        else s.innerText = txt.trim();
        s.color = document.getElementById("wb-color")?.value || s.color;
        renderWhiteboardScene(ctx, canvas.width, canvas.height);
      }
    }
  };

  document.getElementById("btn-wb-del-node").onclick = () => {
    pushWBUndoSnapshot();
    if (WBState.selectedImgId) {
      WBState.images = WBState.images.filter(im => im.id !== WBState.selectedImgId);
      WBState.selectedImgId = null;
    } else if (WBState.selectedStrokeIdx !== null) {
      WBState.strokes.splice(WBState.selectedStrokeIdx, 1);
      WBState.selectedStrokeIdx = null;
    } else if (WBState.selectedNodeId) {
      const delId = WBState.selectedNodeId;
      WBState.nodes = WBState.nodes.filter(n => n.id !== delId && n.parentId !== delId);
      WBState.selectedNodeId = WBState.nodes[0]?.id || null;
    }
    renderWhiteboardScene(ctx, canvas.width, canvas.height);
  };

  document.getElementById("wb-img-upload-inp").onchange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const imgEl = new Image();
      imgEl.onload = () => {
        const maxW = 360;
        const scale = Math.min(1, maxW / imgEl.width);
        const newImgId = "im_" + Date.now();
        WBState.images.push({
          id: newImgId,
          imgEl,
          x: 80,
          y: 120,
          w: Math.round(imgEl.width * scale),
          h: Math.round(imgEl.height * scale)
        });
        WBState.selectedImgId = newImgId;
        WBState.tool = "select";
        document.querySelectorAll("[data-wb-tool]").forEach(b => b.classList.toggle("active", b.dataset.wbTool === "select"));
        renderWhiteboardScene(ctx, canvas.width, canvas.height);
        toast("تم إدراج الصورة! اسحب المربع الذهبي (↘) بزاوية الصورة لتكبيرها أو تصغيرها بحرية 🖼️✨");
      };
      imgEl.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  document.getElementById("btn-wb-undo").onclick = () => {
    const last = WBState.undoStack.pop();
    if (last) {
      const parsed = JSON.parse(last);
      WBState.strokes = parsed.strokes || [];
      WBState.nodes = parsed.nodes || [];
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
    }
  };

  document.getElementById("btn-wb-clear").onclick = () => {
    if (!confirm("هل تريد مسح السبورة بالكامل؟")) return;
    pushWBUndoSnapshot();
    WBState.strokes = [];
    WBState.images = [];
    WBState.nodes = [];
    renderWhiteboardScene(ctx, canvas.width, canvas.height);
  };

  document.getElementById("btn-wb-download").onclick = () => {
    const a = document.createElement("a");
    a.download = `Smart-Diagram-Explanation-${today()}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
    toast("تم تصدير صورة الشرح بجودة PNG عالية! 📸✅");
  };

  // تكبير السبورة بملء الشاشة 100% وإخفاء أليكس
  document.getElementById("btn-wb-fullscreen").onclick = () => {
    const isFull = modalCard?.classList.toggle("wb-studio-fullscreen");
    document.body.classList.add("wb-fullscreen-mode");
    const btn = document.getElementById("btn-wb-fullscreen");
    if (btn) {
      btn.innerHTML = isFull
        ? `<i class="fa-solid fa-compress"></i> تصغير النافذة`
        : `<i class="fa-solid fa-expand"></i> ملء الشاشة`;
    }
    setTimeout(resizeBoard, 60);
  };

  const toggleCanvasPrivateRecording = async () => {
    const recLbl = document.getElementById("wb-rec-btn-lbl");
    const recBtn = document.getElementById("btn-wb-rec-mp4");

    if (WBState.isRecordingCanvas && WBState.canvasRecorder) {
      WBState.canvasRecorder.stop();
      WBState.micStream?.getTracks().forEach(t => t.stop());
      WBState.isRecordingCanvas = false;
      if (recLbl) recLbl.textContent = "تسجيل MP4 (خاص 🔒)";
      recBtn?.classList.remove("btn-danger");
      return;
    }

    try {
      const canvasStream = canvas.captureStream(30);
      try {
        WBState.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        WBState.micStream.getAudioTracks().forEach(track => canvasStream.addTrack(track));
      } catch (micErr) {}

      const mime = getBestMP4MimeType();
      WBState.canvasRecorder = mime
        ? new MediaRecorder(canvasStream, { mimeType: mime })
        : new MediaRecorder(canvasStream);

      WBState.canvasRecChunks = [];
      WBState.canvasRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) WBState.canvasRecChunks.push(e.data);
      };
      WBState.canvasRecorder.onstop = () => {
        const blob = new Blob(WBState.canvasRecChunks, { type: "video/mp4" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `Whiteboard-Explanation-${today()}.mp4`;
        a.click();
        toast("تم حفظ فيديو الشرح بصيغة .MP4 بخصوصية تامة! 🎥✅");
      };

      WBState.canvasRecorder.start(200);
      WBState.isRecordingCanvas = true;
      if (recLbl) recLbl.textContent = "إيقاف وحفظ MP4 🔴";
      recBtn?.classList.add("btn-danger");
      toast("🔒 بدأ تسجيل السبورة وصوتك مباشرة بصيغة MP4!", "success");
    } catch (e) {
      toast("تعذر بدء تسجيل الكانفاس", "error");
    }
  };

  document.getElementById("btn-wb-rec-mp4").onclick = toggleCanvasPrivateRecording;
  if (autoStartPrivateRecord) {
    setTimeout(toggleCanvasPrivateRecording, 350);
  }
}

function renderWhiteboardScene(ctx, W, H) {
  ctx.clearRect(0, 0, W, H);

  const isWhite = WBState.bgMode === "white";
  ctx.fillStyle = isWhite ? "#F8FAFC" : "#080D1A";
  ctx.fillRect(0, 0, W, H);

  if (WBState.bgMode === "grid") {
    ctx.strokeStyle = isWhite ? "rgba(15, 23, 42, 0.07)" : "rgba(212, 167, 44, 0.07)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 32) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 32) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  } else if (WBState.bgMode === "dots") {
    ctx.fillStyle = "rgba(148, 163, 184, 0.25)";
    for (let x = 24; x < W; x += 28) {
      for (let y = 24; y < H; y += 28) {
        ctx.beginPath(); ctx.arc(x, y, 1.4, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  // رسم الصور المدرجة + مقبض التكبير والتصغير الذهبي في الزاوية (↘)
  WBState.images.forEach(im => {
    ctx.drawImage(im.imgEl, im.x, im.y, im.w, im.h);
    const isSel = im.id === WBState.selectedImgId;
    ctx.strokeStyle = isSel ? "#19B889" : "rgba(212, 167, 44, 0.5)";
    ctx.lineWidth = isSel ? 3 : 1.5;
    ctx.strokeRect(im.x, im.y, im.w, im.h);

    // مقبض السحب لتغيير حجم الصورة
    ctx.fillStyle = "#D4A72C";
    ctx.fillRect(im.x + im.w - 14, im.y + im.h - 14, 16, 16);
    ctx.strokeStyle = "#05070e";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(im.x + im.w - 14, im.y + im.h - 14, 16, 16);
  });

  // رسم الخطوط، المستطيلات، الدوائر (مع النصوص بداخلها!)، والنصوص الحرة
  WBState.strokes.forEach((s, idx) => {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = s.type === "highlight" ? s.size * 3.2 : s.size;
    ctx.strokeStyle = s.type === "eraser" ? (isWhite ? "#F8FAFC" : "#080D1A") : s.color;
    ctx.fillStyle = s.color;
    if (s.type === "highlight") ctx.globalAlpha = 0.32;

    if (idx === WBState.selectedStrokeIdx) {
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#19B889";
    }

    if (s.type === "pen" || s.type === "highlight" || s.type === "eraser") {
      if (s.points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        s.points.forEach(pt => ctx.lineTo(pt.x, pt.y));
        ctx.stroke();
      }
    } else if (s.type === "line") {
      ctx.beginPath();
      ctx.moveTo(s.x1, s.y1);
      ctx.lineTo(s.x2, s.y2);
      ctx.stroke();
    } else if (s.type === "arrow") {
      drawArrowOnCtx(ctx, s.x1, s.y1, s.x2, s.y2, s.color, s.size);
    } else if (s.type === "rect") {
      const rw = s.x2 - s.x1;
      const rh = s.y2 - s.y1;
      ctx.strokeRect(s.x1, s.y1, rw, rh);
      if (s.innerText) {
        ctx.font = `bold ${Math.max(14, s.size * 3.2)}px Alexandria, Cairo, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.innerText, s.x1 + rw / 2, s.y1 + rh / 2);
      }
    } else if (s.type === "circle") {
      const r = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
      ctx.beginPath();
      ctx.arc(s.x1, s.y1, r, 0, Math.PI * 2);
      ctx.stroke();
      if (s.innerText) {
        ctx.font = `bold ${Math.max(14, s.size * 3.2)}px Alexandria, Cairo, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.innerText, s.x1, s.y1);
      }
    } else if (s.type === "text") {
      ctx.font = `bold ${Math.max(16, s.size * 4.2)}px Alexandria, Cairo, sans-serif`;
      ctx.fillText(s.text, s.x, s.y);
    }
    ctx.restore();
  });

  // رسم مؤشر الليزر المتوهج أثناء الشرح
  if (WBState.laserPoints.length > 1) {
    ctx.save();
    ctx.strokeStyle = "#EF4444";
    ctx.shadowBlur = 16;
    ctx.shadowColor = "#EF4444";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(WBState.laserPoints[0].x, WBState.laserPoints[0].y);
    WBState.laserPoints.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
    ctx.restore();
  }

  // رسم الروابط المنحنية بين الفروع الشجرية
  WBState.nodes.forEach(nd => {
    if (!nd.parentId) return;
    const parent = WBState.nodes.find(p => p.id === nd.parentId);
    if (!parent) return;

    ctx.save();
    ctx.strokeStyle = nd.color || "#19B889";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const startX = parent.x;
    const startY = parent.y + parent.h / 2;
    const endX = nd.x;
    const endY = nd.y - nd.h / 2;
    const midY = (startY + endY) / 2;
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(startX, midY, endX, midY, endX, endY);
    ctx.stroke();

    ctx.fillStyle = nd.color || "#19B889";
    ctx.beginPath();
    ctx.arc(endX, endY, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // رسم العقد الشجرية (مستطيل / دائرة / معين) مع النص بداخلها
  WBState.nodes.forEach(nd => {
    const isSel = nd.id === WBState.selectedNodeId;
    ctx.save();
    const rx = nd.x - nd.w / 2;
    const ry = nd.y - nd.h / 2;

    if (isSel) {
      ctx.shadowBlur = 18;
      ctx.shadowColor = nd.color || "#D4A72C";
    }

    ctx.fillStyle = isWhite ? "#FFFFFF" : "#11192E";
    ctx.strokeStyle = isSel ? "#19B889" : (nd.color || "#D4A72C");
    ctx.lineWidth = isSel ? 3.2 : 2;

    ctx.beginPath();
    if (nd.shape === "circle") {
      ctx.arc(nd.x, nd.y, Math.max(nd.w, nd.h) / 2, 0, Math.PI * 2);
    } else if (nd.shape === "diamond") {
      ctx.moveTo(nd.x, ry - 8);
      ctx.lineTo(rx + nd.w + 12, nd.y);
      ctx.lineTo(nd.x, ry + nd.h + 8);
      ctx.lineTo(rx - 12, nd.y);
      ctx.closePath();
    } else {
      ctx.roundRect(rx, ry, nd.w, nd.h, 12);
    }
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = isWhite ? "#0F172A" : "#F8FAFC";
    ctx.font = "bold 13.5px Alexandria, Cairo, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(nd.text, nd.x, nd.y);
    ctx.restore();
  });
}

function drawArrowOnCtx(ctx, x1, y1, x2, y2, color, size) {
  const headlen = Math.max(10, size * 3);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

// نافذة الآلة الحاسبة العلمية والبرمجية السريعة
function openScientificCalcModal() {
  B().openFormModal("🧮 الآلة الحاسبة الهندسية والبرمجية السريعة", `
    <input type="text" id="sci-calc-screen" dir="ltr" class="wizard-input-giant" placeholder="0" style="text-align:right; font-family:monospace;" />
    <div class="flex-between mt-1 small-muted" dir="ltr">
      <span id="sci-calc-hex">HEX: 0</span>
      <span id="sci-calc-bin">BIN: 0</span>
    </div>
    <div class="calc-grid-buttons" dir="ltr">
      ${["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+","Math.sqrt(","Math.pow(","(",")"].map(k => `
        <button type="button" class="calc-btn" data-calc-key="${k}">${k === "Math.sqrt(" ? "√" : k === "Math.pow(" ? "x^y" : k}</button>
      `).join("")}
      <button type="button" class="calc-btn" style="grid-column:span 4; background:rgba(239,68,68,0.25);" data-calc-key="C">مسح (Clear)</button>
    </div>
  `, async () => {});

  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  const screen = document.getElementById("sci-calc-screen");
  const evalCalc = () => {
    try {
      const res = Function(`"use strict"; return (${screen.value})`)();
      screen.value = String(Number(res.toFixed(6)));
      const intVal = Math.floor(Number(res)) || 0;
      document.getElementById("sci-calc-hex").textContent = "HEX: " + intVal.toString(16).toUpperCase();
      document.getElementById("sci-calc-bin").textContent = "BIN: " + intVal.toString(2);
    } catch (e) {
      toast("معادلة غير صحيحة", "error");
    }
  };

  document.querySelectorAll("[data-calc-key]").forEach(btn => {
    btn.onclick = () => {
      const k = btn.dataset.calcKey;
      if (k === "C") {
        screen.value = "";
      } else if (k === "=") {
        evalCalc();
      } else {
        screen.value += k;
      }
    };
  });
}

/* ============================================================================
   10 PRESET THEMES + CUSTOM THEME BUILDER ENGINE (COLORS, HEADINGS, TEXT & BG)
   ============================================================================ */
const OS_10_THEMES_DB = {
  "midnight-gold": {
    name: "1. Midnight Gold (الملكي الافتراضي)",
    tag: "Default Luxury",
    bgPrimary: "#070912",
    bgSecondary: "#0e1322",
    bgCard: "#141b2d",
    headingColor: "#D4A72C",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    accentEmerald: "#19B889",
    wallpaperOpacity: 0.85
  },
  "pure-light": {
    name: "2. Pure Light (النهاري الساطع)",
    tag: "Clean Daylight",
    bgPrimary: "#F1F5F9",
    bgSecondary: "#FFFFFF",
    bgCard: "#FFFFFF",
    headingColor: "#B45309",
    textPrimary: "#0F172A",
    textSecondary: "#475569",
    accentEmerald: "#059669",
    wallpaperOpacity: 0.04
  },
  "pure-black": {
    name: "3. OLED Pure Black (الأسود النقي)",
    tag: "OLED Ultra Contrast",
    bgPrimary: "#000000",
    bgSecondary: "#060606",
    bgCard: "#0C0C0C",
    headingColor: "#F59E0B",
    textPrimary: "#FFFFFF",
    textSecondary: "#A1A1AA",
    accentEmerald: "#10B981",
    wallpaperOpacity: 0.05
  },
  "forest": {
    name: "4. Emerald Forest (غابة الزمرد)",
    tag: "Nature Calm",
    bgPrimary: "#05130E",
    bgSecondary: "#091E17",
    bgCard: "#0E2920",
    headingColor: "#34D399",
    textPrimary: "#ECFDF5",
    textSecondary: "#A7F3D0",
    accentEmerald: "#10B981",
    wallpaperOpacity: 0.25
  },
  "cyberpunk": {
    name: "5. Cyberpunk Neon (سايبر بانك نيون)",
    tag: "Sci-Fi Hacker",
    bgPrimary: "#090414",
    bgSecondary: "#120826",
    bgCard: "#1A0E36",
    headingColor: "#00F0FF",
    textPrimary: "#F0F9FF",
    textSecondary: "#C4B5FD",
    accentEmerald: "#FF007F",
    wallpaperOpacity: 0.35
  },
  "vscode-dark": {
    name: "6. VS Code Studio (بيئة المبرمجين)",
    tag: "Developer IDE",
    bgPrimary: "#181818",
    bgSecondary: "#1F1F1F",
    bgCard: "#252526",
    headingColor: "#38BDF8",
    textPrimary: "#E2E8F0",
    textSecondary: "#94A3B8",
    accentEmerald: "#4EC9B0",
    wallpaperOpacity: 0.08
  },
  "nordic-ocean": {
    name: "7. Nordic Ocean (المحيط القطبي)",
    tag: "Deep Focus Blue",
    bgPrimary: "#081021",
    bgSecondary: "#0E1930",
    bgCard: "#152342",
    headingColor: "#38BDF8",
    textPrimary: "#F0F9FF",
    textSecondary: "#93C5FD",
    accentEmerald: "#2DD4BF",
    wallpaperOpacity: 0.3
  },
  "crimson-samurai": {
    name: "8. Crimson Samurai (الساموراي القرمزي)",
    tag: "High Energy Red",
    bgPrimary: "#120508",
    bgSecondary: "#1C080D",
    bgCard: "#280D14",
    headingColor: "#FB7185",
    textPrimary: "#FFF1F2",
    textSecondary: "#FDA4AF",
    accentEmerald: "#F43F5E",
    wallpaperOpacity: 0.25
  },
  "royal-amethyst": {
    name: "9. Royal Amethyst (الأرجواني الملكي)",
    tag: "Velvet Purple",
    bgPrimary: "#0C0517",
    bgSecondary: "#140926",
    bgCard: "#1E1038",
    headingColor: "#C084FC",
    textPrimary: "#FAF5FF",
    textSecondary: "#D8B4FE",
    accentEmerald: "#A855F7",
    wallpaperOpacity: 0.3
  },
  "warm-espresso": {
    name: "10. Warm Espresso (قهوة القراءة الدافئة)",
    tag: "Eye-Comfort Sepia",
    bgPrimary: "#140F0B",
    bgSecondary: "#1F1712",
    bgCard: "#2B2019",
    headingColor: "#FBBF24",
    textPrimary: "#FEF3C7",
    textSecondary: "#D6D3D1",
    accentEmerald: "#D97706",
    wallpaperOpacity: 0.15
  }
};

function getCustomThemeConfig() {
  return OSProStore.get("custom_theme_config", {
    name: "🎨 ثيمي الشخصي المخصص",
    bgPrimary: "#0B1120",
    bgSecondary: "#111827",
    bgCard: "#1E293B",
    headingColor: "#38BDF8",
    textPrimary: "#F8FAFC",
    textSecondary: "#CBD5E1",
    accentEmerald: "#10B981",
    wallpaperOpacity: 0.25
  });
}

function applyOSTheme(themeId, notify = true) {
  const isCustom = themeId === "custom";
  const cfg = isCustom
    ? getCustomThemeConfig()
    : (OS_10_THEMES_DB[themeId] || OS_10_THEMES_DB["midnight-gold"]);

  document.documentElement.setAttribute("data-theme", themeId);
  localStorage.setItem("MY_LIFE_OS_THEME_V6", themeId);

  let styleEl = document.getElementById("os-dynamic-theme-engine");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "os-dynamic-theme-engine";
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    :root, html[data-theme="${themeId}"] {
      --bg-primary: ${cfg.bgPrimary} !important;
      --bg-secondary: ${cfg.bgSecondary} !important;
      --bg-card: ${cfg.bgCard} !important;
      --gold-primary: ${cfg.headingColor} !important;
      --emerald-primary: ${cfg.accentEmerald || "#10B981"} !important;
      --text-primary: ${cfg.textPrimary} !important;
      --text-secondary: ${cfg.textSecondary} !important;
      --border-color: ${cfg.headingColor}44 !important;
    }
    body {
      background-color: ${cfg.bgPrimary} !important;
      color: ${cfg.textPrimary} !important;
    }
    .custom-app-wallpaper {
      opacity: ${cfg.wallpaperOpacity !== undefined ? cfg.wallpaperOpacity : 0.3} !important;
    }
    .sidebar, .topbar {
      background: ${cfg.bgSecondary}ee !important;
      color: ${cfg.textPrimary} !important;
      border-color: ${cfg.headingColor}33 !important;
    }
    .card, .item-card, .kpi-card, .os-mini-widget, .modal-card, .role-specialist-card, .visual-cover-card, .exercise-pro-card {
      background: ${cfg.bgCard}f2 !important;
      color: ${cfg.textPrimary} !important;
      border-color: ${cfg.headingColor}38 !important;
    }
    h1, h2, h3, h4, .gold-text, .card-header h3, .nav-item.active {
      color: ${cfg.headingColor} !important;
    }
    p, span:not(.badge), label, li, td, .briefing-content {
      color: ${cfg.textPrimary};
    }
    .small-muted, small, .datetime-text, .kpi-label {
      color: ${cfg.textSecondary} !important;
    }
    .btn-gold {
      background: linear-gradient(135deg, ${cfg.headingColor}, ${cfg.accentEmerald || cfg.headingColor}) !important;
      color: #05070e !important;
    }
    input, select, textarea {
      background: ${cfg.bgSecondary} !important;
      color: ${cfg.textPrimary} !important;
      border-color: ${cfg.headingColor}40 !important;
    }
  `;

  if (notify) toast(`تم تفعيل: ${cfg.name} ✨`);
}

function openThemeSelectorModal() {
  const cur = localStorage.getItem("MY_LIFE_OS_THEME_V6") || "midnight-gold";
  const customCfg = getCustomThemeConfig();

  const presetsHtml = Object.entries(OS_10_THEMES_DB).map(([id, t]) => `
    <div class="theme-preview-card ${cur === id ? "active" : ""}" data-pick-theme="${id}"
         style="background:${t.bgCard}; color:${t.textPrimary}; border:2px solid ${cur === id ? t.headingColor : "rgba(255,255,255,0.12)"};">
      <div class="flex-between">
        <span class="badge" style="background:${t.headingColor}25; color:${t.headingColor};">${esc(t.tag)}</span>
        <span style="width:18px; height:18px; border-radius:50%; background:${t.headingColor}; display:inline-block; border:2px solid #fff;"></span>
      </div>
      <strong style="color:${t.headingColor}; font-size:0.9rem; margin-top:6px;">${esc(t.name)}</strong>
      <small style="color:${t.textSecondary}; font-size:0.74rem;">خلفية ${t.bgPrimary} • نص ${t.textPrimary}</small>
    </div>
  `).join("");

  B().openFormModal("🎨 استوديو الثيمات الـ 10 + صانع الثيم الشخصي (Custom Theme Studio)", `
    <p class="small-muted mb-2">اختر من بين 10 ثيمات احترافية جاهزة، أو انزل للأسفل واصنع ثيمك الخاص بألوانك المفضلة:</p>

    <div class="theme-cards-grid" style="grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); max-height:290px; overflow-y:auto; padding:4px;">
      ${presetsHtml}
    </div>

    <hr class="divider" />

    <!-- صانع الثيم الشخصي المخصص بالكامل -->
    <div class="subject-progress-box" style="border:1.5px solid var(--gold-primary);">
      <div class="flex-between mb-2">
        <h4 class="gold-text"><i class="fa-solid fa-wand-magic-sparkles"></i> صانع الثيم الشخصي (اختر لون الكلمات والعناوين والخلفية بنفسك)</h4>
        <span class="badge badge-emerald">${cur === "custom" ? "مفعل حالياً ✅" : "تخصيص حر"}</span>
      </div>

      <div class="dashboard-grid" style="grid-template-columns:repeat(auto-fit, minmax(145px, 1fr)); gap:10px;">
        <div class="form-group">
          <label>🎨 لون العناوين والأزرار</label>
          <input type="color" id="cust-th-heading" value="${customCfg.headingColor}" style="height:42px; cursor:pointer;" />
        </div>
        <div class="form-group">
          <label>✍️ لون الكلمات والنصوص</label>
          <input type="color" id="cust-th-text" value="${customCfg.textPrimary}" style="height:42px; cursor:pointer;" />
        </div>
        <div class="form-group">
          <label>💬 لون النصوص الفرعية</label>
          <input type="color" id="cust-th-muted" value="${customCfg.textSecondary}" style="height:42px; cursor:pointer;" />
        </div>
        <div class="form-group">
          <label>🖥️ لون خلفية الموقع</label>
          <input type="color" id="cust-th-bg" value="${customCfg.bgPrimary}" style="height:42px; cursor:pointer;" />
        </div>
        <div class="form-group">
          <label>🗂️ لون الكروت والبطاقات</label>
          <input type="color" id="cust-th-card" value="${customCfg.bgCard}" style="height:42px; cursor:pointer;" />
        </div>
        <div class="form-group">
          <label>🧭 لون القائمة الجانبية</label>
          <input type="color" id="cust-th-side" value="${customCfg.bgSecondary}" style="height:42px; cursor:pointer;" />
        </div>
        <div class="form-group">
          <label>✨ اللون الثانوي المساعد</label>
          <input type="color" id="cust-th-emerald" value="${customCfg.accentEmerald}" style="height:42px; cursor:pointer;" />
        </div>
        <div class="form-group">
          <label>🖼️ وضوح صورة الخلفية (${Math.round((customCfg.wallpaperOpacity ?? 0.25) * 100)}%)</label>
          <input type="range" id="cust-th-wp" min="0" max="100" value="${Math.round((customCfg.wallpaperOpacity ?? 0.25) * 100)}" style="margin-top:10px;" />
        </div>
      </div>

      <div class="filters-row mt-2">
        <button type="button" id="btn-apply-custom-theme" class="btn btn-gold btn-sm btn-block">
          <i class="fa-solid fa-palette"></i> حفظ وتفعيل ثيمي الشخصي الآن 🎨
        </button>
      </div>
    </div>
  `, async () => {});

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  // اختيار أي ثيم من الـ 10 الجاهزين بضغطة واحدة
  document.querySelectorAll("[data-pick-theme]").forEach(card => {
    card.onclick = () => {
      applyOSTheme(card.dataset.pickTheme, true);
      openThemeSelectorModal();
    };
  });

  // معاينة حية وتطبيق فوري للثيم الشخصي
  const readAndApplyCustom = (closeAfter = false) => {
    const newCustom = {
      name: "🎨 ثيمي الشخصي المخصص",
      headingColor: document.getElementById("cust-th-heading")?.value || "#38BDF8",
      textPrimary: document.getElementById("cust-th-text")?.value || "#F8FAFC",
      textSecondary: document.getElementById("cust-th-muted")?.value || "#CBD5E1",
      bgPrimary: document.getElementById("cust-th-bg")?.value || "#0B1120",
      bgCard: document.getElementById("cust-th-card")?.value || "#1E293B",
      bgSecondary: document.getElementById("cust-th-side")?.value || "#111827",
      accentEmerald: document.getElementById("cust-th-emerald")?.value || "#10B981",
      wallpaperOpacity: Number(document.getElementById("cust-th-wp")?.value || 25) / 100
    };
    OSProStore.set("custom_theme_config", newCustom);
    applyOSTheme("custom", closeAfter);
    if (closeAfter) {
      document.getElementById("universal-modal")?.classList.add("hidden");
    }
  };

  // معاينة لحظية بمجرد تحريك أي لون!
  ["cust-th-heading", "cust-th-text", "cust-th-muted", "cust-th-bg", "cust-th-card", "cust-th-side", "cust-th-emerald", "cust-th-wp"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", () => readAndApplyCustom(false));
  });

  document.getElementById("btn-apply-custom-theme")?.addEventListener("click", () => {
    readAndApplyCustom(true);
  });
}

function openQuickCaptureModal() {
  B().openFormModal("⚡ التسجيل الفوري السريع (Quick Capture — Alt+N)", `
    <div class="form-group">
      <label>نوع العنصر المراد تسجيله فوراً</label>
      <select name="captureType">
        <option value="task">✅ مهمة سريعة (تُحفظ في المهام)</option>
        <option value="note">🧠 فكرة أو ملاحظة (تُحفظ في العقل الثاني)</option>
        <option value="goal">🎯 هدف جديد (يُحفظ في الأهداف)</option>
        <option value="journal">📔 تدوينة يومية (تُحفظ في اليوميات)</option>
        <option value="expense">💰 مصروف سريع (يُحفظ في المالية)</option>
      </select>
    </div>
    <div class="form-group">
      <label>العنوان أو المحتوى</label>
      <input name="title" required placeholder="اكتب فكرتك أو مهمتك في ثوانٍ..." autofocus />
    </div>
    <div class="form-group">
      <label>تفاصيل إضافية أو مبلغ (اختياري)</label>
      <input name="extra" placeholder="وصف إضافي، وسم #tag، أو قيمة المبلغ..." />
    </div>
  `, async (data) => {
    if (data.captureType === "task") {
      await B().createRecord("tasks", {
        title: data.title,
        description: data.extra || "تمت الإضافة عبر Quick Capture",
        dueDate: today(),
        priority: "High",
        status: "Pending",
        category: "سريع"
      });
    } else if (data.captureType === "note") {
      await B().createRecord("notes", {
        title: data.title,
        content: data.extra || data.title,
        category: "Second Brain",
        tags: "quick"
      });
    } else if (data.captureType === "expense") {
      await B().createRecord("transactions", {
        title: data.title,
        amount: Number(data.extra) || 50,
        type: "expense",
        category: "سريع",
        date: today()
      });
    } else if (data.captureType === "goal") {
      const goals = OSProStore.get("goals_v3", []);
      goals.unshift({
        id: Date.now().toString(),
        title: data.title,
        level: "أهداف شهرية",
        deadline: today(),
        img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        milestones: [data.extra || "الخطوة الأولى"],
        doneMilestones: []
      });
      OSProStore.set("goals_v3", goals);
      renderGoalsView();
      toast("تم حفظ الهدف في Vision Board 🎯");
    } else if (data.captureType === "journal") {
      const journals = OSProStore.get("journals_v3", []);
      journals.unshift({ id: Date.now().toString(), date: today(), mood: "😊 متفائل", energy: 85, title: data.title, content: data.extra || data.title });
      OSProStore.set("journals_v3", journals);
      renderJournalView();
      toast("تم حفظ التدوينة في يومياتك 📔");
    }
  });
}

/* ============================================================================
   2. TIMESTAMP-PERSISTENT FOCUS STUDIO V6 + 6 MODES + SESSION PLANNER
   ============================================================================ */
function initTimestampFocusPersistence() {
  const savedTarget = Number(localStorage.getItem("MY_LIFE_OS_POMO_TARGET_TS") || 0);
  const wasRunning = localStorage.getItem("MY_LIFE_OS_POMO_WAS_RUNNING") === "1";

  if (wasRunning && savedTarget > Date.now()) {
    const remainingSecs = Math.max(1, Math.round((savedTarget - Date.now()) / 1000));
    const pState = B().getPomodoroState?.();
    if (pState) {
      pState.timeLeft = remainingSecs;
      setTimeout(() => {
        B().startPomodoro?.();
        toast(`⏱️ تم استئناف جلسة التركيز تلقائياً بعد التحديث (متبقي ${Math.ceil(remainingSecs / 60)} دقيقة)`, "info");
      }, 800);
    }
  }

  setInterval(() => {
    const pState = B().getPomodoroState?.();
    if (!pState) return;
    if (pState.isRunning) {
      const targetTs = Date.now() + pState.timeLeft * 1000;
      localStorage.setItem("MY_LIFE_OS_POMO_TARGET_TS", String(targetTs));
      localStorage.setItem("MY_LIFE_OS_POMO_WAS_RUNNING", "1");
    } else {
      localStorage.setItem("MY_LIFE_OS_POMO_WAS_RUNNING", "0");
    }
  }, 1000);
}

function openSmartFocusPlannerAndAnalytics() {
  const plan = OSProStore.get("focus_plan", [
    { title: "الجلسة الأولى — تركيز عميق", mins: 50, type: "work", done: false },
    { title: "استراحة قصيرة وتجديد نشاط", mins: 10, type: "break", done: false },
    { title: "الجلسة الثانية — حل وتطبيق", mins: 50, type: "work", done: false },
    { title: "استراحة طويلة", mins: 20, type: "break", done: false },
    { title: "الجلسة الثالثة — مراجعة وتثبيت", mins: 50, type: "work", done: false }
  ]);

  const logs = JSON.parse(localStorage.getItem("MY_LIFE_OS_FOCUS_LOG") || "[]");
  const todayMins = logs.filter(l => l.date === today()).reduce((s, l) => s + (Number(l.minutes) || 0), 0);
  const weekMins = logs.reduce((s, l) => s + (Number(l.minutes) || 0), 0);
  const avgMins = logs.length ? Math.round(weekMins / logs.length) : 0;

  const totalWorkPlan = plan.filter(p => p.type === "work").reduce((s, p) => s + p.mins, 0);
  const totalBreakPlan = plan.filter(p => p.type === "break").reduce((s, p) => s + p.mins, 0);

  B().openFormModal("🚀 استوديو تخطيط الجلسات الذكي وتحليلات التركيز (Focus Studio V6)", `
    <div class="form-group">
      <label class="gold-text"><i class="fa-solid fa-sliders"></i> 1. الأوضاع الستة للتركيز (6 Focus Modes & Presets):</label>
      <div class="filters-row mt-1">
        <button type="button" class="btn btn-xs btn-outline" data-v6-mode="25">Pomodoro (25/5)</button>
        <button type="button" class="btn btn-xs btn-outline" data-v6-mode="50">Deep Work (50د)</button>
        <button type="button" class="btn btn-xs btn-gold" data-v6-mode="90">Deep Work (90د)</button>
        <button type="button" class="btn btn-xs btn-outline" data-v6-mode="15">سبرنت سريع (15د)</button>
        <button type="button" class="btn btn-xs btn-outline" data-v6-mode="45">جلسة جامعة (45د)</button>
      </div>
    </div>

    <div class="subject-progress-box">
      <div class="flex-between">
        <strong class="gold-text">📋 2. خطة الجلسات الذكية المتسلسلة</strong>
        <button type="button" id="btn-create-custom-plan" class="btn btn-xs btn-outline">+ إنشاء خطة مخصصة</button>
      </div>
      <div class="session-plan-timeline">
        ${plan.map((st, idx) => `
          <div class="session-step-row ${st.type === "break" ? "break-step" : ""} ${st.done ? "completed-step" : ""}">
            <div>
              <strong>${idx + 1}. ${esc(st.title)} — ${st.mins} دقيقة</strong>
              <span class="badge ${st.type === "work" ? "badge-emerald" : "badge-gold"}">${st.type === "work" ? "تركيز" : "راحة"}</span>
            </div>
            <button type="button" class="btn btn-xs btn-gold" data-run-plan-step="${idx}">
              <i class="fa-solid fa-play"></i> ابدأ الآن
            </button>
          </div>
        `).join("")}
      </div>
      <div class="flex-between mt-2 small-muted">
        <span>إجمالي التركيز المخطط: <strong>${totalWorkPlan} دقيقة</strong></span>
        <span>إجمالي الاستراحات: <strong>${totalBreakPlan} دقيقة</strong></span>
      </div>
    </div>

    <div class="kpi-grid mt-2" style="grid-template-columns:repeat(3,1fr); margin-bottom:10px;">
      <div class="subject-progress-box text-center">
        <small class="small-muted">تركيز اليوم</small>
        <h3 class="gold-text">${(todayMins / 60).toFixed(1)} س</h3>
        <small>${todayMins} دقيقة</small>
      </div>
      <div class="subject-progress-box text-center">
        <small class="small-muted">إجمالي السجل</small>
        <h3 class="gold-text">${(weekMins / 60).toFixed(1)} س</h3>
        <small>${logs.length} جلسة مكتملة</small>
      </div>
      <div class="subject-progress-box text-center">
        <small class="small-muted">متوسط الجلسة</small>
        <h3 class="gold-text">${avgMins} د</h3>
        <small>ذروة الأداء: 9 - 11 ص</small>
      </div>
    </div>

    <div class="subject-progress-box">
      <strong class="gold-text"><i class="fa-solid fa-wand-magic-sparkles"></i> 3. مدرب التركيز الذكي (Focus AI Coach):</strong>
      <div class="input-action-row mt-1">
        <input type="text" id="focus-ai-coach-inp" placeholder="مثال: عندي امتحان بعد 5 أيام ومحتاج أذاكر 8 محاضرات..." />
        <button type="button" id="btn-ask-focus-coach" class="btn btn-gold btn-sm">تقسيم الخطة</button>
      </div>
      <div id="focus-ai-coach-reply" class="small-note mt-2"></div>
    </div>
  `, async () => {});

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  document.querySelectorAll("[data-v6-mode]").forEach(btn => {
    btn.onclick = () => {
      const mins = Number(btn.dataset.v6Mode);
      B().setCustomPomodoroTime?.(mins, "work");
      B().openPomodoroModal?.();
      B().startPomodoro?.();
    };
  });

  document.querySelectorAll("[data-run-plan-step]").forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.runPlanStep);
      const step = plan[idx];
      if (!step) return;
      step.done = true;
      OSProStore.set("focus_plan", plan);
      const pState = B().getPomodoroState?.();
      if (pState) pState.customTaskName = step.title;
      B().setCustomPomodoroTime?.(step.mins, step.type);
      B().openPomodoroModal?.();
      B().startPomodoro?.();
    };
  });

  document.getElementById("btn-create-custom-plan").onclick = () => {
    const workMins = Number(prompt("مدة كل جلسة تركيز (بالدقائق):", "50")) || 50;
    const breakMins = Number(prompt("مدة الراحة بين الجلسات (بالدقائق):", "10")) || 10;
    const count = Math.min(8, Math.max(1, Number(prompt("عدد الجلسات المطلوبة:", "3")) || 3));
    const newPlan = [];
    for (let i = 1; i <= count; i++) {
      newPlan.push({ title: `الجلسة ${i} — تركيز عميق`, mins: workMins, type: "work", done: false });
      if (i < count) {
        newPlan.push({ title: `استراحة ${i}`, mins: i % 2 === 0 ? breakMins * 2 : breakMins, type: "break", done: false });
      }
    }
    OSProStore.set("focus_plan", newPlan);
    openSmartFocusPlannerAndAnalytics();
  };

  document.getElementById("btn-ask-focus-coach").onclick = async () => {
    const val = document.getElementById("focus-ai-coach-inp").value.trim();
    if (!val) return;
    const box = document.getElementById("focus-ai-coach-reply");
    box.textContent = "⏳ جاري تحليل الوقت المتاح وبناء خطة جلسات ومهام...";
    const reply = await B().askAI?.(`أنت Focus AI Coach. المستخدم يقول: "${val}". قم بتقسيم هذا الهدف إلى جدول يومي واضح مع عدد جلسات التركيز المطلوبة يومياً (مدة الجلسة 50 دقيقة) باختصار شديد.`);
    box.innerHTML = `<div style="white-space:pre-line">${esc(reply)}</div>
      <button type="button" id="btn-approve-coach-tasks" class="btn btn-xs btn-gold mt-2">✅ موافقة وإضافة كجلسات ومهام في جدولي</button>`;
    document.getElementById("btn-approve-coach-tasks").onclick = async () => {
      await B().createRecord("tasks", {
        title: `خطة Focus AI: ${val}`,
        description: reply.slice(0, 220),
        dueDate: today(),
        priority: "Urgent",
        status: "Pending",
        category: "Focus Coach"
      });
      await B().createRecord("events", {
        title: `جلسات تركيز: ${val.slice(0, 35)}`,
        date: today(),
        time: "10:00",
        type: "University"
      });
      toast("تم اعتماد الخطة وإضافتها إلى المهام والتقويم تلقائياً! 📅✅");
    };
  };
}

/* ============================================================================
   3. 14-CHANNEL AMBIENT SOUND STUDIO & MIXER (HIGH-GAIN NORMALIZED ENGINE)
   ============================================================================ */
const AMBIENT_14_CHANNELS = [
  { id: "rain", name: "Rain • مطر هادئ", icon: "fa-cloud-rain", freq: 1100, type: "lowpass", q: 0.7, mode: "rain" },
  { id: "heavy_rain", name: "Heavy Rain • مطر غزير", icon: "fa-cloud-showers-heavy", freq: 1650, type: "lowpass", q: 0.9, mode: "heavy_rain" },
  { id: "thunder", name: "Thunderstorm • رعد وعواصف", icon: "fa-cloud-bolt", freq: 140, type: "lowpass", q: 1.4, mode: "thunder" },
  { id: "ocean", name: "Ocean Waves • أمواج المحيط", icon: "fa-water", freq: 420, type: "lowpass", q: 1.1, mode: "ocean" },
  { id: "forest", name: "Forest • نسيم الغابة", icon: "fa-tree", freq: 780, type: "bandpass", q: 0.8, mode: "pink" },
  { id: "birds", name: "Birds • عصافير الصباح", icon: "fa-dove", freq: 2200, type: "bandpass", q: 2.2, mode: "birds" },
  { id: "fireplace", name: "Fireplace • نار المدفأة", icon: "fa-fire", freq: 380, type: "lowpass", q: 0.8, mode: "fire" },
  { id: "coffee", name: "Coffee Shop • مقهى هادئ", icon: "fa-mug-hot", freq: 650, type: "bandpass", q: 0.6, mode: "coffee" },
  { id: "library", name: "Library • هدوء المكتبة", icon: "fa-book-open", freq: 340, type: "lowpass", q: 0.5, mode: "brown" },
  { id: "white", name: "White Noise • ضوضاء بيضاء", icon: "fa-wave-square", freq: 2800, type: "lowpass", q: 0.5, mode: "white" },
  { id: "pink", name: "Pink Noise • ضوضاء وردية", icon: "fa-sliders", freq: 1200, type: "lowpass", q: 0.6, mode: "pink" },
  { id: "brown", name: "Brown Noise • تركيز عميق", icon: "fa-brain", freq: 290, type: "lowpass", q: 0.7, mode: "brown" },
  { id: "fan", name: "Fan Sound • مروحة هادئة", icon: "fa-fan", freq: 240, type: "lowpass", q: 1.5, mode: "fan" },
  { id: "crickets", name: "Night Crickets • هدوء الليل", icon: "fa-moon", freq: 3400, type: "bandpass", q: 3.0, mode: "crickets" }
];

const Mixer14Engine = {
  volumes: {},
  nodes: {},
  masterBoost: 1.6,
  sleepTimerId: null
};

function buildNormalizedSoundBuffer(ctx, mode) {
  const durationSec = 4;
  const bufSize = ctx.sampleRate * durationSec;
  const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let b0 = 0, b1 = 0, b2 = 0, lastOut = 0;
  let maxPeak = 0.001;

  for (let i = 0; i < bufSize; i++) {
    const t = i / ctx.sampleRate;
    const white = Math.random() * 2 - 1;
    let sample = white;

    if (mode === "white") {
      sample = white;
    } else if (mode === "pink" || mode === "rain" || mode === "coffee") {
      b0 = 0.99765 * b0 + white * 0.0990460;
      b1 = 0.96300 * b1 + white * 0.2965164;
      b2 = 0.57000 * b2 + white * 1.0526913;
      sample = b0 + b1 + b2 + white * 0.1848;
      if (mode === "rain" && Math.random() < 0.003) sample += (Math.random() - 0.5) * 2.5;
    } else if (mode === "heavy_rain") {
      b0 = 0.98 * b0 + white * 0.25;
      sample = b0 + white * 0.35;
    } else if (mode === "brown" || mode === "fan") {
      lastOut = (lastOut + 0.04 * white) / 1.04;
      sample = lastOut;
      if (mode === "fan") sample += Math.sin(2 * Math.PI * 65 * t) * 0.08;
    } else if (mode === "ocean") {
      lastOut = (lastOut + 0.03 * white) / 1.03;
      const waveEnv = 0.35 + 0.65 * Math.pow(Math.sin(Math.PI * t / 2), 2);
      sample = lastOut * waveEnv;
    } else if (mode === "thunder") {
      lastOut = (lastOut + 0.05 * white) / 1.05;
      const rumbleEnv = 0.25 + 0.75 * Math.abs(Math.sin(2 * Math.PI * 0.35 * t));
      sample = lastOut * rumbleEnv;
    } else if (mode === "fire") {
      lastOut = (lastOut + 0.04 * white) / 1.04;
      sample = lastOut;
      if (Math.random() < 0.004) sample += (Math.random() * 2 - 1) * 1.8;
    } else if (mode === "birds") {
      const chirpEnv = Math.sin(2 * Math.PI * 3.5 * t) > 0.65 ? 1 : 0.05;
      sample = Math.sin(2 * Math.PI * (2200 + 600 * Math.sin(2 * Math.PI * 12 * t)) * t) * chirpEnv + white * 0.05;
    } else if (mode === "crickets") {
      const pulse = Math.sin(2 * Math.PI * 18 * t) > 0 ? 1 : 0.1;
      sample = Math.sin(2 * Math.PI * 3600 * t) * pulse + white * 0.04;
    }

    data[i] = sample;
    const abs = Math.abs(sample);
    if (abs > maxPeak) maxPeak = abs;
  }

  const normFactor = 0.92 / maxPeak;
  for (let i = 0; i < bufSize; i++) {
    data[i] *= normFactor;
  }

  return buffer;
}

function setChannel14Volume(chId, pct) {
  const numPct = Math.max(0, Math.min(100, Number(pct) || 0));
  const vol = numPct / 100;
  Mixer14Engine.volumes[chId] = numPct;

  const ctx = B().getAudioContext?.();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  if (numPct === 0) {
    const existing = Mixer14Engine.nodes[chId];
    if (existing) {
      delete Mixer14Engine.nodes[chId];
      try {
        existing.gain.gain.cancelScheduledValues(ctx.currentTime);
        existing.gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.08);
        setTimeout(() => {
          try { existing.source.stop(); existing.source.disconnect(); } catch (e) {}
        }, 280);
      } catch (e) {}
    }
    return;
  }

  const meta = AMBIENT_14_CHANNELS.find(c => c.id === chId) || AMBIENT_14_CHANNELS[0];
  const targetGain = vol * Mixer14Engine.masterBoost;

  if (!Mixer14Engine.nodes[chId]) {
    const buffer = buildNormalizedSoundBuffer(ctx, meta.mode);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = meta.type;
    filter.frequency.value = meta.freq;
    filter.Q.value = meta.q || 0.7;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.12);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);
    Mixer14Engine.nodes[chId] = { source, gain, ctx };
  } else {
    const n = Mixer14Engine.nodes[chId];
    n.gain.gain.cancelScheduledValues(ctx.currentTime);
    n.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.06);
  }
}

function stopAll14Channels() {
  AMBIENT_14_CHANNELS.forEach(c => setChannel14Volume(c.id, 0));
  toast("تم إيقاف جميع القنوات الصوتية 🔇", "info");
}

function open14ChannelAmbientMixerModal(fromPomodoro = false) {
  const savedPresets = OSProStore.get("ambient_presets", [
    { name: "🌧️ ليلة شتوية للمذاكرة", mix: { rain: 85, thunder: 45, fireplace: 60 } },
    { name: "☕ مقهى القراءة الصباحي", mix: { coffee: 75, rain: 50, birds: 40 } },
    { name: "🧠 عزل صوتي عميق للبرمجة", mix: { brown: 85, fan: 55, library: 50 } },
    { name: "🌊 شاطئ المحيط والغابة", mix: { ocean: 80, forest: 60, birds: 35 } }
  ]);

  const channelsHtml = AMBIENT_14_CHANNELS.map(ch => {
    const curVol = Mixer14Engine.volumes[ch.id] || 0;
    return `
      <div class="amb-ch-card ${curVol > 0 ? "playing" : ""}" id="amb-card-${ch.id}">
        <div class="amb-ch-icon"><i class="fa-solid ${ch.icon}"></i></div>
        <div class="amb-ch-info">
          <div class="flex-between">
            <strong style="font-size:0.82rem;">${ch.name}</strong>
            <span class="gold-text" id="amb-val-${ch.id}" style="font-size:0.78rem;">${curVol}%</span>
          </div>
          <input type="range" min="0" max="100" value="${curVol}" data-ch14="${ch.id}" />
        </div>
      </div>
    `;
  }).join("");

  const presetsHtml = savedPresets.map((pr, idx) => `
    <button type="button" class="chip" data-load-preset="${idx}">${esc(pr.name)}</button>
  `).join("");

  B().openFormModal("🎧 استوديو وميكسر الأصوات المحيطية (14-Channel High-Gain Mixer)", `
    <div class="flex-between" style="flex-wrap:wrap; gap:10px; margin-bottom:12px;">
      <div class="ai-suggestions">${presetsHtml}</div>
      <div class="filters-row">
        <div class="pomo-vol-wrap" title="مكبر الصوت الرئيسي (Master Boost)">
          <i class="fa-solid fa-volume-high gold-text"></i>
          <small>قوة الصوت:</small>
          <input type="range" id="amb-master-boost" min="50" max="300" value="${Math.round(Mixer14Engine.masterBoost * 100)}" />
        </div>
        <button type="button" id="btn-save-amb-preset" class="btn btn-xs btn-gold"><i class="fa-solid fa-bookmark"></i> حفظ المزيج</button>
        <button type="button" id="btn-amb-sleep-timer" class="btn btn-xs btn-outline"><i class="fa-regular fa-clock"></i> مؤقت إيقاف</button>
        <button type="button" id="btn-stop-all-amb" class="btn btn-xs btn-danger">إيقاف الكل</button>
        ${fromPomodoro ? `<button type="button" id="btn-back-to-pomo-from-mix" class="btn btn-xs btn-gold"><i class="fa-solid fa-stopwatch"></i> العودة للمؤقت</button>` : ""}
      </div>
    </div>
    <div class="ambient-14-grid">${channelsHtml}</div>
  `, async () => {});

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  document.getElementById("btn-back-to-pomo-from-mix")?.addEventListener("click", () => {
    B().openPomodoroModal?.();
  });

  document.getElementById("amb-master-boost").oninput = (e) => {
    Mixer14Engine.masterBoost = Number(e.target.value) / 100;
    Object.entries(Mixer14Engine.volumes).forEach(([id, v]) => {
      if (v > 0) setChannel14Volume(id, v);
    });
  };

  document.querySelectorAll("[data-ch14]").forEach(slider => {
    slider.oninput = (e) => {
      const id = e.target.dataset.ch14;
      const val = Number(e.target.value);
      document.getElementById(`amb-val-${id}`).textContent = `${val}%`;
      document.getElementById(`amb-card-${id}`)?.classList.toggle("playing", val > 0);
      setChannel14Volume(id, val);
    };
  });

  document.querySelectorAll("[data-load-preset]").forEach(btn => {
    btn.onclick = () => {
      const pr = savedPresets[Number(btn.dataset.loadPreset)];
      if (!pr || !pr.mix) return;
      AMBIENT_14_CHANNELS.forEach(c => {
        const targetVal = Number(pr.mix[c.id]) || 0;
        setChannel14Volume(c.id, targetVal);
        const valEl = document.getElementById(`amb-val-${c.id}`);
        const cardEl = document.getElementById(`amb-card-${c.id}`);
        const sliderEl = document.querySelector(`[data-ch14="${c.id}"]`);
        if (valEl) valEl.textContent = `${targetVal}%`;
        if (cardEl) cardEl.classList.toggle("playing", targetVal > 0);
        if (sliderEl) sliderEl.value = targetVal;
      });
      toast(`تم تشغيل مزيج: ${pr.name} 🎵🔊`);
    };
  });

  document.getElementById("btn-save-amb-preset").onclick = () => {
    const name = prompt("اكتب اسماً لحفظ هذا المزيج الصوتي في المفضلة:", "مزيج التركيز الخاص بي ✨");
    if (!name) return;
    savedPresets.push({ name, mix: { ...Mixer14Engine.volumes } });
    OSProStore.set("ambient_presets", savedPresets);
    toast("تم حفظ المزيج الصوتي بنجاح!");
    open14ChannelAmbientMixerModal(fromPomodoro);
  };

  document.getElementById("btn-amb-sleep-timer").onclick = () => {
    const mins = Number(prompt("بعد كم دقيقة تريد إيقاف الأصوات تلقائياً؟", "30"));
    if (!mins) return;
    if (Mixer14Engine.sleepTimerId) clearTimeout(Mixer14Engine.sleepTimerId);
    Mixer14Engine.sleepTimerId = setTimeout(stopAll14Channels, mins * 60 * 1000);
    toast(`سيتم إيقاف الأصوات تلقائياً بعد ${mins} دقيقة ⏳`);
  };

  document.getElementById("btn-stop-all-amb").onclick = () => {
    stopAll14Channels();
    open14ChannelAmbientMixerModal(fromPomodoro);
  };
}
window.open14ChannelAmbientMixerModal = open14ChannelAmbientMixerModal;

/* ============================================================================
   4. INJECT THE 9 PRO MODULES INTO SIDEBAR & WORKSPACE
   ============================================================================ */
const NEW_PRO_MODULES = [
  { id: "goals", icon: "fa-bullseye", label: "الأهداف و Vision Board" },
  { id: "habits", icon: "fa-fire-flame-curved", label: "العادات والروتين اليومي" },
  { id: "health", icon: "fa-dumbbell", label: "الصحة واللياقة والجيم 3D" },
  { id: "time-intel", icon: "fa-chart-gantt", label: "ذكاء وإدارة الوقت" },
  { id: "second-brain", icon: "fa-network-wired", label: "العقل الثاني (Second Brain)" },
  { id: "learning-center", icon: "fa-book-open-reader", label: "مركز القراءة والتعلم 3D" },
  { id: "experiences", icon: "fa-earth-americas", label: "السفر والتجارب والأحلام" },
  { id: "contacts", icon: "fa-address-book", label: "العلاقات والتواصل VIP" },
  { id: "journal", icon: "fa-book-journal-whills", label: "اليوميات والأتمتة" }
];

function injectProModulesIntoDOM() {
  const nav = document.querySelector(".sidebar-nav");
  const main = document.querySelector(".main-content");
  const footer = document.querySelector(".app-footer");
  if (!nav || !main) return;

  nav.querySelector('[data-view="ancient-game"]')?.remove();
  document.getElementById("view-ancient-game")?.remove();

  if (!nav.querySelector(".nav-group-label")) {
    const divider = document.createElement("div");
    divider.className = "nav-group-label";
    divider.textContent = "منظومة الحياة المتقدمة (PRO OS)";
    nav.appendChild(divider);
  }

  NEW_PRO_MODULES.forEach(mod => {
    let btn = nav.querySelector(`[data-view="${mod.id}"]`);
    if (!btn) {
      btn = document.createElement("button");
      btn.className = "nav-item";
      btn.dataset.view = mod.id;
      btn.innerHTML = `<i class="fa-solid ${mod.icon} gold-text"></i> <span>${mod.label}</span>`;
      nav.appendChild(btn);
    }
    btn.onclick = () => {
      B().switchView?.(mod.id);
      renderProModuleById(mod.id);
    };

    if (!document.getElementById(`view-${mod.id}`)) {
      const sec = document.createElement("section");
      sec.id = `view-${mod.id}`;
      sec.className = "view-section";
      main.insertBefore(sec, footer);
    }
  });

  const ambBtn = document.getElementById("btn-topbar-ambient");
  if (ambBtn) ambBtn.onclick = open14ChannelAmbientMixerModal;

  const pomoBtn = document.getElementById("btn-topbar-pomo");
  if (pomoBtn && !document.getElementById("btn-topbar-focus-analytics")) {
    const planBtn = document.createElement("button");
    planBtn.id = "btn-topbar-focus-analytics";
    planBtn.className = "btn-icon gold-glow";
    planBtn.title = "مخطط الجلسات الذكي وتحليلات التركيز ومدرب الـ AI";
    planBtn.innerHTML = `<i class="fa-solid fa-layer-group"></i>`;
    planBtn.onclick = openSmartFocusPlannerAndAnalytics;
    pomoBtn.insertAdjacentElement("afterend", planBtn);
  }

  upgradeExistingProjectsToolbar();
}

function renderProModuleById(id) {
  if (id === "goals") renderGoalsView();
  if (id === "habits") renderHabitsView();
  if (id === "health") renderHealthView();
  if (id === "time-intel") renderTimeIntelView();
  if (id === "second-brain") renderSecondBrainView();
  if (id === "learning-center") renderLearningCenterView();
  if (id === "experiences") renderExperiencesView();
  if (id === "contacts") renderContactsView();
  if (id === "journal") renderJournalView();
}

/* ============================================================================
   MODULE C (FLAGSHIP V5): BIOMECHANICAL GROUNDED 3D TRAINER, 100% RESPECTFUL
   EQUIPMENT/DIAGRAM VISUALS (ZERO WOMEN PHOTOS), WIZARD & TASK SCHEDULER
   ============================================================================ */

function injectGymV4Styles() {
  if (document.getElementById("gym-v4-pro-styles")) return;
  const st = document.createElement("style");
  st.id = "gym-v4-pro-styles";
  st.textContent = `
    .gym-wizard-shell {
      max-width: 780px;
      margin: 10px auto;
      background: linear-gradient(160deg, rgba(15, 22, 38, 0.96), rgba(8, 12, 22, 0.99));
      border: 1.5px solid rgba(212, 167, 44, 0.45);
      border-radius: 26px;
      padding: 34px 32px;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(212, 167, 44, 0.12);
    }
    .wizard-steps-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 28px;
    }
    .wizard-step-dot {
      height: 6px;
      border-radius: 99px;
      background: rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
    .wizard-step-dot.active {
      background: linear-gradient(90deg, #D4A72C, #19B889);
      box-shadow: 0 0 12px rgba(212, 167, 44, 0.5);
    }
    .wizard-gender-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 24px 0;
    }
    .wizard-big-card {
      background: rgba(17, 25, 44, 0.88);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 22px;
      padding: 26px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.25s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .wizard-big-card:hover {
      transform: translateY(-4px);
      border-color: rgba(212, 167, 44, 0.6);
    }
    .wizard-big-card.active {
      border-color: #D4A72C;
      background: linear-gradient(145deg, rgba(212, 167, 44, 0.2), rgba(25, 184, 137, 0.1));
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7), 0 0 28px rgba(212, 167, 44, 0.25);
    }
    .wizard-emblem-circle {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(212, 167, 44, 0.22), rgba(9, 13, 25, 0.95));
      border: 2.5px solid #D4A72C;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.6rem;
      color: #D4A72C;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
    }
    .wizard-input-giant {
      font-size: 1.35rem !important;
      padding: 16px 20px !important;
      border-radius: 16px !important;
      text-align: center;
      font-weight: 700;
      background: rgba(7, 11, 20, 0.9) !important;
      border: 1.5px solid rgba(212, 167, 44, 0.35) !important;
    }

    /* مشغل التمرين التفاعلي بالمدرب الميكانيكي المرتكز على الأرض */
    .live-workout-stage {
      background: radial-gradient(circle at 50% 30%, #162238 0%, #070b14 100%);
      border: 2px solid #19B889;
      border-radius: 24px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
    }
    .trainer-3d-box {
      width: 100%;
      max-width: 310px;
      height: 240px;
      margin: 0 auto;
      background: radial-gradient(circle at 50% 70%, rgba(25, 184, 137, 0.14) 0%, rgba(9, 13, 25, 0.9) 75%);
      border: 1px solid rgba(25, 184, 137, 0.35);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .biomech-svg {
      width: 280px;
      height: 220px;
    }

    /* حركات المفاصل الواقعية على الأرضية بدون طيران */
    .bm-squat-hip {
      animation: bmSquatBody 2s ease-in-out infinite;
    }
    @keyframes bmSquatBody {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(34px); }
    }

    .bm-pushup-plank {
      animation: bmPushupTorso 1.8s ease-in-out infinite;
      transform-origin: 215px 172px;
    }
    @keyframes bmPushupTorso {
      0%, 100% { transform: rotate(0deg) translateY(0px); }
      50% { transform: rotate(-12deg) translateY(22px); }
    }

    .bm-crunch-torso {
      animation: bmCrunchUp 1.9s ease-in-out infinite;
      transform-origin: 145px 168px;
    }
    @keyframes bmCrunchUp {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(28deg); }
    }

    .bm-bridge-pelvis {
      animation: bmBridgeLift 2s ease-in-out infinite;
    }
    @keyframes bmBridgeLift {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-28px); }
    }

    .bm-jump-body {
      animation: bmJumpUp 1.1s ease-in-out infinite;
    }
    .bm-jump-arm-l {
      animation: bmArmL 1.1s ease-in-out infinite;
      transform-origin: 125px 76px;
    }
    .bm-jump-arm-r {
      animation: bmArmR 1.1s ease-in-out infinite;
      transform-origin: 155px 76px;
    }
    @keyframes bmJumpUp {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }
    @keyframes bmArmL {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(115deg); }
    }
    @keyframes bmArmR {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-115deg); }
    }

    .bm-pull-arms {
      animation: bmPullMove 1.7s ease-in-out infinite;
    }
    @keyframes bmPullMove {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(24px); }
    }

    /* كروت التمارين الثابتة النظيفة (رسوم تشريحية ومعدات بدون صور أشخاص) */
    .static-diagram-thumb {
      width: 100%;
      height: 175px;
      background: radial-gradient(circle at 50% 40%, #17233b 0%, #090d18 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-bottom: 1px solid rgba(212, 167, 44, 0.22);
    }

    .workout-step-pills {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      justify-content: center;
      margin: 14px 0;
    }
    .workout-step-pill {
      padding: 5px 11px;
      border-radius: 99px;
      font-size: 0.75rem;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      cursor: pointer;
      color: var(--text-secondary);
    }
    .workout-step-pill.active {
      background: #19B889;
      color: #05070e;
      font-weight: 800;
      border-color: #19B889;
    }
    .workout-step-pill.done {
      border-color: #D4A72C;
      color: #D4A72C;
    }
    .goal-upload-zone {
      border: 2px dashed rgba(212, 167, 44, 0.45);
      background: rgba(15, 22, 38, 0.65);
      border-radius: 14px;
      padding: 14px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .goal-upload-zone:hover {
      border-color: #19B889;
      background: rgba(25, 184, 137, 0.08);
    }
  `;
  document.head.appendChild(st);
}

/* ============================================================================
   1. CLEAN RESPECTFUL EQUIPMENT BACKGROUNDS & STATIC EXERCISE DIAGRAMS
   (100% ZERO WOMEN / ZERO INAPPROPRIATE PHOTOS)
   ============================================================================ */
const CLEAN_EQUIP_IMAGES = {
  dumbbells: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
  barbell: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  plates: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
  kettlebell: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80"
};

const HOME_12_EXERCISES = [
  { id: "hm_1", name: "1. Jumping Jacks • قفز فتح وضم لتسخين الجسم", cat: "تسخين وكارديو", reps: "45 ثانية متواصلة", cals: "45 kcal", anim: "jump", desc: "قف مستقيماً على الأرض، اقفز مع فتح القدمين ورفع الذراعين عالياً فوق الرأس ثم العودة برشاقة لتنشيط الدورة الدموية." },
  { id: "hm_2", name: "2. Standard Push-Ups • تمرين الضغط الأساسي للصدر والذراعين", cat: "علوي وصدر", reps: "3 جولات × 12-15 عدة", cals: "60 kcal", anim: "pushup", desc: "ارتكز بيديك وأطراف أصابع قدميك على الأرض، حافظ على استقامة ظهرك، انزل بصدرك نحو الأرض بثني الكوعين ثم ادفع للأعلى." },
  { id: "hm_3", name: "3. Bodyweight Squats • سكوات بوزن الجسم للأرجل", cat: "سفلي وأرجل", reps: "4 جولات × 15-20 عدة", cals: "75 kcal", anim: "squat", desc: "قف بقدمين بعرض الكتفين، انزل بالحوض للخلف والأسفل كأنك تجلس على كرسي مع إبقاء الصدر مرفوعاً والظهر مستقيماً ثم اصعد." },
  { id: "hm_4", name: "4. Alternating Lunges • طعن أمامي تبادلي لتقوية الأرجل", cat: "سفلي وأرجل", reps: "3 جولات × 12 عدة لكل رجل", cals: "70 kcal", anim: "squat", desc: "تقدم خطوة للأمام واثنِ الركبتين بزاوية 90 درجة على الأرض مع توازن الجذع ثم ادفع للعودة لوضع الوقوف." },
  { id: "hm_5", name: "5. Pike Push-Ups • ضغط مائل لتقوية الأكتاف في البيت", cat: "علوي وأكتاف", reps: "3 جولات × 10-12 عدة", cals: "55 kcal", anim: "pike", desc: "ثبّت يديك وقدميك على الأرض وارفع الحوض للأعلى على شكل مثلث (V مقلوب)، ثم اثنِ ذراعيك لتقريب الرأس من الأرض وادفع." },
  { id: "hm_6", name: "6. Floor Hip Bridge • جسر الأرضية لتقوية أسفل الظهر والخلفية", cat: "سفلي وجذع", reps: "4 جولات × 15 عدة", cals: "65 kcal", anim: "bridge", desc: "استلقِ على ظهرك فوق البساط مع ثني الركبتين وتثبيت القدمين، ارفع الحوض للأعلى حتى يستقيم جسمك واثبت ثانية ثم انزل." },
  { id: "hm_7", name: "7. Bench / Chair Tricep Dips • متوازي على الكرسي للترايسبس", cat: "علوي وذراعين", reps: "3 جولات × 12-15 عدة", cals: "55 kcal", anim: "dips", desc: "ثبّت يديك على حافة كرسي ثابت خلفك، انزل بجسمك بثني الكوعين بزاوية 90 درجة ثم ادفع للأعلى لعزل الترايسبس." },
  { id: "hm_8", name: "8. Floor Back Extensions • رفع الجذع على الأرض لعضلات الظهر", cat: "علوي وظهر", reps: "3 جولات × 15 عدة", cals: "50 kcal", anim: "plank", desc: "استلقِ على بطنك فوق البساط، ارفع الصدر والذراعين عن الأرض قليلاً بشد عضلات طول الظهر واثبت ثانيتين ثم انزل." },
  { id: "hm_9", name: "9. Mountain Climbers • متسلق الجبال لحرق الدهون", cat: "بطن وكارديو", reps: "3 جولات × 40 ثانية", cals: "80 kcal", anim: "pushup", desc: "في وضع الارتكاز الأفقي على اليدين، اسحب ركبتك نحو الصدر بالتبادل السريع مع الحفاظ على ثبات الظهر." },
  { id: "hm_10", name: "10. Abdominal Crunches • طحن البطن على البساط", cat: "بطن وجذع", reps: "3 جولات × 20 عدة", cals: "60 kcal", anim: "crunch", desc: "استلقِ على ظهرك واثنِ ركبتيك، ارفع الكتفين وأعلى الظهر عن الأرض بعصر عضلات البطن الأمامية مع الزفير." },
  { id: "hm_11", name: "11. High Knees March • رفع الركبتين في المكان للياقة", cat: "تسخين وكارديو", reps: "3 جولات × 40 ثانية", cals: "90 kcal", anim: "jump", desc: "تحرك في مكانك مع رفع الركبتين بالتبادل لمستوى الخصر وتنظيم التنفس لرفع معدل الحرق." },
  { id: "hm_12", name: "12. Forearm Plank Hold • الثبات في وضع البلانك للجذع", cat: "بطن وجذع", reps: "3 جولات × 60 ثانية ثبات", cals: "55 kcal", anim: "plank", desc: "ارتكز على ساعديك وأطراف أصابع قدميك فوق الأرض، شد عضلات البطن وحافظ على استقامة الجسم بالكامل." }
];

const GYM_PRO_EXERCISES_DB = {
  chest: [
    { id: "g_ch1", name: "1. Barbell Flat Bench Press • ضغط بنش مسطح بالبار", sets: "4 × 8-10", cals: "145 kcal", equip: "بار + بنش مسطح", anim: "pushup", tips: "ثبّت لوحي الكتف في البنش، انزل بالبار لمنتصف الصدر وادفع للأعلى بتحكم." },
    { id: "g_ch2", name: "2. Incline Dumbbell Press • تجميع دمبل عالي (زاوية 30°)", sets: "4 × 10-12", cals: "135 kcal", equip: "دمبل + بنش عالي", anim: "pushup", tips: "يركز على الصدر العلوي؛ انزل بمدى حركي كامل وادفع للأعلى دون تصادم الدمبل." },
    { id: "g_ch3", name: "3. Chest Press Machine • جهاز الدفع للصدر", sets: "3 × 12", cals: "115 kcal", equip: "جهاز الصدر", anim: "pushup", tips: "ممتاز لعزل عضلات الصدر بأمان تام على المفاصل." },
    { id: "g_ch4", name: "4. Cable Crossover • تفتيح كابل للصدر", sets: "3 × 15", cals: "100 kcal", equip: "جهاز الكابل", anim: "pull", tips: "اسحب الكابل للأمام مع انحناء بسيط في الكوع واعصر الصدر في المنتصف." },
    { id: "g_ch5", name: "5. Pec Deck Machine • جهاز الفراشة لتفصيل الصدر", sets: "3 × 15", cals: "95 kcal", equip: "جهاز الفراشة", anim: "pull", tips: "أبقِ الكوعين في مستوى الكتف وضم الذراعين ببطء." },
    { id: "g_ch6", name: "6. Parallel Bar Dips • متوازي للصدر السفلي", sets: "3 × 10-12", cals: "130 kcal", equip: "جهاز المتوازي", anim: "dips", tips: "مِل بالجذع للأمام قليلاً أثناء النزول لاستهداف الصدر السفلي." }
  ],
  back: [
    { id: "g_bk1", name: "1. Wide-Grip Lat Pulldown • سحب عالي واسع للمجنص", sets: "4 × 10-12", cals: "145 kcal", equip: "جهاز السحب العالي", anim: "pull", tips: "اسحب البار لأعلى الصدر بكوعك مع إرجاع الكتف للخلف." },
    { id: "g_bk2", name: "2. Barbell Bent-Over Row • سحب بار حر لسمك الظهر", sets: "4 × 8-10", cals: "160 kcal", equip: "بار حر", anim: "pull", tips: "حافظ على استقامة الظهر بزاوية 45 درجة واسحب البار نحو السرة." },
    { id: "g_bk3", name: "3. Seated V-Bar Cable Row • سحب أرضي ضيق بالكابل", sets: "4 × 12", cals: "140 kcal", equip: "جهاز السحب الأرضي", anim: "pull", tips: "افرد ظهرك تماماً واضمم لوحي الكتف في نهاية السحبة." },
    { id: "g_bk4", name: "4. Single-Arm Dumbbell Row • منشار دمبل فردي", sets: "3 × 12 لكل جانب", cals: "130 kcal", equip: "دمبل + بنش", anim: "pull", tips: "اسحب الدمبل في مسار قوسي باتجاه الخصر لعزل المجنص." },
    { id: "g_bk5", name: "5. T-Bar Row Machine • جهاز التي بار لكثافة الظهر", sets: "3 × 10", cals: "150 kcal", equip: "جهاز T-Bar", anim: "pull", tips: "ثبّت صدرك على المسند واسحب الوزن بتحكم كامل." },
    { id: "g_bk6", name: "6. Straight-Arm Pulldown • سحب ذراع مستقيم بالكابل", sets: "3 × 15", cals: "105 kcal", equip: "جهاز الكابل", anim: "pull", tips: "أبقِ الذراعين مفرودتين واسحب الحبل لأسفل لضخ الدم في المجنص." }
  ],
  shoulders: [
    { id: "g_sh1", name: "1. Overhead Dumbbell Press • ضغط أكتاف بالدمبل", sets: "4 × 8-10", cals: "130 kcal", equip: "دمبل + بنش", anim: "jump", tips: "ادفع الوزن للأعلى مع إبقاء الكوع للأمام قليلاً بزاوية 45 درجة." },
    { id: "g_sh2", name: "2. Dumbbell Lateral Raises • رفرفة جانبي بالدمبل", sets: "4 × 15", cals: "100 kcal", equip: "دمبل", anim: "jump", tips: "ارفع بوزن متوسط لمستوى الكتف مع قيادة الحركة بالكوع." },
    { id: "g_sh3", name: "3. Rope Face Pulls • سحب حبل للكتف الخلفي", sets: "4 × 15", cals: "95 kcal", equip: "كابل + حبل", anim: "pull", tips: "اسحب الحبل نحو الجبهة لتقوية الكتف الخلفي وصحة المفاصل." },
    { id: "g_sh4", name: "4. Reverse Pec Deck • جهاز الفراشة العكسي للكتف الخلفي", sets: "3 × 15", cals: "90 kcal", equip: "جهاز الفراشة", anim: "pull", tips: "ارجع بذراعيك للخلف في مسار أفقي لعزل الكتف الخلفي." },
    { id: "g_sh5", name: "5. Cable Lateral Raises • رفرفة جانبي بالكابل", sets: "3 × 15 لكل يد", cals: "95 kcal", equip: "جهاز الكابل", anim: "jump", tips: "يوفر شداً مستمراً على عضلة الكتف الجانبية طوال المدى الحركي." },
    { id: "g_sh6", name: "6. Dumbbell Shrugs • ترابيس بالدمبل", sets: "3 × 15", cals: "90 kcal", equip: "دمبل ثقيل", anim: "pull", tips: "ارفع كتفيك للأعلى باتجاه الأذنين واثبت ثانية في الأعلى." }
  ],
  arms: [
    { id: "g_ar1", name: "1. EZ-Bar Bicep Curl • بار زجزاج واقف للبايسبس", sets: "4 × 10-12", cals: "95 kcal", equip: "بار زجزاج", anim: "pull", tips: "ثبّت الكوعين بجانب الخصر وارفع البار بعصر كامل للباي." },
    { id: "g_ar2", name: "2. Incline Dumbbell Curl • تبادل دمبل على بنش مائل", sets: "3 × 12", cals: "90 kcal", equip: "دمبل + بنش", anim: "pull", tips: "يركز على إطالة الرأس الطويل لعضلة البايسبس." },
    { id: "g_ar3", name: "3. Hammer Curls • شاكوش بالدمبل للساعد والباي", sets: "3 × 12", cals: "90 kcal", equip: "دمبل", anim: "pull", tips: "اجعل قبضة اليد متقابلة طوال الحركة لزيادة سماكة الذراع." },
    { id: "g_ar4", name: "4. Tricep Rope Pushdown • سحب حبل بالكابل للترايسبس", sets: "4 × 12-15", cals: "95 kcal", equip: "كابل + حبل", anim: "dips", tips: "افتح الحبل في أسفل الحركة للخارج مع تثبيت الكوع تماماً." },
    { id: "g_ar5", name: "5. Overhead EZ-Bar Extension • فرنساوي للترايسبس", sets: "3 × 12", cals: "100 kcal", equip: "بار زجزاج", anim: "dips", tips: "يستهدف الرأس الطويل الأكبر حجماً في عضلة الترايسبس." },
    { id: "g_ar6", name: "6. Preacher Curl Machine • جهاز الحصان لعزل البايسبس", sets: "3 × 12", cals: "85 kcal", equip: "جهاز الحصان", anim: "pull", tips: "يمنع أي مرجحة ويعزل البايسبس بالكامل." }
  ],
  legs: [
    { id: "g_lg1", name: "1. Barbell Back Squat • سكوات بالبار", sets: "4 × 8-10", cals: "195 kcal", equip: "بار + راك السكوات", anim: "squat", tips: "انزل حتى يصبح الفخذ موازياً للأرض وادفع بكعب القدم." },
    { id: "g_lg2", name: "2. 45° Leg Press Machine • جهاز دفع الأرجل المائل", sets: "4 × 12", cals: "180 kcal", equip: "جهاز الدفع", anim: "squat", tips: "لا تقفل مفصل الركبة بالكامل في نهاية الدفع لحماية المفاصل." },
    { id: "g_lg3", name: "3. Romanian Deadlift (RDL) • رفعة رومانية للخلفي", sets: "4 × 10-12", cals: "175 kcal", equip: "بار أو دمبل", anim: "squat", tips: "ادفع الحوض للخلف مع ظهر مفرود حتى تشعر بشد في العضلة الخلفية." },
    { id: "g_lg4", name: "4. Leg Extension Machine • جهاز الأمامي لعزل الفخذ", sets: "4 × 15", cals: "135 kcal", equip: "جهاز الأمامي", anim: "squat", tips: "اثبت ثانية كاملة في قمة الحركة لتفصيل العضلة الأمامية." },
    { id: "g_lg5", name: "5. Lying / Seated Leg Curl • جهاز الخلفي للأرجل", sets: "4 × 12-15", cals: "130 kcal", equip: "جهاز الخلفي", anim: "bridge", tips: "انزل بالوزن ببطء في 3 ثوانٍ لتحقيق أقصى استفادة عضلية." },
    { id: "g_lg6", name: "6. Standing Calf Raises • جهاز السمانة", sets: "4 × 15-20", cals: "100 kcal", equip: "جهاز السمانة", anim: "jump", tips: "انزل بمدى حركي كامل واصعد على أطراف الأصابع مع الثبات لثانية." }
  ],
  core: [
    { id: "g_cr1", name: "1. Cable Rope Crunch • طحن البطن بالكابل", sets: "4 × 15", cals: "110 kcal", equip: "كابل + حبل", anim: "crunch", tips: "اثنِ الجذع للأسفل بعصر عضلات البطن." },
    { id: "g_cr2", name: "2. Hanging Leg Raises • رفع الأرجل للبطن السفلي", sets: "4 × 12-15", cals: "115 kcal", equip: "متوازي / عقلة", anim: "crunch", tips: "ارفع الركبتين نحو الصدر بتحكم دون مرجحة." },
    { id: "g_cr3", name: "3. Plank & Core Hold • ثبات البلانك لشد الجذع", sets: "3 × 60 ثانية", cals: "95 kcal", equip: "بساط أرضي", anim: "plank", tips: "حافظ على استقامة الظهر وشد عضلات البطن طوال الدقيقة." }
  ]
};

let activeMuscleGroup = "chest";
let activeRestTimerInterval = null;
let livePlayerTimerInterval = null;

function calculatePhysiologyMetrics(profile) {
  const w = Number(profile.currentWeight) || 75;
  const tw = Number(profile.targetWeight) || 70;
  const h = Number(profile.height) || 175;
  const age = Number(profile.age) || 22;
  const isMale = profile.gender !== "female";
  const days = Number(profile.daysPerWeek) || 4;

  const heightM = h / 100;
  const bmi = +(w / (heightM * heightM)).toFixed(1);
  const bmiStatus = bmi < 18.5 ? "نحافة (يحتاج زيادة)" : bmi < 25 ? "وزن مثالي وصحي ✅" : bmi < 30 ? "زيادة وزن خفيفة" : "يحتاج تنشيف";

  const bmr = isMale
    ? Math.round(10 * w + 6.25 * h - 5 * age + 5)
    : Math.round(10 * w + 6.25 * h - 5 * age - 161);

  const activityMultiplier = days >= 5 ? 1.65 : days >= 3 ? 1.5 : 1.375;
  const tdee = Math.round(bmr * activityMultiplier);

  let targetCalories = tdee;
  if (profile.goal === "bulk" || tw > w) targetCalories = tdee + 400;
  else if (profile.goal === "cut" || tw < w) targetCalories = Math.max(1350, tdee - 450);

  const proteinG = Math.round(w * (profile.goal === "bulk" ? 2.1 : 2.0));
  const fatsG = Math.round((targetCalories * 0.25) / 9);
  const carbsG = Math.max(80, Math.round((targetCalories - (proteinG * 4 + fatsG * 9)) / 4));
  const waterLiters = +(w * 0.038).toFixed(1);
  const weightDiff = +(tw - w).toFixed(1);

  return { bmi, bmiStatus, bmr, tdee, targetCalories, proteinG, carbsG, fatsG, waterLiters, weightDiff };
}

function build3DMuscleSVG(selectedMuscle) {
  return `
    <svg viewBox="0 0 220 340" class="muscle-svg-interactive" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="110" cy="318" rx="68" ry="12" fill="rgba(25, 184, 137, 0.22)" />
      <circle cx="110" cy="34" r="18" fill="#1e293b" stroke="#D4A72C" stroke-width="2.2" />
      <rect x="103" y="52" width="14" height="12" rx="4" fill="#334155" />

      <!-- الأكتاف (Shoulders 3D) -->
      <g class="muscle-zone ${selectedMuscle === "shoulders" ? "active" : ""}" data-muscle-pick="shoulders">
        <ellipse cx="62" cy="78" rx="17" ry="14" />
        <ellipse cx="158" cy="78" rx="17" ry="14" />
      </g>

      <!-- الصدر (Chest 3D) -->
      <g class="muscle-zone ${selectedMuscle === "chest" ? "active" : ""}" data-muscle-pick="chest">
        <path d="M78 66 L109 66 L109 102 L82 98 Z" />
        <path d="M111 66 L142 66 L138 98 L111 102 Z" />
      </g>

      <!-- الظهر والمجنص (Back 3D) -->
      <g class="muscle-zone ${selectedMuscle === "back" ? "active" : ""}" data-muscle-pick="back">
        <path d="M76 96 L86 146 L70 126 Z" />
        <path d="M144 96 L134 146 L150 126 Z" />
      </g>

      <!-- الذراعين (Arms 3D) -->
      <g class="muscle-zone ${selectedMuscle === "arms" ? "active" : ""}" data-muscle-pick="arms">
        <rect x="45" y="92" width="16" height="58" rx="7" />
        <rect x="159" y="92" width="16" height="58" rx="7" />
      </g>

      <!-- البطن والجذع (Core 3D) -->
      <g class="muscle-zone ${selectedMuscle === "core" ? "active" : ""}" data-muscle-pick="core">
        <rect x="88" y="104" width="44" height="54" rx="10" />
      </g>

      <!-- الأرجل (Legs 3D) -->
      <g class="muscle-zone ${selectedMuscle === "legs" ? "active" : ""}" data-muscle-pick="legs">
        <path d="M84 164 L106 164 L103 248 L82 248 Z" />
        <path d="M114 164 L136 164 L138 248 L117 248 Z" />
        <rect x="83" y="252" width="18" height="54" rx="8" />
        <rect x="119" y="252" width="18" height="54" rx="8" />
      </g>
    </svg>
  `;
}

/* ============================================================================
   BIOMECHANICAL GROUNDED TRAINER SVG (FIXED ON FLOOR MAT — NO FLYING!)
   ============================================================================ */
function buildAnimatedHumanTrainerSVG(animType = "squat", isStaticCard = false) {
  const cls = isStaticCard ? "" : "";
  const floorLine = `
    <line x1="20" y1="185" x2="260" y2="185" stroke="#D4A72C" stroke-width="4" stroke-linecap="round" />
    <rect x="45" y="185" width="190" height="6" rx="3" fill="#19B889" opacity="0.7" />
  `;

  // 1. وضع الضغط أو الارتكاز الأفقي على الأرض (Push-Up / Mountain Climber)
  if (animType === "pushup") {
    return `
      <svg viewBox="0 0 280 210" class="biomech-svg" xmlns="http://www.w3.org/2000/svg">
        ${floorLine}
        <text x="140" y="28" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="bold">ارتكاز أفقي على البساط • نزول وصعود بالصدر</text>
        <!-- الأذرع الثابتة كفها على الأرض -->
        <line x1="82" y1="183" x2="88" y2="142" stroke="#19B889" stroke-width="8" stroke-linecap="round" />
        <!-- الجذع والأرجل المرتكزة على مشط القدم عند (215, 175) -->
        <g class="${isStaticCard ? "" : "bm-pushup-plank"}">
          <circle cx="64" cy="128" r="13" fill="#1e293b" stroke="#D4A72C" stroke-width="3" />
          <line x1="78" y1="132" x2="152" y2="152" stroke="#D4A72C" stroke-width="14" stroke-linecap="round" />
          <line x1="152" y1="152" x2="215" y2="175" stroke="#f8fafc" stroke-width="10" stroke-linecap="round" />
          <line x1="88" y1="135" x2="82" y2="183" stroke="#19B889" stroke-width="7" stroke-linecap="round" />
        </g>
        <circle cx="215" cy="179" r="5" fill="#19B889" />
        <circle cx="82" cy="181" r="5" fill="#19B889" />
      </svg>
    `;
  }

  // 2. وضع الضغط المائل للأكتاف على الأرض (Pike Push-Up — Inverted V on Floor)
  if (animType === "pike") {
    return `
      <svg viewBox="0 0 280 210" class="biomech-svg" xmlns="http://www.w3.org/2000/svg">
        ${floorLine}
        <text x="140" y="28" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="bold">وضع المثلث (V مقلوب) على الأرض لتقوية الأكتاف</text>
        <!-- الأرجل ثابتة على الأرض والحوض مرفوع للأعلى -->
        <line x1="195" y1="182" x2="145" y2="92" stroke="#f8fafc" stroke-width="11" stroke-linecap="round" />
        <g class="${isStaticCard ? "" : "bm-squat-hip"}">
          <line x1="145" y1="92" x2="95" y2="145" stroke="#D4A72C" stroke-width="13" stroke-linecap="round" />
          <circle cx="88" cy="152" r="12" fill="#1e293b" stroke="#D4A72C" stroke-width="3" />
          <line x1="95" y1="142" x2="75" y2="182" stroke="#19B889" stroke-width="8" stroke-linecap="round" />
        </g>
        <circle cx="75" cy="182" r="5" fill="#19B889" />
        <circle cx="195" cy="182" r="5" fill="#19B889" />
      </svg>
    `;
  }

  // 3. وضع تمارين البطن على البساط (Floor Crunch)
  if (animType === "crunch") {
    return `
      <svg viewBox="0 0 280 210" class="biomech-svg" xmlns="http://www.w3.org/2000/svg">
        ${floorLine}
        <text x="140" y="28" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="bold">استلقاء على البساط • عصر ورفع الجذع للبطن</text>
        <!-- الحوض والركبتان مثنيتان والقدمان على الأرض -->
        <line x1="145" y1="172" x2="185" y2="128" stroke="#f8fafc" stroke-width="11" stroke-linecap="round" />
        <line x1="185" y1="128" x2="218" y2="181" stroke="#f8fafc" stroke-width="10" stroke-linecap="round" />
        <!-- الجذع والرأس يرتفعان لعصر البطن -->
        <g class="${isStaticCard ? "" : "bm-crunch-torso"}">
          <line x1="145" y1="172" x2="82" y2="155" stroke="#D4A72C" stroke-width="14" stroke-linecap="round" />
          <circle cx="66" cy="146" r="13" fill="#1e293b" stroke="#D4A72C" stroke-width="3" />
          <line x1="86" y1="154" x2="115" y2="135" stroke="#19B889" stroke-width="7" stroke-linecap="round" />
        </g>
      </svg>
    `;
  }

  // 4. وضع جسر الأرضية (Floor Hip Bridge)
  if (animType === "bridge") {
    return `
      <svg viewBox="0 0 280 210" class="biomech-svg" xmlns="http://www.w3.org/2000/svg">
        ${floorLine}
        <text x="140" y="28" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="bold">استلقاء على البساط • رفع الحوض للأعلى</text>
        <circle cx="62" cy="172" r="12" fill="#1e293b" stroke="#D4A72C" stroke-width="3" />
        <g class="${isStaticCard ? "" : "bm-bridge-pelvis"}">
          <line x1="78" y1="174" x2="150" y2="138" stroke="#D4A72C" stroke-width="14" stroke-linecap="round" />
          <line x1="150" y1="138" x2="195" y2="132" stroke="#f8fafc" stroke-width="11" stroke-linecap="round" />
        </g>
        <line x1="195" y1="132" x2="212" y2="181" stroke="#f8fafc" stroke-width="10" stroke-linecap="round" />
      </svg>
    `;
  }

  // 5. وضع الثبات على الكوعين (Forearm Plank)
  if (animType === "plank") {
    return `
      <svg viewBox="0 0 280 210" class="biomech-svg" xmlns="http://www.w3.org/2000/svg">
        ${floorLine}
        <text x="140" y="28" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="bold">ثبات أفقي مستقيم على الساعدين وأطراف الأصابع</text>
        <circle cx="62" cy="142" r="12" fill="#1e293b" stroke="#D4A72C" stroke-width="3" />
        <line x1="76" y1="146" x2="155" y2="152" stroke="#D4A72C" stroke-width="14" stroke-linecap="round" />
        <line x1="155" y1="152" x2="218" y2="176" stroke="#f8fafc" stroke-width="10" stroke-linecap="round" />
        <!-- الساعد على الأرض -->
        <polyline points="86,148 86,181 64,181" fill="none" stroke="#19B889" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="130" cy="150" r="18" fill="rgba(25, 184, 137, 0.2)" />
      </svg>
    `;
  }

  // 6. وضع المتوازي على الكرسي (Bench / Chair Dips)
  if (animType === "dips") {
    return `
      <svg viewBox="0 0 280 210" class="biomech-svg" xmlns="http://www.w3.org/2000/svg">
        ${floorLine}
        <text x="140" y="28" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="bold">ارتكاز اليدين على الكرسي • ثني ومد الكوعين</text>
        <!-- صندوق الكرسي أو البنش -->
        <rect x="52" y="132" width="46" height="52" rx="6" fill="#1e293b" stroke="#D4A72C" stroke-width="2" />
        <g class="${isStaticCard ? "" : "bm-squat-hip"}">
          <circle cx="122" cy="78" r="13" fill="#1e293b" stroke="#D4A72C" stroke-width="3" />
          <line x1="122" y1="92" x2="122" y2="145" stroke="#D4A72C" stroke-width="14" stroke-linecap="round" />
          <polyline points="122,102 95,112 95,132" fill="none" stroke="#19B889" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
          <polyline points="122,145 162,145 182,181" fill="none" stroke="#f8fafc" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </svg>
    `;
  }

  // 7. وضع القفز والكارديو (Jumping Jacks / High Knees)
  if (animType === "jump") {
    return `
      <svg viewBox="0 0 280 210" class="biomech-svg" xmlns="http://www.w3.org/2000/svg">
        ${floorLine}
        <text x="140" y="24" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="bold">وقوف على الأرض • حركة متناسقة للذراعين والأرجل</text>
        <g class="${isStaticCard ? "" : "bm-jump-body"}">
          <circle cx="140" cy="52" r="14" fill="#1e293b" stroke="#D4A72C" stroke-width="3" />
          <rect x="126" y="68" width="28" height="54" rx="8" fill="#D4A72C" />
          <line class="${isStaticCard ? "" : "bm-jump-arm-l"}" x1="125" y1="76" x2="96" y2="118" stroke="#19B889" stroke-width="8" stroke-linecap="round" />
          <line class="${isStaticCard ? "" : "bm-jump-arm-r"}" x1="155" y1="76" x2="184" y2="118" stroke="#19B889" stroke-width="8" stroke-linecap="round" />
          <line x1="132" y1="122" x2="116" y2="181" stroke="#f8fafc" stroke-width="10" stroke-linecap="round" />
          <line x1="148" y1="122" x2="164" y2="181" stroke="#f8fafc" stroke-width="10" stroke-linecap="round" />
        </g>
      </svg>
    `;
  }

  // 8. وضع السحب والباي والظهر (Pull / Curls)
  if (animType === "pull") {
    return `
      <svg viewBox="0 0 280 210" class="biomech-svg" xmlns="http://www.w3.org/2000/svg">
        ${floorLine}
        <text x="140" y="24" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="bold">ثبات الجذع • سحب وعصر العضلة بتحكم</text>
        <circle cx="140" cy="54" r="14" fill="#1e293b" stroke="#D4A72C" stroke-width="3" />
        <rect x="125" y="70" width="30" height="56" rx="8" fill="#D4A72C" />
        <line x1="132" y1="126" x2="128" y2="181" stroke="#f8fafc" stroke-width="10" stroke-linecap="round" />
        <line x1="148" y1="126" x2="152" y2="181" stroke="#f8fafc" stroke-width="10" stroke-linecap="round" />
        <g class="${isStaticCard ? "" : "bm-pull-arms"}">
          <line x1="124" y1="78" x2="96" y2="98" stroke="#19B889" stroke-width="8" stroke-linecap="round" />
          <line x1="156" y1="78" x2="184" y2="98" stroke="#19B889" stroke-width="8" stroke-linecap="round" />
          <line x1="86" y1="98" x2="194" y2="98" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" />
        </g>
      </svg>
    `;
  }

  // الوضع الافتراضي: السكوات والطعن على الأرض (Squat / Lunge)
  return `
    <svg viewBox="0 0 280 210" class="biomech-svg" xmlns="http://www.w3.org/2000/svg">
      ${floorLine}
      <text x="140" y="24" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="bold">ثبات القدمين على الأرض • نزول بالحوض وثني الركبتين</text>
      <!-- الساق السفلية ثابتة على الأرض -->
      <line x1="122" y1="181" x2="112" y2="142" stroke="#f8fafc" stroke-width="10" stroke-linecap="round" />
      <line x1="158" y1="181" x2="168" y2="142" stroke="#f8fafc" stroke-width="10" stroke-linecap="round" />
      <!-- الجذع والفخذ ينزلان ويصعدان فوق الركبة -->
      <g class="${isStaticCard ? "" : "bm-squat-hip"}">
        <circle cx="140" cy="48" r="14" fill="#1e293b" stroke="#D4A72C" stroke-width="3" />
        <rect x="125" y="64" width="30" height="52" rx="8" fill="#D4A72C" />
        <line x1="125" y1="74" x2="95" y2="78" stroke="#19B889" stroke-width="8" stroke-linecap="round" />
        <line x1="155" y1="74" x2="185" y2="78" stroke="#19B889" stroke-width="8" stroke-linecap="round" />
        <line x1="132" y1="114" x2="112" y2="142" stroke="#f8fafc" stroke-width="11" stroke-linecap="round" />
        <line x1="148" y1="114" x2="168" y2="142" stroke="#f8fafc" stroke-width="11" stroke-linecap="round" />
      </g>
    </svg>
  `;
}

function renderHealthView() {
  injectGymV4Styles();
  const sec = document.getElementById("view-health");
  if (!sec) return;

  const profile = OSProStore.get("gym_profile_v4", {
    wizardStep: 1,
    gender: "male",
    name: B().getAppState?.()?.user?.displayName || "أحمد محمد حسني",
    age: 21,
    height: 178,
    currentWeight: 74,
    targetWeight: 82,
    goal: "bulk",
    workoutMode: "home",
    daysPerWeek: 4,
    preferredTime: "18:00",
    waterCups: 6,
    completedToday: [],
    liveExIdx: 0,
    customExercises: [],
    showNutrition: false,
    customMeals: []
  });

  const saveP = () => OSProStore.set("gym_profile_v4", profile);

  /* --------------------------------------------------------------------------
     WIZARD ONBOARDING (4 STEPS — ZERO HUMAN/WOMEN PHOTOS, 3D EMBLEMS ONLY)
     -------------------------------------------------------------------------- */
  if (profile.wizardStep < 5) {
    const step = profile.wizardStep;
    sec.innerHTML = `
      <div class="gym-wizard-shell">
        <div class="wizard-steps-bar">
          ${[1, 2, 3, 4].map(s => `<div class="wizard-step-dot ${step >= s ? "active" : ""}"></div>`).join("")}
        </div>

        ${step === 1 ? `
          <div class="text-center">
            <span class="badge badge-gold">الخطوة 1 من 4 • المعادلات الفسيولوجية</span>
            <h2 class="mt-2">اختر الفئة لضبط معادلات الحرق والبرنامج التدريبي</h2>
            <p class="small-muted mt-1">يتم ضبط الأحمال التدريبية والسعرات تلقائياً:</p>
          </div>
          <div class="wizard-gender-grid">
            <div class="wizard-big-card ${profile.gender === "male" ? "active" : ""}" data-wiz-gender="male">
              <div class="wizard-emblem-circle"><i class="fa-solid fa-dumbbell"></i></div>
              <h3 class="gold-text">برنامج الشباب والرجال 🚹</h3>
              <p class="small-muted">تركيز على القوة العضلية، الضخامة، واللياقة البدنية العالية</p>
            </div>
            <div class="wizard-big-card ${profile.gender === "female" ? "active" : ""}" data-wiz-gender="female">
              <div class="wizard-emblem-circle" style="border-color:#19B889; color:#19B889;"><i class="fa-solid fa-heart-pulse"></i></div>
              <h3 style="color:#19B889;">برنامج اللياقة والرشاقة 🚺</h3>
              <p class="small-muted">تركيز على اللياقة الصحية، المرونة، وحرق السعرات</p>
            </div>
          </div>
          <button type="button" id="btn-wiz-next-1" class="btn btn-gold btn-block btn-luxury-shine">
            التالي: الاسم والعمر <i class="fa-solid fa-arrow-left"></i>
          </button>
        ` : ""}

        ${step === 2 ? `
          <div class="text-center mb-4">
            <span class="badge badge-gold">الخطوة 2 من 4 • البطاقة الشخصية</span>
            <h2 class="mt-2">ما هو اسمك وكم عمرك يا بطل؟</h2>
          </div>
          <div class="form-group">
            <label class="text-center">الاسم الرياضي</label>
            <input type="text" id="wiz-inp-name" class="wizard-input-giant" value="${esc(profile.name)}" autofocus />
          </div>
          <div class="form-group mt-4">
            <label class="text-center">العمر (بالسنوات)</label>
            <input type="number" id="wiz-inp-age" class="wizard-input-giant" min="12" max="80" value="${profile.age}" />
          </div>
          <div class="flex-between mt-4">
            <button type="button" id="btn-wiz-prev" class="btn btn-outline"><i class="fa-solid fa-arrow-right"></i> السابق</button>
            <button type="button" id="btn-wiz-next-2" class="btn btn-gold btn-luxury-shine" style="flex:1; margin-right:12px;">
              التالي: الوزن والطموح <i class="fa-solid fa-arrow-left"></i>
            </button>
          </div>
        ` : ""}

        ${step === 3 ? `
          <div class="text-center mb-4">
            <span class="badge badge-gold">الخطوة 3 من 4 • القياسات والوزن الطموح</span>
            <h2 class="mt-2">كم وزنك وطولك الحالي.. وطموحك توصل لكام كيلو؟ 🎯</h2>
          </div>
          <div class="dashboard-grid" style="grid-template-columns:repeat(3, 1fr); gap:14px;">
            <div class="form-group">
              <label class="text-center">الطول (سم cm)</label>
              <input type="number" id="wiz-inp-height" class="wizard-input-giant" value="${profile.height}" />
            </div>
            <div class="form-group">
              <label class="text-center">وزنك الحالي (kg)</label>
              <input type="number" step="0.5" id="wiz-inp-cur-w" class="wizard-input-giant" value="${profile.currentWeight}" />
            </div>
            <div class="form-group">
              <label class="text-center gold-text">🎯 الوزن الطموح (kg)</label>
              <input type="number" step="0.5" id="wiz-inp-tar-w" class="wizard-input-giant" value="${profile.targetWeight}" />
            </div>
          </div>
          <div class="form-group mt-2">
            <label class="text-center">هدفك الأساسي</label>
            <select id="wiz-inp-goal" class="wizard-input-giant" style="font-size:1.05rem!important;">
              <option value="bulk" ${profile.goal === "bulk" ? "selected" : ""}>💪 زيادة الكتلة العضلية والوزن (Bulking)</option>
              <option value="cut" ${profile.goal === "cut" ? "selected" : ""}>🔥 حرق الدهون والتنشيف (Cutting)</option>
              <option value="recomp" ${profile.goal === "recomp" ? "selected" : ""}>⚡ شد الجسم واللياقة البدنية الشاملة</option>
            </select>
          </div>
          <div class="flex-between mt-4">
            <button type="button" id="btn-wiz-prev" class="btn btn-outline"><i class="fa-solid fa-arrow-right"></i> السابق</button>
            <button type="button" id="btn-wiz-next-3" class="btn btn-gold btn-luxury-shine" style="flex:1; margin-right:12px;">
              التالي: مكان التمرين <i class="fa-solid fa-arrow-left"></i>
            </button>
          </div>
        ` : ""}

        ${step === 4 ? `
          <div class="text-center">
            <span class="badge badge-gold">الخطوة 4 والأخيرة • تحديد بيئة التمرين</span>
            <h2 class="mt-2">هل ستتمرن في البيت 🏠 أم في الجيم 🏋️‍♂️؟</h2>
          </div>
          <div class="wizard-gender-grid">
            <div class="wizard-big-card ${profile.workoutMode === "home" ? "active" : ""}" data-wiz-mode="home">
              <div class="wizard-emblem-circle"><i class="fa-solid fa-house-chimney"></i></div>
              <h3 class="gold-text">🏠 تمرين في البيت (بدون أجهزة)</h3>
              <p class="small-muted">12 تمريناً منزلياً بوزن الجسم مع رسوم تشريحية توضح وضع الجسم الصحيح على الأرض</p>
            </div>
            <div class="wizard-big-card ${profile.workoutMode === "gym" ? "active" : ""}" data-wiz-mode="gym">
              <div class="wizard-emblem-circle" style="border-color:#19B889; color:#19B889;"><i class="fa-solid fa-dumbbell"></i></div>
              <h3 style="color:#19B889;">🏋️‍♂️ تمرين في الجيم (أجهزة وأوزان)</h3>
              <p class="small-muted">أكثر من 30 تمريناً بالبار والدمبل والأجهزة مقسمة على خريطة العضلات 3D</p>
            </div>
          </div>
          <div class="flex-between mt-4">
            <button type="button" id="btn-wiz-prev" class="btn btn-outline"><i class="fa-solid fa-arrow-right"></i> السابق</button>
            <button type="button" id="btn-wiz-finish" class="btn btn-gold btn-luxury-shine" style="flex:1; margin-right:12px;">
              🚀 افتح استوديو التمرين الآن!
            </button>
          </div>
        ` : ""}
      </div>
    `;

    sec.querySelectorAll("[data-wiz-gender]").forEach(c => {
      c.onclick = () => { profile.gender = c.dataset.wizGender; saveP(); renderHealthView(); };
    });
    sec.querySelectorAll("[data-wiz-mode]").forEach(c => {
      c.onclick = () => { profile.workoutMode = c.dataset.wizMode; saveP(); renderHealthView(); };
    });
    sec.querySelector("#btn-wiz-prev")?.addEventListener("click", () => {
      profile.wizardStep = Math.max(1, profile.wizardStep - 1); saveP(); renderHealthView();
    });
    sec.querySelector("#btn-wiz-next-1")?.addEventListener("click", () => {
      profile.wizardStep = 2; saveP(); renderHealthView();
    });
    sec.querySelector("#btn-wiz-next-2")?.addEventListener("click", () => {
      const n = document.getElementById("wiz-inp-name")?.value.trim();
      const a = Number(document.getElementById("wiz-inp-age")?.value) || 21;
      if (n) profile.name = n;
      profile.age = a;
      profile.wizardStep = 3; saveP(); renderHealthView();
    });
    sec.querySelector("#btn-wiz-next-3")?.addEventListener("click", () => {
      profile.height = Number(document.getElementById("wiz-inp-height")?.value) || 175;
      profile.currentWeight = Number(document.getElementById("wiz-inp-cur-w")?.value) || 74;
      profile.targetWeight = Number(document.getElementById("wiz-inp-tar-w")?.value) || 80;
      profile.goal = document.getElementById("wiz-inp-goal")?.value || "bulk";
      profile.wizardStep = 4; saveP(); renderHealthView();
    });
    sec.querySelector("#btn-wiz-finish")?.addEventListener("click", () => {
      profile.wizardStep = 5; saveP();
      toast(`تم تجهيز برنامجك التدريبي بنجاح يا كابتن ${profile.name}! 💪`);
      renderHealthView();
    });
    return;
  }

  /* --------------------------------------------------------------------------
     MAIN STUDIO VIEW (CLEAN DIAGRAMS & EQUIPMENT — ZERO WOMEN PHOTOS)
     -------------------------------------------------------------------------- */
  const isHome = profile.workoutMode === "home";
  const m = calculatePhysiologyMetrics(profile);

  const customExList = profile.customExercises || [];
  const allHomeExercises = [
    ...HOME_12_EXERCISES,
    ...customExList.filter(x => x.mode === "home")
  ];
  const currentGymList = [
    ...(GYM_PRO_EXERCISES_DB[activeMuscleGroup] || GYM_PRO_EXERCISES_DB.chest),
    ...customExList.filter(x => x.mode === "gym" && x.muscle === activeMuscleGroup)
  ];

  const activeLiveEx = allHomeExercises[profile.liveExIdx] || allHomeExercises[0];
  const muscleNamesAr = {
    chest: "الصدر (Chest 3D)",
    back: "الظهر والمجنص (Back 3D)",
    shoulders: "الأكتاف (Shoulders 3D)",
    arms: "الباي والتراي (Arms 3D)",
    legs: "الأرجل (Legs 3D)",
    core: "البطن والجذع (Core 3D)"
  };

  sec.innerHTML = `
    <div class="pro-hero-banner" style="background-image: linear-gradient(90deg, rgba(9,13,25,0.96) 0%, rgba(9,13,25,0.82) 55%, rgba(9,13,25,0.96) 100%), url('${CLEAN_EQUIP_IMAGES.barbell}');">
      <div class="pro-hero-overlay">
        <div>
          <div class="filters-row mb-1">
            <span class="badge badge-gold"><i class="fa-solid fa-shield-heart"></i> استوديو اللياقة المحترم والنقي 3D</span>
            <span class="badge badge-emerald">${isHome ? "🏠 وضع تمرين البيت (بدون أجهزة)" : "🏋️‍♂️ وضع الجيم (أجهزة وأوزان)"}</span>
            <span class="badge badge-warning">BMI: ${m.bmi} (${m.bmiStatus})</span>
          </div>
          <h2>كابتن <span class="gold-text">${esc(profile.name)}</span> (${profile.age} سنة) — من <span class="gold-text">${profile.currentWeight}kg</span> إلى <span class="gold-text">${profile.targetWeight}kg</span></h2>
          <p class="small-muted mt-1">
            الفرق لتحقيق طموحك: <strong class="gold-text">${m.weightDiff > 0 ? `+${m.weightDiff} كجم زيادة مطلوبة` : m.weightDiff < 0 ? `${m.weightDiff} كجم نزول مطلوب` : "وصلت لوزنك المثالي! 🎯"}</strong>
            &bull; احتياجك المحسوب: <strong>${m.targetCalories} kcal</strong> (${m.proteinG}g بروتين)
            &bull; المياه: <strong>${profile.waterCups}/10 أكواب</strong>
          </p>
        </div>

        <div class="filters-row">
          <button type="button" id="btn-switch-home-gym" class="btn btn-gold btn-sm">
            <i class="fa-solid ${isHome ? "fa-dumbbell" : "fa-house-chimney"}"></i>
            ${isHome ? "التحويل لوضع الجيم 🏋️‍♂️" : "التحويل لوضع البيت 🏠"}
          </button>
          <button type="button" id="btn-pin-workout-task" class="btn btn-outline btn-sm" style="border-color:#19B889;">
            <i class="fa-solid fa-calendar-check gold-text"></i> تثبيت التمرين في مهامي وتقويمي 📌
          </button>
          <button type="button" id="btn-add-custom-ex" class="btn btn-outline btn-sm">
            <i class="fa-solid fa-plus gold-text"></i> أضف تمريناً خاصاً
          </button>
          <button type="button" id="btn-gym-water-plus" class="btn btn-outline btn-sm">💧 +مية</button>
          <button type="button" id="btn-reopen-wizard" class="btn btn-outline btn-sm"><i class="fa-solid fa-sliders"></i> بياناتي</button>
        </div>
      </div>
    </div>

    ${isHome ? `
      <div class="live-workout-stage">
        <div class="flex-between" style="flex-wrap:wrap; gap:12px;">
          <div>
            <span class="badge badge-emerald">🏠 HOME WORKOUT COACH • ارتكاز واقعي على الأرضية</span>
            <h3 class="mt-1">🔥 برنامج تمرين البيت المتكامل (${allHomeExercises.length} تمرين بدون أجهزة)</h3>
          </div>
          <div class="filters-row">
            <button type="button" id="btn-start-live-home" class="btn btn-gold btn-sm">
              <i class="fa-solid fa-play"></i> ابدأ تمرين اليوم الآن (تشغيل العداد)
            </button>
            <span id="live-home-timer" class="badge badge-gold" style="font-size:1.05rem; padding:6px 14px;">00:45</span>
          </div>
        </div>

        <div class="workout-step-pills">
          ${allHomeExercises.map((ex, idx) => `
            <span class="workout-step-pill ${profile.liveExIdx === idx ? "active" : ""} ${(profile.completedToday || []).includes(ex.id) ? "done" : ""}" data-jump-home-ex="${idx}">
              ${idx + 1}. ${esc(ex.name.split("•")[0].replace(/^\d+\.\s*/, ""))}
            </span>
          `).join("")}
        </div>

        <div class="dashboard-grid" style="align-items:center; grid-template-columns: 320px 1fr;">
          <div class="trainer-3d-box">
            ${buildAnimatedHumanTrainerSVG(activeLiveEx.anim || "squat", false)}
          </div>
          <div>
            <div class="flex-between">
              <span class="badge badge-gold">${esc(activeLiveEx.cat)}</span>
              <span class="badge badge-emerald">المطلوب: ${esc(activeLiveEx.reps)} • 🔥 ${esc(activeLiveEx.cals)}</span>
            </div>
            <h2 class="gold-text mt-1">${esc(activeLiveEx.name)}</h2>
            <div class="subject-progress-box mt-2">
              <strong class="gold-text d-block">📐 خطوات الأداء الصحيح على الأرض:</strong>
              <p class="mt-1" style="font-size:0.95rem;">${esc(activeLiveEx.desc || activeLiveEx.tips)}</p>
            </div>
            <div class="filters-row mt-2">
              <button type="button" id="btn-prev-home-ex" class="btn btn-outline btn-sm"><i class="fa-solid fa-backward-step"></i> السابق</button>
              <button type="button" id="btn-done-home-ex" class="btn btn-gold btn-sm">
                <i class="fa-solid fa-check-double"></i> أتممت هذا التمرين ➔ التالي
              </button>
              <button type="button" id="btn-next-home-ex" class="btn btn-outline btn-sm">التالي <i class="fa-solid fa-forward-step"></i></button>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3><i class="fa-solid fa-list-check gold-text"></i> بطاقات تمارين البيت التوضيحية الثابتة (${allHomeExercises.length} حركة)</h3>
          <span class="badge badge-emerald">أنجزت اليوم: ${(profile.completedToday || []).length} من ${allHomeExercises.length}</span>
        </div>
        <div class="exercise-photo-grid">
          ${allHomeExercises.map((ex, idx) => {
            const done = (profile.completedToday || []).includes(ex.id);
            return `
              <div class="exercise-pro-card">
                <div class="static-diagram-thumb">
                  ${buildAnimatedHumanTrainerSVG(ex.anim || "squat", true)}
                  <span class="exercise-3d-tag">🏠 ${esc(ex.cat)}</span>
                  <span class="exercise-sets-pill">${esc(ex.reps)}</span>
                </div>
                <div class="exercise-body">
                  <h4>${esc(ex.name)}</h4>
                  <div class="exercise-steps-box">${esc(ex.desc || ex.tips)}</div>
                  <div class="flex-between mt-1">
                    <button type="button" class="btn btn-xs btn-outline" data-jump-home-ex="${idx}"><i class="fa-solid fa-play gold-text"></i> شغل في المدرب</button>
                    <button type="button" class="btn btn-xs ${done ? "btn-gold" : "btn-outline"}" data-toggle-ex-done="${esc(ex.id)}">
                      ${done ? "تم اليوم ✅" : "سجّل كمكتمل"}
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    ` : `
      <div class="gym-layout-split">
        <div class="muscle-3d-stage">
          <span class="badge badge-gold">3D GYM ANATOMY</span>
          <h4 class="mt-1">${muscleNamesAr[activeMuscleGroup]}</h4>
          <small class="small-muted d-block">اضغط على العضلة لعرض تمارينها وأجهزتها:</small>

          ${build3DMuscleSVG(activeMuscleGroup)}

          <div class="cert-pill-row" style="justify-content:center;">
            ${Object.keys(muscleNamesAr).map(k => `
              <button type="button" class="btn btn-xs ${activeMuscleGroup === k ? "btn-gold" : "btn-outline"}" data-muscle-pick="${k}">
                ${k === "chest" ? "الصدر" : k === "back" ? "الظهر" : k === "shoulders" ? "الأكتاف" : k === "arms" ? "الذراعين" : k === "legs" ? "الأرجل" : "البطن"}
              </button>
            `).join("")}
          </div>

          <hr class="divider" />
          <div class="flex-between">
            <span>⏱️ مؤقت الراحة بين الجولات:</span>
            <strong id="gym-rest-timer-lbl" class="gold-text">00:60</strong>
          </div>
          <button type="button" id="btn-start-rest-60" class="btn btn-outline btn-xs btn-block mt-1">
            <i class="fa-solid fa-stopwatch gold-text"></i> ابدأ راحة 60 ثانية
          </button>
        </div>

        <div class="card">
          <div class="card-header">
            <h3><i class="fa-solid fa-dumbbell gold-text"></i> تمارين وأجهزة الجيم لـ ${muscleNamesAr[activeMuscleGroup]} (${currentGymList.length} تمارين)</h3>
            <span class="badge badge-emerald">أنجزت اليوم: ${(profile.completedToday || []).length} تمارين</span>
          </div>
          <div class="exercise-photo-grid">
            ${currentGymList.map(ex => {
              const done = (profile.completedToday || []).includes(ex.id);
              return `
                <div class="exercise-pro-card">
                  <div class="static-diagram-thumb">
                    ${buildAnimatedHumanTrainerSVG(ex.anim || "pull", true)}
                    <span class="exercise-3d-tag"><i class="fa-solid fa-dumbbell"></i> ${esc(ex.equip)}</span>
                    <span class="exercise-sets-pill">${esc(ex.sets)}</span>
                  </div>
                  <div class="exercise-body">
                    <div class="flex-between">
                      <h4>${esc(ex.name)}</h4>
                      <span class="badge badge-gold">🔥 ${esc(ex.cals)}</span>
                    </div>
                    <div class="exercise-steps-box">
                      <strong class="gold-text d-block">📐 التكنيك الصحيح:</strong>
                      ${esc(ex.tips)}
                    </div>
                    <div class="flex-between mt-1">
                      <button type="button" class="btn btn-xs ${done ? "btn-gold" : "btn-outline"}" data-toggle-ex-done="${esc(ex.id)}">
                        ${done ? "تم الإنجاز ✅" : "سجّل كمكتمل"}
                      </button>
                      <button type="button" class="btn btn-xs btn-outline" data-pin-single-ex="${esc(ex.name)}">
                        <i class="fa-solid fa-thumbtack gold-text"></i> أضف للمهام
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `}

    <div class="card mt-4">
      <div class="flex-between">
        <div>
          <h3><i class="fa-solid fa-utensils gold-text"></i> مفكرة التغذية والوجبات الخاصة بك (اختياري بالكامل)</h3>
          <small class="small-muted">أضف وجباتك الخاصة بحرية أو اترك القسم مغلقاً</small>
        </div>
        <div class="filters-row">
          <button type="button" id="btn-toggle-nutrition-sec" class="btn btn-outline btn-sm">
            ${profile.showNutrition ? "إخفاء قسم التغذية" : "➕ فتح وإضافة برنامج غذائي خاص بي"}
          </button>
          ${profile.showNutrition ? `<button type="button" id="btn-add-custom-meal" class="btn btn-gold btn-sm">+ أضف وجبة من اختيارك</button>` : ""}
        </div>
      </div>

      ${profile.showNutrition ? `
        <div class="items-grid mt-2">
          ${(profile.customMeals || []).length ? (profile.customMeals || []).map((ml, idx) => `
            <div class="item-card">
              <div class="flex-between">
                <span class="badge badge-gold">${esc(ml.time || "وجبة")}</span>
                <button type="button" class="btn btn-xs btn-danger" data-del-meal="${idx}"><i class="fa-solid fa-trash"></i></button>
              </div>
              <h4 class="mt-1">${esc(ml.title)}</h4>
              <small class="small-note">${esc(ml.macros || "")}</small>
            </div>
          `).join("") : `<p class="small-muted">اضغط "+ أضف وجبة من اختيارك" لتسجيل وجباتك.</p>`}
        </div>
      ` : ""}
    </div>
  `;

  sec.querySelector("#btn-switch-home-gym")?.addEventListener("click", () => {
    profile.workoutMode = isHome ? "gym" : "home";
    saveP(); renderHealthView();
  });

  sec.querySelector("#btn-reopen-wizard")?.addEventListener("click", () => {
    profile.wizardStep = 1; saveP(); renderHealthView();
  });

  sec.querySelector("#btn-gym-water-plus")?.addEventListener("click", () => {
    profile.waterCups = (Number(profile.waterCups) || 0) + 1;
    saveP(); renderHealthView();
    toast("بالهنا والشفا! +1 كوب مية 💧");
  });

  sec.querySelectorAll("[data-jump-home-ex]").forEach(el => {
    el.onclick = () => {
      profile.liveExIdx = Number(el.dataset.jumpHomeEx) || 0;
      saveP(); renderHealthView();
    };
  });

  sec.querySelector("#btn-prev-home-ex")?.addEventListener("click", () => {
    profile.liveExIdx = (profile.liveExIdx - 1 + allHomeExercises.length) % allHomeExercises.length;
    saveP(); renderHealthView();
  });

  sec.querySelector("#btn-next-home-ex")?.addEventListener("click", () => {
    profile.liveExIdx = (profile.liveExIdx + 1) % allHomeExercises.length;
    saveP(); renderHealthView();
  });

  sec.querySelector("#btn-done-home-ex")?.addEventListener("click", () => {
    profile.completedToday = profile.completedToday || [];
    if (!profile.completedToday.includes(activeLiveEx.id)) {
      profile.completedToday.push(activeLiveEx.id);
    }
    profile.liveExIdx = (profile.liveExIdx + 1) % allHomeExercises.length;
    saveP();
    toast(`عاش يا بطل! أنجزت التمرين وانتقلت للتالي 🔥`);
    renderHealthView();
  });

  sec.querySelector("#btn-start-live-home")?.addEventListener("click", () => {
    if (livePlayerTimerInterval) clearInterval(livePlayerTimerInterval);
    let s = 45;
    const badge = document.getElementById("live-home-timer");
    toast("بدأ عداد الجولة (45 ثانية)! 💪🔥");
    livePlayerTimerInterval = setInterval(() => {
      s--;
      if (badge) badge.textContent = `00:${String(Math.max(0, s)).padStart(2, "0")}`;
      if (s <= 0) {
        clearInterval(livePlayerTimerInterval);
        toast("انتهى وقت الجولة! خذ نفساً وانتقل للتمرين التالي 🎉");
      }
    }, 1000);
  });

  sec.querySelectorAll("[data-muscle-pick]").forEach(el => {
    el.onclick = () => { activeMuscleGroup = el.dataset.musclePick; renderHealthView(); };
  });

  sec.querySelectorAll("[data-toggle-ex-done]").forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.toggleExDone;
      profile.completedToday = profile.completedToday || [];
      if (profile.completedToday.includes(id)) {
        profile.completedToday = profile.completedToday.filter(x => x !== id);
      } else {
        profile.completedToday.push(id);
        toast("تم تسجيل التمرين كمكتمل اليوم 💪✅");
      }
      saveP(); renderHealthView();
    };
  });

  sec.querySelector("#btn-start-rest-60")?.addEventListener("click", () => {
    if (activeRestTimerInterval) clearInterval(activeRestTimerInterval);
    let s = 60;
    const lbl = document.getElementById("gym-rest-timer-lbl");
    activeRestTimerInterval = setInterval(() => {
      s--;
      if (lbl) lbl.textContent = `00:${String(Math.max(0, s)).padStart(2, "0")}`;
      if (s <= 0) {
        clearInterval(activeRestTimerInterval);
        toast("انتهت الراحة! ادخل الجولة التالية بقوة 🔥");
      }
    }, 1000);
  });

  sec.querySelector("#btn-add-custom-ex")?.addEventListener("click", () => {
    B().openFormModal("➕ إضافة تمرين جديد خاص بك", `
      <div class="form-group"><label>اسم التمرين</label><input name="name" required placeholder="مثال: عقلة واسع / ضغط الماسة..." /></div>
      <div class="form-group"><label>المكان</label>
        <select name="mode">
          <option value="home" ${isHome ? "selected" : ""}>🏠 تمرين بيت</option>
          <option value="gym" ${!isHome ? "selected" : ""}>🏋️‍♂️ تمرين جيم</option>
        </select>
      </div>
      <div class="form-group"><label>نوع الحركة التوضيحية</label>
        <select name="anim">
          <option value="pushup">حركة ضغط أرضي (Push-up)</option>
          <option value="squat">حركة سكوات وأرجل (Squat)</option>
          <option value="pull">حركة سحب وظهر وذراعين (Pull)</option>
          <option value="crunch">حركة بطن وجذع (Core)</option>
          <option value="jump">حركة لياقة وكارديو (Cardio)</option>
        </select>
      </div>
      <div class="form-group"><label>العضلة المستهدفة (للجيم)</label>
        <select name="muscle">
          <option value="chest">الصدر</option><option value="back">الظهر</option>
          <option value="shoulders">الأكتاف</option><option value="arms">الذراعين</option>
          <option value="legs">الأرجل</option><option value="core">البطن</option>
        </select>
      </div>
      <div class="form-group"><label>الجولات والعدات</label><input name="sets" value="4 Sets × 12 Reps" required /></div>
      <div class="form-group"><label>شرح الحركة</label><input name="tips" required /></div>
    `, async (d) => {
      profile.customExercises = profile.customExercises || [];
      profile.customExercises.push({
        id: "cust_" + Date.now(),
        name: d.name,
        mode: d.mode,
        muscle: d.muscle,
        cat: "تمرين مخصص",
        reps: d.sets,
        sets: d.sets,
        equip: "مخصص",
        cals: "110 kcal",
        anim: d.anim || "squat",
        desc: d.tips,
        tips: d.tips
      });
      saveP(); renderHealthView();
      toast("تمت إضافة تمرينك الخاص بنجاح! 💪");
    });
  });

  const openPinWorkoutModal = (defaultTitle = "") => {
    const defaultName = defaultTitle || (isHome ? "🏠 تمرين البيت الكامل (12 حركة)" : `🏋️‍♂️ تمرين الجيم: ${muscleNamesAr[activeMuscleGroup]}`);
    B().openFormModal("📌 تثبيت وجدولة التمرين في المهام والتقويم", `
      <div class="form-group">
        <label>اسم التمرين المراد تثبيته</label>
        <input name="title" value="${esc(defaultName)}" required />
      </div>
      <div class="form-group">
        <label>توقيت التمرين المفضل (الساعة)</label>
        <input type="time" name="time" value="${esc(profile.preferredTime || "18:00")}" required />
      </div>
      <div class="form-group">
        <label>التكرار الدوري</label>
        <select name="freq">
          <option value="daily">🔁 يومياً في نفس الموعد</option>
          <option value="3days" selected>📅 3 أيام أسبوعياً (السبت - الإثنين - الأربعاء)</option>
          <option value="4days">📅 4 أيام أسبوعياً</option>
          <option value="once">📌 اليوم فقط</option>
        </select>
      </div>
    `, async (d) => {
      profile.preferredTime = d.time;
      saveP();
      const freqLabels = { daily: "مثبت يومياً", "3days": "مثبت 3 أيام أسبوعياً", "4days": "مثبت 4 أيام أسبوعياً", once: "مرة واحدة" };
      await B().createRecord?.("tasks", {
        title: `🏋️‍♂️ ${d.title} (الساعة ${d.time})`,
        description: `تكرار التمرين: ${freqLabels[d.freq]}`,
        dueDate: today(),
        priority: "High",
        status: "Pending",
        category: "لياقة وجيم"
      });
      await B().createRecord?.("events", {
        title: `${d.title} (${freqLabels[d.freq]})`,
        date: today(),
        time: d.time,
        type: "Reminder"
      });
      toast(`تم تثبيت التمرين في مهامك وتقويمك! 📌📅`);
    });
  };

  sec.querySelector("#btn-pin-workout-task")?.addEventListener("click", () => openPinWorkoutModal());
  sec.querySelectorAll("[data-pin-single-ex]").forEach(btn => {
    btn.onclick = () => openPinWorkoutModal(btn.dataset.pinSingleEx);
  });

  sec.querySelector("#btn-toggle-nutrition-sec")?.addEventListener("click", () => {
    profile.showNutrition = !profile.showNutrition;
    saveP(); renderHealthView();
  });

  sec.querySelector("#btn-add-custom-meal")?.addEventListener("click", () => {
    B().openFormModal("🍽️ إضافة وجبة خاصة بك", `
      <div class="form-group"><label>اسم الوجبة ومكوناتها</label><input name="title" required /></div>
      <div class="form-group"><label>توقيت الوجبة</label><input name="time" placeholder="الإفطار / بعد التمرين" /></div>
      <div class="form-group"><label>السعرات أو البروتين (اختياري)</label><input name="macros" placeholder="600 kcal • 45g Protein" /></div>
    `, async (d) => {
      profile.customMeals = profile.customMeals || [];
      profile.customMeals.push(d);
      saveP(); renderHealthView();
      toast("تمت إضافة وجبتك بنجاح 🍽️");
    });
  });

  sec.querySelectorAll("[data-del-meal]").forEach(btn => {
    btn.onclick = () => {
      profile.customMeals.splice(Number(btn.dataset.delMeal), 1);
      saveP(); renderHealthView();
    };
  });
}

/* ============================================================================
   MODULE A: 3D VISION BOARD & LIFE GOALS (WITH CUSTOM PC IMAGE UPLOAD!)
   ============================================================================ */
function compressGoalImageFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxW = 720;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => resolve(ev.target.result);
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function renderGoalsView() {
  const sec = document.getElementById("view-goals");
  if (!sec) return;

  const goals = OSProStore.get("goals_v3", [
    {
      id: "g1",
      title: "إتقان هندسة البرمجيات والأمن السيبراني Full-Stack",
      level: "أهداف سنوية",
      deadline: "2026-12-31",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
      milestones: ["إتقان JavaScript & React", "بناء 3 مشاريع Firebase", "نشر البورتفوليو النهائي"],
      doneMilestones: [0, 1]
    },
    {
      id: "g2",
      title: "الامتياز الأكاديمي والتفوق في مواد الهندسة",
      level: "أهداف ربع سنوية",
      deadline: "2026-06-15",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
      milestones: ["إنهاء الـ 29 بنداً لكل مادة", "حل جميع الشيتات", "مراجعة بطاقات 3D"],
      doneMilestones: [0]
    },
    {
      id: "g3",
      title: "الوصول لأفضل فورمة رياضية وصحية",
      level: "أهداف شهرية",
      deadline: "2026-05-01",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
      milestones: ["الالتزام بـ 4 أيام تمرين أسبوعياً", "تحقيق هدف البروتين اليومي", "شرب 3 لتر مياه"],
      doneMilestones: [0]
    }
  ]);

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-bullseye gold-text"></i> لوحة الرؤية البصرية والأهداف (3D Vision Board & Life Goals)</h3>
        <small class="small-muted">ارفع صورتك الخاصة من جهازك لأي هدف وقسّم حلمك إلى محطات قابلة للتحقيق</small>
      </div>
      <div class="filters-row">
        <button type="button" id="btn-ai-goal-coach" class="btn btn-outline btn-sm"><i class="fa-solid fa-wand-magic-sparkles gold-text"></i> AI Goal Coach</button>
        <button type="button" id="btn-add-life-goal" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> إضافة هدف بصورة خاصة</button>
      </div>
    </div>

    <!-- مدخل خفي لتغيير صورة أي هدف حالي مباشرة من الجهاز -->
    <input type="file" id="hidden-goal-img-changer" accept="image/*" class="hidden" />

    <div class="items-grid">
      ${goals.map((g, gIdx) => {
        const totalM = Math.max(1, (g.milestones || []).length);
        const doneM = (g.doneMilestones || []).length;
        const pct = Math.round((doneM / totalM) * 100);
        return `
          <div class="visual-cover-card">
            <div class="visual-cover-img" style="background-image:url('${esc(g.img || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80")}');">
              <div class="flex-between" style="width:100%;">
                <span class="badge badge-gold">${esc(g.level)}</span>
                <div class="filters-row">
                  <button type="button" class="btn btn-xs btn-gold" data-change-goal-photo="${gIdx}" title="تغيير صورة هذا الهدف من جهازك">
                    <i class="fa-solid fa-camera"></i> تغيير الصورة
                  </button>
                  <span class="badge badge-emerald">${pct}% مكتمل</span>
                </div>
              </div>
            </div>
            <div class="visual-cover-body">
              <div>
                <h4>${esc(g.title)}</h4>
                <small class="small-muted">📅 الموعد المستهدف: ${esc(g.deadline || "-")}</small>
                <div class="progress-bar-track mt-1"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
              </div>
              <div>
                ${(g.milestones || []).map((m, mIdx) => {
                  const isDone = (g.doneMilestones || []).includes(mIdx);
                  return `
                    <label class="check-pill ${isDone ? "completed" : ""}" style="display:flex; margin-bottom:6px;">
                      <input type="checkbox" data-goal-idx="${gIdx}" data-mile-idx="${mIdx}" ${isDone ? "checked" : ""} />
                      <span>${esc(m)}</span>
                    </label>
                  `;
                }).join("")}
              </div>
              <div class="flex-between mt-2">
                <button type="button" class="btn btn-xs btn-outline" data-goal-to-task="${gIdx}"><i class="fa-solid fa-link gold-text"></i> ربط بالمهام</button>
                <button type="button" class="btn btn-xs btn-danger" data-del-goal-pro="${gIdx}"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  // تغيير صورة أي هدف حالي بضغطة زر من الكمبيوتر
  let targetGoalIdxForPhoto = null;
  const hiddenFileInp = sec.querySelector("#hidden-goal-img-changer");
  sec.querySelectorAll("[data-change-goal-photo]").forEach(btn => {
    btn.onclick = () => {
      targetGoalIdxForPhoto = Number(btn.dataset.changeGoalPhoto);
      hiddenFileInp.value = "";
      hiddenFileInp.click();
    };
  });

  hiddenFileInp.onchange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || targetGoalIdxForPhoto === null) return;
    const dataUrl = await compressGoalImageFile(file);
    if (goals[targetGoalIdxForPhoto]) {
      goals[targetGoalIdxForPhoto].img = dataUrl;
      OSProStore.set("goals_v3", goals);
      renderGoalsView();
      toast("تم تحديث صورة الهدف من جهازك بنجاح! 📸✨");
    }
  };

  // نافذة إضافة هدف جديد مع رفع صورة من الجهاز أو رابط أو ثيم جاهز
  sec.querySelector("#btn-add-life-goal").onclick = () => {
    let uploadedCustomDataUrl = "";

    B().openFormModal("🎯 إضافة هدف جديد في Vision Board (مع رفع صورتك الخاصة)", `
      <div class="form-group">
        <label>عنوان الهدف أو الطموح</label>
        <input name="title" required placeholder="مثال: إتقان الأمن السيبراني / شراء لابتوب جديد..." autofocus />
      </div>
      <div class="form-group">
        <label>المستوى الزمني</label>
        <select name="level">
          <option value="أهداف سنوية">أهداف سنوية</option>
          <option value="أهداف ربع سنوية">أهداف ربع سنوية</option>
          <option value="أهداف شهرية">أهداف شهرية</option>
          <option value="أهداف أسبوعية">أهداف أسبوعية</option>
        </select>
      </div>

      <div class="form-group">
        <label class="gold-text"><i class="fa-solid fa-camera"></i> 1. ارفع صورة خاصة للهدف من جهازك (اختياري):</label>
        <label class="goal-upload-zone d-block">
          <i class="fa-solid fa-cloud-arrow-up gold-text" style="font-size:1.5rem;"></i>
          <span id="goal-file-upload-lbl" class="d-block mt-1">اضغط هنا لاختيار صورة من كمبيوترك</span>
          <input type="file" id="modal-goal-file-inp" accept="image/*" class="hidden" />
        </label>
      </div>

      <div class="form-group">
        <label>2. أو الصق رابط صورة مباشر (اختياري):</label>
        <input type="url" name="customUrl" dir="ltr" placeholder="https://example.com/my-goal-image.jpg" />
      </div>

      <div class="form-group">
        <label>3. أو اختر من الثيمات الجاهزة المحترمة:</label>
        <select name="img">
          <option value="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80">💻 هندسة البرمجيات والكود</option>
          <option value="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80">🎓 التفوق الجامعي والأكاديمي</option>
          <option value="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80">🏋️‍♂️ معدات الجيم واللياقة</option>
          <option value="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80">💰 الحرية المالية والادخار</option>
          <option value="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=900&q=80">🕋 الحرم المكي والعمرة</option>
          <option value="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80">🛡️ الأمن السيبراني والشبكات</option>
        </select>
      </div>

      <div class="form-group"><label>الموعد النهائي</label><input type="date" name="deadline" value="${today()}" required /></div>
      <div class="form-group"><label>المحطات المرحلية (افصل بينها بفاصلة)</label><input name="milestones" required placeholder="المرحلة الأولى, المرحلة الثانية, المشروع النهائي" /></div>
    `, async (data) => {
      const finalImg = uploadedCustomDataUrl || (data.customUrl && data.customUrl.trim()) || data.img;
      goals.unshift({
        id: Date.now().toString(),
        title: data.title,
        level: data.level,
        img: finalImg,
        deadline: data.deadline,
        milestones: data.milestones.split(",").map(s => s.trim()).filter(Boolean),
        doneMilestones: []
      });
      OSProStore.set("goals_v3", goals);
      renderGoalsView();
      toast("تمت إضافة الهدف بصورتك المخصصة في Vision Board 🎯📸");
    });

    const fileInp = document.getElementById("modal-goal-file-inp");
    const fileLbl = document.getElementById("goal-file-upload-lbl");
    if (fileInp) {
      fileInp.onchange = async (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (fileLbl) fileLbl.textContent = `⏳ جاري تجهيز الصورة: ${f.name}...`;
        uploadedCustomDataUrl = await compressGoalImageFile(f);
        if (fileLbl) fileLbl.innerHTML = `<strong style="color:#19B889;">✅ تم تجهيز صورتك بنجاح: ${esc(f.name)}</strong>`;
      };
    }
  };

  sec.querySelector("#btn-ai-goal-coach").onclick = () => {
    B().openFormModal("🤖 AI Goal Coach — تحويل حلمك لخطة عمل", `
      <div class="form-group">
        <label>اكتب هدفك والمدة المتاحة:</label>
        <input name="prompt" required placeholder="مثال: عايز أتقن سايبر سيكيوريتي خلال 4 شهور..." />
      </div>
    `, async (data) => {
      toast("جاري تقسيم الهدف بواسطة الذكاء الاصطناعي... 🤖", "info");
      const reply = await B().askAI?.(`قسّم هذا الهدف إلى 4 مراحل عملية واضحة (Milestones) في سطور قصيرة: "${data.prompt}"`);
      const lines = reply.split("\n").map(l => l.replace(/^[-*0-9.)]+\s*/, "").trim()).filter(Boolean).slice(0, 4);
      const milestones = lines.length ? lines : ["التأسيس القوي", "التطبيق العملي", "مشروع متكامل", "الاحتراف"];
      goals.unshift({
        id: Date.now().toString(),
        title: data.prompt,
        level: "أهداف ربع سنوية",
        img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
        deadline: today(),
        milestones,
        doneMilestones: []
      });
      OSProStore.set("goals_v3", goals);
      renderGoalsView();
    });
  };

  sec.querySelectorAll("[data-goal-idx]").forEach(chk => {
    chk.onchange = () => {
      const g = goals[Number(chk.dataset.goalIdx)];
      const mIdx = Number(chk.dataset.mileIdx);
      if (!g) return;
      g.doneMilestones = g.doneMilestones || [];
      if (chk.checked) {
        if (!g.doneMilestones.includes(mIdx)) g.doneMilestones.push(mIdx);
      } else {
        g.doneMilestones = g.doneMilestones.filter(x => x !== mIdx);
      }
      OSProStore.set("goals_v3", goals);
      renderGoalsView();
    };
  });

  sec.querySelectorAll("[data-goal-to-task]").forEach(btn => {
    btn.onclick = async () => {
      const g = goals[Number(btn.dataset.goalToTask)];
      if (!g) return;
      await B().createRecord("tasks", {
        title: `تنفيذ مرحلة من هدف: ${g.title}`,
        description: (g.milestones || []).join(" | "),
        dueDate: g.deadline || today(),
        priority: "High",
        status: "Pending",
        category: "هدف"
      });
    };
  });

  sec.querySelectorAll("[data-del-goal-pro]").forEach(btn => {
    btn.onclick = () => {
      goals.splice(Number(btn.dataset.delGoalPro), 1);
      OSProStore.set("goals_v3", goals);
      renderGoalsView();
    };
  });
}

/* ============================================================================
   MODULE B: HABITS, MORNING/EVENING ROUTINES & DOPAMINE DETOX STUDIO
   ============================================================================ */
function renderHabitsView() {
  const sec = document.getElementById("view-habits");
  if (!sec) return;
  const habits = OSProStore.get("habits_v3", [
    { id: "h1", title: "صلاة الفجر في وقتها وأذكار الصباح", routine: "☀️ روتين الصباح", type: "build", streak: 12, history: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { id: "h2", title: "جلسة برمجة ومذاكرة عميقة (90 دقيقة)", routine: "☀️ روتين الصباح", type: "build", streak: 8, history: [1,2,3,4,5,6,7,8] },
    { id: "h3", title: "قراءة 20 صفحة وتخطيط الغد", routine: "🌙 روتين المساء", type: "build", streak: 6, history: [1,2,3,4,5,6] },
    { id: "h4", title: "ترك السهر وتصفح الـ Reels العشوائي (Detox)", routine: "🛡️ درع التعافي", type: "quit", streak: 9, history: [1,2,3,4,5,6,7,8,9] }
  ]);

  const currentDayNum = new Date().getDate();

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-fire-flame-curved gold-text"></i> استوديو العادات، روتين الصباح والمساء، ودرع الدوبامين</h3>
        <small class="small-muted">اضبط إيقاع يومك وتابع سلاسل الاستمرارية (Streaks) على مدار 30 يوماً</small>
      </div>
      <button type="button" id="btn-add-habit-pro" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> إضافة عادة أو روتين جديد</button>
    </div>

    <div class="items-grid">
      ${habits.map((h, hIdx) => {
        const pct = Math.min(100, Math.round(((h.history || []).length / 30) * 100));
        return `
          <div class="item-card" style="${h.type === "quit" ? "border-color:rgba(239,68,68,0.4)!important;" : ""}">
            <div>
              <div class="flex-between">
                <span class="badge ${h.type === "quit" ? "badge-danger" : "badge-emerald"}">${esc(h.routine)}</span>
                <span class="badge badge-gold">🔥 Streak: ${h.streak || 0} يوم</span>
              </div>
              <h4 class="mt-2">${esc(h.title)}</h4>
              <div class="subject-progress-box">
                <div class="flex-between"><small>التزام الشهر (30 يوماً)</small><strong class="gold-text">${pct}%</strong></div>
                <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
              </div>
              <div class="habit-month-dots">
                ${Array.from({ length: 15 }, (_, i) => {
                  const d = i + 1;
                  const done = (h.history || []).includes(d);
                  return `<span class="habit-day-dot ${done ? "done" : ""}" data-hab-idx="${hIdx}" data-day-num="${d}">${d}</span>`;
                }).join("")}
              </div>
            </div>
            <div class="flex-between mt-2">
              <button type="button" class="btn btn-xs btn-gold" data-hab-today="${hIdx}"><i class="fa-solid fa-check-double"></i> أتممتها اليوم (+1 Streak)</button>
              <button type="button" class="btn btn-xs btn-danger" data-del-hab="${hIdx}"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  sec.querySelector("#btn-add-habit-pro").onclick = () => {
    B().openFormModal("🔥 إضافة عادة جديدة أو درع تعافٍ", `
      <div class="form-group"><label>اسم العادة</label><input name="title" required placeholder="مثال: قراءة 20 صفحة / تمرين صباحي / ترك السكر..." /></div>
      <div class="form-group"><label>الفترة أو النوع</label>
        <select name="routine">
          <option value="☀️ روتين الصباح">☀️ روتين الصباح</option>
          <option value="🌙 روتين المساء">🌙 روتين المساء</option>
          <option value="⚡ عادة يومية">⚡ عادة يومية</option>
          <option value="🛡️ درع التعافي">🛡️ عادة سلبية أريد التخلص منها (Detox)</option>
        </select>
      </div>
    `, async (data) => {
      habits.unshift({
        id: Date.now().toString(),
        title: data.title,
        routine: data.routine,
        type: data.routine.includes("التعافي") ? "quit" : "build",
        streak: 1,
        history: [currentDayNum]
      });
      OSProStore.set("habits_v3", habits);
      renderHabitsView();
      toast("تمت إضافة العادة بنجاح 🔥");
    });
  };

  sec.querySelectorAll("[data-hab-idx]").forEach(dot => {
    dot.onclick = () => {
      const h = habits[Number(dot.dataset.habIdx)];
      const d = Number(dot.dataset.dayNum);
      if (!h) return;
      h.history = h.history || [];
      if (h.history.includes(d)) h.history = h.history.filter(x => x !== d);
      else h.history.push(d);
      h.streak = h.history.length;
      OSProStore.set("habits_v3", habits);
      renderHabitsView();
    };
  });

  sec.querySelectorAll("[data-hab-today]").forEach(btn => {
    btn.onclick = () => {
      const h = habits[Number(btn.dataset.habToday)];
      if (!h) return;
      h.streak = (Number(h.streak) || 0) + 1;
      h.history = h.history || [];
      if (!h.history.includes(currentDayNum)) h.history.push(currentDayNum);
      OSProStore.set("habits_v3", habits);
      renderHabitsView();
      toast(`عاش يا بطل! سلسلة التزام "${h.title}" وصلت إلى ${h.streak} يوم 🔥`);
    };
  });

  sec.querySelectorAll("[data-del-hab]").forEach(btn => {
    btn.onclick = () => {
      habits.splice(Number(btn.dataset.delHab), 1);
      OSProStore.set("habits_v3", habits);
      renderHabitsView();
    };
  });
}

/* ============================================================================
   MODULE D: TIME INTELLIGENCE & 24-HOUR CHRONO STUDIO
   ============================================================================ */
function renderTimeIntelView() {
  const sec = document.getElementById("view-time-intel");
  if (!sec) return;

  const logs = JSON.parse(localStorage.getItem("MY_LIFE_OS_FOCUS_LOG") || "[]");
  const focusMins = logs.filter(l => l.date === today()).reduce((s, l) => s + (Number(l.minutes) || 0), 0);

  const timeEntries = OSProStore.get("time_intel_v3", [
    { cat: "📚 الدراسة والجامعة", mins: Math.max(210, focusMins), color: "#D4A72C" },
    { cat: "💻 البرمجة والمشاريع", mins: 150, color: "#19B889" },
    { cat: "🏋️‍♂️ الجيم والرياضة", mins: 60, color: "#21C5C5" },
    { cat: "📖 القراءة والعبادة", mins: 60, color: "#3B82F6" },
    { cat: "☕ الترفيه والراحة", mins: 75, color: "#8B5CF6" },
    { cat: "⚠️ وقت ضائع / سوشيال ميديا", mins: 30, color: "#EF4444" }
  ]);

  const totalMins = Math.max(1, timeEntries.reduce((s, e) => s + Number(e.mins), 0));
  const wastedMins = timeEntries[5]?.mins || 0;
  const efficiencyPct = Math.round(((totalMins - wastedMins) / totalMins) * 100);

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-chart-gantt gold-text"></i> استوديو ذكاء وإدارة الوقت (24h Chrono-Analytics)</h3>
        <small class="small-muted">راقب أين تذهب ساعات عمرك اليومية وحلل كفاءة إنتاجيتك الفعلية</small>
      </div>
      <button type="button" id="btn-log-time-block" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> تسجيل نشاط زمني</button>
    </div>

    <div class="card mb-4" style="margin-bottom:18px;">
      <div class="flex-between">
        <h4>📊 البصمة الزمنية ليومك (إجمالي المسجل: ${(totalMins / 60).toFixed(1)} ساعة)</h4>
        <span class="badge ${efficiencyPct >= 85 ? "badge-emerald" : "badge-gold"}">كفاءة استثمار اليوم: ${efficiencyPct}%</span>
      </div>
      <div class="time-intel-bar">
        ${timeEntries.map(e => {
          const pct = Math.round((e.mins / totalMins) * 100);
          return `<div class="time-segment" style="width:${pct}%; background:${e.color};" title="${esc(e.cat)}: ${e.mins} د">${pct >= 9 ? pct + "%" : ""}</div>`;
        }).join("")}
      </div>
      <div class="kpi-grid mt-2">
        ${timeEntries.map((e, idx) => {
          const h = Math.floor(e.mins / 60);
          const m = e.mins % 60;
          return `
            <div class="subject-progress-box">
              <div class="flex-between">
                <strong style="color:${e.color}">${esc(e.cat)}</strong>
                <button type="button" class="btn btn-xs btn-outline" data-add-15m="${idx}">+30د</button>
              </div>
              <h4 class="mt-1">${h > 0 ? h + " ساعة و " : ""}${m} دقيقة</h4>
              <small class="small-muted">${Math.round((e.mins / totalMins) * 100)}% من يومك</small>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  sec.querySelector("#btn-log-time-block").onclick = () => {
    B().openFormModal("⏱️ تسجيل فترة زمنية في يومك", `
      <div class="form-group"><label>الفئة</label>
        <select name="catIdx">
          ${timeEntries.map((e, i) => `<option value="${i}">${esc(e.cat)}</option>`).join("")}
        </select>
      </div>
      <div class="form-group"><label>المدة بالدقائق</label><input type="number" name="mins" value="45" required /></div>
    `, async (data) => {
      const target = timeEntries[Number(data.catIdx)];
      if (target) target.mins = (Number(target.mins) || 0) + (Number(data.mins) || 0);
      OSProStore.set("time_intel_v3", timeEntries);
      renderTimeIntelView();
    });
  };

  sec.querySelectorAll("[data-add-15m]").forEach(btn => {
    btn.onclick = () => {
      const item = timeEntries[Number(btn.dataset.add15m)];
      if (item) item.mins += 30;
      OSProStore.set("time_intel_v3", timeEntries);
      renderTimeIntelView();
    };
  });
}

/* ============================================================================
   MODULE F: SECOND BRAIN (PARA METHOD + INTERACTIVE KNOWLEDGE GRAPH)
   ============================================================================ */
function renderSecondBrainView() {
  const sec = document.getElementById("view-second-brain");
  if (!sec) return;
  const state = B().getAppState?.() || { collections: { notes: [], subjects: [], projects: [] } };
  const notes = state.collections.notes || [];

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-network-wired gold-text"></i> العقل الثاني وشبكة المعرفة (Second Brain & PARA Graph)</h3>
        <small class="small-muted">اربط أفكارك، ملخصاتك، ومشاريعك في خريطة عصبية تفاعلية</small>
      </div>
      <div class="filters-row">
        <button type="button" id="btn-sb-ai-connect" class="btn btn-outline btn-sm"><i class="fa-solid fa-wand-magic-sparkles gold-text"></i> تلخيص وربط بالـ AI</button>
        <button type="button" id="btn-sb-new-thought" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> عقدة معرفة جديدة</button>
      </div>
    </div>

    <div class="card mb-4" style="margin-bottom:18px;">
      <div class="flex-between mb-1">
        <h4>🕸️ خريطة العقل الثاني الحية (Knowledge Graph)</h4>
        <span class="badge badge-gold">${notes.length} ملاحظات • ${(state.collections.subjects || []).length} مواد • ${(state.collections.projects || []).length} مشاريع</span>
      </div>
      <canvas id="sb-knowledge-canvas" class="knowledge-graph-canvas"></canvas>
    </div>

    <div id="sb-ai-summary-box" class="subject-progress-box hidden mb-2"></div>

    <div class="items-grid">
      ${notes.map(n => `
        <div class="item-card">
          <div>
            <span class="badge badge-gold">${esc(n.category || "Second Brain")}</span>
            <h4 class="mt-2">${esc(n.title)}</h4>
            <p class="small-muted mt-1">${esc(n.content)}</p>
          </div>
          <div class="flex-between mt-2">
            <button type="button" class="btn btn-xs btn-gold" data-note-to-task="${n.id}"><i class="fa-solid fa-list-check"></i> حول لمهمة</button>
            <small class="small-muted">#${esc(n.tags || "معرفة")}</small>
          </div>
        </div>
      `).join("") || `<p class="small-muted">أضف ملاحظاتك لتظهر كعقد مترابطة في شبكة المعرفة.</p>`}
    </div>
  `;

  drawInteractiveKnowledgeGraph(notes, state.collections.subjects || [], state.collections.projects || []);

  sec.querySelector("#btn-sb-new-thought").onclick = () => document.getElementById("btn-add-note")?.click();

  sec.querySelector("#btn-sb-ai-connect").onclick = async () => {
    const box = document.getElementById("sb-ai-summary-box");
    box.classList.remove("hidden");
    box.textContent = "⏳ جاري تحليل جميع ملاحظاتك واستخراج الروابط المعرفية بينها...";
    const titles = notes.map(n => n.title).join("، ") || "هندسة البرمجيات والدوائر المنطقية";
    const reply = await B().askAI?.(`لدي في عقلي الثاني الملاحظات التالية: (${titles}). لخص الروابط المعرفية بينها واقترح فكرة تطبيقية تجمعها.`);
    box.innerHTML = `<strong class="gold-text">🧠 خلاصة العقل الثاني بالـ AI:</strong><p class="mt-1" style="white-space:pre-line">${esc(reply)}</p>`;
  };

  sec.querySelectorAll("[data-note-to-task]").forEach(btn => {
    btn.onclick = async () => {
      const note = notes.find(x => x.id === btn.dataset.noteToTask);
      if (!note) return;
      await B().createRecord("tasks", {
        title: `تطبيق ملاحظة: ${note.title}`,
        description: note.content,
        dueDate: today(),
        priority: "High",
        status: "Pending",
        category: "Second Brain"
      });
    };
  });
}

function drawInteractiveKnowledgeGraph(notes, subjects, projects) {
  const canvas = document.getElementById("sb-knowledge-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.clientWidth || 860;
  canvas.height = 340;

  const nodes = [
    { label: "🧠 العقل الثاني", x: canvas.width / 2, y: 170, r: 22, color: "#D4A72C" },
    ...subjects.slice(0, 4).map((s, i) => ({ label: `📚 ${s.name}`, x: 150 + i * 170, y: 70, r: 15, color: "#19B889" })),
    ...projects.slice(0, 4).map((p, i) => ({ label: `💻 ${p.title}`, x: 170 + i * 170, y: 270, r: 15, color: "#21C5C5" })),
    ...notes.slice(0, 6).map((n, i) => ({ label: `💡 ${n.title.slice(0, 18)}`, x: 110 + i * 130, y: i % 2 === 0 ? 130 : 215, r: 13, color: "#8B5CF6" }))
  ];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach((nd, i) => {
    if (i === 0) return;
    ctx.strokeStyle = "rgba(212, 167, 44, 0.28)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    ctx.lineTo(nd.x, nd.y);
    ctx.stroke();
  });

  nodes.forEach(nd => {
    ctx.fillStyle = nd.color;
    ctx.beginPath();
    ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 12px Alexandria, Cairo, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(nd.label, nd.x, nd.y + nd.r + 16);
  });
}

/* ============================================================================
   MODULE G: 3D VISUAL BOOKSHELF & LEARNING ACADEMY
   ============================================================================ */
function renderLearningCenterView() {
  const sec = document.getElementById("view-learning-center");
  if (!sec) return;
  const items = OSProStore.get("learning_items_v3", [
    {
      id: "c1",
      title: "Clean Code — Robert C. Martin",
      type: "Book",
      totalUnits: 460,
      doneUnits: 210,
      dailyRate: 20,
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "c2",
      title: "Full-Stack Web & Cybersecurity Bootcamp",
      type: "Course",
      totalUnits: 40,
      doneUnits: 26,
      dailyRate: 2,
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
    }
  ]);

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-book-open-reader gold-text"></i> مكتبة الكتب والكورسات ثلاثية الأبعاد (3D Learning Shelf)</h3>
        <small class="small-muted">تتبع الصفحات والدروس، واحسب موعد الختم المتوقع، ووزع أي كورس على تقويمك</small>
      </div>
      <button type="button" id="btn-add-learning-item" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> إضافة كتاب أو كورس</button>
    </div>

    <div class="items-grid">
      ${items.map((it, idx) => {
        const pct = Math.min(100, Math.round((it.doneUnits / Math.max(1, it.totalUnits)) * 100));
        const rem = Math.max(0, it.totalUnits - it.doneUnits);
        const daysToFinish = Math.ceil(rem / Math.max(1, it.dailyRate || 10));
        return `
          <div class="visual-cover-card">
            <div class="visual-cover-img" style="background-image:url('${esc(it.img || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80")}');">
              <div class="flex-between" style="width:100%;">
                <span class="badge badge-gold">${it.type === "Book" ? "📖 كتاب" : "🎓 كورس تدريبي"}</span>
                <span class="badge badge-emerald">${pct}%</span>
              </div>
            </div>
            <div class="visual-cover-body">
              <div>
                <h4>${esc(it.title)}</h4>
                <small class="small-muted d-block mt-1">المنجز: <strong>${it.doneUnits}</strong> من <strong>${it.totalUnits}</strong> ${it.type === "Book" ? "صفحة" : "درس"}</small>
                <small class="gold-text d-block">⏳ تنتهي منه خلال: <strong>${rem === 0 ? "مكتمل! 🎉" : daysToFinish + " يوم"}</strong></small>
                <div class="progress-bar-track mt-1"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
              </div>
              <div class="flex-between mt-2">
                <button type="button" class="btn btn-xs btn-gold" data-inc-learn="${idx}">+ تسجيل قراءة/درس</button>
                <button type="button" class="btn btn-xs btn-outline" data-course-to-cal="${idx}"><i class="fa-regular fa-calendar-plus gold-text"></i> جدول بالتقويم</button>
                <button type="button" class="btn btn-xs btn-danger" data-del-learn="${idx}"><i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  sec.querySelector("#btn-add-learning-item").onclick = () => {
    B().openFormModal("🎓 إضافة كتاب أو كورس جديد للمكتبة", `
      <div class="form-group"><label>اسم الكتاب أو الكورس</label><input name="title" required /></div>
      <div class="form-group"><label>النوع</label><select name="type"><option value="Book">📖 كتاب</option><option value="Course">🎓 كورس تدريبي</option></select></div>
      <div class="form-group"><label>إجمالي الصفحات أو الدروس</label><input type="number" name="totalUnits" value="300" required /></div>
      <div class="form-group"><label>المنجز حالياً</label><input type="number" name="doneUnits" value="0" required /></div>
      <div class="form-group"><label>معدلك اليومي (كم صفحة أو درس يومياً؟)</label><input type="number" name="dailyRate" value="20" required /></div>
    `, async (data) => {
      items.unshift({
        id: Date.now().toString(),
        title: data.title,
        type: data.type,
        totalUnits: Number(data.totalUnits) || 100,
        doneUnits: Number(data.doneUnits) || 0,
        dailyRate: Number(data.dailyRate) || 10,
        img: data.type === "Book"
          ? "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
          : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
      });
      OSProStore.set("learning_items_v3", items);
      renderLearningCenterView();
    });
  };

  sec.querySelectorAll("[data-inc-learn]").forEach(btn => {
    btn.onclick = () => {
      const it = items[Number(btn.dataset.incLearn)];
      if (!it) return;
      it.doneUnits = Math.min(it.totalUnits, (Number(it.doneUnits) || 0) + (Number(it.dailyRate) || 1));
      OSProStore.set("learning_items_v3", items);
      renderLearningCenterView();
      toast(`عاش! تم تحديث تقدمك في "${it.title}" 📚`);
    };
  });

  sec.querySelectorAll("[data-course-to-cal]").forEach(btn => {
    btn.onclick = async () => {
      const it = items[Number(btn.dataset.courseToCal)];
      if (!it) return;
      await B().createRecord("tasks", {
        title: `دراسة ورد من: ${it.title}`,
        description: `التقدم الحالي: ${it.doneUnits}/${it.totalUnits}`,
        dueDate: today(),
        priority: "High",
        status: "Pending",
        category: "تعلم"
      });
      toast("تمت جدولة الكتاب/الكورس في مهام اليوم! 📅✅");
    };
  });

  sec.querySelectorAll("[data-del-learn]").forEach(btn => {
    btn.onclick = () => {
      items.splice(Number(btn.dataset.delLearn), 1);
      OSProStore.set("learning_items_v3", items);
      renderLearningCenterView();
    };
  });
}

/* ============================================================================
   MODULE E: WORLD BUCKET LIST, TRAVEL & EXPERIENCES PASSPORT (WITH PHOTOS)
   ============================================================================ */
function renderExperiencesView() {
  const sec = document.getElementById("view-experiences");
  if (!sec) return;
  const list = OSProStore.get("experiences_v3", [
    {
      title: "أداء العمرة وزيارة الحرمين الشريفين",
      cat: "رحلة روحانية 🕋",
      status: "قائمة الأمنيات 🌟",
      budget: "35,000 EGP",
      img: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=900&q=80",
      note: "هدف بإذن الله بعد التخرج"
    },
    {
      title: "رحلة استكشافية للنوبة وأسوان والأقصر",
      cat: "سفر واستكشاف ✈️",
      status: "قائمة الأمنيات 🌟",
      budget: "8,000 EGP",
      img: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=900&q=80",
      note: "في إجازة الشتاء مع الأصدقاء"
    },
    {
      title: "إطلاق منصة MY LIFE OS لمستخدمين حقيقيين",
      cat: "إنجاز تقني 🚀",
      status: "تم التحقيق ✅",
      budget: "0 EGP",
      img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
      note: "مشروع العمر الهندسي"
    }
  ]);

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-earth-americas gold-text"></i> جواز سفر الأحلام والتجارب والرحلات (Visual Bucket List)</h3>
        <small class="small-muted">وثّق الأماكن التي تطمح لزيارتها والتجارب التي تريد خوضها بالصور والميزانية</small>
      </div>
      <button type="button" id="btn-add-exp" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> إضافة وجهة أو تجربة</button>
    </div>

    <div class="items-grid">
      ${list.map((ex, i) => `
        <div class="visual-cover-card">
          <div class="visual-cover-img" style="background-image:url('${esc(ex.img || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80")}');">
            <div class="flex-between" style="width:100%;">
              <span class="badge badge-gold">${esc(ex.cat)}</span>
              <span class="badge ${ex.status.includes("تم") ? "badge-emerald" : "badge-warning"}">${esc(ex.status)}</span>
            </div>
          </div>
          <div class="visual-cover-body">
            <div>
              <h4>${esc(ex.title)}</h4>
              <small class="gold-text d-block mt-1">💰 الميزانية التقديرية: ${esc(ex.budget || "غير محددة")}</small>
              <p class="small-muted mt-1">${esc(ex.note || "")}</p>
            </div>
            <div class="flex-between mt-2">
              <button type="button" class="btn btn-xs btn-gold" data-toggle-exp="${i}">تبديل الحالة ✅</button>
              <button type="button" class="btn btn-xs btn-danger" data-del-exp="${i}"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  sec.querySelector("#btn-add-exp").onclick = () => {
    B().openFormModal("🌍 إضافة حلم أو وجهة سفر جديدة", `
      <div class="form-group"><label>اسم الوجهة أو التجربة</label><input name="title" required /></div>
      <div class="form-group"><label>الفئة</label>
        <select name="cat"><option value="سفر واستكشاف ✈️">سفر واستكشاف ✈️</option><option value="رحلة روحانية 🕋">رحلة روحانية 🕋</option><option value="إنجاز تقني 🚀">إنجاز تقني 🚀</option><option value="مغامرة وتجربة 🌟">مغامرة وتجربة 🌟</option></select>
      </div>
      <div class="form-group"><label>الميزانية التقديرية</label><input name="budget" placeholder="10,000 EGP" /></div>
      <div class="form-group"><label>ملاحظات أو ذكريات</label><input name="note" /></div>
    `, async (d) => {
      list.unshift({
        ...d,
        status: "قائمة الأمنيات 🌟",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
      });
      OSProStore.set("experiences_v3", list);
      renderExperiencesView();
    });
  };

  sec.querySelectorAll("[data-toggle-exp]").forEach(b => {
    b.onclick = () => {
      const it = list[Number(b.dataset.toggleExp)];
      if (it) it.status = it.status.includes("تم") ? "قائمة الأمنيات 🌟" : "تم التحقيق ✅";
      OSProStore.set("experiences_v3", list);
      renderExperiencesView();
    };
  });

  sec.querySelectorAll("[data-del-exp]").forEach(b => {
    b.onclick = () => { list.splice(Number(b.dataset.delExp), 1); OSProStore.set("experiences_v3", list); renderExperiencesView(); };
  });
}

/* ============================================================================
   MODULE H: VIP CONTACTS & PERSONAL CRM STUDIO
   ============================================================================ */
function renderContactsView() {
  const sec = document.getElementById("view-contacts");
  if (!sec) return;
  const contacts = OSProStore.get("contacts_crm_v3", [
    { name: "فريق مشروع التخرج والكلية", role: "زملاء دراسة وعمل 💻", circle: "الجامعة", date: today(), note: "اجتماع أسبوعي لمراجعة الكود وتوزيع المهام" },
    { name: "أساتذة ومعيدو قسم الهندسة", role: "إشراف أكاديمي 🎓", circle: "شبكة مهنية", date: today(), note: "مراجعة تسليمات Logic Design و Modern Workshop" }
  ]);

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-address-book gold-text"></i> إدارة العلاقات والشبكة المهنية (VIP Personal CRM)</h3>
        <small class="small-muted">حافظ على تواصلك مع الأشخاص المهمين، الأساتذة، وزملاء المشاريع</small>
      </div>
      <button type="button" id="btn-add-contact" class="btn btn-gold btn-sm"><i class="fa-solid fa-user-plus"></i> إضافة شخص مهم</button>
    </div>
    <div class="items-grid">
      ${contacts.map((c, i) => `
        <div class="item-card">
          <div>
            <div class="flex-between">
              <span class="badge badge-gold">${esc(c.role)}</span>
              <span class="badge badge-emerald">${esc(c.circle || "شبكة مهنية")}</span>
            </div>
            <div style="display:flex; align-items:center; gap:12px; margin-top:12px;">
              <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=D4A72C&color=090D19&bold=true" style="width:48px; height:48px; border-radius:50%;" alt="Avatar" />
              <div>
                <h4>${esc(c.name)}</h4>
                <small class="small-muted">📅 آخر تواصل / موعد: ${esc(c.date)}</small>
              </div>
            </div>
            <p class="small-muted mt-2">${esc(c.note)}</p>
          </div>
          <div class="flex-between mt-2">
            <button type="button" class="btn btn-xs btn-outline" data-ping-cnt="${i}"><i class="fa-solid fa-check gold-text"></i> سجّل تواصل اليوم</button>
            <button type="button" class="btn btn-xs btn-danger" data-del-cnt="${i}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  sec.querySelector("#btn-add-contact").onclick = () => {
    B().openFormModal("🤝 إضافة شخص في شبكتك", `
      <div class="form-group"><label>الاسم</label><input name="name" required /></div>
      <div class="form-group"><label>الدور أو العلاقة</label><input name="role" required placeholder="مهندس / أستاذ جامعي / صديق مقرب..." /></div>
      <div class="form-group"><label>الدائرة</label><select name="circle"><option value="شبكة مهنية">شبكة مهنية</option><option value="الجامعة">الجامعة</option><option value="العائلة">العائلة</option><option value="أصدقاء">أصدقاء</option></select></div>
      <div class="form-group"><label>ملاحظات</label><textarea name="note" rows="2"></textarea></div>
    `, async (d) => {
      contacts.unshift({ ...d, date: today() });
      OSProStore.set("contacts_crm_v3", contacts);
      renderContactsView();
    });
  };

  sec.querySelectorAll("[data-ping-cnt]").forEach(b => {
    b.onclick = () => {
      const c = contacts[Number(b.dataset.pingCnt)];
      if (c) c.date = today();
      OSProStore.set("contacts_crm_v3", contacts);
      renderContactsView();
      toast("تم تحديث تاريخ التواصل لليوم 🤝");
    };
  });

  sec.querySelectorAll("[data-del-cnt]").forEach(b => {
    b.onclick = () => { contacts.splice(Number(b.dataset.delCnt), 1); OSProStore.set("contacts_crm_v3", contacts); renderContactsView(); };
  });
}

/* ============================================================================
   MODULE J: DAILY JOURNAL, MOOD STUDIO & AUTOMATION RECIPES
   ============================================================================ */
function renderJournalView() {
  const sec = document.getElementById("view-journal");
  if (!sec) return;
  const journals = OSProStore.get("journals_v3", [
    { date: today(), mood: "🔥 حماسي وعالي التركيز", energy: 92, title: "تطوير منظومة الجيم 3D ومسارات البرمجة", content: "الحمد لله تم إنجاز تحديثات ضخمة في النظام مع ضبط خطة التمرين والمذاكرة." }
  ]);

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-book-journal-whills gold-text"></i> استوديو اليوميات، الحالة المزاجية، ومركز الأتمتة</h3>
        <small class="small-muted">وثّق يومياتك ومشاعرك وتابع قواعد الأتمتة الذكية في نظامك</small>
      </div>
      <div class="filters-row">
        <button type="button" id="btn-export-ics" class="btn btn-outline btn-sm"><i class="fa-regular fa-calendar-check gold-text"></i> تصدير التقويم (.ICS)</button>
        <button type="button" id="btn-add-journal" class="btn btn-gold btn-sm"><i class="fa-solid fa-pen-fancy"></i> تدوينة يومية جديدة</button>
      </div>
    </div>

    <div class="items-grid">
      ${journals.map((j, i) => `
        <div class="item-card">
          <div>
            <div class="flex-between">
              <span class="badge badge-gold">${esc(j.mood)}</span>
              <span class="badge badge-emerald">⚡ طاقة اليوم: ${j.energy || 85}%</span>
            </div>
            <h4 class="mt-2">${esc(j.title)}</h4>
            <small class="small-muted d-block">${esc(j.date)}</small>
            <p class="small-muted mt-2">${esc(j.content)}</p>
          </div>
          <button type="button" class="btn btn-xs btn-danger mt-2" data-del-jrn="${i}"><i class="fa-solid fa-trash"></i> حذف</button>
        </div>
      `).join("")}
    </div>
  `;

  sec.querySelector("#btn-add-journal").onclick = () => {
    B().openFormModal("📔 تدوينة يومية ومراجعة ذاتية", `
      <div class="form-group"><label>الحالة المزاجية اليوم</label>
        <select name="mood">
          <option value="🔥 حماسي وعالي التركيز">🔥 حماسي وعالي التركيز</option>
          <option value="😊 هادئ وممتن لله">😊 هادئ وممتن لله</option>
          <option value="🏆 يوم إنجاز عظيم">🏆 يوم إنجاز عظيم</option>
          <option value="☕ يوم هادئ للاستشفاء">☕ يوم هادئ للاستشفاء</option>
        </select>
      </div>
      <div class="form-group"><label>نسبة طاقتك اليوم (%)</label><input type="number" name="energy" min="10" max="100" value="90" required /></div>
      <div class="form-group"><label>عنوان اليوم أو أبرز حدث</label><input name="title" required /></div>
      <div class="form-group"><label>تفاصيل اليوم والخواطر</label><textarea name="content" rows="4" required></textarea></div>
    `, async (d) => {
      journals.unshift({ ...d, date: today() });
      OSProStore.set("journals_v3", journals);
      renderJournalView();
    });
  };

  sec.querySelector("#btn-export-ics").onclick = () => {
    const events = B().getAppState?.()?.collections?.events || [];
    let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//MY LIFE OS//AR\n";
    events.forEach(ev => {
      const dt = (ev.date || today()).replace(/-/g, "");
      ics += `BEGIN:VEVENT\nSUMMARY:${ev.title}\nDTSTART;VALUE=DATE:${dt}\nEND:VEVENT\n`;
    });
    ics += "END:VCALENDAR";
    const blob = new Blob([ics], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `my-life-os-calendar-${today()}.ics`;
    a.click();
    toast("تم تصدير ملف التقويم القياسي (.ICS) بنجاح! 📅");
  };

  sec.querySelectorAll("[data-del-jrn]").forEach(b => {
    b.onclick = () => { journals.splice(Number(b.dataset.delJrn), 1); OSProStore.set("journals_v3", journals); renderJournalView(); };
  });
}

/* --- MODULE I: UPGRADE PROJECTS WITH GANTT CHART & MILESTONES --- */
function upgradeExistingProjectsToolbar() {
  const toolbar = document.querySelector("#view-projects .section-toolbar .filters-row");
  if (!toolbar || document.getElementById("btn-projects-gantt")) return;

  const ganttBtn = document.createElement("button");
  ganttBtn.type = "button";
  ganttBtn.id = "btn-projects-gantt";
  ganttBtn.className = "btn btn-outline btn-sm";
  ganttBtn.innerHTML = `<i class="fa-solid fa-chart-gantt gold-text"></i> مخطط Gantt & Milestones`;
  ganttBtn.onclick = () => {
    const projects = B().getAppState?.()?.collections?.projects || [];
    const rowsHtml = projects.length
      ? projects.map(p => `
          <div class="subject-progress-box mb-2">
            <div class="flex-between">
              <strong>💻 ${esc(p.title)} (${esc(p.techStack || "Full-Stack")})</strong>
              <span class="badge badge-gold">${Number(p.progress) || 0}%</span>
            </div>
            <div class="progress-bar-track mt-1"><div class="progress-bar-fill" style="width:${Number(p.progress) || 0}%"></div></div>
          </div>
        `).join("")
      : `<p class="small-muted">أضف مشروعاً برمجياً لعرض مخطط جانت الزمني.</p>`;

    B().openFormModal("📊 مخطط جانت الزمني ومحطات المشاريع (Gantt & Milestones)", rowsHtml, async () => {});
    const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
    if (saveBtn) saveBtn.style.display = "none";
  };
  toolbar.prepend(ganttBtn);
}

/* ============================================================================
   5. SYSTEM SYNERGY LISTENERS (AUTO-LINKING UNIVERSITY EXAMS TO CALENDAR)
   ============================================================================ */
function initSystemSynergy() {
  document.addEventListener("submit", async (e) => {
    if (e.target.id !== "universal-modal-form") return;
    const modalTitle = document.getElementById("modal-title")?.textContent || "";
    if (modalTitle.includes("إضافة محاضرة / واجب / درجة")) {
      const fd = new FormData(e.target);
      const itemType = fd.get("itemType");
      const title = fd.get("title");
      const subjectName = fd.get("subjectName");
      if ((itemType === "امتحان" || itemType === "واجب") && title) {
        setTimeout(async () => {
          await B().createRecord?.("events", {
            title: `${itemType}: ${title} (${subjectName || ""})`,
            date: today(),
            time: "09:00",
            type: "Exam"
          });
          toast("🔗 ترابط ذكي: تم إدراج الامتحان/الواجب تلقائياً في تقويمك!", "info");
        }, 600);
      }
    }
  });
}

function bootOSProV3() {
  initThemeAndSidebarSystem();
  injectProModulesIntoDOM();
  initTimestampFocusPersistence();
  initSystemSynergy();
}

/* ============================================================================
   MY LIFE OS — V6 MEGA EXPANSION PACK (APPEND-ONLY • ZERO DELETION)
   1. Live Co-Study & Shared Whiteboard Room (Real-Time Firestore Sync)
   2. Encrypted Developer Vault (Web Crypto API AES-256-GCM + PBKDF2)
   3. Topbar Smart OCR Scanner (Extract Lecture Text & Code from Images)
   4. Topbar Multi-Clipboard History (Auto-Captures Last 15 Copies + Pinning)
   5. Topbar Mini Prayer Radar (Live Countdown + Gentle Adhan Chime)
   6. Floating Video Teleprompter (Auto-Scrolling Script Overlay Over Whiteboard)
   7. 1-Click Images to PDF Converter (Instant Multi-Image Homework PDF Builder)
   ============================================================================ */

const V6ExpansionState = {
  clipboardHistory: OSProStore.get("multi_clipboard_v6", []),
  vaultUnlockedKey: null,
  vaultMasterPass: "",
  activeRoomCode: localStorage.getItem("MY_LIFE_OS_COSTUDY_ROOM") || "",
  roomUnsub: null,
  isApplyingRemoteWB: false,
  teleprompterScrolling: false,
  teleprompterTimer: null,
  teleprompterSpeed: 2,
  lastAdhanNotifiedKey: ""
};

function injectV6ExpansionStyles() {
  if (document.getElementById("os-v6-expansion-styles")) return;
  const st = document.createElement("style");
  st.id = "os-v6-expansion-styles";
  st.textContent = `
    .prayer-radar-pill {
      background: linear-gradient(135deg, rgba(212, 167, 44, 0.16), rgba(25, 184, 137, 0.12)) !important;
      border: 1px solid rgba(212, 167, 44, 0.45) !important;
    }
    .costudy-live-pill {
      background: rgba(25, 184, 137, 0.2) !important;
      border: 1px solid #19B889 !important;
      color: #19B889 !important;
      box-shadow: 0 0 14px rgba(25, 184, 137, 0.3);
    }

    /* النافذة العائمة للملقن الذكي (Floating Teleprompter) فوق السبورة */
    .os-floating-teleprompter {
      position: fixed;
      top: 90px;
      left: 30px;
      width: 350px;
      background: rgba(8, 12, 22, 0.84);
      border: 1.5px solid var(--gold-primary);
      border-radius: 18px;
      backdrop-filter: blur(12px);
      z-index: 1000005;
      box-shadow: 0 22px 50px rgba(0, 0, 0, 0.85);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: opacity 0.2s ease;
    }
    .teleprompter-header {
      background: rgba(18, 25, 43, 0.95);
      padding: 8px 12px;
      cursor: move;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(212, 167, 44, 0.25);
    }
    .teleprompter-body {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .teleprompter-script-area {
      width: 100%;
      height: 165px;
      background: rgba(5, 8, 15, 0.75) !important;
      color: #f8fafc !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 1.05rem;
      line-height: 1.85;
      font-weight: 700;
      resize: vertical;
      overflow-y: auto;
    }

    /* بطاقات خزنة المطور المشفرة AES-256 */
    .vault-secret-card {
      background: linear-gradient(160deg, rgba(16, 23, 40, 0.96), rgba(9, 13, 24, 0.99));
      border: 1px solid rgba(212, 167, 44, 0.35);
      border-radius: 16px;
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
    }
    .vault-cipher-box {
      background: rgba(0, 0, 0, 0.45);
      border: 1px dashed rgba(33, 197, 197, 0.35);
      border-radius: 10px;
      padding: 8px 12px;
      font-family: 'Inter', monospace;
      font-size: 0.84rem;
      color: #67e8f9;
      word-break: break-all;
      direction: ltr;
      text-align: left;
    }
    .pdf-img-preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 10px;
      margin-top: 10px;
      max-height: 220px;
      overflow-y: auto;
    }
    .pdf-img-thumb {
      height: 95px;
      border-radius: 10px;
      border: 1.5px solid var(--gold-primary);
      background-size: cover;
      background-position: center;
      position: relative;
    }
  `;
  document.head.appendChild(st);
}

/* ============================================================================
   HELPER: SAFE CLIPBOARD COPY (BYPASSES ANTI-COPY GUARD FOR AUTHORIZED BUTTONS)
   ============================================================================ */
async function copyTextSafely(text, successMsg = "تم النسخ إلى الحافظة بنجاح 📋✅") {
  try {
    await navigator.clipboard.writeText(text);
    addClipToMultiHistory(text);
    toast(successMsg);
  } catch (e) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    addClipToMultiHistory(text);
    toast(successMsg);
  }
}

/* ============================================================================
   1. MINI PRAYER RADAR IN TOPBAR (LIVE COUNTDOWN & GENTLE ADHAN CHIME)
   ============================================================================ */
function updateTopbarPrayerRadar() {
  const pill = document.getElementById("btn-top-prayer-radar");
  if (!pill) return;

  const now = new Date();
  const curMins = now.getHours() * 60 + now.getMinutes();
  const schedule = [
    { key: "fajr", name: "الفجر", h: 4, m: 43 },
    { key: "dhuhr", name: "الظهر", h: 11, m: 39 },
    { key: "asr", name: "العصر", h: 14, m: 44 },
    { key: "maghrib", name: "المغرب", h: 17, m: 9 },
    { key: "isha", name: "العشاء", h: 18, m: 28 }
  ];

  let nextP = schedule.find(p => (p.h * 60 + p.m) > curMins);
  if (!nextP) {
    nextP = { ...schedule[0], totalMins: (schedule[0].h + 24) * 60 + schedule[0].m };
  } else {
    nextP = { ...nextP, totalMins: nextP.h * 60 + nextP.m };
  }

  const diff = nextP.totalMins - curMins;
  const remH = Math.floor(diff / 60);
  const remM = diff % 60;

  pill.innerHTML = `
    <i class="fa-solid fa-mosque gold-text"></i>
    <span>${nextP.name}: ${remH > 0 ? remH + "س " : ""}${remM}د</span>
  `;

  // تنبيه صوتي روحاني هادئ عند دخول وقت الصلاة تماماً
  const nowKey = `${today()}_${nextP.key}`;
  if (diff === 1 && V6ExpansionState.lastAdhanNotifiedKey !== nowKey) {
    V6ExpansionState.lastAdhanNotifiedKey = nowKey;
    playGentleAdhanChime();
    toast(`🕌 اقترب الآن موعد أذان ${nextP.name} — تقبل الله طاعتكم`, "info");
  }
}

function playGentleAdhanChime() {
  try {
    const ctx = B().getAudioContext?.();
    if (!ctx) return;
    [528, 660, 792].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.28);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.28);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.28 + 0.9);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.28);
      osc.stop(ctx.currentTime + idx * 0.28 + 0.9);
    });
  } catch (e) {}
}

/* ============================================================================
   2. MULTI-CLIPBOARD HISTORY MANAGER (CAPTURES LAST 15 COPIES)
   ============================================================================ */
function addClipToMultiHistory(rawText) {
  const txt = String(rawText || "").trim();
  if (!txt || txt.length < 2) return;
  let list = V6ExpansionState.clipboardHistory || [];
  list = list.filter(item => item.text !== txt);

  const isCode = /[{}();=<>]|function|const |let |import |SELECT /i.test(txt);
  const isUrl = /^https?:\/\//i.test(txt);
  const tag = isUrl ? "🔗 رابط" : isCode ? "💻 كود" : "📝 نص";

  list.unshift({
    id: Date.now().toString(),
    text: txt.slice(0, 1500),
    tag,
    time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
  });
  V6ExpansionState.clipboardHistory = list.slice(0, 15);
  OSProStore.set("multi_clipboard_v6", V6ExpansionState.clipboardHistory);
}

function openMultiClipboardModal() {
  const list = V6ExpansionState.clipboardHistory || [];
  const rowsHtml = list.length
    ? list.map((item, idx) => `
        <div class="prayer-row" style="align-items:flex-start; gap:10px;">
          <div style="flex:1; overflow:hidden;">
            <div class="flex-between">
              <span class="badge badge-gold">${esc(item.tag)}</span>
              <small class="small-muted">${esc(item.time)}</small>
            </div>
            <pre dir="auto" style="margin-top:6px; white-space:pre-wrap; word-break:break-word; font-size:0.82rem; max-height:85px; overflow-y:auto; background:rgba(0,0,0,0.3); padding:6px 10px; border-radius:8px;">${esc(item.text)}</pre>
          </div>
          <div class="config-actions" style="flex-direction:column;">
            <button type="button" class="btn btn-xs btn-gold" data-clip-copy="${idx}"><i class="fa-regular fa-copy"></i> نسخ</button>
            <button type="button" class="btn btn-xs btn-outline" data-clip-to-note="${idx}" title="حفظ في الملاحظات"><i class="fa-regular fa-note-sticky"></i></button>
            <button type="button" class="btn btn-xs btn-danger" data-clip-del="${idx}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `).join("")
    : `<p class="small-muted text-center py-2">الحافظة الذكية فارغة حالياً. أضف أي نص أو كود أو رابط بالأسفل للرجوع إليه في أي وقت!</p>`;

  B().openFormModal("📋 الحافظة الذكية المتعددة (Multi-Clipboard History)", `
    <div class="input-action-row mb-2">
      <input type="text" id="manual-clip-inp" placeholder="الصق أو اكتب أي كود أو نص أو رابط لحفظه في الحافظة السريعة..." autofocus />
      <button type="button" id="btn-add-manual-clip" class="btn btn-gold btn-sm">+ حفظ في الحافظة</button>
      <button type="button" id="btn-clear-all-clips" class="btn btn-danger btn-sm">مسح الكل</button>
    </div>
    <div style="max-height:360px; overflow-y:auto;">${rowsHtml}</div>
  `, async () => {});

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  document.getElementById("btn-add-manual-clip").onclick = () => {
    const val = document.getElementById("manual-clip-inp")?.value.trim();
    if (!val) return;
    addClipToMultiHistory(val);
    openMultiClipboardModal();
    toast("تم حفظ العنصر في الحافظة الذكية 📋");
  };

  document.getElementById("btn-clear-all-clips").onclick = () => {
    V6ExpansionState.clipboardHistory = [];
    OSProStore.set("multi_clipboard_v6", []);
    openMultiClipboardModal();
  };

  document.querySelectorAll("[data-clip-copy]").forEach(btn => {
    btn.onclick = () => {
      const item = list[Number(btn.dataset.clipCopy)];
      if (item) copyTextSafely(item.text);
    };
  });

  document.querySelectorAll("[data-clip-to-note]").forEach(btn => {
    btn.onclick = async () => {
      const item = list[Number(btn.dataset.clipToNote)];
      if (!item) return;
      await B().createRecord?.("notes", {
        title: `نسخة من الحافظة (${item.tag})`,
        content: item.text,
        category: "Clipboard"
      });
    };
  });

  document.querySelectorAll("[data-clip-del]").forEach(btn => {
    btn.onclick = () => {
      list.splice(Number(btn.dataset.clipDel), 1);
      OSProStore.set("multi_clipboard_v6", list);
      openMultiClipboardModal();
    };
  });
}

/* ============================================================================
   3. SMART LECTURE & CODE OCR SCANNER (GEMINI VISION + TESSERACT FALLBACK)
   ============================================================================ */
async function extractTextFromImageDataUrl(dataUrl, statusEl) {
  const geminiKey = localStorage.getItem("MY_LIFE_OS_GEMINI_KEY");
  const base64Data = dataUrl.split(",")[1];
  const mimeType = dataUrl.substring(dataUrl.indexOf(":") + 1, dataUrl.indexOf(";")) || "image/jpeg";

  // 1. استخدام Gemini Vision الفائق السرعة إذا كان المفتاح متوفراً
  if (geminiKey && base64Data) {
    try {
      if (statusEl) statusEl.textContent = "⏳ جاري استخراج النصوص والأكواد بدقة فائقة عبر Gemini Vision...";
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(geminiKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: "استخرج كل النص أو الكود البرمجي أو المعادلات الموجودة في هذه الصورة بدقة تامة كما هي (بدون مقدمات):" },
              { inlineData: { mimeType, data: base64Data } }
            ]
          }]
        })
      });
      const json = await res.json();
      const reply = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) return reply.trim();
    } catch (e) {}
  }

  // 2. المحرك المحلي المجاني (Tesseract.js OCR للعربية والإنجليزية) بدون الحاجة لأي مفتاح
  if (statusEl) statusEl.textContent = "⏳ جاري قراءة الصورة عبر محرك المسح الضوئي (يدعم العربية والإنجليزية والأكواد)...";
  if (!window.Tesseract) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  const result = await window.Tesseract.recognize(dataUrl, "ara+eng");
  return (result?.data?.text || "").trim();
}

function openSmartOCRScannerModal() {
  B().openFormModal("📷 ماسح المحاضرات والشيتات والأكواد من الصور (Smart OCR Scanner)", `
    <p class="small-muted mb-2">ارفع صورة سلايد محاضرة، صفحة كتاب، أو كود مكتوب على السبورة (أو اضغط <strong>Ctrl+V</strong> للصق لقطة شاشة مباشرة):</p>

    <label class="goal-upload-zone d-block mb-2">
      <i class="fa-solid fa-camera-retro gold-text" style="font-size:1.8rem;"></i>
      <strong class="d-block mt-1" id="ocr-upload-status">اضغط لاختيار صورة من جهازك أو الصق لقطة شاشة بـ Ctrl+V</strong>
      <input type="file" id="ocr-file-input" accept="image/*" class="hidden" />
    </label>

    <div class="dashboard-grid" style="grid-template-columns: 240px 1fr; gap:14px; align-items:stretch;">
      <div class="subject-progress-box text-center" style="display:flex; align-items:center; justify-content:center; min-height:180px;">
        <img id="ocr-img-preview" src="" alt="Preview" style="max-width:100%; max-height:190px; border-radius:10px; display:none;" />
        <small id="ocr-img-placeholder" class="small-muted">معاينة الصورة ستظهر هنا</small>
      </div>
      <div>
        <div class="flex-between mb-1">
          <strong class="gold-text">📄 النص أو الكود المستخرج من الصورة:</strong>
          <div class="filters-row">
            <button type="button" id="btn-ocr-copy" class="btn btn-xs btn-gold"><i class="fa-regular fa-copy"></i> نسخ النص</button>
            <button type="button" id="btn-ocr-to-note" class="btn btn-xs btn-outline"><i class="fa-regular fa-note-sticky gold-text"></i> حفظ كملاحظة</button>
            <button type="button" id="btn-ocr-ai-explain" class="btn btn-xs btn-outline"><i class="fa-solid fa-wand-magic-sparkles gold-text"></i> لخص واشرح بالـ AI</button>
          </div>
        </div>
        <textarea id="ocr-output-area" rows="8" placeholder="سيظهر النص أو الكود المستخرج هنا لتعديله أو نسخه..."></textarea>
      </div>
    </div>
  `, async () => {});

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  const statusEl = document.getElementById("ocr-upload-status");
  const previewImg = document.getElementById("ocr-img-preview");
  const placeholder = document.getElementById("ocr-img-placeholder");
  const outputArea = document.getElementById("ocr-output-area");

  const processImageFile = async (file) => {
    if (!file) return;
    const dataUrl = await compressGoalImageFile(file);
    if (previewImg) {
      previewImg.src = dataUrl;
      previewImg.style.display = "block";
    }
    if (placeholder) placeholder.style.display = "none";
    try {
      const extracted = await extractTextFromImageDataUrl(dataUrl, statusEl);
      outputArea.value = extracted || "لم يتم العثور على نص واضح في الصورة.";
      statusEl.innerHTML = `<span style="color:#19B889;">✅ تم استخراج النص بنجاح!</span>`;
      toast("تم استخراج النص والكود من الصورة بنجاح! 📷✨");
    } catch (err) {
      statusEl.textContent = "❌ تعذر قراءة الصورة، حاول بصورة أوضح.";
    }
  };

  document.getElementById("ocr-file-input").onchange = (e) => processImageFile(e.target.files?.[0]);

  // دعم لصق لقطة الشاشة مباشرة عبر Ctrl+V
  const onPasteImage = (e) => {
    if (document.getElementById("universal-modal")?.classList.contains("hidden")) return;
    const items = e.clipboardData?.items || [];
    for (const it of items) {
      if (it.type.startsWith("image/")) {
        processImageFile(it.getAsFile());
        break;
      }
    }
  };
  window.addEventListener("paste", onPasteImage, { once: true });

  document.getElementById("btn-ocr-copy").onclick = () => {
    if (outputArea.value) copyTextSafely(outputArea.value);
  };

  document.getElementById("btn-ocr-to-note").onclick = async () => {
    if (!outputArea.value.trim()) return;
    await B().createRecord?.("notes", {
      title: `نص مستخرج بالماسح الضوئي OCR (${today()})`,
      content: outputArea.value.trim(),
      category: "OCR Scanner"
    });
  };

  document.getElementById("btn-ocr-ai-explain").onclick = async () => {
    const txt = outputArea.value.trim();
    if (!txt) return;
    outputArea.value = "⏳ جاري تحليل وشرح المحتوى المستخرج بالذكاء الاصطناعي...";
    const reply = await B().askAI?.(`لقد استخرجت هذا النص/الكود من محاضرتي بالماسح الضوئي:\n"${txt}"\nقم بترتيبه وشرحه وتلخيص أهم النقاط أو شرح الكود الموجود فيه بوضوح.`);
    outputArea.value = `${txt}\n\n====================\n🤖 الشرح والتلخيص الذكي:\n${reply}`;
  };
}

/* ============================================================================
   4. FLOATING VIDEO TELEPROMPTER (AUTO-SCROLLING SCRIPT OVER WHITEBOARD)
   ============================================================================ */
function toggleFloatingTeleprompter() {
  let box = document.getElementById("os-floating-teleprompter");
  if (box) {
    box.classList.toggle("hidden");
    return;
  }

  box = document.createElement("div");
  box.id = "os-floating-teleprompter";
  box.className = "os-floating-teleprompter";
  const savedScript = localStorage.getItem("MY_LIFE_OS_TELEPROMPTER_TEXT") || "بسم الله الرحمن الرحيم\n\n1. مقدمة سريعة عن فكرة الدرس والمشروع\n2. شرح المخطط الشجري والفروع الأساسية على السبورة\n3. تطبيق المثال العملي خطوة بخطوة\n4. خلاصة الدرس وأهم أسئلة الامتحان";

  box.innerHTML = `
    <div class="teleprompter-header" id="teleprompter-drag-handle">
      <strong class="gold-text" style="font-size:0.84rem;"><i class="fa-solid fa-scroll"></i> المُلقّن الذكي للشرح (اسحبني)</strong>
      <div class="filters-row" style="gap:4px;">
        <button type="button" id="btn-tp-play" class="btn btn-xs btn-gold"><i class="fa-solid fa-play"></i> تحريك</button>
        <input type="range" id="tp-speed-slider" min="1" max="6" value="2" style="width:55px;" title="سرعة التمرير التلقائي" />
        <input type="range" id="tp-opacity-slider" min="35" max="100" value="88" style="width:55px;" title="درجة الشفافية" />
        <button type="button" id="btn-tp-close" class="btn-icon-xs text-danger"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
    <div class="teleprompter-body">
      <textarea id="teleprompter-script-area" class="teleprompter-script-area" placeholder="اكتب نقاط الدرس التي تريد قراءتها أثناء تسجيل الفيديو...">${esc(savedScript)}</textarea>
      <small class="small-muted">💡 يظهر أمام عينيك فقط ولا يظهر داخل ملف فيديو السبورة الخاص MP4!</small>
    </div>
  `;
  document.body.appendChild(box);

  // سحب وتحريك نافذة الملقن في أي مكان
  const handle = document.getElementById("teleprompter-drag-handle");
  let dragging = false, sx = 0, sy = 0, il = 30, it = 90;
  handle.onmousedown = (e) => {
    if (e.target.closest("button, input")) return;
    dragging = true;
    sx = e.clientX;
    sy = e.clientY;
    const r = box.getBoundingClientRect();
    il = r.left;
    it = r.top;
  };
  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    box.style.left = `${Math.max(10, il + (e.clientX - sx))}px`;
    box.style.top = `${Math.max(10, it + (e.clientY - sy))}px`;
  });
  window.addEventListener("mouseup", () => { dragging = false; });

  const area = document.getElementById("teleprompter-script-area");
  area.oninput = () => localStorage.setItem("MY_LIFE_OS_TELEPROMPTER_TEXT", area.value);

  document.getElementById("tp-opacity-slider").oninput = (e) => {
    box.style.opacity = String(Number(e.target.value) / 100);
  };

  document.getElementById("btn-tp-play").onclick = (e) => {
    V6ExpansionState.teleprompterScrolling = !V6ExpansionState.teleprompterScrolling;
    const btn = e.currentTarget;
    if (V6ExpansionState.teleprompterScrolling) {
      btn.innerHTML = `<i class="fa-solid fa-pause"></i> إيقاف`;
      if (V6ExpansionState.teleprompterTimer) clearInterval(V6ExpansionState.teleprompterTimer);
      V6ExpansionState.teleprompterTimer = setInterval(() => {
        const spd = Number(document.getElementById("tp-speed-slider")?.value || 2);
        area.scrollTop += spd * 0.6;
      }, 50);
    } else {
      btn.innerHTML = `<i class="fa-solid fa-play"></i> تحريك`;
      clearInterval(V6ExpansionState.teleprompterTimer);
    }
  };

  document.getElementById("btn-tp-close").onclick = () => {
    clearInterval(V6ExpansionState.teleprompterTimer);
    V6ExpansionState.teleprompterScrolling = false;
    box.classList.add("hidden");
  };
}

/* ============================================================================
   5. 1-CLICK MULTI-IMAGE TO PDF CONVERTER (HOMEWORK & SHEETS BUILDER)
   ============================================================================ */
let selectedPdfImages = [];

function openImageToPdfConverterModal() {
  selectedPdfImages = [];
  B().openFormModal("📄 محول الصور والشيتات السريع إلى ملف PDF واحد (1-Click PDF Builder)", `
    <div class="dashboard-grid" style="grid-template-columns:1fr 1fr; gap:12px;">
      <div class="form-group">
        <label>اسم ملف الـ PDF عند التحميل</label>
        <input type="text" id="pdf-doc-filename" value="University-Assignment-${today()}" required />
      </div>
      <div class="form-group">
        <label>اتجاه الصفحات</label>
        <select id="pdf-doc-orient">
          <option value="p">📄 طولي قياسي (A4 Portrait)</option>
          <option value="l">🖼️ عرضي للسلايدات والسبورة (A4 Landscape)</option>
        </select>
      </div>
    </div>

    <label class="goal-upload-zone d-block mt-1">
      <i class="fa-solid fa-file-pdf gold-text" style="font-size:1.8rem;"></i>
      <strong class="d-block mt-1">اضغط هنا لاختيار صورة أو عدة صور من جهازك (يرتبها في ملف PDF واحد)</strong>
      <input type="file" id="pdf-multi-img-inp" accept="image/*" multiple class="hidden" />
    </label>

    <div id="pdf-imgs-preview-box" class="pdf-img-preview-grid"></div>

    <button type="button" id="btn-generate-pdf-now" class="btn btn-gold btn-block btn-luxury-shine mt-4">
      <i class="fa-solid fa-file-arrow-down"></i> دمج الصور وتحميل ملف الـ PDF الآن 🚀
    </button>
  `, async () => {});

  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  const previewBox = document.getElementById("pdf-imgs-preview-box");
  document.getElementById("pdf-multi-img-inp").onchange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    toast(`⏳ جاري تجهيز ${files.length} صور...`, "info");
    for (const f of files) {
      const dataUrl = await compressGoalImageFile(f);
      selectedPdfImages.push(dataUrl);
    }
    previewBox.innerHTML = selectedPdfImages.map((src, i) => `
      <div class="pdf-img-thumb" style="background-image:url('${src}')">
        <span class="badge badge-gold" style="position:absolute; top:4px; right:4px;">صفحة ${i + 1}</span>
      </div>
    `).join("");
    toast(`تم تجهيز ${selectedPdfImages.length} صفحات جاهزة للتحويل إلى PDF! 📄✅`);
  };

  document.getElementById("btn-generate-pdf-now").onclick = async () => {
    if (!selectedPdfImages.length) {
      toast("اختر صورة واحدة على الأقل أولاً!", "error");
      return;
    }
    toast("⏳ جاري بناء وتصدير ملف الـ PDF...", "info");
    try {
      if (!window.jspdf) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      const { jsPDF } = window.jspdf;
      const orient = document.getElementById("pdf-doc-orient")?.value || "p";
      const pdf = new jsPDF({ orientation: orient, unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      selectedPdfImages.forEach((imgData, idx) => {
        if (idx > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 8, 8, pageW - 16, pageH - 16);
      });

      const fname = (document.getElementById("pdf-doc-filename")?.value.trim() || "Assignment") + ".pdf";
      pdf.save(fname);
      toast(`تم تحميل ملف "${fname}" بنجاح! 📄🎉`);
    } catch (err) {
      toast("تعذر تحميل مكتبة PDF، تأكد من اتصالك بالإنترنت", "error");
    }
  };
}

/* ============================================================================
   6. DRAGGABLE MINI POMODORO + LIVE CO-STUDY ROOM V2 (TIMER, CHAT, TASKS & WB)
   ============================================================================ */

// أ) جعل نافذة البومودورو المصغرة (#mini-floating-pomo) سهلة السحب والتحريك في أي جنب
function initDraggableMiniPomodoro() {
  const miniPomo = document.getElementById("mini-floating-pomo");
  if (!miniPomo || miniPomo.dataset.dragBound === "1") return;
  miniPomo.dataset.dragBound = "1";

  miniPomo.style.cursor = "grab";
  miniPomo.style.userSelect = "none";
  miniPomo.style.touchAction = "none";
  miniPomo.style.zIndex = "99995";

  // استرجاع آخر مكان تم سحب البومودورو الصغير إليه
  const savedPos = localStorage.getItem("MY_LIFE_OS_MINI_POMO_POS");
  if (savedPos) {
    try {
      const { x, y } = JSON.parse(savedPos);
      miniPomo.style.left = `${ Math.max(8, Math.min(window.innerWidth - 220, x)) }px`;
      miniPomo.style.top = `${ Math.max(8, Math.min(window.innerHeight - 80, y)) }px`;
      miniPomo.style.right = "auto";
      miniPomo.style.bottom = "auto";
    } catch (e) {}
  }

  // إضافة أيقونة قبضة تحريك واضحة في بداية النافذة المصغرة
  const topRow = miniPomo.querySelector(".mini-hud-top");
  if (topRow && !topRow.querySelector(".mini-drag-grip")) {
    const grip = document.createElement("span");
    grip.className = "mini-drag-grip gold-text";
    grip.title = "اسحب لتحريك المؤقت في أي مكان";
    grip.style.cssText = "cursor:grab; padding:0 4px; font-size:0.9rem;";
    grip.innerHTML = `<i class="fa-solid fa-grip-vertical"></i>`;
    topRow.prepend(grip);
  }

  let isDragging = false, startX = 0, startY = 0, initLeft = 0, initTop = 0;

  const onDown = (e) => {
    if (e.target.closest("button")) return;
    isDragging = true;
    miniPomo.style.cursor = "grabbing";
    miniPomo.style.transition = "none";
    const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const cy = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    startX = cx;
    startY = cy;
    const rect = miniPomo.getBoundingClientRect();
    initLeft = rect.left;
    initTop = rect.top;
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const cy = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const newLeft = Math.max(6, Math.min(window.innerWidth - miniPomo.offsetWidth - 6, initLeft + (cx - startX)));
    const newTop = Math.max(6, Math.min(window.innerHeight - miniPomo.offsetHeight - 6, initTop + (cy - startY)));
    miniPomo.style.left = `${newLeft}px`;
    miniPomo.style.top = `${newTop}px`;
    miniPomo.style.right = "auto";
    miniPomo.style.bottom = "auto";
  };

  const onUp = () => {
    if (!isDragging) return;
    isDragging = false;
    miniPomo.style.cursor = "grab";
    const rect = miniPomo.getBoundingClientRect();
    localStorage.setItem("MY_LIFE_OS_MINI_POMO_POS", JSON.stringify({ x: rect.left, y: rect.top }));
  };

  miniPomo.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
  miniPomo.addEventListener("touchstart", onDown, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });
  window.addEventListener("touchend", onUp);
}
setTimeout(initDraggableMiniPomodoro, 500);

// ب) محرك الغرفة المشتركة الحية (يعمل عبر Firebase + BroadcastChannel + LocalStorage بلا أي أعطال)
const CoStudyEngine = {
  roomData: null,
  bc: null,
  tickInterval: null,
  firestoreDocId: null
};

async function getFirestoreMod() {
  return await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
}

function getDefaultRoomObject(code, userName) {
  return {
    roomCode: code,
    hostName: userName,
    members: [userName],
    pomoDuration: 25 * 60,
    pomoTimeLeft: 25 * 60,
    pomoTargetTs: 0,
    pomoRunning: false,
    pomoMode: "تركيز جماعي 🔥",
    tasks: [
      { id: "rt_1", text: "مراجعة المحاضرة الأساسية وحل الشيت", done: false, by: userName }
    ],
    messages: [
      { id: "rm_1", sender: "النظام 🤖", text: `تم تفعيل غرفة المذاكرة المشتركة (${code}) بنجاح!`, time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }) }
    ],
    wbNodes: JSON.stringify(WBState.nodes || []),
    wbStrokes: JSON.stringify(WBState.strokes || []),
    updatedAtMs: Date.now()
  };
}

function saveAndBroadcastRoomState(roomObj, syncWhiteboard = false) {
  if (!roomObj || !roomObj.roomCode) return;
  roomObj.updatedAtMs = Date.now();
  if (syncWhiteboard) {
    roomObj.wbNodes = JSON.stringify(WBState.nodes || []);
    roomObj.wbStrokes = JSON.stringify(WBState.strokes || []);
  }
  CoStudyEngine.roomData = roomObj;

  // 1. حفظ محلي فوري ومزامنة بين التابات
  try {
    localStorage.setItem("MY_LIFE_OS_ROOM_DATA_" + roomObj.roomCode, JSON.stringify(roomObj));
  } catch (e) {}

  if (CoStudyEngine.bc) {
    try { CoStudyEngine.bc.postMessage(roomObj); } catch (e) {}
  }

  // 2. مزامنة سحابية عبر Firebase Firestore (مع حماية كاملة ضد أخطاء الصلاحيات)
  const db = B().getAppState?.()?.db;
  const user = B().getAppState?.()?.user;
  if (db && user) {
    getFirestoreMod().then(async ({ doc, setDoc }) => {
      try {
        await setDoc(doc(db, "co_study_rooms", roomObj.roomCode), {
          ...roomObj,
          ownerUid: user.uid
        }, { merge: true });
      } catch (err) {
        // في حال كانت قواعد Firestore تقيد الكولكشن الخارجي، يستمر المحرك المحلي والـ Broadcast بالعمل فوراً دون توقف
      }
    }).catch(() => {});
  }

  refreshRoomUIElements();
}

function applyIncomingRoomState(data) {
  if (!data || !data.roomCode) return;
  CoStudyEngine.roomData = data;

  // مزامنة السبورة إذا تغيرت
  if (data.wbNodes && data.wbStrokes) {
    try {
      V6ExpansionState.isApplyingRemoteWB = true;
      WBState.nodes = JSON.parse(data.wbNodes);
      WBState.strokes = JSON.parse(data.wbStrokes);
      const canvas = document.getElementById("smart-whiteboard-canvas");
      if (canvas) {
        renderWhiteboardScene(canvas.getContext("2d"), canvas.width, canvas.height);
      }
      V6ExpansionState.isApplyingRemoteWB = false;
    } catch (e) {}
  }

  // مزامنة المؤقت مع المؤقت الرئيسي والمصغر للموقع
  const pState = B().getPomodoroState?.();
  if (pState) {
    if (data.pomoRunning && data.pomoTargetTs > Date.now()) {
      const rem = Math.max(1, Math.round((data.pomoTargetTs - Date.now()) / 1000));
      pState.duration = data.pomoDuration || 1500;
      pState.timeLeft = rem;
      if (!pState.isRunning) B().startPomodoro?.();
    } else if (!data.pomoRunning && pState.isRunning) {
      B().pausePomodoro?.();
      pState.timeLeft = data.pomoTimeLeft || data.pomoDuration || 1500;
      B().updatePomodoroDisplays?.();
    }
  }

  refreshRoomUIElements();
}

function startRoomLiveTicker() {
  if (CoStudyEngine.tickInterval) clearInterval(CoStudyEngine.tickInterval);
  CoStudyEngine.tickInterval = setInterval(() => {
    const rm = CoStudyEngine.roomData;
    if (!rm || !V6ExpansionState.activeRoomCode) return;

    if (rm.pomoRunning && rm.pomoTargetTs > 0) {
      const rem = Math.max(0, Math.round((rm.pomoTargetTs - Date.now()) / 1000));
      rm.pomoTimeLeft = rem;
      if (rem <= 0) {
        rm.pomoRunning = false;
        rm.pomoTargetTs = 0;
        saveAndBroadcastRoomState(rm);
        toast("🎉 انتهت جلسة التركيز المشتركة في الغرفة! عاش يا أبطال ☕", "success");
      }
    }

    // تحديث شاشة المؤقت داخل نافذة الغرفة المشتركة وفي الشريط العلوي لحظياً
    const timerEl = document.getElementById("room-live-timer-display");
    const barEl = document.getElementById("room-live-timer-bar");
    const statusEl = document.getElementById("room-live-timer-status");
    const topRoomBtn = document.getElementById("btn-top-costudy-room");

    const secs = rm.pomoTimeLeft ?? rm.pomoDuration ?? 1500;
    const mStr = String(Math.floor(secs / 60)).padStart(2, "0");
    const sStr = String(secs % 60).padStart(2, "0");
    const formatted = `${mStr}:${sStr}`;

    if (timerEl) timerEl.textContent = formatted;
    if (statusEl) {
      statusEl.textContent = rm.pomoRunning ? `⚡ المؤقت يعمل الآن (${rm.pomoMode || "تركيز"})` : "⏸️ المؤقت متوقف مؤقتاً — اضغط تشغيل للبدء";
    }
    if (barEl) {
      const total = Math.max(1, rm.pomoDuration || 1500);
      const pct = Math.min(100, Math.round(((total - secs) / total) * 100));
      barEl.style.width = `${pct}%`;
    }
    if (topRoomBtn) {
      topRoomBtn.classList.add("costudy-live-pill");
      topRoomBtn.innerHTML = `<span class="live-dot"></span> <span>غرفة ${esc(rm.roomCode)} (${formatted})</span>`;
    }
  }, 1000);
}

function refreshRoomUIElements() {
  const rm = CoStudyEngine.roomData;
  if (!rm) return;

  // تحديث قائمة المهام المشتركة داخل المودال إن كان مفتوحاً
  const tasksBox = document.getElementById("room-shared-tasks-list");
  if (tasksBox) {
    tasksBox.innerHTML = (rm.tasks || []).map((t, idx) => `
      <label class="check-pill ${t.done ? "completed" : ""}" style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="checkbox" data-room-task-idx="${idx}" ${t.done ? "checked" : ""} />
          <span>${esc(t.text)} <small class="small-muted">(${esc(t.by || "")})</small></span>
        </div>
        <button type="button" class="btn-icon-xs text-danger" data-room-task-del="${idx}">&times;</button>
      </label>
    `).join("") || `<p class="small-muted">لا توجد مهام مشتركة بعد. أضف أول مهمة للفريق!</p>`;

    tasksBox.querySelectorAll("[data-room-task-idx]").forEach(chk => {
      chk.onchange = () => {
        const i = Number(chk.dataset.roomTaskIdx);
        if (rm.tasks[i]) {
          rm.tasks[i].done = chk.checked;
          saveAndBroadcastRoomState(rm);
        }
      };
    });
    tasksBox.querySelectorAll("[data-room-task-del]").forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        rm.tasks.splice(Number(btn.dataset.roomTaskDel), 1);
        saveAndBroadcastRoomState(rm);
      };
    });
  }

  // تحديث شات الغرفة الفوري
  const chatBox = document.getElementById("room-shared-chat-box");
  if (chatBox) {
    chatBox.innerHTML = (rm.messages || []).slice(-25).map(msg => `
      <div style="background:rgba(15,22,38,0.9); border:1px solid rgba(212,167,44,0.25); padding:7px 11px; border-radius:10px; margin-bottom:6px;">
        <div class="flex-between">
          <strong class="gold-text" style="font-size:0.78rem;">${esc(msg.sender)}</strong>
          <small class="small-muted" style="font-size:0.7rem;">${esc(msg.time)}</small>
        </div>
        <p style="font-size:0.86rem; margin-top:2px; word-break:break-word;">${esc(msg.text)}</p>
      </div>
    `).join("");
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // تحديث زر التشغيل/الإيقاف المؤقت داخل الغرفة
  const startBtn = document.getElementById("btn-room-pomo-toggle");
  if (startBtn) {
    startBtn.innerHTML = rm.pomoRunning
      ? `<i class="fa-solid fa-pause"></i> إيقاف مؤقت للغرفة`
      : `<i class="fa-solid fa-play"></i> تشغيل المؤقت المشترك الآن`;
  }
}

async function joinOrCreateCoStudyRoom(roomCodeInput, isCreating = false) {
  const cleanCode = String(roomCodeInput || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  if (!cleanCode) {
    toast("أدخل كود غرفة صحيح (مثال: MUC-202)", "error");
    return;
  }

  const user = B().getAppState?.()?.user;
  const userName = user?.displayName || "Eng. Ahmed M Hosny";

  V6ExpansionState.activeRoomCode = cleanCode;
  localStorage.setItem("MY_LIFE_OS_COSTUDY_ROOM", cleanCode);

  // تحميل بيانات الغرفة المحفوظة أو إنشاء غرفة جديدة فوراً
  let existingLocal = null;
  try {
    const raw = localStorage.getItem("MY_LIFE_OS_ROOM_DATA_" + cleanCode);
    if (raw) existingLocal = JSON.parse(raw);
  } catch (e) {}

  const roomObj = existingLocal || getDefaultRoomObject(cleanCode, userName);
  if (!roomObj.members) roomObj.members = [userName];
  if (!roomObj.members.includes(userName)) roomObj.members.push(userName);

  // تفعيل قناة البث اللحظي بين النوافذ والتابات
  if (CoStudyEngine.bc) {
    try { CoStudyEngine.bc.close(); } catch (e) {}
  }
  if ("BroadcastChannel" in window) {
    CoStudyEngine.bc = new BroadcastChannel("MY_LIFE_OS_ROOM_" + cleanCode);
    CoStudyEngine.bc.onmessage = (ev) => {
      if (ev.data && ev.data.roomCode === cleanCode) {
        applyIncomingRoomState(ev.data);
      }
    };
  }

  // تفعيل الاستماع السحابي من Firestore إن كان متاحاً
  const db = B().getAppState?.()?.db;
  if (V6ExpansionState.roomUnsub) {
    try { V6ExpansionState.roomUnsub(); } catch (e) {}
    V6ExpansionState.roomUnsub = null;
  }
  if (db) {
    try {
      const { doc, onSnapshot } = await getFirestoreMod();
      const roomRef = doc(db, "co_study_rooms", cleanCode);
      V6ExpansionState.roomUnsub = onSnapshot(roomRef, (snap) => {
        if (snap.exists()) {
          applyIncomingRoomState(snap.data());
        }
      }, () => {});
    } catch (e) {}
  }

  saveAndBroadcastRoomState(roomObj, isCreating);
  startRoomLiveTicker();
  toast(`🟢 تم الاتصال وتفعيل الغرفة المشتركة (${cleanCode}) بنجاح!`);
}

async function broadcastWhiteboardToRoom() {
  if (!V6ExpansionState.activeRoomCode || !CoStudyEngine.roomData) {
    openCoStudyRoomModal();
    return;
  }
  saveAndBroadcastRoomState(CoStudyEngine.roomData, true);
  toast(`📡 تم بث ومزامنة السبورة مع جميع أعضاء الغرفة (${V6ExpansionState.activeRoomCode})!`);
}

function openCoStudyRoomModal() {
  const curCode = V6ExpansionState.activeRoomCode;
  const generatedCode = "MUC-" + Math.floor(100 + Math.random() * 900);

  if (curCode && !CoStudyEngine.roomData) {
    const userName = B().getAppState?.()?.user?.displayName || "Eng. Ahmed M Hosny";
    CoStudyEngine.roomData = getDefaultRoomObject(curCode, userName);
    startRoomLiveTicker();
  }
  const rm = CoStudyEngine.roomData;

  B().openFormModal("🟢 استوديو الغرفة المشتركة الحية (مؤقت جماعي + مهام + شات + سبورة)", `
    ${!curCode ? `
      <p class="small-muted mb-2">أنشئ غرفة مذاكرة ومشاريع جديدة بضغطة زر أو ادخل كود غرفة زميلك لتعملوا معاً على نفس المؤقت، المهام، الشات، والسبورة:</p>
      <div class="dashboard-grid" style="grid-template-columns:1fr 1fr; gap:14px;">
        <div class="item-card" style="border-color:#19B889!important;">
          <h4>🚀 1. إنشاء غرفة مشتركة جديدة</h4>
          <p class="small-muted mt-1">اختر كود الغرفة أو اترك الكود التلقائي وابدأ فوراً:</p>
          <input type="text" id="new-room-code-inp" dir="ltr" value="${generatedCode}" style="text-align:center; font-weight:800; font-size:1.2rem;" class="mt-2" />
          <button type="button" id="btn-create-room-now" class="btn btn-gold btn-sm btn-block mt-2">
            <i class="fa-solid fa-plus-circle"></i> إنشاء وفتح الغرفة الآن
          </button>
        </div>

        <div class="item-card">
          <h4>🤝 2. الانضمام لغرفة بالكود</h4>
          <p class="small-muted mt-1">أدخل كود الغرفة الذي أرسله لك زميلك للاتصال الفوري:</p>
          <input type="text" id="join-room-code-inp" dir="ltr" placeholder="مثال: MUC-482" style="text-align:center; font-weight:800; font-size:1.2rem;" class="mt-2" />
          <button type="button" id="btn-join-room-now" class="btn btn-outline btn-sm btn-block mt-2" style="border-color:#19B889;">
            <i class="fa-solid fa-right-to-bracket gold-text"></i> انضمام للغرفة الآن
          </button>
        </div>
      </div>
    ` : `
      <!-- هيدر الغرفة النشطة -->
      <div class="subject-progress-box mb-2" style="border:1.5px solid #19B889;">
        <div class="flex-between" style="flex-wrap:wrap; gap:10px;">
          <div>
            <span class="badge badge-emerald"><span class="live-dot"></span> غرفة نشطة ومتصلة الآن</span>
            <h3 class="gold-text mt-1" dir="ltr" style="display:inline-block; margin-inline-start:10px;">${esc(curCode)}</h3>
            <small class="small-muted d-block mt-1">الأعضاء المتصلون: ${esc((rm?.members || ["أنت"]).join(" ، "))}</small>
          </div>
          <div class="filters-row">
            <button type="button" id="btn-copy-room-code" class="btn btn-xs btn-gold"><i class="fa-regular fa-copy"></i> نسخ كود الغرفة</button>
            <button type="button" id="btn-open-shared-wb" class="btn btn-xs btn-outline"><i class="fa-solid fa-diagram-project gold-text"></i> السبورة المشتركة</button>
            <button type="button" id="btn-room-ping-sound" class="btn btn-xs btn-outline" title="إرسال نغمة تنبيه لأعضاء الغرفة"><i class="fa-solid fa-bell gold-text"></i> تنبيه الزملاء</button>
            <button type="button" id="btn-leave-room" class="btn btn-xs btn-danger"><i class="fa-solid fa-power-off"></i> مغادرة الغرفة</button>
          </div>
        </div>
      </div>

      <!-- 1. مؤقت البومودورو المشترك الحي داخل الغرفة -->
      <div class="card mb-2" style="text-align:center; padding:16px; border:1px solid rgba(212,167,44,0.45);">
        <span id="room-live-timer-status" class="badge badge-gold">⏱️ مؤقت التركيز الجماعي</span>
        <div id="room-live-timer-display" style="font-size:3.4rem; font-family:'Inter',monospace; font-weight:900; color:#fff; margin:6px 0; text-shadow:0 0 25px rgba(212,167,44,0.5);">25:00</div>
        <div class="progress-bar-track" style="max-width:460px; margin:0 auto 12px;">
          <div id="room-live-timer-bar" class="progress-bar-fill" style="width:0%"></div>
        </div>

        <div class="filters-row" style="justify-content:center; margin-bottom:10px;">
          <button type="button" class="btn btn-xs btn-outline" data-room-preset="25">25 دقيقة</button>
          <button type="button" class="btn btn-xs btn-outline" data-room-preset="45">45 دقيقة</button>
          <button type="button" class="btn btn-xs btn-gold" data-room-preset="50">50 دقيقة (عميق)</button>
          <button type="button" class="btn btn-xs btn-outline" data-room-preset="5">☕ راحة 5 د</button>
          <button type="button" id="btn-room-custom-mins" class="btn btn-xs btn-outline">⚙️ وقت مخصص</button>
        </div>

        <div class="filters-row" style="justify-content:center;">
          <button type="button" id="btn-room-pomo-toggle" class="btn btn-gold btn-sm">
            <i class="fa-solid ${rm?.pomoRunning ? "fa-pause" : "fa-play"}"></i>
            ${rm?.pomoRunning ? "إيقاف مؤقت للغرفة" : "تشغيل المؤقت المشترك الآن"}
          </button>
          <button type="button" id="btn-room-pomo-reset" class="btn btn-outline btn-sm">
            <i class="fa-solid fa-rotate-right"></i> تصفير وإعادة ضبط
          </button>
          <button type="button" id="btn-room-show-mini-pomo" class="btn btn-outline btn-sm" title="إظهار المؤقت العائم الصغير لتحريكه في أي مكان">
            <i class="fa-solid fa-window-restore gold-text"></i> إظهار المصغر العائم
          </button>
        </div>
      </div>

      <!-- 2. مهام الغرفة المشتركة + شات وملاحظات الغرفة -->
      <div class="dashboard-grid" style="grid-template-columns:1fr 1fr; gap:14px;">
        <div class="item-card">
          <h4>✅ مهام الفريق المشتركة في الجلسة</h4>
          <div class="input-action-row mt-2">
            <input type="text" id="room-new-task-inp" placeholder="أضف مهمة مشتركة للغرفة..." />
            <button type="button" id="btn-room-add-task" class="btn btn-gold btn-xs">+ إضافة</button>
          </div>
          <div id="room-shared-tasks-list" style="max-height:175px; overflow-y:auto; margin-top:10px;"></div>
        </div>

        <div class="item-card">
          <h4>💬 شات وملاحظات الغرفة اللحظية</h4>
          <div id="room-shared-chat-box" style="height:155px; overflow-y:auto; background:rgba(5,8,15,0.65); padding:8px; border-radius:10px; margin-top:8px;"></div>
          <div class="input-action-row mt-2">
            <input type="text" id="room-chat-inp" placeholder="اكتب رسالة أو ملاحظة لزملائك..." />
            <button type="button" id="btn-room-send-msg" class="btn btn-gold btn-xs"><i class="fa-solid fa-paper-plane"></i> إرسال</button>
          </div>
        </div>
      </div>
    `}
  `, async () => {});

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  // أزرار الإنشاء والانضمام
  document.getElementById("btn-create-room-now")?.addEventListener("click", async () => {
    const code = document.getElementById("new-room-code-inp")?.value;
    await joinOrCreateCoStudyRoom(code, true);
    openCoStudyRoomModal();
  });

  document.getElementById("btn-join-room-now")?.addEventListener("click", async () => {
    const code = document.getElementById("join-room-code-inp")?.value;
    await joinOrCreateCoStudyRoom(code, false);
    openCoStudyRoomModal();
  });

  if (!curCode) return;

  refreshRoomUIElements();

  // التحكم في مؤقت البومودورو المشترك
  document.querySelectorAll("[data-room-preset]").forEach(btn => {
    btn.onclick = () => {
      const mins = Number(btn.dataset.roomPreset) || 25;
      rm.pomoDuration = mins * 60;
      rm.pomoTimeLeft = mins * 60;
      rm.pomoTargetTs = Date.now() + mins * 60 * 1000;
      rm.pomoRunning = true;
      rm.pomoMode = mins === 5 ? "استراحة قصيرة ☕" : `تركيز ${mins}د 🔥`;
      B().setCustomPomodoroTime?.(mins, mins === 5 ? "break" : "work");
      B().startPomodoro?.();
      saveAndBroadcastRoomState(rm);
      toast(`⏱️ تم ضبط وتشغيل مؤقت الغرفة على ${mins} دقيقة!`);
    };
  });

  document.getElementById("btn-room-custom-mins")?.addEventListener("click", () => {
    const mins = Number(prompt("⏱️ أدخل عدد دقائق جلسة الغرفة المشتركة:", "40"));
    if (!mins || mins <= 0) return;
    rm.pomoDuration = mins * 60;
    rm.pomoTimeLeft = mins * 60;
    rm.pomoTargetTs = Date.now() + mins * 60 * 1000;
    rm.pomoRunning = true;
    B().setCustomPomodoroTime?.(mins, "work");
    B().startPomodoro?.();
    saveAndBroadcastRoomState(rm);
  });

  document.getElementById("btn-room-pomo-toggle")?.addEventListener("click", () => {
    if (rm.pomoRunning) {
      const rem = Math.max(1, Math.round((rm.pomoTargetTs - Date.now()) / 1000));
      rm.pomoTimeLeft = rem;
      rm.pomoRunning = false;
      rm.pomoTargetTs = 0;
      B().pausePomodoro?.();
      toast("⏸️ تم إيقاف مؤقت الغرفة مؤقتاً", "info");
    } else {
      const secs = rm.pomoTimeLeft > 0 ? rm.pomoTimeLeft : (rm.pomoDuration || 1500);
      rm.pomoTargetTs = Date.now() + secs * 1000;
      rm.pomoRunning = true;
      const pState = B().getPomodoroState?.();
      if (pState) pState.timeLeft = secs;
      B().startPomodoro?.();
      toast("▶️ انطلق مؤقت الغرفة المشترك الآن! 🔥");
    }
    saveAndBroadcastRoomState(rm);
  });

  document.getElementById("btn-room-pomo-reset")?.addEventListener("click", () => {
    rm.pomoRunning = false;
    rm.pomoTargetTs = 0;
    rm.pomoTimeLeft = rm.pomoDuration || 1500;
    B().resetPomodoro?.();
    saveAndBroadcastRoomState(rm);
    toast("🔄 تمت إعادة ضبط مؤقت الغرفة", "info");
  });

  document.getElementById("btn-room-show-mini-pomo")?.addEventListener("click", () => {
    if (!rm.pomoRunning) {
      document.getElementById("btn-room-pomo-toggle")?.click();
    }
    document.getElementById("universal-modal")?.classList.add("hidden");
    const mini = document.getElementById("mini-floating-pomo");
    if (mini) mini.classList.remove("hidden");
    initDraggableMiniPomodoro();
    toast("اسحب المؤقت الصغير بالماوس وضعه في أي جنب تفضله! ✥⏱️");
  });

  // إضافة مهمة مشتركة للغرفة
  const addTaskFn = () => {
    const inp = document.getElementById("room-new-task-inp");
    const val = inp?.value.trim();
    if (!val) return;
    inp.value = "";
    const userName = B().getAppState?.()?.user?.displayName || "عضو";
    rm.tasks = rm.tasks || [];
    rm.tasks.push({ id: "rt_" + Date.now(), text: val, done: false, by: userName });
    saveAndBroadcastRoomState(rm);
  };
  document.getElementById("btn-room-add-task")?.addEventListener("click", addTaskFn);
  document.getElementById("room-new-task-inp")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); addTaskFn(); }
  });

  // إرسال رسالة في شات الغرفة
  const sendMsgFn = () => {
    const inp = document.getElementById("room-chat-inp");
    const val = inp?.value.trim();
    if (!val) return;
    inp.value = "";
    const userName = B().getAppState?.()?.user?.displayName || "Eng. Ahmed";
    rm.messages = rm.messages || [];
    rm.messages.push({
      id: "rm_" + Date.now(),
      sender: userName,
      text: val,
      time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
    });
    saveAndBroadcastRoomState(rm);
  };
  document.getElementById("btn-room-send-msg")?.addEventListener("click", sendMsgFn);
  document.getElementById("room-chat-inp")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); sendMsgFn(); }
  });

  document.getElementById("btn-room-ping-sound")?.addEventListener("click", () => {
    playGentleAdhanChime();
    const userName = B().getAppState?.()?.user?.displayName || "Eng. Ahmed";
    rm.messages = rm.messages || [];
    rm.messages.push({
      id: "rm_" + Date.now(),
      sender: userName,
      text: "🔔 أرسل نغمة تنبيه للتركيز!",
      time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
    });
    saveAndBroadcastRoomState(rm);
    toast("🔔 تم إرسال نغمة تنبيه التركيز لأعضاء الغرفة!");
  });

  document.getElementById("btn-copy-room-code")?.addEventListener("click", () => {
    copyTextSafely(curCode, `تم نسخ كود الغرفة (${curCode}) بنجاح! 📋`);
  });

  document.getElementById("btn-open-shared-wb")?.addEventListener("click", () => {
    openSmartWhiteboardModal(false);
  });

  document.getElementById("btn-leave-room")?.addEventListener("click", () => {
    if (V6ExpansionState.roomUnsub) V6ExpansionState.roomUnsub();
    if (CoStudyEngine.bc) { try { CoStudyEngine.bc.close(); } catch (e) {} }
    if (CoStudyEngine.tickInterval) clearInterval(CoStudyEngine.tickInterval);
    V6ExpansionState.activeRoomCode = "";
    CoStudyEngine.roomData = null;
    localStorage.removeItem("MY_LIFE_OS_COSTUDY_ROOM");
    const topRoomBtn = document.getElementById("btn-top-costudy-room");
    if (topRoomBtn) {
      topRoomBtn.classList.remove("costudy-live-pill");
      topRoomBtn.innerHTML = `<i class="fa-solid fa-users-rectangle gold-text"></i> <span>غرفة مشتركة</span>`;
    }
    openCoStudyRoomModal();
    toast("تمت مغادرة الغرفة المشتركة", "info");
  });
}

/* ============================================================================
   7. ENCRYPTED DEVELOPER VAULT (REAL WEB CRYPTO API AES-256-GCM + PBKDF2)
   ============================================================================ */
async function deriveAES256Key(password, saltUint8) {
  const enc = new TextEncoder();
  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return await window.crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: saltUint8, iterations: 100000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

function bufToBase64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function base64ToUint8(b64) {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

async function encryptSecretAES256(plainText, masterPass) {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveAES256Key(masterPass, salt);
  const enc = new TextEncoder();
  const cipherBuf = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(plainText)
  );
  return {
    cipher: bufToBase64(cipherBuf),
    iv: bufToBase64(iv),
    salt: bufToBase64(salt)
  };
}

async function decryptSecretAES256(encObj, masterPass) {
  const salt = base64ToUint8(encObj.salt);
  const iv = base64ToUint8(encObj.iv);
  const cipher = base64ToUint8(encObj.cipher);
  const key = await deriveAES256Key(masterPass, salt);
  const plainBuf = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    cipher
  );
  return new TextDecoder().decode(plainBuf);
}

async function renderDeveloperVaultView() {
  const sec = document.getElementById("view-dev-vault");
  if (!sec) return;

  const vaultItems = OSProStore.get("encrypted_dev_vault_v6", []);

  // إذا كانت الخزنة مقفلة، نطلب كلمة المرور الرئيسية لفك تشفير AES-256
  if (!V6ExpansionState.vaultMasterPass) {
    sec.innerHTML = `
      <div class="card" style="max-width:520px; margin:30px auto; text-align:center; border-color:var(--gold-primary);">
        <div class="wizard-emblem-circle" style="margin:0 auto;"><i class="fa-solid fa-user-shield"></i></div>
        <span class="badge badge-gold mt-2">MILITARY-GRADE AES-256-GCM ENCRYPTION</span>
        <h2 class="mt-1">🔐 خزنة المطور المشفرة (Developer Vault)</h2>
        <p class="small-muted mt-1">احفظ مفاتيح الـ APIs، بيانات السيرفرات، وكلمات المرور الخاصة بمشاريعك بتشفير محلي كامل (AES-256) لا يمكن فكه إلا بكلمة المرور الرئيسية الخاصة بك:</p>
        <form id="vault-unlock-form" class="mt-4">
          <input type="password" id="vault-master-inp" class="wizard-input-giant" placeholder="أدخل كلمة سر الخزنة الرئيسية..." required autofocus />
          <button type="submit" class="btn btn-gold btn-block btn-luxury-shine mt-2">
            <i class="fa-solid fa-key"></i> فتح الخزنة وفك التشفير (AES-256)
          </button>
        </form>
        <small class="small-muted d-block mt-2">💡 إذا كانت هذه أول مرة، فاكتب كلمة السر التي تريد اعتمادها للخزنة.</small>
      </div>
    `;

    sec.querySelector("#vault-unlock-form").onsubmit = async (e) => {
      e.preventDefault();
      const pass = document.getElementById("vault-master-inp")?.value;
      if (!pass) return;
      if (vaultItems.length > 0) {
        try {
          await decryptSecretAES256(vaultItems[0].encData, pass);
        } catch (err) {
          toast("❌ كلمة المرور الرئيسية غير صحيحة لفك تشفير الخزنة!", "error");
          return;
        }
      }
      V6ExpansionState.vaultMasterPass = pass;
      toast("🔓 تم فك تشفير خزنة المطور بنجاح (AES-256 Verified)!");
      renderDeveloperVaultView();
    };
    return;
  }

  // فك تشفير العناصر لعرضها أثناء فتح الجلسة
  const decryptedList = [];
  for (const it of vaultItems) {
    try {
      const secretVal = await decryptSecretAES256(it.encData, V6ExpansionState.vaultMasterPass);
      decryptedList.push({ ...it, secretVal });
    } catch (e) {
      decryptedList.push({ ...it, secretVal: "🔒 [مشفر بكلمة سر أخرى]" });
    }
  }

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-vault gold-text"></i> خزنة المطور المشفرة (AES-256 Encrypted Developer Vault)</h3>
        <small class="small-muted">مفاتيح الـ APIs • بيانات السيرفرات وقواعد البيانات • التوكنز السرية (مشفرة بـ PBKDF2 & AES-GCM)</small>
      </div>
      <div class="filters-row">
        <button type="button" id="btn-add-vault-secret" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> تشفير وإضافة مفتاح/سر جديد</button>
        <button type="button" id="btn-lock-vault-now" class="btn btn-danger btn-sm"><i class="fa-solid fa-lock"></i> قفل الخزنة فوراً</button>
      </div>
    </div>

    <div class="items-grid">
      ${decryptedList.length ? decryptedList.map((item, idx) => `
        <div class="vault-secret-card">
          <div>
            <div class="flex-between">
              <span class="badge badge-gold">${esc(item.category)}</span>
              <span class="badge badge-emerald"><i class="fa-solid fa-shield-halved"></i> AES-256</span>
            </div>
            <h4 class="mt-2">${esc(item.title)}</h4>
            ${item.host ? `<small class="small-muted d-block" dir="ltr">Host/Env: ${esc(item.host)}</small>` : ""}
            <div class="vault-cipher-box mt-2" id="vault-val-box-${idx}">
              ••••••••••••••••••••••••••••
            </div>
            <small class="small-muted d-block mt-1">Cipher IV: ${esc(item.encData?.iv?.slice(0, 12) || "")}...</small>
          </div>
          <div class="flex-between mt-2">
            <div class="filters-row">
              <button type="button" class="btn btn-xs btn-gold" data-vault-copy="${idx}"><i class="fa-regular fa-copy"></i> نسخ المفتاح</button>
              <button type="button" class="btn btn-xs btn-outline" data-vault-reveal="${idx}"><i class="fa-regular fa-eye gold-text"></i> إظهار/إخفاء</button>
            </div>
            <button type="button" class="btn btn-xs btn-danger" data-vault-del="${idx}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `).join("") : `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <i class="fa-solid fa-key"></i>
          <p>الخزنة المشفرة جاهزة. أضف مفاتيح الـ APIs أو بيانات السيرفرات لتشفيرها بـ AES-256.</p>
        </div>
      `}
    </div>
  `;

  sec.querySelector("#btn-lock-vault-now").onclick = () => {
    V6ExpansionState.vaultMasterPass = "";
    toast("🔒 تم قفل خزنة المطور وتأمين المفاتيح", "info");
    renderDeveloperVaultView();
  };

  sec.querySelector("#btn-add-vault-secret").onclick = () => {
    B().openFormModal("🔐 تشفير وحفظ مفتاح API أو بيانات سيرفر جديدة (AES-256)", `
      <div class="form-group">
        <label>اسم المفتاح أو السيرفر</label>
        <input name="title" required placeholder="مثال: Production Firebase Key / OpenAI API / Ubuntu VPS SSH" autofocus />
      </div>
      <div class="form-group">
        <label>التصنيف</label>
        <select name="category">
          <option value="🔑 API Key / Token">🔑 API Key / Token</option>
          <option value="🖥️ Server / SSH Credentials">🖥️ Server / SSH Credentials</option>
          <option value="🗄️ Database Connection URI">🗄️ Database Connection URI</option>
          <option value="⚙️ Environment Variables (.env)">⚙️ Environment Variables (.env)</option>
        </select>
      </div>
      <div class="form-group">
        <label>الدومين أو اسم المستخدم (اختياري)</label>
        <input name="host" dir="ltr" placeholder="root@192.168.1.1 / project-id" />
      </div>
      <div class="form-group">
        <label>القيمة السرية المراد تشفيرها بـ AES-256</label>
        <textarea name="secretValue" rows="3" dir="ltr" required placeholder="AIzaSy... أو كلمة المرور أو ملف الـ .env"></textarea>
      </div>
    `, async (d) => {
      const encData = await encryptSecretAES256(d.secretValue, V6ExpansionState.vaultMasterPass);
      vaultItems.unshift({
        id: "v_" + Date.now(),
        title: d.title,
        category: d.category,
        host: d.host,
        encData,
        date: today()
      });
      OSProStore.set("encrypted_dev_vault_v6", vaultItems);
      renderDeveloperVaultView();
      toast("تم تشفير المفتاح بـ AES-256 وحفظه في الخزنة! 🔐✅");
    });
  };

  sec.querySelectorAll("[data-vault-copy]").forEach(btn => {
    btn.onclick = () => {
      const it = decryptedList[Number(btn.dataset.vaultCopy)];
      if (it) copyTextSafely(it.secretVal, `تم نسخ "${it.title}" بأمان! 🔑`);
    };
  });

  sec.querySelectorAll("[data-vault-reveal]").forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.vaultReveal);
      const box = document.getElementById(`vault-val-box-${idx}`);
      const it = decryptedList[idx];
      if (!box || !it) return;
      if (box.dataset.shown === "1") {
        box.textContent = "••••••••••••••••••••••••••••";
        box.dataset.shown = "0";
      } else {
        box.textContent = it.secretVal;
        box.dataset.shown = "1";
      }
    };
  });

  sec.querySelectorAll("[data-vault-del]").forEach(btn => {
    btn.onclick = () => {
      if (!confirm("هل تريد حذف هذا المفتاح المشفر نهائياً؟")) return;
      vaultItems.splice(Number(btn.dataset.vaultDel), 1);
      OSProStore.set("encrypted_dev_vault_v6", vaultItems);
      renderDeveloperVaultView();
    };
  });
}

/* ============================================================================
   8. BOOTSTRAP & WIRE ALL 7 V6 FEATURES INTO TOPBAR, SIDEBAR & WHITEBOARD
   ============================================================================ */
function initV6ExpansionPack() {
  injectV6ExpansionStyles();

  // 1. حقن الاختصارات الـ 5 الجديدة + زر الغرفة المشتركة في الشريط العلوي
  const dock = document.getElementById("os-super-topbar-dock");
  if (dock && !document.getElementById("btn-top-prayer-radar")) {
    const extraBtnsHtml = `
      <button type="button" id="btn-top-prayer-radar" class="super-dock-pill prayer-radar-pill" title="كبسولة الصلاة القادمة والعداد التنازلي">
        <i class="fa-solid fa-mosque gold-text"></i>
        <span>الصلاة...</span>
      </button>

      <button type="button" id="btn-top-costudy-room" class="super-dock-pill ${V6ExpansionState.activeRoomCode ? "costudy-live-pill" : ""}" title="غرفة المذاكرة والسبورة المشتركة الحية مع زملائك (Live Co-Study Room)">
        <i class="fa-solid fa-users-rectangle gold-text"></i>
        <span>${V6ExpansionState.activeRoomCode ? "غرفة: " + esc(V6ExpansionState.activeRoomCode) : "غرفة مشتركة"}</span>
      </button>

      <button type="button" id="btn-top-ocr-scanner" class="btn-icon gold-glow" title="ماسح المحاضرات والأكواد من الصور (Smart OCR Scanner)">
        <i class="fa-solid fa-camera-retro"></i>
      </button>

      <button type="button" id="btn-top-multi-clip" class="btn-icon" title="الحافظة الذكية المتعددة (Multi-Clipboard History)">
        <i class="fa-solid fa-clipboard-list"></i>
      </button>

      <button type="button" id="btn-top-teleprompter" class="btn-icon" title="المُلقّن الذكي العائم لتسجيل الشروحات (Video Teleprompter)">
        <i class="fa-solid fa-scroll"></i>
      </button>

      <button type="button" id="btn-top-img2pdf" class="btn-icon" title="محول الصور والشيتات السريع إلى PDF واحد">
        <i class="fa-solid fa-file-pdf"></i>
      </button>
    `;
    dock.insertAdjacentHTML("afterbegin", extraBtnsHtml);

    document.getElementById("btn-top-prayer-radar")?.addEventListener("click", () => {
      B().switchView?.("islamic");
    });
    document.getElementById("btn-top-costudy-room")?.addEventListener("click", openCoStudyRoomModal);
    document.getElementById("btn-top-ocr-scanner")?.addEventListener("click", openSmartOCRScannerModal);
    document.getElementById("btn-top-multi-clip")?.addEventListener("click", openMultiClipboardModal);
    document.getElementById("btn-top-teleprompter")?.addEventListener("click", toggleFloatingTeleprompter);
    document.getElementById("btn-top-img2pdf")?.addEventListener("click", openImageToPdfConverterModal);

    updateTopbarPrayerRadar();
    setInterval(updateTopbarPrayerRadar, 30000);
  }

  // 2. إضافة تبويب "خزنة المطور المشفرة AES-256" في القائمة الجانبية
  const nav = document.querySelector(".sidebar-nav");
  const main = document.querySelector(".main-content");
  const footer = document.querySelector(".app-footer");
  if (nav && main && !nav.querySelector('[data-view="dev-vault"]')) {
    const vBtn = document.createElement("button");
    vBtn.className = "nav-item";
    vBtn.dataset.view = "dev-vault";
    vBtn.innerHTML = `<i class="fa-solid fa-user-shield gold-text"></i> <span>خزنة المطور المشفرة (AES-256)</span>`;
    vBtn.onclick = () => {
      B().switchView?.("dev-vault");
      renderDeveloperVaultView();
    };
    nav.appendChild(vBtn);

    const sec = document.createElement("section");
    sec.id = "view-dev-vault";
    sec.className = "view-section";
    main.insertBefore(sec, footer);
  }

  // 3. حقن أزرار (بث للغرفة المشتركة + الملقن الذكي) تلقائياً داخل السبورة الهندسية عند فتحها
  document.addEventListener("click", (e) => {
    if (e.target.closest("#btn-top-whiteboard, #btn-open-shared-wb")) {
      setTimeout(() => {
        const wbToolbars = document.querySelectorAll(".wb-studio-toolbar");
        const secondBar = wbToolbars[1];
        if (secondBar && !document.getElementById("btn-wb-live-sync-room")) {
          const container = secondBar.querySelector(".filters-row:last-child");
          if (container) {
            const syncBtn = document.createElement("button");
            syncBtn.type = "button";
            syncBtn.id = "btn-wb-live-sync-room";
            syncBtn.className = "btn btn-xs btn-outline";
            syncBtn.style.borderColor = "#19B889";
            syncBtn.innerHTML = `<i class="fa-solid fa-satellite-dish gold-text"></i> بث للغرفة المشتركة`;
            syncBtn.onclick = () => {
              if (!V6ExpansionState.activeRoomCode) {
                openCoStudyRoomModal();
              } else {
                broadcastWhiteboardToRoom();
              }
            };

            const tpBtn = document.createElement("button");
            tpBtn.type = "button";
            tpBtn.className = "btn btn-xs btn-outline";
            tpBtn.innerHTML = `<i class="fa-solid fa-scroll gold-text"></i> الملقن`;
            tpBtn.onclick = toggleFloatingTeleprompter;

            container.prepend(tpBtn);
            container.prepend(syncBtn);
          }
        }
      }, 120);
    }
  });

  // 4. التقاط أي نص ينسخه المستخدم داخل الحقول وحفظه تلقائياً في الحافظة المتعددة
  document.addEventListener("copy", () => {
    const sel = window.getSelection()?.toString();
    if (sel && sel.trim().length > 1) {
      addClipToMultiHistory(sel.trim());
    }
  });

  // 5. إعادة الاتصال التلقائي بغرفة المذاكرة المشتركة إن كانت نشطة
  if (V6ExpansionState.activeRoomCode) {
    setTimeout(() => joinOrCreateCoStudyRoom(V6ExpansionState.activeRoomCode, false), 1400);
  }
}

function bootAllOSProAndV6() {
  bootOSProV3();
  setTimeout(initV6ExpansionPack, 120);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => setTimeout(bootAllOSProAndV6, 250));
} else {
  setTimeout(bootAllOSProAndV6, 150);
}
/* ============================================================================
   PART 1: 100% ZOOM RESPONSIVE ENGINE FIX (AUTO-FIT TOPBAR, KPIS & ADMIN CARDS)
   يضمن ظهور كل الأزرار والكروت كاملة عند تكبير 100% بدون أي قص أو اختفاء
   ============================================================================ */
function inject100PercentResponsiveFix() {
  if (document.getElementById("os-100pct-responsive-fix")) return;
  const st = document.createElement("style");
  st.id = "os-100pct-responsive-fix";
  st.textContent = `
    /* منع أي عنصر من دفع الشاشة خارج حدود الـ 100% */
    .app-shell {
      width: 100% !important;
      max-width: 100vw !important;
      overflow-x: hidden !important;
    }
    .main-content {
      min-width: 0 !important;
      max-width: 100% !important;
      overflow-x: hidden !important;
    }
    /* جعل الشريط العلوي يلتف بذكاء في سطرين متناسقين عند امتلائه بالأدوات */
    .topbar {
      flex-wrap: wrap !important;
      gap: 8px 12px !important;
      padding: 10px 16px !important;
      height: auto !important;
    }
    .topbar-start {
      flex-wrap: wrap !important;
      gap: 8px !important;
      min-width: 0 !important;
    }
    .topbar-start h1 {
      font-size: 1.1rem !important;
      white-space: nowrap !important;
    }
    .topbar-end {
      flex-wrap: wrap !important;
      justify-content: flex-end !important;
      gap: 5px !important;
      max-width: 100% !important;
      flex: 1 1 auto !important;
    }
    .os-super-topbar-dock {
      flex-wrap: wrap !important;
      gap: 5px !important;
      padding: 4px 8px !important;
      max-width: 100% !important;
    }
    .super-dock-pill {
      padding: 4px 9px !important;
      font-size: 0.72rem !important;
    }
    .topbar .btn-icon {
      width: 32px !important;
      height: 32px !important;
      min-width: 32px !important;
    }
    /* ضبط الكروت الـ 4 الإحصائية لتظهر كلها في صف واحد عند 100% */
    .kpi-grid {
      grid-template-columns: repeat(auto-fit, minmax(185px, 1fr)) !important;
      gap: 12px !important;
    }
    .admin-hero-banner, .welcome-banner, .track-hero-card, .pro-hero-banner {
      padding: 18px 20px !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
    }
  `;
  document.head.appendChild(st);
}
inject100PercentResponsiveFix();

/* ============================================================================
   PART 2: ULTIMATE ENGINEERING WHITEBOARD STUDIO 2.0 (ALL 20 MODULES)
   1. Infinite Canvas (Zoom, Pan, Fit, Center, Minimap, 7 Grids, Snap-to-Grid)
   2. Advanced Drawing (Pen, Pencil, Brush, Highlighter, Tech Pen, Calligraphy,
      Laser, Object/Stroke Eraser, Multi-Select, Duplicate, Lock, Z-Order, Rotate)
   3. Smart Shapes & Auto-Recognition (Rect, Circle, Triangle, Diamond, Hex,
      Star, 3D Cube/Cylinder/Pyramid, Sticky Notes, Code Block + Hand-Shape AI)
   4. Smart Connectors & Auto-Layout (Curved, Straight, Elbow, Orthogonal,
      Bidirectional, Dashed + Tree / Radial / Horizontal / Vertical Auto-Layout)
   5. Engineering Toolkit (Electrical Symbols: Resistor, Capacitor, Inductor,
      Diode, LED, Transistor, AC/DC, GND + Logic Gates: AND, OR, NOT, NAND, XOR,
      Truth Table + Geometry: Interactive Ruler, Protractor, Dimension Line +
      Math/Physics: Live Function Plotter f(x), LaTeX Stamp, Force Vector, Wave)
   6. Board-Aware AI Assistant (Explain Board, Check Circuit, Generate MindMap,
      Flowchart, Electrical Circuit, UML, Quiz & OCR Image Analysis)
   7. Presentation Slides Mode + Layers/Objects Inspector + 12 Templates +
      Export/Import Center (PNG, Transparent PNG, JPG, SVG, PDF, JSON, MP4) +
      Version History & Keyboard Shortcuts (V, P, E, T, L, R, C, Space, Ctrl+Z/Y/D)
   ============================================================================ */

const WB2Templates = {
  elec_rectifier: {
    name: "⚡ دائرة توحيد التيار (Bridge Rectifier Circuit)",
    bgMode: "eng",
    nodes: [
      { id: "e1", text: "AC 220V", shape: "elec_ac", val: "220V 50Hz", x: 180, y: 240, w: 95, h: 65, color: "#38BDF8", parentId: null },
      { id: "e2", text: "Transformer", shape: "elec_trans", val: "12V RMS", x: 350, y: 240, w: 105, h: 70, color: "#D4A72C", parentId: "e1" },
      { id: "e3", text: "Diode D1", shape: "elec_diode", val: "1N4007", x: 530, y: 160, w: 95, h: 50, color: "#10B981", parentId: "e2" },
      { id: "e4", text: "Filter Cap C1", shape: "elec_cap", val: "1000μF", x: 700, y: 240, w: 95, h: 60, color: "#A855F7", parentId: "e3" },
      { id: "e5", text: "Load R_L", shape: "elec_res", val: "1kΩ", x: 870, y: 240, w: 100, h: 52, color: "#F59E0B", parentId: "e4" },
      { id: "e6", text: "GND", shape: "elec_gnd", val: "0V", x: 700, y: 370, w: 80, h: 50, color: "#94A3B8", parentId: "e4" }
    ]
  },
  logic_adder: {
    name: "🔌 دائرة الجامع الكامل المنطقية (Full Adder Logic Circuit)",
    bgMode: "eng",
    nodes: [
      { id: "l1", text: "Input A & B", shape: "rect", val: "A=1, B=0", x: 170, y: 190, w: 120, h: 46, color: "#D4A72C", parentId: null },
      { id: "l2", text: "XOR Gate 1", shape: "gate_xor", val: "A ⊕ B", x: 380, y: 140, w: 110, h: 56, color: "#38BDF8", parentId: "l1" },
      { id: "l3", text: "AND Gate 1", shape: "gate_and", val: "A · B", x: 380, y: 270, w: 110, h: 56, color: "#10B981", parentId: "l1" },
      { id: "l4", text: "XOR Gate 2 (SUM)", shape: "gate_xor", val: "Sum = A⊕B⊕Cin", x: 620, y: 140, w: 140, h: 56, color: "#D4A72C", parentId: "l2" },
      { id: "l5", text: "OR Gate (CARRY)", shape: "gate_or", val: "Cout", x: 620, y: 270, w: 130, h: 56, color: "#F43F5E", parentId: "l3" }
    ]
  },
  cyber_soc: {
    name: "🛡️ معمارية الدفاع والاستجابة للحوادث (SOC & Incident Response)",
    bgMode: "grid",
    nodes: [
      { id: "c1", text: "🌐 Firewall & WAF", shape: "hexagon", val: "Edge Filter", x: 200, y: 220, w: 150, h: 54, color: "#38BDF8", parentId: null },
      { id: "c2", text: "📊 SIEM (Splunk/Wazuh)", shape: "cylinder", val: "Log Aggregation", x: 450, y: 220, w: 175, h: 64, color: "#D4A72C", parentId: "c1" },
      { id: "c3", text: "🚨 SOC L1/L2 Triage", shape: "diamond", val: "Alert Analysis", x: 700, y: 140, w: 165, h: 60, color: "#F59E0B", parentId: "c2" },
      { id: "c4", text: "🧬 DFIR Memory Forensics", shape: "rect", val: "Volatility 3", x: 700, y: 300, w: 175, h: 50, color: "#F43F5E", parentId: "c2" },
      { id: "c5", text: "✅ Containment & Patch", shape: "round_rect", val: "Isolated", x: 940, y: 220, w: 165, h: 50, color: "#10B981", parentId: "c3" }
    ]
  },
  swe_arch: {
    name: "💻 معمارية الأنظمة الشاملة (Full-Stack System Architecture)",
    bgMode: "dots",
    nodes: [
      { id: "s1", text: "⚛️ Client (React / Next.js)", shape: "round_rect", val: "HTTPS / WSS", x: 190, y: 220, w: 175, h: 50, color: "#38BDF8", parentId: null },
      { id: "s2", text: "⚖️ Nginx Load Balancer", shape: "hexagon", val: "Reverse Proxy", x: 430, y: 220, w: 165, h: 54, color: "#D4A72C", parentId: "s1" },
      { id: "s3", text: "⚙️ Backend API (Node/Laravel)", shape: "cube", val: "REST / GraphQL", x: 680, y: 150, w: 185, h: 56, color: "#10B981", parentId: "s2" },
      { id: "s4", text: "⚡ Redis In-Memory Cache", shape: "diamond", val: "Sub-ms Latency", x: 680, y: 300, w: 175, h: 56, color: "#F43F5E", parentId: "s2" },
      { id: "s5", text: "🗄️ PostgreSQL Primary DB", shape: "cylinder", val: "ACID Storage", x: 930, y: 220, w: 175, h: 64, color: "#A855F7", parentId: "s3" }
    ]
  }
};

// توسيع حالة السبورة لتشمل الـ 20 محوراً مع الحفاظ الكامل على البيانات السابقة
Object.assign(WBState, {
  zoom: 1,
  panX: 0,
  panY: 0,
  spacePressed: false,
  snapToGrid: true,
  gridSize: 32,
  showMinimap: true,
  smartShapeRecognition: true,
  connectorType: "curved", // curved | straight | elbow | dashed | double
  lineStyle: "solid", // solid | dashed | dotted
  fillMode: "solid", // solid | gradient | glass
  shadowEnabled: true,
  opacity: 1,
  showRuler: false,
  showProtractor: false,
  rulerPos: { x: 220, y: 380, w: 420 },
  protractorPos: { x: 520, y: 260, r: 110 },
  redoStack: [],
  versions: OSProStore.get("wb2_versions", []),
  slides: OSProStore.get("wb2_slides", []),
  activeSlideIdx: -1,
  presentationMode: false,
  spotlightMode: false,
  mouseWorld: { x: 400, y: 250 },
  activeSideDrawer: null // null | "layers" | "ai" | "slides"
});

function injectWB2StudioStyles() {
  if (document.getElementById("wb2-studio-pro-styles")) return;
  const st = document.createElement("style");
  st.id = "wb2-studio-pro-styles";
  st.textContent = `
    .wb2-workspace-wrap {
      position: relative;
      width: 100%;
      display: flex;
      gap: 10px;
      align-items: stretch;
    }
    .wb2-side-drawer {
      width: 295px;
      min-width: 295px;
      max-height: 520px;
      background: rgba(11, 16, 29, 0.97);
      border: 1px solid rgba(212, 167, 44, 0.4);
      border-radius: 16px;
      padding: 12px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .wb-studio-fullscreen .wb2-side-drawer {
      max-height: calc(100vh - 185px) !important;
    }
    .wb2-layer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      font-size: 0.78rem;
      cursor: pointer;
    }
    .wb2-layer-row.active {
      border-color: var(--gold-primary);
      background: rgba(212, 167, 44, 0.14);
    }
    .wb2-floating-hud {
      position: absolute;
      bottom: 14px;
      left: 14px;
      display: flex;
      gap: 6px;
      align-items: center;
      background: rgba(9, 13, 25, 0.92);
      border: 1px solid rgba(212, 167, 44, 0.4);
      padding: 5px 10px;
      border-radius: 99px;
      z-index: 10;
      font-size: 0.75rem;
    }
    /* وضع المحاضرات والعرض التقديمي (Presentation Mode) */
    .wb-presentation-active .wb-studio-toolbar,
    .wb-presentation-active .modal-header {
      display: none !important;
    }
    .wb-presentation-active .whiteboard-canvas-box {
      height: calc(100vh - 50px) !important;
    }
  `;
  document.head.appendChild(st);
}

// دالة حفظ واسترجاع اللوحة تلقائياً (Autosave & Recovery)
function autoSaveWB2Board() {
  try {
    const cleanNodes = (WBState.nodes || []).map(n => ({ ...n }));
    const cleanStrokes = (WBState.strokes || []).slice(-300);
    OSProStore.set("wb2_autosave_board", {
      nodes: cleanNodes,
      strokes: cleanStrokes,
      bgMode: WBState.bgMode,
      connectorType: WBState.connectorType
    });
  } catch (e) {}
}

function loadAutoSavedWB2Board() {
  const saved = OSProStore.get("wb2_autosave_board", null);
  if (saved && Array.isArray(saved.nodes) && saved.nodes.length) {
    WBState.nodes = saved.nodes;
    WBState.strokes = saved.strokes || [];
    WBState.bgMode = saved.bgMode || "grid";
    WBState.connectorType = saved.connectorType || "curved";
  }
}
loadAutoSavedWB2Board();

function pushWB2Undo() {
  WBState.undoStack.push(JSON.stringify({
    nodes: WBState.nodes,
    strokes: WBState.strokes
  }));
  if (WBState.undoStack.length > 35) WBState.undoStack.shift();
  WBState.redoStack = [];
  autoSaveWB2Board();
}

// خوارزمية الترتيب التلقائي للفروع والمخططات (Auto-Layout: Tree, Radial, Horizontal, Vertical)
function applyWB2AutoLayout(mode = "tree", canvasW = 1000, canvasH = 540) {
  if (!WBState.nodes.length) return;
  pushWB2Undo();

  const roots = WBState.nodes.filter(n => !n.parentId || !WBState.nodes.some(p => p.id === n.parentId));
  if (mode === "radial") {
    const cx = canvasW / 2;
    const cy = canvasH / 2;
    const main = roots[0] || WBState.nodes[0];
    main.x = cx;
    main.y = cy;
    const others = WBState.nodes.filter(n => n.id !== main.id);
    others.forEach((nd, i) => {
      const angle = (2 * Math.PI * i) / Math.max(1, others.length);
      const radius = nd.parentId === main.id ? 175 : 290;
      nd.x = Math.round(cx + Math.cos(angle) * radius);
      nd.y = Math.round(cy + Math.sin(angle) * radius);
    });
  } else if (mode === "horizontal") {
    const levels = {};
    const getDepth = (n, d = 0) => {
      if (!n.parentId || d > 8) return d;
      const p = WBState.nodes.find(x => x.id === n.parentId);
      return p ? getDepth(p, d + 1) : d;
    };
    WBState.nodes.forEach(n => {
      const lv = getDepth(n);
      levels[lv] = levels[lv] || [];
      levels[lv].push(n);
    });
    Object.entries(levels).forEach(([lv, list]) => {
      const x = 140 + Number(lv) * 240;
      const stepY = Math.max(70, (canvasH - 80) / Math.max(1, list.length));
      list.forEach((nd, idx) => {
        nd.x = x;
        nd.y = Math.round(60 + idx * stepY + stepY / 2);
      });
    });
  } else {
    // Tree Vertical Hierarchy
    const levels = {};
    const getDepth = (n, d = 0) => {
      if (!n.parentId || d > 8) return d;
      const p = WBState.nodes.find(x => x.id === n.parentId);
      return p ? getDepth(p, d + 1) : d;
    };
    WBState.nodes.forEach(n => {
      const lv = getDepth(n);
      levels[lv] = levels[lv] || [];
      levels[lv].push(n);
    });
    Object.entries(levels).forEach(([lv, list]) => {
      const y = 75 + Number(lv) * 120;
      const stepX = Math.max(175, (canvasW - 100) / Math.max(1, list.length));
      list.forEach((nd, idx) => {
        nd.x = Math.round(50 + idx * stepX + stepX / 2);
        nd.y = y;
      });
    });
  }
  toast(`✨ تم ترتيب المخطط تلقائياً بنمط (${mode.toUpperCase()}) بدون أي تداخل!`);
}

// الترقية الشاملة لدالة فتح السبورة الهندسية 2.0
openSmartWhiteboardModal = function(autoStartPrivateRecord = false) {
  injectWB2StudioStyles();
  document.body.classList.add("wb-fullscreen-mode");

  B().openFormModal("🎨 استوديو السبورة الهندسية الذكية 2.0 (Infinite Engineering, Circuits, Logic & AI Studio)", `
    <!-- الشريط الأول: التنقل اللانهائي + أقلام الرسم + الأشكال الذكية + المسح -->
    <div class="wb-studio-toolbar">
      <div class="filters-row" style="gap:4px;">
        <button type="button" class="wb-tool-btn ${WBState.tool === "select" ? "active" : ""}" data-wb-tool="select" title="تحديد وتحريك العناصر (اختصار: V)"><i class="fa-solid fa-arrow-pointer"></i> تحديد (V)</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "pan" ? "active" : ""}" data-wb-tool="pan" title="تحريك اللوحة اللانهائية (أو Space + سحب)"><i class="fa-solid fa-hand"></i> تحريك اللوحة</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "pen" ? "active" : ""}" data-wb-tool="pen" title="قلم رسم ناعم + تحويل تلقائي للأشكال (P)"><i class="fa-solid fa-pen"></i> قلم (P)</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "tech_pen" ? "active" : ""}" data-wb-tool="tech_pen" title="قلم هندسي تقني دقيق"><i class="fa-solid fa-pen-nib"></i> قلم هندسي</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "highlight" ? "active" : ""}" data-wb-tool="highlight"><i class="fa-solid fa-highlighter"></i> ماركر</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "laser" ? "active" : ""}" data-wb-tool="laser"><i class="fa-solid fa-wand-magic-sparkles"></i> ليزر</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "arrow" ? "active" : ""}" data-wb-tool="arrow"><i class="fa-solid fa-arrow-trend-up"></i> سهم</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "dimension" ? "active" : ""}" data-wb-tool="dimension" title="خط قياس أبعاد هندسي يحسب المسافة بالملليمتر والـ px تلقائياً"><i class="fa-solid fa-ruler-horizontal gold-text"></i> خط أبعاد قياسي</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "rect" ? "active" : ""}" data-wb-tool="rect"><i class="fa-regular fa-square"></i> مستطيل (R)</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "circle" ? "active" : ""}" data-wb-tool="circle"><i class="fa-regular fa-circle"></i> دائرة (C)</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "text" ? "active" : ""}" data-wb-tool="text"><i class="fa-solid fa-font"></i> نص (T)</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "eraser" ? "active" : ""}" data-wb-tool="eraser" title="ممحاة (E)"><i class="fa-solid fa-eraser"></i> ممحاة</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "obj_eraser" ? "active" : ""}" data-wb-tool="obj_eraser" title="ممحاة عناصر ذكية: اضغط على أي خط أو شكل لحذفه فوراً"><i class="fa-solid fa-trash-can text-danger"></i> مسح عنصر</button>
      </div>

      <div class="filters-row" style="gap:5px;">
        <input type="color" id="wb-color" value="${WBState.color}" style="width:34px; height:30px; padding:1px; cursor:pointer;" title="اللون" />
        <input type="range" id="wb-size" min="2" max="18" value="${WBState.size}" style="width:65px;" title="السمك" />
        <select id="wb-linestyle-select" class="select-sm" style="min-width:90px; padding:4px 6px;" title="نوع الخط">
          <option value="solid" ${WBState.lineStyle === "solid" ? "selected" : ""}>─── متصل</option>
          <option value="dashed" ${WBState.lineStyle === "dashed" ? "selected" : ""}>- - - متقطع</option>
          <option value="dotted" ${WBState.lineStyle === "dotted" ? "selected" : ""}>•••• منقط</option>
        </select>
        <select id="wb-bg-select" class="select-sm" style="min-width:125px; padding:4px 6px;" title="نوع شبكة الخلفية">
          <option value="grid" ${WBState.bgMode === "grid" ? "selected" : ""}>📐 شبكة مربعات</option>
          <option value="eng" ${WBState.bgMode === "eng" ? "selected" : ""}>📏 شبكة هندسية دقيقة</option>
          <option value="iso" ${WBState.bgMode === "iso" ? "selected" : ""}>🧊 شبكة أيزومترك 3D</option>
          <option value="polar" ${WBState.bgMode === "polar" ? "selected" : ""}>🎯 شبكة قطبية دائرية</option>
          <option value="dots" ${WBState.bgMode === "dots" ? "selected" : ""}>⠿ نقاط رقمية</option>
          <option value="dark" ${WBState.bgMode === "dark" ? "selected" : ""}>🌑 كحلي سادة</option>
          <option value="white" ${WBState.bgMode === "white" ? "selected" : ""}>⬜ سبورة بيضاء</option>
        </select>
      </div>
    </div>

    <!-- الشريط الثاني: الأدوات الهندسية المتخصصة (كهرباء، منطق رقمي، رياضيات، فيزياء، مسطرة ومنقلة) + القوالب والـ AI -->
    <div class="wb-studio-toolbar" style="background:rgba(14, 21, 38, 0.96);">
      <div class="filters-row" style="gap:5px;">
        <!-- مكتبة الرموز الهندسية والكهربائية والمنطقية والأشكال ثلاثية الأبعاد -->
        <select id="wb2-eng-symbol-picker" class="select-sm" style="min-width:175px; padding:5px 8px; border-color:var(--gold-primary);">
          <option value="">⚡ أدرج رمزاً هندسياً / منطقياً / 3D...</option>
          <optgroup label="🔌 هندسة كهربائية وإلكترونيات">
            <option value="elec_res">〰️ مقاومة كهربائية (Resistor Ω)</option>
            <option value="elec_cap">╣╠ مكثف كهربائي (Capacitor μF)</option>
            <option value="elec_ind">➿ ملف حثي (Inductor mH)</option>
            <option value="elec_diode">▶️| دايود موحد (Diode)</option>
            <option value="elec_led">💡 دايود ضوئي (LED)</option>
            <option value="elec_trans"> transistor ترانزستور (NPN / MOSFET)</option>
            <option value="elec_dc">🔋 مصدر جهد مستمر (DC Voltage)</option>
            <option value="elec_ac">〰️ مصدر تيار متردد (AC Source)</option>
            <option value="elec_gnd">⏚ أرضي مشترك (Ground GND)</option>
            <option value="elec_sw">_/ _ مفتاح قاطع (Switch)</option>
          </optgroup>
          <optgroup label="🔢 بوابات منطقية (Digital Logic Design)">
            <option value="gate_and">D بوابة AND المنطقية</option>
            <option value="gate_or">☽ بوابة OR المنطقية</option>
            <option value="gate_not">▷o بوابة العاكس NOT</option>
            <option value="gate_nand">Do بوابة NAND</option>
            <option value="gate_xor">⊕ بوابة XOR</option>
            <option value="gate_ff">🎛️ قلاب D / JK Flip-Flop</option>
            <option value="truth_table">📋 إدراج جدول حقيقة (Truth Table)</option>
          </optgroup>
          <optgroup label="🧊 أشكال 3D وملاحظات وبلوكات كود">
            <option value="sticky">🟨 ملاحظة لاصقة (Sticky Note)</option>
            <option value="code_block">💻 بلوك كود برمجي (Code Block)</option>
            <option value="cube">🧊 مكعب ثلاثي الأبعاد (3D Cube)</option>
            <option value="cylinder">🛢️ أسطوانة / قاعدة بيانات (Cylinder)</option>
            <option value="pyramid">🔺 هرم هندسي (Pyramid)</option>
            <option value="hexagon">⬢ سداسي (Hexagon Node)</option>
            <option value="star">⭐ نجمة (Star)</option>
          </optgroup>
          <optgroup label="📐 رياضيات وفيزياء وموجات">
            <option value="math_plot">📈 رسم دالة رياضية f(x) على المحاور</option>
            <option value="math_eq">∑ معادلة رياضية / فيزيائية (LaTeX)</option>
            <option value="phys_vec">↗️ متجه قوة (Force Vector FBD)</option>
            <option value="phys_wave">〰️ موجة جيبية / مربعة (Waveform)</option>
          </optgroup>
        </select>

        <button type="button" id="btn-wb2-ruler" class="wb-tool-btn ${WBState.showRuler ? "active" : ""}" title="إظهار/إخفاء المسطرة الهندسية المدرجة"><i class="fa-solid fa-ruler"></i> مسطرة</button>
        <button type="button" id="btn-wb2-protractor" class="wb-tool-btn ${WBState.showProtractor ? "active" : ""}" title="إظهار/إخفاء المنقلة الهندسية لقياس الزوايا"><i class="fa-solid fa-compass-drafting"></i> منقلة</button>

        <!-- نوع الروابط والترتيب التلقائي -->
        <select id="wb2-connector-select" class="select-sm" style="min-width:115px; padding:4px 6px;" title="شكل خطوط الربط بين الفروع">
          <option value="curved" ${WBState.connectorType === "curved" ? "selected" : ""}>↪️ رابط منحني</option>
          <option value="elbow" ${WBState.connectorType === "elbow" ? "selected" : ""}> orthogonal رابط زاوية قائمة</option>
          <option value="straight" ${WBState.connectorType === "straight" ? "selected" : ""}>╱ رابط مستقيم</option>
          <option value="dashed" ${WBState.connectorType === "dashed" ? "selected" : ""}>┅ رابط متقطع</option>
        </select>

        <select id="wb2-autolayout-select" class="select-sm" style="min-width:125px; padding:4px 6px;" title="ترتيب المخطط تلقائياً بدون تداخل">
          <option value="">✨ ترتيب تلقائي (Auto-Layout)...</option>
          <option value="tree">🌳 تخطيط شجري رأسي (Tree)</option>
          <option value="horizontal">➡️ تخطيط أفقي متسلسل (Flow)</option>
          <option value="radial">☀️ تخطيط ذهني دائري (Radial)</option>
        </select>

        <!-- قوالب جاهزة -->
        <select id="wb2-template-select" class="select-sm" style="min-width:130px; padding:4px 6px;" title="تحميل قالب هندسي أو برمجي جاهز">
          <option value="">📋 مكتبة القوالب الجاهزة...</option>
          <option value="elec_rectifier">⚡ دائرة توحيد كهربائية</option>
          <option value="logic_adder">🔌 دائرة Full-Adder منطقية</option>
          <option value="cyber_soc">🛡️ معمارية SOC والأمن السيبراني</option>
          <option value="swe_arch">💻 معمارية نظام Full-Stack</option>
        </select>
      </div>

      <div class="filters-row" style="gap:5px;">
        <button type="button" id="btn-wb-spawn-branches" class="btn btn-xs btn-gold" style="background:linear-gradient(135deg,#19B889,#059669)!important; color:#05070e!important;">
          <i class="fa-solid fa-code-branch"></i> + فرّع من المحدد
        </button>
        <button type="button" id="btn-wb2-ai-drawer" class="btn btn-xs btn-gold">
          <i class="fa-solid fa-wand-magic-sparkles"></i> مساعد السبورة AI
        </button>
        <button type="button" id="btn-wb2-layers-drawer" class="btn btn-xs btn-outline">
          <i class="fa-solid fa-layer-group gold-text"></i> الطبقات (${WBState.nodes.length + WBState.strokes.length})
        </button>
        <button type="button" id="btn-wb2-present-mode" class="btn btn-xs btn-outline" title="وضع الشرح والمحاضرات بدون قوائم">
          <i class="fa-solid fa-person-chalkboard gold-text"></i> وضع المحاضرة
        </button>
      </div>
    </div>

    <!-- الشريط الثالث: التحكم في العناصر + الاستيراد والتصدير الاحترافي (PNG, SVG, PDF, JSON, MP4) -->
    <div class="wb-studio-toolbar" style="background:rgba(10, 14, 26, 0.95); padding:7px 12px;">
      <div class="filters-row" style="gap:4px;">
        <button type="button" id="btn-wb-add-root" class="btn btn-xs btn-outline">+ عقدة</button>
        <button type="button" id="btn-wb-toggle-shape" class="btn btn-xs btn-outline">تغيير الشكل</button>
        <button type="button" id="btn-wb-edit-node" class="btn btn-xs btn-outline">تعديل النص/القيمة</button>
        <button type="button" id="btn-wb2-duplicate" class="btn btn-xs btn-outline" title="تكرار العنصر المحدد (Ctrl+D)"><i class="fa-regular fa-clone gold-text"></i> تكرار</button>
        <button type="button" id="btn-wb2-rotate" class="btn btn-xs btn-outline" title="تدوير العنصر المحدد 45°"><i class="fa-solid fa-rotate-right gold-text"></i> تدوير</button>
        <button type="button" id="btn-wb2-lock" class="btn btn-xs btn-outline" title="قفل/فك قفل العنصر"><i class="fa-solid fa-lock gold-text"></i> قفل</button>
        <button type="button" id="btn-wb-scale-up" class="btn btn-xs btn-outline" title="تكبير العنصر"><i class="fa-solid fa-plus"></i></button>
        <button type="button" id="btn-wb-scale-down" class="btn btn-xs btn-outline" title="تصغير العنصر"><i class="fa-solid fa-minus"></i></button>
        <label class="btn btn-xs btn-outline" style="cursor:pointer; margin:0;">
          <i class="fa-regular fa-image gold-text"></i> + صورة
          <input type="file" id="wb-img-upload-inp" accept="image/*" class="hidden" />
        </label>
        <button type="button" id="btn-wb-del-node" class="btn btn-xs btn-outline text-danger"><i class="fa-solid fa-xmark"></i> حذف</button>
      </div>

      <div class="filters-row" style="gap:4px;">
        <button type="button" id="btn-wb-undo" class="btn btn-xs btn-outline" title="Ctrl+Z"><i class="fa-solid fa-rotate-left"></i></button>
        <button type="button" id="btn-wb2-redo" class="btn btn-xs btn-outline" title="Ctrl+Y"><i class="fa-solid fa-rotate-right"></i></button>
        <button type="button" id="btn-wb2-save-version" class="btn btn-xs btn-outline" title="حفظ نسخة مسماة في السجل"><i class="fa-solid fa-clock-rotate-left gold-text"></i> حفظ إصدار</button>
        <select id="wb2-export-select" class="select-sm" style="min-width:130px; padding:4px 6px; border-color:#19B889;">
          <option value="">📥 تصدير واستيراد...</option>
          <option value="png">📸 صورة عالية الدقة (PNG)</option>
          <option value="png_trans">✨ صورة شفافة بدون خلفية (PNG)</option>
          <option value="svg">📐 ملف متجهي قياسي (SVG)</option>
          <option value="pdf">📄 مستند جاهز للطباعة (PDF)</option>
          <option value="json">💾 حفظ كمشروع قابل للتعديل (.JSON)</option>
          <option value="import_json">📂 فتح مشروع محفوظ (.JSON)</option>
        </select>
        <input type="file" id="wb2-import-json-inp" accept=".json" class="hidden" />
        <button type="button" id="btn-wb-rec-mp4" class="btn btn-xs btn-outline" style="border-color:#19B889;">
          <i class="fa-solid fa-video gold-text"></i> <span id="wb-rec-btn-lbl">MP4 🔒</span>
        </button>
        <button type="button" id="btn-wb-clear" class="btn btn-xs btn-danger"><i class="fa-solid fa-trash"></i></button>
        <button type="button" id="btn-wb-fullscreen" class="btn btn-xs btn-gold"><i class="fa-solid fa-expand"></i> ملء الشاشة</button>
      </div>
    </div>

    <!-- منطقة العمل: الكانفاس اللانهائي + الدرج الجانبي الذكي (الطبقات أو الـ AI) -->
    <div class="wb2-workspace-wrap">
      <div style="flex:1; position:relative; overflow:hidden;">
        <canvas id="smart-whiteboard-canvas" class="whiteboard-canvas-box"></canvas>

        <!-- شريط التحكم العائم في الزووم والـ Infinite Canvas والشرائح -->
        <div class="wb2-floating-hud">
          <button type="button" id="btn-wb2-zoom-out" class="btn-icon-xs" title="تصغير اللوحة"><i class="fa-solid fa-minus"></i></button>
          <strong id="wb2-zoom-lbl" class="gold-text" style="min-width:42px; text-align:center;">${Math.round(WBState.zoom * 100)}%</strong>
          <button type="button" id="btn-wb2-zoom-in" class="btn-icon-xs" title="تكبير اللوحة"><i class="fa-solid fa-plus"></i></button>
          <button type="button" id="btn-wb2-zoom-fit" class="btn-icon-xs" title="توسيط وإظهار كل اللوحة"><i class="fa-solid fa-compress"></i></button>
          <label style="display:inline-flex; align-items:center; gap:4px; margin:0 6px; cursor:pointer;">
            <input type="checkbox" id="wb2-snap-chk" ${WBState.snapToGrid ? "checked" : ""} style="width:14px; height:14px;" />
            <span>Snap</span>
          </label>
          <label style="display:inline-flex; align-items:center; gap:4px; cursor:pointer;" title="تحويل الدوائر والمربعات المرسومة باليد تلقائياً لأشكال هندسية منتظمة">
            <input type="checkbox" id="wb2-autoshape-chk" ${WBState.smartShapeRecognition ? "checked" : ""} style="width:14px; height:14px;" />
            <span>Auto-Shape</span>
          </label>
          <button type="button" id="btn-wb2-add-slide" class="btn btn-xs btn-outline" style="padding:2px 8px;">+ شريحة عرض (${WBState.slides.length})</button>
          ${WBState.slides.length ? `<button type="button" id="btn-wb2-next-slide" class="btn btn-xs btn-gold" style="padding:2px 8px;">الشريحة التالية ➔</button>` : ""}
        </div>
      </div>

      <!-- الدرج الجانبي (يظهر عند فتح مساعد السبورة AI أو مدير الطبقات Layers) -->
      <div id="wb2-side-drawer" class="wb2-side-drawer ${WBState.activeSideDrawer ? "" : "hidden"}"></div>
    </div>

    <div class="flex-between mt-1 small-muted">
      <span>⌨️ <strong>اختصارات سريعة:</strong> (V) تحديد • (P) قلم • (E) ممحاة • (R) مستطيل • (C) دائرة • (T) نص • (Space + سحب) تحريك اللوحة اللانهائية • (Ctrl+Z / Ctrl+Y) تراجع وإعادة • (Ctrl+D) تكرار</span>
      <span id="wb-selected-node-indicator" class="gold-text">المحدد: جاهز للرسم الهندسي</span>
    </div>
  `, async () => {});

  const modalCard = document.querySelector("#universal-modal .modal-card");
  modalCard?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  const closeBtn = document.getElementById("btn-close-modal");
  const origClose = closeBtn?.onclick;
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      autoSaveWB2Board();
      document.body.classList.remove("wb-fullscreen-mode");
      modalCard?.classList.remove("wb-studio-fullscreen", "wb-presentation-active");
      if (origClose) origClose(e);
    };
  }

  const canvas = document.getElementById("smart-whiteboard-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const redraw = () => renderWhiteboardScene(ctx, canvas.width, canvas.height);
  const resizeBoard = () => {
    canvas.width = canvas.clientWidth || 960;
    canvas.height = canvas.clientHeight || 520;
    redraw();
  };
  setTimeout(resizeBoard, 40);

  // تحويل إحداثيات الشاشة إلى إحداثيات اللوحة اللانهائية (Infinite World Coordinates)
  const screenToWorld = (sx, sy) => ({
    x: (sx - WBState.panX) / WBState.zoom,
    y: (sy - WBState.panY) / WBState.zoom
  });

  const snapVal = (v) => WBState.snapToGrid ? Math.round(v / WBState.gridSize) * WBState.gridSize : v;

  let isDraggingNode = null;
  let isDraggingImg = null;
  let isResizingImg = null;
  let isDraggingStroke = null;
  let isDraggingRuler = false;
  let isDraggingProtractor = false;
  let isPanningBoard = false;
  let panStartX = 0, panStartY = 0;
  let dragOffsetX = 0, dragOffsetY = 0;
  let isDrawingStroke = false;
  let currentStroke = null;

  const getRawPos = (e) => {
    const r = canvas.getBoundingClientRect();
    const cx = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
    const cy = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);
    const sx = cx - r.left;
    const sy = cy - r.top;
    const w = screenToWorld(sx, sy);
    return { sx, sy, x: w.x, y: w.y };
  };

  const findNodeAt = (x, y) => {
    for (let i = WBState.nodes.length - 1; i >= 0; i--) {
      const nd = WBState.nodes[i];
      if (nd.hidden) continue;
      if (x >= nd.x - nd.w / 2 && x <= nd.x + nd.w / 2 && y >= nd.y - nd.h / 2 && y <= nd.y + nd.h / 2) {
        return nd;
      }
    }
    return null;
  };

  const findImgAt = (x, y) => {
    for (let i = WBState.images.length - 1; i >= 0; i--) {
      const im = WBState.images[i];
      if (x >= im.x + im.w - 22 && x <= im.x + im.w + 12 && y >= im.y + im.h - 22 && y <= im.y + im.h + 12) {
        return { img: im, resize: true };
      }
      if (x >= im.x && x <= im.x + im.w && y >= im.y && y <= im.y + im.h) {
        return { img: im, resize: false };
      }
    }
    return null;
  };

  const findStrokeAt = (x, y) => {
    for (let i = WBState.strokes.length - 1; i >= 0; i--) {
      const s = WBState.strokes[i];
      if (s.hidden) continue;
      if (s.type === "text") {
        const w = Math.max(60, (s.text || "").length * (s.size * 2.6));
        const h = Math.max(28, s.size * 5);
        if (x >= s.x - 10 && x <= s.x + w + 10 && y >= s.y - h && y <= s.y + 12) return { stroke: s, idx: i };
      } else if (s.type === "rect" || s.type === "dimension" || s.type === "line" || s.type === "arrow") {
        const minX = Math.min(s.x1, s.x2) - 10, maxX = Math.max(s.x1, s.x2) + 10;
        const minY = Math.min(s.y1, s.y2) - 10, maxY = Math.max(s.y1, s.y2) + 10;
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) return { stroke: s, idx: i };
      } else if (s.type === "circle") {
        const r = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
        if (Math.hypot(x - s.x1, y - s.y1) <= r + 10) return { stroke: s, idx: i };
      } else if (s.points && s.points.length) {
        if (s.points.some(pt => Math.hypot(pt.x - x, pt.y - y) <= 14)) return { stroke: s, idx: i };
      }
    }
    return null;
  };

  canvas.onmousedown = (e) => {
    const { sx, sy, x, y } = getRawPos(e);
    WBState.color = document.getElementById("wb-color")?.value || "#D4A72C";
    WBState.size = Number(document.getElementById("wb-size")?.value || 4);

    // القفز السريع من داخل الـ Minimap
    if (WBState.showMinimap && sx >= canvas.width - 175 && sy >= canvas.height - 125) {
      const mmX = sx - (canvas.width - 165);
      const mmY = sy - (canvas.height - 115);
      WBState.panX = -(mmX / 150) * 2000 * WBState.zoom + canvas.width / 2;
      WBState.panY = -(mmY / 100) * 1400 * WBState.zoom + canvas.height / 2;
      redraw();
      return;
    }

    // تحريك المسطرة أو المنقلة الهندسية إن كانت ظاهرة
    if (WBState.showRuler && x >= WBState.rulerPos.x && x <= WBState.rulerPos.x + WBState.rulerPos.w && y >= WBState.rulerPos.y && y <= WBState.rulerPos.y + 45) {
      isDraggingRuler = true;
      dragOffsetX = x - WBState.rulerPos.x;
      dragOffsetY = y - WBState.rulerPos.y;
      return;
    }
    if (WBState.showProtractor && Math.hypot(x - WBState.protractorPos.x, y - WBState.protractorPos.y) <= WBState.protractorPos.r && y <= WBState.protractorPos.y + 10) {
      isDraggingProtractor = true;
      dragOffsetX = x - WBState.protractorPos.x;
      dragOffsetY = y - WBState.protractorPos.y;
      return;
    }

    // تحريك اللوحة اللانهائية (Pan)
    if (WBState.tool === "pan" || WBState.spacePressed || e.button === 1) {
      isPanningBoard = true;
      panStartX = sx - WBState.panX;
      panStartY = sy - WBState.panY;
      return;
    }

    // ممحاة العناصر الذكية (Object Eraser)
    if (WBState.tool === "obj_eraser") {
      const hitN = findNodeAt(x, y);
      if (hitN && !hitN.locked) {
        pushWB2Undo();
        WBState.nodes = WBState.nodes.filter(n => n.id !== hitN.id);
        redraw();
        return;
      }
      const hitS = findStrokeAt(x, y);
      if (hitS) {
        pushWB2Undo();
        WBState.strokes.splice(hitS.idx, 1);
        redraw();
      }
      return;
    }

    if (WBState.tool === "select" || e.shiftKey) {
      const hitNode = findNodeAt(x, y);
      if (hitNode) {
        WBState.selectedNodeId = hitNode.id;
        WBState.selectedImgId = null;
        WBState.selectedStrokeIdx = null;
        if (!hitNode.locked) {
          isDraggingNode = hitNode;
          dragOffsetX = x - hitNode.x;
          dragOffsetY = y - hitNode.y;
        }
        document.getElementById("wb-selected-node-indicator").textContent = `المحدد: ${hitNode.text} ${hitNode.val ? "(" + hitNode.val + ")" : ""}`;
        if (WBState.activeSideDrawer === "layers") renderWB2SideDrawer(ctx, canvas);
        redraw();
        return;
      }

      const hitImgObj = findImgAt(x, y);
      if (hitImgObj) {
        WBState.selectedImgId = hitImgObj.img.id;
        WBState.selectedNodeId = null;
        WBState.selectedStrokeIdx = null;
        if (hitImgObj.resize) isResizingImg = hitImgObj.img;
        else {
          isDraggingImg = hitImgObj.img;
          dragOffsetX = x - hitImgObj.img.x;
          dragOffsetY = y - hitImgObj.img.y;
        }
        redraw();
        return;
      }

      const hitSt = findStrokeAt(x, y);
      if (hitSt) {
        WBState.selectedStrokeIdx = hitSt.idx;
        WBState.selectedNodeId = null;
        WBState.selectedImgId = null;
        isDraggingStroke = hitSt.stroke;
        dragOffsetX = x;
        dragOffsetY = y;
        redraw();
        return;
      }
      return;
    }

    if (WBState.tool === "text") {
      const txt = prompt("✍️ اكتب النص (قابل للتحريك والتكبير):");
      if (txt && txt.trim()) {
        pushWB2Undo();
        WBState.strokes.push({
          type: "text",
          text: txt.trim(),
          x: snapVal(x),
          y: snapVal(y),
          color: WBState.color,
          size: WBState.size,
          lineStyle: WBState.lineStyle
        });
        redraw();
      }
      return;
    }

    if (WBState.tool === "laser") {
      isDrawingStroke = true;
      WBState.laserPoints = [{ x, y }];
      return;
    }

    pushWB2Undo();
    isDrawingStroke = true;
    currentStroke = {
      type: WBState.tool,
      color: WBState.color,
      size: WBState.tool === "tech_pen" ? 2 : WBState.size,
      lineStyle: WBState.lineStyle,
      points: [{ x, y }],
      x1: snapVal(x),
      y1: snapVal(y),
      x2: snapVal(x),
      y2: snapVal(y),
      innerText: ""
    };
    WBState.strokes.push(currentStroke);
  };

  canvas.onmousemove = (e) => {
    const { sx, sy, x, y } = getRawPos(e);
    WBState.mouseWorld = { x, y };

    if (isPanningBoard) {
      WBState.panX = sx - panStartX;
      WBState.panY = sy - panStartY;
      redraw();
      return;
    }
    if (isDraggingRuler) {
      WBState.rulerPos.x = x - dragOffsetX;
      WBState.rulerPos.y = y - dragOffsetY;
      redraw();
      return;
    }
    if (isDraggingProtractor) {
      WBState.protractorPos.x = x - dragOffsetX;
      WBState.protractorPos.y = y - dragOffsetY;
      redraw();
      return;
    }
    if (isDraggingNode) {
      // التئام ومحاذاة تلقائية مع المسطرة الهندسية إذا كانت قريبة منها
      let nextY = snapVal(y - dragOffsetY);
      if (WBState.showRuler && Math.abs(nextY - WBState.rulerPos.y) < 18) {
        nextY = WBState.rulerPos.y - isDraggingNode.h / 2;
      }
      isDraggingNode.x = snapVal(x - dragOffsetX);
      isDraggingNode.y = nextY;
      redraw();
      return;
    }
    if (isResizingImg) {
      isResizingImg.w = Math.max(50, x - isResizingImg.x);
      isResizingImg.h = Math.max(50, y - isResizingImg.y);
      redraw();
      return;
    }
    if (isDraggingImg) {
      isDraggingImg.x = snapVal(x - dragOffsetX);
      isDraggingImg.y = snapVal(y - dragOffsetY);
      redraw();
      return;
    }
    if (isDraggingStroke) {
      const dx = x - dragOffsetX;
      const dy = y - dragOffsetY;
      dragOffsetX = x;
      dragOffsetY = y;
      if (isDraggingStroke.type === "text") {
        isDraggingStroke.x += dx;
        isDraggingStroke.y += dy;
      } else if (isDraggingStroke.points && isDraggingStroke.points.length > 1) {
        isDraggingStroke.points.forEach(pt => { pt.x += dx; pt.y += dy; });
      } else {
        isDraggingStroke.x1 += dx;
        isDraggingStroke.y1 += dy;
        isDraggingStroke.x2 += dx;
        isDraggingStroke.y2 += dy;
      }
      redraw();
      return;
    }

    if (WBState.spotlightMode) {
      redraw();
    }

    if (!isDrawingStroke) return;

    if (WBState.tool === "laser") {
      WBState.laserPoints.push({ x, y });
      if (WBState.laserPoints.length > 28) WBState.laserPoints.shift();
      redraw();
      return;
    }

    if (!currentStroke) return;
    if (["pen", "tech_pen", "highlight", "eraser"].includes(currentStroke.type)) {
      let targetY = y;
      // إذا كان المستخدم يرسم بجوار حافة المسطرة الهندسية، يستقيم الخط مع المسطرة!
      if (WBState.showRuler && Math.abs(y - WBState.rulerPos.y) < 15 && x >= WBState.rulerPos.x && x <= WBState.rulerPos.x + WBState.rulerPos.w) {
        targetY = WBState.rulerPos.y;
      }
      currentStroke.points.push({ x, y: targetY });
    } else {
      currentStroke.x2 = snapVal(x);
      currentStroke.y2 = snapVal(y);
    }
    redraw();
  };

  window.addEventListener("mouseup", () => {
    // 1. ميزة التعرف الذكي على الأشكال المرسومة باليد (Smart Shape Recognition)
    if (isDrawingStroke && currentStroke && currentStroke.type === "pen" && WBState.smartShapeRecognition && currentStroke.points.length > 14) {
      const pts = currentStroke.points;
      const first = pts[0];
      const last = pts[pts.length - 1];
      const closeDist = Math.hypot(last.x - first.x, last.y - first.y);
      const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
      const minX = Math.min(...xs), maxX = Math.max(...xs);
      const minY = Math.min(...ys), maxY = Math.max(...ys);
      const w = maxX - minX, h = maxY - minY;

      if (closeDist < 42 && w > 35 && h > 35) {
        const aspect = w / h;
        if (aspect > 0.75 && aspect < 1.3) {
          currentStroke.type = "circle";
          currentStroke.x1 = minX + w / 2;
          currentStroke.y1 = minY + h / 2;
          currentStroke.x2 = maxX;
          currentStroke.y2 = minY + h / 2;
          toast("✨ التعرف الذكي: تم تحويل رسمة اليد إلى دائرة هندسية منتظمة!");
        } else {
          currentStroke.type = "rect";
          currentStroke.x1 = minX;
          currentStroke.y1 = minY;
          currentStroke.x2 = maxX;
          currentStroke.y2 = maxY;
          toast("✨ التعرف الذكي: تم تحويل رسمة اليد إلى مستطيل هندسي منتظم!");
        }
      }
    }

    // 2. سؤال المستخدم عن نص داخل المستطيل أو الدائرة الجديدة
    if (isDrawingStroke && currentStroke && (currentStroke.type === "rect" || currentStroke.type === "circle")) {
      const dist = Math.hypot(currentStroke.x2 - currentStroke.x1, currentStroke.y2 - currentStroke.y1);
      if (dist > 35 && !currentStroke.innerText) {
        const insideTxt = prompt("✍️ اكتب نصاً داخل هذا الشكل (أو اتركه فارغاً):", "");
        if (insideTxt && insideTxt.trim()) currentStroke.innerText = insideTxt.trim();
      }
    }

    isPanningBoard = false;
    isDraggingRuler = false;
    isDraggingProtractor = false;
    isDraggingNode = null;
    isDraggingImg = null;
    isResizingImg = null;
    isDraggingStroke = null;
    isDrawingStroke = false;
    currentStroke = null;
    WBState.laserPoints = [];
    autoSaveWB2Board();
    redraw();
  });

  // دبل كليك لتعديل النص أو القيمة الهندسية (مثل قيمة المقاومة 10kΩ أو المعادلة)
  canvas.ondblclick = (e) => {
    const { x, y } = getRawPos(e);
    const hitNode = findNodeAt(x, y);
    if (hitNode) {
      WBState.selectedNodeId = hitNode.id;
      const newTxt = prompt("✏️ تعديل اسم/عنوان العنصر:", hitNode.text);
      if (newTxt !== null && newTxt.trim()) hitNode.text = newTxt.trim();
      if (hitNode.val !== undefined) {
        const newVal = prompt("📐 تعديل القيمة الهندسية / المعادلة / الملاحظة الفرعية:", hitNode.val);
        if (newVal !== null) hitNode.val = newVal.trim();
      }
      hitNode.w = Math.max(125, hitNode.text.length * 9 + 42);
      autoSaveWB2Board();
      redraw();
      return;
    }

    const hitSt = findStrokeAt(x, y);
    if (hitSt) {
      const s = hitSt.stroke;
      const cur = s.type === "text" ? s.text : (s.innerText || "");
      const next = prompt("✏️ تعديل النص:", cur);
      if (next !== null) {
        if (s.type === "text") s.text = next.trim();
        else s.innerText = next.trim();
        autoSaveWB2Board();
        redraw();
      }
    }
  };

  // زووم اللوحة اللانهائية بعجلة الماوس أو تكبير العنصر المحدد
  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;

    // إذا كان يضغط Shift نكبر العنصر المحدد، وإلا نكبر/نصغر اللوحة اللانهائية نحو الماوس
    if (e.shiftKey && WBState.selectedImgId) {
      const im = WBState.images.find(i => i.id === WBState.selectedImgId);
      if (im) { im.w = Math.max(50, im.w * factor); im.h = Math.max(50, im.h * factor); redraw(); }
      return;
    }

    const r = canvas.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    const wx = (mx - WBState.panX) / WBState.zoom;
    const wy = (my - WBState.panY) / WBState.zoom;

    const newZoom = Math.min(3.5, Math.max(0.25, WBState.zoom * factor));
    WBState.panX = mx - wx * newZoom;
    WBState.panY = my - wy * newZoom;
    WBState.zoom = newZoom;
    const zLbl = document.getElementById("wb2-zoom-lbl");
    if (zLbl) zLbl.textContent = `${Math.round(WBState.zoom * 100)}%`;
    redraw();
  }, { passive: false });

  // ربط جميع أزرار الـ Studio 2.0
  bindWB2ToolbarActions(ctx, canvas, modalCard, redraw, resizeBoard);

  if (autoStartPrivateRecord) {
    setTimeout(() => document.getElementById("btn-wb-rec-mp4")?.click(), 350);
  }
};

function bindWB2ToolbarActions(ctx, canvas, modalCard, redraw, resizeBoard) {
  document.querySelectorAll("[data-wb-tool]").forEach(btn => {
    btn.onclick = () => {
      WBState.tool = btn.dataset.wbTool;
      document.querySelectorAll("[data-wb-tool]").forEach(b => b.classList.toggle("active", b === btn));
      canvas.style.cursor = WBState.tool === "pan" ? "grab" : WBState.tool === "select" ? "default" : "crosshair";
    };
  });

  document.getElementById("wb-linestyle-select").onchange = (e) => { WBState.lineStyle = e.target.value; };
  document.getElementById("wb-bg-select").onchange = (e) => { WBState.bgMode = e.target.value; autoSaveWB2Board(); redraw(); };
  document.getElementById("wb2-connector-select").onchange = (e) => { WBState.connectorType = e.target.value; autoSaveWB2Board(); redraw(); };

  document.getElementById("wb2-autolayout-select").onchange = (e) => {
    if (!e.target.value) return;
    applyWB2AutoLayout(e.target.value, canvas.width, canvas.height);
    e.target.value = "";
    redraw();
  };

  document.getElementById("wb2-template-select").onchange = (e) => {
    const key = e.target.value;
    if (!key || !WB2Templates[key]) return;
    pushWB2Undo();
    const tpl = WB2Templates[key];
    WBState.bgMode = tpl.bgMode || "grid";
    WBState.nodes = JSON.parse(JSON.stringify(tpl.nodes));
    WBState.selectedNodeId = WBState.nodes[0]?.id || null;
    e.target.value = "";
    redraw();
    toast(`📋 تم تحميل قالب: ${tpl.name}`);
  };

  // إدراج أي رمز هندسي / كهربائي / منطقي / رياضي على اللوحة
  document.getElementById("wb2-eng-symbol-picker").onchange = (e) => {
    const sym = e.target.value;
    if (!sym) return;
    e.target.value = "";
    pushWB2Undo();

    const cx = (canvas.width / 2 - WBState.panX) / WBState.zoom;
    const cy = (canvas.height / 2 - WBState.panY) / WBState.zoom;
    const col = document.getElementById("wb-color")?.value || "#D4A72C";

    if (sym === "math_plot") {
      const fnStr = prompt("📈 اكتب الدالة الرياضية بدلالة x (مثال: Math.sin(x) أو x*x/4 أو Math.cos(x)*2):", "Math.sin(x)");
      if (!fnStr) return;
      WBState.nodes.push({
        id: "nd_" + Date.now(),
        text: `f(x) = ${fnStr}`,
        val: fnStr,
        shape: "math_plot",
        x: cx,
        y: cy,
        w: 220,
        h: 150,
        color: col,
        parentId: null
      });
      redraw();
      return;
    }

    if (sym === "truth_table") {
      const gateType = prompt("📋 اكتب نوع البوابة لجدول الحقيقة (AND / OR / XOR / NAND):", "XOR") || "XOR";
      WBState.nodes.push({
        id: "nd_" + Date.now(),
        text: `Truth Table (${gateType.toUpperCase()})`,
        val: gateType.toUpperCase(),
        shape: "truth_table",
        x: cx,
        y: cy,
        w: 190,
        h: 135,
        color: col,
        parentId: null
      });
      redraw();
      return;
    }

    const defaultLabels = {
      elec_res: ["Resistor R", "10kΩ"],
      elec_cap: ["Capacitor C", "100μF"],
      elec_ind: ["Inductor L", "10mH"],
      elec_diode: ["Diode D", "1N4007"],
      elec_led: ["LED", "Red 2V"],
      elec_trans: ["MOSFET / BJT", "IRFZ44N"],
      elec_dc: ["DC Source", "12V DC"],
      elec_ac: ["AC Source", "220V 50Hz"],
      elec_gnd: ["GND", "0V"],
      elec_sw: ["Switch S1", "NO"],
      gate_and: ["AND Gate", "Y = A · B"],
      gate_or: ["OR Gate", "Y = A + B"],
      gate_not: ["NOT Gate", "Y = A'"],
      gate_nand: ["NAND Gate", "Y = (A·B)'"],
      gate_xor: ["XOR Gate", "Y = A ⊕ B"],
      gate_ff: ["D Flip-Flop", "CLK ➔ Q"],
      sticky: ["ملاحظة سريعة 📌", "اكتب تفاصيل الملاحظة هنا"],
      code_block: ["Code Snippet 💻", "function solve() { return true; }"],
      cube: ["3D Cube Module", "Layer 1"],
      cylinder: ["Database / Storage", "PostgreSQL"],
      pyramid: ["Hierarchy Pyramid", "Core"],
      hexagon: ["Microservice Node", "Port 8080"],
      star: ["Key Milestone ⭐", "Target"],
      math_eq: ["∫ f(x) dx = F(b) - F(a)", "Calculus Formula"],
      phys_vec: ["Force F = 50N", "θ = 30°"],
      phys_wave: ["Sine Wave 50Hz", "Vpp = 10V"]
    };

    const [defTitle, defVal] = defaultLabels[sym] || ["Element", ""];
    const title = prompt("اسم العنصر أو المعادلة:", defTitle) || defTitle;
    const val = prompt("القيمة أو التفاصيل الفرعية (اختياري):", defVal) ?? defVal;

    WBState.nodes.push({
      id: "nd_" + Date.now(),
      text: title,
      val,
      shape: sym,
      x: cx + (Math.random() - 0.5) * 60,
      y: cy + (Math.random() - 0.5) * 60,
      w: sym === "sticky" ? 175 : sym === "code_block" ? 230 : Math.max(125, title.length * 8.5 + 40),
      h: sym === "sticky" ? 115 : sym === "code_block" ? 85 : 58,
      color: sym === "sticky" ? "#FBBF24" : col,
      parentId: WBState.selectedNodeId || null
    });
    redraw();
  };

  document.getElementById("btn-wb2-ruler").onclick = (e) => {
    WBState.showRuler = !WBState.showRuler;
    e.currentTarget.classList.toggle("active", WBState.showRuler);
    redraw();
  };

  document.getElementById("btn-wb2-protractor").onclick = (e) => {
    WBState.showProtractor = !WBState.showProtractor;
    e.currentTarget.classList.toggle("active", WBState.showProtractor);
    redraw();
  };

  // أزرار الزووم والـ Snap والـ Auto-Shape والشرائح
  document.getElementById("btn-wb2-zoom-in").onclick = () => {
    WBState.zoom = Math.min(3.5, WBState.zoom + 0.15);
    document.getElementById("wb2-zoom-lbl").textContent = `${Math.round(WBState.zoom * 100)}%`;
    redraw();
  };
  document.getElementById("btn-wb2-zoom-out").onclick = () => {
    WBState.zoom = Math.max(0.25, WBState.zoom - 0.15);
    document.getElementById("wb2-zoom-lbl").textContent = `${Math.round(WBState.zoom * 100)}%`;
    redraw();
  };
  document.getElementById("btn-wb2-zoom-fit").onclick = () => {
    WBState.zoom = 1;
    WBState.panX = 0;
    WBState.panY = 0;
    document.getElementById("wb2-zoom-lbl").textContent = "100%";
    redraw();
  };
  document.getElementById("wb2-snap-chk").onchange = (e) => { WBState.snapToGrid = e.target.checked; };
  document.getElementById("wb2-autoshape-chk").onchange = (e) => { WBState.smartShapeRecognition = e.target.checked; };

  // إضافة شريحة عرض والتنقل بينها (Presentation Slides)
  document.getElementById("btn-wb2-add-slide").onclick = () => {
    const title = prompt("🎬 اسم الشريحة الحالية (مثال: الشريحة 1 — مقدمة الدائرة):", `الشريحة ${WBState.slides.length + 1}`);
    if (!title) return;
    WBState.slides.push({
      title,
      panX: WBState.panX,
      panY: WBState.panY,
      zoom: WBState.zoom
    });
    OSProStore.set("wb2_slides", WBState.slides);
    toast(`تم حفظ "${title}" في شرائح العرض التقديمي! 🎬`);
    openSmartWhiteboardModal(false);
  };

  document.getElementById("btn-wb2-next-slide")?.addEventListener("click", () => {
    if (!WBState.slides.length) return;
    WBState.activeSlideIdx = (WBState.activeSlideIdx + 1) % WBState.slides.length;
    const sl = WBState.slides[WBState.activeSlideIdx];
    WBState.panX = sl.panX;
    WBState.panY = sl.panY;
    WBState.zoom = sl.zoom;
    document.getElementById("wb2-zoom-lbl").textContent = `${Math.round(WBState.zoom * 100)}%`;
    redraw();
    toast(`🎬 عرض: ${sl.title}`);
  });

  document.getElementById("btn-wb2-present-mode").onclick = () => {
    WBState.presentationMode = !WBState.presentationMode;
    WBState.spotlightMode = WBState.presentationMode;
    modalCard?.classList.toggle("wb-studio-fullscreen", true);
    modalCard?.classList.toggle("wb-presentation-active", WBState.presentationMode);
    setTimeout(resizeBoard, 60);
    toast(WBState.presentationMode ? "🎤 وضع المحاضرة والعرض نشط (اضغط ESC للعودة لأدوات التحرير)" : "تم إظهار أدوات التحرير");
  };

  // التكرار، التدوير، القفل، التراجع والإعادة، وحفظ الإصدارات
  document.getElementById("btn-wb2-duplicate").onclick = () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (!nd) return;
    pushWB2Undo();
    const copyId = "nd_" + Date.now();
    WBState.nodes.push({ ...nd, id: copyId, x: nd.x + 36, y: nd.y + 36 });
    WBState.selectedNodeId = copyId;
    redraw();
  };

  document.getElementById("btn-wb2-rotate").onclick = () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (nd) {
      nd.rotation = ((nd.rotation || 0) + 45) % 360;
      redraw();
    }
  };

  document.getElementById("btn-wb2-lock").onclick = () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (nd) {
      nd.locked = !nd.locked;
      toast(nd.locked ? `🔒 تم قفل "${nd.text}" ضد التحريك` : `🔓 تم فك قفل "${nd.text}"`);
      redraw();
    }
  };

  document.getElementById("btn-wb-undo").onclick = () => {
    const last = WBState.undoStack.pop();
    if (last) {
      WBState.redoStack.push(JSON.stringify({ nodes: WBState.nodes, strokes: WBState.strokes }));
      const parsed = JSON.parse(last);
      WBState.nodes = parsed.nodes || [];
      WBState.strokes = parsed.strokes || [];
      redraw();
    }
  };

  document.getElementById("btn-wb2-redo").onclick = () => {
    const next = WBState.redoStack.pop();
    if (next) {
      WBState.undoStack.push(JSON.stringify({ nodes: WBState.nodes, strokes: WBState.strokes }));
      const parsed = JSON.parse(next);
      WBState.nodes = parsed.nodes || [];
      WBState.strokes = parsed.strokes || [];
      redraw();
    }
  };

  document.getElementById("btn-wb2-save-version").onclick = () => {
    const vName = prompt("💾 اكتب اسماً لحفظ هذه النسخة في سجل الإصدارات (Version History):", `إصدار ${WBState.versions.length + 1} (${new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })})`);
    if (!vName) return;
    WBState.versions.unshift({
      name: vName,
      nodes: JSON.parse(JSON.stringify(WBState.nodes)),
      strokes: JSON.parse(JSON.stringify(WBState.strokes))
    });
    OSProStore.set("wb2_versions", WBState.versions.slice(0, 15));
    toast(`تم حفظ الإصدار "${vName}" بنجاح! يمكنك استرجاعه من لوحة الطبقات 🕰️`);
  };

  // مركز التصدير والاستيراد الشامل (PNG, Transparent PNG, SVG, PDF, JSON)
  const jsonFileInp = document.getElementById("wb2-import-json-inp");
  document.getElementById("wb2-export-select").onchange = async (e) => {
    const mode = e.target.value;
    if (!mode) return;
    e.target.value = "";

    if (mode === "png") {
      const a = document.createElement("a");
      a.download = `Engineering-Board-${today()}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    } else if (mode === "png_trans") {
      const prevBg = WBState.bgMode;
      WBState.bgMode = "transparent";
      redraw();
      const a = document.createElement("a");
      a.download = `Transparent-Diagram-${today()}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
      WBState.bgMode = prevBg;
      redraw();
    } else if (mode === "svg") {
      let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}" style="background:#080D1A; font-family:sans-serif;">`;
      WBState.nodes.forEach(n => {
        svg += `<rect x="${n.x - n.w/2}" y="${n.y - n.h/2}" width="${n.w}" height="${n.h}" rx="10" fill="#11192E" stroke="${n.color || "#D4A72C"}" stroke-width="2"/>`;
        svg += `<text x="${n.x}" y="${n.y + 5}" fill="#FFFFFF" font-size="13" font-weight="bold" text-anchor="middle">${esc(n.text)}</text>`;
      });
      svg += `</svg>`;
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `Vector-Diagram-${today()}.svg`;
      a.click();
      toast("تم تصدير اللوحة كملف متجهي SVG! 📐✅");
    } else if (mode === "pdf") {
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      selectedPdfImages = [imgData];
      openImageToPdfConverterModal();
    } else if (mode === "json") {
      const proj = { nodes: WBState.nodes, strokes: WBState.strokes, bgMode: WBState.bgMode, exportedAt: today() };
      const blob = new Blob([JSON.stringify(proj, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `Whiteboard-Project-${today()}.json`;
      a.click();
      toast("تم حفظ المشروع القابل للتعديل بصيغة .JSON! 💾");
    } else if (mode === "import_json") {
      jsonFileInp?.click();
    }
  };

  if (jsonFileInp) {
    jsonFileInp.onchange = async (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      try {
        const parsed = JSON.parse(await f.text());
        if (parsed.nodes) {
          pushWB2Undo();
          WBState.nodes = parsed.nodes;
          WBState.strokes = parsed.strokes || [];
          redraw();
          toast("تم فتح المشروع واستعادة جميع الفروع والرسومات للتعديل! 📂✅");
        }
      } catch (err) {
        toast("ملف JSON غير صالح", "error");
      }
    };
  }

  // فتح الدرج الجانبي (المساعد الذكي للسبورة AI أو مدير الطبقات والإصدارات)
  document.getElementById("btn-wb2-ai-drawer").onclick = () => {
    WBState.activeSideDrawer = WBState.activeSideDrawer === "ai" ? null : "ai";
    renderWB2SideDrawer(ctx, canvas);
  };
  document.getElementById("btn-wb2-layers-drawer").onclick = () => {
    WBState.activeSideDrawer = WBState.activeSideDrawer === "layers" ? null : "layers";
    renderWB2SideDrawer(ctx, canvas);
  };

  // rebind basic buttons from V1 to ensure smooth operation
  document.getElementById("btn-wb-add-root").onclick = () => {
    const title = prompt("🌟 اكتب النص داخل الشكل الجديد:", "عنصر رئيسي جديد");
    if (!title || !title.trim()) return;
    pushWB2Undo();
    const id = "nd_" + Date.now();
    const c = document.getElementById("wb-color")?.value || "#D4A72C";
    const cx = (canvas.width / 2 - WBState.panX) / WBState.zoom;
    const cy = (120 - WBState.panY) / WBState.zoom;
    WBState.nodes.push({
      id, text: title.trim(), shape: "rect", x: cx, y: cy,
      w: Math.max(140, title.trim().length * 9 + 42), h: 48, color: c, parentId: null
    });
    WBState.selectedNodeId = id;
    redraw();
  };

  document.getElementById("btn-wb-toggle-shape").onclick = () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (!nd) return;
    const shapes = ["rect", "round_rect", "circle", "diamond", "hexagon", "cylinder", "cube", "sticky"];
    nd.shape = shapes[(shapes.indexOf(nd.shape || "rect") + 1) % shapes.length];
    redraw();
  };

  document.getElementById("btn-wb-spawn-branches").onclick = () => {
    const parent = WBState.nodes.find(n => n.id === WBState.selectedNodeId) || WBState.nodes[0];
    if (!parent) return;
    const raw = prompt(`🌿 تفريع من (${parent.text}):\nاكتب أسماء الفروع مفصولة بفاصلة ( , ):`, "فرع 1, فرع 2, فرع 3");
    if (!raw || !raw.trim()) return;
    const parts = raw.split(/[،,]/).map(s => s.trim()).filter(Boolean);
    pushWB2Undo();
    const c = document.getElementById("wb-color")?.value || "#19B889";
    const spreadW = parts.length * 190;
    const startX = parent.x - spreadW / 2 + 95;
    parts.forEach((txt, idx) => {
      WBState.nodes.push({
        id: "nd_" + Date.now() + "_" + idx,
        text: txt, shape: "round_rect",
        x: parts.length === 1 ? parent.x : startX + idx * 190,
        y: parent.y + 125,
        w: Math.max(130, txt.length * 9 + 36), h: 44, color: c, parentId: parent.id
      });
    });
    redraw();
  };

  document.getElementById("btn-wb-edit-node").onclick = () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (!nd) return;
    const txt = prompt("✏️ تعديل النص:", nd.text);
    if (txt !== null && txt.trim()) { nd.text = txt.trim(); nd.w = Math.max(130, nd.text.length * 9 + 36); }
    const val = prompt("📐 تعديل القيمة الفرعية / الملاحظة:", nd.val || "");
    if (val !== null) nd.val = val.trim();
    redraw();
  };

  document.getElementById("btn-wb-scale-up").onclick = () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (nd) { nd.w = Math.round(nd.w * 1.15); nd.h = Math.round(nd.h * 1.15); redraw(); }
  };
  document.getElementById("btn-wb-scale-down").onclick = () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (nd) { nd.w = Math.max(80, Math.round(nd.w * 0.86)); nd.h = Math.max(36, Math.round(nd.h * 0.86)); redraw(); }
  };
  document.getElementById("btn-wb-del-node").onclick = () => {
    pushWB2Undo();
    if (WBState.selectedImgId) { WBState.images = WBState.images.filter(i => i.id !== WBState.selectedImgId); WBState.selectedImgId = null; }
    else if (WBState.selectedStrokeIdx !== null) { WBState.strokes.splice(WBState.selectedStrokeIdx, 1); WBState.selectedStrokeIdx = null; }
    else if (WBState.selectedNodeId) {
      const id = WBState.selectedNodeId;
      WBState.nodes = WBState.nodes.filter(n => n.id !== id && n.parentId !== id);
      WBState.selectedNodeId = WBState.nodes[0]?.id || null;
    }
    redraw();
  };
  document.getElementById("btn-wb-clear").onclick = () => {
    if (!confirm("مسح السبورة بالكامل؟")) return;
    pushWB2Undo();
    WBState.nodes = [];
    WBState.strokes = [];
    WBState.images = [];
    redraw();
  };
  document.getElementById("btn-wb-download").onclick = () => {
    const a = document.createElement("a");
    a.download = `Engineering-Whiteboard-${today()}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };
  document.getElementById("btn-wb-fullscreen").onclick = () => {
    modalCard?.classList.toggle("wb-studio-fullscreen");
    setTimeout(resizeBoard, 60);
  };
}

/* ============================================================================
   SIDE DRAWER: BOARD-AWARE AI ASSISTANT & LAYERS / VERSION CONTROL MANAGER
   ============================================================================ */
function renderWB2SideDrawer(ctx, canvas) {
  const drawer = document.getElementById("wb2-side-drawer");
  if (!drawer) return;
  if (!WBState.activeSideDrawer) {
    drawer.classList.add("hidden");
    return;
  }
  drawer.classList.remove("hidden");

  if (WBState.activeSideDrawer === "ai") {
    drawer.innerHTML = `
      <div class="flex-between">
        <strong class="gold-text"><i class="fa-solid fa-robot"></i> مساعد السبورة الذكي AI</strong>
        <button type="button" class="btn-icon-xs" id="btn-close-wb2-drawer"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <small class="small-muted">يفهم كل العناصر والدوائر المرسومة على سبورتك حالياً أو يبني لك مخططاً كاملاً بالـ AI:</small>

      <div class="dossier-section-box" style="padding:10px;">
        <label class="small-muted d-block mb-1">1. توليد مخطط أو دائرة بالـ AI على السبورة:</label>
        <input type="text" id="wb2-ai-gen-topic" placeholder="مثال: OSI 7 Layers / دائرة مكبر صوت / مراحل SQL Injection..." />
        <button type="button" id="btn-wb2-ai-generate-map" class="btn btn-xs btn-gold btn-block mt-1">
          <i class="fa-solid fa-sitemap"></i> ولّد المخطط على السبورة الآن
        </button>
      </div>

      <div class="dossier-section-box" style="padding:10px;">
        <label class="small-muted d-block mb-1">2. اسأل الـ AI عن المرسوم حالياً على اللوحة:</label>
        <div class="cert-pill-row mb-1">
          <button type="button" class="chip" data-wb2-ai-q="اشرح لي هذا المخطط بالتفصيل الممل">اشرح المخطط</button>
          <button type="button" class="chip" data-wb2-ai-q="راجع التوصيلات واقترح تحسينات هندسية">فحص التوصيلات</button>
          <button type="button" class="chip" data-wb2-ai-q="ولّد 5 أسئلة امتحان ومقابلات من هذه اللوحة">أسئلة اختبار</button>
        </div>
        <div id="wb2-ai-response-box" class="small-muted" style="white-space:pre-line; max-height:210px; overflow-y:auto; background:rgba(0,0,0,0.35); padding:8px; border-radius:8px;">
          اختر سؤالاً أو ولّد مخططاً ليظهر الشرح هنا...
        </div>
      </div>
    `;

    document.getElementById("btn-close-wb2-drawer").onclick = () => {
      WBState.activeSideDrawer = null;
      drawer.classList.add("hidden");
    };

    // توليد خريطة ذهنية أو مخطط هندسي كامل بالـ AI ووضعه على السبورة فوراً
    document.getElementById("btn-wb2-ai-generate-map").onclick = async () => {
      const topic = document.getElementById("wb2-ai-gen-topic")?.value.trim();
      if (!topic) return;
      const out = document.getElementById("wb2-ai-response-box");
      out.textContent = `⏳ جاري تصميم مخطط (${topic}) وتوزيع عقدة الرئيسية وفروعه...`;
      const reply = await B().askAI?.(`قسّم الموضوع الهندسي/التعليمي التالي (${topic}) إلى 6 محطات أو مكونات رئيسية قصيرة جداً، اكتب كل محطة في سطر مستقل بدون ترقيم معقد.`);
      const lines = String(reply || "").split("\n").map(l => l.replace(/^[-*0-9.)]+\s*/, "").trim()).filter(Boolean).slice(0, 6);

      pushWB2Undo();
      const rootId = "ai_root_" + Date.now();
      WBState.nodes = [{
        id: rootId,
        text: `🌟 ${topic.slice(0, 28)}`,
        val: "AI Generated",
        shape: "hexagon",
        x: 500,
        y: 80,
        w: 220,
        h: 52,
        color: "#D4A72C",
        parentId: null
      }];

      lines.forEach((lineTxt, i) => {
        const shortTxt = lineTxt.split(":")[0].slice(0, 32);
        const subVal = lineTxt.split(":")[1]?.slice(0, 35) || `Stage ${i + 1}`;
        WBState.nodes.push({
          id: `ai_nd_${Date.now()}_${i}`,
          text: shortTxt,
          val: subVal.trim(),
          shape: i % 2 === 0 ? "round_rect" : "diamond",
          x: 160 + (i % 3) * 320,
          y: i < 3 ? 230 : 380,
          w: Math.max(145, shortTxt.length * 8.5 + 36),
          h: 50,
          color: i < 3 ? "#19B889" : "#38BDF8",
          parentId: rootId
        });
      });

      renderWhiteboardScene(ctx, canvas.width, canvas.height);
      out.textContent = `✅ تم رسم مخطط (${topic}) على السبورة بنجاح!\n\n${reply}`;
    };

    // سؤال الـ AI عن المحتوى الفعلي المرسوم على اللوحة
    drawer.querySelectorAll("[data-wb2-ai-q]").forEach(btn => {
      btn.onclick = async () => {
        const q = btn.dataset.wb2AiQ;
        const out = document.getElementById("wb2-ai-response-box");
        const boardSummary = WBState.nodes.map(n => `[${n.text} ${n.val ? "(" + n.val + ")" : ""} - الشكل: ${n.shape}]`).join(" ➔ ");
        out.textContent = "⏳ جاري قراءة وتحليل عناصر السبورة الحالية...";
        const reply = await B().askAI?.(`المستخدم يرسم على السبورة الهندسية العناصر المترابطة التالية:\n${boardSummary || "لوحة حرة"}\nالمطلوب: ${q}`);
        out.textContent = reply;
      };
    });
    return;
  }

  // لوحة إدارة الطبقات والعناصر وسجل الإصدارات (Layers & Version History)
  drawer.innerHTML = `
    <div class="flex-between">
      <strong class="gold-text"><i class="fa-solid fa-layer-group"></i> الطبقات والعناصر (${WBState.nodes.length})</strong>
      <button type="button" class="btn-icon-xs" id="btn-close-wb2-drawer"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div style="display:flex; flex-direction:column; gap:5px; max-height:240px; overflow-y:auto;">
      ${WBState.nodes.map((nd, idx) => `
        <div class="wb2-layer-row ${nd.id === WBState.selectedNodeId ? "active" : ""}" data-layer-node="${nd.id}">
          <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${idx + 1}. ${esc(nd.text)}</span>
          <div class="filters-row" style="gap:3px;">
            <button type="button" class="btn-icon-xs" data-layer-hide="${nd.id}" title="إظهار/إخفاء"><i class="fa-regular ${nd.hidden ? "fa-eye-slash text-danger" : "fa-eye"}"></i></button>
            <button type="button" class="btn-icon-xs" data-layer-lock="${nd.id}" title="قفل/فك"><i class="fa-solid ${nd.locked ? "fa-lock gold-text" : "fa-lock-open"}"></i></button>
          </div>
        </div>
      `).join("")}
    </div>

    <hr class="divider" />
    <strong class="gold-text" style="font-size:0.82rem;"><i class="fa-solid fa-clock-rotate-left"></i> الإصدارات المحفوظة (${WBState.versions.length})</strong>
    <div style="display:flex; flex-direction:column; gap:5px;">
      ${WBState.versions.length ? WBState.versions.map((v, i) => `
        <div class="wb2-layer-row">
          <span>${esc(v.name)}</span>
          <button type="button" class="btn btn-xs btn-gold" data-restore-ver="${i}">استرجاع</button>
        </div>
      `).join("") : `<small class="small-muted">اضغط "حفظ إصدار" لحفظ لقطة من اللوحة.</small>`}
    </div>
  `;

  document.getElementById("btn-close-wb2-drawer").onclick = () => {
    WBState.activeSideDrawer = null;
    drawer.classList.add("hidden");
  };

  drawer.querySelectorAll("[data-layer-node]").forEach(row => {
    row.onclick = (e) => {
      if (e.target.closest("button")) return;
      WBState.selectedNodeId = row.dataset.layerNode;
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
      renderWB2SideDrawer(ctx, canvas);
    };
  });

  drawer.querySelectorAll("[data-layer-hide]").forEach(btn => {
    btn.onclick = () => {
      const nd = WBState.nodes.find(n => n.id === btn.dataset.layerHide);
      if (nd) nd.hidden = !nd.hidden;
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
      renderWB2SideDrawer(ctx, canvas);
    };
  });

  drawer.querySelectorAll("[data-layer-lock]").forEach(btn => {
    btn.onclick = () => {
      const nd = WBState.nodes.find(n => n.id === btn.dataset.layerLock);
      if (nd) nd.locked = !nd.locked;
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
      renderWB2SideDrawer(ctx, canvas);
    };
  });

  drawer.querySelectorAll("[data-restore-ver]").forEach(btn => {
    btn.onclick = () => {
      const ver = WBState.versions[Number(btn.dataset.restoreVer)];
      if (!ver) return;
      pushWB2Undo();
      WBState.nodes = JSON.parse(JSON.stringify(ver.nodes));
      WBState.strokes = JSON.parse(JSON.stringify(ver.strokes));
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
      toast(`تم استرجاع "${ver.name}" بنجاح! 🕰️✅`);
    };
  });
}

/* ============================================================================
   INFINITE CANVAS RENDER ENGINE (7 GRIDS, ELECTRICAL/LOGIC SYMBOLS, 3D, MINIMAP)
   ============================================================================ */
renderWhiteboardScene = function(ctx, W, H) {
  ctx.clearRect(0, 0, W, H);

  const isWhite = WBState.bgMode === "white";
  if (WBState.bgMode !== "transparent") {
    ctx.fillStyle = isWhite ? "#F8FAFC" : "#080D1A";
    ctx.fillRect(0, 0, W, H);
  }

  ctx.save();
  ctx.translate(WBState.panX, WBState.panY);
  ctx.scale(WBState.zoom, WBState.zoom);

  const step = WBState.gridSize || 32;
  const startX = Math.floor((-WBState.panX / WBState.zoom) / step) * step - step;
  const endX = startX + (W / WBState.zoom) + step * 2;
  const startY = Math.floor((-WBState.panY / WBState.zoom) / step) * step - step;
  const endY = startY + (H / WBState.zoom) + step * 2;

  // 1. رسم الشبكات الهندسية الـ 7 على اللوحة اللانهائية
  if (WBState.bgMode === "grid" || WBState.bgMode === "eng") {
    ctx.strokeStyle = isWhite ? "rgba(15, 23, 42, 0.08)" : "rgba(212, 167, 44, 0.08)";
    ctx.lineWidth = 1;
    for (let x = startX; x < endX; x += step) {
      ctx.beginPath(); ctx.moveTo(x, startY); ctx.lineTo(x, endY); ctx.stroke();
    }
    for (let y = startY; y < endY; y += step) {
      ctx.beginPath(); ctx.moveTo(startX, y); ctx.lineTo(endX, y); ctx.stroke();
    }
    if (WBState.bgMode === "eng") {
      ctx.strokeStyle = "rgba(56, 189, 248, 0.14)";
      ctx.lineWidth = 1.6;
      for (let x = startX; x < endX; x += step * 5) {
        ctx.beginPath(); ctx.moveTo(x, startY); ctx.lineTo(x, endY); ctx.stroke();
      }
      for (let y = startY; y < endY; y += step * 5) {
        ctx.beginPath(); ctx.moveTo(startX, y); ctx.lineTo(endX, y); ctx.stroke();
      }
    }
  } else if (WBState.bgMode === "dots") {
    ctx.fillStyle = "rgba(148, 163, 184, 0.28)";
    for (let x = startX; x < endX; x += step) {
      for (let y = startY; y < endY; y += step) {
        ctx.beginPath(); ctx.arc(x, y, 1.4, 0, Math.PI * 2); ctx.fill();
      }
    }
  } else if (WBState.bgMode === "iso") {
    ctx.strokeStyle = "rgba(33, 197, 197, 0.09)";
    ctx.lineWidth = 1;
    for (let x = startX - 600; x < endX + 600; x += step * 1.5) {
      ctx.beginPath(); ctx.moveTo(x, startY); ctx.lineTo(x + 800, startY + 460); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, startY + 460); ctx.lineTo(x + 800, startY); ctx.stroke();
    }
  } else if (WBState.bgMode === "polar") {
    const cx = 500, cy = 270;
    ctx.strokeStyle = "rgba(212, 167, 44, 0.12)";
    for (let r = 50; r <= 550; r += 60) {
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    }
  }

  // 2. رسم الصور المدرجة مع مقبض تغيير الحجم
  WBState.images.forEach(im => {
    ctx.drawImage(im.imgEl, im.x, im.y, im.w, im.h);
    const isSel = im.id === WBState.selectedImgId;
    ctx.strokeStyle = isSel ? "#19B889" : "rgba(212, 167, 44, 0.5)";
    ctx.lineWidth = isSel ? 3 : 1.5;
    ctx.strokeRect(im.x, im.y, im.w, im.h);
    ctx.fillStyle = "#D4A72C";
    ctx.fillRect(im.x + im.w - 14, im.y + im.h - 14, 16, 16);
  });

  // 3. رسم الخطوط والأشكال وخطوط الأبعاد القياسية (Dimension Lines)
  WBState.strokes.forEach((s, idx) => {
    if (s.hidden) return;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = s.type === "highlight" ? s.size * 3.2 : s.size;
    ctx.strokeStyle = s.type === "eraser" ? (isWhite ? "#F8FAFC" : "#080D1A") : s.color;
    ctx.fillStyle = s.color;
    if (s.lineStyle === "dashed") ctx.setLineDash([10, 6]);
    else if (s.lineStyle === "dotted") ctx.setLineDash([3, 6]);
    if (s.type === "highlight") ctx.globalAlpha = 0.32;

    if (idx === WBState.selectedStrokeIdx) {
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#19B889";
    }

    if (["pen", "tech_pen", "highlight", "eraser"].includes(s.type)) {
      if (s.points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        s.points.forEach(pt => ctx.lineTo(pt.x, pt.y));
        ctx.stroke();
      }
    } else if (s.type === "line") {
      ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();
    } else if (s.type === "arrow") {
      drawArrowOnCtx(ctx, s.x1, s.y1, s.x2, s.y2, s.color, s.size);
    } else if (s.type === "dimension") {
      // خط أبعاد هندسي يحسب المسافة والزاوية تلقائياً!
      drawArrowOnCtx(ctx, s.x1, s.y1, s.x2, s.y2, s.color, 2);
      drawArrowOnCtx(ctx, s.x2, s.y2, s.x1, s.y1, s.color, 2);
      const distPx = Math.round(Math.hypot(s.x2 - s.x1, s.y2 - s.y1));
      const distCm = (distPx / 37.8).toFixed(1);
      const midX = (s.x1 + s.x2) / 2;
      const midY = (s.y1 + s.y2) / 2 - 10;
      ctx.font = "bold 12px Inter, sans-serif";
      ctx.fillStyle = "#19B889";
      ctx.textAlign = "center";
      ctx.fillText(`📏 ${distCm} cm (${distPx}px)`, midX, midY);
    } else if (s.type === "rect") {
      const rw = s.x2 - s.x1, rh = s.y2 - s.y1;
      ctx.strokeRect(s.x1, s.y1, rw, rh);
      if (s.innerText) {
        ctx.font = `bold ${Math.max(14, s.size * 3.2)}px Alexandria, Cairo, sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(s.innerText, s.x1 + rw / 2, s.y1 + rh / 2);
      }
    } else if (s.type === "circle") {
      const r = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
      ctx.beginPath(); ctx.arc(s.x1, s.y1, r, 0, Math.PI * 2); ctx.stroke();
      if (s.innerText) {
        ctx.font = `bold ${Math.max(14, s.size * 3.2)}px Alexandria, Cairo, sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(s.innerText, s.x1, s.y1);
      }
    } else if (s.type === "text") {
      ctx.font = `bold ${Math.max(16, s.size * 4.2)}px Alexandria, Cairo, sans-serif`;
      ctx.fillText(s.text, s.x, s.y);
    }
    ctx.restore();
  });

  // 4. رسم الروابط الذكية بين العناصر (Smart Connectors: Curved, Elbow, Straight, Dashed)
  WBState.nodes.forEach(nd => {
    if (nd.hidden || !nd.parentId) return;
    const parent = WBState.nodes.find(p => p.id === nd.parentId && !p.hidden);
    if (!parent) return;

    ctx.save();
    ctx.strokeStyle = nd.color || "#19B889";
    ctx.lineWidth = 2.5;
    if (WBState.connectorType === "dashed") ctx.setLineDash([8, 6]);

    const sx = parent.x, sy = parent.y + parent.h / 2;
    const ex = nd.x, ey = nd.y - nd.h / 2;
    const midY = (sy + ey) / 2;

    ctx.beginPath();
    ctx.moveTo(sx, sy);
    if (WBState.connectorType === "straight") {
      ctx.lineTo(ex, ey);
    } else if (WBState.connectorType === "elbow") {
      ctx.lineTo(sx, midY);
      ctx.lineTo(ex, midY);
      ctx.lineTo(ex, ey);
    } else {
      ctx.bezierCurveTo(sx, midY, ex, midY, ex, ey);
    }
    ctx.stroke();

    ctx.fillStyle = nd.color || "#19B889";
    ctx.beginPath(); ctx.arc(ex, ey, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  });

  // 5. رسم العقد والأشكال الهندسية والرموز الكهربائية والبوابات المنطقية والدوال الرياضية
  WBState.nodes.forEach(nd => {
    if (nd.hidden) return;
    drawWB2SmartNode(ctx, nd, isWhite);
  });

  // 6. رسم المسطرة والمنقلة الهندسية التفاعلية على اللوحة
  if (WBState.showRuler) drawInteractiveRuler(ctx, WBState.rulerPos);
  if (WBState.showProtractor) drawInteractiveProtractor(ctx, WBState.protractorPos);

  // 7. رسم مؤشر الليزر
  if (WBState.laserPoints.length > 1) {
    ctx.save();
    ctx.strokeStyle = "#EF4444"; ctx.shadowBlur = 16; ctx.shadowColor = "#EF4444"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(WBState.laserPoints[0].x, WBState.laserPoints[0].y);
    WBState.laserPoints.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();

  // 8. تأثير كشاف المحاضرات (Presentation Spotlight)
  if (WBState.spotlightMode) {
    const sx = WBState.mouseWorld.x * WBState.zoom + WBState.panX;
    const sy = WBState.mouseWorld.y * WBState.zoom + WBState.panY;
    ctx.save();
    const grad = ctx.createRadialGradient(sx, sy, 65, sx, sy, 240);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.72)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // 9. رسم الخريطة المصغرة (Minimap) في الركن السفلي الأيمن
  if (WBState.showMinimap) {
    drawWB2Minimap(ctx, W, H);
  }
};

function drawWB2SmartNode(ctx, nd, isWhite) {
  const isSel = nd.id === WBState.selectedNodeId;
  ctx.save();
  ctx.translate(nd.x, nd.y);
  if (nd.rotation) ctx.rotate((nd.rotation * Math.PI) / 180);

  const hw = nd.w / 2;
  const hh = nd.h / 2;
  const col = nd.color || "#D4A72C";

  if (isSel) {
    ctx.shadowBlur = 18;
    ctx.shadowColor = col;
  }

  // رسم خاص للدالة الرياضية f(x)
  if (nd.shape === "math_plot") {
    ctx.fillStyle = "rgba(11, 17, 32, 0.94)";
    ctx.strokeStyle = col;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(-hw, -hh, nd.w, nd.h, 12); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-hw + 10, 0); ctx.lineTo(hw - 10, 0); ctx.moveTo(0, -hh + 10); ctx.lineTo(0, hh - 10); ctx.stroke();

    ctx.strokeStyle = "#19B889"; ctx.lineWidth = 2.2;
    ctx.beginPath();
    let started = false;
    for (let px = -hw + 14; px <= hw - 14; px += 3) {
      const xVal = px / 18;
      try {
        const yVal = Function("x", `"use strict"; return (${nd.val || "Math.sin(x)"});`)(xVal);
        const py = Math.max(-hh + 12, Math.min(hh - 12, -yVal * 22));
        if (!started) { ctx.moveTo(px, py); started = true; }
        else ctx.lineTo(px, py);
      } catch (e) {}
    }
    ctx.stroke();
    ctx.fillStyle = "#F8FAFC"; ctx.font = "bold 11px Inter, sans-serif"; ctx.textAlign = "center";
    ctx.fillText(nd.text, 0, -hh + 14);
    ctx.restore();
    return;
  }

  // رسم خاص لجدول الحقيقة المنطقي (Truth Table)
  if (nd.shape === "truth_table") {
    ctx.fillStyle = "rgba(11, 17, 32, 0.96)";
    ctx.strokeStyle = col; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(-hw, -hh, nd.w, nd.h, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = col; ctx.font = "bold 12px Inter, sans-serif"; ctx.textAlign = "center";
    ctx.fillText(nd.text, 0, -hh + 18);
    const g = (nd.val || "XOR").toUpperCase();
    const rows = [
      ["A", "B", "OUT"],
      ["0", "0", g === "NAND" || g === "NOR" ? "1" : "0"],
      ["0", "1", g === "OR" || g === "XOR" || g === "NAND" ? "1" : "0"],
      ["1", "0", g === "OR" || g === "XOR" || g === "NAND" ? "1" : "0"],
      ["1", "1", g === "AND" || g === "OR" ? "1" : "0"]
    ];
    ctx.fillStyle = "#F8FAFC"; ctx.font = "11px monospace";
    rows.forEach((r, idx) => {
      ctx.fillText(`${r[0]}   |   ${r[1]}   |   ${r[2]}`, 0, -hh + 40 + idx * 19);
    });
    ctx.restore();
    return;
  }

  // رسم الملاحظة اللاصقة (Sticky Note)
  if (nd.shape === "sticky") {
    ctx.fillStyle = "#FEF08A";
    ctx.strokeStyle = "#CA8A04";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(-hw, -hh, nd.w, nd.h, 6); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 13px Alexandria, Cairo, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(nd.text, 0, -10);
    if (nd.val) {
      ctx.font = "11.5px Alexandria, Cairo, sans-serif";
      ctx.fillText(nd.val, 0, 16);
    }
    ctx.restore();
    return;
  }

  // الصندوق القياسي أو الهندسي أو الرمز الكهربائي/المنطقي
  ctx.fillStyle = isWhite ? "#FFFFFF" : "#11192E";
  ctx.strokeStyle = isSel ? "#19B889" : col;
  ctx.lineWidth = isSel ? 3.2 : 2.2;

  ctx.beginPath();
  if (nd.shape === "circle" || nd.shape === "elec_ac" || nd.shape === "elec_dc") {
    ctx.arc(0, 0, Math.max(hw, hh), 0, Math.PI * 2);
  } else if (nd.shape === "diamond") {
    ctx.moveTo(0, -hh - 8); ctx.lineTo(hw + 12, 0); ctx.lineTo(0, hh + 8); ctx.lineTo(-hw - 12, 0); ctx.closePath();
  } else if (nd.shape === "hexagon") {
    ctx.moveTo(-hw + 16, -hh); ctx.lineTo(hw - 16, -hh); ctx.lineTo(hw + 8, 0);
    ctx.lineTo(hw - 16, hh); ctx.lineTo(-hw + 16, hh); ctx.lineTo(-hw - 8, 0); ctx.closePath();
  } else if (nd.shape === "round_rect") {
    ctx.roundRect(-hw, -hh, nd.w, nd.h, 22);
  } else {
    ctx.roundRect(-hw, -hh, nd.w, nd.h, 10);
  }
  ctx.fill();
  ctx.stroke();

  // رسم الرمز الهندسي بداخل البطاقة (مثل سنون المقاومة الكهربائيه أو المكثف أو البوابة)
  ctx.shadowBlur = 0;
  if (nd.shape === "elec_res") {
    ctx.strokeStyle = "#F59E0B"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-36, -12); ctx.lineTo(-24, -20); ctx.lineTo(-12, -4); ctx.lineTo(0, -20); ctx.lineTo(12, -4); ctx.lineTo(24, -20); ctx.lineTo(36, -12); ctx.stroke();
  } else if (nd.shape === "elec_cap") {
    ctx.strokeStyle = "#38BDF8"; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(-6, -22); ctx.lineTo(-6, -6); ctx.moveTo(6, -22); ctx.lineTo(6, -6); ctx.stroke();
  } else if (nd.shape === "phys_wave") {
    ctx.strokeStyle = "#19B889"; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = -40; i <= 40; i += 2) {
      const wy = -14 + Math.sin(i * 0.2) * 7;
      if (i === -40) ctx.moveTo(i, wy); else ctx.lineTo(i, wy);
    }
    ctx.stroke();
  }

  ctx.fillStyle = isWhite ? "#0F172A" : "#F8FAFC";
  ctx.font = nd.shape === "code_block" ? "bold 12px monospace" : "bold 13px Alexandria, Cairo, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText((nd.locked ? "🔒 " : "") + nd.text, 0, nd.val ? -6 : 0);

  if (nd.val) {
    ctx.fillStyle = col;
    ctx.font = "bold 11px Inter, Alexandria, sans-serif";
    ctx.fillText(nd.val, 0, 14);
  }

  ctx.restore();
}

function drawInteractiveRuler(ctx, r) {
  ctx.save();
  ctx.fillStyle = "rgba(212, 167, 44, 0.18)";
  ctx.strokeStyle = "#D4A72C";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(r.x, r.y, r.w, 42, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "10px Inter, monospace";
  ctx.textAlign = "center";
  for (let i = 0; i <= r.w; i += 10) {
    const isMajor = i % 50 === 0;
    ctx.beginPath();
    ctx.moveTo(r.x + i, r.y);
    ctx.lineTo(r.x + i, r.y + (isMajor ? 15 : 8));
    ctx.stroke();
    if (isMajor && i > 0 && i < r.w) {
      ctx.fillText(`${i / 10}cm`, r.x + i, r.y + 28);
    }
  }
  ctx.restore();
}

function drawInteractiveProtractor(ctx, p) {
  ctx.save();
  ctx.fillStyle = "rgba(56, 189, 248, 0.14)";
  ctx.strokeStyle = "#38BDF8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#F8FAFC";
  ctx.font = "9.5px Inter, monospace";
  ctx.textAlign = "center";
  for (let deg = 0; deg <= 180; deg += 15) {
    const rad = Math.PI + (deg * Math.PI) / 180;
    const x1 = p.x + Math.cos(rad) * (p.r - 10);
    const y1 = p.y + Math.sin(rad) * (p.r - 10);
    const x2 = p.x + Math.cos(rad) * p.r;
    const y2 = p.y + Math.sin(rad) * p.r;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    if (deg % 30 === 0) {
      const tx = p.x + Math.cos(rad) * (p.r - 22);
      const ty = p.y + Math.sin(rad) * (p.r - 22);
      ctx.fillText(`${deg}°`, tx, ty);
    }
  }
  ctx.restore();
}

function drawWB2Minimap(ctx, W, H) {
  const mmW = 150, mmH = 95;
  const mmX = W - mmW - 14, mmY = H - mmH - 14;
  ctx.save();
  ctx.fillStyle = "rgba(7, 10, 20, 0.88)";
  ctx.strokeStyle = "rgba(212, 167, 44, 0.5)";
  ctx.lineWidth = 1.5;
  ctx.fillRect(mmX, mmY, mmW, mmH);
  ctx.strokeRect(mmX, mmY, mmW, mmH);

  WBState.nodes.forEach(n => {
    if (n.hidden) return;
    const nx = mmX + Math.max(4, Math.min(mmW - 8, (n.x / 1600) * mmW));
    const ny = mmY + Math.max(4, Math.min(mmH - 8, (n.y / 1000) * mmH));
    ctx.fillStyle = n.color || "#D4A72C";
    ctx.fillRect(nx, ny, 6, 4);
  });

  ctx.strokeStyle = "#19B889";
  ctx.lineWidth = 1.2;
  const vx = mmX + Math.max(0, Math.min(mmW - 35, (-WBState.panX / 1600) * mmW));
  const vy = mmY + Math.max(0, Math.min(mmH - 25, (-WBState.panY / 1000) * mmH));
  ctx.strokeRect(vx, vy, 35 / WBState.zoom, 24 / WBState.zoom);
  ctx.restore();
}

// اختصارات الكيبورد الاحترافية للسبورة الهندسية 2.0
window.addEventListener("keydown", (e) => {
  const canvas = document.getElementById("smart-whiteboard-canvas");
  if (!canvas || ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;

  if (e.code === "Space") {
    WBState.spacePressed = true;
    canvas.style.cursor = "grab";
  }

  const k = e.key.toLowerCase();
  if (!e.ctrlKey && !e.metaKey) {
    const map = { v: "select", p: "pen", e: "eraser", t: "text", l: "line", r: "rect", c: "circle" };
    if (map[k]) {
      document.querySelector(`[data-wb-tool="${map[k]}"]`)?.click();
    } else if (e.key === "Delete" || e.key === "Backspace") {
      document.getElementById("btn-wb-del-node")?.click();
    } else if (e.key === "Escape" && WBState.presentationMode) {
      document.getElementById("btn-wb2-present-mode")?.click();
    }
  } else {
    if (k === "z") { e.preventDefault(); document.getElementById("btn-wb-undo")?.click(); }
    else if (k === "y") { e.preventDefault(); document.getElementById("btn-wb2-redo")?.click(); }
    else if (k === "d") { e.preventDefault(); document.getElementById("btn-wb2-duplicate")?.click(); }
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    WBState.spacePressed = false;
  }
});
/* ============================================================================
   ULTIMATE WHITEBOARD STUDIO 3.0 (FIXED & SELF-CONTAINED)
   - يفتح في شاشة كاملة منعزلة 100% فور الضغط على "السبورة والتفريع"
   - إضاءة كاملة موحدة افتراضياً ☀️ مع زر تبديل لكشاف الماوس 🔦 في أي وقت
   - فتح سلس لملفات (PDF / صور / أكواد) مع التبديل الفوري بين:
     1) فرد الملف بالكامل داخل السبورة للكتابة والتحديد عليه
     2) تقسيم الشاشة 50/50 بجانب السبورة مع شريط تحكم حي في حجم الملف
   - وضع المحاضرة الشامل مع شريط أقلام المحاضر العائم بالأسفل
   ============================================================================ */

Object.assign(WBState, {
  lightingMode: "full", // "full" (سبورة مضيئة بالكامل) | "spotlight" (كشاف مكان الماوس فقط)
  spotlightMode: false,
  spotlightRadius: 210,
  docMode: "none", // "none" | "split" (تقسيم 50/50) | "canvas" (مفرود داخل السبورة)
  splitRatio: 50,
  splitZoom: 100,
  pdfDoc: null,
  pdfPageNum: 1,
  pdfTotalPages: 0,
  activeFileName: "",
  activeFileType: "", // "pdf" | "image" | "text"
  activeFileUrl: "",
  activeTextContent: "",
  canvasDocImageId: null
});

function injectWB3ProDesignStyles() {
  if (document.getElementById("wb3-pro-design-styles")) return;
  const st = document.createElement("style");
  st.id = "wb3-pro-design-styles";
  st.textContent = `
    /* فتح السبورة في شاشة كاملة منعزلة 100% بدون أي حواف أو قوائم خلفية */
    .modal-overlay:has(.wb3-isolated-fullscreen) {
      padding: 0 !important;
      background: #060913 !important;
    }
    .modal-card.wb3-isolated-fullscreen {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      max-width: 100vw !important;
      height: 100vh !important;
      max-height: 100vh !important;
      margin: 0 !important;
      border-radius: 0 !important;
      border: none !important;
      padding: 10px 16px !important;
      background: #070b16 !important;
      z-index: 999999 !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
    }
    .modal-card.wb3-isolated-fullscreen .modal-header {
      margin-bottom: 6px !important;
      padding-bottom: 6px !important;
    }
    .modal-card.wb3-isolated-fullscreen #universal-modal-form {
      display: flex !important;
      flex-direction: column !important;
      flex: 1 !important;
      min-height: 0 !important;
      overflow: hidden !important;
    }

    /* تنسيق كبسولات الأدوات الاحترافي */
    .wb3-ribbon-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 6px 10px;
      background: linear-gradient(180deg, rgba(15, 22, 40, 0.98), rgba(9, 13, 25, 0.98));
      border: 1px solid rgba(212, 167, 44, 0.35);
      border-radius: 12px;
      padding: 6px 10px;
      margin-bottom: 6px;
      flex-shrink: 0;
    }
    .wb3-pill-group {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.09);
      padding: 3px 6px;
      border-radius: 9px;
    }
    .wb3-pill-group .wb-tool-btn {
      padding: 5px 9px;
      font-size: 0.75rem;
      border-radius: 7px;
    }

    /* منطقة العمل المرنة وتقسيم الشاشة 50/50 */
    .wb2-workspace-wrap {
      flex: 1 !important;
      min-height: 0 !important;
      display: flex !important;
      gap: 10px !important;
      align-items: stretch !important;
      position: relative !important;
    }
    .wb3-split-container {
      display: flex;
      width: 100%;
      height: 100%;
      gap: 10px;
      align-items: stretch;
      min-height: 0;
    }
    .wb3-canvas-holder {
      flex: 1;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-width: 260px;
      height: 100%;
    }
    .modal-card.wb3-isolated-fullscreen .whiteboard-canvas-box {
      width: 100% !important;
      height: calc(100vh - 175px) !important;
      flex: 1 !important;
    }

    /* عارض الملفات التفاعلي المقسوم بجانب السبورة */
    .wb3-file-split-pane {
      background: #0b101e;
      border: 2px solid #19B889;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: calc(100vh - 175px);
      min-width: 240px;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.7);
    }
    .wb3-file-pane-header {
      background: rgba(16, 24, 44, 0.98);
      border-bottom: 1px solid rgba(25, 184, 137, 0.35);
      padding: 8px 12px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 0.78rem;
      flex-shrink: 0;
    }
    .wb3-file-pane-body {
      flex: 1;
      overflow: auto;
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      background: #070a14;
      padding: 12px;
    }
    .wb3-file-pane-body canvas,
    .wb3-file-pane-body img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.65);
      transition: width 0.15s ease;
    }
    .wb3-file-pane-body pre {
      width: 100%;
      color: #f8fafc;
      font-family: 'Inter', monospace;
      font-size: 0.88rem;
      line-height: 1.7;
      white-space: pre-wrap;
      direction: ltr;
      text-align: left;
      padding: 14px;
      background: #0b1120;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    /* شريط المحاضر العائم أسفل وضع المحاضرة */
    .wb3-lecture-floating-dock {
      display: none;
      position: fixed;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000020;
      background: rgba(8, 12, 24, 0.96);
      border: 1.5px solid var(--gold-primary);
      border-radius: 99px;
      padding: 7px 16px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.92), 0 0 25px rgba(212, 167, 44, 0.3);
      backdrop-filter: blur(16px);
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      max-width: 96vw;
      justify-content: center;
    }
    .wb-presentation-active .wb3-lecture-floating-dock {
      display: inline-flex !important;
    }
    .wb-presentation-active .wb3-ribbon-bar,
    .wb-presentation-active .modal-header,
    .wb-presentation-active .wb-bottom-hint {
      display: none !important;
    }
    .wb-presentation-active .whiteboard-canvas-box,
    .wb-presentation-active .wb3-file-split-pane {
      height: calc(100vh - 24px) !important;
    }

    /* شريط التحكم العائم للملف المفرود داخل السبورة */
    .wb3-canvas-doc-bar {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 25;
      background: rgba(11, 17, 32, 0.95);
      border: 1.5px solid #19B889;
      border-radius: 99px;
      padding: 6px 16px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.78rem;
      box-shadow: 0 12px 30px rgba(0,0,0,0.8);
      white-space: nowrap;
    }
  `;
  document.head.appendChild(st);
}

// تحميل مكتبة PDF.js تلقائياً وبأمان
async function ensurePdfJsLoaded() {
  if (window.pdfjsLib) return window.pdfjsLib;
  await new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  return window.pdfjsLib;
}

async function renderCurrentPdfPageToDataUrl(scale = 1.65) {
  if (!WBState.pdfDoc) return null;
  const page = await WBState.pdfDoc.getPage(WBState.pdfPageNum);
  const viewport = page.getViewport({ scale });
  const offCanvas = document.createElement("canvas");
  offCanvas.width = viewport.width;
  offCanvas.height = viewport.height;
  const offCtx = offCanvas.getContext("2d");
  await page.render({ canvasContext: offCtx, viewport }).promise;
  return {
    dataUrl: offCanvas.toDataURL("image/png"),
    w: viewport.width,
    h: viewport.height
  };
}

function renderTextFileToDataUrl(title, textContent) {
  const offCanvas = document.createElement("canvas");
  offCanvas.width = 860;
  offCanvas.height = 1080;
  const c = offCanvas.getContext("2d");
  c.fillStyle = "#0d1324";
  c.fillRect(0, 0, offCanvas.width, offCanvas.height);
  c.strokeStyle = "#D4A72C";
  c.lineWidth = 4;
  c.strokeRect(10, 10, offCanvas.width - 20, offCanvas.height - 20);

  c.fillStyle = "#D4A72C";
  c.font = "bold 20px Alexandria, Cairo, monospace";
  c.fillText(`📄 ${title}`, 35, 48);

  c.fillStyle = "#f8fafc";
  c.font = "15px Inter, Cairo, monospace";
  const lines = String(textContent || "").split("\n").slice(0, 44);
  lines.forEach((ln, idx) => {
    c.fillText(ln.slice(0, 98), 35, 88 + idx * 22);
  });
  return { dataUrl: offCanvas.toDataURL("image/png"), w: 680, h: 850 };
}

// فرد الصفحة الحالية من الملف داخل السبورة مباشرة للشرح والتحديد عليها
async function placeActiveFileOnWhiteboardCanvas(ctx, canvas) {
  let imgInfo = null;
  if (WBState.activeFileType === "pdf" && WBState.pdfDoc) {
    imgInfo = await renderCurrentPdfPageToDataUrl(1.6);
  } else if (WBState.activeFileType === "image" && WBState.activeFileUrl) {
    imgInfo = { dataUrl: WBState.activeFileUrl, w: 720, h: 520 };
  } else if (WBState.activeFileType === "text") {
    imgInfo = renderTextFileToDataUrl(WBState.activeFileName, WBState.activeTextContent);
  }
  if (!imgInfo) return;

  const imgEl = new Image();
  imgEl.onload = () => {
    const availH = Math.max(420, canvas.height - 70);
    const ratio = (imgEl.width || 700) / Math.max(1, imgEl.height || 500);
    let targetH = availH;
    let targetW = Math.round(targetH * ratio);
    if (targetW > canvas.width * 0.85) {
      targetW = Math.round(canvas.width * 0.85);
      targetH = Math.round(targetW / ratio);
    }

    const docId = WBState.canvasDocImageId || ("doc_sheet_" + Date.now());
    WBState.canvasDocImageId = docId;

    const existingIdx = WBState.images.findIndex(im => im.id === docId);
    const newImgObj = {
      id: docId,
      imgEl,
      x: Math.max(30, Math.round((canvas.width - targetW) / 2)),
      y: 42,
      w: targetW,
      h: targetH,
      isDocumentSheet: true
    };

    if (existingIdx >= 0) WBState.images[existingIdx] = newImgObj;
    else WBState.images.unshift(newImgObj);

    WBState.panX = 0;
    WBState.panY = 0;
    WBState.zoom = 1;
    const zLbl = document.getElementById("wb2-zoom-lbl");
    if (zLbl) zLbl.textContent = "100%";

    renderWhiteboardScene(ctx, canvas.width, canvas.height);
    updateDocBarsUI(ctx, canvas);
  };
  imgEl.src = imgInfo.dataUrl;
}

async function updateDocBarsUI(ctx, canvas) {
  const splitPane = document.getElementById("wb3-file-split-pane");
  const canvasDocBar = document.getElementById("wb3-canvas-doc-bar");
  const splitBody = document.getElementById("wb3-file-pane-body");
  const pageLbl1 = document.getElementById("wb3-split-page-lbl");
  const pageLbl2 = document.getElementById("wb3-canvas-page-lbl");
  const modeSelect = document.getElementById("wb3-doc-mode-select");

  const pageText = WBState.activeFileType === "pdf"
    ? `${WBState.activeFileName.slice(0, 18)} • صفحة ${WBState.pdfPageNum} / ${WBState.pdfTotalPages}`
    : (WBState.activeFileName || "ملف الشرح");

  if (pageLbl1) pageLbl1.textContent = pageText;
  if (pageLbl2) pageLbl2.textContent = pageText;
  if (modeSelect && WBState.docMode !== "none") modeSelect.value = WBState.docMode;

  if (WBState.docMode === "split" && splitPane) {
    splitPane.classList.remove("hidden");
    splitPane.style.width = `${WBState.splitRatio}%`;
    if (canvasDocBar) canvasDocBar.classList.add("hidden");

    if (splitBody) {
      if (WBState.activeFileType === "pdf" && WBState.pdfDoc) {
        const page = await WBState.pdfDoc.getPage(WBState.pdfPageNum);
        const vp = page.getViewport({ scale: (WBState.splitZoom / 100) * 1.35 });
        splitBody.innerHTML = `<canvas id="wb3-pdf-split-canvas"></canvas>`;
        const pdfCanv = document.getElementById("wb3-pdf-split-canvas");
        pdfCanv.width = vp.width;
        pdfCanv.height = vp.height;
        await page.render({ canvasContext: pdfCanv.getContext("2d"), viewport: vp }).promise;
      } else if (WBState.activeFileType === "image") {
        splitBody.innerHTML = `<img src="${WBState.activeFileUrl}" style="width:${WBState.splitZoom}%;" alt="File" />`;
      } else if (WBState.activeFileType === "text") {
        splitBody.innerHTML = `<pre style="font-size:${Math.round(14 * (WBState.splitZoom / 100))}px;">${esc(WBState.activeTextContent)}</pre>`;
      }
    }
  } else if (WBState.docMode === "canvas") {
    if (splitPane) splitPane.classList.add("hidden");
    if (canvasDocBar) canvasDocBar.classList.remove("hidden");
  } else {
    if (splitPane) splitPane.classList.add("hidden");
    if (canvasDocBar) canvasDocBar.classList.add("hidden");
  }

  setTimeout(() => {
    if (canvas) {
      canvas.width = canvas.clientWidth || 960;
      canvas.height = canvas.clientHeight || 540;
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
    }
  }, 55);
}

// معالج رفع الملفات السلس (PDF / صورة / كود) مع سؤال المستخدم أو فتحه مباشرة
async function handleWB3FileUpload(file, ctx, canvas) {
  if (!file) return;
  WBState.activeFileName = file.name;
  const ext = file.name.split(".").pop().toLowerCase();

  toast(`⏳ جاري فتح الملف (${file.name})...`, "info");

  try {
    if (ext === "pdf" || file.type === "application/pdf") {
      WBState.activeFileType = "pdf";
      const pdfjsLib = await ensurePdfJsLoaded();
      const arrayBuf = await file.arrayBuffer();
      WBState.pdfDoc = await pdfjsLib.getDocument({ data: arrayBuf }).promise;
      WBState.pdfPageNum = 1;
      WBState.pdfTotalPages = WBState.pdfDoc.numPages;
    } else if (file.type.startsWith("image/") || ["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)) {
      WBState.activeFileType = "image";
      WBState.activeFileUrl = await new Promise((res) => {
        const r = new FileReader();
        r.onload = (ev) => res(ev.target.result);
        r.readAsDataURL(file);
      });
    } else {
      WBState.activeFileType = "text";
      WBState.activeTextContent = await file.text();
    }

    // نافذة اختيار أنيقة أو سؤال فوري بين (تقسيم 50/50) و (فرد داخل السبورة)
    const choice = confirm(
      `📂 تم تحميل الملف بنجاح: (${file.name})\n\n` +
      `• اضغط (موافق OK) لفرد الملف بالكامل داخل السبورة للكتابة والتظليل والشرح عليه مباشرة ✍️\n` +
      `• أو اضغط (إلغاء Cancel) لفتحه في شاشة مقسومة (50/50) بجانب السبورة مع التحكم في حجمه ⚖️`
    );

    if (choice) {
      WBState.docMode = "canvas";
      await placeActiveFileOnWhiteboardCanvas(ctx, canvas);
      toast(`✍️ تم فرد "${file.name}" داخل السبورة! استخدم القلم أو قلم التحديد للشرح عليه مباشرة`);
    } else {
      WBState.docMode = "split";
      await updateDocBarsUI(ctx, canvas);
      toast(`⚖️ تم فتح "${file.name}" في وضع التقسيم 50/50 بجانب السبورة!`);
    }
  } catch (err) {
    console.error("File Open Error:", err);
    toast("تعذر قراءة الملف، يرجى التأكد من صيغته", "error");
  }
}

// الدالة الرئيسية لفتح السبورة الهندسية في شاشة كاملة منعزلة 100%
openSmartWhiteboardModal = function(autoStartPrivateRecord = false) {
  injectWB2StudioStyles();
  injectWB3ProDesignStyles();
  document.body.classList.add("wb-fullscreen-mode");

  // ضمان أن الإضاءة افتراضياً كاملة وموحدة وليست مظلمة
  if (!WBState.lightingMode) WBState.lightingMode = "full";
  WBState.spotlightMode = WBState.lightingMode === "spotlight";

  B().openFormModal("🎨 استوديو السبورة الهندسية والمحاضرات الذكي 3.0 (Full-Screen Isolated Studio)", `
    <!-- الشريط الأول: أدوات الرسم والتحديد + الإضاءة + فتح الملفات (50/50 أو داخل السبورة) + وضع المحاضرة -->
    <div class="wb3-ribbon-bar">
      <div class="wb3-pill-group">
        <button type="button" class="wb-tool-btn ${WBState.tool === "select" ? "active" : ""}" data-wb-tool="select" title="تحديد وتحريك العناصر (V)"><i class="fa-solid fa-arrow-pointer"></i> تحديد</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "pan" ? "active" : ""}" data-wb-tool="pan" title="تحريك اللوحة اللانهائية (Space)"><i class="fa-solid fa-hand"></i> يد</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "pen" ? "active" : ""}" data-wb-tool="pen" title="قلم شرح (P)"><i class="fa-solid fa-pen"></i> قلم</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "highlight" ? "active" : ""}" data-wb-tool="highlight" title="قلم تحديد / ماركر شفاف للتظليل على الملفات"><i class="fa-solid fa-highlighter"></i> قلم تحديد</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "laser" ? "active" : ""}" data-wb-tool="laser" title="مؤشر ليزر للشرح"><i class="fa-solid fa-wand-magic-sparkles"></i> ليزر</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "arrow" ? "active" : ""}" data-wb-tool="arrow"><i class="fa-solid fa-arrow-trend-up"></i> سهم</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "dimension" ? "active" : ""}" data-wb-tool="dimension" title="قياس المسافة بالـ cm"><i class="fa-solid fa-ruler-horizontal gold-text"></i> أبعاد</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "rect" ? "active" : ""}" data-wb-tool="rect"><i class="fa-regular fa-square"></i> مستطيل</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "circle" ? "active" : ""}" data-wb-tool="circle"><i class="fa-regular fa-circle"></i> دائرة</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "text" ? "active" : ""}" data-wb-tool="text"><i class="fa-solid fa-font"></i> نص</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "eraser" ? "active" : ""}" data-wb-tool="eraser"><i class="fa-solid fa-eraser"></i> ممحاة</button>
        <button type="button" class="wb-tool-btn ${WBState.tool === "obj_eraser" ? "active" : ""}" data-wb-tool="obj_eraser" title="حذف عنصر بضغطة واحدة"><i class="fa-solid fa-trash-can text-danger"></i></button>
      </div>

      <div class="wb3-pill-group">
        <input type="color" id="wb-color" value="${WBState.color}" style="width:30px; height:28px; padding:1px; cursor:pointer;" title="لون القلم أو الشكل" />
        <input type="range" id="wb-size" min="2" max="18" value="${WBState.size}" style="width:55px;" title="سمك الخط" />
        <select id="wb-linestyle-select" class="select-sm" style="min-width:80px; padding:3px 5px;">
          <option value="solid" ${WBState.lineStyle === "solid" ? "selected" : ""}>── متصل</option>
          <option value="dashed" ${WBState.lineStyle === "dashed" ? "selected" : ""}>- - متقطع</option>
          <option value="dotted" ${WBState.lineStyle === "dotted" ? "selected" : ""}>••• منقط</option>
        </select>
        <select id="wb-bg-select" class="select-sm" style="min-width:110px; padding:3px 5px;">
          <option value="white" ${WBState.bgMode === "white" ? "selected" : ""}>⬜ سبورة بيضاء</option>
          <option value="grid" ${WBState.bgMode === "grid" ? "selected" : ""}>📐 شبكة مربعات</option>
          <option value="eng" ${WBState.bgMode === "eng" ? "selected" : ""}>📏 شبكة هندسية</option>
          <option value="iso" ${WBState.bgMode === "iso" ? "selected" : ""}>🧊 أيزومترك 3D</option>
          <option value="polar" ${WBState.bgMode === "polar" ? "selected" : ""}>🎯 قطبية دائرية</option>
          <option value="dots" ${WBState.bgMode === "dots" ? "selected" : ""}>⠿ نقاط رقمية</option>
          <option value="dark" ${WBState.bgMode === "dark" ? "selected" : ""}>🌑 كحلي سادة</option>
        </select>
        <button type="button" id="btn-wb3-lighting-toggle" class="wb-tool-btn ${WBState.lightingMode === "spotlight" ? "active" : ""}" title="اختر هل السبورة كلها مضيئة أم تضيء في مكان الماوس فقط">
          <i class="fa-solid ${WBState.lightingMode === "spotlight" ? "fa-bullseye" : "fa-sun"} gold-text"></i>
          <span id="wb3-light-lbl">${WBState.lightingMode === "spotlight" ? "كشاف الماوس 🔦" : "إضاءة كاملة ☀️"}</span>
        </button>
      </div>

      <div class="wb3-pill-group" style="border-color:rgba(25,184,137,0.5);">
        <button type="button" id="btn-wb3-trigger-file" class="btn btn-xs btn-gold" title="افتح ملف PDF أو صورة أو كود للشرح عليه">
          <i class="fa-solid fa-file-import"></i> فتح ملف للشرح (PDF/صورة)
        </button>
        <input type="file" id="wb3-open-doc-inp" accept=".pdf,image/*,.txt,.js,.py,.html,.css,.cpp,.c,.java,.json,.md" class="hidden" />

        <select id="wb3-doc-mode-select" class="select-sm" style="min-width:135px; padding:3px 6px;" title="تغيير طريقة عرض الملف المفتوح">
          <option value="none" ${WBState.docMode === "none" ? "selected" : ""}>📂 وضع عرض الملف...</option>
          <option value="canvas" ${WBState.docMode === "canvas" ? "selected" : ""}>✍️ مفرود داخل السبورة</option>
          <option value="split" ${WBState.docMode === "split" ? "selected" : ""}>⚖️ تقسيم 50/50 بجانب الشرح</option>
          <option value="close">❌ إغلاق الملف</option>
        </select>

        <button type="button" id="btn-wb2-present-mode" class="btn btn-xs btn-gold" style="background:linear-gradient(135deg,#19B889,#059669)!important; color:#05070e!important;">
          <i class="fa-solid fa-person-chalkboard"></i> وضع المحاضرة الشامل
        </button>
      </div>
    </div>

    <!-- الشريط الثاني: الهندسة + التفريع الشجري + الـ AI + التصدير والتسجيل -->
    <div class="wb3-ribbon-bar" style="padding:5px 10px;">
      <div class="wb3-pill-group">
        <select id="wb2-eng-symbol-picker" class="select-sm" style="min-width:155px; padding:3px 6px; border-color:var(--gold-primary);">
          <option value="">⚡ رموز هندسية / منطقية / 3D...</option>
          <optgroup label="🔌 هندسة كهربائية وإلكترونيات">
            <option value="elec_res">〰️ مقاومة (Resistor Ω)</option>
            <option value="elec_cap">╣╠ مكثف (Capacitor μF)</option>
            <option value="elec_ind">➿ ملف حثي (Inductor mH)</option>
            <option value="elec_diode">▶️| دايود (Diode)</option>
            <option value="elec_led">💡 دايود ضوئي (LED)</option>
            <option value="elec_trans">⚙️ ترانزستور (MOSFET/BJT)</option>
            <option value="elec_dc">🔋 مصدر مستمر (DC)</option>
            <option value="elec_ac">〰️ مصدر متردد (AC)</option>
            <option value="elec_gnd">⏚ أرضي (GND)</option>
          </optgroup>
          <optgroup label="🔢 بوابات منطقية (Logic Design)">
            <option value="gate_and">D بوابة AND</option>
            <option value="gate_or">☽ بوابة OR</option>
            <option value="gate_not">▷o بوابة NOT</option>
            <option value="gate_nand">Do بوابة NAND</option>
            <option value="gate_xor">⊕ بوابة XOR</option>
            <option value="truth_table">📋 جدول حقيقة (Truth Table)</option>
          </optgroup>
          <optgroup label="🧊 أشكال 3D ورياضيات وفيزياء">
            <option value="sticky">🟨 ملاحظة لاصقة (Sticky Note)</option>
            <option value="code_block">💻 بلوك كود (Code Block)</option>
            <option value="cube">🧊 مكعب 3D</option>
            <option value="cylinder">🛢️ أسطوانة DB</option>
            <option value="math_plot">📈 رسم دالة رياضية f(x)</option>
            <option value="math_eq">∑ معادلة (LaTeX)</option>
            <option value="phys_vec">↗️ متجه قوة (Force Vector)</option>
            <option value="phys_wave">〰️ موجة جيبية (Waveform)</option>
          </optgroup>
        </select>

        <button type="button" id="btn-wb2-ruler" class="wb-tool-btn ${WBState.showRuler ? "active" : ""}"><i class="fa-solid fa-ruler"></i> مسطرة</button>
        <button type="button" id="btn-wb2-protractor" class="wb-tool-btn ${WBState.showProtractor ? "active" : ""}"><i class="fa-solid fa-compass-drafting"></i> منقلة</button>

        <select id="wb2-connector-select" class="select-sm" style="min-width:92px; padding:3px 5px;">
          <option value="curved" ${WBState.connectorType === "curved" ? "selected" : ""}>↪️ منحني</option>
          <option value="elbow" ${WBState.connectorType === "elbow" ? "selected" : ""}> orthogonal قائم</option>
          <option value="straight" ${WBState.connectorType === "straight" ? "selected" : ""}>╱ مستقيم</option>
          <option value="dashed" ${WBState.connectorType === "dashed" ? "selected" : ""}>┅ متقطع</option>
        </select>

        <select id="wb2-autolayout-select" class="select-sm" style="min-width:108px; padding:3px 5px;">
          <option value="">✨ ترتيب تلقائي...</option>
          <option value="tree">🌳 شجري رأسي</option>
          <option value="horizontal">➡️ تسلسلي أفقي</option>
          <option value="radial">☀️ دائري ذهني</option>
        </select>

        <select id="wb2-template-select" class="select-sm" style="min-width:108px; padding:3px 5px;">
          <option value="">📋 قوالب جاهزة...</option>
          <option value="elec_rectifier">⚡ دائرة توحيد</option>
          <option value="logic_adder">🔌 Full-Adder</option>
          <option value="cyber_soc">🛡️ معمارية SOC</option>
          <option value="swe_arch">💻 نظام Full-Stack</option>
        </select>
      </div>

      <div class="wb3-pill-group">
        <button type="button" id="btn-wb-add-root" class="btn btn-xs btn-outline">+ عقدة</button>
        <button type="button" id="btn-wb-spawn-branches" class="btn btn-xs btn-gold">+ فرّع من المحدد</button>
        <button type="button" id="btn-wb-toggle-shape" class="btn btn-xs btn-outline">الشكل</button>
        <button type="button" id="btn-wb-edit-node" class="btn btn-xs btn-outline">تعديل</button>
        <button type="button" id="btn-wb2-duplicate" class="btn btn-xs btn-outline" title="تكرار (Ctrl+D)"><i class="fa-regular fa-clone"></i></button>
        <button type="button" id="btn-wb2-rotate" class="btn btn-xs btn-outline" title="تدوير 45°"><i class="fa-solid fa-rotate-right"></i></button>
        <button type="button" id="btn-wb2-lock" class="btn btn-xs btn-outline" title="قفل/فك"><i class="fa-solid fa-lock"></i></button>
        <button type="button" id="btn-wb-scale-up" class="btn btn-xs btn-outline"><i class="fa-solid fa-plus"></i></button>
        <button type="button" id="btn-wb-scale-down" class="btn btn-xs btn-outline"><i class="fa-solid fa-minus"></i></button>
        <label class="btn btn-xs btn-outline" style="cursor:pointer; margin:0;" title="إدراج صورة إضافية">
          <i class="fa-regular fa-image gold-text"></i>
          <input type="file" id="wb-img-upload-inp" accept="image/*" class="hidden" />
        </label>
        <button type="button" id="btn-wb-del-node" class="btn btn-xs btn-outline text-danger"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="wb3-pill-group">
        <button type="button" id="btn-wb2-ai-drawer" class="btn btn-xs btn-gold"><i class="fa-solid fa-robot"></i> AI</button>
        <button type="button" id="btn-wb2-layers-drawer" class="btn btn-xs btn-outline"><i class="fa-solid fa-layer-group gold-text"></i> الطبقات</button>
        <button type="button" id="btn-wb-live-sync-room" class="btn btn-xs btn-outline"><i class="fa-solid fa-satellite-dish gold-text"></i> بث</button>
        <button type="button" id="btn-wb3-teleprompter" class="btn btn-xs btn-outline" title="الملقن الذكي"><i class="fa-solid fa-scroll gold-text"></i></button>
        <button type="button" id="btn-wb-undo" class="btn btn-xs btn-outline" title="تراجع Ctrl+Z"><i class="fa-solid fa-rotate-left"></i></button>
        <button type="button" id="btn-wb2-redo" class="btn btn-xs btn-outline" title="إعادة Ctrl+Y"><i class="fa-solid fa-rotate-right"></i></button>
        <button type="button" id="btn-wb2-save-version" class="btn btn-xs btn-outline" title="حفظ إصدار"><i class="fa-solid fa-clock-rotate-left gold-text"></i></button>
        <select id="wb2-export-select" class="select-sm" style="min-width:100px; padding:3px 5px; border-color:#19B889;">
          <option value="">📥 تصدير...</option>
          <option value="png">📸 صورة PNG</option>
          <option value="png_trans">✨ PNG شفاف</option>
          <option value="svg">📐 متجهي SVG</option>
          <option value="pdf">📄 ملف PDF</option>
          <option value="json">💾 حفظ JSON</option>
          <option value="import_json">📂 فتح JSON</option>
        </select>
        <input type="file" id="wb2-import-json-inp" accept=".json" class="hidden" />
        <button type="button" id="btn-wb-rec-mp4" class="btn btn-xs btn-outline" style="border-color:#19B889;">
          <i class="fa-solid fa-video gold-text"></i> <span id="wb-rec-btn-lbl">MP4 🔒</span>
        </button>
        <button type="button" id="btn-wb-clear" class="btn btn-xs btn-danger"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>

    <!-- مساحة العمل الرئيسية (تدعم تقسيم الشاشة 50/50 أو عرض الملف بالكامل داخل السبورة) -->
    <div class="wb2-workspace-wrap">
      <div class="wb3-split-container">
        <!-- النصف الخاص بعارض الملفات عند اختيار تقسيم 50/50 -->
        <div id="wb3-file-split-pane" class="wb3-file-split-pane ${WBState.docMode === "split" ? "" : "hidden"}" style="width:${WBState.splitRatio}%;">
          <div class="wb3-file-pane-header">
            <div class="filters-row" style="gap:5px;">
              <button type="button" id="btn-wb3-split-prev" class="btn-icon-xs" title="الصفحة السابقة"><i class="fa-solid fa-chevron-right"></i></button>
              <span id="wb3-split-page-lbl" class="badge badge-gold">ملف الشرح</span>
              <button type="button" id="btn-wb3-split-next" class="btn-icon-xs" title="الصفحة التالية"><i class="fa-solid fa-chevron-left"></i></button>
            </div>
            <div class="filters-row" style="gap:6px;">
              <small class="small-muted">عرض النافذة:</small>
              <input type="range" id="wb3-split-width-slider" min="20" max="75" value="${WBState.splitRatio}" style="width:65px;" title="تكبير/تصغير عرض قسم الملف مقارنة بالسبورة" />
              <small class="small-muted">زووم الملف:</small>
              <input type="range" id="wb3-split-zoom-slider" min="60" max="180" value="${WBState.splitZoom}" style="width:60px;" title="تكبير/تصغير محتوى الملف نفسه" />
              <button type="button" id="btn-wb3-send-page-to-board" class="btn btn-xs btn-gold" title="افرد هذه الصفحة داخل السبورة للكتابة والتحديد عليها">
                <i class="fa-solid fa-file-pen"></i> اشرح وحدد على الملف في السبورة
              </button>
              <button type="button" id="btn-wb3-close-split" class="btn-icon-xs text-danger"><i class="fa-solid fa-xmark"></i></button>
            </div>
          </div>
          <div id="wb3-file-pane-body" class="wb3-file-pane-body">
            <p class="small-muted">اختر ملفاً لعرضه بجانب السبورة...</p>
          </div>
        </div>

        <!-- النصف الخاص بالسبورة التفاعلية -->
        <div class="wb3-canvas-holder">
          <!-- شريط التنقل بين صفحات الملف عندما يكون مفروداً داخل السبورة -->
          <div id="wb3-canvas-doc-bar" class="wb3-canvas-doc-bar ${WBState.docMode === "canvas" ? "" : "hidden"}">
            <strong class="gold-text"><i class="fa-solid fa-file-signature"></i> شرح مباشر على الملف:</strong>
            <button type="button" id="btn-wb3-canv-prev" class="btn-icon-xs"><i class="fa-solid fa-chevron-right"></i></button>
            <span id="wb3-canvas-page-lbl" class="badge badge-emerald">صفحة 1</span>
            <button type="button" id="btn-wb3-canv-next" class="btn-icon-xs"><i class="fa-solid fa-chevron-left"></i></button>
            <button type="button" id="btn-wb3-switch-to-split" class="btn btn-xs btn-outline" style="padding:2px 8px;">⚖️ حوّل لتقسيم 50/50 بجانب السبورة</button>
            <button type="button" id="btn-wb3-close-canv-doc" class="btn-icon-xs text-danger" title="إغلاق الملف"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <canvas id="smart-whiteboard-canvas" class="whiteboard-canvas-box"></canvas>

          <!-- شريط الزووم والشرائح السفلي -->
          <div class="wb2-floating-hud">
            <button type="button" id="btn-wb2-zoom-out" class="btn-icon-xs"><i class="fa-solid fa-minus"></i></button>
            <strong id="wb2-zoom-lbl" class="gold-text" style="min-width:40px; text-align:center;">${Math.round(WBState.zoom * 100)}%</strong>
            <button type="button" id="btn-wb2-zoom-in" class="btn-icon-xs"><i class="fa-solid fa-plus"></i></button>
            <button type="button" id="btn-wb2-zoom-fit" class="btn-icon-xs" title="توسيط اللوحة"><i class="fa-solid fa-compress"></i></button>
            <label style="display:inline-flex; align-items:center; gap:3px; margin:0 4px; cursor:pointer;">
              <input type="checkbox" id="wb2-snap-chk" ${WBState.snapToGrid ? "checked" : ""} style="width:13px; height:13px;" />
              <span>Snap</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:3px; cursor:pointer;">
              <input type="checkbox" id="wb2-autoshape-chk" ${WBState.smartShapeRecognition ? "checked" : ""} style="width:13px; height:13px;" />
              <span>Auto-Shape</span>
            </label>
            <button type="button" id="btn-wb2-add-slide" class="btn btn-xs btn-outline" style="padding:2px 8px;">+ شريحة (${WBState.slides.length})</button>
            ${WBState.slides.length ? `<button type="button" id="btn-wb2-next-slide" class="btn btn-xs btn-gold" style="padding:2px 8px;">التالية ➔</button>` : ""}
          </div>
        </div>
      </div>

      <!-- الدرج الجانبي (AI أو الطبقات) -->
      <div id="wb2-side-drawer" class="wb2-side-drawer ${WBState.activeSideDrawer ? "" : "hidden"}"></div>
    </div>

    <!-- شريط المحاضر العائم أسفل وضع المحاضرة (Floating Lecture Control Dock) -->
    <div id="wb3-lecture-floating-dock" class="wb3-lecture-floating-dock">
      <span class="badge badge-gold"><i class="fa-solid fa-person-chalkboard"></i> وضع المحاضرة</span>
      <button type="button" class="wb-tool-btn ${WBState.tool === "select" ? "active" : ""}" data-wb-lecture-tool="select"><i class="fa-solid fa-arrow-pointer"></i> تحريك</button>
      <button type="button" class="wb-tool-btn ${WBState.tool === "pen" ? "active" : ""}" data-wb-lecture-tool="pen"><i class="fa-solid fa-pen"></i> قلم شرح</button>
      <button type="button" class="wb-tool-btn ${WBState.tool === "highlight" ? "active" : ""}" data-wb-lecture-tool="highlight"><i class="fa-solid fa-highlighter"></i> قلم تحديد</button>
      <button type="button" class="wb-tool-btn ${WBState.tool === "laser" ? "active" : ""}" data-wb-lecture-tool="laser"><i class="fa-solid fa-wand-magic-sparkles"></i> ليزر</button>
      <button type="button" class="wb-tool-btn ${WBState.tool === "arrow" ? "active" : ""}" data-wb-lecture-tool="arrow"><i class="fa-solid fa-arrow-trend-up"></i> سهم</button>
      <button type="button" class="wb-tool-btn ${WBState.tool === "rect" ? "active" : ""}" data-wb-lecture-tool="rect"><i class="fa-regular fa-square"></i> مستطيل</button>
      <button type="button" class="wb-tool-btn ${WBState.tool === "circle" ? "active" : ""}" data-wb-lecture-tool="circle"><i class="fa-regular fa-circle"></i> دائرة</button>
      <button type="button" class="wb-tool-btn ${WBState.tool === "eraser" ? "active" : ""}" data-wb-lecture-tool="eraser"><i class="fa-solid fa-eraser"></i> ممحاة</button>
      <input type="color" id="wb3-lecture-color" value="${WBState.color}" style="width:28px; height:28px; padding:0; border-radius:50%; cursor:pointer;" title="لون القلم" />
      <button type="button" id="btn-wb3-lecture-light" class="wb-tool-btn ${WBState.lightingMode === "spotlight" ? "active" : ""}" title="التبديل بين سبورة مضيئة بالكامل أو كشاف مكان الماوس">
        <i class="fa-solid fa-lightbulb gold-text"></i>
        <span id="wb3-lecture-light-lbl">${WBState.lightingMode === "spotlight" ? "كشاف الماوس 🔦" : "إضاءة كاملة ☀️"}</span>
      </button>
      <button type="button" id="btn-wb3-lecture-open-file" class="wb-tool-btn"><i class="fa-solid fa-file-import gold-text"></i> فتح ملف</button>
      <button type="button" id="btn-wb3-lecture-undo" class="wb-tool-btn" title="تراجع"><i class="fa-solid fa-rotate-left"></i></button>
      <button type="button" id="btn-wb3-exit-lecture" class="btn btn-xs btn-danger" style="border-radius:99px; padding:5px 12px;">
        <i class="fa-solid fa-compress"></i> إظهار كل القوائم (ESC)
      </button>
    </div>
  `, async () => {});

  // تفعيل الشاشة الكاملة المنعزلة 100% فور فتح السبورة
  const modalCard = document.querySelector("#universal-modal .modal-card");
  modalCard?.classList.add("wide-lab-modal", "wb-studio-fullscreen", "wb3-isolated-fullscreen");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  const closeBtn = document.getElementById("btn-close-modal");
  const origClose = closeBtn?.onclick;
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      autoSaveWB2Board();
      WBState.presentationMode = false;
      document.body.classList.remove("wb-fullscreen-mode");
      modalCard?.classList.remove("wb-studio-fullscreen", "wb3-isolated-fullscreen", "wb-presentation-active");
      if (origClose) origClose(e);
    };
  }

  const canvas = document.getElementById("smart-whiteboard-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const redraw = () => renderWhiteboardScene(ctx, canvas.width, canvas.height);
  const resizeBoard = () => {
    canvas.width = canvas.clientWidth || 1050;
    canvas.height = canvas.clientHeight || 620;
    redraw();
  };
  setTimeout(resizeBoard, 45);
  window.addEventListener("resize", resizeBoard);

  // ربط أحداث الرسم والماوس على اللوحة
  bindWB3CanvasPointerEvents(ctx, canvas, redraw);

  // ربط جميع الأزرار والقوائم بشكل آمن ومستقل 100% بدون أي خطأ
  bindWB3AllEventsSafe(ctx, canvas, modalCard, redraw, resizeBoard);

  if (WBState.docMode !== "none" && WBState.activeFileType) {
    setTimeout(() => updateDocBarsUI(ctx, canvas), 80);
  }
  if (autoStartPrivateRecord) {
    setTimeout(() => document.getElementById("btn-wb-rec-mp4")?.click(), 350);
  }
};

function bindWB3AllEventsSafe(ctx, canvas, modalCard, redraw, resizeBoard) {
  // 1. اختيار أداة الرسم (من الشريط العلوي أو شريط المحاضرة العائم)
  const setActiveTool = (toolName) => {
    WBState.tool = toolName;
    document.querySelectorAll("[data-wb-tool]").forEach(b => b.classList.toggle("active", b.dataset.wbTool === toolName));
    document.querySelectorAll("[data-wb-lecture-tool]").forEach(b => b.classList.toggle("active", b.dataset.wbLectureTool === toolName));
    canvas.style.cursor = toolName === "pan" ? "grab" : toolName === "select" ? "default" : "crosshair";
  };

  document.querySelectorAll("[data-wb-tool]").forEach(btn => {
    btn.onclick = () => setActiveTool(btn.dataset.wbTool);
  });
  document.querySelectorAll("[data-wb-lecture-tool]").forEach(btn => {
    btn.onclick = () => setActiveTool(btn.dataset.wbLectureTool);
  });

  // 2. اللون والسمك ونوع الخط والخلفية
  document.getElementById("wb-color")?.addEventListener("input", (e) => {
    WBState.color = e.target.value;
    const lecCol = document.getElementById("wb3-lecture-color");
    if (lecCol) lecCol.value = e.target.value;
  });
  document.getElementById("wb3-lecture-color")?.addEventListener("input", (e) => {
    WBState.color = e.target.value;
    const topCol = document.getElementById("wb-color");
    if (topCol) topCol.value = e.target.value;
  });
  document.getElementById("wb-size")?.addEventListener("input", (e) => {
    WBState.size = Number(e.target.value) || 4;
  });
  document.getElementById("wb-linestyle-select")?.addEventListener("change", (e) => {
    WBState.lineStyle = e.target.value;
  });
  document.getElementById("wb-bg-select")?.addEventListener("change", (e) => {
    WBState.bgMode = e.target.value;
    autoSaveWB2Board();
    redraw();
  });

  // 3. التبديل الفوري بين (إضاءة كاملة ☀️) و (كشاف مكان الماوس فقط 🔦)
  const toggleBoardLighting = () => {
    WBState.lightingMode = WBState.lightingMode === "spotlight" ? "full" : "spotlight";
    WBState.spotlightMode = WBState.lightingMode === "spotlight";
    const isSpot = WBState.spotlightMode;

    document.getElementById("btn-wb3-lighting-toggle")?.classList.toggle("active", isSpot);
    document.getElementById("btn-wb3-lecture-light")?.classList.toggle("active", isSpot);

    const lbl1 = document.getElementById("wb3-light-lbl");
    const lbl2 = document.getElementById("wb3-lecture-light-lbl");
    if (lbl1) lbl1.textContent = isSpot ? "كشاف الماوس 🔦" : "إضاءة كاملة ☀️";
    if (lbl2) lbl2.textContent = isSpot ? "كشاف الماوس 🔦" : "إضاءة كاملة ☀️";

    redraw();
    toast(isSpot ? "🔦 تم تفعيل كشاف الماوس (يضيء مكان وقوفك فقط)" : "☀️ تم تفعيل الإضاءة الكاملة الموحدة للسبورة");
  };

  document.getElementById("btn-wb3-lighting-toggle")?.addEventListener("click", toggleBoardLighting);
  document.getElementById("btn-wb3-lecture-light")?.addEventListener("click", toggleBoardLighting);

  // 4. وضع المحاضرة الشامل (يحترم اختيارك للإضاءة ولا يفرض الكشاف المظلم!)
  const setLectureMode = (active) => {
    WBState.presentationMode = active;
    WBState.spotlightMode = WBState.lightingMode === "spotlight";
    modalCard?.classList.toggle("wb-presentation-active", active);
    setTimeout(resizeBoard, 60);
    if (active) {
      toast("🎤 وضع المحاضرة نشط! استخدم الشريط السفلي للشرح أو اضغط ESC لإظهار القوائم");
    }
  };

  document.getElementById("btn-wb2-present-mode")?.addEventListener("click", () => setLectureMode(true));
  document.getElementById("btn-wb3-exit-lecture")?.addEventListener("click", () => setLectureMode(false));

  // 5. فتح الملفات (PDF / صورة / كود) والتحكم الكامل في (مفرود داخل السبورة) أو (تقسيم 50/50)
  const docInp = document.getElementById("wb3-open-doc-inp");
  document.getElementById("btn-wb3-trigger-file")?.addEventListener("click", () => docInp?.click());
  document.getElementById("btn-wb3-lecture-open-file")?.addEventListener("click", () => docInp?.click());

  if (docInp) {
    docInp.onchange = (e) => {
      const f = e.target.files?.[0];
      if (f) handleWB3FileUpload(f, ctx, canvas);
      docInp.value = "";
    };
  }

  document.getElementById("wb3-doc-mode-select")?.addEventListener("change", async (e) => {
    const val = e.target.value;
    if (val === "close" || val === "none") {
      WBState.docMode = "none";
      if (WBState.canvasDocImageId) {
        WBState.images = WBState.images.filter(im => im.id !== WBState.canvasDocImageId);
        WBState.canvasDocImageId = null;
      }
      await updateDocBarsUI(ctx, canvas);
      e.target.value = "none";
      return;
    }
    if (!WBState.activeFileType) {
      docInp?.click();
      return;
    }
    if (val === "split") {
      WBState.docMode = "split";
      await updateDocBarsUI(ctx, canvas);
    } else if (val === "canvas") {
      WBState.docMode = "canvas";
      await placeActiveFileOnWhiteboardCanvas(ctx, canvas);
    }
  });

  document.getElementById("wb3-split-width-slider")?.addEventListener("input", (e) => {
    WBState.splitRatio = Number(e.target.value);
    const pane = document.getElementById("wb3-file-split-pane");
    if (pane) pane.style.width = `${WBState.splitRatio}%`;
    setTimeout(resizeBoard, 25);
  });

  document.getElementById("wb3-split-zoom-slider")?.addEventListener("input", async (e) => {
    WBState.splitZoom = Number(e.target.value);
    await updateDocBarsUI(ctx, canvas);
  });

  const stepPdfPage = async (delta) => {
    if (WBState.activeFileType !== "pdf" || !WBState.pdfDoc) return;
    const nextP = Math.max(1, Math.min(WBState.pdfTotalPages, WBState.pdfPageNum + delta));
    if (nextP === WBState.pdfPageNum) return;
    WBState.pdfPageNum = nextP;
    if (WBState.docMode === "canvas") {
      await placeActiveFileOnWhiteboardCanvas(ctx, canvas);
    } else {
      await updateDocBarsUI(ctx, canvas);
    }
  };

  document.getElementById("btn-wb3-split-prev")?.addEventListener("click", () => stepPdfPage(-1));
  document.getElementById("btn-wb3-split-next")?.addEventListener("click", () => stepPdfPage(1));
  document.getElementById("btn-wb3-canv-prev")?.addEventListener("click", () => stepPdfPage(-1));
  document.getElementById("btn-wb3-canv-next")?.addEventListener("click", () => stepPdfPage(1));

  document.getElementById("btn-wb3-send-page-to-board")?.addEventListener("click", async () => {
    WBState.docMode = "canvas";
    await placeActiveFileOnWhiteboardCanvas(ctx, canvas);
    toast("✍️ تم فرد الصفحة داخل السبورة! يمكنك الآن التحديد والرسم والكتابة عليها مباشرة");
  });

  document.getElementById("btn-wb3-switch-to-split")?.addEventListener("click", async () => {
    WBState.docMode = "split";
    await updateDocBarsUI(ctx, canvas);
  });

  document.getElementById("btn-wb3-close-split")?.addEventListener("click", async () => {
    WBState.docMode = "none";
    await updateDocBarsUI(ctx, canvas);
  });

  document.getElementById("btn-wb3-close-canv-doc")?.addEventListener("click", async () => {
    WBState.docMode = "none";
    if (WBState.canvasDocImageId) {
      WBState.images = WBState.images.filter(im => im.id !== WBState.canvasDocImageId);
      WBState.canvasDocImageId = null;
    }
    await updateDocBarsUI(ctx, canvas);
  });

  // 6. الأدوات الهندسية، القوالب، الترتيب التلقائي، والتفريع الشجري
  document.getElementById("wb2-connector-select")?.addEventListener("change", (e) => {
    WBState.connectorType = e.target.value;
    autoSaveWB2Board();
    redraw();
  });

  document.getElementById("wb2-autolayout-select")?.addEventListener("change", (e) => {
    if (!e.target.value) return;
    applyWB2AutoLayout(e.target.value, canvas.width, canvas.height);
    e.target.value = "";
    redraw();
  });

  document.getElementById("wb2-template-select")?.addEventListener("change", (e) => {
    const key = e.target.value;
    if (!key || !WB2Templates[key]) return;
    pushWB2Undo();
    const tpl = WB2Templates[key];
    WBState.bgMode = tpl.bgMode || "grid";
    WBState.nodes = JSON.parse(JSON.stringify(tpl.nodes));
    WBState.selectedNodeId = WBState.nodes[0]?.id || null;
    e.target.value = "";
    redraw();
    toast(`📋 تم تحميل قالب: ${tpl.name}`);
  });

  document.getElementById("wb2-eng-symbol-picker")?.addEventListener("change", (e) => {
    const sym = e.target.value;
    if (!sym) return;
    e.target.value = "";
    pushWB2Undo();

    const cx = (canvas.width / 2 - WBState.panX) / WBState.zoom;
    const cy = (canvas.height / 2 - WBState.panY) / WBState.zoom;
    const col = document.getElementById("wb-color")?.value || "#D4A72C";

    if (sym === "math_plot") {
      const fnStr = prompt("📈 اكتب الدالة الرياضية بدلالة x (مثال: Math.sin(x) أو x*x/4):", "Math.sin(x)");
      if (!fnStr) return;
      WBState.nodes.push({ id: "nd_" + Date.now(), text: `f(x) = ${fnStr}`, val: fnStr, shape: "math_plot", x: cx, y: cy, w: 220, h: 150, color: col, parentId: null });
      redraw();
      return;
    }

    if (sym === "truth_table") {
      const gateType = prompt("📋 اكتب نوع البوابة لجدول الحقيقة (AND / OR / XOR / NAND):", "XOR") || "XOR";
      WBState.nodes.push({ id: "nd_" + Date.now(), text: `Truth Table (${gateType.toUpperCase()})`, val: gateType.toUpperCase(), shape: "truth_table", x: cx, y: cy, w: 190, h: 135, color: col, parentId: null });
      redraw();
      return;
    }

    const defaultLabels = {
      elec_res: ["Resistor R", "10kΩ"], elec_cap: ["Capacitor C", "100μF"], elec_ind: ["Inductor L", "10mH"],
      elec_diode: ["Diode D", "1N4007"], elec_led: ["LED", "Red 2V"], elec_trans: ["MOSFET / BJT", "IRFZ44N"],
      elec_dc: ["DC Source", "12V DC"], elec_ac: ["AC Source", "220V 50Hz"], elec_gnd: ["GND", "0V"],
      gate_and: ["AND Gate", "Y = A · B"], gate_or: ["OR Gate", "Y = A + B"], gate_not: ["NOT Gate", "Y = A'"],
      gate_nand: ["NAND Gate", "Y = (A·B)'"], gate_xor: ["XOR Gate", "Y = A ⊕ B"],
      sticky: ["ملاحظة سريعة 📌", "اكتب التفاصيل"], code_block: ["Code Snippet 💻", "return true;"],
      cube: ["3D Cube", "Layer 1"], cylinder: ["Database DB", "PostgreSQL"],
      math_eq: ["∫ f(x) dx = F(b) - F(a)", "Formula"], phys_vec: ["Force F = 50N", "θ = 30°"], phys_wave: ["Sine Wave", "50Hz"]
    };

    const [defTitle, defVal] = defaultLabels[sym] || ["Element", ""];
    const title = prompt("اسم العنصر أو المعادلة:", defTitle) || defTitle;
    const val = prompt("القيمة أو التفاصيل الفرعية:", defVal) ?? defVal;

    WBState.nodes.push({
      id: "nd_" + Date.now(), text: title, val, shape: sym,
      x: cx + (Math.random() - 0.5) * 40, y: cy + (Math.random() - 0.5) * 40,
      w: sym === "sticky" ? 175 : sym === "code_block" ? 230 : Math.max(125, title.length * 8.5 + 40),
      h: sym === "sticky" ? 115 : sym === "code_block" ? 85 : 58,
      color: sym === "sticky" ? "#FBBF24" : col, parentId: WBState.selectedNodeId || null
    });
    redraw();
  });

  document.getElementById("btn-wb2-ruler")?.addEventListener("click", (e) => {
    WBState.showRuler = !WBState.showRuler;
    e.currentTarget.classList.toggle("active", WBState.showRuler);
    redraw();
  });
  document.getElementById("btn-wb2-protractor")?.addEventListener("click", (e) => {
    WBState.showProtractor = !WBState.showProtractor;
    e.currentTarget.classList.toggle("active", WBState.showProtractor);
    redraw();
  });

  // 7. أزرار العقد، التفريع، الزووم، التراجع، والتصدير
  document.getElementById("btn-wb-add-root")?.addEventListener("click", () => {
    const title = prompt("🌟 اكتب النص داخل الشكل الجديد:", "عنصر رئيسي جديد");
    if (!title || !title.trim()) return;
    pushWB2Undo();
    const id = "nd_" + Date.now();
    const c = document.getElementById("wb-color")?.value || "#D4A72C";
    WBState.nodes.push({
      id, text: title.trim(), shape: "rect",
      x: (canvas.width / 2 - WBState.panX) / WBState.zoom,
      y: (120 - WBState.panY) / WBState.zoom,
      w: Math.max(140, title.trim().length * 9 + 42), h: 48, color: c, parentId: null
    });
    WBState.selectedNodeId = id;
    redraw();
  });

  document.getElementById("btn-wb-spawn-branches")?.addEventListener("click", () => {
    const parent = WBState.nodes.find(n => n.id === WBState.selectedNodeId) || WBState.nodes[0];
    if (!parent) return;
    const raw = prompt(`🌿 تفريع من (${parent.text}):\nاكتب أسماء الفروع مفصولة بفاصلة ( , ):`, "فرع 1, فرع 2, فرع 3");
    if (!raw || !raw.trim()) return;
    const parts = raw.split(/[،,]/).map(s => s.trim()).filter(Boolean);
    pushWB2Undo();
    const c = document.getElementById("wb-color")?.value || "#19B889";
    const spreadW = parts.length * 190;
    const startX = parent.x - spreadW / 2 + 95;
    parts.forEach((txt, idx) => {
      WBState.nodes.push({
        id: "nd_" + Date.now() + "_" + idx, text: txt, shape: "round_rect",
        x: parts.length === 1 ? parent.x : startX + idx * 190,
        y: parent.y + 125, w: Math.max(130, txt.length * 9 + 36), h: 44, color: c, parentId: parent.id
      });
    });
    redraw();
  });

  document.getElementById("btn-wb-toggle-shape")?.addEventListener("click", () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (!nd) return;
    const shapes = ["rect", "round_rect", "circle", "diamond", "hexagon", "cylinder", "cube", "sticky"];
    nd.shape = shapes[(shapes.indexOf(nd.shape || "rect") + 1) % shapes.length];
    redraw();
  });

  document.getElementById("btn-wb-edit-node")?.addEventListener("click", () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (!nd) return;
    const txt = prompt("✏️ تعديل النص:", nd.text);
    if (txt !== null && txt.trim()) { nd.text = txt.trim(); nd.w = Math.max(130, nd.text.length * 9 + 36); }
    const val = prompt("📐 تعديل القيمة الفرعية / الملاحظة:", nd.val || "");
    if (val !== null) nd.val = val.trim();
    redraw();
  });

  document.getElementById("btn-wb2-duplicate")?.addEventListener("click", () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (!nd) return;
    pushWB2Undo();
    const copyId = "nd_" + Date.now();
    WBState.nodes.push({ ...nd, id: copyId, x: nd.x + 36, y: nd.y + 36 });
    WBState.selectedNodeId = copyId;
    redraw();
  });

  document.getElementById("btn-wb2-rotate")?.addEventListener("click", () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (nd) { nd.rotation = ((nd.rotation || 0) + 45) % 360; redraw(); }
  });

  document.getElementById("btn-wb2-lock")?.addEventListener("click", () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (nd) { nd.locked = !nd.locked; redraw(); }
  });

  const scaleCurrentSelected = (factor) => {
    if (WBState.selectedImgId) {
      const im = WBState.images.find(i => i.id === WBState.selectedImgId);
      if (im) { im.w = Math.max(50, Math.round(im.w * factor)); im.h = Math.max(50, Math.round(im.h * factor)); }
    } else if (WBState.selectedNodeId) {
      const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
      if (nd) { nd.w = Math.max(80, Math.round(nd.w * factor)); nd.h = Math.max(36, Math.round(nd.h * factor)); }
    }
    redraw();
  };
  document.getElementById("btn-wb-scale-up")?.addEventListener("click", () => scaleCurrentSelected(1.16));
  document.getElementById("btn-wb-scale-down")?.addEventListener("click", () => scaleCurrentSelected(0.86));

  document.getElementById("wb-img-upload-inp")?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const imgEl = new Image();
      imgEl.onload = () => {
        const scale = Math.min(1, 380 / imgEl.width);
        const id = "im_" + Date.now();
        WBState.images.push({ id, imgEl, x: 80, y: 90, w: Math.round(imgEl.width * scale), h: Math.round(imgEl.height * scale) });
        WBState.selectedImgId = id;
        redraw();
      };
      imgEl.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("btn-wb-del-node")?.addEventListener("click", () => {
    pushWB2Undo();
    if (WBState.selectedImgId) { WBState.images = WBState.images.filter(i => i.id !== WBState.selectedImgId); WBState.selectedImgId = null; }
    else if (WBState.selectedStrokeIdx !== null) { WBState.strokes.splice(WBState.selectedStrokeIdx, 1); WBState.selectedStrokeIdx = null; }
    else if (WBState.selectedNodeId) {
      const id = WBState.selectedNodeId;
      WBState.nodes = WBState.nodes.filter(n => n.id !== id && n.parentId !== id);
      WBState.selectedNodeId = WBState.nodes[0]?.id || null;
    }
    redraw();
  });

  const doUndo = () => {
    const last = WBState.undoStack.pop();
    if (last) {
      WBState.redoStack.push(JSON.stringify({ nodes: WBState.nodes, strokes: WBState.strokes }));
      const parsed = JSON.parse(last);
      WBState.nodes = parsed.nodes || [];
      WBState.strokes = parsed.strokes || [];
      redraw();
    }
  };
  document.getElementById("btn-wb-undo")?.addEventListener("click", doUndo);
  document.getElementById("btn-wb3-lecture-undo")?.addEventListener("click", doUndo);

  document.getElementById("btn-wb2-redo")?.addEventListener("click", () => {
    const next = WBState.redoStack.pop();
    if (next) {
      WBState.undoStack.push(JSON.stringify({ nodes: WBState.nodes, strokes: WBState.strokes }));
      const parsed = JSON.parse(next);
      WBState.nodes = parsed.nodes || [];
      WBState.strokes = parsed.strokes || [];
      redraw();
    }
  });

  document.getElementById("btn-wb2-save-version")?.addEventListener("click", () => {
    const vName = prompt("💾 اسم الإصدار:", `إصدار ${WBState.versions.length + 1}`);
    if (!vName) return;
    WBState.versions.unshift({ name: vName, nodes: JSON.parse(JSON.stringify(WBState.nodes)), strokes: JSON.parse(JSON.stringify(WBState.strokes)) });
    OSProStore.set("wb2_versions", WBState.versions.slice(0, 15));
    toast(`تم حفظ "${vName}" في سجل الإصدارات! 🕰️`);
  });

  document.getElementById("btn-wb2-ai-drawer")?.addEventListener("click", () => {
    WBState.activeSideDrawer = WBState.activeSideDrawer === "ai" ? null : "ai";
    renderWB2SideDrawer(ctx, canvas);
  });
  document.getElementById("btn-wb2-layers-drawer")?.addEventListener("click", () => {
    WBState.activeSideDrawer = WBState.activeSideDrawer === "layers" ? null : "layers";
    renderWB2SideDrawer(ctx, canvas);
  });

  document.getElementById("btn-wb-live-sync-room")?.addEventListener("click", () => {
    if (!V6ExpansionState.activeRoomCode) openCoStudyRoomModal();
    else broadcastWhiteboardToRoom();
  });
  document.getElementById("btn-wb3-teleprompter")?.addEventListener("click", toggleFloatingTeleprompter);

  document.getElementById("btn-wb2-zoom-in")?.addEventListener("click", () => {
    WBState.zoom = Math.min(3.5, WBState.zoom + 0.15);
    const z = document.getElementById("wb2-zoom-lbl");
    if (z) z.textContent = `${Math.round(WBState.zoom * 100)}%`;
    redraw();
  });
  document.getElementById("btn-wb2-zoom-out")?.addEventListener("click", () => {
    WBState.zoom = Math.max(0.25, WBState.zoom - 0.15);
    const z = document.getElementById("wb2-zoom-lbl");
    if (z) z.textContent = `${Math.round(WBState.zoom * 100)}%`;
    redraw();
  });
  document.getElementById("btn-wb2-zoom-fit")?.addEventListener("click", () => {
    WBState.zoom = 1; WBState.panX = 0; WBState.panY = 0;
    const z = document.getElementById("wb2-zoom-lbl");
    if (z) z.textContent = "100%";
    redraw();
  });
  document.getElementById("wb2-snap-chk")?.addEventListener("change", (e) => { WBState.snapToGrid = e.target.checked; });
  document.getElementById("wb2-autoshape-chk")?.addEventListener("change", (e) => { WBState.smartShapeRecognition = e.target.checked; });

  document.getElementById("btn-wb2-add-slide")?.addEventListener("click", () => {
    const title = prompt("🎬 اسم الشريحة:", `الشريحة ${WBState.slides.length + 1}`);
    if (!title) return;
    WBState.slides.push({ title, panX: WBState.panX, panY: WBState.panY, zoom: WBState.zoom });
    OSProStore.set("wb2_slides", WBState.slides);
    toast(`تم حفظ "${title}"! 🎬`);
  });

  document.getElementById("btn-wb2-next-slide")?.addEventListener("click", () => {
    if (!WBState.slides.length) return;
    WBState.activeSlideIdx = (WBState.activeSlideIdx + 1) % WBState.slides.length;
    const sl = WBState.slides[WBState.activeSlideIdx];
    WBState.panX = sl.panX; WBState.panY = sl.panY; WBState.zoom = sl.zoom;
    redraw();
    toast(`🎬 الشريحة: ${sl.title}`);
  });

  // التصدير والاستيراد
  const jsonFileInp = document.getElementById("wb2-import-json-inp");
  document.getElementById("wb2-export-select")?.addEventListener("change", async (e) => {
    const mode = e.target.value;
    if (!mode) return;
    e.target.value = "";
    if (mode === "png") {
      const a = document.createElement("a"); a.download = `Board-${today()}.png`; a.href = canvas.toDataURL("image/png"); a.click();
    } else if (mode === "png_trans") {
      const prev = WBState.bgMode; WBState.bgMode = "transparent"; redraw();
      const a = document.createElement("a"); a.download = `Board-Transparent-${today()}.png`; a.href = canvas.toDataURL("image/png"); a.click();
      WBState.bgMode = prev; redraw();
    } else if (mode === "svg") {
      let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}" style="background:#080D1A; font-family:sans-serif;">`;
      WBState.nodes.forEach(n => {
        svg += `<rect x="${n.x - n.w/2}" y="${n.y - n.h/2}" width="${n.w}" height="${n.h}" rx="10" fill="#11192E" stroke="${n.color || "#D4A72C"}" stroke-width="2"/>`;
        svg += `<text x="${n.x}" y="${n.y + 5}" fill="#FFFFFF" font-size="13" font-weight="bold" text-anchor="middle">${esc(n.text)}</text>`;
      });
      svg += `</svg>`;
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })); a.download = `Diagram-${today()}.svg`; a.click();
    } else if (mode === "pdf") {
      selectedPdfImages = [canvas.toDataURL("image/jpeg", 0.92)];
      openImageToPdfConverterModal();
    } else if (mode === "json") {
      const blob = new Blob([JSON.stringify({ nodes: WBState.nodes, strokes: WBState.strokes, bgMode: WBState.bgMode }, null, 2)], { type: "application/json" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `Project-${today()}.json`; a.click();
    } else if (mode === "import_json") {
      jsonFileInp?.click();
    }
  });

  if (jsonFileInp) {
    jsonFileInp.onchange = async (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      try {
        const parsed = JSON.parse(await f.text());
        if (parsed.nodes) { WBState.nodes = parsed.nodes; WBState.strokes = parsed.strokes || []; redraw(); toast("تم استيراد المشروع بنجاح! 📂"); }
      } catch (err) { toast("ملف غير صالح", "error"); }
    };
  }

  document.getElementById("btn-wb-clear")?.addEventListener("click", () => {
    if (!confirm("هل تريد مسح السبورة بالكامل؟")) return;
    pushWB2Undo();
    WBState.nodes = []; WBState.strokes = []; WBState.images = [];
    redraw();
  });

  // تسجيل الفيديو الخاص MP4
  document.getElementById("btn-wb-rec-mp4")?.addEventListener("click", async () => {
    const recLbl = document.getElementById("wb-rec-btn-lbl");
    const recBtn = document.getElementById("btn-wb-rec-mp4");
    if (WBState.isRecordingCanvas && WBState.canvasRecorder) {
      WBState.canvasRecorder.stop();
      WBState.micStream?.getTracks().forEach(t => t.stop());
      WBState.isRecordingCanvas = false;
      if (recLbl) recLbl.textContent = "MP4 🔒";
      recBtn?.classList.remove("btn-danger");
      return;
    }
    try {
      const canvasStream = canvas.captureStream(30);
      try {
        WBState.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        WBState.micStream.getAudioTracks().forEach(track => canvasStream.addTrack(track));
      } catch (e) {}
      const mime = getBestMP4MimeType();
      WBState.canvasRecorder = mime ? new MediaRecorder(canvasStream, { mimeType: mime }) : new MediaRecorder(canvasStream);
      WBState.canvasRecChunks = [];
      WBState.canvasRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) WBState.canvasRecChunks.push(e.data); };
      WBState.canvasRecorder.onstop = () => {
        const blob = new Blob(WBState.canvasRecChunks, { type: "video/mp4" });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `Whiteboard-Lecture-${today()}.mp4`; a.click();
        toast("تم حفظ فيديو الشرح بصيغة .MP4 بخصوصية تامة! 🎥✅");
      };
      WBState.canvasRecorder.start(200);
      WBState.isRecordingCanvas = true;
      if (recLbl) recLbl.textContent = "إيقاف 🔴";
      recBtn?.classList.add("btn-danger");
      toast("🔒 بدأ تسجيل السبورة وصوتك مباشرة بصيغة MP4!");
    } catch (e) { toast("تعذر بدء التسجيل", "error"); }
  });
}

function bindWB3CanvasPointerEvents(ctx, canvas, redraw) {
  const screenToWorld = (sx, sy) => ({
    x: (sx - WBState.panX) / WBState.zoom,
    y: (sy - WBState.panY) / WBState.zoom
  });
  const snapVal = (v) => WBState.snapToGrid ? Math.round(v / WBState.gridSize) * WBState.gridSize : v;

  let isDraggingNode = null, isDraggingImg = null, isResizingImg = null, isDraggingStroke = null;
  let isDraggingRuler = false, isDraggingProtractor = false, isPanningBoard = false;
  let panStartX = 0, panStartY = 0, dragOffsetX = 0, dragOffsetY = 0;
  let isDrawingStroke = false, currentStroke = null;

  const getRawPos = (e) => {
    const r = canvas.getBoundingClientRect();
    const cx = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
    const cy = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);
    const sx = cx - r.left, sy = cy - r.top;
    const w = screenToWorld(sx, sy);
    return { sx, sy, x: w.x, y: w.y };
  };

  const findNodeAt = (x, y) => {
    for (let i = WBState.nodes.length - 1; i >= 0; i--) {
      const nd = WBState.nodes[i];
      if (!nd.hidden && x >= nd.x - nd.w / 2 && x <= nd.x + nd.w / 2 && y >= nd.y - nd.h / 2 && y <= nd.y + nd.h / 2) return nd;
    }
    return null;
  };

  const findImgAt = (x, y) => {
    for (let i = WBState.images.length - 1; i >= 0; i--) {
      const im = WBState.images[i];
      if (x >= im.x + im.w - 22 && x <= im.x + im.w + 12 && y >= im.y + im.h - 22 && y <= im.y + im.h + 12) return { img: im, resize: true };
      if (x >= im.x && x <= im.x + im.w && y >= im.y && y <= im.y + im.h) return { img: im, resize: false };
    }
    return null;
  };

  const findStrokeAt = (x, y) => {
    for (let i = WBState.strokes.length - 1; i >= 0; i--) {
      const s = WBState.strokes[i];
      if (s.hidden) continue;
      if (s.type === "text") {
        const w = Math.max(60, (s.text || "").length * (s.size * 2.6)), h = Math.max(28, s.size * 5);
        if (x >= s.x - 10 && x <= s.x + w + 10 && y >= s.y - h && y <= s.y + 12) return { stroke: s, idx: i };
      } else if (["rect", "dimension", "line", "arrow"].includes(s.type)) {
        const minX = Math.min(s.x1, s.x2) - 10, maxX = Math.max(s.x1, s.x2) + 10;
        const minY = Math.min(s.y1, s.y2) - 10, maxY = Math.max(s.y1, s.y2) + 10;
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) return { stroke: s, idx: i };
      } else if (s.type === "circle") {
        const r = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
        if (Math.hypot(x - s.x1, y - s.y1) <= r + 10) return { stroke: s, idx: i };
      } else if (s.points?.some(pt => Math.hypot(pt.x - x, pt.y - y) <= 14)) {
        return { stroke: s, idx: i };
      }
    }
    return null;
  };

  canvas.onmousedown = (e) => {
    const { sx, sy, x, y } = getRawPos(e);
    WBState.color = document.getElementById("wb-color")?.value || "#D4A72C";
    WBState.size = Number(document.getElementById("wb-size")?.value || 4);

    if (WBState.showRuler && x >= WBState.rulerPos.x && x <= WBState.rulerPos.x + WBState.rulerPos.w && y >= WBState.rulerPos.y && y <= WBState.rulerPos.y + 45) {
      isDraggingRuler = true; dragOffsetX = x - WBState.rulerPos.x; dragOffsetY = y - WBState.rulerPos.y; return;
    }
    if (WBState.showProtractor && Math.hypot(x - WBState.protractorPos.x, y - WBState.protractorPos.y) <= WBState.protractorPos.r && y <= WBState.protractorPos.y + 10) {
      isDraggingProtractor = true; dragOffsetX = x - WBState.protractorPos.x; dragOffsetY = y - WBState.protractorPos.y; return;
    }
    if (WBState.tool === "pan" || WBState.spacePressed || e.button === 1) {
      isPanningBoard = true; panStartX = sx - WBState.panX; panStartY = sy - WBState.panY; return;
    }
    if (WBState.tool === "obj_eraser") {
      const hitN = findNodeAt(x, y);
      if (hitN && !hitN.locked) { pushWB2Undo(); WBState.nodes = WBState.nodes.filter(n => n.id !== hitN.id); redraw(); return; }
      const hitS = findStrokeAt(x, y);
      if (hitS) { pushWB2Undo(); WBState.strokes.splice(hitS.idx, 1); redraw(); }
      return;
    }
    if (WBState.tool === "select" || e.shiftKey) {
      const hitNode = findNodeAt(x, y);
      if (hitNode) {
        WBState.selectedNodeId = hitNode.id; WBState.selectedImgId = null; WBState.selectedStrokeIdx = null;
        if (!hitNode.locked) { isDraggingNode = hitNode; dragOffsetX = x - hitNode.x; dragOffsetY = y - hitNode.y; }
        redraw(); return;
      }
      const hitSt = findStrokeAt(x, y);
      if (hitSt) {
        WBState.selectedStrokeIdx = hitSt.idx; WBState.selectedNodeId = null; WBState.selectedImgId = null;
        isDraggingStroke = hitSt.stroke; dragOffsetX = x; dragOffsetY = y; redraw(); return;
      }
      const hitImgObj = findImgAt(x, y);
      if (hitImgObj) {
        WBState.selectedImgId = hitImgObj.img.id; WBState.selectedNodeId = null; WBState.selectedStrokeIdx = null;
        if (hitImgObj.resize) isResizingImg = hitImgObj.img;
        else { isDraggingImg = hitImgObj.img; dragOffsetX = x - hitImgObj.img.x; dragOffsetY = y - hitImgObj.img.y; }
        redraw(); return;
      }
      return;
    }
    if (WBState.tool === "text") {
      const txt = prompt("✍️ اكتب النص:");
      if (txt && txt.trim()) {
        pushWB2Undo();
        WBState.strokes.push({ type: "text", text: txt.trim(), x: snapVal(x), y: snapVal(y), color: WBState.color, size: WBState.size });
        redraw();
      }
      return;
    }
    if (WBState.tool === "laser") { isDrawingStroke = true; WBState.laserPoints = [{ x, y }]; return; }

    pushWB2Undo();
    isDrawingStroke = true;
    currentStroke = {
      type: WBState.tool, color: WBState.color, size: WBState.size, lineStyle: WBState.lineStyle,
      points: [{ x, y }], x1: snapVal(x), y1: snapVal(y), x2: snapVal(x), y2: snapVal(y), innerText: ""
    };
    WBState.strokes.push(currentStroke);
  };

  canvas.onmousemove = (e) => {
    const { sx, sy, x, y } = getRawPos(e);
    WBState.mouseWorld = { x, y };

    if (isPanningBoard) { WBState.panX = sx - panStartX; WBState.panY = sy - panStartY; redraw(); return; }
    if (isDraggingRuler) { WBState.rulerPos.x = x - dragOffsetX; WBState.rulerPos.y = y - dragOffsetY; redraw(); return; }
    if (isDraggingProtractor) { WBState.protractorPos.x = x - dragOffsetX; WBState.protractorPos.y = y - dragOffsetY; redraw(); return; }
    if (isDraggingNode) { isDraggingNode.x = snapVal(x - dragOffsetX); isDraggingNode.y = snapVal(y - dragOffsetY); redraw(); return; }
    if (isResizingImg) { isResizingImg.w = Math.max(60, x - isResizingImg.x); isResizingImg.h = Math.max(60, y - isResizingImg.y); redraw(); return; }
    if (isDraggingImg) { isDraggingImg.x = snapVal(x - dragOffsetX); isDraggingImg.y = snapVal(y - dragOffsetY); redraw(); return; }
    if (isDraggingStroke) {
      const dx = x - dragOffsetX, dy = y - dragOffsetY;
      dragOffsetX = x; dragOffsetY = y;
      if (isDraggingStroke.type === "text") { isDraggingStroke.x += dx; isDraggingStroke.y += dy; }
      else if (isDraggingStroke.points?.length > 1) isDraggingStroke.points.forEach(pt => { pt.x += dx; pt.y += dy; });
      else { isDraggingStroke.x1 += dx; isDraggingStroke.y1 += dy; isDraggingStroke.x2 += dx; isDraggingStroke.y2 += dy; }
      redraw(); return;
    }
    if (WBState.spotlightMode) redraw();
    if (!isDrawingStroke) return;
    if (WBState.tool === "laser") {
      WBState.laserPoints.push({ x, y });
      if (WBState.laserPoints.length > 28) WBState.laserPoints.shift();
      redraw(); return;
    }
    if (!currentStroke) return;
    if (["pen", "tech_pen", "highlight", "eraser"].includes(currentStroke.type)) {
      currentStroke.points.push({ x, y });
    } else {
      currentStroke.x2 = snapVal(x); currentStroke.y2 = snapVal(y);
    }
    redraw();
  };

  window.addEventListener("mouseup", () => {
    if (isDrawingStroke && currentStroke && (currentStroke.type === "rect" || currentStroke.type === "circle")) {
      const dist = Math.hypot(currentStroke.x2 - currentStroke.x1, currentStroke.y2 - currentStroke.y1);
      if (dist > 35 && !currentStroke.innerText) {
        const insideTxt = prompt("✍️ اكتب نصاً داخل هذا الشكل (أو اتركه فارغاً):", "");
        if (insideTxt && insideTxt.trim()) currentStroke.innerText = insideTxt.trim();
      }
    }
    isPanningBoard = false; isDraggingRuler = false; isDraggingProtractor = false;
    isDraggingNode = null; isDraggingImg = null; isResizingImg = null; isDraggingStroke = null;
    isDrawingStroke = false; currentStroke = null; WBState.laserPoints = [];
    autoSaveWB2Board(); redraw();
  });

  canvas.ondblclick = (e) => {
    const { x, y } = getRawPos(e);
    const hitNode = findNodeAt(x, y);
    if (hitNode) {
      WBState.selectedNodeId = hitNode.id;
      const newTxt = prompt("✏️ تعديل اسم/عنوان العنصر:", hitNode.text);
      if (newTxt !== null && newTxt.trim()) hitNode.text = newTxt.trim();
      if (hitNode.val !== undefined) {
        const newVal = prompt("📐 تعديل القيمة أو الملاحظة الفرعية:", hitNode.val);
        if (newVal !== null) hitNode.val = newVal.trim();
      }
      hitNode.w = Math.max(125, hitNode.text.length * 9 + 42);
      autoSaveWB2Board(); redraw(); return;
    }
    const hitSt = findStrokeAt(x, y);
    if (hitSt) {
      const s = hitSt.stroke;
      const cur = s.type === "text" ? s.text : (s.innerText || "");
      const next = prompt("✏️ تعديل النص:", cur);
      if (next !== null) {
        if (s.type === "text") s.text = next.trim();
        else s.innerText = next.trim();
        autoSaveWB2Board(); redraw();
      }
    }
  };

  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    const r = canvas.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    const wx = (mx - WBState.panX) / WBState.zoom, wy = (my - WBState.panY) / WBState.zoom;
    const newZoom = Math.min(3.5, Math.max(0.25, WBState.zoom * factor));
    WBState.panX = mx - wx * newZoom;
    WBState.panY = my - wy * newZoom;
    WBState.zoom = newZoom;
    const zLbl = document.getElementById("wb2-zoom-lbl");
    if (zLbl) zLbl.textContent = `${Math.round(WBState.zoom * 100)}%`;
    redraw();
  }, { passive: false });
}
/* ============================================================================
   SMART DOUBLE-CLICK DEFINITION & SUB-TEXT ENGINE (WHITEBOARD 3.1)
   - دبل كليك على أي (نص حر / مستطيل / دائرة / عقدة) = كتابة تعريف يظهر بخط صغير تحته مباشرة
   - يدعم تعدد الأسطر تلقائياً + كتابة "AI" لتوليد التعريف بالذكاء الاصطناعي فوراً
   - للتعديل على العنوان الرئيسي نفسه: اضغط (Shift + دبل كليك)
   ============================================================================ */

// 1. تطوير رسم العقد الشجرية والهندسية لدعم التعريف متعدد الأسطر بخط صغير ومنسق تحت العنوان
const _origDrawWB2SmartNode = drawWB2SmartNode;
drawWB2SmartNode = function(ctx, nd, isWhite) {
  if (nd.shape === "math_plot" || nd.shape === "truth_table") {
    return _origDrawWB2SmartNode(ctx, nd, isWhite);
  }

  // تقسيم التعريف الطويل إلى أسطر متناسقة تحت العنوان الرئيسي
  const defText = String(nd.val || "").trim();
  const defLines = [];
  if (defText) {
    const words = defText.split(/\s+/);
    let curLine = "";
    words.forEach(w => {
      const test = curLine ? curLine + " " + w : w;
      if (test.length > 34 && curLine) {
        defLines.push(curLine);
        curLine = w;
      } else {
        curLine = test;
      }
    });
    if (curLine) defLines.push(curLine);
  }

  // ضبط حجم الصندوق تلقائياً ليحتوي العنوان + التعريف الصغير تحته بأناقة
  const maxDefLen = defLines.reduce((m, l) => Math.max(m, l.length), 0);
  nd.w = Math.max(nd.w || 140, nd.text.length * 9 + 44, maxDefLen * 6.8 + 46);
  nd.h = Math.max(50, 38 + defLines.length * 16);

  const isSel = nd.id === WBState.selectedNodeId;
  ctx.save();
  ctx.translate(nd.x, nd.y);
  if (nd.rotation) ctx.rotate((nd.rotation * Math.PI) / 180);

  const hw = nd.w / 2;
  const hh = nd.h / 2;
  const col = nd.color || "#D4A72C";

  if (isSel) {
    ctx.shadowBlur = 18;
    ctx.shadowColor = col;
  }

  if (nd.shape === "sticky") {
    ctx.fillStyle = "#FEF08A";
    ctx.strokeStyle = "#CA8A04";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-hw, -hh, nd.w, nd.h, 8);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillStyle = isWhite ? "#FFFFFF" : "#11192E";
    ctx.strokeStyle = isSel ? "#19B889" : col;
    ctx.lineWidth = isSel ? 3.2 : 2.2;

    ctx.beginPath();
    if (nd.shape === "circle" || nd.shape === "elec_ac" || nd.shape === "elec_dc") {
      ctx.arc(0, 0, Math.max(hw, hh), 0, Math.PI * 2);
    } else if (nd.shape === "diamond") {
      ctx.moveTo(0, -hh - 8); ctx.lineTo(hw + 12, 0); ctx.lineTo(0, hh + 8); ctx.lineTo(-hw - 12, 0); ctx.closePath();
    } else if (nd.shape === "hexagon") {
      ctx.moveTo(-hw + 16, -hh); ctx.lineTo(hw - 16, -hh); ctx.lineTo(hw + 8, 0);
      ctx.lineTo(hw - 16, hh); ctx.lineTo(-hw + 16, hh); ctx.lineTo(-hw - 8, 0); ctx.closePath();
    } else if (nd.shape === "round_rect") {
      ctx.roundRect(-hw, -hh, nd.w, nd.h, 22);
    } else {
      ctx.roundRect(-hw, -hh, nd.w, nd.h, 10);
    }
    ctx.fill();
    ctx.stroke();
  }

  ctx.shadowBlur = 0;

  // رسم العنوان الرئيسي
  const titleY = defLines.length ? -hh + 20 : 0;
  ctx.fillStyle = nd.shape === "sticky" ? "#0F172A" : (isWhite ? "#0F172A" : "#F8FAFC");
  ctx.font = nd.shape === "code_block" ? "bold 12.5px monospace" : "bold 13.5px Alexandria, Cairo, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText((nd.locked ? "🔒 " : "") + nd.text, 0, titleY);

  // رسم خط فاصل خفيف + التعريف بخط أصغر تحت العنوان مباشرة
  if (defLines.length) {
    ctx.strokeStyle = nd.shape === "sticky" ? "rgba(15,23,42,0.18)" : "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-hw + 14, titleY + 11);
    ctx.lineTo(hw - 14, titleY + 11);
    ctx.stroke();

    ctx.fillStyle = nd.shape === "sticky" ? "#334155" : (isWhite ? "#475569" : "#93C5FD");
    ctx.font = "600 11px Alexandria, Cairo, Inter, sans-serif";
    defLines.forEach((line, i) => {
      ctx.fillText(line, 0, titleY + 23 + i * 15);
    });
  }

  ctx.restore();
};

// 2. رسم التعريف المصغر (subText) تحت النصوص الحرة والمستطيلات والدوائر المرسومة
const _origRenderWBScene = renderWhiteboardScene;
renderWhiteboardScene = function(ctx, W, H) {
  _origRenderWBScene(ctx, W, H);

  const isWhite = WBState.bgMode === "white";
  ctx.save();
  ctx.translate(WBState.panX, WBState.panY);
  ctx.scale(WBState.zoom, WBState.zoom);

  WBState.strokes.forEach(s => {
    if (s.hidden || !s.subText) return;
    const defLines = String(s.subText).split("\n");
    const subFontSize = Math.max(11, Math.round((s.size || 4) * 2.4));

    ctx.save();
    ctx.font = `600 ${subFontSize}px Alexandria, Cairo, sans-serif`;

    if (s.type === "text") {
      // رسم التعريف بخط صغير أنيق تحت النص الحر مباشرة مع خط جانبي ذهبي
      const startY = s.y + 10;
      ctx.strokeStyle = s.color || "#D4A72C";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(s.x, startY - 4);
      ctx.lineTo(s.x, startY + defLines.length * (subFontSize + 5) - 4);
      ctx.stroke();

      ctx.fillStyle = isWhite ? "#334155" : "#CBD5E1";
      ctx.textAlign = "start";
      ctx.textBaseline = "top";
      defLines.forEach((ln, idx) => {
        ctx.fillText(`↳ ${ln}`, s.x + 8, startY + idx * (subFontSize + 5));
      });
    } else if (s.type === "rect" || s.type === "circle") {
      // رسم التعريف بخط صغير تحت الكلمة الموجودة داخل المستطيل أو الدائرة
      const cx = s.type === "circle" ? s.x1 : s.x1 + (s.x2 - s.x1) / 2;
      const cy = s.type === "circle" ? s.y1 + 18 : s.y1 + (s.y2 - s.y1) / 2 + 18;
      ctx.fillStyle = isWhite ? "#475569" : "#93C5FD";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      defLines.forEach((ln, idx) => {
        ctx.fillText(ln, cx, cy + idx * (subFontSize + 4));
      });
    }
    ctx.restore();
  });

  ctx.restore();
};

// 3. تفعيل الدبل كليك الذكي: يفهم تلقائياً أنك تريد كتابة تعريف تحت النص (أو تعديل العنوان مع Shift)
const _origBindWB3Pointer = bindWB3CanvasPointerEvents;
bindWB3CanvasPointerEvents = function(ctx, canvas, redraw) {
  _origBindWB3Pointer(ctx, canvas, redraw);

  const screenToWorld = (sx, sy) => ({
    x: (sx - WBState.panX) / WBState.zoom,
    y: (sy - WBState.panY) / WBState.zoom
  });

  canvas.ondblclick = async (e) => {
    const r = canvas.getBoundingClientRect();
    const wx = (e.clientX - r.left - WBState.panX) / WBState.zoom;
    const wy = (e.clientY - r.top - WBState.panY) / WBState.zoom;

    // أولاً: فحص إذا ضغط مرتين على عقدة أو صندوق شجري
    for (let i = WBState.nodes.length - 1; i >= 0; i--) {
      const nd = WBState.nodes[i];
      if (!nd.hidden && wx >= nd.x - nd.w / 2 && wx <= nd.x + nd.w / 2 && wy >= nd.y - nd.h / 2 && wy <= nd.y + nd.h / 2) {
        WBState.selectedNodeId = nd.id;
        if (e.shiftKey) {
          const newTitle = prompt("✏️ تعديل العنوان الرئيسي:", nd.text);
          if (newTitle !== null && newTitle.trim()) nd.text = newTitle.trim();
        } else {
          const def = prompt(
            `📖 اكتب التعريف أو الشرح الفرعي ليظهر بخط صغير تحت "${nd.text}":\n(💡 اكتب AI ليقوم الذكاء الاصطناعي بكتابة التعريف تلقائياً، أو اضغط Shift+دبل كليك لتعديل العنوان الرئيسي)`,
            nd.val || ""
          );
          if (def !== null) {
            if (def.trim().toLowerCase() === "ai") {
              toast(`🤖 جاري توليد تعريف علمي مختصر لـ "${nd.text}"...`, "info");
              const aiReply = await B().askAI?.(`اكتب تعريفاً علمياً أو هندسياً مختصراً جداً (في سطر واحد لا يتجاوز 12 كلمة) للمصطلح التالي: "${nd.text}"`);
              nd.val = String(aiReply || "").replace(/\n+/g, " ").trim().slice(0, 90);
            } else {
              nd.val = def.trim();
            }
          }
        }
        autoSaveWB2Board();
        redraw();
        return;
      }
    }

    // ثانياً: فحص إذا ضغط مرتين على نص حر أو مستطيل أو دائرة
    for (let i = WBState.strokes.length - 1; i >= 0; i--) {
      const s = WBState.strokes[i];
      if (s.hidden) continue;

      let hit = false;
      if (s.type === "text") {
        const w = Math.max(70, (s.text || "").length * (s.size * 2.8));
        const h = Math.max(32, s.size * 5.5);
        if (wx >= s.x - 12 && wx <= s.x + w + 20 && wy >= s.y - h && wy <= s.y + 45) hit = true;
      } else if (s.type === "rect") {
        const minX = Math.min(s.x1, s.x2) - 8, maxX = Math.max(s.x1, s.x2) + 8;
        const minY = Math.min(s.y1, s.y2) - 8, maxY = Math.max(s.y1, s.y2) + 8;
        if (wx >= minX && wx <= maxX && wy >= minY && wy <= maxY) hit = true;
      } else if (s.type === "circle") {
        const rad = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
        if (Math.hypot(wx - s.x1, wy - s.y1) <= rad + 10) hit = true;
      }

      if (hit) {
        WBState.selectedStrokeIdx = i;
        const mainTitle = s.type === "text" ? s.text : (s.innerText || "");

        // إذا كان الشكل فارغاً تماماً أو ضغط المستخدم Shift، يعدل العنوان الرئيسي
        if (!mainTitle || e.shiftKey) {
          const nextMain = prompt("✏️ اكتب العنوان الأساسي:", mainTitle);
          if (nextMain !== null) {
            if (s.type === "text") s.text = nextMain.trim();
            else s.innerText = nextMain.trim();
          }
        } else {
          // النظام يفهم تلقائياً أن الدبل كليك هو لتعريف الكلمة بخط صغير تحتها!
          const def = prompt(
            `📖 تعريف "${mainTitle}" (سيظهر بخط صغير تحت الكلمة مباشرة):\n(💡 اكتب AI لتوليد التعريف تلقائياً، أو اضغط Shift+دبل كليك لتعديل الكلمة نفسها)`,
            s.subText || ""
          );
          if (def !== null) {
            pushWB2Undo();
            if (def.trim().toLowerCase() === "ai") {
              toast(`🤖 جاري تعريف "${mainTitle}" بالذكاء الاصطناعي...`, "info");
              const aiReply = await B().askAI?.(`اكتب تعريفاً مختصراً جداً (في سطر واحد لا يتجاوز 12 كلمة) للمصطلح: "${mainTitle}"`);
              s.subText = String(aiReply || "").replace(/\n+/g, " ").trim().slice(0, 95);
            } else {
              s.subText = def.trim();
            }
          }
        }
        autoSaveWB2Board();
        redraw();
        return;
      }
    }
  };
};
/* ============================================================================
   WHITEBOARD STUDIO 4.0 — 11 SUPER-POWERS & INTERACTIVE SIMULATION ENGINE
   (APPEND-ONLY • ZERO DELETION)
   1. Smart Double-Click Definition Sub-Text (With AI Auto-Definition)
   2. Live Logic & Electrical Circuit Simulator + Animated Current Particles
   3. Interactive Voice-Note Pins (Record & Click Pin on Board to Play Audio)
   4. Code-to-Flowchart Automatic Visualizer
   5. Collapsible Deep-Dive Branches (+ / - Progressive Reveal)
   6. Live On-Board Interactive Quiz Card with 15s Timer
   7. Vanishing Ink Pen (Auto-Fades After 4 Seconds)
   8. Interactive 4-Variable Karnaugh Map (K-Map Clickable Grid)
   9. Smart Editable Table / Matrix Node
   10. Live Code Block Runner (Execute JS/Math On-Board)
   11. 1-Click Complete Lecture Handout PDF Exporter
   ============================================================================ */

Object.assign(WBState, {
  simFlowActive: false,
  simParticleOffset: 0,
  simAnimFrameId: null,
  vanishingStrokes: [],
  voicePinsAudioMap: {},
  isRecordingVoicePin: false,
  voicePinRecorder: null,
  voicePinChunks: [],
  quizInterval: null
});

function injectWB4SuperStyles() {
  if (document.getElementById("wb4-super-pack-styles")) return;
  const st = document.createElement("style");
  st.id = "wb4-super-pack-styles";
  st.textContent = `
    .wb4-super-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 5px 8px;
      background: linear-gradient(90deg, rgba(16, 24, 45, 0.98), rgba(11, 29, 38, 0.98));
      border: 1px solid rgba(25, 184, 137, 0.45);
      border-radius: 12px;
      padding: 5px 10px;
      margin-bottom: 6px;
      flex-shrink: 0;
    }
    .wb-presentation-active .wb4-super-bar {
      display: none !important;
    }
    .wb4-sim-active-btn {
      background: linear-gradient(135deg, #19B889, #059669) !important;
      color: #040811 !important;
      font-weight: 800 !important;
      box-shadow: 0 0 18px rgba(25, 184, 137, 0.5) !important;
    }

    /* بطاقة الاختبار التفاعلي المباشر فوق السبورة (On-Board Quiz Overlay) */
    .wb4-quiz-overlay-card {
      position: fixed;
      top: 110px;
      right: 36px;
      width: 390px;
      max-width: 92vw;
      background: linear-gradient(160deg, rgba(13, 19, 36, 0.97), rgba(7, 11, 22, 0.99));
      border: 2px solid var(--gold-primary);
      border-radius: 20px;
      padding: 18px;
      z-index: 1000030;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 167, 44, 0.25);
      backdrop-filter: blur(16px);
    }
    .wb4-quiz-opt-btn {
      width: 100%;
      text-align: right;
      padding: 10px 14px;
      margin-top: 8px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.14);
      background: rgba(255, 255, 255, 0.05);
      color: #f8fafc;
      font-family: inherit;
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .wb4-quiz-opt-btn:hover {
      border-color: var(--gold-primary);
      background: rgba(212, 167, 44, 0.12);
    }
    .wb4-quiz-opt-btn.correct {
      background: rgba(25, 184, 137, 0.28) !important;
      border-color: #19B889 !important;
      color: #6ee7b7 !important;
    }
    .wb4-quiz-opt-btn.wrong {
      background: rgba(239, 68, 68, 0.25) !important;
      border-color: #ef4444 !important;
      color: #fca5a5 !important;
    }
  `;
  document.head.appendChild(st);
}

/* ============================================================================
   1. LOGIC & CIRCUIT SIMULATION ENGINE (COMPUTES GATES, SWITCHES & LEDS)
   ============================================================================ */
function evaluateWB4CircuitLogic() {
  // تمرير الإشارات المنطقية والكهربائية من العقد الأب إلى الأبناء
  const nodeMap = {};
  WBState.nodes.forEach(n => { nodeMap[n.id] = n; });

  WBState.nodes.forEach(n => {
    if (n.shape === "elec_dc" || n.shape === "elec_ac") {
      n.logicState = 1;
    } else if (n.shape === "elec_gnd") {
      n.logicState = 0;
    } else if (n.shape === "elec_sw") {
      if (n.logicState === undefined) n.logicState = 1;
    }
  });

  // 3 دورات لتحديث البوابات المتسلسلة
  for (let pass = 0; pass < 3; pass++) {
    WBState.nodes.forEach(nd => {
      const inputs = WBState.nodes.filter(p => p.id === nd.parentId || nd.extraParentId === p.id);
      if (!inputs.length) return;
      const inVals = inputs.map(p => Number(p.logicState ?? 1));
      const a = inVals[0] ?? 1;
      const b = inVals[1] ?? (nd.altInputB ?? 1);

      if (nd.shape === "gate_and") nd.logicState = (a && b) ? 1 : 0;
      else if (nd.shape === "gate_or") nd.logicState = (a || b) ? 1 : 0;
      else if (nd.shape === "gate_not") nd.logicState = a ? 0 : 1;
      else if (nd.shape === "gate_nand") nd.logicState = (a && b) ? 0 : 1;
      else if (nd.shape === "gate_xor") nd.logicState = (a !== b) ? 1 : 0;
      else if (nd.shape === "elec_led" || nd.shape === "elec_res" || nd.shape === "elec_cap" || nd.shape === "elec_ind") {
        nd.logicState = a;
      } else if (nd.logicState === undefined) {
        nd.logicState = a;
      }
    });
  }
}

// التحقق مما إذا كانت العقدة مخفية بسبب طي أحد آبائها (Collapsed Branch Check)
function isNodeHiddenByCollapse(nd) {
  let cur = nd;
  let guard = 0;
  while (cur && cur.parentId && guard < 15) {
    guard++;
    const parent = WBState.nodes.find(p => p.id === cur.parentId);
    if (!parent) break;
    if (parent.collapsed) return true;
    cur = parent;
  }
  return false;
}

/* ============================================================================
   2. CODE-TO-FLOWCHART AUTOMATIC GENERATOR
   ============================================================================ */
function openCodeToFlowchartModal(ctx, canvas, redraw) {
  B().openFormModal("🔀 محول الكود البرمجي إلى مخطط تدفق هندسي (Code-to-Flowchart Visualizer)", `
    <p class="small-muted mb-2">الصق أي كود برمجي (C++ / Python / JavaScript / Java) وسيتعرف النظام تلقائياً على الشروط (if/else) والحلقات (for/while) والعمليات ويرسمها كمخطط Flowchart مترابط على السبورة:</p>
    <div class="form-group">
      <textarea id="wb4-code-flow-inp" rows="8" dir="ltr" style="font-family:monospace;" placeholder="function checkSensor(temp) {\n  initSystem();\n  if (temp > 50) {\n    triggerAlarm();\n  } else {\n    normalMode();\n  }\n  while (temp > 40) {\n    coolDownFan();\n  }\n  return status;\n}">function checkSensor(temp) {
  initSystem();
  if (temp > 50) {
    triggerAlarm();
  } else {
    normalMode();
  }
  while (temp > 40) {
    coolDownFan();
  }
  return status;
}</textarea>
    </div>
    <button type="button" id="btn-wb4-build-flowchart" class="btn btn-gold btn-block">
      <i class="fa-solid fa-diagram-project"></i> توليد ورسم الـ Flowchart على السبورة الآن 🚀
    </button>
  `, async () => {});

  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  document.getElementById("btn-wb4-build-flowchart").onclick = () => {
    const rawCode = document.getElementById("wb4-code-flow-inp")?.value || "";
    const lines = rawCode.split("\n")
      .map(l => l.trim().replace(/[{};]/g, "").trim())
      .filter(l => l && !l.startsWith("//") && !l.startsWith("#") && l !== "else");

    if (!lines.length) return;
    pushWB2Undo();

    const startX = (canvas.width / 2 - WBState.panX) / WBState.zoom;
    let curY = (70 - WBState.panY) / WBState.zoom;
    let prevId = "fc_start_" + Date.now();

    WBState.nodes.push({
      id: prevId,
      text: "🟢 START / بداية الدالة",
      val: lines[0].slice(0, 35),
      shape: "round_rect",
      x: startX,
      y: curY,
      w: 195,
      h: 48,
      color: "#19B889",
      parentId: null
    });

    lines.slice(1, 10).forEach((ln, idx) => {
      curY += 105;
      const id = `fc_${Date.now()}_${idx}`;
      const isCond = /^(if|else if|while|for|switch)\b/i.test(ln);
      const isRet = /^return\b/i.test(ln);

      WBState.nodes.push({
        id,
        text: isCond ? `❓ ${ln.slice(0, 32)}` : isRet ? `🏁 ${ln.slice(0, 32)}` : `⚙️ ${ln.slice(0, 32)}`,
        val: isCond ? "شرط / تكرار (True ➔ False)" : isRet ? "مخرجات الدالة" : "عملية تنفيذية",
        shape: isCond ? "diamond" : isRet ? "round_rect" : "rect",
        x: startX + (idx % 2 === 1 && isCond ? 120 : 0),
        y: curY,
        w: 210,
        h: 54,
        color: isCond ? "#F59E0B" : isRet ? "#38BDF8" : "#D4A72C",
        parentId: prevId
      });
      prevId = id;
    });

    openSmartWhiteboardModal(false);
    toast("🔀 تم تحويل الكود البرمجي إلى مخطط Flowchart هندسي على السبورة!");
  };
}

/* ============================================================================
   3. LIVE ON-BOARD INTERACTIVE QUIZ CARD (WITH 15s COUNTDOWN TIMER)
   ============================================================================ */
function launchOnBoardQuizCard() {
  let existing = document.getElementById("wb4-quiz-overlay-card");
  if (existing) existing.remove();

  const qTitle = prompt("❓ اكتب سؤال التحدي المباشر للطلاب (أو اتركه للسؤال الهندسي الافتراضي):", "ما هي البوابة المنطقية التي تعطي خرجاً (1) فقط عندما تختلف المداخل؟");
  if (qTitle === null) return;

  const optsRaw = prompt("اكتب 4 اختيارات مفصولة بفاصلة (وضع نجمة * قبل الإجابة الصحيحة):", "AND Gate, OR Gate, *XOR Gate, NAND Gate");
  if (!optsRaw) return;

  const parts = optsRaw.split(/[،,]/).map(s => s.trim()).filter(Boolean);
  let timeLeft = 15;

  const card = document.createElement("div");
  card.id = "wb4-quiz-overlay-card";
  card.className = "wb4-quiz-overlay-card";
  card.innerHTML = `
    <div class="flex-between mb-1">
      <span class="badge badge-gold"><i class="fa-solid fa-bolt"></i> سؤال تفاعلي مباشر</span>
      <div class="filters-row" style="gap:6px;">
        <span id="wb4-quiz-timer-badge" class="badge badge-emerald">⏱️ ${timeLeft} ثانية</span>
        <button type="button" id="btn-wb4-close-quiz" class="btn-icon-xs text-danger"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
    <h4 class="gold-text mt-1" style="font-size:0.98rem; line-height:1.5;">${esc(qTitle)}</h4>
    <div class="mt-2">
      ${parts.map((p, i) => {
        const isCorrect = p.startsWith("*");
        const cleanTxt = p.replace(/^\*/, "").trim();
        return `
          <button type="button" class="wb4-quiz-opt-btn" data-quiz-correct="${isCorrect ? "1" : "0"}">
            <span>${i + 1}. ${esc(cleanTxt)}</span>
            <i class="fa-regular fa-circle"></i>
          </button>
        `;
      }).join("")}
    </div>
  `;
  document.body.appendChild(card);

  if (WBState.quizInterval) clearInterval(WBState.quizInterval);
  WBState.quizInterval = setInterval(() => {
    timeLeft--;
    const b = document.getElementById("wb4-quiz-timer-badge");
    if (b) b.textContent = `⏱️ ${Math.max(0, timeLeft)} ثانية`;
    if (timeLeft <= 0) {
      clearInterval(WBState.quizInterval);
      if (b) {
        b.className = "badge badge-danger";
        b.textContent = "⌛ انتهى الوقت!";
      }
    }
  }, 1000);

  card.querySelectorAll(".wb4-quiz-opt-btn").forEach(btn => {
    btn.onclick = () => {
      clearInterval(WBState.quizInterval);
      const isRight = btn.dataset.quizCorrect === "1";
      card.querySelectorAll(".wb4-quiz-opt-btn").forEach(b => {
        if (b.dataset.quizCorrect === "1") {
          b.classList.add("correct");
          b.querySelector("i").className = "fa-solid fa-circle-check";
        }
      });
      if (!isRight) {
        btn.classList.add("wrong");
        btn.querySelector("i").className = "fa-solid fa-circle-xmark";
        toast("❌ إجابة غير صحيحة! تم توضيح الإجابة الصحيحة باللون الأخضر", "error");
      } else {
        toast("🎉 أحسنت! إجابة صحيحة 100%");
      }
    };
  });

  document.getElementById("btn-wb4-close-quiz").onclick = () => {
    clearInterval(WBState.quizInterval);
    card.remove();
  };
}

/* ============================================================================
   4. VOICE-NOTE PIN RECORDER ON WHITEBOARD (RECORD & CLICK PIN TO PLAY)
   ============================================================================ */
async function toggleVoicePinRecording(ctx, canvas, redraw) {
  const btn = document.getElementById("btn-wb4-voice-pin");
  if (WBState.isRecordingVoicePin && WBState.voicePinRecorder) {
    WBState.voicePinRecorder.stop();
    WBState.isRecordingVoicePin = false;
    btn?.classList.remove("btn-danger");
    if (btn) btn.innerHTML = `<i class="fa-solid fa-microphone-lines gold-text"></i> + دبوس صوتي`;
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    WBState.voicePinChunks = [];
    WBState.voicePinRecorder = new MediaRecorder(stream);
    WBState.voicePinRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) WBState.voicePinChunks.push(e.data);
    };
    WBState.voicePinRecorder.onstop = () => {
      stream.getTracks().forEach(t => t.stop());
      const blob = new Blob(WBState.voicePinChunks, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(blob);
      const pinId = "vpin_" + Date.now();
      WBState.voicePinsAudioMap[pinId] = audioUrl;

      const label = prompt("🎤 اكتب عنواناً لهذا الدبوس الصوتي على السبورة:", "شرح صوتي للنقطة") || "شرح صوتي";
      const cx = (canvas.width / 2 - WBState.panX) / WBState.zoom;
      const cy = (canvas.height / 2 - WBState.panY) / WBState.zoom;

      WBState.nodes.push({
        id: pinId,
        text: `🔊 ${label}`,
        val: "اضغط دبل كليك لسماع التسجيل الصوتي 🎤",
        shape: "voice_pin",
        x: cx,
        y: cy,
        w: 205,
        h: 54,
        color: "#10B981",
        parentId: WBState.selectedNodeId || null
      });
      redraw();
      toast("🎤 تم تثبيت الدبوس الصوتي على السبورة! اضغط عليه مرتين في أي وقت لسماع شرحك");
    };

    WBState.voicePinRecorder.start();
    WBState.isRecordingVoicePin = true;
    btn?.classList.add("btn-danger");
    if (btn) btn.innerHTML = `<i class="fa-solid fa-stop"></i> إيقاف وحفظ الدبوس 🔴`;
    toast("🎙️ تحدث الآن لشرح النقطة... ثم اضغط (إيقاف وحفظ الدبوس)", "info");
  } catch (err) {
    toast("يرجى السماح بالمايكروفون لتسجيل الدبوس الصوتي", "error");
  }
}

/* ============================================================================
   5. 1-CLICK COMPLETE LECTURE HANDOUT PDF BUILDER (DIAGRAM + GLOSSARY)
   ============================================================================ */
async function exportCompleteLectureHandoutPDF(canvas) {
  toast("⏳ جاري تجميع رسومات السبورة والتعريفات وبناء مذكرة المحاضرة PDF...", "info");
  try {
    if (!window.jspdf) {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    // الصفحة الأولى: صورة السبورة والمخططات عالية الدقة
    const boardImg = canvas.toDataURL("image/jpeg", 0.95);

    // الصفحة الثانية: جدول المصطلحات والتعريفات والملاحظات المرسومة على اللوحة
    const summaryCanv = document.createElement("canvas");
    summaryCanv.width = 1200;
    summaryCanv.height = 850;
    const sCtx = summaryCanv.getContext("2d");

    sCtx.fillStyle = "#080D1A";
    sCtx.fillRect(0, 0, 1200, 850);
    sCtx.strokeStyle = "#D4A72C";
    sCtx.lineWidth = 4;
    sCtx.strokeRect(20, 20, 1160, 810);

    sCtx.fillStyle = "#D4A72C";
    sCtx.font = "bold 28px Alexandria, Cairo, sans-serif";
    sCtx.textAlign = "right";
    sCtx.fillText(`📚 ملخص ومذكرة المحاضرة الهندسية — ${today()}`, 1140, 70);

    sCtx.fillStyle = "#F8FAFC";
    sCtx.font = "bold 18px Alexandria, Cairo, sans-serif";
    let yPos = 130;

    WBState.nodes.forEach((nd, idx) => {
      if (yPos > 780) return;
      sCtx.fillStyle = "#19B889";
      sCtx.fillText(`${idx + 1}. ${nd.text}`, 1140, yPos);
      if (nd.val) {
        sCtx.fillStyle = "#CBD5E1";
        sCtx.font = "16px Alexandria, Cairo, sans-serif";
        sCtx.fillText(`   ↳ التعريف / القيمة: ${nd.val}`, 1110, yPos + 28);
        yPos += 62;
      } else {
        yPos += 38;
      }
      sCtx.font = "bold 18px Alexandria, Cairo, sans-serif";
    });

    WBState.strokes.filter(s => s.type === "text" || s.subText).forEach((s) => {
      if (yPos > 780) return;
      const t = s.text || s.innerText || "ملاحظة";
      sCtx.fillStyle = "#38BDF8";
      sCtx.fillText(`• ${t} ${s.subText ? " — " + s.subText : ""}`, 1140, yPos);
      yPos += 36;
    });

    const summaryImg = summaryCanv.toDataURL("image/jpeg", 0.95);

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: "l", unit: "mm", format: "a4" });
    const pW = pdf.internal.pageSize.getWidth();
    const pH = pdf.internal.pageSize.getHeight();

    pdf.addImage(boardImg, "JPEG", 6, 6, pW - 12, pH - 12);
    pdf.addPage();
    pdf.addImage(summaryImg, "JPEG", 6, 6, pW - 12, pH - 12);

    pdf.save(`Lecture-Handout-${today()}.pdf`);
    toast("📄 تم تصدير مذكرة المحاضرة الشاملة (المخطط + جدول التعريفات) بصيغة PDF!");
  } catch (e) {
    toast("تعذر إنشاء ملف الـ PDF", "error");
  }
}

/* ============================================================================
   6. UPGRADE RENDER ENGINE FOR ALL 11 FEATURES (PARTICLES, K-MAP, TABLE, DEFINITIONS)
   ============================================================================ */
const _wb3BaseDrawSmartNode = drawWB2SmartNode;
drawWB2SmartNode = function(ctx, nd, isWhite) {
  if (nd.shape === "math_plot" || nd.shape === "truth_table") {
    return _wb3BaseDrawSmartNode(ctx, nd, isWhite);
  }

  const isSel = nd.id === WBState.selectedNodeId;
  ctx.save();
  ctx.translate(nd.x, nd.y);
  if (nd.rotation) ctx.rotate((nd.rotation * Math.PI) / 180);

  // أ) رسم خريطة كارنو التفاعلية 4x4 (Interactive Karnaugh Map Node)
  if (nd.shape === "kmap_4") {
    nd.w = 230;
    nd.h = 195;
    const hw = nd.w / 2, hh = nd.h / 2;
    nd.kmapCells = nd.kmapCells || Array(16).fill(0);

    ctx.fillStyle = "rgba(10, 16, 30, 0.96)";
    ctx.strokeStyle = isSel ? "#19B889" : "#D4A72C";
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(-hw, -hh, nd.w, nd.h, 12); ctx.fill(); ctx.stroke();

    ctx.fillStyle = "#D4A72C";
    ctx.font = "bold 12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(nd.text || "4-Var K-Map (AB \\ CD)", 0, -hh + 18);

    const headers = ["00", "01", "11", "10"];
    const gridX = -hw + 44, gridY = -hh + 42, cellW = 40, cellH = 33;

    ctx.fillStyle = "#94A3B8";
    ctx.font = "bold 10px monospace";
    headers.forEach((h, i) => {
      ctx.fillText(h, gridX + i * cellW + cellW / 2, gridY - 6);
      ctx.fillText(h, gridX - 18, gridY + i * cellH + cellH / 2 + 3);
    });

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const idx = r * 4 + c;
        const val = nd.kmapCells[idx];
        const cx = gridX + c * cellW, cy = gridY + r * cellH;
        ctx.fillStyle = val === 1 ? "rgba(25, 184, 137, 0.28)" : val === "X" ? "rgba(212, 167, 44, 0.22)" : "rgba(255,255,255,0.03)";
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.lineWidth = 1;
        ctx.fillRect(cx, cy, cellW, cellH);
        ctx.strokeRect(cx, cy, cellW, cellH);

        ctx.fillStyle = val === 1 ? "#10B981" : val === "X" ? "#FBBF24" : "#F8FAFC";
        ctx.font = "bold 13px monospace";
        ctx.fillText(String(val), cx + cellW / 2, cy + cellH / 2 + 4);
      }
    }
    ctx.restore();
    return;
  }

  // ب) رسم الجدول أو المصفوفة الذكية (Smart Matrix / Table Node)
  if (nd.shape === "smart_table") {
    const rows = nd.tableRows || [
      ["المعامل", "القيمة", "الوحدة"],
      ["الجهد V", "12", "Volt"],
      ["التيار I", "2.5", "Amp"]
    ];
    const colCount = Math.max(1, rows[0]?.length || 3);
    const cellW = 74, cellH = 30;
    nd.w = colCount * cellW + 20;
    nd.h = rows.length * cellH + 38;
    const hw = nd.w / 2, hh = nd.h / 2;

    ctx.fillStyle = "rgba(12, 18, 34, 0.96)";
    ctx.strokeStyle = isSel ? "#19B889" : (nd.color || "#38BDF8");
    ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.roundRect(-hw, -hh, nd.w, nd.h, 10); ctx.fill(); ctx.stroke();

    ctx.fillStyle = "#D4A72C";
    ctx.font = "bold 12px Alexandria, Cairo, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(nd.text || "جدول بيانات هندسي", 0, -hh + 18);

    rows.forEach((rArr, rIdx) => {
      rArr.forEach((cellVal, cIdx) => {
        const cx = -hw + 10 + cIdx * cellW;
        const cy = -hh + 30 + rIdx * cellH;
        ctx.fillStyle = rIdx === 0 ? "rgba(212, 167, 44, 0.18)" : "rgba(255,255,255,0.03)";
        ctx.strokeStyle = "rgba(255,255,255,0.14)";
        ctx.fillRect(cx, cy, cellW, cellH);
        ctx.strokeRect(cx, cy, cellW, cellH);

        ctx.fillStyle = rIdx === 0 ? "#FBBF24" : "#F8FAFC";
        ctx.font = rIdx === 0 ? "bold 11.5px Alexandria, sans-serif" : "11px Alexandria, monospace";
        ctx.fillText(String(cellVal).slice(0, 11), cx + cellW / 2, cy + cellH / 2 + 4);
      });
    });
    ctx.restore();
    return;
  }

  // ج) تقسيم التعريف الفرعي (Sub-Definition) بخط صغير تحت العنوان الرئيسي لجميع العقد
  const defText = String(nd.val || "").trim();
  const defLines = [];
  if (defText) {
    const words = defText.split(/\s+/);
    let curLine = "";
    words.forEach(w => {
      const test = curLine ? curLine + " " + w : w;
      if (test.length > 34 && curLine) {
        defLines.push(curLine);
        curLine = w;
      } else {
        curLine = test;
      }
    });
    if (curLine) defLines.push(curLine);
  }

  const maxDefLen = defLines.reduce((m, l) => Math.max(m, l.length), 0);
  nd.w = Math.max(nd.w || 140, nd.text.length * 9 + 46, maxDefLen * 6.8 + 48);
  nd.h = Math.max(50, 38 + defLines.length * 16);

  const hw = nd.w / 2, hh = nd.h / 2;
  let col = nd.color || "#D4A72C";

  // تلوين تفاعلي عند تشغيل محاكي الدوائر المنطقية والكهربائية!
  if (WBState.simFlowActive && nd.logicState !== undefined) {
    col = nd.logicState ? "#10B981" : "#EF4444";
    ctx.shadowBlur = nd.logicState ? 22 : 6;
    ctx.shadowColor = col;
  } else if (isSel) {
    ctx.shadowBlur = 18;
    ctx.shadowColor = col;
  }

  if (nd.shape === "sticky") {
    ctx.fillStyle = "#FEF08A";
    ctx.strokeStyle = "#CA8A04";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(-hw, -hh, nd.w, nd.h, 8); ctx.fill(); ctx.stroke();
  } else {
    ctx.fillStyle = isWhite ? "#FFFFFF" : "#11192E";
    ctx.strokeStyle = isSel ? "#19B889" : col;
    ctx.lineWidth = isSel ? 3.2 : 2.2;

    ctx.beginPath();
    if (nd.shape === "circle" || nd.shape === "elec_ac" || nd.shape === "elec_dc") {
      ctx.arc(0, 0, Math.max(hw, hh), 0, Math.PI * 2);
    } else if (nd.shape === "diamond") {
      ctx.moveTo(0, -hh - 8); ctx.lineTo(hw + 12, 0); ctx.lineTo(0, hh + 8); ctx.lineTo(-hw - 12, 0); ctx.closePath();
    } else if (nd.shape === "hexagon") {
      ctx.moveTo(-hw + 16, -hh); ctx.lineTo(hw - 16, -hh); ctx.lineTo(hw + 8, 0);
      ctx.lineTo(hw - 16, hh); ctx.lineTo(-hw + 16, hh); ctx.lineTo(-hw - 8, 0); ctx.closePath();
    } else if (nd.shape === "round_rect" || nd.shape === "voice_pin") {
      ctx.roundRect(-hw, -hh, nd.w, nd.h, 24);
    } else {
      ctx.roundRect(-hw, -hh, nd.w, nd.h, 10);
    }
    ctx.fill();
    ctx.stroke();
  }

  ctx.shadowBlur = 0;

  // إظهار شارة الحالة المنطقية (1 / 0) في وضع المحاكاة
  if (WBState.simFlowActive && nd.logicState !== undefined) {
    ctx.fillStyle = nd.logicState ? "#10B981" : "#EF4444";
    ctx.beginPath(); ctx.arc(hw - 12, -hh + 12, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#05070e"; ctx.font = "bold 10px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(String(nd.logicState), hw - 12, -hh + 12);
  }

  // إظهار شارة الفروع المطوية (+ عدد الفروع المخفية)
  const hiddenChildrenCount = WBState.nodes.filter(c => c.parentId === nd.id).length;
  if (nd.collapsed && hiddenChildrenCount > 0) {
    ctx.fillStyle = "#F59E0B";
    ctx.beginPath(); ctx.roundRect(-hw + 6, -hh - 11, 46, 18, 9); ctx.fill();
    ctx.fillStyle = "#05070e"; ctx.font = "bold 10px Inter, sans-serif";
    ctx.fillText(`+${hiddenChildrenCount} فروع`, -hw + 29, -hh - 2);
  }

  // العنوان الرئيسي
  const titleY = defLines.length ? -hh + 20 : 0;
  ctx.fillStyle = nd.shape === "sticky" ? "#0F172A" : (isWhite ? "#0F172A" : "#F8FAFC");
  ctx.font = nd.shape === "code_block" ? "bold 12.5px monospace" : "bold 13.5px Alexandria, Cairo, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText((nd.locked ? "🔒 " : "") + nd.text, 0, titleY);

  // التعريف المصغر تحت العنوان
  if (defLines.length) {
    ctx.strokeStyle = nd.shape === "sticky" ? "rgba(15,23,42,0.18)" : "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-hw + 14, titleY + 11); ctx.lineTo(hw - 14, titleY + 11); ctx.stroke();

    ctx.fillStyle = nd.shape === "sticky" ? "#334155" : (isWhite ? "#475569" : "#93C5FD");
    ctx.font = "600 11px Alexandria, Cairo, Inter, sans-serif";
    defLines.forEach((line, i) => {
      ctx.fillText(line, 0, titleY + 23 + i * 15);
    });
  }

  ctx.restore();
};

// ترقية محرك رسم المشهد لدعم: طي الفروع + نبضات التيار المتحركة + قلم التلاشي + التعريف تحت النصوص الحرة
const _wb3BaseRenderScene = renderWhiteboardScene;
renderWhiteboardScene = function(ctx, W, H) {
  if (WBState.simFlowActive) evaluateWB4CircuitLogic();

  // إخفاء العقد المطوية مؤقتاً أثناء الرسم
  const tempHiddenIds = [];
  WBState.nodes.forEach(n => {
    if (!n.hidden && isNodeHiddenByCollapse(n)) {
      n.hidden = true;
      tempHiddenIds.push(n.id);
    }
  });

  _wb3BaseRenderScene(ctx, W, H);

  // إعادة حالة العقد بعد الرسم
  tempHiddenIds.forEach(id => {
    const nd = WBState.nodes.find(x => x.id === id);
    if (nd) nd.hidden = false;
  });

  const isWhite = WBState.bgMode === "white";
  ctx.save();
  ctx.translate(WBState.panX, WBState.panY);
  ctx.scale(WBState.zoom, WBState.zoom);

  // 1. رسم التعريفات المصغرة (subText) تحت النصوص الحرة والمستطيلات والدوائر
  WBState.strokes.forEach(s => {
    if (s.hidden || !s.subText) return;
    const defLines = String(s.subText).split("\n");
    const subFontSize = Math.max(11, Math.round((s.size || 4) * 2.4));

    ctx.save();
    ctx.font = `600 ${subFontSize}px Alexandria, Cairo, sans-serif`;
    if (s.type === "text") {
      const startY = s.y + 10;
      ctx.strokeStyle = s.color || "#D4A72C";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(s.x, startY - 4);
      ctx.lineTo(s.x, startY + defLines.length * (subFontSize + 5) - 4);
      ctx.stroke();

      ctx.fillStyle = isWhite ? "#334155" : "#93C5FD";
      ctx.textAlign = "start";
      ctx.textBaseline = "top";
      defLines.forEach((ln, idx) => {
        ctx.fillText(`↳ ${ln}`, s.x + 8, startY + idx * (subFontSize + 5));
      });
    } else if (s.type === "rect" || s.type === "circle") {
      const cx = s.type === "circle" ? s.x1 : s.x1 + (s.x2 - s.x1) / 2;
      const cy = s.type === "circle" ? s.y1 + 18 : s.y1 + (s.y2 - s.y1) / 2 + 18;
      ctx.fillStyle = isWhite ? "#475569" : "#93C5FD";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      defLines.forEach((ln, idx) => {
        ctx.fillText(ln, cx, cy + idx * (subFontSize + 4));
      });
    }
    ctx.restore();
  });

  // 2. رسم نبضات التيار وتدفق البيانات المتحركة في الأسلاك والروابط (Animated Signal Particles)
  if (WBState.simFlowActive) {
    const tBase = (WBState.simParticleOffset % 100) / 100;
    WBState.nodes.forEach(nd => {
      if (nd.hidden || isNodeHiddenByCollapse(nd) || !nd.parentId) return;
      const parent = WBState.nodes.find(p => p.id === nd.parentId && !p.hidden);
      if (!parent || parent.logicState === 0) return;

      const sx = parent.x, sy = parent.y + parent.h / 2;
      const ex = nd.x, ey = nd.y - nd.h / 2;

      [0, 0.33, 0.66].forEach(offset => {
        const t = (tBase + offset) % 1;
        const px = sx + (ex - sx) * t;
        const py = sy + (ey - sy) * t;
        ctx.save();
        ctx.fillStyle = "#00F0FF";
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#00F0FF";
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    });
  }

  // 3. رسم خطوط قلم الحبر المتلاشي (Vanishing Laser Ink — يختفي بعد 4 ثوانٍ)
  const now = Date.now();
  WBState.vanishingStrokes = (WBState.vanishingStrokes || []).filter(vs => now - vs.createdAt < 4000);
  WBState.vanishingStrokes.forEach(vs => {
    const age = now - vs.createdAt;
    const alpha = Math.max(0, 1 - age / 4000);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = vs.color || "#00F0FF";
    ctx.shadowBlur = 16;
    ctx.shadowColor = vs.color || "#00F0FF";
    ctx.lineWidth = (vs.size || 4) * 1.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (vs.points.length > 0) {
      ctx.beginPath();
      ctx.moveTo(vs.points[0].x, vs.points[0].y);
      vs.points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    }
    ctx.restore();
  });

  ctx.restore();
};

function startWB4AnimationLoop(ctx, canvas) {
  if (WBState.simAnimFrameId) cancelAnimationFrame(WBState.simAnimFrameId);
  const step = () => {
    if (!document.getElementById("smart-whiteboard-canvas")) return;
    if (WBState.simFlowActive || (WBState.vanishingStrokes && WBState.vanishingStrokes.length > 0)) {
      WBState.simParticleOffset = (WBState.simParticleOffset + 1.8) % 100;
      renderWhiteboardScene(ctx, canvas.width, canvas.height);
      WBState.simAnimFrameId = requestAnimationFrame(step);
    }
  };
  WBState.simAnimFrameId = requestAnimationFrame(step);
}

/* ============================================================================
   7. HOOK ALL 11 SUPER-FEATURES INTO WHITEBOARD MODAL & POINTER EVENTS
   ============================================================================ */
const _wb3BaseOpenModal = openSmartWhiteboardModal;
openSmartWhiteboardModal = function(autoStartPrivateRecord = false) {
  injectWB4SuperStyles();
  _wb3BaseOpenModal(autoStartPrivateRecord);

  const canvas = document.getElementById("smart-whiteboard-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const redraw = () => renderWhiteboardScene(ctx, canvas.width, canvas.height);

  // إضافة خيار خريطة كارنو والجدول الذكي في قائمة الرموز الهندسية
  const symSelect = document.getElementById("wb2-eng-symbol-picker");
  if (symSelect && !symSelect.querySelector('option[value="kmap_4"]')) {
    symSelect.insertAdjacentHTML("beforeend", `
      <optgroup label="🚀 أدوات متقدمة (K-Map وجداول)">
        <option value="kmap_4">🔢 خريطة كارنو التفاعلية (4-Var K-Map)</option>
        <option value="smart_table">📊 جدول / مصفوفة بيانات (Smart Table)</option>
      </optgroup>
    `);
  }

  // حقن شريط القوى الخارقة والمحاكاة (Super-Powers & Simulation Bar)
  const ribbons = document.querySelectorAll(".wb3-ribbon-bar");
  const secondRibbon = ribbons[1];
  if (secondRibbon && !document.getElementById("wb4-super-bar")) {
    const superBar = document.createElement("div");
    superBar.id = "wb4-super-bar";
    superBar.className = "wb4-super-bar";
    superBar.innerHTML = `
      <div class="wb3-pill-group">
        <span class="badge badge-emerald"><i class="fa-solid fa-bolt"></i> أدوات القوى الخارقة 4.0:</span>
        <button type="button" id="btn-wb4-sim-flow" class="wb-tool-btn ${WBState.simFlowActive ? "wb4-sim-active-btn" : ""}" title="تشغيل محاكي الدوائر المنطقية والكهربائية وسريان التيار في الأسلاك">
          <i class="fa-solid fa-microchip"></i> محاكي الدوائر والتيار ⚡
        </button>
        <button type="button" id="btn-wb4-vanish-pen" class="wb-tool-btn ${WBState.tool === "vanish_pen" ? "active" : ""}" title="قلم الحبر المتلاشي: ارسم أو حدد أي نقطة وسيختفي الخط تلقائياً بعد 4 ثوانٍ">
          <i class="fa-solid fa-wand-sparkles gold-text"></i> قلم متلاشي (4ث)
        </button>
        <button type="button" id="btn-wb4-collapse-branch" class="wb-tool-btn" title="طي أو توسيع الفروع الفرعية للعقدة المحددة حالياً (+ / -)">
          <i class="fa-solid fa-folder-tree gold-text"></i> طي/توسيع الفروع (+/-)
        </button>
        <button type="button" id="btn-wb4-code-to-flow" class="wb-tool-btn" title="تحويل أي كود برمجي إلى مخطط تدفق Flowchart تلقائياً">
          <i class="fa-solid fa-code-commit gold-text"></i> كود ➔ Flowchart
        </button>
        <button type="button" id="btn-wb4-run-code-node" class="wb-tool-btn" title="تشغيل بلوك الكود المحدد وإظهار الناتج تحته مباشرة">
          <i class="fa-solid fa-play gold-text"></i> تشغيل الكود ▶️
        </button>
      </div>

      <div class="wb3-pill-group">
        <button type="button" id="btn-wb4-voice-pin" class="wb-tool-btn" title="تسجيل دبوس صوتي وتثبيته على السبورة">
          <i class="fa-solid fa-microphone-lines gold-text"></i> + دبوس صوتي 🎤
        </button>
        <button type="button" id="btn-wb4-insert-kmap" class="wb-tool-btn" title="إدراج خريطة كارنو التفاعلية 4x4">
          <i class="fa-solid fa-table-cells gold-text"></i> + خريطة K-Map
        </button>
        <button type="button" id="btn-wb4-insert-table" class="wb-tool-btn" title="إدراج جدول أو مصفوفة بيانات">
          <i class="fa-solid fa-table gold-text"></i> + جدول
        </button>
        <button type="button" id="btn-wb4-live-quiz" class="wb-tool-btn" title="إظهار سؤال اختبار تفاعلي بعداد 15 ثانية فوق السبورة">
          <i class="fa-solid fa-circle-question gold-text"></i> + سؤال كويز مباشر
        </button>
        <button type="button" id="btn-wb4-handout-pdf" class="btn btn-xs btn-gold" title="تصدير مذكرة المحاضرة الشاملة (المخطط + جدول التعريفات) كملف PDF">
          <i class="fa-solid fa-file-pdf"></i> مذكرة المحاضرة PDF
        </button>
      </div>
    `;
    secondRibbon.insertAdjacentElement("afterend", superBar);
  }

  // إضافة قلم التلاشي وسؤال الكويز في شريط المحاضر العائم أيضاً
  const lecDock = document.getElementById("wb3-lecture-floating-dock");
  if (lecDock && !document.getElementById("btn-wb4-lec-vanish")) {
    const refBtn = document.getElementById("btn-wb3-lecture-light");
    if (refBtn) {
      refBtn.insertAdjacentHTML("beforebegin", `
        <button type="button" id="btn-wb4-lec-vanish" class="wb-tool-btn" title="قلم الشرح المتلاشي بعد 4 ثوانٍ"><i class="fa-solid fa-wand-sparkles gold-text"></i> قلم متلاشي</button>
        <button type="button" id="btn-wb4-lec-quiz" class="wb-tool-btn" title="إطلاق سؤال تفاعلي للطلاب"><i class="fa-solid fa-circle-question gold-text"></i> كويز</button>
      `);
      document.getElementById("btn-wb4-lec-vanish").onclick = () => document.getElementById("btn-wb4-vanish-pen")?.click();
      document.getElementById("btn-wb4-lec-quiz").onclick = launchOnBoardQuizCard;
    }
  }

  // ربط أزرار شريط القوى الخارقة
  document.getElementById("btn-wb4-sim-flow")?.addEventListener("click", (e) => {
    WBState.simFlowActive = !WBState.simFlowActive;
    e.currentTarget.classList.toggle("wb4-sim-active-btn", WBState.simFlowActive);
    if (WBState.simFlowActive) {
      startWB4AnimationLoop(ctx, canvas);
      toast("⚡ محاكي الدوائر المنطقية والتيار نشط! اضغط على أي مفتاح أو بوابة لتبديل حالتها (0 / 1)");
    } else {
      redraw();
    }
  });

  document.getElementById("btn-wb4-vanish-pen")?.addEventListener("click", (e) => {
    WBState.tool = "vanish_pen";
    document.querySelectorAll("[data-wb-tool]").forEach(b => b.classList.remove("active"));
    e.currentTarget.classList.add("active");
    toast("✨ قلم التلاشي السريع مفعل: أي خط ترسمه سيختفي تلقائياً بعد 4 ثوانٍ!");
  });

  document.getElementById("btn-wb4-collapse-branch")?.addEventListener("click", () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (!nd) return;
    nd.collapsed = !nd.collapsed;
    redraw();
    toast(nd.collapsed ? `📂 تم طي وإخفاء الفروع الفرعية لـ "${nd.text}"` : `🌿 تم توسيع وإظهار جميع فروع "${nd.text}"`);
  });

  document.getElementById("btn-wb4-code-to-flow")?.addEventListener("click", () => openCodeToFlowchartModal(ctx, canvas, redraw));

  document.getElementById("btn-wb4-run-code-node")?.addEventListener("click", () => {
    const nd = WBState.nodes.find(n => n.id === WBState.selectedNodeId);
    if (!nd) {
      toast("حدد عقدة كود برمجي أولاً لتشغيلها!", "error");
      return;
    }
    const codeToRun = nd.val || nd.text;
    try {
      const logs = [];
      const customConsole = { log: (...args) => logs.push(args.join(" ")) };
      const res = Function("console", `"use strict"; ${codeToRun}`)(customConsole);
      const out = logs.length ? logs.join(" | ") : (res !== undefined ? String(res) : "Executed OK ✅");
      nd.val = `▶ Output: ${out}`;
      redraw();
      toast(`▶ ناتج تشغيل الكود: ${out}`);
    } catch (err) {
      nd.val = `❌ Error: ${err.message}`;
      redraw();
    }
  });

  document.getElementById("btn-wb4-voice-pin")?.addEventListener("click", () => toggleVoicePinRecording(ctx, canvas, redraw));

  document.getElementById("btn-wb4-insert-kmap")?.addEventListener("click", () => {
    pushWB2Undo();
    const cx = (canvas.width / 2 - WBState.panX) / WBState.zoom;
    const cy = (canvas.height / 2 - WBState.panY) / WBState.zoom;
    WBState.nodes.push({
      id: "kmap_" + Date.now(),
      text: "4-Var Karnaugh Map (AB \\ CD)",
      shape: "kmap_4",
      kmapCells: [0, 1, 1, 0, 0, 1, "X", 0, 0, 0, 1, 1, 0, 0, 0, 0],
      x: cx,
      y: cy,
      w: 230,
      h: 195,
      color: "#D4A72C",
      parentId: null
    });
    redraw();
    toast("🔢 تم إدراج خريطة كارنو التفاعلية! اضغط دبل كليك على أي خلية داخلها لتغييرها بين (0 ➔ 1 ➔ X)");
  });

  document.getElementById("btn-wb4-insert-table")?.addEventListener("click", () => {
    const rInput = prompt("📊 اكتب صفوف الجدول (افصل بين الأعمدة بفاصلة , وبين الصفوف بعلامة | ):", "المتغير, الدخل, الخرج | X1, 12V, 5V | X2, 24V, 12V");
    if (!rInput) return;
    const tableRows = rInput.split("|").map(row => row.split(/[،,]/).map(c => c.trim()));
    pushWB2Undo();
    const cx = (canvas.width / 2 - WBState.panX) / WBState.zoom;
    const cy = (canvas.height / 2 - WBState.panY) / WBState.zoom;
    WBState.nodes.push({
      id: "tbl_" + Date.now(),
      text: "📊 جدول المقارنة الهندسي",
      shape: "smart_table",
      tableRows,
      x: cx,
      y: cy,
      w: 240,
      h: 140,
      color: "#38BDF8",
      parentId: null
    });
    redraw();
  });

  document.getElementById("btn-wb4-live-quiz")?.addEventListener("click", launchOnBoardQuizCard);
  document.getElementById("btn-wb4-handout-pdf")?.addEventListener("click", () => exportCompleteLectureHandoutPDF(canvas));
};

// ربط أحداث الماوس والدبل كليك الذكي (التعريف تحت النص + خريطة كارنو + الدبابيس الصوتية + قلم التلاشي)
const _wb3BasePointerEvents = bindWB3CanvasPointerEvents;
bindWB3CanvasPointerEvents = function(ctx, canvas, redraw) {
  _wb3BasePointerEvents(ctx, canvas, redraw);

  let activeVanishStroke = null;
  const origDown = canvas.onmousedown;
  const origMove = canvas.onmousemove;
  const origUp = window.onmouseup;

  canvas.onmousedown = (e) => {
    const r = canvas.getBoundingClientRect();
    const wx = (e.clientX - r.left - WBState.panX) / WBState.zoom;
    const wy = (e.clientY - r.top - WBState.panY) / WBState.zoom;

    if (WBState.tool === "vanish_pen") {
      activeVanishStroke = {
        color: document.getElementById("wb-color")?.value || "#00F0FF",
        size: Number(document.getElementById("wb-size")?.value || 5),
        points: [{ x: wx, y: wy }],
        createdAt: Date.now()
      };
      WBState.vanishingStrokes.push(activeVanishStroke);
      startWB4AnimationLoop(ctx, canvas);
      return;
    }

    if (origDown) origDown(e);
  };

  canvas.onmousemove = (e) => {
    if (WBState.tool === "vanish_pen" && activeVanishStroke) {
      const r = canvas.getBoundingClientRect();
      const wx = (e.clientX - r.left - WBState.panX) / WBState.zoom;
      const wy = (e.clientY - r.top - WBState.panY) / WBState.zoom;
      activeVanishStroke.points.push({ x: wx, y: wy });
      activeVanishStroke.createdAt = Date.now();
      return;
    }
    if (origMove) origMove(e);
  };

  window.addEventListener("mouseup", () => {
    activeVanishStroke = null;
  });

  // نظام الدبل كليك الذكي الشامل (تعريف تحت النص + تشغيل الدبوس الصوتي + تبديل خلايا K-Map + تبديل المفاتيح المنطقية)
  canvas.ondblclick = async (e) => {
    const r = canvas.getBoundingClientRect();
    const wx = (e.clientX - r.left - WBState.panX) / WBState.zoom;
    const wy = (e.clientY - r.top - WBState.panY) / WBState.zoom;

    for (let i = WBState.nodes.length - 1; i >= 0; i--) {
      const nd = WBState.nodes[i];
      if (nd.hidden || isNodeHiddenByCollapse(nd)) continue;

      if (wx >= nd.x - nd.w / 2 && wx <= nd.x + nd.w / 2 && wy >= nd.y - nd.h / 2 && wy <= nd.y + nd.h / 2) {
        WBState.selectedNodeId = nd.id;

        // 1. إذا كانت العقدة دبوساً صوتياً: يشغل التسجيل الصوتي فوراً!
        if (nd.shape === "voice_pin" && WBState.voicePinsAudioMap[nd.id]) {
          const audio = new Audio(WBState.voicePinsAudioMap[nd.id]);
          audio.play();
          toast(`🔊 جاري تشغيل الشرح الصوتي: "${nd.text}"`);
          return;
        }

        // 2. إذا كانت العقدة خريطة كارنو 4x4: يبدل الخلية التي ضغطت عليها بين (0 ➔ 1 ➔ X)!
        if (nd.shape === "kmap_4") {
          const localX = wx - (nd.x - nd.w / 2 + 44);
          const localY = wy - (nd.y - nd.h / 2 + 42);
          const colIdx = Math.floor(localX / 40);
          const rowIdx = Math.floor(localY / 33);
          if (colIdx >= 0 && colIdx < 4 && rowIdx >= 0 && rowIdx < 4) {
            const cellIdx = rowIdx * 4 + colIdx;
            const cycle = [0, 1, "X"];
            const curVal = nd.kmapCells[cellIdx];
            nd.kmapCells[cellIdx] = cycle[(cycle.indexOf(curVal) + 1) % cycle.length];
            redraw();
            return;
          }
        }

        // 3. إذا كان محاكي الدوائر نشطاً وضغط على مفتاح أو مدخل منطقي: يبدله بين 0 و 1!
        if (WBState.simFlowActive && (nd.shape === "elec_sw" || !nd.parentId)) {
          nd.logicState = nd.logicState ? 0 : 1;
          redraw();
          toast(`⚡ تم تبديل حالة (${nd.text}) إلى: ${nd.logicState}`);
          return;
        }

        // 4. الميزة الأساسية: دبل كليك على أي عقدة = كتابة تعريفها ليظهر بخط صغير تحتها!
        if (e.shiftKey) {
          const newTitle = prompt("✏️ تعديل العنوان الرئيسي:", nd.text);
          if (newTitle !== null && newTitle.trim()) nd.text = newTitle.trim();
        } else {
          const def = prompt(
            `📖 اكتب التعريف أو الشرح ليظهر بخط صغير تحت "${nd.text}":\n(💡 اكتب AI ليولده الذكاء الاصطناعي تلقائياً، أو اضغط Shift+دبل كليك لتعديل العنوان الرئيسي)`,
            nd.val || ""
          );
          if (def !== null) {
            if (def.trim().toLowerCase() === "ai") {
              toast(`🤖 جاري توليد تعريف علمي مختصر لـ "${nd.text}"...`, "info");
              const aiReply = await B().askAI?.(`اكتب تعريفاً علمياً مختصراً جداً (في سطر واحد لا يتجاوز 12 كلمة) للمصطلح: "${nd.text}"`);
              nd.val = String(aiReply || "").replace(/\n+/g, " ").trim().slice(0, 95);
            } else {
              nd.val = def.trim();
            }
          }
        }
        autoSaveWB2Board();
        redraw();
        return;
      }
    }

    // فحص إذا ضغط مرتين على نص حر أو مستطيل أو دائرة لكتابة تعريف تحته بخط صغير
    for (let i = WBState.strokes.length - 1; i >= 0; i--) {
      const s = WBState.strokes[i];
      if (s.hidden) continue;
      let hit = false;
      if (s.type === "text") {
        const w = Math.max(70, (s.text || "").length * (s.size * 2.8));
        const h = Math.max(32, s.size * 5.5);
        if (wx >= s.x - 12 && wx <= s.x + w + 20 && wy >= s.y - h && wy <= s.y + 45) hit = true;
      } else if (s.type === "rect") {
        const minX = Math.min(s.x1, s.x2) - 8, maxX = Math.max(s.x1, s.x2) + 8;
        const minY = Math.min(s.y1, s.y2) - 8, maxY = Math.max(s.y1, s.y2) + 8;
        if (wx >= minX && wx <= maxX && wy >= minY && wy <= maxY) hit = true;
      } else if (s.type === "circle") {
        const rad = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
        if (Math.hypot(wx - s.x1, wy - s.y1) <= rad + 10) hit = true;
      }

      if (hit) {
        WBState.selectedStrokeIdx = i;
        const mainTitle = s.type === "text" ? s.text : (s.innerText || "");
        if (!mainTitle || e.shiftKey) {
          const nextMain = prompt("✏️ اكتب العنوان الأساسي:", mainTitle);
          if (nextMain !== null) {
            if (s.type === "text") s.text = nextMain.trim();
            else s.innerText = nextMain.trim();
          }
        } else {
          const def = prompt(
            `📖 تعريف "${mainTitle}" (سيظهر بخط صغير تحت الكلمة مباشرة):\n(💡 اكتب AI لتوليد التعريف تلقائياً، أو اضغط Shift+دبل كليك لتعديل الكلمة نفسها)`,
            s.subText || ""
          );
          if (def !== null) {
            pushWB2Undo();
            if (def.trim().toLowerCase() === "ai") {
              toast(`🤖 جاري تعريف "${mainTitle}" بالذكاء الاصطناعي...`, "info");
              const aiReply = await B().askAI?.(`اكتب تعريفاً مختصراً جداً (في سطر واحد لا يتجاوز 12 كلمة) للمصطلح: "${mainTitle}"`);
              s.subText = String(aiReply || "").replace(/\n+/g, " ").trim().slice(0, 95);
            } else {
              s.subText = def.trim();
            }
          }
        }
        autoSaveWB2Board();
        redraw();
        return;
      }
    }
  };
};
/* ============================================================================
   STANDALONE VS CODE PRO IDE LAUNCHER (OPENS ./ide/index.html)
   ============================================================================ */
function openStandaloneVSCodeIDE() {
  window.location.href = "./ide/index.html";
}

function bootStandaloneIDELinks() {
  const nav = document.querySelector(".sidebar-nav");
  if (nav && !nav.querySelector('[data-view="vscode-ide"]')) {
    const btn = document.createElement("button");
    btn.className = "nav-item";
    btn.dataset.view = "vscode-ide";
    btn.title = "فتح استوديو البرمجة المستقل (VS Code Pro IDE)";
    btn.innerHTML = `<i class="fa-solid fa-laptop-code gold-text"></i> <span>استوديو البرمجة (VS Code)</span>`;
    btn.onclick = openStandaloneVSCodeIDE;
    nav.appendChild(btn);
  }

  const dock = document.getElementById("os-super-topbar-dock");
  if (dock && !document.getElementById("btn-top-vscode-ide")) {
    const topBtn = document.createElement("button");
    topBtn.type = "button";
    topBtn.id = "btn-top-vscode-ide";
    topBtn.className = "super-dock-pill";
    topBtn.title = "فتح محرر الأكواد المستقل (VS Code Studio)";
    topBtn.innerHTML = `<i class="fa-solid fa-code gold-text"></i> <span>VS Code IDE</span>`;
    topBtn.onclick = openStandaloneVSCodeIDE;
    dock.insertAdjacentElement("afterbegin", topBtn);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => setTimeout(bootStandaloneIDELinks, 350));
} else {
  setTimeout(bootStandaloneIDELinks, 200);
}
