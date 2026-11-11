/**
 * ============================================================================
 * MY LIFE OS — USER SUGGESTIONS PORTAL & MASTER ADMIN CONTROL PANEL (admin.js)
 * Real-Time Firebase Firestore Sync (`app_suggestions` & `system_broadcasts`)
 *
 * 1. User Suggestions Tab (`view-suggestions`):
 *    - Any user can submit feature requests, UI tweaks, new tracks, or bug reports.
 *    - Live status tracking (قيد المراجعة ⏳ / جاري التنفيذ 🚀 / تم التنفيذ ✅).
 *    - Upvote / Like community ideas & read official replies from Eng: Ahmed M Hosny.
 *
 * 2. Master Admin Control Panel (`view-admin-panel` — For Eng: Ahmed M Hosny):
 *    - Auto-unlocked for Admin Email/Name or via Admin PIN (Default: 2026).
 *    - Live Inbox of all user suggestions across Firebase with filters & search.
 *    - 1-Click Status Update + Official Developer Reply box.
 *    - 1-Click "Convert Suggestion to My Tasks / Projects" in MY LIFE OS.
 *    - Global Broadcast System: Send a live announcement banner to all users.
 * ============================================================================
 */

import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
   1. STATE & REAL-TIME FIRESTORE SUBSCRIPTION FOR SUGGESTIONS & BROADCASTS
   ============================================================================ */
const AdminState = {
  suggestions: [],
  broadcast: null,
  filterStatus: "all",
  filterCategory: "all",
  searchQuery: "",
  isAdminUnlocked: localStorage.getItem("MY_LIFE_OS_ADMIN_UNLOCKED") === "1",
  unsubSuggestions: null,
  unsubBroadcast: null
};

function isCurrentUserFounder() {
  const user = B().getAppState?.()?.user;
  if (!user) return AdminState.isAdminUnlocked;
  const email = (user.email || "").toLowerCase();
  const name = (user.displayName || "").toLowerCase();
  return (
    AdminState.isAdminUnlocked ||
    email.includes("ahmed") ||
    name.includes("أحمد") ||
    name.includes("ahmed")
  );
}

function injectAdminStyles() {
  if (document.getElementById("os-admin-panel-styles")) return;
  const st = document.createElement("style");
  st.id = "os-admin-panel-styles";
  st.textContent = `
    .admin-hero-banner {
      background: linear-gradient(135deg, rgba(212, 167, 44, 0.18), rgba(15, 22, 38, 0.96));
      border: 1.5px solid var(--gold-primary);
      border-radius: 20px;
      padding: 22px 26px;
      margin-bottom: 22px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65);
    }
    .suggestion-card {
      background: linear-gradient(160deg, rgba(18, 25, 43, 0.94), rgba(10, 14, 24, 0.98));
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 18px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      transition: all 0.25s ease;
    }
    .suggestion-card:hover {
      border-color: var(--gold-primary);
      transform: translateY(-3px);
    }
    .dev-reply-box {
      background: rgba(25, 184, 137, 0.1);
      border-right: 3px solid #19B889;
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 0.84rem;
      margin-top: 6px;
    }
    .global-broadcast-banner {
      background: linear-gradient(90deg, rgba(212, 167, 44, 0.22), rgba(25, 184, 137, 0.18));
      border-bottom: 1px solid var(--gold-primary);
      padding: 8px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      font-size: 0.86rem;
    }
    .upvote-btn {
      background: rgba(212, 167, 44, 0.12);
      border: 1px solid rgba(212, 167, 44, 0.35);
      color: var(--gold-primary);
      padding: 5px 12px;
      border-radius: 99px;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .upvote-btn:hover {
      background: var(--gold-primary);
      color: #05070e;
    }
  `;
  document.head.appendChild(st);
}

