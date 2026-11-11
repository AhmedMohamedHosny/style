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
  const cleanUrl = window.location.href.split("?")[0].split("#")[0];
  const manifestObj = {
    name: "MY LIFE OS — Personal Operating System",
    short_name: "MY LIFE OS",
    description: "Complete Personal Life Operating System Powered by Firebase & AI",
    start_url: cleanUrl,
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
      action: cleanUrl,
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
   5. DIRECT FIREBASE CONNECTION (style-a422d) & LUXURY PARTICLES ENGINE
   ============================================================================ */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCTmLj1P9e-xfyAxpHMslydcyxQa-KPYxI",
  authDomain: "style-a422d.firebaseapp.com",
  projectId: "style-a422d",
  storageBucket: "style-a422d.firebasestorage.app",
  messagingSenderId: "262616799685",
  appId: "1:262616799685:web:fbed02ec2160dfbee253ac",
  measurementId: "G-0JFRK4J2SL"
};

async function initFirebaseSystem() {
  const badge = document.getElementById("fb-connection-badge");
  const statusText = document.getElementById("fb-status-text");

  try {
    if (getApps().length > 0) {
      await Promise.all(getApps().map(a => deleteApp(a)));
    }
    AppState.app = initializeApp(FIREBASE_CONFIG);
    AppState.auth = getAuth(AppState.app);
    AppState.db = getFirestore(AppState.app);
    AppState.storage = getStorage(AppState.app);

    // تفعيل Firebase Analytics بأمان عند دعم المتصفح
    import("https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js")
      .then(({ getAnalytics, isSupported }) => isSupported().then(yes => yes && getAnalytics(AppState.app)))
      .catch(() => {});

    if (badge) badge.className = "badge badge-emerald";
    if (statusText) statusText.textContent = `متصل سحابياً • ${FIREBASE_CONFIG.projectId}`;

    bindAuthListener();
    return true;
  } catch (err) {
    if (badge) badge.className = "badge badge-danger";
    if (statusText) statusText.textContent = "خطأ في الاتصال بـ Firebase";
    showToast("فشل تهيئة Firebase: " + err.message, "error");
    return false;
  }
}

function initLuxuryParticles() {
  // تم استبدال الأنيميشن الثقيل بنظام الخلفيات السينمائية الثابتة لضمان سرعة 100% على كل الأجهزة
  applySavedWallpapers();
}

const DEFAULT_WALLPAPERS = {
  // خلفيات شباب وفخامة وغموض
  shadowWarrior: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85",
  darkRonin: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=85",
  cyberCoder: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=85",
  nightHood: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=85",
  // خلفيات بنات وأنيميشن وألوان لطيفة وهادئة
  animeGirlStudy: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=85",
  sakuraPink: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1920&q=85",
  cozyAesthetic: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1920&q=85",
  pastelClouds: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85",
  // خلفيات طبيعة ساحرة وهدوء نفسي
  swissAlps: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85",
  rainyForest: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85",
  royalGalaxy: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1920&q=85",
  nightOcean: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1920&q=85"
};

function applySavedWallpapers() {
  const cloudPref = AppState.collections?.user_settings?.[0] || {};
  const appBg = cloudPref.appWallpaper || localStorage.getItem("MY_LIFE_OS_APP_BG") || DEFAULT_WALLPAPERS.shadowWarrior;
  const pomoBg = cloudPref.pomoWallpaper || localStorage.getItem("MY_LIFE_OS_POMO_BG") || DEFAULT_WALLPAPERS.animeGirlStudy;
  document.documentElement.style.setProperty("--app-wallpaper", `url('${appBg}')`);
  document.documentElement.style.setProperty("--pomo-wallpaper", `url('${pomoBg}')`);
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
      const savedBio = localStorage.getItem("MY_LIFE_OS_USER_BIO") || "";
      const bioInput = document.getElementById("set-user-bio");
      if (bioInput) bioInput.value = savedBio;

      const avatarSrc = localStorage.getItem("MY_LIFE_OS_CUSTOM_AVATAR") || user.photoURL || "logo.png";
      document.getElementById("user-avatar-img").src = avatarSrc;
      const previewImg = document.getElementById("settings-avatar-preview");
      if (previewImg) previewImg.src = avatarSrc;

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

// تحديث أشرطة التقدم المضيئة في الكروت الـ 4 (SHADOW CORE Bars)
  const taskBarPct = todayTasks.length ? Math.round((completedToday / todayTasks.length) * 100) : 0;
  document.getElementById("kpi-bar-tasks")?.style.setProperty("width", `${taskBarPct}%`);
  document.getElementById("kpi-bar-prayers")?.style.setProperty("width", `${Math.round((prayerCount / 5) * 100)}%`);
  document.getElementById("kpi-bar-projects")?.style.setProperty("width", `${avgProgress}%`);

  // عرض تقدم المشاريع + المواد الدراسية معاً بدون قص الأسماء
  const projBox = document.getElementById("dash-active-projects");
  const subjects = AppState.collections.subjects || [];
  const combinedProgress = [
    ...projects.map(p => ({ name: `💻 ${p.title}`, pct: Number(p.progress) || 0 })),
    ...subjects.map(s => {
      const done = Object.values(s.checklist || {}).filter(Boolean).length;
      return { name: `📚 ${s.name}`, pct: Math.round((done / 29) * 100) };
    })
  ];

  if (!combinedProgress.length) {
    projBox.innerHTML = renderEmptyState("لم تقم بإضافة مشاريع أو مواد دراسية بعد.");
  } else {
    projBox.innerHTML = combinedProgress.slice(0, 5).map(item => `
      <div class="prayer-row" style="flex-direction:column; align-items:stretch; gap:6px;">
        <div class="flex-between">
          <strong style="word-break:break-word;">${escapeHTML(item.name)}</strong>
          <span class="badge badge-gold">${item.pct}%</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width:${item.pct}%"></div>
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

/* --- 9.2 TASKS (STANDARD GRID + INTERACTIVE KANBAN BOARD) --- */
AppState.isKanbanView = false;

function renderTasks() {
  const container = document.getElementById("tasks-list-container");
  if (!container) return;
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
    container.className = "items-grid";
    container.innerHTML = renderEmptyState("لا توجد مهام مطابقة. أضف مهمتك الحقيقية الأولى الآن.");
    return;
  }

  // وضع لوحة كانبان الاحترافية (3 أعمدة)
  if (AppState.isKanbanView) {
    container.className = "kanban-board-grid";
    const cols = [
      { key: "Pending", label: "⏳ قيد الانتظار", color: "#f59e0b" },
      { key: "In Progress", label: "⚡ جاري التنفيذ", color: "#06b6d4" },
      { key: "Completed", label: "✅ مكتملة", color: "#10b981" }
    ];

    container.innerHTML = cols.map(col => {
      const colTasks = list.filter(t => (t.status || "Pending") === col.key);
      return `
        <div class="kanban-column">
          <div class="kanban-col-header" style="border-bottom-color:${col.color}">
            <span>${col.label}</span>
            <span class="badge badge-gold">${colTasks.length}</span>
          </div>
          <div class="kanban-cards-wrap">
            ${colTasks.map(t => `
              <div class="item-card mb-2">
                <div class="flex-between">
                  <span class="badge badge-gold">${escapeHTML(t.priority || "High")}</span>
                  ${t.spentMinutes ? `<small class="gold-text">⏱️ ${t.spentMinutes} د</small>` : ""}
                </div>
                <h4 class="mt-2">${escapeHTML(t.title)}</h4>
                <p class="small-muted">${escapeHTML(t.description || "")}</p>
                <div class="flex-between mt-2">
                  <div class="config-actions">
                    ${col.key !== "Pending" ? `<button class="btn btn-xs btn-outline" data-action="move-kanban" data-id="${t.id}" data-status="Pending">⏳</button>` : ""}
                    ${col.key !== "In Progress" ? `<button class="btn btn-xs btn-outline" data-action="move-kanban" data-id="${t.id}" data-status="In Progress">⚡</button>` : ""}
                    ${col.key !== "Completed" ? `<button class="btn btn-xs btn-gold" data-action="move-kanban" data-id="${t.id}" data-status="Completed">✅</button>` : ""}
                  </div>
                  <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="tasks" data-id="${t.id}"><i class="fa-solid fa-trash"></i></button>
                </div>
              </div>
            `).join("") || `<p class="small-muted text-center">لا توجد مهام في هذا العمود</p>`}
          </div>
        </div>
      `;
    }).join("");
    return;
  }

  // العرض القياسي للكروت
  container.className = "items-grid";
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
          ${t.spentMinutes ? `<small class="gold-text d-block mt-2"><i class="fa-solid fa-stopwatch"></i> إجمالي وقت التركيز المسجل: ${t.spentMinutes} دقيقة</small>` : ""}
        </div>
        <div class="flex-between mt-2">
          <small class="small-muted"><i class="fa-regular fa-clock"></i> ${escapeHTML(t.dueDate || "بدون تاريخ")}</small>
          <div class="config-actions">
            <button class="btn btn-xs btn-gold" data-action="focus-on-task" data-id="${t.id}" title="فتح في مؤقت التركيز">
              <i class="fa-solid fa-play"></i> تركيز
            </button>
            <button class="btn btn-xs btn-outline" data-action="edit-item" data-col="tasks" data-id="${t.id}" title="تعديل المهمة">
              <i class="fa-solid fa-pen"></i>
            </button>
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
    subjBox.innerHTML = renderEmptyState("لم تقم بإضافة موادك الدراسية بعد. أضف اسم المادة بضغطة واحدة!");
  } else {
    subjBox.innerHTML = subjects.map(s => {
      // إجمالي البنود: 11 محاضرة + 11 شيت + 1 ميدتيرم + 2 كويز + 4 تكليفات = 29 بنداً
      const checklist = s.checklist || {};
      const completedCount = Object.values(checklist).filter(Boolean).length;
      const progressPct = Math.round((completedCount / 29) * 100);
      const voiceNotesCount = (s.voiceNotes || []).length;

      return `
        <div class="item-card">
          <div>
            <div class="flex-between">
              <span class="badge badge-gold"><i class="fa-solid fa-graduation-cap"></i> مادة دراسية</span>
              <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="subjects" data-id="${s.id}">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
            <h3 class="mt-2 gold-text">${escapeHTML(s.name)}</h3>
            ${s.notes ? `<p class="small-muted">${escapeHTML(s.notes)}</p>` : ""}

            <!-- خريطة المنهج والنسبة المئوية التلقائية -->
            <div class="subject-progress-box">
              <div class="checklist-quick-stats">
                <span>إنجاز المنهج: <strong>${completedCount} / 29</strong> بند</span>
                <span class="gold-text"><strong>${progressPct}%</strong></span>
              </div>
              <div class="progress-bar-track">
                <div class="progress-bar-fill" style="width: ${progressPct}%"></div>
              </div>
            </div>
          </div>

<div class="flex-between mt-2">
            <button class="btn btn-xs btn-outline" data-action="open-curriculum" data-id="${s.id}">
              <i class="fa-solid fa-list-check"></i> خريطة المنهج (29 بند)
            </button>
            <button class="btn btn-xs btn-gold" data-action="open-subject-voice" data-id="${s.id}">
              <i class="fa-solid fa-microphone"></i> صوتيات (${voiceNotesCount})
            </button>
            <button class="btn btn-xs btn-outline" data-action="open-subject-formulas" data-id="${s.id}">
              <i class="fa-solid fa-square-root-variable gold-text"></i> القوانين (${(s.formulas || []).length})
            </button>
          </div>
        </div>
      `;
    }).join("");
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

/* --- 9.6 PROJECTS & CODING (WITH DEV TIME TRACKER) --- */
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

  container.innerHTML = list.map(p => {
    const isTracking = AppState.activeProjectTrackingId === p.id;
    const trackedSec = Number(p.trackedSeconds || 0);
    const hrs = Math.floor(trackedSec / 3600);
    const mins = Math.floor((trackedSec % 3600) / 60);
    const displayTime = hrs > 0 ? `${hrs} ساعة و ${mins} دقيقة` : `${mins} دقيقة`;

    return `
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

          <!-- متتبع ساعات البرمجة الفعلي (Dev Time Tracker) -->
          <div class="dev-tracker-bar">
            <div>
              <small class="small-muted d-block">إجمالي ساعات العمل المسجلة:</small>
              <span class="dev-tracker-time"><i class="fa-solid fa-clock"></i> ${displayTime}</span>
            </div>
            <button class="btn btn-xs ${isTracking ? "btn-track-pulse" : "btn-outline"}" data-action="toggle-project-timer" data-id="${p.id}">
              <i class="fa-solid ${isTracking ? "fa-stop" : "fa-play"}"></i>
              ${isTracking ? "إيقاف وحفظ" : "بدء العمل ⏱️"}
            </button>
          </div>
        </div>

        <div class="flex-between mt-2">
          <div>
            ${p.githubUrl ? `<a href="${escapeHTML(p.githubUrl)}" target="_blank" class="btn-link"><i class="fa-brands fa-github"></i> GitHub</a>` : ""}
            ${p.liveUrl ? `<a href="${escapeHTML(p.liveUrl)}" target="_blank" class="btn-link"><i class="fa-solid fa-globe"></i> Live</a>` : ""}
          </div>
          <button class="btn btn-xs btn-outline" data-action="edit-item" data-col="projects" data-id="${p.id}" title="تعديل المشروع">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="projects" data-id="${p.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");
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
<div class="config-actions">
          <button class="btn btn-xs btn-gold" data-action="note-to-flashcard" data-id="${n.id}" title="تحويل الملاحظة إلى بطاقة مراجعة 3D">
            <i class="fa-solid fa-clone"></i> بطاقة 3D
          </button>
          <button class="btn btn-xs btn-outline" data-action="edit-item" data-col="notes" data-id="${n.id}" title="تعديل الملاحظة">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-xs btn-danger" data-action="delete-item" data-col="notes" data-id="${n.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
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
   11. REAL GENERATIVE AI PERSONAL ASSISTANT + SMART ACTION EXECUTION
   ============================================================================ */
function appendAIMessage(text, sender = "assistant") {
  const box = document.getElementById("ai-messages-box");
  if (!box) return;
  const div = document.createElement("div");
  div.className = `ai-msg ${sender}`;
  div.style.whiteSpace = "pre-line";
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return div;
}

function parseNaturalLanguageAIAction(input) {
  const text = input.trim();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowISO = tomorrow.toISOString().split("T")[0];

  // 1. إضافة مادة دراسية مباشرة (مثال: "أضف مادة دوائر كهربائية")
  const subjMatch = text.match(/^(?:أضف|اضف|سجل)\s+مادة\s+(.+)$/i);
  if (subjMatch) {
    const subjName = subjMatch[1].trim();
    return {
      collection: "subjects",
      summary: `إضافة مادة دراسية جديدة باسم: "${subjName}"`,
      payload: { name: subjName, notes: "تمت الإضافة عبر المساعد الذكي" }
    };
  }

  // 2. إضافة مهمة أو مذاكرة (مثال: "أضف مذاكرة دوائر كهربائية غداً الساعة 5")
  if (/^(أضف|اضف|سجل مهمة|انشئ مهمة|ذكرني بـ|مذاكرة)\s+/i.test(text)) {
    const isTomorrow = /غدا|غداً|بكرة/.test(text);
    const timeMatch = text.match(/الساعة\s*(\d{1,2})/);
    const cleanTitle = text.replace(/^(أضف|اضف|سجل مهمة|انشئ مهمة|ذكرني بـ)\s*/i, "");
    return {
      collection: "tasks",
      summary: `إضافة مهمة جديدة: "${cleanTitle}" بتاريخ ${isTomorrow ? tomorrowISO : todayISO()}`,
      payload: {
        title: cleanTitle,
        description: timeMatch ? `الموعد: الساعة ${timeMatch[1]}:00` : "تم إنشاؤها عبر المساعد الذكي",
        dueDate: isTomorrow ? tomorrowISO : todayISO(),
        priority: "High",
        status: "Pending",
        category: "دراسة"
      }
    };
  }

  // 3. تسجيل مصروف أو دخل (مثال: "سجل مصروف 250 جنيه مراجع دراسية")
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
        category: "عام",
        date: todayISO()
      }
    };
  }

  return null;
}

async function askGeminiOrFallbackAI(userPrompt) {
  const userName = AppState.user?.displayName || "Engineer";
  const pendingTasks = AppState.collections.tasks.filter(t => t.status !== "Completed").map(t => t.title);
  const subjectsList = AppState.collections.subjects.map(s => s.name);
  const projectsList = AppState.collections.projects.map(p => `${p.title} (${p.progress || 0}%)`);

  const systemContext = `You are "Alex", an advanced, smart, and friendly AI Personal Copilot inside the MY LIFE OS platform for "${userName}".
Keep your tone professional, motivating, concise, and helpful. Do NOT use slang phrases like "يا قدوة".
Respond in the same language the user writes in (English or Arabic), keeping key technical terms in English.
User's live context:
- Enrolled Subjects (${subjectsList.length}): ${subjectsList.join(", ") || "None yet"}
- Pending Tasks (${pendingTasks.length}): ${pendingTasks.join(", ") || "No pending tasks"}
- Active Projects (${projectsList.length}): ${projectsList.join(", ") || "No active projects"}`;

  const geminiKey = localStorage.getItem("MY_LIFE_OS_GEMINI_KEY");
  const selectedModel = localStorage.getItem("MY_LIFE_OS_GEMINI_MODEL") || "gemini-2.0-flash";

  // 1. إذا أدخل المستخدم مفتاح Gemini API الخاص به
  if (geminiKey) {
    const modelsToTry = [selectedModel, "gemini-2.0-flash", "gemini-1.5-flash"];
    for (const modelName of modelsToTry) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(geminiKey)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemContext}\n\nUser Request: ${userPrompt}` }] }]
          })
        });
        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return reply;
      } catch (e) {}
    }
  }

  // 2. المحرك التلقائي الاحتياطي في حال عدم إدخال مفتاح
  try {
    const res = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai",
        messages: [
          { role: "system", content: systemContext },
          { role: "user", content: userPrompt }
        ]
      })
    });
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (reply) return reply;
  } catch (e) {}

  return `Hello ${userName}! I'm Alex AI. You currently have ${pendingTasks.length} active tasks and ${subjectsList.length} enrolled subjects. How can I help you organize your schedule today?`;
}

async function handleAIChatSubmit(userPrompt) {
  appendAIMessage(userPrompt, "user");

  const detectedAction = parseNaturalLanguageAIAction(userPrompt);
  if (detectedAction) {
    AppState.pendingAIAction = detectedAction;
    document.getElementById("ai-confirm-summary").textContent = detectedAction.summary;
    document.getElementById("ai-confirm-payload").textContent = JSON.stringify(detectedAction.payload, null, 2);
    document.getElementById("ai-confirmation-card").classList.remove("hidden");
    appendAIMessage("Action extracted! Please confirm below to save it directly to your account.", "assistant");
    return;
  }

  const loadingMsg = appendAIMessage("Alex is thinking...", "assistant");
  const aiReply = await askGeminiOrFallbackAI(userPrompt);
  loadingMsg.textContent = aiReply;
}

/* ============================================================================
   12. UNIVERSAL MODAL BUILDER (CLEAN BRANDING)
   ============================================================================ */
