/**
 * MY LIFE OS — CYBERSECURITY UNIVERSITY
 * Data Layer 3: Phase 5 Career Paths, Certifications Center, Practical Labs & Roadmap Builder
 */

export const CAREER_PATHS = [
  /* Defensive */
  {
    id: "CAR_SOC1",
    group: "Defensive Careers",
    title: "SOC Analyst (L1 -> L2 -> L3)",
    niceRole: "Cyber Defense Analyst (NIST NICE)",
    description: "رصد وتحليل التنبيهات الأمنية على مدار الساعة، التحقيق في الأنشطة المشبوهة، وتصعيد الحوادث الحقيقية لفرق الاستجابة.",
    requiredModules: ["L0_M1", "L0_M2", "L0_M3", "L0_M4", "L1_M2", "L1_M3", "L1_M6", "L2_M1", "L2_M2", "L2_M5"],
    requiredAcademies: ["ACAD_02"],
    optionalAcademies: ["ACAD_07", "ACAD_08"],
    deferrableTopics: ["Exploit Development", "Hardware/Firmware Reverse Engineering", "Kernel Exploitation"],
    tools: ["Wazuh", "Splunk / Sentinel / Elastic", "Wireshark", "Sysmon", "MITRE ATT&CK"],
    portfolio: ["بناء Mini SOC منزلي بـ Wazuh", "تحليل ملف PCAP كامل وتوثيق الحادثة", "كتابة 5 قواعد كشف Sigma"],
    certs: ["CompTIA Security+", "BTL1", "SC-200", "LetsDefend / CyberDefenders Labs"],
    interviewTopics: ["TCP 3-Way Handshake", "Windows Event IDs (4624, 4625, 4688, 7045)", "False Positive vs True Positive", "Phishing Header Analysis (SPF/DKIM/DMARC)"],
    sampleTasks: ["فرز 30 تنبيه SIEM يومياً", "فحص مرفق تصيد في Sandbox", "كتابة تذكرة تصعيد منظمة لـ Tier 2"],
    readinessCheck: "القدرة على تحليل حادثة Endpoint + Network كاملة وكتابة تقرير Incident Triage واضح خلال 45 دقيقة."
  },
  {
    id: "CAR_PENTEST",
    group: "Offensive Careers",
    title: "Penetration Tester (Junior -> Web/API/Network -> Red Team)",
    niceRole: "Exploitation Analyst / Vulnerability Assessment Analyst",
    description: "اختبار الأنظمة والشبكات وتطبيقات الويب بتفويض قانوني لاكتشاف الثغرات قبل المهاجمين وتقديم حلول إصلاح عملية.",
    requiredModules: ["L0_M1", "L0_M2", "L0_M3", "L0_M4", "L1_M1", "L1_M2", "L1_M3", "L1_M4", "L1_M5", "L1_M6", "L2_M1", "L2_M3", "L2_M4", "L2_M5", "L2_M6"],
    requiredAcademies: ["ACAD_01"],
    optionalAcademies: ["ACAD_03", "ACAD_04"],
    deferrableTopics: ["ISO 27001 Auditing", "OT/SCADA Protocols", "BCP/DRP"],
    tools: ["Nmap", "Burp Suite", "OWASP ZAP", "Python", "BloodHound", "Wireshark"],
    portfolio: ["تقرير اختبار اختراق احترافي لبيئة معزولة", "حل مسارات PortSwigger Web Academy", "أداة أتمتة Recon بلغة Python"],
    certs: ["eJPT", "PNPT", "CPTS", "OSCP"],
    interviewTopics: ["OWASP Top 10:2025", "Authentication vs Authorization (IDOR/BOLA)", "Kerberos Authentication Flow", "How to scope & write an Executive Summary"],
    sampleTasks: ["رسم سطح الهجوم لتطبيق ويب", "التحقق من ثغرة Business Logic", "إعادة الاختبار (Retesting) بعد إصلاح المطورين"],
    readinessCheck: "تنفيذ اختبار كامل لبيئة مختبر متعددة الأجهزة + تسليم تقرير Pentest احترافي يشمل المخاطر وخطوات الإصلاح."
  },
  {
    id: "CAR_CLOUD",
    group: "Engineering Careers",
    title: "Cloud Security Engineer",
    niceRole: "Cloud Security Architect / Engineer",
    description: "تأمين البنية التحتية السحابية (AWS/Azure/GCP) والحاويات وKubernetes وأتمتة الامتثال الأمني عبر Infrastructure as Code.",
    requiredModules: ["L0_M1", "L0_M2", "L1_M2", "L1_M3", "L1_M4", "L1_M6", "L2_M1", "L2_M3", "L2_M4"],
    requiredAcademies: ["ACAD_04", "ACAD_05"],
    optionalAcademies: ["ACAD_03", "ACAD_09"],
    deferrableTopics: ["Malware Reverse Engineering", "Wireless WPA3 Auditing", "Disk Forensics"],
    tools: ["AWS/Azure/GCP IAM", "Terraform", "Docker", "Kubernetes", "Falco", "OPA/Kyverno"],
    portfolio: ["Cloud Security Baseline بـ Terraform", "تأمين عنقود Kubernetes بـ Network Policies", "بناء لوحة تنبيهات GuardDuty/Sentinel"],
    certs: ["AWS Certified Security Specialty", "AZ-500", "CKS"],
    interviewTopics: ["Shared Responsibility Model", "Least Privilege IAM Policies", "Container Isolation (Namespaces/Cgroups)", "Securing Secrets in CI/CD"],
    sampleTasks: ["مراجعة صلاحيات S3/Storage", "تطبيق سياسات SCP/Azure Policy", "إغلاق مسار تعرض عام على Kubernetes"],
    readinessCheck: "نشر بنية سحابية آمنة بالكود (IaC) واجتياز فحص CIS Benchmark بنسبة تتجاوز 90%."
  },
  {
    id: "CAR_APPSEC",
    group: "Engineering Careers",
    title: "Application Security & DevSecOps Engineer",
    niceRole: "Secure Software Assessor / DevSecOps Specialist",
    description: "تأمين الكود المصدري وتصميم البرمجيات الآمنة وبناء بوابات فحص تلقائية في CI/CD لمنع الثغرات قبل الوصول للإنتاج.",
    requiredModules: ["L0_M1", "L0_M2", "L1_M4", "L1_M5", "L1_M6", "L2_M1", "L2_M3", "L2_M4"],
    requiredAcademies: ["ACAD_03"],
    optionalAcademies: ["ACAD_01", "ACAD_04"],
    deferrableTopics: ["OSPF/BGP Dynamic Routing", "Mobile Telecom SS7", "Physical Disk Imaging"],
    tools: ["Semgrep", "SonarQube", "Trivy", "GitHub Actions", "OWASP ASVS", "Burp Suite"],
    portfolio: ["خط CI/CD متكامل بفحوصات SAST/SCA/SBOM", "تقرير مراجعة كود وإصلاح ثغرات لتطبيق ويب", "نموذج Threat Model كامل (STRIDE)"],
    certs: ["CSSLP", "Burp Suite Certified Practitioner", "GWAPT"],
    interviewTopics: ["STRIDE Threat Modeling", "Parameterized Queries & Output Encoding", "Supply Chain & SBOM", "Reducing SAST False Positives"],
    sampleTasks: ["مراجعة Pull Request أمنياً", "إعداد Secret Scanning في GitHub", "تصميم معايير Secure Coding للفريق"],
    readinessCheck: "إنشاء Pipeline آمن ومراجعة تطبيق كامل وفق OWASP ASVS Level 2."
  },
  {
    id: "CAR_GRC",
    group: "Governance Careers",
    title: "GRC Analyst / IT Auditor / Risk Specialist",
    niceRole: "Security Control Assessor / Risk Manager",
    description: "إدارة المخاطر السيبرانية، بناء السياسات والضوابط، قيادة الامتثال للمعايير العالمية، ومراجعة جاهزية استمرارية الأعمال.",
    requiredModules: ["L0_M1", "L0_M2", "L0_M3", "L2_M1", "L2_M2", "L2_M4", "L2_M6"],
    requiredAcademies: ["ACAD_06"],
    optionalAcademies: ["ACAD_09", "ACAD_10"],
    deferrableTopics: ["Assembly & Exploit Development", "Kernel Debugging", "Packet Dissection"],
    tools: ["Risk Register", "ISO 27001 Control Matrix", "NIST CSF 2.0 Profiles", "Audit Evidence Trackers"],
    portfolio: ["سجل مخاطر مؤسسي متكامل", "تحليل فجوات ISO 27001", "حزمة سياسات أمنية وخطة BCP/DRP"],
    certs: ["ISO 27001 Foundation / LI / LA", "ISC2 CC", "CISA", "CRISC"],
    interviewTopics: ["Risk Treatment Options (Mitigate/Transfer/Accept/Avoid)", "RTO vs RPO", "ISO 27001 Annex A", "Third-Party Risk Assessment"],
    sampleTasks: ["تقييم مخاطر مورد سحابي جديد", "جمع أدلة تدقيق لضوابط التحكم بالوصول", "تحديث سياسة الاستجابة للحوادث"],
    readinessCheck: "إعداد ملف تدقيق داخلي وتحليل فجوات وخطة معالجة مخاطر كاملة لشركة افتراضية."
  },
  {
    id: "CAR_RESEARCH",
    group: "Specialized Careers",
    title: "Security Researcher / AI & DFIR Specialist",
    niceRole: "Cybersecurity Research Scientist",
    description: "البحث العميق في الثغرات الجديدة، أمن الذكاء الاصطناعي (LLMs/RAG)، التحليل الجنائي المتقدم، وتطوير أدوات ومنهجيات جديدة.",
    requiredModules: ["L0_M1", "L0_M4", "L1_M1", "L1_M2", "L1_M4", "L1_M5", "L2_M1", "L2_M3", "L2_M6"],
    requiredAcademies: ["ACAD_14", "ACAD_15"],
    optionalAcademies: ["ACAD_07", "ACAD_12"],
    deferrableTopics: ["Corporate PCI-DSS Paperwork"],
    tools: ["Ghidra", "GDB", "AFL++", "Python", "PyRIT / Garak", "Volatility 3"],
    portfolio: ["ورقة بحثية أو تحليل ثغرة منشورة بشكل مسؤول", "أداة Fuzzing أو فحص أمني لـ RAG/LLM مفتوحة المصدر"],
    certs: ["OSED", "GREM", "منشورات بحثية ومساهمات Open Source"],
    interviewTopics: ["Memory Safety Mitigations (ASLR/DEP/Canaries)", "Indirect Prompt Injection in RAG", "Coordinated Vulnerability Disclosure"],
    sampleTasks: ["تحليل سلوك برنامج ثنائي", "تقييم أمان وكيل ذكاء اصطناعي متصل بأدوات", "كتابة إثبات مفهوم آمن (PoC) داخل مختبر معزول"],
    readinessCheck: "تقديم مشروع بحثي أصلي أو أداة أمنية موثقة مع مراجعة معمارية ومخاطر."
  }
];

