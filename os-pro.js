/**
 * ============================================================================
 * MY LIFE OS — PRO EXPANSION ENGINE (os-pro.js)
 * 1. System Synergy Engine (Auto Exam->Calendar, Focus->Project/Study, Habit->XP)
 * 2. 9 New Complete Modules:
 *    - A. Life Goals & Vision Board + AI Goal Coach
 *    - B. Habits & Routines (Morning/Evening, Streaks, Bad Habits, 30-Day Grid)
 *    - C. Health & Fitness (Water, Weight, Gym, Sleep, Steps, Calories)
 *    - D. Time Intelligence (24h Timeline, Categories, Weekly Comparison)
 *    - E. Life Experiences & Bucket List (Travel, Books, Movies, Memories)
 *    - F. Second Brain & Interactive Knowledge Graph (Backlinks, Note->Task, AI)
 *    - G. Learning Center (Courses, Books, Spaced Repetition, Course->Calendar)
 *    - H. People & Contacts CRM (Mentors, Birthdays, Meeting Notes)
 *    - I. Advanced Project Management (Gantt Chart, Milestones, Dependencies)
 *    - J. Daily Journal, Weekly Review, Life Timeline & Automation Center
 * 3. MY LIFE FOCUS STUDIO V6 (Timestamp Persistence, 6 Modes, Smart Session Plan,
 *    Focus Analytics & Focus AI Coach)
 * 4. 14-Channel Ambient Sound Mixer (Presets, Fade In/Out, Sleep Timer)
 * 5. UI/UX Polish: 4 Themes (Midnight Gold, Pure Light, Pure Black, Forest),
 *    Collapsible Sidebar & Quick Capture (Alt+N)
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
  if (B().escapeHTML) return B().escapeHTML(str);
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function toast(msg, type = "success") {
  if (B().showToast) B().showToast(msg, type);
}

function today() {
  return B().todayISO ? B().todayISO() : new Date().toISOString().split("T")[0];
}

/* ============================================================================
   1. UI/UX UPGRADE: 4 THEMES, COLLAPSIBLE SIDEBAR & QUICK CAPTURE (ALT+N)
   ============================================================================ */
function initThemeAndSidebarSystem() {
  const savedTheme = localStorage.getItem("MY_LIFE_OS_THEME_V6") || "midnight-gold";
  applyOSTheme(savedTheme, false);

  const isCollapsed = localStorage.getItem("MY_LIFE_OS_SIDEBAR_COLLAPSED") === "1";
  if (isCollapsed) {
    document.getElementById("app-shell")?.classList.add("sidebar-collapsed");
  }

  // إضافة زر تصغير القائمة الجانبية + زر التسجيل الفوري Quick Capture في الشريط العلوي
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

  // تطوير زر تغيير الثيم ليدعم الـ 4 ثيمات الاحترافية
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
      <div class="theme-preview-card t-midnight ${cur === "midnight-gold" ? "active" : ""}" data- pick-theme="midnight-gold">
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
      const goals = OSProStore.get("goals", []);
      goals.unshift({ id: Date.now().toString(), title: data.title, level: "أهداف شهرية", deadline: today(), milestones: [data.extra || "الخطوة الأولى"], doneMilestones: [] });
      OSProStore.set("goals", goals);
      renderGoalsView();
      toast("تم حفظ الهدف في قسم الأهداف 🎯");
    } else if (data.captureType === "journal") {
      const journals = OSProStore.get("journals", []);
      journals.unshift({ id: Date.now().toString(), date: today(), mood: "😊 متفائل", title: data.title, content: data.extra || data.title });
      OSProStore.set("journals", journals);
      renderJournalView();
      toast("تم حفظ التدوينة في يومياتك 📔");
    }
  });
}

/* ============================================================================
   2. TIMESTAMP-PERSISTENT FOCUS STUDIO V6 + 6 MODES + SESSION PLANNER
   ============================================================================ */
