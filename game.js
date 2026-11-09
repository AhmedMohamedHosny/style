/**
 * ============================================================================
 * DAWN OF LEGENDS (3000 BC) — MAX REALISM ANCIENT CIVILIZATION & RPG ENGINE
 * Living Canvas (Moving Humans, Animals, Trees, River, Fire, Weather)
 * 5 Historical Eras & Outfits + 4 Engineering Puzzles + Ancient Alex Companion
 * ============================================================================
 */

const BC_ERAS = [
  {
    level: 1,
    eraName: "عصر الصيد والكهوف (3500 ق.م)",
    charTitle: "صياد الظلال (The Shadow Tracker)",
    outfitName: "رداء فراء الذئب البري ورمح الصوان",
    robeColor: "#5c4033",
    trimColor: "#a16207",
    headgear: "band",
    tool: "spear",
    monumentStage: 1,
    unlockDesc: "المستوى 1"
  },
  {
    level: 2,
    eraName: "عصر اكتشاف النار والزراعة (3200 ق.م)",
    charTitle: "حارس الشعلة والحكيم (The Firekeeper)",
    outfitName: "عباءة الريش المقدس وعصا الشعلة",
    robeColor: "#7c2d12",
    trimColor: "#f59e0b",
    headgear: "feathers",
    tool: "torch",
    monumentStage: 2,
    unlockDesc: "يُفتح في المستوى 2"
  },
  {
    level: 3,
    eraName: "عصر النحاس والبرونز (2900 ق.م)",
    charTitle: "سيد المعادن والحداد الأول (Master Metallurgist)",
    outfitName: "درع الصدر البرونزي ومطرقة البازلت",
    robeColor: "#1e293b",
    trimColor: "#d97706",
    headgear: "helmet",
    tool: "hammer",
    monumentStage: 3,
    unlockDesc: "يُفتح في المستوى 3"
  },
  {
    level: 4,
    eraName: "عصر الهندسة وبناء الصروح (2600 ق.م)",
    charTitle: "المهندس المعماري الملكي (Royal Architect)",
    outfitName: "رداء الكتان الملكي الأبيض وقلادة الفيروز",
    robeColor: "#f8fafc",
    trimColor: "#06b6d4",
    headgear: "nemes",
    tool: "scroll",
    monumentStage: 4,
    unlockDesc: "يُفتح في المستوى 4"
  },
  {
    level: 5,
    eraName: "عصر الملوك والفلكيين العظام (2400 ق.م)",
    charTitle: "الملك الفلكي الحكيم (Sovereign Astronomer)",
    outfitName: "التاج المذهب المزدوج وعباءة النجوم",
    robeColor: "#1e1b4b",
    trimColor: "#d4af37",
    headgear: "crown",
    tool: "ankh",
    monumentStage: 5,
    unlockDesc: "يُفتح في المستوى 5"
  }
];

const BC_DILEMMAS = [
  {
    id: "d1",
    title: "🌊 فيضان النهر العظيم المبكر",
    desc: "لاحظ كشافو القبيلة ارتفاعاً مفاجئاً في منسوب مياه النهر وتغير لونها للطمي الأحمر قبل موعده بأسبوعين. المحاصيل على الضفاف مهددة بالغرق!",
    choices: [
      {
        text: "📐 حشد العمال لبناء سد ترابي مائل وقنوات تصريف لتحويل المياه للأراضي العطشى",
        effects: { food: +20, wisdom: +25, morale: -5, defense: +10, archTrait: 2 },
        alexReply: "تفكير هندسي عبقري يا زعيم! حولت الكارثة لخزان مياه أنقذ الموسم الزراعي كله! 🌊📐"
      },
      {
        text: "🌾 حصاد المحصول فوراً قبل نضجه الكامل وتخزينه في الكهوف المرتفعة",
        effects: { food: +5, wisdom: +5, morale: +10, defense: 0, tactTrait: 2 },
        alexReply: "قرار تكتيكي آمن! أنقذنا نصف المحصول وحافظنا على أرواح المزارعين من الغرق 🛡️"
      },
      {
        text: "🛶 بناء قوارب بردي سريعة لإجلاء القبيلة والماشية نحو الهضبة الشرقية",
        effects: { food: -10, wisdom: +10, morale: +20, defense: +5, moralTrait: 2 },
        alexReply: "حياتهم عندك أغلى من القمح.. القبيلة كلها بتدعيلك على حكمتك ورحمتك بيهم! ❤️"
      }
    ]
  },
  {
    id: "d2",
    title: "🌑 كسوف الشمس الكلي ورعب القبيلة",
    desc: "في منتصف النهار، ابتلع القمر قرص الشمس وتحول النهار إلى ليل دامس! توقف البناؤون عن العمل وعمّ الذعر ظناً أن نهاية العالم قد حانت.",
    choices: [
      {
        text: "🔭 الصعود لقمة المعبد واستخدام ظل المسلة لشرح حركة القمر والشمس علمياً للناس",
        effects: { food: 0, wisdom: +35, morale: +15, defense: +5, archTrait: 3 },
        alexReply: "الله عليك! بدل ما يخافوا من الطبيعة، علمتهم يفهموا قوانين الفلك والكون! 🔭✨"
      },
      {
        text: "🔥 إشعال المشاعل الضخمة حول الوادي وتوزيع الطعام لتهدئة قلوب الأطفال والعائلات",
        effects: { food: -10, wisdom: +10, morale: +30, defense: +10, moralTrait: 3 },
        alexReply: "قائد إنسان من الطراز الأول! الدفء والأمان خلّى القبيلة تعدي الأزمة بسلام 🔥🤝"
      }
    ]
  },
  {
    id: "d3",
    title: "⛺ قافلة تجار المعادن التائهة",
    desc: "وصلت قافلة منهكة من أرض سيناء تحمل خامات النحاس الأخضر والفيروز، لكنهم يعانون من العطش الشديد ويطلبون الماء والمأوى مقابل سرّ صهر المعادن.",
    choices: [
      {
        text: "🤝 إكرامهم بالماء والغذاء مجاناً وعقد معاهدة تبادل معرفي وتجاري دائم",
        effects: { food: -15, wisdom: +30, morale: +20, defense: +25, moralTrait: 3 },
        alexReply: "الكرم مع الذكاء الاستراتيجي! كسبنا حلفاء أقوياء وتعلمنا سر صناعة البرونز! ⚔️💎"
      },
      {
        text: "⚖️ مقايضتهم بحساب دقيق: جرة ماء وكيس قمح مقابل كل سبيكة نحاس خام",
        effects: { food: +15, wisdom: +15, morale: 0, defense: +20, tactTrait: 3 },
        alexReply: "تاجر ومفاوض شاطر! خزينة القبيلة انتعشت بالمعادن من غير ما نخسر مؤنتنا ⚖️"
      }
    ]
  },
  {
    id: "d4",
    title: "🐺 هجوم قطيع الذئاب الجبلية ليلاً",
    desc: "مع برودة الشتاء، اقترب قطيع من الذئاب المفترسة من حظائر الغزلان والأغنام الخاصة بالقبيلة.",
    choices: [
      {
        text: "🔥 حفر خندق دائري حول الحظائر وإشعال نيران التحذير مع أبراج مراقبة خشبية",
        effects: { food: +10, wisdom: +20, morale: +15, defense: +25, archTrait: 2 },
        alexReply: "هندسة دفاعية ذكية! حمينا القطيع من غير ما نخسر صياد واحد في الظلام 🛡️🔥"
      },
      {
        text: "🍖 إلقاء بعض اللحوم بعيداً في الوادي لصرف الذئاب وترويض الصغار منها لحراسة القبيلة",
        effects: { food: -5, wisdom: +30, morale: +20, defense: +30, tactTrait: 3 },
        alexReply: "عبقرية! حولت الخطر لحراس أوفياء يحموا الوادي بالليل! 🐺✨"
      }
    ]
  },
  {
    id: "d5",
    title: "📜 اكتشاف الكهف المنقوش بالرموز القديمة",
    desc: "أثناء حفر بئر جديدة، عثر العمال على كهف صخري جدرانه مليئة بمعادلات هندسية وخرائط لمصادر مياه جوفية.",
    choices: [
      {
        text: "🏛️ تحويل الكهف إلى أول مدرسة ومكتبة لتعليم شباب القبيلة الهندسة والحساب",
        effects: { food: +10, wisdom: +40, morale: +20, defense: +10, archTrait: 3 },
        alexReply: "العلم هو اللي بيبني الحضارات الخالدة! شباب القبيلة بقوا مهندسين عباقرة 📚🏛️"
      },
      {
        text: "💧 تتبع خرائط المياه الجوفية فوراً لحفر 3 آبار استراتيجية تؤمّن الوادي ضد الجفاف",
        effects: { food: +35, wisdom: +20, morale: +15, defense: +15, tactTrait: 2 },
        alexReply: "تأمين المية يعني حياة مستدامة للوادي كله مهما غاب المطر! 💧🌴"
      }
    ]
  }
];

