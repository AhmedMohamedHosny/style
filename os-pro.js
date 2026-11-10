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

let topbarScreenRecStream = null;
let topbarScreenRecorder = null;
let topbarScreenChunks = [];
let topbarRadioPlaying = false;

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

  // حقن شريط الأدوات الخارق في المساحة الفارغة بالشريط العلوي
  if (topbarEnd && !document.getElementById("os-super-topbar-dock")) {
    const dock = document.createElement("div");
    dock.id = "os-super-topbar-dock";
    dock.className = "os-super-topbar-dock";

    const gymProf = OSProStore.get("gym_profile_v4", { waterCups: 6 });

    dock.innerHTML = `
      <button type="button" id="btn-top-cairo-radio" class="super-dock-pill" title="تشغيل/إيقاف إذاعة القرآن الكريم من القاهرة في الخلفية مباشرة">
        <i class="fa-solid fa-radio gold-text"></i>
        <span>إذاعة القاهرة</span>
      </button>

      <button type="button" id="btn-top-whiteboard" class="btn-icon gold-glow" title="السبورة الهندسية الذكية للرسم والتخطيط الحر (Whiteboard)">
        <i class="fa-solid fa-chalkboard-user"></i>
      </button>

      <button type="button" id="btn-top-sci-calc" class="btn-icon" title="الآلة الحاسبة العلمية والبرمجية السريعة">
        <i class="fa-solid fa-calculator"></i>
      </button>

      <button type="button" id="btn-top-screen-rec" class="btn-icon" title="تسجيل الشاشة فيديو بضغطة واحدة (Screen Recorder)">
        <i class="fa-solid fa-video"></i>
      </button>

      <button type="button" id="btn-top-water-quick" class="super-dock-pill" title="اضغط لتسجيل شرب كوب مياه جديد فوراً">
        <span>💧</span>
        <strong id="top-water-count-lbl">${gymProf.waterCups || 6}/10</strong>
      </button>

      <button type="button" id="btn-top-telemetry" class="super-dock-pill" title="رادار حالة الجهاز والبطارية وسرعة الاتصال">
        <i class="fa-solid fa-microchip gold-text"></i>
        <span id="top-battery-lbl">⚡ 100%</span>
      </button>
    `;

    topbarEnd.prepend(dock);
    bindSuperTopbarDockEvents();
  }

  const themeBtn = document.getElementById("btn-theme-toggle");
  if (themeBtn) {
    themeBtn.title = "اختيار الثيم (Midnight Gold / Pure Light / Pure Black / Forest)";
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
      background: rgba(15, 22, 38, 0.55);
      border: 1px solid rgba(212, 167, 44, 0.28);
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
      padding: 5px 11px;
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
    .btn-icon.rec-active {
      background: rgba(239, 68, 68, 0.22) !important;
      border-color: #ef4444 !important;
      color: #ef4444 !important;
      animation: blinkDot 1s infinite;
    }
    /* إصلاح وضوح نصوص البانر الترحيبي في الثيم النهاري الفاتح */
    html[data-theme="pure-light"] .welcome-banner,
    html[data-theme="light"] .welcome-banner {
      color: #f8fafc !important;
    }
    html[data-theme="pure-light"] .welcome-banner .briefing-content,
    html[data-theme="light"] .welcome-banner .briefing-content {
      color: #e2e8f0 !important;
    }
    .whiteboard-canvas-box {
      width: 100%;
      height: 410px;
      background: #0b101e;
      border: 2px solid var(--gold-primary);
      border-radius: 16px;
      cursor: crosshair;
      touch-action: none;
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
      transition: all 0.15s ease;
    }
    .calc-btn:hover {
      border-color: var(--gold-primary);
      background: rgba(212, 167, 44, 0.2);
    }
  `;
  document.head.appendChild(st);
}

function bindSuperTopbarDockEvents() {
  // 1. تشغيل وإيقاف إذاعة القرآن الكريم من القاهرة مباشرة من الشريط العلوي
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

  // 2. السبورة الهندسية الذكية (Interactive Whiteboard)
  document.getElementById("btn-top-whiteboard")?.addEventListener("click", openSmartWhiteboardModal);

  // 3. الآلة الحاسبة العلمية والبرمجية السريعة
  document.getElementById("btn-top-sci-calc")?.addEventListener("click", openScientificCalcModal);

  // 4. مسجل الشاشة الفوري (Screen Video Recorder)
  const recBtn = document.getElementById("btn-top-screen-rec");
  if (recBtn) {
    recBtn.onclick = async () => {
      if (topbarScreenRecorder && topbarScreenRecorder.state === "recording") {
        topbarScreenRecorder.stop();
        topbarScreenRecStream?.getTracks().forEach(t => t.stop());
        recBtn.classList.remove("rec-active");
        return;
      }
      try {
        topbarScreenRecStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        topbarScreenRecorder = new MediaRecorder(topbarScreenRecStream);
        topbarScreenChunks = [];
        topbarScreenRecorder.ondataavailable = e => {
          if (e.data.size > 0) topbarScreenChunks.push(e.data);
        };
        topbarScreenRecorder.onstop = () => {
          const blob = new Blob(topbarScreenChunks, { type: "video/webm" });
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = `my-life-os-screen-record-${today()}.webm`;
          a.click();
          recBtn.classList.remove("rec-active");
          toast("تم حفظ وتحميل تسجيل الشاشة بنجاح! 🎥✅");
        };
        topbarScreenRecorder.start();
        recBtn.classList.add("rec-active");
        toast("🔴 بدأ تسجيل الشاشة! اضغط على أيقونة الكاميرا مرة أخرى للإيقاف والحفظ", "info");
      } catch (err) {
        toast("تم إلغاء مشاركة الشاشة", "info");
      }
    };
  }

  // 5. عداد المياه السريع بضغطة واحدة
  document.getElementById("btn-top-water-quick")?.addEventListener("click", () => {
    const prof = OSProStore.get("gym_profile_v4", { waterCups: 6 });
    prof.waterCups = ((Number(prof.waterCups) || 0) % 12) + 1;
    OSProStore.set("gym_profile_v4", prof);
    const lbl = document.getElementById("top-water-count-lbl");
    if (lbl) lbl.textContent = `${prof.waterCups}/10`;
    if (document.getElementById("view-health")?.classList.contains("active")) {
      renderHealthView();
    }
    toast(`بالهنا والشفا! شربت ${prof.waterCups} أكواب مياه اليوم 💧`);
  });

  // 6. رادار حالة الجهاز والبطارية (Live System Telemetry)
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

// نافذة السبورة الهندسية التفاعلية (Smart Whiteboard)
function openSmartWhiteboardModal() {
  B().openFormModal("🎨 السبورة الهندسية الذكية للرسم والشرح الحر (Smart Whiteboard)", `
    <div class="flex-between mb-2" style="flex-wrap:wrap; gap:8px;">
      <div class="filters-row">
        <label class="small-muted">لون القلم:</label>
        <input type="color" id="wb-color" value="#D4A72C" style="width:42px; height:32px; padding:2px; cursor:pointer;" />
        <label class="small-muted">السمك:</label>
        <input type="range" id="wb-size" min="2" max="18" value="4" style="width:90px;" />
        <button type="button" id="btn-wb-eraser" class="btn btn-xs btn-outline"><i class="fa-solid fa-eraser"></i> ممحاة</button>
      </div>
      <div class="filters-row">
        <button type="button" id="btn-wb-clear" class="btn btn-xs btn-danger"><i class="fa-solid fa-trash"></i> مسح السبورة</button>
        <button type="button" id="btn-wb-download" class="btn btn-xs btn-gold"><i class="fa-solid fa-download"></i> حفظ كصورة PNG</button>
      </div>
    </div>
    <canvas id="smart-whiteboard-canvas" class="whiteboard-canvas-box"></canvas>
  `, async () => {});

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  const canvas = document.getElementById("smart-whiteboard-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.clientWidth || 860;
  canvas.height = 410;

  ctx.fillStyle = "#0b101e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let drawing = false;
  let isEraser = false;

  const getPos = (e) => {
    const r = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return { x: clientX - r.left, y: clientY - r.top };
  };

  canvas.onmousedown = (e) => {
    drawing = true;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  canvas.onmousemove = (e) => {
    if (!drawing) return;
    const { x, y } = getPos(e);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = Number(document.getElementById("wb-size")?.value || 4);
    ctx.strokeStyle = isEraser ? "#0b101e" : (document.getElementById("wb-color")?.value || "#D4A72C");
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  window.addEventListener("mouseup", () => { drawing = false; });

  document.getElementById("btn-wb-eraser").onclick = (e) => {
    isEraser = !isEraser;
    e.currentTarget.classList.toggle("btn-gold", isEraser);
  };
  document.getElementById("btn-wb-clear").onclick = () => {
    ctx.fillStyle = "#0b101e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  document.getElementById("btn-wb-download").onclick = () => {
    const a = document.createElement("a");
    a.download = `whiteboard-sketch-${today()}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
    toast("تم تحميل رسمة السبورة كصورة PNG! 🎨");
  };
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
   MODULE C (FLAGSHIP V4): MULTI-STEP WIZARD, HOME VS GYM, 3D ANIMATED COACH,
   MASSIVE EXERCISE LIBRARY, OPTIONAL NUTRITION & TASK/CALENDAR SCHEDULER
   ============================================================================ */

