/**
 * ============================================================================
 * MY LIFE OS — COMPLETE ENGINE (Firebase v10 Modular SDK + AI Actions + PWA)
 * Zero Mock Data | 100% Real Firestore & Storage CRUD | RTL/LTR Bilingual
 * ============================================================================
 */

import { initializeApp, getApps, deleteApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  deleteUser,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

/* ============================================================================
   1. DYNAMIC PWA MANIFEST (WITH WEB SHARE TARGET) & SERVICE WORKER
   ============================================================================ */
function injectPWAManifestAndSW() {
  const manifestObj = {
    name: "MY LIFE OS — Personal Operating System",
    short_name: "MY LIFE OS",
    description: "Complete Personal Life Operating System Powered by Firebase & AI",
    start_url: window.location.pathname || "./index.html",
    display: "standalone",
    background_color: "#07090e",
    theme_color: "#d4af37",
    orientation: "portrait-primary",
    icons: [
      {
        src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%2307090e'/><circle cx='50' cy='50' r='34' fill='%23d4af37'/></svg>",
        sizes: "192x192",
        type: "image/svg+xml"
      }
    ],
    share_target: {
      action: window.location.pathname || "./index.html",
      method: "GET",
      enctype: "application/x-www-form-urlencoded",
      params: {
        title: "shared_title",
        text: "shared_text",
        url: "shared_url"
      }
    }
  };

  const manifestBlob = new Blob([JSON.stringify(manifestObj)], { type: "application/manifest+json" });
  const manifestLink = document.createElement("link");
  manifestLink.rel = "manifest";
  manifestLink.href = URL.createObjectURL(manifestBlob);
  document.head.appendChild(manifestLink);

  if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Fallback safely if sw.js is not hosted separately in 3-file IDE preview
    });
  }
}
injectPWAManifestAndSW();

/* ============================================================================
   2. AUTHENTIC ADHKAR SOURCE (VERIFIED TEXTS ONLY)
   ============================================================================ */