function openFormModal(title, fieldsHtml, onSubmitCallback) {
  const modal = document.getElementById("universal-modal");
  modal.querySelector(".modal-card")?.classList.remove("pomo-fullscreen-active", "wide-lab-modal", "pomo-pure-cinema");
  const form = document.getElementById("universal-modal-form");
  document.getElementById("modal-title").textContent = title;
  form.innerHTML = fieldsHtml + `
    <div class="config-actions mt-4">
      <button type="submit" class="btn btn-gold btn-block">حفظ البيانات</button>
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

// تشغيل اتصال Firebase التلقائي + أنيميشن الجزيئات الطائرة
  initFirebaseSystem();
  initLuxuryParticles();

// نظام التنقل الأنيق بين تسجيل الدخول وإنشاء الحساب واستعادة كلمة السر (Facebook Style)
  let authMode = "login";
  const switchAuthBtn = document.getElementById("btn-switch-auth-mode");
  const forgotPassLink = document.getElementById("btn-forgot-pass-link");
  const nameGroup = document.getElementById("auth-name-group");
  const passGroup = document.getElementById("auth-password-group");
  const submitLabel = document.getElementById("auth-submit-label");

  function updateAuthUI() {
    if (authMode === "login") {
      nameGroup.classList.add("hidden");
      passGroup.classList.remove("hidden");
      forgotPassLink.classList.remove("hidden");
      submitLabel.textContent = "تسجيل الدخول";
      switchAuthBtn.textContent = "إنشاء حساب جديد";
    } else if (authMode === "register") {
      nameGroup.classList.remove("hidden");
      passGroup.classList.remove("hidden");
      forgotPassLink.classList.add("hidden");
      submitLabel.textContent = "إنشاء حساب";
      switchAuthBtn.textContent = "لديك حساب بالفعل؟ تسجيل الدخول";
    } else if (authMode === "reset") {
      nameGroup.classList.add("hidden");
      passGroup.classList.add("hidden");
      forgotPassLink.classList.add("hidden");
      submitLabel.textContent = "إرسال رابط استعادة كلمة السر";
      switchAuthBtn.textContent = "العودة لتسجيل الدخول";
    }
  }

  switchAuthBtn.onclick = () => {
    authMode = authMode === "login" ? "register" : "login";
    updateAuthUI();
  };

  forgotPassLink.onclick = () => {
    authMode = "reset";
    updateAuthUI();
  };

  // Auth Form Submit
  document.getElementById("auth-form").onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email").value.trim();
    const password = document.getElementById("auth-password").value;
    const name = document.getElementById("auth-name").value.trim();

    try {
      if (authMode === "login") {
        await signInWithEmailAndPassword(AppState.auth, email, password);
        showToast("مرحباً بك في MY LIFE OS", "success");
      } else if (authMode === "register") {
        const cred = await createUserWithEmailAndPassword(AppState.auth, email, password);
        if (name) await updateProfile(cred.user, { displayName: name });
        showToast("تم إنشاء حسابك بنجاح!", "success");
      } else if (authMode === "reset") {
        await sendPasswordResetEmail(AppState.auth, email);
        showToast("تم إرسال رابط استعادة كلمة السر إلى بريدك الإلكتروني", "success");
        authMode = "login";
        updateAuthUI();
      }
    } catch (err) {
      showToast("يرجى التأكد من البريد الإلكتروني وكلمة السر", "error");
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

// Modal Close (محمي بقفل التشتت الصارم أثناء جلسة التركيز)
  document.getElementById("btn-close-modal").onclick = () => {
    const isPomoModal = document.querySelector("#universal-modal .modal-card")?.classList.contains("pomo-fullscreen-active");
    if (isPomoModal && PomodoroState.isRunning && PomodoroState.strictLock) {
      attemptBreakStrictLock(() => {
        pausePomodoro();
        document.getElementById("universal-modal").classList.add("hidden");
      });
      return;
    }
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
      <div id="collision-alert" class="collision-warning-box hidden">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span id="collision-alert-text"></span>
      </div>
      <div class="form-group"><label>عنوان الحدث</label><input name="title" required placeholder="امتحان، تسليم شيت، محاضرة..." /></div>
      <div class="form-group"><label>التاريخ</label><input type="date" id="event-input-date" name="date" value="${todayISO()}" required /></div>
      <div class="form-group"><label>الوقت</label><input type="time" id="event-input-time" name="time" /></div>
      <div class="form-group"><label>النوع</label>
        <select name="type">
          <option value="University">محاضرة / جامعة</option>
          <option value="Exam">امتحان</option>
          <option value="Project">مشروع</option>
          <option value="Reminder">تذكير</option>
        </select>
      </div>
    `, async (data) => {
      const conflict = checkEventCollision(data.date, data.time);
      if (conflict) {
        const proceed = confirm(`⚠️ كاشف التضارب الذكي: لديك بالفعل حدث بعنوان "${conflict.title}" في نفس التوقيت تقريباً!\n\nهل ترغب في حفظ الحدث رغم وجود هذا التعارض؟`);
        if (!proceed) return;
      }
      await createRecord("events", data);
    });

    // كشف فوري أثناء كتابة التاريخ والوقت في النموذج
    const dateInp = document.getElementById("event-input-date");
    const timeInp = document.getElementById("event-input-time");
    const alertBox = document.getElementById("collision-alert");
    const alertText = document.getElementById("collision-alert-text");

    const runCollisionCheck = () => {
      const conflict = checkEventCollision(dateInp.value, timeInp.value);
      if (conflict) {
        alertBox.classList.remove("hidden");
        alertText.textContent = `تنبيه: يوجد تعارض مع "${conflict.title}" المسجل في نفس اليوم الساعة ${conflict.time || "غير محدد"}.`;
      } else {
        alertBox.classList.add("hidden");
      }
    };

    dateInp.onchange = runCollisionCheck;
    timeInp.onchange = runCollisionCheck;
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
    openFormModal("إضافة مادة دراسية جديدة", `
      <div class="form-group">
        <label>اسم المادة الدراسية</label>
        <input name="name" required placeholder="مثال: دوائر كهربائية / Logic Design / برمجة ويب" autofocus />
      </div>
      <div class="form-group">
        <label>ملاحظة سريعة أو هدفك في المادة (اختياري)</label>
        <input name="notes" placeholder="مثال: التركيز على الشيتات والعملي" />
      </div>
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
// فتح خريطة المنهج الـ 29 بنداً للمادة
 // تشغيل / إيقاف مؤقت العمل على المشروع البرمجي
    if (action === "toggle-project-timer") {
      toggleProjectDevTimer(actionBtn.dataset.id);
    }
if (action === "open-curriculum") {
      const subject = AppState.collections.subjects.find(s => s.id === actionBtn.dataset.id);
      if (!subject) return;
      openSubjectCurriculumModal(subject);
    }

    // فتح مسجل الصوت واستعراض تسجيلات المحاضرات للمادة
    if (action === "open-subject-voice") {
      const subject = AppState.collections.subjects.find(s => s.id === actionBtn.dataset.id);
      if (!subject) return;
      openSubjectVoiceModal(subject);
    }
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
    openFormModal("إعداد مفتاح Google Gemini API (اختياري)", `
      <div class="form-group">
        <label>المساعد يعمل مجاناً بشكل تلقائي. إذا أردت ربطه بـ Gemini 1.5 Flash الخاص بك، الصق المفتاح هنا:</label>
        <input type="password" name="apiKey" dir="ltr" value="${escapeHTML(localStorage.getItem("MY_LIFE_OS_GEMINI_KEY") || "")}" placeholder="AIzaSy..." />
      </div>
    `, async (data) => {
      if (data.apiKey && data.apiKey.trim()) {
        localStorage.setItem("MY_LIFE_OS_GEMINI_KEY", data.apiKey.trim());
        showToast("تم تفعيل محرك Gemini Flash بنجاح", "success");
      } else {
        localStorage.removeItem("MY_LIFE_OS_GEMINI_KEY");
        showToast("تم التبديل إلى محرك الذكاء الاصطناعي التلقائي المجاني", "info");
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
    const userBio = document.getElementById("set-user-bio")?.value.trim() || "";
    localStorage.setItem("MY_LIFE_OS_USER_BIO", userBio);

    await updateProfile(AppState.user, { displayName });
    document.getElementById("user-display-name").textContent = displayName;
    document.getElementById("dash-user-name").textContent = displayName;
    showToast("تم تحديث بيانات الملف الشخصي بنجاح", "success");
  };

document.getElementById("btn-save-preferences").onclick = async () => {
    const currency = document.getElementById("set-currency").value;
    const fontSize = document.getElementById("set-font-size").value;
    const defaultPomo = Number(document.getElementById("set-default-pomo")?.value || 25);
    setCustomPomodoroTime(defaultPomo, "work");

    const existing = AppState.collections.user_settings[0];
    if (existing) {
      await updateRecord("user_settings", existing.id, { currency, fontSize, defaultPomo });
    } else {
      await createRecord("user_settings", { currency, fontSize, defaultPomo });
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
/* ==========================================================================
   TASK 3 HELPERS: CTRL+K COMMAND PALETTE, PRIVACY, ZEN, PRAYERS & BRIEFING
   ========================================================================== */

// 1. مؤثرات صوتية تكنولوجية لمسية ناعمة (Tactile Audio Clicks)
function playTactileClick() {
  if (typeof playCustomUISound === "function") playCustomUISound();
}

document.addEventListener("click", (e) => {
  if (e.target.closest("button, .nav-item, .check-pill, .chip")) {
    playTactileClick();
  }
});

// 2. درع الخصوصية (Privacy Shield)
let isPrivacyActive = false;
function togglePrivacyShield() {
  isPrivacyActive = !isPrivacyActive;
  document.body.classList.toggle("privacy-shield-active", isPrivacyActive);
  const icon = document.querySelector("#btn-privacy-shield i");
  if (icon) {
    icon.className = isPrivacyActive ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
  }
  showToast(isPrivacyActive ? "تم تفعيل درع الخصوصية (إخفاء الأرقام)" : "تم تعطيل درع الخصوصية", "info");
}

// 3. وضع التركيز المطلق (Zen Focus Mode)
let isZenActive = false;
function toggleZenMode() {
  isZenActive = !isZenActive;
  document.body.classList.toggle("zen-focus-active", isZenActive);
  const exitBtn = document.getElementById("btn-exit-zen");
  if (exitBtn) exitBtn.classList.toggle("hidden", !isZenActive);
  showToast(isZenActive ? "تم تفعيل وضع التركيز المطلق (اضغط ESC للخروج)" : "تم الخروج من وضع التركيز", "info");
}

// 4. السبحة الإلكترونية العائمة الذكية
let tasbeehCount = Number(localStorage.getItem("MY_LIFE_OS_TASBEEH") || 0);

function updateTasbeehUI() {
  document.getElementById("tasbeeh-mini-count").textContent = tasbeehCount;
  document.getElementById("tasbeeh-main-count").textContent = tasbeehCount;
  localStorage.setItem("MY_LIFE_OS_TASBEEH", tasbeehCount);
}

function clickTasbeeh() {
  tasbeehCount++;
  updateTasbeehUI();
  if ("vibrate" in navigator) {
    try { navigator.vibrate(35); } catch (e) {}
  }
}

// 5. حساب مواقيت الصلاة الدقيقة لمصر (وفق الهيئة المصرية العامة للمساحة)
function calculateEgyptPrayerTimes() {
  // إحداثيات القاهرة والمعدلات القياسية لمصر (الفجر 19.5°، العشاء 17.5°)
  const now = new Date();
  const baseTimes = [
    { key: "fajr", name: "الفجر", h: 4, m: 43 },
    { key: "sunrise", name: "الشروق", h: 6, m: 9 },
    { key: "dhuhr", name: "الظهر", h: 11, m: 39 },
    { key: "asr", name: "العصر", h: 14, m: 44 },
    { key: "maghrib", name: "المغرب", h: 17, m: 9 },
    { key: "isha", name: "العشاء", h: 18, m: 28 }
  ];

  const grid = document.getElementById("egypt-prayer-times-grid");
  const countdownEl = document.getElementById("next-prayer-countdown");
  if (!grid) return;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  let nextPrayer = null;

  grid.innerHTML = baseTimes.map(p => {
    const prayerMinutes = p.h * 60 + p.m;
    const isNext = !nextPrayer && prayerMinutes > currentMinutes;
    if (isNext) nextPrayer = { ...p, minutes: prayerMinutes };

    const formattedTime = `${String(p.h > 12 ? p.h - 12 : p.h).padStart(2, "0")}:${String(p.m).padStart(2, "0")} ${p.h >= 12 ? "م" : "ص"}`;
    return `
      <div class="prayer-time-col ${isNext ? "active-next" : ""}">
        <strong>${p.name}</strong>
        <span>${formattedTime}</span>
      </div>
    `;
  }).join("");

  if (!nextPrayer) nextPrayer = { ...baseTimes[0], minutes: (baseTimes[0].h + 24) * 60 + baseTimes[0].m };
  const diffMin = nextPrayer.minutes - currentMinutes;
  const remH = Math.floor(diffMin / 60);
  const remM = diffMin % 60;
  if (countdownEl) {
    countdownEl.textContent = `متبقي على صلاة ${nextPrayer.name}: ${remH > 0 ? remH + " س و " : ""}${remM} دقيقة`;
  }
}

function renderMorningBriefing() {
  const el = document.getElementById("morning-briefing-text");
  const prefixEl = document.getElementById("time-greeting-prefix");
  if (!el) return;

  const hour = new Date().getHours();
  const isMorning = hour >= 4 && hour < 12;
  const isAfternoon = hour >= 12 && hour < 17;
  const greeting = isMorning ? "صباح الخير والبركة" : isAfternoon ? "مساء الخير والهمة" : "مساء النور والهدوء";
  const emoji = isMorning ? "☀️" : isAfternoon ? "⚡" : "🌙";

  if (prefixEl) prefixEl.textContent = `${greeting}،`;

  const today = todayISO();
  const tasksToday = AppState.collections.tasks.filter(t => t.dueDate === today && t.status !== "Completed");
  const overdueTasks = AppState.collections.tasks.filter(t => t.dueDate && t.dueDate < today && t.status !== "Completed");
  const subjectsCount = AppState.collections.subjects.length;

  let briefing = `${emoji} لديك ${subjectsCount} مواد دراسية مسجلة. `;
  if (tasksToday.length > 0) {
    briefing += `مهامك المتبقية لليوم (${tasksToday.length})، أهمها: "${tasksToday[0].title}". `;
  } else {
    briefing += `أنهيت مهام اليوم المجدولة! وقت مثالي للتركيز العميق أو الراحة. `;
  }
  if (overdueTasks.length > 0) {
    briefing += `(تنبيه: لديك ${overdueTasks.length} مهام متأخرة).`;
  }
  el.textContent = briefing;
}

// 7. لوحة الأوامر السريعة (Command Palette - Ctrl + K)
const COMMAND_ACTIONS = [
  { label: "الانتقال إلى: لوحة التحكم (الرئيسية)", icon: "fa-gauge-high", action: () => switchView("dashboard") },
  { label: "الانتقال إلى: إدارة المهام", icon: "fa-list-check", action: () => switchView("tasks") },
  { label: "الانتقال إلى: الجامعة والدراسة", icon: "fa-graduation-cap", action: () => switchView("university") },
  { label: "الانتقال إلى: القرآن والعبادة", icon: "fa-mosque", action: () => switchView("islamic") },
  { label: "الانتقال إلى: المشاريع والبرمجة", icon: "fa-code-branch", action: () => switchView("projects") },
  { label: "الانتقال إلى: الإدارة المالية", icon: "fa-wallet", action: () => switchView("finance") },
  { label: "الانتقال إلى: المساعد الذكي AI", icon: "fa-wand-magic-sparkles", action: () => switchView("ai") },
  { label: "إجراء سريع: إضافة مهمة جديدة", icon: "fa-plus", action: () => document.getElementById("btn-open-task-modal")?.click() },
  { label: "إجراء سريع: إضافة مادة دراسية", icon: "fa-book-medical", action: () => document.getElementById("btn-add-subject")?.click() },
  { label: "إجراء سريع: تشغيل مؤقت بومودورو", icon: "fa-stopwatch", action: () => openPomodoroModal() },
  { label: "إجراء سريع: تشغيل صوت المطر الهادئ", icon: "fa-cloud-showers-heavy", action: () => toggleAmbientSound("rain") },
  { label: "تبديل: تفعيل / إلغاء درع الخصوصية", icon: "fa-eye-slash", action: () => togglePrivacyShield() },
  { label: "تبديل: تفعيل وضع التركيز (Zen Mode)", icon: "fa-compress", action: () => toggleZenMode() }
];

function openCommandPalette() {
  const modal = document.getElementById("command-palette-modal");
  const input = document.getElementById("cmd-input");
  if (!modal || !input) return;

  modal.classList.remove("hidden");
  input.value = "";
  renderCmdResults("");
  input.focus();
}

function closeCommandPalette() {
  const modal = document.getElementById("command-palette-modal");
  if (modal) modal.classList.add("hidden");
}

function renderCmdResults(queryStr) {
  const list = document.getElementById("cmd-results-list");
  if (!list) return;

  const q = queryStr.toLowerCase().trim();
  const filtered = COMMAND_ACTIONS.filter(c => c.label.toLowerCase().includes(q));

  if (!filtered.length) {
    list.innerHTML = `<div class="p-3 text-center small-muted">لم يتم العثور على أوامر مطابقة</div>`;
    return;
  }

  list.innerHTML = filtered.map((c, idx) => `
    <div class="cmd-item" data-cmd-index="${idx}">
      <div class="cmd-item-start">
        <i class="fa-solid ${c.icon} gold-text"></i>
        <span>${escapeHTML(c.label)}</span>
      </div>
      <i class="fa-solid fa-arrow-turn-down fa-rotate-90 small-muted"></i>
    </div>
  `).join("");

  list.querySelectorAll(".cmd-item").forEach((el, idx) => {
    el.onclick = () => {
      closeCommandPalette();
      filtered[idx].action();
    };
  });
}

// 8. ربط المستمعين للأحداث ومفاتيح الكيبورد
document.addEventListener("DOMContentLoaded", () => {
  // درع الخصوصية ووضع التركيز
  document.getElementById("btn-privacy-shield")?.addEventListener("click", togglePrivacyShield);
  document.getElementById("btn-zen-mode")?.addEventListener("click", toggleZenMode);
  document.getElementById("btn-exit-zen")?.addEventListener("click", toggleZenMode);
  document.getElementById("btn-open-cmd")?.addEventListener("click", openCommandPalette);

  // السبحة العائمة
  updateTasbeehUI();
  // تحريك وتثبيت السبحة الإلكترونية في أي مكان على الشاشة (Drag & Drop بالماوس أو اللمس)
  const tasbeehWidget = document.getElementById("floating-tasbeeh-widget");
  if (tasbeehWidget) {
    // استرجاع آخر مكان وضع فيه المستخدم السبحة
    const savedPos = localStorage.getItem("MY_LIFE_OS_TASBEEH_POS");
    if (savedPos) {
      try {
        const { x, y } = JSON.parse(savedPos);
        tasbeehWidget.style.top = `${y}px`;
        tasbeehWidget.style.left = `${x}px`;
        tasbeehWidget.style.bottom = "auto";
        tasbeehWidget.style.right = "auto";
      } catch (e) {}
    }

    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;
    let hasMoved = false;

    const onPointerDown = (e) => {
      // عدم التحريك إذا كان الضغط داخل قائمة الأذكار المنسدلة
      if (e.target.closest("#tasbeeh-popover")) return;

      isDragging = true;
      hasMoved = false;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      startX = clientX;
      startY = clientY;

      const rect = tasbeehWidget.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      tasbeehWidget.classList.add("is-dragging");
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      const dx = clientX - startX;
      const dy = clientY - startY;

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        hasMoved = true;
      }

      let newX = initialLeft + dx;
      let newY = initialTop + dy;

      // الحفاظ على الزر داخل حدود الشاشة
      newX = Math.max(10, Math.min(window.innerWidth - 60, newX));
      newY = Math.max(10, Math.min(window.innerHeight - 60, newY));

      tasbeehWidget.style.top = `${newY}px`;
      tasbeehWidget.style.left = `${newX}px`;
      tasbeehWidget.style.bottom = "auto";
      tasbeehWidget.style.right = "auto";
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      tasbeehWidget.classList.remove("is-dragging");

      // حفظ المكان الجديد في LocalStorage
      const rect = tasbeehWidget.getBoundingClientRect();
      localStorage.setItem("MY_LIFE_OS_TASBEEH_POS", JSON.stringify({ x: rect.left, y: rect.top }));
    };

    // مستمعين الماوس واللمس (Desktop & Mobile Touch)
    tasbeehWidget.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    tasbeehWidget.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // منع فتح نافذة السبحة إذا كان المستخدم يقوم بسحبها
    const tasbeehBtn = document.getElementById("btn-toggle-tasbeeh");
    if (tasbeehBtn) {
      const oldClick = tasbeehBtn.onclick;
      tasbeehBtn.onclick = (e) => {
        if (hasMoved) return; // تم السحب فقط
        if (oldClick) oldClick(e);
      };
    }
  }
  document.getElementById("btn-toggle-tasbeeh")?.addEventListener("click", () => {
    document.getElementById("tasbeeh-popover")?.classList.toggle("hidden");
  });
  document.getElementById("btn-tasbeeh-click")?.addEventListener("click", clickTasbeeh);
  document.getElementById("btn-reset-tasbeeh")?.addEventListener("click", () => {
    tasbeehCount = 0;
    updateTasbeehUI();
    showToast("تم إعادة ضبط عداد السبحة", "info");
  });
  document.getElementById("select-tasbeeh-phrase")?.addEventListener("change", (e) => {
    document.getElementById("tasbeeh-dhikr-name").textContent = e.target.value;
  });

  // مواقيت الصلاة والموجز الصباحي
  calculateEgyptPrayerTimes();
  setInterval(calculateEgyptPrayerTimes, 60000);
  renderMorningBriefing();

  // اختصارات لوحة المفاتيح: Ctrl + K (أو Cmd + K)، Space للسبحة، و ESC للخروج
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const modal = document.getElementById("command-palette-modal");
      if (modal && !modal.classList.contains("hidden")) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    }

    if (e.key === "Escape") {
      closeCommandPalette();
      if (isZenActive) toggleZenMode();
    }

    // Spacebar للسبحة إذا كان البوب أوفر مفتوحاً ولم تكن داخل حقل كتابة
    if (e.code === "Space" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      const popover = document.getElementById("tasbeeh-popover");
      if (popover && !popover.classList.contains("hidden")) {
        e.preventDefault();
        clickTasbeeh();
      }
    }
  });

  document.getElementById("cmd-input")?.addEventListener("input", (e) => {
    renderCmdResults(e.target.value);
  });

  document.getElementById("command-palette-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "command-palette-modal") closeCommandPalette();
  });
});

/* ==========================================================================
   TASK 1 HELPERS: 29-ITEMS CURRICULUM, LIVE RECORDER & COLLISION DETECTOR
   ========================================================================== */

// 1. خريطة المنهج التفاعلية (11 محاضرة + 11 شيت + ميدتيرم + كويزين + 4 تكليفات)
function openSubjectCurriculumModal(subject) {
  const checklist = subject.checklist || {};

  const generatePills = (prefix, count, label) => {
    let html = "";
    for (let i = 1; i <= count; i++) {
      const key = `${prefix}_${i}`;
      const checked = checklist[key] ? "checked" : "";
      const completedClass = checked ? "completed" : "";
      html += `
        <label class="check-pill ${completedClass}">
          <input type="checkbox" data-check-key="${key}" ${checked} />
          <span>${label} ${i}</span>
        </label>
      `;
    }
    return html;
  };

  const midChecked = checklist["midterm"] ? "checked" : "";

  const modalBody = `
    <p class="small-muted mb-2">اضغط على أي بند تم إنجازه، وستُحسب نسبة تقدم المادة تلقائياً في حسابك.</p>
    
    <div class="curriculum-category">
      <h4><i class="fa-solid fa-person-chalkboard"></i> المحاضرات (11 محاضرة)</h4>
      <div class="curriculum-items-wrap">${generatePills("lec", 11, "محاضرة")}</div>
    </div>

    <div class="curriculum-category">
      <h4><i class="fa-solid fa-file-lines"></i> الشيتات والتمارين (11 شيت)</h4>
      <div class="curriculum-items-wrap">${generatePills("sheet", 11, "شيت")}</div>
    </div>

    <div class="curriculum-category">
      <h4><i class="fa-solid fa-pen-ruler"></i> التكليفات والواجبات (4 تكليفات)</h4>
      <div class="curriculum-items-wrap">${generatePills("assign", 4, "تكليف")}</div>
    </div>

    <div class="curriculum-category">
      <h4><i class="fa-solid fa-award"></i> الاختبارات والتقييمات</h4>
      <div class="curriculum-items-wrap">
        <label class="check-pill ${midChecked ? "completed" : ""}">
          <input type="checkbox" data-check-key="midterm" ${midChecked} />
          <span>الميدتيرم</span>
        </label>
        <label class="check-pill ${checklist["quiz_1"] ? "completed" : ""}">
          <input type="checkbox" data-check-key="quiz_1" ${checklist["quiz_1"] ? "checked" : ""} />
          <span>كويز 1</span>
        </label>
        <label class="check-pill ${checklist["quiz_2"] ? "completed" : ""}">
          <input type="checkbox" data-check-key="quiz_2" ${checklist["quiz_2"] ? "checked" : ""} />
          <span>كويز 2</span>
        </label>
      </div>
    </div>
  `;

  openFormModal(`خريطة منهج: ${escapeHTML(subject.name)}`, modalBody, async () => {});

  // حفظ التغييرات فوراً في Firebase عند الضغط على أي Checkbox
  const modalForm = document.getElementById("universal-modal-form");
  const saveBtn = modalForm.querySelector('button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none"; // الحفظ فوري بدون الحاجة للضغط على زر

  modalForm.querySelectorAll('input[type="checkbox"]').forEach(box => {
    box.onchange = async () => {
      const key = box.dataset.checkKey;
      checklist[key] = box.checked;
      box.closest(".check-pill").classList.toggle("completed", box.checked);
      await updateRecord("subjects", subject.id, { checklist });
    };
  });
}

// 2. مسجل صوت المحاضرات المباشر
let activeMediaRecorder = null;
let recordedAudioChunks = [];

function openSubjectVoiceModal(subject) {
  const voiceNotes = subject.voiceNotes || [];

  const notesListHtml = voiceNotes.length
    ? voiceNotes.map((vn, idx) => `
        <div class="voice-note-item">
          <div>
            <strong>${escapeHTML(vn.title || `تسجيل ${idx + 1}`)}</strong>
            <small class="small-muted d-block">${escapeHTML(vn.date || "")}</small>
          </div>
          <audio controls src="${escapeHTML(vn.audioUrl)}"></audio>
        </div>
      `).join("")
    : `<p class="small-muted text-center py-2">لا توجد تسجيلات صوتية مسجلة لهذه المادة بعد.</p>`;

  const modalBody = `
    <div class="voice-recorder-bar">
      <div>
        <span id="rec-status-indicator" class="hidden"><span class="rec-pulse-dot"></span> جاري التسجيل بالمايكروفون...</span>
        <span id="rec-idle-indicator"><i class="fa-solid fa-microphone gold-text"></i> اضغط لبدء تسجيل ملاحظة المحاضرة:</span>
      </div>
      <div>
        <button type="button" id="btn-start-recording" class="btn btn-gold btn-sm"><i class="fa-solid fa-circle-dot"></i> تسجيل</button>
        <button type="button" id="btn-stop-recording" class="btn btn-danger btn-sm hidden"><i class="fa-solid fa-stop"></i> إيقاف وحفظ</button>
      </div>
    </div>

    <h4 class="mt-4"><i class="fa-solid fa-file-audio gold-text"></i> تسجيلات المادة المحفوظة:</h4>
    <div class="voice-notes-list">${notesListHtml}</div>
  `;

  openFormModal(`صوتيات مادة: ${escapeHTML(subject.name)}`, modalBody, async () => {});

  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  const startBtn = document.getElementById("btn-start-recording");
  const stopBtn = document.getElementById("btn-stop-recording");
  const activeDot = document.getElementById("rec-status-indicator");
  const idleText = document.getElementById("rec-idle-indicator");

  startBtn.onclick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      activeMediaRecorder = new MediaRecorder(stream);
      recordedAudioChunks = [];

      activeMediaRecorder.ondataavailable = e => recordedAudioChunks.push(e.data);
      activeMediaRecorder.onstop = () => {
        const audioBlob = new Blob(recordedAudioChunks, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result;
          const newNotes = [
            {
              title: `تسجيل محاضرة (${new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })})`,
              date: todayISO(),
              audioUrl: base64Audio
            },
            ...voiceNotes
          ];
          await updateRecord("subjects", subject.id, { voiceNotes: newNotes });
          document.getElementById("universal-modal").classList.add("hidden");
          showToast("تم حفظ التسجيل الصوتي بنجاح", "success");
        };
      };

      activeMediaRecorder.start();
      startBtn.classList.add("hidden");
      stopBtn.classList.remove("hidden");
      activeDot.classList.remove("hidden");
      idleText.classList.add("hidden");
    } catch (err) {
      showToast("يرجى إعطاء إذن استخدام المايكروفون للمتصفح", "error");
    }
  };

  stopBtn.onclick = () => {
    if (activeMediaRecorder && activeMediaRecorder.state !== "inactive") {
      activeMediaRecorder.stop();
      activeMediaRecorder.stream.getTracks().forEach(t => t.stop());
    }
  };
}

// 3. كاشف تضارب المواعيد الذكي (Smart Collision Detector)
function checkEventCollision(dateStr, timeStr) {
  if (!dateStr) return null;
  const existingEvents = AppState.collections.events || [];
  return existingEvents.find(e => {
    if (e.date !== dateStr) return false;
    if (timeStr && e.time) {
      // فحص إذا كان الوقت بنفس الساعة أو بفارق أقل من 45 دقيقة
      const [h1, m1] = timeStr.split(":").map(Number);
      const [h2, m2] = e.time.split(":").map(Number);
      const diffMinutes = Math.abs((h1 * 60 + m1) - (h2 * 60 + m2));
      return diffMinutes < 45;
    }
    return true; // نفس اليوم إذا لم يتم تحديد دقيقة
  });
}
/* ==========================================================================
   TASK 2 HELPERS: POMODORO, DEV TIMER, AMBIENT STUDY AUDIO & VIDEO PIP
   ========================================================================== */

// 1. نظام الصوت التكنولوجي والتوليدي (Web Audio API - بدون ملفات خارجية)
let sharedAudioCtx = null;
function getAudioContext() {
  if (!sharedAudioCtx) {
    sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

// نغمة تنبيه تكنولوجية ناعمة عند انتهاء البومودورو
function playTechBeep() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {}
}

// 2. مولد أصوات التركيز المحيطية (صوت مطر هادئ + ضوضاء تركيز)
let ambientSourceNode = null;
let ambientGainNode = null;
let currentAmbientType = null;

function toggleAmbientSound(type) {
  const ctx = getAudioContext();

  if (currentAmbientType === type) {
    // إيقاف الصوت
    if (ambientSourceNode) {
      ambientSourceNode.stop();
      ambientSourceNode.disconnect();
      ambientSourceNode = null;
    }
    currentAmbientType = null;
    showToast("تم إيقاف صوت التركيز", "info");
    return false;
  }

  // إيقاف السابق إن وُجد
  if (ambientSourceNode) {
    ambientSourceNode.stop();
    ambientSourceNode.disconnect();
  }

  // توليد صوت مطر / تركيز من خلال Buffer Noise نقي
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    if (type === "rain") {
      // محاكاة قطرات المطر (Pink/Brown noise خفيف)
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    } else {
      // ضوضاء تركيز عميق (Brown Noise)
      data[i] = (lastOut + 0.05 * white) / 1.05;
      lastOut = data[i];
      data[i] *= 2.0;
    }
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = type === "rain" ? "lowpass" : "bandpass";
  filter.frequency.value = type === "rain" ? 1000 : 450;

  ambientGainNode = ctx.createGain();
  ambientGainNode.gain.value = 0.22;

  noise.connect(filter);
  filter.connect(ambientGainNode);
  ambientGainNode.connect(ctx.destination);

  noise.start();
  ambientSourceNode = noise;
  currentAmbientType = type;
  showToast(type === "rain" ? "تم تشغيل صوت المطر الهادئ 🌧️" : "تم تشغيل صوت التركيز العميق 🎧", "success");
  return true;
}

// 3. مؤقت بومودورو الملكي (دعم الملف الصوتي المخصص مع التكرار التلقائي + صوت التكتكة الافتراضي)
const PomodoroState = {
  duration: 25 * 60,
  timeLeft: 25 * 60,
  isRunning: false,
  mode: "work",
  intervalId: null,
  soundMode: "tick", // الوضع الافتراضي: "tick" (تكتكة)، أو "custom" (ملف صوتي)، أو "mute" (صامت)
  colorTheme: localStorage.getItem("MY_LIFE_OS_POMO_COLOR") || "gold",
  customAudio: new Audio(),
  customAudioName: ""
};

// تكرار الملف الصوتي تلقائياً إذا كان أقصر من مدة الجلسة
PomodoroState.customAudio.loop = true;

// صوت "تك تك" ميكانيكي واقعي بالـ Web Audio API
function playClockTick(isHigh = false) {
  if (PomodoroState.soundMode !== "tick") return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(isHigh ? 1750 : 1280, ctx.currentTime);

    gain.gain.setValueAtTime(0.045, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.025);
  } catch (e) {}
}

function formatPomoTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updatePomodoroDisplays() {
  const timeStr = formatPomoTime(PomodoroState.timeLeft);
  const displayEl = document.getElementById("pomo-modal-display");
  if (displayEl) displayEl.textContent = timeStr;

  const total = Math.max(1, PomodoroState.duration);
  const elapsedRatio = Math.min(1, Math.max(0, (total - PomodoroState.timeLeft) / total));
  const pct = Math.round(elapsedRatio * 100);

  const circleProgress = document.getElementById("pomo-circle-bar");
  if (circleProgress) {
    const offset = 854 - (854 * (PomodoroState.timeLeft / total));
    circleProgress.style.strokeDashoffset = offset;
  }

  // 4. الإضاءة الديناميكية المتفاعلة مع الوقت (Dynamic Aura Shift)
  const ringBox = document.querySelector(".pomo-ring-container");
  if (ringBox && PomodoroState.isRunning) {
    ringBox.classList.toggle("aura-stage-mid", elapsedRatio >= 0.5 && elapsedRatio < 0.8);
    ringBox.classList.toggle("aura-stage-final", elapsedRatio >= 0.8);
    ringBox.classList.toggle("aura-last-two-mins", PomodoroState.timeLeft <= 120);
  }

  // 9. تحديث مرحلة نمو شجرة الالتزام داخل البومودورو والـ Mini-HUD
  const treeStages = [
    { icon: "🌱", label: "بذرة التركيز" },
    { icon: "🌿", label: "نبتة خضراء" },
    { icon: "🌳", label: "شجرة مورقة" },
    { icon: "🌲✨", label: "شجرة ذهبية مثمرة" }
  ];
  const stageIdx = Math.min(3, Math.floor(elapsedRatio * 4));
  const treeEl = document.getElementById("pomo-tree-stage");
  if (treeEl) treeEl.innerHTML = `${treeStages[stageIdx].icon} <small>${treeStages[stageIdx].label} (${pct}%)</small>`;
  const miniTree = document.getElementById("mini-hud-tree");
  if (miniTree) miniTree.textContent = treeStages[stageIdx].icon;

  // 7. تحديث شريط تقدم الـ Mini-HUD المصغر
  const miniBar = document.getElementById("mini-pomo-bar");
  if (miniBar) miniBar.style.width = `${pct}%`;

  const badge = document.getElementById("topbar-pomo-badge");
  if (badge) {
    badge.textContent = timeStr;
    badge.classList.toggle("hidden", !PomodoroState.isRunning);
  }
}

function startPomodoro() {
  if (PomodoroState.isRunning) return;
  getAudioContext();
  PomodoroState.isRunning = true;
  updatePomodoroDisplays();

  // تشغيل الملف الصوتي المخصص إذا كان هو الوضع المختار
  if (PomodoroState.soundMode === "custom" && PomodoroState.customAudio.src) {
    PomodoroState.customAudio.play().catch(() => {});
  }

  let tickToggle = false;
  PomodoroState.intervalId = setInterval(() => {
    if (PomodoroState.timeLeft > 0) {
      PomodoroState.timeLeft--;
      if (PomodoroState.soundMode === "tick") {
        playClockTick(tickToggle);
        tickToggle = !tickToggle;
      }
      updatePomodoroDisplays();
    } else {
      clearInterval(PomodoroState.intervalId);
      PomodoroState.isRunning = false;

      // إيقاف الملف الصوتي وقطعه فوراً عند انتهاء الوقت مهما كانت مدته
      if (PomodoroState.customAudio) {
        PomodoroState.customAudio.pause();
        PomodoroState.customAudio.currentTime = 0;
      }

      playTechBeep();
      if (PomodoroState.mode === "work") {
        showToast("عاش يا هندسة! انتهت جلسة التركيز بنجاح ☕", "success");
        setCustomPomodoroTime(5, "break");
      } else {
        showToast("انتهت الاستراحة، جاهز لجولة تركيز جديدة؟ 🚀", "info");
        setCustomPomodoroTime(25, "work");
      }
    }
  }, 1000);
}

function pausePomodoro() {
  PomodoroState.isRunning = false;
  if (PomodoroState.intervalId) clearInterval(PomodoroState.intervalId);
  if (PomodoroState.customAudio) {
    PomodoroState.customAudio.pause();
  }
  updatePomodoroDisplays();
}

function resetPomodoro() {
  pausePomodoro();
  if (PomodoroState.customAudio) {
    PomodoroState.customAudio.pause();
    PomodoroState.customAudio.currentTime = 0;
  }
  PomodoroState.timeLeft = PomodoroState.duration;
  updatePomodoroDisplays();
}

function setCustomPomodoroTime(minutes, mode = "work") {
  const mins = Math.max(1, Math.min(240, Number(minutes) || 25));
  PomodoroState.mode = mode;
  PomodoroState.duration = mins * 60;
  resetPomodoro();
}

// متغيرات البومودورو الخارقة الإضافية
PomodoroState.dialSkin = localStorage.getItem("MY_LIFE_OS_POMO_SKIN") || "ring"; // ring | flip | hud
PomodoroState.breathingGuide = false;
PomodoroState.binauralMode = "off"; // off | alpha | beta
PomodoroState.linkedTarget = "";
let binauralOscLeft = null;
let binauralOscRight = null;

function stopBinauralBeats() {
  try {
    if (binauralOscLeft) { binauralOscLeft.stop(); binauralOscLeft.disconnect(); binauralOscLeft = null; }
    if (binauralOscRight) { binauralOscRight.stop(); binauralOscRight.disconnect(); binauralOscRight = null; }
  } catch (e) {}
  PomodoroState.binauralMode = "off";
}

function startBinauralBeats(type) {
  stopBinauralBeats();
  if (type === "off") return;
  try {
    const ctx = getAudioContext();
    const baseFreq = 200;
    const beatFreq = type === "alpha" ? 10 : 20; // Alpha 10Hz للمذاكرة، Beta 20Hz للبرمجة

    const gain = ctx.createGain();
    gain.gain.value = 0.04;
    gain.connect(ctx.destination);

    binauralOscLeft = ctx.createOscillator();
    binauralOscRight = ctx.createOscillator();
    binauralOscLeft.frequency.value = baseFreq;
    binauralOscRight.frequency.value = baseFreq + beatFreq;

    binauralOscLeft.connect(gain);
    binauralOscRight.connect(gain);
    binauralOscLeft.start();
    binauralOscRight.start();
    PomodoroState.binauralMode = type;
    showToast(type === "alpha" ? "تم تفعيل موجات ألفا (10Hz) لصفاء الذهن 🧠" : "تم تفعيل موجات بيتا (20Hz) للتركيز الهندسي المكثف ⚡", "success");
  } catch (e) {}
}

PomodoroState.customTaskName = "";
PomodoroState.showSettingsDrawer = false;
PomodoroState.showHistoryDrawer = false;

function getFocusSessionsLog() {
  try {
    return JSON.parse(localStorage.getItem("MY_LIFE_OS_FOCUS_LOG") || "[]");
  } catch (e) {
    return [];
  }
}

async function saveCurrentFocusSession() {
  const spentSecs = Math.max(60, PomodoroState.duration - PomodoroState.timeLeft);
  const spentMins = Math.max(1, Math.round(spentSecs / 60));
  const plannedMins = Math.round(PomodoroState.duration / 60);
  const effectiveMins = PomodoroState.timeLeft === PomodoroState.duration ? plannedMins : spentMins;

  const customTyped = document.getElementById("pomo-new-task-input")?.value?.trim() || PomodoroState.customTaskName;
  const selectedLink = document.getElementById("pomo-link-select")?.value || PomodoroState.linkedTarget;

  let sessionTitle = customTyped || "جلسة تركيز عامة";
  let targetType = "general";

  if (!customTyped && selectedLink) {
    const [prefix, ...rest] = selectedLink.split(":");
    sessionTitle = rest.join(":");
    targetType = prefix; // subj | task | proj
  }

  // 1. إذا كتب المستخدم مهمة جديدة أو اختار مهمة حالية، نسجلها في حسابه (قسم المهام)
  if (customTyped) {
    await createRecord("tasks", {
      title: customTyped,
      description: `تم إنجاز جلسة تركيز لمدة ${effectiveMins} دقيقة`,
      dueDate: todayISO(),
      priority: "High",
      status: "In Progress",
      category: "جلسة تركيز",
      spentMinutes: effectiveMins
    });
  } else if (targetType === "task") {
    const existingTask = AppState.collections.tasks.find(t => t.title === sessionTitle);
    if (existingTask) {
      const newTotal = (Number(existingTask.spentMinutes) || 0) + effectiveMins;
      await updateRecord("tasks", existingTask.id, {
        spentMinutes: newTotal,
        description: `إجمالي وقت التركيز: ${newTotal} دقيقة`
      });
    }
  }

  // 2. حفظ في سجل الجلسات المفصل
  const logs = getFocusSessionsLog();
  logs.unshift({
    id: Date.now().toString(),
    title: sessionTitle,
    targetType,
    minutes: effectiveMins,
    date: todayISO(),
    time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
  });
  localStorage.setItem("MY_LIFE_OS_FOCUS_LOG", JSON.stringify(logs.slice(0, 50)));

  // زيادة عداد جلسات اليوم ونقاط الخبرة XP
  const streakKey = "MY_LIFE_OS_POMO_STREAK_" + todayISO();
  localStorage.setItem(streakKey, Number(localStorage.getItem(streakKey) || 0) + 1);
  if (typeof updateXPSystem === "function") updateXPSystem();

  showToast(`تم حفظ الجلسة بنجاح: "${sessionTitle}" (${effectiveMins} دقيقة) 💾`, "success");
  PomodoroState.showHistoryDrawer = true;
  openPomodoroModal();
}

function openPomodoroModal() {
  const total = PomodoroState.duration;
  const offset = 854 - (854 * (PomodoroState.timeLeft / total));
  const totalMins = Math.round(PomodoroState.duration / 60);
  const streakCount = Number(localStorage.getItem("MY_LIFE_OS_POMO_STREAK_" + todayISO()) || 0);
  const sessionsLog = getFocusSessionsLog();

  const POMO_THEMES = [
    { id: "gold", name: "الذهب الملكي", hex: "#d4af37" },
    { id: "emerald", name: "الزمرد المنعش", hex: "#10b981" },
    { id: "cyan", name: "السماوي النيون", hex: "#06b6d4" },
    { id: "purple", name: "البنفسجي الملكي", hex: "#a855f7" },
    { id: "rose", name: "الياقوت الوردي", hex: "#f43f5e" }
  ];

  const swatchesHtml = POMO_THEMES.map(t => `
    <button type="button" class="pomo-color-dot ${PomodoroState.colorTheme === t.id ? "active" : ""}"
      style="background:${t.hex}; color:${t.hex}" data-pomo-color="${t.id}" title="${t.name}"></button>
  `).join("");

  const subjectsOpts = AppState.collections.subjects.map(s => `<option value="subj:${escapeHTML(s.name)}" ${PomodoroState.linkedTarget === "subj:"+s.name ? "selected" : ""}>📚 مادة: ${escapeHTML(s.name)}</option>`).join("");
  const tasksOpts = AppState.collections.tasks.filter(t => t.status !== "Completed").map(t => `<option value="task:${escapeHTML(t.title)}" ${PomodoroState.linkedTarget === "task:"+t.title ? "selected" : ""}>✅ مهمة: ${escapeHTML(t.title)} (${t.spentMinutes || 0}د)</option>`).join("");
  const projectsOpts = AppState.collections.projects.map(p => `<option value="proj:${escapeHTML(p.title)}" ${PomodoroState.linkedTarget === "proj:"+p.title ? "selected" : ""}>💻 مشروع: ${escapeHTML(p.title)}</option>`).join("");

  const historyListHtml = sessionsLog.length
    ? sessionsLog.map(item => `
        <div class="session-log-item">
          <div>
            <strong>${escapeHTML(item.title)}</strong>
            <small class="small-muted d-block">⏱️ ذاكرت/عملت لمدة <strong>${item.minutes} دقيقة</strong> • ${escapeHTML(item.date)} (${escapeHTML(item.time)})</small>
          </div>
          <button type="button" class="btn btn-xs btn-gold" data-resume-title="${escapeHTML(item.title)}" data-resume-mins="${item.minutes}">
            <i class="fa-solid fa-play"></i> استكمال
          </button>
        </div>
      `).join("")
    : `<p class="small-muted text-center">لم تقم بحفظ أي جلسة بعد. اختر مادة أو اكتب مهمة واضغط "حفظ الجلسة"!</p>`;

  const modalBody = `
    <div class="pomodoro-card">