function injectGymV4Styles() {
  if (document.getElementById("gym-v4-pro-styles")) return;
  const st = document.createElement("style");
  st.id = "gym-v4-pro-styles";
  st.textContent = `
    /* 1. معالج الإعداد المتدرج (4-Step Full Wizard) */
    .gym-wizard-shell {
      max-width: 780px;
      margin: 10px auto;
      background: linear-gradient(160deg, rgba(15, 22, 38, 0.96), rgba(8, 12, 22, 0.99));
      border: 1.5px solid rgba(212, 167, 44, 0.45);
      border-radius: 26px;
      padding: 34px 32px;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(212, 167, 44, 0.12);
      position: relative;
      overflow: hidden;
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
      transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .wizard-big-card:hover {
      transform: translateY(-5px);
      border-color: rgba(212, 167, 44, 0.6);
    }
    .wizard-big-card.active {
      border-color: #D4A72C;
      background: linear-gradient(145deg, rgba(212, 167, 44, 0.2), rgba(25, 184, 137, 0.1));
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7), 0 0 28px rgba(212, 167, 44, 0.3);
    }
    .wizard-big-card img {
      width: 115px;
      height: 115px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #D4A72C;
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

    /* 2. مشغل التمرين التفاعلي بالمدرب المتحرك 3D (Live Animated Human Trainer) */
    .live-workout-stage {
      background: radial-gradient(circle at 50% 30%, #162238 0%, #070b14 100%);
      border: 2px solid #19B889;
      border-radius: 24px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(25, 184, 137, 0.2);
    }
    .trainer-3d-box {
      width: 240px;
      height: 260px;
      margin: 0 auto;
      background: radial-gradient(circle, rgba(25, 184, 137, 0.14) 0%, transparent 70%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    /* حركات المدرب التفاعلي حسب نوع التمرين */
    .anim-human-svg {
      width: 200px;
      height: 240px;
      filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
    }
    .anim-mode-squat .human-upper {
      animation: squatMove 1.8s ease-in-out infinite;
    }
    .anim-mode-pushup {
      transform: rotate(65deg);
    }
    .anim-mode-pushup .human-body-all {
      animation: pushupMove 1.6s ease-in-out infinite;
    }
    .anim-mode-jump .human-arms {
      animation: jumpingArms 1.1s ease-in-out infinite;
      transform-origin: 100px 75px;
    }
    .anim-mode-jump .human-body-all {
      animation: jumpingBounce 1.1s ease-in-out infinite;
    }
    .anim-mode-core .human-upper {
      animation: crunchMove 1.7s ease-in-out infinite;
      transform-origin: 100px 135px;
    }
    .anim-mode-pull .human-arms {
      animation: pullArmsMove 1.6s ease-in-out infinite;
      transform-origin: 100px 80px;
    }
    @keyframes squatMove {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(28px); }
    }
    @keyframes pushupMove {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(18px); }
    }
    @keyframes jumpingArms {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(-0.85) translateY(-10px); }
    }
    @keyframes jumpingBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-14px); }
    }
    @keyframes crunchMove {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(18deg) translateY(8px); }
    }
    @keyframes pullArmsMove {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-16px); }
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
  `;
  document.head.appendChild(st);
}

/* ============================================================================
   1. 12 HOME WORKOUT EXERCISES (BODYWEIGHT ONLY — NO GYM MACHINES!)
   ============================================================================ */