/**
 * Certifications Center — بدون أسعار قديمة أو وعود مضللة؛ التوجيه الدائم للجهة المانحة الرسمية
 */
export const CERTIFICATIONS_DB = [
  { group: "Beginner / Foundation", name: "CompTIA Tech+ / A+", vendor: "CompTIA", level: "Beginner", prereq: "لا توجد", format: "اختيار من متعدد + أداء عملي", renewal: "3 سنوات (CEUs)", official: "https://www.comptia.org", fit: "ممتاز لتثبيت أساسيات العتاد والدعم الفني", lowCostAlt: "مناهج Level 0 و 1 + Cisco Skills for All (مجاني)" },
  { group: "Beginner / Foundation", name: "Cisco CCST / CCNA", vendor: "Cisco", level: "Foundation", prereq: "أساسيات الحاسوب", format: "أسئلة نظرية ومحاكاة شبكات", renewal: "3 سنوات (CCNA)", official: "https://www.cisco.com/site/us/en/learn/training-certifications/", fit: "أساسي جداً لفهم الشبكات والتوجيه", lowCostAlt: "مختبرات Packet Tracer + CompTIA Network+" },
  { group: "Security Foundations", name: "CompTIA Security+", vendor: "CompTIA", level: "Foundation", prereq: "أساسيات شبكات وأنظمة", format: "اختيار من متعدد + PBQs", renewal: "3 سنوات", official: "https://www.comptia.org/certifications/security", fit: "شهادة تأسيسية واسعة الانتشار لكنها ليست شرطاً إجبارياً لكل تخصص", lowCostAlt: "ISC2 Certified in Cybersecurity (CC) / Google Cybersecurity Certificate" },
  { group: "Offensive", name: "eJPT / PNPT / CPTS", vendor: "INE / TCM Security / Hack The Box", level: "Junior - Intermediate", prereq: "شبكات + Linux + ويب + AD", format: "اختبار عملي 100% + تقرير فني (PNPT/CPTS)", renewal: "تختلف حسب الجهة المانحة (تحقق رسمياً)", official: "https://academy.hackthebox.com", fit: "أقوى إعداد عملي لوظائف Junior Pentester", lowCostAlt: "مسارات PortSwigger Web Security Academy (مجانية بالكامل)" },
  { group: "Offensive", name: "OSCP / OSWE / OSEP / CRTO", vendor: "OffSec / Zero-Point Security", level: "Advanced", prereq: "خبرة عملية قوية في المختبرات", format: "اختبار اختراق عملي مباشر (24-48 ساعة) + تقرير", renewal: "تحقق من سياسة الجهة المانحة الرسمية", official: "https://www.offsec.com", fit: "مخصصة لمسار Red Team وPentesting وليست مطلوبة لـ GRC أو SOC", lowCostAlt: "CPTS / PNPT لتقليل التكلفة مع عمق تقني عالٍ" },
  { group: "Defensive", name: "BTL1 / BTL2 / SC-200", vendor: "Security Blue Team / Microsoft", level: "Junior - Intermediate", prereq: "أساسيات SOC وLogs", format: "تحقيق عملي في حادثة (BTL) / اختبار تقني (SC-200)", renewal: "تحقق من الموقع الرسمي للجهة", official: "https://www.securityblue.team", fit: "مباشرة لوظائف SOC Analyst وIncident Responder", lowCostAlt: "CyberDefenders Free Challenges + LetsDefend" },
  { group: "Defensive", name: "GIAC (GCIH / GCIA / GCFA / GREM)", vendor: "GIAC / SANS", level: "Advanced - Expert", prereq: "خبرة عملية متقدمة", format: "اختبار مفتوح الكتاب + أسئلة تطبيقية CyberLive", renewal: "4 سنوات (CPEs)", official: "https://www.giac.org", fit: "مرجعية عالية جداً في DFIR وتحليل البرمجيات الخبيثة (غالباً بتمويل شركات)", lowCostAlt: "BTL2 / CCD / Splunk & Elastic Training" },
  { group: "Cloud", name: "AWS Security Specialty / AZ-500 / GCP Sec / CKS", vendor: "AWS / Microsoft / Google / CNCF", level: "Intermediate - Advanced", prereq: "إدارة السحابة أو CKA (لـ CKS)", format: "اختبار سيناريوهات أو عملي مباشر (CKS)", renewal: "2 - 3 سنوات حسب المزود", official: "https://www.cncf.io/certification/cks/", fit: "أساسية لمهندسي أمن السحابة وKubernetes", lowCostAlt: "مختبرات Terraform/Docker المحلية + الوثائق الرسمية" },
  { group: "Governance", name: "ISO 27001 (Foundation / LI / LA) / CISA / CISM / CISSP / CRISC", vendor: "PECB / ISACA / ISC2", level: "Foundation - Expert", prereq: "CISA/CISM/CISSP تتطلب سنوات خبرة موثقة", format: "اختبارات قياسية معتمدة", renewal: "3 سنوات + CPEs", official: "https://www.isaca.org", fit: "مخصصة لمسارات التدقيق والحوكمة والإدارة الأمنية", lowCostAlt: "دراسة NIST CSF 2.0 وISO 27001 وبناء مشاريع GRC عملية" },
  { group: "Application Security", name: "Burp Suite Certified Practitioner (BSCP) / CSSLP / GWAPT", vendor: "PortSwigger / ISC2 / GIAC", level: "Intermediate - Advanced", prereq: "أمن تطبيقات الويب وSDLC", format: "اختبار عملي مباشر (BSCP) أو شامل (CSSLP)", renewal: "تحقق من الجهة المانحة", official: "https://portswigger.net/web-security/certification", fit: "مثالية لمهندسي AppSec ومختبري الويب", lowCostAlt: "إتمام جميع مختبرات PortSwigger Academy المجانية" }
];