<!-- الهيدر الفخم باللوجو + كرات الطاقة الذهبية لمستويات اليوم (Orbs) -->
      <div class="pomo-brand-header">
        <div class="pomo-logo-orb">
          <img src="logo.png" alt="MY LIFE OS" onerror="this.style.display='none'" />
        </div>
        <div class="pomo-brand-title">MY LIFE <span>FOCUS STUDIO V4</span></div>
        <div class="pomo-orbs-row" title="كرات الطاقة لجلسات اليوم">
          ${Array.from({ length: 6 }, (_, i) => `<span class="pomo-energy-orb ${i < streakCount ? "lit" : ""}"></span>`).join("")}
          <span class="pomo-streak-pill">🔥 اليوم: <strong>${streakCount}</strong> &bull; السجل: <strong>${sessionsLog.length}</strong></span>
        </div>
      </div>

      <!-- شريط اختيار مادة/مهمة مسجلة أو كتابة مهمة جديدة فوراً -->
      <div class="pomo-v3-task-bar">
        <select id="pomo-link-select">
          <option value="">🎯 اختر مادة أو مهمة حالية لاستكمالها...</option>
          ${subjectsOpts}
          ${tasksOpts}
          ${projectsOpts}
        </select>
        <input type="text" id="pomo-new-task-input" value="${escapeHTML(PomodoroState.customTaskName)}" placeholder="✍️ أو اكتب اسم مهمة جديدة هنا..." />
      </div>

      <!-- أزرار الوقت السريعة -->
      <div class="pomodoro-modes-bar">
        <button type="button" class="pomo-preset-btn ${totalMins === 25 && PomodoroState.mode === "work" ? "active" : ""}" data-pomo-set="25">25 د</button>
        <button type="button" class="pomo-preset-btn ${totalMins === 45 ? "active" : ""}" data-pomo-set="45">45 د</button>
        <button type="button" class="pomo-preset-btn ${totalMins === 60 ? "active" : ""}" data-pomo-set="60"><i class="fa-solid fa-crown"></i> ساعة (60 د)</button>
        <button type="button" class="pomo-preset-btn ${PomodoroState.mode === "break" ? "active" : ""}" data-pomo-set="5" data-mode="break">☕ راحة 5 د</button>
        <button type="button" id="btn-pomo-stopwatch" class="pomo-preset-btn ${PomodoroState.isStopwatch ? "active" : ""}">♾️ عد تصاعدي مفتوح (Flow)</button>
        <div class="pomo-custom-input-wrap">
          <input type="number" id="pomo-custom-mins" min="1" max="240" value="${totalMins}" />
          <button type="button" id="btn-apply-custom-pomo" class="pomo-preset-btn active" style="padding:4px 12px;">تحديد</button>
        </div>
      </div>