const GameState = {
  xp: 0,
  level: 1,
  selectedOutfitIdx: 0,
  food: 70,
  wisdom: 50,
  morale: 75,
  defense: 60,
  timeOfDay: "day", // "day" | "sunset" | "night"
  weather: "clear", // "clear" | "rain" | "sandstorm"
  soundEnabled: false,
  dilemmaIdx: 0,
  puzzlesSolved: {},
  traits: { arch: 5, tact: 5, moral: 5 },
  alexComment: "أهلاً بيك يا زعيم في عام 3000 قبل الميلاد! بص على الوادي الحي قدامك، اضغط على الناس أو الحيوانات، وابدأ رحلة بناء حضارتك! 🏛️🔥"
};

function loadGameState() {
  try {
    const saved = localStorage.getItem("MY_LIFE_OS_BC_GAME_V1");
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(GameState, parsed);
    }
  } catch (e) {}
  recalcLevel();
}

function saveGameState() {
  recalcLevel();
  try {
    localStorage.setItem("MY_LIFE_OS_BC_GAME_V1", JSON.stringify(GameState));
  } catch (e) {}
}

function recalcLevel() {
  GameState.level = Math.min(5, Math.floor(GameState.xp / 120) + 1);
  if (GameState.selectedOutfitIdx >= GameState.level) {
    GameState.selectedOutfitIdx = GameState.level - 1;
  }
}

/* ============================================================================
   1. REALISTIC LIVING WORLD 2D CANVAS ENGINE (HUMANS, ANIMALS, TREES, NILE)
   ============================================================================ */
let worldCanvas = null;
let worldCtx = null;
let animFrameId = null;

const WorldEntities = {
  trees: [],
  humans: [],
  animals: [],
  birds: [],
  sparks: [],
  stars: [],
  floatingTexts: []
};

function initWorldEntities() {
  // 1. النجوم في سماء الليل
  WorldEntities.stars = Array.from({ length: 70 }, () => ({
    x: Math.random() * 1000,
    y: Math.random() * 190,
    r: Math.random() * 1.8 + 0.5,
    phase: Math.random() * Math.PI * 2
  }));

  // 2. الأشجار الواقعية المتمايلة (نخيل + أشجار سنط)
  WorldEntities.trees = [
    { x: 90, y: 275, scale: 1.1, type: "palm", seed: 0.4 },
    { x: 165, y: 282, scale: 0.85, type: "acacia", seed: 1.7 },
    { x: 280, y: 272, scale: 1.0, type: "palm", seed: 2.5 },
    { x: 680, y: 274, scale: 1.15, type: "acacia", seed: 3.1 },
    { x: 790, y: 278, scale: 0.95, type: "palm", seed: 4.2 },
    { x: 895, y: 270, scale: 1.2, type: "palm", seed: 5.0 }
  ];

  // 3. البشر المتحركون (صيادون، مزارعون، بناؤون، وحراس)
  WorldEntities.humans = [
    { x: 210, y: 300, vx: 0.55, role: "hunter", label: "صياد ماهر 🏹", phase: 0 },
    { x: 380, y: 306, vx: -0.45, role: "builder", label: "مهندس بناء 🧱", phase: 1.5 },
    { x: 540, y: 302, vx: 0.5, role: "farmer", label: "مزارع الوادي 🌾", phase: 3.0 },
    { x: 720, y: 308, vx: -0.6, role: "scholar", label: "راصد فلكي 🔭", phase: 4.2 },
    { x: 460, y: 298, vx: 0.4, role: "guard", label: "حارس القبيلة 🛡️", phase: 2.1 }
  ];

  // 4. الحيوانات البرية المتحركة (غزلان، وعول، ذئاب)
  WorldEntities.animals = [
    { x: 130, y: 318, vx: 0.75, type: "gazelle", name: "غزال الوادي 🦌", phase: 0 },
    { x: 310, y: 322, vx: -0.65, type: "gazelle", name: "وعل جبلي 🐐", phase: 2.2 },
    { x: 830, y: 316, vx: -0.85, type: "wolf", name: "ذئب مروض 🐺", phase: 1.1 }
  ];

  // 5. الصقور والطيور المحلقة في السماء
  WorldEntities.birds = [
    { x: 150, y: 75, vx: 1.1, phase: 0 },
    { x: 480, y: 55, vx: 0.9, phase: 2.0 },
    { x: 780, y: 85, vx: -1.0, phase: 4.0 }
  ];

  // 6. شرارات نار المخيم
  WorldEntities.sparks = Array.from({ length: 28 }, () => ({
    x: 490 + (Math.random() - 0.5) * 20,
    y: 305,
    vx: (Math.random() - 0.5) * 0.8,
    vy: -Math.random() * 1.6 - 0.6,
    alpha: Math.random(),
    r: Math.random() * 2.5 + 1
  }));
}

