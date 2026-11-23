/**
 * MY LIFE OS — CYBERSECURITY UNIVERSITY ENGINE (UI + Mastery + Branching Map + ALEX)
 * Integrates seamlessly with window.MyLifeOSBridge and MY LIFE OS Dark/Gold/Cyan UI.
 */

import {
  UNIVERSITY_META,
  MASTERY_STATES,
  DEFAULT_EVAL_WEIGHTS,
  FOUNDATION_MODULES
} from "./data-foundations.js";
import { STAGE_TEMPLATES, SPECIALIZATION_ACADEMIES } from "./data-academies.js";
import {
  CAREER_PATHS,
  CERTIFICATIONS_DB,
  PRACTICAL_LABS_ECOSYSTEM,
  LEGAL_PLATFORMS
} from "./data-careers-certs.js";

const STORE_KEY = "MY_LIFE_OS_CYBER_UNI_V2";

function B() {
  return window.MyLifeOSBridge || {};
}

function esc(str) {
  if (B().escapeHTML) return B().escapeHTML(str);
  return String(str ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function toast(msg, type = "info") {
  if (B().showToast) B().showToast(msg, type);
}

/* ============================================================================
   1. PERSISTENT STATE & SKILL MASTERY ENGINE
   ============================================================================ */
function loadUniState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    activeTab: "dashboard", // dashboard | map | foundations | academies | labs | certs | careers | portfolio | analytics
    selectedCareerId: "CAR_SOC1",
    selectedAcademyId: "ACAD_02",
    placementBypassIds: [],
    progress: {}, // { [nodeId]: { theory:0..100, practical:0..100, labs:0..100, projects:0..100, reporting:0..100, state, lastStudied, stage } }
    portfolio: [],
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split("T")[0],
    mapState: { zoom: 0.92, panX: 20, panY: 15, filterLevel: "all", filterSpec: "all", search: "" }
  };
}

const UniState = loadUniState();

function saveUniState() {
  const today = new Date().toISOString().split("T")[0];
  if (UniState.lastActiveDate !== today) {
    UniState.streakDays = (UniState.streakDays || 0) + 1;
    UniState.lastActiveDate = today;
  }
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(UniState));
  } catch (e) {}
}

export function getAllUniversityNodes() {
  return [...FOUNDATION_MODULES, ...SPECIALIZATION_ACADEMIES];
}

export function getNodeProgress(nodeId) {
  return UniState.progress[nodeId] || {
    theory: 0,
    practical: 0,
    labs: 0,
    projects: 0,
    reporting: 0,
    state: MASTERY_STATES.NOT_STARTED,
    stage: "S1",
    lastStudied: ""
  };
}

export function computeWeightedScore(node, p) {
  const w = node.evalWeights || DEFAULT_EVAL_WEIGHTS;
  const totalW = (w.theory + w.practical + w.labs + w.projects + w.reporting) || 100;
  const weighted = (
    (Number(p.theory) || 0) * w.theory +
    (Number(p.practical) || 0) * w.practical +
    (Number(p.labs) || 0) * w.labs +
    (Number(p.projects) || 0) * w.projects +
    (Number(p.reporting) || 0) * w.reporting
  ) / totalW;
  return Math.round(weighted);
}

export function deriveMasteryState(node, p) {
  const score = computeWeightedScore(node, p);
  const allZero = !p.theory && !p.practical && !p.labs && !p.projects && !p.reporting;
  if (allZero) return MASTERY_STATES.NOT_STARTED;
  // لا تمنح Mastered إلا بعد تحقيق 80%+ مع نجاح فعلي في المختبر والمشروع
  if (score >= 80 && Number(p.labs) >= 75 && Number(p.projects) >= 75) {
    return MASTERY_STATES.MASTERED;
  }
  if (score >= 65) return MASTERY_STATES.ASSESSMENT_PENDING;
  if (Number(p.practical) > 0 || Number(p.labs) > 0) return MASTERY_STATES.PRACTICING;
  return MASTERY_STATES.LEARNING;
}

export function isNodeUnlocked(node) {
  if (!node.prerequisites || !node.prerequisites.length) return true;
  if ((UniState.placementBypassIds || []).includes(node.id)) return true;
  return node.prerequisites.every(preId => {
    const preNode = getAllUniversityNodes().find(n => n.id === preId);
    if (!preNode) return true;
    const p = getNodeProgress(preId);
    return deriveMasteryState(preNode, p) === MASTERY_STATES.MASTERED || (UniState.placementBypassIds || []).includes(preId);
  });
}

export function getOverallAnalytics() {
  const nodes = getAllUniversityNodes();
  let totalScore = 0;
  let masteredCount = 0;
  const weakAreas = [];
  const recommendedNext = [];

  nodes.forEach(n => {
    const p = getNodeProgress(n.id);
    const sc = computeWeightedScore(n, p);
    const st = deriveMasteryState(n, p);
    totalScore += sc;
    if (st === MASTERY_STATES.MASTERED) masteredCount++;
    else {
      if (sc > 0 && sc < 65) weakAreas.push({ node: n, score: sc });
      if (isNodeUnlocked(n)) recommendedNext.push({ node: n, score: sc });
    }
  });

  return {
    overallMastery: Math.round(totalScore / Math.max(1, nodes.length)),
    masteredCount,
    totalNodes: nodes.length,
    weakAreas: weakAreas.slice(0, 4),
    recommendedNext: recommendedNext.slice(0, 4)
  };
}

/* ============================================================================
   2. SCOPED STYLES MATCHING MY LIFE OS (DARK + GOLD + CYAN + RTL)
   ============================================================================ */