const HOME_12_EXERCISES = [
  { id: "hm_1", name: "1. Jumping Jacks • قفز فتح وضم لتسخين الجسم بالكامل", cat: "تسخين وكارديو", reps: "45 ثانية متواصلة", cals: "45 kcal", anim: "jump", maleDesc: "قف مستقيماً، اقفز مع فتح القدمين ورفع الذراعين عالياً فوق الرأس ثم العودة برشاقة.", femaleDesc: "حركة هوائية ممتازة لتنشيط الدورة الدموية وحرق الدهون وشد الجسم بالكامل.", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80" },
  { id: "hm_2", name: "2. Standard Push-Ups • تمرين الضغط الأساسي للصدر والذراعين", cat: "علوي وصدر", reps: "3 جولات × 12-15 عدة", cals: "60 kcal", anim: "pushup", maleDesc: "ضع يديك باتساع الكتفين، حافظ على استقامة ظهرك، انزل بصدرك حتى يقترب من الأرض ثم ادفع بقوة.", femaleDesc: "يمكنك أداؤه كاملًا أو مع تثبيت الركبتين على الأرض لشد الصدر والذراعين والأكتاف.", img: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80" },
  { id: "hm_3", name: "3. Bodyweight Squats • سكوات بوزن الجسم للأرجل والأرداف", cat: "سفلي وأرداف", reps: "4 جولات × 15-20 عدة", cals: "75 kcal", anim: "squat", maleDesc: "افتح قدميك بعرض الكتفين، انزل بالحوض للخلف والأسفل كأنك تجلس على كرسي مع إبقاء الصدر مرفوعاً.", femaleDesc: "التمرين الأول عالمياً لشد ونحت الأفخاذ والأرداف في المنزل بدون أي معدات.", img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80" },
  { id: "hm_4", name: "4. Alternating Lunges • طعن أمامي تبادلي لنحت الأرجل", cat: "سفلي وأرداف", reps: "3 جولات × 12 عدة لكل رجل", cals: "70 kcal", anim: "squat", maleDesc: "تقدم خطوة للأمام واثنِ الركبتين بزاوية 90 درجة دون أن تلامس الركبة الخلفية الأرض ثم ارجع.", femaleDesc: "يركز بعمق على شد العضلة الأمامية والأرداف وتحسين التوازن والمرونة.", img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=800&q=80" },
  { id: "hm_5", name: "5. Incline / Pike Push-Ups • ضغط مائل لتقوية الأكتاف في البيت", cat: "علوي وأكتاف", reps: "3 جولات × 10-12 عدة", cals: "55 kcal", anim: "pushup", maleDesc: "ارفع الحوض للأعلى على شكل حرف V مقلوب وانزل برأسك بين يديك لتشغيل عضلات الكتف الأمامي والجانبي.", femaleDesc: "يقوي الأكتاف وأعلى الظهر ويمنح القوام العلوي تناسقاً رائعاً في المنزل.", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80" },
  { id: "hm_6", name: "6. Glute Bridges • جسر الأرضية لشد الأرداف وأسفل الظهر", cat: "سفلي وأرداف", reps: "4 جولات × 15-20 عدة", cals: "65 kcal", anim: "core", maleDesc: "استلقِ على ظهرك مع ثني الركبتين، ارفع الحوض للأعلى واعصر عضلات المؤخرة وأسفل الظهر لمدة ثانية.", femaleDesc: "أقوى تمرين منزلي لعزل ورفع وشد عضلات الأرداف وتقوية أسفل الظهر.", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80" },
  { id: "hm_7", name: "7. Tricep Chair Dips • متوازي على حافة الكرسي للترايسبس", cat: "علوي وذراعين", reps: "3 جولات × 12-15 عدة", cals: "55 kcal", anim: "pull", maleDesc: "ثبّت يديك على حافة كرسي ثابت خلفك، انزل بجسمك بثني الكوعين بزاوية 90 درجة ثم ادفع للأعلى.", femaleDesc: "يقضي تماماً على ترهلات خلف الذراعين ويشد عضلة الترايسبس في البيت.", img: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=800&q=80" },
  { id: "hm_8", name: "8. Superman Back Extensions • تمرين سوبرمان لعضلات الظهر", cat: "علوي وظهر", reps: "3 جولات × 15 عدة", cals: "50 kcal", anim: "pull", maleDesc: "استلقِ على بطنك، ارفع ذراعيك وصدرك وقدميك عن الأرض في نفس الوقت واثبت ثانيتين لتقوية طول الظهر.", femaleDesc: "يحسن استقامة العمود الفقري ويقوي عضلات الظهر بدون أي أجهزة.", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80" },
  { id: "hm_9", name: "9. Mountain Climbers • متسلق الجبال لحرق دهون البطن", cat: "بطن وكارديو", reps: "3 جولات × 40 ثانية", cals: "80 kcal", anim: "pushup", maleDesc: "في وضع الضغط، اسحب ركبتك اليمنى نحو صدرك ثم بدل سريعاً مع اليسرى كأنك تجري في مكانك.", femaleDesc: "يشعل حرق الدهون في منطقة الخصر والبطن ويرفع اللياقة القلبية.", img: "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=800&q=80" },
  { id: "hm_10", name: "10. Bicycle Crunches • طحن البطن التبادلي (الدراجة)", cat: "بطن وخصر", reps: "3 جولات × 20 عدة", cals: "60 kcal", anim: "core", maleDesc: "استلقِ على ظهرك، المس كوعك الأيمن بركبتك اليسرى بالتبادل مع عصر عضلات البطن والجانبين.", femaleDesc: "ينحت الخصر ويشغل عضلات البطن العلوية والسفلية والجانبية معاً.", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80" },
  { id: "hm_11", name: "11. High Knees / Burpees • رفع الركبتين عالياً لحرق السعرات", cat: "تسخين وكارديو", reps: "3 جولات × 40 ثانية", cals: "90 kcal", anim: "jump", maleDesc: "اجرِ في مكانك مع رفع الركبتين لمستوى الخصر بأقصى سرعة ممكنة لحرق أقصى كمية دهون.", femaleDesc: "يرفع معدل الحرق لساعات بعد التمرين وينشط عضلات الساقين والبطن.", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80" },
  { id: "hm_12", name: "12. Core Plank Hold • الثبات في وضع البلانك لشد الجذع", cat: "بطن وخصر", reps: "3 جولات × 60 ثانية ثبات", cals: "55 kcal", anim: "core", maleDesc: "ارتكز على ساعديك وأطراف أصابع قدميك، شد بطنك وأردافك وحافظ على جسمك كخط مستقيم تماماً.", femaleDesc: "يشد البطن للداخل ويقوي عضلات الجذع العميقة (Core) بشكل مذهل.", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80" }
];

/* ============================================================================
   2. MASSIVE GYM EQUIPMENT EXERCISE LIBRARY (30+ GYM MACHINES & FREE WEIGHTS)
   ============================================================================ */
const GYM_PRO_EXERCISES_DB = {
  chest: [
    { id: "g_ch1", name: "1. Barbell Flat Bench Press • ضغط بنش مسطح بالبار", sets: "4 × 8-10", cals: "145 kcal", equip: "بار + بنش مسطح", anim: "pushup", tips: "ثبّت لوحي الكتف، انزل بالبار لمنتصف الصدر وادفع للأعلى بقوة.", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80" },
    { id: "g_ch2", name: "2. Incline Dumbbell Press • تجميع دمبل عالي (زاوية 30°)", sets: "4 × 10-12", cals: "135 kcal", equip: "دمبل + بنش عالي", anim: "pushup", tips: "يركز على ملء الصدر العلوي؛ انزل بمدى حركي كامل وضم للأعلى دون تصادم الدمبل.", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80" },
    { id: "g_ch3", name: "3. Chest Press Machine • جهاز الدفع للصدر (Hammer Strength)", sets: "3 × 12", cals: "115 kcal", equip: "جهاز الصدر", anim: "pushup", tips: "ممتاز لعزل الصدر بأمان والوصول للفشل العضلي في آخر جولة.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" },
    { id: "g_ch4", name: "4. Cable Crossover (High to Low) • تفتيح كابل للصدر السفلي", sets: "3 × 15", cals: "100 kcal", equip: "جهاز الكابل", anim: "pull", tips: "اسحب الكابل من الأعلى للأسفل واعصر الصدر في المنتصف لثانية.", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80" },
    { id: "g_ch5", name: "5. Pec Deck / Butterfly Machine • جهاز الفراشة لتفصيل الصدر", sets: "3 × 15", cals: "95 kcal", equip: "جهاز الفراشة", anim: "pull", tips: "أبقِ الكوعين في مستوى الكتف واعصر عضلة الصدر الداخلية ببطء.", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80" },
    { id: "g_ch6", name: "6. Weighted Chest Dips • متوازي للصدر السفلي", sets: "3 × 10-12", cals: "130 kcal", equip: "جهاز المتوازي", anim: "pushup", tips: "مِل بجذعك للأمام قليلاً أثناء النزول لتحويل التركيز بالكامل على الصدر السفلي.", img: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80" }
  ],
  back: [
    { id: "g_bk1", name: "1. Wide-Grip Lat Pulldown • سحب عالي واسع للمجنص", sets: "4 × 10-12", cals: "145 kcal", equip: "جهاز السحب العالي", anim: "pull", tips: "اسحب البار لأعلى الصدر بكوعك مع إرجاع الكتف للخلف.", img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80" },
    { id: "g_bk2", name: "2. Barbell Bent-Over Row • طرمبة بالبار لسمك الظهر", sets: "4 × 8-10", cals: "160 kcal", equip: "بار حر", anim: "pull", tips: "حافظ على استقامة أسفل الظهر بزاوية 45 درجة واسحب البار نحو السرة.", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80" },
    { id: "g_bk3", name: "3. Seated V-Bar Cable Row • سحب أرضي ضيق بالكابل", sets: "4 × 12", cals: "140 kcal", equip: "جهاز السحب الأرضي", anim: "pull", tips: "افرد ظهرك تماماً واضمم لوحي الكتف في نهاية السحبة.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" },
    { id: "g_bk4", name: "4. Single-Arm Dumbbell Row • منشار دمبل فردي للمجنص", sets: "3 × 12 لكل جانب", cals: "130 kcal", equip: "دمبل + بنش", anim: "pull", tips: "اسحب الدمبل في مسار قوسي باتجاه جيب البنطلون لعزل المجنص.", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80" },
    { id: "g_bk5", name: "5. T-Bar Row Machine • جهاز التي بار لكثافة الظهر الوسطى", sets: "3 × 10", cals: "150 kcal", equip: "جهاز T-Bar", anim: "pull", tips: "ثبّت صدرك على المسند واسحب الوزن بتحكم كامل.", img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80" },
    { id: "g_bk6", name: "6. Straight-Arm Cable Pulldown • سحب ذراع مستقيم بالكابل", sets: "3 × 15", cals: "105 kcal", equip: "جهاز الكابل", anim: "pull", tips: "أبقِ الذراعين مفرودتين واسحب الحبل للفخذين لضخ الدم في المجنص.", img: "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=800&q=80" }
  ],
  shoulders: [
    { id: "g_sh1", name: "1. Overhead Barbell / Dumbbell Press • ضغط أكتاف عالي", sets: "4 × 8-10", cals: "130 kcal", equip: "دمبل أو بار", anim: "pushup", tips: "ادفع الوزن للأعلى مع إبقاء الكوع للأمام قليلاً بزاوية 45 درجة.", img: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=800&q=80" },
    { id: "g_sh2", name: "2. Dumbbell Lateral Raises • رفرفة جانبي لتعريض الكتف", sets: "4 × 15", cals: "100 kcal", equip: "دمبل", anim: "jump", tips: "ارفع بوزن متوسط لمستوى الكتف مع قيادة الحركة بالكوع.", img: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=800&q=80" },
    { id: "g_sh3", name: "3. Rope Face Pulls • سحب حبل للوجه للكتف الخلفي", sets: "4 × 15", cals: "95 kcal", equip: "كابل + حبل", anim: "pull", tips: "اسحب الحبل نحو الجبهة مع فتح الذراعين للخارج لتقوية الكتف الخلفي.", img: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80" },
    { id: "g_sh4", name: "4. Reverse Pec Deck Machine • فراشة خلفي للكتف الخلفي", sets: "3 × 15", cals: "90 kcal", equip: "جهاز الفراشة", anim: "pull", tips: "ارجع بذراعيك للخلف في مسار أفقي لعزل الكتف الخلفي تماماً.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" },
    { id: "g_sh5", name: "5. Cable Lateral Raises • رفرفة جانبي بالكابل الفردي", sets: "3 × 15 لكل يد", cals: "95 kcal", equip: "جهاز الكابل", anim: "jump", tips: "يوفر شداً مستمراً على عضلة الكتف الجانبية طوال الحركة.", img: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=800&q=80" },
    { id: "g_sh6", name: "6. Dumbbell Shrugs • ترابيس بالدمبل أو البار", sets: "3 × 15", cals: "90 kcal", equip: "دمبل ثقيل", anim: "pull", tips: "ارفع كتفيك للأعلى باتجاه الأذنين واثبت ثانية في الأعلى.", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80" }
  ],
  arms: [
    { id: "g_ar1", name: "1. EZ-Bar Bicep Curl • بار زجزاج واقف للبايسبس", sets: "4 × 10-12", cals: "95 kcal", equip: "بار زجزاج", anim: "pull", tips: "ثبّت الكوعين بجانب الخصر وارفع البار بعصر كامل للباي.", img: "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=800&q=80" },
    { id: "g_ar2", name: "2. Incline Dumbbell Curl • تبادل دمبل على بنش مائل للباي", sets: "3 × 12", cals: "90 kcal", equip: "دمبل + بنش", anim: "pull", tips: "يضع أقصى إطالة على الرأس الطويل لعضلة البايسبس لتكويرها.", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80" },
    { id: "g_ar3", name: "3. Hammer Curls • شاكوش بالدمبل للساعد والباي الخارجي", sets: "3 × 12", cals: "90 kcal", equip: "دمبل", anim: "pull", tips: "اجعل قبضة اليد متقابلة طوال الحركة لزيادة عرض الذراع.", img: "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=800&q=80" },
    { id: "g_ar4", name: "4. Tricep Rope Pushdown • سحب حبل بالكابل للترايسبس", sets: "4 × 12-15", cals: "95 kcal", equip: "كابل + حبل", anim: "pushup", tips: "افتح الحبل في أسفل الحركة للخارج مع تثبيت الكوع تماماً.", img: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=800&q=80" },
    { id: "g_ar5", name: "5. Overhead Cable / EZ-Bar Extension • فرنساوي خلف الرأس للتراي", sets: "3 × 12", cals: "100 kcal", equip: "بار زجزاج أو كابل", anim: "pushup", tips: "يستهدف الرأس الطويل الأكبر حجماً في عضلة الترايسبس.", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80" },
    { id: "g_ar6", name: "6. Preacher Curl Machine • جهاز الحصان لعزل البايسبس", sets: "3 × 12", cals: "85 kcal", equip: "جهاز الحصان", anim: "pull", tips: "يمنع أي غش أو مرجحة ويعزل البايسبس بنسبة 100%.", img: "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=800&q=80" }
  ],
  legs: [
    { id: "g_lg1", name: "1. Barbell Back Squat • سكوات بالبار الحر أو السميث", sets: "4 × 8-10", cals: "195 kcal", equip: "بار + راك السكوات", anim: "squat", tips: "ملك تمارين الأرجل؛ انزل حتى يصبح الفخذ موازياً للأرض وادفع بكعبك.", img: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=800&q=80" },
    { id: "g_lg2", name: "2. 45° Leg Press Machine • جهاز دفع الأرجل المائل", sets: "4 × 12", cals: "180 kcal", equip: "جهاز الدفع", anim: "squat", tips: "لا تقفل مفصل الركبة بالكامل في الأعلى لحماية المفاصل.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" },
    { id: "g_lg3", name: "3. Romanian Deadlift (RDL) • رفعة رومانية للخلفي والأرداف", sets: "4 × 10-12", cals: "175 kcal", equip: "بار أو دمبل", anim: "squat", tips: "ادفع الحوض للخلف مع ظهر مفرود حتى تشعر بشد قوي في الخلفي.", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80" },
    { id: "g_lg4", name: "4. Barbell Hip Thrust • رفع الحوض بالبار للأرداف", sets: "4 × 12", cals: "165 kcal", equip: "بار + بنش", anim: "core", tips: "التمرين الأقوى لتقوية وتدوير عضلات الأرداف (Glutes).", img: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80" },
    { id: "g_lg5", name: "5. Leg Extension & Leg Curl Machines • جهاز الأمامي والخلفي", sets: "4 × 15", cals: "140 kcal", equip: "أجهزة العزل", anim: "squat", tips: "اثبت ثانية في قمة الانقباض لتفصيل عضلات الفخذ الأمامية والخلفية.", img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=800&q=80" },
    { id: "g_lg6", name: "6. Standing / Seated Calf Raises • جهاز السمانة", sets: "4 × 15-20", cals: "100 kcal", equip: "جهاز السمانة", anim: "jump", tips: "انزل بمدى حركي كامل واصعد على أطراف الأصابع مع الثبات لثانية.", img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80" }
  ],
  core: [
    { id: "g_cr1", name: "1. Cable Rope Crunch • طحن البطن بالكابل العلوي", sets: "4 × 15", cals: "110 kcal", equip: "جهاز الكابل + حبل", anim: "core", tips: "اثنِ العمود الفقري للأسفل بعصر عضلات البطن وليس بالنزول بالحوض.", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80" },
    { id: "g_cr2", name: "2. Hanging Leg Raises • رفع الأرجل على العقلة للبطن السفلي", sets: "4 × 12-15", cals: "115 kcal", equip: "عقلة أو متوازي", anim: "core", tips: "ارفع الركبتين نحو الصدر مع لف الحوض للأعلى لإبراز البطن السفلي.", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80" },
    { id: "g_cr3", name: "3. Russian Twists with Plate • التفاف روسي بالوزن للجانبين", sets: "3 × 20", cals: "95 kcal", equip: "طارة وزن", anim: "core", tips: "لف الجذع يميناً ويساراً بتحكم لشد عضلات الخصر (Obliques).", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80" }
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

// مجسم 3D تشريحي يختلف بين الذكر والأنثى
function build3DMuscleSVG(selectedMuscle, isMale) {
  const shoulderRx = isMale ? 17 : 13;
  const waistWidth = isMale ? 44 : 34;
  const hipWidth = isMale ? 46 : 56;
  const accentStroke = isMale ? "#D4A72C" : "#EC4899";

  return `
    <svg viewBox="0 0 220 340" class="muscle-svg-interactive" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="110" cy="318" rx="68" ry="12" fill="rgba(25, 184, 137, 0.22)" />
      <!-- الرأس والرقبة -->
      <circle cx="110" cy="34" r="18" fill="#1e293b" stroke="${accentStroke}" stroke-width="2.2" />
      ${!isMale ? `<path d="M92 34 Q82 55 88 68 M128 34 Q138 55 132 68" stroke="${accentStroke}" stroke-width="3" fill="none" />` : ""}
      <rect x="103" y="52" width="14" height="12" rx="4" fill="#334155" />

      <!-- الأكتاف (Shoulders 3D) -->
      <g class="muscle-zone ${selectedMuscle === "shoulders" ? "active" : ""}" data-muscle-pick="shoulders">
        <ellipse cx="${isMale ? 62 : 68}" cy="78" rx="${shoulderRx}" ry="14" />
        <ellipse cx="${isMale ? 158 : 152}" cy="78" rx="${shoulderRx}" ry="14" />
      </g>

      <!-- الصدر (Chest 3D) -->
      <g class="muscle-zone ${selectedMuscle === "chest" ? "active" : ""}" data-muscle-pick="chest">
        <path d="M78 66 L109 66 L109 102 L82 98 Z" />
        <path d="M111 66 L142 66 L138 98 L111 102 Z" />
      </g>

      <!-- المجنص والظهر (Back & Lats 3D) -->
      <g class="muscle-zone ${selectedMuscle === "back" ? "active" : ""}" data-muscle-pick="back">
        <path d="M76 96 L86 146 L70 126 Z" />
        <path d="M144 96 L134 146 L150 126 Z" />
      </g>

      <!-- الذراعين (Arms 3D) -->
      <g class="muscle-zone ${selectedMuscle === "arms" ? "active" : ""}" data-muscle-pick="arms">
        <rect x="${isMale ? 45 : 52}" y="92" width="${isMale ? 16 : 13}" height="58" rx="7" />
        <rect x="${isMale ? 159 : 155}" y="92" width="${isMale ? 16 : 13}" height="58" rx="7" />
      </g>

      <!-- البطن والخصر (Core 3D) -->
      <g class="muscle-zone ${selectedMuscle === "core" ? "active" : ""}" data-muscle-pick="core">
        <rect x="${110 - waistWidth / 2}" y="104" width="${waistWidth}" height="54" rx="10" />
      </g>

      <!-- الأرجل والأرداف (Legs & Glutes 3D) -->
      <g class="muscle-zone ${selectedMuscle === "legs" ? "active" : ""}" data-muscle-pick="legs">
        <ellipse cx="110" cy="172" rx="${hipWidth / 2}" ry="14" />
        <path d="M${110 - hipWidth / 2} 174 L106 174 L103 248 L82 248 Z" />
        <path d="M114 174 L${110 + hipWidth / 2} 174 L138 248 L117 248 Z" />
        <rect x="83" y="252" width="18" height="54" rx="8" />
        <rect x="119" y="252" width="18" height="54" rx="8" />
      </g>
    </svg>
  `;
}

// مدرب بشري ثلاثي الأبعاد يتحرك فعلياً ليشرح لك التمرين في البيت!
function buildAnimatedHumanTrainerSVG(animType = "squat", isMale = true) {
  const color = isMale ? "#D4A72C" : "#EC4899";
  return `
    <svg viewBox="0 0 200 240" class="anim-human-svg anim-mode-${esc(animType)}" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="222" rx="55" ry="9" fill="rgba(25, 184, 137, 0.25)" />
      <g class="human-body-all">
        <g class="human-upper">
          <!-- الرأس -->
          <circle cx="100" cy="42" r="16" fill="#1e293b" stroke="${color}" stroke-width="3" />
          <!-- الجذع والصدر -->
          <path d="M78 65 L122 65 L114 135 L86 135 Z" fill="${color}" opacity="0.88" />
          <!-- الذراعين المتحركتين -->
          <g class="human-arms">
            <line x1="78" y1="70" x2="48" y2="115" stroke="#19B889" stroke-width="9" stroke-linecap="round" />
            <line x1="122" y1="70" x2="152" y2="115" stroke="#19B889" stroke-width="9" stroke-linecap="round" />
          </g>
        </g>
        <!-- الأرجل -->
        <g class="human-legs">
          <line x1="90" y1="135" x2="82" y2="212" stroke="#f8fafc" stroke-width="11" stroke-linecap="round" />
          <line x1="110" y1="135" x2="118" y2="212" stroke="#f8fafc" stroke-width="11" stroke-linecap="round" />
        </g>
      </g>
    </svg>
  `;
}

function renderHealthView() {
  injectGymV4Styles();
  const sec = document.getElementById("view-health");
  if (!sec) return;

  const profile = OSProStore.get("gym_profile_v4", {
    wizardStep: 1, // 1: Gender | 2: Name & Age | 3: Weight & Ambition | 4: Home vs Gym | 5: Done!
    gender: "male",
    name: B().getAppState?.()?.user?.displayName || "أحمد محمد حسني",
    age: 21,
    height: 178,
    currentWeight: 74,
    targetWeight: 82,
    goal: "bulk",
    workoutMode: "home", // "home" (البيت بدون أجهزة) | "gym" (الجيم بالأجهزة)
    daysPerWeek: 4,
    preferredTime: "18:00",
    waterCups: 6,
    completedToday: [],
    livePlayerOpen: false,
    liveExIdx: 0,
    customExercises: [],
    showNutrition: false,
    customMeals: []
  });

  const saveP = () => OSProStore.set("gym_profile_v4", profile);

  /* --------------------------------------------------------------------------
     WIZARD ONBOARDING (4 FULL STEPS: GENDER -> NAME/AGE -> WEIGHT -> HOME/GYM)
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
            <span class="badge badge-gold">الخطوة 1 من 4 • تحديد الهوية الفسيولوجية</span>
            <h2 class="mt-2">اختر النوع لتخصيص التشريح العضلي والتمارين 3D</h2>
            <p class="small-muted mt-1">كل نوع له خريطة عضلية وتوزيع تمارين ومعدلات حرق مختلفة تماماً:</p>
          </div>
          <div class="wizard-gender-grid">
            <div class="wizard-big-card ${profile.gender === "male" ? "active" : ""}" data-wiz-gender="male">
              <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80" alt="Male" />
              <h3 class="gold-text">ذكر (Male Athlete 🚹)</h3>
              <p class="small-muted">تركيز على الضخامة العضلية، القوة، تفصيل الصدر والظهر V-Taper والذراعين</p>
            </div>
            <div class="wizard-big-card ${profile.gender === "female" ? "active" : ""}" data-wiz-gender="female">
              <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80" alt="Female" />
              <h3 style="color:#EC4899;">أنثى (Female Athlete 🚺)</h3>
              <p class="small-muted">تركيز على نحت القوام، شد البطن والخصر، تقوية الأرداف واللياقة الشاملة</p>
            </div>
          </div>
          <button type="button" id="btn-wiz-next-1" class="btn btn-gold btn-block btn-luxury-shine">
            التالي: الاسم والعمر <i class="fa-solid fa-arrow-left"></i>
          </button>
        ` : ""}

        ${step === 2 ? `
          <div class="text-center mb-4">
            <span class="badge badge-gold">الخطوة 2 من 4 • البطاقة الشخصية للبطل</span>
            <h2 class="mt-2">ما هو اسمك وكم عمرك يا بطل؟</h2>
            <p class="small-muted mt-1">سنضبط شدة التمارين ومعدل الاستشفاء العضلي بناءً على سنك:</p>
          </div>
          <div class="form-group">
            <label class="text-center">الاسم الذي سيظهر في استوديو التمرين</label>
            <input type="text" id="wiz-inp-name" class="wizard-input-giant" value="${esc(profile.name)}" placeholder="اكتب اسمك هنا..." autofocus />
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
            <p class="small-muted mt-1">سيحسب النظام تلقائياً الفرق المطلوب ويبني خطتك للوصول لهدفك:</p>
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
            <label class="text-center">هدفك الأساسي من التمرين</label>
            <select id="wiz-inp-goal" class="wizard-input-giant" style="font-size:1.05rem!important;">
              <option value="bulk" ${profile.goal === "bulk" ? "selected" : ""}>💪 زيادة الكتلة العضلية والوزن (Bulking)</option>
              <option value="cut" ${profile.goal === "cut" ? "selected" : ""}>🔥 حرق الدهون والتنشيف ونحت الجسم (Cutting)</option>
              <option value="recomp" ${profile.goal === "recomp" ? "selected" : ""}>⚡ شد الجسم واللياقة البدنية الشاملة (Fitness & Toning)</option>
            </select>
          </div>
          <div class="flex-between mt-4">
            <button type="button" id="btn-wiz-prev" class="btn btn-outline"><i class="fa-solid fa-arrow-right"></i> السابق</button>
            <button type="button" id="btn-wiz-next-3" class="btn btn-gold btn-luxury-shine" style="flex:1; margin-right:12px;">
              التالي: تتمرن في البيت ولا الجيم؟ <i class="fa-solid fa-arrow-left"></i>
            </button>
          </div>
        ` : ""}

        ${step === 4 ? `
          <div class="text-center">
            <span class="badge badge-gold">الخطوة 4 والأخيرة • مكان التمرين (البيت غير الجيم تماماً!)</span>
            <h2 class="mt-2">هل ستتمرن في البيت 🏠 أم ستنزل الجيم 🏋️‍♂️؟</h2>
            <p class="small-muted mt-1">اختر بيئة تمرينك لنعرض لك التمارين المناسبة بدون أي أجهزة غير متوفرة لديك:</p>
          </div>
          <div class="wizard-gender-grid">
            <div class="wizard-big-card ${profile.workoutMode === "home" ? "active" : ""}" data-wiz-mode="home">
              <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80" alt="Home Workout" />
              <h3 class="gold-text">🏠 تمرين في البيت (بدون أجهزة)</h3>
              <p class="small-muted">12 تمريناً منزلياً بوزن الجسم مع مدرب تفاعلي متحرك 3D يشرح لك كل حركة خطوة بخطوة مع العداد</p>
            </div>
            <div class="wizard-big-card ${profile.workoutMode === "gym" ? "active" : ""}" data-wiz-mode="gym">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80" alt="Gym Workout" />
              <h3 style="color:#19B889;">🏋️‍♂️ تمرين في الجيم (أجهزة وأوزان)</h3>
              <p class="small-muted">أكثر من 30 تمريناً بالبار والدمبل والكابلات والأجهزة مقسمة على خريطة العضلات 3D</p>
            </div>
          </div>
          <div class="flex-between mt-4">
            <button type="button" id="btn-wiz-prev" class="btn btn-outline"><i class="fa-solid fa-arrow-right"></i> السابق</button>
            <button type="button" id="btn-wiz-finish" class="btn btn-gold btn-luxury-shine" style="flex:1; margin-right:12px;">
              🚀 افتح استوديو التمرين المخصص لي الآن!
            </button>
          </div>
        ` : ""}
      </div>
    `;

    // أحداث أزرار الـ Wizard
    sec.querySelectorAll("[data-wiz-gender]").forEach(c => {
      c.onclick = () => {
        profile.gender = c.dataset.wizGender;
        saveP();
        renderHealthView();
      };
    });
    sec.querySelectorAll("[data-wiz-mode]").forEach(c => {
      c.onclick = () => {
        profile.workoutMode = c.dataset.wizMode;
        saveP();
        renderHealthView();
      };
    });
    sec.querySelector("#btn-wiz-prev")?.addEventListener("click", () => {
      profile.wizardStep = Math.max(1, profile.wizardStep - 1);
      saveP();
      renderHealthView();
    });
    sec.querySelector("#btn-wiz-next-1")?.addEventListener("click", () => {
      profile.wizardStep = 2;
      saveP();
      renderHealthView();
    });
    sec.querySelector("#btn-wiz-next-2")?.addEventListener("click", () => {
      const n = document.getElementById("wiz-inp-name")?.value.trim();
      const a = Number(document.getElementById("wiz-inp-age")?.value) || 21;
      if (n) profile.name = n;
      profile.age = a;
      profile.wizardStep = 3;
      saveP();
      renderHealthView();
    });
    sec.querySelector("#btn-wiz-next-3")?.addEventListener("click", () => {
      profile.height = Number(document.getElementById("wiz-inp-height")?.value) || 175;
      profile.currentWeight = Number(document.getElementById("wiz-inp-cur-w")?.value) || 74;
      profile.targetWeight = Number(document.getElementById("wiz-inp-tar-w")?.value) || 80;
      profile.goal = document.getElementById("wiz-inp-goal")?.value || "bulk";
      profile.wizardStep = 4;
      saveP();
      renderHealthView();
    });
    sec.querySelector("#btn-wiz-finish")?.addEventListener("click", () => {
      profile.wizardStep = 5;
      saveP();
      toast(`تم تجهيز برنامج ${profile.workoutMode === "home" ? "البيت التفاعلي 🏠" : "الجيم المتكامل 🏋️‍♂️"} لك يا كابتن ${profile.name}!`);
      renderHealthView();
    });
    return;
  }

  /* --------------------------------------------------------------------------
     MAIN STUDIO VIEW (SEPARATED: HOME MODE VS GYM MODE + TASK SCHEDULER)
     -------------------------------------------------------------------------- */
  const isMale = profile.gender !== "female";
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
    legs: "الأرجل والأرداف (Legs 3D)",
    core: "البطن والخصر (Core 3D)"
  };

  sec.innerHTML = `
    <!-- 1. شريط قيادة البطل والتبديل الفوري بين (تمرين البيت 🏠 / تمرين الجيم 🏋️‍♂️) وتثبيت التمرين في المهام -->
    <div class="pro-hero-banner" style="background-image: linear-gradient(90deg, rgba(9,13,25,0.96) 0%, rgba(9,13,25,0.78) 55%, rgba(9,13,25,0.95) 100%), url('${isHome ? "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1500&q=80" : "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1500&q=80"}');">
      <div class="pro-hero-overlay">
        <div>
          <div class="filters-row mb-1">
            <span class="badge badge-gold">${isMale ? "🚹 ملف رياضي رجالي" : "🚺 ملف رياضي نسائي"}</span>
            <span class="badge badge-emerald">${isHome ? "🏠 وضع تمرين البيت (بدون أجهزة)" : "🏋️‍♂️ وضع الجيم (أجهزة وحديد)"}</span>
            <span class="badge badge-warning">BMI: ${m.bmi} (${m.bmiStatus})</span>
          </div>
          <h2>كابتن <span class="gold-text">${esc(profile.name)}</span> (${profile.age} سنة) — من <span class="gold-text">${profile.currentWeight}kg</span> إلى <span class="gold-text">${profile.targetWeight}kg</span></h2>
          <p class="small-muted mt-1">
            الفرق لتحقيق طموحك: <strong class="gold-text">${m.weightDiff > 0 ? `+${m.weightDiff} كجم زيادة مطلوبة` : m.weightDiff < 0 ? `${m.weightDiff} كجم نزول مطلوب` : "وصلت لوزنك المثالي! 🎯"}</strong>
            &bull; احتياجك اليومي: <strong>${m.targetCalories} kcal</strong> (${m.proteinG}g بروتين)
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
          <button type="button" id="btn-reopen-wizard" class="btn btn-outline btn-sm" title="إعادة ضبط بياناتي"><i class="fa-solid fa-Gear"></i> بياناتي</button>
        </div>
      </div>
    </div>

    <!-- ======================================================================
         وضع رقم 1: إذا كان المستخدم يتمرن في البيت (HOME WORKOUT — 12 EXERCISES + 3D COACH)
         ====================================================================== -->
    ${isHome ? `
      <!-- مشغل التمرين المنزلي المباشر (ابدأ تمرين اليوم بالمدرب المتحرك 3D) -->
      <div class="live-workout-stage">
        <div class="flex-between" style="flex-wrap:wrap; gap:12px;">
          <div>
            <span class="badge badge-emerald">🏠 HOME WORKOUT PLAYER • بدون أي أجهزة</span>
            <h3 class="mt-1">🔥 برنامج تمرين البيت المتكامل (${allHomeExercises.length} تمرين بمدرب تفاعلي يوضح لك الحركة)</h3>
          </div>
          <div class="filters-row">
            <button type="button" id="btn-start-live-home" class="btn btn-gold btn-sm">
              <i class="fa-solid fa-play"></i> ابدأ تمرين اليوم الآن (تشغيل العداد)
            </button>
            <span id="live-home-timer" class="badge badge-gold" style="font-size:1.05rem; padding:6px 14px;">00:45</span>
          </div>
        </div>

        <!-- شريط التنقل السريع بين الـ 12 تمريناً -->
        <div class="workout-step-pills">
          ${allHomeExercises.map((ex, idx) => `
            <span class="workout-step-pill ${profile.liveExIdx === idx ? "active" : ""} ${(profile.completedToday || []).includes(ex.id) ? "done" : ""}" data-jump-home-ex="${idx}">
              ${idx + 1}. ${esc(ex.name.split("•")[0].replace(/^\d+\.\s*/, ""))}
            </span>
          `).join("")}
        </div>

        <!-- عرض المدرب المتحرك 3D + خطوات أداء الحركة الحالية -->
        <div class="dashboard-grid" style="align-items:center; grid-template-columns: 270px 1fr;">
          <div class="trainer-3d-box">
            ${buildAnimatedHumanTrainerSVG(activeLiveEx.anim || "squat", isMale)}
          </div>
          <div>
            <div class="flex-between">
              <span class="badge badge-gold">${esc(activeLiveEx.cat)}</span>
              <span class="badge badge-emerald">المطلوب: ${esc(activeLiveEx.reps)} • 🔥 ${esc(activeLiveEx.cals)}</span>
            </div>
            <h2 class="gold-text mt-1">${esc(activeLiveEx.name)}</h2>
            <div class="subject-progress-box mt-2">
              <strong class="gold-text d-block">🗣️ إرشاد المدرب (ازاي تعمل الحركة صح في البيت):</strong>
              <p class="mt-1" style="font-size:0.95rem;">${esc(isMale ? activeLiveEx.maleDesc : (activeLiveEx.femaleDesc || activeLiveEx.maleDesc))}</p>
            </div>
            <div class="filters-row mt-2">
              <button type="button" id="btn-prev-home-ex" class="btn btn-outline btn-sm"><i class="fa-solid fa-backward-step"></i> التمرين السابق</button>
              <button type="button" id="btn-done-home-ex" class="btn btn-gold btn-sm">
                <i class="fa-solid fa-check-double"></i> أتممت هذا التمرين ➔ انتقل للتالي
              </button>
              <button type="button" id="btn-next-home-ex" class="btn btn-outline btn-sm">التمرين التالي <i class="fa-solid fa-forward-step"></i></button>
            </div>
          </div>
        </div>
      </div>

      <!-- شبكة الـ 12 تمريناً منزلياً بالكامل -->
      <div class="card">
        <div class="card-header">
          <h3><i class="fa-solid fa-list-check gold-text"></i> قائمة تمارين البيت الكاملة (${allHomeExercises.length} حركة بوزن الجسم)</h3>
          <span class="badge badge-emerald">أنجزت اليوم: ${(profile.completedToday || []).length} من ${allHomeExercises.length}</span>
        </div>
        <div class="exercise-photo-grid">
          ${allHomeExercises.map((ex, idx) => {
            const done = (profile.completedToday || []).includes(ex.id);
            return `
              <div class="exercise-pro-card">
                <div class="exercise-img-box">
                  <img src="${esc(ex.img)}" alt="${esc(ex.name)}" loading="lazy" />
                  <span class="exercise-3d-tag">🏠 تمرين منزلي • ${esc(ex.cat)}</span>
                  <span class="exercise-sets-pill">${esc(ex.reps)}</span>
                </div>
                <div class="exercise-body">
                  <h4>${esc(ex.name)}</h4>
                  <div class="exercise-steps-box">
                    ${esc(isMale ? ex.maleDesc : (ex.femaleDesc || ex.maleDesc))}
                  </div>
                  <div class="flex-between mt-1">
                    <button type="button" class="btn btn-xs btn-outline" data-jump-home-ex="${idx}"><i class="fa-solid fa-person-running gold-text"></i> اعرض الحركة 3D</button>
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
    <!-- ======================================================================
         وضع رقم 2: إذا كان المستخدم ينزل الجيم (GYM MODE — 3D MUSCLE MAP + 30+ MACHINES)
         ====================================================================== -->
      <div class="gym-layout-split">
        <div class="muscle-3d-stage">
          <span class="badge badge-gold">3D GYM ANATOMY (${isMale ? "MALE" : "FEMALE"})</span>
          <h4 class="mt-1">${muscleNamesAr[activeMuscleGroup]}</h4>
          <small class="small-muted d-block">اضغط على العضلة التي ستلعبها اليوم في الجيم لعرض كل تمارينها وأجهزتها:</small>

          ${build3DMuscleSVG(activeMuscleGroup, isMale)}

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
                  <div class="exercise-img-box">
                    <img src="${esc(ex.img)}" alt="${esc(ex.name)}" loading="lazy" />
                    <span class="exercise-3d-tag"><i class="fa-solid fa-dumbbell"></i> ${esc(ex.equip)}</span>
                    <span class="exercise-sets-pill">${esc(ex.sets)}</span>
                  </div>
                  <div class="exercise-body">
                    <div class="flex-between">
                      <h4>${esc(ex.name)}</h4>
                      <span class="badge badge-gold">🔥 ${esc(ex.cals)}</span>
                    </div>
                    <div class="exercise-steps-box">
                      <strong class="gold-text d-block">📐 التكنيك الصحيح في الجيم:</strong>
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

    <!-- 3. قسم التغذية الاختياري بالكامل (لا يظهر إلا إذا أراد المستخدم فتحه وإضافة وجباته بحرية) -->
    <div class="card mt-4">
      <div class="flex-between">
        <div>
          <h3><i class="fa-solid fa-utensils gold-text"></i> مفكرة التغذية والوجبات الخاصة بك (اختياري بالكامل)</h3>
          <small class="small-muted">أنت حر تماماً: يمكنك إضافة وجباتك الخاصة أو إخفاء هذا القسم والتركيز على التمرين فقط</small>
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
          `).join("") : `<p class="small-muted">لم تضف أي وجبات بعد. اضغط "+ أضف وجبة من اختيارك" لتسجيل أكلك بحرية.</p>`}
        </div>
      ` : ""}
    </div>
  `;

  /* --------------------------------------------------------------------------
     BIND EVENTS FOR HOME PLAYER, GYM MAP, CUSTOM EXERCISES & TASK SCHEDULER
     -------------------------------------------------------------------------- */
  sec.querySelector("#btn-switch-home-gym")?.addEventListener("click", () => {
    profile.workoutMode = isHome ? "gym" : "home";
    saveP();
    renderHealthView();
    toast(`تم التبديل إلى ${profile.workoutMode === "home" ? "وضع تمرين البيت 🏠" : "وضع الجيم 🏋️‍♂️"}`);
  });

  sec.querySelector("#btn-reopen-wizard")?.addEventListener("click", () => {
    profile.wizardStep = 1;
    saveP();
    renderHealthView();
  });

  sec.querySelector("#btn-gym-water-plus")?.addEventListener("click", () => {
    profile.waterCups = (Number(profile.waterCups) || 0) + 1;
    saveP();
    renderHealthView();
    toast("بالهنا والشفا! +1 كوب مية 💧");
  });

  // أحداث مشغل تمرين البيت التفاعلي (12 تمرين)
  sec.querySelectorAll("[data-jump-home-ex]").forEach(el => {
    el.onclick = () => {
      profile.liveExIdx = Number(el.dataset.jumpHomeEx) || 0;
      saveP();
      renderHealthView();
    };
  });

  sec.querySelector("#btn-prev-home-ex")?.addEventListener("click", () => {
    profile.liveExIdx = (profile.liveExIdx - 1 + allHomeExercises.length) % allHomeExercises.length;
    saveP();
    renderHealthView();
  });

  sec.querySelector("#btn-next-home-ex")?.addEventListener("click", () => {
    profile.liveExIdx = (profile.liveExIdx + 1) % allHomeExercises.length;
    saveP();
    renderHealthView();
  });

  sec.querySelector("#btn-done-home-ex")?.addEventListener("click", () => {
    profile.completedToday = profile.completedToday || [];
    if (!profile.completedToday.includes(activeLiveEx.id)) {
      profile.completedToday.push(activeLiveEx.id);
    }
    profile.liveExIdx = (profile.liveExIdx + 1) % allHomeExercises.length;
    saveP();
    toast(`عاش يا بطل! أنجزت "${activeLiveEx.name.split("•")[0]}" وانتقلت للتمرين التالي 🔥`);
    renderHealthView();
  });

  sec.querySelector("#btn-start-live-home")?.addEventListener("click", () => {
    if (livePlayerTimerInterval) clearInterval(livePlayerTimerInterval);
    let s = 45;
    const badge = document.getElementById("live-home-timer");
    toast("بدأ عداد التمرين (45 ثانية أداء)! قلد حركة المدرب أمامك 💪🔥");
    livePlayerTimerInterval = setInterval(() => {
      s--;
      if (badge) badge.textContent = `00:${String(Math.max(0, s)).padStart(2, "0")}`;
      if (s <= 0) {
        clearInterval(livePlayerTimerInterval);
        toast("انتهى وقت الجولة! خذ نفساً وانتقل للتمرين التالي 🎉");
      }
    }, 1000);
  });

  // أحداث الجيم ومجسم الـ 3D
  sec.querySelectorAll("[data-muscle-pick]").forEach(el => {
    el.onclick = () => {
      activeMuscleGroup = el.dataset.musclePick;
      renderHealthView();
    };
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
      saveP();
      renderHealthView();
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

  // إضافة تمرين مخصص بواسطة المستخدم
  sec.querySelector("#btn-add-custom-ex")?.addEventListener("click", () => {
    B().openFormModal("➕ إضافة تمرين جديد خاص بك", `
      <div class="form-group"><label>اسم التمرين</label><input name="name" required placeholder="مثال: عقلة واسع / ضغط الماسة..." /></div>
      <div class="form-group"><label>المكان</label>
        <select name="mode">
          <option value="home" ${isHome ? "selected" : ""}>🏠 تمرين بيت (بدون أجهزة)</option>
          <option value="gym" ${!isHome ? "selected" : ""}>🏋️‍♂️ تمرين جيم</option>
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
      <div class="form-group"><label>شرح الحركة أو ملاحظاتك</label><input name="tips" required placeholder="اكتب طريقة الأداء أو الوزن..." /></div>
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
        anim: "squat",
        maleDesc: d.tips,
        femaleDesc: d.tips,
        tips: d.tips,
        img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
      });
      saveP();
      renderHealthView();
      toast("تمت إضافة تمرينك الخاص بنجاح! 💪");
    });
  });

  // تثبيت وجدولة التمرين في المهام والتقويم بتوقيت محدد وتكرار دوري
  const openPinWorkoutModal = (defaultTitle = "") => {
    const defaultName = defaultTitle || (isHome ? "🏠 تمرين البيت الكامل (12 حركة)" : `🏋️‍♂️ تمرين الجيم: ${muscleNamesAr[activeMuscleGroup]}`);
    B().openFormModal("📌 تثبيت وجدولة التمرين في المهام والتقويم", `
      <div class="form-group">
        <label>اسم التمرين المراد تثبيته</label>
        <input name="title" value="${esc(defaultName)}" required />
      </div>
      <div class="form-group">
        <label>توقيت التمرين المفضل في اليوم (الساعة)</label>
        <input type="time" name="time" value="${esc(profile.preferredTime || "18:00")}" required />
      </div>
      <div class="form-group">
        <label>التكرار الدوري للتثبيت</label>
        <select name="freq">
          <option value="daily">🔁 يومياً في نفس الموعد</option>
          <option value="3days" selected>📅 3 أيام أسبوعياً (السبت - الإثنين - الأربعاء)</option>
          <option value="4days">📅 4 أيام أسبوعياً (السبت - الأحد - الثلاثاء - الخميس)</option>
          <option value="once">📌 اليوم فقط</option>
        </select>
      </div>
    `, async (d) => {
      profile.preferredTime = d.time;
      saveP();
      const freqLabels = {
        daily: "مثبت يومياً",
        "3days": "مثبت 3 أيام أسبوعياً",
        "4days": "مثبت 4 أيام أسبوعياً",
        once: "مرة واحدة"
      };
      await B().createRecord?.("tasks", {
        title: `🏋️‍♂️ ${d.title} (الساعة ${d.time})`,
        description: `تكرار التمرين: ${freqLabels[d.freq]} • المكان: ${isHome ? "البيت" : "الجيم"}`,
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
      toast(`تم تثبيت "${d.title}" الساعة ${d.time} (${freqLabels[d.freq]}) في مهامك وتقويمك! 📌📅`);
    });
  };

  sec.querySelector("#btn-pin-workout-task")?.addEventListener("click", () => openPinWorkoutModal());
  sec.querySelectorAll("[data-pin-single-ex]").forEach(btn => {
    btn.onclick = () => openPinWorkoutModal(btn.dataset.pinSingleEx);
  });

  // قسم التغذية الاختياري
  sec.querySelector("#btn-toggle-nutrition-sec")?.addEventListener("click", () => {
    profile.showNutrition = !profile.showNutrition;
    saveP();
    renderHealthView();
  });

  sec.querySelector("#btn-add-custom-meal")?.addEventListener("click", () => {
    B().openFormModal("🍽️ إضافة وجبة خاصة بك", `
      <div class="form-group"><label>اسم الوجبة ومكوناتها</label><input name="title" required placeholder="مثال: 4 بيضات + شوفان / صدور دجاج وأرز..." /></div>
      <div class="form-group"><label>توقيت الوجبة</label><input name="time" placeholder="الإفطار — 9:00 صباحاً" /></div>
      <div class="form-group"><label>السعرات أو البروتين (اختياري)</label><input name="macros" placeholder="600 kcal • 45g Protein" /></div>
    `, async (d) => {
      profile.customMeals = profile.customMeals || [];
      profile.customMeals.push(d);
      saveP();
      renderHealthView();
      toast("تمت إضافة وجبتك بنجاح 🍽️");
    });
  });

  sec.querySelectorAll("[data-del-meal]").forEach(btn => {
    btn.onclick = () => {
      profile.customMeals.splice(Number(btn.dataset.delMeal), 1);
      saveP();
      renderHealthView();
    };
  });
}

/* ============================================================================
   MODULE A: 3D VISION BOARD & LIFE GOALS STUDIO
   ============================================================================ */
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
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
      milestones: ["إنهاء الـ 29 بنداً لكل مادة", "حل جميع الشيتات", "مراجعة بطاقات 3D"],
      doneMilestones: [0]
    },
    {
      id: "g3",
      title: "الوصول لأفضل فورمة رياضية وصحية في الجيم",
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
        <small class="small-muted">صمم مستقبلك بالصور الملهمة وقسّم كل حلم إلى محطات قابلة للتحقيق</small>
      </div>
      <div class="filters-row">
        <button type="button" id="btn-ai-goal-coach" class="btn btn-outline btn-sm"><i class="fa-solid fa-wand-magic-sparkles gold-text"></i> AI Goal Coach</button>
        <button type="button" id="btn-add-life-goal" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> إضافة هدف في Vision Board</button>
      </div>
    </div>

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
                <span class="badge badge-emerald">${pct}% مكتمل</span>
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

  sec.querySelector("#btn-add-life-goal").onclick = () => {
    B().openFormModal("🎯 إضافة هدف جديد في Vision Board", `
      <div class="form-group"><label>عنوان الهدف أو الطموح</label><input name="title" required placeholder="مثال: إتقان الأمن السيبراني / شراء لابتوب جديد..." /></div>
      <div class="form-group"><label>المستوى الزمني</label>
        <select name="level">
          <option value="أهداف سنوية">أهداف سنوية</option>
          <option value="أهداف ربع سنوية">أهداف ربع سنوية</option>
          <option value="أهداف شهرية">أهداف شهرية</option>
          <option value="أهداف أسبوعية">أهداف أسبوعية</option>
        </select>
      </div>
      <div class="form-group"><label>صورة ملهمة للهدف (أو اختر ثيم جاهز)</label>
        <select name="img">
          <option value="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80">💻 هندسة البرمجيات والكود</option>
          <option value="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80">🎓 التفوق الجامعي والأكاديمي</option>
          <option value="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80">🏋️‍♂️ اللياقة البدنية والجيم</option>
          <option value="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80">💰 الحرية المالية والادخار</option>
        </select>
      </div>
      <div class="form-group"><label>الموعد النهائي</label><input type="date" name="deadline" value="${today()}" required /></div>
      <div class="form-group"><label>المحطات المرحلية (افصل بينها بفاصلة)</label><input name="milestones" required placeholder="المرحلة الأولى, المرحلة الثانية, المشروع النهائي" /></div>
    `, async (data) => {
      goals.unshift({
        id: Date.now().toString(),
        title: data.title,
        level: data.level,
        img: data.img,
        deadline: data.deadline,
        milestones: data.milestones.split(",").map(s => s.trim()).filter(Boolean),
        doneMilestones: []
      });
      OSProStore.set("goals_v3", goals);
      renderGoalsView();
      toast("تمت إضافة الهدف في لوحة الرؤية البصرية 🎯");
    });
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => setTimeout(bootOSProV3, 250));
} else {
  setTimeout(bootOSProV3, 150);
}