function startWorldSimulation() {
  worldCanvas = document.getElementById("bc-world-canvas");
  if (!worldCanvas) return;
  worldCtx = worldCanvas.getContext("2d");

  const resize = () => {
    if (!worldCanvas) return;
    worldCanvas.width = worldCanvas.clientWidth || 960;
    worldCanvas.height = worldCanvas.clientHeight || 410;
  };
  resize();
  window.addEventListener("resize", resize);

  // التفاعل عند الضغط بالماوس داخل العالم الحي
  worldCanvas.onclick = (e) => {
    const rect = worldCanvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 960;
    const clickY = ((e.clientY - rect.top) / rect.height) * 410;

    GameState.xp += 5;
    GameState.morale = Math.min(100, GameState.morale + 1);
    WorldEntities.floatingTexts.push({
      x: clickX,
      y: clickY,
      text: "✨ +5 XP • همة عالية في الوادي!",
      alpha: 1.0
    });

    // جعل الحيوانات والبشر القريبين يتفاعلون بالسرعة
    WorldEntities.animals.forEach(a => {
      if (Math.abs(a.x - clickX) < 140) a.vx *= -1.3;
    });
    saveGameState();
    updateGameHUDOnly();
  };

  if (animFrameId) cancelAnimationFrame(animFrameId);
  let t = 0;

  function renderLoop() {
    t += 0.03;
    drawLivingAncientWorld(t);
    animFrameId = requestAnimationFrame(renderLoop);
  }
  renderLoop();
}

function drawLivingAncientWorld(t) {
  if (!worldCtx || !worldCanvas) return;
  const ctx = worldCtx;
  const W = 960;
  const H = 410;

  ctx.save();
  ctx.scale(worldCanvas.width / W, worldCanvas.height / H);

  // 1. رسم السماء المتدرجة حسب الوقت (نهار / غروب ذهبي / ليل فلكي)
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 290);
  if (GameState.timeOfDay === "night") {
    skyGrad.addColorStop(0, "#03050c");
    skyGrad.addColorStop(0.6, "#0b132b");
    skyGrad.addColorStop(1, "#1e1b4b");
  } else if (GameState.timeOfDay === "sunset") {
    skyGrad.addColorStop(0, "#1e1b4b");
    skyGrad.addColorStop(0.55, "#7c2d12");
    skyGrad.addColorStop(1, "#d97706");
  } else {
    skyGrad.addColorStop(0, "#0c4a6e");
    skyGrad.addColorStop(0.6, "#0284c7");
    skyGrad.addColorStop(1, "#fde68a");
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, 290);

  // 2. رسم النجوم أو الشمس المشرقة
  if (GameState.timeOfDay === "night") {
    WorldEntities.stars.forEach(st => {
      const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.5 + st.phase));
      ctx.fillStyle = `rgba(255, 255, 255, ${tw})`;
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fill();
    });
    // القمر المضيء
    ctx.fillStyle = "#fef08a";
    ctx.shadowBlur = 30;
    ctx.shadowColor = "#fef08a";
    ctx.beginPath();
    ctx.arc(820, 75, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  } else {
    // قرص الشمس الذهبي
    const sunY = GameState.timeOfDay === "sunset" ? 185 : 85;
    ctx.fillStyle = "#facc15";
    ctx.shadowBlur = 45;
    ctx.shadowColor = "#f59e0b";
    ctx.beginPath();
    ctx.arc(780, sunY, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // 3. الجبال والكثبان البعيدة
  ctx.fillStyle = GameState.timeOfDay === "night" ? "#0f172a" : "#78350f";
  ctx.beginPath();
  ctx.moveTo(0, 275);
  ctx.lineTo(180, 195);
  ctx.lineTo(390, 275);
  ctx.lineTo(620, 180);
  ctx.lineTo(840, 265);
  ctx.lineTo(W, 215);
  ctx.lineTo(W, 285);
  ctx.lineTo(0, 285);
  ctx.closePath();
  ctx.fill();

  // 4. الصرح الحضاري في الخلفية (يتطور مع مستوى اللاعب من 1 إلى 5!)
  drawMonumentByEra(ctx, GameState.level, t);

  // 5. ضفاف الوادي الأخضر الخصب
  const groundGrad = ctx.createLinearGradient(0, 268, 0, 345);
  groundGrad.addColorStop(0, GameState.timeOfDay === "night" ? "#064e3b" : "#15803d");
  groundGrad.addColorStop(1, GameState.timeOfDay === "night" ? "#1e293b" : "#a16207");
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, 268, W, 78);

  // 6. نهر النيل الجاري بالأمواج والانعكاسات في المقدمة
  const riverGrad = ctx.createLinearGradient(0, 340, 0, H);
  riverGrad.addColorStop(0, "#0369a1");
  riverGrad.addColorStop(1, "#082f49");
  ctx.fillStyle = riverGrad;
  ctx.fillRect(0, 340, W, H - 340);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 18; i++) {
    const waveX = ((i * 65 + t * 25) % (W + 60)) - 30;
    const waveY = 352 + (i % 3) * 18;
    ctx.beginPath();
    ctx.moveTo(waveX, waveY);
    ctx.quadraticCurveTo(waveX + 15, waveY - 4, waveX + 30, waveY);
    ctx.stroke();
  }

  // 7. رسم الأشجار الواقعية المتمايلة مع الرياح
  WorldEntities.trees.forEach(tr => drawSwayingTree(ctx, tr, t));

  // 8. رسم نار المخيم المقدسة والشرارات الصاعدة في المنتصف
  drawCentralCampfire(ctx, 490, 308, t);

  // 9. رسم الحيوانات البرية المتحركة (غزلان وذئاب)
  WorldEntities.animals.forEach(anim => {
    anim.x += anim.vx;
    if (anim.x > W - 50) anim.vx = -Math.abs(anim.vx);
    if (anim.x < 50) anim.vx = Math.abs(anim.vx);
    drawMovingAnimal(ctx, anim, t);
  });

  // 10. رسم البشر والعمال المتحركين بملابس العصر الحالي
  WorldEntities.humans.forEach(hum => {
    hum.x += hum.vx;
    if (hum.x > W - 70) hum.vx = -Math.abs(hum.vx);
    if (hum.x < 70) hum.vx = Math.abs(hum.vx);
    drawMovingHuman(ctx, hum, t, GameState.level);
  });

  // 11. رسم الصقور المحلقة في السماء
  WorldEntities.birds.forEach(b => {
    b.x += b.vx;
    if (b.x > W + 30) b.x = -30;
    if (b.x < -30) b.x = W + 30;
    const wingY = Math.sin(t * 4 + b.phase) * 6;
    ctx.strokeStyle = GameState.timeOfDay === "night" ? "#94a3b8" : "#1e293b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(b.x - 10, b.y + wingY);
    ctx.quadraticCurveTo(b.x - 4, b.y - 4, b.x, b.y);
    ctx.quadraticCurveTo(b.x + 4, b.y - 4, b.x + 10, b.y + wingY);
    ctx.stroke();
  });

  // 12. رسم "أليكس" الحارس التاريخي الطائر داخل عالم اللعبة
  const alexX = 500 + Math.cos(t * 0.8) * 140;
  const alexY = 140 + Math.sin(t * 1.4) * 22;
  drawAncientAlexInCanvas(ctx, alexX, alexY, t);

  // 13. تأثيرات الطقس (مطر الخصب أو عاصفة رملية)
  if (GameState.weather === "rain") {
    ctx.strokeStyle = "rgba(186, 230, 253, 0.45)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 45; i++) {
      const rx = (i * 29 + t * 90) % W;
      const ry = (i * 37 + t * 240) % H;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 4, ry + 12);
      ctx.stroke();
    }
  } else if (GameState.weather === "sandstorm") {
    ctx.fillStyle = "rgba(217, 119, 6, 0.18)";
    ctx.fillRect(0, 0, W, H);
  }

  // 14. النصوص العائمة التفاعلية عند النقر
  for (let i = WorldEntities.floatingTexts.length - 1; i >= 0; i--) {
    const ft = WorldEntities.floatingTexts[i];
    ft.y -= 0.8;
    ft.alpha -= 0.018;
    if (ft.alpha <= 0) {
      WorldEntities.floatingTexts.splice(i, 1);
      continue;
    }
    ctx.fillStyle = `rgba(250, 204, 21, ${ft.alpha})`;
    ctx.font = "bold 14px Cairo, sans-serif";
    ctx.fillText(ft.text, ft.x, ft.y);
  }

  ctx.restore();
}

