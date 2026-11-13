/**
 * ============================================================================
 * MY LIFE OS — UNIVERSITY-GRADE 3 MEGA-TRACKS ENCYCLOPEDIA (tracks.js V3)
 * Exclusively Focused on the 3 Core Pillars in Extreme Encyclopedia Detail:
 * 1. FULL-STACK WEB ENGINEERING (All 15 Phases + PHP/Laravel, Node, .NET, Python Alternatives)
 * 2. CYBERSECURITY UNIVERSITY (17 Deep Nodes + Red/Blue/BugBounty/CloudSec/Malware/GRC)
 * 3. AI, DATA SCIENCE & GEN-AI (12 Deep Nodes + ML/DL/Vision/LLMs/RAG/Agents/MLOps)
 *
 * V3 Upgrades:
 * - Full-Width Network Canvas (100% Width) + Wide Multi-Column Dossier Underneath
 * - Ctrl + Mouse Wheel Smooth Zoom & Pan + Fixed Bottom Labels Clearance
 * - Custom User Plan Builder (+ Add Custom Node to Network & Personal Roadmap)
 * - Global Anti-Copy Protection (Blocks Text Selection, Copy, Cut & ContextMenu)
 * ============================================================================
 */

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

const SafeTrackStore = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }
};

/* ============================================================================
   0. GLOBAL ANTI-COPY SHIELD (BLOCKS COPYING ANY TEXT ACROSS THE WEBSITE)
   ============================================================================ */
function initGlobalAntiCopyProtection() {
  if (window.__MY_LIFE_OS_ANTICOPY_ACTIVE) return;
  window.__MY_LIFE_OS_ANTICOPY_ACTIVE = true;

  const isInputTarget = (el) => {
    if (!el) return false;
    const tag = (el.tagName || "").toUpperCase();
    return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
  };

  document.addEventListener("copy", (e) => {
    if (!isInputTarget(e.target)) {
      e.preventDefault();
      toast("🔒 النسخ غير مسموح — جميع محتويات MY LIFE OS محمية", "error");
    }
  });

  document.addEventListener("cut", (e) => {
    if (!isInputTarget(e.target)) {
      e.preventDefault();
    }
  });

  document.addEventListener("contextmenu", (e) => {
    if (!isInputTarget(e.target)) {
      e.preventDefault();
    }
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && !isInputTarget(e.target)) {
      const k = e.key.toLowerCase();
      if (k === "c" || k === "u" || k === "s" || k === "p") {
        e.preventDefault();
        toast("🔒 المحتوى محمي ولا يُسمح بنسخه", "error");
      }
    }
  });
}

/* ============================================================================
   1. SCOPED LUXURY CSS (FULL-WIDTH NETWORK, BOTTOM DOSSIER & ANTI-SELECT)
   ============================================================================ */
function injectTracksStyles() {
  if (document.getElementById("tracks-encyclopedia-styles")) return;
  const style = document.createElement("style");
  style.id = "tracks-encyclopedia-styles";
  style.textContent = `
    /* منع تحديد ونسخ النصوص في الموقع بالكامل ما عدا حقول الكتابة */
    body, body *:not(input):not(textarea) {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }
    input, textarea {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      user-select: text !important;
    }

    /* وضع ملء الشاشة للخريطة الشبكية */
    body.tracks-network-fullscreen .sidebar,
    body.tracks-network-fullscreen .topbar,
    body.tracks-network-fullscreen .app-footer,
    body.tracks-network-fullscreen #alex-mascot-Root,
    body.tracks-network-fullscreen #floating-tasbeeh-widget,
    body.tracks-network-fullscreen #btn-toggle-scratchpad,
    body.tracks-network-fullscreen #scratchpad-drawer {
      display: none !important;
    }
    body.tracks-network-fullscreen .app-shell {
      grid-template-columns: 1fr !important;
    }
    body.tracks-network-fullscreen #view-career-tracks.active {
      animation: none !important;
      transform: none !important;
      padding: 0 !important;
    }

    /* شريط الـ 3 مجالات الكبرى فقط بحجم فخم وواضح */
    .tracks-domain-bar {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 22px;
    }
    @media (max-width: 960px) {
      .tracks-domain-bar {
        grid-template-columns: 1fr;
      }
    }
    .track-domain-pill {
      background: rgba(15, 20, 34, 0.92);
      border: 1.5px solid rgba(255, 255, 255, 0.1);
      border-radius: 18px;
      padding: 18px 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 15px;
      transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
      text-align: start;
      color: var(--text-primary);
      font-family: inherit;
    }
    .track-domain-pill:hover {
      border-color: var(--gold-primary);
      transform: translateY(-3px);
    }
    .track-domain-pill.active {
      background: linear-gradient(135deg, rgba(212, 167, 44, 0.25), rgba(16, 185, 129, 0.12));
      border-color: var(--gold-primary);
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.65), 0 0 24px rgba(212, 167, 44, 0.22);
    }
    .track-domain-icon {
      width: 52px;
      height: 52px;
      min-width: 52px;
      border-radius: 14px;
      background: rgba(212, 167, 44, 0.16);
      color: var(--gold-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.45rem;
    }
    .track-domain-pill.active .track-domain-icon {
      background: var(--gold-primary);
      color: #05070e;
    }

    .track-hero-card {
      background: linear-gradient(135deg, rgba(17, 24, 39, 0.96), rgba(9, 13, 25, 0.99));
      border: 1px solid rgba(212, 167, 44, 0.42);
      border-radius: 22px;
      padding: 24px 26px;
      margin-bottom: 22px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
    }
    .track-why-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 14px;
      margin-top: 16px;
    }
    .track-why-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-right: 4px solid var(--gold-primary);
      border-radius: 14px;
      padding: 14px 16px;
    }

    /* الخريطة الشبكية بعرض كامل 100% + التفاصيل تحتها مباشرة */
    .network-graph-shell {
      position: relative;
      background: radial-gradient(circle at 50% 35%, #131c31 0%, #070a12 100%);
      border: 1.5px solid rgba(212, 167, 44, 0.45);
      border-radius: 22px;
      overflow: hidden;
      margin-bottom: 24px;
      box-shadow: 0 22px 55px rgba(0, 0, 0, 0.8);
      display: flex;
      flex-direction: column;
    }
    .network-graph-shell.is-fullscreen {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 999999 !important;
      border-radius: 0 !important;
      margin: 0 !important;
      border: none !important;
      overflow-y: auto !important;
    }
    .network-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      padding: 14px 20px;
      background: rgba(9, 13, 25, 0.96);
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
    }
    .network-sub-legend-bar {
      background: rgba(13, 19, 34, 0.92);
      border-bottom: 1px solid rgba(212, 167, 44, 0.2);
      padding: 8px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 0.78rem;
      color: var(--text-secondary);
    }
    .network-canvas-wrap {
      position: relative;
      width: 100%;
      height: 590px;
      border-bottom: 2px solid rgba(212, 167, 44, 0.35);
    }
    .network-graph-shell.is-fullscreen .network-canvas-wrap {
      height: 68vh;
      min-height: 520px;
    }
    .network-canvas-viewport {
      width: 100%;
      height: 100%;
      display: block;
      cursor: grab;
    }
    .network-canvas-viewport:active {
      cursor: grabbing;
    }

    /* لوحة التفاصيل العميقة للمهارة المختارة (تحت الشبكة بعرض كامل ومقسمة لأعمدة) */
    .node-deep-dossier {
      background: linear-gradient(180deg, rgba(12, 17, 30, 0.98), rgba(8, 11, 20, 0.99));
      padding: 24px 26px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .dossier-grid-2col {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      gap: 18px;
      align-items: stretch;
    }
    @media (max-width: 1024px) {
      .dossier-grid-2col {
        grid-template-columns: 1fr;
      }
    }
    .dossier-section-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 16px 18px;
    }
    .dossier-section-box h5 {
      color: var(--gold-primary);
      font-size: 0.92rem;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .module-lesson-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 7px 0;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.07);
      font-size: 0.87rem;
      line-height: 1.65;
    }
    .module-lesson-item:last-child {
      border-bottom: none;
    }
    .mastery-pillar-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 9px 12px;
      background: rgba(9, 13, 25, 0.72);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      margin-bottom: 8px;
      font-size: 0.84rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .mastery-pillar-row:hover {
      border-color: var(--gold-primary);
    }
    .mastery-pillar-row input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: var(--emerald-primary);
      cursor: pointer;
    }

    /* كروت المسارات البديلة وخطط المستخدم الخاصة */
    .alt-paths-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(295px, 1fr));
      gap: 16px;
    }
    .alt-path-card {
      background: linear-gradient(155deg, rgba(19, 27, 46, 0.94), rgba(11, 15, 26, 0.98));
      border: 1px solid rgba(33, 197, 197, 0.3);
      border-radius: 16px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
    }
    .role-specialist-card {
      background: linear-gradient(160deg, rgba(18, 25, 43, 0.92), rgba(10, 14, 24, 0.96));
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      transition: all 0.25s ease;
    }
    .role-specialist-card:hover {
      border-color: var(--gold-primary);
      transform: translateY(-3px);
    }
    .cert-pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 6px;
    }
    .cert-badge {
      background: rgba(212, 167, 44, 0.14);
      border: 1px solid rgba(212, 167, 44, 0.4);
      color: #f3e5ab;
      padding: 3px 10px;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 700;
      font-family: 'Inter', sans-serif;
    }
    .tool-badge {
      background: rgba(33, 197, 197, 0.12);
      border: 1px solid rgba(33, 197, 197, 0.35);
      color: #67e8f9;
      padding: 2px 9px;
      border-radius: 6px;
      font-size: 0.74rem;
      font-family: 'Inter', sans-serif;
    }
    .yt-resource-card {
      background: rgba(15, 20, 34, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 12px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
  `;
  document.head.appendChild(style);
}

/* ============================================================================
   2. ENCYCLOPEDIA SYLLABUS FOR EVERY SINGLE NODE IN THE 3 MEGA-TRACKS
   ============================================================================ */