function initTimestampFocusPersistence() {
  // استرجاع الوقت الحقيقي بالـ Timestamps لو عمل المستخدم Refresh للصفحة
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

  // مراقبة وتحديث الـ Timestamp كل ثانية أثناء عمل المؤقت
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

// فتح مخطط الجلسات الذكي + تحليلات التركيز + Focus AI Coach
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
    <!-- أوضاع التركيز الستة السريعة -->
    <div class="form-group">
      <label class="gold-text"><i class="fa-solid fa-Sliders"></i> 1. الأوضاع الستة للتركيز (6 Focus Modes & Presets):</label>
      <div class="filters-row mt-1">
        <button type="button" class="btn btn-xs btn-outline" data-v6-mode="25">Pomodoro (25/5)</button>
        <button type="button" class="btn btn-xs btn-outline" data-v6-mode="50">Deep Work (50د)</button>
        <button type="button" class="btn btn-xs btn-gold" data-v6-mode="90">Deep Work (90د)</button>
        <button type="button" class="btn btn-xs btn-outline" data-v6-mode="15">سبرنت سريع (15د)</button>
        <button type="button" class="btn btn-xs btn-outline" data-v6-mode="45">جلسة جامعة (45د)</button>
      </div>
    </div>

    <!-- خطة الجلسات المتسلسلة -->
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

    <!-- تحليلات التركيز (Focus Analytics) -->
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

    <!-- مدرب التركيز بالذكاء الاصطناعي (Focus AI Coach) -->
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
   3. 14-CHANNEL AMBIENT SOUND STUDIO & MIXER (WITH PRESETS & SLEEP TIMER)
   ============================================================================ */
const AMBIENT_14_CHANNELS = [
  { id: "rain", name: "Rain • مطر هادئ", icon: "fa-cloud-rain", freq: 900, type: "lowpass", mod: 0.02 },
  { id: "heavy_rain", name: "Heavy Rain • مطر غزير", icon: "fa-cloud-showers-heavy", freq: 1350, type: "lowpass", mod: 0.04 },
  { id: "thunder", name: "Thunderstorm • رعد وعواصف", icon: "fa-cloud-bolt", freq: 180, type: "lowpass", mod: 0.09 },
  { id: "ocean", name: "Ocean Waves • أمواج المحيط", icon: "fa-water", freq: 380, type: "bandpass", mod: 0.03 },
  { id: "forest", name: "Forest • نسيم الغابة", icon: "fa-tree", freq: 620, type: "bandpass", mod: 0.025 },
  { id: "birds", name: "Birds • عصافير الصباح", icon: "fa-dove", freq: 2400, type: "bandpass", mod: 0.015 },
  { id: "fireplace", name: "Fireplace • نار المدفأة", icon: "fa-fire", freq: 290, type: "lowpass", mod: 0.08 },
  { id: "coffee", name: "Coffee Shop • مقهى هادئ", icon: "fa-mug-hot", freq: 540, type: "bandpass", mod: 0.035 },
  { id: "library", name: "Library • هدوء المكتبة", icon: "fa-book-open", freq: 320, type: "lowpass", mod: 0.012 },
  { id: "white", name: "White Noise • ضوضاء بيضاء", icon: "fa-wave-square", freq: 1800, type: "lowpass", mod: 0.05 },
  { id: "pink", name: "Pink Noise • ضوضاء وردية", icon: "fa-sliders", freq: 850, type: "lowpass", mod: 0.03 },
  { id: "brown", name: "Brown Noise • تركيز عميق", icon: "fa-brain", freq: 240, type: "lowpass", mod: 0.06 },
  { id: "fan", name: "Fan Sound • مروحة هادئة", icon: "fa-fan", freq: 210, type: "bandpass", mod: 0.04 },
  { id: "crickets", name: "Night Crickets • هدوء الليل", icon: "fa-moon", freq: 3100, type: "bandpass", mod: 0.02 }
];

const Mixer14Engine = {
  volumes: {},
  nodes: {},
  sleepTimerId: null
};

function setChannel14Volume(chId, pct) {
  const vol = Math.max(0, Math.min(100, Number(pct) || 0)) / 100;
  Mixer14Engine.volumes[chId] = Math.round(vol * 100);

  if (vol === 0) {
    if (Mixer14Engine.nodes[chId]) {
      try {
        const n = Mixer14Engine.nodes[chId];
        n.gain.gain.linearRampToValueAtTime(0.0001, n.ctx.currentTime + 0.35); // Fade Out ناعم
        setTimeout(() => { try { n.source.stop(); n.source.disconnect(); } catch (e) {} }, 380);
      } catch (e) {}
      delete Mixer14Engine.nodes[chId];
    }
    return;
  }

  const ctx = B().getAudioContext?.();
  if (!ctx) return;
  const meta = AMBIENT_14_CHANNELS.find(c => c.id === chId) || AMBIENT_14_CHANNELS[0];

  if (!Mixer14Engine.nodes[chId]) {
    const bufSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (last + meta.mod * white) / (1 + meta.mod);
      last = data[i];
      if ((chId === "fireplace" || chId === "thunder") && Math.random() < 0.0018) {
        data[i] = 0.75;
      }
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = meta.type;
    filter.frequency.value = meta.freq;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol * 0.35, ctx.currentTime + 0.45); // Fade In ناعم

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
    Mixer14Engine.nodes[chId] = { source, gain, ctx };
  } else {
    const n = Mixer14Engine.nodes[chId];
    n.gain.gain.linearRampToValueAtTime(vol * 0.35, n.ctx.currentTime + 0.2);
  }
}

function stopAll14Channels() {
  AMBIENT_14_CHANNELS.forEach(c => setChannel14Volume(c.id, 0));
  toast("تم إيقاف جميع القنوات الصوتية بهدوء (Fade Out) 🔇", "info");
}

function open14ChannelAmbientMixerModal() {
  const savedPresets = OSProStore.get("ambient_presets", [
    { name: "🌧️ ليلة شتوية للمذاكرة", mix: { rain: 70, thunder: 20, fireplace: 35 } },
    { name: "☕ مقهى القراءة الصباحي", mix: { coffee: 45, rain: 30, birds: 20 } },
    { name: "🧠 عزل صوتي عميق للبرمجة", mix: { brown: 60, fan: 25, library: 30 } }
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

  B().openFormModal("🎧 استوديو وميكسر الأصوات المحيطية (14-Channel Ambient Mixer)", `
    <div class="flex-between" style="flex-wrap:wrap; gap:8px; margin-bottom:10px;">
      <div class="ai-suggestions">${presetsHtml}</div>
      <div class="filters-row">
        <button type="button" id="btn-save-amb-preset" class="btn btn-xs btn-gold"><i class="fa-solid fa-bookmark"></i> حفظ المزيج الحالي</button>
        <button type="button" id="btn-amb-sleep-timer" class="btn btn-xs btn-outline"><i class="fa-regular fa-clock"></i> مؤقت إيقاف</button>
        <button type="button" id="btn-stop-all-amb" class="btn btn-xs btn-danger">إيقاف الكل</button>
      </div>
    </div>
    <div class="ambient-14-grid">${channelsHtml}</div>
  `, async () => {});

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

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
      if (!pr) return;
      AMBIENT_14_CHANNELS.forEach(c => setChannel14Volume(c.id, pr.mix[c.id] || 0));
      toast(`تم تشغيل مزيج: ${pr.name} 🎵`);
      open14ChannelAmbientMixerModal();
    };
  });

  document.getElementById("btn-save-amb-preset").onclick = () => {
    const name = prompt("اكتب اسماً لحفظ هذا المزيج الصوتي في المفضلة:", "مزيج التركيز الخاص بي ✨");
    if (!name) return;
    savedPresets.push({ name, mix: { ...Mixer14Engine.volumes } });
    OSProStore.set("ambient_presets", savedPresets);
    toast("تم حفظ المزيج الصوتي بنجاح!");
    open14ChannelAmbientMixerModal();
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
    open14ChannelAmbientMixerModal();
  };
}

/* ============================================================================
   4. INJECT THE 9 NEW MODULES INTO SIDEBAR & WORKSPACE + SYSTEM SYNERGY
   ============================================================================ */
const NEW_PRO_MODULES = [
  { id: "goals", icon: "fa-bullseye", label: "الأهداف و Vision Board" },
  { id: "habits", icon: "fa-fire-flame-curved", label: "العادات والروتين اليومي" },
  { id: "health", icon: "fa-heart-pulse", label: "الصحة واللياقة والجيم" },
  { id: "time-intel", icon: "fa-chart-gantt", label: "ذكاء وإدارة الوقت" },
  { id: "second-brain", icon: "fa-network-wired", label: "العقل الثاني (Second Brain)" },
  { id: "learning-center", icon: "fa-book-open-reader", label: "مركز القراءة والتعلم" },
  { id: "experiences", icon: "fa-compass", label: "السفر والتجارب والأحلام" },
  { id: "contacts", icon: "fa-address-book", label: "العلاقات والتواصل" },
  { id: "journal", icon: "fa-book-journal-whills", label: "اليوميات والأتمتة" }
];