function injectCyberUniStyles() {
  if (document.getElementById("cyber-uni-v2-styles")) return;
  const st = document.createElement("style");
  st.id = "cyber-uni-v2-styles";
  st.textContent = `
    .cu-hero {
      background: linear-gradient(135deg, rgba(9,13,25,0.96), rgba(6,182,212,0.12), rgba(212,167,44,0.14));
      border: 1px solid rgba(212,167,44,0.42);
      border-radius: 20px;
      padding: 22px 24px;
      margin-bottom: 18px;
      box-shadow: 0 18px 45px rgba(0,0,0,0.65);
    }
    .cu-tabs-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-bottom: 18px;
      background: rgba(15,20,34,0.85);
      border: 1px solid rgba(255,255,255,0.08);
      padding: 8px;
      border-radius: 14px;
    }
    .cu-tab-btn {
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-secondary);
      padding: 7px 13px;
      border-radius: 10px;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .cu-tab-btn:hover { color: #fff; background: rgba(255,255,255,0.05); }
    .cu-tab-btn.active {
      background: linear-gradient(135deg, rgba(212,167,44,0.22), rgba(6,182,212,0.18));
      border-color: var(--gold-primary);
      color: var(--gold-primary);
    }
    .cu-map-viewport {
      position: relative;
      width: 100%;
      height: 580px;
      background: radial-gradient(circle at center, #0e1628 0%, #060912 100%);
      border: 1.5px solid rgba(6,182,212,0.35);
      border-radius: 18px;
      overflow: hidden;
      cursor: grab;
      user-select: none;
    }
    .cu-map-viewport.cu-map-full {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 999990 !important;
      border-radius: 0 !important;
    }
    .cu-map-stage {
      position: absolute;
      top: 0;
      left: 0;
      width: 1850px;
      height: 860px;
      transform-origin: 0 0;
    }
    .cu-map-node {
      position: absolute;
      width: 210px;
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(14,20,36,0.95);
      border: 2px solid var(--node-color, #06b6d4);
      color: #f8fafc;
      cursor: pointer;
      box-shadow: 0 10px 26px rgba(0,0,0,0.65);
      transition: transform 0.18s ease, box-shadow 0.18s ease;
      text-align: right;
    }
    .cu-map-node:hover {
      transform: translateY(-3px) scale(1.03);
      box-shadow: 0 0 24px var(--node-color, #06b6d4);
      z-index: 5;
    }
    .cu-map-node.locked {
      opacity: 0.58;
      border-style: dashed;
    }
    .cu-map-node.mastered {
      box-shadow: 0 0 20px rgba(16,185,129,0.45);
      border-color: #10b981;
    }
    .cu-zone-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      padding: 3px 9px;
      border-radius: 99px;
      background: rgba(255,255,255,0.06);
    }
    .cu-legal-strip {
      background: rgba(245,158,11,0.1);
      border: 1px solid rgba(245,158,11,0.4);
      color: #fde68a;
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 0.82rem;
      margin-bottom: 14px;
    }
    .cu-code-box {
      background: #050811;
      border: 1px solid rgba(6,182,212,0.3);
      border-radius: 10px;
      padding: 10px 12px;
      font-family: monospace;
      font-size: 0.82rem;
      color: #67e8f9;
      direction: ltr;
      text-align: left;
      overflow-x: auto;
      white-space: pre-wrap;
    }
  `;
  document.head.appendChild(st);
}

/* ============================================================================
   3. CONTEXT-AWARE ALEX CYBER TUTOR (LINKED TO REAL PROGRESS)
   ============================================================================ */
async function askAlexCyberTutor(customQuestion = "") {
  const analytics = getOverallAnalytics();
  const career = CAREER_PATHS.find(c => c.id === UniState.selectedCareerId) || CAREER_PATHS[0];
  const masteredTitles = getAllUniversityNodes()
    .filter(n => deriveMasteryState(n, getNodeProgress(n.id)) === MASTERY_STATES.MASTERED)
    .map(n => n.title);
  const weakTitles = analytics.weakAreas.map(w => `${w.node.title} (${w.score}%)`);

  const q = customQuestion || prompt("🤖 اسأل ALEX Cyber Tutor (شرح درس، خطة دراسة، مراجعة تقرير، أو اختبار سريع):", "اقترح لي خطة مذاكرة هذا الأسبوع بناءً على مستواي الحالي");
  if (!q) return;

  const promptPayload = `أنت ALEX، المساعد الأكاديمي في CYBERSECURITY UNIVERSITY داخل MY LIFE OS.
التزم بالقواعد: لا تخترع شهادات أو روابط أو أسعار غير موثقة، وفرّق بدقة بين التخصصات.
حالة الطالب الفعلية الآن:
- الهدف المهني المختار: ${career.title}
- نسبة الإتقان الكلية: ${analytics.overallMastery}% (${analytics.masteredCount}/${analytics.totalNodes} وحدة متقنة)
- الوحدات المتقنة: ${masteredTitles.join(", ") || "لا يوجد بعد (بداية من Level 0)"}
- نقاط الضعف الحالية: ${weakTitles.join(", ") || "لم تُسجل بعد"}
- التوصية التالية: ${analytics.recommendedNext.map(r => r.node.title).join(", ")}

سؤال الطالب: ${q}`;

  B().openFormModal("🤖 ALEX — Cyber University AI Tutor", `
    <div class="subject-progress-box">
      <strong class="gold-text">📌 سؤالك:</strong>
      <p class="mt-1">${esc(q)}</p>
    </div>
    <div id="cu-alex-reply-box" class="subject-progress-box mt-2" style="white-space:pre-line; max-height:360px; overflow-y:auto;">
      ⏳ ALEX يحلل مستواك الحالي ونقاط ضعفك ويجهز الإجابة الأكاديمية...
    </div>
  `, async () => {});

  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  const reply = await B().askAI?.(promptPayload) || "تأكد من الاتصال بالإنترنت أو إعداد مفتاح الذكاء الاصطناعي.";
  const box = document.getElementById("cu-alex-reply-box");
  if (box) box.textContent = reply;
}

/* ============================================================================
   4. NODE DOSSIER, 19-PART LESSON VIEWER, PLACEMENT TEST & MASTERY EVALUATOR
   ============================================================================ */