function connectFirestoreAdminStreams() {
  const db = B().getAppState?.()?.db;
  if (!db) {
    setTimeout(connectFirestoreAdminStreams, 800);
    return;
  }

  if (AdminState.unsubSuggestions) AdminState.unsubSuggestions();
  AdminState.unsubSuggestions = onSnapshot(
    collection(db, "app_suggestions"),
    (snap) => {
      const list = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
      list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      AdminState.suggestions = list;
      updateAdminBadgeCount();
      if (document.getElementById("view-suggestions")?.classList.contains("active")) {
        renderUserSuggestionsView();
      }
      if (document.getElementById("view-admin-panel")?.classList.contains("active")) {
        renderMasterAdminPanelView();
      }
    },
    (err) => {
      console.warn("Suggestions listener fallback to localStorage:", err);
      AdminState.suggestions = JSON.parse(localStorage.getItem("MY_LIFE_OS_LOCAL_SUGGESTIONS") || "[]");
    }
  );

  if (AdminState.unsubBroadcast) AdminState.unsubBroadcast();
  AdminState.unsubBroadcast = onSnapshot(
    doc(db, "system_broadcasts", "latest"),
    (docSnap) => {
      if (docSnap.exists()) {
        AdminState.broadcast = docSnap.data();
        renderGlobalBroadcastBar();
      }
    },
    () => {}
  );
}

function updateAdminBadgeCount() {
  const pendingCount = AdminState.suggestions.filter(s => (s.status || "قيد المراجعة") === "قيد المراجعة").length;
  const badge = document.getElementById("admin-nav-pending-badge");
  if (badge) {
    badge.textContent = pendingCount;
    badge.classList.toggle("hidden", pendingCount === 0);
  }
}

function renderGlobalBroadcastBar() {
  const b = AdminState.broadcast;
  let bar = document.getElementById("os-global-broadcast-bar");
  if (!b || !b.active || !b.message) {
    bar?.remove();
    return;
  }
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "os-global-broadcast-bar";
    bar.className = "global-broadcast-banner";
    const topbar = document.querySelector(".topbar");
    topbar?.insertAdjacentElement("afterend", bar);
  }
  bar.innerHTML = `
    <div>
      <span class="badge badge-gold"><i class="fa-solid fa-bullhorn"></i> إشعار الإدارة • Eng: Ahmed M Hosny</span>
      <strong style="margin-inline-start:8px;">${esc(b.message)}</strong>
    </div>
    <button type="button" class="btn-icon" onclick="this.parentElement.remove()" title="إخفاء"><i class="fa-solid fa-xmark"></i></button>
  `;
}

/* ============================================================================
   2. INJECT SIDEBAR TABS & TOPBAR ADMIN SHORTCUT
   ============================================================================ */
function injectSuggestionsAndAdminTabs() {
  injectAdminStyles();
  const nav = document.querySelector(".sidebar-nav");
  const main = document.querySelector(".main-content");
  const footer = document.querySelector(".app-footer");
  if (!nav || !main) return;

  // 1. تبويب المقترحات وطلبات التطوير (متاح لكل المستخدمين)
  if (!nav.querySelector('[data-view="suggestions"]')) {
    const sugBtn = document.createElement("button");
    sugBtn.className = "nav-item";
    sugBtn.dataset.view = "suggestions";
    sugBtn.innerHTML = `<i class="fa-solid fa-lightbulb gold-text"></i> <span>المقترحات وطلبات التطوير</span>`;
    sugBtn.onclick = () => {
      B().switchView?.("suggestions");
      renderUserSuggestionsView();
    };
    nav.appendChild(sugBtn);
  }

  if (!document.getElementById("view-suggestions")) {
    const secSug = document.createElement("section");
    secSug.id = "view-suggestions";
    secSug.className = "view-section";
    main.insertBefore(secSug, footer);
  }

  // 2. تبويب لوحة التحكم العليا للمهندس أحمد محمد حسني (Admin Control Panel)
  if (!nav.querySelector('[data-view="admin-panel"]')) {
    const admBtn = document.createElement("button");
    admBtn.className = "nav-item";
    admBtn.dataset.view = "admin-panel";
    admBtn.innerHTML = `
      <i class="fa-solid fa-crown gold-text"></i>
      <span style="flex:1;">لوحة تحكم الإدارة (Admin)</span>
      <span id="admin-nav-pending-badge" class="badge badge-danger hidden">0</span>
    `;
    admBtn.onclick = () => {
      B().switchView?.("admin-panel");
      renderMasterAdminPanelView();
    };
    nav.appendChild(admBtn);
  }

  if (!document.getElementById("view-admin-panel")) {
    const secAdm = document.createElement("section");
    secAdm.id = "view-admin-panel";
    secAdm.className = "view-section";
    main.insertBefore(secAdm, footer);
  }

  // إضافة أيقونة سريعة للوحة التحكم في الشريط العلوي
  const dock = document.getElementById("os-super-topbar-dock") || document.querySelector(".topbar-end");
  if (dock && !document.getElementById("btn-topbar-admin-open")) {
    const topAdm = document.createElement("button");
    topAdm.type = "button";
    topAdm.id = "btn-topbar-admin-open";
    topAdm.className = "btn-icon gold-glow";
    topAdm.title = "لوحة تحكم الإدارة ومقترحات المستخدمين (Eng: Ahmed M Hosny)";
    topAdm.innerHTML = `<i class="fa-solid fa-crown gold-text"></i>`;
    topAdm.onclick = () => {
      B().switchView?.("admin-panel");
      renderMasterAdminPanelView();
    };
    dock.prepend(topAdm);
  }
}