const DEEP_NODE_SYLLABUS = {
  /* ---------------- A. FULL-STACK WEB (ALL 15 PHASES IN DETAIL) ---------------- */
  w_p1: {
    phase: "المرحلة 1 • Programming & Web Mechanics",
    hours: "25 ساعة",
    alternatives: "متطلب أساسي موحد لجميع لغات الويب (سواء اخترت JS أو PHP أو Python أو .NET)",
    modules: [
      "1. كيف يعمل الإنترنت فعلياً: عنوان IP، خوادم DNS، الكابلات البحرية، والـ Hosting",
      "2. بروتوكول HTTP/HTTPS بالتفصيل: Methods (GET, POST, PUT, DELETE)، Status Codes (200, 404, 500)، والـ Headers",
      "3. كيف يقرأ المتصفح الكود: بناء شجرة DOM و CSSOM ومراحل الـ Rendering Engine",
      "4. أساسيات التفكير المنطقي والخوارزمي، المتغيرات، الشروط، والحلقات التكرارية",
      "5. إعداد بيئة العمل الاحترافية: VS Code، إضافات المطورين، والتعامل مع الـ Terminal"
    ],
    criteria: "القدرة على شرح رحلة طلب موقع ويب من لحظة كتابة الرابط في المتصفح حتى عودة الرد من السيرفر، وفهم الفرق بين الـ Frontend والـ Backend.",
    project: "تجهيز بيئة التطوير وفحص 5 طلبات HTTP حية باستخدام Chrome DevTools (تبويب Network) وتوثيق الـ Headers والـ Payload."
  },
  w_p2: {
    phase: "المرحلة 2 • HTML5, CSS3 & Responsive UI",
    hours: "45 ساعة",
    alternatives: "البدائل وأطر التنسيق: Tailwind CSS (الأكثر طلباً) | Bootstrap 5 | Sass/SCSS | Bulma",
    modules: [
      "1. HTML5 الدلالية (Semantic Tags): header, nav, main, section, article, footer، النماذج المتقدمة Forms، ومعايير SEO و Accessibility",
      "2. CSS3 Core & Box Model: Margin, Padding, Border, Positioning (Relative, Absolute, Fixed, Sticky)",
      "3. التخطيط الحديث: إتقان Flexbox بالكامل + CSS Grid لبناء شبكات الواجهات المعقدة",
      "4. التصميم المتجاوب (Responsive Design): Media Queries، وحدات القياس المرنة (rem, vh, vw, clamp) لجميع الشاشات",
      "5. الحركات والمؤثرات: CSS Transitions, Keyframe Animations, Variables (Custom Properties) & Dark Mode",
      "6. إتقان إطار Tailwind CSS لبناء واجهات سريعة وحديثة مباشرة داخل الكلاس"
    ],
    criteria: "تحويل أي تصميم من Figma إلى صفحة ويب متجاوبة 100% على الكمبيوتر والموبايل باستخدام Flexbox و Grid و Tailwind بدون أي كود جاهز.",
    project: "بناء واجهة منصة تعليمية أو متجر إلكتروني متكامل (Landing Page + Dashboard) متجاوب بالكامل مع وضع ليلي ونهاري."
  },
  w_p3: {
    phase: "المرحلة 3 • JavaScript Deep Dive (ES6+)",
    hours: "65 ساعة",
    alternatives: "البديل: لا يوجد بديل عن JavaScript في المتصفح — هي اللغة الوحيدة التي يفهمها المتصفح مباشرة",
    modules: [
      "1. أساسيات اللغة العميقة: أنواع البيانات، الدوال (Arrow Functions)، المصفوفات (map, filter, reduce) والكائنات Objects",
      "2. محرك الجافاسكريبت من الداخل: Execution Context، Hoisting، Scope Chain، والـ Closures",
      "3. التحكم الكامل في المتصفح (DOM & BOM): الأحداث Events، Event Delegation، والتخزين المحلي (LocalStorage / SessionStorage)",
      "4. البرمجة الكائنية في جافاسكريبت: Prototypes، Classes، الوراثة، وكلمة `this`",
      "5. البرمجة غير المتزامنة (Async JS): Event Loop، Callbacks، Promises، `async / await`، والاتصال بالـ APIs عبر `fetch`",
      "6. تنظيم الكود بـ ES6 Modules (import / export) ومعالجة الأخطاء `try / catch`"
    ],
    criteria: "القدرة على بناء تطبيق ويب تفاعلي كامل بـ Vanilla JS يتصل بـ API خارجي ويعالج البيانات ويحفظ حالة المستخدم بدون أي مكتبات.",
    project: "بناء تطبيق إدارة مهام ومالية تفاعلي (مع فلترة وبحث واتصال بـ API للعملات والطقس) باستخدام JavaScript الخالصة فقط."
  },
  w_p4: {
    phase: "المرحلة 4 • Git, GitHub & TypeScript Mastery",
    hours: "35 ساعة",
    alternatives: "منصات Git البديلة: GitHub | GitLab | Bitbucket — ويمكن استخدام JSDoc كبديل خفيف عن TypeScript في المشاريع الصغيرة",
    modules: [
      "1. نظام Git لإدارة الإصدارات: init, add, commit, status, log, diff وفهم كيف يحفظ Git اللقطات",
      "2. الفروع والعمل الجماعي (Branching & Merging): checkout, merge, rebase، وحل تعارض الأكواد (Merge Conflicts)",
      "3. الاحتراف على GitHub: Pull Requests، Code Reviews، Issues، ورفع المشاريع على GitHub Pages / Vercel",
      "4. لغة TypeScript: الأنواع الأساسية، Interfaces vs Types، Union & Intersection Types",
      "5. TypeScript المتقدمة: Generics `<T>`، Utility Types (Partial, Pick, Omit)، وتأمين استجابات الـ APIs"
    ],
    criteria: "كتابة كود خالٍ تماماً من خطأ `Cannot read properties of undefined` باستخدام TypeScript، وإدارة فروع المشروع على GitHub باحترافية.",
    project: "إعادة بناء مشروع الجافاسكريبت السابق باستخدام TypeScript الصارمة ورفعه في مستودع GitHub منظم بفروع وملف README احترافي."
  },
  w_p5: {
    phase: "المرحلة 5 • React.js Fundamentals",
    hours: "45 ساعة",
    alternatives: "البدائل القوية في سوق العمل للفرونت إند: Vue.js 3 (سهل وسريع جداً وشائع مع Laravel) | Angular (مطلوب في البنوك والشركات الكبرى) | Svelte",
    modules: [
      "1. فلسفة المباني القائمة على المكونات (Component-Based Architecture)، الـ JSX، والـ Virtual DOM",
      "2. تمرير البيانات والأحداث: Props، Children، والتعامل مع القوائم والـ Keys",
      "3. إدارة الحالة الأساسية بـ Hooks: `useState`، دورة حياة المكون في `useEffect`، والوصول للعناصر بـ `useRef`",
      "4. التعامل مع النماذج (Controlled vs Uncontrolled Forms) والتحقق من المدخلات بـ React Hook Form + Zod",
      "5. التوجيه وتعدد الصفحات (Client-Side Routing) باستخدام React Router v7"
    ],
    criteria: "بناء تطبيق Single Page Application (SPA) متعدد الصفحات بمكونات قابلة لإعادة الاستخدام ونماذج محكومة.",
    project: "بناء واجهة متجر إلكتروني تفاعلي بـ React (عرض المنتجات، سلة المشتريات، الفلترة الفورية، وصفحة الدفع)."
  },
  w_p6: {
    phase: "المرحلة 6 • Advanced React & State Architecture",
    hours: "40 ساعة",
    alternatives: "بدائل إدارة الحالة: Zustand (الأخف والأحدث) | Redux Toolkit (المعيار المؤسسي) | Pinia (لمسار Vue) | NgRx (لمسار Angular)",
    modules: [
      "1. بناء Custom Hooks لفصل منطق البيانات عن واجهة العرض",
      "2. مشاركة البيانات العامة: Context API + `useReducer` ومتى تتجنب إعادة الرسم غير الضرورية",
      "3. إدارة حالة السيرفر والكاش (Server State): إتقان TanStack React Query (Caching, Pagination, Optimistic Updates)",
      "4. إدارة الحالة العامة للتطبيقات الضخمة باستخدام Zustand و Redux Toolkit",
      "5. تحسين الأداء (Performance Optimization): `useMemo`، `useCallback`، `React.memo`، و Code Splitting (`React.lazy`)"
    ],
    criteria: "إدارة حالة تطبيق ضخم بدون حدوث البطء أو الـ Prop Drilling، مع كاش ذكي لطلبات السيرفر.",
    project: "تطوير لوحة تحكم تحليلية (Admin & CRM Dashboard) بـ React Query و Zustand مع رسوم بيانية وجداول فائقة السرعة."
  },
  w_p7: {
    phase: "المرحلة 7 • Next.js & Modern Full-Stack SSR",
    hours: "45 ساعة",
    alternatives: "الأطر الموازية: Nuxt.js (لمسار Vue) | Inertia.js (يربط React/Vue مع Laravel PHP بسلاسة مذهلة) | Remix / Astro",
    modules: [
      "1. الفرق الجوهري بين CSR (المتصفح) و SSR (السيرفر) و SSG (التوليد الثابت) و ISR",
      "2. معمارية Next.js App Router: مجلد `app/`، التخطيطات المتداخلة Layouts، والصفحات",
      "3. مكونات السيرفر (React Server Components) مقابل مكونات العميل (`'use client'`)",
      "4. جلب البيانات في السيرفر، الـ Server Actions، والـ Route Handlers (API Endpoints)",
      "5. تحسين محركات البحث (Dynamic Metadata & SEO)، تحسين الصور والخطوط، والـ Middleware"
    ],
    criteria: "بناء تطبيق يجمع بين سرعة التحميل الفورية، تصدر نتائج البحث SEO، وحماية العمليات الحساسة على السيرفر.",
    project: "بناء منصة تدوين تقنية أو منصة كورسات بـ Next.js App Router تدعم SSR والـ SEO الديناميكي."
  },
  w_p8: {
    phase: "المرحلة 8 • Backend Engineering (Node / PHP Laravel / Python / .NET)",
    hours: "70 ساعة",
    alternatives: "🔥 اختر مساراً واحداً للباك إند وأتقنه: 1) PHP & Laravel (مطلوب بقوة هائلة في مصر والخليج والعمل الحر) | 2) Node.js & Express/NestJS (لغة واحدة للفرونت والباك) | 3) Python Django/FastAPI (ممتاز مع الـ AI) | 4) C# ASP.NET Core (شركات الإنتربرايز والبنوك)",
    modules: [
      "1. معمارية السيرفر وبروتوكولات الويب: Web Servers (Nginx / Apache)، دورة حياة الطلب، والـ MVC Architecture",
      "2. المسار الأول (Node.js): Event-Driven Architecture، بناء REST APIs بـ Express.js ثم المعمارية المؤسسية بـ NestJS",
      "3. المسار البديل القوي (PHP 8+ & Laravel 11): OOP in PHP, Composer, Routing, Controllers, Blade, Eloquent ORM, Queues & Filament Admin",
      "4. المسار البديل الثالث (Python / .NET): بناء APIs بـ FastAPI/Django أو ASP.NET Core Web API",
      "5. تصميم RESTful APIs قياسية + GraphQL، التعامل مع الملفات المرفوعة، الـ Middleware، ومعالجة الأخطاء المركزية"
    ],
    criteria: "بناء خادم Backend كامل ومهيكل بطريقة هندسية نظيفة (MVC أو Clean Architecture) يقدم APIs موثقة بـ Swagger/Postman سواء بـ Node أو PHP Laravel أو غيرها.",
    project: "بناء Backend كامل لنظام إدارة جامعة أو متجر إلكتروني (سواء بـ Node/NestJS أو PHP Laravel) يشمل الصلاحيات ورفع الملفات والـ APIs."
  },
  w_p9: {
    phase: "المرحلة 9 • Database Engineering (SQL, NoSQL & Caching)",
    hours: "50 ساعة",
    alternatives: "قواعد البيانات والـ ORMs: PostgreSQL / MySQL (SQL) | MongoDB / Firebase Firestore (NoSQL) | Prisma / TypeORM (Node) | Eloquent (PHP Laravel)",
    modules: [
      "1. تصميم قواعد البيانات العلائقية (Relational DB Design): الجداول، المفاتيح الأساسية والأجنبية، العلاقات (1:1, 1:N, N:M)، والـ Normalization",
      "2. إتقان لغة SQL المتقدمة على PostgreSQL أو MySQL: Joins، التجميع Group By، الاستعلامات الفرعية، والـ Transactions (ACID)",
      "3. هندسة الأداء في قواعد البيانات: كيف تعمل الفهارس (B-Tree Indexes) لتسريع البحث من ثوانٍ إلى أجزاء من المللي ثانية",
      "4. قواعد البيانات غير العلائقية والسحابية (NoSQL): MongoDB Document Model + Firebase Firestore للأنظمة اللحظية",
      "5. استخدام الـ ORM (Prisma / Eloquent / TypeORM) + التخزين المؤقت فائق السرعة في الذاكرة عبر Redis"
    ],
    criteria: "تصميم مخطط قاعدة بيانات (ERD) لأي نظام معقد، كتابة استعلامات سريعة مفهرسة، واستخدام Redis لتخزين البيانات المتكررة.",
    project: "تصميم وتنفيذ قاعدة بيانات علائقية لنظام حجز ومخزون مع ربطها بـ Redis Cache وتقليل وقت الاستعلام بنسبة 80%."
  },
  w_p10: {
    phase: "المرحلة 10 • Authentication, Authorization & Identity",
    hours: "35 ساعة",
    alternatives: "حلول الهوية: JWT & Cookies مخصص | Laravel Sanctum / Passport (لـ PHP) | NextAuth / Auth.js | Firebase Auth / Clerk",
    modules: [
      "1. الفرق الدقيق بين التحقق من الهوية (Authentication) ومنح الصلاحيات (Authorization)",
      "2. تشفير كلمات المرور بطريقة آمنة لا تقبل العكس باستخدام `bcrypt` أو `Argon2` مع الـ Salt",
      "3. الجلسات التقليدية (Server Sessions & HttpOnly Cookies) مقابل التوكن (JWT: Access Token & Refresh Token Rotation)",
      "4. التسجيل الموحد عبر الأطراف الخارجية (OAuth 2.0 & OpenID Connect): الدخول بحساب Google و GitHub",
      "5. هندسة الصلاحيات المتعددة: Role-Based Access Control (RBAC: Admin, Instructor, Student) والمصادقة الثنائية 2FA/OTP"
    ],
    criteria: "تأمين أي تطبيق بنظام دخول متكامل يدعم تجديد الجلسة تلقائياً ويمنع المستخدم العادي من الوصول لصفحات أو APIs الإدارة.",
    project: "بناء خدمة هوية وصلاحيات كاملة (Auth Micro-Module) تدعم التسجيل، تفعيل الإيميل، استعادة كلمة السر، Google OAuth، ورتب المستخدمين."
  },
  w_p11: {
    phase: "المرحلة 11 • Automated Testing & Quality Assurance",
    hours: "30 ساعة",
    alternatives: "أدوات الاختبار حسب لغتك: Vitest / Jest (JS/TS) | PHPUnit / Pest (PHP Laravel) | PyTest (Python) | Playwright / Cypress (E2E)",
    modules: [
      "1. هرم الاختبارات البرمجية (Testing Pyramid): Unit Tests، Integration Tests، و End-to-End (E2E) Tests",
      "2. اختبارات الوحدات (Unit Testing): اختبار الدوال والمنطق المعزول وعمل Mocking للخدمات الخارجية",
      "3. اختبارات التكامل للـ APIs وقواعد البيانات (Supertest / Pest) للتأكد من صحة الردود والبيانات",
      "4. اختبارات الواجهات الشاملة (E2E Testing) باستخدام Playwright لمحاكاة نقرات المستخدم الحقيقي في المتصفح",
      "5. منهجية التطوير الموجه بالاختبارات (TDD) وتشغيل الاختبارات تلقائياً قبل قبول أي كود"
    ],
    criteria: "كتابة حزمة اختبارات آلية تغطي أهم مسارات التطبيق (الدخول، الدفع، إنشاء البيانات) وتكتشف أي خطأ فور تعديل الكود.",
    project: "كتابة 20 اختبار Unit & API لمشروعك الخلفي + 5 اختبارات E2E بـ Playwright تختبر رحلة المستخدم كاملة."
  },
  w_p12: {
    phase: "المرحلة 12 • Web Application Security & Hardening",
    hours: "35 ساعة",
    alternatives: "أدوات الفحص والحماية: Helmet.js | Cloudflare WAF | OWASP ZAP | Snyk / Dependabot",
    modules: [
      "1. حماية التطبيق من ثغرات OWASP Top 10: منع حقن قواعد البيانات (SQL Injection) عبر Prepared Statements",
      "2. منع ثغرات البرمجة عبر المواقع (XSS) وتأمين الكوكيز وحماية النماذج ضد CSRF",
      "3. منع ثغرات تخطي الصلاحيات (IDOR / Broken Access Control) وفحص ملكية كل سجل في السيرفر",
      "4. تأمين الـ APIs: تحديد معدل الطلبات (Rate Limiting) لمنع هجمات Brute-Force و DDoS، وضبط سياسات CORS",
      "5. ترويسات الأمان القياسية (Security Headers: CSP, HSTS, X-Frame-Options) وتأمين رفع الملفات وفحص المكتبات"
    ],
    criteria: "مراجعة أي مشروع ويب وإغلاق جميع الثغرات الأمنية الشائعة فيه واجتياز فحص OWASP ZAP بدون ثغرات حرجة.",
    project: "إجراء مراجعة وتأمين شامل (Security Hardening) لمشروعك وإضافة Rate Limiter و CSP Headers وحماية ضد XSS/SQLi."
  },
  w_p13: {
    phase: "المرحلة 13 • System Design & Scalable Architecture",
    hours: "45 ساعة",
    alternatives: "أنماط المعمارية: Modular Monolith (الأفضل لـ 90% من الشركات) | Microservices | Serverless Architecture",
    modules: [
      "1. التوسع الرأسي (Vertical Scaling) مقابل التوسع الأفقي (Horizontal Scaling) وموزعات الأحمال (Load Balancers)",
      "2. استراتيجيات الكاش المتقدمة (Caching Layers): المتصفح، شبكات CDN، كاش السيرفر (Redis)، وكاش قاعدة البيانات",
      "3. المعالجة غير المتزامنة والطوابير (Message Queues & Background Jobs): RabbitMQ / BullMQ / Laravel Queues لإرسال الإيميلات والتقارير",
      "4. الاتصالات اللحظية (Real-Time Systems): WebSockets (Socket.io / Pusher) والإشعارات الفورية",
      "5. تقسيم قواعد البيانات الضخمة (Replication, Read Replicas, Sharding) ومعمارية المونوليث المنظم مقابل الميكروسيرفس"
    ],
    criteria: "القدرة على رسم وتصميم معمارية نظام يتحمل 100 ألف مستخدم متزامن مع شرح كيف يتدفق الطلب بين الـ Load Balancer والكاش وقاعدة البيانات.",
    project: "تصميم وتنفيذ نظام إشعارات ودردشة لحظية بـ WebSockets مع نظام طوابير خلفية (Background Queue) لمعالجة المهام الثقيلة."
  },
  w_p14: {
    phase: "المرحلة 14 • Docker, CI/CD & Cloud Deployment",
    hours: "40 ساعة",
    alternatives: "منصات الاستضافة والسحابة: VPS (Ubuntu + Nginx + Docker) | AWS / DigitalOcean | Vercel / Railway / Render | Hostinger / Forge (لـ PHP)",
    modules: [
      "1. أساسيات سيرفرات لينكس للإنتاج: الاتصال عبر SSH، إدارة العمليات بـ PM2 / Supervisor، وجدار الحماية UFW",
      "2. الحاويات بـ Docker: كتابة `Dockerfile` احترافي متعدد المراحل (Multi-stage) وتشغيل البيئة كاملة بـ `docker-compose.yml`",
      "3. إعداد خادم الويب Nginx كـ Reverse Proxy وتفعيل شهادة التشفير المجانية SSL (HTTPS عبر Let's Encrypt)",
      "4. أتمتة النشر المستمر (CI/CD Pipelines) باستخدام GitHub Actions: فحص الكود وتشغيل الاختبارات والنشر التلقائي للسيرفر عند عمل Push",
      "5. مراقبة السيرفر في الإنتاج (Logging, Uptime Monitoring, Error Tracking with Sentry) والنسخ الاحتياطي التلقائي لقاعدة البيانات"
    ],
    criteria: "رفع تطبيق كامل (واجهة + خادم + قاعدة بيانات) داخل حاويات Docker على سيرفر سحابي حقيقي بدومين مؤمن بـ HTTPS مع نشر تلقائي عبر GitHub Actions.",
    project: "تغليف مشروعك بالكامل في Docker Compose وإنشاء خط أنابيب GitHub Actions ينشر التحديثات تلقائياً مع SSL."
  },
  w_p15: {
    phase: "المرحلة 15 • Production SaaS Capstone & Career Readiness",
    hours: "80 ساعة",
    alternatives: "مسارات العمل بعد التخرج: التوظيف في شركات المنتج (Product Companies) | العمل عن بُعد مع شركات عالمية | العمل الحر (Freelancing) وبناء SaaS خاص",
    modules: [
      "1. التخطيط الهندسي للمنتج النهائي: تحليل المتطلبات، رسم ERD لقاعدة البيانات، وتصميم الـ APIs والواجهات",
      "2. دمج بوابات الدفع الإلكتروني والاشتراكات (Stripe / Paymob / Fawry) والتعامل مع الـ Webhooks بأمان",
      "3. بناء لوحة تحكم إدارية شاملة، تقارير تحليلية، وتصدير ملفات PDF / Excel",
      "4. كتابة توثيق هندسي احترافي (System Architecture Docs & API Documentation)",
      "5. تجهيز معرض الأعمال (Portfolio)، السيرة الذاتية المتوافقة مع ATS، والتحضير لأسئلة المقابلات التقنية (Live Coding & System Design)"
    ],
    criteria: "إطلاق منصة SaaS متكاملة تعمل فعلياً على الإنترنت، مسجل بها مستخدمون حقيقيون، وتغطي جميع المراحل الـ 14 السابقة.",
    project: "إطلاق مشروع التخرج النهائي (Production SaaS Platform) كاملاً بالأكواد النظيفة، الاختبارات، الدفع الإلكتروني، والنشر السحابي."
  },

  /* ---------------- B. CYBERSECURITY (ALL 17 NODES IN DETAIL) ---------------- */
  n_net: {
    phase: "Phase 1 • التأسيس الشبكي الإجباري",
    hours: "45 ساعة",
    alternatives: "المسارات التعليمية للشبكات: كورس CCNA 200-301 (الأعمق عملياً) | شهادة CompTIA Network+ (ممتازة ومختصرة للسايبر)",
    modules: [
      "1. معمارية الشبكات وطبقات OSI الـ 7 ونموذج TCP/IP وكيف تنتقل البيانات (Encapsulation)",
      "2. العنونة وتقسيم الشبكات: IPv4، IPv6، الـ Subnetting اليدوي، CIDR، والـ NAT/PAT",
      "3. بروتوكولات النقل والشبكة: TCP 3-Way Handshake (SYN, SYN-ACK, ACK)، UDP، ICMP، وبروتوكول ARP",
      "4. بروتوكولات التطبيقات الحساسة أمنياً: HTTP/HTTPS، DNS، DHCP، SMB، SSH، FTP، و SMTP",
      "5. أجهزة الشبكة والدفاع: Switches (VLANs)، Routers، Firewalls (Stateful/Stateless)، VPNs، وأنظمة IDS/IPS",
      "6. التحليل العملي للحزم: إتقان برنامج Wireshark لقراءة وتصفية ملفات الـ PCAP وتتبع الهجمات"
    ],
    criteria: "تقسيم أي شبكة فرعية بدون آلة حاسبة، وتحليل ملف ترافيك داخل Wireshark لاستخراج البيانات المرسلة وكشف جلسات الاتصال المشبوهة.",
    project: "بناء شبكة شركة مقسمة لـ 3 VLANs على Packet Tracer أو GNS3 مع ضبط قوانين Firewall وتحليل الحزم بـ Wireshark."
  },
  n_lin: {
    phase: "Phase 1 • التأسيس الإجباري في أنظمة لينكس",
    hours: "35 ساعة",
    alternatives: "التوزيعات المقترحة: Ubuntu / Debian (للسيرفرات والـ Blue Team) | Kali Linux / Parrot OS (لاختبار الاختراق والـ Red Team)",
    modules: [
      "1. هيكلية نظام الملفات في لينكس (`/etc`, `/var/log`, `/proc`, `/tmp`) وإتقان سطر الأوامر CLI",
      "2. إدارة المستخدمين والمجموعات والصلاحيات (`chmod`, `chown`, والصلاحيات الخاصة الخطيرة `SUID / SGID` و `sudoers`)",
      "3. إدارة العمليات والخدمات (`ps`, `top`, `systemctl`, `journalctl`) والمهام المجدولة `cronjobs`",
      "4. أوامر الشبكات والجدار الناري في لينكس (`ip`, `ss`, `netstat`, `ufw`, `iptables`, وإعداد مفتاح SSH)",
      "5. برمجة سكربتات Bash لأتمتة مهام الفحص وتصفية البيانات باستخدام `grep`, `awk`, `sed`, `cut`, والـ Pipes"
    ],
    criteria: "إدارة وتأمين سيرفر لينكس بالكامل من الشاشة السوداء، وكتابة سكربتات Bash تؤتمت عمليات البحث والفحص.",
    project: "كتابة أداة Bash أوتوماتيكية تفحص السيرفر وتكشف الملفات ذات صلاحيات SUID غير الطبيعية وتستخرج محاولات اختراق SSH من السجلات."
  },
  n_win: {
    phase: "Phase 1 • التأسيس الإجباري في ويندوز والدومين",
    hours: "40 ساعة",
    alternatives: "بيئة التطبيق: بناء المختبر محلياً على VMware / VirtualBox أو استخدام مختبرات TryHackMe (Active Directory Basics)",
    modules: [
      "1. معمارية Windows من الداخل (Windows Internals): العمليات، الـ Threads، الـ Services، الـ Registry، ومكتبات DLLs",
      "2. هندسة بيئة الشركات Active Directory (AD): الدومين، Domain Controllers، الأشجار والغابات، والـ Organizational Units",
      "3. بروتوكولات التوثيق في الدومين: كيف يعمل Kerberos (تذاكر TGT و TGS) مقابل بروتوكول NTLM Hashes",
      "4. سياسات المجموعات (Group Policy Objects - GPOs) وقوائم التحكم في الوصول (ACLs & DACLs)",
      "5. إتقان PowerShell للإدارة الأمنية، الفحص، وقراءة سجلات Windows Event Logs"
    ],
    criteria: "فهم كيف تدار أجهزة الشركات داخل Active Directory، وإعداد دومين كامل محلياً مع مستخدمين وصلاحيات.",
    project: "بناء مختبر Active Directory على جهازك (Windows Server DC + جهازين Windows 10) وتطبيق سياسات تأمين عبر GPO."
  },
  n_code: {
    phase: "Phase 1 • البرمجة التطبيقية للأمن السيبراني",
    hours: "45 ساعة",
    alternatives: "لغات السايبر: Python (إجبارية للأتمتة) + JavaScript/SQL (لفهم ثغرات الويب) + Go أو C/C++ (للمستوى المتقدم وتطوير الأدوات)",
    modules: [
      "1. إتقان لغة Python: المتغيرات، القواميس، الملفات، التعامل مع الأخطاء، والبرمجة متعددة الخيوط (Multi-threading)",
      "2. برمجة الشبكات والويب بـ Python: مكتبة `socket`، مكتبة `requests` للتعامل مع الويب، ومكتبة `scapy` لصناعة الحزم",
      "3. لغة JavaScript للأمن السيبراني: كيف يتعامل المتصفح مع الكود، الـ DOM، الكوكيز، والـ LocalStorage (أساس ثغرات XSS)",
      "4. قواعد البيانات ولغة SQL: كتابة الاستعلامات ودمج الجداول بـ `JOIN` و `UNION` (الأساس الجوهري لفهم ثغرات SQL Injection)",
      "5. قراءة الأكواد المصدرية (Source Code Review) بلغات PHP و Node.js و Python لاكتشاف الأخطاء المنطقية والأمنية"
    ],
    criteria: "القدرة على قراءة أي كود استغلال (Exploit) وتعديله ليناسب هدفك، وبناء أدوات فحص خاصة بك من الصفر.",
    project: "برمجة أداة فحص أمني متكاملة بـ Python تشمل Port Scanner سريع + فاحص مسارات خفية (Directory Brute-forcer)."
  },
  n_secplus: {
    phase: "Phase 2 • القاعدة الأمنية الشاملة (Security+ Core)",
    hours: "40 ساعة",
    alternatives: "الشهادات والمناهج الموازية: CompTIA Security+ SY0-701 | شهادة ISC2 CC (مجانية للمبتدئين) | Google Cybersecurity Certificate",
    modules: [
      "1. علم التشفير التطبيقي (Cryptography): التشفير المتماثل (AES)، غير المتماثل (RSA/ECC)، الهاش (SHA-256)، والشهادات الرقمية PKI",
      "2. إدارة الهوية والصلاحيات (IAM): المصادقة متعددة العوامل MFA، الدخول الموحد SSO، ومبدأ أقل صلاحية (Least Privilege)",
      "3. تشريح التهديدات والهجمات: البرمجيات الخبيثة، الهندسة الاجتماعية، التصيد الاحتيالي، وهجمات الشبكات والتطبيقات",
      "4. معمارية الدفاع العميق (Defense in Depth)، نموذج عدم الثقة (Zero Trust)، وأساسيات تأمين السحابة",
      "5. مبادئ الاستجابة للحوادث الأمنية، إدارة المخاطر، واستمرارية الأعمال"
    ],
    criteria: "إتقان المفاهيم القياسية للأمن السيبراني والقدرة على اجتياز اختبارات CompTIA Security+ التجريبية بنسبة تتجاوز 85%.",
    project: "تصميم خطة تأمين شاملة (Security Architecture Blueprint) لشركة ناشئة تشمل الشبكة، الخوادم، الهوية، والنسخ الاحتياطي."
  },
  n_websec: {
    phase: "Phase 2 • أمن تطبيقات الويب والـ APIs (OWASP)",
    hours: "65 ساعة",
    alternatives: "أدوات الفحص: Burp Suite Community/Pro | Caido (بديل حديث وسريع جداً) | OWASP ZAP (مجاني ومفتوح المصدر)",
    modules: [
      "1. احتراف اعتراض وتعديل الطلبات باستخدام Burp Suite / Caido (Proxy, Repeater, Intruder, Decoder)",
      "2. ثغرات الحقن من طرف السيرفر: SQL Injection (Union, Error, Blind, Time-based)، Command Injection، و SSTI",
      "3. ثغرات طرف العميل والمتصفح: XSS (Reflected, Stored, DOM-based)، CSRF، Clickjacking، وأخطاء إعداد CORS",
      "4. كسر الصلاحيات والتوثيق: ثغرات IDOR، رفع الصلاحيات، تلاعب بتوكن JWT، وثغرات OAuth 2.0",
      "5. الثغرات المتقدمة في السيرفر والـ APIs: SSRF، XXE، رفع الملفات الخبيثة (Unrestricted File Upload RCE)، و Race Conditions"
    ],
    criteria: "حل أكثر من 50 مختبراً عملياً على منصة PortSwigger Web Security Academy المجانية وفهم السبب البرمجي لكل ثغرة وكيفية ترقيعها.",
    project: "فحص تطبيق ويب تدريبي كامل (مثل OWASP Juice Shop أو DVWA) وكتابة تقرير اختبار اختراق احترافي (Pentest Report) بالثغرات والحلول."
  },
  n_netpen: {
    phase: "Phase 2 • اختبار اختراق الشبكات والدومين (Network & AD PenTesting)",
    hours: "70 ساعة",
    alternatives: "المعاهد والشهادات العملية: eJPTv2 (ممتازة كبداية) ➔ PNPT (TCM Security) أو HTB CPTS ➔ شهادة OSCP",
    modules: [
      "1. الفحص والاستطلاع الداخلي (Enumeration): إتقان Nmap المتقدم وفحص خدمات SMB, SNMP, NFS, LDAP, WinRM",
      "2. الاستغلال والحصول على موطئ قدم (Initial Foothold): استخدام Metasploit وتعديل استغلالات الثغرات العامة (Exploit-DB)",
      "3. رفع الصلاحيات في لينكس وويندوز (Privilege Escalation): استغلال الكيرنل، المهام المجدولة، الأذونات الخاطئة، و WinPEAS/LinPEAS",
      "4. اختراق بيئة Active Directory: هجمات LLMNR Poisoning، Kerberoasting، AS-REP Roasting، Pass-the-Hash، وتحليل المسارات بـ BloodHound",
      "5. التنقل الجانبي والأنفاق داخل الشبكة (Pivoting & Tunneling) باستخدام Ligolo-ng و Chisel و Proxychains"
    ],
    criteria: "القدرة على الدخول لشبكة متعددة الأجهزة، التنقل بينها عبر Pivoting، والوصول لصلاحيات Domain Admin بالكامل.",
    project: "اختراق مختبر شبكة Active Directory متعدد الأجهزة (مثل GOAD - Game of Active Directory) وتوثيق كل خطوة."
  },
  n_siem: {
    phase: "Phase 2 • عمليات المركز الأمني وتحليل السجلات (SOC & SIEM)",
    hours: "60 ساعة",
    alternatives: "أنظمة الـ SIEM: Splunk (الأشهر في الشركات الكبرى) | Wazuh (مفتوح المصدر ومجاني بالكامل) | Elastic ELK Stack | Microsoft Sentinel",
    modules: [
      "1. هيكلية مركز العمليات الأمنية (SOC Tiers L1, L2, L3)، فرز التنبيهات (Alert Triage)، وخطط الاستجابة Playbooks",
      "2. تشريح سجلات ويندوز ولينكس: أهم معرفات الأحداث (Event IDs 4624, 4625, 4688, 4720) وتثبيت وتكوين Sysmon",
      "3. إتقان البحث والتحليل في SIEM: لغة استعلام Splunk (SPL) ولغة Elastic (KQL) لبناء لوحات مراقبة لحظية",
      "4. أنظمة كشف ومنع التسلل الشبكي (NIDS): كتابة قواعد Suricata و Snort وتحليل سجلات Zeek",
      "5. هندسة الكشف (Detection Engineering): كتابة قواعد Sigma و YARA لرصد سلوك البرمجيات الخبيثة"
    ],
    criteria: "تحليل السجلات لاكتشاف هجوم كامل وتحديد كيف دخل المهاجم وماذا نفذ على الجهاز والتمييز بين التنبيه الحقيقي والإنذار الكاذب (False Positive).",
    project: "بناء مختبر Home SOC متكامل باستخدام Wazuh + Sysmon وتنفيذ هجمات حقيقية عليه وبناء قواعد كشف وتنبيهات مخصصة."
  },
  n_cloudsec: {
    phase: "Phase 2 • أمن السحابة والأتمتة الآمنة (CloudSec & DevSecOps)",
    hours: "50 ساعة",
    alternatives: "المنصات السحابية: AWS Security | Microsoft Azure Security (AZ-500) | Kubernetes Security (CKS)",
    modules: [
      "1. نموذج المسؤولية المشتركة في السحابة وتأمين صلاحيات الهوية السحابية (AWS IAM / Azure AD Least Privilege)",
      "2. تأمين التخزين والشبكات السحابية (S3 Buckets، VPC Security Groups، WAF، وتشفير البيانات KMS)",
      "3. أمن الحاويات و Kubernetes: فحص صور Docker بـ Trivy، تأمين الـ Pods، ومراقبة وقت التشغيل بـ Falco",
      "4. بناء خط إنتاج برمجي آمن (DevSecOps Pipeline): دمج الفحص الثابت للكود SAST (Semgrep/SonarQube) وفحص المكتبات SCA (Snyk)",
      "5. إدارة الأسرار والمفاتيح بـ HashiCorp Vault وفحص أكواد البنية التحتية Terraform بـ Checkov"
    ],
    criteria: "بناء خط أنابيب CI/CD يفحص الكود والحاويات تلقائياً ويمنع نشر أي كود يحتوي على ثغرة أمنية أو مفتاح مسرب.",
    project: "بناء خط أنابيب DevSecOps كامل على GitHub Actions يدمج SAST + Secret Scanning + Docker Image Scanning + DAST."
  },
  n_bounty: {
    phase: "Phase 3 • صيد الثغرات والاستطلاع الواسع (Bug Bounty & Recon)",
    hours: "55 ساعة",
    alternatives: "منصات صيد الثغرات العالمية: HackerOne | Bugcrowd | Intigriti | YesWeHack",
    modules: [
      "1. منهجية الاستطلاع الواسع (Large-Scale Reconnaissance): جمع النطاقات الفرعية بـ Subfinder, Amass, crt.sh وفحص الأصول الحية بـ httpx",
      "2. أتمتة الفحص الذكي: كتابة قوالب مخصصة لأداة Nuclei واكتشاف الملفات الحساسة والـ Endpoints المخفية في ملفات JavaScript",
      "3. فحص ثغرات الـ APIs الحديثة (REST & GraphQL) وثغرات تطبيقات الموبايل (Android APK Decompilation & SSL Pinning Bypass)",
      "4. اكتشاف الثغرات المنطقية المعقدة (Business Logic Flaws) وثغرات الدفع الإلكتروني والسباق الزمني Race Conditions",
      "5. فن كتابة تقارير الثغرات الاحترافية التي تُقبل بسرعة وتحصل على أعلى مكافأة (CVSS Scoring & PoC)"
    ],
    criteria: "بناء نظام استطلاع مؤتمت خاص بك (Recon Pipeline) والبدء الفعلي في فحص برامج حقيقية على منصات Bug Bounty.",
    project: "برمجة إطار أتمتة Recon خاص بك بـ Bash/Python يربط أدوات الفحص ويرسل التنبيهات الفورية عند ظهور نطاق أو ثغرة جديدة."
  },
  n_redops: {
    phase: "Phase 3 • عمليات الفريق الأحمر وتخطي الدفاعات (Red Team & Evasion)",
    hours: "70 ساعة",
    alternatives: "أطر القيادة والسيطرة (C2): Sliver / Havoc / Mythic (مفتوحة المصدر) | Cobalt Strike (المعيار التجاري)",
    modules: [
      "1. الفرق بين اختبار الاختراق التقليدي وعمليات الفريق الأحمر الشاملة (Adversary Simulation)",
      "2. إعداد وتشغيل أطر القيادة والسيطرة (Command & Control - C2) وإخفاء الاتصالات عبر Redirectors",
      "3. فهم كيف تعمل برامج الحماية الحديثة (AV & EDR): الـ Hooking، فحص الذاكرة، وتحليل السلوك",
      "4. تقنيات التمويه وتخطي الدفاعات (Payload Development, Encryption, Process Injection & Direct Syscalls)",
      "5. استغلال الثغرات المتقدمة في غابات Active Directory (Cross-Forest Trusts, ADCS Certificate Abuse)"
    ],
    criteria: "القدرة على محاكاة هجوم متقدم داخل بيئة محمية بـ EDR دون إثارة التنبيهات مع الحفاظ على البقاء الآمن (Persistence).",
    project: "تطوير Payload مخصص بلغة C/C# أو Nim يقوم بتشفير الـ Shellcode وحقنه في الذاكرة وتوثيق طرق كشفه للدفاع."
  },
  n_dfir: {
    phase: "Phase 3 • التحقيق الجنائي الرقمي وصيد التهديدات (DFIR & Threat Hunting)",
    hours: "60 ساعة",
    alternatives: "أدوات التحقيق الجنائي: Volatility 3 (للذاكرة) | Autopsy & KAPE (للقرص) | Velociraptor (للشبكة والفحص عن بُعد)",
    modules: [
      "1. الأدلة الجنائية في نظام ويندوز (Windows Forensics Artifacts): Registry Hives, Prefetch, Amcache, Shimcache, Event Logs, $MFT",
      "2. التحقيق الجنائي في الذاكرة العشوائية (Memory Forensics) باستخدام Volatility 3 لكشف العمليات المخفية والحقن في الذاكرة",
      "3. خطوات الاستجابة للحوادث الكبرى وهجمات الفدية (Ransomware Incident Response: التحضير، الاحتواء، الاستئصال، والاستعادة)",
      "4. صيد التهديدات الاستباقي (Proactive Threat Hunting) بالاعتماد على مصفوفة MITRE ATT&CK",
      "5. جمع الأدلة على مستوى مئات الأجهزة في الشبكة بسرعة فائقة باستخدام KAPE و Velociraptor"
    ],
    criteria: "تحليل صورة قرص وذاكرة لجهاز تعرض للاختراق وتحديد الجدول الزمني الكامل للهجمة (Timeline Analysis) من أول ثانية.",
    project: "حل 5 تحديات تحقيق جنائي كاملة على منصة CyberDefenders وكتابة تقرير جنائي رسمي يوضح خط سير المهاجم."
  },
  n_grc: {
    phase: "Phase 3 • الحوكمة وإدارة المخاطر والامتثال (GRC & Security Auditing)",
    hours: "40 ساعة",
    alternatives: "الأطر والمعايير: ISO/IEC 27001 | NIST Cybersecurity Framework 2.0 | PCI-DSS (للبنوك والدفع) | إطار البنك المركزي والـ NCA",
    modules: [
      "1. بناء برنامج أمن معلومات مؤسسي وكتابة السياسات والإجراءات الأمنية (Information Security Policies)",
      "2. منهجية تقييم وإدارة المخاطر السيبرانية (Risk Identification, Assessment, Mitigation & Risk Register)",
      "3. تطبيق وتدقيق المعيار الدولي لنظام إدارة أمن المعلومات ISO/IEC 27001",
      "4. الامتثال للمعايير التنظيمية والمالية (NIST CSF، PCI-DSS لبطاقات الدفع، وحماية البيانات الشخصية GDPR)",
      "5. خطط استمرارية الأعمال والتعافي من الكوارث (BCP & DRP) وتقييم مخاطر الموردين (Third-Party Risk)"
    ],
    criteria: "القدرة على إجراء تدقيق أمني (Security Audit) لأي مؤسسة وبناء سجل مخاطر متكامل وخطة امتثال لمعيار ISO 27001.",
    project: "إعداد ملف حوكمة كامل لشركة تقنية مالية (FinTech) يشمل السياسات الأمنية، سجل المخاطر، ومصفوفة ضوابط ISO 27001."
  },
  n_oswe: {
    phase: "Phase 4 • الإتقان والشهادات العليا في أمن التطبيقات",
    hours: "60 ساعة",
    alternatives: "مسار الشهادات: PortSwigger Practitioner ➔ HTB CBBH (Certified Bug Bounty Hunter) ➔ OffSec OSWE (Web Expert)",
    modules: [
      "1. مراجعة الكود المصدري المتقدمة (White-Box Source Code Review) لاكتشاف الثغرات المعقدة في تطبيقات ضخمة",
      "2. دمج عدة ثغرات بسيطة معاً للوصول إلى تنفيذ أوامر عن بُعد بدون تسجيل دخول (Unauthenticated RCE Chains)",
      "3. ثغرات فك التسلل غير الآمن (Insecure Deserialization) في Java و PHP و .NET و Python",
      "4. كتابة سكربتات استغلال كاملة المؤتمتة (Full Exploit Scripts) بـ Python تنتقل من الصفر حتى السيطرة على السيرفر"
    ],
    criteria: "القدرة على قراءة الكود المصدري لأي تطبيق ويب كبير، استخراج ثغراته، وكتابة سكربت Python يستغلها بضغطة زر.",
    project: "مراجعة الكود المصدري لتطبيق مفتوح المصدر وبناء سكربت استغلال آلي (Auto-Pwn Script) وتوثيق الترقيع البرمجي."
  },
  n_oscp: {
    phase: "Phase 4 • الإتقان والشهادات العليا في اختبار الاختراق",
    hours: "80 ساعة",
    alternatives: "مسار الشهادات: eJPTv2 ➔ PNPT ➔ HTB CPTS (قوية جداً وعملية) ➔ OffSec OSCP (الأشهر في الموارد البشرية والشركات)",
    modules: [
      "1. منهجية إدارة الوقت والاختراق تحت الضغط في بيئات تحاكي الامتحانات العملية ذات الـ 24 ساعة و الـ 10 أيام",
      "2. اختراق بيئات هجينة تجمع بين خوادم Linux وبيئات Active Directory مع وجود أنفاق متعددة",
      "3. كتابة تقارير اختبار الاختراق التنفيذية والتقنية (Executive & Technical Reporting) المعتمدة دولياً",
      "4. التحضير لمقابلات العمل كـ Penetration Tester / Red Team Operator"
    ],
    criteria: "إتمام مسار كامل من الأجهزة المتقدمة (مثل قائمة TJnull's OSCP/CPTS List) في وقت قياسي وبدون النظر للحلول.",
    project: "محاكاة امتحان عملي كامل (اختراق شبكة AD + 3 خوادم مستقلة خلال 24 ساعة) وإصدار التقرير النهائي."
  },
  n_btl1: {
    phase: "Phase 4 • الإتقان والشهادات العليا في الدفاع والتحقيق الجنائي",
    hours: "65 ساعة",
    alternatives: "مسار الشهادات: Security+ ➔ BTL1 (Blue Team Level 1) ➔ CCD (Certified CyberDefender) ➔ شهادات SANS (GCIH / GCFA)",
    modules: [
      "1. إدارة حادث اختراق حي كامل من لحظة رصد التنبيه في SIEM حتى العزل والتحقيق الجنائي واستعادة النظام",
      "2. تحليل البرمجيات الخبيثة المتقدمة في الذاكرة وفك تشفير اتصالات الـ C2 في ملفات الشبكة",
      "3. بناء قواعد كشف استباقية تمنع تكرار الهجوم على مستوى المؤسسة",
      "4. التحضير لمقابلات مهندسي SOC ومحققي الـ DFIR"
    ],
    criteria: "اجتياز سيناريوهات حوادث أمنية معقدة متعددة المراحل وكتابة تقرير تحقيق جنائي متكامل يصلح للعرض على إدارة الشركة.",
    project: "إتمام معمل استجابة لحوادث شامل (Full Incident Response Lab) وكتابة Playbook دفاعي متكامل."
  },
  n_cissp: {
    phase: "Phase 4 • الإتقان في أمن السحابة وقيادة الأمن السيبراني",
    hours: "60 ساعة",
    alternatives: "مسار الشهادات: AWS/Azure Security Specialty & CKS (للمهندسين التقنيين) | CISM & CISSP (لمديري ومعماريي الأمن السيبراني)",
    modules: [
      "1. تصميم المعماريات الأمنية المؤسسية والسحابية الكبرى (Enterprise & Cloud Security Architecture)",
      "2. قيادة فرق الأمن السيبراني، إدارة ميزانيات الأمن، والتواصل مع مجلس الإدارة",
      "3. تأمين سلاسل الإمداد البرمجية (Software Supply Chain Security) ومجموعات Kubernetes الإنتاجية",
      "4. الاستعداد لاختبارات القيادة الأمنية والهندسة السحابية"
    ],
    criteria: "القدرة على تصميم استراتيجية ومعمارية الأمن السيبراني الكاملة لمنظمة كبرى على السحابة.",
    project: "تصميم وتنفيذ بنية سحابية مؤمنة بالكامل (Zero-Trust Cloud Cluster) مع سياسات الحوكمة والمراقبة."
  },

  /* ---------------- C. AI, DATA SCIENCE & GEN-AI (ALL 12 NODES IN DETAIL) ---------------- */
  a_py: {
    phase: "Phase 1 • التأسيس البرمجي للذكاء الاصطناعي والبيانات",
    hours: "45 ساعة",
    alternatives: "الأدوات والبدائل: Python (اللغة رقم 1 عالمياً للـ AI) + مكتبة Polars / DuckDB (بدائل حديثة فائقة السرعة لـ Pandas)",
    modules: [
      "1. إتقان لغة Python لعلوم البيانات: هياكل البيانات، الدوال، البرمجة الكائنية، والتعامل مع الملفات والـ APIs",
      "2. الحوسبة الرقمية والمصفوفات متعددة الأبعاد باستخدام مكتبة `NumPy` (Vectorization & Broadcasting)",
      "3. تنظيف ومعالجة وتحليل الجداول الضخمة باستخدام مكتبة `Pandas` (DataFrames, GroupBy, Merging, Missing Data)",
      "4. تصوير البيانات بصرياً (Data Visualization) باستخدام `Matplotlib` و `Seaborn` و `Plotly`",
      "5. العمل الاحترافي داخل بيئات Jupyter Notebooks و Google Colab (GPU Runtime)"
    ],
    criteria: "أخذ أي ملف بيانات خام غير منظم (CSV/JSON)، تنظيفه بالكامل، استخراج الإحصائيات منه، ورسم 5 مخططات بيانية واضحة.",
    project: "تحليل وتنظيف قاعدة بيانات حقيقية تضم 100 ألف سجل وبناء تقرير تفاعلي مصور في Jupyter Notebook."
  },
  a_math: {
    phase: "Phase 1 • الرياضيات التأسيسية لتعلم الآلة",
    hours: "45 ساعة",
    alternatives: "المصادر البصرية: سلسلة 3Blue1Brown (Essence of Linear Algebra & Calculus) + قناة StatQuest (للإحصاء)",
    modules: [
      "1. الجبر الخطي (Linear Algebra): المتجهات Vectors، المصفوفات Matrices، ضرب المصفوفات، و الـ Eigenvalues & Eigenvectors (أساس PCA)",
      "2. التفاضل والتكامل متعدد المتغيرات (Multivariable Calculus): المشتقات الجزئية والـ Gradients",
      "3. خوارزمية الانحدار التدريجي (Gradient Descent): كيف تتعلم الآلة رياضياً وتقلل دالة الخطأ (Loss Function)",
      "4. الإحصاء الوصفي والاستدلالي: المتوسط، الانحراف المعياري، التوزيعات الاحتمالية (Normal Distribution)، واختبار الفرضيات",
      "5. نظرية الاحتمالات وقاعدة بايز (Probability & Bayes' Theorem)"
    ],
    criteria: "فهم كيف تتحول البيانات إلى مصفوفات رياضية وكيف يعمل Gradient Descent لتحديث الأوزان بدون اعتبار الخوارزمية صندوقاً أسود.",
    project: "برمجة خوارزمية Linear Regression و Gradient Descent من الصفر باستخدام `NumPy` فقط بدون مكتبات جاهزة."
  },
  a_sql_bi: {
    phase: "Phase 1 • قواعد البيانات واستكشاف البيانات وذكاء الأعمال",
    hours: "40 ساعة",
    alternatives: "أدوات ذكاء الأعمال: Microsoft Power BI (الأكثر طلباً في الشركات) | Tableau | Looker Studio | Streamlit (للوحات بايثون)",
    modules: [
      "1. لغة SQL المتقدمة لتحليل البيانات: Joins، الدوال النافذية (Window Functions: ROW_NUMBER, RANK, LAG)، والـ CTEs",
      "2. منهجية التحليل الاستكشافي للبيانات (Exploratory Data Analysis - EDA) واكتشاف القيم الشاذة (Outliers)",
      "3. هندسة الخصائص المبدئية (Feature Selection & Data Cleaning) وتجهيز البيانات للنمذجة",
      "4. بناء لوحات معلومات تفاعلية لاتخاذ القرار باستخدام Power BI أو Streamlit"
    ],
    criteria: "كتابة استعلامات SQL تحليلية معقدة وتحويل نتائجها إلى لوحة تحكم تفاعلية تجيب على أسئلة الإدارة.",
    project: "بناء لوحة تحكم تحليلية شاملة لمبيعات وسلوك عملاء شركة باستخدام SQL و Power BI / Streamlit."
  },
  a_ml: {
    phase: "Phase 2 • تعلم الآلة الكلاسيكي (Classical Machine Learning)",
    hours: "60 ساعة",
    alternatives: "المكتبات الأساسية: Scikit-Learn + ثلاثي المسابقات والشركات: XGBoost & LightGBM & CatBoost",
    modules: [
      "1. التعلم الخاضع للإشراف (Supervised Learning): خوارزميات الانحدار (Linear/Ridge/Lasso) والتصنيف (Logistic Regression, SVM)",
      "2. أشجار القرار ونماذج التجميع القوية (Ensemble Methods): Random Forests، وعملاق البيانات الجدولية `XGBoost` و `LightGBM`",
      "3. التعلم غير الخاضع للإشراف (Unsupervised Learning): التجميع (K-Means, DBSCAN) وتقليل الأبعاد (PCA, t-SNE)",
      "4. هندسة الخصائص المتقدمة (Feature Engineering, Encoding, Scaling) وبناء أنابيب `Scikit-Learn Pipelines`",
      "5. تقييم النماذج ومنع الحفظ الزائد (Overfitting vs Underfitting، Cross-Validation، ROC-AUC، F1-Score، وضبط المعاملات بـ Optuna)"
    ],
    criteria: "بناء نموذج تعلم آلة كامل للبيانات الجدولية يتفوق على خط الأساس (Baseline) مع معالجة عدم توازن الفئات (Imbalanced Data).",
    project: "بناء نظام ذكي للتنبؤ بتسرب العملاء أو كشف المعاملات البنكية الاحتيالية باستخدام XGBoost و Scikit-Learn."
  },
  a_dl: {
    phase: "Phase 2 • التعلم العميق والشبكات العصبية (Deep Learning)",
    hours: "55 ساعة",
    alternatives: "أطر التعلم العميق: PyTorch (المعيار الأول حالياً في الأبحاث والـ LLMs والشركات) | TensorFlow & Keras (بديل ممتاز ومستقر)",
    modules: [
      "1. معمارية الشبكات العصبية الاصطناعية (Multi-Layer Perceptrons - MLP)، الأوزان، ودوال التنشيط (ReLU, Sigmoid, Softmax, GELU)",
      "2. خوارزمية الانتشار العكسي (Backpropagation) وخوارزميات التحسين الحديثة (Adam, AdamW, Learning Rate Schedulers)",
      "3. إتقان إطار عمل `PyTorch` (أو `TensorFlow/Keras`): التنسورات Tensors على الـ GPU، `Autograd`، وبناء `nn.Module` و `DataLoader`",
      "4. تقنيات تنظيم وتثبيت تدريب الشبكات العميقة: Dropout، Batch Normalization، LayerNorm، و Early Stopping"
    ],
    criteria: "بناء وتدريب شبكة عصبية عميقة مخصصة بـ PyTorch على كارت الشاشة GPU ومراقبة منحنيات التدريب والخطأ.",
    project: "بناء وتدريب شبكة عصبية عميقة بـ PyTorch من الصفر وتجربة تأثير تغير المعمارية والمعاملات على الدقة."
  },
  a_cv: {
    phase: "Phase 3 • الرؤية الحاسوبية ومعالجة الصور والفيديو (Computer Vision)",
    hours: "50 ساعة",
    alternatives: "الأدوات والمعماريات: OpenCV + Ultralytics YOLOv8/v11 (الأسرع في الوقت الحقيقي) + Vision Transformers (ViT)",
    modules: [
      "1. أساسيات معالجة الصور الرقمية والفيديو باستخدام مكتبة `OpenCV`",
      "2. الشبكات العصبية التلافيفية (Convolutional Neural Networks - CNNs) ونقل التعلم (Transfer Learning: ResNet, EfficientNet)",
      "3. اكتشاف الأجسام في الوقت الحقيقي (Real-Time Object Detection) وتقسيم الصور (Segmentation) باستخدام `YOLO`",
      "4. التعرف على الوجوه، تتبع الأجسام في الفيديو (Object Tracking)، وقراءة النصوص من الصور (OCR)"
    ],
    criteria: "تدريب نموذج رؤية حاسوبية مخصص (Custom YOLO Model) على مجموعة صور خاصة بك وتشغيله في الوقت الحقيقي على الكاميرا أو الفيديو.",
    project: "بناء نظام كاميرا ذكي بالـ Computer Vision (مثل رصد معدات السلامة أو قراءة لوحات السيارات أو عد الأشخاص لحظياً)."
  },
  a_nlp: {
    phase: "Phase 3 • معالجة اللغات الطبيعية ومعمارية الـ Transformers",
    hours: "45 ساعة",
    alternatives: "مكتبات اللغات: HuggingFace Transformers | spaCy | NLTK | AraBERT (للغة العربية)",
    modules: [
      "1. معالجة النصوص وتجهيزها: Tokenization (BPE, WordPiece) وتمثيل الكلمات كمتجهات (Word2Vec, Embeddings)",
      "2. تطور نماذج التسلسل: من الشبكات المتكررة (RNNs & LSTMs) إلى ثورة آلية الانتباه (Self-Attention Mechanism)",
      "3. تشريح معمارية الـ `Transformer` (ورقة Attention Is All You Need): Encoder (مثل BERT) مقابل Decoder (مثل GPT)",
      "4. استخدام منظومة `HuggingFace` (`transformers`, `datasets`, `tokenizers`) لتصنيف النصوص، تحليل المشاعر، والترجمة"
    ],
    criteria: "فهم كيف تعمل آلية الـ Self-Attention والـ Embeddings، واستخدام نماذج HuggingFace لمعالجة النصوص العربية والإنجليزية.",
    project: "بناء مصنف نصوص ومحلل مشاعر ثنائي اللغة (عربي/إنجليزي) بالاعتماد على نماذج المحولات (Transformers)."
  },
  a_llm: {
    phase: "Phase 3 • هندسة النماذج اللغوية العملاقة (LLMs & Prompt Engineering)",
    hours: "45 ساعة",
    alternatives: "النماذج المتاحة: Gemini / OpenAI / Claude APIs (سحابية) | بديل التشغيل المحلي المجاني: Ollama & vLLM مع نماذج Llama 3 و Qwen",
    modules: [
      "1. كيف تتدرب النماذج اللغوية العملاقة: Pre-training، الضبط بالتعليمات (Instruction Tuning)، والتعلم من تفضيلات البشر (RLHF)",
      "2. هندسة الأوامر البرمجية المتقدمة (System Prompts, Few-Shot, Chain-of-Thought, ReAct) وإجبار النموذج على إخراج `Structured JSON`",
      "3. استدعاء الدوال والأدوات الخارجية من داخل النموذج (Function Calling & Tool Use)",
      "4. تشغيل النماذج اللغوية المفتوحة محلياً على جهازك أو سيرفرك الخاص باستخدام `Ollama` و `vLLM` مع تقنيات ضغط النماذج (Quantization GGUF/AWQ)"
    ],
    criteria: "ربط النماذج اللغوية السحابية أو المحلية بتطبيقاتك البرمجية مع ضمان إخراج بيانات مهيكلة دقيقة وآمنة.",
    project: "بناء مساعد برمجي ذكي يعمل محلياً عبر Ollama أو عبر Gemini API يستخرج البيانات في صورة JSON ويتفاعل مع أدوات النظام."
  },
  a_rag: {
    phase: "Phase 3 • أنظمة البحث الدلالي وقواعد البيانات المتجهة (RAG & Vector DBs)",
    hours: "50 ساعة",
    alternatives: "قواعد البيانات المتجهة وأطر العمل: Qdrant / Pinecone / ChromaDB / pgvector | LangChain مقابل LlamaIndex",
    modules: [
      "1. لماذا تهلوس النماذج اللغوية وكيف تعالج معمارية `RAG (Retrieval-Augmented Generation)` هذه المشكلة بربط النموذج بملفاتك الخاصة",
      "2. استراتيجيات تقطيع المستندات وملفات الـ PDF (Chunking Strategies) وتحويلها لمتجهات دلالية (Embedding Models)",
      "3. إتقان قواعد البيانات المتجهة (Vector Databases: `Qdrant`, `ChromaDB`, `pgvector`) والبحث الهجين (Hybrid Search: Semantic + BM25 + Reranking)",
      "4. بناء أنابيب استرجاع متقدمة باستخدام `LlamaIndex` و `LangChain` وتقييم دقة إجابات النظام (RAGAS Evaluation)"
    ],
    criteria: "بناء نظام RAG يجيب بدقة من آلاف الصفحات والكتب الخاصة بك مع ذكر رقم الصفحة والمصدر المقتبس منه بدون هلوسة.",
    project: "بناء منصة 'اسأل مراجعك الهندسية وملفات الـ PDF' باستخدام RAG وقاعدة بيانات متجهة مع توثيق المصادر."
  },
  a_agents: {
    phase: "Phase 4 • وكلاء الذكاء الاصطناعي المستقلين وتخصيص النماذج (AI Agents & Fine-Tuning)",
    hours: "55 ساعة",
    alternatives: "أطر بناء الوكلاء: LangGraph (الأقوى للتحكم المؤسسي) | CrewAI (تعدد الوكلاء) | AutoGen | مكتبة Unsloth (لتخصيص النماذج بسرعة)",
    modules: [
      "1. معمارية وكلاء الذكاء الاصطناعي (Autonomous AI Agents): التخطيط، الذاكرة قصيرة وطويلة المدى، واستخدام الأدوات (Web Search, Code Execution, DBs)",
      "2. بناء أنظمة متعددة الوكلاء (Multi-Agent Workflows) تتعاون لإنجاز مهام معقدة باستخدام `LangGraph` و `CrewAI`",
      "3. متى تحتاج لتخصيص النموذج (Fine-Tuning) بدلاً من الـ RAG؟ وتجهيز مجموعات بيانات التدريب (Instruction Datasets)",
      "4. التخصيص الفعال بأقل موارد (PEFT: `LoRA` & `QLoRA`) باستخدام مكتبة `Unsloth` و `HuggingFace TRL` على كارت شاشة واحد"
    ],
    criteria: "بناء نظام وكلاء ذكاء اصطناعي ينفذ مهام متعددة الخطوات تلقائياً، والقدرة على عمل Fine-Tune لنموذج مفتوح المصدر باستخدام QLoRA.",
    project: "بناء فريق وكلاء ذكاء اصطناعي (باحث + مبرمج + مراجع كود) بـ LangGraph أو تخصيص نموذج Llama على بيانات مجال محدد بـ QLoRA."
  },
  a_mlops: {
    phase: "Phase 4 • نشر وتشغيل ومراقبة أنظمة الذكاء الاصطناعي (MLOps & Production)",
    hours: "50 ساعة",
    alternatives: "أدوات النشر والمراقبة: FastAPI + Docker | MLflow / Weights & Biases | Langfuse (لمراقبة الـ LLMs) | HuggingFace Spaces",
    modules: [
      "1. تحويل نماذج تعلم الآلة والـ LLMs من Jupyter Notebook إلى خدمة ويب سريعة ومؤمنة باستخدام `FastAPI` (Async Endpoints & Streaming)",
      "2. تتبع التجارب وإدارة إصدارات النماذج والبيانات باستخدام `MLflow` و `Weights & Biases`",
      "3. تغليف تطبيقات الذكاء الاصطناعي داخل حاويات `Docker` وتشغيلها على خوادم السحابة المزودة بـ GPU",
      "4. مراقبة النماذج في الإنتاج: كشف انحراف البيانات (Data Drift)، ومراقبة تكلفة وجودة وزمن استجابة الـ LLMs عبر `Langfuse`"
    ],
    criteria: "نشر نموذج ذكاء اصطناعي أو نظام RAG خلف REST API موثق وموضوع داخل Docker Container جاهز للربط مع أي تطبيق ويب أو موبايل.",
    project: "تغليف ونشر مشروع الذكاء الاصطناعي الخاص بك بـ FastAPI و Docker وربطه بواجهة مستخدم حية مع لوحة مراقبة الأداء."
  }
};

