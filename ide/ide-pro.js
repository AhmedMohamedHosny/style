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
/* ========================================================================
       6. ENTERPRISE DEV SUITE (ALL 6 PRO TOOLS IN ide-pro.js):
          A. Security & Vulnerability Auditor + 1-Click Auto-Patcher
          B. Single-File Offline Production Bundler & Minifier
          C. Network Simulator (Online / Offline / Slow 3G) & Performance Profiler
          D. Realistic Mock Data Seeder (JSON / SQL / JS Array)
          E. Live Regex Sandbox & Multi-Language Validator Generator
          F. Side-by-Side File Diff & Merge Tool
       ======================================================================== */

    // ------------------------------------------------------------------------
    // A. فاحص الأمان والثغرات البرمجية (Security Auditor & Auto-Fixer)
    // ------------------------------------------------------------------------
    function scanProjectSecurity() {
      const p = curProj();
      const findings = [];
      let patchedFiles = JSON.parse(JSON.stringify(p.files || {}));

      Object.entries(p.files || {}).forEach(([fn, content]) => {
        if (fn.endsWith(".test.js")) return;
        const lines = String(content || "").split("\n");
        const fixedLines = [...lines];

        lines.forEach((ln, idx) => {
          const lineNum = idx + 1;
          const trimmed = ln.trim();
          if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("#")) return;

          // 1. ثغرة XSS عبر innerHTML مع متغيرات ديناميكية
          if (/\.innerHTML\s*=\s*(?!["'`]\s*["'`])/.test(ln) && !/esc\(|sanitize/i.test(ln)) {
            findings.push({
              file: fn,
              line: lineNum,
              severity: "HIGH",
              type: "XSS Vulnerability (DOM Injection)",
              descAr: "استخدام innerHTML مباشرة قد يسمح بحقن أكواد خبيثة (XSS)؛ يفضل استخدام textContent أو تعقيم المدخلات.",
              snippet: trimmed.slice(0, 65)
            });
            fixedLines[idx] = fixedLines[idx].replace(/\.innerHTML\s*=/g, ".textContent =");
          }

          // 2. دوال تنفيذ خطرة (eval / document.write)
          if (/\beval\s*\(|document\.write\s*\(/.test(ln)) {
            findings.push({
              file: fn,
              line: lineNum,
              severity: "CRITICAL",
              type: "Arbitrary Code Execution (eval / document.write)",
              descAr: "دالة eval() أو document.write() تشكل خطراً أمنياً عالياً وتبطئ المتصفح.",
              snippet: trimmed.slice(0, 65)
            });
            fixedLines[idx] = fixedLines[idx].replace(/\beval\s*\(([^)]+)\)/g, "JSON.parse($1)");
          }

          // 3. مفاتيح API أو كلمات مرور مكشوفة داخل الكود
          const secretMatch = ln.match(/\b(api_?key|secret_?key|auth_?token|password|passwd)\s*[:=]\s*(["'])([^"']{6,})\2/i);
          if (secretMatch && !secretMatch[3].includes("YOUR_") && !secretMatch[3].includes("ENV")) {
            findings.push({
              file: fn,
              line: lineNum,
              severity: "CRITICAL",
              type: "Hardcoded Secret / Credentials Leak",
              descAr: `تم اكتشاف مفتاح سري أو كلمة مرور مكشوفة (${secretMatch[1]}) داخل الكود المصدري!`,
              snippet: `${secretMatch[1]} = "********"`
            });
            fixedLines[idx] = fixedLines[idx].replace(secretMatch[3], "YOUR_ENV_SECRET_KEY");
          }

          // 4. ثغرة SQL Injection عبر دمج النصوص
          if (/(?:SELECT|INSERT|UPDATE|DELETE)\b.*["']\s*\+\s*[a-zA-Z_$]/i.test(ln)) {
            findings.push({
              file: fn,
              line: lineNum,
              severity: "HIGH",
              type: "SQL Injection Risk (String Concatenation)",
              descAr: "دمج المتغيرات مباشرة داخل استعلام SQL يعرّض قاعدة البيانات للاختراق؛ استخدم Prepared Parameters (?).",
              snippet: trimmed.slice(0, 65)
            });
          }

          // 5. ثغرة Tabnabbing في روابط HTML الخارجية (target="_blank" بدون rel="noopener")
          if (fn.endsWith(".html") && /<a\b[^>]*target=["']_blank["'][^>]*>/i.test(ln) && !/rel=["'][^"']*noopener/i.test(ln)) {
            findings.push({
              file: fn,
              line: lineNum,
              severity: "MEDIUM",
              type: "Reverse Tabnabbing (Missing rel='noopener noreferrer')",
              descAr: "الروابط الخارجية التي تفتح في تبويب جديد يجب أن تحتوي على rel='noopener noreferrer' للحماية.",
              snippet: trimmed.slice(0, 65)
            });
            fixedLines[idx] = fixedLines[idx].replace(/target=["']_blank["']/gi, 'target="_blank" rel="noopener noreferrer"');
          }
        });

        patchedFiles[fn] = fixedLines.join("\n");
      });

      const score = Math.max(15, 100 - findings.length * 18);
      return { findings, patchedFiles, score };
    }

    // ------------------------------------------------------------------------
    // B. مُجمّع وضَاغط الإنتاج في ملف HTML واحد مستقل (Single-File Bundler)
    // ------------------------------------------------------------------------
    function buildSingleFileProductionBundle() {
      const p = curProj();
      let html = p.files["index.html"] || `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>${esc(p.name)}</title></head><body></body></html>`;
      let allCss = "";
      let allJs = "";
      let rawTotalBytes = new Blob([html]).size;

      Object.entries(p.files || {}).forEach(([fn, content]) => {
        if (fn === "index.html" || fn.endsWith(".test.js")) return;
        rawTotalBytes += new Blob([content || ""]).size;
        const m = getLangMeta(fn);
        if (m.lang === "css") allCss += "\n" + content;
        else if (m.lang === "javascript" && m.mode === "web") allJs += "\n" + content;
      });

      // استبدال الصور المرفوعة بـ Base64 Data URLs
      Object.entries(p.assets || {}).forEach(([name, dataUrl]) => {
        const reg = new RegExp(`(["'\`])(?:\\.\\/)?${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\1`, "g");
        html = html.replace(reg, `$1${dataUrl}$1`);
        allCss = allCss.replace(reg, `$1${dataUrl}$1`);
        allJs = allJs.replace(reg, `$1${dataUrl}$1`);
      });

      // ضغط وتنظيف CSS و JS بأمان
      const minCss = allCss
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s*([{}:;,])\s*/g, "$1")
        .replace(/\s+/g, " ")
        .trim();

      const minJs = allJs
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "")
        .replace(/\n\s*\n/g, "\n")
        .trim();

      let bundled = html
        .replace(/<link\b[^>]*href=["'](?:\.\/)?style\.css["'][^>]*>/gi, "")
        .replace(/<script\b[^>]*src=["'](?:\.\/)?script\.js["'][^>]*>\s*<\/script>/gi, "")
        .replace(/<!--[\s\S]*?-->/g, "");

      if (minCss) {
        bundled = /<\/head>/i.test(bundled)
          ? bundled.replace(/<\/head>/i, `<style>${minCss}</style>\n</head>`)
          : `<style>${minCss}</style>\n` + bundled;
      }
      if (minJs) {
        bundled = /<\/body>/i.test(bundled)
          ? bundled.replace(/<\/body>/i, `<script>${minJs}<\/script>\n</body>`)
          : bundled + `\n<script>${minJs}<\/script>`;
      }

      const bundledBytes = new Blob([bundled]).size;
      const savedPct = rawTotalBytes > 0 ? Math.max(0, Math.round(((rawTotalBytes - bundledBytes) / rawTotalBytes) * 100)) : 0;

      return { bundled, rawTotalBytes, bundledBytes, savedPct };
    }

    // ------------------------------------------------------------------------
    // C. محاكي وضع الأوفلاين وسرعة الشبكة + مقياس الأداء الحي
    // ------------------------------------------------------------------------
    let networkSimMode = "online"; // "online" | "offline" | "slow3g"

    function injectNetworkSimulatorIntoPreview() {
      const frame = document.getElementById("vsc-preview-iframe");
      const win = frame?.contentWindow;
      const doc = frame?.contentDocument;
      if (!win || !doc || networkSimMode === "online") return;

      try {
        const script = doc.createElement("script");
        if (networkSimMode === "offline") {
          script.textContent = `
            (function(){
              try { Object.defineProperty(navigator, 'onLine', { get: function(){ return false; }, configurable: true }); } catch(e){}
              window.fetch = function() { return Promise.reject(new TypeError('Failed to fetch (Simulated Offline Mode)')); };
              var origSend = XMLHttpRequest.prototype.send;
              XMLHttpRequest.prototype.send = function() { throw new Error('NetworkError: Offline Mode Active'); };
              window.dispatchEvent(new Event('offline'));
            })();
          `;
        } else if (networkSimMode === "slow3g") {
          script.textContent = `
            (function(){
              var origFetch = window.fetch.bind(window);
              window.fetch = function() {
                var args = arguments;
                return new Promise(function(resolve, reject){
                  setTimeout(function(){ origFetch.apply(null, args).then(resolve).catch(reject); }, 1500);
                });
              };
            })();
          `;
        }
        (doc.head || doc.documentElement)?.prepend(script);
      } catch (e) {}
    }

    function measurePreviewPerformance() {
      const frame = document.getElementById("vsc-preview-iframe");
      const doc = frame?.contentDocument;
      const p = curProj();
      const domNodes = doc ? doc.querySelectorAll("*").length : 0;
      const scriptsCount = doc ? doc.querySelectorAll("script").length : 0;
      const stylesCount = doc ? doc.querySelectorAll("style, link[rel='stylesheet']").length : 0;
      const totalCodeChars = Object.values(p.files || {}).reduce((acc, v) => acc + String(v || "").length, 0);
      const storageKB = (new Blob([JSON.stringify(B.state || {})]).size / 1024).toFixed(1);
      const perfScore = Math.max(45, Math.min(100, 100 - Math.floor(domNodes / 25) - Math.floor(totalCodeChars / 8000)));

      return { domNodes, scriptsCount, stylesCount, totalCodeChars, storageKB, perfScore };
    }

    // ------------------------------------------------------------------------
    // D. مولّد البيانات الوهمية الواقعية (Mock Data Seeder: JSON / SQL / JS)
    // ------------------------------------------------------------------------
    function generateRealisticMockData(domain, format, count) {
      const firstNames = ["أحمد", "محمد", "سارة", "مريم", "كريم", "نور", "يوسف", "هدى", "عمر", "آية", "طارق", "سلمى"];
      const lastNames = ["محمد حسني", "علي محمود", "طارق حسن", "خالد إبراهيم", "مصطفى عادل", "سمير فؤاد", "أشرف نبيل"];
      const courses = ["CSE212 - براكسيس", "CS301 - نظم التشغيل", "WEB204 - تصميم الويب", "DB310 - قواعد البيانات", "AI402 - الذكاء الاصطناعي"];
      const sections = ["Group A - Sec 1", "Group A - Sec 2", "Group B - Sec 1", "Group B - Sec 2"];
      const products = ["لوحة مفاتيح ميكانيكية", "شاشة 4K للمبرمجين", "سماعة عزل ضوضاء", "ماوس لاسلكي احترافي", "حقيبة لابتوب ذكية"];

      const rows = [];
      for (let i = 0; i < count; i++) {
        const fullName = `${firstNames[i % firstNames.length]} ${lastNames[(i * 3) % lastNames.length]}`;
        if (domain === "students") {
          rows.push({
            id: 20261001 + i,
            name: fullName,
            course: courses[i % courses.length],
            section: sections[i % sections.length],
            grade: Math.min(100, 72 + ((i * 7) % 29)),
            status: i % 5 === 4 ? "Absent" : "Present"
          });
        } else if (domain === "products") {
          rows.push({
            sku: `PRD-${1000 + i}`,
            title: `${products[i % products.length]} V${(i % 4) + 1}`,
            category: i % 2 === 0 ? "Hardware" : "Accessories",
            price: 450 + ((i * 135) % 2500),
            stock: (i * 5 + 3) % 60
          });
        } else {
          rows.push({
            id: i + 1,
            fullName,
            email: `eng.user${i + 1}@mylifeos.dev`,
            role: i === 0 ? "Lead Architect" : i % 3 === 0 ? "Backend Engineer" : "Frontend Developer",
            active: i % 4 !== 3
          });
        }
      }

      if (format === "json") return JSON.stringify(rows, null, 2);
      if (format === "js") return `const mockDataset = ${JSON.stringify(rows, null, 2)};\nconsole.log("Loaded rows:", mockDataset.length);`;

      // SQL Format
      const tblName = domain === "students" ? "Students" : domain === "products" ? "Products" : "Users";
      const cols = Object.keys(rows[0]);
      const createSql = `CREATE TABLE ${tblName} (${cols.map(c => `${c} ${typeof rows[0][c] === "number" ? "INT" : "TEXT"}`).join(", ")});\n`;
      const inserts = rows.map(r => {
        const vals = cols.map(c => typeof r[c] === "number" || typeof r[c] === "boolean" ? r[c] : `'${String(r[c]).replace(/'/g, "''")}'`).join(", ");
        return `INSERT INTO ${tblName} (${cols.join(", ")}) VALUES (${vals});`;
      }).join("\n");
      return `${createSql}${inserts}\nSELECT * FROM ${tblName};`;
    }

    // ------------------------------------------------------------------------
    // E. مقارن الملفات والنسخ (Side-by-Side Diff & Merge Engine)
    // ------------------------------------------------------------------------
    function computeSideBySideDiff(textA, textB) {
      const linesA = String(textA || "").split("\n");
      const linesB = String(textB || "").split("\n");
      const setA = new Set(linesA);
      const setB = new Set(linesB);

      const diffRows = [];
      let added = 0;
      let removed = 0;
      const maxLen = Math.max(linesA.length, linesB.length);

      for (let i = 0; i < maxLen; i++) {
        const a = linesA[i];
        const b = linesB[i];
        if (a === b && a !== undefined) {
          diffRows.push({ type: "same", line: i + 1, a, b });
        } else {
          if (a !== undefined && !setB.has(a)) removed++;
          if (b !== undefined && !setA.has(b)) added++;
          diffRows.push({ type: "changed", line: i + 1, a: a ?? "", b: b ?? "" });
        }
      }
      return { diffRows, added, removed };
    }

    // ------------------------------------------------------------------------
    // F. نافذة مركز الأدوات الهندسية المتكاملة (Enterprise DevSuite Modal)
    // ------------------------------------------------------------------------
    function openEnterpriseDevSuiteModal(activeTab = "security") {
      const p = curProj();
      const fileKeys = Object.keys(p.files || {});
      const secReport = scanProjectSecurity();
      const bundleInfo = buildSingleFileProductionBundle();
      const perfInfo = measurePreviewPerformance();

      openUniversalModal("🛡️ مركز الأمان والإنتاج والبيانات والـ Regex (Enterprise DevSuite)", `
        <div class="uilib-tabs">
          <button type="button" class="uilib-tab ${activeTab === "security" ? "active" : ""}" data-enttab="security">🛡️ فاحص الأمان (${secReport.findings.length})</button>
          <button type="button" class="uilib-tab ${activeTab === "bundler" ? "active" : ""}" data-enttab="bundler">📦 مُجمّع الإنتاج</button>
          <button type="button" class="uilib-tab ${activeTab === "network" ? "active" : ""}" data-enttab="network">📡 الشبكة والأداء</button>
          <button type="button" class="uilib-tab ${activeTab === "mockdata" ? "active" : ""}" data-enttab="mockdata">🎲 مولّد البيانات</button>
          <button type="button" class="uilib-tab ${activeTab === "regex" ? "active" : ""}" data-enttab="regex">🔍 مختبر Regex</button>
          <button type="button" class="uilib-tab ${activeTab === "diff" ? "active" : ""}" data-enttab="diff">⚖️ مقارن الملفات</button>
        </div>

        <!-- 1. Security Auditor -->
        <div id="ent-pane-security" ${activeTab !== "security" ? "hidden" : ""}>
          <div style="display:flex;justify-content:space-between;align-items:center;background:#090d16;border:1px solid ${secReport.findings.length ? "#ef4444" : "#10b981"};padding:10px 14px;border-radius:10px;margin-bottom:10px;">
            <div>
              <strong style="color:${secReport.findings.length ? "#f87171" : "#10b981"};font-size:13.5px;">
                ${secReport.findings.length ? `⚠️ تم اكتشاف ${secReport.findings.length} ملاحظة أمنية` : "✅ المشروع آمن تماماً وخالٍ من الثغرات الشائعة"}
              </strong>
              <small style="display:block;color:var(--muted);font-size:11px;">مؤشر الحماية: ${secReport.score}% (XSS • SQLi • Secrets • eval • Tabnabbing)</small>
            </div>
            ${secReport.findings.length ? `<button type="button" id="btn-sec-autofix-all" class="vsc-btn-sm emerald">⚡ إصلاح جميع الثغرات تلقائياً</button>` : ""}
          </div>
          <div style="max-height:240px;overflow:auto;">
            ${secReport.findings.map(f => `
              <div style="background:rgba(239,68,68,0.1);border:1px solid #ef4444;border-radius:8px;padding:8px 12px;margin-bottom:6px;">
                <div style="display:flex;justify-content:space-between;font-size:11.5px;">
                  <strong style="color:#fca5a5;">[${esc(f.severity)}] ${esc(f.type)}</strong>
                  <span style="color:var(--gold);">${esc(f.file)} : سطر ${f.line}</span>
                </div>
                <p style="font-size:11.5px;margin:4px 0;color:#f8fafc;">${esc(f.descAr)}</p>
                <code style="display:block;direction:ltr;text-align:left;font-size:10.5px;color:#93c5fd;background:#070a12;padding:4px 8px;border-radius:5px;">${esc(f.snippet)}</code>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- 2. Production Single-File Bundler -->
        <div id="ent-pane-bundler" ${activeTab !== "bundler" ? "hidden" : ""}>
          <p style="font-size:12px;color:var(--muted);margin-bottom:10px;">
            يدمج جميع ملفات المشروع (HTML + CSS + JS + الصور المرفوعة) ويضغطها في <b>ملف HTML واحد مستقل</b> يعمل Offline بدون إنترنت أو مجلدات مرافقة:
          </p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;text-align:center;">
            <div style="background:#090d16;border:1px solid var(--border);padding:10px;border-radius:8px;">
              <small style="color:var(--muted);display:block;">الحجم الأصلي</small>
              <strong style="color:#fff;font-size:15px;">${(bundleInfo.rawTotalBytes / 1024).toFixed(2)} KB</strong>
            </div>
            <div style="background:#090d16;border:1px solid #10b981;padding:10px;border-radius:8px;">
              <small style="color:var(--muted);display:block;">بعد الضغط والدمج</small>
              <strong style="color:#10b981;font-size:15px;">${(bundleInfo.bundledBytes / 1024).toFixed(2)} KB</strong>
            </div>
            <div style="background:#090d16;border:1px solid var(--gold);padding:10px;border-radius:8px;">
              <small style="color:var(--muted);display:block;">نسبة التوفير</small>
              <strong style="color:var(--gold);font-size:15px;">${bundleInfo.savedPct}%</strong>
            </div>
          </div>
          <button type="button" id="btn-download-single-bundle" class="vsc-btn-primary" style="width:100%;padding:11px;font-size:13px;background:linear-gradient(135deg,#10b981,#059669);color:#04130d;">
            📦 تحميل نسخة الإنتاج المضغوطة في ملف واحد (.bundle.html) 🚀
          </button>
        </div>

        <!-- 3. Network Simulator & Performance Profiler -->
        <div id="ent-pane-network" ${activeTab !== "network" ? "hidden" : ""}>
          <label style="font-size:11.5px;font-weight:800;color:var(--gold);display:block;margin-bottom:6px;">📡 محاكاة حالة الشبكة داخل شاشة المعاينة:</label>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px;">
            <button type="button" class="vsc-btn-primary" data-netmode="online" style="background:${networkSimMode === "online" ? "#10b981" : "#1e293b"};color:${networkSimMode === "online" ? "#000" : "#fff"};">🟢 Online (سريع)</button>
            <button type="button" class="vsc-btn-primary" data-netmode="offline" style="background:${networkSimMode === "offline" ? "#ef4444" : "#1e293b"};">📴 Offline (مقطوع)</button>
            <button type="button" class="vsc-btn-primary" data-netmode="slow3g" style="background:${networkSimMode === "slow3g" ? "#f59e0b" : "#1e293b"};color:${networkSimMode === "slow3g" ? "#000" : "#fff"};">🐢 Slow 3G (1.5s)</button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;text-align:center;">
            <div style="background:#090d16;border:1px solid var(--border);padding:8px;border-radius:8px;"><small style="color:var(--muted);display:block;">تقييم الأداء</small><strong style="color:#10b981;">${perfInfo.perfScore}/100</strong></div>
            <div style="background:#090d16;border:1px solid var(--border);padding:8px;border-radius:8px;"><small style="color:var(--muted);display:block;">عناصر DOM</small><strong style="color:#38bdf8;">${perfInfo.domNodes}</strong></div>
            <div style="background:#090d16;border:1px solid var(--border);padding:8px;border-radius:8px;"><small style="color:var(--muted);display:block;">السكربتات</small><strong style="color:var(--gold);">${perfInfo.scriptsCount + perfInfo.stylesCount}</strong></div>
            <div style="background:#090d16;border:1px solid var(--border);padding:8px;border-radius:8px;"><small style="color:var(--muted);display:block;">التخزين المحلي</small><strong style="color:#fff;">${perfInfo.storageKB} KB</strong></div>
          </div>
        </div>

        <!-- 4. Mock Data Seeder -->
        <div id="ent-pane-mockdata" ${activeTab !== "mockdata" ? "hidden" : ""}>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:8px;">
            <div class="vsc-field">
              <label>نوع البيانات</label>
              <select id="mock-domain">
                <option value="students">🎓 طلاب ودرجات</option>
                <option value="products">🛍️ منتجات ومخزن</option>
                <option value="users">👤 مستخدمين ومطورين</option>
              </select>
            </div>
            <div class="vsc-field">
              <label>الصيغة</label>
              <select id="mock-format">
                <option value="json">JSON</option>
                <option value="sql">SQL (INSERT)</option>
                <option value="js">JavaScript Array</option>
              </select>
            </div>
            <div class="vsc-field">
              <label>عدد السجلات</label>
              <input type="number" id="mock-count" value="8" min="1" max="200" />
            </div>
          </div>
          <textarea id="mock-out-box" rows="7" dir="ltr" style="width:100%;font-family:monospace;font-size:11.5px;background:#070a12;color:#38bdf8;border:1px solid var(--border);border-radius:8px;padding:8px;">${esc(generateRealisticMockData("students", "json", 5))}</textarea>
          <div style="display:flex;gap:8px;margin-top:8px;">
            <button type="button" id="btn-mock-insert-cur" class="vsc-btn-primary" style="flex:1;">+ إدراج في الملف الحالي</button>
            <button type="button" id="btn-mock-save-file" class="vsc-btn-primary" style="flex:1;background:#10b981;color:#000;">💾 حفظ كملف جديد بالمشروع</button>
          </div>
        </div>

        <!-- 5. Live Regex Sandbox -->
        <div id="ent-pane-regex" ${activeTab !== "regex" ? "hidden" : ""}>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">
            <button type="button" class="vsc-btn-sm" data-rx-preset="^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$">📧 Email</button>
            <button type="button" class="vsc-btn-sm" data-rx-preset="^01[0125][0-9]{8}$">📱 موبايل مصري</button>
            <button type="button" class="vsc-btn-sm" data-rx-preset="^202[0-9]{5}$">🎓 رقم جامعي</button>
            <button type="button" class="vsc-btn-sm" data-rx-preset="^(?=.*[A-Z])(?=.*\\d).{8,}$">🔐 باسوورد قوي</button>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:8px;" dir="ltr">
            <input type="text" id="rx-pattern-inp" value="01[0125][0-9]{8}" style="flex:1;padding:8px;border-radius:7px;background:#070a12;color:#facc15;border:1px solid var(--border);font-family:monospace;" />
            <input type="text" id="rx-flags-inp" value="g" style="width:55px;padding:8px;border-radius:7px;background:#070a12;color:#38bdf8;border:1px solid var(--border);font-family:monospace;text-align:center;" />
          </div>
          <textarea id="rx-test-str" rows="3" dir="ltr" placeholder="اكتب نصاً لاختبار المطابقة..." style="width:100%;font-family:monospace;font-size:12px;background:#090d16;color:#fff;border:1px solid var(--border);border-radius:8px;padding:8px;">Student Phones: 01012345678, 01198765432, invalid: 019000</textarea>
          <div id="rx-match-out" style="margin:8px 0;padding:8px;background:#070a12;border:1px solid var(--border);border-radius:8px;font-family:monospace;font-size:11.5px;color:#4ade80;" dir="ltr"></div>
          <button type="button" id="btn-rx-insert-fn" class="vsc-btn-primary" style="width:100%;">⚡ توليد دالة التحقق (Validator Function) وإدراجها في الكود</button>
        </div>

        <!-- 6. Side-by-Side File Diff -->
        <div id="ent-pane-diff" ${activeTab !== "diff" ? "hidden" : ""}>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
            <select id="diff-sel-a" style="padding:7px;border-radius:7px;background:var(--bg-main);color:#fff;border:1px solid var(--border);">
              ${fileKeys.map(f => `<option value="${esc(f)}" ${f === p.activeFile ? "selected" : ""}>A: ${esc(f)}</option>`).join("")}
            </select>
            <select id="diff-sel-b" style="padding:7px;border-radius:7px;background:var(--bg-main);color:#fff;border:1px solid var(--border);">
              ${fileKeys.map((f, idx) => `<option value="${esc(f)}" ${idx === Math.min(1, fileKeys.length - 1) ? "selected" : ""}>B: ${esc(f)}</option>`).join("")}
            </select>
          </div>
          <div id="diff-view-grid" style="max-height:230px;overflow:auto;background:#070a12;border:1px solid var(--border);border-radius:8px;padding:8px;direction:ltr;text-align:left;font-family:monospace;font-size:11px;"></div>
        </div>
      `);

      // التبديل بين التبويبات الـ 6
      document.querySelectorAll("[data-enttab]").forEach(t => {
        t.onclick = () => {
          document.querySelectorAll("[data-enttab]").forEach(b => b.classList.toggle("active", b === t));
          ["security", "bundler", "network", "mockdata", "regex", "diff"].forEach(k => {
            const pane = document.getElementById(`ent-pane-${k}`);
            if (pane) pane.hidden = (k !== t.dataset.enttab);
          });
        };
      });

      // 1) زر إصلاح الثغرات الأمنية تلقائياً
      document.getElementById("btn-sec-autofix-all")?.addEventListener("click", () => {
        p.files = secReport.patchedFiles;
        saveState();
        setEditorCode(p.files[p.activeFile] || "", getLangMeta(p.activeFile).lang);
        B.runWorkspace("project", true);
        closeUniversalModal();
        toast("🛡️ تم إصلاح جميع الثغرات الأمنية في المشروع بنجاح!");
      });

      // 2) زر تحميل حزمة الإنتاج في ملف واحد
      document.getElementById("btn-download-single-bundle")?.addEventListener("click", () => {
        const blob = new Blob([bundleInfo.bundled], { type: "text/html;charset=utf-8" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${p.name.replace(/\s+/g, "-")}.bundle.html`;
        a.click();
        toast("📦 تم تصدير ملف الإنتاج المستقل (.bundle.html) بنجاح!");
      });

      // 3) أزرار محاكاة الشبكة
      document.querySelectorAll("[data-netmode]").forEach(btn => {
        btn.onclick = () => {
          networkSimMode = btn.dataset.netmode;
          const topNetBtn = document.getElementById("btn-net-sim-toggle");
          if (topNetBtn) {
            topNetBtn.innerHTML = networkSimMode === "offline"
              ? `<i class="fa-solid fa-wifi" style="color:#ef4444;"></i>`
              : networkSimMode === "slow3g"
              ? `<i class="fa-solid fa-wifi" style="color:#f59e0b;"></i>`
              : `<i class="fa-solid fa-wifi emerald-icon"></i>`;
          }
          B.runWorkspace("project", false);
          closeUniversalModal();
          toast(
            networkSimMode === "offline"
              ? "📴 وضع الأوفلاين نشط الآن في المعاينة (Offline Mode)"
              : networkSimMode === "slow3g"
              ? "🐢 محاكاة شبكة Slow 3G (1.5s) نشطة"
              : "🟢 الاتصال الطبيعي Online نشط"
          );
        };
      });

      // 4) تحديث وتوليد البيانات الوهمية
      const refreshMockPreview = () => {
        const d = document.getElementById("mock-domain")?.value || "students";
        const f = document.getElementById("mock-format")?.value || "json";
        const c = Math.max(1, Math.min(200, Number(document.getElementById("mock-count")?.value) || 8));
        const box = document.getElementById("mock-out-box");
        if (box) box.value = generateRealisticMockData(d, f, c);
      };
      ["mock-domain", "mock-format", "mock-count"].forEach(id => document.getElementById(id)?.addEventListener("change", refreshMockPreview));

      document.getElementById("btn-mock-insert-cur")?.addEventListener("click", () => {
        const dataTxt = document.getElementById("mock-out-box")?.value || "";
        const next = getEditorCode() + "\n" + dataTxt;
        p.files[p.activeFile] = next;
        setEditorCode(next, getLangMeta(p.activeFile).lang);
        saveState();
        closeUniversalModal();
        toast("🎲 تم إدراج البيانات الوهمية في الملف الحالي!");
      });

      document.getElementById("btn-mock-save-file")?.addEventListener("click", () => {
        const fmt = document.getElementById("mock-format")?.value || "json";
        const dataTxt = document.getElementById("mock-out-box")?.value || "";
        const fname = fmt === "sql" ? "seed-data.sql" : fmt === "js" ? "mockData.js" : "mock-data.json";
        p.files[fname] = dataTxt;
        saveState();
        closeUniversalModal();
        switchActiveFile(fname);
        toast(`💾 تم إنشاء وفتح ملف البيانات: ${fname}`);
      });

      // 5) مختبر Regex الحي
      const evaluateLiveRegex = () => {
        const pat = document.getElementById("rx-pattern-inp")?.value || "";
        const flg = document.getElementById("rx-flags-inp")?.value || "g";
        const txt = document.getElementById("rx-test-str")?.value || "";
        const out = document.getElementById("rx-match-out");
        if (!out) return;
        try {
          const rx = new RegExp(pat, flg.includes("g") ? flg : flg + "g");
          const matches = Array.from(txt.matchAll(rx)).map(m => m[0]);
          out.style.color = "#4ade80";
          out.textContent = matches.length
            ? `✓ Matches (${matches.length}): [ ${matches.join(" , ")} ]`
            : "No matches found in test string.";
        } catch (err) {
          out.style.color = "#f87171";
          out.textContent = `✖ Invalid Regex: ${err.message}`;
        }
      };
      ["rx-pattern-inp", "rx-flags-inp", "rx-test-str"].forEach(id => document.getElementById(id)?.addEventListener("input", evaluateLiveRegex));
      document.querySelectorAll("[data-rx-preset]").forEach(b => {
        b.onclick = () => {
          const inp = document.getElementById("rx-pattern-inp");
          if (inp) inp.value = b.dataset.rxPreset;
          evaluateLiveRegex();
        };
      });
      evaluateLiveRegex();

      document.getElementById("btn-rx-insert-fn")?.addEventListener("click", () => {
        const pat = document.getElementById("rx-pattern-inp")?.value || "";
        const lang = getLangMeta(p.activeFile).lang;
        const fnSnippet = lang === "python"
          ? `\nimport re\ndef validate_pattern(text):\n    return bool(re.match(r"${pat}", text))\n`
          : `\nfunction validatePattern(value) {\n  const regex = new RegExp(${JSON.stringify(pat)});\n  return regex.test(String(value));\n}\n`;
        const next = getEditorCode() + fnSnippet;
        p.files[p.activeFile] = next;
        setEditorCode(next, lang);
        saveState();
        closeUniversalModal();
        toast("🔍 تم إدراج دالة التحقق (Regex Validator) في الكود!");
      });

      // 6) مقارن الملفات Side-by-Side Diff
      const renderFileDiff = () => {
        const fA = document.getElementById("diff-sel-a")?.value || p.activeFile;
        const fB = document.getElementById("diff-sel-b")?.value || p.activeFile;
        const grid = document.getElementById("diff-view-grid");
        if (!grid) return;
        const { diffRows, added, removed } = computeSideBySideDiff(p.files[fA], p.files[fB]);
        grid.innerHTML = `<div style="margin-bottom:6px;color:var(--gold);">Comparing <b>${esc(fA)}</b> vs <b>${esc(fB)}</b> (<span style="color:#4ade80;">+${added}</span> / <span style="color:#f87171;">-${removed}</span>)</div>` +
          diffRows.slice(0, 80).map(r => `
            <div style="display:grid;grid-template-columns:32px 1fr 1fr;gap:6px;padding:2px 4px;background:${r.type === "changed" ? "rgba(245,158,11,0.12)" : "transparent"};border-bottom:1px solid rgba(255,255,255,0.04);">
              <span style="color:#64748b;">${r.line}</span>
              <span style="color:${r.type === "changed" ? "#fca5a5" : "#cbd5e1"};white-space:pre-wrap;">${esc(r.a)}</span>
              <span style="color:${r.type === "changed" ? "#6ee7b7" : "#cbd5e1"};white-space:pre-wrap;">${esc(r.b)}</span>
            </div>
          `).join("");
      };
      ["diff-sel-a", "diff-sel-b"].forEach(id => document.getElementById(id)?.addEventListener("change", renderFileDiff));
      renderFileDiff();
    }

    // حقن زر مركز الأمان والإنتاج في الشريط أعلى المحرر + زر تبديل الأوفلاين في المعاينة
    if (crumbTools && !document.getElementById("btn-open-enterprise-suite")) {
      const entBtn = document.createElement("button");
      entBtn.type = "button";
      entBtn.id = "btn-open-enterprise-suite";
      entBtn.className = "vsc-inline-ai-btn";
      entBtn.style.borderColor = "#f59e0b";
      entBtn.style.color = "#fde68a";
      entBtn.style.background = "rgba(245, 158, 11, 0.16)";
      entBtn.setAttribute("data-tip", "فاحص الأمان + ضغط الإنتاج في ملف واحد + محاكي الأوفلاين + مولّد البيانات + Regex + Diff");
      entBtn.innerHTML = `<i class="fa-solid fa-shield-halved"></i> 🛡️ الأمان والإنتاج والبيانات`;
      entBtn.onclick = () => openEnterpriseDevSuiteModal("security");
      crumbTools.prepend(entBtn);
    }

    if (prevActions && !document.getElementById("btn-net-sim-toggle")) {
      const netBtn = document.createElement("button");
      netBtn.type = "button";
      netBtn.id = "btn-net-sim-toggle";
      netBtn.className = "vsc-mini-icon";
      netBtn.setAttribute("data-tip", "تبديل وضع الشبكة (Online ⇄ Offline Mode) لاختبار التطبيقات بدون إنترنت");
      netBtn.innerHTML = `<i class="fa-solid fa-wifi emerald-icon"></i>`;
      netBtn.onclick = () => {
        networkSimMode = networkSimMode === "online" ? "offline" : "online";
        netBtn.innerHTML = networkSimMode === "offline"
          ? `<i class="fa-solid fa-wifi" style="color:#ef4444;"></i>`
          : `<i class="fa-solid fa-wifi emerald-icon"></i>`;
        B.runWorkspace("project", false);
        toast(networkSimMode === "offline" ? "📴 تم تفعيل وضع الأوفلاين (Offline Mode) في المعاينة!" : "🟢 عاد الاتصال الطبيعي (Online Mode)");
      };
      prevActions.prepend(netBtn);
    }

    iframeEl?.addEventListener("load", injectNetworkSimulatorIntoPreview);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIDEProModule);
  } else {
    initIDEProModule();
  }
})();
