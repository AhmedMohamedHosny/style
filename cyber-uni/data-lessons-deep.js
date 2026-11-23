/**
 * MY LIFE OS — CYBERSECURITY UNIVERSITY
 * Batch 2: Complete 19-Part Standardized Deep Lessons
 * Covers: All Level 0, 1, 2 Modules + Academy 1 (Red Team) + Academy 2 (Blue Team / SOC)
 */

import { createStandardLesson } from "./data-foundations.js";

export const DEEP_LESSONS_BY_NODE = {
  /* ===================== LEVEL 0 (REMAINING MODULES) ===================== */
  L0_M3: [
    createStandardLesson({
      id: "L0_M3_L1",
      titleAr: "قراءة الوثائق الرسمية وتحليل رسائل الأخطاء ومستندات RFC",
      titleEn: "Technical English, Reading Docs, Error Messages & RFCs",
      description: "كيف تقرأ أي توثيق تقني (Documentation) أو مستودع GitHub أو رسالة خطأ وتحل المشكلة بنفسك.",
      whyStudy: "أكثر من 95% من التوثيق الأمني والتحديثات والثغرات (CVEs) تنشر بالإنجليزية أولاً، وفهم رسالة الخطأ يوفر ساعات من البحث العشوائي.",
      prerequisites: ["L0_M1"],
      objectives: [
        "تفكيك أي رسالة خطأ إلى: نوع الخطأ + الملف/الأمر + السطر/السبب",
        "التنقل داخل مستودعات GitHub (README, Issues, Releases, Security Policy)",
        "فهم هيكل مستندات RFC ومعنى كلمات MUST و SHOULD و MAY"
      ],
      theory: "القراءة التقنية تختلف عن قراءة الروايات؛ أنت لا تترجم كل كلمة بل تبحث عن الكلمات المفتاحية (Syntax, Parameters, Flags, Return Value, Warnings). في مستندات المعايير (RFCs) مثل RFC 9110 لبروتوكول HTTP، تُستخدم كلمات محددة بدقة قانونية (RFC 2119): كلمة MUST تعني شرطاً إلزامياً، وكلمة SHOULD تعني توصية قوية، وكلمة MAY تعني خياراً اختيارياً.",
      realWorldExamples: [
        "عند فشل اتصال SSH بظهور 'Permission denied (publickey)' تعرف فوراً أن المشكلة في المفتاح أو صلاحيات الملف وليست في انقطاع الشبكة.",
        "فهم ملف SECURITY.md في أي مستودع GitHub يوضح لك قناة الإفصاح المسؤول عن الثغرات."
      ],
      diagramAscii: "[Error Message] -> [1. Error Type] + [2. Location/Command] + [3. Root Cause] -> [Search Official Docs]",
      practicalExamples: ["فتح صفحة Man Page لأمر Linux وقراءة قسم SYNOPSIS و OPTIONS."],
      commands: [
        { cmd: "man ls", explain: "فتح الدليل الرسمي المدمج لأي أمر في Linux لقراءة خياراته وأمثلته." },
        { cmd: "curl --help", explain: "عرض ملخص سريع لمعاملات الأداة من سطر الأوامر مباشرة." }
      ],
      commonMistakes: ["الترجمة الحرفية للمصطلحات التقنية مثل (Socket / Daemon / Payload) بدلاً من حفظ معناها الهندسي بالإنجليزية."],
      exercises: ["افتح مستودع OWASP Juice Shop على GitHub واستخرج متطلبات التشغيل من README.md."],
      quiz: [
        {
          q: "عندما يظهر خطأ 'Connection refused' عند الاتصال بخادم محلي، ما السبب الأرجح؟",
          options: ["كلمة المرور خاطئة", "لا توجد خدمة تستمع على هذا المنفذ حالياً أو الجدار الناري يرفض الاتصال", "انتهاء مساحة القرص", "تلف الذاكرة RAM"],
          answerIdx: 1,
          explain: "Connection refused تعني أن الجهاز استلم الطلب لكن لا يوجد برنامج يستمع على هذا الـ Port."
        }
      ],
      lab: { title: "Lab 0.3 — تحليل 5 رسائل خطأ وتلخيص README", environment: "المتصفح + سطر الأوامر", steps: ["اقرأ دليل الأمر ping عبر ping --help", "اكتب تقريراً من 10 أسطر يشرح 3 أخطاء شائعة وكيفية حلها"] },
      homework: "اكتب قاموساً شخصياً لأول 30 مصطلحاً تقنياً باللغة الإنجليزية مع تعريف مبسط لكل مصطلح.",
      summary: "إتقان القراءة التقنية يحولك من متعلم يعتمد على الفيديوهات فقط إلى مهندس مستقل قادر على تعلم أي تقنية جديدة من مصدرها.",
      references: ["RFC 2119 (Key words for use in RFCs)", "GitHub Docs — Navigating Repositories"]
    })
  ],

  L0_M4: [
    createStandardLesson({
      id: "L0_M4_L1",
      titleAr: "الرياضيات الثنائية والجبر البوليني وبوابات المنطق في الشبكات والتشفير",
      titleEn: "Binary Math, Boolean Algebra & Logic Gates in Cybersecurity",
      description: "ربط العمليات المنطقية (AND, OR, NOT, XOR) بتقسيم الشبكات Subnetting وخوارزميات التشفير.",
      whyStudy: "عملية Bitwise AND هي التي تحسب عنوان الشبكة في كل راوتر، وعملية XOR هي القلب الرياضي لأغلب خوارزميات التشفير وتحليل البرمجيات الخبيثة.",
      prerequisites: ["L0_M1"],
      objectives: [
        "تطبيق بوابات AND و OR و NOT و XOR على أرقام ثنائية من 8 بت",
        "إثبات خاصية انعكاس XOR: (A ⊕ K) ⊕ K = A",
        "استخدام Bitwise AND لحساب Network ID من IP و Subnet Mask"
      ],
      theory: "في الجبر البوليني نعمل بقيمتين فقط: 1 (True) و 0 (False). بوابة AND تعطي 1 فقط إذا كان المدخلان 1 (تُستخدم لعزل جزء الشبكة في Subnet Mask). أما بوابة XOR فتعطي 1 فقط إذا اختلف المدخلان، وتتميز بخاصية فريدة في التشفير: إذا أجريت XOR بين البيانات ومفتاح سري تحصل على نص مشفر، وإذا أجريت XOR مرة أخرى بنفس المفتاح تعود البيانات الأصلية تماماً.",
      realWorldExamples: [
        "حساب عنوان الشبكة: 192.168.1.15 AND 255.255.255.0 يعطي 192.168.1.0.",
        "كثير من البرمجيات الخبيثة تخفي النصوص داخلها (Strings Obfuscation) بعملية XOR بسيطة بمفتاح من بايت واحد."
      ],
      diagramAscii: "Plaintext: 01000001 ('A')\nKey:       00101010\nXOR Out:   01101011 (Cipher)\nXOR Key:   01000001 ('A' Restored!)",
      practicalExamples: ["تطبيق XOR يدوياً على الحرف A (65 = 01000001) مع المفتاح 42 ثم فك التشفير."],
      commands: [
        { cmd: "python3 -c \"print(bin(192 & 255), 65 ^ 42, (65 ^ 42) ^ 42)\"", explain: "تجربة عمليتي AND و XOR مباشرة في بايثون." }
      ],
      commonMistakes: ["الخلط بين بوابة OR (تعطي 1 عند 1,1) وبوابة XOR (تعطي 0 عند 1,1)."],
      exercises: ["احسب ناتج 11010110 AND 11110000 وناتج 10101010 XOR 11111111."],
      quiz: [
        {
          q: "ما ناتج العملية المنطقية (1 XOR 1)؟",
          options: ["1", "0", "2", "غير معرف"],
          answerIdx: 1,
          explain: "بوابة XOR تعطي 0 عندما يتشابه المدخلان، و1 فقط عندما يختلفان."
        }
      ],
      lab: { title: "Lab 0.4 — تطبيق XOR و Bitwise AND", environment: "Python المحلي", steps: ["نفذ عملية AND على عنوان IP وقناع شبكة", "شفر جملة قصيرة بـ XOR وأعد فك تشفيرها"] },
      homework: "ارسم جدول الحقيقة الكامل لـ AND و OR و NOT و XOR و NAND.",
      summary: "المنطق البوليني ليس مادة نظرية جافة؛ بل هو المحرك الفعلي للشبكات وصلاحيات الملفات والتشفير.",
      references: ["NIST Computer Security Resource Center — Boolean & Crypto Basics"]
    })
  ],

  /* ===================== LEVEL 1 — IT & CS FOUNDATIONS ===================== */
  L1_M1: [
    createStandardLesson({
      id: "L1_M1_L1",
      titleAr: "معمارية المعالج والذاكرة: Stack و Heap و Kernel Space",
      titleEn: "CPU Architecture, Memory Layout (Stack/Heap) & Privilege Rings",
      description: "كيف يُنفذ المعالج البرنامج في الذاكرة وكيف يفصل نظام التشغيل بين User Space و Kernel Space.",
      whyStudy: "فهم الـ Stack و Heap وحلقات الصلاحيات (Ring 0 vs Ring 3) هو شرط أساسي لفهم ثغرات الذاكرة وتحليل البرمجيات الخبيثة وحماية النواة.",
      prerequisites: ["L0_M1", "L0_M4"],
      objectives: [
        "شرح دور المسجلات Registers (مثل RIP/EIP و RSP/ESP) في تنفيذ التعليمات",
        "التمييز بين الذاكرة المكدسة Stack والذاكرة الديناميكية Heap",
        "فهم لماذا تحتاج البرامج العادية إلى System Calls للوصول للعتاد عبر النواة"
      ],
      theory: "عند تشغيل أي برنامج ينشئ النظام عملية (Process) لها مساحة ذاكرة افتراضية معزولة مقسمة إلى: Text (الكود التنفيذي)، Data (المتغيرات العامة)، Heap (ذاكرة تُحجز ديناميكياً أثناء التشغيل وتنمو لأعلى)، و Stack (لتخزين المتغيرات المحلية وعنوان العودة Return Address لكل دالة وينمو لأسفل). يعمل المعالج بمستويات صلاحية (Privilege Rings): التطبيقات تعمل في User Space (Ring 3) المعزول، بينما تعمل نواة النظام في Kernel Space (Ring 0). لكي يقرأ برنامج ملفاً، يرسل طلباً منظماً للنواة يسمى System Call.",
      realWorldExamples: [
        "حمايات الذاكرة الحديثة مثل ASLR و DEP/NX و Stack Canaries مصممة تحديداً لمنع استغلال أخطاء الـ Stack والـ Heap.",
        "أدوات EDR الحديثة تراقب استدعاءات النظام (System Calls) لرصد سلوك البرمجيات الخبيثة."
      ],
      diagramAscii: "High Addr -> [   STACK (Local Vars, Return Addr) ↓   ]\n             [          Free Virtual Memory          ]\n             [   HEAP  (malloc / Dynamic Data)   ↑   ]\n             [   DATA / BSS (Global Variables)       ]\nLow Addr  -> [   TEXT (Executable Machine Code)      ]",
      practicalExamples: ["مراقبة الـ System Calls التي ينفذها أمر بسيط مثل ls في Linux باستخدام أداة strace."],
      commands: [
        { cmd: "strace -c ls", explain: "يعرض إحصائية بجميع استدعاءات النواة (System Calls) التي طلبها الأمر ls." },
        { cmd: "ps aux | head -n 15", explain: "يعرض العمليات النشطة ومستهلكي المعالج والذاكرة." }
      ],
      commonMistakes: ["الظن أن الذاكرة الافتراضية (Virtual Memory) هي نفسها مساحة القرص الصلب؛ هي طبقة عزل وعنونة يديرها المعالج والنظام لكل عملية."],
      exercises: ["قارن بين Process و Thread من حيث مشاركة الذاكرة وسرعة الإنشاء."],
      quiz: [
        {
          q: "في أي حلقة صلاحيات تعمل تطبيقات المستخدم العادية (User Space)؟",
          options: ["Ring 0", "Ring 3", "BIOS Mode", "DMA Space"],
          answerIdx: 1,
          explain: "تعمل النواة في Ring 0 بينما تُعزل برامج المستخدم في Ring 3 لحماية النظام."
        }
      ],
      lab: { title: "Lab 1.1 — استكشاف العمليات واستدعاءات النظام", environment: "Linux VM أو Windows Process Explorer", steps: ["شغّل strace على أمر بسيط في Linux أو Process Explorer في Windows", "حدد PID واسم العملية الأم PPID والمكتبات المحملة"] },
      homework: "اشرح في فقرة كيف يمنع عزل الذاكرة الافتراضية تطبيقاً عادياً من قراءة كلمات المرور المخزنة في ذاكرة تطبيق آخر.",
      summary: "معمارية الذاكرة وعزل النواة هما خط الدفاع الأول داخل الحاسوب؛ وفهمهما يفتح لك أبواب التحليل الجنائي والهندسة العكسية.",
      references: ["Intel 64 & IA-32 Architectures Software Developer Manuals", "Operating Systems: Three Easy Pieces (OSTEP)"]
    })
  ],

  L1_M2: [
    createStandardLesson({
      id: "L1_M2_L1",
      titleAr: "إدارة وتقوية أنظمة Linux و Windows وسجلات الأمان",
      titleEn: "Linux Administration, Hardening & Windows Internals/Event Logs",
      description: "صلاحيات Linux (chmod/chown/systemd)، وبنية Windows (Registry, Services, Event Viewer, PowerShell).",
      whyStudy: "أكثر من 90% من خوادم السحابة تعمل بـ Linux وأغلب بيئات الشركات المكتبية تعمل بـ Windows؛ لا يمكن حمايتهما دون إتقان إدارتهما.",
      prerequisites: ["L1_M1", "L0_M3"],
      objectives: [
        "إدارة المستخدمين والصلاحيات (rwx و octal مثل 750/600) وخدمات systemd في Linux",
        "قراءة وتحليل سجلات الأمان في Windows Event Viewer و /var/log في Linux",
        "تطبيق خطوات التقوية الأساسية (SSH Hardening + Firewall + UAC)"
      ],
      theory: "في Linux كل شيء يُعامل كملف، وتخضع الملفات لثلاثة مستويات صلاحيات: المالك (User) والمجموعة (Group) والآخرين (Others) بصلاحيات قراءة r=4 وكتابة w=2 وتنفيذ x=1. وتُدار الخدمات عبر systemd وتُسجل الأحداث في /var/log/auth.log و journalctl. أما في Windows فتُخزن الإعدادات في Registry، وتُوثق أحداث الدخول والعمليات في Security Event Log (مثل Event ID 4624 لنجاح الدخول و 4625 لفشل الدخول و 4688 لإنشاء عملية جديدة).",
      realWorldExamples: [
        "إعطاء ملف مفتاح SSH صلاحية 777 خطأ فادح؛ الصلاحية الآمنة المطلوبة هي 600.",
        "تكرار Event ID 4625 عشرات المرات خلال ثوانٍ في Windows مؤشر قوي على هجوم تخمين كلمات المرور (Brute Force)."
      ],
      diagramAscii: "Linux Permission: -rwxr-x--- (750)\n  Owner: rwx (4+2+1=7) | Group: r-x (4+0+1=5) | Others: --- (0)",
      practicalExamples: ["ضبط صلاحية ملف سري بـ chmod 600 والتحقق من خدمات الشبكة المفتوحة عبر ss -tulpn."],
      commands: [
        { cmd: "chmod 600 secret.key && ls -la secret.key", explain: "حصر قراءة وتعديل الملف على المالك فقط." },
        { cmd: "sudo ss -tulpn", explain: "عرض المنافذ المفتوحة والخدمات المستمعة عليها في Linux." },
        { cmd: "Get-WinEvent -LogName Security -MaxEvents 10", explain: "جلب آخر 10 أحداث أمنية في Windows عبر PowerShell." }
      ],
      commonMistakes: ["تشغيل كل الأوامر بصلاحية root أو Administrator بشكل دائم مما يخالف مبدأ Least Privilege."],
      exercises: ["احسب القيمة الرقمية للصلاحية rw-r-----، واكتب أمر PowerShell لعرض الخدمات النشطة فقط."],
      quiz: [
        {
          q: "ما رقم الحدث (Windows Event ID) الذي يسجل محاولة تسجيل دخول فاشلة؟",
          options: ["4624", "4625", "1102", "7045"],
          answerIdx: 1,
          explain: "4624 لتسجيل الدخول الناجح، و 4625 لتسجيل الدخول الفاشل."
        }
      ],
      lab: { title: "Lab 1.2 — تقوية خادم Ubuntu وفحص Windows Event Viewer", environment: "Ubuntu VM + Windows VM معزولة", steps: ["أنشئ مستخدماً غير root وأضفه لمجموعة sudo", "عطّل تسجيل الدخول بـ root عبر SSH", "افتح Event Viewer وحدد حدث 4624 و 4625"] },
      homework: "أنشئ قائمة مراجعة (Hardening Checklist) من 8 نقاط لتأمين خادم Linux جديد قبل ربطه بالإنترنت.",
      summary: "إتقان الصلاحيات والخدمات والسجلات في Linux و Windows هو القاعدة المشتركة لكل من Red Team و Blue Team و Cloud Security.",
      references: ["CIS Linux & Windows Benchmarks", "Microsoft Learn — Windows Security Auditing"]
    })
  ],

  L1_M3: [
    createStandardLesson({
      id: "L1_M3_L1",
      titleAr: "نموذج OSI و TCP/IP وتقسيم الشبكات Subnetting وتحليل الحزم بـ Wireshark",
      titleEn: "OSI/TCP-IP, CIDR Subnetting & Wireshark Packet Analysis",
      description: "فهم كيف تُغلَّف البيانات عبر الطبقات، تقسيم الشبكات الفرعية، وقراءة حزم TCP/DNS في Wireshark.",
      whyStudy: "كل هجوم شبكي يترك أثراً في الحزم (Packets). بدون فهم TCP 3-Way Handshake والـ Subnetting و Wireshark ستعمل أعمى داخل الشبكات.",
      prerequisites: ["L0_M2", "L0_M4"],
      objectives: [
        "الربط العملي بين طبقات OSI السبع وبروتوكولاتها (Ethernet, IP, TCP/UDP, HTTP/DNS)",
        "حساب Network ID و Broadcast وعدد الأجهزة المتاحة لأي شبكة CIDR (مثل /24 و /26)",
        "تصفية حزم TCP و DNS و HTTP داخل Wireshark"
      ],
      theory: "عند إرسال بيانات تمر بعملية تغليف (Encapsulation): البيانات (Layer 7) ➔ Segment بـ TCP/UDP Port (Layer 4) ➔ Packet بـ IP Address (Layer 3) ➔ Frame بـ MAC Address (Layer 2) ➔ Bits (Layer 1). قبل نقل بيانات TCP يحدث تصافح ثلاثي: يرسل العميل SYN، يرد الخادم بـ SYN-ACK، ويؤكد العميل بـ ACK. وفي تقسيم الشبكات (Subnetting)، يحدد القناع مثل /26 وجود 6 بتات للأجهزة (2^6 - 2 = 62 جهازاً متاحاً في كل شبكة فرعية).",
      realWorldExamples: [
        "عزل خوادم قواعد البيانات داخل VLAN منفصلة مع جدار ناري يمنع الوصول المباشر إليها من شبكة الموظفين.",
        "استخدام فلتر Wireshark (tcp.flags.syn == 1 && tcp.flags.ack == 0) يكشف فوراً عمليات فحص المنافذ (SYN Scan)."
      ],
      diagramAscii: "[Client] --- SYN (Seq=0) ---> [Server]\n[Client] <-- SYN,ACK -------- [Server]\n[Client] --- ACK -----------> [Server]  (Established)",
      practicalExamples: ["تقسيم الشبكة 192.168.10.0/24 إلى 4 شبكات فرعية /26."],
      commands: [
        { cmd: "tcpdump -i eth0 -n 'tcp port 80 or port 53' -w capture.pcap", explain: "التقاط حزم HTTP و DNS وحفظها في ملف PCAP لتحليلها في Wireshark." },
        { cmd: "ip route show", explain: "عرض جدول التوجيه (Routing Table) والـ Default Gateway." }
      ],
      commonMistakes: ["الخلط بين ARP (يعمل داخل الشبكة المحلية لربط IP بـ MAC) و DNS (يربط النطاق بـ IP)."],
      exercises: ["احسب عدد الأجهزة القابلة للاستخدام في شبكة /27 و /28."],
      quiz: [
        {
          q: "كم عدد عناوين الأجهزة الصالحة للاستخدام (Usable Hosts) في شبكة قناعها /26؟",
          options: ["64", "62", "30", "126"],
          answerIdx: 1,
          explain: "يتبقى 6 بتات للأجهزة (2^6 = 64) نطرح منها عنوان الشبكة وعنوان البث = 62 جهازاً."
        }
      ],
      lab: { title: "Lab 1.3 — بناء شبكة VLANs + التقاط حزم Wireshark", environment: "Cisco Packet Tracer + Wireshark المحلي", steps: ["صمّم شبكتين VLAN 10 و VLAN 20 مربوطتين براوتر", "التقط اتصال DNS و HTTP في Wireshark واستخرج الـ 3-Way Handshake"] },
      homework: "نفّذ مشروع المرحلة: شبكة شركة متكاملة بـ 3 أقسام (IT, HR, Servers) مع Subnetting و NAT على Packet Tracer أو GNS3.",
      summary: "إتقان الشبكات وتحليل الحزم هو الفارق الجوهري بين الهاوي والمهندس القادر على تأمين البنية التحتية وكشف التسلل.",
      references: ["Cisco Networking Academy — Introduction to Networks", "Wireshark Official User Guide"]
    })
  ],

  L1_M4: [
    createStandardLesson({
      id: "L1_M4_L1",
      titleAr: "البرمجة الأمنية والأتمتة بـ Python و Bash و PowerShell و SQL",
      titleEn: "Security Automation with Python, Bash, PowerShell & SQL",
      description: "كتابة سكربتات تحليل سجلات ومراقبة شبكات واستعلامات SQL آمنة ضد الحقن.",
      whyStudy: "لا يمكن لمحلل أمني فحص 500 ألف سطر سجل يدوياً؛ الأتمتة بـ Python و Bash/PowerShell تضاعف قدرتك 100 مرة.",
      prerequisites: ["L0_M3", "L0_M4"],
      objectives: [
        "كتابة محلل سجلات بلغة Python يستخرج عناوين IP المتكررة في محاولات الدخول الفاشلة",
        "استخدام Pipes و grep و awk في Bash لتصفية ملفات السجلات",
        "التمييز بين استعلام SQL المعرض للحقن والـ Parameterized Query الآمن"
      ],
      theory: "البرمجة في الأمن السيبراني تخدم هدفين: الأتمتة (Automation) وفهم كيف كُتب التطبيق المراد تأمينه. في Python نستخدم المكتبات القياسية مثل socket و json و re و logging ومكتبة requests. وفي SQL، الخطأ البرمجي الأشهر هو دمج مدخلات المستخدم كنص مباشر داخل الاستعلام بدلاً من استخدام الاستعلامات المُعامَلة (Parameterized Queries) التي تفصل الكود عن البيانات تماماً.",
      realWorldExamples: [
        "سكربت Python يقرأ /var/log/auth.log ويرصد أي IP سجل أكثر من 10 محاولات دخول فاشلة خلال دقيقة.",
        "سكربت PowerShell يراجع حسابات Active Directory التي لم تُغيّر كلمة مرورها منذ 180 يوماً."
      ],
      diagramAscii: "[Raw Auth Logs] -> [Python Regex Parser] -> [IP Counter] -> [Alert JSON Report]",
      practicalExamples: ["مقارنة كود SQL غير آمن مع كود Parameterized باستخدام sqlite3 في Python."],
      commands: [
        { cmd: "grep 'Failed password' /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr | head", explain: "أمر Bash سريع يستخرج أكثر عناوين IP تكراراً في محاولات دخول SSH الفاشلة." }
      ],
      commonMistakes: ["إهمال معالجة الاستثناءات (try/except) أو حفظ مفاتيح API داخل الكود المصدري ورفعها على GitHub."],
      exercises: ["اكتب دالة Python تستقبل قائمة عناوين IP وتتحقق من صحتها وتطبع الخاص منها (Private) والعام (Public)."],
      quiz: [
        {
          q: "ما الوسيلة البرمجية الأساسية لمنع ثغرة SQL Injection في قواعد البيانات؟",
          options: ["إخفاء اسم الجدول", "استخدام Parameterized Queries / Prepared Statements", "تشفير HTML", "تعطيل JavaScript"],
          answerIdx: 1,
          explain: "Prepared Statements تعامل مدخلات المستخدم كبيانات فقط ولا تسمح بتفسيرها كأوامر SQL."
        }
      ],
      lab: { title: "Lab 1.4 — بناء محلل سجلات Python + سكربت Bash", environment: "Python 3 + Linux Terminal", steps: ["أنشئ ملف log تدريبي يحتوي محاولات دخول ناجحة وفاشلة", "اكتب سكربت Python يحسب عدد الفشل لكل IP ويصدر ملف report.json"] },
      homework: "طوّر أداة Python تفحص سلامة الملفات عبر حساب بصمة SHA-256 ومقارنتها بملف مرجعي (File Integrity Monitor).",
      summary: "القدرة على كتابة أدواتك الخاصة وقراءة أكواد الآخرين هي ما ينقلك إلى المستويات الهندسية المتقدمة.",
      references: ["Python Official Documentation", "OWASP SQL Injection Prevention Cheat Sheet"]
    })
  ],

  L1_M5: [
    createStandardLesson({
      id: "L1_M5_L1",
      titleAr: "معمارية الويب والـ APIs والمصادقة بـ Sessions و JWT و OAuth 2.0",
      titleEn: "Web Architecture, REST APIs, Sessions, JWT & OAuth 2.0",
      description: "كيف تتحقق التطبيقات الحديثة من هوية المستخدم وصلاحياته، والفرق بين Authentication و Authorization.",
      whyStudy: "أخطر ثغرات الويب في OWASP Top 10:2025 تتعلق بكسر التحكم بالوصول (Broken Access Control) وأخطاء التوثيق في الـ APIs.",
      prerequisites: ["L0_M2", "L1_M4"],
      objectives: [
        "التمييز الدقيق بين Authentication (من أنت؟) و Authorization (ماذا يُسمح لك أن تفعل؟)",
        "فهم بنية JWT (Header.Payload.Signature) ولماذا لا يُعد Payload مشفراً",
        "فهم دور Reverse Proxy (Nginx) و Git في دورة حياة البرمجيات SDLC"
      ],
      theory: "عند استخدام Sessions، يحتفظ الخادم بحالة الجلسة ويعطي المتصفح معرفاً عشوائياً داخل Cookie يجب تأمينه بخصائص HttpOnly و Secure و SameSite. أما في JWT، فيُرسل الخادم رمزاً موقعاً رقمياً يحتوي على 3 أجزاء مفصولة بنقطة: الترويسة (Header) والبيانات (Payload مشفرة بـ Base64URL فقط ويمكن لأي شخص قراءتها) والتوقيع (Signature) الذي يضمن عدم تعديلها. بينما يعمل OAuth 2.0 على تفويض الصلاحيات بين التطبيقات دون مشاركة كلمة المرور.",
      realWorldExamples: [
        "تخزين JWT داخل LocalStorage يعرّضه للسرقة إذا وجدت ثغرة XSS، بينما HttpOnly Cookie تحميه من JavaScript.",
        "وجود خادم عكسي (Reverse Proxy مثل Nginx) يخفي تفاصيل الخادم الخلفي ويطبق التشفير وتحديد معدل الطلبات (Rate Limiting)."
      ],
      diagramAscii: "JWT = Base64Url(Header) . Base64Url(Payload) . HMAC/RSA_Signature(Secret)",
      practicalExamples: ["فك ترميز Payload لـ JWT تجريبي والتحقق من أن التوقيع يفشل عند تعديل حرف واحد في الدور (role)."],
      commands: [
        { cmd: "curl -i -H 'Authorization: Bearer <TOKEN>' http://localhost:3000/api/profile", explain: "إرسال طلب API مع ترويسة التوثيق وفحص الاستجابة." }
      ],
      commonMistakes: ["وضع بيانات سرية (مثل كلمات المرور) داخل JWT Payload ظناً أنه مشفر."],
      exercises: ["ارسم مخطط تدفق طلب يمر عبر Browser -> Nginx Reverse Proxy -> Backend API -> Database."],
      quiz: [
        {
          q: "ما الخاصية التي تمنع أكواد JavaScript في المتصفح من قراءة Session Cookie؟",
          options: ["SameSite", "HttpOnly", "Max-Age", "Domain"],
          answerIdx: 1,
          explain: "علم HttpOnly يمنع document.cookie من قراءة الكوكي لتقليل أثر هجمات XSS."
        }
      ],
      lab: { title: "Lab 1.5 — فحص REST API وخصائص Cookies/JWT محلياً", environment: "Node.js/Python Local API + DevTools", steps: ["افحص ترويسات Set-Cookie في تطبيق محلي", "تحقق من وجود HttpOnly و Secure و SameSite"] },
      homework: "قارن في جدول بين Session-based Auth و Token-based Auth (JWT) من حيث الأمان وإمكانية إلغاء الجلسة (Revocation).",
      summary: "فهم معمارية الـ Web والـ APIs والتوثيق هو الجسر المباشر لأمن التطبيقات واختبار الاختراق.",
      references: ["RFC 7519 (JSON Web Token)", "OWASP Session Management Cheat Sheet"]
    })
  ],

  L1_M6: [
    createStandardLesson({
      id: "L1_M6_L1",
      titleAr: "بناء المختبرات المعزولة باستخدام Virtual Machines و Docker وأساسيات السحابة",
      titleEn: "Virtualization, Isolated Labs, Docker & Cloud Models",
      description: "إعداد شبكات افتراضية آمنة ومعزولة للتدريب القانوني وفهم الفرق بين VMs و Containers ونماذج السحابة.",
      whyStudy: "كل تدريب عملي في الأمن السيبراني يجب أن يتم داخل مختبر معزول لا يتسرب منه شيء للإنترنت العام، كما أن الحاويات والسحابة هما بيئة الإنتاج الحديثة.",
      prerequisites: ["L1_M2", "L1_M3"],
      objectives: [
        "التمييز بين Hypervisor Type 1 و Type 2 وبين الـ VM والـ Container",
        "إعداد شبكة Host-Only / Internal Network معزولة وأخذ Snapshots قبل أي تجربة",
        "التمييز بين IaaS و PaaS و SaaS في نموذج المسؤولية المشتركة"
      ],
      theory: "الآلة الافتراضية (VM) تحاكي عتاداً كاملاً وتشغل نواة نظام تشغيل مستقلة، مما يمنح عزلاً قوياً جداً للمختبرات الأمنية وتحليل البرمجيات الخبيثة. أما الحاوية (Docker Container) فتشارك نواة النظام المضيف وتعزل العمليات عبر Namespaces و Cgroups مما يجعلها خفيفة وسريعة جداً لتشغيل تطبيقات التدريب (مثل OWASP Juice Shop). وفي السحابة، تنتقل المسؤولية تدريجياً من المستخدم إلى المزود كلما انتقلت من IaaS إلى PaaS إلى SaaS، لكن أمان البيانات والهوية يبقى دائماً مسؤوليتك.",
      realWorldExamples: [
        "أخذ Snapshot لآلة التحليل قبل فحص عينة تدريبية يسمح بإرجاع الجهاز لحالته النظيفة في ثوانٍ.",
        "تشغيل OWASP Juice Shop محلياً عبر أمر Docker واحد على 127.0.0.1 فقط لمنع أي وصول خارجي."
      ],
      diagramAscii: "VM:        [App] -> [Guest OS Kernel] -> [Hypervisor] -> [Host OS]\nContainer: [App] -> [Docker Engine (Namespaces/Cgroups)] -> [Host Kernel]",
      practicalExamples: ["تشغيل حاوية معزولة مربوطة بـ 127.0.0.1 فقط."],
      commands: [
        { cmd: "docker run --rm -p 127.0.0.1:3000:3000 bkimminich/juice-shop", explain: "تشغيل مختبر OWASP Juice Shop محلياً فقط على جهازك بدون فتحه للشبكة الخارجية." }
      ],
      commonMistakes: ["وضع أجهزة الاختبار الضعيفة على شبكة Bridged متصلة بالراوتر العام بدلاً من Host-Only/Internal Network."],
      exercises: ["ارسم مخطط Home Lab يضم 3 آلات افتراضية على شبكة داخلية معزولة (10.10.10.0/24)."],
      quiz: [
        {
          q: "ما وضع الشبكة الأكثر أماناً لتشغيل آلات افتراضية ضعيفة مخصصة للتدريب؟",
          options: ["Bridged على شبكة المقهى", "Host-Only أو Internal Network معزولة", "Public IP مباشر", "DMZ مفتوحة"],
          answerIdx: 1,
          explain: "الشبكة الداخلية المعزولة تمنع أي اتصال خارجي غير مصرح به من أو إلى الأجهزة التدريبية."
        }
      ],
      lab: { title: "Lab 1.6 — بناء Home Lab معزول + Snapshot", environment: "VirtualBox/VMware + Docker", steps: ["أنشئ شبكة Host-Only", "ثبّت Ubuntu Server وخذ Snapshot باسم Clean_Base", "تأكد من تواصل الأجهزة داخلياً بـ ping"] },
      homework: "أضف مشروع 'Home Lab Architecture' إلى ملف أعمالك (Portfolio) داخل الجامعة مع مخطط الشبكة.",
      summary: "مختبرك المحلي المعزول هو ملعبك القانوني الآمن الذي ستبني فيه مهاراتك طوال مسيرتك.",
      references: ["Docker Official Security Docs", "NIST SP 800-145 (Cloud Computing Definition)"]
    })
  ],

  /* ===================== LEVEL 2 — CORE CYBERSECURITY ===================== */
  L2_M1: [
    createStandardLesson({
      id: "L2_M1_L1",
      titleAr: "أصول الأمن السيبراني: CIA Triad و Zero Trust ومعادلة المخاطر",
      titleEn: "CIA Triad, AAA, Defense in Depth, Zero Trust & Risk Management",
      description: "فهم المبادئ المعمارية التي يُبنى عليها كل قرار أمني في المؤسسات.",
      whyStudy: "الأدوات تتغير كل عام، لكن المبادئ المعمارية (CIA و Least Privilege و Zero Trust وإدارة المخاطر) هي البوصلة الثابتة لكل مهندس أمن.",
      prerequisites: ["L1_M2", "L1_M3"],
      objectives: [
        "تحليل أي حادثة أمنية بناءً على أثرها في السرية والتكامل والتوافر (CIA)",
        "التمييز الدقيق بين Threat و Vulnerability و Exploit و Risk",
        "تطبيق مبادئ Defense in Depth و Zero Trust (Never Trust, Always Verify)"
      ],
      theory: "ثالوث الأمان CIA يتكون من: السرية Confidentiality (منع الاطلاع غير المصرح به)، التكامل Integrity (منع التعديل غير المصرح به وضمان سلامة البيانات)، والتوافر Availability (استمرار عمل الخدمة عند الحاجة). وتُحسب المخاطر (Risk) من تقاطع التهديد (Threat) مع الثغرة (Vulnerability) مضروباً في الاحتمالية (Likelihood) والأثر (Impact). ولأن الاختراق قد يحدث في أي طبقة، نطبق الدفاع متعدد الطبقات (Defense in Depth) ونموذج عدم الثقة (Zero Trust) الذي يتحقق من كل طلب وهوية وجهاز حتى داخل الشبكة الداخلية.",
      realWorldExamples: [
        "هجوم Ransomware يضرب التوافر (بتشفير الملفات) وقد يضرب السرية (بتسريبها للابتزاز المزدوج).",
        "تعديل رصيد حساب بنكي في قاعدة البيانات هو خرق للتكامل (Integrity)."
      ],
      diagramAscii: "Risk = Threat x Vulnerability x Impact\nControls: Preventive (Firewall) | Detective (SIEM) | Corrective (Backup/Restore)",
      practicalExamples: ["تصنيف 6 ضوابط أمنية إلى وقائية (Preventive) وكاشفة (Detective) وتصحيحية (Corrective)."],
      commands: [],
      commonMistakes: ["الاعتقاد أن وجود جدار ناري قوي يكفي وحده لتأمين المؤسسة (تجاهل الدفاع المتعدد الطبقات وZero Trust)."],
      exercises: ["حلل نظام جامعة إلكتروني وحدد أهم 3 مخاطر على السرية والتكامل والتوافر مع ضابط لكل خطر."],
      quiz: [
        {
          q: "أي عنصر من CIA Triad يتأثر بشكل مباشر عند وقوع هجوم DDoS يوقف الموقع؟",
          options: ["Confidentiality", "Integrity", "Availability", "Non-Repudiation"],
          answerIdx: 2,
          explain: "هجمات حجب الخدمة DDoS تستهدف إيقاف التوافر (Availability)."
        }
      ],
      lab: { title: "Lab 2.1 — تقييم سطح الهجوم وفق NIST CSF 2.0", environment: "تحليل معماري على نموذج نظام", steps: ["ارسم مكونات تطبيق جامعي", "حدد نقاط الدخول (Attack Surface)", "وزّع الضوابط على وظائف NIST CSF 2.0 الست (Govern, Identify, Protect, Detect, Respond, Recover)"] },
      homework: "اكتب وثيقة سياسة كلمات مرور وأقل صلاحية (Least Privilege Policy) من صفحة واحدة.",
      summary: "الأمن السيبراني علم إدارة مخاطر وبناء طبقات دفاع متكاملة، وليس مجرد تركيب برامج حماية.",
      references: ["NIST Cybersecurity Framework (CSF) 2.0", "NIST SP 800-207 (Zero Trust Architecture)"]
    })
  ],

  L2_M2: [
    createStandardLesson({
      id: "L2_M2_L1",
      titleAr: "تشريح مشهد التهديدات وربط الهجمات بمصفوفة MITRE ATT&CK",
      titleEn: "Threat Landscape, Attack Chains & MITRE ATT&CK Mapping",
      description: "فهم الجهات المهددة، سلاسل الهجوم الحديثة (Ransomware, Supply Chain, Identity)، وكيفية قراءة MITRE ATT&CK.",
      whyStudy: "معرفة كيف يفكر المهاجم ويتحرك خطوة بخطوة تمكّن الفرق الدفاعية والهجومية من التحدث بلغة مهنية موحدة.",
      prerequisites: ["L2_M1"],
      objectives: [
        "التمييز بين Cybercrime و Insider Threats و APT Groups",
        "تتبع سلسلة هجوم حقيقية من الوصول الأولي حتى الأثر النهائي",
        "إسقاط سلوك مهاجم على التكتيكات والتقنيات في MITRE ATT&CK"
      ],
      theory: "الهجمات الحديثة نادراً ما تكون ضربة واحدة، بل سلسلة مترابطة: يبدأ المهاجم بالوصول الأولي (مثل Phishing أو استغلال ثغرة خارجية أو سرقة هوية)، ثم يثبت وجوده (Persistence)، ويرفع صلاحياته (Privilege Escalation)، ويتحرك جانبياً داخل الشبكة (Lateral Movement) للوصول للأصول الحساسة. توفر مصفوفة MITRE ATT&CK تصنيفاً عالمياً للتكتيكات (لماذا يفعل المهاجم ذلك؟) والتقنيات (كيف يفعله؟) مع طرق الكشف والتخفيف لكل تقنية.",
      realWorldExamples: [
        "هجمات سلاسل الإمداد (Supply Chain Attacks) تستهدف حزمة برمجية أو تحديثاً موثوقاً للوصول لمئات الشركات دفعة واحدة.",
        "تقنية T1566 في MITRE ATT&CK تشير إلى التصيد (Phishing) و T1059 تشير إلى تنفيذ أوامر عبر المفسرات مثل PowerShell."
      ],
      diagramAscii: "[Initial Access (T1566)] -> [Execution (T1059)] -> [Persistence] -> [Credential Access] -> [Lateral Movement] -> [Impact]",
      practicalExamples: ["تصفح موقع attack.mitre.org واستخراج طرق الكشف (Detection) لتقنية T1059.001 (PowerShell)."],
      commands: [],
      commonMistakes: ["التركيز على اسم الفيروس فقط وإهمال سلوك وتكتيكات المهاجم (TTPs) التي تبقى ثابتة حتى لو غيّر أدواته."],
      exercises: ["اربط سيناريو رسالة تصيد بمرفق ماكرو ينفذ PowerShell بـ 3 تقنيات من MITRE ATT&CK."],
      quiz: [
        {
          q: "ما الفرق بين Tactic و Technique في MITRE ATT&CK؟",
          options: ["لا يوجد فرق", "الـ Tactic هو الهدف التكتيكي والـ Technique هي الطريقة المنفذة لتحقيقه", "الـ Tactic للأجهزة فقط", "الـ Technique للإدارة فقط"],
          answerIdx: 1,
          explain: "التكتيك يصف الهدف (مثل Persistence) بينما التقنية تصف الأسلوب العملي لتحقيق هذا الهدف."
        }
      ],
      lab: { title: "Lab 2.2 — إسقاط تقرير حادثة حقيقي على ATT&CK", environment: "MITRE ATT&CK Navigator (ويب مجاني)", steps: ["اختر تقرير حادثة موثق", "استخرج 5 تقنيات استخدمها المهاجم", "لوّنها على ATT&CK Navigator وحدد طرق كشفها"] },
      homework: "اكتب مقارنة بين دافع مجموعات Cybercrime ودافع مجموعات APT المدعومة من دول.",
      summary: "مصفوفة MITRE ATT&CK هي القاموس العملي المشترك الذي يربط بين فهم الهجوم وهندسة الكشف والدفاع.",
      references: ["MITRE ATT&CK Enterprise Matrix (attack.mitre.org)"]
    })
  ],

  L2_M3: [
    createStandardLesson({
      id: "L2_M3_L1",
      titleAr: "التشفير التطبيقي: AES و RSA و Hashing و PKI و TLS",
      titleEn: "Applied Cryptography: Symmetric, Asymmetric, Hashing, PKI & TLS",
      description: "كيف تعمل الخوارزميات الحديثة لحماية البيانات أثناء النقل والتخزين وكيف تفشل عند سوء التطبيق.",
      whyStudy: "أغلب اختراقات التشفير لا تكسر الرياضيات نفسها بل تستغل أخطاء تطبيقية مثل استخدام MD5 لكلمات المرور أو تخزين المفتاح بجانب البيانات.",
      prerequisites: ["L0_M4", "L2_M1"],
      objectives: [
        "التمييز بين التشفير المتماثل (AES-GCM) وغير المتماثل (RSA/ECC) والهاش (SHA-256)",
        "شرح لماذا نستخدم Argon2/bcrypt مع Salt لتخزين كلمات المرور بدلاً من SHA-256 الخام",
        "تتبع دور الشهادات الرقمية (PKI/CA) ومصافحة TLS في حماية HTTPS"
      ],
      theory: "التشفير المتماثل (مثل AES-256-GCM) سريع جداً ومثالي لتشفير البيانات الكبيرة لكنه يحتاج وسيلة آمنة لتبادل المفتاح. هنا يأتي التشفير غير المتماثل (RSA / ECC) بزوج مفاتيح (عام وخاص) لتبادل مفتاح الجلسة والتوقيع الرقمي. أما التجزئة (Hashing) فدالة باتجاه واحد للتحقق من التكامل (Integrity) مثل SHA-256. وعند تخزين كلمات المرور نستخدم خوارزميات بطيئة عمداً مع قيمة عشوائية (Salt) مثل Argon2id أو bcrypt لإفشال هجمات القواميس وجداول قوس قزح.",
      realWorldExamples: [
        "في HTTPS (TLS 1.3)، يُستخدم التشفير غير المتماثل والشهادة الرقمية للمصادقة وتبادل المفاتيح (ECDHE)، ثم يُستخدم AES-GCM السريع لتشفير بقية الجلسة.",
        "التوجه الحديث نحو Post-Quantum Cryptography (معايير NIST مثل ML-KEM) يهدف لحماية البيانات طويلة الأمد ضد الحوسبة الكمية مستقبلاً."
      ],
      diagramAscii: "[Client] <-> [TLS Handshake: Verify CA Cert + ECDHE Key Exchange] -> [Shared Session Key] -> [AES-256-GCM Encrypted Traffic]",
      practicalExamples: ["إنشاء زوج مفاتيح RSA وتوقيع ملف والتحقق من توقيعه باستخدام OpenSSL."],
      commands: [
        { cmd: "openssl dgst -sha256 report.txt", explain: "حساب بصمة التكامل SHA-256 لملف معين." },
        { cmd: "openssl enc -aes-256-cbc -pbkdf2 -salt -in secret.txt -out secret.enc", explain: "تشفير ملف محلياً بـ AES-256 مع Salt و PBKDF2." }
      ],
      commonMistakes: ["الخلط بين Encoding (مثل Base64 وهو ليس تشفيراً)، Hashing (اتجاه واحد)، و Encryption (قابل للعكس بمفتاح)."],
      exercises: ["شفّر ملفاً نصياً بـ OpenSSL ثم غيّر بايت واحداً وحاول فك تشفيره وراقب النتيجة."],
      quiz: [
        {
          q: "ما الخيار الأنسب لتخزين كلمات مرور المستخدمين في قاعدة البيانات؟",
          options: ["تشفيرها بـ Base64", "تجزئتها بـ MD5 بدون Salt", "استخدام Argon2id أو bcrypt مع Salt فريد لكل مستخدم", "تخزينها كنص صريح داخل مجلد مخفي"],
          answerIdx: 2,
          explain: "Argon2id و bcrypt مصممان خصيصاً لإبطاء التخمين وحماية كلمات المرور مع Salt فريد."
        }
      ],
      lab: { title: "Lab 2.3 — معمل OpenSSL للتشفير والتوقيع الرقمي", environment: "Linux/Windows مع OpenSSL", steps: ["ولّد مفتاحاً خاصاً وعاماً بـ openssl genpkey", "وقّع ملفاً وتحقق من التوقيع", "افحص شهادة موقع حقيقي بـ openssl s_client"] },
      homework: "اشرح لماذا يُعد Base64 ترميزاً (Encoding) وليس تشفيراً (Encryption).",
      summary: "اختر دائماً خوارزميات قياسية حديثة (AES-GCM, SHA-256/3, Argon2id, TLS 1.3) ولا تخترع خوارزمية تشفير خاصة بك أبداً.",
      references: ["NIST Cryptographic Standards & Post-Quantum Project", "OWASP Cryptographic Storage Cheat Sheet"]
    })
  ],

  L2_M4: [
    createStandardLesson({
      id: "L2_M4_L1",
      titleAr: "إدارة الهوية والصلاحيات: IAM و Kerberos و Active Directory و Entra ID",
      titleEn: "Identity & Access Management: MFA, RBAC/ABAC, Kerberos & Federation",
      description: "كيف تُدار الهويات في المؤسسات التقليدية (Active Directory) والسحابية (Entra ID) وبروتوكولات SSO.",
      whyStudy: "أغلب الاختراقات المؤسسية اليوم لا تكسر جداراً نارياً بل تسجّل الدخول بهوية مسروقة أو صلاحية مفرطة (Identity is the new perimeter).",
      prerequisites: ["L1_M2", "L1_M5", "L2_M1"],
      objectives: [
        "المقارنة بين RBAC و ABAC وإدارة الصلاحيات المتميزة PAM",
        "فهم تدفق التوثيق في Kerberos (KDC, AS, TGS, TGT, Service Ticket)",
        "التمييز بين SAML و OAuth 2.0 و OpenID Connect في الدخول الموحد SSO"
      ],
      theory: "تعتمد المؤسسات على دليل مركزي للهويات مثل Active Directory (داخلياً) و Microsoft Entra ID (سحابياً). في Active Directory يعمل بروتوكول Kerberos بالتذاكر: يثبت المستخدم هويته لمركز توزيع المفاتيح (KDC) فيحصل على تذكرة TGT، ثم يطلب بها تذكرة خدمة (Service Ticket) للوصول للخادم دون إعادة إرسال كلمة المرور. ولحماية الحسابات الإدارية نطبق PAM (صلاحيات مؤقتة عند الطلب Just-In-Time) ومصادقة متعددة العوامل مقاومة للتصيد (FIDO2/Passkeys).",
      realWorldExamples: [
        "فصل حساب المدير اليومي (لقراءة الإيميل) عن حساب Domain Admin يمنع سيطرة المهاجم على الشركة إذا سقط جهاز الموظف بالتصيد.",
        "تطبيق Conditional Access في Entra ID يمنع الدخول من دول غير معتادة أو أجهزة غير مُدارة."
      ],
      diagramAscii: "[User] --1.Auth--> [KDC / AS] --2.TGT--> [User]\n[User] --3.TGT + SPN--> [TGS] --4.Service Ticket--> [User] --5.Access--> [Target Server]",
      practicalExamples: ["مراجعة مصفوفة صلاحيات RBAC لـ 4 أدوار وظيفية وتطبيق مبدأ Least Privilege."],
      commands: [
        { cmd: "klist", explain: "يعرض تذاكر Kerberos المخزنة حالياً في جلسة المستخدم على Windows أو Linux." },
        { cmd: "whoami /priv", explain: "يعرض الصلاحيات الفعلية الممنوحة للمستخدم الحالي في Windows." }
      ],
      commonMistakes: ["الخلط بين OAuth 2.0 (بروتوكول تفويض صلاحيات) و OpenID Connect (طبقة مصادقة هوية مبنية فوق OAuth 2.0)."],
      exercises: ["صمّم سياسة MFA و PAM لحسابات المسؤولين في شركة بها 3 أقسام."],
      quiz: [
        {
          q: "ما الغرض الرئيسي من نظام PAM (Privileged Access Management)؟",
          options: ["تسريع الإنترنت", "التحكم في الحسابات الإدارية عالية الصلاحية ومراقبتها ومنحها بشكل مؤقت", "تخزين ملفات الفيديو", "ضغط الصور"],
          answerIdx: 1,
          explain: "PAM يحمي الحسابات الأكثر حساسية ويطبق مبدأ Just-In-Time والرقابة والتسجيل."
        }
      ],
      lab: { title: "Lab 2.4 — تصميم مصفوفة RBAC وفحص تذاكر الجلسة", environment: "مختبر Windows/Linux محلي", steps: ["نفذ whoami /all و klist على جهاز Windows", "وثّق الصلاحيات الحساسة وصمم نموذج RBAC لـ 3 مجموعات"] },
      homework: "اشرح الفرق بين SAML و OpenID Connect ومتى تُفضل الشركات كل منهما.",
      summary: "تأمين الهوية وتقليل الصلاحيات هما أقوى حاجز لإيقاف الحركة الجانبية داخل المؤسسات.",
      references: ["NIST SP 800-63B (Digital Identity Guidelines)", "Microsoft Entra ID Architecture Docs"]
    })
  ],

  L2_M5: [
    createStandardLesson({
      id: "L2_M5_L1",
      titleAr: "المنهجية الهندسية لتعلم أدوات الأمن (9 محاور لكل أداة)",
      titleEn: "Security Tools Methodology: Nmap, Wireshark, Sysmon, Wazuh & Burp",
      description: "كيف تتعلم أي أداة أمنية بفهم عميق: ما هي، لماذا، كيف تعمل، متى تستخدمها ومتى لا تستخدمها.",
      whyStudy: "تشغيل الأدوات بدون فهم آليتها ينتج تقارير خاطئة وقد يعطّل خدمات حقيقية؛ المهندس يفهم ما ترسله الأداة على الشبكة قبل الضغط على Enter.",
      prerequisites: ["L1_M2", "L1_M3", "L1_M6", "L2_M1"],
      objectives: [
        "تطبيق إطار الـ 9 أسئلة على أدوات الفحص والرصد (Nmap, Wireshark, Sysmon, Wazuh, Burp Suite)",
        "التمييز بين الفحص المصرح به في مختبر معزول والاستخدام الممنوع",
        "تفسير مخرجات Nmap و Sysmon وربطها بحزم Wireshark"
      ],
      theory: "قبل استخدام أي أداة أمنية يجب الإجابة على 9 أسئلة: (1) ما هي؟ (2) لماذا نستخدمها؟ (3) كيف تعمل تقنياً على مستوى البروتوكول/النظام؟ (4) متى نستخدمها؟ (5) متى لا نستخدمها؟ (مثلاً: لا تشغّل Nmap aggressive scan على أجهزة صناعية OT/ICS قد تتوقف عن العمل!) (6) التمرين العملي (7) النتيجة المتوقعة (8) الأخطاء الشائعة (9) مشروع صغير. فمثلاً Nmap يرسل حزم SYN ليرى إن رد المنفذ بـ SYN-ACK (مفتوح) أو RST (مغلق)، و Sysmon يسجل تفاصيل إنشاء العمليات والاتصالات الشبكية بدقة تفوق سجلات Windows الافتراضية.",
      realWorldExamples: [
        "تشغيل فحص عنيف غير مضبوط على شبكة إنتاج قد يملأ السجلات أو يوقف طابعة/جهازاً قديماً.",
        "تشغيل Wazuh + Sysmon في مختبرك يحول أي جهاز عادي إلى هدف مراقب ترى فيه أثر كل أمر تنفذه."
      ],
      diagramAscii: "[Authorized Lab Target] <--(Nmap SYN)-- [Tester VM]\n           |\n     (Sysmon Telemetry) --> [Wazuh SIEM Dashboard]",
      practicalExamples: ["فحص جهاز داخل شبكتك المعزولة 10.10.10.x بـ Nmap أثناء مراقبة الحزم في Wireshark."],
      commands: [
        { cmd: "nmap -sV -p 22,80,443 10.10.10.20", explain: "فحص المنافذ المحددة وإصدارات الخدمات عليها داخل شبكة مختبر محلية مصرح بها فقط." }
      ],
      commonMistakes: ["فحص عناوين IP عامة على الإنترنت بدون تفويض كتابي، أو تشغيل جميع سكربتات Nmap دون قراءة ماذا تفعل."],
      exercises: ["طبّق جدول الـ 9 محاور على أداتي Wireshark و Burp Suite Community."],
      quiz: [
        {
          q: "في فحص Nmap TCP SYN (-sS)، ماذا يعني رد الجهاز الهدف بحزمة RST؟",
          options: ["المنفذ مفتوح (Open)", "المنفذ مغلق (Closed)", "الجهاز مطفأ", "تم اختراق الجهاز"],
          answerIdx: 1,
          explain: "حزمة Reset (RST) تعني أن الجهاز وصلته الحزمة لكن لا توجد خدمة تستمع على هذا المنفذ (Closed)."
        }
      ],
      lab: { title: "Lab 2.5 — ربط Nmap بـ Wireshark و Wazuh في مختبر معزول", environment: "شبكة Host-Only محلية", steps: ["شغّل Wireshark على واجهة الشبكة المعزولة", "نفّذ فحص Nmap على 3 منافذ فقط للجهاز التدريبي", "طابق الحزم الظاهرة في Wireshark مع نتيجة Nmap"] },
      homework: "أنشئ دليل أدوات شخصي يوثق 6 أدوات (3 دفاعية + 3 اختبارية) باستخدام نموذج الـ 9 محاور.",
      summary: "الأداة وسيلة تنفيذ فقط؛ القيمة الحقيقية في فهمك للبروتوكول والسجل والحدود الآمنة لاستخدامها.",
      references: ["Nmap Official Reference Guide", "Microsoft Sysinternals Sysmon Docs", "Wazuh Official Documentation"]
    })
  ],

  L2_M6: [
    createStandardLesson({
      id: "L2_M6_L1",
      titleAr: "الأخلاقيات والحدود القانونية وقواعد الاشتباك (RoE & Scope)",
      titleEn: "Legal Boundaries, Rules of Engagement, Scope & Responsible Disclosure",
      description: "الإطار القانوني والأخلاقي الذي يحمي المهندس والمؤسسة أثناء الاختبار والتحقيق والإفصاح.",
      whyStudy: "الفرق الوحيد قانونياً بين مهندس الأمن السيبراني والمجرم السيبراني هو التفويض الكتابي والالتزام الصارم بالنطاق (Scope) وحماية البيانات.",
      prerequisites: ["L2_M1"],
      objectives: [
        "قراءة وثيقة Scope و Rules of Engagement واستخراج الأصول المسموحة والممنوعة",
        "فهم خطوات الإفصاح المسؤول عن الثغرات (Coordinated Vulnerability Disclosure)",
        "تطبيق مبادئ حفظ الأدلة والخصوصية وعدم تسريب بيانات حقيقية"
      ],
      theory: "قبل بدء أي اختبار أمني يجب وجود وثيقة تفويض (Authorization Letter) وقواعد اشتباك (Rules of Engagement - RoE) تحدد بدقة: النطاق المسموح (In-Scope IPs/Domains)، المستثنيات (Out-of-Scope)، أوقات الاختبار المسموحة، الاختبارات الممنوعة (مثل DoS أو الهندسة الاجتماعية غير المصرح بها)، وجهات الاتصال للطوارئ. وفي برامج Bug Bounty يجب احترام سياسة البرنامج وعدم الوصول لبيانات مستخدمين آخرين أو تعديلها بل الاكتفاء بأقل إثبات مفهوم آمن (Safe PoC).",
      realWorldExamples: [
        "اختبار نطاق فرعي غير مدرج في Scope برنامج Bug Bounty قد يؤدي لإغلاق الحساب أو المساءلة القانونية حتى لو كانت النية حسنة.",
        "في التحقيق الجنائي، أي تعديل في الدليل الأصلي بدون توثيق Chain of Custody قد يبطل الدليل أمام القضاء."
      ],
      diagramAscii: "[Written Authorization] -> [Strict Scope & RoE] -> [Safe Testing] -> [Private Report] -> [Fix Verified]",
      practicalExamples: ["قراءة سياسة برنامج إفصاح مسؤول (VDP) وتحديد 3 أشياء مسموحة و 3 أشياء ممنوعة."],
      commands: [],
      commonMistakes: ["اختبار موقع مدرسة أو شركة محلية 'لمساعدتهم' دون إذن مسبق مكتوب؛ هذا يُعد اختراقاً غير قانوني في أغلب القوانين."],
      exercises: ["اكتب مسودة Rules of Engagement مختصرة لاختبار تطبيق ويب جامعي في بيئة Staging."],
      quiz: [
        {
          q: "اكتشفت بالصدفة إمكانية الوصول لبيانات 10,000 مستخدم داخل برنامج Bug Bounty مصرح به، ما التصرف المهني الصحيح؟",
          options: ["تحميل قاعدة البيانات كاملة كدليل", "الاكتفاء بإثبات الحد الأدنى على حسابك التجريبي وإبلاغ الفريق فوراً بشكل سري", "نشر الثغرة على مواقع التواصل", "تجاهل الأمر"],
          answerIdx: 1,
          explain: "يُمنع سحب بيانات المستخدمين؛ يُكتفى بأقل إثبات آمن على حسابات اختبارية والإبلاغ السري المسؤول."
        }
      ],
      lab: { title: "Lab 2.6 — تدقيق وثيقة Scope وصياغة RoE", environment: "تمرين تحليل وثائق", steps: ["اقرأ نموذج Scope لبرنامج Bug Bounty حقيقي", "استخرج قائمة الأصول المسموحة والممنوعة", "اكتب نموذج تقرير إفصاح مسؤول"] },
      homework: "اقرأ معيار ISO/IEC 29147 (Vulnerability Disclosure) ولخص أبرز 5 التزامات أخلاقية.",
      summary: "الاحتراف يبدأ بالانضباط القانوني والأخلاقي قبل أول سطر كود أو أول فحص أمني.",
      references: ["ISO/IEC 29147 (Vulnerability Disclosure)", "OWASP Vulnerability Disclosure Cheat Sheet"]
    })
  ],

  /* ===================== ACADEMY 1 — RED TEAM & OFFENSIVE SECURITY ===================== */
  ACAD_01: [
    createStandardLesson({
      id: "A1_L1_S1",
      titleAr: "المرحلة 1 (Beginner): منهجية اختبار الاختراق ورسم سطح الهجوم والتقارير",
      titleEn: "Stage 1: Pentest Methodology, Scope, Enumeration & Professional Reporting",
      description: "الفرق بين Vulnerability Assessment و Pentesting و Red Teaming و Bug Bounty ومنهجية التقييم المنظمة.",
      whyStudy: "المختبر المحترف لا يطلق أدوات عشوائية؛ بل يتبع منهجية منظمة تنتهي بتقرير تقني وتنفيذي يساعد المؤسسة على إغلاق المخاطر فعلياً.",
      prerequisites: ["L1_M3", "L2_M5", "L2_M6"],
      objectives: [
        "التمييز الدقيق بين Vulnerability Assessment و Pentesting و Red Teaming و Bug Bounty",
        "تنفيذ مرحلة الاستطلاع والاستعداد (Recon & Enumeration) داخل مختبر معزول",
        "كتابة تقرير ثغرة احترافي (Title, CVSS, Affected Asset, Reproduction Steps, Impact, Remediation)"
      ],
      theory: "تقييم الثغرات (Vulnerability Assessment) يهدف لحصر الثغرات المحتملة بصورة شاملة، بينما اختبار الاختراق (Penetration Testing) يتحقق من قابلية استغلالها وربطها ببعضها ضمن نطاق وزمن محددين. أما عمليات الفريق الأحمر (Red Teaming) فتحاكي خصماً حقيقياً لاختبار قدرة الفريق الأزرق (SOC/EDR) على الكشف والاستجابة. وأياً كانت النتائج التقنية، فقيمة عملك الحقيقية تظهر في جودة التقرير والتحقق من الإصلاح (Remediation Validation).",
      realWorldExamples: [
        "تقرير يشرح أثر الثغرة على العمل (Business Impact) ويقدم سطر الكود المصحح يُغلق في أيام، بينما تقرير يرمي مخرجات أداة تلقائية يُرفض."
      ],
      diagramAscii: "[1. Scope & RoE] -> [2. Recon & Enumeration] -> [3. Authorized Validation] -> [4. Risk Report] -> [5. Retest]",
      practicalExamples: ["توثيق ثغرة مكتشفة داخل بيئة OWASP Juice Shop المحلية وفق قالب CVSS v4.0."],
      commands: [
        { cmd: "nmap -sC -sV -oA lab_scan 10.10.10.20", explain: "حفظ نتائج فحص مختبر محلي بجميع الصيغ لتوثيقها في التقرير." }
      ],
      commonMistakes: ["الخلط بين Red Teaming و Pentesting، أو نسيان توثيق خطوات إعادة الإنتاج (Steps to Reproduce) بدقة."],
      exercises: ["اكتب مقارنة في 4 صفوف بين Pentesting و Red Teaming و Bug Bounty و Vulnerability Assessment."],
      quiz: [
        {
          q: "ما الهدف الأساسي من عمليات الفريق الأحمر (Red Team Operations) مقارنة باختبار الاختراق التقليدي؟",
          options: ["فحص كل المنافذ بأعلى سرعة", "محاكاة خصم واقعي لقياس وتحسين قدرات الكشف والاستجابة لدى الدفاع (Blue Team)", "تشغيل ماسح ثغرات تلقائي فقط", "تحديث أنظمة التشغيل"],
          answerIdx: 1,
          explain: "Red Teaming يختبر الأفراد والعمليات والتقنيات الدفاعية عبر محاكاة تكتيكات خصم واقعي."
        }
      ],
      lab: { title: "Lab A1.1 — تقييم خادم مختبر معزول وكتابة تقرير Pentest", environment: "مختبر محلي معزول (Host-Only)", steps: ["وثّق النطاق المسموح", "اكتشف الخدمات المفتوحة وحدد سوء الإعدادات", "سلّم تقريراً يشمل Executive Summary وخطة الإصلاح"] },
      homework: "بناء قالب تقرير Penetration Test احترافي بصيغة Markdown وحفظه في ملف أعمالك.",
      summary: "المنهجية المنظمة والتقرير الاحترافي هما ما يميز مهندس الأمن الهجومي عن هاوي الأدوات.",
      references: ["PTES — Penetration Testing Execution Standard", "NIST SP 800-115"]
    }),

    createStandardLesson({
      id: "A1_L2_S2",
      titleAr: "المرحلة 2 (Intermediate): أمن تطبيقات الويب والـ APIs وفق OWASP Top 10:2025 و ASVS",
      titleEn: "Stage 2: Web & API Security Testing (OWASP 2025, WSTG & API Top 10)",
      description: "اختبار التحكم بالوصول (BOLA/IDOR)، الثغرات المنطقية، الحقن، SSRF، وأمن JWT/OAuth/GraphQL مع خطوات الإصلاح.",
      whyStudy: "تطبيقات الويب والـ APIs هي أكبر سطح هجوم مكشوف للإنترنت، ومعرفة طرق فحصها وفق OWASP ASVS/WSTG ضرورية للاختبار وللتأمين.",
      prerequisites: ["L1_M5", "A1_L1_S1"],
      objectives: [
        "فحص ثغرات Broken Access Control و BOLA/IDOR في REST و GraphQL APIs",
        "تحليل ثغرات SSRF و XSS و SQLi و Business Logic داخل مختبرات PortSwigger و Juice Shop",
        "تقديم حلول إصلاح جذرية (Defense-in-Depth) لكل ثغرة"
      ],
      theory: "في OWASP Top 10:2025 و OWASP API Security Top 10 تتصدر ثغرات التحكم بالوصول (Broken Object Level Authorization - BOLA/IDOR) القائمة؛ حيث يتحقق الخادم من أنك مسجل دخول (Authentication) لكنه ينسى التحقق هل تملك هذا السجل فعلاً (Authorization). كذلك في SSRF يُخدع الخادم لإرسال طلبات لخدمات داخلية محمية مثل Metadata السحابة. الاختبار الاحترافي لا يقتصر على قائمة Top 10 بل يتبع منهجية OWASP WSTG ومعايير التحقق OWASP ASVS.",
      realWorldExamples: [
        "تغيير رقم الفاتورة في طلب API من /api/invoices/104 إلى /api/invoices/105 وعرض بيانات عميل آخر هو مثال مباشر على BOLA/IDOR.",
        "الإصلاح الصحيح: التحقق دائماً في الخادم من أن `invoice.ownerId === req.user.id` وعدم الاعتماد على إخفاء الأرقام في الواجهة."
      ],
      diagramAscii: "[User A (Token A)] --GET /api/orders/999 (Owner: User B)--> [API Server]\n   Vulnerable: Checks Token only -> Leaks Order 999!\n   Secure:     Checks Token AND (Order.ownerId == Token.uid) -> 403 Forbidden",
      practicalExamples: ["استخدام Burp Suite Community Proxy لاعتراض طلب API محلي داخل OWASP Juice Shop والتحقق من صلاحيات الكائن."],
      commands: [
        { cmd: "curl -s -H 'Authorization: Bearer <USER_A_TOKEN>' http://127.0.0.1:3000/api/BasketItems/2", explain: "اختبار صلاحية الوصول لكائن يخص مستخدماً آخر في مختبر Juice Shop المحلي." }
      ],
      commonMistakes: ["الاكتفاء بفحص الثغرات الكلاسيكية وتجاهل ثغرات منطق الأعمال (Business Logic) مثل تطبيق كوبون الخصم مرتين أو Race Conditions."],
      exercises: ["أكمل مختبرات Access Control و Authentication المجانية على PortSwigger Web Security Academy."],
      quiz: [
        {
          q: "ما الإصلاح الجذري لثغرة IDOR / BOLA في واجهات API؟",
          options: ["تغيير الأرقام التسلسلية إلى Base64", "التحقق الإلزامي في الخادم من ملكية المستخدم الحالي للمورد المطلوب في كل طلب", "إخفاء الرابط من واجهة Frontend", "منع النقر بالزر الأيمن"],
          answerIdx: 1,
          explain: "الضابط الحقيقي هو فرض التحقق من الصلاحية على مستوى الكائن (Object-Level Authorization) في الخادم دائماً."
        }
      ],
      lab: { title: "Lab A1.2 — تدقيق ويب وAPI على OWASP Juice Shop / PortSwigger", environment: "OWASP Juice Shop المحلي + Burp Suite Community", steps: ["شغّل Juice Shop على 127.0.0.1", "اختبر 3 فئات من OWASP WSTG (Auth, Access Control, Input Validation)", "اكتب تقرير فحص مع كود الإصلاح المقترح لكل ثغرة"] },
      homework: "قارن بين متطلبات OWASP ASVS Level 1 و Level 2 لأمن المصادقة وإدارة الجلسات.",
      summary: "الاختبار العميق للويب والـ APIs يعتمد على فهم منطق التطبيق ومعايير OWASP ASVS/WSTG وليس تشغيل الماسحات الآلية.",
      references: ["OWASP Top 10:2025", "OWASP API Security Top 10", "OWASP WSTG & ASVS", "PortSwigger Web Security Academy"]
    }),

    createStandardLesson({
      id: "A1_L3_S3",
      titleAr: "المرحلة 3 (Advanced): أمن Active Directory وتحليل مسارات الهجوم والتقوية",
      titleEn: "Stage 3: Active Directory Security Assessment, Attack Paths & Hardening",
      description: "تقييم إعدادات Active Directory و Kerberos و GPOs وتحليل مسارات تصعيد الصلاحيات وبناء دفاعاتها.",
      whyStudy: "أكثر من 80% من الشركات الكبرى تعتمد على Active Directory؛ وفهم مسارات الهجوم فيه ضروري لكل من فريق الاختبار وفريق الدفاع والـ IAM.",
      prerequisites: ["L1_M2", "L2_M4", "A1_L1_S1"],
      objectives: [
        "رسم معمارية الدومين وعلاقات الثقة (Trusts) والصلاحيات غير الآمنة في ACLs/GPOs",
        "فهم آليات تقييم Kerberos و NTLM و LDAP بأمان داخل مختبر معزول",
        "تصميم ضوابط تقوية Active Directory وربطها بقواعد كشف SOC"
      ],
      theory: "في بيئات Active Directory، نادراً ما تكون المشكلة ثغرة برمجية في Windows، بل سوء إعداد في الصلاحيات (Misconfigurations): حسابات خدمة بكلمات مرور ضعيفة، تفويض غير مقيد (Unconstrained Delegation)، صلاحيات تعديل واسعة على مجموعات حساسة أو GPOs، أو استخدام بروتوكول NTLM القديم بدون توقيع (SMB/LDAP Signing). يقوم مهندس الأمن برسم خريطة العلاقات (Attack Path Analysis) لكشف المسارات الخفية نحو Domain Admin ثم إغلاقها بتطبيق Tiering Model وتفعيل LDAP/SMB Signing وحماية حسابات الخدمة بـ gMSA.",
      realWorldExamples: [
        "تطبيق نموذج المستويات (AD Tiering Model) يمنع تسجيل دخول حسابات Tier 0 (Domain Admins) على محطات العمل العادية (Tier 2)."
      ],
      diagramAscii: "[Tier 2 Workstations] --X--> [Tier 1 Servers] --X--> [Tier 0 Domain Controllers & PKI]\n(Strict Administrative Boundary + gMSA + SMB/LDAP Signing)",
      practicalExamples: ["مراجعة إعدادات أمان الدومين محلياً والتحقق من تفعيل SMB Signing وحسابات Protected Users."],
      commands: [
        { cmd: "Get-ADGroupMember -Identity 'Domain Admins'", explain: "أمر PowerShell لمراجعة أعضاء مجموعة Domain Admins وتقليصهم للحد الأدنى." }
      ],
      commonMistakes: ["ترك حسابات الخدمة (Service Accounts) بكلمات مرور ثابتة بدلاً من Group Managed Service Accounts (gMSA)."],
      exercises: ["صمّم خطة تقوية Active Directory من 6 ضوابط مع تحديد Event ID الذي يرصد كل هجوم."],
      quiz: [
        {
          q: "ما الفائدة الأمنية من استخدام Group Managed Service Accounts (gMSA) في Active Directory؟",
          options: ["إلغاء الحاجة لـ DNS", "إدارة وتدوير كلمات مرور معقدة تلقائياً لحسابات الخدمة لتقليل مخاطر سرقتها", "فتح جميع المنافذ تلقائياً", "تعطيل Kerberos"],
          answerIdx: 1,
          explain: "gMSA تنشئ وتدوّر كلمات مرور عشوائية طويلة تلقائياً وتحمي حسابات الخدمة من هجمات استهداف كلمات المرور الضعيفة."
        }
      ],
      lab: { title: "Lab A1.3 — تدقيق وتقوية مختبر Active Directory معزول", environment: "Windows Server DC VM معزولة", steps: ["راجع مجموعات الصلاحيات العالية", "فعّل SMB Signing ومجموعة Protected Users", "وثّق مسارات المخاطر قبل وبعد التقوية"] },
      homework: "اكتب دليلاً مختصراً للتعاون بين الفريق الأحمر والأزرق (Purple Team) لرصد هجمات Active Directory.",
      summary: "تأمين Active Directory يقوم على إزالة المسارات المفرطة في الصلاحيات وتطبيق العزل الطبقي والرصد المستمر.",
      references: ["Microsoft Active Directory Security Best Practices", "MITRE ATT&CK — Credential Access & Lateral Movement"]
    }),

    createStandardLesson({
      id: "A1_L4_S4",
      titleAr: "المرحلة 4 (Expert): عمليات الفريق الأحمر والهندسة العكسية ومشروع التخرج",
      titleEn: "Stage 4: Red Team Operations, Purple Teaming, Reverse Engineering & Capstone",
      description: "تخطيط حملات محاكاة الخصوم (Adversary Emulation)، التعاون البنّاء مع الفريق الأزرق، ومفاهيم التحليل الثنائي في مختبرات معزولة.",
      whyStudy: "مستوى الخبير لا يُقاس بحفظ أوامر، بل بالقدرة على تصميم سيناريوهات تحاكي تهديدات واقعية، وقياس فجوات الكشف، وتحليل البرامج الثنائية لفهم سلوكها بعمق.",
      prerequisites: ["L1_M1", "A1_L2_S2", "A1_L3_S3"],
      objectives: [
        "بناء خطة محاكاة خصم (Adversary Emulation Plan) مرتبطة بـ MITRE ATT&CK",
        "التحليل الثابت لملفات ELF/PE وفهم بنية الدوال في Ghidra",
        "إدارة تمرين Purple Team لقياس تحسين تغطية الكشف لدى SOC"
      ],
      theory: "في عمليات Red Team على مستوى الخبير، تبدأ كل حملة بـ Threat Intelligence لتحديد خصم واقعي يستهدف قطاع المؤسسة، ثم تصميم خطة محاكاة آمنة بموافقة قيادة الأمن، مع الحفاظ على السجلات الدقيقة لكل خطوة (Action Logs) لتسهيل المراجعة المشتركة مع الفريق الأزرق (Purple Team Deconfliction & Lessons Learned). وفي المسار التقني المتقدم، يدرس الباحث تحليل الملفات التنفيذية (PE/ELF) باستخدام أدوات التفكيك مثل Ghidra وفهم آليات حماية الذاكرة (ASLR, DEP/NX, Stack Canaries) واختبار البرمجيات عبر Fuzzing لاكتشاف العيوب وإصلاحها.",
      realWorldExamples: [
        "تحويل نتائج حملة Red Team إلى 15 قاعدة كشف جديدة في SIEM ورفع نسبة الرصد من 30% إلى 85%."
      ],
      diagramAscii: "[Threat Intel] -> [Emulation Plan (ATT&CK)] -> [Controlled Execution] -> [Purple Team Review] -> [New SIEM Detections]",
      practicalExamples: ["تحليل برنامج C بسيط قمت بكتابته وتجميعه محلياً باستخدام Ghidra لفهم الفرق بين الكود المصدري والـ Assembly."],
      commands: [
        { cmd: "file ./my_sample_bin && checksec --file=./my_sample_bin", explain: "فحص نوع الملف التنفيذي وحمايات الذاكرة المفعلة فيه (NX, PIE, Canary, RELRO)." }
      ],
      commonMistakes: ["التعامل مع Red Team كمسابقة للفوز على الفريق الأزرق بدلاً من العمل كفريق واحد لرفع مناعة المؤسسة."],
      exercises: ["اكتب برنامج C بسيطاً، اجمعه محلياً، وافحص الحمايات المفعلة فيه وافتحه في Ghidra."],
      quiz: [
        {
          q: "ما المقياس الحقيقي لنجاح عملية Red Team احترافية؟",
          options: ["عدد الأجهزة التي توقفت عن العمل", "مقدار التحسن القابل للقياس في قدرات الكشف والاستجابة والضوابط لدى المؤسسة بعد التمرين", "إخفاء التقرير عن الفريق الأزرق", "استخدام أكبر عدد من الأدوات"],
          answerIdx: 1,
          explain: "الهدف النهائي لـ Red Teaming هو اختبار ورفع كفاءة الدفاع المؤسسي بشكل ملموس."
        }
      ],
      lab: { title: "Capstone Lab — تمرين Purple Team + تحليل ثنائي معزول", environment: "مختبر مؤسسي معزول بالكامل", steps: ["صمّم خطة محاكاة لـ 4 تقنيات ATT&CK", "نفّذ الاختبار داخل المختبر المعزول ووثّق كل أثر في السجلات", "سلّم التقرير التنفيذي وخطة التحسين لمشروع التخرج"] },
      homework: "أضف مشروع تخرج Academy 1 إلى باني الـ Portfolio واكتب مراجعة معمارية لنتائجه.",
      summary: "مستوى الخبير في الأمن الهجومي يجمع بين العمق الهندسي والقيادة المنهجية وتحويل الاختبار إلى دفاع أقوى.",
      references: ["MITRE Engenuity — Adversary Emulation Plans", "Ghidra Official Documentation"]
    })
  ],

  /* ===================== ACADEMY 2 — BLUE TEAM & DEFENSIVE SECURITY ===================== */
  ACAD_02: [
    createStandardLesson({
      id: "A2_L1_S1",
      titleAr: "المرحلة 1 (Beginner): عمليات SOC Tier 1 وفرز التنبيهات وتحليل السجلات",
      titleEn: "Stage 1: SOC Operations, Alert Triage & Multi-Source Log Analysis",
      description: "كيف يعمل مركز العمليات الأمنية (SOC L1/L2/L3)، وكيف تفرق بين True Positive و False Positive.",
      whyStudy: "أكثر من 70% من وظائف الدخول الأولى للأمن السيبراني هي محلل SOC Tier 1؛ والنجاح فيها يعتمد على دقة التحقيق في السجلات وسرعة اتخاذ القرار الصحيح.",
      prerequisites: ["L1_M2", "L1_M3", "L2_M2", "L2_M5"],
      objectives: [
        "فهم أدوار مستويات SOC الثلاثة ومؤشرات الأداء (MTTD و MTTR)",
        "تنفيذ منهجية Alert Triage لفرز التنبيهات دون إرهاق (Alert Fatigue)",
        "ربط سجلات Windows (4624/4625/4688/7045) بسجلات الشبكة و DNS و Proxy"
      ],
      theory: "يتلقى محلل SOC Tier 1 تنبيهات من نظام SIEM و EDR. مهمته ليست إغلاق التنبيهات بسرعة، بل التحقيق المنظم: من المستخدم؟ ما الجهاز؟ ما العملية الأم (Parent Process) التي أطلقت العملية؟ هل الاتصال الشبكي طبيعي؟ بعدها يُصنّف التنبيه إلى: True Positive (تهديد حقيقي يُصعَّد فوراً لـ Tier 2/IR مع سياق كامل)، أو Benign True Positive (نشاط مصرح به مثل اختبار فريق IT)، أو False Positive (إنذار كاذب يحتاج ضبطاً لقواعد الكشف).",
      realWorldExamples: [
        "ظهور عملية cmd.exe أو powershell.exe كعملية فرعية لـ WINWORD.EXE (مايكروسوفت وورد) هو مؤشر عالي الخطورة على مستند تصيد خبيث."
      ],
      diagramAscii: "[Alert in SIEM] -> [1. Context Check (User/Host/Time)] -> [2. Process Tree & Network Logs]\n   ├── True Positive  -> Escalate to Tier 2 + Contain Host\n   └── False Positive -> Document Evidence + Request Rule Tuning",
      practicalExamples: ["تحليل تذكرة تنبيه دخول غير معتاد وربط وقتها بسجلات VPN و DNS."],
      commands: [
        { cmd: "Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4688} -MaxEvents 15", explain: "مراجعة أحدث 15 عملية تم إنشاؤها على Windows مع اسم العملية الأم." }
      ],
      commonMistakes: ["إغلاق تنبيه كـ False Positive فقط لأن اسم الملف يبدو مألوفاً (مثل svchost.exe) دون التحقق من مساره الصحيح (System32) وعملية تشغيله الأم."],
      exercises: ["اكتب تذكرة تصعيد (Escalation Ticket) كاملة تشمل: الملخص، الأجهزة المتأثرة، الخط الزمني، الأدلة، والتوصية الفورية."],
      quiz: [
        {
          q: "ما المصطلح الذي يقيس متوسط الوقت المستغرق منذ حدوث النشاط المشبوه حتى اكتشافه؟",
          options: ["MTTR", "MTTD (Mean Time to Detect)", "RPO", "SLA"],
          answerIdx: 1,
          explain: "MTTD هو متوسط زمن الاكتشاف، بينما MTTR هو متوسط زمن الاستجابة والاحتواء."
        }
      ],
      lab: { title: "Lab A2.1 — تحقيق SOC Tier 1 في تنبيه PowerShell مشبوه", environment: "Wazuh / LetsDefend / CyberDefenders", steps: ["افحص تفاصيل التنبيه واستخرج العملية الأم", "تحقق من الاتصالات الشبكية الخارجة", "اكتب قرار التقييم (TP/FP) مع الأدلة"] },
      homework: "احفظ أهم 10 أرقام أحداث في Windows Security و Sysmon (Event ID 1, 3, 11, 22) مع معنى كل منها.",
      summary: "محلل SOC الناجح يقرأ السياق الكامل للحدث (العملية الأم + الهوية + الشبكة) قبل إصدار حكمه.",
      references: ["NIST SP 800-92 (Guide to Computer Security Log Management)", "Microsoft Windows Security Events Reference"]
    }),

    createStandardLesson({
      id: "A2_L2_S2",
      titleAr: "المرحلة 2 (Intermediate): هندسة الـ SIEM وتحليل البريد الإلكتروني والدفاع الشبكي",
      titleEn: "Stage 2: SIEM Engineering (SPL/KQL/Wazuh), Email Security & Network Defense",
      description: "بناء خط جمع السجلات، تطبيع البيانات (Normalization)، كتابة استعلامات SPL/KQL، وتحليل رسائل التصيد SPF/DKIM/DMARC.",
      whyStudy: "نظام SIEM بدون سحب سليم للمصادر وتطبيع وضبط للتنبيهات يتحول إلى صندوق ضوضاء غير مفيد.",
      prerequisites: ["A2_L1_S1"],
      objectives: [
        "فهم معمارية SIEM: Log Collectors/Agents ➔ Parsing & Normalization ➔ Indexing ➔ Correlation",
        "كتابة استعلامات بحث عملية بلغة Splunk SPL و Microsoft Sentinel KQL",
        "فحص ترويسات البريد الإلكتروني والتحقق من SPF و DKIM و DMARC لكشف التصيد و BEC"
      ],
      theory: "لكي يربط SIEM بين سجل Firewall وسجل Windows وسجل DNS، يجب أولاً تحليلها (Parsing) وتوحيد أسماء الحقول (Normalization مثل ECS في Elastic أو CIM في Splunk). كما يُعد البريد الإلكتروني المدخل الأول لهجمات التصيد وانتحال المديرين (BEC)؛ لذا يتحقق المحلل من سجل SPF (هل الخادم المرسل مخوّل؟)، وتوقيع DKIM (هل تم تعديل الرسالة؟)، وسياسة DMARC (ماذا يفعل المستقبل عند الفشل؟).",
      realWorldExamples: [
        "استعلام KQL في Sentinel يرصد أكثر من 15 محاولة دخول فاشلة متبوعة بدخول ناجح من نفس الـ IP خلال 5 دقائق."
      ],
      diagramAscii: "[Endpoints/FW/Cloud] -> [Parser & Normalizer] -> [SIEM Index] -> [Correlation Rule] -> [SOC Dashboard]",
      practicalExamples: ["كتابة استعلام KQL و SPL لرصد محاولات Brute Force وتحليل Header رسالة تصيد تدريبية."],
      commands: [
        { cmd: "SecurityEvent | where EventID == 4625 | summarize FailedCount=count() by Account, IpAddress | where FailedCount > 10", explain: "استعلام KQL (Microsoft Sentinel) يرصد الحسابات وعناوين IP التي تجاوزت 10 محاولات دخول فاشلة." },
        { cmd: "index=windows EventCode=4625 | stats count by Account_Name, src_ip | where count > 10", explain: "نفس الاستعلام بلغة Splunk SPL." }
      ],
      commonMistakes: ["تفعيل كل قواعد التنبيه الافتراضية دون ضبط (Tuning)، مما يغرق فريق SOC بآلاف التنبيهات اليومية."],
      exercises: ["افحص ترويسة بريد إلكتروني (Show Original) واستخرج نتائج Authentication-Results لـ SPF و DKIM و DMARC."],
      quiz: [
        {
          q: "ما وظيفة بروتوكول DMARC في أمن البريد الإلكتروني؟",
          options: ["تشفير المرفقات بـ AES", "تحديد سياسة التعامل مع الرسائل التي تفشل في SPF/DKIM وتقارير الانتحال", "تسريع وصول الإيميل", "حذف الصور من الرسالة"],
          answerIdx: 1,
          explain: "DMARC يربط نتائج SPF و DKIM بسياسة واضحة (none / quarantine / reject) ويوفر تقارير لمالك النطاق."
        }
      ],
      lab: { title: "Lab A2.2 — نشر Wazuh Mini-SOC + تحليل بريد تصيد تدريبي", environment: "Docker Wazuh + Sysmon VM", steps: ["اربط جهاز Windows بـ Wazuh Agent", "أنشئ Dashboard لعرض أحداث 4625 و Sysmon Event 1", "حلل ملف بريد .eml تدريبي واستخرج الـ IOCs بأمان"] },
      homework: "اكتب 3 استعلامات بحث (بـ SPL أو KQL) لكشف: إنشاء مستخدم جديد، تعطيل جدار الحماية، وتنفيذ PowerShell مشفر.",
      summary: "قوة الـ SIEM في جودة المصادر والتطبيع والضبط المستمر، وليس في حجم البيانات المخزنة فقط.",
      references: ["Wazuh Official Docs", "Microsoft Sentinel KQL Reference", "RFC 7489 (DMARC)"]
    }),

    createStandardLesson({
      id: "A2_L3_S3",
      titleAr: "المرحلة 3 (Advanced): هندسة الكشف (Sigma & YARA) وصيد التهديدات",
      titleEn: "Stage 3: Detection Engineering (Detection-as-Code) & Threat Hunting",
      description: "كتابة قواعد كشف قياسية محايدة للمزود بـ Sigma و YARA، وتنفيذ صيد التهديدات القائم على الفرضيات.",
      whyStudy: "الدفاع التفاعلي ينتظر التنبيه، أما هندسة الكشف وصيد التهديدات فيصنعان الرادارات التي تلتقط المهاجمين المتقدمين قبل حدوث الضرر.",
      prerequisites: ["A2_L2_S2"],
      objectives: [
        "كتابة قاعدة Sigma متكاملة بربط MITRE ATT&CK وتحويلها إلى KQL/SPL",
        "كتابة قاعدة YARA لفحص خصائص وسلاسل الملفات الثنائية داخل Sandbox",
        "تنفيذ دورة Threat Hunting قائمة على فرضية (Hypothesis-Driven Hunting)"
      ],
      theory: "هندسة الكشف ككود (Detection-as-Code) تعامل قواعد الكشف مثل البرمجيات: تُحفظ في Git، تُراجع بـ Pull Request، وتُختبر آلياً ضد هجمات محاكاة لضمان التقاط التهديد مع أقل نسبة إنذارات كاذبة. تُكتب القواعد بصيغة Sigma القياسية (YAML) ثم تُترجم لأي SIEM. أما صيد التهديدات (Threat Hunting) فهو بحث بشري استباقي يفترض وجود مهاجم تجاوز التنبيهات، فيضع الصياد فرضية مبنية على Threat Intelligence (مثلاً: مهاجم يستخدم Scheduled Tasks للبقاء) ويفتش السجلات لإثباتها أو نفيها، ثم يحوّل النتيجة إلى قاعدة كشف دائمة.",
      realWorldExamples: [
        "قاعدة Sigma ترصد تشغيل PowerShell بمعاملات -EncodedCommand أو -WindowStyle Hidden."
      ],
      diagramAscii: "[Threat Intel Hypothesis] -> [Proactive Hunt in Telemetry] -> [Findings]\n                                                                  |\n                                      [Detection-as-Code (Sigma/YARA) in Git CI/CD]",
      practicalExamples: ["كتابة قاعدة Sigma بـ YAML لـ Sysmon Event ID 1."],
      commands: [
        { cmd: "title: Suspicious Encoded PowerShell\nlogsource: { category: process_creation, product: windows }\ndetection:\n  selection: { Image|endswith: 'powershell.exe', CommandLine|contains: '-enc' }\n  condition: selection\nlevel: high", explain: "نموذج قاعدة Sigma قياسية قابلة للتحويل إلى Splunk و Sentinel و Elastic." }
      ],
      commonMistakes: ["كتابة قواعد كشف تعتمد فقط على قيمة Hash ثابتة للملف (تتغير بتعديل بايت واحد) بدلاً من رصد السلوك (TTP)."],
      exercises: ["اكتب قاعدة YARA بسيطة ترصد ملفاً نصياً تدريبياً يحتوي على كلمتين محددتين وحجمه أقل من 50KB."],
      quiz: [
        {
          q: "ما الميزة الكبرى لصيغة Sigma في هندسة الكشف؟",
          options: ["تعمل على Splunk فقط", "صيغة قياسية محايدة يمكن تحويلها لقواعد تعمل على أغلب أنظمة SIEM المختلفة", "تحل محل جدار الحماية", "تشفر القرص الصلب"],
          answerIdx: 1,
          explain: "Sigma هي لغة كشف موحدة للسجلات يمكن ترجمتها تلقائياً لـ SPL و KQL و Elastic و Wazuh."
        }
      ],
      lab: { title: "Lab A2.3 — كتابة واختبار قاعدة Sigma وقاعدة YARA", environment: "مختبر معزول + Sigma CLI / YARA", steps: ["اكتب قاعدة Sigma لرصد إنشاء خدمة جديدة مشبوهة", "اختبر قاعدة YARA على ملف تدريبي آمن", "أضف التغطية لخريطة ATT&CK"] },
      homework: "صمّم فرضية Threat Hunting واحدة مبنية على تقنية T1053 (Scheduled Task) واكتب خطوات البحث عنها.",
      summary: "ارصد السلوكيات (TTPs) وليس القيم المتغيرة (Hashes/IPs) فقط؛ هذا هو سر Detection Engineering الناجح.",
      references: ["SigmaHQ Official Specification", "YARA Documentation", "David Bianco — Pyramid of Pain"]
    }),

    createStandardLesson({
      id: "A2_L4_S4",
      titleAr: "المرحلة 4 (Expert): الاستجابة للحوادث (NIST 800-61) والتحليل الجنائي للذاكرة",
      titleEn: "Stage 4: Incident Response Lifecycle, Memory Forensics & Threat Intel",
      description: "قيادة الاستجابة لحادثة كبرى، العزل والاحتواء دون تدمير الأدلة، وتحليل الذاكرة بـ Volatility 3.",
      whyStudy: "عند وقوع حادثة اختراق حقيقية، القرار المتسرع (مثل إطفاء الجهاز أو عمل Format فوراً) يدمّر الأدلة في الذاكرة ويسمح للمهاجم بالعودة من باب خلفي لم يُكتشف.",
      prerequisites: ["L1_M1", "A2_L3_S3"],
      objectives: [
        "إدارة دورة الاستجابة للحوادث وفق NIST SP 800-61 (Preparation -> Detection/Analysis -> Containment/Eradication/Recovery -> Post-Incident)",
        "تطبيق ترتيب التطاير (Order of Volatility) وحفظ Chain of Custody عند جمع الأدلة",
        "تحليل صورة ذاكرة تدريبية بـ Volatility 3 لاستخراج العمليات والاتصالات المخفية"
      ],
      theory: "يبدأ المحقق الخبير دائماً بالتحضير المسبق (Playbooks وصلاحيات عزل جاهزة). عند اكتشاف حادثة، تكون الأولوية للاحتواء السريع الآمن (عزل الجهاز عن الشبكة مع إبقائه يعمل لحفظ الذاكرة العشوائية RAM)، ثم جمع الأدلة وفق ترتيب التطاير (الذاكرة RAM والاتصالات النشطة أولاً، ثم القرص، ثم السجلات البعيدة) مع توثيق البصمة SHA-256 وسلسلة الحيازة (Chain of Custody). وبعد الاستئصال والتعافي، تُعقد جلسة الدروس المستفادة (Post-Incident Review) لسد السبب الجذري ومنع التكرار.",
      realWorldExamples: [
        "تحليل صورة RAM باستخدام Volatility 3 بأمر windows.pstree و windows.netscan يكشف برمجية خبيثة تعمل داخل الذاكرة فقط (Fileless Malware) لا وجود لها على القرص."
      ],
      diagramAscii: "[Prepare] -> [Detect & Triage] -> [Contain (Isolate, Don't Power Off!)]\n    -> [Acquire RAM + Disk (SHA-256)] -> [Eradicate & Recover] -> [Lessons Learned]",
      practicalExamples: ["فحص شجرة العمليات والاتصالات في صورة ذاكرة تدريبية باستخدام Volatility 3."],
      commands: [
        { cmd: "vol -f memory_sample.raw windows.pstree", explain: "عرض شجرة العمليات (الأم والفرعية) من داخل صورة الذاكرة العشوائية." },
        { cmd: "vol -f memory_sample.raw windows.netscan", explain: "استخراج الاتصالات الشبكية والمنافذ التي كانت مفتوحة لحظة التقاط الذاكرة." }
      ],
      commonMistakes: ["إطفاء الخادم المخترق مباشرة عند الذعر مما يمسح كل أدلة الذاكرة العشوائية والاتصالات النشطة."],
      exercises: ["رتّب الأدلة التالية حسب ترتيب التطاير (من الأسرع فقداً للأبطأ): القرص الصلب، الذاكرة RAM، النسخ الاحتياطي، سجلات الـ CPU Cache."],
      quiz: [
        {
          q: "لماذا يُفضل عزل الجهاز المخترق عن الشبكة (Network Isolation) بدلاً من فصل الكهرباء عنه فوراً؟",
          options: ["لتوفير الكهرباء", "لمنع انتشار المهاجم مع الحفاظ على الأدلة المتطايرة داخل الذاكرة RAM للتحقيق الجنائي", "لتسريع تنزيل التحديثات", "لإعادة تشغيل النظام"],
          answerIdx: 1,
          explain: "العزل الشبكي يوقف المهاجم ويحفظ الذاكرة العشوائية التي تحتوي مفاتيح وعمليات مخفية."
        }
      ],
      lab: { title: "Capstone Lab — تحقيق حادثة كاملة + Playbook استجابة", environment: "مختبر DFIR معزول + Volatility 3 + Wazuh", steps: ["التقط أو حمّل صورة ذاكرة تدريبية قانونية (مثل تحديات CyberDefenders)", "استخرج العملية الخبيثة والـ IP الخارجي", "اكتب تقرير تحقيق جنائي و Playbook استجابة كامل"] },
      homework: "أضف تقرير الحادثة والـ Mini SOC إلى ملف أعمالك (Portfolio) وشارك خلاصته مع ALEX لمراجعته.",
      summary: "الاستجابة الهادئة المنظمة المبنية على الأدلة هي التي تحمي المؤسسة وتمنع عودة المهاجم.",
      references: ["NIST SP 800-61 (Incident Handling Guide)", "Volatility 3 Official Documentation", "SANS Incident Handler's Handbook"]
    })
  ]
};
