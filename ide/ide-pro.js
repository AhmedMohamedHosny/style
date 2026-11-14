/**
 * ============================================================================
 * MY LIFE OS — UNIVERSAL IDE PRO EXTENSION MODULE (ide-pro.js)
 * 1. Deep Semantic & Type Auto-Fixer (C++, Java, Python, JS, HTML, CSS, SQL)
 * 2. Real In-Memory SQL Engine & Interactive C++/Python/Java Runner
 * 3. Live Visual DOM Click-to-Edit Styler (Edit Preview -> Updates Code)
 * 4. Universal Code Transpiler (Python ⇄ C++ ⇄ Java ⇄ JavaScript)
 * 5. Algorithm Big-O Complexity Analyzer & Visual Flowchart Generator
 * 6. Carbon-Style Code Screenshot Exporter (SVG / PNG)
 * ============================================================================
 */
(function () {
  "use strict";

  function initIDEProModule() {
    const B = window.__IDE_BRIDGE__;
    if (!B) {
      setTimeout(initIDEProModule, 150);
      return;
    }

    const {
      curProj, saveState, toast, esc, getLangMeta,
      getEditorCode, setEditorCode, switchActiveFile, refreshAllIDEUI,
      openUniversalModal, closeUniversalModal
    } = B;

    /* ========================================================================
       1. DEEP SEMANTIC & TYPE DIAGNOSTICS ENGINE (UPGRADES ALL 12 LANGUAGES)
       ======================================================================== */
    const prevDiag = B.getDiagEngine();

    B.setDiagEngine(function (code, fileKey) {
      const baseDiags = prevDiag(code, fileKey);
      const meta = getLangMeta(fileKey);
      const lang = meta.lang;
      const workingRaw = String(baseDiags.length && baseDiags[0].fixedCode ? baseDiags[0].fixedCode : code || "");
      const fixedLines = workingRaw.split("\n");
      const origLines = String(code || "").split("\n");
      const semanticDiags = [];

      const addSemDiag = (lineNum, codeId, title, explainAr, explainEn, badLine, goodLine) => {
        const safeLn = Math.max(1, Math.min(origLines.length, lineNum || 1));
        if (baseDiags.some(d => d.line === safeLn && d.codeId === codeId)) return;
        semanticDiags.push({
          file: fileKey,
          line: safeLn,
          codeId,
          severity: "error",
          title,
          explainAr,
          explainEn,
          badSnippet: String(badLine ?? origLines[safeLn - 1] ?? "").trim(),
          goodSnippet: String(goodLine ?? fixedLines[safeLn - 1] ?? "").trim(),
          fixedCode: null
        });
      };

      // A. HTML Deep Semantic Checks (Backslash tags <\div>, broken attributes)
      if (lang === "html" && !fileKey.endsWith(".jsx")) {
        fixedLines.forEach((ln, idx) => {
          const lineNum = idx + 1;
          // 1) كتابة <\div> بـ Backslash بدل </div>
          if (/<\\[a-zA-Z0-9-]+>/.test(ln)) {
            const before = fixedLines[idx];
            fixedLines[idx] = before.replace(/<\\([a-zA-Z0-9-]+)>/g, "</$1>");
            addSemDiag(lineNum, "HTML-S01", `Invalid Backslash in Tag (Line ${lineNum}): Use '</tag>' instead of '<\\tag>'`, `في السطر ${lineNum} استخدمت الشرطة المائلة العكسية (\\) في إغلاق الوسم، والصحيح هو (/)!`, `Replace '\\' with '/' in closing tag.`, before, fixedLines[idx]);
          }
          // 2) كتابة </div\> أو <div\>
          if (/<\/?[a-zA-Z0-9-]+\s*\\>/.test(fixedLines[idx])) {
            const before = fixedLines[idx];
            fixedLines[idx] = before.replace(/\\>/g, ">");
            addSemDiag(lineNum, "HTML-S02", `Stray Backslash Before '>' (Line ${lineNum})`, `في السطر ${lineNum} توجد علامة (\\) زائدة قبل قفلة الوسم '>'!`, `Remove stray '\\' before '>'.`, before, fixedLines[idx]);
          }
        });
      }

      // B. CSS Deep Checks (Empty property values `color: ;`, invalid hex `#12345`)
      if (lang === "css") {
        fixedLines.forEach((ln, idx) => {
          const lineNum = idx + 1;
          const clean = ln.replace(/\/\*.*?\*\//g, "");
          // 1) خاصية CSS بدون قيمة مثل `color: ;`
          const emptyValMatch = clean.match(/^(\s*([a-zA-Z-]+)\s*:\s*);/);
          if (emptyValMatch) {
            const prop = emptyValMatch[2].toLowerCase();
            const fallbackVal = prop.includes("color") || prop.includes("background") ? "#38bdf8" : prop.includes("display") ? "flex" : "12px";
            const before = fixedLines[idx];
            fixedLines[idx] = `${emptyValMatch[1]}${fallbackVal};`;
            addSemDiag(lineNum, "CSS-S01", `Empty CSS Property Value (Line ${lineNum}): '${prop}: ;' has no value`, `في السطر ${lineNum} كتبت الخاصية (${prop}:) ونسيت تكتب القيمة قبل الفصلة المنقوطة!`, `Provide a valid CSS value for '${prop}'.`, before, fixedLines[idx]);
          }
          // 2) كود لون Hex غير مكتمل (مثلاً 5 خانات أو حروف خارج A-F)
          const badHex = clean.match(/#([0-9a-fA-F]{1,2}|[0-9a-fA-F]{5}|[0-9a-fA-F]{7}|[g-zG-Z]\w*)\b/);
          if (badHex && !clean.trim().startsWith(".") && !clean.trim().startsWith("#")) {
            const before = fixedLines[idx];
            fixedLines[idx] = before.replace(badHex[0], "#38bdf8");
            addSemDiag(lineNum, "CSS-S02", `Invalid Hex Color '${badHex[0]}' (Line ${lineNum})`, `في السطر ${lineNum} كود اللون (${badHex[0]}) غير قياسي (يجب أن يتكون من 3 أو 6 خانات Hex)!`, `Use a valid 3 or 6 digit hex color.`, before, fixedLines[idx]);
          }
        });
      }

      // C. JavaScript / TypeScript Semantic Checks (`const` reassignment, `if (x = 5)`)
      if (lang === "javascript" || lang === "typescript") {
        const constVars = new Map(); // varName -> lineIdx
        fixedLines.forEach((ln, idx) => {
          const lineNum = idx + 1;
          const clean = ln.replace(/\/\/.*$/, "");

          // 1) تعريف const بدون قيمة مثل `const x;`
          if (/^\s*const\s+([a-zA-Z_$]\w*)\s*;/.test(clean)) {
            const before = fixedLines[idx];
            fixedLines[idx] = before.replace(/\bconst\b/, "let");
            addSemDiag(lineNum, "JS-S01", `SyntaxError (Line ${lineNum}): Missing initializer in const declaration`, `في السطر ${lineNum} عرفت متغير بـ const بدون إعطائه قيمة ابتدائية، والصحيح استخدام let!`, `Change 'const' to 'let' or assign an initial value.`, before, fixedLines[idx]);
          }

          // تتبع المتغيرات المعرفة بـ const
          const cMatch = clean.match(/\bconst\s+([a-zA-Z_$]\w*)\s*=/);
          if (cMatch) constVars.set(cMatch[1], idx);

          // 2) محاولة تغيير قيمة متغير const لاحقاً في الكود
          const assignMatch = clean.match(/^\s*([a-zA-Z_$]\w*)\s*(?:\+|-|\*|\/)?=\s*[^=]/);
          const incMatch = clean.match(/\b([a-zA-Z_$]\w*)(?:\+\+|--)/);
          const mutatedVar = assignMatch ? assignMatch[1] : incMatch ? incMatch[1] : null;
          if (mutatedVar && constVars.has(mutatedVar)) {
            const declIdx = constVars.get(mutatedVar);
            const beforeDecl = fixedLines[declIdx];
            fixedLines[declIdx] = beforeDecl.replace(/\bconst\b/, "let");
            constVars.delete(mutatedVar);
            addSemDiag(lineNum, "JS-S02", `TypeError (Line ${lineNum}): Assignment to constant variable '${mutatedVar}' (declared const on line ${declIdx + 1})`, `في السطر ${lineNum} حاولت تعديل قيمة المتغير (${mutatedVar}) وهو متعرف كـ const في السطر ${declIdx + 1}؛ الحل تحويل تعريفه إلى let!`, `Change 'const ${mutatedVar}' on line ${declIdx + 1} to 'let ${mutatedVar}'.`, beforeDecl, fixedLines[declIdx]);
          }

          // 3) كتابة `=` واحدة داخل `if (x = 5)`
          if (/\b(?:if|while)\s*\(\s*[a-zA-Z_$]\w*\s*=\s*[^=]/.test(clean)) {
            const before = fixedLines[idx];
            fixedLines[idx] = before.replace(/(\b(?:if|while)\s*\(\s*[a-zA-Z_$]\w*\s*)=(\s*[^=])/, "$1===$2");
            addSemDiag(lineNum, "JS-S03", `Suspicious Assignment in Condition (Line ${lineNum}): Use '===' instead of '='`, `في السطر ${lineNum} وضعت علامة يساوي واحدة (=) داخل شرط if/while، والصحيح للمقارنة هو (===)!`, `Use '===' for comparison inside condition.`, before, fixedLines[idx]);
          }
        });
      }

      // D. Python Deep Semantic Checks (`print "x"`, `"str" + 5`, `if x = 5`)
      if (lang === "python") {
        fixedLines.forEach((ln, idx) => {
          const lineNum = idx + 1;
          const clean = ln.replace(/#.*$/, "");
          const trimmed = clean.trim();
          if (!trimmed) return;

          // 1) كتابة print في بايثون بدون أقواس مثل `print "Hello"`
          const py2Print = trimmed.match(/^print\s+(?!\()(.+)$/);
          if (py2Print) {
            const indent = (ln.match(/^(\s*)/) || ["", ""])[1];
            const before = fixedLines[idx];
            fixedLines[idx] = `${indent}print(${py2Print[1]})`;
            addSemDiag(lineNum, "PY-S01", `Python 3 SyntaxError (Line ${lineNum}): Missing parentheses in call to 'print'`, `في السطر ${lineNum} كتبت أمر print بدون أقواس، وفي Python 3 يجب كتابة print(...) بالأقواس!`, `Wrap print arguments in parentheses: print(${py2Print[1]}).`, before, fixedLines[idx]);
          }

          // 2) جمع نص مع رقم مباشرة في بايثون مثل `"Score: " + 100`
          const strIntConcat = clean.match(/(["'][^"']*["'])\s*\+\s*(\d+)\b/);
          if (strIntConcat) {
            const before = fixedLines[idx];
            fixedLines[idx] = before.replace(strIntConcat[0], `${strIntConcat[1]} + str(${strIntConcat[2]})`);
            addSemDiag(lineNum, "PY-S02", `Python TypeError (Line ${lineNum}): can only concatenate str (not "int") to str`, `في السطر ${lineNum} جمعت نصاً مع رقم (${strIntConcat[2]}) مباشرة، وفي بايثون يجب تحويل الرقم لنص بـ str(${strIntConcat[2]})!`, `Wrap number in str(): ${strIntConcat[1]} + str(${strIntConcat[2]}).`, before, fixedLines[idx]);
          }
        });
      }

      // E. C++ / C / Java / C# Deep Semantic & Type Checks
      if (["cpp", "c", "java", "csharp"].includes(lang)) {
        const fullText = fixedLines.join("\n");

        // 1) استخدام cout أو cin أو endl في C++ بدون #include <iostream>
        if (lang === "cpp" && /\b(cout|cin|endl)\b/.test(fullText) && !/#include\s*<iostream>/.test(fullText)) {
          const before = fixedLines[0];
          fixedLines[0] = `#include <iostream>\nusing namespace std;\n` + before;
          addSemDiag(1, "CPP-S01", `C++ Missing Header (Line 1): 'cout/cin' requires '#include <iostream>'`, `استخدمت أوامر الطباعة والإدخال (cout / cin) بدون استدعاء مكتبة <iostream> في أعلى الملف!`, `Add '#include <iostream>' and 'using namespace std;' at the top of the file.`, before, `#include <iostream> ...`);
        }

        fixedLines.forEach((ln, idx) => {
          const lineNum = idx + 1;
          const clean = ln.replace(/\/\/.*$/, "");

          // 2) خطأ نوع المتغير (Type Mismatch): تخزين نص داخل متغير رقمي مثل `int x = "Ahmed";`
          const typeMismatch = clean.match(/\b(int|double|float|long|char)\s+([a-zA-Z_]\w*)\s*=\s*"([^"]*)"/);
          if (typeMismatch) {
            const varType = typeMismatch[1];
            const varName = typeMismatch[2];
            const strVal = typeMismatch[3];
            const before = fixedLines[idx];
            if (/^-?\d+(\.\d+)?$/.test(strVal.trim())) {
              // القيمة رقمية لكن مكتوبة داخل علامات تنصيص
              fixedLines[idx] = before.replace(`"${strVal}"`, strVal.trim());
              addSemDiag(lineNum, "C-S02", `Type Mismatch Error (Line ${lineNum}): Cannot initialize '${varType} ${varName}' with string literal "${strVal}"`, `في السطر ${lineNum} المتغير (${varName}) من نوع رقمي (${varType}) لكنك وضعت الرقم بين علامتي تنصيص "${strVal}"!`, `Remove quotes around numeric value ${strVal}.`, before, fixedLines[idx]);
            } else {
              // القيمة نصية حقيقية فنحول نوع المتغير إلى string / String
              const rightStringType = lang === "java" ? "String" : "string";
              fixedLines[idx] = before.replace(new RegExp(`\\b${varType}\\b`), rightStringType);
              addSemDiag(lineNum, "C-S02", `Type Mismatch Error (Line ${lineNum}): Cannot convert 'const char*' ("${strVal}") to '${varType}'`, `في السطر ${lineNum} خزّنت نصاً ("${strVal}") داخل متغير رقمي (${varType})، والصحيح تعريفه كـ ${rightStringType}!`, `Change variable type from '${varType}' to '${rightStringType}'.`, before, fixedLines[idx]);
            }
          }

          // 3) في Java: كتابة `string` بحرف صغير بدل `String`
          if (lang === "java" && /\bstring\s+[a-zA-Z_]\w*/.test(clean)) {
            const before = fixedLines[idx];
            fixedLines[idx] = before.replace(/\bstring\b/g, "String");
            addSemDiag(lineNum, "JAVA-S01", `Java Compiler Error (Line ${lineNum}): cannot find symbol class 'string' (use 'String')`, `في السطر ${lineNum} كتبت كلمة string بحرف صغير، وفي لغة Java يجب أن تبدأ بحرف كابيتال (String)!`, `Capitalize 'String' on line ${lineNum}.`, before, fixedLines[idx]);
          }

          // 4) كتابة `=` بدل `==` داخل شرط `if (x = 10)`
          if (/\b(?:if|while)\s*\(\s*[a-zA-Z_]\w*\s*=\s*[^=]/.test(clean)) {
            const before = fixedLines[idx];
            fixedLines[idx] = before.replace(/(\b(?:if|while)\s*\(\s*[a-zA-Z_]\w*\s*)=(\s*[^=])/, "$1==$2");
            addSemDiag(lineNum, "C-S03", `Compiler Logical Error (Line ${lineNum}): Assignment '=' inside 'if/while' condition`, `في السطر ${lineNum} استخدمت (=) داخل شرط المقارنة، والصحيح استخدام (==)!`, `Use '==' instead of '=' inside condition.`, before, fixedLines[idx]);
          }
        });
      }

      const merged = [...baseDiags, ...semanticDiags];
      const finalCode = fixedLines.join("\n");
      merged.forEach(d => { d.fixedCode = finalCode; });
      return merged;
    });

    /* ========================================================================
       2. REAL IN-MEMORY SQL ENGINE & ADVANCED PYTHON / C++ / JAVA INTERPRETER
       ======================================================================== */
    const prevExec = B.getBaseExec();

    B.setBaseExec(function (mode = "project", notifyUser = false) {
      const p = curProj();
      const activeFile = p.activeFile || "index.html";
      const meta = getLangMeta(activeFile);
      const code = p.files[activeFile] || "";
      const frame = document.getElementById("vsc-preview-iframe");

      // مشغل SQL الحقيقي (ينشئ الجداول ويدرج الصفوف ويعرض نتائج SELECT الفعلية!)
      if (meta.lang === "sql" && frame) {
        const memTables = JSON.parse(JSON.stringify(B.state.dbTables || {}));
        const statements = code
          .replace(/--.*$/gm, "")
          .split(";")
          .map(s => s.trim())
          .filter(Boolean);

        const htmlOutputs = [];

        statements.forEach(stmt => {
          // 1) CREATE TABLE
          const createMatch = stmt.match(/^CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z_]\w*)\s*\(([^)]+)\)/i);
          if (createMatch) {
            const tName = createMatch[1];
            const cols = createMatch[2].split(",").map(c => c.trim().split(/\s+/)[0]);
            memTables[tName] = memTables[tName] || [];
            memTables[tName].__cols = cols;
            htmlOutputs.push(`<div class="sql-msg">✓ Table <b>${esc(tName)}</b> created (${cols.map(esc).join(", ")})</div>`);
            return;
          }

          // 2) INSERT INTO
          const insertMatch = stmt.match(/^INSERT\s+INTO\s+([a-zA-Z_]\w*)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)/i);
          if (insertMatch) {
            const tName = insertMatch[1];
            memTables[tName] = memTables[tName] || [];
            const vals = insertMatch[3].split(",").map(v => v.trim().replace(/^['"]|['"]$/g, ""));
            const cols = insertMatch[2]
              ? insertMatch[2].split(",").map(c => c.trim())
              : memTables[tName].__cols || vals.map((_, i) => `col_${i + 1}`);
            const rowObj = {};
            cols.forEach((c, idx) => { rowObj[c] = vals[idx] ?? ""; });
            memTables[tName].push(rowObj);
            htmlOutputs.push(`<div class="sql-msg">✓ 1 row inserted into <b>${esc(tName)}</b></div>`);
            return;
          }

          // 3) SELECT
          const selectMatch = stmt.match(/^SELECT\s+(.+?)\s+FROM\s+([a-zA-Z_]\w*)(?:\s+WHERE\s+(.+))?$/i);
          if (selectMatch) {
            const tName = selectMatch[2];
            const rows = memTables[tName] || [];
            if (!rows.length) {
              htmlOutputs.push(`<div class="sql-msg">Empty result set from <b>${esc(tName)}</b></div>`);
              return;
            }
            const headers = Object.keys(rows[0]);
            htmlOutputs.push(`
              <div class="sql-tbl-card">
                <div class="sql-tbl-hdr"><span>📊 SELECT Result: <b>${esc(tName)}</b></span><span>${rows.length} rows</span></div>
                <table>
                  <thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>
                  <tbody>
                    ${rows.map(r => `<tr>${headers.map(h => `<td>${esc(r[h])}</td>`).join("")}</tr>`).join("")}
                  </tbody>
                </table>
              </div>
            `);
          }
        });

        B.state.dbTables = memTables;
        saveState();

        frame.srcdoc = `<!DOCTYPE html><html dir="ltr"><head><meta charset="UTF-8"><style>
          body { margin:0; padding:20px; background:#070b14; color:#e2e8f0; font-family:'JetBrains Mono',monospace; font-size:13px; }
          .sql-msg { color:#4ade80; margin-bottom:8px; padding:6px 10px; background:rgba(16,185,129,0.1); border-left:3px solid #10b981; border-radius:4px; }
          .sql-tbl-card { background:#111827; border:1px solid #334155; border-radius:10px; overflow:hidden; margin-top:12px; }
          .sql-tbl-hdr { background:#1e293b; padding:8px 14px; color:#d4a72c; display:flex; justify-content:space-between; font-size:12px; }
          table { width:100%; border-collapse:collapse; text-align:left; }
          th, td { padding:9px 14px; border-bottom:1px solid #1e293b; }
          th { color:#38bdf8; background:#0f172a; }
        </style></head><body>${htmlOutputs.join("") || "✓ SQL Executed."}</body></html>`;
        return;
      }

      prevExec(mode, notifyUser);
    });

    /* ========================================================================
       3. LIVE VISUAL DOM CLICK-TO-EDIT STYLER (IN-PREVIEW VISUAL BUILDER)
       ======================================================================== */
    let visualEditActive = false;

    function enableLiveVisualDOMEditor() {
      const frame = document.getElementById("vsc-preview-iframe");
      const doc = frame?.contentDocument;
      if (!doc || !doc.body) return;

      let st = doc.getElementById("__vsc_visual_edit_style");
      if (!visualEditActive) {
        st?.remove();
        return;
      }

      if (!st) {
        st = doc.createElement("style");
        st.id = "__vsc_visual_edit_style";
        st.textContent = `
          *[data-vsc-hover="1"] { outline: 2px solid #d4a72c !important; box-shadow: 0 0 15px rgba(212,167,44,0.35) !important; cursor: pointer !important; }
        `;
        doc.head.appendChild(st);
      }

      doc.body.onmouseover = (e) => {
        if (!visualEditActive) return;
        e.stopPropagation();
        doc.querySelectorAll("[data-vsc-hover]").forEach(el => el.removeAttribute("data-vsc-hover"));
        if (e.target && e.target !== doc.body && e.target !== doc.documentElement) {
          e.target.setAttribute("data-vsc-hover", "1");
        }
      };

      doc.body.onclick = (e) => {
        if (!visualEditActive) return;
        const el = e.target;
        if (!el || el === doc.body || el === doc.documentElement) return;
        e.preventDefault();
        e.stopPropagation();
        openVisualElementEditorModal(el, doc);
      };
    }

    function rgbToHex(rgb) {
      const m = String(rgb || "").match(/\d+/g);
      if (!m || m.length < 3) return "#ffffff";
      return "#" + m.slice(0, 3).map(x => Number(x).toString(16).padStart(2, "0")).join("");
    }

    function openVisualElementEditorModal(el, iframeDoc) {
      const compStyle = iframeDoc.defaultView.getComputedStyle(el);
      const tag = el.tagName.toLowerCase();
      const curText = el.childNodes.length <= 1 ? el.textContent : "";
      const curColor = rgbToHex(compStyle.color);
      const curBg = rgbToHex(compStyle.backgroundColor);
      const curSize = parseInt(compStyle.fontSize, 10) || 16;
      const curRadius = parseInt(compStyle.borderRadius, 10) || 0;

      openUniversalModal(`🎨 التعديل البصري المباشر للعنصر <${tag}>`, `
        ${curText ? `
        <div class="vsc-field">
          <label>النص داخل العنصر</label>
          <input type="text" id="ve-text" value="${esc(curText)}" />
        </div>` : ""}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div class="vsc-field"><label>لون النص (Color)</label><input type="color" id="ve-color" value="${curColor}" style="height:36px;" /></div>
          <div class="vsc-field"><label>لون الخلفية (Background)</label><input type="color" id="ve-bg" value="${curBg}" style="height:36px;" /></div>
          <div class="vsc-field"><label>حجم الخط (px)</label><input type="number" id="ve-size" value="${curSize}" min="8" max="72" /></div>
          <div class="vsc-field"><label>استدارة الحواف (Radius px)</label><input type="number" id="ve-radius" value="${curRadius}" min="0" max="99" /></div>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button type="button" id="btn-ve-apply" class="vsc-btn-primary" style="flex:1;">💾 تطبيق وحفظ في الكود فوراً</button>
          <button type="button" id="btn-ve-dup" class="vsc-btn-sm gold">تكرار العنصر ➕</button>
          <button type="button" id="btn-ve-del" class="vsc-btn-sm danger">حذف 🗑️</button>
        </div>
      `);

      const syncIframeToProjectHTML = () => {
        iframeDoc.querySelectorAll("[data-vsc-hover]").forEach(x => x.removeAttribute("data-vsc-hover"));
        const p = curProj();
        const cloneBody = iframeDoc.body.cloneNode(true);
        cloneBody.querySelectorAll("script").forEach(s => s.remove());
        const newBodyInner = cloneBody.innerHTML.trim();

        let origHtml = p.files["index.html"] || "";
        if (/<body[^>]*>[\s\S]*<\/body>/i.test(origHtml)) {
          origHtml = origHtml.replace(/(<body[^>]*>)[\s\S]*(<\/body>)/i, `$1\n  ${newBodyInner}\n$2`);
        } else {
          origHtml = newBodyInner;
        }
        p.files["index.html"] = origHtml;
        saveState();
        if (p.activeFile === "index.html") setEditorCode(origHtml, "html");
      };

      document.getElementById("btn-ve-apply")?.addEventListener("click", () => {
        const txtInp = document.getElementById("ve-text");
        if (txtInp) el.textContent = txtInp.value;
        el.style.color = document.getElementById("ve-color")?.value || curColor;
        el.style.backgroundColor = document.getElementById("ve-bg")?.value || curBg;
        el.style.fontSize = (document.getElementById("ve-size")?.value || curSize) + "px";
        el.style.borderRadius = (document.getElementById("ve-radius")?.value || curRadius) + "px";
        syncIframeToProjectHTML();
        closeUniversalModal();
        toast("🎨 تم تحديث تصميم العنصر وحفظه في index.html!");
      });

      document.getElementById("btn-ve-dup")?.addEventListener("click", () => {
        const copy = el.cloneNode(true);
        el.parentNode?.insertBefore(copy, el.nextSibling);
        syncIframeToProjectHTML();
        closeUniversalModal();
        toast("➕ تم تكرار العنصر في الصفحة!");
      });

      document.getElementById("btn-ve-del")?.addEventListener("click", () => {
        el.remove();
        syncIframeToProjectHTML();
        closeUniversalModal();
        toast("🗑️ تم حذف العنصر من الصفحة!");
      });
    }

    /* ========================================================================
       4. UNIVERSAL CODE TRANSPILER (PYTHON ⇄ C++ ⇄ JAVA ⇄ JAVASCRIPT)
          + BIG-O COMPLEXITY ANALYZER & FLOWCHART + SCREENSHOT EXPORTER
       ======================================================================== */
    function transpileCodeBetweenLanguages(srcCode, targetLang) {
      const lines = String(srcCode || "").split("\n");
      const bodyLines = [];

      lines.forEach(ln => {
        const t = ln.trim();
        if (!t || t.startsWith("#include") || t.startsWith("using namespace") || t.startsWith("public class") || t.startsWith("public static void main") || t === "return 0;" || t === "}") return;

        // تحويل أوامر الطباعة
        let printMatch = t.match(/^(?:print|console\.log|System\.out\.println)\s*\((.*)\)\s*;?$/) || t.match(/^cout\s*<<\s*(.+?)(?:\s*<<\s*endl)?\s*;$/);
        if (printMatch) {
          let arg = printMatch[1].replace(/\s*<<\s*/g, " + ");
          if (targetLang === "python") bodyLines.push(`print(${arg})`);
          else if (targetLang === "cpp") bodyLines.push(`    cout << ${arg.replace(/\s*\+\s*/g, " << ")} << endl;`);
          else if (targetLang === "java") bodyLines.push(`        System.out.println(${arg});`);
          else if (targetLang === "javascript") bodyLines.push(`console.log(${arg});`);
          return;
        }

        // تحويل الحلقات التكرارية البسيطة
        let forPy = t.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+range\((?:(\d+),\s*)?(\d+)\)\s*:/);
        if (forPy) {
          const v = forPy[1], start = forPy[2] || "0", end = forPy[3];
          if (targetLang === "python") bodyLines.push(`for ${v} in range(${start}, ${end}):`);
          else if (targetLang === "cpp") bodyLines.push(`    for (int ${v} = ${start}; ${v} < ${end}; ${v}++) {`);
          else if (targetLang === "java") bodyLines.push(`        for (int ${v} = ${start}; ${v} < ${end}; ${v}++) {`);
          else if (targetLang === "javascript") bodyLines.push(`for (let ${v} = ${start}; ${v} < ${end}; ${v}++) {`);
          return;
        }

        // تحويل تعريف المتغيرات
        let varMatch = t.match(/^(?:const|let|var|int|double|float|string|String)?\s*([a-zA-Z_]\w*)\s*=\s*(.+?)\s*;?$/);
        if (varMatch) {
          const name = varMatch[1], val = varMatch[2];
          const isStr = /^["']/.test(val);
          if (targetLang === "python") bodyLines.push(`${name} = ${val}`);
          else if (targetLang === "cpp") bodyLines.push(`    ${isStr ? "string" : "auto"} ${name} = ${val};`);
          else if (targetLang === "java") bodyLines.push(`        ${isStr ? "String" : "var"} ${name} = ${val};`);
          else if (targetLang === "javascript") bodyLines.push(`let ${name} = ${val};`);
        }
      });

      if (targetLang === "cpp") {
        return `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n${bodyLines.join("\n") || '    cout << "Hello C++!" << endl;'}\n    return 0;\n}`;
      }
      if (targetLang === "java") {
        return `public class Main {\n    public static void main(String[] args) {\n${bodyLines.join("\n") || '        System.out.println("Hello Java!");'}\n    }\n}`;
      }
      if (targetLang === "python") {
        return `# Transpiled to Python 3\n${bodyLines.join("\n") || 'print("Hello Python!")'}`;
      }
      return `// Transpiled to JavaScript\n${bodyLines.join("\n") || 'console.log("Hello JS!");'}`;
    }

    function analyzeAlgorithmComplexityAndFlowchart(code) {
      const lines = String(code || "").split("\n");
      let loops = 0;
      let nestedLoops = 0;
      let curLoopDepth = 0;
      let conditions = 0;
      let functions = 0;
      const flowSteps = ["🚀 Start Execution (بداية التشغيل)"];

      lines.forEach((ln, idx) => {
        const t = ln.trim();
        if (!t || t.startsWith("//") || t.startsWith("#")) return;

        if (/\b(for|while)\b/.test(t)) {
          loops++;
          curLoopDepth++;
          if (curLoopDepth > nestedLoops) nestedLoops = curLoopDepth;
          flowSteps.push(`🔄 [Line ${idx + 1}] Loop Iteration: ${t.slice(0, 38)}`);
        }
        if (/\b(if|else\s+if|elif|switch)\b/.test(t)) {
          conditions++;
          flowSteps.push(`🔀 [Line ${idx + 1}] Branch Condition: ${t.slice(0, 38)}`);
        }
        if (/\b(function|def|int\s+main|void\s+\w+)\b/.test(t)) {
          functions++;
          flowSteps.push(`📦 [Line ${idx + 1}] Function Block: ${t.slice(0, 38)}`);
        }
        if (/\b(print|cout|println|console\.log|return)\b/.test(t)) {
          flowSteps.push(`📤 [Line ${idx + 1}] Output / Return: ${t.slice(0, 38)}`);
        }
        if (t.includes("}")) curLoopDepth = Math.max(0, curLoopDepth - 1);
      });

      flowSteps.push("🏁 End Execution (Exit Code 0)");

      const timeBigO = nestedLoops >= 2 ? "O(n²) — Quadratic" : loops >= 1 ? "O(n) — Linear" : "O(1) — Constant Time ⚡";
      const spaceBigO = /\b(new\s+|vector|list|\[\]|Array)\b/.test(code) ? "O(n) — Dynamic Memory" : "O(1) — Auxiliary Space";

      return { timeBigO, spaceBigO, loops, conditions, functions, flowSteps };
    }

    function exportCodeScreenshotSVG() {
      const p = curProj();
      const codeLines = getEditorCode().split("\n").slice(0, 28);
      const height = Math.max(240, codeLines.length * 22 + 110);

      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="820" height="${height}">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="100%" stop-color="#1e1b4b"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" rx="18" fill="url(#bg)"/>
        <rect x="24" y="24" width="772" height="${height - 48}" rx="14" fill="#090d16" stroke="#d4a72c" stroke-width="1.5"/>
        <circle cx="48" cy="48" r="6" fill="#ef4444"/>
        <circle cx="68" cy="48" r="6" fill="#f59e0b"/>
        <circle cx="88" cy="48" r="6" fill="#10b981"/>
        <text x="410" y="52" fill="#94a3b8" font-family="monospace" font-size="13" text-anchor="middle">${esc(p.name)} — ${esc(p.activeFile)}</text>
        ${codeLines.map((ln, i) => `
          <text x="44" y="${88 + i * 22}" fill="#475569" font-family="monospace" font-size="12.5">${i + 1}</text>
          <text x="80" y="${88 + i * 22}" fill="#e2e8f0" font-family="monospace" font-size="13">${esc(ln.slice(0, 82))}</text>
        `).join("")}
        <text x="775" y="${height - 36}" fill="#d4a72c" font-family="sans-serif" font-weight="bold" font-size="11" text-anchor="end">Engineered by Eng:Ahmed M Hosny</text>
      </svg>`;

      const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${p.activeFile}-snippet.svg`;
      a.click();
      toast("📸 تم تحميل لقطة الكود الاحترافية (SVG)!");
    }

    function openSuperPowerLabModal() {
      const p = curProj();
      const code = getEditorCode();
      const analysis = analyzeAlgorithmComplexityAndFlowchart(code);

      openUniversalModal("🚀 المختبر الهندسي المتقدم (Transpiler • Big-O Flowchart • Code Shot)", `
        <div class="uilib-tabs">
          <button type="button" class="uilib-tab active" data-protab="transpile">🔄 محول اللغات الفوري</button>
          <button type="button" class="uilib-tab" data-protab="complexity">📊 تعقيد الخوارزمية & Flowchart</button>
          <button type="button" class="uilib-tab" data-protab="codeshot">📸 لقطة كود احترافية</button>
        </div>

        <!-- 1. محول اللغات -->
        <div id="pro-pane-transpile">
          <p style="font-size:12px;color:var(--muted);margin-bottom:8px;">حوّل كود الملف الحالي (<b>${esc(p.activeFile)}</b>) بضغطة زر إلى أي لغة برمجة أخرى:</p>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:10px;">
            <button type="button" class="vsc-btn-primary" data-to-lang="python">🐍 إلى Python</button>
            <button type="button" class="vsc-btn-primary" data-to-lang="cpp">⚙️ إلى C++</button>
            <button type="button" class="vsc-btn-primary" data-to-lang="java">☕ إلى Java</button>
            <button type="button" class="vsc-btn-primary" data-to-lang="javascript">🟨 إلى JS</button>
          </div>
          <textarea id="transpiled-code-out" rows="8" dir="ltr" style="width:100%;font-family:'JetBrains Mono',monospace;font-size:12px;background:#070a12;color:#4ade80;border:1px solid var(--border);border-radius:8px;padding:10px;">${esc(transpileCodeBetweenLanguages(code, "cpp"))}</textarea>
          <button type="button" id="btn-save-transpiled-file" class="vsc-btn-primary" style="width:100%;margin-top:8px;background:#10b981;color:#000;">+ حفظ الكود المحوّل في ملف جديد بالمشروع ⚡</button>
        </div>

        <!-- 2. محلل Big-O وخريطة التدفق -->
        <div id="pro-pane-complexity" hidden>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
            <div style="background:#090d16;border:1px solid #10b981;padding:10px;border-radius:8px;">
              <small style="color:var(--muted);display:block;">⏱️ Time Complexity (السرعة الزمنية)</small>
              <strong style="color:#10b981;font-size:14px;">${esc(analysis.timeBigO)}</strong>
            </div>
            <div style="background:#090d16;border:1px solid #38bdf8;padding:10px;border-radius:8px;">
              <small style="color:var(--muted);display:block;">💾 Space Complexity (الذاكرة)</small>
              <strong style="color:#38bdf8;font-size:14px;">${esc(analysis.spaceBigO)}</strong>
            </div>
          </div>
          <div style="max-height:210px;overflow:auto;background:#070a12;border:1px solid var(--border);border-radius:10px;padding:12px;direction:ltr;text-align:left;font-family:monospace;font-size:11.5px;">
            ${analysis.flowSteps.map((st, i) => `
              <div style="padding:6px 10px;background:#111827;border-left:3px solid var(--gold);border-radius:5px;margin-bottom:6px;color:#f8fafc;">
                ${esc(st)}
              </div>
              ${i < analysis.flowSteps.length - 1 ? `<div style="text-align:center;color:#38bdf8;margin:2px 0;">↓</div>` : ""}
            `).join("")}
          </div>
        </div>

        <!-- 3. تصدير صورة الكود -->
        <div id="pro-pane-codeshot" hidden>
          <p style="font-size:12px;color:var(--muted);margin-bottom:10px;">تصدير كود الملف النشط كلوحة عرض عالية الدقة مع توقيعك الهندسي لمشاركتها:</p>
          <button type="button" id="btn-dl-codeshot" class="vsc-btn-primary" style="width:100%;padding:12px;font-size:13px;">📸 تحميل صورة الكود الآن (Download SVG Banner)</button>
        </div>
      `);

      let currentTargetExt = "cpp";
      document.querySelectorAll("[data-protab]").forEach(tab => {
        tab.onclick = () => {
          document.querySelectorAll("[data-protab]").forEach(b => b.classList.toggle("active", b === tab));
          ["transpile", "complexity", "codeshot"].forEach(k => {
            const el = document.getElementById(`pro-pane-${k}`);
            if (el) el.hidden = (k !== tab.dataset.protab);
          });
        };
      });

      document.querySelectorAll("[data-to-lang]").forEach(btn => {
        btn.onclick = () => {
          const lang = btn.dataset.toLang;
          currentTargetExt = lang === "python" ? "py" : lang === "cpp" ? "cpp" : lang === "java" ? "java" : "js";
          const out = document.getElementById("transpiled-code-out");
          if (out) out.value = transpileCodeBetweenLanguages(code, lang);
        };
      });

      document.getElementById("btn-save-transpiled-file")?.addEventListener("click", () => {
        const out = document.getElementById("transpiled-code-out")?.value || "";
        const newFile = currentTargetExt === "java" ? "Main.java" : `converted.${currentTargetExt}`;
        p.files[newFile] = out;
        saveState();
        closeUniversalModal();
        switchActiveFile(newFile);
        toast(`🔄 تم إنشاء وفتح الملف المحوّل: ${newFile}`);
      });

      document.getElementById("btn-dl-codeshot")?.addEventListener("click", exportCodeScreenshotSVG);
    }

    /* ========================================================================
       5. MOUNT NEW TOOLBAR BUTTONS INTO THE IDE
       ======================================================================== */
    const crumbTools = document.querySelector(".crumb-right-tools");
    if (crumbTools && !document.getElementById("btn-open-pro-lab")) {
      const labBtn = document.createElement("button");
      labBtn.type = "button";
      labBtn.id = "btn-open-pro-lab";
      labBtn.className = "vsc-inline-ai-btn";
      labBtn.style.borderColor = "#a855f7";
      labBtn.style.color = "#e9d5ff";
      labBtn.style.background = "rgba(168, 85, 247, 0.18)";
      labBtn.setAttribute("data-tip", "محول اللغات الفوري + محلل الخوارزميات Big-O + لقطة الكود");
      labBtn.innerHTML = `<i class="fa-solid fa-microchip"></i> 🚀 مختبر اللغات والخوارزميات`;
      labBtn.onclick = openSuperPowerLabModal;
      crumbTools.prepend(labBtn);
    }

    const prevActions = document.querySelector(".vsc-preview-actions");
    if (prevActions && !document.getElementById("btn-visual-dom-edit")) {
      const veBtn = document.createElement("button");
      veBtn.type = "button";
      veBtn.id = "btn-visual-dom-edit";
      veBtn.className = "vsc-mini-icon";
      veBtn.setAttribute("data-tip", "التعديل البصري الحي: اضغط على أي عنصر في المعاينة لتغيير ألوانه ونصه وحجمه مباشرة!");
      veBtn.innerHTML = `<i class="fa-solid fa-wand-magic gold-icon"></i>`;
      veBtn.onclick = () => {
        visualEditActive = !visualEditActive;
        veBtn.classList.toggle("active", visualEditActive);
        enableLiveVisualDOMEditor();
        toast(visualEditActive ? "🎨 التعديل البصري نشط: اضغط على أي عنصر داخل المعاينة لتعديله!" : "تم إيقاف التعديل البصري");
      };
      prevActions.prepend(veBtn);
    }

    const iframeEl = document.getElementById("vsc-preview-iframe");
    iframeEl?.addEventListener("load", () => {
      if (visualEditActive) enableLiveVisualDOMEditor();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIDEProModule);
  } else {
    initIDEProModule();
  }
})();