/* ============================================================================
   3. USER SUGGESTIONS PORTAL VIEW (FOR ALL USERS TO SUBMIT IDEAS)
   ============================================================================ */
async function submitNewSuggestion(payload) {
  const db = B().getAppState?.()?.db;
  const user = B().getAppState?.()?.user;
  const record = {
    title: payload.title,
    category: payload.category || "إضافة ميزة جديدة ✨",
    priority: payload.priority || "مهم",
    details: payload.details,
    authorName: user?.displayName || payload.authorName || "مستخدم MY LIFE OS",
    authorEmail: user?.email || "user@mylifeos.app",
    authorUid: user?.uid || "guest",
    status: "قيد المراجعة",
    adminReply: "",
    upvotes: 1,
    date: today(),
    createdAt: serverTimestamp()
  };

  try {
    if (db && navigator.onLine) {
      await addDoc(collection(db, "app_suggestions"), record);
    } else {
      throw new Error("Offline");
    }
  } catch (e) {
    const local = JSON.parse(localStorage.getItem("MY_LIFE_OS_LOCAL_SUGGESTIONS") || "[]");
    local.unshift({ ...record, id: "loc_" + Date.now(), createdAt: { seconds: Math.floor(Date.now() / 1000) } });
    localStorage.setItem("MY_LIFE_OS_LOCAL_SUGGESTIONS", JSON.stringify(local));
    AdminState.suggestions = local;
  }
  toast("تم إرسال مقترحك بنجاح إلى لوحة تحكم المهندس أحمد محمد حسني! 🚀");
  renderUserSuggestionsView();
}