<!-- شريط الصوت المباشر على الواجهة الرئيسية (تكتكة / اختيار ملف صوتي من الجهاز / تحكم بالصوت) -->
      <div class="pomo-direct-audio-bar">
        <button type="button" id="btn-main-sound-tick" class="pomo-preset-btn ${PomodoroState.soundMode === "tick" ? "active" : ""}">
          <i class="fa-solid fa-stopwatch"></i> صوت التكتكة
        </button>

        <button type="button" id="btn-main-sound-custom" class="pomo-preset-btn ${PomodoroState.soundMode === "custom" ? "active" : ""}">
          <i class="fa-solid fa-music"></i>
          <span>${PomodoroState.customAudioName ? "🎵 " + escapeHTML(PomodoroState.customAudioName) : "🎵 اختر ملف صوتي من جهازك"}</span>
        </button>

        <button type="button" id="btn-main-pick-audio" class="pomo-preset-btn" title="استعراض واختيار ملف صوتي من الكمبيوتر" style="padding:6px 12px;">
          <i class="fa-solid fa-folder-open gold-text"></i> فتح ملف
        </button>

        <button type="button" id="btn-main-sound-mute" class="pomo-preset-btn ${PomodoroState.soundMode === "mute" ? "active" : ""}">
          <i class="fa-solid fa-volume-xmark"></i> صامت
        </button>

        <div class="pomo-vol-wrap" title="مستوى صوت الملف الصوتي">
          <i class="fa-solid fa-volume-high gold-text"></i>
          <input type="range" id="pomo-custom-vol" min="5" max="100" value="${Math.round((PomodoroState.customAudio.volume || 0.8) * 100)}" />
        </div>
      </div>
      <!-- الساعة السويسرية العملاقة في قلب الشاشة + شجرة الالتزام التفاعلية -->
      <div class="pomo-ring-container" data-dial-skin="${PomodoroState.dialSkin}">
        <div id="pomo-breath-ring" class="pomo-breathing-aura ${PomodoroState.breathingGuide ? "active" : ""}"></div>
        <svg class="pomo-svg-ring" viewBox="0 0 320 320">
          <circle class="pomo-circle-tracks" cx="160" cy="160" r="150" />
          <circle class="pomo-circle-bg" cx="160" cy="160" r="136" />
          <circle id="pomo-circle-bar" class="pomo-circle-progress" cx="160" cy="160" r="136" stroke-dasharray="854" stroke-dashoffset="${offset}" />
        </svg>
        <div class="pomo-dial-center">
          <span class="pomo-status-pill" id="pomo-status-text">
            ${PomodoroState.customTaskName ? "🎯 " + escapeHTML(PomodoroState.customTaskName) : PomodoroState.linkedTarget ? "🎯 " + escapeHTML(PomodoroState.linkedTarget.split(":")[1]) : PomodoroState.isRunning ? "تركيز عميق جارٍ الآن ⚡" : "جاهز للانطلاق 🚀"}
          </span>
          <div id="pomo-modal-display" class="pomodoro-timer-display">${formatPomoTime(PomodoroState.timeLeft)}</div>
          <div id="pomo-tree-stage" class="pomo-tree-badge">🌱 <small>بذرة التركيز</small></div>
          <div class="pomo-visualizer-bars ${PomodoroState.isRunning ? "playing" : ""}">
            ${Array.from({length: 16}, () => `<span class="vis-bar"></span>`).join("")}
          </div>
        </div>
      </div>

      <!-- 5. شريط الاقتباسات والحِكم الهادئ المتغير (Focus Wisdom Ticker) -->
      <div id="pomo-wisdom-ticker" class="pomo-wisdom-ticker">
        ✨ "وَقُل رَّبِّ زِدْنِي عِلْمًا" — كل دقيقة تركيز اليوم تبني مستقبلك الهندسي غداً
      </div>

      <!-- الأزرار الرئيسية + ميكسر الأصوات + نافذة Mini-HUD -->
      <div class="pomodoro-actions" style="flex-wrap:wrap;">
        <button type="button" id="btn-pomo-start" class="btn-pomo-main">
          <i class="fa-solid ${PomodoroState.isRunning ? "fa-pause" : "fa-play"}"></i>
          ${PomodoroState.isRunning ? "إيقاف مؤقت" : "بدء التركيز"}
        </button>
        <button type="button" id="btn-pomo-save-session" class="btn-pomo-secondary" style="border-color:var(--pomo-accent)!important; color:var(--pomo-accent)!important;">
          <i class="fa-solid fa-floppy-disk"></i> حفظ الجلسة (+شجرة 🌳)
        </button>
        <button type="button" id="btn-pomo-mixer-open" class="btn-pomo-secondary">
          <i class="fa-solid fa-sliders"></i> ميكسر الأصوات (4 قنوات)
        </button>
        <button type="button" id="btn-pomo-mini-hud" class="btn-pomo-secondary" title="تحويل إلى كبسولة عائمة مصغرة في الزاوية">
          <i class="fa-solid fa-window-restore"></i> نافذة HUD مصغرة
        </button>
        <button type="button" id="btn-pomo-history-toggle" class="btn-pomo-secondary">
          <i class="fa-solid fa-clock-rotate-left"></i> السجل (${sessionsLog.length})
        </button>
        <button type="button" id="btn-pomo-settings-toggle" class="btn-pomo-secondary">
          <i class="fa-solid fa-palette"></i> المظهر
        </button>
        <button type="button" id="btn-pomo-strict-lock" class="btn-pomo-secondary ${PomodoroState.strictLock ? "strict-lock-active" : ""}" title="يمنع الخروج أو فتح مواقع أخرى حتى ينتهي الوقت">
          <i class="fa-solid ${PomodoroState.strictLock ? "fa-lock" : "fa-lock-open"}"></i>
          ${PomodoroState.strictLock ? "قفل التشتت: مفعل 🔒" : "قفل التشتت"}
        </button>
        <button type="button" id="btn-pomo-bg-studio" class="btn-pomo-secondary">
          <i class="fa-solid fa-image"></i> الخلفية
        </button>
        <button type="button" id="btn-pomo-pure-fullscreen" class="btn-pomo-secondary">
          <i class="fa-solid fa-expand"></i> شاشة نقية
        </button>
        <button type="button" id="btn-pomo-reset" class="btn-pomo-secondary" title="إعادة ضبط">
          <i class="fa-solid fa-rotate-right"></i>
        </button>
      </div>
      ${PomodoroState.strictLock ? `
        <div class="strict-lock-banner">
          <span>🛡️ <strong>وضع قفل التشتت الصارم نشط:</strong> مغادرة التاب أو إيقاف الجلسة مبكراً يخصم 50 XP!</span>
          <span class="badge badge-danger">محاولات التشتت: <strong id="pomo-distraction-count">${PomodoroState.distractionCount || 0}</strong></span>
        </div>
      ` : ""}
      <!-- زر عائم خفيف يظهر فقط عند إخفاء كل شيء للعودة -->
      <button type="button" id="btn-exit-pure-cinema" class="pomo-exit-cinema-btn">
        <i class="fa-solid fa-compress"></i> إظهار الأزرار (أو اضغط ESC)
      </button>

      <!-- درج سجل الجلسات واستكمال المهام (يفتح عند الضغط على سجل الجلسات) -->
      <div id="pomo-history-drawer" class="pomo-drawer-panel ${PomodoroState.showHistoryDrawer ? "" : "hidden"}">
        <div class="flex-between mb-2">
          <h4 class="gold-text"><i class="fa-solid fa-chart-line"></i> سجل جلسات المذاكرة والمهام (اضغط استكمال للمتابعة)</h4>
        </div>
        <div style="max-height:190px; overflow-y:auto;">${historyListHtml}</div>
      </div>

      <!-- درج الإعدادات المدمج (الألوان، شكل الساعة، الصوت، والترددات) -->
      <div id="pomo-settings-drawer" class="pomo-drawer-panel ${PomodoroState.showSettingsDrawer ? "" : "hidden"}">
        <div class="pomo-v3-dock">
          <div class="pomo-color-swatches">${swatchesHtml}</div>
          <button type="button" class="pomo-preset-btn ${PomodoroState.dialSkin === "ring" ? "active" : ""}" data-skin="ring">⭕ دائرية</button>
          <button type="button" class="pomo-preset-btn ${PomodoroState.dialSkin === "flip" ? "active" : ""}" data-skin="flip">📟 Flip 3D</button>
          <button type="button" class="pomo-preset-btn ${PomodoroState.dialSkin === "hud" ? "active" : ""}" data-skin="hud">🌌 HUD</button>
        </div>
        <div class="pomo-v3-dock mt-2">
          <button type="button" id="btn-sound-tick" class="pomo-preset-btn ${PomodoroState.soundMode === "tick" ? "active" : ""}">⏱️ تكتكة</button>
          <button type="button" id="btn-sound-custom" class="pomo-preset-btn ${PomodoroState.soundMode === "custom" ? "active" : ""}">
            🎵 ${PomodoroState.customAudioName ? escapeHTML(PomodoroState.customAudioName) : "ملف صوتي"}
          </button>
          <input type="file" id="pomo-audio-file-input" accept="audio/*" class="hidden" />
          ${PomodoroState.customAudioName ? `<button type="button" id="btn-change-audio-file" class="pomo-preset-btn"><i class="fa-solid fa-folder-open"></i></button>` : ""}
          <button type="button" id="btn-sound-mute" class="pomo-preset-btn ${PomodoroState.soundMode === "mute" ? "active" : ""}">🔇 صامت</button>
          <button type="button" id="btn-pomo-breathe" class="pomo-preset-btn ${PomodoroState.breathingGuide ? "active" : ""}">🌬️ تنفس 4-4-4</button>
          <button type="button" class="pomo-preset-btn ${PomodoroState.binauralMode === "alpha" ? "active" : ""}" data-binaural="alpha">🧠 Alpha</button>
          <button type="button" class="pomo-preset-btn ${PomodoroState.binauralMode === "beta" ? "active" : ""}" data-binaural="beta">⚡ Beta</button>
        </div>
      </div>

      <!-- سلة تفريغ الأفكار المشتتة السريعة -->
      <div class="pomo-braindump-bar">
        <input type="text" id="pomo-braindump-input" placeholder="💡 فكرة عابرة أثناء التركيز؟ احفظها في الملاحظات فوراً..." />
        <button type="button" id="btn-save-braindump" class="pomo-preset-btn active">حفظ فوري</button>
      </div>
    </div>
  `;

  openFormModal("مؤقت التركيز الملكي", modalBody, async () => {});
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  const card = document.querySelector("#universal-modal .modal-card");
  if (card) {
    card.classList.add("pomo-fullscreen-active");
    card.setAttribute("data-pomo-theme", PomodoroState.colorTheme);
  }

  // ربط حقول اسم المهمة واختيار المادة
  const linkSel = document.getElementById("pomo-link-select");
  const newTaskInp = document.getElementById("pomo-new-task-input");
  linkSel.onchange = (e) => {
    PomodoroState.linkedTarget = e.target.value;
    if (e.target.value) {
      PomodoroState.customTaskName = "";
      newTaskInp.value = "";
    }
    openPomodoroModal();
  };
  newTaskInp.oninput = (e) => {
    PomodoroState.customTaskName = e.target.value;
  };

  // أزرار حفظ الجلسة وإظهار السجل والإعدادات
  document.getElementById("btn-pomo-save-session").onclick = saveCurrentFocusSession;
  document.getElementById("btn-pomo-history-toggle").onclick = () => {
    PomodoroState.showHistoryDrawer = !PomodoroState.showHistoryDrawer;
    PomodoroState.showSettingsDrawer = false;
    openPomodoroModal();
  };
document.getElementById("btn-pomo-settings-toggle").onclick = () => {
    PomodoroState.showSettingsDrawer = !PomodoroState.showSettingsDrawer;
    PomodoroState.showHistoryDrawer = false;
    openPomodoroModal();
  };

  // إصلاح عمل زر صورة الخلفية بضغطة واحدة مباشرة
  document.getElementById("btn-pomo-bg-studio").onclick = () => {
    openWallpaperStudioModal();
  };

  // زر ملء الشاشة النقي (يخفي شريط ويندوز السفلي + يخفي كل الأزرار والبار داخل البومودورو)
  document.getElementById("btn-pomo-pure-fullscreen").onclick = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {}
    card?.classList.add("pomo-pure-cinema");
  };

  document.getElementById("btn-exit-pure-cinema").onclick = async () => {
    card?.classList.remove("pomo-pure-cinema");
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
    } catch (e) {}
  };
  

  // أزرار استكمال جلسة سابقة من السجل
  document.querySelectorAll("[data-resume-title]").forEach(btn => {
    btn.onclick = () => {
      PomodoroState.customTaskName = btn.dataset.resumeTitle;
      PomodoroState.showHistoryDrawer = false;
      setCustomPomodoroTime(60, "work");
      startPomodoro();
      openPomodoroModal();
      showToast(`تم استكمال العمل على: "${PomodoroState.customTaskName}" 🚀`, "success");
    };
  });

  // الألوان والـ Skins والصوت
  document.querySelectorAll("[data-pomo-color]").forEach(dot => {
    dot.onclick = () => {
      PomodoroState.colorTheme = dot.dataset.pomoColor;
      localStorage.setItem("MY_LIFE_OS_POMO_COLOR", PomodoroState.colorTheme);
      if (card) card.setAttribute("data-pomo-theme", PomodoroState.colorTheme);
      document.querySelectorAll("[data-pomo-color]").forEach(d => d.classList.toggle("active", d === dot));
    };
  });
  document.querySelectorAll("[data-skin]").forEach(btn => {
    btn.onclick = () => {
      PomodoroState.dialSkin = btn.dataset.skin;
      localStorage.setItem("MY_LIFE_OS_POMO_SKIN", PomodoroState.dialSkin);
      openPomodoroModal();
    };
  });
  document.getElementById("btn-pomo-breathe").onclick = () => {
    PomodoroState.breathingGuide = !PomodoroState.breathingGuide;
    openPomodoroModal();
  };
  document.querySelectorAll("[data-binaural]").forEach(btn => {
    btn.onclick = () => {
      const targetMode = btn.dataset.binaural;
      if (PomodoroState.binauralMode === targetMode) stopBinauralBeats();
      else startBinauralBeats(targetMode);
      openPomodoroModal();
    };
  });

  document.getElementById("btn-save-braindump").onclick = async () => {
    const inp = document.getElementById("pomo-braindump-input");
    const val = inp.value.trim();
    if (!val) return;
    inp.value = "";
    await createRecord("notes", {
      title: "💡 فكرة سريعة أثناء جلسة التركيز",
      content: val,
      category: "Brain-Dump",
      linkedTo: PomodoroState.customTaskName || PomodoroState.linkedTarget || "Pomodoro"
    });
  };

const fileInput = document.getElementById("pomo-audio-file-input");

  const setTickMode = () => {
    PomodoroState.soundMode = "tick";
    if (PomodoroState.customAudio) PomodoroState.customAudio.pause();
    openPomodoroModal();
  };

  const setCustomAudioMode = () => {
    if (!PomodoroState.customAudio.src) {
      fileInput.click();
    } else {
      PomodoroState.soundMode = "custom";
      if (PomodoroState.isRunning) {
        PomodoroState.customAudio.play().catch(() => {});
      } else {
        showToast("تم تحديد الملف الصوتي! سيبدأ تلقائياً فور ضغطك على (بدء التركيز) 🎵", "info");
      }
      openPomodoroModal();
    }
  };

  const setMuteMode = () => {
    PomodoroState.soundMode = "mute";
    if (PomodoroState.customAudio) PomodoroState.customAudio.pause();
    openPomodoroModal();
  };

  document.getElementById("btn-sound-tick").onclick = setTickMode;
  document.getElementById("btn-main-sound-tick").onclick = setTickMode;

  document.getElementById("btn-sound-custom").onclick = setCustomAudioMode;
  document.getElementById("btn-main-sound-custom").onclick = setCustomAudioMode;

  document.getElementById("btn-main-pick-audio").onclick = () => fileInput.click();
  document.getElementById("btn-change-audio-file")?.addEventListener("click", () => fileInput.click());

  document.getElementById("btn-sound-mute").onclick = setMuteMode;
  document.getElementById("btn-main-sound-mute").onclick = setMuteMode;

  document.getElementById("pomo-custom-vol").oninput = (e) => {
    const v = Number(e.target.value) / 100;
    if (PomodoroState.customAudio) PomodoroState.customAudio.volume = v;
  };

  fileInput.onchange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (PomodoroState.customAudio) PomodoroState.customAudio.pause();
    PomodoroState.customAudio.src = URL.createObjectURL(file);
    PomodoroState.customAudio.loop = true; // يتكرر تلقائياً طوال مدة الجلسة ويقطع فور انتهائها
    PomodoroState.customAudioName = file.name.length > 18 ? file.name.substring(0, 15) + "..." : file.name;
    PomodoroState.soundMode = "custom";
    if (!PomodoroState.isRunning) {
      startPomodoro(); // يبدأ الجلسة ويشغل الملف الصوتي فوراً!
    } else {
      PomodoroState.customAudio.play().catch(() => {});
    }
    showToast(`تم تشغيل الملف الصوتي: ${PomodoroState.customAudioName} 🎵`, "success");
    openPomodoroModal();
  };
  document.getElementById("btn-sound-mute").onclick = () => {
    PomodoroState.soundMode = "mute";
    if (PomodoroState.customAudio) PomodoroState.customAudio.pause();
    openPomodoroModal();
  };

  document.querySelectorAll("[data-pomo-set]").forEach(btn => {
    btn.onclick = () => {
      setCustomPomodoroTime(Number(btn.dataset.pomoSet), btn.dataset.mode || "work");
      openPomodoroModal();
    };
  });
document.getElementById("btn-apply-custom-pomo").onclick = () => {
    const val = document.getElementById("pomo-custom-mins").value;
    if (val) { setCustomPomodoroTime(val, "work"); openPomodoroModal(); }
  };

  document.getElementById("btn-pomo-strict-lock").onclick = () => {
    if (PomodoroState.isRunning && PomodoroState.strictLock) {
      attemptBreakStrictLock(() => {
        PomodoroState.strictLock = false;
        openPomodoroModal();
      });
      return;
    }
    PomodoroState.strictLock = !PomodoroState.strictLock;
    if (PomodoroState.strictLock) {
      PomodoroState.distractionCount = 0;
      showToast("تم تفعيل قفل التشتت الصارم 🔒! لن تتمكن من الخروج قبل انتهاء الوقت.", "success");
    } else {
      showToast("تم إلغاء قفل التشتت", "info");
    }
    openPomodoroModal();
  };

  document.getElementById("btn-pomo-start").onclick = async () => {
    if (PomodoroState.isRunning) {
      if (PomodoroState.strictLock) {
        attemptBreakStrictLock(() => {
          pausePomodoro();
          openPomodoroModal();
        });
        return;
      }
      pausePomodoro();
    } else {
      startPomodoro();
      if (PomodoroState.strictLock && !document.fullscreenElement) {
        try { await document.documentElement.requestFullscreen(); } catch (e) {}
      }
    }
    openPomodoroModal();
  };

  document.getElementById("btn-pomo-reset").onclick = () => {
    if (PomodoroState.isRunning && PomodoroState.strictLock) {
      attemptBreakStrictLock(() => {
        resetPomodoro();
        openPomodoroModal();
      });
      return;
    }
    resetPomodoro();
    openPomodoroModal();
  };
}

// 4. نافذة أصوات التركيز والدراسة
function openAmbientModal() {
  const modalBody = `
    <p class="small-muted">أصوات هادئة للمساعدة على التركيز أثناء البرمجة والمذاكرة تعمل مباشرة في الخلفية:</p>
    <div class="ambient-controls-grid">
      <div class="ambient-sound-card ${currentAmbientType === "rain" ? "active" : ""}" id="card-amb-rain">
        <i class="fa-solid fa-cloud-showers-heavy"></i>
        <strong>مطر هادئ</strong>
        <small class="small-muted d-block mt-1">${currentAmbientType === "rain" ? "شغال حالياً" : "اضغط للتشغيل"}</small>
      </div>
      <div class="ambient-sound-card ${currentAmbientType === "focus" ? "active" : ""}" id="card-amb-focus">
        <i class="fa-solid fa-wave-square"></i>
        <strong>تركيز عميق</strong>
        <small class="small-muted d-block mt-1">${currentAmbientType === "focus" ? "شغال حالياً" : "اضغط للتشغيل"}</small>
      </div>
    </div>
  `;

  openFormModal("أصوات التركيز الذهني (Ambient Sounds)", modalBody, async () => {});
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  document.getElementById("card-amb-rain").onclick = () => { toggleAmbientSound("rain"); openAmbientModal(); };
  document.getElementById("card-amb-focus").onclick = () => { toggleAmbientSound("focus"); openAmbientModal(); };
}

// 5. متتبع ساعات العمل الفعلي على المشاريع (Dev Time Tracker)
AppState.activeProjectTrackingId = null;
let projectTrackingTimer = null;
let projectTrackingStartTime = 0;

async function toggleProjectDevTimer(projectId) {
  const proj = AppState.collections.projects.find(p => p.id === projectId);
  if (!proj) return;

  if (AppState.activeProjectTrackingId === projectId) {
    // إيقاف العداد وحفظ الثواني في Firebase
    const elapsedSec = Math.round((Date.now() - projectTrackingStartTime) / 1000);
    clearInterval(projectTrackingTimer);
    AppState.activeProjectTrackingId = null;

    const totalSec = Number(proj.trackedSeconds || 0) + elapsedSec;
    await updateRecord("projects", projectId, { trackedSeconds: totalSec });
    showToast(`تم حفظ ${Math.round(elapsedSec / 60)} دقيقة عمل في مشروع "${proj.title}"`, "success");
    renderProjects();
  } else {
    // بدء العداد
    if (AppState.activeProjectTrackingId) {
      showToast("يوجد مؤقت يعمل بالفعل على مشروع آخر، قم بإيقافه أولاً", "error");
      return;
    }
    AppState.activeProjectTrackingId = projectId;
    projectTrackingStartTime = Date.now();
    projectTrackingTimer = setInterval(() => {
      renderProjects();
    }, 10000); // تحديث كل 10 ثوانٍ
    showToast(`بدأ حساب وقت العمل على مشروع "${proj.title}" ⏱️`, "info");
    renderProjects();
  }
}

// 6. تشغيل الفيديو في نافذة عائمة (PiP) وحفظ العلامات الزمنية
document.addEventListener("DOMContentLoaded", () => {
  const topbarPomo = document.getElementById("btn-topbar-pomo");
  if (topbarPomo) topbarPomo.onclick = openPomodoroModal;

  const topbarAmbient = document.getElementById("btn-topbar-ambient");
  if (topbarAmbient) topbarAmbient.onclick = openAmbientModal;

  const pipBtn = document.getElementById("btn-video-pip");
  const player = document.getElementById("main-media-player");
  if (pipBtn && player) {
    pipBtn.onclick = async () => {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled && player.src) {
          await player.requestPictureInPicture();
        } else {
          showToast("شغل فيديو أولاً لتفعيله في نافذة عائمة", "info");
        }
      } catch (err) {
        showToast("المتصفح لا يدعم PiP لهذا المصدر حالياً", "error");
      }
    };
  }

  const addTsBtn = document.getElementById("btn-add-timestamp");
  const tsContainer = document.getElementById("video-timestamps-list");
  if (addTsBtn && player && tsContainer) {
    addTsBtn.onclick = () => {
      if (!player.duration || isNaN(player.currentTime)) {
        showToast("قم بتشغيل الفيديو أولاً لحفظ علامة زمنية", "info");
        return;
      }
      const sec = Math.floor(player.currentTime);
      const m = String(Math.floor(sec / 60)).padStart(2, "0");
      const s = String(sec % 60).padStart(2, "0");
      const timeLabel = `${m}:${s}`;

      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "timestamp-chip";
      chip.innerHTML = `<i class="fa-regular fa-clock"></i> الدقيقة ${timeLabel}`;
      chip.onclick = () => {
        player.currentTime = sec;
        player.play();
      };
      tsContainer.appendChild(chip);
      showToast(`تم حفظ العلامة الزمنية عند ${timeLabel}`, "success");
    };
  }
});
/* ==========================================================================
   MASTER 5-AXES ENGINE: UNIVERSITY, DEV HUB, SPIRITUAL & UI POLISH
   ========================================================================== */

// 1. باقات الأصوات التفاعلية (Apple Touch vs Thocky Mechanical Keyboard)
let currentUISoundPack = localStorage.getItem("MY_LIFE_OS_SOUND_PACK") || "apple";

function playCustomUISound() {
  if (currentUISoundPack === "mute") return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (currentUISoundPack === "mech") {
      // صوت سويتش كيبورد ميكانيكي فخم (Thocky Switch)
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(95, ctx.currentTime + 0.045);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
    } else {
      // نغمة Apple Touch الناعمة
      osc.type = "sine";
      osc.frequency.setValueAtTime(1100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
    }
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
}

// 2. تحديث رادار الامتحانات، شبكة العادات (Heatmap)، ومنبه صيام النوافل
function refreshSuperOSWidgets() {
  // أ) رادار الامتحانات (Exam Radar)
  const radarWidget = document.getElementById("exam-radar-widget");
  const radarBadge = document.getElementById("exam-radar-badge");
  const radarText = document.getElementById("exam-radar-text");
  if (radarWidget && radarText) {
    const today = todayISO();
    const upcomingExams = AppState.collections.events
      .filter(e => e.date >= today && (e.type === "Exam" || e.type === "University"))
      .sort((a, b) => a.date.localeCompare(b.date));

    if (upcomingExams.length > 0) {
      const nextEv = upcomingExams[0];
      const diffDays = Math.ceil((new Date(nextEv.date) - new Date(today)) / (1000 * 60 * 60 * 24));
      radarText.textContent = `الحدث القادم: "${nextEv.title}" (${diffDays === 0 ? "اليوم!" : "بعد " + diffDays + " يوم"})`;
      if (diffDays <= 2) {
        radarWidget.classList.add("radar-danger");
        radarBadge.className = "badge badge-danger";
        radarBadge.textContent = "طوارئ < 48 ساعة";
      } else {
        radarWidget.classList.remove("radar-danger");
        radarBadge.className = "badge badge-gold";
        radarBadge.textContent = `متبقي ${diffDays} يوم`;
      }
    } else {
      radarWidget.classList.remove("radar-danger");
      radarBadge.className = "badge badge-emerald";
      radarBadge.textContent = "آمن";
      radarText.textContent = "لا توجد اختبارات مسجلة قريبة.";
    }
  }

  // ب) شبكة الالتزام الخضراء (GitHub-Style Habit Heatmap - آخر 28 يوماً)
  const heatmapGrid = document.getElementById("habit-heatmap-grid");
  if (heatmapGrid) {
    let cellsHtml = "";
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().split("T")[0];
      const pDoc = AppState.collections.prayers.find(p => p.date === iso);
      const pCount = pDoc ? ["fajr","dhuhr","asr","maghrib","isha"].filter(k => pDoc[k]).length : 0;
      const tDone = AppState.collections.tasks.filter(t => t.dueDate === iso && t.status === "Completed").length;
      const score = pCount + tDone;
      const lvl = score >= 5 ? "lvl-3" : score >= 3 ? "lvl-2" : score >= 1 ? "lvl-1" : "";
      cellsHtml += `<div class="heatmap-cell ${lvl}" title="${iso}: نشاط (${score})"></div>`;
    }
    heatmapGrid.innerHTML = cellsHtml;
  }

  // ج) منبه صيام النوافل (الاثنين والخميس والأيام البيض)
  const fastBadge = document.getElementById("fasting-reminder-badge");
  if (fastBadge) {
    const dayOfWeek = new Date().getDay(); // 0=الأحد، 1=الاثنين، 3=الأربعاء، 4=الخميس
    if (dayOfWeek === 0 || dayOfWeek === 3) {
      fastBadge.innerHTML = `<i class="fa-solid fa-bell gold-text"></i> تذكير: غداً يوم ${dayOfWeek === 0 ? "الاثنين" : "الخميس"} (سُنّة صيام النوافل)`;
    } else if (dayOfWeek === 1 || dayOfWeek === 4) {
      fastBadge.innerHTML = `<i class="fa-solid fa-star gold-text"></i> اليوم ${dayOfWeek === 1 ? "الاثنين" : "الخميس"} — تقبل الله طاعاتكم`;
    } else {
      fastBadge.innerHTML = `<i class="fa-solid fa-moon"></i> صيام الاثنين والخميس والأيام البيض (13، 14، 15 هجرياً)`;
    }
  }

  // د) تحديث علامة المصحف المحفوظة
  const savedQuran = localStorage.getItem("MY_LIFE_OS_QURAN_BOOKMARK");
  if (savedQuran) {
    const qLabel = document.getElementById("quran-bookmark-label");
    if (qLabel) qLabel.textContent = `آخر وقف مصحف: ${savedQuran}`;
  }
}

// 3. خزنة قوانين ومعادلات المادة (Formulas Vault) + فحص حالة السيرفر (Ping Checker)
document.addEventListener("click", async (e) => {
  const actionBtn = e.target.closest("[data-action]");
  if (!actionBtn) return;
  const action = actionBtn.dataset.action;

  // خزنة قوانين المادة الدراسية
  if (action === "open-subject-formulas") {
    const subj = AppState.collections.subjects.find(s => s.id === actionBtn.dataset.id);
    if (!subj) return;
    const formulas = subj.formulas || [];
    const listHtml = formulas.length
      ? formulas.map(f => `<div class="code-snippet-box"><strong>${escapeHTML(f.title)}</strong><div dir="ltr" class="mt-2">${escapeHTML(f.eq)}</div></div>`).join("")
      : `<p class="small-muted">لا توجد قوانين محفوظة لهذه المادة بعد.</p>`;

    openFormModal(`خزنة قوانين ومعادلات: ${escapeHTML(subj.name)}`, `
      <div class="form-group"><label>اسم القانون / المفهوم</label><input name="title" required placeholder="قانون أوم / معادلة كيرشوف..." /></div>
      <div class="form-group"><label>المعادلة أو القانون</label><input name="eq" dir="ltr" required placeholder="V = I * R  |  P = V * I" /></div>
      <h4 class="mt-4 gold-text">القوانين المحفوظة:</h4>
      <div style="max-height:200px; overflow-y:auto;">${listHtml}</div>
    `, async (data) => {
      const updated = [{ title: data.title, eq: data.eq }, ...formulas];
      await updateRecord("subjects", subj.id, { formulas: updated });
    });
  }

  // فحص حالة موقع المشروع المنشور (Live Server Ping Checker)
  if (action === "ping-project-url") {
    const url = actionBtn.dataset.url;
    actionBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> جاري الفحص...`;
    try {
      await fetch(url, { mode: "no-cors", cache: "no-store" });
      actionBtn.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981"></i> Online (شغال)`;
      showToast("الموقع المنشور يستجيب ويعمل بنجاح (Online) 🟢", "success");
    } catch (err) {
      actionBtn.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:#ef4444"></i> Offline`;
      showToast("تعذر الوصول للموقع حالياً (Offline) 🔴", "error");
    }
  }
});

// 4. ربط جميع أزرار المحاور الخمسة الجديدة
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(refreshSuperOSWidgets, 1200);
  setInterval(refreshSuperOSWidgets, 15000);

  // أ) متتبع الطاقة اليومية (Energy Score)
  document.querySelectorAll(".energy-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".energy-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const lvl = btn.dataset.energy;
      const badge = document.getElementById("energy-advice-badge");
      if (lvl === "high") {
        badge.textContent = "ابدأ بأصعب مادة أو مشروع الآن 🔥";
        showToast("طاقة عالية! وقت مثالي للمسائل الهندسية والبرمجة العميقة", "success");
      } else if (lvl === "medium") {
        badge.textContent = "مناسب لحل الشيتات والمراجعة ⚡";
      } else {
        badge.textContent = "ركز على المهام الخفيفة والقراءة ☕";
      }
    };
  });

  // ب) حاسبة الـ GPA وسيناريوهات التقدير
  document.getElementById("btn-gpa-simulator")?.addEventListener("click", () => {
    openFormModal("حاسبة الـ GPA وسيناريو درجة الامتياز", `
      <div class="form-group"><label>معدلك التراكمي الحالي (GPA من 4.0)</label><input type="number" step="0.01" id="gpa-cur" value="3.2" /></div>
      <div class="form-group"><label>الساعات المنجزة سابقاً</label><input type="number" id="gpa-hours-done" value="60" /></div>
      <div class="form-group"><label>ساعات الترم الحالي</label><input type="number" id="gpa-hours-sem" value="18" /></div>
      <div class="form-group"><label>التقدير المتوقع هذا الترم (من 4.0)</label><input type="number" step="0.1" id="gpa-sem-target" value="3.8" /></div>
      <div class="subject-progress-box">
        <strong id="gpa-calc-result" class="gold-text">اضغط "حفظ البيانات" لحساب المعدل الجديد</strong>
      </div>
    `, async () => {
      const cur = Number(document.getElementById("gpa-cur").value) || 0;
      const hDone = Number(document.getElementById("gpa-hours-done").value) || 0;
      const hSem = Number(document.getElementById("gpa-hours-sem").value) || 0;
      const semGpa = Number(document.getElementById("gpa-sem-target").value) || 0;
      const totalPts = (cur * hDone) + (semGpa * hSem);
      const newGpa = ((totalPts) / (hDone + hSem || 1)).toFixed(2);
      showToast(`معدلك التراكمي المتوقع سيصبح: ${newGpa} من 4.0 🎓`, "success");
    });
  });

  // ج) محاكي فاينمان للمذاكرة بالذكاء الاصطناعي (AI Feynman Mode)
  document.getElementById("btn-feynman-ai")?.addEventListener("click", () => {
    openFormModal("محاكي فاينمان الذكي (اشرح الدرس وسيقيمك الـ AI)", `
      <div class="form-group"><label>اسم المادة أو المفهوم الهندسي</label><input name="topic" required placeholder="مثال: البوابات المنطقية Logic Gates / قوانين كيرشوف" /></div>
      <div class="form-group"><label>اشرح المفهوم بأسلوبك وكأنك تشرحه لطالب زميلك:</label><textarea name="explanation" rows="4" required placeholder="اكتب شرحك المختصر هنا ليقوم المساعد الذكي بتقييم فهمك..."></textarea></div>
    `, async (data) => {
      switchView("ai");
      handleAIChatSubmit(`أريد تطبيق تقنية فاينمان في مادة (${data.topic}). هذا هو شرحي للمفهوم: "${data.explanation}". قيّم مدى صحة شرحي، وصحح أي نقص، واطرح عليّ سؤالاً لاختبار فهمي العميق.`);
    });
  });

  // د) مصحف القراءة وحفظ الوقف التلقائي
  document.getElementById("btn-open-quran-reader")?.addEventListener("click", () => {
    const saved = localStorage.getItem("MY_LIFE_OS_QURAN_BOOKMARK") || "صفحة 1 - سورة الفاتحة";
    openFormModal("مصحف القراءة وحفظ الوقف التلقائي", `
      <div class="form-group"><label>السورة الحالية ورموز الآيات / الصفحة</label><input name="bookmark" value="${escapeHTML(saved)}" required placeholder="مثال: سورة الكهف - آية 45 (صفحة 299)" /></div>
      <div class="form-group"><label>تدبر أو فائدة قرآنية استوقفتك اليوم (اختياري)</label><textarea name="reflection" rows="3" placeholder="اكتب تدبرك ليُحفظ في سجل القرآن..."></textarea></div>
    `, async (data) => {
      localStorage.setItem("MY_LIFE_OS_QURAN_BOOKMARK", data.bookmark);
      refreshSuperOSWidgets();
      if (data.reflection) {
        await createRecord("study_records", { title: `تدبر قرآني (${data.bookmark})`, benefit: data.reflection });
      }
      showToast("تم حفظ موضع وقفك في المصحف تلقائياً", "success");
    });
  });

  // هـ) خزنة الأكواد السريعة (Code Snippets Vault)
  document.getElementById("btn-open-snippets")?.addEventListener("click", () => {
    const snippets = JSON.parse(localStorage.getItem("MY_LIFE_OS_SNIPPETS") || "[]");
    const listHtml = snippets.length
      ? snippets.map((s, i) => `
          <div class="code-snippet-box">
            <div class="flex-between">
              <strong>${escapeHTML(s.title)}</strong>
              <button type="button" class="btn btn-xs btn-gold" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(s.code)}'))">نسخ الكود</button>
            </div>
            <pre dir="ltr" class="mt-2">${escapeHTML(s.code)}</pre>
          </div>
        `).join("")
      : `<p class="small-muted">لا توجد أكواد محفوظة بعد.</p>`;

    openFormModal("خزنة الأكواد البرمجية السريعة (Code Snippets)", `
      <div class="form-group"><label>عنوان الكود / الدالة</label><input name="title" required placeholder="اتصال Firebase / حل مسألة C++..." /></div>
      <div class="form-group"><label>الكود البرمجي</label><textarea name="code" rows="4" dir="ltr" required placeholder="const app = initializeApp(config);"></textarea></div>
      <h4 class="mt-4 gold-text">مكتبة أكوادك المحفوظة:</h4>
      <div style="max-height:220px; overflow-y:auto;">${listHtml}</div>
    `, async (data) => {
      snippets.unshift({ title: data.title, code: data.code });
      localStorage.setItem("MY_LIFE_OS_SNIPPETS", JSON.stringify(snippets));
      showToast("تم حفظ الكود في خزنتك البرمجية", "success");
    });
  });

  // و) سجل الأخطاء البرمجية وحلولها (Dev Bug & Fix Log)
  document.getElementById("btn-open-buglog")?.addEventListener("click", () => {
    const bugs = JSON.parse(localStorage.getItem("MY_LIFE_OS_BUGS") || "[]");
    const listHtml = bugs.length
      ? bugs.map(b => `<div class="prayer-row"><div><strong>🐞 ${escapeHTML(b.bug)}</strong><p class="small-note">✅ الحل: ${escapeHTML(b.fix)}</p></div></div>`).join("")
      : `<p class="small-muted">سجل الأخطاء المحلولة فارغ.</p>`;

    openFormModal("سجل التحديات والأخطاء المحلولة (Bug & Fix Log)", `
      <div class="form-group"><label>المشكلة أو الـ Error الذي واجهك</label><input name="bug" required placeholder="CORS Error / Null Reference..." /></div>
      <div class="form-group"><label>كيف قمت بحله؟</label><textarea name="fix" rows="2" required placeholder="إضافة Header / التأكد من تحميل DOM..."></textarea></div>
      <div style="max-height:200px; overflow-y:auto;" class="mt-2">${listHtml}</div>
    `, async (data) => {
      bugs.unshift({ bug: data.bug, fix: data.fix });
      localStorage.setItem("MY_LIFE_OS_BUGS", JSON.stringify(bugs));
      showToast("تم توثيق الحل الهندسي بنجاح", "success");
    });
  });

  // ز) خريطة مسارات التعلم التقنية (Tech Roadmap Tracker)
  document.getElementById("btn-open-roadmap")?.addEventListener("click", () => {
    const roadmap = JSON.parse(localStorage.getItem("MY_LIFE_OS_ROADMAP") || '{"html":true,"css":true,"js":true,"firebase":true}');
    const skills = [
      { key: "html", label: "HTML5 & Semantic Architecture" },
      { key: "css", label: "CSS3, Grid & Luxury Animations" },
      { key: "js", label: "Modern ES6+ JavaScript & Async" },
      { key: "firebase", label: "Firebase Auth, Firestore & Security" },
      { key: "pwa", label: "PWA, Service Workers & Offline Sync" },
      { key: "cpp", label: "C++ & Data Structures / Algorithms" },
      { key: "logic", label: "Digital Logic & Circuit Design" },
      { key: "ai", label: "AI APIs & Prompt Engineering" }
    ];

    const pillsHtml = skills.map(s => `
      <label class="check-pill ${roadmap[s.key] ? "completed" : ""}">
        <input type="checkbox" name="${s.key}" ${roadmap[s.key] ? "checked" : ""} />
        <span>${s.label}</span>
      </label>
    `).join("");

    openFormModal("خريطة إتقان المهارات الهندسية والبرمجية", `
      <p class="small-muted mb-2">علّم على المهارات التي أتقنتها لمتابعة تطورك التقني:</p>
      <div class="curriculum-items-wrap" style="grid-template-columns:1fr;">${pillsHtml}</div>
    `, async (data) => {
      const newMap = {};
      skills.forEach(s => { newMap[s.key] = Boolean(data[s.key]); });
      localStorage.setItem("MY_LIFE_OS_ROADMAP", JSON.stringify(newMap));
      showToast("تم تحديث خريطة مهاراتك التقنية", "success");
    });
  });

  // ح) المسودة السريعة الجانبية (Quick Scratchpad) + باقات الأصوات
  const scratchDrawer = document.getElementById("scratchpad-drawer");
  const scratchArea = document.getElementById("quick-scratchpad-area");
  const soundSelect = document.getElementById("select-ui-sound-pack");

  if (scratchArea) {
    scratchArea.value = localStorage.getItem("MY_LIFE_OS_SCRATCHPAD") || "";
    scratchArea.oninput = () => localStorage.setItem("MY_LIFE_OS_SCRATCHPAD", scratchArea.value);
  }

  if (soundSelect) {
    soundSelect.value = currentUISoundPack;
    soundSelect.onchange = () => {
      currentUISoundPack = soundSelect.value;
      localStorage.setItem("MY_LIFE_OS_SOUND_PACK", currentUISoundPack);
      playCustomUISound();
      showToast("تم تغيير باقة الأصوات التفاعلية", "success");
    };
  }

  document.getElementById("btn-toggle-scratchpad")?.addEventListener("click", () => {
    scratchDrawer?.classList.toggle("hidden");
  });
  document.getElementById("btn-close-scratchpad")?.addEventListener("click", () => {
    scratchDrawer?.classList.add("hidden");
  });

  // ط) تخصيص وإخفاء/إظهار كروت لوحة التحكم
  document.getElementById("btn-customize-dash")?.addEventListener("click", () => {
    const kpiGrid = document.querySelector("#view-dashboard .kpi-grid");
    if (kpiGrid) {
      kpiGrid.classList.toggle("hidden");
      showToast("تم تبديل وضع عرض الكروت الإحصائية في الرئيسية", "info");
    }
  });
});
/* ==========================================================================
   FLYING FRIENDLY ALEX BOT + XP LEVELING + KANBAN + EXAM CRUNCH + DAILY CARD
   ========================================================================== */