function getNodeRichDetails(track, node) {
  const custom = DEEP_NODE_SYLLABUS[node.id] || node.customSyllabus;
  const tierLabels = [
    "Phase 1 • التأسيس الإجباري (Beginner)",
    "Phase 2 • المهارات الجوهرية (Intermediate)",
    "Phase 3 • التخصص المتقدم (Advanced)",
    "Phase 4 • الاحتراف والأنظمة (Professional)",
    "Phase 5 • الإتقان والمشروع النهائي (Mastery)"
  ];
  const phase = custom?.phase || tierLabels[Math.min(4, node.tier || 0)];
  const hours = custom?.hours || `${35 + (node.tier || 0) * 10} ساعة تدريبية`;
  const alternatives = custom?.alternatives || "يمكنك التطبيق بالأدوات القياسية المشروحة أو البدائل الموازية حسب متطلبات سوق العمل المستهدف.";

  const prereqIds = (track.edges || [])
    .filter(([from, to]) => to === node.id)
    .map(([from]) => from);
  const prereqNodes = prereqIds
    .map(pid => track.nodes.find(n => n.id === pid))
    .filter(Boolean);

  const modules = custom?.modules || [
    `1. المفاهيم الهندسية والمعمارية الأساسية لـ ${node.label}`,
    `2. إعداد الأدوات القياسية والبدائل التقنية لـ ${node.label}`,
    `3. التطبيق العملي المتدرج: ${node.desc}`,
    `4. أفضل الممارسات الأمنية والهندسية في بيئة الإنتاج`
  ];

  const criteria = custom?.criteria || `إتقان (${node.label}) عملياً وبناء تطبيقه بدون الاعتماد على النسخ، والقدرة على شرحه في المقابلات التقنية.`;
  const project = custom?.project || `بناء مشروع تطبيقي متكامل في (${node.label}) ورفعه على GitHub بتوثيق هندسي كامل.`;

  return { phase, hours, alternatives, prereqNodes, modules, criteria, project };
}