function renderUserSuggestionsView() {
  const sec = document.getElementById("view-suggestions");
  if (!sec) return;

  const list = AdminState.suggestions;
  const statusBadgeClass = (st) =>
    st === "تم التنفيذ" ? "badge-emerald" : st === "جاري التنفيذ" ? "badge-gold" : st === "مؤجل" ? "badge-danger" : "badge-warning";

  sec.innerHTML = `
    <div class="admin-hero-banner">
      <div class="flex-between" style="flex-wrap:wrap; gap:14px;">
        <div>
          <span class="badge badge-gold"><i class="fa-solid fa-lightbulb"></i> بوابة تطوير منظومة MY LIFE OS</span>
          <h2 class="mt-1">شاركنا أفكارك ومقترحاتك لتطوير النظام 💡</h2>
          <p class="small-muted">جميع المقترحات تصل لحظياً إلى لوحة تحكم المهندس <strong>Eng: Ahmed M Hosny</strong> لمراجعتها وتنفيذها في التحديثات القادمة.</p>
        </div>
        <div class="filters-row">
          <button type="button" id="btn-open-new-suggestion" class="btn btn-gold">
            <i class="fa-solid fa-paper-plane"></i> إرسال مقترح أو طلب إضافة جديدة
          </button>
          ${isCurrentUserFounder() ? `
            <button type="button" id="btn-goto-admin-panel" class="btn btn-outline">
              <i class="fa-solid fa-crown gold-text"></i> فتح لوحة تحكم الإدارة (${list.length})
            </button>
          ` : ""}
        </div>
      </div>
    </div>

    <div class="items-grid">
      ${list.length ? list.map(s => `
        <div class="suggestion-card">
          <div>
            <div class="flex-between">
              <span class="badge badge-gold">${esc(s.category)}</span>
              <span class="badge ${statusBadgeClass(s.status)}">
                ${s.status === "تم التنفيذ" ? "✅ تم التنفيذ" : s.status === "جاري التنفيذ" ? "🚀 جاري التنفيذ" : "⏳ " + esc(s.status || "قيد المراجعة")}
              </span>
            </div>
            <h4 class="mt-2">${esc(s.title)}</h4>
            <p class="small-muted mt-1" style="white-space:pre-line;">${esc(s.details)}</p>

            ${s.adminReply ? `
              <div class="dev-reply-box">
                <strong class="gold-text d-block"><i class="fa-solid fa-check-circle"></i> رد المهندس Eng: Ahmed M Hosny:</strong>
                <span>${esc(s.adminReply)}</span>
              </div>
            ` : ""}
          </div>

          <div class="flex-between mt-2" style="border-top:1px solid rgba(255,255,255,0.07); padding-top:10px;">
            <small class="small-muted">👤 بواسطة: <strong>${esc(s.authorName)}</strong> • ${esc(s.date || "")}</small>
            <button type="button" class="upvote-btn" data-upvote-id="${esc(s.id)}">
              <i class="fa-solid fa-thumbs-up"></i> أؤيد الفكرة (${Number(s.upvotes) || 1})
            </button>
          </div>
        </div>
      `).join("") : `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <i class="fa-solid fa-lightbulb"></i>
          <p>لا توجد مقترحات مرسلة بعد. كن أول من يقترح ميزة أو إضافة جديدة للنظام!</p>
        </div>
      `}
    </div>
  `;

  sec.querySelector("#btn-open-new-suggestion")?.addEventListener("click", () => {
    const user = B().getAppState?.()?.user;
    B().openFormModal("💡 إرسال مقترح أو طلب تعديل للمهندس أحمد محمد حسني", `
      <div class="form-group">
        <label>اسمك (اختياري)</label>
        <input name="authorName" value="${esc(user?.displayName || "")}" placeholder="اكتب اسمك..." />
      </div>
      <div class="form-group">
        <label>عنوان المقترح أو الإضافة المطلوبة</label>
        <input name="title" required placeholder="مثال: إضافة قسم لتلخيص المحاضرات / تعديل في شاشة المؤقت..." autofocus />
      </div>
      <div class="form-group">
        <label>تصنيف المقترح</label>
        <select name="category">
          <option value="إضافة ميزة جديدة ✨">إضافة ميزة جديدة ✨</option>
          <option value="تعديل وتحسين الواجهة 🎨">تعديل وتحسين الواجهة 🎨</option>
          <option value="إضافة مسار برمجي أو تعليمي 📚">إضافة مسار برمجي أو تعليمي 📚</option>
          <option value="تطوير استوديو الجيم واللياقة 🏋️‍♂️">تطوير استوديو الجيم واللياقة 🏋️‍♂️</option>
          <option value="إبلاغ عن مشكلة تقنية 🐞">إبلاغ عن مشكلة تقنية 🐞</option>
        </select>
      </div>
      <div class="form-group">
        <label>درجة الأهمية</label>
        <select name="priority">
          <option value="مهم جداً 🔥">مهم جداً 🔥</option>
          <option value="متوسط ⚡">متوسط ⚡</option>
          <option value="اقتراح تحسيني 💡">اقتراح تحسيني 💡</option>
        </select>
      </div>
      <div class="form-group">
        <label>اشرح فكرتك أو التعديل المطلوب بالتفصيل</label>
        <textarea name="details" rows="4" required placeholder="اشرح كيف تريد أن تعمل هذه الميزة..."></textarea>
      </div>
    `, submitNewSuggestion);
  });

  sec.querySelector("#btn-goto-admin-panel")?.addEventListener("click", () => {
    B().switchView?.("admin-panel");
    renderMasterAdminPanelView();
  });

  sec.querySelectorAll("[data-upvote-id]").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.upvoteId;
      const item = AdminState.suggestions.find(x => x.id === id);
      if (!item) return;
      const newVotes = (Number(item.upvotes) || 1) + 1;
      const db = B().getAppState?.()?.db;
      try {
        if (db && !id.startsWith("loc_")) {
          await updateDoc(doc(db, "app_suggestions", id), { upvotes: newVotes });
        } else {
          item.upvotes = newVotes;
          localStorage.setItem("MY_LIFE_OS_LOCAL_SUGGESTIONS", JSON.stringify(AdminState.suggestions));
          renderUserSuggestionsView();
        }
        toast("تم تسجيل تأييدك لهذا المقترح! 👍");
      } catch (e) {}
    };
  });
}