const AUTHENTIC_ADHKAR = {
  morning: [
    { id: "m1", text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", target: 1, source: "رواه مسلم" },
    { id: "m2", text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ.", target: 1, source: "رواه الترمذي" },
    { id: "m3", text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.", target: 3, source: "رواه مسلم" },
    { id: "m4", text: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.", target: 3, source: "رواه أبو داود والترمذي" }
  ],
  evening: [
    { id: "e1", text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.", target: 1, source: "رواه مسلم" },
    { id: "e2", text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ.", target: 1, source: "رواه الترمذي" },
    { id: "e3", text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.", target: 3, source: "رواه مسلم" }
  ]
};

/* ============================================================================
   3. APPLICATION STATE (STRICTLY POPULATED FROM FIREBASE — NO MOCK DATA)
   ============================================================================ */
const AppState = {
  app: null,
  auth: null,
  db: null,
  storage: null,
  user: null,
  unsubscribers: [],
  lang: "ar",
  theme: "dark",
  currency: "EGP",
  fontSize: "normal",
  calDate: new Date(),
  calMode: "month",
  adhkarMode: "morning",
  adhkarCounts: {},
  pendingAIAction: null,
  activeDownloadAbort: null,
  charts: {
    finance: null,
    tasksReport: null,
    projectsReport: null
  },
  collections: {
    tasks: [],
    events: [],
    subjects: [],
    lectures: [],
    prayers: [],
    quran_progress: [],
    study_records: [],
    projects: [],
    vocabulary: [],
    skills_logs: [],
    transactions: [],
    budgets: [],
    notes: [],
    files: [],
    saved_links: [],
    playlists: [],
    user_settings: []
  }
};

/* ============================================================================
   4. UTILITIES: XSS SANITIZATION, TOASTS, DATES
   ============================================================================ */
function escapeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icon = type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-exclamation" : "fa-bell";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${escapeHTML(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function todayISO() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

/* ============================================================================
   5. FIREBASE INITIALIZATION & REAL CONNECTION HANDLER
   ============================================================================ */
function getStoredFirebaseConfig() {
  try {
    const raw = localStorage.getItem("MY_LIFE_OS_FIREBASE_CONFIG");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.apiKey && parsed.projectId) return parsed;
  } catch (e) {
    return null;
  }
  return null;
}

async function initFirebaseSystem() {
  const badge = document.getElementById("fb-connection-badge");
  const statusText = document.getElementById("fb-status-text");
  const configPanel = document.getElementById("firebase-config-panel");
  const config = getStoredFirebaseConfig();

  if (!config) {
    badge.className = "badge badge-warning";
    statusText.textContent = "يرجى إدخال إعدادات مشروع Firebase للبدء";
    configPanel.classList.remove("hidden");
    return false;
  }

  try {
    if (getApps().length > 0) {
      await Promise.all(getApps().map(a => deleteApp(a)));
    }
    AppState.app = initializeApp(config);
    AppState.auth = getAuth(AppState.app);
    AppState.db = getFirestore(AppState.app);
    AppState.storage = getStorage(AppState.app);

    badge.className = "badge badge-emerald";
    statusText.textContent = `متصل بـ Firebase (${config.projectId})`;
    configPanel.classList.add("hidden");

    bindAuthListener();
    return true;
  } catch (err) {
    badge.className = "badge badge-danger";
    statusText.textContent = "خطأ في إعدادات Firebase";
    showToast("فشل تهيئة Firebase: تحقق من صحة كائن الإعدادات", "error");
    return false;
  }
}

/* ============================================================================
   6. AUTHENTICATION & ROUTE PROTECTION
   ============================================================================ */
function bindAuthListener() {
  onAuthStateChanged(AppState.auth, async (user) => {
    if (user) {
      AppState.user = user;
      document.getElementById("auth-view").classList.add("hidden");
      document.getElementById("app-shell").classList.remove("hidden");

      const displayName = user.displayName || user.email.split("@")[0];
      document.getElementById("user-display-name").textContent = displayName;
      document.getElementById("user-display-email").textContent = user.email;
      document.getElementById("dash-user-name").textContent = displayName;
      document.getElementById("set-display-name").value = displayName;
      document.getElementById("set-photo-url").value = user.photoURL || "";

      if (user.photoURL) {
        document.getElementById("user-avatar-img").src = user.photoURL;
      } else {
        document.getElementById("user-avatar-img").src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=d4af37&color=07090e`;
      }

      const verifyBanner = document.getElementById("email-verify-banner");
      if (!user.emailVerified) {
        verifyBanner.classList.remove("hidden");
      } else {
        verifyBanner.classList.add("hidden");
      }

      // Sync User Profile Document
      await setDoc(doc(AppState.db, "users", user.uid), {
        ownerUid: user.uid,
        email: user.email,
        displayName: displayName,
        updatedAt: serverTimestamp()
      }, { merge: true });

      subscribeToUserCollections(user.uid);
      checkSharedTargetURL();
    } else {
      AppState.user = null;
      clearSubscriptions();
      document.getElementById("app-shell").classList.add("hidden");
      document.getElementById("auth-view").classList.remove("hidden");
    }
  });
}

function clearSubscriptions() {
  AppState.unsubscribers.forEach(unsub => {
    if (typeof unsub === "function") unsub();
  });
  AppState.unsubscribers = [];
  Object.keys(AppState.collections).forEach(k => {
    AppState.collections[k] = [];
  });
}

/* ============================================================================
   7. REAL-TIME FIRESTORE COLLECTION LISTENERS (STRICT OWNER UID ISOLATION)
   ============================================================================ */
function subscribeToUserCollections(uid) {
  clearSubscriptions();

  const collectionNames = Object.keys(AppState.collections);
  collectionNames.forEach((colName) => {
    const q = query(collection(AppState.db, colName), where("ownerUid", "==", uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      // Sort client-side newest first
      items.sort((a, b) => {
        const ta = a.createdAt?.seconds || 0;
        const tb = b.createdAt?.seconds || 0;
        return tb - ta;
      });
      AppState.collections[colName] = items;
      renderAllViews();
    }, (error) => {
      console.error(`Firestore listener error [${colName}]:`, error);
    });
    AppState.unsubscribers.push(unsub);
  });
}

/* ============================================================================
   8. GENERIC FIRESTORE CRUD HELPERS (WAITS FOR SERVER CONFIRMATION)
   ============================================================================ */
async function createRecord(colName, payload) {
  if (!AppState.user || !AppState.db) {
    showToast("يرجى تسجيل الدخول أولاً", "error");
    return null;
  }
  if (!navigator.onLine) {
    showToast("لا يوجد اتصال بالإنترنت لإتمام الحفظ الفعلي", "error");
    return null;
  }
  try {
    const cleanData = {
      ...payload,
      ownerUid: AppState.user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    const docRef = await addDoc(collection(AppState.db, colName), cleanData);
    showToast("تم الحفظ في قاعدة البيانات بنجاح", "success");
    return docRef.id;
  } catch (err) {
    showToast("فشل الحفظ في قاعدة البيانات: " + err.message, "error");
    return null;
  }
}

async function updateRecord(colName, docId, payload) {
  if (!AppState.user || !AppState.db) return false;
  try {
    await updateDoc(doc(AppState.db, colName, docId), {
      ...payload,
      updatedAt: serverTimestamp()
    });
    showToast("تم التحديث بنجاح", "success");
    return true;
  } catch (err) {
    showToast("تعذر التحديث: " + err.message, "error");
    return false;
  }
}

async function deleteRecord(colName, docId) {
  if (!AppState.user || !AppState.db) return false;
  try {
    await deleteDoc(doc(AppState.db, colName, docId));
    showToast("تم الحذف فعلياً من قاعدة البيانات", "success");
    return true;
  } catch (err) {
    showToast("تعذر الحذف: " + err.message, "error");
    return false;
  }
}

/* ============================================================================
   9. MASTER RENDER ENGINE (DASHBOARD + ALL 14 MODULES)
   ============================================================================ */
function renderAllViews() {
  applyUserSettingsFromFirestore();
  renderDashboard();
  renderTasks();
  renderCalendar();
  renderUniversity();
  renderIslamic();
  renderProjects();
  renderLanguages();
  renderFinance();
  renderNotes();
  renderFiles();
  renderMediaCenter();
  renderReports();
}

function renderEmptyState(message, actionAttr = "", buttonLabel = "إضافة أول عنصر") {
  return `
    <div class="empty-state">
      <i class="fa-solid fa-folder-open"></i>
      <p>${escapeHTML(message)}</p>
      ${actionAttr ? `<button class="btn btn-outline btn-sm" ${actionAttr}><i class="fa-solid fa-plus"></i> ${escapeHTML(buttonLabel)}</button>` : ""}
    </div>
  `;
}

/* --- 9.1 DASHBOARD --- */
function renderDashboard() {
  const today = todayISO();
  const tasks = AppState.collections.tasks;
  const todayTasks = tasks.filter(t => t.dueDate === today);
  const completedToday = todayTasks.filter(t => t.status === "Completed").length;

  document.getElementById("kpi-tasks-today").textContent = todayTasks.filter(t => t.status !== "Completed").length;
  document.getElementById("kpi-tasks-sub").textContent = `${completedToday} مكتملة من ${todayTasks.length}`;

  // Prayers today
  const todayPrayerDoc = AppState.collections.prayers.find(p => p.date === today);
  const prayerCount = todayPrayerDoc
    ? ["fajr", "dhuhr", "asr", "maghrib", "isha"].filter(k => todayPrayerDoc[k] === true).length
    : 0;
  document.getElementById("kpi-prayers-today").textContent = `${prayerCount} / 5`;

  const todayQuran = AppState.collections.quran_progress
    .filter(q => q.date === today)
    .reduce((acc, cur) => acc + (Number(cur.ayahCount) || 0), 0);
  document.getElementById("kpi-quran-sub").textContent = `الورد اليومي: ${todayQuran} آية`;

  // Projects
  const projects = AppState.collections.projects;
  const activeProjects = projects.filter(p => p.status !== "Completed");
  const avgProgress = projects.length
    ? Math.round(projects.reduce((s, p) => s + (Number(p.progress) || 0), 0) / projects.length)
    : 0;
  document.getElementById("kpi-active-projects").textContent = activeProjects.length;
  document.getElementById("kpi-projects-sub").textContent = `متوسط الإنجاز: ${avgProgress}%`;

  // Finance
  const txs = AppState.collections.transactions;
  const income = txs.filter(t => t.type === "income").reduce((s, t) => s + (Number(t.amount) || 0), 0);
  const expense = txs.filter(t => t.type === "expense").reduce((s, t) => s + (Number(t.amount) || 0), 0);
  const net = income - expense;
  document.getElementById("kpi-net-balance").textContent = `${net.toLocaleString()} ${AppState.currency}`;
  document.getElementById("kpi-expense-month").textContent = `إجمالي المصروفات: ${expense.toLocaleString()} ${AppState.currency}`;

  // Priority Tasks Widget
  const priorityBox = document.getElementById("dash-priority-tasks");
  const priorityTasks = tasks.filter(t => t.status !== "Completed").slice(0, 5);
  if (!priorityTasks.length) {
    priorityBox.innerHTML = renderEmptyState("لا توجد مهام نشطة حالياً في حسابك.", 'data-quick-add="task"', "إضافة مهمة");
  } else {
    priorityBox.innerHTML = priorityTasks.map(t => `
      <div class="prayer-row">
        <div>
          <strong>${escapeHTML(t.title)}</strong>
          <small class="small-muted d-block">${escapeHTML(t.dueDate || "بدون موعد")} • ${escapeHTML(t.category || "عام")}</small>
        </div>
        <span class="badge ${t.priority === "Urgent" || t.priority === "High" ? "badge-danger" : "badge-gold"}">${escapeHTML(t.priority)}</span>
      </div>
    `).join("");
  }

  // Upcoming Events Widget
  const eventsBox = document.getElementById("dash-upcoming-events");
  const upcoming = AppState.collections.events.filter(e => e.date >= today).slice(0, 5);
  if (!upcoming.length) {
    eventsBox.innerHTML = renderEmptyState("لا توجد مواعيد أو امتحانات مسجلة قادمة.", 'data-quick-add="event"', "إضافة موعد");
  } else {
    eventsBox.innerHTML = upcoming.map(e => `
      <div class="prayer-row">
        <div>
          <strong>${escapeHTML(e.title)}</strong>
          <small class="small-muted"> • ${escapeHTML(e.date)} ${escapeHTML(e.time || "")}</small>
        </div>
        <span class="badge badge-gold">${escapeHTML(e.type || "عام")}</span>
      </div>
    `).join("");
  }

  // Active Projects Widget
  const projBox = document.getElementById("dash-active-projects");
  if (!projects.length) {
    projBox.innerHTML = renderEmptyState("لم تقم بإنشاء أي مشاريع بعد.");
  } else {
    projBox.innerHTML = projects.slice(0, 4).map(p => `
      <div class="mb-2">
        <div class="flex-between">
          <strong>${escapeHTML(p.title)}</strong>
          <span class="gold-text">${Number(p.progress) || 0}%</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width:${Number(p.progress) || 0}%"></div>
        </div>
      </div>
    `).join("");
  }

  // Recent Notes Widget
  const notesBox = document.getElementById("dash-recent-notes");
  const notes = AppState.collections.notes.slice(0, 4);
  if (!notes.length) {
    notesBox.innerHTML = renderEmptyState("قاعدة الملاحظات فارغة.", 'data-quick-add="note"', "إضافة ملاحظة");
  } else {
    notesBox.innerHTML = notes.map(n => `
      <div class="prayer-row">
        <div>
          <strong>${n.pinned ? '<i class="fa-solid fa-thumbtack gold-text"></i> ' : ""}${escapeHTML(n.title)}</strong>
          <p class="small-muted">${escapeHTML((n.content || "").slice(0, 70))}</p>
        </div>
      </div>
    `).join("");
  }
}

/* --- 9.2 TASKS --- */
function renderTasks() {
  const container = document.getElementById("tasks-list-container");
  const q = (document.getElementById("task-search")?.value || "").toLowerCase();
  const statusFilter = document.getElementById("task-filter-status")?.value || "all";
  const priorityFilter = document.getElementById("task-filter-priority")?.value || "all";
  const rangeFilter = document.getElementById("task-filter-range")?.value || "all";
  const today = todayISO();

  let list = AppState.collections.tasks.filter(t => {
    const matchText = (t.title || "").toLowerCase().includes(q) || (t.description || "").toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
    let matchRange = true;
    if (rangeFilter === "today") matchRange = t.dueDate === today;
    if (rangeFilter === "overdue") matchRange = t.dueDate && t.dueDate < today && t.status !== "Completed";
    if (rangeFilter === "month") matchRange = (t.dueDate || "").startsWith(today.slice(0, 7));
    return matchText && matchStatus && matchPriority && matchRange;
  });

  if (!list.length) {
    container.innerHTML = renderEmptyState("لا توجد مهام مطابقة. أضف مهمتك الحقيقية الأولى الآن.");
    return;
  }

  container.innerHTML = list.map(t => {
    const isOverdue = t.dueDate && t.dueDate < today && t.status !== "Completed";
    return `
      <div class="item-card">
        <div>
          <div class="flex-between">
            <span class="badge ${t.priority === "Urgent" || t.priority === "High" ? "badge-danger" : "badge-gold"}">${escapeHTML(t.priority)}</span>
            <span class="badge ${t.status === "Completed" ? "badge-emerald" : isOverdue ? "badge-danger" : "badge-warning"}">
              ${isOverdue ? "متأخرة • " : ""}${escapeHTML(t.status)}
            </span>
          </div>
          <h4 class="mt-2">${escapeHTML(t.title)}</h4>
          <p class="small-muted">${escapeHTML(t.description || "")}</p>
          ${t.subtasks ? `<small class="gold-text"><i class="fa-solid fa-list-ul"></i> المهام الفرعية: ${escapeHTML(t.subtasks)}</small>` : ""}
        </div>
        <div class="flex-between mt-2">
          <small class="small-muted"><i class="fa-regular fa-clock"></i> ${escapeHTML(t.dueDate || "بدون تاريخ")}</small>
          <div class="config-actions">
            <button class="btn btn-xs btn-outline" data-action="toggle-task" data-id="${t.id}">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="tasks" data-id="${t.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/* --- 9.3 CALENDAR --- */
function renderCalendar() {
  const gridContainer = document.getElementById("calendar-grid-container");
  const listContainer = document.getElementById("calendar-events-list");
  const label = document.getElementById("cal-current-label");

  const year = AppState.calDate.getFullYear();
  const month = AppState.calDate.getMonth();
  label.textContent = new Intl.DateTimeFormat(AppState.lang === "ar" ? "ar-EG" : "en-US", {
    month: "long",
    year: "numeric"
  }).format(AppState.calDate);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const events = AppState.collections.events;
  const today = todayISO();

  const dayNames = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  let html = `<div class="calendar-grid">`;
  dayNames.forEach(d => { html += `<div class="cal-day-header">${d}</div>`; });

  for (let i = 0; i < firstDay; i++) {
    html += `<div class="cal-day-cell" style="opacity:0.25"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = events.filter(e => e.date === dateStr);
    html += `
      <div class="cal-day-cell ${dateStr === today ? "today" : ""}" data-cal-date="${dateStr}">
        <strong>${day}</strong>
        ${dayEvents.map(ev => `<span class="cal-event-dot">${escapeHTML(ev.title)}</span>`).join("")}
      </div>
    `;
  }
  html += `</div>`;
  gridContainer.innerHTML = html;

  if (!events.length) {
    listContainer.innerHTML = renderEmptyState("لا توجد أحداث مسجلة في التقويم.");
  } else {
    listContainer.innerHTML = events.map(e => `
      <div class="prayer-row">
        <div>
          <strong>${escapeHTML(e.title)}</strong>
          <small class="small-muted d-block">${escapeHTML(e.date)} ${escapeHTML(e.time || "")} • ${escapeHTML(e.type || "موعد")}</small>
        </div>
        <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="events" data-id="${e.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `).join("");
  }
}

/* --- 9.4 UNIVERSITY --- */
function renderUniversity() {
  const subjBox = document.getElementById("subjects-container");
  const lectBox = document.getElementById("lectures-container");
  const gradesBox = document.getElementById("grades-container");
  const avgBadge = document.getElementById("uni-overall-avg");

  const subjects = AppState.collections.subjects;
  const lectures = AppState.collections.lectures;

  if (!subjects.length) {
    subjBox.innerHTML = renderEmptyState("لم تقم بإضافة موادك الدراسية بعد.");
  } else {
    subjBox.innerHTML = subjects.map(s => `
      <div class="item-card">
        <div>
          <div class="flex-between">
            <span class="badge badge-gold">${escapeHTML(s.code || "COURSE")}</span>
            <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="subjects" data-id="${s.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
          <h4 class="mt-2">${escapeHTML(s.name)}</h4>
          <p class="small-muted"><i class="fa-solid fa-chalkboard-user"></i> دكتور المادة: ${escapeHTML(s.professor || "غير محدد")}</p>
          <p class="small-muted"><i class="fa-regular fa-clock"></i> الموعد: ${escapeHTML(s.schedule || "غير محدد")}</p>
        </div>
      </div>
    `).join("");
  }

  if (!lectures.length) {
    lectBox.innerHTML = renderEmptyState("لا توجد محاضرات أو واجبات مسجلة حالياً.");
  } else {
    lectBox.innerHTML = lectures.map(l => `
      <div class="item-card">
        <div>
          <div class="flex-between">
            <span class="badge badge-emerald">${escapeHTML(l.subjectName || "مادة عامة")}</span>
            <span class="badge badge-gold">${escapeHTML(l.itemType || "محاضرة")}</span>
          </div>
          <h4 class="mt-2">${escapeHTML(l.title)}</h4>
          ${l.link ? `<a href="${escapeHTML(l.link)}" target="_blank" rel="noopener" class="btn-link">فتح رابط المحاضرة / الملف</a>` : ""}
        </div>
        <div class="flex-between mt-2">
          <small class="small-muted">الدرجة: ${escapeHTML(l.score || "-")} / ${escapeHTML(l.maxScore || "-")}</small>
          <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="lectures" data-id="${l.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join("");
  }

  // Grades calculation
  const gradedItems = lectures.filter(l => l.score !== undefined && l.score !== "" && Number(l.maxScore) > 0);
  if (!gradedItems.length) {
    avgBadge.textContent = "المتوسط التراكمي: لا توجد درجات مدخلة";
    gradesBox.innerHTML = renderEmptyState("أضف درجات الاختبارات أو التكليفات لحساب النتيجة الفعلية.");
  } else {
    const totalEarned = gradedItems.reduce((s, i) => s + Number(i.score), 0);
    const totalMax = gradedItems.reduce((s, i) => s + Number(i.maxScore), 0);
    const pct = totalMax > 0 ? ((totalEarned / totalMax) * 100).toFixed(1) : 0;
    avgBadge.textContent = `المتوسط الفعلي: ${pct}% (${totalEarned}/${totalMax})`;
    gradesBox.innerHTML = gradedItems.map(g => `
      <div class="prayer-row">
        <span><strong>${escapeHTML(g.title)}</strong> (${escapeHTML(g.subjectName)})</span>
        <span class="badge badge-gold">${Number(g.score)} / ${Number(g.maxScore)}</span>
      </div>
    `).join("");
  }
}

/* --- 9.5 ISLAMIC LIFE --- */
function renderIslamic() {
  const datePicker = document.getElementById("prayer-date-picker");
  if (!datePicker.value) datePicker.value = todayISO();
  const selectedDate = datePicker.value;

  const prayerDoc = AppState.collections.prayers.find(p => p.date === selectedDate) || {};
  const prayersMeta = [
    { key: "fajr", label: "صلاة الفجر" },
    { key: "dhuhr", label: "صلاة الظهر" },
    { key: "asr", label: "صلاة العصر" },
    { key: "maghrib", label: "صلاة المغرب" },
    { key: "isha", label: "صلاة العشاء" }
  ];

  const prayerList = document.getElementById("prayer-tracker-list");
  prayerList.innerHTML = prayersMeta.map(p => {
    const done = prayerDoc[p.key] === true;
    return `
      <div class="prayer-row">
        <strong>${p.label}</strong>
        <button class="btn btn-sm ${done ? "btn-gold" : "btn-outline"}" data-action="toggle-prayer" data-prayer="${p.key}" data-date="${selectedDate}">
          <i class="fa-solid ${done ? "fa-check-double" : "fa-circle"}"></i>
          ${done ? "تمت بحمد الله" : "تسجيل الأداء"}
        </button>
      </div>
    `;
  }).join("");

  // Quran logs
  const quranBox = document.getElementById("quran-logs-container");
  const qLogs = AppState.collections.quran_progress;
  if (!qLogs.length) {
    quranBox.innerHTML = renderEmptyState("لم تسجل ورد قرآن أو حفظ بعد.");
  } else {
    quranBox.innerHTML = qLogs.map(q => `
      <div class="prayer-row">
        <div>
          <strong>سورة ${escapeHTML(q.surah)} (${escapeHTML(q.type)})</strong>
          <small class="small-muted d-block">الآيات: ${escapeHTML(q.fromAyah)} إلى ${escapeHTML(q.toAyah)} (${escapeHTML(q.ayahCount)} آية) • ${escapeHTML(q.date)}</small>
        </div>
        <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="quran_progress" data-id="${q.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `).join("");
  }

  // Authentic Adhkar
  const adhkarBox = document.getElementById("adhkar-list-container");
  const list = AUTHENTIC_ADHKAR[AppState.adhkarMode] || [];
  adhkarBox.innerHTML = list.map(item => {
    const current = AppState.adhkarCounts[item.id] || 0;
    return `
      <div class="item-card mb-2">
        <p>${escapeHTML(item.text)}</p>
        <div class="flex-between mt-2">
          <small class="small-muted">${escapeHTML(item.source)}</small>
          <button class="btn btn-xs ${current >= item.target ? "btn-gold" : "btn-outline"}" data-action="count-dhikr" data-id="${item.id}" data-target="${item.target}">
            ${current} / ${item.target}
          </button>
        </div>
      </div>
    `;
  }).join("");

  // Islamic Study Notes
  const studyBox = document.getElementById("islamic-study-container");
  const studies = AppState.collections.study_records;
  if (!studies.length) {
    studyBox.innerHTML = renderEmptyState("سجل الفوائد العلمية والدروس فارغ.");
  } else {
    studyBox.innerHTML = studies.map(s => `
      <div class="prayer-row">
        <div>
          <strong>${escapeHTML(s.title)}</strong>
          <p class="small-muted">${escapeHTML(s.benefit)}</p>
        </div>
        <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="study_records" data-id="${s.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `).join("");
  }
}

/* --- 9.6 PROJECTS & CODING --- */
function renderProjects() {
  const container = document.getElementById("projects-container");
  const q = (document.getElementById("project-search")?.value || "").toLowerCase();
  const list = AppState.collections.projects.filter(p =>
    (p.title || "").toLowerCase().includes(q) || (p.techStack || "").toLowerCase().includes(q)
  );

  if (!list.length) {
    container.innerHTML = renderEmptyState("لا توجد مشاريع برمجية مسجلة. ابدأ بإضافة مشروعك الأول.");
    return;
  }

  container.innerHTML = list.map(p => `
    <div class="item-card">
      <div>
        <div class="flex-between">
          <span class="badge badge-gold">${escapeHTML(p.techStack || "Full-Stack")}</span>
          <span class="badge badge-emerald">${escapeHTML(p.status || "Active")}</span>
        </div>
        <h4 class="mt-2">${escapeHTML(p.title)}</h4>
        <p class="small-muted">${escapeHTML(p.description || "")}</p>
        <div class="mt-2">
          <div class="flex-between">
            <small>نسبة الإنجاز</small>
            <strong>${Number(p.progress) || 0}%</strong>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width:${Number(p.progress) || 0}%"></div>
          </div>
        </div>
      </div>
      <div class="flex-between mt-2">
        <div>
          ${p.githubUrl ? `<a href="${escapeHTML(p.githubUrl)}" target="_blank" class="btn-link"><i class="fa-brands fa-github"></i> GitHub</a>` : ""}
          ${p.liveUrl ? `<a href="${escapeHTML(p.liveUrl)}" target="_blank" class="btn-link"><i class="fa-solid fa-globe"></i> Live</a>` : ""}
        </div>
        <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="projects" data-id="${p.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `).join("");
}

/* --- 9.7 LANGUAGES & SELF-DEVELOPMENT --- */
function renderLanguages() {
  const vocabBox = document.getElementById("vocab-container");
  const skillsBox = document.getElementById("skills-log-container");
  const q = (document.getElementById("vocab-search")?.value || "").toLowerCase();
  const langFilter = document.getElementById("vocab-lang-filter")?.value || "all";

  const vocabs = AppState.collections.vocabulary.filter(v => {
    const matchQ = (v.word || "").toLowerCase().includes(q) || (v.meaning || "").toLowerCase().includes(q);
    const matchL = langFilter === "all" || v.language === langFilter;
    return matchQ && matchL;
  });

  if (!vocabs.length) {
    vocabBox.innerHTML = renderEmptyState("لم تقم بتسجيل كلمات جديدة بعد.");
  } else {
    vocabBox.innerHTML = vocabs.map(v => `
      <div class="prayer-row">
        <div>
          <strong>${escapeHTML(v.word)}</strong> <span class="badge badge-gold">${escapeHTML(v.language)}</span>
          <p class="small-muted">المعنى: ${escapeHTML(v.meaning)} | مثال: ${escapeHTML(v.example || "-")}</p>
        </div>
        <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="vocabulary" data-id="${v.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `).join("");
  }

  const skills = AppState.collections.skills_logs;
  if (!skills.length) {
    skillsBox.innerHTML = renderEmptyState("لا توجد سجلات ممارسة مهارات أو دورات تدريبية.");
  } else {
    skillsBox.innerHTML = skills.map(s => `
      <div class="prayer-row">
        <div>
          <strong>${escapeHTML(s.title)}</strong>
          <small class="small-muted d-block">${escapeHTML(s.skillType)} • المدة: ${escapeHTML(s.duration)} دقيقة</small>
        </div>
        <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="skills_logs" data-id="${s.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `).join("");
  }
}

/* --- 9.8 FINANCE MANAGER --- */
function renderFinance() {
  const txBox = document.getElementById("transactions-container");
  const q = (document.getElementById("finance-search")?.value || "").toLowerCase();
  const typeFilter = document.getElementById("finance-type-filter")?.value || "all";

  const txs = AppState.collections.transactions.filter(t => {
    const matchQ = (t.title || "").toLowerCase().includes(q) || (t.category || "").toLowerCase().includes(q);
    const matchT = typeFilter === "all" || t.type === typeFilter;
    return matchQ && matchT;
  });

  const allTxs = AppState.collections.transactions;
  const totalInc = allTxs.filter(t => t.type === "income").reduce((s, t) => s + (Number(t.amount) || 0), 0);
  const totalExp = allTxs.filter(t => t.type === "expense").reduce((s, t) => s + (Number(t.amount) || 0), 0);

  document.getElementById("fin-total-income").textContent = `${totalInc.toLocaleString()} ${AppState.currency}`;
  document.getElementById("fin-total-expense").textContent = `${totalExp.toLocaleString()} ${AppState.currency}`;

  const latestBudget = AppState.collections.budgets[0];
  if (latestBudget && Number(latestBudget.monthlyLimit) > 0) {
    const limit = Number(latestBudget.monthlyLimit);
    document.getElementById("fin-monthly-budget").textContent = `${limit.toLocaleString()} ${AppState.currency}`;
    const rem = limit - totalExp;
    document.getElementById("fin-budget-status").textContent = rem >= 0
      ? `متبقي من الميزانية: ${rem.toLocaleString()} ${AppState.currency}`
      : `تجاوزت الميزانية بـ ${Math.abs(rem).toLocaleString()} ${AppState.currency}`;
  } else {
    document.getElementById("fin-monthly-budget").textContent = "غير محددة";
  }

  if (!txs.length) {
    txBox.innerHTML = renderEmptyState("لا توجد معاملات مالية مسجلة.");
  } else {
    txBox.innerHTML = txs.map(t => `
      <div class="prayer-row">
        <div>
          <strong>${escapeHTML(t.title)}</strong>
          <small class="small-muted d-block">${escapeHTML(t.category || "عام")} • ${escapeHTML(t.date || "")}</small>
        </div>
        <div class="config-actions">
          <span class="badge ${t.type === "income" ? "badge-emerald" : "badge-danger"}">
            ${t.type === "income" ? "+" : "-"}${Number(t.amount).toLocaleString()} ${AppState.currency}
          </span>
          <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="transactions" data-id="${t.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join("");
  }

  // Real Chart.js Finance Chart
  const ctx = document.getElementById("finance-chart");
  if (ctx && window.Chart) {
    if (AppState.charts.finance) AppState.charts.finance.destroy();
    AppState.charts.finance = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["الدخل الفعلي", "المصروفات الفعلية"],
        datasets: [{
          data: [totalInc, totalExp],
          backgroundColor: ["#10b981", "#ef4444"],
          borderColor: "#141926"
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}

/* --- 9.9 NOTES & KNOWLEDGE BASE --- */
function renderNotes() {
  const container = document.getElementById("notes-container");
  const q = (document.getElementById("notes-search")?.value || "").toLowerCase();
  const list = AppState.collections.notes.filter(n =>
    (n.title || "").toLowerCase().includes(q) ||
    (n.content || "").toLowerCase().includes(q) ||
    (n.tags || "").toLowerCase().includes(q)
  );

  if (!list.length) {
    container.innerHTML = renderEmptyState("لا توجد ملاحظات مسجلة بعد.");
    return;
  }

  container.innerHTML = list.map(n => `
    <div class="item-card">
      <div>
        <div class="flex-between">
          <span class="badge badge-gold">${escapeHTML(n.category || "ملاحظة")}</span>
          ${n.tags ? `<small class="small-muted">#${escapeHTML(n.tags)}</small>` : ""}
        </div>
        <h4 class="mt-2">${escapeHTML(n.title)}</h4>
        <p class="small-muted mt-2">${escapeHTML(n.content)}</p>
      </div>
      <div class="flex-between mt-2">
        <small class="small-muted">${escapeHTML(n.linkedTo || "")}</small>
        <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="notes" data-id="${n.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `).join("");
}

/* --- 9.10 FILE VAULT (FIREBASE STORAGE) --- */
function renderFiles() {
  const container = document.getElementById("files-container");
  const q = (document.getElementById("files-search")?.value || "").toLowerCase();
  const folder = document.getElementById("files-folder-filter")?.value || "all";

  const list = AppState.collections.files.filter(f => {
    const matchQ = (f.name || "").toLowerCase().includes(q);
    const matchF = folder === "all" || f.folder === folder;
    return matchQ && matchF;
  });

  if (!list.length) {
    container.innerHTML = renderEmptyState("خزنة الملفات فارغة. ارفع ملفاتك إلى Firebase Storage.");
    return;
  }

  container.innerHTML = list.map(f => `
    <div class="item-card">
      <div>
        <div class="flex-between">
          <span class="badge badge-gold">${escapeHTML(f.folder || "General")}</span>
          <small class="small-muted">${((Number(f.size) || 0) / 1024).toFixed(1)} KB</small>
        </div>
        <h4 class="mt-2 break-all">${escapeHTML(f.name)}</h4>
        <small class="small-muted">${escapeHTML(f.type || "File")}</small>
      </div>
      <div class="flex-between mt-2">
        <a href="${escapeHTML(f.downloadURL)}" target="_blank" rel="noopener" class="btn btn-xs btn-gold">
          <i class="fa-solid fa-download"></i> تحميل
        </a>
        <button class="btn btn-xs btn-danger" data-action="delete-storage-file" data-id="${f.id}" data-path="${escapeHTML(f.storagePath || "")}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `).join("");
}

/* --- 9.11 MEDIA CENTER & PLAYLIST MANAGER --- */
function renderMediaCenter() {
  const linksBox = document.getElementById("saved-links-container");
  const playlistBox = document.getElementById("playlist-container");
  const q = (document.getElementById("saved-links-search")?.value || "").toLowerCase();

  const links = AppState.collections.saved_links.filter(l =>
    (l.url || "").toLowerCase().includes(q) || (l.platform || "").toLowerCase().includes(q)
  );

  if (!links.length) {
    linksBox.innerHTML = renderEmptyState("لا توجد روابط محفوظة بعد.");
  } else {
    linksBox.innerHTML = links.map(l => `
      <div class="item-card">
        <div>
          <span class="badge badge-gold">${escapeHTML(l.platform || "Web")}</span>
          <p class="small-muted break-all mt-2">${escapeHTML(l.url)}</p>
        </div>
        <div class="flex-between mt-2">
          <a href="${escapeHTML(l.url)}" target="_blank" rel="noopener" class="btn-link">فتح الرابط</a>
          <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="saved_links" data-id="${l.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join("");
  }

  const playlists = AppState.collections.playlists;
  if (!playlists.length) {
    playlistBox.innerHTML = renderEmptyState("قائمة التشغيل فارغة. أضف ملفاً صوتياً أو فيديو مسموحاً به.");
  } else {
    playlistBox.innerHTML = playlists.map(p => `
      <div class="prayer-row">
        <div>
          <strong>${escapeHTML(p.title)}</strong>
          <small class="small-muted d-block break-all">${escapeHTML(p.mediaUrl)}</small>
        </div>
        <div class="config-actions">
          <button class="btn btn-xs btn-gold" data-action="play-media" data-url="${escapeHTML(p.mediaUrl)}">
            <i class="fa-solid fa-play"></i> تشغيل
          </button>
          <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="playlists" data-id="${p.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join("");
  }
}

/* --- 9.12 REPORTS & REAL CHARTS --- */
function renderReports() {
  const tasks = AppState.collections.tasks;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const pending = tasks.filter(t => t.status === "Pending").length;

  const tCtx = document.getElementById("report-tasks-chart");
  if (tCtx && window.Chart) {
    if (AppState.charts.tasksReport) AppState.charts.tasksReport.destroy();
    AppState.charts.tasksReport = new Chart(tCtx, {
      type: "bar",
      data: {
        labels: ["مكتملة", "جاري التنفيذ", "قيد الانتظار"],
        datasets: [{
          label: "عدد المهام الفعلية",
          data: [completed, inProgress, pending],
          backgroundColor: ["#10b981", "#d4af37", "#3b82f6"]
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const projects = AppState.collections.projects;
  const pCtx = document.getElementById("report-projects-chart");
  if (pCtx && window.Chart) {
    if (AppState.charts.projectsReport) AppState.charts.projectsReport.destroy();
    AppState.charts.projectsReport = new Chart(pCtx, {
      type: "line",
      data: {
        labels: projects.map(p => p.title || "Project"),
        datasets: [{
          label: "نسبة إنجاز المشاريع (%)",
          data: projects.map(p => Number(p.progress) || 0),
          borderColor: "#d4af37",
          backgroundColor: "rgba(212, 175, 55, 0.2)",
          fill: true
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const metricsBox = document.getElementById("reports-summary-metrics");
  metricsBox.innerHTML = `
    <div class="kpi-card"><div class="kpi-info"><span class="kpi-label">إجمالي المهام المسجلة</span><h3>${tasks.length}</h3></div></div>
    <div class="kpi-card"><div class="kpi-info"><span class="kpi-label">إجمالي المواد الدراسية</span><h3>${AppState.collections.subjects.length}</h3></div></div>
    <div class="kpi-card"><div class="kpi-info"><span class="kpi-label">إجمالي الكلمات المحفوظة</span><h3>${AppState.collections.vocabulary.length}</h3></div></div>
    <div class="kpi-card"><div class="kpi-info"><span class="kpi-label">إجمالي الملفات المرفوعة</span><h3>${AppState.collections.files.length}</h3></div></div>
  `;
}

/* ============================================================================
   10. MEDIA CENTER: URL INSPECTOR, WEB SHARE TARGET & LEGAL STREAM DOWNLOADER
   ============================================================================ */
function detectPlatformInfo(rawUrl) {
  try {
    const u = new URL(rawUrl);
    const host = u.hostname.toLowerCase();
    const path = u.pathname.toLowerCase();

    if (/\.(mp4|webm|ogg|mp3|wav|m4a)$/i.test(path)) {
      return {
        platform: u.hostname,
        type: "Direct Media File",
        canDirectDownload: true,
        notice: "ملف وسائط مباشر. يمكنك تشغيله أو تنزيله قانونياً إذا كان المصدر يدعم CORS."
      };
    }
    if (host.includes("youtube.com") || host.includes("youtu.be")) {
      return {
        platform: "YouTube",
        type: "Video Platform",
        canDirectDownload: false,
        notice: "رابط YouTube رسمي: متاح للمعاينة والحفظ في مكتبتك. وفق شروط خدمة YouTube وحقوق النشر، لا يتم تجاوز الحماية لتنزيل البث المحمي."
      };
    }
    if (host.includes("facebook.com") || host.includes("instagram.com") || host.includes("tiktok.com") || host.includes("x.com") || host.includes("twitter.com")) {
      return {
        platform: host.replace("www.", ""),
        type: "Social Media Post",
        canDirectDownload: false,
        notice: "رابط منصة تواصل اجتماعي: يمكنك حفظه وتصنيفه في مركز الوسائط. التنزيل المباشر مقيد بسياسة الخصوصية وحقوق النشر للمنصة."
      };
    }
    return {
      platform: u.hostname,
      type: "Web Link",
      canDirectDownload: false,
      notice: "رابط ويب قياسي جاهز للحفظ والتصنيف."
    };
  } catch (e) {
    return null;
  }
}

function inspectMediaURL(urlStr) {
  const info = detectPlatformInfo(urlStr);
  const box = document.getElementById("media-inspect-result");
  if (!info) {
    showToast("الرابط المدخل غير صالح", "error");
    box.classList.add("hidden");
    return;
  }

  box.classList.remove("hidden");
  document.getElementById("inspect-platform-name").textContent = info.platform;
  document.getElementById("inspect-type-badge").textContent = info.type;
  document.getElementById("inspect-url-display").textContent = urlStr;
  document.getElementById("inspect-legal-notice").textContent = info.notice;

  const dlBtn = document.getElementById("btn-direct-download");
  const preview = document.getElementById("media-preview-container");
  preview.innerHTML = "";

  if (info.canDirectDownload) {
    dlBtn.classList.remove("hidden");
    preview.innerHTML = `<video src="${escapeHTML(urlStr)}" controls class="media-player-element mt-2"></video>`;
  } else {
    dlBtn.classList.add("hidden");
  }
}

function checkSharedTargetURL() {
  const params = new URLSearchParams(window.location.search);
  const sharedUrl = params.get("shared_url") || params.get("shared_text");
  if (sharedUrl && sharedUrl.startsWith("http")) {
    switchView("media");
    const input = document.getElementById("media-url-input");
    input.value = sharedUrl;
    inspectMediaURL(sharedUrl);
    showToast("تم استقبال الرابط المشترك في مركز الوسائط", "success");
  }
}

async function downloadLegalDirectMedia(urlStr) {
  const wrap = document.getElementById("media-dl-progress-wrap");
  const statusEl = document.getElementById("media-dl-status");
  const bytesEl = document.getElementById("media-dl-bytes");
  const barEl = document.getElementById("media-dl-bar");
  const cancelBtn = document.getElementById("btn-cancel-download");

  wrap.classList.remove("hidden");
  cancelBtn.classList.remove("hidden");
  AppState.activeDownloadAbort = new AbortController();

  try {
    const response = await fetch(urlStr, { signal: AppState.activeDownloadAbort.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const total = Number(response.headers.get("content-length")) || 0;
    const reader = response.body.getReader();
    const chunks = [];
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      bytesEl.textContent = `${(received / 1024).toFixed(1)} KB`;
      if (total > 0) {
        barEl.style.width = `${Math.round((received / total) * 100)}%`;
      }
    }

    const blob = new Blob(chunks);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = urlStr.split("/").pop().split("?")[0] || "media-download";
    a.click();
    statusEl.textContent = "اكتمل التنزيل القانوني بنجاح";
    showToast("تم تنزيل الملف بنجاح", "success");
  } catch (err) {
    if (err.name === "AbortError") {
      statusEl.textContent = "تم إلغاء التنزيل بواسطة المستخدم";
    } else {
      statusEl.textContent = "المصدر يمنع التنزيل المباشر عبر المتصفح (CORS / حماية المصدر)";
      showToast("تعذر التنزيل المباشر بسبب قيود المصدر (CORS)", "error");
    }
  } finally {
    cancelBtn.classList.add("hidden");
  }
}

/* ============================================================================
   11. AI PERSONAL ASSISTANT WITH REAL ACTION EXTRACTION & USER CONFIRMATION
   ============================================================================ */
function appendAIMessage(text, sender = "assistant") {
  const box = document.getElementById("ai-messages-box");
  const div = document.createElement("div");
  div.className = `ai-msg ${sender}`;
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function parseNaturalLanguageAIAction(input) {
  const text = input.trim();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowISO = tomorrow.toISOString().split("T")[0];

  // 1. Detect Task / Study creation intent (e.g., "أضف مذاكرة دوائر كهربائية غداً الساعة 5")
  if (/^(أضف|اضف|سجل مهمة|انشئ مهمة|مذاكرة)/i.test(text)) {
    const isTomorrow = /غدا|غداً|بكرة/.test(text);
    const timeMatch = text.match(/الساعة\s*(\d{1,2})/);
    const cleanTitle = text.replace(/^(أضف|اضف|سجل مهمة|انشئ مهمة)\s*/i, "");
    return {
      collection: "tasks",
      summary: `إضافة مهمة جديدة: "${cleanTitle}" بتاريخ ${isTomorrow ? tomorrowISO : todayISO()}`,
      payload: {
        title: cleanTitle,
        description: timeMatch ? `الموعد المقترح: الساعة ${timeMatch[1]}:00` : "تم إنشاؤها عبر المساعد الذكي",
        dueDate: isTomorrow ? tomorrowISO : todayISO(),
        priority: "High",
        status: "Pending",
        category: "Study"
      }
    };
  }

  // 2. Detect Expense / Income intent (e.g., "سجل مصروف 250 جنيه مراجع دراسية")
  const expMatch = text.match(/(مصروف|دفعت|اشتريت|دخل|استلمت)\s*(\d+)/i);
  if (expMatch) {
    const isIncome = /(دخل|استلمت)/.test(expMatch[1]);
    const amount = Number(expMatch[2]);
    return {
      collection: "transactions",
      summary: `تسجيل ${isIncome ? "دخل" : "مصروف"} بقيمة ${amount} ${AppState.currency}`,
      payload: {
        title: text,
        amount: amount,
        type: isIncome ? "income" : "expense",
        category: "General",
        date: todayISO()
      }
    };
  }

  return null;
}

async function handleAIChatSubmit(userPrompt) {
  appendAIMessage(userPrompt, "user");

  // Check if prompt requests a concrete database action
  const detectedAction = parseNaturalLanguageAIAction(userPrompt);
  if (detectedAction) {
    AppState.pendingAIAction = detectedAction;
    document.getElementById("ai-confirm-summary").textContent = detectedAction.summary;
    document.getElementById("ai-confirm-payload").textContent = JSON.stringify(detectedAction.payload, null, 2);
    document.getElementById("ai-confirmation-card").classList.remove("hidden");
    appendAIMessage("لقد استخرجت تفاصيل الإجراء المطلوب. يرجى مراجعة بطاقة التأكيد بالأسفل للموافقة على حفظه فعلياً في Firebase.", "assistant");
    return;
  }

  // Check if user configured a secure Cloud Function / Backend AI proxy URL
  const customEndpoint = localStorage.getItem("MY_LIFE_OS_AI_ENDPOINT");
  if (customEndpoint) {
    try {
      const res = await fetch(customEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userPrompt,
          context: {
            tasksCount: AppState.collections.tasks.length,
            projectsCount: AppState.collections.projects.length
          }
        })
      });
      const data = await res.json();
      appendAIMessage(data.reply || "تم استلام الرد من الخادم الآمن.", "assistant");
      return;
    } catch (e) {
      appendAIMessage("تعذر الاتصال بنقطة AI Backend المخصصة، سأقوم بتحليل بياناتك محلياً.", "assistant");
    }
  }

  // Intelligent Real Data Analysis from Firestore State
  const tasks = AppState.collections.tasks;
  const pending = tasks.filter(t => t.status !== "Completed");
  const overdue = pending.filter(t => t.dueDate && t.dueDate < todayISO());
  const projects = AppState.collections.projects;

  const response = [
    `تحليل بياناتك الفعلية المسجلة حالياً في Firebase:`,
    `• لديك ${pending.length} مهام غير مكتملة (منها ${overdue.length} مهام متأخرة).`,
    `• المشاريع النشطة: ${projects.length} مشاريع.`,
    pending.length > 0
      ? `• نصيحة الأولوية اليوم: ابدأ بـ "${pending[0].title}" لأنها ذات أولوية (${pending[0].priority}).`
      : `• قائمة مهامك خالية حالياً! يمكنك كتابة: "أضف مذاكرة دوائر كهربائية غداً الساعة 5" وسأقوم بتجهيزها للتنفيذ الفوري.`
  ].join("\n");

  appendAIMessage(response, "assistant");
}

/* ============================================================================
   12. UNIVERSAL MODAL BUILDER FOR ALL 14 MODULES
   ============================================================================ */
function openFormModal(title, fieldsHtml, onSubmitCallback) {
  const modal = document.getElementById("universal-modal");
  const form = document.getElementById("universal-modal-form");
  document.getElementById("modal-title").textContent = title;
  form.innerHTML = fieldsHtml + `
    <div class="config-actions mt-4">
      <button type="submit" class="btn btn-gold">حفظ فعلي في Firebase</button>
    </div>
  `;
  modal.classList.remove("hidden");

  form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    await onSubmitCallback(data);
    modal.classList.add("hidden");
  };
}

/* ============================================================================
   13. EVENT LISTENERS & NAVIGATION BINDINGS
   ============================================================================ */
function switchView(viewName) {
  document.querySelectorAll(".view-section").forEach(s => s.classList.remove("active"));
  const target = document.getElementById(`view-${viewName}`);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-item, .bottom-nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  const activeNav = document.querySelector(`.nav-item[data-view="${viewName}"] span`);
  if (activeNav) {
    document.getElementById("current-view-title").textContent = activeNav.textContent;
  }
  document.getElementById("sidebar").classList.remove("open");
}

function applyUserSettingsFromFirestore() {
  const docPref = AppState.collections.user_settings[0];
  if (!docPref) return;
  if (docPref.currency) {
    AppState.currency = docPref.currency;
    document.getElementById("set-currency").value = docPref.currency;
  }
  if (docPref.fontSize) {
    AppState.fontSize = docPref.fontSize;
    document.documentElement.setAttribute("data-font-size", docPref.fontSize);
    document.getElementById("set-font-size").value = docPref.fontSize;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Live Clock
  setInterval(() => {
    const now = new Date();
    const el = document.getElementById("live-datetime");
    if (el) {
      el.textContent = new Intl.DateTimeFormat(AppState.lang === "ar" ? "ar-EG" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(now);
    }
  }, 1000);

  // Network listeners
  window.addEventListener("online", () => document.getElementById("network-banner").classList.add("hidden"));
  window.addEventListener("offline", () => document.getElementById("network-banner").classList.remove("hidden"));

  // Init Firebase
  initFirebaseSystem();

  // Toggle Firebase Setup Panel
  document.getElementById("btn-toggle-fb-config").onclick = () => {
    document.getElementById("firebase-config-panel").classList.toggle("hidden");
  };

  document.getElementById("btn-save-fb-config").onclick = async () => {
    const raw = document.getElementById("fb-config-input").value.trim();
    try {
      const normalized = raw
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":')
        .replace(/'/g, '"');
      const parsed = JSON.parse(normalized);
      localStorage.setItem("MY_LIFE_OS_FIREBASE_CONFIG", JSON.stringify(parsed));
      await initFirebaseSystem();
      showToast("تم الاتصال بمشروع Firebase بنجاح", "success");
    } catch (e) {
      showToast("صيغة JSON غير صحيحة. تأكد من نسخ كائن firebaseConfig بشكل سليم.", "error");
    }
  };

  document.getElementById("btn-clear-fb-config").onclick = () => {
    localStorage.removeItem("MY_LIFE_OS_FIREBASE_CONFIG");
    document.getElementById("fb-config-input").value = "";
    showToast("تم مسح إعدادات Firebase المحفوظة", "info");
  };

  // Auth Mode Tabs
  let authMode = "login";
  document.querySelectorAll(".auth-tab").forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      authMode = tab.dataset.authMode;
      document.getElementById("auth-name-group").classList.toggle("hidden", authMode !== "register");
      document.getElementById("auth-password-group").classList.toggle("hidden", authMode === "reset");
      document.getElementById("auth-submit-label").textContent =
        authMode === "login" ? "تسجيل الدخول" : authMode === "register" ? "إنشاء حساب جديد" : "إرسال رابط الاستعادة";
    };
  });

  // Auth Form Submit
  document.getElementById("auth-form").onsubmit = async (e) => {
    e.preventDefault();
    if (!AppState.auth) {
      showToast("قم بإعداد مشروع Firebase أولاً من زر إعدادات Firebase بالأعلى", "error");
      return;
    }
    const email = document.getElementById("auth-email").value.trim();
    const password = document.getElementById("auth-password").value;
    const name = document.getElementById("auth-name").value.trim();

    try {
      if (authMode === "login") {
        await signInWithEmailAndPassword(AppState.auth, email, password);
        showToast("تم تسجيل الدخول بنجاح", "success");
      } else if (authMode === "register") {
        const cred = await createUserWithEmailAndPassword(AppState.auth, email, password);
        if (name) await updateProfile(cred.user, { displayName: name });
        await sendEmailVerification(cred.user);
        showToast("تم إنشاء الحساب وإرسال بريد التفعيل", "success");
      } else if (authMode === "reset") {
        await sendPasswordResetEmail(AppState.auth, email);
        showToast("تم إرسال رابط استعادة كلمة المرور إلى بريدك", "success");
      }
    } catch (err) {
      showToast("خطأ مصادقة: " + err.message, "error");
    }
  };

  document.getElementById("btn-send-verification").onclick = async () => {
    if (AppState.user) {
      await sendEmailVerification(AppState.user);
      showToast("تم إرسال رابط التأكيد إلى بريدك الإلكتروني", "success");
    }
  };

  document.getElementById("btn-logout-sidebar").onclick = async () => {
    if (AppState.auth) await signOut(AppState.auth);
  };

  // Sidebar & Bottom Navigation
  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.onclick = () => switchView(btn.dataset.view);
  });
  document.querySelectorAll("[data-goto]").forEach(btn => {
    btn.onclick = () => switchView(btn.dataset.goto);
  });

  document.getElementById("btn-mobile-menu").onclick = () => {
    document.getElementById("sidebar").classList.toggle("open");
  };
  document.getElementById("btn-quick-search").onclick = () => switchView("search");
  document.getElementById("btn-quick-ai").onclick = () => switchView("ai");

  // Theme & Language Toggles
  document.getElementById("btn-theme-toggle").onclick = () => {
    AppState.theme = AppState.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", AppState.theme);
  };

  document.getElementById("btn-lang-toggle").onclick = () => {
    AppState.lang = AppState.lang === "ar" ? "en" : "ar";
    document.documentElement.lang = AppState.lang;
    document.documentElement.dir = AppState.lang === "ar" ? "rtl" : "ltr";
    document.querySelector("#btn-lang-toggle .lang-code").textContent = AppState.lang === "ar" ? "EN" : "AR";
    renderAllViews();
  };

  // Modal Close
  document.getElementById("btn-close-modal").onclick = () => {
    document.getElementById("universal-modal").classList.add("hidden");
  };

  // --- CRUD MODAL TRIGGERS ---
  const openTaskModal = () => {
    openFormModal("إضافة مهمة جديدة", `
      <div class="form-group"><label>عنوان المهمة</label><input name="title" required /></div>
      <div class="form-group"><label>الوصف</label><textarea name="description" rows="2"></textarea></div>
      <div class="form-group"><label>المهام الفرعية (مفصولة بفاصلة)</label><input name="subtasks" placeholder="قراءة الفصل، حل التمارين..." /></div>
      <div class="form-group"><label>تاريخ الاستحقاق</label><input type="date" name="dueDate" value="${todayISO()}" required /></div>
      <div class="form-group"><label>الأولوية</label>
        <select name="priority"><option value="High">High</option><option value="Urgent">Urgent</option><option value="Medium">Medium</option><option value="Low">Low</option></select>
      </div>
      <div class="form-group"><label>الحالة</label>
        <select name="status"><option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option></select>
      </div>
      <div class="form-group"><label>التصنيف</label><input name="category" placeholder="جامعة، برمجة، شخصي..." /></div>
    `, (data) => createRecord("tasks", data));
  };

  document.getElementById("btn-open-task-modal").onclick = openTaskModal;

  const openEventModal = () => {
    openFormModal("إضافة موعد أو حدث في التقويم", `
      <div class="form-group"><label>عنوان الحدث</label><input name="title" required /></div>
      <div class="form-group"><label>التاريخ</label><input type="date" name="date" value="${todayISO()}" required /></div>
      <div class="form-group"><label>الوقت</label><input type="time" name="time" /></div>
      <div class="form-group"><label>النوع</label>
        <select name="type"><option value="University">محاضرة / جامعة</option><option value="Exam">امتحان</option><option value="Project">مشروع</option><option value="Reminder">تذكير</option></select>
      </div>
    `, (data) => createRecord("events", data));
  };
  document.getElementById("btn-open-event-modal").onclick = openEventModal;

  // University Tabs & Modals
  document.querySelectorAll("[data-uni-tab]").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll("[data-uni-tab]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.uniTab;
      document.getElementById("uni-subjects-panel").classList.toggle("hidden", tab !== "subjects");
      document.getElementById("uni-lectures-panel").classList.toggle("hidden", tab !== "lectures");
      document.getElementById("uni-grades-panel").classList.toggle("hidden", tab !== "grades");
    };
  });

  document.getElementById("btn-add-subject").onclick = () => {
    openFormModal("إضافة مادة دراسية", `
      <div class="form-group"><label>اسم المادة</label><input name="name" required placeholder="Logic Design / دوائر كهربائية" /></div>
      <div class="form-group"><label>كود المادة</label><input name="code" placeholder="EEC-201" /></div>
      <div class="form-group"><label>اسم الدكتور / المحاضر</label><input name="professor" /></div>
      <div class="form-group"><label>موعد المحاضرة والسكشن</label><input name="schedule" placeholder="الأحد 10 ص - الثلاثاء 12 م" /></div>
    `, (data) => createRecord("subjects", data));
  };

  document.getElementById("btn-add-lecture").onclick = () => {
    openFormModal("إضافة محاضرة / واجب / درجة", `
      <div class="form-group"><label>العنوان</label><input name="title" required placeholder="المحاضرة الثالثة / كويز 1" /></div>
      <div class="form-group"><label>اسم المادة</label><input name="subjectName" required /></div>
      <div class="form-group"><label>النوع</label>
        <select name="itemType"><option value="محاضرة">محاضرة</option><option value="واجب">تكليف / واجب</option><option value="امتحان">امتحان</option></select>
      </div>
      <div class="form-group"><label>رابط ملف PDF أو المحاضرة (اختياري)</label><input type="url" name="link" dir="ltr" /></div>
      <div class="form-group"><label>الدرجة المكتسبة (اختياري)</label><input type="number" step="0.5" name="score" /></div>
      <div class="form-group"><label>الدرجة العظمى (اختياري)</label><input type="number" step="0.5" name="maxScore" /></div>
    `, (data) => createRecord("lectures", data));
  };

  // Islamic Modals
  document.getElementById("prayer-date-picker").onchange = () => renderIslamic();
  document.getElementById("btn-add-quran-log").onclick = () => {
    openFormModal("تسجيل ورد القرآن والحفظ", `
      <div class="form-group"><label>اسم السورة</label><input name="surah" required /></div>
      <div class="form-group"><label>النوع</label>
        <select name="type"><option value="تلاوة">تلاوة</option><option value="حفظ جديد">حفظ جديد</option><option value="مراجعة">مراجعة</option></select>
      </div>
      <div class="form-group"><label>من الآية</label><input type="number" name="fromAyah" required /></div>
      <div class="form-group"><label>إلى الآية</label><input type="number" name="toAyah" required /></div>
      <div class="form-group"><label>إجمالي عدد الآيات</label><input type="number" name="ayahCount" required /></div>
      <div class="form-group"><label>التاريخ</label><input type="date" name="date" value="${todayISO()}" required /></div>
    `, (data) => createRecord("quran_progress", data));
  };

  document.getElementById("btn-add-islamic-note").onclick = () => {
    openFormModal("إضافة درس أو فائدة علمية", `
      <div class="form-group"><label>عنوان الدرس / الكتاب</label><input name="title" required /></div>
      <div class="form-group"><label>الفائدة العلمية المسجلة</label><textarea name="benefit" rows="3" required></textarea></div>
    `, (data) => createRecord("study_records", data));
  };

  document.querySelectorAll("[data-adhkar-time]").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll("[data-adhkar-time]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.adhkarMode = btn.dataset.adhkarTime;
      renderIslamic();
    };
  });

  // Projects Modal
  document.getElementById("btn-open-project-modal").onclick = () => {
    openFormModal("إنشاء مشروع برمجي جديد", `
      <div class="form-group"><label>اسم المشروع</label><input name="title" required /></div>
      <div class="form-group"><label>وصف المشروع</label><textarea name="description" rows="2"></textarea></div>
      <div class="form-group"><label>التقنيات المستخدمة</label><input name="techStack" placeholder="HTML5, CSS3, Vanilla JS, Firebase" /></div>
      <div class="form-group"><label>نسبة الإنجاز الفعلية (%)</label><input type="number" min="0" max="100" name="progress" value="0" required /></div>
      <div class="form-group"><label>رابط GitHub</label><input type="url" name="githubUrl" dir="ltr" /></div>
      <div class="form-group"><label>رابط الموقع المنشور</label><input type="url" name="liveUrl" dir="ltr" /></div>
    `, (data) => createRecord("projects", data));
  };

  // Languages Modals
  document.getElementById("btn-add-vocab").onclick = () => {
    openFormModal("تسجيل كلمة جديدة", `
      <div class="form-group"><label>الكلمة</label><input name="word" required /></div>
      <div class="form-group"><label>المعنى</label><input name="meaning" required /></div>
      <div class="form-group"><label>مثال في جملة</label><input name="example" /></div>
      <div class="form-group"><label>اللغة</label>
        <select name="language"><option value="English">English</option><option value="German">German</option><option value="French">French</option><option value="Spanish">Spanish</option></select>
      </div>
    `, (data) => createRecord("vocabulary", data));
  };

  document.getElementById("btn-add-skill-log").onclick = () => {
    openFormModal("تسجيل ممارسة مهارة أو دورة", `
      <div class="form-group"><label>العنوان</label><input name="title" required /></div>
      <div class="form-group"><label>المهارة</label>
        <select name="skillType"><option value="Listening">الاستماع (Listening)</option><option value="Reading">القراءة (Reading)</option><option value="Speaking">المحادثة (Speaking)</option><option value="Writing">الكتابة (Writing)</option><option value="Course">دورة تدريبية</option></select>
      </div>
      <div class="form-group"><label>المدة بالدقائق</label><input type="number" name="duration" required /></div>
    `, (data) => createRecord("skills_logs", data));
  };

  // Finance Modals
  const openTxModal = () => {
    openFormModal("تسجيل معاملة مالية", `
      <div class="form-group"><label>البيان / الوصف</label><input name="title" required /></div>
      <div class="form-group"><label>المبلغ (${AppState.currency})</label><input type="number" step="0.01" name="amount" required /></div>
      <div class="form-group"><label>النوع</label>
        <select name="type"><option value="expense">مصروف (Expense)</option><option value="income">دخل (Income)</option></select>
      </div>
      <div class="form-group"><label>التصنيف</label><input name="category" placeholder="دراسة، مواصلات، اشتراكات، عمل حر..." /></div>
      <div class="form-group"><label>التاريخ</label><input type="date" name="date" value="${todayISO()}" required /></div>
    `, (data) => createRecord("transactions", data));
  };
  document.getElementById("btn-add-transaction").onclick = openTxModal;

  document.getElementById("btn-set-budget").onclick = () => {
    openFormModal("تحديد الميزانية الشهرية", `
      <div class="form-group"><label>الحد الأقصى للمصروفات الشهرية (${AppState.currency})</label><input type="number" name="monthlyLimit" required /></div>
    `, (data) => createRecord("budgets", data));
  };

  // Notes Modal & Voice Note
  const openNoteModal = (prefillContent = "") => {
    openFormModal("إضافة ملاحظة جديدة", `
      <div class="form-group"><label>العنوان</label><input name="title" required /></div>
      <div class="form-group"><label>المحتوى</label><textarea name="content" rows="4" required>${escapeHTML(prefillContent)}</textarea></div>
      <div class="form-group"><label>التصنيف</label><input name="category" placeholder="أفكار، ملخصات، روابط..." /></div>
      <div class="form-group"><label>الوسوم (Tags)</label><input name="tags" placeholder="javascript, firebase" /></div>
      <div class="form-group"><label>ربط بمادة أو مشروع</label><input name="linkedTo" /></div>
    `, (data) => createRecord("notes", data));
  };
  document.getElementById("btn-add-note").onclick = () => openNoteModal();

  document.getElementById("btn-voice-note").onclick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast("متصفحك الحالي لا يدعم واجهة الإملاء الصوتي Web Speech API", "error");
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = AppState.lang === "ar" ? "ar-EG" : "en-US";
    showToast("تحدث الآن لتسجيل ملاحظتك صوتياً...", "info");
    rec.onresult = (ev) => {
      const transcript = ev.results[0][0].transcript;
      openNoteModal(transcript);
    };
    rec.start();
  };

  // Quick Add Buttons on Dashboard
  document.addEventListener("click", async (e) => {
    const quickBtn = e.target.closest("[data-quick-add]");
    if (quickBtn) {
      const type = quickBtn.dataset.quickAdd;
      if (type === "task") openTaskModal();
      if (type === "expense") openTxModal();
      if (type === "note") openNoteModal();
      if (type === "event") openEventModal();
    }

    // Dynamic Action Buttons (Delete, Toggle Task, Toggle Prayer, Play Media)
    const actionBtn = e.target.closest("[data-action]");
    if (!actionBtn) return;
    const action = actionBtn.dataset.action;

    if (action === "delete-item") {
      await deleteRecord(actionBtn.dataset.col, actionBtn.dataset.id);
    }

    if (action === "toggle-task") {
      const task = AppState.collections.tasks.find(t => t.id === actionBtn.dataset.id);
      if (task) {
        const nextStatus = task.status === "Completed" ? "Pending" : "Completed";
        await updateRecord("tasks", task.id, { status: nextStatus });
      }
    }

    if (action === "toggle-prayer") {
      const pKey = actionBtn.dataset.prayer;
      const dateStr = actionBtn.dataset.date;
      const existing = AppState.collections.prayers.find(p => p.date === dateStr);
      if (existing) {
        await updateRecord("prayers", existing.id, { [pKey]: !existing[pKey] });
      } else {
        await createRecord("prayers", { date: dateStr, [pKey]: true });
      }
    }

    if (action === "count-dhikr") {
      const id = actionBtn.dataset.id;
      const target = Number(actionBtn.dataset.target);
      AppState.adhkarCounts[id] = Math.min(target, (AppState.adhkarCounts[id] || 0) + 1);
      renderIslamic();
    }

    if (action === "play-media") {
      const player = document.getElementById("main-media-player");
      player.src = actionBtn.dataset.url;
      player.play();
    }

    if (action === "delete-storage-file") {
      const id = actionBtn.dataset.id;
      const path = actionBtn.dataset.path;
      if (path && AppState.storage) {
        try { await deleteObject(storageRef(AppState.storage, path)); } catch (err) {}
      }
      await deleteRecord("files", id);
    }
  });

  // File Vault Upload to Firebase Storage
  document.getElementById("btn-upload-file").onclick = () => {
    openFormModal("رفع ملف إلى Firebase Storage", `
      <div class="form-group"><label>اختر الملف (الحد الأقصى 25MB)</label><input type="file" name="fileObj" id="modal-file-input" required /></div>
      <div class="form-group"><label>المجلد المنطقي</label>
        <select name="folder"><option value="University">University</option><option value="Projects">Projects</option><option value="Documents">Documents</option><option value="Media">Media</option></select>
      </div>
    `, async (data) => {
      const fileInput = document.getElementById("modal-file-input");
      const file = fileInput?.files?.[0];
      if (!file || !AppState.storage || !AppState.user) return;
      if (file.size > 25 * 1024 * 1024) {
        showToast("حجم الملف يتجاوز 25MB المسموح بها", "error");
        return;
      }

      const progressBox = document.getElementById("file-upload-progress-box");
      const bar = document.getElementById("upload-progress-bar");
      const pctLabel = document.getElementById("upload-percent-label");
      document.getElementById("upload-filename-label").textContent = file.name;
      progressBox.classList.remove("hidden");

      const storagePath = `users/${AppState.user.uid}/${Date.now()}_${file.name}`;
      const fRef = storageRef(AppState.storage, storagePath);
      const uploadTask = uploadBytesResumable(fRef, file);

      uploadTask.on("state_changed", (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        bar.style.width = `${pct}%`;
        pctLabel.textContent = `${pct}%`;
      }, (err) => {
        progressBox.classList.add("hidden");
        showToast("فشل رفع الملف: " + err.message, "error");
      }, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await createRecord("files", {
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
          folder: data.folder,
          storagePath,
          downloadURL
        });
        progressBox.classList.add("hidden");
      });
    });
  };

  // Media Center Actions
  document.getElementById("btn-inspect-url").onclick = () => {
    const url = document.getElementById("media-url-input").value.trim();
    inspectMediaURL(url);
  };

  document.getElementById("btn-save-link-firestore").onclick = async () => {
    const url = document.getElementById("media-url-input").value.trim();
    const info = detectPlatformInfo(url);
    if (!info) return;
    await createRecord("saved_links", { url, platform: info.platform, type: info.type });
  };

  document.getElementById("btn-direct-download").onclick = () => {
    const url = document.getElementById("media-url-input").value.trim();
    downloadLegalDirectMedia(url);
  };

  document.getElementById("btn-cancel-download").onclick = () => {
    if (AppState.activeDownloadAbort) AppState.activeDownloadAbort.abort();
  };

  document.getElementById("btn-add-playlist-item").onclick = () => {
    openFormModal("إضافة ملف صوتي أو فيديو لقائمة التشغيل", `
      <div class="form-group"><label>عنوان المقطع</label><input name="title" required /></div>
      <div class="form-group"><label>رابط مباشر للملف الصوتي/الفيديو المسموح به</label><input type="url" name="mediaUrl" dir="ltr" required /></div>
    `, (data) => createRecord("playlists", data));
  };

  // AI Chat & Confirmation Handlers
  document.getElementById("ai-chat-form").onsubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById("ai-user-input");
    const prompt = input.value.trim();
    if (!prompt) return;
    input.value = "";
    await handleAIChatSubmit(prompt);
  };

  document.querySelectorAll("[data-ai-prompt]").forEach(chip => {
    chip.onclick = () => handleAIChatSubmit(chip.dataset.aiPrompt);
  });

  document.getElementById("btn-confirm-ai-action").onclick = async () => {
    if (!AppState.pendingAIAction) return;
    const { collection: colName, payload } = AppState.pendingAIAction;
    const id = await createRecord(colName, payload);
    document.getElementById("ai-confirmation-card").classList.add("hidden");
    AppState.pendingAIAction = null;
    if (id) {
      appendAIMessage(`تم تنفيذ الإجراء وحفظه فعلياً في قاعدة بيانات Firebase (المعرف: ${id}).`, "assistant");
    }
  };

  document.getElementById("btn-cancel-ai-action").onclick = () => {
    AppState.pendingAIAction = null;
    document.getElementById("ai-confirmation-card").classList.add("hidden");
    appendAIMessage("تم إلغاء الإجراء بناءً على طلبك.", "assistant");
  };

  document.getElementById("btn-ai-settings").onclick = () => {
    openFormModal("إعداد نقطة اتصال AI Cloud Function الآمنة", `
      <div class="form-group">
        <label>رابط Firebase Cloud Function أو Backend Proxy (لحماية مفتاح Gemini API)</label>
        <input type="url" name="endpoint" dir="ltr" value="${escapeHTML(localStorage.getItem("MY_LIFE_OS_AI_ENDPOINT") || "")}" placeholder="https://us-central1-your-project.cloudfunctions.net/askGemini" />
      </div>
    `, async (data) => {
      if (data.endpoint) {
        localStorage.setItem("MY_LIFE_OS_AI_ENDPOINT", data.endpoint.trim());
        showToast("تم حفظ نقطة اتصال AI الآمنة", "success");
      } else {
        localStorage.removeItem("MY_LIFE_OS_AI_ENDPOINT");
      }
    });
  };

  // Unified Search Engine
  const runGlobalSearch = () => {
    const q = (document.getElementById("global-search-input")?.value || "").toLowerCase().trim();
    const scope = document.getElementById("global-search-scope")?.value || "all";
    const resultsBox = document.getElementById("global-search-results");
    if (!q) {
      resultsBox.innerHTML = renderEmptyState("اكتب كلمة للبحث الفوري في جميع أقسام حسابك.");
      return;
    }

    const hits = [];
    const checkCol = (colKey, label, titleField, subField) => {
      if (scope !== "all" && scope !== colKey) return;
      (AppState.collections[colKey] || []).forEach(item => {
        const t = String(item[titleField] || "");
        const s = String(item[subField] || "");
        if (t.toLowerCase().includes(q) || s.toLowerCase().includes(q)) {
          hits.push({ label, title: t, sub: s });
        }
      });
    };

    checkCol("tasks", "مهمة", "title", "description");
    checkCol("notes", "ملاحظة", "title", "content");
    checkCol("projects", "مشروع", "title", "techStack");
    checkCol("subjects", "مادة دراسية", "name", "professor");
    checkCol("files", "ملف", "name", "folder");
    checkCol("saved_links", "رابط", "url", "platform");
    checkCol("vocabulary", "كلمة", "word", "meaning");
    checkCol("events", "حدث", "title", "date");

    if (!hits.length) {
      resultsBox.innerHTML = renderEmptyState("لم يتم العثور على نتائج مطابقة في قاعدة بياناتك.");
    } else {
      resultsBox.innerHTML = hits.map(h => `
        <div class="item-card">
          <span class="badge badge-gold">${escapeHTML(h.label)}</span>
          <h4 class="mt-2">${escapeHTML(h.title)}</h4>
          <p class="small-muted">${escapeHTML(h.sub)}</p>
        </div>
      `).join("");
    }
  };

  document.getElementById("global-search-input").oninput = runGlobalSearch;
  document.getElementById("global-search-scope").onchange = runGlobalSearch;

  // Filter Bindings
  ["task-search", "task-filter-status", "task-filter-priority", "task-filter-range"].forEach(id => {
    document.getElementById(id).oninput = renderTasks;
  });
  document.getElementById("project-search").oninput = renderProjects;
  ["vocab-search", "vocab-lang-filter"].forEach(id => {
    document.getElementById(id).oninput = renderLanguages;
  });
  ["finance-search", "finance-type-filter"].forEach(id => {
    document.getElementById(id).oninput = renderFinance;
  });
  document.getElementById("notes-search").oninput = renderNotes;
  ["files-search", "files-folder-filter"].forEach(id => {
    document.getElementById(id).oninput = renderFiles;
  });
  document.getElementById("saved-links-search").oninput = renderMediaCenter;

  // Calendar Navigation
  document.getElementById("cal-prev").onclick = () => {
    AppState.calDate.setMonth(AppState.calDate.getMonth() - 1);
    renderCalendar();
  };
  document.getElementById("cal-next").onclick = () => {
    AppState.calDate.setMonth(AppState.calDate.getMonth() + 1);
    renderCalendar();
  };

  // Settings & Profile
  document.getElementById("settings-profile-form").onsubmit = async (e) => {
    e.preventDefault();
    if (!AppState.user) return;
    const displayName = document.getElementById("set-display-name").value.trim();
    const photoURL = document.getElementById("set-photo-url").value.trim();
    await updateProfile(AppState.user, { displayName, photoURL });
    showToast("تم تحديث بيانات الملف الشخصي بنجاح", "success");
  };

  document.getElementById("btn-save-preferences").onclick = async () => {
    const currency = document.getElementById("set-currency").value;
    const fontSize = document.getElementById("set-font-size").value;
    const existing = AppState.collections.user_settings[0];
    if (existing) {
      await updateRecord("user_settings", existing.id, { currency, fontSize });
    } else {
      await createRecord("user_settings", { currency, fontSize });
    }
  };

  document.getElementById("btn-enable-notifications").onclick = async () => {
    if (!("Notification" in window)) {
      showToast("هذا المتصفح لا يدعم Notification API", "error");
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      new Notification("MY LIFE OS", { body: "تم تفعيل الإشعارات الذكية بنجاح!" });
      showToast("تم تفعيل الإشعارات بنجاح", "success");
    } else {
      showToast("تم رفض صلاحية الإشعارات من المتصفح", "error");
    }
  };

  // Export & Import JSON Backup
  document.getElementById("btn-export-data").onclick = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      ownerUid: AppState.user?.uid,
      collections: AppState.collections
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `my-life-os-backup-${todayISO()}.json`;
    a.click();
    showToast("تم تصدير النسخة الاحتياطية بنجاح", "success");
  };

  document.getElementById("input-import-json").onchange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed.collections) throw new Error("ملف غير صالح");
      for (const [colName, items] of Object.entries(parsed.collections)) {
        if (Array.isArray(items)) {
          for (const item of items) {
            const { id, createdAt, updatedAt, ...rest } = item;
            await createRecord(colName, rest);
          }
        }
      }
      showToast("تم استيراد البيانات إلى حسابك في Firestore", "success");
    } catch (err) {
      showToast("خطأ في استيراد الملف: " + err.message, "error");
    }
  };

  // Wipe All Data & Delete Account
  document.getElementById("btn-delete-all-data").onclick = async () => {
    if (!confirm("تأكيد نهائي: هل أنت متأكد من حذف جميع سجلاتك من قاعدة البيانات؟")) return;
    for (const colName of Object.keys(AppState.collections)) {
      const q = query(collection(AppState.db, colName), where("ownerUid", "==", AppState.user.uid));
      const snap = await getDocs(q);
      for (const d of snap.docs) {
        await deleteDoc(doc(AppState.db, colName, d.id));
      }
    }
    showToast("تم مسح جميع بياناتك من Firestore فعلياً", "success");
  };

  document.getElementById("btn-delete-account").onclick = async () => {
    if (!confirm("تحذير: سيتم حذف حسابك وجميع بياناتك نهائياً. هل تود المتابعة؟")) return;
    try {
      await deleteUser(AppState.user);
      showToast("تم حذف الحساب نهائياً", "success");
    } catch (err) {
      showToast("يتطلب حذف الحساب إعادة تسجيل الدخول حديثاً لدواعي الأمان: " + err.message, "error");
    }
  };
});