/* ============================================================================
   3. THE 3 MEGA-TRACKS DATABASE (WEB 15 PHASES, CYBERSECURITY, AI & DATA)
   ============================================================================ */
const CAREER_TRACKS_DB = [
  /* ==========================================================================
     TRACK 1: FULL-STACK WEB ENGINEERING (15 COMPLETE PHASES + PHP/NODE/.NET/PYTHON)
     ========================================================================== */
  {
    id: "fullstack",
    name: "1. هندسة وتطوير الويب الشامل (Full-Stack Web — 15 مرحلة)",
    shortTag: "Frontend (React/Next/Vue) + Backend (PHP Laravel / Node / Python / .NET)",
    icon: "fa-laptop-code",
    accent: "#D4A72C",
    introTitle: "🌐 جامعة هندسة تطوير الويب الشاملة: الـ 15 مرحلة الكاملة + المسارات البديلة (PHP Laravel / Node.js / .NET / Python)",
    introText: "أضخم منهج جامعي متكامل يأخذك في 15 مرحلة متسلسلة من الصفر المطلق حتى مستوى معماري أنظمة (System Architect). يتميز هذا المسار بتغطية الأساس الإجباري الموحد ثم يمنحك الحرية الكاملة في اختيار لغة وإطار عمل الـ Backend الأنسب لك في سوق العمل (سواء Node.js & NestJS، أو مسار PHP & Laravel العملاق في السوق العربي والعمل الحر، أو Python Django/FastAPI، أو C# ASP.NET Core) مع الربط الكامل بالـ Frontend وقواعد البيانات والسحابة.",
    whyPoints: [
      { title: "🏛️ 15 مرحلة هندسية متسلسلة على الشبكة", desc: "كل مرحلة من الـ 15 مرحلة ممثلة بعقدة مستقلة في الشبكة التفاعلية بدروسها التفصيلية، متطلباتها، ومشروعها العملي." },
      { title: "🔄 خيارات ومسارات بديلة واضحة", desc: "لا نقيدك بتقنية واحدة؛ نشرح لك مسار JavaScript/Node.js وبجانبه بالتفصيل مسار PHP & Laravel ومسار Python و .NET وبدائل الفرونت إند." },
      { title: "🚀 من أول سطر HTML إلى إطلاق منصة SaaS", desc: "يشمل هندسة قواعد البيانات، التوثيق الآمن، أتمتة الاختبارات، سد ثغرات الويب، System Design، والنشر بـ Docker." }
    ],
    alternativePaths: [
      {
        title: "🐘 مسار الباك إند البديل الأول: PHP 8+ & Laravel 11 Ecosystem",
        badge: "الأكثر طلباً في الشركات العربية ومواقع العمل الحر",
        desc: "لغة PHP تشغل أكثر من 75% من مواقع الإنترنت، وإطار عمل Laravel يوفر كل شيء جاهزاً لبناء منصات كاملة في نصف الوقت.",
        stack: ["PHP 8.3 & OOP", "Composer & MVC", "Laravel 11 Core", "Eloquent ORM & MySQL", "Blade & Livewire", "FilamentPHP (لوحات تحكم فورية)", "Laravel Sanctum (APIs для React/Flutter)"],
        yt: "Elzero Web School (PHP Bootcamp) + Mohamed Said (Laravel Core) + Laracasts"
      },
      {
        title: "🟢 مسار الباك إند القياسي: Node.js, Express & NestJS (JavaScript/TypeScript)",
        badge: "لغة واحدة للفرونت إند والباك إند معاً",
        desc: "الأفضل إذا كنت تريد استخدام JavaScript و TypeScript في كامل المشروع مع أداء عالٍ جداً في التطبيقات اللحظية (Real-Time).",
        stack: ["Node.js Runtime & Event Loop", "Express.js REST APIs", "TypeScript", "NestJS Enterprise Architecture", "Prisma / TypeORM", "PostgreSQL & MongoDB", "Socket.io & Redis"],
        yt: " Jonas Schmedtmann + أكاديمية ترميز + يحيى العربي (NodeJS)"
      },
      {
        title: "🐍 مسار الباك إند البديل الثالث: Python (Django & FastAPI)",
        badge: "الخيار رقم 1 إذا كنت تريد دمج الويب مع الذكاء الاصطناعي",
        desc: "يتيح لك بناء خوادم ويب قوية جداً ودمج نماذج الذكاء الاصطناعي وتعلم الآلة مباشرة داخل نفس الكود.",
        stack: ["Python 3 & OOP", "Django (شامل لوحة تحكم وأمان مدمج)", "Django REST Framework (DRF)", "FastAPI (الأسرع لبناء APIs والـ AI)", "SQLAlchemy & PostgreSQL", "Celery & Redis"],
        yt: "محمود أحمد (Django) + FreeCodeCamp FastAPI"
      },
      {
        title: "🟣 مسار الباك إند المؤسسي الرابع: C# & ASP.NET Core / Java Spring Boot",
        badge: "معيار البنوك، الهيئات الحكومية، والشركات العملاقة (Enterprise)",
        desc: "أنظمة فائقة الصلابة والأداء والسرعة، مطلوبة بشدة في المؤسسات المالية والشركات الكبرى في مصر والخليج وأوروبا.",
        stack: ["C# & Advanced OOP / LINQ", "ASP.NET Core Web API", "Entity Framework Core & SQL Server", "Clean Architecture & CQRS", "Microservices & RabbitMQ"],
        yt: "المهندس محمد المهدي / عصام عبد النبي (.NET) + Teddy Smith"
      }
    ],
    foundations: [
      { id: "fs_f1", title: "1. آلية عمل الإنترنت والمتصفح وأساسيات البرمجة", desc: "HTTP/HTTPS, DNS, Hosting, DOM Rendering, Git & Problem Solving.", yt: "Elzero Web School / CS50" },
      { id: "fs_f2", title: "2. إتقان HTML5 الدلالية و CSS3 و Tailwind CSS", desc: "Flexbox, CSS Grid, Responsive Design, Animations & Tailwind.", yt: "Elzero Web School / Kevin Powell" },
      { id: "fs_f3", title: "3. إتقان لغة JavaScript (ES6+, DOM, Async/Await & APIs)", desc: "Closures, Event Loop, Fetch API, Promises, OOP & Modules.", yt: "Elzero JavaScript Bootcamp / Jonas" },
      { id: "fs_f4", title: "4. نظام Git & GitHub ولغة TypeScript الصارمة", desc: "Branching, Pull Requests, TypeScript Interfaces & Generics.", yt: "Elzero Git & TypeScript / غريب الشيخ" }
    ],
    roles: [
      {
        id: "frontend_arch",
        title: "🎨 مهندس ومعماري واجهات أمامية (Frontend & UI Architect)",
        mission: "بناء واجهات المستخدم التفاعلية فائقة السرعة والمتجاوبة وربطها مع الـ APIs وإدارة حالتها.",
        skills: ["HTML5 / CSS3 / Tailwind CSS", "JavaScript ES6+ & TypeScript", "React 19 & Next.js (أو Vue/Nuxt أو Angular)", "State Management (Zustand / Redux / React Query)", "Web Performance & SEO", "Playwright / Vitest Testing"],
        tools: ["VS Code", "Vite", "Next.js", "Tailwind CSS", "Figma", "Chrome DevTools"],
        certs: ["Meta Front-End Developer", "Frontend Masters Path", "Vercel Next.js Mastery"]
      },
      {
        id: "backend_arch",
        title: "⚙️ مهندس خوادم وقواعد بيانات (Backend Engineer — Node / PHP Laravel / Python / .NET)",
        mission: "بناء العقل المدبر للمنصة، تصميم الـ APIs، هيكلة قواعد البيانات، وتأمين العمليات والدفع الإلكتروني.",
        skills: ["Node.js (NestJS) أو PHP (Laravel) أو Python (FastAPI/Django) أو .NET", "SQL (PostgreSQL / MySQL) & Indexing", "NoSQL (MongoDB / Firebase) & Redis Caching", "Auth (JWT, OAuth2, Sanctum, RBAC)", "RESTful APIs & GraphQL", "Queues & WebSockets"],
        tools: ["PostgreSQL / MySQL", "Prisma / Eloquent ORM", "Redis", "Postman", "Docker", "Git"],
        certs: ["AWS Certified Developer", "Laravel Certification / OpenJS Node.js"]
      },
      {
        id: "system_design",
        title: "🏛️ معماري أنظمة شاملة وسحابة (Full-Stack System Architect & DevOps)",
        mission: "الجمع بين الواجهة والخادم وتصميم الأنظمة الموزعة القابلة للتوسع وأتمتة نشرها على السحابة.",
        skills: ["System Design & Scalability", "Docker & Docker Compose", "CI/CD (GitHub Actions)", "Nginx & Reverse Proxy / SSL", "Web Security Hardening (OWASP)", "Cloud VPS / AWS Deployment"],
        tools: ["Docker", "Nginx", "GitHub Actions", "Cloudflare", "Linux Ubuntu Server", "Sentry"],
        certs: ["Full-Stack Open (University of Helsinki)", "AWS Solutions Architect"]
      }
    ],
    resources: [
      { name: "أكاديمية الزيرو (Elzero Web School)", type: "مسارات HTML, CSS, JS, TS, React, PHP كاملة مجاناً", url: "https://elzero.org" },
      { name: "Full Stack Open (University of Helsinki)", type: "أقوى منهج جامعي مجاني لـ React, Node, TS, GraphQL, Docker", url: "https://fullstackopen.com/en/" },
      { name: "Laracasts (لمسار PHP & Laravel & Vue/React)", type: "المنصة الأولى عالمياً لإتقان Laravel والويب", url: "https://laracasts.com" }
    ],
    nodes: [
      // Tier 0: Stages 1, 2, 3
      { id: "w_p1", label: "1. أساسيات البرمجة والإنترنت", tier: 0, row: 0, role: "frontend_arch", desc: "كيف يعمل الويب، HTTP، DNS، والمتصفح" },
      { id: "w_p2", label: "2. HTML5, CSS3 & Tailwind", tier: 0, row: 1.5, role: "frontend_arch", desc: "بناء وتنسيق الواجهات المتجاوبة Flexbox & Grid" },
      { id: "w_p3", label: "3. JavaScript Deep Dive", tier: 0, row: 3, role: "frontend_arch", desc: "ES6+, DOM, Event Loop, Async/Await & Fetch" },
      // Tier 1: Stages 4, 5, 6
      { id: "w_p4", label: "4. Git, GitHub & TypeScript", tier: 1, row: 0, role: "frontend_arch", desc: "إدارة الإصدارات والبرمجة الصارمة بـ TypeScript" },
      { id: "w_p5", label: "5. React.js (أو Vue / Angular)", tier: 1, row: 1.5, role: "frontend_arch", desc: "بناء واجهات المكونات التفاعلية والـ Hooks" },
      { id: "w_p6", label: "6. Advanced React & State", tier: 1, row: 3, role: "frontend_arch", desc: "React Query, Zustand, Redux & تحسين الأداء" },
      // Tier 2: Stages 7, 8, 9
      { id: "w_p7", label: "7. Next.js Full-Stack SSR", tier: 2, row: 0, role: "frontend_arch", desc: "Server Components, SSR, SEO & App Router" },
      { id: "w_p8", label: "8. Backend (Node / PHP Laravel / .NET)", tier: 2, row: 1.5, role: "backend_arch", desc: "هندسة الخوادم وبناء REST & GraphQL APIs" },
      { id: "w_p9", label: "9. Databases (SQL, NoSQL & Redis)", tier: 2, row: 3, role: "backend_arch", desc: "PostgreSQL, MySQL, MongoDB, Firebase & Caching" },
      // Tier 3: Stages 10, 11, 12
      { id: "w_p10", label: "10. Auth (JWT, OAuth2 & RBAC)", tier: 3, row: 0, role: "backend_arch", desc: "تأمين الدخول، الجلسات، والصلاحيات المتعددة" },
      { id: "w_p11", label: "11. Testing (Unit, API & E2E)", tier: 3, row: 1.5, role: "system_design", desc: "أتمتة الاختبارات بـ Vitest / Pest / Playwright" },
      { id: "w_p12", label: "12. Web Security (OWASP Top 10)", tier: 3, row: 3, role: "backend_arch", desc: "حماية التطبيق من SQLi, XSS, CSRF, IDOR & Rate-Limit" },
      // Tier 4: Stages 13, 14, 15
      { id: "w_p13", label: "13. System Design & Queues", tier: 4, row: 0, role: "system_design", desc: "تصميم الأنظمة الكبرى، الطوابير، والـ WebSockets" },
      { id: "w_p14", label: "14. Docker, Nginx & CI/CD Cloud", tier: 4, row: 1.5, role: "system_design", desc: "الحاويات، الأتمتة بـ GitHub Actions، والنشر السحابي" },
      { id: "w_p15", label: "🏆 15. Production SaaS Capstone", tier: 4, row: 3, role: "system_design", desc: "بناء وإطلاق منصة كاملة مع الدفع الإلكتروني والـ Portfolio" }
    ],
    edges: [
      ["w_p1", "w_p2"], ["w_p2", "w_p3"], ["w_p3", "w_p4"],
      ["w_p4", "w_p5"], ["w_p5", "w_p6"], ["w_p6", "w_p7"],
      ["w_p4", "w_p8"], ["w_p8", "w_p9"], ["w_p7", "w_p8"],
      ["w_p8", "w_p10"], ["w_p9", "w_p10"], ["w_p7", "w_p11"],
      ["w_p10", "w_p12"], ["w_p9", "w_p13"], ["w_p12", "w_p13"],
      ["w_p11", "w_p14"], ["w_p13", "w_p14"], ["w_p14", "w_p15"]
    ]
  },

  /* ==========================================================================
     TRACK 2: CYBERSECURITY UNIVERSITY (17 DEEP NODES & 6 SPECIALIZATIONS)
     ========================================================================== */
  {
    id: "cybersecurity",
    name: "2. جامعة الأمن السيبراني (Cybersecurity)",
    shortTag: "Red Team / Blue Team & SOC / Bug Bounty / CloudSec / Malware / GRC",
    icon: "fa-shield-halved",
    accent: "#EF4444",
    introTitle: "🛡️ جامعة الأمن السيبراني الشاملة: من التأسيس الشبكي والبرمجي إلى الاحتراف العالمي",
    introText: "دليل هندسي متكامل يغطي الأمن السيبراني من جذوره الحقيقية؛ يبدأ بالركائز الخمس الإجبارية (الشبكات، لينكس، ويندوز و Active Directory، البرمجة، و Security+)، ثم يفصّل التخصصات الـ 6 الكبرى مع المسارات البديلة للشهادات والمعامل العملية المجانية والمدفوعة.",
    whyPoints: [
      { title: "🧱 تأسيس هندسي قبل أدوات الاختراق", desc: "يفهمك كيف تعمل البروتوكولات والأنظمة والكود من الداخل لتصبح مهندس أمن حقيقي وليس مجرد مشغل أدوات." },
      { title: "⚔️ تغطية كاملة للهجوم والدفاع والحوكمة", desc: "يقارن لك بوضوح بين وظائف Red Team و Blue Team/SOC و Bug Bounty و CloudSec لتختار تخصصك بثقة." },
      { title: "🔄 مسارات بديلة للشهادات والتدريب", desc: "يوفر لك البدائل العملية منخفضة التكلفة (مثل CPTS و PNPT و BTL1) بجانب الشهادات التقليدية (OSCP و SANS)." }
    ],
    alternativePaths: [
      {
        title: "🔴 المسار الهجومي البديل والأقوى عملياً: HTB CPTS & PNPT بدلاً من التكلفة الباهظة",
        badge: "أقوى بديل عملي لـ OSCP بتكلفة أقل ومحتوى أعمق",
        desc: "يمكنك تأسيس نفسك مجاناً عبر PortSwigger و TryHackMe، ثم خوض مسار Penetration Tester على HackTheBox Academy للحصول على شهادة CPTS أو شهادة PNPT العملية.",
        stack: ["eJPTv2 (بداية عملية)", "TCM PNPT (اختبار اختراق شبكة واقعي + تقرير)", "HTB CPTS (منهج عميق جداً)", "OffSec OSCP (المعيار الكلاسيكي للشركات)"],
        yt: "IppSec + The Cyber Mentor (TCM) + Rana Khalil (Web Security)"
      },
      {
        title: "🔵 المسار الدفاعي والتحقيق الجنائي (SOC & DFIR Alternative Path)",
        badge: "أعلى نسبة وظائف متاحة لحديثي التخرج في الشركات والبنوك",
        desc: "مراكز العمليات الأمنية (SOC) تطلب مهندسين يومياً. يمكنك بناء مختبرك مجاناً بـ Wazuh و ELK والتدرب على منصة CyberDefenders.",
        stack: ["CompTIA Security+", "BTL1 (Blue Team Level 1)", "CCD (Certified CyberDefender — عملية وقوية جداً)", "CompTIA CySA+", "SANS GCIH / GCFA"],
        yt: "John Hammond + 13Cubed (الأفضل عالمياً في التحقيق الجنائي DFIR) + CyberDefenders"
      },
      {
        title: "🐞 مسار العمل الحر وصيد الجوائز المالية (Bug Bounty & AppSec Path)",
        badge: "دخل بالدولار من المنزل بدون انتظار وظيفة تقليدية",
        desc: "يركز بالكامل على إتقان برمجة الويب والـ APIs والموبايل واكتشاف الثغرات في الشركات العالمية على منصات HackerOne و Bugcrowd.",
        stack: ["PortSwigger Web Security Academy (مجاني 100%)", "Burp Suite Pro / Caido", "Recon Automation (Nuclei / Subfinder)", "HTB CBBH", "Source Code Review"],
        yt: "Ebrahim Hegazy (Zigoo0) + NahamSec + InsiderPhD + STÖK"
      }
    ],
    foundations: [
      { id: "cy_f1", title: "1. هندسة الشبكات (CCNA 200-301 / CompTIA Network+)", desc: "OSI, TCP/IP, Subnetting, DNS, HTTP/S, Routing, Switching, Firewalls, Wireshark.", yt: "Eng. Ahmed Nazmy / Jeremy's IT Lab" },
      { id: "cy_f2", title: "2. إدارة نظام لينكس والـ Bash Scripting", desc: "File System, Permissions (SUID), Processes, Networking, SSH & Bash Automation.", yt: "NetworkChuck / الدسوقي / Elzero" },
      { id: "cy_f3", title: "3. أنظمة ويندوز و Active Directory Internals", desc: "Domain Controllers, Kerberos, NTLM, GPOs, PowerShell & Windows Registry.", yt: "The Cyber Mentor (TCM) / John Hammond" },
      { id: "cy_f4", title: "4. البرمجة للأمن السيبراني (Python, Bash, JS & SQL)", desc: "أتمتة الفحص بـ Python وفهم الكود البرمجي وراء ثغرات XSS و SQL Injection.", yt: "Elzero Web School / freeCodeCamp" },
      { id: "cy_f5", title: "5. القاعدة الأمنية الشاملة (CompTIA Security+ SY0-701)", desc: "التشفير التطبيقي، إدارة الهوية IAM، تحليل التهديدات، ومعمارية الدفاع.", yt: "Professor Messer Security+ SY0-701" }
    ],
    roles: [
      {
        id: "red_team",
        title: "🔴 الفريق الأحمر واختبار الاختراق (Red Team & Penetration Testing)",
        mission: "محاكاة الهجمات السيبرانية لاكتشاف الثغرات في الشبكات والـ Active Directory والتطبيقات قبل المهاجمين.",
        skills: ["Network PenTesting", "Active Directory Exploitation", "Web & API PenTesting", "Privilege Escalation", "Pivoting & Tunneling", "C2 & EDR Evasion"],
        tools: ["Nmap", "Burp Suite Pro", "Metasploit", "BloodHound", "Impacket", "NetExec", "Ligolo-ng", "Hashcat"],
        certs: ["eJPTv2", "PNPT", "HTB CPTS", "OSCP", "OSEP"]
      },
      {
        id: "blue_team",
        title: "🔵 الفريق الأزرق والتحقيق الجنائي (Blue Team / SOC & DFIR)",
        mission: "مراقبة الشبكات على مدار الساعة، تحليل السجلات عبر SIEM، صيد التهديدات، والاستجابة للحوادث الجنائية.",
        skills: ["SIEM Engineering (Splunk/Wazuh/ELK)", "Sysmon & Event Logs", "Packet Analysis (PCAP)", "Memory & Disk Forensics", "Incident Response", "YARA & Sigma Rules"],
        tools: ["Splunk", "Wazuh", "ELK Stack", "Wireshark", "Volatility 3", "Velociraptor", "KAPE", "Autopsy"],
        certs: ["Security+", "BTL1", "CySA+", "CCD (CyberDefender)", "GCFA / GCIH"]
      },
      {
        id: "bug_bounty",
        title: "🐞 صيد الثغرات وأمن التطبيقات (Bug Bounty & AppSec Engineer)",
        mission: "اكتشاف الثغرات الأمنية في منصات الويب والـ APIs والموبايل ومراجعة الكود المصدري.",
        skills: ["OWASP Top 10 & API Top 10", "SQLi / XSS / SSRF / IDOR", "JWT & OAuth Flaws", "Large-Scale Recon", "Secure Code Review"],
        tools: ["Burp Suite / Caido", "Subfinder", "Nuclei", "FFUF", "SQLMap", "Postman", "Semgrep"],
        certs: ["PortSwigger Academy", "eWPTXv2", "HTB CBBH", "OSWE"]
      },
      {
        id: "cloud_devsecops",
        title: "☁️ أمن السحابة و DevSecOps (Cloud & Container Security)",
        mission: "تأمين بيئات AWS/Azure وحاويات Docker/Kubernetes ودمج الفحص الأمني في خطوط CI/CD.",
        skills: ["Cloud IAM Hardening", "Kubernetes Security", "SAST / DAST / SCA", "Secrets Management", "Terraform IaC Scanning"],
        tools: ["Trivy", "Snyk", "SonarQube", "Checkov", "Falco", "HashiCorp Vault", "AWS Security Hub"],
        certs: ["AWS Security Specialty", "AZ-500", "CKS (Kubernetes Security)"]
      },
      {
        id: "malware_rev",
        title: "🧬 تحليل البرمجيات الخبيثة والهندسة العكسية (Malware & Reverse Eng)",
        mission: "تفكيك الفيروسات وبرامج الفدية بالهندسة العكسية لفهم سلوكها واستخراج بصمات الكشف.",
        skills: ["x86/x64 Assembly", "Static & Dynamic Malware Analysis", "Unpacking & Deobfuscation", "Windows Kernel APIs", "Exploit Dev"],
        tools: ["Ghidra", "IDA Pro", "x64dbg", "ProcMon", "PEStudio", "Any.Run"],
        certs: ["GREM (SANS)", "OSED", "Zero2Automated"]
      },
      {
        id: "grc",
        title: "⚖️ الحوكمة وإدارة المخاطر والامتثال (GRC & Cyber Audit)",
        mission: "بناء السياسات الأمنية، تقييم المخاطر، وضمان الامتثال لمعايير ISO 27001 و NIST والبنك المركزي.",
        skills: ["Risk Assessment", "ISO 27001 Auditing", "NIST CSF", "PCI-DSS & GDPR", "Business Continuity"],
        tools: ["RSA Archer", "OneTrust", "ServiceNow GRC", "Risk Matrix"],
        certs: ["ISO 27001 Lead Auditor", "CRISC", "CISM", "CISSP"]
      }
    ],
    resources: [
      { name: "PortSwigger Web Security Academy", type: "معامل أمن ويب مجانية بالكامل (الأفضل عالمياً)", url: "https://portswigger.net/web-security" },
      { name: "TryHackMe & HackTheBox Academy", type: "معامل Red Team & Blue Team متدرجة من الصفر", url: "https://tryhackme.com" },
      { name: "CyberDefenders (Blue Team & DFIR Labs)", type: "أقوى منصة عملية لتحديات الفريق الأزرق والتحقيق الجنائي", url: "https://cyberdefenders.org" }
    ],
    nodes: [
      { id: "n_net", label: "Networking (CCNA/N+)", tier: 0, row: 0, role: "foundation", desc: "بروتوكولات الشبكات، التقسيم، وتحليل الحزم" },
      { id: "n_lin", label: "Linux & Bash CLI", tier: 0, row: 1, role: "foundation", desc: "إدارة لينكس والصلاحيات وأتمتة الـ Bash" },
      { id: "n_win", label: "Windows & Active Directory", tier: 0, row: 2, role: "foundation", desc: "معمارية ويندوز و Kerberos و الدومين" },
      { id: "n_code", label: "Python, JS & SQL", tier: 0, row: 3, role: "foundation", desc: "البرمجة لأتمتة الاختراق وفهم ثغرات الويب" },
      { id: "n_secplus", label: "CompTIA Security+ Core", tier: 1, row: 1.5, role: "foundation", desc: "التشفير، الهجمات، إدارة الهوية، وتأمين الشبكات" },
      { id: "n_websec", label: "Web & API Security (OWASP)", tier: 2, row: 0, role: "bug_bounty", desc: "ثغرات SQLi, XSS, IDOR, SSRF & Burp Suite" },
      { id: "n_netpen", label: "Network & AD PenTesting", tier: 2, row: 1, role: "red_team", desc: "اختراق الشبكات ورفع الصلاحيات و Active Directory" },
      { id: "n_siem", label: "SIEM & Log Analysis (SOC)", tier: 2, row: 2, role: "blue_team", desc: "مراقبة السجلات بـ Splunk/Wazuh وكشف الاختراق" },
      { id: "n_cloudsec", label: "Cloud & DevSecOps", tier: 2, row: 3, role: "cloud_devsecops", desc: "تأمين السحابة والحاويات وخطوط CI/CD" },
      { id: "n_bounty", label: "Bug Bounty & Recon", tier: 3, row: 0, role: "bug_bounty", desc: "الفحص الواسع بـ Nuclei وصيد الثغرات" },
      { id: "n_redops", label: "Red Team, C2 & Malware RE", tier: 3, row: 1, role: "red_team", desc: "عمليات الفريق الأحمر وتخطي الـ EDR والهندسة العكسية" },
      { id: "n_dfir", label: "DFIR & Threat Hunting", tier: 3, row: 2, role: "blue_team", desc: "التحقيق الجنائي للذاكرة والقرص وصيد التهديدات" },
      { id: "n_grc", label: "GRC (ISO 27001 & NIST)", tier: 3, row: 3, role: "grc", desc: "الحوكمة وإدارة المخاطر والتدقيق الأمني" },
      { id: "n_oswe", label: "🏆 CBBH / OSWE", tier: 4, row: 0, role: "bug_bounty", desc: "الاحتراف العالمي في أمن الويب" },
      { id: "n_oscp", label: "🏆 CPTS / OSCP / OSEP", tier: 4, row: 1, role: "red_team", desc: "الاحتراف العالمي في اختبار الاختراق" },
      { id: "n_btl1", label: "🏆 BTL1 / CCD / GCFA", tier: 4, row: 2, role: "blue_team", desc: "الاحتراف العالمي في الدفاع والتحقيق الجنائي" },
      { id: "n_cissp", label: "🏆 CKS / CISSP / CISM", tier: 4, row: 3, role: "cloud_devsecops", desc: "الاحتراف في أمن السحابة وقيادة الأمن" }
    ],
    edges: [
      ["n_net", "n_secplus"], ["n_lin", "n_secplus"], ["n_win", "n_secplus"], ["n_code", "n_secplus"],
      ["n_secplus", "n_websec"], ["n_secplus", "n_netpen"], ["n_secplus", "n_siem"], ["n_secplus", "n_cloudsec"],
      ["n_code", "n_websec"], ["n_win", "n_netpen"], ["n_win", "n_siem"], ["n_lin", "n_cloudsec"],
      ["n_websec", "n_bounty"], ["n_websec", "n_netpen"],
      ["n_netpen", "n_redops"], ["n_siem", "n_dfir"], ["n_cloudsec", "n_grc"],
      ["n_bounty", "n_oswe"], ["n_redops", "n_oscp"], ["n_dfir", "n_btl1"], ["n_cloudsec", "n_cissp"], ["n_grc", "n_cissp"]
    ]
  },

  /* ==========================================================================
     TRACK 3: AI, DATA SCIENCE & GEN-AI UNIVERSITY (12 DEEP NODES)
     ========================================================================== */
  {
    id: "ai_data",
    name: "3. جامعة الذكاء الاصطناعي والبيانات (AI, ML & GenAI)",
    shortTag: "Math & Python / Classical ML / Deep Learning / Vision / LLMs, RAG & Agents",
    icon: "fa-brain",
    accent: "#10B981",
    introTitle: "🤖 جامعة الذكاء الاصطناعي، علوم البيانات، وهندسة النماذج اللغوية العملاقة (LLMs & AI Agents)",
    introText: "منهج جامعي عميق يأخذك من التأسيس الرياضي والبرمجي بلغة Python و SQL، مروراً بتحليل البيانات وخوارزميات تعلم الآلة الكلاسيكية والشبكات العصبية العميقة (PyTorch / TensorFlow)، وصولاً إلى أحدث تقنيات الرؤية الحاسوبية، النماذج اللغوية العملاقة (LLMs)، أنظمة البحث الدلالي (RAG)، بناء الـ AI Agents، ونشر النماذج في الإنتاج (MLOps).",
    whyPoints: [
      { title: "📐 تأسيس رياضي وبرمجي متين", desc: "يشرح لك الجبر الخطي، التفاضل، والاحتمالات بلغة برمجية تطبيقية حتى تفهم كيف تفكر الخوارزميات." },
      { title: "✨ 12 محطة شاملة لكل فروع الـ AI", desc: "سواء كنت تريد العمل كمحلل/عالم بيانات، أو مهندس رؤية حاسوبية، أو مهندس تطبيقات LLMs & RAG ستجد مسارك مفصلاً." },
      { title: "🔄 بدائل مفتوحة المصدر وسحابية", desc: "يغطي العمل بالنماذج السحابية (Gemini/OpenAI) وبجانبها تشغيل وتخصيص النماذج المفتوحة محلياً (Llama 3 / Qwen عبر Ollama & Unsloth)." }
    ],
    alternativePaths: [
      {
        title: "✨ المسار الأسرع طلباً للشركات حالياً: AI Application & LLM / RAG Engineer",
        badge: "مثالي لمهندسي البرمجيات الراغبين في دخول الـ AI بسرعة",
        desc: "يركز على بناء أنظمة ذكية فوق النماذج اللغوية الجاهزة والمفتوحة، وربطها بقواعد بيانات الشركات ومستنداتها وأدواتها.",
        stack: ["Python & FastAPI", "Prompt Engineering & Structured Outputs", "RAG & Vector DBs (Qdrant / pgvector)", "LangChain / LlamaIndex / LangGraph", "Local LLMs (Ollama / vLLM)"],
        yt: "DeepLearning.AI Short Courses + ابو بكر صولح (Bakr) + Sam Witteveen"
      },
      {
        title: "🔬 المسار البحثي والهندسي العميق: Core Machine Learning & Deep Learning Engineer",
        badge: "لبناء وتدريب نماذج الذكاء الاصطناعي من الصفر",
        desc: "يركز على الرياضيات، خوارزميات التوقع والتصنيف، والشبكات العصبية العميقة للرؤية الحاسوبية ومعالجة اللغات.",
        stack: ["Linear Algebra, Calculus & Stats", "Scikit-Learn & XGBoost/LightGBM", "PyTorch (أو TensorFlow/Keras)", "OpenCV & YOLOv8/v11", "HuggingFace Transformers & QLoRA Fine-Tuning"],
        yt: "د. هشام عاصم (Hesham Asem) + Andrew Ng + Andrej Karpathy"
      },
      {
        title: "📊 مسار علوم وتحليل البيانات وذكاء الأعمال (Data Scientist & BI Analyst)",
        badge: "تحويل بيانات الشركات والمبيعات إلى قرارات وتنبؤات",
        desc: "يركز على استخراج وتنظيف البيانات وبناء لوحات المعلومات ونماذج التنبؤ الإحصائية.",
        stack: ["Advanced SQL (PostgreSQL / BigQuery)", "Python (Pandas, Polars, Seaborn)", "Statistical Analysis & A/B Testing", "Power BI / Tableau / Streamlit", "Predictive ML Models"],
        yt: "Data with Baraa + Alex The Analyst + StatQuest"
      }
    ],
foundations: [
      { id: "ai_f1", title: "1. إتقان Python ومكتبات البيانات (NumPy, Pandas, Matplotlib)", desc: "معالجة المصفوفات وتنظيف الجداول وتصوير البيانات.", yt: "Hesham Asem / Corey Schafer / Kaggle" },
      { id: "ai_f2", title: "2. الرياضيات للذكاء الاصطناعي (Linear Algebra, Calculus, Stats)", desc: "المصفوفات، الاشتقاق، Gradient Descent، والاحتمالات.", yt: "3Blue1Brown / StatQuest" },
      { id: "ai_f3", title: "3. قواعد البيانات ولغة SQL المتقدمة وذكاء الأعمال (Power BI)", desc: "استخراج البيانات، الدوال النافذية Window Functions، ولوحات القرار.", yt: "Data with Baraa / Alex The Analyst" },
      { id: "ai_f4", title: "4. أساسيات Git & Linux وبناء الـ APIs بـ FastAPI", desc: "إدارة الكود وتشغيل النماذج خلف واجهات برمجية سريعة.", yt: "FreeCodeCamp / غريب الشيخ" }
    ],
    roles: [
      {
        id: "ml_dl_eng",
        title: "🤖 مهندس تعلم آلة وتعلم عميق ورؤية حاسوبية (ML, DL & Vision Engineer)",
        mission: "تصميم وتدريب نماذج التنبؤ والتصنيف والشبكات العصبية العميقة للصور والفيديو والبيانات الجدولية.",
        skills: ["Scikit-Learn & XGBoost / LightGBM", "PyTorch & TensorFlow/Keras", "Computer Vision (OpenCV & YOLOv8/v11)", "Feature Engineering & Optuna", "CNNs & Vision Transformers"],
        tools: ["PyTorch", "Scikit-Learn", "OpenCV", "Ultralytics YOLO", "Jupyter / Colab", "Weights & Biases"],
        certs: ["Andrew Ng Machine Learning Specialization", "Deep Learning Specialization", "TensorFlow Developer"]
      },
      {
        id: "llm_genai",
        title: "✨ مهندس الذكاء الاصطناعي التوليدي والـ LLMs (GenAI, RAG & Agents Engineer)",
        mission: "بناء أنظمة ذكية فوق النماذج اللغوية العملاقة، أنظمة البحث في المستندات (RAG)، والوكلاء المستقلين (AI Agents).",
        skills: ["Prompt Engineering & Structured JSON", "RAG Architecture & Chunking", "Vector Databases (Qdrant / Chroma / pgvector)", "AI Agents (LangGraph / CrewAI / LlamaIndex)", "LLM Fine-Tuning (LoRA / QLoRA / Unsloth)"],
        tools: ["HuggingFace", "LangGraph / LlamaIndex", "Qdrant", "Ollama / vLLM", "Unsloth", "OpenAI / Gemini SDK"],
        certs: ["DeepLearning.AI Generative AI Courses", "HuggingFace NLP & LLM Course", "AWS Certified AI Practitioner"]
      },
      {
        id: "data_sci_bi",
        title: "📊 عالم ومحلل بيانات وذكاء أعمال (Data Scientist & BI Analyst)",
        mission: "تحويل البيانات الضخمة إلى رؤى إستراتيجية ولوحات تفاعلية ونماذج إحصائية تدعم قرارات الشركات.",
        skills: ["Advanced SQL & Data Warehousing", "Exploratory Data Analysis (EDA)", "Statistical Modeling & A/B Testing", "Power BI / Tableau / Streamlit Dashboards", "Data Storytelling"],
        tools: ["Python (Pandas / Polars / Seaborn)", "PostgreSQL / BigQuery", "Power BI", "Tableau", "Streamlit"],
        certs: ["Google Data Analytics Professional", "IBM Data Science", "Microsoft PL-300 (Power BI)"]
      },
      {
        id: "mlops_eng",
        title: "⚙️ مهندس نشر وتشغيل نماذج الذكاء الاصطناعي (MLOps & AI Production Engineer)",
        mission: "نقل نماذج الذكاء الاصطناعي من دفاتر التجارب إلى خوادم إنتاجية مؤمنة وسريعة ومراقبة أدائها.",
        skills: ["FastAPI Async Model Serving", "Docker & Kubernetes for GPU", "Experiment Tracking (MLflow)", "LLM Observability (Langfuse)", "Model Quantization (GGUF / AWQ / ONNX)"],
        tools: ["FastAPI", "Docker", "MLflow", "Langfuse", "vLLM", "GitHub Actions"],
        certs: ["AWS Certified Machine Learning Specialty", "MLOps Zoomcamp (DataTalksClub)"]
      }
    ],
    resources: [
      { name: "قناة د. هشام عاصم (Hesham Asem)", type: "يوتيوب عربي — شرح شامل لـ ML & DL & NLP من الصفر", url: "https://www.youtube.com/@HeshamAsem" },
      { name: "DeepLearning.AI (Andrew Ng) & StatQuest", type: "أقوى الكورسات التأسيسية وتطبيقات GenAI عالمياً", url: "https://www.deeplearning.ai" },
      { name: "Kaggle & HuggingFace Learn", type: "معامل تطبيقية ومجموعات بيانات ونماذج مفتوحة المصدر", url: "https://huggingface.co/learn" }
    ],
    nodes: [
      // Tier 0: Foundations
      { id: "a_py", label: "1. Python, NumPy & Pandas", tier: 0, row: 0, role: "data_sci_bi", desc: "البرمجة العلمية وتنظيف ومعالجة البيانات" },
      { id: "a_math", label: "2. Math (Linear Alg, Calc & Stats)", tier: 0, row: 1.5, role: "ml_dl_eng", desc: "الجبر الخطي والتفاضل والاحتمالات للـ AI" },
      { id: "a_sql_bi", label: "3. Advanced SQL, EDA & Power BI", tier: 0, row: 3, role: "data_sci_bi", desc: "استعلامات البيانات التحليلية ولوحات ذكاء الأعمال" },
      // Tier 1: Classical ML & Deep Learning Core
      { id: "a_ml", label: "4. Classical ML (Scikit & XGBoost)", tier: 1, row: 0.7, role: "ml_dl_eng", desc: "خوارزميات التوقع، التصنيف، التجميع، وهندسة الخصائص" },
      { id: "a_dl", label: "5. Deep Learning (PyTorch / Keras)", tier: 1, row: 2.3, role: "ml_dl_eng", desc: "الشبكات العصبية العميقة والتدريب على الـ GPU" },
      // Tier 2: Vision, NLP & LLMs
      { id: "a_cv", label: "6. Computer Vision (OpenCV & YOLO)", tier: 2, row: 0, role: "ml_dl_eng", desc: "معالجة الصور واكتشاف الأجسام لحظياً" },
      { id: "a_nlp", label: "7. NLP & Transformers (HuggingFace)", tier: 2, row: 1.5, role: "llm_genai", desc: "معالجة اللغات الطبيعية وآلية الانتباه Self-Attention" },
      { id: "a_llm", label: "8. LLMs, Prompting & Local Ollama", tier: 2, row: 3, role: "llm_genai", desc: "هندسة النماذج اللغوية العملاقة وتشغيلها محلياً وسحابياً" },
      // Tier 3: RAG & AI Agents / Fine-Tuning
      { id: "a_rag", label: "9. RAG Systems & Vector DBs", tier: 3, row: 0.7, role: "llm_genai", desc: "ربط النماذج بملفاتك عبر Qdrant / Chroma و LlamaIndex" },
      { id: "a_agents", label: "10. AI Agents & QLoRA Fine-Tuning", tier: 3, row: 2.3, role: "llm_genai", desc: "بناء الوكلاء المستقلين بـ LangGraph وتخصيص النماذج" },
      // Tier 4: Production MLOps
      { id: "a_mlops", label: "🏆 11. MLOps, FastAPI & Docker Production", tier: 4, row: 1.5, role: "mlops_eng", desc: "نشر ومراقبة أنظمة الذكاء الاصطناعي في بيئة الإنتاج" }
    ],
    edges: [
      ["a_py", "a_ml"], ["a_math", "a_ml"], ["a_sql_bi", "a_ml"],
      ["a_py", "a_dl"], ["a_math", "a_dl"], ["a_ml", "a_dl"],
      ["a_dl", "a_cv"], ["a_dl", "a_nlp"], ["a_nlp", "a_llm"],
      ["a_llm", "a_rag"], ["a_llm", "a_agents"], ["a_rag", "a_agents"],
      ["a_cv", "a_mlops"], ["a_rag", "a_mlops"], ["a_agents", "a_mlops"]
    ]
  }
];