function openNodeDossierModal(nodeId, rootContainer) {
  const node = getAllUniversityNodes().find(n => n.id === nodeId);
  if (!node) return;

  const unlocked = isNodeUnlocked(node);
  const p = getNodeProgress(node.id);
  const score = computeWeightedScore(node, p);
  const state = deriveMasteryState(node, p);
  const w = node.evalWeights || DEFAULT_EVAL_WEIGHTS;

  if (!unlocked) {
    const missingNames = (node.prerequisites || [])
      .filter(pid => {
        const pn = getAllUniversityNodes().find(x => x.id === pid);
        return pn && deriveMasteryState(pn, getNodeProgress(pid)) !== MASTERY_STATES.MASTERED && !(UniState.placementBypassIds || []).includes(pid);
      })
      .map(pid => getAllUniversityNodes().find(x => x.id === pid)?.title || pid);

    B().openFormModal(`🔒 وحدة مقفلة بالمتطلبات السابقة: ${node.title}`, `
      <div class="cu-legal-strip">
        <strong>متطلبات سابقة مطلوبة قبل فتح هذه المرحلة:</strong>
        <ul style="margin:8px 18px 0;">${missingNames.map(m => `<li>${esc(m)}</li>`).join("")}</ul>
      </div>
      <p class="small-muted">نظام الجامعة لا يسمح بالقفز فوق الأساسيات إلا إذا كنت تمتلك خبرة مسبقة واجتزت <strong>اختبار تحديد المستوى (Placement Test)</strong>.</p>
      <div class="filters-row mt-4">
        <button type="button" id="btn-cu-placement-test" class="btn btn-gold btn-sm">
          <i class="fa-solid fa-graduation-cap"></i> خوض اختبار تحديد المستوى لفتح الوحدة
        </button>
      </div>
    `, async () => {});
    const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
    if (saveBtn) saveBtn.style.display = "none";

    document.getElementById("btn-cu-placement-test").onclick = () => {
      const ans = prompt(
        `📝 اختبار تحديد المستوى السريع لفتح (${node.title}):\n\nالسؤال: اشرح في جملة واضحة لماذا ندرس (${node.title}) وما علاقته بالمتطلبات السابقة (${missingNames[0] || "الأساسيات"})؟`
      );
      if (ans && ans.trim().length >= 20) {
        UniState.placementBypassIds = Array.from(new Set([...(UniState.placementBypassIds || []), node.id]));
        saveUniState();
        toast("✅ اجتزت اختبار تحديد المستوى! تم فتح الوحدة.", "success");
        openNodeDossierModal(node.id, rootContainer);
        mountCybersecurityUniversity(rootContainer);
      } else if (ans !== null) {
        toast("❌ الإجابة مختصرة جداً — يرجى إكمال المتطلبات الأساسية أولاً.", "error");
      }
    };
    return;
  }

  const topicsListHtml = (node.topics || []).map(t => `<li>${esc(t)}</li>`).join("");
  const tracksListHtml = (node.tracks || []).map(tr => `
    <div class="subject-progress-box mb-2">
      <strong class="gold-text">${esc(tr.name)}</strong>
      <div class="filters-row mt-1">
        ${tr.topics.map(tp => `<span class="badge badge-gold">${esc(tp)}</span>`).join("")}
      </div>
    </div>
  `).join("");

  const lessonsHtml = (node.lessons || []).length
    ? node.lessons.map((ls, idx) => `
        <div class="prayer-row">
          <div>
            <strong>📘 ${esc(ls.titleAr)}</strong>
            <small class="small-muted d-block" dir="ltr">${esc(ls.titleEn)}</small>
          </div>
          <button type="button" class="btn btn-xs btn-gold" data-open-lesson-idx="${idx}">فتح الدرس (19 عنصراً)</button>
        </div>
      `).join("")
    : `<p class="small-muted">الموضوعات الفرعية مفصّلة وجاهزة للتوسيع في الدفعة القادمة — ويمكنك استدعاء ALEX الآن لتوليد شرح تفصيلي واختبار لأي موضوع منها.</p>`;

  B().openFormModal(`🎓 ${node.title} — ${node.titleAr || ""}`, `
    <div class="flex-between mb-2" style="flex-wrap:wrap; gap:8px;">
      <span class="badge badge-gold">${esc(node.zone)}</span>
      <span class="badge ${state === MASTERY_STATES.MASTERED ? "badge-emerald" : "badge-warning"}">${esc(state)} • ${score}%</span>
      <button type="button" id="btn-dossier-ask-alex" class="btn btn-xs btn-outline">
        <i class="fa-solid fa-robot gold-text"></i> اسأل ALEX عن هذه الوحدة
      </button>
    </div>

    <p class="small-muted mb-2">${esc(node.description || node.overview || "")}</p>

    ${node.category === "Offensive" ? `<div class="cu-legal-strip">⚖️ <strong>سياسة المختبرات القانونية:</strong> ${esc(UNIVERSITY_META.legalPolicy)}</div>` : ""}

    ${node.tracks ? `
      <h4 class="gold-text mt-2">📚 التخصصات الفرعية داخل الأكاديمية (${node.tracks.length} مساراً):</h4>
      <div style="max-height:220px; overflow-y:auto;" class="mt-1">${tracksListHtml}</div>
      <h4 class="gold-text mt-2">🏆 المراحل الأربعة للاحتراف داخل الأكاديمية:</h4>
      <div class="dashboard-grid mt-1" style="grid-template-columns:repeat(2,1fr); gap:8px;">
        ${STAGE_TEMPLATES.map(st => `
          <div class="subject-progress-box">
            <strong class="gold-text">${esc(st.code)}</strong>
            <small class="small-muted d-block mt-1">${esc(st.focus)}</small>
          </div>
        `).join("")}
      </div>
    ` : `
      <h4 class="gold-text mt-2">📋 الموضوعات التفصيلية:</h4>
      <ul style="margin:6px 20px 10px; font-size:0.86rem;">${topicsListHtml}</ul>
      <h4 class="gold-text mt-2">📖 الدروس التفاعلية الكاملة:</h4>
      <div class="mt-1">${lessonsHtml}</div>
    `}

    <!-- محرك التقييم الحقيقي ذو الأوزان الـ 5 (Skill Mastery Evaluator) -->
    <div class="subject-progress-box mt-4" style="border:1.5px solid var(--gold-primary);">
      <strong class="gold-text d-block mb-2">📊 تقييم الإتقان الحقيقي (لا يُمنح Mastered إلا بـ 80%+ مع إتمام المختبر والمشروع)</strong>
      <div class="dashboard-grid" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:8px;">
        <div class="form-group"><label>النظري (${w.theory}%)</label><input type="number" min="0" max="100" id="ev-theory" value="${p.theory}" /></div>
        <div class="form-group"><label>التمارين (${w.practical}%)</label><input type="number" min="0" max="100" id="ev-practical" value="${p.practical}" /></div>
        <div class="form-group"><label>المختبرات (${w.labs}%)</label><input type="number" min="0" max="100" id="ev-labs" value="${p.labs}" /></div>
        <div class="form-group"><label>المشاريع (${w.projects}%)</label><input type="number" min="0" max="100" id="ev-projects" value="${p.projects}" /></div>
        <div class="form-group"><label>التقارير (${w.reporting}%)</label><input type="number" min="0" max="100" id="ev-reporting" value="${p.reporting}" /></div>
      </div>
      <button type="button" id="btn-save-node-eval" class="btn btn-gold btn-sm btn-block">
        <i class="fa-solid fa-check-double"></i> حفظ التقييم وتحديث حالة الإتقان
      </button>
    </div>
  `, async () => {});

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  document.getElementById("btn-dossier-ask-alex").onclick = () => {
    askAlexCyberTutor(`اشرح لي أهم مفاهيم (${node.title}) وأنشئ لي 3 أسئلة عملية لاختبار فهمي فيها.`);
  };

  document.querySelectorAll("[data-open-lesson-idx]").forEach(btn => {
    btn.onclick = () => {
      const ls = node.lessons[Number(btn.dataset.openLessonIdx)];
      if (ls) openFull19PartLessonModal(node, ls, rootContainer);
    };
  });

  document.getElementById("btn-save-node-eval").onclick = () => {
    const nextP = {
      theory: Math.min(100, Math.max(0, Number(document.getElementById("ev-theory").value) || 0)),
      practical: Math.min(100, Math.max(0, Number(document.getElementById("ev-practical").value) || 0)),
      labs: Math.min(100, Math.max(0, Number(document.getElementById("ev-labs").value) || 0)),
      projects: Math.min(100, Math.max(0, Number(document.getElementById("ev-projects").value) || 0)),
      reporting: Math.min(100, Math.max(0, Number(document.getElementById("ev-reporting").value) || 0)),
      lastStudied: new Date().toISOString().split("T")[0]
    };
    nextP.state = deriveMasteryState(node, nextP);
    UniState.progress[node.id] = nextP;
    saveUniState();
    toast(`تم تحديث تقييم "${node.title}" ➔ الحالة: ${nextP.state} (${computeWeightedScore(node, nextP)}%)`, "success");
    document.getElementById("universal-modal")?.classList.add("hidden");
    mountCybersecurityUniversity(rootContainer);
  };
}