function injectProModulesIntoDOM() {
  const nav = document.querySelector(".sidebar-nav");
  const main = document.querySelector(".main-content");
  const footer = document.querySelector(".app-footer");
  if (!nav || !main) return;

  // إزالة أي بقايا لتبويب اللعبة القديم إن وجد
  nav.querySelector('[data-view="ancient-game"]')?.remove();
  document.getElementById("view-ancient-game")?.remove();

  // إضافة فاصل أنيق في القائمة الجانبية ثم الأقسام الـ 9 الجديدة
  const divider = document.createElement("div");
  divider.className = "nav-group-label";
  divider.textContent = "منظومة الحياة المتقدمة (PRO OS)";
  nav.appendChild(divider);

  NEW_PRO_MODULES.forEach(mod => {
    const btn = document.createElement("button");
    btn.className = "nav-item";
    btn.dataset.view = mod.id;
    btn.innerHTML = `<i class="fa-solid ${mod.icon} gold-text"></i> <span>${mod.label}</span>`;
    btn.onclick = () => {
      B().switchView?.(mod.id);
      renderProModuleById(mod.id);
    };
    nav.appendChild(btn);

    const sec = document.createElement("section");
    sec.id = `view-${mod.id}`;
    sec.className = "view-section";
    main.insertBefore(sec, footer);
  });

  // ربط زر السماعة في الشريط العلوي وداخل المؤقت بالميكسر ذي الـ 14 قناة
  const ambBtn = document.getElementById("btn-topbar-ambient");
  if (ambBtn) ambBtn.onclick = open14ChannelAmbientMixerModal;

  // إضافة زر مخطط الجلسات الذكي وتحليلات التركيز في الشريط العلوي بجانب ساعة البومودورو
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

  // ترقية قسم المشاريع الحالي (إضافة Gantt Chart + Milestones + الأرشيف)
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

/* --- MODULE A: LIFE GOALS & VISION BOARD + AI GOAL COACH --- */
function renderGoalsView() {
  const sec = document.getElementById("view-goals");
  if (!sec) return;
  const goals = OSProStore.get("goals", [
    { id: "g1", title: "إتقان هندسة البرمجيات Full-Stack", level: "أهداف سنوية", deadline: "2026-12-31", milestones: ["إتقان JavaScript & React", "بناء 3 مشاريع Firebase", "نشر البورتفوليو النهائي"], doneMilestones: [0, 1] },
    { id: "g2", title: "الامتياز الأكاديمي في مواد الترم", level: "أهداف ربع سنوية", deadline: "2026-06-15", milestones: ["إنهاء الـ 29 بنداً لكل مادة", "حل جميع الشيتات", "مراجعة بطاقات 3D"], doneMilestones: [0] }
  ]);

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-bullseye gold-text"></i> إدارة الأهداف والحياة (Life Goals & Vision Board)</h3>
        <small class="small-muted">أهداف سنوية • ربع سنوية • شهرية • أسبوعية • يومية مع مراحل الإنجاز</small>
      </div>
      <div class="filters-row">
        <button type="button" id="btn-ai-goal-coach" class="btn btn-outline btn-sm"><i class="fa-solid fa-wand-magic-sparkles gold-text"></i> AI Goal Coach (تحويل هدف لخطة)</button>
        <button type="button" id="btn-add-life-goal" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> هدف جديد</button>
      </div>
    </div>

    <div class="items-grid">
      ${goals.map((g, gIdx) => {
        const totalM = Math.max(1, (g.milestones || []).length);
        const doneM = (g.doneMilestones || []).length;
        const pct = Math.round((doneM / totalM) * 100);
        return `
          <div class="item-card">
            <div>
              <div class="flex-between">
                <span class="badge badge-gold">${esc(g.level)}</span>
                <small class="small-muted">الموعد: ${esc(g.deadline || "-")}</small>
              </div>
              <h4 class="mt-2">${esc(g.title)}</h4>
              <div class="subject-progress-box">
                <div class="flex-between"><small>نسبة الإنجاز الفعلي</small><strong class="gold-text">${pct}%</strong></div>
                <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
              </div>
              <div class="mt-2">
                ${(g.milestones || []).map((m, mIdx) => {
                  const isDone = (g.doneMilestones || []).includes(mIdx);
                  return `
                    <label class="check-pill ${isDone ? "completed" : ""} mb-1" style="display:flex; margin-bottom:6px;">
                      <input type="checkbox" data-goal-idx="${gIdx}" data-mile-idx="${mIdx}" ${isDone ? "checked" : ""} />
                      <span>${esc(m)}</span>
                    </label>
                  `;
                }).join("")}
              </div>
            </div>
            <div class="flex-between mt-2">
              <button type="button" class="btn btn-xs btn-outline" data-goal-to-task="${gIdx}"><i class="fa-solid fa-link gold-text"></i> ربط بالمهام</button>
              <button type="button" class="btn btn-xs btn-danger" data-del-goal-pro="${gIdx}"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  sec.querySelector("#btn-add-life-goal").onclick = () => {
    B().openFormModal("🎯 إنشاء هدف جديد ومراحله (Milestones)", `
      <div class="form-group"><label>عنوان الهدف</label><input name="title" required placeholder="مثال: إتقان البرمجة / إنهاء 3 مشاريع..." /></div>
      <div class="form-group"><label>المستوى الزمني</label>
        <select name="level">
          <option value="أهداف سنوية">أهداف سنوية</option>
          <option value="أهداف ربع سنوية">أهداف ربع سنوية</option>
          <option value="أهداف شهرية">أهداف شهرية</option>
          <option value="أهداف أسبوعية">أهداف أسبوعية</option>
          <option value="أهداف يومية">أهداف يومية</option>
        </select>
      </div>
      <div class="form-group"><label>الموعد النهائي</label><input type="date" name="deadline" value="${today()}" required /></div>
      <div class="form-group"><label>المراحل (Milestones — افصل بينها بفاصلة)</label><input name="milestones" required placeholder="المرحلة الأولى, المرحلة الثانية, التطبيق النهائي" /></div>
    `, async (data) => {
      goals.unshift({
        id: Date.now().toString(),
        title: data.title,
        level: data.level,
        deadline: data.deadline,
        milestones: data.milestones.split(",").map(s => s.trim()).filter(Boolean),
        doneMilestones: []
      });
      OSProStore.set("goals", goals);
      renderGoalsView();
      toast("تمت إضافة الهدف ومراحله بنجاح 🎯");
    });
  };

  sec.querySelector("#btn-ai-goal-coach").onclick = () => {
    B().openFormModal("🤖 AI Goal Coach — مدرب الأهداف الذكي", `
      <div class="form-group">
        <label>اكتب هدفك الكبير والمدة المتاحة (مثال: عايز أتعلم Full Stack خلال 6 شهور):</label>
        <input name="prompt" required placeholder="عايز أتعلم Full Stack خلال 6 شهور..." />
      </div>
    `, async (data) => {
      toast("جاري تقسيم الهدف بواسطة AI Goal Coach وربطه بمهامك... 🤖", "info");
      const reply = await B().askAI?.(`قسّم هذا الهدف إلى 4 مراحل عملية واضحة (Milestones) في سطور قصيرة: "${data.prompt}"`);
      const lines = reply.split("\n").map(l => l.replace(/^[-*0-9.)]+\s*/, "").trim()).filter(Boolean).slice(0, 4);
      const milestones = lines.length ? lines : ["أساسيات المجال", "التطبيق العملي الأول", "مشروع متكامل", "المراجعة والإطلاق"];
      goals.unshift({
        id: Date.now().toString(),
        title: data.prompt,
        level: "أهداف ربع سنوية",
        deadline: today(),
        milestones,
        doneMilestones: []
      });
      OSProStore.set("goals", goals);
      await B().createRecord("tasks", {
        title: `الخطوة الأولى لهدف: ${data.prompt}`,
        description: milestones.join(" ➔ "),
        dueDate: today(),
        priority: "High",
        status: "Pending",
        category: "الأهداف"
      });
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
      OSProStore.set("goals", goals);
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
      OSProStore.set("goals", goals);
      renderGoalsView();
    };
  });
}

/* --- MODULE B: HABITS & ROUTINES (STREAKS, MORNING/EVENING, QUIT BAD HABITS) --- */
function renderHabitsView() {
  const sec = document.getElementById("view-habits");
  if (!sec) return;
  const habits = OSProStore.get("habits", [
    { id: "h1", title: "قراءة 20 صفحة يومياً", routine: "روتين المساء", type: "build", streak: 5, history: [1, 2, 3, 4, 5] },
    { id: "h2", title: "مذاكرة وتدريب برمجي ساعتين", routine: "روتين الصباح", type: "build", streak: 8, history: [1, 2, 3, 4, 5, 6, 7, 8] },
    { id: "h3", title: "ترك السهر وتصفح الموبايل العشوائي", routine: "عادات للتخلص منها", type: "quit", streak: 4, history: [1, 2, 3, 4] }
  ]);

  const currentDayNum = new Date().getDate();

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-fire-flame-curved gold-text"></i> نظام العادات والروتين المتكامل (Habits & Routines)</h3>
        <small class="small-muted">روتين الصباح والمساء • سلاسل الالتزام (Streaks) • تتبع العادات المراد التخلص منها</small>
      </div>
      <button type="button" id="btn-add-habit-pro" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> إضافة عادة أو روتين</button>
    </div>

    <div class="items-grid">
      ${habits.map((h, hIdx) => {
        const pct = Math.min(100, Math.round(((h.history || []).length / 30) * 100));
        return `
          <div class="item-card">
            <div>
              <div class="flex-between">
                <span class="badge ${h.type === "quit" ? "badge-danger" : "badge-emerald"}">${esc(h.routine)}</span>
                <span class="badge badge-gold">🔥 Streak: ${h.streak || 0} يوم</span>
              </div>
              <h4 class="mt-2">${esc(h.title)}</h4>
              <small class="small-muted">نسبة التزام الشهر: ${pct}% (اضغط على أيام الشهر لتسجيل الإتمام)</small>
              <div class="habit-month-dots">
                ${Array.from({ length: 15 }, (_, i) => {
                  const d = i + 1;
                  const done = (h.history || []).includes(d);
                  return `<span class="habit-day-dot ${done ? "done" : ""}" data-hab-idx="${hIdx}" data-day-num="${d}">${d}</span>`;
                }).join("")}
              </div>
            </div>
            <div class="flex-between mt-2">
              <button type="button" class="btn btn-xs btn-gold" data-hab-today="${hIdx}"><i class="fa-solid fa-check"></i> أتممتها اليوم (+Streak)</button>
              <button type="button" class="btn btn-xs btn-danger" data-del-hab="${hIdx}"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  sec.querySelector("#btn-add-habit-pro").onclick = () => {
    B().openFormModal("🔥 إضافة عادة جديدة أو روتين يومي", `
      <div class="form-group"><label>اسم العادة</label><input name="title" required placeholder="مثال: قراءة 20 صفحة / تمرين صباحي / ترك السكر..." /></div>
      <div class="form-group"><label>التصنيف والوقت</label>
        <select name="routine">
          <option value="روتين الصباح">☀️ روتين الصباح</option>
          <option value="روتين المساء">🌙 روتين المساء</option>
          <option value="عادة يومية">⚡ عادة يومية</option>
          <option value="عادات للتخلص منها">🚫 عادة سلبية أريد التخلص منها</option>
        </select>
      </div>
    `, async (data) => {
      habits.unshift({
        id: Date.now().toString(),
        title: data.title,
        routine: data.routine,
        type: data.routine.includes("للتخلص") ? "quit" : "build",
        streak: 1,
        history: [currentDayNum]
      });
      OSProStore.set("habits", habits);
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
      OSProStore.set("habits", habits);
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
      OSProStore.set("habits", habits);
      renderHabitsView();
      toast(`عاش يا بطل! استمرارية "${h.title}" وصلت إلى ${h.streak} يوم 🔥`);
    };
  });

  sec.querySelectorAll("[data-del-hab]").forEach(btn => {
    btn.onclick = () => {
      habits.splice(Number(btn.dataset.delHab), 1);
      OSProStore.set("habits", habits);
      renderHabitsView();
    };
  });
}

/* --- MODULE C: HEALTH & FITNESS (WATER, WEIGHT, GYM, SLEEP, STEPS) --- */
function renderHealthView() {
  const sec = document.getElementById("view-health");
  if (!sec) return;
  const health = OSProStore.get("health_stats", {
    waterCups: 5,
    weightKg: 74,
    sleepHours: 7.5,
    steps: 6400,
    workouts: [
      { day: "السبت — Push (صدر وكتف وتراي)", ex: "Bench Press 4x10 + Overhead Press 3x12", calories: "450 kcal" },
      { day: "الإثنين — Pull (ظهر وباي)", ex: "Pull-ups 4x8 + Barbell Row 4x10", calories: "480 kcal" },
      { day: "الأربعاء — Legs & Core (رجل وبطن)", ex: "Squats 4x10 + Plank 3 mins", calories: "520 kcal" }
    ]
  });

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-heart-pulse gold-text"></i> الصحة واللياقة البدنية (Health & Fitness Snapshot)</h3>
        <small class="small-muted">شرب المياه • الوزن • جدول الجيم والتمارين • ساعات النوم • الخطوات</small>
      </div>
      <div class="filters-row">
        <button type="button" id="btn-add-water-cup" class="btn btn-gold btn-sm">💧 + كوب مية (${health.waterCups} / 10)</button>
        <button type="button" id="btn-update-health-metrics" class="btn btn-outline btn-sm">تحديث قياسات اليوم</button>
        <button type="button" id="btn-add-workout-row" class="btn btn-outline btn-sm">+ تمرين جيم</button>
      </div>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-icon blue"><i class="fa-solid fa-glass-water"></i></div>
        <div class="kpi-info"><span class="kpi-label">شرب المياه اليوم</span><h3>${health.waterCups} / 10 أكواب</h3><small>${(health.waterCups * 0.25).toFixed(2)} لتر</small></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon emerald"><i class="fa-solid fa-weight-scale"></i></div>
        <div class="kpi-info"><span class="kpi-label">الوزن الحالي</span><h3>${health.weightKg} kg</h3><small>تتبع اللياقة البدنية</small></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon purple"><i class="fa-solid fa-bed"></i></div>
        <div class="kpi-info"><span class="kpi-label">ساعات النوم</span><h3>${health.sleepHours} ساعات</h3><small>جودة النوم: ممتازة</small></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon gold"><i class="fa-solid fa-person-walking"></i></div>
        <div class="kpi-info"><span class="kpi-label">عدد الخطوات اليوم</span><h3>${Number(health.steps).toLocaleString()}</h3><small>الهدف اليومي: 10,000 خطوة</small></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header"><h3>🏋️‍♂️ جدول الجيم والتمارين والوجبات</h3></div>
      ${(health.workouts || []).map((w, idx) => `
        <div class="prayer-row">
          <div>
            <strong class="gold-text">${esc(w.day)}</strong>
            <p class="small-muted">${esc(w.ex)}</p>
          </div>
          <div class="config-actions">
            <span class="badge badge-emerald">${esc(w.calories || "400 kcal")}</span>
            <button type="button" class="btn btn-xs btn-danger" data-del-workout="${idx}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  sec.querySelector("#btn-add-water-cup").onclick = () => {
    health.waterCups = (Number(health.waterCups) || 0) + 1;
    OSProStore.set("health_stats", health);
    renderHealthView();
    toast("بالهنا والشفا! تم تسجيل كوب مياه جديد 💧");
  };

  sec.querySelector("#btn-update-health-metrics").onclick = () => {
    B().openFormModal("📊 تحديث قياسات الصحة والنوم والخطوات", `
      <div class="form-group"><label>أكواب المياه اليوم</label><input type="number" name="waterCups" value="${health.waterCups}" required /></div>
      <div class="form-group"><label>الوزن الحالي (kg)</label><input type="number" step="0.1" name="weightKg" value="${health.weightKg}" required /></div>
      <div class="form-group"><label>ساعات النوم الليلة الماضية</label><input type="number" step="0.5" name="sleepHours" value="${health.sleepHours}" required /></div>
      <div class="form-group"><label>عدد الخطوات اليوم</label><input type="number" name="steps" value="${health.steps}" required /></div>
    `, async (data) => {
      health.waterCups = Number(data.waterCups) || 0;
      health.weightKg = Number(data.weightKg) || 70;
      health.sleepHours = Number(data.sleepHours) || 7;
      health.steps = Number(data.steps) || 5000;
      OSProStore.set("health_stats", health);
      renderHealthView();
    });
  };

  sec.querySelector("#btn-add-workout-row").onclick = () => {
    B().openFormModal("🏋️‍♂️ إضافة يوم تمرين أو وجبة صحية", `
      <div class="form-group"><label>اليوم / اسم التمرين أو الوجبة</label><input name="day" required placeholder="مثال: الخميس — Cardio & Core" /></div>
      <div class="form-group"><label>التمارين أو تفاصيل الوجبة</label><input name="ex" required placeholder="جري 20 دقيقة + تمارين بطن" /></div>
      <div class="form-group"><label>السعرات الحرارية</label><input name="calories" value="450 kcal" /></div>
    `, async (data) => {
      health.workouts = health.workouts || [];
      health.workouts.unshift(data);
      OSProStore.set("health_stats", health);
      renderHealthView();
    });
  };

  sec.querySelectorAll("[data-del-workout]").forEach(btn => {
    btn.onclick = () => {
      health.workouts.splice(Number(btn.dataset.delWorkout), 1);
      OSProStore.set("health_stats", health);
      renderHealthView();
    };
  });
}

/* --- MODULE D: TIME INTELLIGENCE (YOUR TIME REPORT) --- */
function renderTimeIntelView() {
  const sec = document.getElementById("view-time-intel");
  if (!sec) return;

  const logs = JSON.parse(localStorage.getItem("MY_LIFE_OS_FOCUS_LOG") || "[]");
  const focusMins = logs.filter(l => l.date === today()).reduce((s, l) => s + (Number(l.minutes) || 0), 0);

  const timeEntries = OSProStore.get("time_intel", [
    { cat: "الدراسة والجامعة", mins: Math.max(200, focusMins), color: "#D4A72C" },
    { cat: "البرمجة والمشاريع", mins: 120, color: "#19B889" },
    { cat: "القراءة وتطوير الذات", mins: 45, color: "#21C5C5" },
    { cat: "الترفيه والراحة", mins: 90, color: "#3B82F6" },
    { cat: "وقت غير مصنف / ضائع", mins: 35, color: "#EF4444" }
  ]);

  const totalMins = Math.max(1, timeEntries.reduce((s, e) => s + Number(e.mins), 0));

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-chart-gantt gold-text"></i> ذكاء وإدارة الوقت (Time Intelligence — Your Time Report)</h3>
        <small class="small-muted">تحليل أين تقضي يومك: الدراسة • البرمجة • القراءة • الترفيه • الوقت الضائع</small>
      </div>
      <button type="button" id="btn-log-time-block" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> تسجيل فترة زمنية</button>
    </div>

    <div class="card mb-4" style="margin-bottom:18px;">
      <div class="flex-between">
        <h4>📊 الخريطة الزمنية لتوزيع يومك (إجمالي: ${(totalMins / 60).toFixed(1)} ساعة)</h4>
        <span class="badge badge-emerald">كفاءة استثمار الوقت: ${Math.round(((totalMins - (timeEntries[4]?.mins || 0)) / totalMins) * 100)}%</span>
      </div>
      <div class="time-intel-bar">
        ${timeEntries.map(e => {
          const pct = Math.round((e.mins / totalMins) * 100);
          return `<div class="time-segment" style="width:${pct}%; background:${e.color};" title="${esc(e.cat)}: ${e.mins} د">${pct >= 10 ? pct + "%" : ""}</div>`;
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
                <button type="button" class="btn-link" data-add-15m="${idx}">+15د</button>
              </div>
              <h4 class="mt-1">${h > 0 ? h + " ساعة و " : ""}${m} دقيقة</h4>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  sec.querySelector("#btn-log-time-block").onclick = () => {
    B().openFormModal("⏱️ تسجيل وقت في تقرير اليوم", `
      <div class="form-group"><label>الفئة</label>
        <select name="catIdx">
          ${timeEntries.map((e, i) => `<option value="${i}">${esc(e.cat)}</option>`).join("")}
        </select>
      </div>
      <div class="form-group"><label>المدة بالدقائق</label><input type="number" name="mins" value="45" required /></div>
    `, async (data) => {
      const target = timeEntries[Number(data.catIdx)];
      if (target) target.mins = (Number(target.mins) || 0) + (Number(data.mins) || 0);
      OSProStore.set("time_intel", timeEntries);
      renderTimeIntelView();
    });
  };

  sec.querySelectorAll("[data-add-15m]").forEach(btn => {
    btn.onclick = () => {
      const item = timeEntries[Number(btn.dataset.add15m)];
      if (item) item.mins += 15;
      OSProStore.set("time_intel", timeEntries);
      renderTimeIntelView();
    };
  });
}

/* --- MODULE F: SECOND BRAIN & KNOWLEDGE GRAPH --- */
function renderSecondBrainView() {
  const sec = document.getElementById("view-second-brain");
  if (!sec) return;
  const state = B().getAppState?.() || { collections: { notes: [], subjects: [], projects: [] } };
  const notes = state.collections.notes || [];

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-network-wired gold-text"></i> العقل الثاني وشبكة المعرفة (Second Brain & Knowledge Graph)</h3>
        <small class="small-muted">الروابط المتشعبة [[Backlinks]] • تحويل الملاحظات لمهام • خريطة ترابط الأفكار التفاعلية</small>
      </div>
      <div class="filters-row">
        <button type="button" id="btn-sb-ai-connect" class="btn btn-outline btn-sm"><i class="fa-solid fa-wand-magic-sparkles gold-text"></i> AI يربط ويلخص معرفتي</button>
        <button type="button" id="btn-sb-new-thought" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> عقدة معرفة جديدة</button>
      </div>
    </div>

    <div class="card mb-4" style="margin-bottom:18px;">
      <div class="flex-between mb-1">
        <h4>🕸️ خريطة شبكة المعرفة الحية (Knowledge Graph — اضغط وحرك العقد)</h4>
        <small class="small-muted">تربط ملاحظاتك بموادك ومشاريعك البرمجية بصرياً</small>
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
            <button type="button" class="btn btn-xs btn-gold" data-note-to-task="${n.id}"><i class="fa-solid fa-list-check"></i> تحويل إلى مهمة</button>
            <small class="small-muted">#${esc(n.tags || "معرفة")}</small>
          </div>
        </div>
      `).join("") || `<p class="small-muted">أضف ملاحظاتك لتظهر كعقد مترابطة في شبكة المعرفة.</p>`}
    </div>
  `;

  drawInteractiveKnowledgeGraph(notes, state.collections.subjects || [], state.collections.projects || []);

  sec.querySelector("#btn-sb-new-thought").onclick = () => {
    document.getElementById("btn-add-note")?.click();
  };

  sec.querySelector("#btn-sb-ai-connect").onclick = async () => {
    const box = document.getElementById("sb-ai-summary-box");
    box.classList.remove("hidden");
    box.textContent = "⏳ جاري تحليل جميع ملاحظاتك واستخراج الروابط المعرفية بينها...";
    const titles = notes.map(n => n.title).join("، ") || "هندسة البرمجيات والدوائر المنطقية";
    const reply = await B().askAI?.(`لدي في عقلي الثاني الملاحظات التالية: (${titles}). لخص الروابط المعرفية بينها واقترح فكرة تطبيقية تجمعها في 3 نقاط مركزة.`);
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
    ...subjects.slice(0, 4).map((s, i) => ({ label: `📚 ${s.name}`, x: 160 + i * 170, y: 75, r: 15, color: "#19B889" })),
    ...projects.slice(0, 4).map((p, i) => ({ label: `💻 ${p.title}`, x: 180 + i * 170, y: 265, r: 15, color: "#21C5C5" })),
    ...notes.slice(0, 6).map((n, i) => ({ label: `💡 ${n.title.slice(0, 18)}`, x: 110 + i * 130, y: i % 2 === 0 ? 130 : 215, r: 13, color: "#8B5CF6" }))
  ];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // رسم خطوط الترابط العصبي
  nodes.forEach((nd, i) => {
    if (i === 0) return;
    ctx.strokeStyle = "rgba(212, 167, 44, 0.25)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    ctx.lineTo(nd.x, nd.y);
    ctx.stroke();
  });

  // رسم العقد المضيئة
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

/* --- MODULE G: LEARNING CENTER (COURSES, BOOKS & COURSE->CALENDAR) --- */
function renderLearningCenterView() {
  const sec = document.getElementById("view-learning-center");
  if (!sec) return;
  const items = OSProStore.get("learning_items", [
    { id: "c1", title: "كورس Full-Stack JavaScript & Firebase", type: "Course", totalUnits: 24, doneUnits: 16, nextReview: today() },
    { id: "c2", title: "كتاب Clean Code — Robert C. Martin", type: "Book", totalUnits: 460, doneUnits: 190, nextReview: today() }
  ]);

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-book-open-reader gold-text"></i> مركز القراءة والتعلم الذاتي (Learning Center)</h3>
        <small class="small-muted">مكتبة الكورسات • الكتب • المراجعة المتباعدة • تحويل أي كورس لخطة في التقويم والمهام</small>
      </div>
      <button type="button" id="btn-add-learning-item" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> إضافة كورس أو كتاب</button>
    </div>

    <div class="items-grid">
      ${items.map((it, idx) => {
        const pct = Math.min(100, Math.round((it.doneUnits / Math.max(1, it.totalUnits)) * 100));
        return `
          <div class="item-card">
            <div>
              <div class="flex-between">
                <span class="badge badge-gold">${it.type === "Book" ? "📖 كتاب" : "🎓 كورس تدريبي"}</span>
                <small class="gold-text">مراجعة: ${esc(it.nextReview)}</small>
              </div>
              <h4 class="mt-2">${esc(it.title)}</h4>
              <div class="subject-progress-box">
                <div class="flex-between"><span>التقدم: ${it.doneUnits} / ${it.totalUnits}</span><strong>${pct}%</strong></div>
                <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
              </div>
            </div>
            <div class="flex-between mt-2">
              <button type="button" class="btn btn-xs btn-gold" data-inc-learn="${idx}">+ تقدم</button>
              <button type="button" class="btn btn-xs btn-outline" data-course-to-cal="${idx}"><i class="fa-regular fa-calendar-plus gold-text"></i> توزيع على التقويم والمهام</button>
              <button type="button" class="btn btn-xs btn-danger" data-del-learn="${idx}"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  sec.querySelector("#btn-add-learning-item").onclick = () => {
    B().openFormModal("🎓 إضافة كورس أو كتاب للمكتبة", `
      <div class="form-group"><label>اسم الكورس أو الكتاب</label><input name="title" required /></div>
      <div class="form-group"><label>النوع</label><select name="type"><option value="Course">كورس تدريبي</option><option value="Book">كتاب للقراءة</option></select></div>
      <div class="form-group"><label>إجمالي الدروس أو الصفحات</label><input type="number" name="totalUnits" value="20" required /></div>
      <div class="form-group"><label>المنجز حالياً</label><input type="number" name="doneUnits" value="0" required /></div>
    `, async (data) => {
      items.unshift({
        id: Date.now().toString(),
        title: data.title,
        type: data.type,
        totalUnits: Number(data.totalUnits) || 20,
        doneUnits: Number(data.doneUnits) || 0,
        nextReview: today()
      });
      OSProStore.set("learning_items", items);
      renderLearningCenterView();
    });
  };

  sec.querySelectorAll("[data-inc-learn]").forEach(btn => {
    btn.onclick = () => {
      const it = items[Number(btn.dataset.incLearn)];
      if (!it) return;
      it.doneUnits = Math.min(it.totalUnits, (Number(it.doneUnits) || 0) + (it.type === "Book" ? 15 : 1));
      OSProStore.set("learning_items", items);
      renderLearningCenterView();
    };
  });

  sec.querySelectorAll("[data-course-to-cal]").forEach(btn => {
    btn.onclick = async () => {
      const it = items[Number(btn.dataset.courseToCal)];
      if (!it) return;
      await B().createRecord("tasks", {
        title: `دراسة وحدة من: ${it.title}`,
        description: `خطة التعلم الذاتي (${it.doneUnits}/${it.totalUnits})`,
        dueDate: today(),
        priority: "High",
        status: "Pending",
        category: "تعلم"
      });
      await B().createRecord("events", {
        title: `موعد مذاكرة: ${it.title}`,
        date: today(),
        time: "18:00",
        type: "University"
      });
      toast("تم تحويل الكورس إلى خطة مهام وموعد في تقويمك تلقائياً! 📅✅");
    };
  });

  sec.querySelectorAll("[data-del-learn]").forEach(btn => {
    btn.onclick = () => {
      items.splice(Number(btn.dataset.delLearn), 1);
      OSProStore.set("learning_items", items);
      renderLearningCenterView();
    };
  });
}

/* --- MODULE E, H, J: EXPERIENCES, CONTACTS CRM & JOURNAL / AUTOMATION --- */
function renderExperiencesView() {
  const sec = document.getElementById("view-experiences");
  if (!sec) return;
  const list = OSProStore.get("experiences", [
    { title: "رحلة استكشافية إلى أسوان والأقصر", cat: "سفر ورحلات ✈️", status: "قائمة الأمنيات", note: "في إجازة نصف العام" },
    { title: "بناء وإطلاق منصة SaaS متكاملة", cat: "أحلام شخصية 🚀", status: "جاري التحقيق", note: "مشروع MY LIFE OS" }
  ]);

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-compass gold-text"></i> السفر والتجارب وقائمة الأحلام (Life Experiences)</h3>
        <small class="small-muted">أماكن تريد زيارتها • تجارب • كتب وأفلام • سجل الذكريات والرحلات</small>
      </div>
      <button type="button" id="btn-add-exp" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> إضافة تجربة أو حلم</button>
    </div>
    <div class="items-grid">
      ${list.map((ex, i) => `
        <div class="item-card">
          <div>
            <div class="flex-between"><span class="badge badge-gold">${esc(ex.cat)}</span><span class="badge badge-emerald">${esc(ex.status)}</span></div>
            <h4 class="mt-2">${esc(ex.title)}</h4>
            <p class="small-muted mt-1">${esc(ex.note || "")}</p>
          </div>
          <button type="button" class="btn btn-xs btn-danger" data-del-exp="${i}"><i class="fa-solid fa-trash"></i></button>
        </div>
      `).join("")}
    </div>
  `;

  sec.querySelector("#btn-add-exp").onclick = () => {
    B().openFormModal("🌍 إضافة مكان أو تجربة أو حلم شخصي", `
      <div class="form-group"><label>العنوان</label><input name="title" required /></div>
      <div class="form-group"><label>الفئة</label>
        <select name="cat"><option value="سفر ورحلات ✈️">سفر ورحلات ✈️</option><option value="تجربة جديدة 🌟">تجربة جديدة 🌟</option><option value="أحلام شخصية 🚀">أحلام شخصية 🚀</option><option value="أفلام وكتب 🎬">أفلام وكتب 🎬</option></select>
      </div>
      <div class="form-group"><label>الحالة</label><select name="status"><option value="قائمة الأمنيات">قائمة الأمنيات</option><option value="تمت التجربة ✅">تمت التجربة ✅</option></select></div>
      <div class="form-group"><label>ملاحظات وذكريات</label><input name="note" /></div>
    `, async (d) => {
      list.unshift(d);
      OSProStore.set("experiences", list);
      renderExperiencesView();
    });
  };
  sec.querySelectorAll("[data-del-exp]").forEach(b => {
    b.onclick = () => { list.splice(Number(b.dataset.delExp), 1); OSProStore.set("experiences", list); renderExperiencesView(); };
  });
}

function renderContactsView() {
  const sec = document.getElementById("view-contacts");
  if (!sec) return;
  const contacts = OSProStore.get("contacts_crm", [
    { name: "فريق مشروع الكلية", role: "زملاء دراسة وعمل", date: today(), note: "متابعة تقسيم مهام المشروع الأسبوعية" }
  ]);

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-address-book gold-text"></i> العلاقات والتواصل والشبكة المهنية (People & Contacts)</h3>
        <small class="small-muted">الأشخاص المهمون • مواعيد المناسبات • ملاحظات الاجتماعات</small>
      </div>
      <button type="button" id="btn-add-contact" class="btn btn-gold btn-sm"><i class="fa-solid fa-user-plus"></i> إضافة شخص / مناسبة</button>
    </div>
    <div class="items-grid">
      ${contacts.map((c, i) => `
        <div class="item-card">
          <div>
            <div class="flex-between"><span class="badge badge-gold">${esc(c.role)}</span><small class="small-muted">مناسبة/تواصل: ${esc(c.date)}</small></div>
            <h4 class="mt-2">${esc(c.name)}</h4>
            <p class="small-muted mt-1">${esc(c.note)}</p>
          </div>
          <button type="button" class="btn btn-xs btn-danger" data-del-cnt="${i}"><i class="fa-solid fa-trash"></i></button>
        </div>
      `).join("")}
    </div>
  `;

  sec.querySelector("#btn-add-contact").onclick = () => {
    B().openFormModal("🤝 إضافة شخص مهم أو مناسبة", `
      <div class="form-group"><label>الاسم</label><input name="name" required /></div>
      <div class="form-group"><label>العلاقة / الدور المهني</label><input name="role" required placeholder="أستاذ جامعي / صديق / عميل..." /></div>
      <div class="form-group"><label>تاريخ المناسبة أو المتابعة القادمة</label><input type="date" name="date" value="${today()}" /></div>
      <div class="form-group"><label>ملاحظات شخصية عن الاجتماعات</label><textarea name="note" rows="2"></textarea></div>
    `, async (d) => {
      contacts.unshift(d);
      OSProStore.set("contacts_crm", contacts);
      renderContactsView();
    });
  };
  sec.querySelectorAll("[data-del-cnt]").forEach(b => {
    b.onclick = () => { contacts.splice(Number(b.dataset.delCnt), 1); OSProStore.set("contacts_crm", contacts); renderContactsView(); };
  });
}

function renderJournalView() {
  const sec = document.getElementById("view-journal");
  if (!sec) return;
  const journals = OSProStore.get("journals", [
    { date: today(), mood: "🔥 حماسي", title: "انطلاقة نظام MY LIFE OS Pro", content: "تم دمج منظومة الأهداف والعادات وذكاء الوقت والميكسر الصوتي بالكامل." }
  ]);

  sec.innerHTML = `
    <div class="section-toolbar">
      <div>
        <h3><i class="fa-solid fa-book-journal-whills gold-text"></i> اليوميات، المراجعة الأسبوعية، وسجل إنجازات الحياة</h3>
        <small class="small-muted">Daily Journal • Weekly Review • Life Timeline • تصدير التقويم (.ICS)</small>
      </div>
      <div class="filters-row">
        <button type="button" id="btn-export-ics" class="btn btn-outline btn-sm"><i class="fa-regular fa-calendar-check gold-text"></i> تصدير التقويم الخارجي (.ICS)</button>
        <button type="button" id="btn-add-journal" class="btn btn-gold btn-sm"><i class="fa-solid fa-pen-fancy"></i> تدوينة يومية جديدة</button>
      </div>
    </div>
    <div class="items-grid">
      ${journals.map((j, i) => `
        <div class="item-card">
          <div>
            <div class="flex-between"><span class="badge badge-gold">${esc(j.mood)}</span><small class="small-muted">${esc(j.date)}</small></div>
            <h4 class="mt-2">${esc(j.title)}</h4>
            <p class="small-muted mt-1">${esc(j.content)}</p>
          </div>
          <button type="button" class="btn btn-xs btn-danger" data-del-jrn="${i}"><i class="fa-solid fa-trash"></i></button>
        </div>
      `).join("")}
    </div>
  `;

  sec.querySelector("#btn-add-journal").onclick = () => {
    B().openFormModal("📔 كتابة يوميات أو مراجعة أسبوعية", `
      <div class="form-group"><label>الحالة المزاجية</label><select name="mood"><option value="🔥 حماسي">🔥 حماسي</option><option value="😊 هادئ وممتن">😊 هادئ وممتن</option><option value="🏆 إنجاز عالي">🏆 إنجاز عالي</option></select></div>
      <div class="form-group"><label>عنوان اليوم أو المحطة</label><input name="title" required /></div>
      <div class="form-group"><label>التفاصيل والدروس المستفادة</label><textarea name="content" rows="4" required></textarea></div>
    `, async (d) => {
      journals.unshift({ ...d, date: today() });
      OSProStore.set("journals", journals);
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
    toast("تم تصدير ملف التقويم القياسي (.ICS) لربطه بـ Google/Apple Calendar! 📅");
  };

  sec.querySelectorAll("[data-del-jrn]").forEach(b => {
    b.onclick = () => { journals.splice(Number(b.dataset.delJrn), 1); OSProStore.set("journals", journals); renderJournalView(); };
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
  // عندما يضيف المستخدم امتحاناً أو واجباً في الجامعة، يُضاف تلقائياً للتقويم إذا لم يكن موجوداً
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

// تشغيل المنظومة بالكامل عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initThemeAndSidebarSystem();
    injectProModulesIntoDOM();
    initTimestampFocusPersistence();
    initSystemSynergy();
  }, 350);
});