/* ============================================================================
   4. MASTER ADMIN CONTROL PANEL VIEW (EXCLUSIVELY FOR ENG: AHMED M HOSNY)
   ============================================================================ */
function renderMasterAdminPanelView() {
  const sec = document.getElementById("view-admin-panel");
  if (!sec) return;

  if (!isCurrentUserFounder()) {
    sec.innerHTML = `
      <div class="card" style="max-width:480px; margin:40px auto; text-align:center;">
        <i class="fa-solid fa-shield-halved gold-text" style="font-size:3rem;"></i>
        <h3 class="mt-2">لوحة تحكم الإدارة العليا (Admin Panel)</h3>
        <p class="small-muted mt-1">هذه اللوحة مخصصة لمؤسس النظام <strong>Eng: Ahmed M Hosny</strong> لإدارة مقترحات المستخدمين وإرسال التحديثات.</p>
        <div class="form-group mt-4">
          <input type="password" id="admin-pin-verify" placeholder="أدخل كود الإدارة (الافتراضي: 2026)" style="text-align:center;" />
        </div>
        <button type="button" id="btn-unlock-admin-panel" class="btn btn-gold btn-block">فتح لوحة التحكم 🔓</button>
      </div>
    `;
    sec.querySelector("#btn-unlock-admin-panel")?.addEventListener("click", () => {
      const code = document.getElementById("admin-pin-verify")?.value.trim();
      if (code === "2026" || code === (localStorage.getItem("MY_LIFE_OS_PIN_CODE") || "2026")) {
        AdminState.isAdminUnlocked = true;
        localStorage.setItem("MY_LIFE_OS_ADMIN_UNLOCKED", "1");
        toast("مرحباً بك يا بشمهندس أحمد في لوحة القيادة العليا 👑");
        renderMasterAdminPanelView();
      } else {
        toast("كود الإدارة غير صحيح", "error");
      }
    });
    return;
  }

  const all = AdminState.suggestions;
  const pendingCount = all.filter(s => (s.status || "قيد المراجعة") === "قيد المراجعة").length;
  const inProgCount = all.filter(s => s.status === "جاري التنفيذ").length;
  const doneCount = all.filter(s => s.status === "تم التنفيذ").length;
  const totalVotes = all.reduce((sum, s) => sum + (Number(s.upvotes) || 1), 0);

  const filtered = all.filter(s => {
    const matchSt = AdminState.filterStatus === "all" || (s.status || "قيد المراجعة") === AdminState.filterStatus;
    const matchCat = AdminState.filterCategory === "all" || s.category === AdminState.filterCategory;
    const q = AdminState.searchQuery.toLowerCase();
    const matchQ = !q || (s.title || "").toLowerCase().includes(q) || (s.details || "").toLowerCase().includes(q) || (s.authorName || "").toLowerCase().includes(q);
    return matchSt && matchCat && matchQ;
  });

  sec.innerHTML = `
    <div class="admin-hero-banner">
      <div class="flex-between" style="flex-wrap:wrap; gap:14px;">
        <div>
          <span class="badge badge-gold"><i class="fa-solid fa-crown"></i> MASTER ADMIN CONTROL CENTER • ENG: AHMED M HOSNY</span>
          <h2 class="mt-1">لوحة القيادة وإدارة مقترحات المستخدمين 👑</h2>
          <p class="small-muted">تحكم كامل في طلبات التطوير الواردة من المستخدمين، الرد المباشر عليهم، تحويل المقترحات لمهام، وبث الإشعارات العامة.</p>
        </div>
        <div class="filters-row">
          <button type="button" id="btn-admin-broadcast" class="btn btn-gold btn-sm">
            <i class="fa-solid fa-bullhorn"></i> بث إشعار عام لكل المستخدمين
          </button>
          <button type="button" id="btn-admin-export-json" class="btn btn-outline btn-sm">
            <i class="fa-solid fa-download gold-text"></i> تصدير المقترحات
          </button>
        </div>
      </div>
    </div>

    <!-- كروت الإحصائيات الإدارية -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-icon gold"><i class="fa-solid fa-inbox"></i></div>
        <div class="kpi-info"><span class="kpi-label">إجمالي المقترحات الواردة</span><h3>${all.length}</h3><small>إجمالي التأييدات: ${totalVotes} صوت</small></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon danger"><i class="fa-solid fa-hourglass-half"></i></div>
        <div class="kpi-info"><span class="kpi-label">بانتظار مراجعتك</span><h3>${pendingCount}</h3><small>مقترحات جديدة</small></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon blue"><i class="fa-solid fa-gears"></i></div>
        <div class="kpi-info"><span class="kpi-label">جاري تنفيذها حالياً</span><h3>${inProgCount}</h3><small>تحت التطوير</small></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon emerald"><i class="fa-solid fa-circle-check"></i></div>
        <div class="kpi-info"><span class="kpi-label">تم تنفيذها وإطلاقها</span><h3>${doneCount}</h3><small>مكتملة بنجاح</small></div>
      </div>
    </div>

    <!-- شريط الفلترة والبحث في المقترحات الواردة -->
    <div class="section-toolbar">
      <div class="filters-row">
        <input type="search" id="adm-search-inp" class="input-sm" value="${esc(AdminState.searchQuery)}" placeholder="ابحث في المقترحات أو اسم المرسل..." />
        <select id="adm-filter-status" class="select-sm">
          <option value="all" ${AdminState.filterStatus === "all" ? "selected" : ""}>كل الحالات</option>
          <option value="قيد المراجعة" ${AdminState.filterStatus === "قيد المراجعة" ? "selected" : ""}>⏳ قيد المراجعة</option>
          <option value="جاري التنفيذ" ${AdminState.filterStatus === "جاري التنفيذ" ? "selected" : ""}>🚀 جاري التنفيذ</option>
          <option value="تم التنفيذ" ${AdminState.filterStatus === "تم التنفيذ" ? "selected" : ""}>✅ تم التنفيذ</option>
          <option value="مؤجل" ${AdminState.filterStatus === "مؤجل" ? "selected" : ""}>📌 مؤجل</option>
        </select>
      </div>
      <button type="button" id="btn-adm-add-test" class="btn btn-outline btn-sm">+ تسجيل مقترح جديد</button>
    </div>

    <!-- قائمة بطاقات التحكم في مقترحات المستخدمين -->
    <div class="items-grid">
      ${filtered.length ? filtered.map(s => `
        <div class="suggestion-card">
          <div>
            <div class="flex-between">
              <span class="badge badge-gold">${esc(s.category)}</span>
              <span class="badge badge-emerald">👍 ${Number(s.upvotes) || 1} تأييد • ${esc(s.priority || "مهم")}</span>
            </div>
            <h4 class="mt-2 gold-text">${esc(s.title)}</h4>
            <small class="small-muted d-block">👤 المرسل: <strong>${esc(s.authorName)}</strong> (${esc(s.authorEmail || "")}) • 📅 ${esc(s.date || "")}</small>
            <p class="mt-2" style="white-space:pre-line; font-size:0.9rem;">${esc(s.details)}</p>

            ${s.adminReply ? `
              <div class="dev-reply-box">
                <strong class="gold-text d-block">ردك المسجل على المستخدم:</strong>
                <span>${esc(s.adminReply)}</span>
              </div>
            ` : ""}
          </div>

          <div>
            <hr class="divider" />
            <div class="flex-between" style="flex-wrap:wrap; gap:6px;">
              <select class="select-sm" data-adm-status-id="${esc(s.id)}" style="min-width:130px;">
                <option value="قيد المراجعة" ${(s.status || "قيد المراجعة") === "قيد المراجعة" ? "selected" : ""}>⏳ قيد المراجعة</option>
                <option value="جاري التنفيذ" ${s.status === "جاري التنفيذ" ? "selected" : ""}>🚀 جاري التنفيذ</option>
                <option value="تم التنفيذ" ${s.status === "تم التنفيذ" ? "selected" : ""}>✅ تم التنفيذ</option>
                <option value="مؤجل" ${s.status === "مؤجل" ? "selected" : ""}>📌 مؤجل</option>
              </select>

              <button type="button" class="btn btn-xs btn-gold" data-adm-reply-id="${esc(s.id)}">
                <i class="fa-solid fa-reply"></i> كتابة رد
              </button>
              <button type="button" class="btn btn-xs btn-outline" data-adm-to-task="${esc(s.id)}" title="تحويل المقترح إلى مهمة في جدولك">
                <i class="fa-solid fa-list-check gold-text"></i> لمهامي
              </button>
              <button type="button" class="btn btn-xs btn-danger" data-adm-del-id="${esc(s.id)}">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `).join("") : `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <i class="fa-solid fa-inbox"></i>
          <p>لا توجد مقترحات مطابقة للفلتر الحالي في صندوق الإدارة.</p>
        </div>
      `}
    </div>
  `;

  // أحداث الفلترة والبحث
  sec.querySelector("#adm-search-inp")?.addEventListener("input", (e) => {
    AdminState.searchQuery = e.target.value;
    renderMasterAdminPanelView();
  });
  sec.querySelector("#adm-filter-status")?.addEventListener("change", (e) => {
    AdminState.filterStatus = e.target.value;
    renderMasterAdminPanelView();
  });

  sec.querySelector("#btn-adm-add-test")?.addEventListener("click", () => {
    B().switchView?.("suggestions");
    renderUserSuggestionsView();
    setTimeout(() => document.getElementById("btn-open-new-suggestion")?.click(), 100);
  });

  // تحديث حالة المقترح مباشرة في Firebase
  sec.querySelectorAll("[data-adm-status-id]").forEach(sel => {
    sel.onchange = async () => {
      const id = sel.dataset.admStatusId;
      const newStatus = sel.value;
      const db = B().getAppState?.()?.db;
      try {
        if (db && !id.startsWith("loc_")) {
          await updateDoc(doc(db, "app_suggestions", id), { status: newStatus });
        } else {
          const item = AdminState.suggestions.find(x => x.id === id);
          if (item) item.status = newStatus;
          localStorage.setItem("MY_LIFE_OS_LOCAL_SUGGESTIONS", JSON.stringify(AdminState.suggestions));
          renderMasterAdminPanelView();
        }
        toast(`تم تحديث حالة المقترح إلى: ${newStatus} ✅`);
      } catch (e) {}
    };
  });

  // كتابة رد رسمي من المهندس أحمد محمد حسني يظهر للمستخدم
  sec.querySelectorAll("[data-adm-reply-id]").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.admReplyId;
      const item = AdminState.suggestions.find(x => x.id === id);
      if (!item) return;
      const reply = prompt(`✍️ اكتب ردك الرسمي كمهندس النظام على مقترح "${item.title}":`, item.adminReply || "شكراً لمقترحك الرائع! تم اعتماده وجاري العمل على إضافته للنظام 🚀");
      if (reply === null) return;
      const db = B().getAppState?.()?.db;
      try {
        if (db && !id.startsWith("loc_")) {
          await updateDoc(doc(db, "app_suggestions", id), { adminReply: reply, status: "جاري التنفيذ" });
        } else {
          item.adminReply = reply;
          item.status = "جاري التنفيذ";
          localStorage.setItem("MY_LIFE_OS_LOCAL_SUGGESTIONS", JSON.stringify(AdminState.suggestions));
          renderMasterAdminPanelView();
        }
        toast("تم نشر ردك الرسمي وتحديث حالة المقترح! 👑✅");
      } catch (e) {}
    };
  });

  // تحويل المقترح بضغطة واحدة إلى مهمة في مهام المهندس أحمد
  sec.querySelectorAll("[data-adm-to-task]").forEach(btn => {
    btn.onclick = async () => {
      const item = AdminState.suggestions.find(x => x.id === btn.dataset.admToTask);
      if (!item) return;
      await B().createRecord?.("tasks", {
        title: `تطوير مقترح: ${item.title}`,
        description: `مرسل من: ${item.authorName} — ${item.details}`,
        dueDate: today(),
        priority: "High",
        status: "Pending",
        category: "تطوير النظام"
      });
      toast("تم إدراج المقترح في جدول مهامك بنجاح! 📋✅");
    };
  });

  // حذف مقترح
  sec.querySelectorAll("[data-adm-del-id]").forEach(btn => {
    btn.onclick = async () => {
      if (!confirm("هل تريد حذف هذا المقترح نهائياً؟")) return;
      const id = btn.dataset.admDelId;
      const db = B().getAppState?.()?.db;
      try {
        if (db && !id.startsWith("loc_")) {
          await deleteDoc(doc(db, "app_suggestions", id));
        } else {
          AdminState.suggestions = AdminState.suggestions.filter(x => x.id !== id);
          localStorage.setItem("MY_LIFE_OS_LOCAL_SUGGESTIONS", JSON.stringify(AdminState.suggestions));
          renderMasterAdminPanelView();
        }
        toast("تم حذف المقترح من قاعدة البيانات", "info");
      } catch (e) {}
    };
  });

  // بث إشعار عام لكل مستخدمي النظام
  sec.querySelector("#btn-admin-broadcast")?.addEventListener("click", () => {
    B().openFormModal("📢 بث إشعار أو إعلان عام لكل مستخدمي النظام", `
      <div class="form-group">
        <label>نص الإشعار الذي سيظهر في أعلى الشاشة لجميع المستخدمين</label>
        <input name="message" value="${esc(AdminState.broadcast?.message || "")}" required placeholder="مثال: تم إطلاق تحديث جديد لمسارات البرمجة واستوديو الجيم 3D! 🚀" />
      </div>
      <div class="form-group">
        <label>الحالة</label>
        <select name="active">
          <option value="true">🟢 تفعيل وإظهار للجميع الآن</option>
          <option value="false">🔴 إيقاف وإخفاء الإشعار</option>
        </select>
      </div>
    `, async (d) => {
      const db = B().getAppState?.()?.db;
      const payload = { message: d.message, active: d.active === "true", updatedAt: serverTimestamp() };
      AdminState.broadcast = payload;
      renderGlobalBroadcastBar();
      if (db) {
        try { await setDoc(doc(db, "system_broadcasts", "latest"), payload); } catch (e) {}
      }
      toast("تم تحديث الإشعار العام للنظام بنجاح! 📢");
    });
  });

  // تصدير جميع المقترحات كملف JSON
  sec.querySelector("#btn-admin-export-json")?.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(AdminState.suggestions, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `my-life-os-user-suggestions-${today()}.json`;
    a.click();
    toast("تم تحميل ملف جميع مقترحات المستخدمين بنجاح! 📥");
  });
}

function initAdminAndSuggestionsSystem() {
  injectSuggestionsAndAdminTabs();
  connectFirestoreAdminStreams();

  document.addEventListener("click", (e) => {
    const sugNav = e.target.closest('[data-view="suggestions"]');
    if (sugNav) {
      B().switchView?.("suggestions");
      setTimeout(renderUserSuggestionsView, 40);
    }
    const admNav = e.target.closest('[data-view="admin-panel"]');
    if (admNav) {
      B().switchView?.("admin-panel");
      setTimeout(renderMasterAdminPanelView, 40);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => setTimeout(initAdminAndSuggestionsSystem, 400));
} else {
  setTimeout(initAdminAndSuggestionsSystem, 250);
}