function openFull19PartLessonModal(node, lesson, rootContainer) {
  const cmdsHtml = (lesson.commands || []).map(c => `
    <div class="mb-2">
      <div class="cu-code-box">${esc(c.cmd)}</div>
      <small class="small-muted">↳ ${esc(c.explain)}</small>
    </div>
  `).join("");

  const quizHtml = (lesson.quiz || []).map((q, qi) => `
    <div class="subject-progress-box mb-2">
      <strong>س${qi + 1}: ${esc(q.q)}</strong>
      <div class="filters-row mt-1">
        ${q.options.map((op, oi) => `<button type="button" class="btn btn-xs btn-outline" data-qz="${qi}" data-opt="${oi}">${esc(op)}</button>`).join("")}
      </div>
      <small id="qz-fb-${qi}" class="d-block mt-1"></small>
    </div>
  `).join("");

  B().openFormModal(`📘 ${lesson.titleAr} | ${lesson.titleEn}`, `
    <div style="max-height:68vh; overflow-y:auto; padding-inline-end:6px;">
      <p><strong>الوصف:</strong> ${esc(lesson.description)}</p>
      <div class="subject-progress-box mt-2"><strong class="gold-text">🎯 لماذا ندرس هذا الموضوع؟</strong><p class="mt-1">${esc(lesson.whyStudy)}</p></div>
      <div class="subject-progress-box mt-2"><strong class="gold-text">📌 الأهداف التعليمية:</strong><ul>${lesson.objectives.map(o => `<li>${esc(o)}</li>`).join("")}</ul></div>
      <div class="subject-progress-box mt-2"><strong class="gold-text">📖 الشرح النظري التفصيلي:</strong><p class="mt-1">${esc(lesson.theory)}</p></div>
      ${lesson.diagramAscii ? `<div class="cu-code-box mt-2">${esc(lesson.diagramAscii)}</div>` : ""}
      <div class="subject-progress-box mt-2"><strong class="gold-text">🌍 أمثلة واقعية:</strong><ul>${lesson.realWorldExamples.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="subject-progress-box mt-2"><strong class="gold-text">💻 الأوامر العملية وشرحها:</strong>${cmdsHtml || "<small>لا توجد أوامر في هذا الدرس</small>"}</div>
      <div class="subject-progress-box mt-2"><strong class="gold-text">⚠️ الأخطاء الشائعة:</strong><ul>${lesson.commonMistakes.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="subject-progress-box mt-2"><strong class="gold-text">🧪 المختبر والواجب:</strong>
        <p>${lesson.lab ? `<strong>${esc(lesson.lab.title)}</strong> (${esc(lesson.lab.environment)})` : ""}</p>
        <p class="small-muted mt-1"><strong>الواجب:</strong> ${esc(lesson.homework)}</p>
      </div>
      <div class="mt-2"><strong class="gold-text d-block mb-1">✅ اختبار الفهم (Quiz):</strong>${quizHtml}</div>
      <div class="subject-progress-box mt-2"><strong class="gold-text">📝 الملخص ومعايير الإتقان:</strong><p>${esc(lesson.summary)}</p></div>
    </div>
  `, async () => {});

  document.querySelector("#universal-modal .modal-card")?.classList.add("wide-lab-modal");
  const saveBtn = document.querySelector('#universal-modal-form button[type="submit"]');
  if (saveBtn) saveBtn.style.display = "none";

  document.querySelectorAll("[data-qz]").forEach(btn => {
    btn.onclick = () => {
      const qi = Number(btn.dataset.qz);
      const oi = Number(btn.dataset.opt);
      const item = lesson.quiz[qi];
      const fb = document.getElementById(`qz-fb-${qi}`);
      if (!item || !fb) return;
      const ok = oi === item.answerIdx;
      fb.style.color = ok ? "#10b981" : "#ef4444";
      fb.textContent = ok ? `✅ إجابة صحيحة! ${item.explain}` : `❌ حاول مجدداً — ${item.explain}`;
      if (ok) {
        const cur = getNodeProgress(node.id);
        cur.theory = Math.max(cur.theory, 85);
        cur.state = deriveMasteryState(node, cur);
        UniState.progress[node.id] = cur;
        saveUniState();
      }
    };
  });
}

/* ============================================================================
   5. INTERACTIVE BRANCHING KNOWLEDGE MAP (ZOOM, PAN, FILTER, PREREQ ARROWS)
   ============================================================================ */
