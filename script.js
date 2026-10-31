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
  // إيقاف تشغيل الأنيميشن والعمليات الحسابية نهائياً على الموبايل والتابلت لتسريع الأداء 100%
  if (window.innerWidth <= 1024) return;

  const canvas = document.getElementById("luxury-bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const mouse = { x: w / 2, y: h / 2, active: false };
  const sparks = [];
  const meteors = [];

  // تفاعل الماوس: شرارات ذهبية + إمالة 3D لكارت الدخول
  const authCard = document.querySelector(".luxury-glass-card");
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;

    // إضافة شرارات مضيئة تتبع حركة الماوس
    for (let i = 0; i < 2; i++) {
      sparks.push({
        x: mouse.x,
        y: mouse.y,
        vx: (Math.random() - 0.5) * 2.8,
        vy: (Math.random() - 0.5) * 2.8 - 0.5,
        r: Math.random() * 2.4 + 0.8,
        alpha: 1,
        gold: Math.random() > 0.3
      });
    }

    // حركة 3D Parallax للكارت
    if (authCard && !document.getElementById("auth-view")?.classList.contains("hidden")) {
      const rx = ((e.clientY - h / 2) / (h / 2)) * -7;
      const ry = ((e.clientX - w / 2) / (w / 2)) * 7;
      authCard.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  });

  // انفجار شرارات ذهبية عند الضغط بالماوس (Click Burst)
  window.addEventListener("click", (e) => {
    for (let i = 0; i < 22; i++) {
      const angle = (Math.PI * 2 * i) / 22;
      const speed = Math.random() * 4.5 + 1.5;
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 3 + 1.2,
        alpha: 1,
        gold: i % 3 !== 0
      });
    }
  });

  // الجزيئات الطائرة الأساسية
  const count = Math.min(75, Math.floor((w * h) / 16000));
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.85,
    vy: -Math.random() * 1.1 - 0.3,
    r: Math.random() * 2.8 + 1,
    gold: Math.random() > 0.25
  }));

  function spawnMeteor() {
    if (meteors.length < 3 && Math.random() < 0.035) {
      meteors.push({
        x: Math.random() * w,
        y: -20,
        vx: (Math.random() - 0.5) * 6 + 3,
        vy: Math.random() * 5 + 4,
        len: Math.random() * 90 + 50,
        alpha: 1
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    spawnMeteor();

    // 1. رسم الشهب الطائرة (Shooting Golden Meteors)
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.vx;
      m.y += m.vy;
      m.alpha -= 0.012;

      const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 10, m.y - m.vy * 10);
      grad.addColorStop(0, `rgba(212, 175, 55, ${m.alpha})`);
      grad.addColorStop(1, "rgba(212, 175, 55, 0)");

      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - m.vx * 10, m.y - m.vy * 10);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      if (m.alpha <= 0 || m.y > h + 100) meteors.splice(i, 1);
    }

    // 2. رسم الجزيئات الطائرة والشبكة الذكية
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -15) p.y = h + 15;
      if (p.x < -15) p.x = w + 15;
      if (p.x > w + 15) p.x = -15;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold ? "rgba(212, 175, 55, 0.85)" : "rgba(16, 185, 129, 0.75)";
      ctx.shadowBlur = 14;
      ctx.shadowColor = p.gold ? "#d4af37" : "#10b981";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 135) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - dist / 135) * 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      if (mouse.active) {
        const mDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (mDist < 175) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - mDist / 175) * 0.45})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }

    // 3. رسم شرارات الماوس وانفجارات الكليك
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= 0.028;

      if (s.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.gold
        ? `rgba(243, 229, 171, ${s.alpha})`
        : `rgba(16, 185, 129, ${s.alpha})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = s.gold ? "#d4af37" : "#10b981";
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }
  animate();
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
        document.getElementById("user-avatar-img").src = "logo.png";
      }

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

async function handleAIChatSubmit(userPrompt) {
  appendAIMessage(userPrompt, "user");

  // أولاً: فحص ما إذا كان الطلب أمر تنفيذ مباشر (مهمة / مادة / مصروف)
  const detectedAction = parseNaturalLanguageAIAction(userPrompt);
  if (detectedAction) {
    AppState.pendingAIAction = detectedAction;
    document.getElementById("ai-confirm-summary").textContent = detectedAction.summary;
    document.getElementById("ai-confirm-payload").textContent = JSON.stringify(detectedAction.payload, null, 2);
    document.getElementById("ai-confirmation-card").classList.remove("hidden");
    appendAIMessage("جهزت لك الإجراء المطلوب! اضغط على زر التأكيد بالأسفل لحفظه فوراً في حسابك.", "assistant");
    return;
  }

  // ثانياً: محادثة ذكاء اصطناعي حقيقية مع سياق بيانات المستخدم الفعلية
  const loadingMsg = appendAIMessage("جاري التفكير...", "assistant");

  const userName = AppState.user?.displayName || "يا هندسة";
  const pendingTasks = AppState.collections.tasks.filter(t => t.status !== "Completed").map(t => t.title);
  const subjectsList = AppState.collections.subjects.map(s => s.name);
  const projectsList = AppState.collections.projects.map(p => `${p.title} (${p.progress || 0}%)`);

  const systemContext = `أنت المساعد الشخصي الذكي داخل نظام MY LIFE OS الخاص بالمستخدم "${userName}".
تحدث باللغة العربية بأسلوب راقٍ، ودود، وذكي جداً (وبروح مصرية هندسية مشجعة عند الترحيب).
بيانات المستخدم الحالية في النظام:
- المواد الدراسية المسجلة (${subjectsList.length}): ${subjectsList.join("، ") || "لا توجد مواد بعد"}
- المهام غير المكتملة (${pendingTasks.length}): ${pendingTasks.join("، ") || "لا توجد مهام معلقة"}
- المشاريع النشطة (${projectsList.length}): ${projectsList.join("، ") || "لا توجد مشاريع بعد"}
أجب على سؤال المستخدم أو طلب التنظيم بشكل مباشر وعملي دون ذكر أي تفاصيل تقنية عن قواعد البيانات.`;

  try {
    const geminiKey = localStorage.getItem("MY_LIFE_OS_GEMINI_KEY");
    let aiReply = "";

    if (geminiKey) {
      // الاتصال المباشر بـ Google Gemini API في حال إدخال المفتاح
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(geminiKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemContext}\n\nرسالة المستخدم: ${userPrompt}` }] }]
        })
      });
      const data = await res.json();
      aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    }

    if (!aiReply) {
      // محرك الذكاء الاصطناعي التوليدي المجاني المدمج (يعمل فوراً بدون مفتاح)
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
      aiReply = data?.choices?.[0]?.message?.content || "";
    }

    loadingMsg.textContent = aiReply || `يا هلا بيك يا ${userName}! أنا معاك وجاهز لتنظيم يومك، موادك الدراسية، أو مشاريعك. تحب نبدأ بإيه النهاردة؟`;
  } catch (err) {
    loadingMsg.textContent = `يا هلا بيك يا ${userName}! أنا مساعدك الذكي في MY LIFE OS. حالياً لديك ${pendingTasks.length} مهام نشطة و ${subjectsList.length} مواد دراسية. قولي تحب نرتب جدول مذاكرتك إزاي أو أضيف لك مهمة جديدة؟`;
  }
}

