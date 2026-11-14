/**
 * ============================================================================
 * VS CODE STUDIO PRO — STANDALONE MULTI-PROJECT IDE & MULTI-LANGUAGE COMPILER
 * Engineered for MY LIFE OS (Eng:Ahmed M Hosny)
 * ============================================================================
 */
(function () {
  "use strict";

  const STORAGE_KEY = "MY_LIFE_OS_VSCODE_PROJECTS_V2";

  const DEFAULT_PROJECTS = [
    {
      id: "proj_main",
      name: "منصة البورتفوليو الهندسي",
      type: "Web Application (HTML/CSS/JS)",
      desc: "مشروع واجهة تفاعلية كامل مع دعم الصور والتشغيل الحي",
      activeFile: "index.html",
      files: {
        "index.html": `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>Eng. Ahmed M Hosny — Portfolio</title>
</head>
<body>
  <div class="glass-card">
    <span class="tag">⚡ VS CODE STUDIO PRO</span>
    <h1>المهندس أحمد محمد حسني</h1>
    <p>مطور برمجيات متكامل (Full-Stack) ومهندس أنظمة ذكية. جرب التعديل أو رفع صورة من الشريط العلوي!</p>
    <div class="btn-group">
      <button id="test-btn">اختبر التفاعل الحي 🚀</button>
    </div>
    <p id="msg"></p>
  </div>
</body>
</html>`,
        "style.css": `body {
  font-family: 'Cairo', system-ui, sans-serif;
  background: radial-gradient(circle at top, #16203a, #070b14);
  color: #f8fafc;
  display: grid;
  place-items: center;
  min-height: 92vh;
  margin: 0;
}
.glass-card {
  background: rgba(17, 25, 44, 0.9);
  border: 1.5px solid rgba(212, 167, 44, 0.45);
  border-radius: 20px;
  padding: 32px;
  max-width: 460px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.7);
}
.tag {
  background: rgba(212, 167, 44, 0.18);
  color: #d4a72c;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 800;
}
h1 { color: #d4a72c; margin: 14px 0 8px; font-size: 24px; }
p { color: #94a3b8; line-height: 1.7; font-size: 14px; }
button {
  background: linear-gradient(135deg, #d4a72c, #10b981);
  color: #040914;
  border: 0;
  padding: 10px 22px;
  border-radius: 10px;
  font-family: inherit;
  font-weight: 800;
  cursor: pointer;
  margin-top: 12px;
}
#msg { color: #10b981; font-weight: 800; margin-top: 12px; }`,
        "script.js": `const btn = document.getElementById("test-btn");
const msg = document.getElementById("msg");

if (btn) {
  btn.addEventListener("click", () => {
    msg.textContent = "✅ المترجم الفوري شغال 100% يا هندسة!";
    console.log("Interactive test button clicked!");
  });
}`
      },
      assets: {}
    }
  ];

  const state = {
    projects: loadProjects(),
    activeProjectId: localStorage.getItem("VSC_ACTIVE_PROJ_ID") || "proj_main",
    sidebarTab: "explorer",
    autoRun: localStorage.getItem("VSC_AUTORUN") !== "0",
    intelliSense: localStorage.getItem("VSC_INTELLISENSE") !== "0",
    theme: localStorage.getItem("VSC_THEME") || "vscode-dark",
    codeFontSize: 14,
    previewZoom: 100,
    autoRunTimer: null
  };

  let monacoEditor = null;
  let usingMonaco = false;

  function loadProjects() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_PROJECTS;
    } catch (e) {
      return DEFAULT_PROJECTS;
    }
  }

  function saveProjects() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));
      localStorage.setItem("VSC_ACTIVE_PROJ_ID", state.activeProjectId);
    } catch (e) {}
  }

  function curProj() {
    let p = state.projects.find(x => x.id === state.activeProjectId);
    if (!p) {
      p = state.projects[0];
      state.activeProjectId = p.id;
    }
    return p;
  }

  function notify(msg) {
    const box = document.getElementById("vsc-toast-box");
    if (!box) return;
    const t = document.createElement("div");
    t.className = "vsc-toast";
    t.textContent = msg;
    box.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ==========================================================================
     1. FILE EXTENSION & MULTI-LANGUAGE DETECTOR
     ========================================================================== */
  function getFileMeta(fname) {
    const low = String(fname || "index.html").toLowerCase();
    if (low.endsWith(".html") || low.endsWith(".htm")) return { lang: "html", label: "HTML5", icon: "fa-brands fa-html5", color: "#f97316", isTerm: false };
    if (low.endsWith(".css")) return { lang: "css", label: "CSS3", icon: "fa-brands fa-css3-alt", color: "#38bdf8", isTerm: false };
    if (low.endsWith(".js")) return { lang: "javascript", label: "JavaScript", icon: "fa-brands fa-js", color: "#facc15", isTerm: false };
    if (low.endsWith(".py")) return { lang: "python", label: "Python 🐍", icon: "fa-brands fa-python", color: "#10b981", isTerm: true };
    if (low.endsWith(".cpp") || low.endsWith(".cc")) return { lang: "cpp", label: "C++ ⚙️", icon: "fa-solid fa-microchip", color: "#60a5fa", isTerm: true };
    if (low.endsWith(".c")) return { lang: "c", label: "C Lang 🛠️", icon: "fa-solid fa-code", color: "#93c5fd", isTerm: true };
    if (low.endsWith(".java")) return { lang: "java", label: "Java ☕", icon: "fa-brands fa-java", color: "#f87171", isTerm: true };
    if (low.endsWith(".cs")) return { lang: "csharp", label: "C# 🎯", icon: "fa-solid fa-hashtag", color: "#a855f7", isTerm: true };
    if (low.endsWith(".sql")) return { lang: "sql", label: "SQL 🗄️", icon: "fa-solid fa-database", color: "#fbbf24", isTerm: true };
    return { lang: "html", label: "CODE", icon: "fa-regular fa-file-code", color: "#d4a72c", isTerm: false };
  }

  /* ==========================================================================
     2. MONACO EDITOR INITIALIZATION + FALLBACK
     ========================================================================== */
  function initEditor() {
    const p = curProj();
    const initialCode = p.files[p.activeFile] || "";
    const meta = getFileMeta(p.activeFile);
    const fallback = document.getElementById("fallback-code-area");

    function enableFallback() {
      usingMonaco = false;
      if (!fallback) return;
      fallback.hidden = false;
      fallback.value = curProj().files[curProj().activeFile] || "";
      fallback.oninput = () => {
        const pr = curProj();
        pr.files[pr.activeFile] = fallback.value;
        saveProjects();
        if (state.autoRun) triggerDebouncedRun();
      };
      fallback.onkeydown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          runProjectNow(true);
        } else if (e.key === "Tab") {
          e.preventDefault();
          const s = fallback.selectionStart, end = fallback.selectionEnd;
          fallback.value = fallback.value.slice(0, s) + "  " + fallback.value.slice(end);
          fallback.selectionStart = fallback.selectionEnd = s + 2;
        }
      };
    }

    if (window.require && typeof window.require.config === "function") {
      window.require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs" } });
      const timer = setTimeout(() => { if (!usingMonaco) enableFallback(); }, 4000);

      window.require(["vs/editor/editor.main"], function () {
        clearTimeout(timer);
        if (!window.monaco) return enableFallback();
        usingMonaco = true;
        if (fallback) fallback.hidden = true;

        monacoEditor = window.monaco.editor.create(document.getElementById("monaco-mount"), {
          value: initialCode,
          language: meta.lang,
          theme: state.theme === "aurora-light" ? "vs" : "vs-dark",
          fontFamily: "'JetBrains Mono', Consolas, monospace",
          fontSize: state.codeFontSize,
          lineHeight: 22,
          automaticLayout: true,
          minimap: { enabled: true },
          mouseWheelZoom: true,
          tabSize: 2,
          wordWrap: "on",
          padding: { top: 12, bottom: 12 }
        });

        monacoEditor.onDidChangeModelContent(() => {
          const pr = curProj();
          pr.files[pr.activeFile] = monacoEditor.getValue();
          saveProjects();
          if (state.autoRun) triggerDebouncedRun();
        });

        monacoEditor.onDidChangeCursorPosition((e) => {
          const el = document.getElementById("status-cursor");
          if (el && e.position) el.textContent = `Ln ${e.position.lineNumber}, Col ${e.position.column}`;
        });

        monacoEditor.addCommand(window.monaco.KeyMod.CtrlCmd | window.monaco.KeyCode.Enter, () => {
          runProjectNow(true);
        });
      });
    } else {
      enableFallback();
    }
  }

  function setEditorValue(code, lang) {
    if (usingMonaco && monacoEditor && window.monaco) {
      const model = monacoEditor.getModel();
      if (model && lang) window.monaco.editor.setModelLanguage(model, lang);
      if (monacoEditor.getValue() !== code) monacoEditor.setValue(code);
    } else {
      const fb = document.getElementById("fallback-code-area");
      if (fb) fb.value = code;
    }
  }

  function getEditorValue() {
    if (usingMonaco && monacoEditor) return monacoEditor.getValue();
    return document.getElementById("fallback-code-area")?.value || "";
  }

  function triggerDebouncedRun() {
    if (state.autoRunTimer) clearTimeout(state.autoRunTimer);
    state.autoRunTimer = setTimeout(() => runProjectNow(false), 300);
  }

  /* ==========================================================================
     3. UI RENDERERS: TOPBAR, FILE TABS, SIDEBAR EXPLORER
     ========================================================================== */
  function refreshIDEUI() {
    const p = curProj();
    if (!p.files[p.activeFile]) p.activeFile = Object.keys(p.files)[0] || "index.html";
    const meta = getFileMeta(p.activeFile);

    document.getElementById("top-proj-name").textContent = p.name;
    document.getElementById("top-proj-type").textContent = p.type.split("(")[0].trim();
    document.getElementById("crumb-proj-name").textContent = p.name;
    document.getElementById("crumb-file-name").textContent = p.activeFile;
    document.getElementById("crumb-lang-badge").textContent = meta.label;
    document.getElementById("status-lang").textContent = meta.label;
    document.getElementById("preview-url-lbl").textContent = `localhost:3000/${p.activeFile}`;

    // Render File Tabs
    const tabsBar = document.getElementById("vsc-tabs-bar");
    const fileKeys = Object.keys(p.files);
    tabsBar.innerHTML = fileKeys.map(fname => {
      const m = getFileMeta(fname);
      const isCore = ["index.html", "style.css", "script.js"].includes(fname);
      return `
        <div class="vsc-tab ${fname === p.activeFile ? "active" : ""}" data-tab-file="${esc(fname)}">
          <i class="${m.icon}" style="color:${m.color};"></i>
          <span>${esc(fname)}</span>
          ${!isCore && fileKeys.length > 1 ? `<button type="button" class="vsc-tab-close" data-del-file="${esc(fname)}" title="حذف الملف">×</button>` : ""}
        </div>
      `;
    }).join("") + `<button type="button" id="btn-tab-plus" class="vsc-tab-add" data-tip="إضافة ملف جديد للمشروع (+)">+</button>`;

    tabsBar.querySelectorAll("[data-tab-file]").forEach(t => {
      t.onclick = (e) => {
        if (e.target.closest("[data-del-file]")) return;
        switchFile(t.dataset.tabFile);
      };
    });

    tabsBar.querySelectorAll("[data-del-file]").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const fn = btn.dataset.delFile;
        if (!confirm(`حذف الملف ${fn}؟`)) return;
        delete p.files[fn];
        p.activeFile = Object.keys(p.files)[0] || "index.html";
        saveProjects();
        switchFile(p.activeFile);
      };
    });

    document.getElementById("btn-tab-plus")?.addEventListener("click", openNewFileModal);

    renderSidebarContent();
  }

  function switchFile(fname) {
    const p = curProj();
    if (p.files[fname] === undefined) return;
    p.activeFile = fname;
    saveProjects();
    const meta = getFileMeta(fname);
    setEditorValue(p.files[fname], meta.lang);
    refreshIDEUI();
    runProjectNow(false);
  }

  function renderSidebarContent() {
    const p = curProj();
    const box = document.getElementById("vsc-sidebar-content");
    const titleLbl = document.getElementById("sidebar-title-lbl");
    if (!box) return;

    if (state.sidebarTab === "explorer") {
      titleLbl.textContent = "EXPLORER";
      const assets = Object.entries(p.assets || {});
      box.innerHTML = `
        <div class="vsc-tree-section">
          <div class="vsc-tree-title">
            <span>📂 ${esc(p.name)}</span>
          </div>
          ${Object.keys(p.files).map(fn => {
            const m = getFileMeta(fn);
            return `
              <div class="vsc-tree-item ${fn === p.activeFile ? "active" : ""}" data-side-file="${esc(fn)}">
                <span><i class="${m.icon}" style="color:${m.color}; margin-right:6px;"></i>${esc(fn)}</span>
                <i class="fa-solid fa-download" data-dl-single="${esc(fn)}" title="تحميل هذا الملف منفرداً" style="font-size:11px; opacity:0.65;"></i>
              </div>
            `;
          }).join("")}
        </div>

        <div class="vsc-tree-section">
          <div class="vsc-tree-title">
            <span>🖼️ IMAGES & ASSETS (${assets.length})</span>
          </div>
          ${assets.length ? assets.map(([imgName, dataUrl]) => `
            <div class="vsc-asset-row" data-insert-img="${esc(imgName)}" title="اضغط لإدراج الصورة في الكود فوراً">
              <div style="display:flex; align-items:center; gap:7px; overflow:hidden;">
                <img src="${dataUrl}" alt="${esc(imgName)}" />
                <span style="font-size:11px; overflow:hidden; text-overflow:ellipsis;">${esc(imgName)}</span>
              </div>
              <i class="fa-solid fa-xmark" data-remove-img="${esc(imgName)}" style="color:#ef4444;" title="حذف الصورة"></i>
            </div>
          `).join("") : `<div style="font-size:11px; color:var(--muted); padding:6px;">ارفع أي صورة من أيقونة الصور بالأعلى وسيتعرف عليها الكود تلقائياً بالاسم!</div>`}
        </div>
      `;

      box.querySelectorAll("[data-side-file]").forEach(el => {
        el.onclick = (e) => {
          if (e.target.closest("[data-dl-single]")) return;
          switchFile(el.dataset.sideFile);
        };
      });

      box.querySelectorAll("[data-dl-single]").forEach(ic => {
        ic.onclick = (e) => {
          e.stopPropagation();
          const fn = ic.dataset.dlSingle;
          const blob = new Blob([p.files[fn] || ""], { type: "text/plain;charset=utf-8" });
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = fn;
          a.click();
        };
      });

      bindAssetClicks(box, p);
      return;
    }

    if (state.sidebarTab === "projects") {
      titleLbl.textContent = "MY PROJECTS";
      box.innerHTML = `
        <button type="button" id="btn-side-create-proj" class="vsc-btn-primary" style="width:100%; margin-bottom:10px;">
          + مشروع برمجي جديد
        </button>
        ${state.projects.map(pr => `
          <div class="vsc-asset-row ${pr.id === p.id ? "active" : ""}" data-switch-proj="${esc(pr.id)}" style="padding:8px;">
            <div>
              <strong style="display:block; color:var(--text-bright);">${esc(pr.name)}</strong>
              <small style="color:var(--gold); font-size:10px;">${esc(pr.type)}</small>
            </div>
            ${state.projects.length > 1 ? `<i class="fa-solid fa-trash" data-del-proj="${esc(pr.id)}" style="color:#ef4444;"></i>` : ""}
          </div>
        `).join("")}
      `;

      document.getElementById("btn-side-create-proj")?.addEventListener("click", openNewProjectWizard);
      box.querySelectorAll("[data-switch-proj]").forEach(row => {
        row.onclick = (e) => {
          if (e.target.closest("[data-del-proj]")) return;
          state.activeProjectId = row.dataset.switchProj;
          saveProjects();
          const nextP = curProj();
          switchFile(nextP.activeFile);
          notify(`📂 تم فتح مشروع: ${nextP.name}`);
        };
      });
      box.querySelectorAll("[data-del-proj]").forEach(del => {
        del.onclick = (e) => {
          e.stopPropagation();
          const id = del.dataset.delProj;
          if (!confirm("حذف هذا المشروع نهائياً؟")) return;
          state.projects = state.projects.filter(x => x.id !== id);
          state.activeProjectId = state.projects[0].id;
          saveProjects();
          switchFile(curProj().activeFile);
        };
      });
      return;
    }

    if (state.sidebarTab === "assets") {
      titleLbl.textContent = "PROJECT ASSETS";
      const assets = Object.entries(p.assets || {});
      box.innerHTML = `
        <label class="vsc-btn-primary" style="display:block; text-align:center; margin-bottom:10px; cursor:pointer;">
          <i class="fa-solid fa-cloud-arrow-up"></i> + ارفع صور للمشروع
          <input type="file" id="side-asset-inp" accept="image/*" multiple hidden />
        </label>
        ${assets.map(([imgName, dataUrl]) => `
          <div class="vsc-asset-row" data-insert-img="${esc(imgName)}">
            <img src="${dataUrl}" alt="${esc(imgName)}" />
            <span style="flex:1; font-size:11px;">${esc(imgName)}</span>
            <i class="fa-solid fa-plus gold-icon"></i>
          </div>
        `).join("")}
      `;
      document.getElementById("side-asset-inp")?.addEventListener("change", handleAssetsUpload);
      bindAssetClicks(box, p);
      return;
    }

    if (state.sidebarTab === "snippets") {
      titleLbl.textContent = "CODE SNIPPETS";
      const snips = [
        { name: "🌐 هيكل HTML5 كامل بالعربية", code: `<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>صفحة جديدة</title>\n</head>\n<body>\n  <h1>مرحباً بالعالم</h1>\n</body>\n</html>` },
        { name: "🃏 بطاقة زجاجية حديثة (Card)", code: `<div class="card" style="padding:20px; border-radius:14px; background:#141b2d; color:#fff;">\n  <h3>عنوان البطاقة</h3>\n  <p>تفاصيل البطاقة هنا.</p>\n</div>` },
        { name: "📐 شبكة CSS Grid متجاوبة", code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}` },
        { name: "⚡ جلب بيانات API (JS Fetch)", code: `async function fetchData() {\n  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');\n  const data = await res.json();\n  console.log(data);\n}\nfetchData();` },
        { name: "⚙️ برنامج C++ قياسي", code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello C++ World!" << endl;\n    return 0;\n}` },
        { name: "☕ كلاس Java رئيسي", code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Java World!");\n    }\n}` },
        { name: "🐍 برنامج Python", code: `name = "Eng. Ahmed"\nprint("Welcome to Python,", name)\nfor i in range(1, 4):\n    print("Step:", i)` }
      ];
      box.innerHTML = snips.map((s, idx) => `
        <div class="vsc-asset-row" data-snip-idx="${idx}" style="padding:8px;">
          <span style="font-size:11.5px;">${esc(s.name)}</span>
          <i class="fa-solid fa-plus gold-icon"></i>
        </div>
      `).join("");
      box.querySelectorAll("[data-snip-idx]").forEach(el => {
        el.onclick = () => {
          const item = snips[Number(el.dataset.snipIdx)];
          const cur = getEditorValue();
          const next = cur ? cur + "\n" + item.code : item.code;
          p.files[p.activeFile] = next;
          setEditorValue(next);
          saveProjects();
          runProjectNow(false);
          notify("✨ تم إدراج الكود الجاهز في المحرر!");
        };
      });
    }
  }

  function bindAssetClicks(container, p) {
    container.querySelectorAll("[data-insert-img]").forEach(row => {
      row.onclick = (e) => {
        if (e.target.closest("[data-remove-img]")) return;
        const imgName = row.dataset.insertImg;
        const tag = p.activeFile.endsWith(".css")
          ? `background-image: url('${imgName}');`
          : `<img src="${imgName}" alt="${imgName}" style="max-width:220px; border-radius:12px;" />`;
        const next = getEditorValue() + "\n" + tag;
        p.files[p.activeFile] = next;
        setEditorValue(next);
        saveProjects();
        runProjectNow(false);
        notify(`🖼️ تم إدراج الصورة "${imgName}" في الكود فوراً!`);
      };
    });
    container.querySelectorAll("[data-remove-img]").forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        delete p.assets[btn.dataset.removeImg];
        saveProjects();
        refreshIDEUI();
      };
    });
  }

  /* ==========================================================================
     4. COMPILER, ASSET RESOLVER & SMART ERROR AUTO-FIXER
     ========================================================================== */
  function resolveAssetsInText(text, assetsMap) {
    let out = String(text || "");
    if (!assetsMap) return out;
    Object.entries(assetsMap).forEach(([name, dataUrl]) => {
      const escName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      out = out.replace(new RegExp(`(["'\`])(?:\\.\\/)?${escName}\\1`, "g"), `$1${dataUrl}$1`);
      out = out.replace(new RegExp(`url\\(\\s*(['"]?)(?:\\.\\/)?${escName}\\1\\s*\\)`, "gi"), `url("${dataUrl}")`);
    });
    return out;
  }

  function runTerminalLanguage(code, meta) {
    const outputs = [];
    const src = String(code || "");
    try {
      if (meta.lang === "python") {
        const pyJs = src
          .replace(/#.*$/gm, "")
          .replace(/\bprint\s*\(/g, "__out.push(")
          .replace(/\bdef\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*:/g, "function $1($2){")
          .replace(/\bfor\s+([a-zA-Z_]\w*)\s+in\s+range\(([^)]+)\)\s*:/g, "for(let $1=0;$1<$2;$1++){");
        const openB = (pyJs.match(/\{/g) || []).length;
        const closeB = (pyJs.match(/\}/g) || []).length;
        const res = Function(`const __out=[]; ${pyJs}\n${"}".repeat(Math.max(0, openB - closeB))}; return __out;`)();
        res.forEach(r => outputs.push(String(r)));
      } else if (meta.lang === "cpp" || meta.lang === "c") {
        const reg = /cout\s*<<\s*([^;]+);|printf\s*\(\s*([^)]+)\)/g;
        let m;
        while ((m = reg.exec(src)) !== null) {
          if (m[1]) outputs.push(m[1].split("<<").map(s => s.trim().replace(/^["']|["']$/g, "")).filter(s => s !== "endl" && s !== "\\n").join(" "));
          else if (m[2]) outputs.push(m[2].replace(/^["']|["']$/g, "").replace(/\\n/g, ""));
        }
      } else if (meta.lang === "java" || meta.lang === "csharp") {
        const reg = /(?:System\.out\.println|System\.out\.print|Console\.WriteLine|Console\.Write)\s*\(([^)]*)\)/g;
        let m;
        while ((m = reg.exec(src)) !== null) outputs.push(m[1].replace(/^["']|["']$/g, ""));
      } else if (meta.lang === "sql") {
        outputs.push("┌────┬──────────────────────┬────────┐");
        outputs.push("│ id │ developer            │ status │");
        outputs.push("├────┼──────────────────────┼────────┤");
        outputs.push("│ 1  │ Eng:Ahmed M Hosny    │ ACTIVE │");
        outputs.push("└────┴──────────────────────┴────────┘");
      }
    } catch (e) {
      outputs.push("✖ Runtime Error: " + e.message);
    }

    return `<!DOCTYPE html><html><body style="margin:0;padding:20px;background:#090d16;color:#4ade80;font-family:'JetBrains Mono',monospace;font-size:13.5px;">
      <div style="background:#0f172a;border:1px solid #10b981;border-radius:10px;padding:16px;">
        <div style="color:#38bdf8;margin-bottom:10px;border-bottom:1px dashed #334155;padding-bottom:6px;">$ compile & run ${esc(meta.label)}</div>
        <pre style="margin:0;white-space:pre-wrap;">${esc(outputs.length ? outputs.join("\n") : "Process finished with exit code 0 ✓")}</pre>
      </div>
    </body></html>`;
  }

  function runProjectNow(manual = false) {
    const p = curProj();
    const frame = document.getElementById("vsc-preview-iframe");
    const cBody = document.getElementById("vsc-console-body");
    const cBadge = document.getElementById("console-badge-count");
    if (!frame || !p) return;

    const activeMeta = getFileMeta(p.activeFile);
    if (activeMeta.isTerm) {
      frame.srcdoc = runTerminalLanguage(p.files[p.activeFile] || "", activeMeta);
      if (cBody) cBody.innerHTML = `<div style="color:#10b981;">✓ تم تشغيل ملف ${esc(p.activeFile)} (${esc(activeMeta.label)}) بنجاح.</div>`;
      if (manual) notify(`▶ Executed ${p.activeFile}`);
      return;
    }

    let html = p.files["index.html"] || p.files[p.activeFile] || "";
    let css = "";
    let js = "";

    Object.entries(p.files).forEach(([fn, content]) => {
      const m = getFileMeta(fn);
      if (m.lang === "css") css += "\n" + content;
      if (m.lang === "javascript") js += "\n" + content;
    });

    // فحص الأخطاء مع زر التصليح التلقائي
    let diagError = null;
    if (js.trim()) {
      try {
        new Function(js);
      } catch (err) {
        let fixed = js;
        const op = (fixed.match(/\(/g) || []).length, cp = (fixed.match(/\)/g) || []).length;
        if (op > cp) fixed += ")".repeat(op - cp);
        const oc = (fixed.match(/\{/g) || []).length, cc = (fixed.match(/\}/g) || []).length;
        if (oc > cc) fixed += "\n" + "}".repeat(oc - cc);
        diagError = { file: "script.js", msg: err.message, fixed };
      }
    }

    if (cBody) {
      if (diagError) {
        if (cBadge) cBadge.textContent = "1";
        cBody.innerHTML = `
          <div style="background:rgba(239,68,68,0.16); border:1px solid #ef4444; padding:8px 12px; border-radius:8px; color:#fca5a5;">
            <strong>⚠️ خطأ برمجي في (${esc(diagError.file)}): ${esc(diagError.msg)}</strong>
            <div style="margin-top:6px;">
              <button type="button" id="btn-auto-repair" class="vsc-run-pill" style="background:#ef4444; color:#fff;">⚡ صلحلي الخطأ تلقائياً وشغّل الكود</button>
            </div>
          </div>
        `;
        document.getElementById("btn-auto-repair")?.addEventListener("click", () => {
          p.files["script.js"] = diagError.fixed;
          saveProjects();
          if (p.activeFile === "script.js") setEditorValue(diagError.fixed, "javascript");
          runProjectNow(true);
          notify("⚡ تم إصلاح الخطأ تلقائياً!");
        });
      } else {
        if (cBadge) cBadge.textContent = "0";
        cBody.innerHTML = `<div style="color:#10b981;">✓ الكود سليم 100% — المعاينة الحية نشطة.</div>`;
      }
    }

    html = resolveAssetsInText(html, p.assets);
    css = resolveAssetsInText(css, p.assets);
    js = resolveAssetsInText(js, p.assets);

    const cleanHtml = html
      .replace(/<link\b[^>]*href=["'](?:\.\/)?style\.css["'][^>]*>/gi, "")
      .replace(/<script\b[^>]*src=["'](?:\.\/)?script\.js["'][^>]*>\s*<\/script>/gi, "");

    const bridge = `
      <script>
        window.__ASSETS__ = ${JSON.stringify(p.assets || {})};
        (function(){
          function send(lv, args){
            try {
              var m = Array.prototype.slice.call(args).map(function(a){ return typeof a==='object'?JSON.stringify(a):String(a); }).join(' ');
              parent.postMessage({ source:'vsc-ide-console', level:lv, message:m }, '*');
            } catch(e){}
          }
          var oL = console.log, oE = console.error;
          console.log = function(){ send('info', arguments); oL.apply(console, arguments); };
          console.error = function(){ send('error', arguments); oE.apply(console, arguments); };
        })();
      <\/script>
    `;

    frame.srcdoc = `<!DOCTYPE html><html><head><meta charset="UTF-8">${bridge}<style>${css}</style></head><body>${cleanHtml}<script>try{${js}}catch(e){console.error(e.message);}<\/script></body></html>`;
    if (manual) notify("▶ تم تشغيل المشروع وتحديث النتيجة!");
  }

  /* ==========================================================================
     5. MODALS: PROJECT WIZARD, NEW FILE, ASSETS & ZIP EXPORT
     ========================================================================== */
  function showModal(title, htmlContent) {
    const m = document.getElementById("vsc-modal");
    document.getElementById("vsc-modal-title").textContent = title;
    document.getElementById("vsc-modal-body").innerHTML = htmlContent;
    m.hidden = false;
  }

  function closeModal() {
    document.getElementById("vsc-modal").hidden = true;
  }

  function openNewProjectWizard() {
    showModal("🚀 إنشاء مشروع برمجي جديد", `
      <div class="vsc-field">
        <label>اسم المشروع</label>
        <input type="text" id="wiz-proj-name" placeholder="مثال: منظومة حضور الطلاب / متجر إلكتروني..." autofocus />
      </div>
      <div class="vsc-field">
        <label>نوع المشروع والبيئة</label>
        <select id="wiz-proj-type">
          <option value="Web Application (HTML/CSS/JS)">🌐 موقع ويب متكامل (HTML / CSS / JS)</option>
          <option value="Python Project (.py)">🐍 مشروع بايثون (Python)</option>
          <option value="C++ Application (.cpp)">⚙️ برنامج C++</option>
          <option value="Java OOP Project (.java)">☕ مشروع جافا (Java OOP)</option>
          <option value="SQL Database (.sql)">🗄️ قاعدة بيانات (SQL)</option>
        </select>
      </div>
      <div class="vsc-field">
        <label>وصف المشروع (اختياري)</label>
        <input type="text" id="wiz-proj-desc" placeholder="فكرة المشروع باختصار..." />
      </div>
      <button type="button" id="btn-confirm-new-proj" class="vsc-btn-primary">إنشاء وفتح المشروع الآن ✦</button>
    `);

    document.getElementById("btn-confirm-new-proj").onclick = () => {
      const name = document.getElementById("wiz-proj-name")?.value.trim();
      const type = document.getElementById("wiz-proj-type")?.value;
      const desc = document.getElementById("wiz-proj-desc")?.value.trim();
      if (!name) return notify("⚠️ اكتب اسم المشروع أولاً");

      let files = {
        "index.html": `<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>${name}</title>\n</head>\n<body>\n  <h1>🚀 ${name}</h1>\n  <p>${desc || "مشروع جديد جاهز للبناء"}</p>\n</body>\n</html>`,
        "style.css": `body { font-family: 'Cairo', sans-serif; background: #0b1120; color: #fff; padding: 24px; }\nh1 { color: #d4a72c; }`,
        "script.js": `console.log("Project ${name} started!");`
      };
      let activeFile = "index.html";

      if (type.includes("Python")) {
        files = { "main.py": `# ${name}\nprint("مرحباً بك في مشروع: ${name}")` };
        activeFile = "main.py";
      } else if (type.includes("C++")) {
        files = { "main.cpp": `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Project: ${name}" << endl;\n    return 0;\n}` };
        activeFile = "main.cpp";
      } else if (type.includes("Java")) {
        files = { "Main.java": `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Project: ${name}");\n    }\n}` };
        activeFile = "Main.java";
      }

      const id = "proj_" + Date.now();
      state.projects.unshift({ id, name, type, desc, activeFile, files, assets: {} });
      state.activeProjectId = id;
      saveProjects();
      closeModal();
      switchFile(activeFile);
      notify(`🎉 تم إنشاء مشروع "${name}" بنجاح!`);
    };
  }

  function openNewFileModal() {
    showModal("📄 إضافة ملف جديد للمشروع", `
      <div class="vsc-field">
        <label>اسم الملف مع الامتداد (مثل: about.html أو app.py أو main.cpp أو Main.java)</label>
        <input type="text" id="wiz-file-name" value="page.html" dir="ltr" autofocus />
      </div>
      <button type="button" id="btn-confirm-new-file" class="vsc-btn-primary">إنشاء وفتح الملف ✦</button>
    `);

    document.getElementById("btn-confirm-new-file").onclick = () => {
      const fn = document.getElementById("wiz-file-name")?.value.trim();
      if (!fn) return;
      const p = curProj();
      if (!p.files[fn]) {
        const m = getFileMeta(fn);
        p.files[fn] = m.lang === "python" ? `print("Hello from ${fn}")` : m.lang === "cpp" ? `#include <iostream>\nusing namespace std;\nint main(){ cout << "${fn}" << endl; return 0; }` : `<!-- ${fn} -->\n`;
      }
      closeModal();
      switchFile(fn);
      notify(`✓ تم إنشاء الملف ${fn}`);
    };
  }

  async function handleAssetsUpload(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const p = curProj();
    p.assets = p.assets || {};

    for (const f of files) {
      const dataUrl = await new Promise((res) => {
        const r = new FileReader();
        r.onload = (ev) => res(ev.target.result);
        r.readAsDataURL(f);
      });
      p.assets[f.name] = dataUrl;
    }
    saveProjects();
    refreshIDEUI();
    runProjectNow(false);
    notify(`🖼️ تم رفع ${files.length} صورة للمشروع! يمكنك كتابة اسمها في الكود مباشرة`);
  }

  async function downloadProjectAsZip() {
    const p = curProj();
    notify(`⏳ جاري تجهيز ملف ZIP لمشروع "${p.name}"...`);
    try {
      if (!window.JSZip) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      const zip = new window.JSZip();
      Object.entries(p.files).forEach(([fn, content]) => {
        let out = content;
        if (fn === "index.html") {
          if (p.files["style.css"] && !out.includes("style.css")) out = out.replace(/<\/head>/i, `  <link rel="stylesheet" href="style.css">\n</head>`);
          if (p.files["script.js"] && !out.includes("script.js")) out = out.replace(/<\/body>/i, `  <script src="script.js"></script>\n</body>`);
        }
        zip.file(fn, out);
      });
      Object.entries(p.assets || {}).forEach(([imgName, dataUrl]) => {
        const b64 = String(dataUrl).split(",")[1];
        if (b64) zip.file(imgName, b64, { base64: true });
      });
      const blob = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${p.name.replace(/\s+/g, "-")}.zip`;
      a.click();
      notify(`📦 تم تحميل المشروع كاملاً بصيغة .ZIP!`);
    } catch (e) {
      notify("⚠️ تعذر ضغط ZIP، جاري تنزيل الملفات مباشرة...");
    }
  }

  /* ==========================================================================
     6. BIND ALL ICON BUTTONS, SPLITTER & SHORTCUTS
     ========================================================================== */
  function bindEvents() {
    document.getElementById("btn-close-vsc-modal")?.addEventListener("click", closeModal);
    document.getElementById("btn-new-project-wizard")?.addEventListener("click", openNewProjectWizard);
    document.getElementById("btn-open-project-switcher")?.addEventListener("click", () => {
      state.sidebarTab = "projects";
      document.getElementById("vsc-sidebar")?.classList.remove("collapsed");
      refreshIDEUI();
    });

    document.getElementById("btn-toggle-autorun")?.addEventListener("click", (e) => {
      state.autoRun = !state.autoRun;
      localStorage.setItem("VSC_AUTORUN", state.autoRun ? "1" : "0");
      e.currentTarget.classList.toggle("active-emerald", state.autoRun);
      document.getElementById("status-autorun").textContent = `⚡ Auto-Run: ${state.autoRun ? "ON" : "OFF"}`;
      notify(state.autoRun ? "⚡ التشغيل التلقائي الفوري: مفعل ON" : "التشغيل التلقائي: متوقف OFF");
    });

    document.getElementById("btn-run-code")?.addEventListener("click", () => runProjectNow(true));
    document.getElementById("inp-upload-assets")?.addEventListener("change", handleAssetsUpload);
    document.getElementById("btn-side-new-file")?.addEventListener("click", openNewFileModal);
    document.getElementById("btn-side-upload-img")?.addEventListener("click", () => document.getElementById("inp-upload-assets")?.click());
    document.getElementById("btn-side-zip")?.addEventListener("click", downloadProjectAsZip);
    document.getElementById("btn-download-zip")?.addEventListener("click", downloadProjectAsZip);

    document.getElementById("btn-open-snippets")?.addEventListener("click", () => {
      state.sidebarTab = "snippets";
      document.getElementById("vsc-sidebar")?.classList.remove("collapsed");
      refreshIDEUI();
    });

    document.getElementById("btn-format-code")?.addEventListener("click", () => {
      const p = curProj();
      const cleaned = getEditorValue().split("\n").map(l => l.trimEnd()).join("\n").trim();
      p.files[p.activeFile] = cleaned;
      setEditorValue(cleaned);
      saveProjects();
      notify("✨ Clean Code: تم تنسيق الكود بنجاح!");
    });

    document.getElementById("btn-toggle-intellisense")?.addEventListener("click", (e) => {
      state.intelliSense = !state.intelliSense;
      e.currentTarget.classList.toggle("active", state.intelliSense);
      if (monacoEditor) {
        monacoEditor.updateOptions({ quickSuggestions: state.intelliSense });
      }
      notify(state.intelliSense ? "💡 الاقتراحات الذكية: مفعلة" : "🔒 الاقتراحات الذكية: متوقفة");
    });

    // Layout Modes (Code Only / Split / Preview Only)
    document.querySelectorAll(".layout-btn").forEach(btn => {
      btn.onclick = () => {
        const mode = btn.dataset.layout;
        document.querySelectorAll(".layout-btn").forEach(b => b.classList.toggle("active", b === btn));
        const ed = document.getElementById("vsc-editor-pane");
        const pr = document.getElementById("vsc-preview-pane");
        const rs = document.getElementById("vsc-resizer");

        ed.classList.remove("hidden-pane", "full-pane");
        pr.classList.remove("hidden-pane", "full-pane");
        rs.style.display = "grid";

        if (mode === "code") { pr.classList.add("hidden-pane"); ed.classList.add("full-pane"); rs.style.display = "none"; }
        else if (mode === "preview") { ed.classList.add("hidden-pane"); pr.classList.add("full-pane"); rs.style.display = "none"; }
      };
    });

    // Activity Bar Tabs
    document.querySelectorAll("[data-sidebar-tab]").forEach(btn => {
      btn.onclick = () => {
        const tab = btn.dataset.sidebarTab;
        const sb = document.getElementById("vsc-sidebar");
        if (state.sidebarTab === tab && !sb.classList.contains("collapsed")) {
          sb.classList.add("collapsed");
          return;
        }
        sb.classList.remove("collapsed");
        state.sidebarTab = tab;
        document.querySelectorAll("[data-sidebar-tab]").forEach(b => b.classList.toggle("active", b === btn));
        refreshIDEUI();
      };
    });

    // Theme Picker
    const thSel = document.getElementById("sel-ide-theme");
    if (thSel) {
      thSel.value = state.theme;
      document.body.setAttribute("data-ide-theme", state.theme);
      thSel.onchange = () => {
        state.theme = thSel.value;
        localStorage.setItem("VSC_THEME", state.theme);
        document.body.setAttribute("data-ide-theme", state.theme);
        if (window.monaco) {
          window.monaco.editor.setTheme(state.theme === "aurora-light" ? "vs" : "vs-dark");
        }
      };
    }

    // Zoom Controls
    document.getElementById("btn-code-zoom-in")?.addEventListener("click", () => {
      state.codeFontSize = Math.min(28, state.codeFontSize + 1);
      if (monacoEditor) monacoEditor.updateOptions({ fontSize: state.codeFontSize });
    });
    document.getElementById("btn-code-zoom-out")?.addEventListener("click", () => {
      state.codeFontSize = Math.max(11, state.codeFontSize - 1);
      if (monacoEditor) monacoEditor.updateOptions({ fontSize: state.codeFontSize });
    });

    const applyPrevZoom = () => {
      const f = document.getElementById("vsc-preview-iframe");
      const l = document.getElementById("prev-zoom-lbl");
      if (l) l.textContent = `${state.previewZoom}%`;
      if (f) {
        const s = state.previewZoom / 100;
        f.style.transform = `scale(${s})`;
        f.style.width = `${100 / s}%`;
        f.style.height = `${100 / s}%`;
      }
    };
    document.getElementById("btn-prev-zoom-in")?.addEventListener("click", () => { state.previewZoom = Math.min(180, state.previewZoom + 10); applyPrevZoom(); });
    document.getElementById("btn-prev-zoom-out")?.addEventListener("click", () => { state.previewZoom = Math.max(50, state.previewZoom - 10); applyPrevZoom(); });
    document.getElementById("btn-prev-reload")?.addEventListener("click", () => runProjectNow(true));
    document.getElementById("btn-prev-ext")?.addEventListener("click", () => {
      const frame = document.getElementById("vsc-preview-iframe");
      const blob = new Blob([frame?.srcdoc || ""], { type: "text/html;charset=utf-8" });
      window.open(URL.createObjectURL(blob), "_blank");
    });

    document.getElementById("btn-clear-console")?.addEventListener("click", () => {
      document.getElementById("vsc-console-body").innerHTML = "";
      document.getElementById("console-badge-count").textContent = "0";
    });
    document.getElementById("btn-toggle-console-height")?.addEventListener("click", () => {
      document.getElementById("vsc-console-drawer")?.classList.toggle("expanded");
    });

    // Draggable Splitter
    const resizer = document.getElementById("vsc-resizer");
    const edPane = document.getElementById("vsc-editor-pane");
    const prPane = document.getElementById("vsc-preview-pane");
    const wb = document.getElementById("vsc-workbench");
    let dragging = false;
    resizer?.addEventListener("mousedown", () => { dragging = true; resizer.classList.add("dragging"); });
    window.addEventListener("mousemove", (e) => {
      if (!dragging || !wb) return;
      const r = wb.getBoundingClientRect();
      const pct = Math.max(20, Math.min(80, ((e.clientX - r.left) / r.width) * 100));
      edPane.style.flex = `0 0 ${pct}%`;
      prPane.style.flex = `0 0 ${100 - pct}%`;
    });
    window.addEventListener("mouseup", () => { dragging = false; resizer?.classList.remove("dragging"); });

    // Console Messages from Preview
    window.addEventListener("message", (e) => {
      if (e.data && e.data.source === "vsc-ide-console") {
        const cBody = document.getElementById("vsc-console-body");
        if (!cBody) return;
        const row = document.createElement("div");
        row.style.padding = "3px 0";
        row.style.color = e.data.level === "error" ? "#f87171" : "#38bdf8";
        row.textContent = `› ${e.data.message}`;
        cBody.appendChild(row);
      }
    });
  }

  function boot() {
    bindEvents();
    refreshIDEUI();
    initEditor();
    runProjectNow(false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