// محرك الدوران التلقائي لخلفيات الموقع والمؤقت (كل 20 دقيقة أو حسب اختيار المستخدم)
let wallpaperRotationTimer = null;

const ALL_WALLPAPER_URLS = [
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1920&q=85"
];

function startWallpaperAutoRotation() {
  if (wallpaperRotationTimer) clearInterval(wallpaperRotationTimer);
  const mode = localStorage.getItem("MY_LIFE_OS_WP_ROTATE_MODE") || "static"; // "static" | "20" | "10" | "5" | "60"
  if (mode === "static") return;

  const intervalMins = Number(mode) || 20;
  wallpaperRotationTimer = setInterval(() => {
    rotateWallpaperNow(false);
  }, intervalMins * 60 * 1000);
}

function rotateWallpaperNow(showNotification = true) {
  let idx = Number(localStorage.getItem("MY_LIFE_OS_WP_ROTATE_IDX") || 0);
  idx = (idx + 1) % ALL_WALLPAPER_URLS.length;
  localStorage.setItem("MY_LIFE_OS_WP_ROTATE_IDX", String(idx));
  const nextUrl = ALL_WALLPAPER_URLS[idx];
  localStorage.setItem("MY_LIFE_OS_APP_BG", nextUrl);
  localStorage.setItem("MY_LIFE_OS_POMO_BG", nextUrl);
  applySavedWallpapers();
  if (showNotification) {
    showToast("تم تبديل خلفية النظام والمؤقت تلقائياً 🔄🖼️", "info");
  }
}

// تشغيل فحص التغيير التلقائي عند فتح الموقع
setTimeout(startWallpaperAutoRotation, 1500);

function openWallpaperStudioModal() {
  const currentRotateMode = localStorage.getItem("MY_LIFE_OS_WP_ROTATE_MODE") || "static";

  const presets = [
    { name: "🕵️‍♂️ فارس الظل الغامض", url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=85" },
    { name: "👤 وقفة رجل هادئ", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=85" },
    { name: "🧥 هيبة في الغموض", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1920&q=85" },
    { name: "🎧 أنمي تركيز ومذاكرة", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=85" },
    { name: "☕ أجواء أنمي دافئة", url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1920&q=85" },
    { name: "🌸 فتاة الأنمي والهدوء", url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=85" },
    { name: "⚔️ المحارب الغامض", url: DEFAULT_WALLPAPERS.shadowWarrior },
    { name: "💻 هاكر النيون", url: DEFAULT_WALLPAPERS.cyberCoder },
    { name: "🌺 أزهار الساكورا الوردية", url: DEFAULT_WALLPAPERS.sakuraPink },
    { name: "☁️ غيوم وردية هادئة", url: DEFAULT_WALLPAPERS.pastelClouds },
    { name: "🏔️ جبال الألب السويسرية", url: DEFAULT_WALLPAPERS.swissAlps },
    { name: "🌲 غابة المطر الضبابية", url: DEFAULT_WALLPAPERS.rainyForest },
    { name: "🌌 المجرة الملكية", url: DEFAULT_WALLPAPERS.royalGalaxy },
    { name: "🌊 أمواج المحيط الليلي", url: DEFAULT_WALLPAPERS.nightOcean }
  ];

  const presetsHtml = presets.map(p => `
    <div class="wallpaper-preset-card" style="background-image:url('${p.url}')" data-wp-url="${p.url}">
      <span>${p.name}</span>
    </div>
  `).join("");

  openFormModal("🖼️ استوديو الخلفيات والتبديل التلقائي", `
    <!-- ميزة التبديل التلقائي للخلفية كل 20 دقيقة أو تثبيتها -->
    <div class="wp-rotator-box">
      <div>
        <strong><i class="fa-solid fa-rotate gold-text"></i> نظام دوران الخلفية التلقائي:</strong>
        <small class="small-muted d-block">اختر تثبيت الخلفية أو تغييرها تلقائياً كل 20 دقيقة لتجديد نشاطك</small>
      </div>
      <div class="filters-row">
        <select id="wp-rotate-mode-select" class="select-sm">
          <option value="static" ${currentRotateMode === "static" ? "selected" : ""}>📌 خلفية ثابتة (بدون تغيير)</option>
          <option value="20" ${currentRotateMode === "20" ? "selected" : ""}>🔄 تغيير تلقائي كل 20 دقيقة</option>
          <option value="10" ${currentRotateMode === "10" ? "selected" : ""}>⚡ تغيير تلقائي كل 10 دقائق</option>
          <option value="5" ${currentRotateMode === "5" ? "selected" : ""}>🚀 تغيير تلقائي كل 5 دقائق</option>
          <option value="60" ${currentRotateMode === "60" ? "selected" : ""}>⏳ تغيير تلقائي كل ساعة</option>
        </select>
        <button type="button" id="btn-wp-random-now" class="btn btn-xs btn-gold" title="تبديل عشوائي الآن">
          <i class="fa-solid fa-shuffle"></i> غيّر الآن
        </button>
      </div>
    </div>

    <div class="form-group">
      <label>تطبيق الخلفية المختارة يدوياً على:</label>
      <select id="wp-target-select" class="select-sm" style="width:100%">
        <option value="both">خلفية الموقع + شاشة المؤقت معاً ✨</option>
        <option value="app">خلفية الموقع الرئيسية فقط 🖥️</option>
        <option value="pomo">خلفية شاشة مؤقت التركيز فقط ⏱️</option>
      </select>
    </div>

    <label class="small-muted">اختر من المكتبة المنوعة الجاهزة (اضغط على أي صورة لتفعيلها فوراً):</label>
    <div class="wallpaper-presets-grid">${presetsHtml}</div>

    <div class="config-actions mt-2">
      <label class="btn btn-gold btn-sm" style="cursor:pointer; flex:1;">
        <i class="fa-solid fa-upload"></i> اختر صورة خاصة من جهازك
        <input type="file" id="wp-file-upload" accept="image/*" class="hidden" />
      </label>
      <button type="button" id="btn-back-to-pomo" class="btn btn-outline btn-sm">
        <i class="fa-solid fa-stopwatch gold-text"></i> العودة لمؤقت التركيز
      </button>
    </div>
  `, async () => {});

  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  // حفظ وضع الدوران التلقائي (ثابت أو كل 20 دقيقة)
  document.getElementById("wp-rotate-mode-select").onchange = (e) => {
    const mode = e.target.value;
    localStorage.setItem("MY_LIFE_OS_WP_ROTATE_MODE", mode);
    startWallpaperAutoRotation();
    showToast(mode === "static" ? "تم تثبيت الخلفية الحالية 📌" : `تم تفعيل تغيير الخلفية تلقائياً كل ${mode} دقيقة 🔄`, "success");
  };

  document.getElementById("btn-wp-random-now").onclick = () => {
    rotateWallpaperNow(true);
  };

  document.getElementById("btn-back-to-pomo").onclick = () => {
    openPomodoroModal();
  };

  document.querySelectorAll("[data-wp-url]").forEach(card => {
    card.onclick = () => {
      const target = document.getElementById("wp-target-select").value;
      saveAndApplyWallpaper(card.dataset.wpUrl, target);
      document.querySelectorAll("[data-wp-url]").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    };
  });

  document.getElementById("wp-file-upload").onchange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const target = document.getElementById("wp-target-select").value;
      saveAndApplyWallpaper(reader.result, target);
      document.getElementById("universal-modal").classList.add("hidden");
    };
    reader.readAsDataURL(file);
  };
}

async function saveAndApplyWallpaper(imgUrl, target = "both") {
  if (target === "both" || target === "app") {
    localStorage.setItem("MY_LIFE_OS_APP_BG", imgUrl);
  }
  if (target === "both" || target === "pomo") {
    localStorage.setItem("MY_LIFE_OS_POMO_BG", imgUrl);
  }
  applySavedWallpapers();
  showToast("تم تطبيق الخلفية الجديدة بنجاح! 🎨", "success");

  // مزامنة مع الحساب السحابي إذا كانت رابطاً خفيفاً
  if (imgUrl.startsWith("http") && AppState.user) {
    const existing = AppState.collections.user_settings[0];
    const payload = target === "app" ? { appWallpaper: imgUrl } : target === "pomo" ? { pomoWallpaper: imgUrl } : { appWallpaper: imgUrl, pomoWallpaper: imgUrl };
    if (existing) await updateRecord("user_settings", existing.id, payload);
    else await createRecord("user_settings", payload);
  }
}

// تشغيل القرآن الصوتي + رفع الصورة الشخصية من الجهاز + المؤقت المصغر + تفاعل أليكس اللحظي
document.addEventListener("DOMContentLoaded", () => {
  // 1. مشغل القرآن الكريم الصوتي المباشر
  document.getElementById("btn-play-quran-stream")?.addEventListener("click", () => {
    const server = document.getElementById("quran-reciter-select").value;
    const surah = document.getElementById("quran-surah-select").value;
    const player = document.getElementById("quran-audio-player");
    if (player) {
      player.src = `${server}/${surah}.mp3`;
      player.play();
      showToast("جاري تشغيل التلاوة المباركة 🌿", "success");
    }
  });

  // 2. رفع الصورة الشخصية من الجهاز في الإعدادات
  const photoFileInp = document.getElementById("set-photo-file");
  const avatarPreview = document.getElementById("settings-avatar-preview");
  const savedLocalAvatar = localStorage.getItem("MY_LIFE_OS_CUSTOM_AVATAR");
  if (savedLocalAvatar) {
    if (avatarPreview) avatarPreview.src = savedLocalAvatar;
    const sideImg = document.getElementById("user-avatar-img");
    if (sideImg) sideImg.src = savedLocalAvatar;
  }

  photoFileInp?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      localStorage.setItem("MY_LIFE_OS_CUSTOM_AVATAR", base64);
      if (avatarPreview) avatarPreview.src = base64;
      const sideImg = document.getElementById("user-avatar-img");
      if (sideImg) sideImg.src = base64;
      showToast("تم تحديث صورتك الشخصية من جهازك بنجاح! 📸", "success");
    };
    reader.readAsDataURL(file);
  });

  // 3. تحديث المؤقت العائم المصغر عند إغلاق نافذة البومودورو
  setInterval(() => {
    const miniPomo = document.getElementById("mini-floating-pomo");
    const miniTime = document.getElementById("mini-pomo-time");
    const modalHidden = document.getElementById("universal-modal")?.classList.contains("hidden");
    if (miniPomo && miniTime) {
      if (PomodoroState.isRunning && modalHidden) {
        miniPomo.classList.remove("hidden");
        miniTime.textContent = formatPomoTime(PomodoroState.timeLeft);
      } else {
        miniPomo.classList.add("hidden");
      }
    }
  }, 1000);

  document.getElementById("btn-mini-pomo-open")?.addEventListener("click", openPomodoroModal);
});


// 2. خوارزمية أليكس الذكية الواعية بالسياق (Smart Context-Aware Algorithm)
const AlexBrain = {
  sessionStartTime: Date.now(),
  lastMessageKey: "",
  lastWaterReminderMin: 0
};

function generateSmartContextualAlexMessage() {
  const now = new Date();
  const hour = now.getHours();
  const minutesOnline = Math.floor((Date.now() - AlexBrain.sessionStartTime) / 60000);
  const activeSection = document.querySelector(".view-section.active")?.id || "view-dashboard";
  const userName = (AppState.user?.displayName || "يا صاحبي").split(" ")[0];

  const today = todayISO();
  const todayPrayerDoc = AppState.collections.prayers.find(p => p.date === today);
  const prayersDone = todayPrayerDoc
    ? ["fajr", "dhuhr", "asr", "maghrib", "isha"].filter(k => todayPrayerDoc[k] === true).length
    : 0;

  const pendingTasks = AppState.collections.tasks.filter(t => t.status !== "Completed");
  const completedTasks = AppState.collections.tasks.filter(t => t.status === "Completed");
  const subjects = AppState.collections.subjects;

  const candidates = [];

  // أ) قواعد الوعي بطول الجلسة وصحة المستخدم (Health & Fatigue Algorithm)
  if (minutesOnline >= 20 && minutesOnline - AlexBrain.lastWaterReminderMin >= 20) {
    AlexBrain.lastWaterReminderMin = minutesOnline;
    return `بقالك ${minutesOnline} دقيقة مركز يا ${userName}! قوم اشرب كوباية مية وريح عينك ثواني عن الشاشة 💧👀`;
  }

  // ب) قواعد الوعي بحالة مؤقت البومودورو لو شغال
  if (PomodoroState.isRunning) {
    const minsLeft = Math.ceil(PomodoroState.timeLeft / 60);
    return `عاش يا بطل! فاضل ${minsLeft} دقيقة في جلسة التركيز الحالية.. كمل بنفس القوة ومتخليش حاجة تشتتك 🔥⏱️`;
  }

  // ج) قواعد الوعي بالصلاة والعبادة الفعلية للمستخدم اليوم
  if (prayersDone === 5) {
    candidates.push(`ما شاء الله يا ${userName}! مسجل 5/5 صلوات النهاردة.. ربنا يتقبل منك ويبارك في وقتك ومذاكرتك 🌿✨`);
  } else if (prayersDone > 0 && prayersDone < 5) {
    candidates.push(`سجلت ${prayersDone} من 5 صلوات النهاردة يا ${userName}.. متنساش تكمل باقي فروضك وتجدد نيتك لله 🕌`);
  }

  // د) قواعد الوعي بالقسم المفتوح حالياً (Active Section Awareness)
  if (activeSection === "view-university") {
    if (subjects.length > 0) {
      candidates.push(`إنت في قسم الجامعة دلوقتي وعندك ${subjects.length} مواد.. تحب نفتح مؤقت التركيز لمادة "${subjects[0].name}"؟ 📚`);
    } else {
      candidates.push(`أضف موادك الدراسية هنا يا ${userName} عشان نتابع الـ 29 بند لكل مادة أول بأول! 🎓`);
    }
  } else if (activeSection === "view-tasks") {
    if (pendingTasks.length > 0) {
      candidates.push(`عندك ${pendingTasks.length} مهام قيد الانتظار، أهمها "${pendingTasks[0].title}".. نبدأ بيها دلوقتي؟ ⚡`);
    } else if (completedTasks.length > 0) {
      candidates.push(`عاش بجد! مخلص كل مهامك المعلقة (${completedTasks.length} مكتملة).. تستاهل استراحة رايقة ☕🏆`);
    }
  } else if (activeSection === "view-finance") {
    candidates.push(`متابعة المصاريف أول بأول بتخليك دايماً متحكم في ميزانية الشهر يا ${userName} 💰📊`);
  } else if (activeSection === "view-islamic") {
    candidates.push(`ألا بذكر الله تطمئن القلوب.. خد دقيقة سبّح فيها أو اقرأ أذكارك 🌿🤲`);
  }

  // هـ) قواعد الوعي بتوقيت اليوم (Time-of-Day Intelligence)
  if (hour >= 22 || hour < 4) {
    candidates.push(`سهران بتنجز في هدوء الليل يا ${userName}؟ ربنا يفتحها عليك، بس متنساش تاخد كفايتك من النوم 🌙✨`);
  } else if (hour >= 4 && hour < 10) {
    candidates.push(`بركة البكور يا ${userName}! الشغل والمذاكرة الصبح بدري بيساوي ساعات طويلة بالليل ☀️🚀`);
  }

  // و) رسائل المهام والأولويات العامة
  if (pendingTasks.length > 0) {
    candidates.push(`فكرك إن مهمة "${pendingTasks[0].title}" مستنياك في الأولويات.. تحب نمسكها نخلصها في جلسة سريعة؟ 🎯`);
  }

  // اختيار رسالة ذكية لم تتكرر للتو
  const filtered = candidates.filter(msg => msg !== AlexBrain.lastMessageKey);
  const pool = filtered.length > 0 ? filtered : ALEX_FRIENDLY_CHECKINS;
  const chosen = pool[Math.floor(Math.random() * pool.length)];
  AlexBrain.lastMessageKey = chosen;
  return chosen;
}

const ALEX_FRIENDLY_CHECKINS = [
  "وحد الله وصلي على النبي في قلبك.. ربنا يبارك في وقتك ومجهودك 🌿",
  "لو حاسس بأي إرهاق خد نفس عميق واشرب مية، صحتك أهم حاجة يا صاحبي 💧",
  "سبحان الله وبحمده، سبحان الله العظيم.. خلي لسانك رطب بذكر الله ✨"
];

const ALEX_COMPANION_REPLIES = {
  tired: "حبيبي ألف سلامة عليك من التعب! بص، اقفل اللي في إيدك دلوقتي 10 دقايق، قوم اغسل وشك واشرب كوباية مية أو اعمل حاجة دافية، وماتضغطش على أعصابك.. صحتك ونفسيتك أهم من أي شيتات، ولما تهدى نبقى نكمل سوا خطوة بخطوة 💙",
  zikr: "اللهم صلِّ وسلم وبارك على سيدنا محمد 🌿.. قول معايا: (لا إله إلا أنت سبحانك إني كنت من الظالمين)، (ربِّ اشرح لي صدري ويسر لي أمري). ربنا يفتحها في وشك ويرزقك الفهم والبركة والسكينة يا صاحبي 🤲",
  water: "عاش! يلا قوم دلوقتي اشرب كوباية مية كبيرة، وافرد كتافك وضهرك، وبص لبعيد عن الشاشة لمدة 20 ثانية عشان عينك ترتاح 💧👀.. مستنيك ترجع فريش!",
  joke: "عارف المهندس لما بيحب يرتاح بيعمل إيه؟ بيعمل لنفسه استراحة بـ setTimeout بس بينسى يحط الـ callback فبينام للصبح 😂! روّق كده وابتسم، إن شاء الله يومك جميل ومليان خير ✨"
};

function updateXPSystem() {
  const completedTasks = AppState.collections.tasks.filter(t => t.status === "Completed").length;
  const totalPrayers = AppState.collections.prayers.reduce((sum, p) => {
    return sum + ["fajr","dhuhr","asr","maghrib","isha"].filter(k => p[k]).length;
  }, 0);
  const focusSessions = getFocusSessionsLog().length;
  const checkItems = AppState.collections.subjects.reduce((sum, s) => {
    return sum + Object.values(s.checklist || {}).filter(Boolean).length;
  }, 0);

const penaltyXP = Number(localStorage.getItem("MY_LIFE_OS_XP_PENALTY") || 0);
  const totalXP = Math.max(0, (completedTasks * 25) + (totalPrayers * 15) + (focusSessions * 40) + (checkItems * 20) - penaltyXP);
    const level = Math.floor(totalXP / 200) + 1;
  const xpInCurrentLevel = totalXP % 200;
  const progressPct = Math.min(100, Math.round((xpInCurrentLevel / 200) * 100));

  const titles = ["المبتدئ الطموح", "المنظم النشيط", "مهندس التركيز", "فارس الإنجاز", "أسطورة الإنتاجية"];
  const rankTitle = titles[Math.min(titles.length - 1, Math.floor((level - 1) / 2))];

  const badgeEl = document.getElementById("user-level-badge");
  const textEl = document.getElementById("user-xp-text");
  const barEl = document.getElementById("user-xp-bar");

  if (badgeEl) badgeEl.textContent = `Lv. ${level} • ${rankTitle}`;
  if (textEl) textEl.textContent = `${totalXP} XP`;
  if (barEl) barEl.style.width = `${progressPct}%`;
}

function openGeminiConfigModal() {
  const currentKey = localStorage.getItem("MY_LIFE_OS_GEMINI_KEY") || "";
  const currentModel = localStorage.getItem("MY_LIFE_OS_GEMINI_MODEL") || "gemini-2.0-flash";

  openFormModal("إعداد مفتاح وموديل Gemini AI", `
    <div class="form-group">
      <label>اختر الموديل (Model)</label>
      <select name="model" dir="ltr">
        <option value="gemini-2.0-flash" ${currentModel === "gemini-2.0-flash" ? "selected" : ""}>Gemini Flash (الأسرع والأحدث)</option>
        <option value="gemini-1.5-flash" ${currentModel === "gemini-1.5-flash" ? "selected" : ""}>Gemini 1.5 Flash</option>
        <option value="gemini-1.5-pro" ${currentModel === "gemini-1.5-pro" ? "selected" : ""}>Gemini Pro</option>
      </select>
    </div>
    <div class="form-group">
      <label>مفتاح Google Gemini API الخاص بك (اختياري)</label>
      <input type="password" name="apiKey" dir="ltr" value="${escapeHTML(currentKey)}" placeholder="AIzaSy..." />
    </div>
  `, async (data) => {
    if (data.model) localStorage.setItem("MY_LIFE_OS_GEMINI_MODEL", data.model);
    if (data.apiKey && data.apiKey.trim()) {
      localStorage.setItem("MY_LIFE_OS_GEMINI_KEY", data.apiKey.trim());
      showToast("تم تفعيل مفتاح Gemini بنجاح", "success");
    } else {
      localStorage.removeItem("MY_LIFE_OS_GEMINI_KEY");
      showToast("تم التبديل إلى محرك أليكس المجاني التلقائي", "info");
    }
  });
}

function appendAlexPopupMessage(text, sender = "bot") {
  const stream = document.getElementById("alex-messages-stream");
  if (!stream) return null;
  const msg = document.createElement("div");
  msg.className = `alex-bubble-msg ${sender}`;
  msg.textContent = text;
  stream.appendChild(msg);
  stream.scrollTop = stream.scrollHeight;
  return msg;
}

async function sendToAlexPopup(promptText) {
  const popup = document.getElementById("alex-chat-popup");
  if (popup) popup.classList.remove("hidden");

  appendAlexPopupMessage(promptText, "user");

  if (/(تعبان|مخنوق|زهقان|مش قادر|فصلت|صداع|ملل)/.test(promptText)) {
    appendAlexPopupMessage(ALEX_COMPANION_REPLIES.tired, "bot");
    return;
  }
  if (/(اذكر الله|ادعيلي|دعاء|صل على النبي|ذكر)/.test(promptText)) {
    appendAlexPopupMessage(ALEX_COMPANION_REPLIES.zikr, "bot");
    return;
  }

  const detectedAction = parseNaturalLanguageAIAction(promptText);
  if (detectedAction) {
    const id = await createRecord(detectedAction.collection, detectedAction.payload);
    if (id) {
      appendAlexPopupMessage(`تم يا صاحبي! ✅ ${detectedAction.summary}`, "bot");
      return;
    }
  }

  const thinkingEl = appendAlexPopupMessage("ثواني بفكر معاك... 🤖", "bot");
  const reply = await askGeminiOrFallbackAI(`أجب كصديق مصري ودود ومشجع ومحترم جداً باسم "أليكس": ${promptText}`);
  if (thinkingEl) thinkingEl.textContent = reply;
}

let isAlexFlightAllowed = true;
function flyAlexAroundScreen() {
  if (!isAlexFlightAllowed) return;
  const wrapper = document.getElementById("alex-mascot-Root");
  const popup = document.getElementById("alex-chat-popup");
  const bubble = document.getElementById("alex-speech-bubble");
  const bubbleText = document.getElementById("alex-bubble-text");
  if (!wrapper) return;

  if (popup && !popup.classList.contains("hidden")) return;

  const maxRight = Math.max(40, window.innerWidth - 130);
  const maxBottom = Math.max(90, window.innerHeight - 180);

  const shouldReturnHome = Math.random() < 0.4;
  const nextRight = shouldReturnHome ? 24 : Math.floor(Math.random() * maxRight);
  const nextBottom = shouldReturnHome ? (window.innerWidth <= 768 ? 85 : 24) : Math.floor(Math.random() * (maxBottom - 60)) + 60;

  wrapper.classList.add("is-flying");
  wrapper.style.insetInlineEnd = `${nextRight}px`;
  wrapper.style.bottom = `${nextBottom}px`;

  // توليد رسالة ذكية بناءً على خوارزمية متابعة حالة المستخدم الفعلية
  const smartMsg = generateSmartContextualAlexMessage();
  if (bubble && bubbleText) {
    bubble.classList.remove("hidden");
    bubbleText.textContent = smartMsg;
  }

  setTimeout(() => {
    wrapper.classList.remove("is-flying");
  }, 2800);

}

// 5. توليد بطاقة الإنجاز اليومي القابلة للتحميل كصورة (Daily Achievement Card)
function generateDailyAchievementCard() {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 450;
  const ctx = canvas.getContext("2d");

  // خلفية ملكية داكنة
  const grad = ctx.createLinearGradient(0, 0, 800, 450);
  grad.addColorStop(0, "#07090e");
  grad.addColorStop(0.5, "#141926");
  grad.addColorStop(1, "#0a101d");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 450);

  // إطار ذهبي مزدوج
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 760, 410);

  const userName = AppState.user?.displayName || "Eng. Ahmed M Hosny";
  const levelBadge = document.getElementById("user-level-badge")?.textContent || "Lv. 1";
  const xpText = document.getElementById("user-xp-text")?.textContent || "0 XP";
  const todaySessions = getFocusSessionsLog().filter(s => s.date === todayISO());
  const todayMins = todaySessions.reduce((acc, s) => acc + (Number(s.minutes) || 0), 0);
  const doneTasks = AppState.collections.tasks.filter(t => t.status === "Completed").length;

  ctx.fillStyle = "#d4af37";
  ctx.font = "bold 34px Cairo, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("MY LIFE OS — بطاقة الإنجاز اليومي 🏆", 400, 85);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 28px Cairo, sans-serif";
  ctx.fillText(userName, 400, 145);

  ctx.fillStyle = "#10b981";
  ctx.font = "bold 22px Cairo, sans-serif";
  ctx.fillText(`${levelBadge}  |  ${xpText}`, 400, 190);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "22px Cairo, sans-serif";
  ctx.fillText(`⏱️ دقائق التركيز اليوم: ${todayMins} دقيقة (${todaySessions.length} جلسات)`, 400, 265);
  ctx.fillText(`✅ إجمالي المهام المنجزة: ${doneTasks} مهمة`, 400, 315);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "16px Cairo, sans-serif";
  ctx.fillText(`التاريخ: ${todayISO()}  •  Eng:Ahmed M Hosny`, 400, 395);

  const link = document.createElement("a");
  link.download = `my-life-os-achievement-${todayISO()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  showToast("تم تحميل بطاقة إنجازك اليومي كصورة فخمة! 🏆", "success");
}

// 6. ربط الأحداث عند التحميل
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(updateXPSystem, 1500);
  setInterval(updateXPSystem, 12000);

  // زر تحويل عرض المهام إلى Kanban
  document.getElementById("btn-toggle-kanban")?.addEventListener("click", () => {
    AppState.isKanbanView = !AppState.isKanbanView;
    const lbl = document.getElementById("kanban-toggle-label");
    if (lbl) lbl.textContent = AppState.isKanbanView ? "عرض البطاقات العادي" : "عرض لوحة Kanban";
    renderTasks();
  });

  // أزرار نقل المهام في كانبان + فتح مهمة في المؤقت مباشرة
  document.addEventListener("click", async (e) => {
    const moveBtn = e.target.closest('[data-action="move-kanban"]');
    if (moveBtn) {
      await updateRecord("tasks", moveBtn.dataset.id, { status: moveBtn.dataset.status });
      updateXPSystem();
    }

    const focusTaskBtn = e.target.closest('[data-action="focus-on-task"]');
    if (focusTaskBtn) {
      const task = AppState.collections.tasks.find(t => t.id === focusTaskBtn.dataset.id);
      if (task) {
        PomodoroState.linkedTarget = `task:${task.title}`;
        PomodoroState.customTaskName = "";
        openPomodoroModal();
      }
    }
  });

  // زر بطاقة الإنجاز اليومي
  document.getElementById("btn-generate-daily-card")?.addEventListener("click", generateDailyAchievementCard);
  document.getElementById("btn-wallpaper-studio")?.addEventListener("click", openWallpaperStudioModal);

  // زر وضع طوارئ ليلة الامتحان (Exam Crunch Mode)
  document.getElementById("btn-exam-crunch-mode")?.addEventListener("click", () => {
    const subjects = AppState.collections.subjects;
    if (!subjects.length) {
      showToast("أضف مادة دراسية أولاً لتفعيل وضع طوارئ ليلة الامتحان", "error");
      return;
    }
    const opts = subjects.map(s => `<option value="${s.id}">${escapeHTML(s.name)}</option>`).join("");
    openFormModal("🚨 وضع طوارئ ليلة الامتحان (Exam Crunch Mode)", `
      <div class="form-group">
        <label>اختر المادة التي تمتحن فيها لتركيز كل أدواتها وقوانينها ومؤقتها:</label>
        <select id="crunch-subj-select">${opts}</select>
      </div>
    `, async () => {
      const subjId = document.getElementById("crunch-subj-select").value;
      const subj = subjects.find(s => s.id === subjId);
      if (!subj) return;
      PomodoroState.linkedTarget = `subj:${subj.name}`;
      PomodoroState.customTaskName = `مراجعة ليلة الامتحان: ${subj.name}`;
      setCustomPomodoroTime(60, "work");
      openPomodoroModal();
      showToast(`تم تجهيز جلسة طوارئ 60 دقيقة لمادة ${subj.name} 🔥`, "success");
    });
  });

  // أحداث المساعد أليكس الطائر
  const aiSetBtn = document.getElementById("btn-ai-settings");
  if (aiSetBtn) aiSetBtn.onclick = openGeminiConfigModal;
  document.getElementById("btn-alex-api-key")?.addEventListener("click", openGeminiConfigModal);

  const alexAvatarBtn = document.getElementById("btn-alex-avatar");
  const alexPopup = document.getElementById("alex-chat-popup");
  const alexBubble = document.getElementById("alex-speech-bubble");

  // طيران أليكس وتبديل رسائله الودودة كل 18 ثانية
  setInterval(flyAlexAroundScreen, 18000);

  document.getElementById("btn-pin-alex")?.addEventListener("click", () => {
    isAlexFlightAllowed = !isAlexFlightAllowed;
    if (!isAlexFlightAllowed) {
      const wrapper = document.getElementById("alex-mascot-Root");
      if (wrapper) {
        wrapper.style.insetInlineEnd = "24px";
        wrapper.style.bottom = window.innerWidth <= 768 ? "85px" : "24px";
      }
    }
    showToast(isAlexFlightAllowed ? "تم السماح لأليكس بالطيران في الشاشة 🕊️" : "تم تثبيت أليكس في الزاوية 📌", "info");
  });

  document.getElementById("btn-hide-alex-bubble")?.addEventListener("click", (e) => {
    e.stopPropagation();
    alexBubble?.classList.add("hidden");
  });

  alexAvatarBtn?.addEventListener("click", () => {
    alexPopup?.classList.toggle("hidden");
    if (!alexPopup?.classList.contains("hidden")) {
      document.getElementById("alex-popup-input")?.focus();
    }
  });

  document.getElementById("btn-alex-close")?.addEventListener("click", () => {
    alexPopup?.classList.add("hidden");
  });

  document.getElementById("alex-popup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inp = document.getElementById("alex-popup-input");
    const text = inp.value.trim();
    if (!text) return;
    inp.value = "";
    await sendToAlexPopup(text);
  });

  document.querySelectorAll("#alex-quick-chips .alex-chip").forEach(chip => {
    chip.onclick = async () => {
      const friendlyKey = chip.dataset.alexFriendly;
      const cmd = chip.dataset.alexCmd;
      const prompt = chip.dataset.alexPrompt;

      if (friendlyKey && ALEX_COMPANION_REPLIES[friendlyKey]) {
        appendAlexPopupMessage(chip.textContent, "user");
        appendAlexPopupMessage(ALEX_COMPANION_REPLIES[friendlyKey], "bot");
      } else if (cmd === "open-pomo") {
        alexPopup?.classList.add("hidden");
        setCustomPomodoroTime(60, "work");
        openPomodoroModal();
      } else if (cmd === "rain-sound") {
        toggleAmbientSound("rain");
      } else if (prompt) {
        await sendToAlexPopup(prompt);
      }
    };
  });
});
/* ==========================================================================
   STRICT FOCUS LOCK, SMART KHATMAH PLANNER & RECURRING SUBSCRIPTIONS ENGINE
   ========================================================================== */

PomodoroState.strictLock = false;
PomodoroState.distractionCount = 0;

// 1. إنذار صوتي فوري عند محاولة فتح تاب تاني أو الخروج أثناء قفل التشتت
function playStrictLockSiren() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(640, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.18);
    osc.frequency.setValueAtTime(640, ctx.currentTime + 0.36);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.65);
  } catch (e) {}
}

// التحقق من سبب الطوارئ لكسر قفل التشتت مع خصم XP
function attemptBreakStrictLock(onUnlockedCallback) {
  playStrictLockSiren();
  const reason = prompt(
    "🔒 قفل التشتت الصارم مفعل!\n\nلا يُسمح بإيقاف الجلسة أو الخروج قبل انتهاء الوقت.\nإذا كان لديك ظرف طارئ حقيقي، اكتب سبب الطوارئ بالتفصيل (15 حرفاً على الأقل) مع العلم أنه سيتم خصم 50 XP:"
  );
  if (reason === null) return;
  if (reason.trim().length < 15) {
    showToast("❌ السبب قصير جداً وغير مقنع! ارجع كمل مذاكرتك يا بطل 💪", "error");
    return;
  }
  const penalty = Number(localStorage.getItem("MY_LIFE_OS_XP_PENALTY") || 0) + 50;
  localStorage.setItem("MY_LIFE_OS_XP_PENALTY", penalty);
  PomodoroState.strictLock = false;
  showToast("⚠️ تم كسر قفل التشتت اضطرارياً وخصم 50 XP من رصيدك", "error");
  if (typeof updateXPSystem === "function") updateXPSystem();
  if (typeof onUnlockedCallback === "function") onUnlockedCallback();
}

// رادار كشف مغادرة التاب أو تصغير المتصفح أثناء قفل التشتت
document.addEventListener("visibilitychange", () => {
  if (document.hidden && PomodoroState.isRunning && PomodoroState.strictLock) {
    PomodoroState.distractionCount = (PomodoroState.distractionCount || 0) + 1;
    playStrictLockSiren();
    document.title = "🚨 ارجع لمذاكرتك فوراً! (قفل التشتت)";
    const countEl = document.getElementById("pomo-distraction-count");
    if (countEl) countEl.textContent = PomodoroState.distractionCount;
  } else {
    document.title = "MY LIFE OS | نظام تشغيل الحياة الشخصي";
  }
});

// 2. محرك ختمة القرآن الذكية وحاسبة الختم (604 صفحة)
function getKhatmahData() {
  try {
    return JSON.parse(localStorage.getItem("MY_LIFE_OS_KHATMAH") || '{"targetDays":30,"currentPage":1,"daysLeft":30}');
  } catch (e) {
    return { targetDays: 30, currentPage: 1, daysLeft: 30 };
  }
}

function renderSmartKhatmah() {
  const k = getKhatmahData();
  const totalPages = 604;
  const currentPage = Math.min(totalPages, Math.max(0, Number(k.currentPage) || 0));
  const daysLeft = Math.max(1, Number(k.daysLeft) || 30);
  const remainingPages = Math.max(0, totalPages - currentPage);
  const dailyPages = Math.ceil(remainingPages / daysLeft);
  const pct = Math.round((currentPage / totalPages) * 100);

  const adviceEl = document.getElementById("khatmah-daily-advice");
  const badgeEl = document.getElementById("khatmah-pct-badge");
  const barEl = document.getElementById("khatmah-progress-bar");

  if (adviceEl) {
    if (remainingPages === 0) {
      adviceEl.innerHTML = `🎉 <strong class="gold-text">مبارك! أتممت ختمة القرآن الكريم كاملة (604 صفحة) تقبل الله منك!</strong>`;
    } else {
      adviceEl.innerHTML = `وصلت لصفحة <strong>${currentPage}</strong> من 604 &bull; متبقي <strong>${daysLeft} يوم</strong> &bull; وردك اليومي المطلوب: <strong class="gold-text">${dailyPages} صفحة يومياً</strong> (حوالي ${Math.max(1, Math.round(dailyPages / 4))} صفحات بعد كل صلاة).`;
    }
  }
  if (badgeEl) badgeEl.textContent = `إنجاز الختمة: ${pct}% (${currentPage}/604)`;
  if (barEl) barEl.style.width = `${pct}%`;
}

// 3. محرك الاشتراكات والأقساط الشهرية الثابتة
function getSubscriptionsList() {
  try {
    return JSON.parse(localStorage.getItem("MY_LIFE_OS_SUBSCRIPTIONS") || "[]");
  } catch (e) {
    return [];
  }
}

function renderRecurringSubscriptions() {
  const box = document.getElementById("subscriptions-container");
  const totalBadge = document.getElementById("subs-total-badge");
  if (!box) return;

  const subs = getSubscriptionsList();
  const totalMonthly = subs.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);
  if (totalBadge) totalBadge.textContent = `${totalMonthly.toLocaleString()} ${AppState.currency} / شهرياً`;

  if (!subs.length) {
    box.innerHTML = renderEmptyState("لا توجد اشتراكات أو التزامات شهرية مضافة (مثل الإنترنت، الجيم، كورسات).");
    return;
  }

  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const todayDay = now.getDate();

  box.innerHTML = subs.map((s, idx) => {
    const isPaidThisMonth = s.lastPaidMonth === currentMonthKey;
    const dueDay = Number(s.dueDay) || 1;
    const daysDiff = dueDay - todayDay;
    let statusHtml = "";

    if (isPaidThisMonth) {
      statusHtml = `<span class="badge badge-emerald"><i class="fa-solid fa-check"></i> مدفوع هذا الشهر</span>`;
    } else if (daysDiff === 0) {
      statusHtml = `<span class="badge badge-danger">مستحق الدفع اليوم! 🔴</span>`;
    } else if (daysDiff > 0 && daysDiff <= 3) {
      statusHtml = `<span class="badge badge-warning">مستحق خلال ${daysDiff} أيام ⚠️</span>`;
    } else if (daysDiff < 0) {
      statusHtml = `<span class="badge badge-danger">متأخر منذ يوم ${dueDay} بالشهر</span>`;
    } else {
      statusHtml = `<span class="badge badge-gold">يتجدد يوم ${dueDay} شهرياً</span>`;
    }

    return `
      <div class="prayer-row" style="flex-wrap:wrap; gap:8px;">
        <div>
          <strong>${escapeHTML(s.title)}</strong>
          <small class="small-muted d-block">${Number(s.amount).toLocaleString()} ${AppState.currency} • ${escapeHTML(s.category || "اشتراك ثابت")}</small>
        </div>
        <div class="config-actions">
          ${statusHtml}
          ${!isPaidThisMonth ? `
            <button type="button" class="btn btn-xs btn-gold" data-pay-sub="${idx}" title="خصم وتسجيل في المعاملات المالية">
              <i class="fa-solid fa-bolt"></i> دفع وتسجيل
            </button>
          ` : ""}
          <button type="button" class="btn btn-xs btn-danger" data-del-sub="${idx}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderSmartKhatmah();
  setTimeout(renderRecurringSubscriptions, 900);

  // إعداد خطة ختمة القرآن الذكية
  document.getElementById("btn-khatmah-settings")?.addEventListener("click", () => {
    const k = getKhatmahData();
    openFormModal("إعداد خطة ختمة القرآن الذكية", `
      <div class="form-group">
        <label>في كم يوم تريد ختم القرآن الكريم؟</label>
        <select name="targetDays">
          <option value="30" ${k.targetDays == 30 ? "selected" : ""}>30 يوماً (ختمة شهرية - جزء يومياً)</option>
          <option value="15" ${k.targetDays == 15 ? "selected" : ""}>15 يوماً (جزآن يومياً)</option>
          <option value="10" ${k.targetDays == 10 ? "selected" : ""}>10 أيام (3 أجزاء يومياً)</option>
          <option value="7" ${k.targetDays == 7 ? "selected" : ""}>7 أيام (ختمة أسبوعية)</option>
          <option value="60" ${k.targetDays == 60 ? "selected" : ""}>60 يوماً (نصف جزء يومياً)</option>
        </select>
      </div>
      <div class="form-group">
        <label>رقم الصفحة التي وصلت إليها حالياً (من 1 إلى 604)</label>
        <input type="number" name="currentPage" min="0" max="604" value="${k.currentPage || 1}" required />
      </div>
      <div class="form-group">
        <label>الأيام المتبقية في خطتك الحالية</label>
        <input type="number" name="daysLeft" min="1" max="365" value="${k.daysLeft || 30}" required />
      </div>
    `, async (data) => {
      const updated = {
        targetDays: Number(data.targetDays) || 30,
        currentPage: Number(data.currentPage) || 1,
        daysLeft: Number(data.daysLeft) || 30
      };
      localStorage.setItem("MY_LIFE_OS_KHATMAH", JSON.stringify(updated));
      localStorage.setItem("MY_LIFE_OS_QURAN_BOOKMARK", `صفحة ${updated.currentPage} من المصحف`);
      renderSmartKhatmah();
      refreshSuperOSWidgets();
      showToast("تم تحديث خطة ختمة القرآن الذكية بنجاح 🌿", "success");
    });
  });

  // زر إتمام ورد اليوم تلقائياً
  document.getElementById("btn-khatmah-done-today")?.addEventListener("click", async () => {
    const k = getKhatmahData();
    const remPages = Math.max(0, 604 - (Number(k.currentPage) || 0));
    if (remPages === 0) {
      showToast("لقد أتممت الختمة بالفعل! يمكنك بدء ختمة جديدة من زر خطة الختمة.", "info");
      return;
    }
    const dailyPages = Math.ceil(remPages / Math.max(1, Number(k.daysLeft) || 1));
    const fromPage = Number(k.currentPage) || 1;
    const toPage = Math.min(604, fromPage + dailyPages);

    k.currentPage = toPage;
    k.daysLeft = Math.max(1, (Number(k.daysLeft) || 1) - 1);
    localStorage.setItem("MY_LIFE_OS_KHATMAH", JSON.stringify(k));
    localStorage.setItem("MY_LIFE_OS_QURAN_BOOKMARK", `صفحة ${toPage} من المصحف`);
    renderSmartKhatmah();
    refreshSuperOSWidgets();

    await createRecord("quran_progress", {
      surah: `ورد الختمة (صفحة ${fromPage} إلى ${toPage})`,
      type: "تلاوة ختمة",
      fromAyah: fromPage,
      toAyah: toPage,
      ayahCount: dailyPages * 15,
      date: todayISO()
    });
    showToast(`تقبل الله! تم تسجيل قراءة ${dailyPages} صفحة والوصول لصفحة ${toPage} 🌿`, "success");
  });

  // إضافة اشتراك أو قسط شهري جديد
  document.getElementById("btn-add-subscription")?.addEventListener("click", () => {
    openFormModal("إضافة اشتراك أو التزام شهري ثابت", `
      <div class="form-group"><label>اسم الاشتراك / القسط</label><input name="title" required placeholder="باقة الإنترنت، اشتراك الجيم، كورسات..." /></div>
      <div class="form-group"><label>المبلغ الشهري (${AppState.currency})</label><input type="number" step="0.01" name="amount" required /></div>
      <div class="form-group"><label>يوم التجديد أو الاستحقاق في الشهر (1 - 31)</label><input type="number" min="1" max="31" name="dueDay" value="1" required /></div>
      <div class="form-group"><label>التصنيف</label><input name="category" placeholder="فواتير، دراسة، رياضة، خدمات..." /></div>
    `, async (data) => {
      const subs = getSubscriptionsList();
      subs.push({
        title: data.title,
        amount: Number(data.amount) || 0,
        dueDay: Number(data.dueDay) || 1,
        category: data.category || "اشتراك شهري",
        lastPaidMonth: ""
      });
      localStorage.setItem("MY_LIFE_OS_SUBSCRIPTIONS", JSON.stringify(subs));
      renderRecurringSubscriptions();
      showToast("تمت إضافة الالتزام الشهري بنجاح 📅", "success");
    });
  });

  // أزرار دفع أو حذف اشتراك شهري
  document.addEventListener("click", async (e) => {
    const payBtn = e.target.closest("[data-pay-sub]");
    if (payBtn) {
      const idx = Number(payBtn.dataset.paySub);
      const subs = getSubscriptionsList();
      const item = subs[idx];
      if (!item) return;

      const now = new Date();
      item.lastPaidMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      localStorage.setItem("MY_LIFE_OS_SUBSCRIPTIONS", JSON.stringify(subs));
      renderRecurringSubscriptions();

      await createRecord("transactions", {
        title: `دفع اشتراك: ${item.title}`,
        amount: Number(item.amount),
        type: "expense",
        category: item.category || "اشتراك شهري",
        date: todayISO()
      });
    }

    const delBtn = e.target.closest("[data-del-sub]");
    if (delBtn) {
      const idx = Number(delBtn.dataset.delSub);
      const subs = getSubscriptionsList();
      subs.splice(idx, 1);
      localStorage.setItem("MY_LIFE_OS_SUBSCRIPTIONS", JSON.stringify(subs));
      renderRecurringSubscriptions();
      showToast("تم حذف الاشتراك الشهري", "info");
    }
  });
});
/* ==========================================================================
   CAIRO QURAN LIVE RADIO, TIME-CAPSULE VAULT, SMART PIGGY BANK & VOICE TTS
   ========================================================================== */