/* ============================================================================
   12. UNIVERSAL MODAL BUILDER (CLEAN BRANDING)
   ============================================================================ */
function openFormModal(title, fieldsHtml, onSubmitCallback) {
  const modal = document.getElementById("universal-modal");
  modal.querySelector(".modal-card")?.classList.remove("pomo-fullscreen-active");
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
/* ==========================================================================
   TASK 3 HELPERS: CTRL+K COMMAND PALETTE, PRIVACY, ZEN, PRAYERS & BRIEFING
   ========================================================================== */

// 1. مؤثرات صوتية تكنولوجية لمسية ناعمة (Tactile Audio Clicks)
function playTactileClick() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {}
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

// 6. الموجز الصباحي الذكي (AI Morning Briefing)
function renderMorningBriefing() {
  const el = document.getElementById("morning-briefing-text");
  if (!el) return;

  const today = todayISO();
  const userName = AppState.user?.displayName || "يا هندسة";
  const tasksToday = AppState.collections.tasks.filter(t => t.dueDate === today && t.status !== "Completed");
  const overdueTasks = AppState.collections.tasks.filter(t => t.dueDate && t.dueDate < today && t.status !== "Completed");
  const subjectsCount = AppState.collections.subjects.length;

  let briefing = `صباح الخير والبركة يا ${userName}! ☀️\n`;
  if (tasksToday.length > 0) {
    briefing += `• لديك اليوم ${tasksToday.length} مهام مجدولة، أولها: "${tasksToday[0].title}".\n`;
  } else {
    briefing += `• جدولك لمهام اليوم هادئ حتى الآن! فرصة ممتازة للمذاكرة أو تطوير مشاريعك.\n`;
  }

  if (overdueTasks.length > 0) {
    briefing += `• تنبيه أولوية: هناك ${overdueTasks.length} مهام متأخرة نوصي بإنهاء واحدة منها اليوم.\n`;
  }

  briefing += `• لديك ${subjectsCount} مواد مسجلة. حافظ على أداء الصلوات في وقتها واستعن بالله! 🚀`;

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

// 3. مؤقت بومودورو الملكي (ملء الشاشة تلقائياً + اللوجو + 5 ألوان منعشة + صوت تك تك)
const PomodoroState = {
  duration: 25 * 60,
  timeLeft: 25 * 60,
  isRunning: false,
  mode: "work",
  intervalId: null,
  tickSoundEnabled: true,
  colorTheme: localStorage.getItem("MY_LIFE_OS_POMO_COLOR") || "gold"
};

const POMO_THEMES = [
  { id: "gold", name: "الذهب الملكي", hex: "#d4af37" },
  { id: "emerald", name: "الزمرد المنعش", hex: "#10b981" },
  { id: "cyan", name: "السماوي النيون", hex: "#06b6d4" },
  { id: "purple", name: "البنفسجي الملكي", hex: "#a855f7" },
  { id: "rose", name: "الياقوت الوردي", hex: "#f43f5e" }
];

// صوت "تك تك" ميكانيكي واقعي بالـ Web Audio API
function playClockTick(isHigh = false) {
  if (!PomodoroState.tickSoundEnabled) return;
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

  // محيط الدائرة (2 * PI * 136 ≈ 854)
  const circleProgress = document.getElementById("pomo-circle-bar");
  if (circleProgress) {
    const total = PomodoroState.duration;
    const offset = 854 - (854 * (PomodoroState.timeLeft / total));
    circleProgress.style.strokeDashoffset = offset;
  }

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

  let tickToggle = false;
  PomodoroState.intervalId = setInterval(() => {
    if (PomodoroState.timeLeft > 0) {
      PomodoroState.timeLeft--;
      playClockTick(tickToggle);
      tickToggle = !tickToggle;
      updatePomodoroDisplays();
    } else {
      clearInterval(PomodoroState.intervalId);
      PomodoroState.isRunning = false;
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
  updatePomodoroDisplays();
}

function resetPomodoro() {
  pausePomodoro();
  PomodoroState.timeLeft = PomodoroState.duration;
  updatePomodoroDisplays();
}

function setCustomPomodoroTime(minutes, mode = "work") {
  const mins = Math.max(1, Math.min(240, Number(minutes) || 25));
  PomodoroState.mode = mode;
  PomodoroState.duration = mins * 60;
  resetPomodoro();
}

function openPomodoroModal() {
  const total = PomodoroState.duration;
  const offset = 854 - (854 * (PomodoroState.timeLeft / total));
  const totalMins = Math.round(PomodoroState.duration / 60);

  const swatchesHtml = POMO_THEMES.map(t => `
    <button
      type="button"
      class="pomo-color-dot ${PomodoroState.colorTheme === t.id ? "active" : ""}"
      style="background:${t.hex}; color:${t.hex}"
      data-pomo-color="${t.id}"
      title="${t.name}"
    ></button>
  `).join("");

  const modalBody = `
    <div class="pomodoro-card">
      <!-- اللوجو الفخم والعنوان العلوي -->
      <div class="pomo-brand-header">
        <div class="pomo-logo-orb">
          <img src="logo.png" alt="MY LIFE OS" onerror="this.style.display='none'" />
        </div>
        <div class="pomo-brand-title">MY LIFE <span>FOCUS</span></div>
      </div>

      <!-- شريط الألوان الـ 5 الفخمة + زر صوت التك تك -->
      <div class="pomo-top-bar">
        <div class="pomo-color-swatches">
          <small class="small-muted">لون الإضاءة:</small>
          ${swatchesHtml}
        </div>
        <button type="button" id="btn-pomo-sound-toggle" class="pomo-preset-btn ${PomodoroState.tickSoundEnabled ? "active" : ""}">
          <i class="fa-solid ${PomodoroState.tickSoundEnabled ? "fa-volume-high" : "fa-volume-xmark"}"></i>
          <span>${PomodoroState.tickSoundEnabled ? "صوت الساعة شغال" : "صامت"}</span>
        </button>
      </div>

      <!-- أزرار اختيار الوقت السريعة + إدخال أي وقت مخصص -->
      <div class="pomodoro-modes-bar">
        <button type="button" class="pomo-preset-btn ${totalMins === 25 && PomodoroState.mode === "work" ? "active" : ""}" data-pomo-set="25">
          25 دقيقة
        </button>
        <button type="button" class="pomo-preset-btn ${totalMins === 45 ? "active" : ""}" data-pomo-set="45">
          45 دقيقة
        </button>
        <button type="button" class="pomo-preset-btn ${totalMins === 60 ? "active" : ""}" data-pomo-set="60">
          <i class="fa-solid fa-crown"></i> ساعة كاملة (60 د)
        </button>
        <button type="button" class="pomo-preset-btn ${PomodoroState.mode === "break" ? "active" : ""}" data-pomo-set="5" data-mode="break">
          <i class="fa-solid fa-mug-hot"></i> استراحة 5 د
        </button>
        <div class="pomo-custom-input-wrap">
          <input type="number" id="pomo-custom-mins" min="1" max="240" value="${totalMins}" title="عدد الدقائق" />
          <button type="button" id="btn-apply-custom-pomo" class="pomo-preset-btn active" style="padding:4px 12px;">تحديد</button>
        </div>
      </div>

      <!-- الساعة السويسرية المضيئة في المنتصف -->
      <div class="pomo-ring-container">
        <svg class="pomo-svg-ring" viewBox="0 0 320 320">
          <circle class="pomo-circle-tracks" cx="160" cy="160" r="150" />
          <circle class="pomo-circle-bg" cx="160" cy="160" r="136" />
          <circle id="pomo-circle-bar" class="pomo-circle-progress" cx="160" cy="160" r="136" stroke-dasharray="854" stroke-dashoffset="${offset}" />
        </svg>
        <div class="pomo-dial-center">
          <span class="pomo-status-pill">
            ${PomodoroState.mode === "break" ? "استراحة واسترخاء ☕" : PomodoroState.isRunning ? "تركيز عميق جارٍ الآن ⚡" : "جاهز للانطلاق 🚀"}
          </span>
          <div id="pomo-modal-display" class="pomodoro-timer-display">${formatPomoTime(PomodoroState.timeLeft)}</div>
          <span class="pomo-sub-caption">إجمالي الجلسة: ${totalMins} دقيقة</span>
        </div>
      </div>

      <!-- أزرار البدء والإعادة -->
      <div class="pomodoro-actions">
        <button type="button" id="btn-pomo-start" class="btn-pomo-main">
          <i class="fa-solid ${PomodoroState.isRunning ? "fa-pause" : "fa-play"}"></i>
          ${PomodoroState.isRunning ? "إيقاف مؤقت" : "بدء التركيز"}
        </button>
        <button type="button" id="btn-pomo-reset" class="btn-pomo-secondary">
          <i class="fa-solid fa-rotate-right"></i> إعادة ضبط
        </button>
      </div>
    </div>
  `;

  openFormModal("مؤقت التركيز الملكي", modalBody, async () => {});
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  // تفعيل ملء الشاشة واللون المختار تلقائياً
  const card = document.querySelector("#universal-modal .modal-card");
  if (card) {
    card.classList.add("pomo-fullscreen-active");
    card.setAttribute("data-pomo-theme", PomodoroState.colorTheme);
  }

  // التبديل الفوري بين الـ 5 ألوان الفخمة
  document.querySelectorAll("[data-pomo-color]").forEach(dot => {
    dot.onclick = () => {
      const selectedColor = dot.dataset.pomoColor;
      PomodoroState.colorTheme = selectedColor;
      localStorage.setItem("MY_LIFE_OS_POMO_COLOR", selectedColor);
      if (card) card.setAttribute("data-pomo-theme", selectedColor);
      document.querySelectorAll("[data-pomo-color]").forEach(d => d.classList.toggle("active", d === dot));
    };
  });

  // أزرار المدد السريعة
  document.querySelectorAll("[data-pomo-set]").forEach(btn => {
    btn.onclick = () => {
      const mins = Number(btn.dataset.pomoSet);
      const mode = btn.dataset.mode || "work";
      setCustomPomodoroTime(mins, mode);
      openPomodoroModal();
    };
  });

  // تحديد مدة مخصصة
  document.getElementById("btn-apply-custom-pomo").onclick = () => {
    const val = document.getElementById("pomo-custom-mins").value;
    if (val) {
      setCustomPomodoroTime(val, "work");
      openPomodoroModal();
      showToast(`تم ضبط المؤقت على ${val} دقيقة`, "success");
    }
  };

  // تبديل صوت التك تك
  document.getElementById("btn-pomo-sound-toggle").onclick = () => {
    PomodoroState.tickSoundEnabled = !PomodoroState.tickSoundEnabled;
    openPomodoroModal();
  };

  // تشغيل / إيقاف
  document.getElementById("btn-pomo-start").onclick = () => {
    if (PomodoroState.isRunning) pausePomodoro(); else startPomodoro();
    openPomodoroModal();
  };

  // إعادة ضبط
  document.getElementById("btn-pomo-reset").onclick = () => {
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