/* ============================================================================
   4. STATE, 4-PILLAR MASTERY & CUSTOM USER PLAN / NODE ENGINE
   ============================================================================ */
const TracksState = {
  activeTrackId: localStorage.getItem("MY_LIFE_OS_ACTIVE_TRACK_V3") || "fullstack",
  activeRoleFilter: "all",
  selectedNodeId: null,
  zoom: 1,
  panX: 0,
  panY: 0,
  isFullscreenGraph: false,
  masteredFoundations: SafeTrackStore.get("MY_LIFE_OS_FOUNDATIONS_V2", {}),
  nodePillars: SafeTrackStore.get("MY_LIFE_OS_NODE_PILLARS_V2", {}),
  customNodesByTrack: SafeTrackStore.get("MY_LIFE_OS_CUSTOM_TRACK_NODES_V3", {}),
  userCustomPlans: SafeTrackStore.get("MY_LIFE_OS_USER_CUSTOM_PLANS_V3", {}),
  animFrame: null
};

// التأكد أن المسار المختار ضمن الـ 3 مجالات المعتمدة
if (!CAREER_TRACKS_DB.some(t => t.id === TracksState.activeTrackId)) {
  TracksState.activeTrackId = "fullstack";
}

function getNodeMasteryScore(nodeId) {
  const p = TracksState.nodePillars[nodeId] || {};
  let score = 0;
  if (p.theory) score += 25;
  if (p.lab) score += 25;
  if (p.project) score += 30;
  if (p.interview) score += 20;
  return score;
}