function renderInteractiveKnowledgeMap(container) {
  const nodes = getAllUniversityNodes();
  const ms = UniState.mapState;
  const q = (ms.search || "").toLowerCase().trim();

  const zoneColors = {
    "Foundation Zone": "#06b6d4",
    "IT Foundations Zone": "#3b82f6",
    "Core Security Zone": "#d4af37",
    "Specialization Zone": "#10b981",
    "Advanced Zone": "#a855f7",
    "Expert Zone": "#f43f5e"
  };

  const filteredNodes = nodes.filter(n => {
    const matchLevel = ms.filterLevel === "all" || String(n.level) === ms.filterLevel;
    const matchSpec = ms.filterSpec === "all" || (n.category || "Core") === ms.filterSpec;
    const matchSearch = !q || n.title.toLowerCase().includes(q) || (n.titleAr || "").toLowerCase().includes(q);
    return matchLevel && matchSpec && matchSearch;
  });

  const visibleIds = new Set(filteredNodes.map(n => n.id));
  const edgesSvg = [];
  filteredNodes.forEach(n => {
    (n.prerequisites || []).forEach(preId => {
      if (!visibleIds.has(preId)) return;
      const src = nodes.find(x => x.id === preId);
      if (!src || !src.mapPos || !n.mapPos) return;
      const x1 = src.mapPos.x + 210;
      const y1 = src.mapPos.y + 38;
      const x2 = n.mapPos.x;
      const y2 = n.mapPos.y + 38;
      const cx = (x1 + x2) / 2;
      const isDone = deriveMasteryState(src, getNodeProgress(src.id)) === MASTERY_STATES.MASTERED;
      edgesSvg.push(`<path d="M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}" fill="none" stroke="${isDone ? "#10b981" : "rgba(212,167,44,0.38)"}" stroke-width="${isDone ? 2.6 : 1.7}" />`);
    });
  });

  const nodesHtml = filteredNodes.map(n => {
    const p = getNodeProgress(n.id);
    const score = computeWeightedScore(n, p);
    const st = deriveMasteryState(n, p);
    const unlocked = isNodeUnlocked(n);
    const col = zoneColors[n.zone] || "#06b6d4";
    return `
      <div class="cu-map-node ${!unlocked ? "locked" : ""} ${st === MASTERY_STATES.MASTERED ? "mastered" : ""}"
           style="left:${n.mapPos.x}px; top:${n.mapPos.y}px; --node-color:${col};"
           data-map-node-id="${n.id}">
        <div class="flex-between">
          <small style="color:${col}; font-weight:800;">L${n.level} ${!unlocked ? "🔒" : st === MASTERY_STATES.MASTERED ? "✅" : "⚡"}</small>
          <small class="gold-text">${score}%</small>
        </div>
        <strong style="font-size:0.79rem; display:block; margin-top:3px;">${esc(n.title)}</strong>
        <small class="small-muted" style="font-size:0.7rem; display:block;">${esc(n.titleAr || "")}</small>
        <div class="progress-bar-track" style="height:4px; margin-top:5px;">
          <div class="progress-bar-fill" style="width:${score}%; background:${col};"></div>
        </div>
      </div>
    `;
  }).join("");

  return `
    <div class="section-toolbar">
      <div class="filters-row">
        <input type="search" id="cu-map-search" class="input-sm" value="${esc(ms.search)}" placeholder="ابحث في عقد الخريطة..." />
        <select id="cu-map-level" class="select-sm">
          <option value="all" ${ms.filterLevel === "all" ? "selected" : ""}>كل المستويات (0 - 4)</option>
          <option value="0" ${ms.filterLevel === "0" ? "selected" : ""}>Level 0 — Absolute Zero</option>
          <option value="1" ${ms.filterLevel === "1" ? "selected" : ""}>Level 1 — IT Foundations</option>
          <option value="2" ${ms.filterLevel === "2" ? "selected" : ""}>Level 2 — Core Security</option>
          <option value="4" ${ms.filterLevel === "4" ? "selected" : ""}>Level 4 — 15 Academies</option>
        </select>
        <select id="cu-map-spec" class="select-sm">
          <option value="all" ${ms.filterSpec === "all" ? "selected" : ""}>كل التخصصات</option>
          <option value="Core" ${ms.filterSpec === "Core" ? "selected" : ""}>التأسيس المشترك</option>
          <option value="Offensive" ${ms.filterSpec === "Offensive" ? "selected" : ""}>Offensive</option>
          <option value="Defensive" ${ms.filterSpec === "Defensive" ? "selected" : ""}>Defensive</option>
          <option value="Engineering" ${ms.filterSpec === "Engineering" ? "selected" : ""}>Engineering</option>
          <option value="Governance" ${ms.filterSpec === "Governance" ? "selected" : ""}>Governance</option>
          <option value="Specialized" ${ms.filterSpec === "Specialized" ? "selected" : ""}>Specialized</option>
        </select>
      </div>
      <div class="filters-row">
        <button type="button" id="cu-zoom-in" class="btn btn-xs btn-outline"><i class="fa-solid fa-plus"></i></button>
        <button type="button" id="cu-zoom-out" class="btn btn-xs btn-outline"><i class="fa-solid fa-minus"></i></button>
        <button type="button" id="cu-map-reset" class="btn btn-xs btn-outline">إعادة الضبط</button>
        <button type="button" id="cu-map-full" class="btn btn-xs btn-gold"><i class="fa-solid fa-expand"></i> ملء الشاشة</button>
      </div>
    </div>

    <div class="filters-row mb-2">
      ${Object.entries(zoneColors).map(([z, c]) => `<span class="cu-zone-pill"><span style="width:9px;height:9px;border-radius:50%;background:${c};display:inline-block;"></span>${z}</span>`).join("")}
    </div>

    <div id="cu-map-viewport" class="cu-map-viewport">
      <div id="cu-map-stage" class="cu-map-stage" style="transform:translate(${ms.panX}px, ${ms.panY}px) scale(${ms.zoom});">
        <svg width="1850" height="860" style="position:absolute; inset:0; pointer-events:none;">${edgesSvg.join("")}</svg>
        ${nodesHtml}
      </div>
    </div>
  `;
}

/* ============================================================================
   6. MAIN UNIVERSITY MOUNT & RENDERER (ALL 9 SUB-CENTERS)
   ============================================================================ */