export const PRACTICAL_LABS_ECOSYSTEM = [
  { tier: "Beginner Labs", title: "Windows & Linux Lab Setup + Permissions", env: "VirtualBox / VMware (Host-Only Network)", prereq: "L0_M1, L1_M2", objective: "تثبيت Ubuntu وWindows داخل شبكة معزولة وضبط صلاحيات chmod/chown ومراجعة Event Viewer.", evidence: "لقطات شاشة لـ chmod + مخرجات Event Viewer + تقرير الإعداد" },
  { tier: "Beginner Labs", title: "Subnetting & Wireshark Packet Analysis", env: "Cisco Packet Tracer + Wireshark", prereq: "L1_M3", objective: "تقسيم شبكة /24 إلى شبكات فرعية والتقاط تحليل TCP Handshake وDNS.", evidence: "ملف Packet Tracer + لقطة تحليل حزم Wireshark" },
  { tier: "Intermediate Labs", title: "Private Lab Network & Vulnerability Assessment", env: "مختبر محلي معزول (بدون استهداف أي IP عام)", prereq: "L2_M5, L2_M6", objective: "فحص خادم تدريبي محلي بـ Nmap وتصنيف الخدمات المفتوحة وإغلاق غير الضروري.", evidence: "تقرير فحص وتقوية (Hardening Report)" },
  { tier: "Intermediate Labs", title: "Mini SOC: Wazuh + Sysmon Alert Investigation", env: "Docker / VM Lab (Wazuh + Windows VM)", prereq: "L2_M5, ACAD_02", objective: "توجيه سجلات Sysmon إلى Wazuh والتحقيق في تنبيه تنفيذ أمر PowerShell مشبوه.", evidence: "تقرير تحقيق حادثة + قاعدة كشف مخصصة" },
  { tier: "Intermediate Labs", title: "Authorized Web Security Lab (Juice Shop / PortSwigger)", env: "OWASP Juice Shop المحلي أو PortSwigger Academy", prereq: "L1_M5, ACAD_01", objective: "فحص ثغرات التحكم بالوصول (IDOR/BOLA) والمصادقة وتوثيق الإصلاح البرمجي.", evidence: "تقرير ثغرة (Impact + PoC محلي + Remediation Code)" },
  { tier: "Advanced Labs", title: "Memory Forensics & Incident Timeline", env: "Volatility 3 داخل VM تحليل معزولة", prereq: "ACAD_07", objective: "تحليل صورة ذاكرة تدريبية واستخراج العمليات المخفية واتصالات الشبكة.", evidence: "تقرير DFIR كامل مع Timeline" },
  { tier: "Advanced Labs", title: "Secure CI/CD Pipeline & Kubernetes Hardening", env: "GitHub Actions + Kind/Minikube محلي", prereq: "ACAD_03, ACAD_04", objective: "إضافة SAST/Trivy/SBOM ومنع تشغيل حاويات بـ root داخل Kubernetes.", evidence: "ملفات YAML + لقطات فشل البناء عند وجود ثغرة" },
  { tier: "Expert Labs", title: "Purple Team Enterprise Simulation", env: "مختبر متعدد الأجهزة معزول (AD + SIEM + EDR)", prereq: "ACAD_01 أو ACAD_02", objective: "محاكاة تكتيك ATT&CK معين وبناء قاعدة الكشف المقابلة وقياس التغطية.", evidence: "تقرير Purple Team + خريطة تغطية ATT&CK Navigator" }
];

export const LEGAL_PLATFORMS = [
  { name: "PortSwigger Web Security Academy", access: "مجاني بالكامل (الاختبار الرسمي مدفوع)", focus: "أمن تطبيقات الويب وAPI" },
  { name: "OverTheWire & picoCTF", access: "مجاني بالكامل", focus: "Linux والأساسيات والبرمجة والتحديات" },
  { name: "OWASP Juice Shop & DVWA", access: "مفتوح المصدر للتشغيل المحلي المعزول", focus: "تطبيقات ويب تدريبية" },
  { name: "TryHackMe / Hack The Box Academy", access: "خطة مجانية محدودة + اشتراكات مدفوعة", focus: "مسارات تأسيسية وهجومية ودفاعية" },
  { name: "CyberDefenders / Blue Team Labs Online / LetsDefend", access: "مختبرات مجانية + اشتراك Pro", focus: "SOC وDFIR وتحليل الشبكة والبرمجيات" },
  { name: "Malware-Traffic-Analysis.net", access: "مجاني للتدريب", focus: "تحليل ملفات PCAP وحركة البرمجيات الخبيثة" }
];