function isNodeMastered(nodeId) {
  return getNodeMasteryScore(nodeId) >= 80;
}

function saveTracksProgress() {
  SafeTrackStore.set("MY_LIFE_OS_FOUNDATIONS_V2", TracksState.masteredFoundations);
  SafeTrackStore.set("MY_LIFE_OS_NODE_PILLARS_V2", TracksState.nodePillars);
  SafeTrackStore.set("MY_LIFE_OS_CUSTOM_TRACK_NODES_V3", TracksState.customNodesByTrack);
  SafeTrackStore.set("MY_LIFE_OS_USER_CUSTOM_PLANS_V3", TracksState.userCustomPlans);
}

// دمج العقد الأصلية للمسار مع أي عقد أضافها المستخدم بنفسه في خطته الخاصة
function getTrackWithCustomNodes(trackId) {
  const baseTrack = CAREER_TRACKS_DB.find(t => t.id === trackId) || CAREER_TRACKS_DB[0];
  const userNodes = TracksState.customNodesByTrack[baseTrack.id] || [];
  const mergedNodes = [...baseTrack.nodes, ...userNodes];
  const mergedEdges = [...baseTrack.edges];

  userNodes.forEach(un => {
    if (un.connectFrom && mergedNodes.some(n => n.id === un.connectFrom)) {
      mergedEdges.push([un.connectFrom, un.id]);
    }
  });

  return {
    ...baseTrack,
    nodes: mergedNodes,
    edges: mergedEdges
  };
}

function getActiveTrack() {
  return getTrackWithCustomNodes(TracksState.activeTrackId);
}

function calculateTrackOverallProgress(track) {
  const fullTrack = getTrackWithCustomNodes(track.id);
  const totalFound = (fullTrack.foundations || []).length;
  const doneFoundScore = (fullTrack.foundations || []).reduce((acc, f) => acc + (TracksState.masteredFoundations[f.id] ? 100 : 0), 0);
  const totalNodes = (fullTrack.nodes || []).length;
  const doneNodesScore = (fullTrack.nodes || []).reduce((acc, n) => acc + getNodeMasteryScore(n.id), 0);

  const totalItems = Math.max(1, totalFound + totalNodes);
  return Math.round((doneFoundScore + doneNodesScore) / totalItems);
}

/* ============================================================================
   5. INJECT TAB INTO SIDEBAR & RENDER MAIN ENCYCLOPEDIA VIEW
   ============================================================================ */
function injectTracksTabIntoSidebar() {
  injectTracksStyles();
  initGlobalAntiCopyProtection();

  const nav = document.querySelector(".sidebar-nav");
  const main = document.querySelector(".main-content");
  const footer = document.querySelector(".app-footer");
  if (!nav || !main) return;

  if (!nav.querySelector('[data-view="career-tracks"]')) {
    const btn = document.createElement("button");
    btn.className = "nav-item";
    btn.id = "nav-btn-career-tracks";
    btn.dataset.view = "career-tracks";
    btn.innerHTML = `<i class="fa-solid fa-diagram-project gold-text"></i> <span>موسوعة المسارات والشبكات</span>`;
    const projBtn = nav.querySelector('[data-view="projects"]');
    if (projBtn) projBtn.insertAdjacentElement("afterend", btn);
    else nav.appendChild(btn);
  }

  if (!document.getElementById("view-career-tracks")) {
    const sec = document.createElement("section");
    sec.id = "view-career-tracks";
    sec.className = "view-section";
    main.insertBefore(sec, footer);
  }
}