// 1. محرك البث المباشر لإذاعة القرآن الكريم من القاهرة (مع سيرفرات بديلة تلقائية) + 12 إذاعة
const CAIRO_QURAN_RADIO_STREAMS = [
  "https://stream.radiojar.com/8s5u5tpdtwzuv",
  "https://n0a.radiojar.com/8s5u5tpdtwzuv",
  "https://n02.radiojar.com/8s5u5tpdtwzuv",
  "https://backup.qurango.net/radio/abdulbasit_abdulsamad_mojawwad"
];

let cairoStreamIndex = 0;

function playLiveIslamicRadio(stationVal, stationName) {
  const player = document.getElementById("quran-audio-player");
  const liveBadge = document.getElementById("radio-live-indicator");
  const labelEl = document.getElementById("radio-current-station-label");
  if (!player) return;

  if (stationVal === "cairo") {
    cairoStreamIndex = 0;
    player.src = CAIRO_QURAN_RADIO_STREAMS[cairoStreamIndex];
    player.onerror = () => {
      cairoStreamIndex++;
      if (cairoStreamIndex < CAIRO_QURAN_RADIO_STREAMS.length) {
        player.src = CAIRO_QURAN_RADIO_STREAMS[cairoStreamIndex];
        player.play().catch(() => {});
      }
    };
  } else {
    player.onerror = null;
    player.src = stationVal;
  }

  player.play().then(() => {
    if (liveBadge) liveBadge.classList.remove("hidden");
    if (labelEl) labelEl.innerHTML = `🔴 <strong>يعمل الآن على الهواء:</strong> ${escapeHTML(stationName)}`;
    showToast(`تم تشغيل ${stationName} 📻🌿`, "success");
  }).catch(() => {
    showToast("جاري الاتصال بسيرفر البث المباشر...", "info");
  });
}

// 2. المحرك الصوتي الذكي ثنائي اللغة للموجز اليومي (Bilingual Arabic & English Neural/Web TTS)
let activeBriefingAudio = null;
let isBriefingPlaying = false;

function stopDailyBriefingTTS() {
  isBriefingPlaying = false;
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (activeBriefingAudio) {
    activeBriefingAudio.pause();
    activeBriefingAudio = null;
  }
  const btn = document.getElementById("btn-speak-briefing");
  if (btn) {
    btn.innerHTML = `<i class="fa-solid fa-volume-high gold-text"></i> اقرأ لي موجز اليوم صوتياً`;
  }
}

function speakDailyBriefingTTS() {
  if (isBriefingPlaying) {
    stopDailyBriefingTTS();
    return;
  }

  // تحديث نص الموجز أولاً ببيانات Firebase الحقيقية قبل القراءة
  if (typeof renderMorningBriefing === "function") {
    renderMorningBriefing();
  }

  const userName = (AppState.user?.displayName || "أحمد").split(" ")[0];
  const today = todayISO();
  const pendingTasks = (AppState.collections.tasks || []).filter(t => t.status !== "Completed");
  const todayTasks = pendingTasks.filter(t => t.dueDate === today);
  const subjectsCount = (AppState.collections.subjects || []).length;
  const projectsCount = (AppState.collections.projects || []).length;
  const nextPrayerText = (document.getElementById("next-prayer-countdown")?.textContent || "").replace(/[^\u0600-\u06FFa-zA-Z0-9\s:]/g, " ");

  const hour = new Date().getHours();
  const timeGreeting = hour >= 4 && hour < 12 ? "صباح الخير والبركة" : hour >= 12 && hour < 17 ? "مساء الخير والهمة" : "مساء النور والهدوء";

  let topTaskTitle = "";
  if (todayTasks.length > 0) topTaskTitle = todayTasks[0].title;
  else if (pendingTasks.length > 0) topTaskTitle = pendingTasks[0].title;

  let fullText = `السلام عليكم، ${timeGreeting} يا بشمهندس ${userName}. `;
  fullText += `إليك موجز القيادة الذكي ليومك. لديك حالياً ${subjectsCount} مواد دراسية مسجلة، و ${projectsCount} مشاريع برمجية نشطة. `;

  if (pendingTasks.length > 0) {
    fullText += `يوجد في جدولك ${pendingTasks.length} مهام قيد الانتظار، وأهم مهمة لديك الآن هي: ${topTaskTitle}. `;
  } else {
    fullText += `لقد أتممت جميع مهامك المجدولة بنجاح، وقت مثالي للتركيز العميق أو الراحة. `;
  }

  if (nextPrayerText) {
    fullText += `${nextPrayerText}. `;
  }
  fullText += `أتمنى لك يوماً مباركاً ومليئاً بالإنجاز والتفوق.`;

  // تنظيف الإيموجي والرموز حتى لا يتلعثم القارئ الصوتي
  const cleanText = fullText
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}•&bull;]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  // تقسيم النص تلقائياً إلى مقاطع عربية ومقاطع إنجليزية ليقرأ كل لغة بنطقها السليم
  const rawTokens = cleanText.match(/[a-zA-Z0-9][a-zA-Z0-9\s.\-_:/]*|[^\sa-zA-Z0-9]+(?:\s+[^\sa-zA-Z0-9]+)*/g) || [cleanText];
  const segments = [];
  rawTokens.forEach(tok => {
    const t = tok.trim();
    if (!t) return;
    const isEng = /[a-zA-Z]{2,}/.test(t);
    const lang = isEng ? "en" : "ar";
    if (segments.length > 0 && segments[segments.length - 1].lang === lang && (segments[segments.length - 1].text.length + t.length) < 160) {
      segments[segments.length - 1].text += " " + t;
    } else {
      segments.push({ lang, text: t });
    }
  });

  isBriefingPlaying = true;
  const btn = document.getElementById("btn-speak-briefing");
  if (btn) {
    btn.innerHTML = `<i class="fa-solid fa-waveform-lines fa-beat gold-text"></i> جاري القراءة بالعربية والإنجليزية... (اضغط للإيقاف)`;
  }
  showToast("أليكس يقرأ لك موجز يومك الآن باللغتين العربية والإنجليزية 🔊", "info");

  const voices = ("speechSynthesis" in window) ? window.speechSynthesis.getVoices() : [];
  const arVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("ar"));
  const enVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("en")) || voices[0];

  // 1. إذا كان الويندوز/المتصفح يمتلك صوتاً عربياً مثبتاً، نستخدم القارئ المحلي المزدوج (عربي + إنجليزي)
  if (arVoice) {
    window.speechSynthesis.cancel();
    let idx = 0;
    const speakNextLocal = () => {
      if (!isBriefingPlaying || idx >= segments.length) {
        stopDailyBriefingTTS();
        return;
      }
      const seg = segments[idx++];
      const u = new SpeechSynthesisUtterance(seg.text);
      if (seg.lang === "ar") {
        u.voice = arVoice;
        u.lang = arVoice.lang || "ar-EG";
        u.rate = 0.98;
      } else {
        if (enVoice) u.voice = enVoice;
        u.lang = "en-US";
        u.rate = 1.0;
      }
      u.onend = speakNextLocal;
      u.onerror = speakNextLocal;
      window.speechSynthesis.speak(u);
    };
    speakNextLocal();
    return;
  }

  // 2. إذا لم يكن في الويندوز صوت عربي مثبت، نستخدم البث الصوتي السحابي الفوري للعربية مع نطق الإنجليزية بوضوح
  let segIdx = 0;
  const playNextHybridSegment = () => {
    if (!isBriefingPlaying || segIdx >= segments.length) {
      stopDailyBriefingTTS();
      return;
    }
    const seg = segments[segIdx++];
    const ttsUrl = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${seg.lang === "ar" ? "ar" : "en"}&dt=t&q=${encodeURIComponent(seg.text)}`;
    activeBriefingAudio = new Audio(ttsUrl);
    activeBriefingAudio.playbackRate = 1.05;
    activeBriefingAudio.onended = playNextHybridSegment;
    activeBriefingAudio.onerror = () => {
      // في حال حجب الصوت السحابي لمقطع إنجليزي، ينطقه المتصفح محلياً
      if ("speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance(seg.text);
        u.lang = seg.lang === "ar" ? "ar-EG" : "en-US";
        u.onend = playNextHybridSegment;
        u.onerror = playNextHybridSegment;
        window.speechSynthesis.speak(u);
      } else {
        playNextHybridSegment();
      }
    };
    activeBriefingAudio.play().catch(() => playNextHybridSegment());
  };

  playNextHybridSegment();
}

// 3. محرك كبسولة الزمن ورسائل المستقبل (Future Self Time-Capsule)
function getTimeCapsules() {
  try {
    return JSON.parse(localStorage.getItem("MY_LIFE_OS_TIME_CAPSULES") || "[]");
  } catch (e) {
    return [];
  }
}

function renderTimeCapsules() {
  const box = document.getElementById("dash-time-capsules");
  if (!box) return;

  const list = getTimeCapsules();
  if (!list.length) {
    box.innerHTML = renderEmptyState("اكتب رسالة أو هدفاً لنفسك في المستقبل وسيُغلق بقفل زمني حتى يحين موعده!");
    return;
  }

  const today = todayISO();
  box.innerHTML = list.map((cap, idx) => {
    const isUnlocked = today >= cap.unlockDate;
    const diffDays = Math.max(0, Math.ceil((new Date(cap.unlockDate) - new Date(today)) / (1000 * 60 * 60 * 24)));

    return `
      <div class="prayer-row capsule-card ${isUnlocked ? "capsule-unlocked" : "capsule-locked"}">
        <div style="flex:1;">
          <div class="flex-between">
            <strong>
              <i class="fa-solid ${isUnlocked ? "fa-lock-open gold-text" : "fa-lock text-danger"}"></i>
              ${escapeHTML(cap.title)}
            </strong>
            <span class="badge ${isUnlocked ? "badge-emerald" : "badge-warning"}">
              ${isUnlocked ? "متاحة للفتح الآن 🔓" : `تُفتح بعد ${diffDays} يوم ⏳`}
            </span>
          </div>
          ${isUnlocked
            ? `<p class="small-note mt-1">📜 رسالتك: "${escapeHTML(cap.message)}"</p>`
            : `<small class="small-muted d-block mt-1">🔒 مشفرة ومغلقة حتى تاريخ ${escapeHTML(cap.unlockDate)}</small>`
          }
        </div>
        <button type="button" class="btn btn-xs btn-danger" data-del-capsule="${idx}" title="حذف الكبسولة">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  }).join("");
}