function drawMonumentByEra(ctx, level, t) {
  const cx = 490;
  const baseY = 270;

  if (level === 1) {
    // دائرة أحجار ستونهنج بدائية
    ctx.fillStyle = "#64748b";
    [-45, -20, 15, 40].forEach(dx => {
      ctx.fillRect(cx + dx, baseY - 28, 10, 28);
    });
    ctx.fillRect(cx - 48, baseY - 34, 42, 7);
  } else if (level === 2) {
    // برج طيني ومخازن حبوب أولية
    ctx.fillStyle = "#92400e";
    ctx.beginPath();
    ctx.moveTo(cx - 45, baseY);
    ctx.lineTo(cx - 30, baseY - 55);
    ctx.lineTo(cx + 30, baseY - 55);
    ctx.lineTo(cx + 45, baseY);
    ctx.fill();
  } else if (level === 3) {
    // قلعة ومسبك البرونز العظيم مع شعلة عليا
    ctx.fillStyle = "#78350f";
    ctx.fillRect(cx - 55, baseY - 65, 110, 65);
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(cx, baseY - 72, 8 + Math.sin(t * 5) * 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (level === 4) {
    // هرم مدرج عظيم (مثل هرم زوسر)
    ctx.fillStyle = "#d97706";
    for (let s = 0; s < 4; s++) {
      const w = 130 - s * 28;
      ctx.fillRect(cx - w / 2, baseY - (s + 1) * 20, w, 20);
    }
  } else {
    // الهرم الذهبي الأكبر ومرصد النجوم الملكي
    const pyrGrad = ctx.createLinearGradient(cx, baseY - 115, cx, baseY);
    pyrGrad.addColorStop(0, "#facc15");
    pyrGrad.addColorStop(0.3, "#d97706");
    pyrGrad.addColorStop(1, "#78350f");
    ctx.fillStyle = pyrGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 95, baseY);
    ctx.lineTo(cx, baseY - 115);
    ctx.lineTo(cx + 95, baseY);
    ctx.closePath();
    ctx.fill();
    // قمة ذهبية مشعة
    ctx.shadowBlur = 25;
    ctx.shadowColor = "#facc15";
    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.arc(cx, baseY - 115, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function drawSwayingTree(ctx, tr, t) {
  const sway = Math.sin(t * 1.6 + tr.seed) * 6;
  ctx.save();
  ctx.translate(tr.x, tr.y);
  ctx.scale(tr.scale, tr.scale);

  // الجذع
  ctx.strokeStyle = "#451a03";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(sway * 0.5, -35, sway, -68);
  ctx.stroke();

  if (tr.type === "palm") {
    // سعف النخيل المتمايل
    ctx.strokeStyle = "#15803d";
    ctx.lineWidth = 3.5;
    [-32, -16, 0, 16, 32].forEach((angleOffset, i) => {
      ctx.beginPath();
      ctx.moveTo(sway, -68);
      ctx.quadraticCurveTo(sway + angleOffset * 0.8, -82, sway + angleOffset * 1.3, -55 + (i % 2) * 8);
      ctx.stroke();
    });
  } else {
    // مظلة شجرة السنط الخضراء
    ctx.fillStyle = "#166534";
    ctx.beginPath();
    ctx.ellipse(sway, -72, 34, 14, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawCentralCampfire(ctx, x, y, t) {
  // هالة ضوء النار على الأرض
  const glow = ctx.createRadialGradient(x, y, 4, x, y, 55 + Math.sin(t * 6) * 6);
  glow.addColorStop(0, "rgba(245, 158, 11, 0.55)");
  glow.addColorStop(1, "rgba(245, 158, 11, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, 60, 0, Math.PI * 2);
  ctx.fill();

  // أخشاب الموقد
  ctx.strokeStyle = "#451a03";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x - 14, y + 4);
  ctx.lineTo(x + 14, y - 4);
  ctx.moveTo(x - 14, y - 4);
  ctx.lineTo(x + 14, y + 4);
  ctx.stroke();

  // لهب النار المتحرك
  ctx.fillStyle = "#f97316";
  ctx.beginPath();
  ctx.moveTo(x - 10, y);
  ctx.quadraticCurveTo(x - 4, y - 26 - Math.sin(t * 8) * 5, x, y - 30);
  ctx.quadraticCurveTo(x + 6, y - 22, x + 10, y);
  ctx.fill();

  // الشرارات الصاعدة
  WorldEntities.sparks.forEach(sp => {
    sp.x += sp.vx;
    sp.y += sp.vy;
    sp.alpha -= 0.022;
    if (sp.alpha <= 0) {
      sp.x = x + (Math.random() - 0.5) * 16;
      sp.y = y - 6;
      sp.alpha = 1;
    }
    ctx.fillStyle = `rgba(253, 224, 71, ${sp.alpha})`;
    ctx.beginPath();
    ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawMovingHuman(ctx, hum, t, eraLevel) {
  const walkSwing = Math.sin(t * 5 + hum.phase) * 6;
  const dir = hum.vx >= 0 ? 1 : -1;

  ctx.save();
  ctx.translate(hum.x, hum.y);

  // الظل الأرضي
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.ellipse(0, 14, 9, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // الأرجل المتحركة
  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.moveTo(0, 2);
  ctx.lineTo(walkSwing, 14);
  ctx.moveTo(0, 2);
  ctx.lineTo(-walkSwing, 14);
  ctx.stroke();

  // الملابس حسب عصر الحضارة (فراء -> كتان أبيض -> رداء ملكي مذهب)
  ctx.fillStyle = eraLevel >= 4 ? "#f8fafc" : eraLevel >= 3 ? "#b45309" : "#78350f";
  ctx.fillRect(-5, -11, 10, 14);

  // الرأس
  ctx.fillStyle = "#d97706";
  ctx.beginPath();
  ctx.arc(0, -16, 5, 0, Math.PI * 2);
  ctx.fill();

  // الأداة في اليد (رمح / شعلة / حجر بناء)
  ctx.strokeStyle = "#facc15";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -6);
  ctx.lineTo(dir * 9, -2 + walkSwing * 0.4);
  ctx.stroke();

  if (hum.role === "hunter" || hum.role === "guard") {
    ctx.strokeStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.moveTo(dir * 9, 10);
    ctx.lineTo(dir * 11, -24);
    ctx.stroke();
  }

  ctx.restore();
}

function drawMovingAnimal(ctx, anim, t) {
  const legSwing = Math.sin(t * 7 + anim.phase) * 5;
  const dir = anim.vx >= 0 ? 1 : -1;

  ctx.save();
  ctx.translate(anim.x, anim.y);
  ctx.scale(dir, 1);

  ctx.fillStyle = anim.type === "wolf" ? "#475569" : "#ca8a04";
  ctx.strokeStyle = anim.type === "wolf" ? "#334155" : "#a16207";
  ctx.lineWidth = 2.4;

  // جسم الحيوان
  ctx.beginPath();
  ctx.ellipse(0, 0, 11, 5.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // الرقبة والرأس والقرون للغزال
  ctx.beginPath();
  ctx.moveTo(8, -2);
  ctx.lineTo(13, -10);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(14, -11, 3.5, 0, Math.PI * 2);
  ctx.fill();

  if (anim.type === "gazelle") {
    ctx.beginPath();
    ctx.moveTo(13, -13);
    ctx.lineTo(9, -20);
    ctx.stroke();
  }

  // القوائم الأربع المتحركة
  ctx.beginPath();
  ctx.moveTo(-7, 3);
  ctx.lineTo(-7 + legSwing, 12);
  ctx.moveTo(-4, 3);
  ctx.lineTo(-4 - legSwing, 12);
  ctx.moveTo(6, 3);
  ctx.lineTo(6 + legSwing, 12);
  ctx.moveTo(8, 3);
  ctx.lineTo(8 - legSwing, 12);
  ctx.stroke();

  ctx.restore();
}

function drawAncientAlexInCanvas(ctx, x, y, t) {
  ctx.save();
  ctx.translate(x, y);

  // هالة أليكس الذهبية
  ctx.fillStyle = "rgba(212, 175, 55, 0.22)";
  ctx.beginPath();
  ctx.arc(0, 0, 22 + Math.sin(t * 3) * 3, 0, Math.PI * 2);
  ctx.fill();

  // أجنحة الصقر الذهبية
  const wingY = Math.sin(t * 8) * 6;
  ctx.fillStyle = "#d4af37";
  ctx.beginPath();
  ctx.ellipse(-16, wingY, 9, 4, -0.3, 0, Math.PI * 2);
  ctx.ellipse(16, wingY, 9, 4, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // جسم أليكس الفرعوني المصغر
  ctx.fillStyle = "#141926";
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // عيون أليكس المضيئة
  ctx.fillStyle = "#06b6d4";
  ctx.beginPath();
  ctx.arc(-4, -2, 2.2, 0, Math.PI * 2);
  ctx.arc(4, -2, 2.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/* ============================================================================
   2. CHARACTER AVATAR & WARDROBE SVG GENERATOR (5 ERAS OF OUTFITS)
   ============================================================================ */
function buildAvatarSVG(eraObj) {
  const { robeColor, trimColor, headgear, tool } = eraObj;

  let headHtml = "";
  if (headgear === "band") {
    headHtml = `<rect x="68" y="34" width="44" height="7" rx="3" fill="${trimColor}" />`;
  } else if (headgear === "feathers") {
    headHtml = `
      <path d="M85 32 L78 10 L90 28 L96 8 L98 32 Z" fill="#f59e0b" />
      <rect x="68" y="32" width="44" height="7" rx="3" fill="${trimColor}" />
    `;
  } else if (headgear === "helmet") {
    headHtml = `<path d="M66 42 Q90 12 114 42 Z" fill="#d97706" stroke="#fef08a" stroke-width="2" />`;
  } else if (headgear === "nemes") {
    headHtml = `<path d="M60 32 Q90 16 120 32 L126 78 L54 78 Z" fill="#1e3a8a" stroke="#d4af37" stroke-width="3" />`;
  } else if (headgear === "crown") {
    headHtml = `
      <path d="M64 36 L72 10 L90 24 L108 10 L116 36 Z" fill="#facc15" stroke="#fef08a" stroke-width="2" />
      <circle cx="90" cy="26" r="5" fill="#06b6d4" />
    `;
  }

  let toolHtml = "";
  if (tool === "spear") {
    toolHtml = `<line x1="142" y1="30" x2="142" y2="195" stroke="#78350f" stroke-width="5" /><polygon points="142,12 135,32 149,32" fill="#cbd5e1" />`;
  } else if (tool === "torch") {
    toolHtml = `<line x1="142" y1="75" x2="142" y2="190" stroke="#78350f" stroke-width="6" /><circle cx="142" cy="62" r="14" fill="#f97316" /><circle cx="142" cy="60" r="8" fill="#fef08a" />`;
  } else if (tool === "hammer") {
    toolHtml = `<line x1="142" y1="75" x2="142" y2="185" stroke="#78350f" stroke-width="6" /><rect x="126" y="62" width="32" height="18" rx="4" fill="#475569" stroke="#d97706" stroke-width="2" />`;
  } else if (tool === "scroll") {
    toolHtml = `<rect x="128" y="95" width="26" height="36" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="2" />`;
  } else {
    // مفتاح الحياة والصولجان الذهبي (Ankh & Royal Staff)
    toolHtml = `
      <line x1="142" y1="45" x2="142" y2="195" stroke="#facc15" stroke-width="5" />
      <circle cx="142" cy="34" r="11" fill="none" stroke="#facc15" stroke-width="4" />
      <line x1="130" y1="54" x2="154" y2="54" stroke="#facc15" stroke-width="4" />
    `;
  }

  return `
    <svg viewBox="0 0 180 210" class="bc-avatar-svg-wrap" xmlns="http://www.w3.org/2000/svg">
      <circle cx="90" cy="105" r="76" fill="rgba(212, 175, 55, 0.08)" stroke="rgba(212, 175, 55, 0.25)" stroke-dasharray="5 5" />
      ${headgear === "nemes" ? headHtml : ""}
      <!-- الأكتاف والرداء التاريخي -->
      <path d="M48 195 L58 88 Q90 78 122 88 L132 195 Z" fill="${robeColor}" stroke="${trimColor}" stroke-width="3" />
      <!-- القلادة الملكية على الصدر -->
      <path d="M66 90 Q90 112 114 90" fill="none" stroke="${trimColor}" stroke-width="6" stroke-linecap="round" />
      <!-- الحزام التاريخي -->
      <rect x="57" y="138" width="66" height="10" rx="4" fill="${trimColor}" />
      <!-- الرأس والوجه -->
      <circle cx="90" cy="54" r="22" fill="#d97706" stroke="#78350f" stroke-width="2" />
      <!-- العيون -->
      <circle cx="82" cy="52" r="2.8" fill="#0f172a" />
      <circle cx="98" cy="52" r="2.8" fill="#0f172a" />
      <path d="M83 63 Q90 68 97 63" fill="none" stroke="#451a03" stroke-width="2.5" stroke-linecap="round" />
      ${headgear !== "nemes" ? headHtml : ""}
      ${toolHtml}
    </svg>
  `;
}

/* ============================================================================
   3. RENDER GAME UI & INTERACTIVE ENGINEERING PUZZLES
   ============================================================================ */
function renderAncientGameTab() {
  const container = document.getElementById("view-ancient-game");
  if (!container) return;

  loadGameState();
  const currentOutfit = BC_ERAS[GameState.selectedOutfitIdx] || BC_ERAS[0];
  const currentEra = BC_ERAS[GameState.level - 1] || BC_ERAS[0];
  const currentDilemma = BC_DILEMMAS[GameState.dilemmaIdx % BC_DILEMMAS.length];

  container.innerHTML = `
    <div class="bc-game-shell">
      <!-- 1. شاشة العالم الحي المتحرك (بشر، حيوانات، أشجار، نيل، نار، وأليكس) -->
      <div class="bc-world-stage">
        <canvas id="bc-world-canvas"></canvas>

        <div class="bc-world-hud-top">
          <div class="bc-hud-pill">
            <i class="fa-solid fa-crown gold-text"></i>
            <span id="bc-hud-era-name">${ currentEra.eraName }</span>
            <span class="badge badge-gold" id="bc-hud-lvl">Lv. ${GameState.level} (${GameState.xp} XP)</span>
          </div>

          <div class="filters-row" style="pointer-events:auto;">
            <button type="button" id="btn-bc-time" class="bc-hud-pill" title="تغيير وقت اليوم في الوادي">
              <i class="fa-solid fa-sun gold-text"></i>
              <span>${GameState.timeOfDay === "day" ? "النهار المشمس" : GameState.timeOfDay === "sunset" ? "غروب ذهبي" : "ليل الرصد الفلكي"}</span>
            </button>
            <button type="button" id="btn-bc-weather" class="bc-hud-pill" title="تغيير طقس الوادي">
              <i class="fa-solid fa-cloud-sun-rain gold-text"></i>
              <span>${GameState.weather === "clear" ? "جو صافٍ" : GameState.weather === "rain" ? "أمطار الخير" : "رياح الصحراء"}</span>
            </button>
            <button type="button" id="btn-bc-audio" class="bc-hud-pill" title="صوت نار المخيم والطبيعة">
              <i class="fa-solid ${GameState.soundEnabled ? "fa-volume-high gold-text" : "fa-volume-xmark"}"></i>
              <span>${GameState.soundEnabled ? "صوت الطبيعة: حي" : "تشغيل صوت الوادي"}</span>
            </button>
            <button type="button" id="btn-bc-certificate" class="btn btn-gold btn-sm">
              <i class="fa-solid fa-scroll"></i> وثيقة البردية القيادية
            </button>
          </div>
        </div>

        <div class="bc-alex-advisor-bar">
          <div class="flex-between" style="gap:10px;">
            <span class="badge badge-gold">🤖 أليكس حارس الحكمة</span>
            <span id="bc-alex-live-comment">${escapeHTML(GameState.alexComment)}</span>
          </div>
          <small class="small-muted">اضغط في أي مكان داخل الوادي لتشجيع العمال (+XP)</small>
        </div>
      </div>

      <!-- 2. شريط موارد الحضارة الأربعة -->
      <div class="bc-resources-bar">
        <div class="bc-res-card">
          <div class="flex-between"><span>🌾 المؤن والقمح</span> <strong class="gold-text" id="bc-res-food">${GameState.food}%</strong></div>
          <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${Math.min(100, GameState.food)}%"></div></div>
        </div>
        <div class="bc-res-card">
          <div class="flex-between"><span>🧠 الحكمة والهندسة</span> <strong class="gold-text" id="bc-res-wisdom">${GameState.wisdom}%</strong></div>
          <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${Math.min(100, GameState.wisdom)}%"></div></div>
        </div>
        <div class="bc-res-card">
          <div class="flex-between"><span>👥 تماسك وأخلاق القبيلة</span> <strong class="gold-text" id="bc-res-morale">${GameState.morale}%</strong></div>
          <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${Math.min(100, GameState.morale)}%"></div></div>
        </div>
        <div class="bc-res-card">
          <div class="flex-between"><span>🛡️ التحصين والبرونز</span> <strong class="gold-text" id="bc-res-def">${GameState.defense}%</strong></div>
          <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${Math.min(100, GameState.defense)}%"></div></div>
        </div>
      </div>

      <!-- 3. منطقة الشخصية والأزياء + القرارات المصيرية والألغاز الهندسية -->
      <div class="bc-main-grid">
        <!-- خزانة الشخصيات والأزياء التاريخية -->
        <div class="bc-avatar-stage">
          <span class="badge badge-gold mb-1">الشخصية والزي الحالي</span>
          <div id="bc-avatar-svg-box">${buildAvatarSVG(currentOutfit)}</div>
          <h3 class="gold-text">${currentOutfit.charTitle}</h3>
          <p class="small-muted mt-1">${currentOutfit.outfitName}</p>

          <hr class="divider" />
          <small class="small-muted d-block mb-1">اختر من الشخصيات والأزياء المفتوحة حسب مستواك:</small>
          <div class="bc-outfits-row">
            ${BC_ERAS.map((er, idx) => {
              const isUnlocked = GameState.level >= er.level;
              const isActive = GameState.selectedOutfitIdx === idx;
              return `
                <button type="button" class="bc-outfit-chip ${isActive ? "active" : isUnlocked ? "unlocked" : "locked"}" data-outfit-idx="${idx}">
                  ${isUnlocked ? "🔓" : "🔒"} Lv.${er.level}
                </button>
              `;
            }).join("")}
          </div>
        </div>

        <!-- مجلس القرارات المصيرية + الألغاز الهندسية الأربعة -->
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div class="card">
            <div class="card-header">
              <h3><i class="fa-solid fa-scale-balanced gold-text"></i> مجلس القرارات المصيرية: ${currentDilemma.title}</h3>
              <span class="badge badge-emerald">+40 XP لكل قرار حكيم</span>
            </div>
            <p class="mb-2">${currentDilemma.desc}</p>
            <div>
              ${currentDilemma.choices.map((ch, idx) => `
                <button type="button" class="bc-choice-btn" data-choice-idx="${idx}">
                  <span>${ch.text}</span>
                  <i class="fa-solid fa-chevron-left gold-text"></i>
                </button>
              `).join("")}
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3><i class="fa-solid fa-compass-drafting gold-text"></i> مختبر ألغاز الهندسة والفيزياء القديمة (ارفع مستواك وافتح الملابس!)</h3>
            </div>
            <div class="bc-puzzles-grid">
              <div class="bc-puzzle-card">
                <div>
                  <strong>🪨 1. فيزياء جرّ المسلات</strong>
                  <p class="small-muted mt-1">اضبط نسبة سكب الماء أمام الزلاجات الخشبية لتقليل معامل احتكاك الرمال 50%.</p>
                </div>
                <button type="button" class="btn btn-xs btn-gold" data-bc-puzzle="sled">حل اللغز (+60 XP)</button>
              </div>

              <div class="bc-puzzle-card">
                <div>
                  <strong>🔥 2. سبيكة البرونز الملكية</strong>
                  <p class="small-muted mt-1">اضبط معادلة النحاس والقصدير وحرارة الفرن عند 1085°م لصناعة أصلب سيف.</p>
                </div>
                <button type="button" class="btn btn-xs btn-gold" data-bc-puzzle="bronze">حل اللغز (+60 XP)</button>
              </div>

              <div class="bc-puzzle-card">
                <div>
                  <strong>🔭 3. محاذاة نجم الشمال</strong>
                  <p class="small-muted mt-1">استخدم أداة "المرخت" الفلكية لتوجيه أضلاع المعبد نحو نجم الثعبان بدقة 0°.</p>
                </div>
                <button type="button" class="btn btn-xs btn-gold" data-bc-puzzle="stars">حل اللغز (+60 XP)</button>
              </div>

              <div class="bc-puzzle-card">
                <div>
                  <strong>🌊 4. هيدروليكا مقياس النيل</strong>
                  <p class="small-muted mt-1">احسب زاوية فتح بوابات السد الترابي لتوزيع مياه الفيضان دون غرق الوادي.</p>
                </div>
                <button type="button" class="btn btn-xs btn-gold" data-bc-puzzle="nile">حل اللغز (+60 XP)</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  bindAncientGameEvents();
  startWorldSimulation();
}

function updateGameHUDOnly() {
  recalcLevel();
  const currentEra = BC_ERAS[GameState.level - 1] || BC_ERAS[0];
  const lvlEl = document.getElementById("bc-hud-lvl");
  const eraEl = document.getElementById("bc-hud-era-name");
  if (lvlEl) lvlEl.textContent = `Lv. ${GameState.level} (${GameState.xp} XP)`;
  if (eraEl) eraEl.textContent = currentEra.eraName;
}

function bindAncientGameEvents() {
  // تبديل الوقت (نهار / غروب / ليل)
  document.getElementById("btn-bc-time")?.addEventListener("click", () => {
    const order = ["day", "sunset", "night"];
    GameState.timeOfDay = order[(order.indexOf(GameState.timeOfDay) + 1) % order.length];
    saveGameState();
    renderAncientGameTab();
  });

  // تبديل الطقس
  document.getElementById("btn-bc-weather")?.addEventListener("click", () => {
    const order = ["clear", "rain", "sandstorm"];
    GameState.weather = order[(order.indexOf(GameState.weather) + 1) % order.length];
    saveGameState();
    renderAncientGameTab();
  });

  // صوت الطبيعة ونار المخيم
  document.getElementById("btn-bc-audio")?.addEventListener("click", () => {
    GameState.soundEnabled = !GameState.soundEnabled;
    if (typeof toggleAmbientSound === "function") toggleAmbientSound("fire");
    renderAncientGameTab();
  });

  // اختيار الملابس والشخصيات المفتوحة
  document.querySelectorAll("[data-outfit-idx]").forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.outfitIdx);
      const targetEra = BC_ERAS[idx];
      if (GameState.level < targetEra.level) {
        if (typeof showToast === "function") {
          showToast(`🔒 هذه الشخصية واللبس يفتحان في المستوى ${targetEra.level}! حل الألغاز واتخذ القرارات لرفع مستواك.`, "error");
        }
        return;
      }
      GameState.selectedOutfitIdx = idx;
      saveGameState();
      renderAncientGameTab();
    };
  });

  // اتخاذ قرار في المعضلات التاريخية
  document.querySelectorAll("[data-choice-idx]").forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.choiceIdx);
      const dilemma = BC_DILEMMAS[GameState.dilemmaIdx % BC_DILEMMAS.length];
      const ch = dilemma.choices[idx];
      if (!ch) return;

      const oldLevel = GameState.level;
      GameState.food = Math.max(5, Math.min(100, GameState.food + (ch.effects.food || 0)));
      GameState.wisdom = Math.max(5, Math.min(100, GameState.wisdom + (ch.effects.wisdom || 0)));
      GameState.morale = Math.max(5, Math.min(100, GameState.morale + (ch.effects.morale || 0)));
      GameState.defense = Math.max(5, Math.min(100, GameState.defense + (ch.effects.defense || 0)));
      GameState.xp += 40;
      GameState.dilemmaIdx++;
      GameState.alexComment = ch.alexReply;

      if (ch.effects.archTrait) GameState.traits.arch += ch.effects.archTrait;
      if (ch.effects.tactTrait) GameState.traits.tact += ch.effects.tactTrait;
      if (ch.effects.moralTrait) GameState.traits.moral += ch.effects.moralTrait;

      saveGameState();
      if (GameState.level > oldLevel) {
        GameState.selectedOutfitIdx = GameState.level - 1;
        saveGameState();
        if (typeof launchAlexConfetti === "function") launchAlexConfetti();
        if (typeof showToast === "function") {
          showToast(`🎉 ارتقيت إلى المستوى ${GameState.level}! تم فتح شخصية ولبس تاريخي جديد وصرح معماري أعظم!`, "success");
        }
      }
      renderAncientGameTab();
    };
  });

  // فتح الألغاز الهندسية الأربعة
  document.querySelectorAll("[data-bc-puzzle]").forEach(btn => {
    btn.onclick = () => openAncientEngineeringPuzzle(btn.dataset.bcPuzzle);
  });

  // تحميل شهادة البردية التاريخية للقائد
  document.getElementById("btn-bc-certificate")?.addEventListener("click", downloadPapyrusLeaderCertificate);
}

/* ============================================================================
   4. REALISTIC HISTORICAL & ENGINEERING PUZZLES (MAX REALISM)
   ============================================================================ */
function openAncientEngineeringPuzzle(type) {
  if (type === "sled") {
    const q = prompt("🪨 لغز فيزياء جرّ المسلات (10 أطنان):\n\nاكتشف المهندسون القدماء أن سكب الماء أمام الزلاجة الخشبية يربط حبيبات الرمل ويقلل الاحتكاك بنسبة 50%.\nإذا كانت الرمال الجافة تماماً = 0%، والوحل الغارق = 100%، ما هي نسبة الرطوبة المثالية المئوية لتقليل الاحتكاك (اكتب رقماً بين 5 و 10)؟", "7");
    if (q === null) return;
    if (Number(q) >= 5 && Number(q) <= 10) {
      rewardPuzzleSuccess("عبقري فيزياء! نسبة الرطوبة 7% كونت جسوراً شعرية في الرمل وتحركت المسلة بنصف عدد العمال! 🪨✨");
    } else {
      alert("❌ نسبة غير دقيقة! تذكر أن الرطوبة الخفيفة (بين 5% و 10%) هي سر انزلاق الزلاجات الفرعونية.");
    }
  } else if (type === "bronze") {
    const q = prompt("🔥 لغز معادلة سبيكة البرونز الملكية:\n\nلتحويل النحاس الطري إلى برونز خارق الصلابة، نخلط 90% من النحاس المنصهر عند 1085°م مع نسبة محددة من القصدير (Tin).\nكم هي النسبة المئوية الصحيحة للقصدير لإكمال الـ 100%؟", "10");
    if (q === null) return;
    if (Number(q) === 10) {
      rewardPuzzleSuccess("سيد المعادن بحق! سبيكة (90% نحاس + 10% قصدير) أنتجت أقوى دروع وأدوات هندسية في الوادي! ⚔️🔥");
    } else {
      alert("❌ النسبة الصحيحة تاريخياً وعلمياً هي 10% قصدير مع 90% نحاس!");
    }
  } else if (type === "stars") {
    const q = prompt("🔭 لغز الرصد الفلكي ومحاذاة الأهرامات:\n\nأركان الهرم الأربع تتجه نحو الجهات الأصلية (شمال، جنوب، شرق، غرب) بدقة مذهلة.\nكم هي الزاوية القائمة بالدرجات التي يجب أن يصنعها الضلع الشمالي مع الضلع الشرقي للمعبد؟", "90");
    if (q === null) return;
    if (Number(q) === 90) {
      rewardPuzzleSuccess("دقة فلكية خارقة! باستخدام حبل الـ 12 عقدة (مثلث فيثاغورس 3-4-5) حققت زاوية 90° مثالية مع نجم الشمال! 🔭🌌");
    } else {
      alert("❌ الزاوية القائمة الهندسية هي 90 درجة!");
    }
  } else if (type === "nile") {
    const q = prompt("🌊 لغز هيدروليكا مقياس النيل:\n\nارتفع الفيضان بمقدار 18 ذراعاً، وتحتاج لتصريف ثلث المياه (1/3) في القناة الشرقية لحماية القرية.\nكم ذراعاً من المياه يجب توجيهها للقناة الشرقية؟", "6");
    if (q === null) return;
    if (Number(q) === 6) {
      rewardPuzzleSuccess("مهندس ري عظيم! تصريف 6 أذرع حفظ القرية وملأ بحيرة التخزين لموسم الجفاف! 🌊🌴");
    } else {
      alert("❌ ثلث الـ 18 ذراعاً يساوي 6 أذرع!");
    }
  }
}

function rewardPuzzleSuccess(msg) {
  const oldLevel = GameState.level;
  GameState.xp += 60;
  GameState.wisdom = Math.min(100, GameState.wisdom + 15);
  GameState.alexComment = msg;
  saveGameState();
  if (GameState.level > oldLevel) {
    GameState.selectedOutfitIdx = GameState.level - 1;
    saveGameState();
  }
  if (typeof launchAlexConfetti === "function") launchAlexConfetti();
  if (typeof showToast === "function") showToast("🎉 +60 XP! " + msg, "success");
  renderAncientGameTab();
}

/* ============================================================================
   5. DOWNLOADABLE PAPYRUS LEADER MATRIX CERTIFICATE (وثيقة البردية التاريخية)
   ============================================================================ */
function downloadPapyrusLeaderCertificate() {
  const c = document.createElement("canvas");
  c.width = 860;
  c.height = 500;
  const ctx = c.getContext("2d");

  // خلفية بردية ملكية مذهبة
  const grad = ctx.createLinearGradient(0, 0, 860, 500);
  grad.addColorStop(0, "#1c1917");
  grad.addColorStop(0.5, "#292524");
  grad.addColorStop(1, "#0c0a09");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 860, 500);

  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 5;
  ctx.strokeRect(22, 22, 816, 456);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(32, 32, 796, 436);

  const era = BC_ERAS[GameState.level - 1] || BC_ERAS[0];
  const archetype =
    GameState.traits.arch >= GameState.traits.tact && GameState.traits.arch >= GameState.traits.moral
      ? "🏛️ المهندس المعماري العظيم وباني الصروح"
      : GameState.traits.moral >= GameState.traits.tact
      ? "🌿 الحكيم العادل وراعي الإنسانية"
      : "🛡️ القائد الاستراتيجي وحامي الوادي";

  ctx.fillStyle = "#d4af37";
  ctx.font = "bold 32px Cairo, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("📜 بردية القيادة والحكمة الخالدة • 3000 ق.م", 430, 85);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 26px Cairo, sans-serif";
  ctx.fillText(`القائد التاريخي: ${era.charTitle}`, 430, 145);

  ctx.fillStyle = "#10b981";
  ctx.font = "bold 21px Cairo, sans-serif";
  ctx.fillText(`النمط القيادي: ${archetype}`, 430, 195);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "20px Cairo, sans-serif";
  ctx.fillText(`• العصر الحضاري: ${era.eraName} (المستوى ${GameState.level} — ${GameState.xp} XP)`, 430, 260);
  ctx.fillText(`• الزي التاريخي: ${era.outfitName}`, 430, 305);
  ctx.fillText(`• مؤشرات الوادي: الحكمة ${GameState.wisdom}% | المؤن ${GameState.food}% | التماسك ${GameState.morale}%`, 430, 350);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "16px Cairo, sans-serif";
  ctx.fillText(`MY LIFE OS • DAWN OF LEGENDS • Eng:Ahmed M Hosny`, 430, 435);

  const a = document.createElement("a");
  a.download = `papyrus-leader-certificate-lv${GameState.level}.png`;
  a.href = c.toDataURL("image/png");
  a.click();
}

// تهيئة اللعبة تلقائياً عند فتح التبويب أو تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  renderAncientGameTab();

  document.addEventListener("click", (e) => {
    const navBtn = e.target.closest('[data-view="ancient-game"]');
    if (navBtn) {
      setTimeout(renderAncientGameTab, 60);
    }
  });
});
