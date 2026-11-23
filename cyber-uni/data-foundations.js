/**
 * MY LIFE OS — CYBERSECURITY UNIVERSITY
 * Data Layer 1: Metadata, Reference Frameworks & Levels 0, 1, 2 (Common Core)
 */

export const UNIVERSITY_META = {
  name: "CYBERSECURITY UNIVERSITY",
  subtitle: "From Absolute Zero to Cybersecurity Professional",
  curriculumVersion: "2.0.0-academic",
  lastReviewed: "2026-11",
  frameworks: [
    { id: "nice", name: "NIST NICE Workforce Framework v2.2.0", scope: "الأدوار المهنية والمهارات (تحديث أبريل 2026)" },
    { id: "csf", name: "NIST Cybersecurity Framework (CSF) 2.0", scope: "حوكمة وإدارة مخاطر الأمن السيبراني" },
    { id: "owasp25", name: "OWASP Top 10:2025 + ASVS + WSTG + API + LLM", scope: "أمن تطبيقات الويب والـ APIs والذكاء الاصطناعي" },
    { id: "attack", name: "MITRE ATT&CK Enterprise / ICS / Mobile", scope: "تكتيكات وتقنيات المهاجمين وربطها بالكشف والدفاع" },
    { id: "cis", name: "CIS Controls v8.1 & CIS Benchmarks", scope: "ضوابط تقوية الأنظمة وحماية المؤسسات" },
    { id: "iso", name: "ISO/IEC 27001 & IEC 62443", scope: "إدارة أمن المعلومات والأمن الصناعي OT/ICS" }
  ],
  legalPolicy: "جميع التدريبات والمختبرات داخل الجامعة مخصصة للبيئات المحلية المعزولة ومنصات التدريب المصرح بها فقط. يُمنع منعاً باتاً تطبيق أي اختبار على أنظمة حقيقية دون تصريح كتابي ونطاق (Scope) محدد."
};

export const MASTERY_STATES = {
  NOT_STARTED: "Not Started",
  LEARNING: "Learning",
  PRACTICING: "Practicing",
  ASSESSMENT_PENDING: "Assessment Pending",
  MASTERED: "Mastered",
  NEEDS_REVIEW: "Needs Review"
};

export const DEFAULT_EVAL_WEIGHTS = {
  theory: 20,
  practical: 25,
  labs: 25,
  projects: 20,
  reporting: 10
};

/**
 * 19-Part Standardized Lesson Builder (يضمن بنية أكاديمية موحدة لكل درس)
 */
export function createStandardLesson(cfg) {
  return {
    id: cfg.id,
    titleAr: cfg.titleAr,
    titleEn: cfg.titleEn,
    description: cfg.description,
    whyStudy: cfg.whyStudy,
    prerequisites: cfg.prerequisites || [],
    objectives: cfg.objectives || [],
    theory: cfg.theory || "",
    realWorldExamples: cfg.realWorldExamples || [],
    diagramAscii: cfg.diagramAscii || "",
    practicalExamples: cfg.practicalExamples || [],
    commands: cfg.commands || [], // [{ cmd, explain }]
    commonMistakes: cfg.commonMistakes || [],
    exercises: cfg.exercises || [],
    quiz: cfg.quiz || [], // [{ q, options, answerIdx, explain }]
    lab: cfg.lab || null,
    homework: cfg.homework || "",
    summary: cfg.summary || "",
    references: cfg.references || [],
    masteryCriteria: cfg.masteryCriteria || [
      "اجتياز الاختبار النظري بنسبة لا تقل عن 80%",
      "تنفيذ التمرين العملي والمختبر المعزول وتوثيق النتيجة"
    ]
  };
}