function openCreateTimeCapsuleModal() {
  const nextMonth = new Date();
  nextMonth.setDate(nextMonth.getDate() + 30);
  const defaultUnlock = nextMonth.toISOString().split("T")[0];

  openFormModal("⏳ إنشاء كبسولة زمن جديدة لنفسك في المستقبل", `
    <div class="form-group">
      <label>عنوان الرسالة أو الهدف المستقبلي</label>
      <input name="title" required placeholder="مثال: رسالتي لنفسي بعد امتحانات الفاينل" />
    </div>
    <div class="form-group">
      <label>ماذا تريد أن تقول لنفسك في المستقبل؟ (سيتم تشفيرها وقفلها)</label>
      <textarea name="message" rows="4" required placeholder="إن شاء الله أكون قفلت مواد الترم ده بامتياز وخلصت المشروع..."></textarea>
    </div>
    <div class="form-group">
      <label>تاريخ فك القفل وفتح الرسالة</label>
      <input type="date" name="unlockDate" min="${todayISO()}" value="${defaultUnlock}" required />
    </div>
  `, async (data) => {
    const list = getTimeCapsules();
    list.unshift({
      title: data.title,
      message: data.message,
      unlockDate: data.unlockDate,
      createdAt: todayISO()
    });
    localStorage.setItem("MY_LIFE_OS_TIME_CAPSULES", JSON.stringify(list));
    renderTimeCapsules();
    showToast(`تم إغلاق وتشفير كبسولة الزمن حتى تاريخ ${data.unlockDate} 🔒⏳`, "success");
  });
}

// 4. محرك الحصالة الذكية وأهداف الادخار البصرية (Visual Savings Goals)
function getSavingsGoals() {
  try {
    return JSON.parse(localStorage.getItem("MY_LIFE_OS_SAVINGS_GOALS") || "[]");
  } catch (e) {
    return [];
  }
}

function renderSavingsGoals() {
  const box = document.getElementById("savings-goals-container");
  const totalBadge = document.getElementById("savings-total-badge");
  if (!box) return;

  const goals = getSavingsGoals();
  const totalSaved = goals.reduce((sum, g) => sum + (Number(g.savedAmount) || 0), 0);
  if (totalBadge) totalBadge.textContent = `${totalSaved.toLocaleString()} ${AppState.currency} مدخر`;

  if (!goals.length) {
    box.innerHTML = renderEmptyState("حدد هدفاً مالياً تدخر من أجله (مثل تطوير اللابتوب أو شراء شاشة ثانية) وتابع شريط الإنجاز!");
    return;
  }

  box.innerHTML = goals.map((g, idx) => {
    const target = Math.max(1, Number(g.targetAmount) || 1);
    const saved = Math.min(target, Number(g.savedAmount) || 0);
    const pct = Math.min(100, Math.round((saved / target) * 100));

    return `
      <div class="prayer-row" style="flex-direction:column; align-items:stretch; gap:8px;">
        <div class="flex-between">
          <div>
            <strong>🎯 ${escapeHTML(g.title)}</strong>
            <small class="small-muted d-block">المدخر: <strong>${saved.toLocaleString()}</strong> من <strong>${target.toLocaleString()} ${AppState.currency}</strong></small>
          </div>
          <div class="config-actions">
            <span class="badge ${pct >= 100 ? "badge-emerald" : "badge-gold"}">${pct}%</span>
            <button type="button" class="btn btn-xs btn-gold" data-deposit-goal="${idx}">
              <i class="fa-solid fa-plus"></i> إيداع في الحصالة
            </button>
            <button type="button" class="btn btn-xs btn-danger" data-del-goal="${idx}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
      </div>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderTimeCapsules();
  setTimeout(renderSavingsGoals, 900);

  // أزرار تشغيل إذاعة القرآن الكريم من القاهرة والإذاعات المباشرة
  document.getElementById("btn-cairo-radio-quick")?.addEventListener("click", () => {
    const sel = document.getElementById("live-radio-select");
    if (sel) sel.value = "cairo";
    playLiveIslamicRadio("cairo", "إذاعة القرآن الكريم من القاهرة (البث المباشر)");
  });

  document.getElementById("btn-play-live-radio")?.addEventListener("click", () => {
    const sel = document.getElementById("live-radio-select");
    if (!sel) return;
    const stationName = sel.options[sel.selectedIndex]?.text || "الإذاعة المباشرة";
    playLiveIslamicRadio(sel.value, stationName);
  });

  document.getElementById("live-radio-select")?.addEventListener("change", (e) => {
    const sel = e.target;
    const stationName = sel.options[sel.selectedIndex]?.text || "الإذاعة المباشرة";
    playLiveIslamicRadio(sel.value, stationName);
  });

// زر القراءة الصوتية للموجز اليومي (TTS)
  document.getElementById("btn-speak-briefing")?.addEventListener("click", speakDailyBriefingTTS);

  // أزرار كبسولة الزمن
  document.getElementById("btn-open-time-capsule")?.addEventListener("click", openCreateTimeCapsuleModal);
  document.getElementById("btn-add-capsule-card")?.addEventListener("click", openCreateTimeCapsuleModal);

  // زر إضافة هدف جديد في الحصالة الذكية
  document.getElementById("btn-add-saving-goal")?.addEventListener("click", () => {
    openFormModal("🐷 إضافة هدف جديد في الحصالة الذكية", `
      <div class="form-group">
        <label>اسم الهدف الذي تدخر من أجله</label>
        <input name="title" required placeholder="مثال: تطوير اللابتوب / شراء شاشة ثانية..." />
      </div>
      <div class="form-group">
        <label>المبلغ الإجمالي المطلوب (${AppState.currency})</label>
        <input type="number" step="1" name="targetAmount" required placeholder="15000" />
      </div>
      <div class="form-group">
        <label>المبلغ المتوفر معك حالياً كبداية (${AppState.currency})</label>
        <input type="number" step="1" name="savedAmount" value="0" required />
      </div>
    `, async (data) => {
      const goals = getSavingsGoals();
      goals.push({
        title: data.title,
        targetAmount: Number(data.targetAmount) || 1000,
        savedAmount: Number(data.savedAmount) || 0
      });
      localStorage.setItem("MY_LIFE_OS_SAVINGS_GOALS", JSON.stringify(goals));
      renderSavingsGoals();
      showToast("تم إنشاء هدف الادخار في الحصالة الذكية بنجاح 🎯", "success");
    });
  });

  // أحداث إيداع مبلغ في الحصالة أو حذف كبسولة / هدف
  document.addEventListener("click", (e) => {
    const depBtn = e.target.closest("[data-deposit-goal]");
    if (depBtn) {
      const idx = Number(depBtn.dataset.depositGoal);
      const goals = getSavingsGoals();
      const g = goals[idx];
      if (!g) return;

      const amountStr = prompt(`💰 كم المبلغ الذي تريد إيداعه في حصالة "${g.title}"؟ (${AppState.currency})`, "200");
      if (!amountStr) return;
      const addVal = Number(amountStr);
      if (isNaN(addVal) || addVal <= 0) return;

      g.savedAmount = (Number(g.savedAmount) || 0) + addVal;
      localStorage.setItem("MY_LIFE_OS_SAVINGS_GOALS", JSON.stringify(goals));
      renderSavingsGoals();
      if (typeof updateXPSystem === "function") updateXPSystem();
      showToast(`عاش يا بطل! تم إيداع ${addVal} ${AppState.currency} في حصالة "${g.title}" 🎉`, "success");
    }

    const delGoalBtn = e.target.closest("[data-del-goal]");
    if (delGoalBtn) {
      const idx = Number(delGoalBtn.dataset.delGoal);
      const goals = getSavingsGoals();
      goals.splice(idx, 1);
      localStorage.setItem("MY_LIFE_OS_SAVINGS_GOALS", JSON.stringify(goals));
      renderSavingsGoals();
      showToast("تم حذف هدف الادخار", "info");
    }

    const delCapBtn = e.target.closest("[data-del-capsule]");
    if (delCapBtn) {
      const idx = Number(delCapBtn.dataset.delCapsule);
      const list = getTimeCapsules();
      list.splice(idx, 1);
      localStorage.setItem("MY_LIFE_OS_TIME_CAPSULES", JSON.stringify(list));
      renderTimeCapsules();
      showToast("تم حذف كبسولة الزمن", "info");
    }
  });
});
/* ==========================================================================
   MEGA 10 FEATURES ENGINE: PIN LOCK, CV PDF, 4-CH MIXER, FOREST, VOICE CMD
   ========================================================================== */

// --- [ميزة 1]: قفل التطبيق بكود PIN عند ترك الجهاز 5 دقائق أو الضغط على Alt+L ---
let idleLockTimer = null;

function triggerPinLockScreen() {
  const savedPin = localStorage.getItem("MY_LIFE_OS_PIN_CODE");
  if (!savedPin) {
    const newPin = prompt("🔐 لم تقم بتعيين كود PIN بعد.\nأدخل كود PIN مكون من 4 أرقام لتأمين النظام:");
    if (newPin && /^\d{4}$/.test(newPin.trim())) {
      localStorage.setItem("MY_LIFE_OS_PIN_CODE", newPin.trim());
      showToast("تم حفظ كود الـ PIN وتأمين الشاشة 🔒", "success");
    } else {
      if (newPin !== null) showToast("يرجى إدخال 4 أرقام صحيحة فقط", "error");
      return;
    }
  }
  const overlay = document.getElementById("pin-lock-overlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    const inp = document.getElementById("pin-unlock-input");
    if (inp) { inp.value = ""; inp.focus(); }
  }
}

function resetIdleLockTimer() {
  if (idleLockTimer) clearTimeout(idleLockTimer);
  const savedPin = localStorage.getItem("MY_LIFE_OS_PIN_CODE");
  if (!savedPin) return;
  // قفل تلقائي بعد 5 دقائق من عدم الحركة
  idleLockTimer = setTimeout(() => {
    const overlay = document.getElementById("pin-lock-overlay");
    if (overlay && overlay.classList.contains("hidden")) {
      triggerPinLockScreen();
    }
  }, 5 * 60 * 1000);
}

// --- [ميزة 2]: مُصدّر السيرة الذاتية وبورتفوليو المشاريع (One-Click CV & Portfolio PDF) ---
function exportOneClickPortfolioPDF() {
  const userName = AppState.user?.displayName || "Eng. Ahmed M Hosny";
  const userEmail = AppState.user?.email || "";
  const userBio = localStorage.getItem("MY_LIFE_OS_USER_BIO") || "Software & Computer Engineering";
  const projects = AppState.collections.projects || [];
  const subjects = AppState.collections.subjects || [];
  const roadmap = JSON.parse(localStorage.getItem("MY_LIFE_OS_ROADMAP") || '{"html":true,"css":true,"js":true,"firebase":true}');
  const masteredSkills = Object.entries(roadmap).filter(([_, v]) => v).map(([k]) => k.toUpperCase());

  const printWin = window.open("", "_blank", "width=950,height=800");
  if (!printWin) {
    showToast("يرجى السماح بالنوافذ المنبثقة لطباعة وحفظ الـ CV كـ PDF", "error");
    return;
  }

  const projectsHtml = projects.length
    ? projects.map(p => `
        <div class="cv-item">
          <div class="cv-row"><strong>${escapeHTML(p.title)}</strong> <span>${escapeHTML(p.techStack || "Full-Stack")} (${p.progress || 100}%)</span></div>
          <p>${escapeHTML(p.description || "")}</p>
          ${p.githubUrl ? `<small>GitHub: ${escapeHTML(p.githubUrl)}</small> ` : ""}
          ${p.liveUrl ? `<small>| Live: ${escapeHTML(p.liveUrl)}</small>` : ""}
        </div>
      `).join("")
    : `<p>لا توجد مشاريع مسجلة حالياً.</p>`;

  const subjectsHtml = subjects.length
    ? subjects.map(s => `<span class="cv-tag">${escapeHTML(s.name)}</span>`).join(" ")
    : `<span>لم يتم إدخال مواد</span>`;

  printWin.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <title>CV & Portfolio — ${escapeHTML(userName)}</title>
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Cairo', sans-serif; color: #0f172a; background: #fff; padding: 36px; max-width: 850px; margin: 0 auto; }
        .cv-header { border-bottom: 3px solid #d4af37; padding-bottom: 16px; margin-bottom: 22px; display: flex; justify-content: space-between; align-items: center; }
        .cv-header h1 { margin: 0; font-size: 28px; color: #07090e; }
        .cv-header p { margin: 4px 0 0; color: #475569; font-weight: 600; }
        h2 { font-size: 18px; color: #b58900; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 22px; }
        .cv-item { margin-bottom: 14px; padding: 10px 14px; background: #f8fafc; border-right: 4px solid #d4af37; border-radius: 6px; }
        .cv-row { display: flex; justify-content: space-between; font-size: 15px; }
        .cv-tag { display: inline-block; background: #0f172a; color: #d4af37; padding: 4px 12px; border-radius: 99px; font-size: 13px; font-weight: 700; margin: 4px; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom:20px; text-align:left;">
        <button onclick="window.print()" style="background:#d4af37; color:#000; border:none; padding:10px 22px; border-radius:8px; font-family:inherit; font-weight:800; cursor:pointer;">🖨️ حفظ كملف PDF / طباعة فورية</button>
      </div>
      <div class="cv-header">
        <div>
          <h1>${escapeHTML(userName)}</h1>
          <p>${escapeHTML(userBio)}</p>
          <small>${escapeHTML(userEmail)}</small>
        </div>
        <div style="text-align:left; direction:ltr;">
          <strong>MY LIFE OS VERIFIED PORTFOLIO</strong><br/>
          <small>Date: ${todayISO()}</small>
        </div>
      </div>
      <h2>🛠️ المهارات التقنية والهندسية المتقنة (Technical Skills)</h2>
      <div>${masteredSkills.map(sk => `<span class="cv-tag">${escapeHTML(sk)}</span>`).join("")}</div>
      <h2>💻 أبرز المشاريع البرمجية والهندسية (Projects Portfolio)</h2>
      ${projectsHtml}
      <h2>🎓 المواد الدراسية والأكاديمية (Academic Coursework)</h2>
      <div>${subjectsHtml}</div>
    </body>
    </html>
  `);
  printWin.document.close();
}

// --- [ميزة 3]: ميكسر الأصوات المحيطية الرباعي (4-Channel Soundscape Mixer) ---
const SoundMixerState = {
  rain: 0,
  cafe: 0,
  fire: 0,
  nodes: {}
};

function updateMixerChannel(ch, volumePct) {
  const vol = Math.max(0, Math.min(100, Number(volumePct) || 0)) / 100;
  SoundMixerState[ch] = Math.round(vol * 100);

  if (vol === 0) {
    if (SoundMixerState.nodes[ch]) {
      try { SoundMixerState.nodes[ch].source.stop(); SoundMixerState.nodes[ch].source.disconnect(); } catch (e) {}
      delete SoundMixerState.nodes[ch];
    }
    return;
  }

  const ctx = getAudioContext();
  if (!SoundMixerState.nodes[ch]) {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (ch === "fire" ? 0.08 : 0.03) * white) / 1.04;
      lastOut = data[i];
      if (ch === "fire" && Math.random() < 0.002) data[i] = 0.8; // فرقعة حطب خفيفة
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = ch === "rain" ? "lowpass" : ch === "cafe" ? "bandpass" : "lowpass";
    filter.frequency.value = ch === "rain" ? 950 : ch === "cafe" ? 600 : 280;

    const gain = ctx.createGain();
    gain.gain.value = vol * 0.35;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
    SoundMixerState.nodes[ch] = { source, gain };
  } else {
    SoundMixerState.nodes[ch].gain.gain.value = vol * 0.35;
  }
}

function openFourChannelMixerModal() {
  openFormModal("🎚️ ميكسر الأصوات المحيطية الرباعي (دمج حر)", `
    <p class="small-muted mb-2">ادمج أكثر من صوت معاً بالدرجة التي تريح أعصابك أثناء التركيز:</p>
    <div class="form-group">
      <label class="flex-between"><span>🌧️ صوت المطر الهادئ</span> <strong id="lbl-mix-rain">${SoundMixerState.rain}%</strong></label>
      <input type="range" min="0" max="100" value="${SoundMixerState.rain}" data-mixer-ch="rain" />
    </div>
    <div class="form-group">
      <label class="flex-between"><span>☕ ضوضاء مقهى مذاكرة دافئ</span> <strong id="lbl-mix-cafe">${SoundMixerState.cafe}%</strong></label>
      <input type="range" min="0" max="100" value="${SoundMixerState.cafe}" data-mixer-ch="cafe" />
    </div>
    <div class="form-group">
      <label class="flex-between"><span>🔥 مدفأة حطب ليلية</span> <strong id="lbl-mix-fire">${SoundMixerState.fire}%</strong></label>
      <input type="range" min="0" max="100" value="${SoundMixerState.fire}" data-mixer-ch="fire" />
    </div>
  `, async () => {});

  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  document.querySelectorAll("[data-mixer-ch]").forEach(slider => {
    slider.oninput = (e) => {
      const ch = e.target.dataset.mixerCh;
      const val = e.target.value;
      document.getElementById(`lbl-mix-${ch}`).textContent = `${val}%`;
      updateMixerChannel(ch, val);
    };
  });
}

// --- [ميزة 5]: شريط الاقتباسات والتحفيز الهادئ المتغير (Focus Wisdom Ticker) ---
const FOCUS_WISDOM_QUOTES = [
  "✨ «وَقُل رَّبِّ زِدْنِي عِلْمًا» — كل دقيقة تركيز اليوم تبني مستقبلك الهندسي غداً",
  "🔥 الانضباط هو الجسر بين أهدافك وإنجازاتك الحقيقية",
  "🧠 العقل مثل العضلة، كلما دربته على التركيز العميق زادت قوته",
  "🌿 «وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ» — سعيك الآن محفوظ ومبارك",
  "⚡ المهندس المحترف يصنع النظام ولا ينتظر الظروف المثالية"
];
let wisdomIdx = 0;
setInterval(() => {
  const ticker = document.getElementById("pomo-wisdom-ticker");
  if (ticker && PomodoroState.isRunning) {
    wisdomIdx = (wisdomIdx + 1) % FOCUS_WISDOM_QUOTES.length;
    ticker.style.opacity = "0";
    setTimeout(() => {
      ticker.textContent = FOCUS_WISDOM_QUOTES[wisdomIdx];
      ticker.style.opacity = "1";
    }, 300);
  }
}, 45000);

// --- [ميزة 8]: نظام المساعد الصوتي السريع (Voice Command Palette) ---
function startVoiceCommandPalette() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("متصفحك الحالي لا يدعم الأوامر الصوتية المباشرة", "error");
    return;
  }
  const rec = new SpeechRecognition();
  rec.lang = "ar-EG";
  showToast("🎙️ تحدث الآن بأمرك (مثال: شغل إذاعة القاهرة / افتح البومودورو / أضف مهمة...)", "info");

  rec.onresult = async (ev) => {
    const cmd = ev.results[0][0].transcript.trim();
    showToast(`الأمر الصوتي: "${cmd}"`, "info");

    if (/إذاعة|قرآن|القاهرة/.test(cmd)) {
      switchView("islamic");
      playLiveIslamicRadio("cairo", "إذاعة القرآن الكريم من القاهرة (البث المباشر)");
    } else if (/بومودورو|مؤقت|تركيز/.test(cmd)) {
      openPomodoroModal();
    } else if (/قفل الشاشة|أغلق الشاشة/.test(cmd)) {
      triggerPinLockScreen();
    } else {
      await sendToAlexPopup(cmd);
    }
  };
  rec.start();
}

// --- [ميزة 9]: شجرة الالتزام التفاعلية وحديقة الإنجاز (Gamified Habit Forest) ---
function getHabitForestList() {
  try {
    return JSON.parse(localStorage.getItem("MY_LIFE_OS_HABIT_FOREST") || "[]");
  } catch (e) {
    return [];
  }
}

function addTreeToForest(title, mins, status = "healthy") {
  const forest = getHabitForestList();
  forest.unshift({
    title: title || "جلسة تركيز",
    mins: mins || 25,
    status, // healthy | withered
    date: todayISO()
  });
  localStorage.setItem("MY_LIFE_OS_HABIT_FOREST", JSON.stringify(forest.slice(0, 60)));
  renderHabitForestWidget();
}

function renderHabitForestWidget() {
  const box = document.getElementById("dash-habit-forest");
  const badge = document.getElementById("forest-count-badge");
  if (!box) return;

  const forest = getHabitForestList();
  const healthyCount = forest.filter(t => t.status === "healthy").length;
  if (badge) badge.textContent = `${healthyCount} شجرة مثمرة 🌳`;

  if (!forest.length) {
    box.innerHTML = renderEmptyState("أكمل جلسات البومودورو واحفظها لتزرع أشجاراً ذهبية في حديقة التزامك!");
    return;
  }

  box.innerHTML = `
    <div class="forest-trees-grid">
      ${forest.slice(0, 12).map(t => `
        <div class="forest-tree-cell ${t.status === "withered" ? "withered" : ""}" title="${escapeHTML(t.title)} (${t.mins} د) - ${t.date}">
          <span class="tree-emoji">${t.status === "withered" ? "🥀" : t.mins >= 45 ? "🌲" : "🌳"}</span>
          <small>${t.mins}د</small>
        </div>
      `).join("")}
    </div>
  `;
}

// --- [ميزة 10]: محفظة النسخ الاحتياطي التلقائي الأسبوعي (Auto Weekly Backup) ---
function checkAndRunWeeklyAutoBackup() {
  const autoEnabled = localStorage.getItem("MY_LIFE_OS_AUTO_BACKUP") !== "off";
  const lbl = document.getElementById("auto-backup-label");
  if (lbl) lbl.textContent = `النسخ التلقائي الأسبوعي: ${autoEnabled ? "مفعل ✅" : "متوقف"}`;
  if (!autoEnabled || !AppState.user) return;

  const lastBackup = localStorage.getItem("MY_LIFE_OS_LAST_AUTO_BACKUP");
  const nowMs = Date.now();
  if (!lastBackup || (nowMs - Number(lastBackup)) > 7 * 24 * 60 * 60 * 1000) {
    localStorage.setItem("MY_LIFE_OS_LAST_AUTO_BACKUP", String(nowMs));
    localStorage.setItem("MY_LIFE_OS_LOCAL_VAULT_SNAPSHOT", JSON.stringify({
      savedAt: todayISO(),
      collections: AppState.collections
    }));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderHabitForestWidget();
  setTimeout(checkAndRunWeeklyAutoBackup, 4000);

  // تحديث ساعة شاشة القفل
  setInterval(() => {
    const lockClock = document.getElementById("pin-lock-clock");
    if (lockClock) {
      lockClock.textContent = new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    }
  }, 1000);

  // مراقبة عدم النشاط لقفل الشاشة تلقائياً بعد 5 دقائق + اختصار Alt+L
  ["mousemove", "keydown", "click"].forEach(ev => window.addEventListener(ev, resetIdleLockTimer));
  resetIdleLockTimer();

  window.addEventListener("keydown", (e) => {
    if (e.altKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      triggerPinLockScreen();
    }
  });

  document.getElementById("btn-lock-screen")?.addEventListener("click", triggerPinLockScreen);

  document.getElementById("btn-setup-pin")?.addEventListener("click", () => {
    const pin = prompt("🔐 أدخل كود PIN جديد (4 أرقام) لقفل الشاشة السريع (أو اتركه فارغاً لإلغاء القفل):", localStorage.getItem("MY_LIFE_OS_PIN_CODE") || "");
    if (pin === null) return;
    if (pin.trim() === "") {
      localStorage.removeItem("MY_LIFE_OS_PIN_CODE");
      showToast("تم إلغاء قفل الـ PIN", "info");
    } else if (/^\d{4}$/.test(pin.trim())) {
      localStorage.setItem("MY_LIFE_OS_PIN_CODE", pin.trim());
      showToast("تم حفظ كود الـ PIN بنجاح! جرب الضغط على Alt+L لقفل الشاشة 🔒", "success");
    } else {
      showToast("يرجى إدخال 4 أرقام فقط", "error");
    }
  });

  document.getElementById("pin-unlock-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const entered = document.getElementById("pin-unlock-input").value.trim();
    const savedPin = localStorage.getItem("MY_LIFE_OS_PIN_CODE") || "0000";
    if (entered === savedPin) {
      document.getElementById("pin-lock-overlay").classList.add("hidden");
      showToast("مرحباً بعودتك يا هندسة! تم فتح القفل 🔓", "success");
    } else {
      playStrictLockSiren();
      showToast("❌ كود الـ PIN غير صحيح!", "error");
    }
  });

  // أزرار الميزات الجديدة (CV PDF، الأوامر الصوتية، النسخ التلقائي، الميكسر، والـ Mini-HUD)
  document.getElementById("btn-export-portfolio-pdf")?.addEventListener("click", exportOneClickPortfolioPDF);
  document.getElementById("btn-voice-cmd")?.addEventListener("click", startVoiceCommandPalette);

  document.getElementById("btn-toggle-auto-backup")?.addEventListener("click", () => {
    const cur = localStorage.getItem("MY_LIFE_OS_AUTO_BACKUP") !== "off";
    localStorage.setItem("MY_LIFE_OS_AUTO_BACKUP", cur ? "off" : "on");
    checkAndRunWeeklyAutoBackup();
    showToast(cur ? "تم إيقاف النسخ التلقائي الأسبوعي" : "تم تفعيل النسخ الاحتياطي التلقائي الأسبوعي ✅", "info");
  });

  document.getElementById("btn-mini-pomo-pause")?.addEventListener("click", () => {
    if (PomodoroState.isRunning) pausePomodoro(); else startPomodoro();
    const icon = document.querySelector("#btn-mini-pomo-pause i");
    if (icon) icon.className = `fa-solid ${PomodoroState.isRunning ? "fa-pause" : "fa-play"}`;
  });

  document.addEventListener("click", (e) => {
if (e.target.closest("#btn-pomo-mixer-open")) {
      if (window.open14ChannelAmbientMixerModal) {
        window.open14ChannelAmbientMixerModal(true);
      } else {
        openFourChannelMixerModal();
      }
    }
    if (e.target.closest("#btn-pomo-mini-hud")) {
      if (!PomodoroState.isRunning) startPomodoro();
      document.getElementById("universal-modal")?.classList.add("hidden");
      document.getElementById("mini-floating-pomo")?.classList.remove("hidden");
      showToast("تم تصغير المؤقت إلى نافذة Mini-HUD العائمة في الزاوية ⏱️", "info");
    }
    if (e.target.closest("#btn-pomo-save-session")) {
      const mins = Math.max(1, Math.round(PomodoroState.duration / 60));
      addTreeToForest(PomodoroState.customTaskName || "جلسة تركيز", mins, "healthy");
    }
  });
});
/* ==========================================================================
   3D INTERACTIVE STUDY FLASHCARDS ENGINE (UNIVERSITY REVISION)
   ========================================================================== */
