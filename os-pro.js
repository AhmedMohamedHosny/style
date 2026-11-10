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
   1. UI/UX UPGRADE: 4 THEMES, COLLAPSIBLE SIDEBAR & QUICK CAPTURE (ALT+N)
   ============================================================================ */
function initThemeAndSidebarSystem() {
  injectOSProVisualStyles();
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

function applyOSTheme(themeId, notify = true) {
  document.documentElement.setAttribute("data-theme", themeId);
  localStorage.setItem("MY_LIFE_OS_THEME_V6", themeId);
  if (notify) toast(`تم تفعيل مظهر: ${themeId.toUpperCase()} ✨`);
}

function openThemeSelectorModal() {
  const cur = localStorage.getItem("MY_LIFE_OS_THEME_V6") || "midnight-gold";
  B().openFormModal("🎨 نظام الثيمات والمظهر الاحترافي (4 Themes)", `
    <p class="small-muted mb-2">اختر لوحة الألوان المريحة لعينيك أثناء الدراسة والعمل:</p>
    <div class="theme-cards-grid">
      <div class="theme-preview-card t-midnight ${cur === "midnight-gold" ? "active" : ""}" data-pick-theme="midnight-gold">
        <span class="badge badge-gold">Default</span>
        <strong>Midnight Gold</strong>
        <small>الكحلي الليلي والذهبي الهادئ</small>
      </div>
      <div class="theme-preview-card t-light ${cur === "pure-light" ? "active" : ""}" data-pick-theme="pure-light">
        <span class="badge badge-emerald">Light</span>
        <strong>Pure Light</strong>
        <small>الأبيض والرمادي النهاري</small>
      </div>
      <div class="theme-preview-card t-black ${cur === "pure-black" ? "active" : ""}" data-pick-theme="pure-black">
        <span class="badge badge-warning">OLED Dark</span>
        <strong>Pure Black</strong>
        <small>الأسود النقي عالي التباين</small>
      </div>
      <div class="theme-preview-card t-forest ${cur === "forest" ? "active" : ""}" data-pick-theme="forest">
        <span class="badge badge-emerald">Nature</span>
        <strong>Forest</strong>
        <small>الأخضر الداكن الهادئ</small>
      </div>
    </div>
  `, async () => {});

  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  document.querySelectorAll("[data-pick-theme]").forEach(card => {
    card.onclick = () => {
      applyOSTheme(card.dataset.pickTheme, true);
      document.getElementById("universal-modal")?.classList.add("hidden");
    };
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
   MODULE C (FLAGSHIP): PRO GYM, BODY TRANSFORMATION & 3D MUSCLE STUDIO
   ============================================================================ */
const GYM_EXERCISES_DB = {
  chest: [
    {
      id: "ex_bench",
      name: "Barbell / Dumbbell Bench Press • ضغط الصدر بالبار أو الدمبل",
      muscleLabel: "3D Anatomy: Pectoralis Major (الصدر الأوسط)",
      sets: "4 Sets × 10-12 Reps",
      cals: "140 kcal",
      maleImg: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
      femaleImg: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
      tips: "ثبّت لوحي الكتف في البنش، انزل بالبار ببطء حتى يلامس منتصف الصدر، وادفع للأعلى مع الزفير دون قفل الكوع بالكامل."
    },
    {
      id: "ex_incline",
      name: "Incline Dumbbell Press • تجميع دمبل عالي للصدر العلوي",
      muscleLabel: "3D Anatomy: Upper Chest & Front Delts (الصدر العلوي)",
      sets: "4 Sets × 10 Reps",
      cals: "125 kcal",
      maleImg: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80",
      femaleImg: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80",
      tips: "اضبط زاوية البنش على 30 درجة لتركيز الحمل على الصدر العلوي وتجنب إجهاد الكتف الأمامي."
    },
    {
      id: "ex_fly",
      name: "Cable Crossover / Pec Deck Fly • تفتيح صدر بالكابل أو الجهاز",
      muscleLabel: "3D Anatomy: Inner Chest Fibers (تحديد وتفصيل الصدر)",
      sets: "3 Sets × 15 Reps",
      cals: "95 kcal",
      maleImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
      femaleImg: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=80",
      tips: "حافظ على انحناء خفيف في الكوع واعصر عضلة الصدر في المنتصف لمدة ثانية كاملة."
    }
  ],
  back: [
    {
      id: "ex_lat",
      name: "Lat Pulldown / Pull-Ups • سحب عالي واسع أو عقلة للمجنص",
      muscleLabel: "3D Anatomy: Latissimus Dorsi (عضلات المجنص V-Taper)",
      sets: "4 Sets × 10-12 Reps",
      cals: "150 kcal",
      maleImg: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=900&q=80",
      femaleImg: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=900&q=80",
      tips: "اسحب البار بكوعك لأسفل باتجاه أعلى الصدر مع إرجاع الكتف للخلف وعدم المرجحة بالظهر."
    },
    {
      id: "ex_row",
      name: "Seated Cable Row / Barbell Row • سحب أرضي أو طرمبة للظهر",
      muscleLabel: "3D Anatomy: Rhomboids & Mid-Back (سمك وكثافة الظهر)",
      sets: "4 Sets × 10 Reps",
      cals: "145 kcal",
      maleImg: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80",
      femaleImg: "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=900&q=80",
      tips: "اجعل ظهرك مستقيماً تماماً واسحب القبضة نحو السرة مع ضم لوحي الكتف بقوة في نهاية الحركة."
    }
  ],
  shoulders: [
    {
      id: "ex_ohp",
      name: "Seated Dumbbell Overhead Press • ضغط أكتاف بالدمبل",
      muscleLabel: "3D Anatomy: Anterior & Medial Deltoid (الكتف الأمامي والجانبي)",
      sets: "4 Sets × 10 Reps",
      cals: "120 kcal",
      maleImg: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=900&q=80",
      femaleImg: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=80",
      tips: "اجعل الكوع للأمام قليلاً بزاوية 45 درجة لحماية مفصل الكتف وادفع الدمبل للأعلى بتحكم."
    },
    {
      id: "ex_lat_raise",
      name: "Lateral Raises • رفرفة جانبي بالدمبل لتعريض الكتف",
      muscleLabel: "3D Anatomy: Lateral Deltoid (الكتف الجانبي 3D)",
      sets: "4 Sets × 15 Reps",
      cals: "95 kcal",
      maleImg: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=900&q=80",
      femaleImg: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=900&q=80",
      tips: "ارفع بوزن متوسط حتى مستوى الكتف مع قيادة الحركة بالكوع وليس المعصم."
    }
  ],
  arms: [
    {
      id: "ex_bicep",
      name: "EZ-Bar / Dumbbell Bicep Curls • تبادل بايسبس بالدمبل أو البار الزجزاج",
      muscleLabel: "3D Anatomy: Biceps Brachii (البايسبس والرأس الطويل)",
      sets: "3 Sets × 12 Reps",
      cals: "90 kcal",
      maleImg: "https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=900&q=80",
      femaleImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
      tips: "ثبّت كوعك بجانب جسمك تماماً واعصر عضلة الباي في الأعلى مع نزول بطيء في 3 ثوانٍ."
    },
    {
      id: "ex_tricep",
      name: "Tricep Rope Pushdown • مسطرة أو حبل ترايسبس بالكابل",
      muscleLabel: "3D Anatomy: Triceps Lateral & Long Head (الترايسبس)",
      sets: "4 Sets × 12-15 Reps",
      cals: "95 kcal",
      maleImg: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=900&q=80",
      femaleImg: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
      tips: "افتح الحبل في أسفل الحركة للخارج مع تثبيت الكوع تماماً لتشغيل الرأس الجانبي للترايسبس."
    }
  ],
  legs: [
    {
      id: "ex_squat",
      name: "Barbell Squat / Leg Press • سكوات أو دفع أرجل لتقوية السفلي",
      muscleLabel: "3D Anatomy: Quadriceps & Glutes (الأفخاذ الأمامية والأرداف)",
      sets: "4 Sets × 10-12 Reps",
      cals: "190 kcal",
      maleImg: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=900&q=80",
      femaleImg: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80",
      tips: "حافظ على استقامة الظهر، وادفع الأرض بكعب القدم مع جعل الركبة في نفس اتجاه مشط القدم."
    },
    {
      id: "ex_rdl",
      name: "Romanian Deadlift & Hip Thrust • رفعة رومانية للخلفي والأرداف",
      muscleLabel: "3D Anatomy: Hamstrings & Gluteus Maximus (الخلفي والأرداف)",
      sets: "4 Sets × 12 Reps",
      cals: "175 kcal",
      maleImg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
      femaleImg: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=900&q=80",
      tips: "ارجع بالحوض للخلف مع ثنية بسيطة في الركبة حتى تشعر بشد كامل في العضلة الخلفية."
    }
  ],
  core: [
    {
      id: "ex_abs",
      name: "Hanging Leg Raises & Plank • رفع الأرجل للبطن وبلانك للـ Core",
      muscleLabel: "3D Anatomy: Rectus Abdominis & Obliques (عضلات البطن Six-Pack)",
      sets: "4 Sets × 15 Reps + 60s Plank",
      cals: "110 kcal",
      maleImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
      femaleImg: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=900&q=80",
      tips: "لف الحوض للأعلى عند رفع الأرجل لتشغيل عضلات البطن السفلية بدلاً من مفصل الفخذ."
    }
  ]
};

let activeMuscleGroup = "chest";
let activeRestTimerInterval = null;

function calculatePhysiologyMetrics(profile) {
  const w = Number(profile.currentWeight) || 75;
  const tw = Number(profile.targetWeight) || 70;
  const h = Number(profile.height) || 175;
  const age = Number(profile.age) || 22;
  const isMale = profile.gender !== "female";
  const days = Number(profile.daysPerWeek) || 4;

  const heightM = h / 100;
  const bmi = +(w / (heightM * heightM)).toFixed(1);
  const bmiStatus = bmi < 18.5 ? "نحافة (يحتاج زيادة)" : bmi < 25 ? "وزن مثالي وصحي ✅" : bmi < 30 ? "زيادة وزن خفيفة" : "سمنة (يحتاج تنشيف)";

  // معادلة Mifflin-St Jeor العلمية الدقيقة للذكور والإناث
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

function build3DMuscleSVG(selectedMuscle, isMale) {
  return `
    <svg viewBox="0 0 220 340" class="muscle-svg-interactive" xmlns="http://www.w3.org/2000/svg">
      <!-- هالة إضاءة ثلاثية الأبعاد -->
      <ellipse cx="110" cy="318" rx="68" ry="12" fill="rgba(25, 184, 137, 0.22)" />
      <!-- الرأس والرقبة -->
      <circle cx="110" cy="34" r="19" fill="#1e293b" stroke="#D4A72C" stroke-width="2" />
      <rect x="102" y="53" width="16" height="12" rx="4" fill="#334155" />

      <!-- الأكتاف (Shoulders 3D) -->
      <g class="muscle-zone ${selectedMuscle === "shoulders" ? "active" : ""}" data-muscle-pick="shoulders">
        <ellipse cx="64" cy="78" rx="16" ry="14" />
        <ellipse cx="156" cy="78" rx="16" ry="14" />
      </g>

      <!-- الصدر (Chest 3D) -->
      <g class="muscle-zone ${selectedMuscle === "chest" ? "active" : ""}" data-muscle-pick="chest">
        <path d="M78 66 L109 66 L109 102 L80 98 Z" />
        <path d="M111 66 L142 66 L140 98 L111 102 Z" />
      </g>

      <!-- المجنص والظهر الجانبي (Back Lats V-Taper 3D) -->
      <g class="muscle-zone ${selectedMuscle === "back" ? "active" : ""}" data-muscle-pick="back">
        <path d="M76 96 L84 148 L70 128 Z" />
        <path d="M144 96 L136 148 L150 128 Z" />
      </g>

      <!-- الذراعين باي وتراي (Arms 3D) -->
      <g class="muscle-zone ${selectedMuscle === "arms" ? "active" : ""}" data-muscle-pick="arms">
        <rect x="46" y="92" width="16" height="58" rx="8" />
        <rect x="158" y="92" width="16" height="58" rx="8" />
      </g>

      <!-- عضلات البطن (Core & Six-Pack 3D) -->
      <g class="muscle-zone ${selectedMuscle === "core" ? "active" : ""}" data-muscle-pick="core">
        <rect x="86" y="104" width="22" height="16" rx="4" />
        <rect x="112" y="104" width="22" height="16" rx="4" />
        <rect x="87" y="123" width="21" height="16" rx="4" />
        <rect x="112" y="123" width="21" height="16" rx="4" />
        <rect x="89" y="142" width="19" height="16" rx="4" />
        <rect x="112" y="142" width="19" height="16" rx="4" />
      </g>

      <!-- عضلات الأرجل والأرداف (Legs & Glutes 3D) -->
      <g class="muscle-zone ${selectedMuscle === "legs" ? "active" : ""}" data-muscle-pick="legs">
        <path d="M82 164 L107 164 L103 245 L80 245 Z" />
        <path d="M113 164 L138 164 L140 245 L117 245 Z" />
        <rect x="82" y="250" width="19" height="55" rx="8" />
        <rect x="119" y="250" width="19" height="55" rx="8" />
      </g>
    </svg>
  `;
}

function renderHealthView() {
  const sec = document.getElementById("view-health");
  if (!sec) return;

  const profile = OSProStore.get("gym_profile_v3", {
    isConfigured: false,
    name: B().getAppState?.()?.user?.displayName || "أحمد محمد حسني",
    gender: "male", // "male" | "female"
    age: 21,
    height: 178,
    currentWeight: 74,
    targetWeight: 82,
    goal: "bulk", // "bulk" | "cut" | "recomp"
    level: "متوسط",
    place: "الجيم الكامل 🏋️‍♂️",
    daysPerWeek: 4,
    waterCups: 6,
    sleepHours: 7.5,
    steps: 7500,
    completedExercisesToday: []
  });

  // إذا لم يقم المستخدم بإعداد بيانات جسمه وطموحه بعد، نعرض له شاشة الإعداد الرياضي المصورة الفخمة أولاً
  if (!profile.isConfigured) {
    sec.innerHTML = `
      <div class="card" style="max-width:860px; margin:0 auto; border-color:var(--gold-primary);">
        <div class="text-center mb-2">
          <span class="badge badge-gold">STEP 1 • SMART BODY & GYM ONBOARDING</span>
          <h2 class="mt-1">🏋️‍♂️ إعداد ملفك الرياضي وطموحك الجسدي (3D Gym Studio)</h2>
          <p class="small-muted">أدخل بياناتك الحقيقية وطموحك ليقوم النظام ببناء برنامجك التدريبي المصور وجدول تغذيتك وسعراتك تلقائياً:</p>
        </div>

        <form id="gym-onboarding-form">
          <label class="small-muted d-block mb-1">1. اختر النوع (لحساب معدلات الحرق والبرنامج المناسب):</label>
          <div class="gym-gender-switch">
            <div class="gender-select-card ${profile.gender === "male" ? "active" : ""}" data-pick-gender="male">
              <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=300&q=80" alt="Male Athlete" />
              <div>
                <strong class="gold-text">ذكر (Male Athlete 🚹)</strong>
                <small class="small-muted d-block">برامج الضخامة العضلية، القوة، والتنشيف الرياضي</small>
              </div>
            </div>
            <div class="gender-select-card ${profile.gender === "female" ? "active" : ""}" data-pick-gender="female">
              <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=300&q=80" alt="Female Athlete" />
              <div>
                <strong class="gold-text">أنثى (Female Athlete 🚺)</strong>
                <small class="small-muted d-block">برامج نحت القوام، اللياقة، وتقوية العضلات والـ Core</small>
              </div>
            </div>
          </div>
          <input type="hidden" name="gender" id="gym-inp-gender" value="${esc(profile.gender)}" />

          <div class="dashboard-grid" style="grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px;">
            <div class="form-group">
              <label>الاسم الرياضي</label>
              <input type="text" name="name" value="${esc(profile.name)}" required />
            </div>
            <div class="form-group">
              <label>العمر (بالسنوات)</label>
              <input type="number" name="age" min="12" max="80" value="${profile.age}" required />
            </div>
            <div class="form-group">
              <label>الطول (بالسنتيمتر cm)</label>
              <input type="number" name="height" min="120" max="230" value="${profile.height}" required />
            </div>
            <div class="form-group">
              <label>وزنك الحالي (كجم kg)</label>
              <input type="number" step="0.5" name="currentWeight" value="${profile.currentWeight}" required />
            </div>
            <div class="form-group">
              <label class="gold-text">🎯 طموحك توصل لكام كيلو؟ (kg)</label>
              <input type="number" step="0.5" name="targetWeight" value="${profile.targetWeight}" required />
            </div>
            <div class="form-group">
              <label>هدفك الأساسي</label>
              <select name="goal">
                <option value="bulk" ${profile.goal === "bulk" ? "selected" : ""}>💪 تضخيم وبناء عضل صافي (Bulking)</option>
                <option value="cut" ${profile.goal === "cut" ? "selected" : ""}>🔥 تنشيف وحرق دهون ونحت (Cutting)</option>
                <option value="recomp" ${profile.goal === "recomp" ? "selected" : ""}>⚡ إعادة تشكيل الجسم ولياقة شاملة (Recomp)</option>
              </select>
            </div>
            <div class="form-group">
              <label>مكان التمرين المفضل</label>
              <select name="place">
                <option value="الجيم الكامل 🏋️‍♂️">الجيم الكامل (أجهزة وأوزان حرة) 🏋️‍♂️</option>
                <option value="المنزل بالدمبل 🏠">في المنزل (دمبل ووزن الجسم) 🏠</option>
              </select>
            </div>
            <div class="form-group">
              <label>عدد أيام التمرين أسبوعياً</label>
              <select name="daysPerWeek">
                <option value="3">3 أيام (Push / Pull / Legs)</option>
                <option value="4" selected>4 أيام (Upper / Lower Split)</option>
                <option value="5">5 أيام (Pro Split)</option>
                <option value="6">6 أيام (PPL × 2 مكثف)</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-gold btn-block btn-luxury-shine mt-2">
            <i class="fa-solid fa-dumbbell"></i> إنشاء برنامجي التدريبي المصور وملف تغذيتي الآن 🚀
          </button>
        </form>
      </div>
    `;

    sec.querySelectorAll("[data-pick-gender]").forEach(card => {
      card.onclick = () => {
        sec.querySelectorAll("[data-pick-gender]").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        document.getElementById("gym-inp-gender").value = card.dataset.pickGender;
      };
    });

    sec.querySelector("#gym-onboarding-form").onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const data = Object.fromEntries(fd.entries());
      Object.assign(profile, {
        ...data,
        isConfigured: true,
        age: Number(data.age),
        height: Number(data.height),
        currentWeight: Number(data.currentWeight),
        targetWeight: Number(data.targetWeight),
        daysPerWeek: Number(data.daysPerWeek)
      });
      OSProStore.set("gym_profile_v3", profile);
      toast(`أهلاً بك يا كابتن ${profile.name}! تم توليد برنامجك المصور وحساب سعراتك بنجاح 💪🔥`);
      renderHealthView();
    };
    return;
  }

  // الحسابات الرياضية والغذائية بناءً على بيانات المستخدم
  const isMale = profile.gender !== "female";
  const m = calculatePhysiologyMetrics(profile);
  const heroBg = isMale
    ? "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80"
    : "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80";

  const exercisesList = GYM_EXERCISES_DB[activeMuscleGroup] || GYM_EXERCISES_DB.chest;
  const muscleNamesAr = {
    chest: "عضلات الصدر (Chest 3D)",
    back: "عضلات الظهر والمجنص (Back & Lats 3D)",
    shoulders: "عضلات الأكتاف (Shoulders 3D)",
    arms: "عضلات الباي والتراي (Arms 3D)",
    legs: "عضلات الأرجل والأرداف (Legs & Glutes 3D)",
    core: "عضلات البطن والجذع (Abs & Core 3D)"
  };

  sec.innerHTML = `
    <!-- 1. الهيرو بانر الرياضي المصور (يعرض بيانات البطل والفرق للوصول للوزن الطموح) -->
    <div class="pro-hero-banner" style="background-image: linear-gradient(90deg, rgba(9,13,25,0.95) 0%, rgba(9,13,25,0.72) 55%, rgba(9,13,25,0.92) 100%), url('${heroBg}');">
      <div class="pro-hero-overlay">
        <div>
          <div class="filters-row mb-1">
            <span class="badge badge-gold">${isMale ? "🚹 برنامج رجالي محترف" : "🚺 برنامج نسائي محترف"}</span>
            <span class="badge badge-emerald">${esc(profile.place)} • ${profile.daysPerWeek} أيام/أسبوع</span>
            <span class="badge badge-warning">BMI: ${m.bmi} (${m.bmiStatus})</span>
          </div>
          <h2>كابتن <span class="gold-text">${esc(profile.name)}</span> — رحلة الوصول إلى <span class="gold-text">${profile.targetWeight} kg</span></h2>
          <p class="small-muted mt-1">
            الوزن الحالي: <strong>${profile.currentWeight} kg</strong> &bull;
            الطول: <strong>${profile.height} cm</strong> &bull;
            العمر: <strong>${profile.age} سنة</strong> &bull;
            الفرق عن طموحك: <strong class="gold-text">${m.weightDiff > 0 ? `+${m.weightDiff} كجم زيادة عضلية مطلوبة` : m.weightDiff < 0 ? `${m.weightDiff} كجم نزول دهون مطلوب` : "وصلت لوزنك المثالي! 🎯"}</strong>
          </p>
        </div>
        <div class="filters-row">
          <button type="button" id="btn-gym-water-plus" class="btn btn-gold btn-sm">💧 + كوب مية (${profile.waterCups}/10)</button>
          <button type="button" id="btn-gym-edit-profile" class="btn btn-outline btn-sm"><i class="fa-solid fa-Sliders gold-text"></i> تعديل بياناتي وطموحي</button>
        </div>
      </div>
    </div>

    <!-- 2. شريط السعرات والماكروز اليومية المحسوبة أوتوماتيكياً لجسمك -->
    <div class="kpi-grid">
      <div class="macro-ring-box">
        <small class="small-muted">🔥 السعرات اليومية للوصول لطموحك</small>
        <h3 class="gold-text mt-1">${m.targetCalories.toLocaleString()} kcal</h3>
        <small class="small-note">معدل الحرق الأساسي TDEE: ${m.tdee} kcal</small>
      </div>
      <div class="macro-ring-box">
        <small class="small-muted">🥩 البروتين اليومي لبناء العضل</small>
        <h3 style="color:#19B889;" class="mt-1">${m.proteinG} جرام</h3>
        <small class="small-muted">${Math.round(m.proteinG * 4)} سعر حراري</small>
      </div>
      <div class="macro-ring-box">
        <small class="small-muted">🍚 الكربوهيدرات للطاقة والتمرين</small>
        <h3 style="color:#21C5C5;" class="mt-1">${m.carbsG} جرام</h3>
        <small class="small-muted">${Math.round(m.carbsG * 4)} سعر حراري</small>
      </div>
      <div class="macro-ring-box">
        <small class="small-muted">🥑 الدهون الصحية والمياه</small>
        <h3 style="color:#F59E0B;" class="mt-1">${m.fatsG}g دهون • ${m.waterLiters}L مية</h3>
        <small class="small-muted">النوم: ${profile.sleepHours} س • الخطوات: ${profile.steps}</small>
      </div>
    </div>

    <!-- 3. منطقة المجسم العضلي التفاعلي 3D + بطاقات التمارين المصورة -->
    <div class="gym-layout-split">
      <!-- المجسم التشريحي ثلاثي الأبعاد لاختيار العضلة -->
      <div class="muscle-3d-stage">
        <span class="badge badge-gold">3D INTERACTIVE MUSCLE MAP</span>
        <h4 class="mt-1">${muscleNamesAr[activeMuscleGroup]}</h4>
        <small class="small-muted d-block">اضغط على أي عضلة في المجسم أو من الأزرار لعرض تمارينها المصورة:</small>

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
          <span>⏱️ مؤقت الراحة بين المجموعات:</span>
          <strong id="gym-rest-timer-lbl" class="gold-text">00:60</strong>
        </div>
        <button type="button" id="btn-start-rest-60" class="btn btn-outline btn-xs btn-block mt-1">
          <i class="fa-solid fa-stopwatch gold-text"></i> ابدأ راحة 60 ثانية بين الجولات
        </button>
      </div>

      <!-- بطاقات التمارين بالصور الرياضية الحقيقية + جدول الوجبات -->
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div class="card">
          <div class="card-header">
            <h3><i class="fa-solid fa-dumbbell gold-text"></i> تمارين ${muscleNamesAr[activeMuscleGroup]} (بالصور الحقيقية والأداء الصحيح)</h3>
            <span class="badge badge-emerald">أنجزت اليوم: ${(profile.completedExercisesToday || []).length} تمارين</span>
          </div>

          <div class="exercise-photo-grid">
            ${exercisesList.map(ex => {
              const imgUrl = isMale ? ex.maleImg : ex.femaleImg;
              const isDone = (profile.completedExercisesToday || []).includes(ex.id);
              return `
                <div class="exercise-pro-card">
                  <div class="exercise-img-box">
                    <img src="${imgUrl}" alt="${esc(ex.name)}" loading="lazy" />
                    <span class="exercise-3d-tag"><i class="fa-solid fa-cube"></i> ${esc(ex.muscleLabel)}</span>
                    <span class="exercise-sets-pill">${esc(ex.sets)}</span>
                  </div>
                  <div class="exercise-body">
                    <div class="flex-between">
                      <h4>${esc(ex.name)}</h4>
                      <span class="badge badge-gold">🔥 ${esc(ex.cals)}</span>
                    </div>
                    <div class="exercise-steps-box">
                      <strong class="gold-text d-block">📐 الأداء الهندسي الصحيح:</strong>
                      ${esc(ex.tips)}
                    </div>
                    <button type="button" class="btn btn-sm ${isDone ? "btn-gold" : "btn-outline"} btn-block mt-1" data-toggle-ex-done="${ex.id}">
                      <i class="fa-solid ${isDone ? "fa-circle-check" : "fa-check"}"></i>
                      ${isDone ? "تم إنجاز هذا التمرين اليوم ✅" : "سجّل التمرين كمكتمل اليوم"}
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- جدول التغذية والوجبات المولّد حسب سعراتك وهدفك -->
        <div class="card">
          <div class="card-header">
            <h3><i class="fa-solid fa-utensils gold-text"></i> البرنامج الغذائي المحسوب لهدفك (${m.targetCalories} kcal • ${m.proteinG}g بروتين)</h3>
            <button type="button" id="btn-ai-custom-diet" class="btn btn-xs btn-gold"><i class="fa-solid fa-wand-magic-sparkles"></i> اطلب بدائل وجبات بالـ AI</button>
          </div>
          <div class="items-grid">
            <div class="item-card">
              <span class="badge badge-gold">☀️ الوجبة الأولى (الإفطار)</span>
              <h4 class="mt-1">شوفان بالحليب + 4 بيضات مسلوقة + ثمرة موز</h4>
              <small class="small-note">~${Math.round(m.targetCalories * 0.28)} kcal • ${Math.round(m.proteinG * 0.3)}g Protein</small>
            </div>
            <div class="item-card">
              <span class="badge badge-emerald">⚡ الوجبة الثانية (قبل/بعد التمرين)</span>
              <h4 class="mt-1">250 جرام صدور دجاج مشوية أو لحم/سمك + أرز بسمتي + سلطة خضراء</h4>
              <small class="small-note">~${Math.round(m.targetCalories * 0.42)} kcal • ${Math.round(m.proteinG * 0.45)}g Protein</small>
            </div>
            <div class="item-card">
              <span class="badge badge-warning">🌙 الوجبة الثالثة (العشاء والاستشفاء)</span>
              <h4 class="mt-1">جبن قريش أو زبادي يوناني + مكسرات صحية + بطاطا أو توست بني</h4>
              <small class="small-note">~${Math.round(m.targetCalories * 0.30)} kcal • ${Math.round(m.proteinG * 0.25)}g Protein</small>
            </div>
          </div>
          <div id="gym-ai-diet-box" class="subject-progress-box mt-2 hidden" style="white-space:pre-line;"></div>
        </div>
      </div>
    </div>
  `;

  // ربط أحداث مجسم العضلات 3D والأزرار
  sec.querySelectorAll("[data-muscle-pick]").forEach(el => {
    el.onclick = () => {
      activeMuscleGroup = el.dataset.musclePick;
      renderHealthView();
    };
  });

  sec.querySelector("#btn-gym-edit-profile").onclick = () => {
    profile.isConfigured = false;
    OSProStore.set("gym_profile_v3", profile);
    renderHealthView();
  };

  sec.querySelector("#btn-gym-water-plus").onclick = () => {
    profile.waterCups = (Number(profile.waterCups) || 0) + 1;
    OSProStore.set("gym_profile_v3", profile);
    renderHealthView();
    toast("عاش يا بطل! تم تسجيل كوب مياه جديد 💧");
  };

  sec.querySelectorAll("[data-toggle-ex-done]").forEach(btn => {
    btn.onclick = () => {
      const exId = btn.dataset.toggleExDone;
      profile.completedExercisesToday = profile.completedExercisesToday || [];
      if (profile.completedExercisesToday.includes(exId)) {
        profile.completedExercisesToday = profile.completedExercisesToday.filter(x => x !== exId);
      } else {
        profile.completedExercisesToday.push(exId);
        toast("وحش الجيم! تم تسجيل التمرين كمكتمل اليوم 💪🔥");
      }
      OSProStore.set("gym_profile_v3", profile);
      renderHealthView();
    };
  });

  sec.querySelector("#btn-start-rest-60").onclick = () => {
    if (activeRestTimerInterval) clearInterval(activeRestTimerInterval);
    let secs = 60;
    const lbl = document.getElementById("gym-rest-timer-lbl");
    toast("بدأ مؤقت الراحة بين الجولات (60 ثانية) ⏱️", "info");
    activeRestTimerInterval = setInterval(() => {
      secs--;
      if (lbl) lbl.textContent = `00:${String(Math.max(0, secs)).padStart(2, "0")}`;
      if (secs <= 0) {
        clearInterval(activeRestTimerInterval);
        toast("انتهت الراحة! ادخل الجولة التالية بقوة 🔥💪");
      }
    }, 1000);
  };

  sec.querySelector("#btn-ai-custom-diet").onclick = async () => {
    const out = document.getElementById("gym-ai-diet-box");
    out.classList.remove("hidden");
    out.textContent = "⏳ جاري إعداد جدول وجبات مصري اقتصادي محسوب السعرات والماكروز...";
    const reply = await B().askAI?.(`أنا ${isMale ? "شاب" : "فتاة"} عمري ${profile.age} سنة، طولي ${profile.height} سم، وزني الحالي ${profile.currentWeight} كجم وطموحي الوصول إلى ${profile.targetWeight} كجم. احتياجي اليومي ${m.targetCalories} سعر حراري و ${m.proteinG} جرام بروتين. اكتب لي 3 بدائل وجبات مصرية اقتصادية وعملية محسوبة بالجرامات.`);
    out.textContent = reply;
  };
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