export const FOUNDATION_MODULES = [
  /* ===================== LEVEL 0 — ABSOLUTE ZERO ===================== */
  {
    id: "L0_M1",
    level: 0,
    zone: "Foundation Zone",
    title: "Module 0.1 — Digital Literacy",
    titleAr: "محو الأمية الرقمية وهندسة الحاسوب الأساسية",
    description: "كيف يعمل الكمبيوتر من الداخل، الفرق بين Hardware وSoftware، أنظمة الملفات والأنظمة العددية وتثبيت أنظمة التشغيل.",
    prerequisites: [],
    estimatedHours: 14,
    difficulty: "Absolute Zero",
    mapPos: { x: 110, y: 120 },
    skills: ["Hardware Architecture Basics", "BIOS/UEFI", "File Systems & Permissions", "Binary/Hex/Decimal", "OS Installation"],
    topics: [
      "ما هو الكمبيوتر وكيف تعمل أجهزته؟", "الفرق بين Hardware وSoftware",
      "CPU / RAM / ROM / Storage (HDD vs SSD) / GPU / Motherboard / PSU",
      "BIOS وUEFI وعملية الإقلاع", "Input & Output Devices",
      "File Systems / Files & Folders / Extensions / File Permissions",
      "Binary / Decimal / Hexadecimal / Bits & Bytes / Data Representation",
      "تثبيت البرامج والتعامل مع Windows وLinux وفك الضغط والإنترنت"
    ],
    labs: ["إعداد بيئة الجهاز وفحص مكونات العتاد وتثبيت نظام تشغيل داخل آلة افتراضية"],
    projects: ["تقرير جرد عتاد الجهاز وخريطة تقسيم القرص ونظام الملفات"],
    lessons: [
      createStandardLesson({
        id: "L0_M1_L1",
        titleAr: "كيف يعمل الحاسوب من الداخل وتمثيل البيانات",
        titleEn: "How Computers Work & Data Representation",
        description: "فهم رحلة البيانات من الكهرباء والبت (Bit) إلى البرامج ونظام التشغيل.",
        whyStudy: "لا يمكن تأمين نظام لا تفهم كيف يعالج التعليمات أو يخزن البيانات في الذاكرة والقرص.",
        prerequisites: ["لا توجد متطلبات سابقة"],
        objectives: [
          "التمييز الدقيق بين المعالج CPU والذاكرة العشوائية RAM والتخزين الدائم SSD/HDD",
          "فهم دور BIOS/UEFI قبل تحميل نظام التشغيل",
          "التحويل اليدوي بين الأنظمة الثنائية والعشرية والست عشرية"
        ],
        theory: "الحاسوب آلة معالجة إلكترونية تنفذ دورة مستمرة تسمى Fetch-Decode-Execute. يجلب المعالج (CPU) التعليمات من الذاكرة السريعة المتطايرة (RAM) التي تحمل البرامج قيد التشغيل من القرص (SSD/HDD). عند تشغيل الجهاز يبدأ برنامج UEFI/BIOS بفحص العتاد (POST) ثم يسلم القيادة لمحمّل نظام التشغيل (Bootloader). كل نص أو صورة أو ملف تنفيذي يُمثَّل في النهاية كسلاسل من 0 و1 (Bits)؛ كل 8 Bits تساوي 1 Byte، ونستخدم النظام الست عشري (Hex) لقراءة الذاكرة والملفات بوضوح.",
        realWorldExamples: [
          "عند فحص ذاكرة برنامج مشبوه لاحقاً في التحليل الجنائي، ستقرأ قيم الذاكرة بصيغة Hexadecimal مثل 0x4D5A (ترويسة ملفات Windows التنفيذية MZ).",
          "فهم UEFI يفسر لاحقاً كيف تعمل حماية Secure Boot لمنع برمجيات الإقلاع الخبيثة (Bootkits)."
        ],
        diagramAscii: "[Power On] -> [UEFI/BIOS POST] -> [Bootloader] -> [OS Kernel -> RAM] -> [CPU Fetch/Decode/Execute]",
        practicalExamples: [
          "تحويل الرقم العشري 192 (بداية عناوين الشبكة المنزلية) إلى الثنائي: 11000000 وإلى الست عشري: C0.",
          "عرض الامتدادات المخفية في Windows للتأكد أن الملف ليس report.pdf.exe."
        ],
        commands: [
          { cmd: "systeminfo", explain: "يعرض في Windows تفاصيل المعالج والذاكرة ونوع الإقلاع وإصدار النظام." },
          { cmd: "lscpu && free -h", explain: "يعرض في Linux معمارية المعالج واستهلاك الذاكرة RAM." }
        ],
        commonMistakes: [
          "الخلط بين سعة التخزين (SSD) والذاكرة العشوائية (RAM).",
          "الاعتماد على أيقونة الملف بدلاً من فحص الامتداد الحقيقي أو التوقيع الثنائي (Magic Bytes)."
        ],
        exercises: [
          "حوّل الأرقام 10 و172 و255 إلى Binary وHex.",
          "فعّل خيار إظهار امتدادات الملفات (File name extensions) على جهازك."
        ],
        quiz: [
          {
            q: "ما المكون الذي يحتفظ بالبرامج المفتوحة حالياً ويفقد بياناته عند انقطاع الكهرباء؟",
            options: ["SSD", "RAM", "ROM", "BIOS"],
            answerIdx: 1,
            explain: "الـ RAM ذاكرة متطايرة سريعة لتشغيل البرامج النشطة."
          },
          {
            q: "ما القيمة الثنائية للرقم العشري 10؟",
            options: ["1010", "1100", "1001", "1110"],
            answerIdx: 0,
            explain: "8 + 2 = 10 وبالتالي 1010 بالنظام الثنائي."
          }
        ],
        lab: {
          title: "Lab 0.1 — فحص عتاد الجهاز وبنية الملفات",
          environment: "جهازك الشخصي (بدون أي أدوات هجومية)",
          steps: ["افتح موجه الأوامر ونفّذ systeminfo أو lscpu", "أنشئ مجلد CyberLab وملف نصي وغيّر صلاحياته", "سجّل حجم RAM ونوع التخزين ونوع BIOS/UEFI"]
        },
        homework: "اكتب ملخصاً من صفحة واحدة تشرح فيه لماذا يفحص محققو الأمن السيبراني الذاكرة العشوائية RAM قبل إطفاء الجهاز المخترق.",
        summary: "فهم العتاد ونظام الإقلاع والأنظمة العددية هو الحجر الأساس لقراءة الشبكات والذاكرة والملفات لاحقاً.",
        references: ["CompTIA Tech+ Official Objectives", "Computer Science Unplugged — Binary Representation"]
      })
    ]
  },
  {
    id: "L0_M2",
    level: 0,
    zone: "Foundation Zone",
    title: "Module 0.2 — Internet Fundamentals",
    titleAr: "أساسيات الإنترنت والويب ونقل البيانات",
    description: "كيف يعمل الإنترنت فعلياً: Client/Server، عناوين IP، نظام DNS، بروتوكولات HTTP/HTTPS، الكوكيز والجلسات وSSL/TLS.",
    prerequisites: ["L0_M1"],
    estimatedHours: 10,
    difficulty: "Absolute Zero",
    mapPos: { x: 110, y: 260 },
    skills: ["Client-Server Model", "DNS & IP Basics", "HTTP/HTTPS", "Cookies & Sessions", "TLS Basics"],
    topics: [
      "الفرق بين الإنترنت والويب", "كيف تنتقل البيانات عبر الشبكة",
      "Website / Web Server / Client / Browser / Hosting / Cloud",
      "Domain / IP Address / DNS / Public vs Private IP",
      "HTTP vs HTTPS / SSL & TLS / Cookies / Sessions / Cache"
    ],
    labs: ["تتبع رحلة طلب موقع عبر أدوات المطور DevTools وفحص شهادة TLS"],
    projects: ["رسم مخطط كامل لرحلة كتابة رابط موقع في المتصفح حتى ظهور الصفحة"],
    lessons: [
      createStandardLesson({
        id: "L0_M2_L1",
        titleAr: "ماذا يحدث فعلياً عندما تكتب رابط موقع وتضغط Enter؟",
        titleEn: "How the Web Works: DNS, IP, HTTP/HTTPS & Sessions",
        description: "تتبع رحلة الطلب من المتصفح (Client) إلى خادم DNS ثم Web Server عبر قناة مشفرة.",
        whyStudy: "أغلب هجمات الويب والتصيد واعتراض الاتصال تستغل جهل المستخدمين بآلية DNS وHTTPS والجلسات.",
        prerequisites: ["L0_M1"],
        objectives: [
          "التمييز بين الإنترنت (البنية التحتية) والويب (خدمة تعمل فوقه)",
          "شرح دور DNS في ترجمة اسم النطاق إلى IP",
          "تفسير الفرق بين Cookie وSession وCache وTLS"
        ],
        theory: "الإنترنت هو شبكة عالمية تربط ملايين الشبكات ببروتوكول IP. أما الويب فهو نظام الصفحات والتطبيقات الذي يعمل فوق الإنترنت عبر HTTP/HTTPS. عند كتابة نطاق مثل example.com، يسأل جهازك خادم DNS عن عنوان الـ IP المقابل، ثم ينشئ اتصالاً مشفراً بـ TLS مع الخادم (Web Server). لأن بروتوكول HTTP عديم الحالة (Stateless)، يستخدم الخادم Cookies وSessions ليتذكر هويتك بعد تسجيل الدخول.",
        realWorldExamples: [
          "سرقة Session Cookie تعني انتحال جلسة المستخدم دون الحاجة لكلمة المرور.",
          "الـ Private IP مثل 192.168.1.5 يعمل داخل شبكتك المنزلية فقط ولا يمكن الوصول إليه مباشرة من الإنترنت العام."
        ],
        diagramAscii: "[Browser] --1.DNS Lookup--> [DNS Server] -> IP\n[Browser] --2.TLS Handshake + HTTPS Request--> [Web Server] --3.HTML/Cookies--> [Browser]",
        practicalExamples: ["فتح تبويب Network في متصفحك وفحص Request Headers وResponse Status Codes (200, 301, 404)."],
        commands: [
          { cmd: "nslookup example.com", explain: "الاستعلام عن عنوان الـ IP المرتبط باسم النطاق من خادم DNS." },
          { cmd: "curl -I https://example.com", explain: "جلب ترويسات استجابة الخادم (HTTP Headers) فقط." }
        ],
        commonMistakes: ["الاعتقاد بأن وجود قفل HTTPS يعني أن الموقع موثوق وآمن المحتوى؛ HTTPS يشفر النقل فقط ولا يمنع مواقع التصيد."],
        exercises: ["افحص 3 مواقع باستخدام nslookup وقارن بين عنوان IP الخاص بجهازك الداخلي وعنوانك العام."],
        quiz: [
          {
            q: "ما الوظيفة الأساسية لنظام DNS؟",
            options: ["تشفير كلمات المرور", "ترجمة أسماء النطاقات إلى عناوين IP", "تخزين ملفات الكاش", "إيقاف الفيروسات"],
            answerIdx: 1,
            explain: "DNS هو دليل الإنترنت الذي يحول أسماء النطاقات المقروءة إلى عناوين IP رقمية."
          }
        ],
        lab: { title: "Lab 0.2 — تحليل طلبات الويب عبر DevTools", environment: "المتصفح المحلي + سطر الأوامر", steps: ["افتح F12 -> Network", "قم بزيارة موقع تعليمي", "استخرج عنوان IP وحالة الاستجابة ونوع شهادة TLS"] },
        homework: "ارسم جدول مقارنة بين Public IP وPrivate IP مع مثالين لكل منهما.",
        summary: "فهم DNS وHTTP/HTTPS والجلسات يمهد مباشرة لدراسة الشبكات وأمن تطبيقات الويب.",
        references: ["MDN Web Docs — How the Web Works", "RFC 9110 (HTTP Semantics)"]
      })
    ]
  },
  {
    id: "L0_M3",
    level: 0,
    zone: "Foundation Zone",
    title: "Module 0.3 — Technical English & Research",
    titleAr: "الإنجليزية التقنية وقراءة الوثائق وGitHub",
    description: "قراءة Documentation ورسائل الأخطاء وGitHub ومواصفات RFC وكتابة التقارير التقنية الواضحة.",
    prerequisites: ["L0_M1"],
    estimatedHours: 8,
    difficulty: "Absolute Zero",
    mapPos: { x: 110, y: 400 },
    skills: ["Reading Docs", "Error Analysis", "GitHub Navigation", "RFC Literacy", "Technical Reporting"],
    topics: ["المصطلحات التقنية الأساسية", "قراءة Documentation", "فهم Error Messages", "قراءة صفحات GitHub", "البحث التقني", "قراءة RFCs تدريجياً", "كتابة تقارير تقنية بسيطة"],
    labs: ["قراءة README لمشروع مفتوح المصدر واستخراج طريقة التثبيت وتحليل 5 رسائل خطأ"],
    projects: ["كتابة تقرير تقني منظم لمشكلة نظام وخطوات حلها"],
    lessons: []
  },
  {
    id: "L0_M4",
    level: 0,
    zone: "Foundation Zone",
    title: "Module 0.4 — Mathematics & Logic",
    titleAr: "الرياضيات والمنطق الرقمي وحل المشكلات",
    description: "الرياضيات الثنائية، الجبر البوليني، البوابات المنطقية، المجموعات، الاحتمالات والإحصاء الأساسي.",
    prerequisites: ["L0_M1"],
    estimatedHours: 10,
    difficulty: "Absolute Zero",
    mapPos: { x: 110, y: 540 },
    skills: ["Binary Math", "Boolean Algebra", "Logic Gates", "Sets & Probability", "Structured Problem Solving"],
    topics: ["Binary Mathematics", "Boolean Algebra (AND/OR/NOT/XOR)", "Logic Gates", "Sets", "Basic Probability", "Basic Statistics", "Logical Thinking & Problem Solving"],
    labs: ["حساب عمليات XOR وAND المستخدمة في Subnet Masks والتشفير"],
    projects: ["بناء جدول حقيقة وتمثيل عملية Subnetting باستخدام بوابة AND الثنائية"],
    lessons: []
  },

  /* ===================== LEVEL 1 — IT & CS FOUNDATIONS ===================== */
  {
    id: "L1_M1",
    level: 1,
    zone: "IT Foundations Zone",
    title: "Module 1.1 — Computer Architecture",
    titleAr: "معمارية الحاسوب وإدارة الذاكرة والنواة",
    description: "Registers، ALU، الذاكرة الافتراضية، Stack وHeap، العمليات والخيوط، Kernel vs User Space، ومعماريات x64 وARM.",
    prerequisites: ["L0_M1", "L0_M4"],
    estimatedHours: 22,
    difficulty: "Foundation",
    mapPos: { x: 370, y: 100 },
    skills: ["CPU & Registers", "Memory Hierarchy", "Processes & Threads", "Stack vs Heap", "Kernel/User Space", "x86/x64/ARM"],
    topics: ["CPU Architecture / Registers / ALU / Control Unit", "Memory Hierarchy / Cache / RAM Management", "Processes / Threads / Interrupts / System Calls", "Virtual Memory / Stack / Heap", "Kernel vs User Space / Privilege Levels (Ring 0–3)", "x86 / x64 / ARM Architecture"],
    labs: ["فحص العمليات والخيوط واستدعاءات النظام عبر Process Explorer وstrace"],
    projects: ["مخطط تشريحي لتوزيع ذاكرة عملية نشطة (Text, Data, Heap, Stack)"],
    lessons: []
  },
  {
    id: "L1_M2",
    level: 1,
    zone: "IT Foundations Zone",
    title: "Module 1.2 — Operating Systems (Win / Linux / macOS)",
    titleAr: "إدارة وأمن أنظمة التشغيل الثلاثة",
    description: "إدارة وتأمين Windows (Registry, Event Viewer, PowerShell, GPO) وLinux (Bash, Permissions, Systemd, Hardening) وmacOS.",
    prerequisites: ["L1_M1", "L0_M3"],
    estimatedHours: 45,
    difficulty: "Foundation",
    mapPos: { x: 370, y: 220 },
    skills: ["Windows Internals & Logs", "Linux Administration & Hardening", "macOS Security Basics", "Permissions & Services", "SSH & Systemd"],
    topics: [
      "Windows: Architecture, Kernel, Processes, Services, Registry, NTFS, Event Viewer, PowerShell, Defender, Firewall, UAC, GPO, Security Logs",
      "Linux: Architecture, Distros, Shell/Bash, FHS, Users/Groups, Permissions/Ownership, Systemd, Cron, Packages, SSH, Logs, Hardening",
      "macOS: UNIX Foundations, Permissions, Keychain, Gatekeeper, FileVault"
    ],
    labs: ["تأمين خادم Ubuntu Linux (SSH Key-only + UFW + Auditd)", "تحليل سجلات الأمان في Windows Event Viewer"],
    projects: ["تجهيز خادم Linux مُقوّى (Hardened Server) وفق ضوابط CIS الأساسية"],
    lessons: []
  },
  {
    id: "L1_M3",
    level: 1,
    zone: "IT Foundations Zone",
    title: "Module 1.3 — Networking Fundamentals",
    titleAr: "هندسة الشبكات وتحليل الحزم الاحترافي",
    description: "من OSI وTCP/IP وSubnetting/VLSM وVLANs/OSPF/BGP إلى Firewalls وVPNs وتحليل الحزم بـ Wireshark وTCPDump.",
    prerequisites: ["L0_M2", "L0_M4"],
    estimatedHours: 50,
    difficulty: "Foundation",
    mapPos: { x: 370, y: 340 },
    skills: ["OSI & TCP/IP", "Subnetting & CIDR/VLSM", "Routing & Switching", "VLANs & OSPF/BGP", "Firewalls/VPNs", "Wireshark & TCPDump"],
    topics: [
      "LAN/WAN/MAN/PAN / OSI & TCP-IP Models / Encapsulation / Ethernet & MAC",
      "IPv4 & IPv6 / Public vs Private / Subnetting / CIDR / VLSM",
      "ARP / ICMP / TCP & UDP / Three-Way Handshake / DNS / DHCP / NAT & PAT",
      "Routing & Switching / VLANs / Trunking / STP / Static & Dynamic Routing (OSPF, BGP)",
      "Firewalls / Proxies / VPNs / Wireless & Wi-Fi Standards / Troubleshooting / Wireshark & TCPDump"
    ],
    labs: ["تمارين Subnetting وVLSM", "التقاط وتحليل TCP Three-Way Handshake وDNS عبر Wireshark"],
    projects: ["مشروع المرحلة الإلزامي: تصميم وبناء شبكة مؤسسية متكاملة عبر Cisco Packet Tracer أو GNS3 أو EVE-NG (VLANs + Routing + NAT + ACLs)"],
    lessons: []
  },
  {
    id: "L1_M4",
    level: 1,
    zone: "IT Foundations Zone",
    title: "Module 1.4 — Programming & Scripting",
    titleAr: "البرمجة والأتمتة (Python, Bash, PowerShell, JS, SQL)",
    description: "بناء قدرة برمجية حقيقية للتحليل والأتمتة وقواعد البيانات والشبكات، وليس مقدمة سطحية.",
    prerequisites: ["L0_M3", "L0_M4"],
    estimatedHours: 65,
    difficulty: "Foundation",
    mapPos: { x: 370, y: 460 },
    skills: ["Python Engineering & Sockets", "Bash Automation", "PowerShell & AD Scripts", "JavaScript & Node.js", "SQL & DB Security"],
    topics: [
      "Python: Syntax, OOP, Exceptions, Files, JSON, APIs/Requests, Sockets, Multithreading, Async, Logging, Unit Testing, venv",
      "Bash: Shell, Loops, Functions, Pipes, Redirection, Process Management, Automation",
      "PowerShell: Cmdlets, Objects, Pipelines, Modules, AD & Windows Security Automation",
      "JavaScript: Fundamentals, DOM, Browser APIs, Node.js, Async, HTTP/APIs",
      "SQL: Tables, Relationships, SELECT/INSERT/UPDATE/DELETE, JOIN, Indexes, Transactions, DB Security"
    ],
    labs: ["كتابة محلل سجلات (Log Analyzer) بلغة Python", "سكربت Bash لمراقبة العمليات المفتوحة", "استعلامات SQL آمنة بـ Parameterized Queries"],
    projects: ["أداة Python لفحص معلومات الشبكة وتحليل سجلات النظام وتصدير تقرير JSON"],
    lessons: []
  },
  {
    id: "L1_M5",
    level: 1,
    zone: "IT Foundations Zone",
    title: "Module 1.5 — Web & Software Fundamentals",
    titleAr: "أساسيات الويب وهندسة البرمجيات والـ APIs",
    description: "كيف تُبنى التطبيقات الحديثة: REST APIs، المصادقة JWT وOAuth 2.0، الخوادم العكسية، Git/GitHub وSDLC.",
    prerequisites: ["L0_M2", "L1_M4"],
    estimatedHours: 30,
    difficulty: "Foundation",
    mapPos: { x: 370, y: 580 },
    skills: ["HTTP & REST APIs", "AuthN/AuthZ & JWT/OAuth2", "Web Servers & Reverse Proxies", "Git & GitHub", "SDLC & Design Patterns"],
    topics: ["HTML/CSS/JS", "HTTP Requests & Responses / REST APIs / JSON", "Authentication / Authorization / Cookies / Sessions / JWT / OAuth 2.0", "Web Servers / Reverse Proxies / Frontend & Backend Architecture / Databases", "Git & GitHub / SDLC / Software Architecture & Design Patterns"],
    labs: ["بناء واجهة REST API صغيرة وتجربة تدفق JWT والتحقق من الصلاحيات"],
    projects: ["توثيق معمارية تطبيق ويب كامل من المتصفح إلى قاعدة البيانات مع Git workflow"],
    lessons: []
  },
  {
    id: "L1_M6",
    level: 1,
    zone: "IT Foundations Zone",
    title: "Module 1.6 — Virtualization & Cloud Basics",
    titleAr: "الأنظمة الافتراضية والحاويات وأساسيات السحابة",
    description: "بناء المختبرات المعزولة باستخدام Hypervisors وDocker وفهم نماذج السحابة IaaS/PaaS/SaaS.",
    prerequisites: ["L1_M2", "L1_M3"],
    estimatedHours: 20,
    difficulty: "Foundation",
    mapPos: { x: 370, y: 700 },
    skills: ["VMware / VirtualBox / Hyper-V", "Virtual Networks & Snapshots", "Docker Containers", "Cloud Models (IaaS/PaaS/SaaS)"],
    topics: ["Virtual Machines & Hypervisors (Type 1 vs Type 2)", "VMware / VirtualBox / Hyper-V / Snapshots / Virtual Networks", "Containers & Docker Fundamentals", "Cloud Computing (IaaS, PaaS, SaaS / Public, Private, Hybrid)"],
    labs: ["إنشاء شبكة مختبر معزولة (Host-Only / Internal Network) وتشغيل حاوية Docker آمنة"],
    projects: ["بناء Home Lab معزول بالكامل يضم خادم Linux وجهاز Windows وشبكة مراقبة"],
    lessons: []
  },

  /* ===================== LEVEL 2 — CORE CYBERSECURITY FOUNDATIONS ===================== */
  {
    id: "L2_M1",
    level: 2,
    zone: "Core Security Zone",
    title: "Module 2.1 — Cybersecurity Fundamentals",
    titleAr: "أصول الأمن السيبراني والمبادئ المعمارية",
    description: "CIA Triad، AAA، Least Privilege، Defense in Depth، Zero Trust، وإدارة المخاطر والضوابط والسياسات.",
    prerequisites: ["L1_M2", "L1_M3"],
    estimatedHours: 18,
    difficulty: "Core Security",
    mapPos: { x: 640, y: 120 },
    skills: ["CIA Triad & AAA", "Zero Trust & Defense in Depth", "Risk Equation", "Security Controls & Policies"],
    topics: ["What is Cybersecurity & Information Security", "Confidentiality / Integrity / Availability (CIA)", "Authentication / Authorization / Accounting / Non-Repudiation", "Least Privilege / Defense in Depth / Zero Trust / Attack Surface", "Threat / Vulnerability / Exploit / Risk / Impact / Likelihood", "Security Controls / Policies / Awareness"],
    labs: ["تحليل سطح الهجوم (Attack Surface) وتصنيف الضوابط لنظام جامعي افتراضي"],
    projects: ["وثيقة تقييم مخاطر أولية وفق NIST CSF 2.0"],
    lessons: []
  },
  {
    id: "L2_M2",
    level: 2,
    zone: "Core Security Zone",
    title: "Module 2.2 — Threat Landscape",
    titleAr: "مشهد التهديدات السيبرانية الحديثة",
    description: "الجهات الفاعلة (Cybercrime, Nation-State, APTs)، برامج الفدية، سلاسل الإمداد، هجمات الهوية والسحابة وIoT.",
    prerequisites: ["L2_M1"],
    estimatedHours: 14,
    difficulty: "Core Security",
    mapPos: { x: 640, y: 240 },
    skills: ["Threat Actors & APTs", "Ransomware & Phishing", "Supply Chain & Identity Attacks", "MITRE ATT&CK Orientation"],
    topics: ["Cybercrime / Nation-State / Insider Threats / APT Groups", "Ransomware / Phishing / Social Engineering / Botnets", "Data Breaches / Supply Chain Attacks / DDoS", "Credential Theft / Identity, Cloud, Mobile & IoT Attacks"],
    labs: ["قراءة تقرير حادثة سيبرانية حقيقية وإسقاط خطواته على مصفوفة MITRE ATT&CK"],
    projects: ["ملف استخبارات تهديدات مصغر لقطاع التعليم أو البنوك"],
    lessons: []
  },
  {
    id: "L2_M3",
    level: 2,
    zone: "Core Security Zone",
    title: "Module 2.3 — Cryptography",
    titleAr: "علم التشفير التطبيقي وPKI",
    description: "التشفير المتماثل وغير المتماثل (AES, RSA, ECC)، التجزئة والتوقيع الرقمي، الشهادات، TLS، ومقدمة ما بعد الكم.",
    prerequisites: ["L0_M4", "L2_M1"],
    estimatedHours: 24,
    difficulty: "Core Security",
    mapPos: { x: 640, y: 360 },
    skills: ["AES / RSA / ECC", "SHA-256 / HMAC / Salting", "PKI & Digital Certificates", "TLS & Key Management", "Post-Quantum Basics"],
    topics: ["Plaintext & Ciphertext / Symmetric (AES) vs Asymmetric (RSA, ECC)", "Hashing (SHA-256, SHA-3) / HMAC / Password Hashing & Salting", "Digital Signatures / Certificates / PKI / CAs / TLS & Key Exchange", "Key Management / RNG / Common Cryptographic Failures / Post-Quantum Fundamentals"],
    labs: ["إنشاء شهادات رقمية وتوقيع ملفات وتشفيرها عملياً باستخدام OpenSSL"],
    projects: ["تقييم إعدادات TLS وتخزين كلمات المرور في تطبيق ويب تجريبي"],
    lessons: []
  },
  {
    id: "L2_M4",
    level: 2,
    zone: "Core Security Zone",
    title: "Module 2.4 — Identity & Access Management",
    titleAr: "إدارة الهوية والصلاحيات والدليل النشط",
    description: "MFA، SSO، RBAC/ABAC، PAM، LDAP وKerberos، أساسيات Active Directory وMicrosoft Entra ID وبروتوكولات SAML وOIDC.",
    prerequisites: ["L1_M2", "L1_M5", "L2_M1"],
    estimatedHours: 24,
    difficulty: "Core Security",
    mapPos: { x: 640, y: 480 },
    skills: ["MFA & SSO", "RBAC / ABAC / PAM", "Active Directory & Entra ID", "Kerberos / LDAP / SAML / OIDC"],
    topics: ["Identity Fundamentals / AuthN & AuthZ / MFA / SSO", "RBAC / ABAC / PAM / IAM / Identity Governance", "LDAP / Kerberos / Active Directory & Microsoft Entra ID Fundamentals", "Federation / SAML / OAuth 2.0 / OpenID Connect / Passwordless"],
    labs: ["بناء مصفوفة صلاحيات RBAC وتفعيل المصادقة متعددة العوامل داخل بيئة مختبر"],
    projects: ["تصميم نموذج هوية وصلاحيات (IAM Baseline) لشركة ناشئة من 50 موظفاً"],
    lessons: []
  },
  {
    id: "L2_M5",
    level: 2,
    zone: "Core Security Zone",
    title: "Module 2.5 — Security Tools & Lab Foundations",
    titleAr: "منهجية أدوات الأمن والمختبرات الدفاعية والهجومية",
    description: "تعليم كل أداة بـ 9 محاور (ما هي، لماذا، كيف تعمل، متى تستخدمها ومتى لا تستخدمها، تمرين ونتيجة وأخطاء شائعة).",
    prerequisites: ["L1_M2", "L1_M3", "L1_M6", "L2_M1"],
    estimatedHours: 32,
    difficulty: "Core Security",
    mapPos: { x: 640, y: 600 },
    skills: ["Wireshark & Nmap", "Sysinternals & Sysmon", "Burp Suite & ZAP", "Wazuh / Splunk / Elastic", "Isolated Lab Ops"],
    topics: [
      "أنظمة المختبر: Ubuntu / Windows Security Tools / Kali Linux (كأداة منظمة بعد التأسيس)",
      "الشبكات والتحليل: Wireshark / Nmap / OpenSSL / Sysinternals",
      "الويب والحاويات: Burp Suite Community / OWASP ZAP / Git / Docker / VirtualBox",
      "الدفاع والرصد: Sysmon / Security Onion / Wazuh / Splunk & Elastic Stack Fundamentals"
    ],
    labs: ["تثبيت Sysmon ومراقبة الأحداث في Wazuh/Elastic داخل مختبرك المعزول", "فحص شبكة معزولة بـ Nmap وتحليل حزمها في Wireshark"],
    projects: ["دليل تشغيل شخصي لـ 10 أدوات أمنية يوثق متى تُستخدم ومتى لا تُستخدم"],
    lessons: []
  },
  {
    id: "L2_M6",
    level: 2,
    zone: "Core Security Zone",
    title: "Module 2.6 — Legal & Ethical Cybersecurity",
    titleAr: "الأخلاقيات والحدود القانونية وقواعد الاشتباك",
    description: "الإفصاح المسؤول، قواعد Bug Bounty، التفويض وتحديد النطاق (Scope & RoE)، حماية البيانات والتعامل مع الأدلة.",
    prerequisites: ["L2_M1"],
    estimatedHours: 8,
    difficulty: "Core Security",
    mapPos: { x: 640, y: 720 },
    skills: ["Rules of Engagement", "Scope Definition", "Responsible Disclosure", "Privacy & Evidence Integrity"],
    topics: ["Cybersecurity Ethics & Professional Conduct", "Responsible Disclosure & Bug Bounty Rules", "Authorization / Scope Definition / Rules of Engagement (RoE)", "Privacy / Data Protection / Evidence Handling / Computer Misuse & Legal Boundaries"],
    labs: ["قراءة وثيقة Scope لبرنامج Bug Bounty وتحديد الأهداف المسموحة والممنوعة"],
    projects: ["صياغة نموذج Rules of Engagement (RoE) قانوني لاختبار مصرح به"],
    lessons: []
  }
];