function renderCareerTracksEncyclopedia() {
  const sec = document.getElementById("view-career-tracks");
  if (!sec) return;

  document.body.classList.toggle("tracks-network-fullscreen", TracksState.isFullscreenGraph);

  const track = getActiveTrack();
  const overallPct = calculateTrackOverallProgress(track);
  const masteredCount = track.nodes.filter(n => isNodeMastered(n.id)).length;

  const selectedNode = track.nodes.find(n => n.id === TracksState.selectedNodeId) || track.nodes[0];
  TracksState.selectedNodeId = selectedNode.id;

  const userPlanSteps = TracksState.userCustomPlans[track.id] || [];

  sec.innerHTML = `
    <!-- 1. شريط اختيار المجال من الـ 3 مجالات الكبرى فقط -->
    <div class="tracks-domain-bar">
      ${CAREER_TRACKS_DB.map(t => {
        const tPct = calculateTrackOverallProgress(t);
        return `
          <button type="button" class="track-domain-pill ${t.id === track.id ? "active" : ""}" data-select-track="${esc(t.id)}">
            <div class="track-domain-icon"><i class="fa-solid ${esc(t.icon)}"></i></div>
            <div style="flex:1; overflow:hidden;">
              <strong style="display:block; font-size:0.95rem;">${esc(t.name)}</strong>
              <small class="small-muted" style="font-size:0.76rem; display:block; margin-top:2px;">${esc(t.shortTag)}</small>
              <span class="badge badge-gold mt-1">إتقان المسار: ${tPct}%</span>
            </div>
          </button>
        `;
      }).join("")}
    </div>

    <!-- 2. البطاقة التعريفية الشاملة للمجال + أزرار بناء الخطة الشخصية -->
    <div class="track-hero-card">
      <div class="flex-between" style="flex-wrap:wrap; gap:12px;">
        <div>
          <span class="badge badge-gold mb-1"><i class="fa-solid ${esc(track.icon)}"></i> المنهج الجامعي التفصيلي الشامل + البدائل التقنية</span>
          <h2 class="mt-1">${esc(track.introTitle)}</h2>
        </div>
        <div class="filters-row">
          <span class="badge badge-emerald">الإتقان الكلي: ${overallPct}% (${masteredCount}/${track.nodes.length} محطة متقنة)</span>
          <button type="button" id="btn-add-custom-node" class="btn btn-outline btn-sm">
            <i class="fa-solid fa-circle-plus gold-text"></i> + أضف محطة/تقنية خاصة للشبكة
          </button>
          <button type="button" id="btn-open-custom-plan" class="btn btn-gold btn-sm">
            <i class="fa-solid fa-pen-ruler"></i> ✍️ ضع خطتك الخاصة للمسار
          </button>
          <button type="button" id="btn-track-to-goals" class="btn btn-outline btn-sm">
            <i class="fa-solid fa-bullseye gold-text"></i> اعتمد المسار في مهامي
          </button>
        </div>
      </div>
      <p class="mt-2" style="font-size:0.95rem; color:var(--text-primary); line-height:1.85;">${esc(track.introText)}</p>
      <div class="track-why-grid">
        ${track.whyPoints.map(w => `
          <div class="track-why-box">
            <strong class="gold-text">${esc(w.title)}</strong>
            <p class="small-muted mt-1">${esc(w.desc)}</p>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- 3. الخريطة الشبكية التفاعلية بعرض الشاشة الكامل 100% + الملف التفصيلي الكامل تحتها مباشرة -->
    <div id="network-graph-container" class="network-graph-shell ${TracksState.isFullscreenGraph ? "is-fullscreen" : ""}">
      <div class="network-toolbar">
        <div class="filters-row">
          <strong class="gold-text"><i class="fa-solid fa-circle-nodes"></i> الخريطة الشبكية التفاعلية (بعرض كامل):</strong>
          <button type="button" class="chip ${TracksState.activeRoleFilter === "all" ? "btn-gold" : ""}" data-role-filter="all">🌐 كل المراحل (${track.nodes.length})</button>
          ${track.nodes.some(n => n.role === "foundation") ? `<button type="button" class="chip ${TracksState.activeRoleFilter === "foundation" ? "btn-gold" : ""}" data-role-filter="foundation">🧱 الأساسيات</button>` : ""}
          ${track.roles.map(r => `
            <button type="button" class="chip ${TracksState.activeRoleFilter === r.id ? "btn-gold" : ""}" data-role-filter="${esc(r.id)}">
              ${esc(r.title.split("(")[0].trim())}
            </button>
          `).join("")}
        </div>
        <div class="filters-row">
          <button type="button" id="btn-net-zoom-in" class="btn btn-xs btn-outline" title="تكبير الشبكة"><i class="fa-solid fa-magnifying-glass-plus"></i> تكبير</button>
          <button type="button" id="btn-net-zoom-out" class="btn btn-xs btn-outline" title="تصغير الشبكة"><i class="fa-solid fa-magnifying-glass-minus"></i> تصغير</button>
          <button type="button" id="btn-net-reset" class="btn btn-xs btn-outline" title="توسيط وضبط الأبعاد"><i class="fa-solid fa-arrows-to-circle"></i> توسيط الشبكة</button>
          <button type="button" id="btn-net-fullscreen" class="btn btn-xs btn-gold">
            <i class="fa-solid ${TracksState.isFullscreenGraph ? "fa-compress" : "fa-expand"}"></i>
            ${TracksState.isFullscreenGraph ? "إغلاق ملء الشاشة (ESC)" : "تكبير الشبكة بملء الشاشة"}
          </button>
        </div>
      </div>

      <!-- شريط إرشادات التحكم والتكبير بـ Ctrl + عجلة الماوس -->
      <div class="network-sub-legend-bar">
        <div>
          <span>🟢 متقن (80%+)</span> &bull;
          <span>🟡 جاري التعلم</span> &bull;
          <span>⚪ لم يبدأ</span> &bull;
          <span class="gold-text">🖱️ اضغط على أي عقدة لعرض جميع دروسها وبدائلها ومشروعها بالأسفل (أو اسحبها بالماوس)</span>
        </div>
        <div>
          <span class="badge badge-gold">🔍 نصيحة: اضغط مع الاستمرار على زر CTRL وحرك بكرة الماوس لتكبير وتصغير الشبكة بحرية</span>
        </div>
      </div>

      <!-- كانفاس الشبكة بعرض كامل 100% مع مساحة سفلية واسعة لظهور كل النصوص -->
      <div class="network-canvas-wrap">
        <canvas id="track-network-canvas" class="network-canvas-viewport"></canvas>
      </div>

      <!-- الملف التعليمي الموسوعي للمرحلة المختارة (يظهر تحت الشبكة بعرض كامل) -->
      <div id="node-deep-dossier-panel" class="node-deep-dossier">
        ${buildNodeDeepDossierHTML(track, selectedNode)}
      </div>
    </div>

    <!-- 4. خطة المستخدم الشخصية المخصصة (تظهر وتُدار بحرية كاملة) -->
    <div class="card mb-4" style="margin-bottom:22px; border-color:var(--gold-primary);">
      <div class="card-header">
        <div>
          <h3><i class="fa-solid fa-compass-drafting gold-text"></i> خطتك الشخصية المخصصة في مسار ${esc(track.name)}</h3>
          <small class="small-muted">ضع خطواتك الخاصة أو ترتيبك المفضل (مثلاً: سأتعلم PHP & Laravel ثم Vue.js) وتابع إنجازها خطوة بخطوة</small>
        </div>
        <div class="filters-row">
          <button type="button" id="btn-open-custom-plan-2" class="btn btn-gold btn-sm">
            <i class="fa-solid fa-plus"></i> إضافة خطوة في خطتي الخاصة
          </button>
        </div>
      </div>
      ${userPlanSteps.length ? `
        <div class="items-grid">
          ${userPlanSteps.map((st, idx) => `
            <div class="item-card">
              <div>
                <div class="flex-between">
                  <span class="badge ${st.done ? "badge-emerald" : "badge-gold"}">الخطوة ${idx + 1} • ${esc(st.duration || "مخصص")}</span>
                  <button type="button" class="btn btn-xs btn-danger" data-del-plan-step="${idx}"><i class="fa-solid fa-trash"></i></button>
                </div>
                <h4 class="mt-2">${esc(st.title)}</h4>
                <p class="small-muted mt-1">${esc(st.notes || "")}</p>
              </div>
              <div class="flex-between mt-2">
                <button type="button" class="btn btn-xs ${st.done ? "btn-gold" : "btn-outline"}" data-toggle-plan-step="${idx}">
                  ${st.done ? "تم الإنجاز ✅" : "تحديد كمكتمل"}
                </button>
                <button type="button" class="btn btn-xs btn-outline" data-plan-step-to-task="${idx}">
                  <i class="fa-solid fa-list-check gold-text"></i> أضف للمهام
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      ` : `
        <p class="small-muted">لم تضع خطة مخصصة بعد. اضغط على <strong>"✍️ ضع خطتك الخاصة للمسار"</strong> أو <strong>"+ أضف محطة/تقنية خاصة للشبكة"</strong> لتفصيل المسار على مقاسك!</p>
      `}
    </div>

    <!-- 5. المسارات والخيارات التقنية البديلة بالتفصيل (PHP/Laravel vs Node vs Python vs .NET إلخ) -->
    <div class="card mb-4" style="margin-bottom:22px;">
      <div class="card-header">
        <h3><i class="fa-solid fa-code-Fork gold-text"></i> الخيارات والمسارات التقنية البديلة داخل هذا المجال (Alternative Stacks & Paths)</h3>
        <span class="badge badge-emerald">اختر التكنولوجيا الأنسب لهدفك وسوق العمل</span>
      </div>
      <div class="alt-paths-grid">
        ${(track.alternativePaths || []).map((ap, idx) => `
          <div class="alt-path-card">
            <div>
              <span class="badge badge-gold mb-1">${esc(ap.badge)}</span>
              <h4 class="gold-text mt-1">${esc(ap.title)}</h4>
              <p class="small-muted mt-1">${esc(ap.desc)}</p>
              <div class="cert-pill-row mt-2">
                ${ap.stack.map(s => `<span class="tool-badge">${esc(s)}</span>`).join("")}
              </div>
            </div>
            <div class="subject-progress-box mt-2">
              <small class="gold-text d-block"><i class="fa-brands fa-youtube"></i> أفضل مصادر هذا المسار البديل:</small>
              <strong style="font-size:0.82rem;">${esc(ap.yt)}</strong>
              <button type="button" class="btn btn-xs btn-gold btn-block mt-2" data-adopt-alt-path="${idx}">
                <i class="fa-solid fa-check"></i> اعتمد هذا المسار البديل في خطتي الخاصة
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- 6. الأساسيات الإجبارية للمجال (Mandatory Foundations) -->
    <div class="card mb-4" style="margin-bottom:22px;">
      <div class="card-header">
        <h3><i class="fa-solid fa-layer-group gold-text"></i> الأساسيات الإجبارية التي لا غنى عنها قبل التفرع (Mandatory Foundations)</h3>
        <span class="badge badge-gold">متاح مجاناً بالكامل على يوتيوب</span>
      </div>
      <div class="items-grid">
        ${track.foundations.map(f => {
          const isDone = TracksState.masteredFoundations[f.id] === true;
          return `
            <div class="item-card">
              <div>
                <div class="flex-between">
                  <span class="badge ${isDone ? "badge-emerald" : "badge-gold"}">${isDone ? "مكتمل ✅" : "أساسي إجباري"}</span>
                  <button type="button" class="btn btn-xs ${isDone ? "btn-gold" : "btn-outline"}" data-toggle-found="${esc(f.id)}">
                    ${isDone ? "تم الإتقان ✓" : "تحديد كمكتمل"}
                  </button>
                </div>
                <h4 class="mt-2">${esc(f.title)}</h4>
                <p class="small-muted mt-1">${esc(f.desc)}</p>
              </div>
              <div class="subject-progress-box mt-2">
                <small class="gold-text d-block"><i class="fa-brands fa-youtube"></i> أفضل مصدر مجاني مقترح:</small>
                <strong style="font-size:0.83rem;">${esc(f.yt)}</strong>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- 7. التخصصات المهنية الدقيقة والمسميات الوظيفية والشهادات -->
    <div class="card mb-4" style="margin-bottom:22px;">
      <div class="card-header">
        <h3><i class="fa-solid fa-user-shield gold-text"></i> المسميات الوظيفية، المهارات، الأدوات، والشهادات الدولية المعتمدة</h3>
        <small class="small-muted">اضغط "اعرض في الشبكة" لفلترة الخريطة الشبكية على التخصص المطلوب</small>
      </div>
      <div class="items-grid">
        ${track.roles.map(r => `
          <div class="role-specialist-card">
            <div>
              <h4 class="gold-text">${esc(r.title)}</h4>
              <p class="small-muted mt-1">${esc(r.mission)}</p>

              <div class="mt-2">
                <small class="gold-text d-block">🛠️ المهارات المطلوبة للوظيفة:</small>
                <div class="cert-pill-row">
                  ${r.skills.map(s => `<span class="badge badge-emerald">${esc(s)}</span>`).join("")}
                </div>
              </div>

              <div class="mt-2">
                <small class="gold-text d-block">⚙️ الأدوات العملية (Tools):</small>
                <div class="cert-pill-row">
                  ${r.tools.map(tl => `<span class="tool-badge">${esc(tl)}</span>`).join("")}
                </div>
              </div>

              <div class="mt-2">
                <small class="gold-text d-block">📜 الشهادات العالمية المطلوبة بالترتيب:</small>
                <div class="cert-pill-row">
                  ${r.certs.map(c => `<span class="cert-badge"><i class="fa-solid fa-award"></i> ${esc(c)}</span>`).join("")}
                </div>
              </div>
            </div>

            <div class="flex-between mt-2" style="border-top:1px solid rgba(255,255,255,0.07); padding-top:10px;">
              <button type="button" class="btn btn-xs btn-gold" data-focus-role-graph="${esc(r.id)}">
                <i class="fa-solid fa-diagram-project"></i> اعرض في الشبكة
              </button>
              <button type="button" class="btn btn-xs btn-outline" data-role-to-tasks="${esc(r.id)}">
                <i class="fa-solid fa-list-check gold-text"></i> حول لمهام في جدولي
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- 8. المنصات العملية والمستشار الذكي -->
    <div class="dashboard-grid">
      <div class="card">
        <div class="card-header">
          <h3><i class="fa-brands fa-youtube gold-text"></i> المنصات العملية وقنوات اليوتيوب المعتمدة</h3>
        </div>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${track.resources.map(res => `
            <div class="yt-resource-card">
              <div>
                <strong>${esc(res.name)}</strong>
                <small class="small-muted d-block">${esc(res.type)}</small>
              </div>
              <a href="${esc(res.url)}" target="_blank" rel="noopener" class="btn btn-xs btn-gold">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> فتح المصدر
              </a>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3><i class="fa-solid fa-wand-magic-sparkles gold-text"></i> البروفيسور الذكي للمسار (AI Track Tutor)</h3>
        </div>
        <p class="small-muted mb-2">اطلب شرح أي درس أو مقارنة بين تقنيتين (مثل PHP Laravel vs Node.js) أو أسئلة انترفيو:</p>
        <div class="input-action-row">
          <input type="text" id="track-ai-question" placeholder="مثال: قارن لي بالتفصيل بين تعلم Laravel أو Node.js في سوق العمل..." />
          <button type="button" id="btn-ask-track-ai" class="btn btn-gold btn-sm">اشرح لي بالـ AI</button>
        </div>
        <div id="track-ai-answer" class="subject-progress-box mt-2" style="white-space:pre-line; min-height:120px; max-height:340px; overflow-y:auto;">
          اضغط على أي مرحلة في الشبكة واضغط "اشرحلي دروسها بالـ AI" ليقوم البروفيسور الذكي بشرحها بالتفصيل الممل...
        </div>
      </div>
    </div>
  `;

  bindCareerTracksEvents(track);
  bindDossierEvents(track, selectedNode);
  startInteractiveNetworkGraph(track);
}

/* ============================================================================
   6. WIDE FULL-DETAIL DOSSIER UNDERNEATH THE NETWORK
   ============================================================================ */
function buildNodeDeepDossierHTML(track, node) {
  const details = getNodeRichDetails(track, node);
  const score = getNodeMasteryScore(node.id);
  const p = TracksState.nodePillars[node.id] || {};

  const prereqHtml = details.prereqNodes.length
    ? details.prereqNodes.map(pn => {
        const done = isNodeMastered(pn.id);
        return `<span class="badge ${done ? "badge-emerald" : "badge-danger"}" style="margin:3px;">
          ${done ? "✅" : "🔒"} ${esc(pn.label)}
        </span>`;
      }).join("")
    : `<span class="badge badge-emerald">🌱 محطة تأسيسية أولى (تستطيع البدء بها فوراً بدون متطلبات سابقة)</span>`;

  return `
    <div class="flex-between" style="flex-wrap:wrap; gap:12px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:14px;">
      <div>
        <div class="filters-row mb-1">
          <span class="badge badge-gold">${esc(details.phase)}</span>
          <span class="badge badge-emerald">⏱️ الوقت المقدر للإتقان: ${esc(details.hours)}</span>
          <span class="badge ${score >= 80 ? "badge-emerald" : "badge-warning"}">درجة إتقانك الحالية: ${score}%</span>
        </div>
        <h3 class="gold-text mt-1" style="font-size:1.35rem;">📍 المحطة المختارة من الشبكة: ${esc(node.label)}</h3>
        <p class="small-muted mt-1">${esc(node.desc)}</p>
      </div>

      <div class="filters-row">
        <button type="button" id="btn-ai-explain-node" class="btn btn-gold btn-sm">
          <i class="fa-solid fa-wand-magic-sparkles"></i> اشرحلي دروسها بالتفصيل بالـ AI
        </button>
        <button type="button" id="btn-ai-interview-node" class="btn btn-outline btn-sm">
          <i class="fa-solid fa-clipboard-question gold-text"></i> أسئلة انترفيو في هذه المهارة
        </button>
        <button type="button" id="btn-proof-to-projects" class="btn btn-outline btn-sm">
          <i class="fa-solid fa-code-branch gold-text"></i> أضف مشروعها لمشاريعي
        </button>
        <button type="button" id="btn-node-to-pomo" class="btn btn-outline btn-sm">
          <i class="fa-solid fa-stopwatch gold-text"></i> جلسة تركيز (50د)
        </button>
        ${node.isCustomNode ? `
          <button type="button" id="btn-delete-custom-node" class="btn btn-danger btn-sm">
            <i class="fa-solid fa-trash"></i> حذف المحطة المخصصة
          </button>
        ` : ""}
      </div>
    </div>

    <div class="dossier-grid-2col">
      <!-- العمود الأيمن: الدروس التفصيلية + المتطلبات السابقة + البدائل التقنية -->
      <div style="display:flex; flex-direction:column; gap:14px;">
        <div class="dossier-section-box">
          <h5><i class="fa-solid fa-link"></i> 1. المتطلبات السابقة قبل دراسة هذه المحطة (Prerequisites):</h5>
          <div>${prereqHtml}</div>
        </div>

        <div class="dossier-section-box">
          <h5><i class="fa-solid fa-book-open"></i> 2. المنهج والدروس التفصيلية داخل (${esc(node.label)}):</h5>
          <div>
            ${details.modules.map(m => `
              <div class="module-lesson-item">
                <i class="fa-solid fa-circle-check gold-text" style="margin-top:5px;"></i>
                <span>${esc(m)}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="dossier-section-box" style="border-color:rgba(33,197,197,0.35);">
          <h5><i class="fa-solid fa-code-branch"></i> 3. البدائل التقنية والخيارات المتاحة في سوق العمل (Alternatives):</h5>
          <p class="small-note" style="color:#67e8f9; line-height:1.7;">${esc(details.alternatives)}</p>
        </div>
      </div>

      <!-- العمود الأيسر: متى تعتبر نفسك أتقنتها + المشروع الإثباتي + محرك التقييم الرباعي -->
      <div style="display:flex; flex-direction:column; gap:14px;">
        <div class="dossier-section-box">
          <h5><i class="fa-solid fa-award"></i> 4. متى أعتبر نفسي أتقنت هذه المهارة فعلياً؟ (Mastery Criteria):</h5>
          <p class="small-muted" style="line-height:1.7;">${esc(details.criteria)}</p>
          <h5 class="mt-4"><i class="fa-solid fa-diagram-project"></i> 5. المشروع العملي الذي يثبت إتقانك (Capstone Proof Project):</h5>
          <p class="small-note" style="line-height:1.7;">${esc(details.project)}</p>
        </div>

        <div class="dossier-section-box">
          <div class="flex-between mb-1">
            <h5><i class="fa-solid fa-sliders"></i> 6. سجل تقييم إتقانك الفعلي للمحطة (Skill Mastery Engine):</h5>
            <strong class="gold-text" style="font-size:1.1rem;">${score}%</strong>
          </div>
          <div class="progress-bar-track mb-2"><div class="progress-bar-fill" style="width:${score}%"></div></div>

          <label class="mastery-pillar-row">
            <span>📖 1. فهم النظريات والمفاهيم الأساسية للدروس (25%)</span>
            <input type="checkbox" data-pillar-check="theory" ${p.theory ? "checked" : ""} />
          </label>
          <label class="mastery-pillar-row">
            <span>🧪 2. التطبيق العملي بيدك وحل التدريبات والمعامل (25%)</span>
            <input type="checkbox" data-pillar-check="lab" ${p.lab ? "checked" : ""} />
          </label>
          <label class="mastery-pillar-row">
            <span>💻 3. بناء المشروع الإثباتي للمهارة ورفعه على GitHub (30%)</span>
            <input type="checkbox" data-pillar-check="project" ${p.project ? "checked" : ""} />
          </label>
          <label class="mastery-pillar-row">
            <span>🎯 4. إتقان أسئلة المقابلات الشخصية الخاصة بالمهارة (20%)</span>
            <input type="checkbox" data-pillar-check="interview" ${p.interview ? "checked" : ""} />
          </label>
        </div>
      </div>
    </div>
  `;
}

function bindDossierEvents(track, node) {
  const panel = document.getElementById("node-deep-dossier-panel");
  if (!panel) return;

  const details = getNodeRichDetails(track, node);

  panel.querySelectorAll("[data-pillar-check]").forEach(chk => {
    chk.onchange = () => {
      const key = chk.dataset.pillarCheck;
      TracksState.nodePillars[node.id] = TracksState.nodePillars[node.id] || {};
      TracksState.nodePillars[node.id][key] = chk.checked;
      saveTracksProgress();
      panel.innerHTML = buildNodeDeepDossierHTML(track, node);
      bindDossierEvents(track, node);
    };
  });

  panel.querySelector("#btn-delete-custom-node")?.addEventListener("click", () => {
    const list = TracksState.customNodesByTrack[track.id] || [];
    TracksState.customNodesByTrack[track.id] = list.filter(x => x.id !== node.id);
    TracksState.selectedNodeId = null;
    saveTracksProgress();
    renderCareerTracksEncyclopedia();
    toast("تم حذف المحطة المخصصة من الشبكة", "info");
  });

  panel.querySelector("#btn-ai-explain-node")?.addEventListener("click", async () => {
    if (TracksState.isFullscreenGraph) {
      TracksState.isFullscreenGraph = false;
      renderCareerTracksEncyclopedia();
    }
    const targetBox = document.getElementById("track-ai-answer");
    targetBox?.scrollIntoView({ behavior: "smooth" });
    if (targetBox) targetBox.textContent = `⏳ جاري إعداد شرح جامعي مفصل لدروس (${node.label}) والبدائل التقنية مع الأمثلة...`;
    const prompt = `اشرح لي بالتفصيل الممل كمهندس محترف محطة (${node.label}) في مسار (${track.name}). غطِّ هذه الدروس بالتفصيل والأمثلة: ${details.modules.join(" | ")}. ووضح البدائل التقنية (${details.alternatives}) وكيف أنفذ المشروع العملي: ${details.project}`;
    const reply = await B().askAI?.(prompt);
    if (targetBox) targetBox.textContent = reply;
  });

  panel.querySelector("#btn-ai-interview-node")?.addEventListener("click", async () => {
    if (TracksState.isFullscreenGraph) {
      TracksState.isFullscreenGraph = false;
      renderCareerTracksEncyclopedia();
    }
    const targetBox = document.getElementById("track-ai-answer");
    targetBox?.scrollIntoView({ behavior: "smooth" });
    if (targetBox) targetBox.textContent = `⏳ جاري توليد أهم 7 أسئلة مقابلات شخصية (Interview Questions) مع إجاباتها النموذجية في (${node.label})...`;
    const prompt = `أعطني أهم 7 أسئلة مقابلات عمل تقنية (Technical Interview Questions) مع إجاباتها الهندسية النموذجية في مهارة (${node.label} - ${node.desc}) لمسار (${track.name}).`;
    const reply = await B().askAI?.(prompt);
    if (targetBox) targetBox.textContent = reply;
  });

  panel.querySelector("#btn-proof-to-projects")?.addEventListener("click", async () => {
    await B().createRecord?.("projects", {
      title: `مشروع إثبات إتقان: ${node.label}`,
      description: details.project,
      techStack: track.name,
      progress: 10,
      status: "Active"
    });
    toast(`تمت إضافة المشروع الإثباتي لـ "${node.label}" إلى قسم مشاريعك البرمجية! 💻🚀`);
  });

  panel.querySelector("#btn-node-to-pomo")?.addEventListener("click", () => {
    if (TracksState.isFullscreenGraph) {
      TracksState.isFullscreenGraph = false;
      document.body.classList.remove("tracks-network-fullscreen");
    }
    const pState = B().getPomodoroState?.();
    if (pState) pState.customTaskName = `دراسة وتطبيق: ${node.label}`;
    B().setCustomPomodoroTime?.(50, "work");
    B().openPomodoroModal?.();
  });
}

/* ============================================================================
   7. FULL-WIDTH NETWORK CANVAS ENGINE (WITH CTRL+WHEEL ZOOM & CLEAR BOTTOM LABELS)
   ============================================================================ */
let graphNodesComputed = [];
let activeMouseUpHandler = null;

function startInteractiveNetworkGraph(track) {
  const canvas = document.getElementById("track-network-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 1200;
  const cssH = canvas.clientHeight || 590;
  canvas.width = cssW * dpr;
  canvas.height = cssH * dpr;

  // ترك مسافة سفلية كبيرة (bottomPad = 115px) لضمان عدم اختفاء أو قطع أي كلمة تحت المهام السفلية أبداً!
  const maxTier = Math.max(...track.nodes.map(n => n.tier), 1);
  const maxRow = Math.max(...track.nodes.map(n => n.row), 3);
  const padX = 125;
  const topPad = 62;
  const bottomPad = 115;
  const usableW = Math.max(300, cssW - padX * 2);
  const usableH = Math.max(220, cssH - topPad - bottomPad);

  graphNodesComputed = track.nodes.map(n => {
    const xBase = padX + (n.tier / maxTier) * usableW;
    const yBase = topPad + (n.row / maxRow) * usableH;
    return {
      ...n,
      x: n._customX !== undefined ? n._customX : xBase,
      y: n._customY !== undefined ? n._customY : yBase,
      r: 22
    };
  });

  let draggingNode = null;
  let isPanning = false;
  let startPanX = 0, startPanY = 0;

  const getMouseWorldPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const mx = (rawX - TracksState.panX) / TracksState.zoom;
    const my = (rawY - TracksState.panY) / TracksState.zoom;
    return { mx, my, rawX, rawY };
  };

  canvas.onmousedown = (e) => {
    const { mx, my, rawX, rawY } = getMouseWorldPos(e);
    const hit = graphNodesComputed.find(nd => Math.hypot(nd.x - mx, nd.y - my) <= nd.r + 10);
    if (hit) {
      draggingNode = hit;
      TracksState.selectedNodeId = hit.id;
      const panel = document.getElementById("node-deep-dossier-panel");
      if (panel) {
        panel.innerHTML = buildNodeDeepDossierHTML(track, hit);
        bindDossierEvents(track, hit);
      }
    } else {
      isPanning = true;
      startPanX = rawX - TracksState.panX;
      startPanY = rawY - TracksState.panY;
    }
  };

  canvas.onmousemove = (e) => {
    const { mx, my, rawX, rawY } = getMouseWorldPos(e);
    if (draggingNode) {
      draggingNode.x = mx;
      draggingNode.y = my;
      const orig = track.nodes.find(n => n.id === draggingNode.id);
      if (orig) { orig._customX = mx; orig._customY = my; }
    } else if (isPanning) {
      TracksState.panX = rawX - startPanX;
      TracksState.panY = rawY - startPanY;
    }
  };

  // دعم التكبير والتصغير السلس نحو مؤشر الماوس عند الضغط على CTRL + بكرة الماوس
  canvas.addEventListener("wheel", (e) => {
    if (e.ctrlKey || e.metaKey || TracksState.isFullscreenGraph) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const worldX = (mouseX - TracksState.panX) / TracksState.zoom;
      const worldY = (mouseY - TracksState.panY) / TracksState.zoom;

      const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
      const newZoom = Math.min(2.6, Math.max(0.45, TracksState.zoom * zoomFactor));

      TracksState.panX = mouseX - worldX * newZoom;
      TracksState.panY = mouseY - worldY * newZoom;
      TracksState.zoom = newZoom;
    }
  }, { passive: false });

  if (activeMouseUpHandler) {
    window.removeEventListener("mouseup", activeMouseUpHandler);
  }
  activeMouseUpHandler = () => {
    draggingNode = null;
    isPanning = false;
  };
  window.addEventListener("mouseup", activeMouseUpHandler);

  canvas.ondblclick = (e) => {
    const { mx, my } = getMouseWorldPos(e);
    const hit = graphNodesComputed.find(nd => Math.hypot(nd.x - mx, nd.y - my) <= nd.r + 10);
    if (hit) {
      const currentlyMastered = isNodeMastered(hit.id);
      TracksState.nodePillars[hit.id] = currentlyMastered
        ? { theory: false, lab: false, project: false, interview: false }
        : { theory: true, lab: true, project: true, interview: true };
      saveTracksProgress();
      toast(!currentlyMastered ? `تم إتقان محطة: ${hit.label} (100%) ✅` : `تمت إعادة ضبط المحطة`, "success");
      renderCareerTracksEncyclopedia();
    }
  };

  if (TracksState.animFrame) cancelAnimationFrame(TracksState.animFrame);
  let pulseT = 0;

  function renderNetworkLoop() {
    if (!document.getElementById("track-network-canvas")) return;
    pulseT = (pulseT + 0.007) % 1;
    drawNetworkGraphFrame(ctx, cssW, cssH, dpr, track, pulseT);
    TracksState.animFrame = requestAnimationFrame(renderNetworkLoop);
  }
  renderNetworkLoop();
}

function drawNetworkGraphFrame(ctx, W, H, dpr, track, pulseT) {
  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 44) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 44) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  ctx.translate(TracksState.panX, TracksState.panY);
  ctx.scale(TracksState.zoom, TracksState.zoom);

  const filter = TracksState.activeRoleFilter;
  const isNodeHighlighted = (nd) => filter === "all" || nd.role === filter || nd.role === "foundation";

  // 1. رسم خطوط الشبكة ونبضات البيانات
  track.edges.forEach(([fromId, toId]) => {
    const n1 = graphNodesComputed.find(n => n.id === fromId);
    const n2 = graphNodesComputed.find(n => n.id === toId);
    if (!n1 || !n2) return;

    const activeEdge = isNodeHighlighted(n1) && isNodeHighlighted(n2);
    const bothMastered = isNodeMastered(n1.id) && isNodeMastered(n2.id);

    ctx.strokeStyle = bothMastered
      ? "rgba(16, 185, 129, 0.9)"
      : activeEdge
      ? "rgba(212, 167, 44, 0.6)"
      : "rgba(148, 163, 184, 0.14)";
    ctx.lineWidth = activeEdge ? 2.5 : 1.2;

    ctx.beginPath();
    ctx.moveTo(n1.x, n1.y);
    ctx.lineTo(n2.x, n2.y);
    ctx.stroke();

    if (activeEdge) {
      const px = n1.x + (n2.x - n1.x) * pulseT;
      const py = n1.y + (n2.y - n1.y) * pulseT;
      ctx.fillStyle = bothMastered ? "#10B981" : "#D4A72C";
      ctx.beginPath();
      ctx.arc(px, py, 3.6, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // 2. رسم العقد والكبسولات النصية الواضحة تحت كل عقدة
  graphNodesComputed.forEach(nd => {
    const highlighted = isNodeHighlighted(nd);
    const score = getNodeMasteryScore(nd.id);
    const mastered = score >= 80;
    const inProgress = score > 0 && score < 80;
    const selected = TracksState.selectedNodeId === nd.id;

    ctx.globalAlpha = highlighted ? 1 : 0.22;

    if (selected || mastered || inProgress) {
      ctx.fillStyle = mastered
        ? "rgba(16, 185, 129, 0.24)"
        : selected
        ? "rgba(212, 167, 44, 0.32)"
        : "rgba(245, 158, 11, 0.18)";
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, nd.r + 9, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = mastered ? "#065F46" : selected ? "#D4A72C" : inProgress ? "#3B2F13" : "#111827";
    ctx.strokeStyle = mastered ? "#10B981" : selected ? "#FFFFFF" : track.accent || "#D4A72C";
    ctx.lineWidth = selected ? 3.2 : 2.3;

    ctx.beginPath();
    ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = selected && !mastered ? "#05070e" : "#FFFFFF";
    ctx.font = "bold 11.5px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(mastered ? "✓" : score > 0 ? `${score}%` : `M${nd.tier + 1}`, nd.x, nd.y);

    // كبسولة اسم المحطة + وصف مختصر واضح تحتها بدون أي قص
    ctx.font = "bold 12px Alexandria, Cairo, sans-serif";
    const labelW = ctx.measureText(nd.label).width + 18;
    const boxY = nd.y + nd.r + 6;

    ctx.fillStyle = selected ? "rgba(212, 167, 44, 0.95)" : "rgba(9, 13, 25, 0.94)";
    ctx.fillRect(nd.x - labelW / 2, boxY, labelW, 24);
    ctx.strokeStyle = mastered ? "#10B981" : selected ? "#FFFFFF" : "rgba(212, 167, 44, 0.45)";
    ctx.lineWidth = 1.2;
    ctx.strokeRect(nd.x - labelW / 2, boxY, labelW, 24);

    ctx.fillStyle = selected ? "#05070e" : mastered ? "#6EE7B7" : "#F8FAFC";
    ctx.fillText(nd.label, nd.x, boxY + 12.5);
  });

  ctx.globalAlpha = 1;
  ctx.restore();
}

/* ============================================================================
   8. CUSTOM USER PLAN & CUSTOM NODE MODALS + EVENT BINDINGS
   ============================================================================ */
function openAddCustomNodeModal(track) {
  const existingOpts = track.nodes.map(n => `<option value="${esc(n.id)}">${esc(n.label)}</option>`).join("");
  B().openFormModal(`➕ إضافة محطة أو تقنية خاصة في شبكة (${track.name})`, `
    <div class="form-group">
      <label>اسم المهارة أو التقنية (مثال: PHP & Laravel 11 / Vue.js / GraphQL)</label>
      <input name="label" required placeholder="مثال: PHP & Laravel Mastery" autofocus />
    </div>
    <div class="form-group">
      <label>وصف مختصر للمحطة</label>
      <input name="desc" required placeholder="بناء الخوادم ولوحات التحكم بـ Laravel & Filament" />
    </div>
    <div class="form-group">
      <label>ربط هذه المحطة بعد أي محطة في الشبكة؟</label>
      <select name="connectFrom">${existingOpts}</select>
    </div>
    <div class="form-group">
      <label>المستوى في الشبكة (من 1 إلى 5)</label>
      <select name="tier">
        <option value="1">المستوى 2</option>
        <option value="2" selected>المستوى 3</option>
        <option value="3">المستوى 4</option>
        <option value="4">المستوى 5 (الاحتراف)</option>
      </select>
    </div>
    <div class="form-group">
      <label>الدروس التي ستدرسها داخلها (افصل بينها بفاصلة)</label>
      <input name="modules" placeholder="أساسيات اللغة, بناء الـ CRUD, التوثيق, المشروع العملي" />
    </div>
    <div class="form-group">
      <label>المشروع الذي ستبنيه لإثبات إتقانها</label>
      <input name="project" placeholder="بناء منصة كاملة بهذه التقنية ورفعها على GitHub" />
    </div>
  `, async (d) => {
    const newId = "cust_node_" + Date.now();
    const modulesList = (d.modules || "").split(",").map(s => s.trim()).filter(Boolean);
    const newNode = {
      id: newId,
      label: d.label,
      desc: d.desc,
      tier: Number(d.tier) || 2,
      row: Math.round((Math.random() * 2.6 + 0.2) * 10) / 10,
      role: "all",
      connectFrom: d.connectFrom,
      isCustomNode: true,
      customSyllabus: {
        phase: "محطة مخصصة في خطتك الشخصية ⭐",
        hours: "40 ساعة تدريبية",
        alternatives: "محطة مضافة بواسطة المستخدم ضمن خطته الخاصة",
        modules: modulesList.length ? modulesList : [`إتقان أساسيات ومفاهيم ${d.label}`, `التطبيق العملي وبناء مشروع بـ ${d.label}`],
        criteria: `القدرة على بناء تطبيق كامل باستخدام ${d.label} بمفردك.`,
        project: d.project || `بناء مشروع عملي متكامل باستخدام ${d.label}.`
      }
    };
    TracksState.customNodesByTrack[track.id] = TracksState.customNodesByTrack[track.id] || [];
    TracksState.customNodesByTrack[track.id].push(newNode);
    TracksState.selectedNodeId = newId;
    saveTracksProgress();
    renderCareerTracksEncyclopedia();
    toast(`تمت إضافة "${d.label}" إلى الخريطة الشبكية بنجاح! 🌐✨`);
  });
}

function openCustomPlanBuilderModal(track) {
  B().openFormModal(`✍️ إضافة خطوة في خطتك الخاصة لمسار (${track.name})`, `
    <div class="form-group">
      <label>عنوان الخطوة أو المرحلة التي ستمشي عليها</label>
      <input name="title" required placeholder="مثال: الشهر الأول — إتقان PHP 8 و MySQL وبناء 3 مشاريع" autofocus />
    </div>
    <div class="form-group">
      <label>المدة الزمنية المحددة لنفسك</label>
      <input name="duration" value="3 أسابيع" required placeholder="مثال: أسبوعان / شهر واحد..." />
    </div>
    <div class="form-group">
      <label>تفاصيل الخطة والمصادر التي ستعتمد عليها</label>
      <textarea name="notes" rows="3" placeholder="مثال: متابعة كورس الزيرو + تطبيق مشروع متجر إلكتروني..."></textarea>
    </div>
  `, async (d) => {
    TracksState.userCustomPlans[track.id] = TracksState.userCustomPlans[track.id] || [];
    TracksState.userCustomPlans[track.id].push({
      title: d.title,
      duration: d.duration,
      notes: d.notes,
      done: false
    });
    saveTracksProgress();
    renderCareerTracksEncyclopedia();
    toast("تم حفظ الخطوة في خطتك الشخصية للمسار! ✍️🎯");
  });
}

function bindCareerTracksEvents(track) {
  const sec = document.getElementById("view-career-tracks");
  if (!sec) return;

  sec.querySelectorAll("[data-select-track]").forEach(btn => {
    btn.onclick = () => {
      TracksState.activeTrackId = btn.dataset.selectTrack;
      TracksState.activeRoleFilter = "all";
      TracksState.selectedNodeId = null;
      TracksState.zoom = 1;
      TracksState.panX = 0;
      TracksState.panY = 0;
      localStorage.setItem("MY_LIFE_OS_ACTIVE_TRACK_V3", TracksState.activeTrackId);
      renderCareerTracksEncyclopedia();
    };
  });

  sec.querySelectorAll("[data-role-filter]").forEach(btn => {
    btn.onclick = () => {
      TracksState.activeRoleFilter = btn.dataset.roleFilter;
      renderCareerTracksEncyclopedia();
    };
  });

  sec.querySelectorAll("[data-focus-role-graph]").forEach(btn => {
    btn.onclick = () => {
      TracksState.activeRoleFilter = btn.dataset.focusRoleGraph;
      renderCareerTracksEncyclopedia();
      document.getElementById("network-graph-container")?.scrollIntoView({ behavior: "smooth" });
    };
  });

  document.getElementById("btn-net-zoom-in")?.addEventListener("click", () => {
    TracksState.zoom = Math.min(2.6, TracksState.zoom + 0.18);
  });
  document.getElementById("btn-net-zoom-out")?.addEventListener("click", () => {
    TracksState.zoom = Math.max(0.45, TracksState.zoom - 0.18);
  });
  document.getElementById("btn-net-reset")?.addEventListener("click", () => {
    TracksState.zoom = 1;
    TracksState.panX = 0;
    TracksState.panY = 0;
    track.nodes.forEach(n => { delete n._customX; delete n._customY; });
    startInteractiveNetworkGraph(track);
  });
  document.getElementById("btn-net-fullscreen")?.addEventListener("click", () => {
    TracksState.isFullscreenGraph = !TracksState.isFullscreenGraph;
    renderCareerTracksEncyclopedia();
  });

  // أزرار بناء الخطة الشخصية وإضافة عقد للشبكة
  document.getElementById("btn-add-custom-node")?.addEventListener("click", () => openAddCustomNodeModal(track));
  document.getElementById("btn-open-custom-plan")?.addEventListener("click", () => openCustomPlanBuilderModal(track));
  document.getElementById("btn-open-custom-plan-2")?.addEventListener("click", () => openCustomPlanBuilderModal(track));

  sec.querySelectorAll("[data-toggle-plan-step]").forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.togglePlanStep);
      const list = TracksState.userCustomPlans[track.id] || [];
      if (list[idx]) list[idx].done = !list[idx].done;
      saveTracksProgress();
      renderCareerTracksEncyclopedia();
    };
  });

  sec.querySelectorAll("[data-del-plan-step]").forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.delPlanStep);
      const list = TracksState.userCustomPlans[track.id] || [];
      list.splice(idx, 1);
      saveTracksProgress();
      renderCareerTracksEncyclopedia();
    };
  });

  sec.querySelectorAll("[data-plan-step-to-task]").forEach(btn => {
    btn.onclick = async () => {
      const idx = Number(btn.dataset.planStepToTask);
      const st = (TracksState.userCustomPlans[track.id] || [])[idx];
      if (!st) return;
      await B().createRecord?.("tasks", {
        title: `خطتي الخاصة: ${st.title}`,
        description: `${st.duration} — ${st.notes || ""}`,
        dueDate: today(),
        priority: "High",
        status: "Pending",
        category: track.name
      });
      toast("تمت إضافة الخطوة إلى جدول مهامك بنجاح! ✅");
    };
  });

  // اعتماد أي مسار بديل (مثل PHP & Laravel) مباشرة في خطة المستخدم الخاصة
  sec.querySelectorAll("[data-adopt-alt-path]").forEach(btn => {
    btn.onclick = () => {
      const ap = (track.alternativePaths || [])[Number(btn.dataset.adoptAltPath)];
      if (!ap) return;
      TracksState.userCustomPlans[track.id] = TracksState.userCustomPlans[track.id] || [];
      ap.stack.forEach((stepName, i) => {
        TracksState.userCustomPlans[track.id].push({
          title: `${i + 1}. إتقان: ${stepName}`,
          duration: "أسبوعان",
          notes: `ضمن ${ap.title} — المصادر: ${ap.yt}`,
          done: false
        });
      });
      saveTracksProgress();
      renderCareerTracksEncyclopedia();
      toast(`تم اعتماد "${ap.title}" وتوليد خطواته في خطتك الشخصية! 🚀`);
    };
  });

  sec.querySelectorAll("[data-toggle-found]").forEach(btn => {
    btn.onclick = () => {
      const fId = btn.dataset.toggleFound;
      TracksState.masteredFoundations[fId] = !TracksState.masteredFoundations[fId];
      saveTracksProgress();
      renderCareerTracksEncyclopedia();
    };
  });

  sec.querySelectorAll("[data-role-to-tasks]").forEach(btn => {
    btn.onclick = async () => {
      const role = track.roles.find(r => r.id === btn.dataset.roleToTasks);
      if (!role) return;
      await B().createRecord?.("tasks", {
        title: `خطة تخصص: ${role.title}`,
        description: `المهارات: ${role.skills.join("، ")} | الشهادات: ${role.certs.join(" ➔ ")}`,
        dueDate: today(),
        priority: "Urgent",
        status: "Pending",
        category: "مسار وظيفي"
      });
      toast(`تم إدراج خطة "${role.title}" في مهامك بنجاح! 🎯`);
    };
  });

  document.getElementById("btn-track-to-goals")?.addEventListener("click", async () => {
    await B().createRecord?.("tasks", {
      title: `إتقان مسار: ${track.name}`,
      description: track.foundations.map(f => f.title).join(" | "),
      dueDate: today(),
      priority: "Urgent",
      status: "Pending",
      category: "مسارات البرمجة"
    });
    toast(`تم اعتماد مسار "${track.name}" وإضافته لمهامك بنجاح! 🚀`);
  });

  document.getElementById("btn-ask-track-ai")?.addEventListener("click", async () => {
    const inp = document.getElementById("track-ai-question");
    const out = document.getElementById("track-ai-answer");
    const q = inp?.value.trim() || `اشرح لي خطة عملية لدراسة ${track.name} مع المقارنة بين المسارات البديلة والمشاريع المطلوبة`;
    if (out) out.textContent = "⏳ جاري إعداد الشرح الموسوعي والخطة الهندسية بواسطة البروفيسور الذكي...";
    const reply = await B().askAI?.(`أنت بروفيسور جامعي ومعماري برمجيات في مجال (${track.name}). أجب على طلب الطالب التالي بتفصيل ممل وخطوات عملية ومقارنة تقنية واضحة: "${q}"`);
    if (out) out.textContent = reply;
  });
}

function initCareerTracksSystem() {
  injectTracksTabIntoSidebar();

  document.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-view="career-tracks"], [data-goto="career-tracks"], #nav-btn-career-tracks');
    if (btn) {
      if (B().switchView) B().switchView("career-tracks");
      setTimeout(renderCareerTracksEncyclopedia, 40);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && TracksState.isFullscreenGraph) {
      TracksState.isFullscreenGraph = false;
      renderCareerTracksEncyclopedia();
    }
  });

  window.addEventListener("resize", () => {
    if (document.getElementById("view-career-tracks")?.classList.contains("active")) {
      startInteractiveNetworkGraph(getActiveTrack());
    }
  });

  renderCareerTracksEncyclopedia();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCareerTracksSystem);
} else {
  initCareerTracksSystem();
}

window.renderCareerTracksEncyclopedia = renderCareerTracksEncyclopedia;