export function mountCybersecurityUniversity(container) {
  if (!container) return;
  injectCyberUniStyles();

  const analytics = getOverallAnalytics();
  const activeTab = UniState.activeTab;
  const activeCareer = CAREER_PATHS.find(c => c.id === UniState.selectedCareerId) || CAREER_PATHS[0];

  let bodyHtml = "";

  if (activeTab === "dashboard") {
    bodyHtml = `
      <div class="kpi-grid">
        <div class="kpi-card"><div class="kpi-icon gold"><i class="fa-solid fa-award"></i></div><div class="kpi-info"><span class="kpi-label">درجة الإتقان الكلية</span><h3>${analytics.overallMastery}%</h3><small>${analytics.masteredCount} من ${analytics.totalNodes} وحدة</small></div></div>
        <div class="kpi-card"><div class="kpi-icon emerald"><i class="fa-solid fa-fire"></i></div><div class="kpi-info"><span class="kpi-label">سلسلة التعلم</span><h3>${UniState.streakDays} يوم</h3><small>تحديث يومي حقيقي</small></div></div>
        <div class="kpi-card"><div class="kpi-icon blue"><i class="fa-solid fa-briefcase"></i></div><div class="kpi-info"><span class="kpi-label">هدفك المهني الحالي</span><h3 style="font-size:1rem;">${esc(activeCareer.title)}</h3><small>${esc(activeCareer.group)}</small></div></div>
        <div class="kpi-card"><div class="kpi-icon purple"><i class="fa-solid fa-folder-open"></i></div><div class="kpi-info"><span class="kpi-label">مشاريع الـ Portfolio</span><h3>${UniState.portfolio.length}</h3><small>مشاريع موثقة بالتقارير</small></div></div>
      </div>

      <div class="dashboard-grid">
        <div class="card">
          <div class="card-header"><h3><i class="fa-solid fa-compass gold-text"></i> خطوتك القادمة الموصى بها</h3></div>
          ${analytics.recommendedNext.map(r => `
            <div class="prayer-row">
              <div><strong>${esc(r.node.title)}</strong><small class="small-muted d-block">${esc(r.node.titleAr || "")} • ${r.score}%</small></div>
              <button type="button" class="btn btn-xs btn-gold" data-open-node="${r.node.id}">ابدأ الدراسة</button>
            </div>
          `).join("") || `<p class="small-muted">أتممت جميع الوحدات المتاحة!</p>`}
        </div>

        <div class="card">
          <div class="card-header"><h3><i class="fa-solid fa-shield-halved gold-text"></i> الأطر المهنية المعتمدة في المنهج</h3></div>
          ${UNIVERSITY_META.frameworks.map(f => `
            <div class="prayer-row">
              <div><strong class="gold-text" dir="ltr">${esc(f.name)}</strong><small class="small-muted d-block">${esc(f.scope)}</small></div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  } else if (activeTab === "map") {
    bodyHtml = renderInteractiveKnowledgeMap(container);
  } else if (activeTab === "foundations") {
    bodyHtml = [0, 1, 2].map(lv => {
      const lvNames = {
        0: "LEVEL 0 — ABSOLUTE ZERO (من الصفر المطلق)",
        1: "LEVEL 1 — IT & COMPUTER SCIENCE FOUNDATIONS (أساسيات التقنية والأنظمة)",
        2: "LEVEL 2 — CORE CYBERSECURITY FOUNDATIONS (المدخل الحقيقي للأمن السيبراني)"
      };
      const mods = FOUNDATION_MODULES.filter(m => m.level === lv);
      return `
        <div class="card mb-4" style="margin-bottom:16px;">
          <div class="card-header"><h3>${lvNames[lv]}</h3><span class="badge badge-gold">${mods.length} وحدات</span></div>
          <div class="items-grid">
            ${mods.map(m => {
              const p = getNodeProgress(m.id);
              const sc = computeWeightedScore(m, p);
              const st = deriveMasteryState(m, p);
              const unlocked = isNodeUnlocked(m);
              return `
                <div class="item-card">
                  <div>
                    <div class="flex-between">
                      <span class="badge ${unlocked ? "badge-emerald" : "badge-warning"}">${unlocked ? esc(st) : "🔒 مقفل"}</span>
                      <span class="badge badge-gold">⏱️ ${m.estimatedHours}h</span>
                    </div>
                    <h4 class="mt-2">${esc(m.title)}</h4>
                    <small class="gold-text">${esc(m.titleAr)}</small>
                    <p class="small-muted mt-1">${esc(m.description)}</p>
                    <div class="progress-bar-track mt-2"><div class="progress-bar-fill" style="width:${sc}%"></div></div>
                  </div>
                  <button type="button" class="btn btn-sm btn-gold btn-block mt-2" data-open-node="${m.id}">فتح المنهج والتقييم (${sc}%)</button>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }).join("");
  } else if (activeTab === "academies") {
    bodyHtml = `
      <div class="cu-legal-strip">🧭 <strong>LEVEL 3 & 4 — اكتشاف التخصصات والأكاديميات الـ 15:</strong> لا يسلك كل طالب المسار نفسه؛ اختر تخصصك وتعمق فيه عبر 4 مراحل (Beginner ➔ Intermediate ➔ Advanced ➔ Expert).</div>
      <div class="items-grid">
        ${SPECIALIZATION_ACADEMIES.map(ac => {
          const p = getNodeProgress(ac.id);
          const sc = computeWeightedScore(ac, p);
          const unlocked = isNodeUnlocked(ac);
          return `
            <div class="item-card">
              <div>
                <div class="flex-between">
                  <span class="badge badge-gold">${esc(ac.code)} • ${esc(ac.category)}</span>
                  <span class="badge ${unlocked ? "badge-emerald" : "badge-warning"}">${unlocked ? sc + "%" : "🔒 متطلبات سابقة"}</span>
                </div>
                <h4 class="mt-2">${esc(ac.title)}</h4>
                <small class="gold-text d-block">${esc(ac.titleAr)}</small>
                <p class="small-muted mt-1">${esc(ac.overview)}</p>
                <small class="small-muted d-block mt-1"><strong>المدة التقديرية:</strong> ${esc(ac.estimatedMonths)} &bull; <strong>المسارات:</strong> ${ac.tracks.length}</small>
                <div class="progress-bar-track mt-2"><div class="progress-bar-fill" style="width:${sc}%"></div></div>
              </div>
              <button type="button" class="btn btn-sm btn-gold btn-block mt-2" data-open-node="${ac.id}">دخول الأكاديمية</button>
            </div>
          `;
        }).join("")}
      </div>
    `;
  } else if (activeTab === "careers") {
    bodyHtml = `
      <div class="card mb-4" style="margin-bottom:16px;">
        <div class="flex-between" style="flex-wrap:wrap; gap:10px;">
          <div>
            <h3><i class="fa-solid fa-route gold-text"></i> باني الخطة المهنية الذكية (Career Roadmap Builder)</h3>
            <small class="small-muted">اختر الوظيفة المستهدفة ليحدد لك النظام ما تدرسه أولاً، وما يمكنك تأجيله، ومتى تكون جاهزاً للتقديم</small>
          </div>
          <select id="cu-career-picker" class="select-sm" style="min-width:260px;">
            ${CAREER_PATHS.map(c => `<option value="${c.id}" ${c.id === activeCareer.id ? "selected" : ""}>${esc(c.title)}</option>`).join("")}
          </select>
        </div>
        <div class="dashboard-grid mt-2">
          <div class="subject-progress-box">
            <strong class="gold-text">1. ماذا أتعلم أولاً؟ (المسار الإلزامي)</strong>
            <div class="filters-row mt-1">
              ${[...activeCareer.requiredModules, ...activeCareer.requiredAcademies].map(id => {
                const n = getAllUniversityNodes().find(x => x.id === id);
                return `<button type="button" class="chip" data-open-node="${id}">${esc(n?.title || id)}</button>`;
              }).join("")}
            </div>
            <strong class="gold-text d-block mt-2">2. ما الذي يمكن تأجيله حالياً؟</strong>
            <small class="small-muted">${esc(activeCareer.deferrableTopics.join(" • "))}</small>
          </div>
          <div class="subject-progress-box">
            <strong class="gold-text">3. المشاريع والجاهزية للوظيفة</strong>
            <ul style="margin:6px 18px; font-size:0.84rem;">${activeCareer.portfolio.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
            <p class="small-note"><strong>معيار الجاهزية للتقديم:</strong> ${esc(activeCareer.readinessCheck)}</p>
          </div>
        </div>
      </div>

      <div class="items-grid">
        ${CAREER_PATHS.map(c => `
          <div class="item-card">
            <div>
              <span class="badge badge-gold">${esc(c.group)}</span>
              <h4 class="mt-2">${esc(c.title)}</h4>
              <small class="small-muted" dir="ltr">${esc(c.niceRole)}</small>
              <p class="small-muted mt-1">${esc(c.description)}</p>
              <small class="gold-text d-block mt-1"><strong>الأدوات:</strong> ${esc(c.tools.join(", "))}</small>
              <small class="small-muted d-block mt-1"><strong>أسئلة المقابلات:</strong> ${esc(c.interviewTopics.slice(0, 2).join(" • "))}</small>
            </div>
            <button type="button" class="btn btn-xs btn-outline mt-2" data-pick-career="${c.id}">اعتماد كهدف مهني</button>
          </div>
        `).join("")}
      </div>
    `;
  } else if (activeTab === "labs") {
    bodyHtml = `
      <div class="cu-legal-strip">⚖️ ${esc(UNIVERSITY_META.legalPolicy)}</div>
      <div class="items-grid mb-4">
        ${PRACTICAL_LABS_ECOSYSTEM.map(l => `
          <div class="item-card">
            <div>
              <span class="badge badge-gold">${esc(l.tier)}</span>
              <h4 class="mt-2">${esc(l.title)}</h4>
              <small class="small-muted d-block"><strong>البيئة:</strong> ${esc(l.env)}</small>
              <p class="small-muted mt-1">${esc(l.objective)}</p>
              <small class="small-note d-block"><strong>الدليل المطلوب:</strong> ${esc(l.evidence)}</small>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="card">
        <div class="card-header"><h3>منصات التدريب القانونية (مع توضيح خطط الوصول)</h3></div>
        ${LEGAL_PLATFORMS.map(p => `
          <div class="prayer-row">
            <div><strong>${esc(p.name)}</strong><small class="small-muted d-block">${esc(p.focus)}</small></div>
            <span class="badge badge-emerald">${esc(p.access)}</span>
          </div>
        `).join("")}
      </div>
    `;
  } else if (activeTab === "certs") {
    bodyHtml = `
      <div class="cu-legal-strip">ℹ️ الشهادات الدولية مسار داعم للتوظيف وليست بديلاً عن المهارة العملية أو شرطاً عاماً لكل تخصص. تحقق دائماً من التكلفة والمتطلبات المحدثة من الموقع الرسمي للجهة المانحة.</div>
      <div class="items-grid">
        ${CERTIFICATIONS_DB.map(c => `
          <div class="item-card">
            <div>
              <div class="flex-between">
                <span class="badge badge-gold">${esc(c.group)}</span>
                <span class="badge badge-emerald">${esc(c.level)}</span>
              </div>
              <h4 class="mt-2">${esc(c.name)}</h4>
              <small class="small-muted d-block">الجهة المانحة: <strong>${esc(c.vendor)}</strong> • الصلاحية: ${esc(c.renewal)}</small>
              <p class="small-muted mt-1">${esc(c.fit)}</p>
              <small class="small-note d-block"><strong>بدائل أقل تكلفة:</strong> ${esc(c.lowCostAlt)}</small>
            </div>
            <a href="${esc(c.official)}" target="_blank" rel="noopener" class="btn btn-xs btn-outline mt-2">الموقع الرسمي للجهة المانحة ↗</a>
          </div>
        `).join("")}
      </div>
    `;
  } else if (activeTab === "portfolio") {
    bodyHtml = `
      <div class="section-toolbar">
        <div><h3><i class="fa-solid fa-briefcase gold-text"></i> باني ملف الأعمال والمشاريع العملية (Portfolio Builder)</h3></div>
        <button type="button" id="btn-cu-add-portfolio" class="btn btn-gold btn-sm"><i class="fa-solid fa-plus"></i> إضافة مشروع للـ Portfolio</button>
      </div>
      <div class="items-grid">
        ${UniState.portfolio.length ? UniState.portfolio.map((pr, i) => `
          <div class="item-card">
            <div>
              <div class="flex-between">
                <span class="badge badge-gold">${esc(pr.tech)}</span>
                <span class="badge badge-emerald">${esc(pr.date)}</span>
              </div>
              <h4 class="mt-2">${esc(pr.name)}</h4>
              <p class="small-muted mt-1">${esc(pr.desc)}</p>
              <small class="gold-text d-block mt-1">المهارات المثبتة: ${esc(pr.skills)}</small>
            </div>
            <div class="flex-between mt-2">
              ${pr.github ? `<a href="${esc(pr.github)}" target="_blank" rel="noopener" class="btn-link">رابط GitHub / التقرير ↗</a>` : `<span></span>`}
              <button type="button" class="btn btn-xs btn-danger" data-del-port="${i}"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `).join("") : `<div class="empty-state" style="grid-column:1/-1;"><i class="fa-solid fa-diagram-project"></i><p>لم توثّق أي مشروع أمني في ملف أعمالك بعد. ابدأ بتوثيق Home Lab أو Mini SOC!</p></div>`}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="cu-hero">
      <div class="flex-between" style="flex-wrap:wrap; gap:12px;">
        <div>
          <span class="badge badge-gold">MY LIFE OS • COMPLETE LEARNING ECOSYSTEM • v${UNIVERSITY_META.curriculumVersion}</span>
          <h2 class="mt-1">🎓 ${UNIVERSITY_META.name}</h2>
          <p class="small-muted">${UNIVERSITY_META.subtitle} — منهج جامعي ومهني متفرع مبني على NIST NICE v2.2.0 وOWASP 2025 وMITRE ATT&CK وCIS v8.1</p>
        </div>
        <div class="filters-row">
          <button type="button" id="btn-cu-ask-alex" class="btn btn-gold btn-sm"><i class="fa-solid fa-robot"></i> استشارة ALEX Tutor</button>
        </div>
      </div>
    </div>

    <div class="cu-tabs-bar">
      ${[
        ["dashboard", "fa-gauge-high", "لوحة الجامعة"],
        ["map", "fa-diagram-project", "الخريطة التفاعلية"],
        ["foundations", "fa-layer-group", "التأسيس (Level 0-2)"],
        ["academies", "fa-graduation-cap", "الـ 15 أكاديمية (L3-4)"],
        ["careers", "fa-route", "الوظائف وباني الخطة"],
        ["labs", "fa-flask", "المختبرات القانونية"],
        ["certs", "fa-certificate", "مركز الشهادات"],
        ["portfolio", "fa-briefcase", "ملف الأعمال Portfolio"]
      ].map(([id, icon, lbl]) => `
        <button type="button" class="cu-tab-btn ${activeTab === id ? "active" : ""}" data-cu-tab="${id}">
          <i class="fa-solid ${icon}"></i> ${lbl}
        </button>
      `).join("")}
    </div>

    ${bodyHtml}
  `;

  // Event Bindings
  container.querySelectorAll("[data-cu-tab]").forEach(btn => {
    btn.onclick = () => {
      UniState.activeTab = btn.dataset.cuTab;
      saveUniState();
      mountCybersecurityUniversity(container);
    };
  });

  container.querySelector("#btn-cu-ask-alex")?.addEventListener("click", () => askAlexCyberTutor());
  container.querySelectorAll("[data-open-node], [data-map-node-id]").forEach(el => {
    el.onclick = () => openNodeDossierModal(el.dataset.openNode || el.dataset.mapNodeId, container);
  });

  // Career Builder Events
  container.querySelector("#cu-career-picker")?.addEventListener("change", (e) => {
    UniState.selectedCareerId = e.target.value;
    saveUniState();
    mountCybersecurityUniversity(container);
  });
  container.querySelectorAll("[data-pick-career]").forEach(b => {
    b.onclick = () => {
      UniState.selectedCareerId = b.dataset.pickCareer;
      saveUniState();
      mountCybersecurityUniversity(container);
      toast("تم تحديث هدفك المهني وبناء خطتك المخصصة 🎯", "success");
    };
  });

  // Portfolio Builder Events
  container.querySelector("#btn-cu-add-portfolio")?.addEventListener("click", () => {
    B().openFormModal("📁 إضافة مشروع لملف الأعمال (Portfolio Builder)", `
      <div class="form-group"><label>اسم المشروع</label><input name="name" required placeholder="مثال: Mini SOC with Wazuh & Sysmon" /></div>
      <div class="form-group"><label>الوصف والنتائج</label><textarea name="desc" rows="3" required></textarea></div>
      <div class="form-group"><label>التقنيات والأدوات</label><input name="tech" required placeholder="Wazuh, Sysmon, MITRE ATT&CK" /></div>
      <div class="form-group"><label>المهارات المثبتة</label><input name="skills" required placeholder="Alert Triage, Detection Rules, Reporting" /></div>
      <div class="form-group"><label>رابط GitHub أو التقرير (اختياري)</label><input type="url" name="github" dir="ltr" /></div>
    `, async (d) => {
      UniState.portfolio.unshift({ ...d, date: new Date().toISOString().split("T")[0] });
      saveUniState();
      mountCybersecurityUniversity(container);
      toast("تم حفظ المشروع في ملف أعمالك بنجاح 🏆", "success");
    });
  });

  container.querySelectorAll("[data-del-port]").forEach(b => {
    b.onclick = () => {
      UniState.portfolio.splice(Number(b.dataset.delPort), 1);
      saveUniState();
      mountCybersecurityUniversity(container);
    };
  });

  // Interactive Map Controls (Zoom / Pan / Filter / Fullscreen)
  if (activeTab === "map") {
    const vp = container.querySelector("#cu-map-viewport");
    const stage = container.querySelector("#cu-map-stage");
    const ms = UniState.mapState;
    const applyTransform = () => {
      if (stage) stage.style.transform = `translate(${ms.panX}px, ${ms.panY}px) scale(${ms.zoom})`;
    };

    container.querySelector("#cu-zoom-in").onclick = () => { ms.zoom = Math.min(1.8, +(ms.zoom + 0.12).toFixed(2)); applyTransform(); saveUniState(); };
    container.querySelector("#cu-zoom-out").onclick = () => { ms.zoom = Math.max(0.45, +(ms.zoom - 0.12).toFixed(2)); applyTransform(); saveUniState(); };
    container.querySelector("#cu-map-reset").onclick = () => { ms.zoom = 0.92; ms.panX = 20; ms.panY = 15; applyTransform(); saveUniState(); };
    container.querySelector("#cu-map-full").onclick = () => vp?.classList.toggle("cu-map-full");

    container.querySelector("#cu-map-search").oninput = (e) => { ms.search = e.target.value; mountCybersecurityUniversity(container); };
    container.querySelector("#cu-map-level").onchange = (e) => { ms.filterLevel = e.target.value; mountCybersecurityUniversity(container); };
    container.querySelector("#cu-map-spec").onchange = (e) => { ms.filterSpec = e.target.value; mountCybersecurityUniversity(container); };

    if (vp) {
      let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
      vp.onmousedown = (e) => {
        if (e.target.closest(".cu-map-node")) return;
        dragging = true;
        sx = e.clientX; sy = e.clientY;
        ox = ms.panX; oy = ms.panY;
        vp.style.cursor = "grabbing";
      };
      window.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        ms.panX = ox + (e.clientX - sx);
        ms.panY = oy + (e.clientY - sy);
        applyTransform();
      });
      window.addEventListener("mouseup", () => {
        if (!dragging) return;
        dragging = false;
        vp.style.cursor = "grab";
        saveUniState();
      });
    }
  }
}

window.mountCybersecurityUniversity = mountCybersecurityUniversity;