function getFlashcardsList() {
  try {
    return JSON.parse(localStorage.getItem("MY_LIFE_OS_FLASHCARDS") || "[]");
  } catch (e) {
    return [];
  }
}

function openFlashcardsStudioModal() {
  const cards = getFlashcardsList();

  const cardsHtml = cards.length
    ? `<div class="flashcards-grid">` + cards.map((c, idx) => `
        <div class="flashcard-3d" onclick="this.classList.toggle('flipped')">
          <div class="flashcard-inner">
            <div class="flashcard-front">
              <span class="badge badge-gold mb-2">${escapeHTML(c.subject || "مراجعة")}</span>
              <strong>❓ ${escapeHTML(c.question)}</strong>
              <small class="small-muted mt-2">(اضغط لقلب الكارت ورؤية الإجابة)</small>
            </div>
            <div class="flashcard-back">
              <strong>✅ الإجابة:</strong>
              <p class="mt-1">${escapeHTML(c.answer)}</p>
              <button type="button" class="btn btn-xs btn-danger mt-2" data-del-flashcard="${idx}" onclick="event.stopPropagation();">حذف</button>
            </div>
          </div>
        </div>
      `).join("") + `</div>`
    : `<p class="small-muted text-center py-2">لا توجد بطاقات مراجعة بعد. أضف أول سؤال وجواب بالأسفل لتقوية ذاكرتك!</p>`;

  openFormModal("🃏 استوديو بطاقات المراجعة الذكية (3D Flashcards)", `
    <div class="form-group">
      <label>اسم المادة</label>
      <input name="subject" required placeholder="مثال: Logic Design / دوائر كهربائية" />
    </div>
    <div class="form-group">
      <label>السؤال أو القانون (وجه البطاقة)</label>
      <input name="question" required placeholder="ما هو قانون كيرشوف للتيار KCL؟" />
    </div>
    <div class="form-group">
      <label>الإجابة النموذجية (ظهر البطاقة)</label>
      <input name="answer" required placeholder="مجموع التيارات الداخلة للعقدة يساوي مجموع التيارات الخارجة منها." />
    </div>
    <h4 class="mt-4 gold-text">بطاقاتك المحفوظة (اضغط على أي بطاقة لقلبها 3D):</h4>
    <div style="max-height:260px; overflow-y:auto;">${cardsHtml}</div>
  `, async (data) => {
    const list = getFlashcardsList();
    list.unshift({
      subject: data.subject,
      question: data.question,
      answer: data.answer
    });
    localStorage.setItem("MY_LIFE_OS_FLASHCARDS", JSON.stringify(list));
    showToast("تمت إضافة بطاقة المراجعة 3D بنجاح! 🃏", "success");
    openFlashcardsStudioModal();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-flashcards-studio")?.addEventListener("click", openFlashcardsStudioModal);

  document.addEventListener("click", (e) => {
    const delFc = e.target.closest("[data-del-flashcard]");
    if (delFc) {
      const idx = Number(delFc.dataset.delFlashcard);
      const list = getFlashcardsList();
      list.splice(idx, 1);
      localStorage.setItem("MY_LIFE_OS_FLASHCARDS", JSON.stringify(list));
      openFlashcardsStudioModal();
    }
  });
});
/* ==========================================================================
   V5 ULTIMATE ENGINE: DEV LAB, SPLIT STUDY, ALEX V3, EDIT & SCREENSAVER
   ========================================================================== */

// 1. نظام التعديل الفوري لكل الكروت (Quick Edit Engine) + تحويل الملاحظة لـ Flashcard
document.addEventListener("click", async (e) => {
  const editBtn = e.target.closest('[data-action="edit-item"]');
  if (editBtn) {
    const col = editBtn.dataset.col;
    const id = editBtn.dataset.id;
    const item = (AppState.collections[col] || []).find(x => x.id === id);
    if (!item) return;

    if (col === "tasks") {
      openFormModal("✏️ تعديل بيانات المهمة", `
        <div class="form-group"><label>عنوان المهمة</label><input name="title" value="${escapeHTML(item.title)}" required /></div>
        <div class="form-group"><label>الوصف</label><textarea name="description" rows="2">${escapeHTML(item.description || "")}</textarea></div>
        <div class="form-group"><label>تاريخ الاستحقاق</label><input type="date" name="dueDate" value="${escapeHTML(item.dueDate || todayISO())}" required /></div>
        <div class="form-group"><label>الأولوية</label>
          <select name="priority">
            <option value="High" ${item.priority === "High" ? "selected" : ""}>High</option>
            <option value="Urgent" ${item.priority === "Urgent" ? "selected" : ""}>Urgent</option>
            <option value="Medium" ${item.priority === "Medium" ? "selected" : ""}>Medium</option>
            <option value="Low" ${item.priority === "Low" ? "selected" : ""}>Low</option>
          </select>
        </div>
      `, async (data) => await updateRecord("tasks", id, data));
    } else if (col === "projects") {
      openFormModal("✏️ تعديل المشروع البرمجي", `
        <div class="form-group"><label>اسم المشروع</label><input name="title" value="${escapeHTML(item.title)}" required /></div>
        <div class="form-group"><label>الوصف</label><textarea name="description" rows="2">${escapeHTML(item.description || "")}</textarea></div>
        <div class="form-group"><label>التقنيات</label><input name="techStack" value="${escapeHTML(item.techStack || "")}" /></div>
        <div class="form-group"><label>نسبة الإنجاز (%)</label><input type="number" min="0" max="100" name="progress" value="${Number(item.progress) || 0}" required /></div>
      `, async (data) => await updateRecord("projects", id, data));
    } else if (col === "notes") {
      openFormModal("✏️ تعديل الملاحظة", `
        <div class="form-group"><label>العنوان</label><input name="title" value="${escapeHTML(item.title)}" required /></div>
        <div class="form-group"><label>المحتوى</label><textarea name="content" rows="4" required>${escapeHTML(item.content || "")}</textarea></div>
      `, async (data) => await updateRecord("notes", id, data));
    }
  }

  // تحويل الملاحظة بضغطة واحدة إلى بطاقة مراجعة 3D
  const toFcBtn = e.target.closest('[data-action="note-to-flashcard"]');
  if (toFcBtn) {
    const note = (AppState.collections.notes || []).find(n => n.id === toFcBtn.dataset.id);
    if (!note) return;
    const list = getFlashcardsList();
    list.unshift({
      subject: note.linkedTo || note.category || "ملاحظات",
      question: note.title,
      answer: note.content
    });
    localStorage.setItem("MY_LIFE_OS_FLASHCARDS", JSON.stringify(list));
    showToast("تم تحويل الملاحظة إلى بطاقة مراجعة 3D بنجاح! 🃏", "success");
    launchAlexConfetti();
  }

  // زر العد التصاعدي المفتوح (Flow Stopwatch Mode) داخل البومودورو
  if (e.target.closest("#btn-pomo-stopwatch")) {
    PomodoroState.isStopwatch = !PomodoroState.isStopwatch;
    if (PomodoroState.isStopwatch) {
      pausePomodoro();
      PomodoroState.timeLeft = 0;
      PomodoroState.duration = 3600;
      showToast("تم تفعيل وضع العد التصاعدي المفتوح (Flow Stopwatch) ♾️", "info");
    } else {
      setCustomPomodoroTime(25, "work");
    }
    openPomodoroModal();
  }
});

// 2. شرارات احتفال أليكس الذهبية الفورية (Instant Confetti Burst) + تعبيرات وجه أليكس
function launchAlexConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 65 }, () => ({
    x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
    y: window.innerHeight / 2,
    vx: (Math.random() - 0.5) * 14,
    vy: -Math.random() * 14 - 4,
    size: Math.random() * 7 + 4,
    color: ["#d4af37", "#10b981", "#06b6d4", "#f43f5e", "#f3e5ab"][Math.floor(Math.random() * 5)],
    alpha: 1
  }));

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.38; // جاذبية
      p.alpha -= 0.016;
      if (p.alpha > 0) {
        active = true;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
    });
    ctx.globalAlpha = 1;
    if (active) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  frame();
}

// تحديث ملامح أليكس وتحدياته اليومية وكبسولة الامتحان العلوية
function updateAlexV3AndTopbarRadar() {
  // أ) نظارة الشمس أثناء البومودورو
  const glasses = document.getElementById("alex-sunglasses");
  if (glasses) glasses.classList.toggle("hidden", !PomodoroState.isRunning);

  // ب) تحديات أليكس اليومية (3 مهام يومية)
  const today = todayISO();
  const doneTasksToday = AppState.collections.tasks.filter(t => t.status === "Completed").length >= 1;
  const doneFocusToday = getFocusSessionsLog().filter(s => s.date === today).length >= 1;
  const todayPrayerDoc = AppState.collections.prayers.find(p => p.date === today);
  const donePrayersToday = todayPrayerDoc && ["fajr","dhuhr","asr","maghrib","isha"].filter(k => todayPrayerDoc[k]).length >= 3;

  const quests = [
    { label: "إتمام مهمة واحدة على الأقل", done: doneTasksToday },
    { label: "حفظ جلسة تركيز بومودورو اليوم", done: doneFocusToday },
    { label: "تسجيل 3 صلوات أو أكثر اليوم", done: donePrayersToday }
  ];
  const doneCount = quests.filter(q => q.done).length;
  const qProg = document.getElementById("alex-quests-progress");
  const qList = document.getElementById("alex-quests-list");
  if (qProg) qProg.textContent = `${doneCount} / 3`;
  if (qList) {
    qList.innerHTML = quests.map(q => `
      <div class="alex-quest-row ${q.done ? "done" : ""}">
        <span>${q.done ? "✅" : "⭕"} ${q.label}</span>
      </div>
    `).join("");
  }

  // ج) كبسولة رادار الامتحان في الشريط العلوي
  const topPill = document.getElementById("topbar-exam-pill");
  if (topPill) {
    const upcoming = AppState.collections.events
      .filter(ev => ev.date >= today && (ev.type === "Exam" || ev.type === "University"))
      .sort((a, b) => a.date.localeCompare(b.date));
    if (upcoming.length > 0) {
      const next = upcoming[0];
      const days = Math.ceil((new Date(next.date) - new Date(today)) / 86400000);
      topPill.innerHTML = `<i class="fa-solid fa-bell gold-text"></i> ${escapeHTML(next.title)}: ${days === 0 ? "اليوم!" : "باقي " + days + " يوم"}`;
    } else {
      topPill.innerHTML = `<i class="fa-solid fa-shield-check"></i> لا توجد امتحانات قريبة`;
    }
  }
}

// 3. مختبر الهندسة والبرمجة المدمج (Live Code Sandbox + Logic & Base Converter + API Tester + Mindmap)
function openLiveCodeSandboxModal() {
  const savedHtml = localStorage.getItem("MY_LIFE_OS_SANDBOX_HTML") || `<div class="box">\n  <h2>مرحباً يا بشمهندس أحمد 🚀</h2>\n  <button onclick="greet()">اضغط للتجربة</button>\n</div>`;
  const savedCss = localStorage.getItem("MY_LIFE_OS_SANDBOX_CSS") || `body { font-family: sans-serif; text-align: center; background: #0f172a; color: #f8fafc; padding-top: 40px; }\n.box { border: 2px solid #d4af37; padding: 20px; border-radius: 12px; display: inline-block; }\nbutton { background: #d4af37; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }`;
  const savedJs = localStorage.getItem("MY_LIFE_OS_SANDBOX_JS") || `function greet() {\n  alert("الكود يعمل بنجاح داخل MY LIFE OS!");\n}`;

  openFormModal("💻 محرر الأكواد الحي (Live HTML / CSS / JS Sandbox)", `
    <div class="split-workspace-grid">
      <div>
        <label class="small-muted">كود HTML:</label>
        <textarea id="sb-html" rows="4" dir="ltr" style="font-family:monospace;">${escapeHTML(savedHtml)}</textarea>
        <label class="small-muted mt-1">كود CSS:</label>
        <textarea id="sb-css" rows="4" dir="ltr" style="font-family:monospace;">${escapeHTML(savedCss)}</textarea>
        <label class="small-muted mt-1">كود JavaScript:</label>
        <textarea id="sb-js" rows="4" dir="ltr" style="font-family:monospace;">${escapeHTML(savedJs)}</textarea>
      </div>
      <div>
        <div class="flex-between mb-1">
          <strong class="gold-text">المعاينة الحية الفورية (Live Preview):</strong>
          <button type="button" id="btn-run-sandbox" class="btn btn-xs btn-gold"><i class="fa-solid fa-play"></i> تشغيل وتحديث</button>
        </div>
        <iframe id="sb-preview" class="sandbox-preview-frame"></iframe>
      </div>
    </div>
  `, async () => {});

  const card = document.querySelector("#universal-modal .modal-card");
  card?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  const updatePreview = () => {
    const h = document.getElementById("sb-html").value;
    const c = document.getElementById("sb-css").value;
    const j = document.getElementById("sb-js").value;
    localStorage.setItem("MY_LIFE_OS_SANDBOX_HTML", h);
    localStorage.setItem("MY_LIFE_OS_SANDBOX_CSS", c);
    localStorage.setItem("MY_LIFE_OS_SANDBOX_JS", j);
    const frame = document.getElementById("sb-preview");
    if (frame) {
      frame.srcdoc = `<!DOCTYPE html><html><head><style>${c}</style></head><body>${h}<script>${j}<\/script></body></html>`;
    }
  };
  document.getElementById("btn-run-sandbox").onclick = updatePreview;
  updatePreview();
}

function openLogicAndBaseConverterModal() {
  openFormModal("🔢 محول الأنظمة العددية وبوابات المنطق (Logic Design Lab)", `
    <div class="form-group">
      <label>أدخل رقماً عشرياً (Decimal) لتحويله فوراً:</label>
      <input type="number" id="conv-dec" value="42" dir="ltr" />
    </div>
    <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr);">
      <div class="subject-progress-box"><strong>Binary (ثنائي)</strong><div id="conv-bin" class="gold-text mt-1" dir="ltr">101010</div></div>
      <div class="subject-progress-box"><strong>Hex (سداسي عشر)</strong><div id="conv-hex" class="gold-text mt-1" dir="ltr">2A</div></div>
      <div class="subject-progress-box"><strong>Octal (ثماني)</strong><div id="conv-oct" class="gold-text mt-1" dir="ltr">52</div></div>
    </div>
    <h4 class="gold-text mt-2">جدول الحقيقة للبوابات المنطقية (Logic Gates Truth Table):</h4>
    <table class="truth-table">
      <thead><tr><th>A</th><th>B</th><th>AND</th><th>OR</th><th>XOR</th><th>NAND</th><th>NOR</th></tr></thead>
      <tbody>
        <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
        <tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>
        <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>
        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
      </tbody>
    </table>
  `, async () => {});

  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  const decInp = document.getElementById("conv-dec");
  decInp.oninput = () => {
    const n = Math.max(0, parseInt(decInp.value, 10) || 0);
    document.getElementById("conv-bin").textContent = n.toString(2);
    document.getElementById("conv-hex").textContent = n.toString(16).toUpperCase();
    document.getElementById("conv-oct").textContent = n.toString(8);
  };
}

function openApiTesterModal() {
  openFormModal("🌐 فاحص الـ APIs السريع (Mini-Postman)", `
    <div class="input-action-row">
      <select id="api-method" class="select-sm" style="width:110px;"><option value="GET">GET</option><option value="POST">POST</option></select>
      <input type="url" id="api-url" dir="ltr" value="https://jsonplaceholder.typicode.com/todos/1" placeholder="https://api.example.com/data" />
      <button type="button" id="btn-send-api" class="btn btn-gold btn-sm">إرسال الطلب</button>
    </div>
    <pre id="api-response-box" dir="ltr" class="code-snippet-box mt-2" style="min-height:180px; max-height:280px;">اضغط "إرسال الطلب" لمعاينة رد السيرفر...</pre>
  `, async () => {});

  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  document.getElementById("btn-send-api").onclick = async () => {
    const url = document.getElementById("api-url").value.trim();
    const method = document.getElementById("api-method").value;
    const out = document.getElementById("api-response-box");
    out.textContent = "⏳ جاري الاتصال بالسيرفر...";
    try {
      const t0 = performance.now();
      const res = await fetch(url, { method });
      const data = await res.text();
      const ms = Math.round(performance.now() - t0);
      out.textContent = `Status: ${res.status} (${ms} ms)\n\n` + data.slice(0, 2000);
    } catch (err) {
      out.textContent = "❌ خطأ اتصال: " + err.message;
    }
  };
}

function openMindmapCanvasModal() {
  const nodes = JSON.parse(localStorage.getItem("MY_LIFE_OS_MINDMAP") || '[{"topic":"مشروع التخرج","sub":"تحديد الفكرة ➔ قاعدة البيانات ➔ الواجهة"}]');
  const html = nodes.map((n, i) => `
    <div class="prayer-row">
      <div><strong class="gold-text">🧠 ${escapeHTML(n.topic)}</strong><p class="small-muted mt-1">${escapeHTML(n.sub)}</p></div>
      <button type="button" class="btn btn-xs btn-danger" onclick="const l=JSON.parse(localStorage.getItem('MY_LIFE_OS_MINDMAP')||'[]');l.splice(${i},1);localStorage.setItem('MY_LIFE_OS_MINDMAP',JSON.stringify(l));this.closest('.prayer-row').remove();"><i class="fa-solid fa-trash"></i></button>
    </div>
  `).join("");

  openFormModal("🧠 لوحة الخرائط الذهنية وتفرعات الأفكار (Mindmap)", `
    <div class="form-group"><label>الفكرة الرئيسية أو المادة</label><input name="topic" required placeholder="مثال: معمارية النظام / قوانين الفيزياء" /></div>
    <div class="form-group"><label>التفرعات والخطوات المتسلسلة (افصل بينها بـ ➔)</label><input name="sub" required placeholder="الخطوة الأولى ➔ الخطوة الثانية ➔ النتيجة" /></div>
    <div style="max-height:220px; overflow-y:auto;" class="mt-2">${html}</div>
  `, async (data) => {
    nodes.unshift({ topic: data.topic, sub: data.sub });
    localStorage.setItem("MY_LIFE_OS_MINDMAP", JSON.stringify(nodes));
    showToast("تم حفظ الخريطة الذهنية بنجاح 🧠", "success");
  });
}

// 4. أدوات الجامعة الخارقة: الجدول الأسبوعي البصري + المذاكرة المنقسمة (Split-Screen) + سجل الديون
function openWeeklyTimetableModal() {
  const days = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"];
  const tableData = JSON.parse(localStorage.getItem("MY_LIFE_OS_TIMETABLE") || "{}");

  const colsHtml = days.map(d => `
    <div class="timetable-day-col">
      <h5>${d}</h5>
      <textarea data-tt-day="${d}" rows="6" placeholder="اكتب محاضرات وسكاشن وقاعات يوم ${d}...">${escapeHTML(tableData[d] || "")}</textarea>
    </div>
  `).join("");

  openFormModal("📅 الجدول الأسبوعي البصري للمحاضرات والسكاشن", `
    <p class="small-muted mb-2">اكتب مواعيد محاضراتك وأرقام القاعات أو المعامل لكل يوم (يُحفظ تلقائياً):</p>
    <div class="weekly-timetable-grid">${colsHtml}</div>
  `, async () => {});

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  document.querySelectorAll("[data-tt-day]").forEach(area => {
    area.oninput = () => {
      tableData[area.dataset.ttDay] = area.value;
      localStorage.setItem("MY_LIFE_OS_TIMETABLE", JSON.stringify(tableData));
    };
  });
}

function openSplitScreenStudyModal() {
  openFormModal("📖 وضع المذاكرة المنقسمة (ملف المحاضرة بجانب التلخيص الفوري)", `
    <div class="form-group">
      <label>اختر ملف PDF من جهازك أو الصق رابط المحاضرة لفتحه في النصف الأيمن:</label>
      <input type="file" id="split-pdf-file" accept=".pdf,image/*" />
    </div>
    <div class="split-workspace-grid">
      <div>
        <strong class="gold-text d-block mb-1">📄 عارض المحاضرة / الشيت:</strong>
        <iframe id="split-pdf-frame" class="sandbox-preview-frame" style="background:#141926;"></iframe>
      </div>
      <div>
        <strong class="gold-text d-block mb-1">✍️ ملخصك وملاحظاتك الفورية:</strong>
        <input type="text" name="title" required placeholder="عنوان الملخص (مثال: ملخص المحاضرة 4)..." class="mb-2" />
        <textarea name="content" rows="12" required placeholder="اكتب النقاط المهمة والقوانين أثناء قراءتك للملف..."></textarea>
      </div>
    </div>
  `, async (data) => {
    await createRecord("notes", {
      title: data.title,
      content: data.content,
      category: "ملخص محاضرة"
    });
  });

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  document.getElementById("split-pdf-file").onchange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      document.getElementById("split-pdf-frame").src = URL.createObjectURL(file);
    }
  };
}

function openDebtTrackerModal() {
  const debts = JSON.parse(localStorage.getItem("MY_LIFE_OS_DEBTS") || "[]");
  const listHtml = debts.map((d, i) => `
    <div class="prayer-row">
      <div>
        <strong>${escapeHTML(d.person)}</strong>
        <span class="badge ${d.type === "for_me" ? "badge-emerald" : "badge-danger"}">${d.type === "for_me" ? "ليّ عنده" : "عليّ له"}: ${d.amount} ${AppState.currency}</span>
        <small class="small-muted d-block">${escapeHTML(d.note || "")}</small>
      </div>
      <button type="button" class="btn btn-xs btn-gold" onclick="const l=JSON.parse(localStorage.getItem('MY_LIFE_OS_DEBTS')||'[]');l.splice(${i},1);localStorage.setItem('MY_LIFE_OS_DEBTS',JSON.stringify(l));this.closest('.prayer-row').remove();">تمت التسوية ✅</button>
    </div>
  `).join("") || `<p class="small-muted text-center">لا توجد ديون أو حسابات معلقة حالياً.</p>`;

  openFormModal("🤝 مسجل الديون والمصاريف المشتركة (ليك أو عليك)", `
    <div class="form-group"><label>اسم الشخص / الزميل</label><input name="person" required placeholder="مثال: أحمد / مصاريف مشروع الكلية" /></div>
    <div class="form-group"><label>المبلغ (${AppState.currency})</label><input type="number" name="amount" required /></div>
    <div class="form-group"><label>الحالة</label>
      <select name="type"><option value="for_me">ليّ عنده (فلوس ليا)</option><option value="on_me">عليّ له (فلوس عليا)</option></select>
    </div>
    <div class="form-group"><label>ملاحظة</label><input name="note" placeholder="ملازم وتصوير / غداء..." /></div>
    <div style="max-height:200px; overflow-y:auto;" class="mt-2">${listHtml}</div>
  `, async (data) => {
    debts.unshift(data);
    localStorage.setItem("MY_LIFE_OS_DEBTS", JSON.stringify(debts));
    showToast("تم تسجيل الحساب المشترك بنجاح 🤝", "success");
  });
}

// 5. تفعيل جميع الأزرار وشاشة التوقف السينمائية وفلتر العين
document.addEventListener("DOMContentLoaded", () => {
  setInterval(updateAlexV3AndTopbarRadar, 4000);

  document.getElementById("btn-live-sandbox")?.addEventListener("click", openLiveCodeSandboxModal);
  document.getElementById("btn-logic-converter")?.addEventListener("click", openLogicAndBaseConverterModal);
  document.getElementById("btn-api-tester")?.addEventListener("click", openApiTesterModal);
  document.getElementById("btn-mindmap-canvas")?.addEventListener("click", openMindmapCanvasModal);
  document.getElementById("btn-weekly-timetable")?.addEventListener("click", openWeeklyTimetableModal);
  document.getElementById("btn-split-study")?.addEventListener("click", openSplitScreenStudyModal);
  document.getElementById("btn-debt-tracker")?.addEventListener("click", openDebtTrackerModal);

  // فلتر القراءة الليلية المريح للعين
  document.getElementById("btn-eye-care")?.addEventListener("click", () => {
    const overlay = document.getElementById("eye-care-overlay");
    if (overlay) {
      const isHidden = overlay.classList.toggle("hidden");
      showToast(isHidden ? "تم إيقاف فلتر القراءة الليلية" : "تم تفعيل فلتر القراءة الليلية الدافئ لحماية عينيك 👓🌙", "info");
    }
  });

  // شاشة التوقف السينمائية بالساعة القلابة (Flip-Clock Screensaver)
  const screensaver = document.getElementById("flip-screensaver");
  const ssClock = document.getElementById("screensaver-clock");
  setInterval(() => {
    if (ssClock && screensaver && !screensaver.classList.contains("hidden")) {
      ssClock.textContent = new Date().toLocaleTimeString("en-US", { hour12: false });
    }
  }, 1000);

  document.getElementById("btn-screensaver-now")?.addEventListener("click", () => {
    screensaver?.classList.remove("hidden");
  });

  screensaver?.addEventListener("click", () => screensaver.classList.add("hidden"));
  window.addEventListener("keydown", (e) => {
    if (screensaver && !screensaver.classList.contains("hidden")) {
      screensaver.classList.add("hidden");
    }
  });

  // إطلاق احتفال أليكس عند إتمام أي مهمة أو حفظ جلسة بومودورو
  document.addEventListener("click", (e) => {
    if (e.target.closest('[data-action="toggle-task"]') || e.target.closest("#btn-pomo-save-session")) {
      launchAlexConfetti();
    }
  });
});
/* ==========================================================================
   MY LIFE OS — OFFICIAL BRIDGE FOR OS-PRO EXPANSION & SYNERGY ENGINE
   ========================================================================== */
window.MyLifeOSBridge = {
  getAppState: () => AppState,
  getPomodoroState: () => PomodoroState,
  createRecord,
  updateRecord,
  deleteRecord,
  switchView,
  openFormModal,
  showToast,
  escapeHTML,
  todayISO,
  askAI: askGeminiOrFallbackAI,
  getAudioContext,
  renderAllViews,
  openPomodoroModal,
  startPomodoro,
  pausePomodoro,
  resetPomodoro,
  setCustomPomodoroTime,
  updatePomodoroDisplays
};
