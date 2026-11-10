/**
 * ============================================================================
 * MY LIFE OS — CAREER TRACKS & INTERACTIVE NETWORK ROADMAPS ENGINE (tracks.js)
 * Complete Encyclopedia for 8 Major Tech & Engineering Domains:
 * 1. Cybersecurity (Red Team, Blue Team/SOC, Bug Bounty, CloudSec, Reverse Eng, GRC)
 * 2. Full-Stack Web Engineering (Frontend, Backend, Databases, System Design)
 * 3. AI, Machine Learning & Data Science (Math, ML, Deep Learning, LLMs, MLOps)
 * 4. Mobile App Engineering (Flutter, React Native, Native iOS/Android)
 * 5. Cloud Computing, DevOps & SRE (Linux, Docker, Kubernetes, AWS, Terraform)
 * 6. Embedded Systems, IoT & Digital Logic Design (C/C++, ARM, RTOS, FPGA/VHDL)
 * 7. Computer Science & Competitive Programming (DSA, OOP, OS, Design Patterns)
 * 8. Game Development & Graphics (Unity C#, Unreal C++, 3D Math, Shaders)
 *
 * Features:
 * - Executive Field Intro & Career Mindset
 * - Mandatory Foundations Checklist with YouTube & Lab Links
 * - Deep Sub-Role Breakdowns (Mission, Tools, Global Certifications)
 * - Interactive HTML5 Canvas Network Graph (Zoom, Pan, Drag Nodes, Filter by Role,
 *   Animated Data Pulses, Node Inspector, Mark Mastered, Convert to Task/Pomodoro)
 * ============================================================================
 */

function B() {
  return window.MyLifeOSBridge || {};
}

function esc(str) {
  if (B().escapeHTML) return B().escapeHTML(str);
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function toast(msg, type = "success") {
  if (B().showToast) B().showToast(msg, type);
}

function today() {
  return B().todayISO ? B().todayISO() : new Date().toISOString().split("T")[0];
}

/* ============================================================================
   1. AUTO-INJECT SCOPED LUXURY CSS FOR TRACKS & NETWORK GRAPH
   ============================================================================ */
function injectTracksStyles() {
  if (document.getElementById("tracks-encyclopedia-styles")) return;
  const style = document.createElement("style");
  style.id = "tracks-encyclopedia-styles";
  style.textContent = `
    .tracks-domain-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(195px, 1fr));
      gap: 10px;
      margin-bottom: 20px;
    }
    .track-domain-pill {
      background: rgba(15, 20, 34, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 14px;
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.22s ease;
      text-align: start;
      color: var(--text-primary);
      font-family: inherit;
    }
    .track-domain-pill:hover {
      border-color: var(--gold-primary);
      transform: translateY(-2px);
    }
    .track-domain-pill.active {
      background: linear-gradient(135deg, rgba(212, 167, 44, 0.22), rgba(16, 185, 129, 0.1));
      border-color: var(--gold-primary);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 18px rgba(212, 167, 44, 0.2);
    }
    .track-domain-icon {
      width: 42px;
      height: 42px;
      min-width: 42px;
      border-radius: 12px;
      background: rgba(212, 167, 44, 0.15);
      color: var(--gold-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    .track-domain-pill.active .track-domain-icon {
      background: var(--gold-primary);
      color: #05070e;
    }
    .track-hero-card {
      background: linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(9, 13, 25, 0.98));
      border: 1px solid rgba(212, 167, 44, 0.38);
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65);
    }
    .track-why-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 12px;
      margin-top: 16px;
    }
    .track-why-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-right: 3px solid var(--gold-primary);
      border-radius: 12px;
      padding: 12px 14px;
    }
    .network-graph-shell {
      position: relative;
      background: radial-gradient(circle at 50% 40%, #131c31 0%, #070a12 100%);
      border: 1.5px solid rgba(212, 167, 44, 0.4);
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 20px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75);
    }
    .network-graph-Shell-fullscreen {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 999995 !important;
      border-radius: 0 !important;
      margin: 0 !important;
    }
    .network-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      padding: 12px 18px;
      background: rgba(9, 13, 25, 0.9);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .network-canvas-viewport {
      width: 100%;
      height: 520px;
      display: block;
      cursor: grab;
    }
    .network-graph-Shell-fullscreen .network-canvas-viewport {
      height: calc(100vh - 130px) !important;
    }
    .network-canvas-viewport:active {
      cursor: grabbing;
    }
    .network-inspector-bar {
      background: rgba(15, 22, 38, 0.96);
      border-top: 1px solid rgba(212, 167, 44, 0.35);
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 14px;
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
   2. COMPREHENSIVE DATABASE OF ALL 8 CAREER TRACKS & NETWORK GRAPHS
   ============================================================================ */
const CAREER_TRACKS_DB = [
  /* --------------------------------------------------------------------------
     1. CYBERSECURITY (الأمن السيبراني — شامل كل الفرق والتخصصات والشبكة)
     -------------------------------------------------------------------------- */
  {
    id: "cybersecurity",
    name: "الأمن السيبراني (Cybersecurity)",
    shortTag: "Red / Blue / Cloud / Bug Bounty",
    icon: "fa-shield-halved",
    accent: "#EF4444",
    introTitle: "🛡️ الدليل الشامل للأمن السيبراني: من الصفر إلى الاحتراف العالمي",
    introText: "الأمن السيبراني ليس مجرد أداة اختراق، بل هو علم هندسي متكامل لحماية الأنظمة، الشبكات، الخوادم، والبيانات الحساسة من الهجمات الرقمية. لا يمكن لأي متخصص سايبر أن ينجح دون فهم عميق لكيفية عمل الشبكات وأنظمة التشغيل والبرمجة أولاً، لأنك لا تستطيع حماية (أو اختراق) نظام لا تفهم كيف بُني ويعمل من الداخل.",
    whyPoints: [
      { title: "🎯 لماذا تتعلم السايبر؟", desc: "من أعلى المجالات طلباً وأجوراً عالمياً وإقليمياً، ولا يمكن الاستغناء عنه في البنوك، الحكومات، وشركات التقنية." },
      { title: "🧱 القاعدة الذهبية للبداية", desc: "لا تبدأ بأدوات Kali Linux مباشرة! ابدأ بـ: الشبكات (CCNA/Network+) ➔ نظام Linux ➔ نظام Windows & Active Directory ➔ البرمجة (Python/Bash)." },
      { title: "⚔️ كيف تختار تخصصك؟", desc: "إذا كنت تحب الهجوم واكتشاف الثغرات اختر (Red Team / Bug Bounty)، وإذا كنت تحب التحليل الجنائي والدفاع وبناء الحصون اختر (Blue Team / SOC)." }
    ],
    foundations: [
      { id: "cy_f1", title: "1. أساسيات الشبكات (Networking — CCNA / CompTIA Network+)", desc: "فهم بروتوكولات TCP/IP, OSI Model, DNS, HTTP/S, Routing, Switching, Subnets, Firewalls, VPNs.", yt: "Eng. Ahmed Nazmy / Jeremy's IT Lab (CCNA 200-301)" },
      { id: "cy_f2", title: "2. إتقان نظام لينكس (Linux Administration & Bash)", desc: "التعامل مع الـ Terminal، الصلاحيات Permissions، العمليات Processes، الشبكات في لينكس، وكتابة Bash Scripts.", yt: "NetworkChuck (Linux for Hackers) / الدسوقي /Elzero" },
      { id: "cy_f3", title: "3. أنظمة ويندوز و Active Directory", desc: "فهم Windows Internals, Registry, PowerShell, Kerberos, NTLM, Group Policies لأن 90% من الشركات تعمل بـ AD.", yt: "The Cyber Mentor (TCM) / John Hammond" },
      { id: "cy_f4", title: "4. البرمجة للأمن السيبراني (Python, Bash, JS & SQL)", desc: "بايثون لأتمتة الأدوات واستغلال الثغرات، JavaScript و SQL لفهم ثغرات الويب XSS و SQL Injection.", yt: "Elzero Web School (Python & JS) / FreeCodeCamp" },
      { id: "cy_f5", title: "5. مبادئ الأمن السيبراني (CompTIA Security+ SY0-701)", desc: "التشفير Cryptography، إدارة الهوية IAM، تقييم المخاطر، أنواع الهجمات، وهندسة الشبكات الآمنة.", yt: "Professor Messer (Security+ SY0-701) / سايبر عرب" }
    ],
    roles: [
      {
        id: "red_team",
        title: "🔴 الفريق الأحمر واختبار الاختراق (Red Team & Penetration Testing)",
        mission: "محاكاة الهجمات الحقيقية لاختبار قوة دفاعات الشركة واكتشاف الثغرات في الشبكات والتطبيقات والـ Active Directory قبل المخترقين.",
        skills: ["Network PenTesting", "Active Directory Attacks", "Web App PenTesting (OWASP Top 10)", "Privilege Escalation", "Pivoting & Tunneling", "C2 Frameworks (Cobalt Strike / Sliver)", "AV/EDR Evasion"],
        tools: ["Nmap", "Burp Suite Pro", "Metasploit", "BloodHound", "Impacket", "NetExec (CrackMapExec)", "Hashcat", "Wireshark"],
        certs: ["eJPTv2 (مبتدئ)", "PNPT (عملي ممتاز)", "HTB CPTS (قوي جداً)", "OSCP (المعيار الذهبي)", "OSEP / OSWE (متقدم)"]
      },
      {
        id: "blue_team",
        title: "🔵 الفريق الأزرق ومركز العمليات والتحقيق الجنائي (Blue Team / SOC & DFIR)",
        mission: "مراقبة الشبكات على مدار الساعة، رصد الهجمات، تحليل السجلات (Logs)، الاستجابة للحوادث (Incident Response)، والتحقيق الجنائي الرقمي.",
        skills: ["SIEM Administration & Queries", "Log Analysis (Sysmon / Event Logs)", "Packet Analysis (PCAP)", "Digital Forensics (Memory & Disk)", "Threat Hunting", "MITRE ATT&CK Framework", "EDR/XDR Triage"],
        tools: ["Splunk", "ELK Stack", "Wazuh", "Wireshark", "Volatility (Memory)", "Autopsy", "KAPE", "Velociraptor", "YARA Rules"],
        certs: ["CompTIA Security+", "BTL1 (Blue Team Level 1)", "CompTIA CySA+", "CCD (Certified CyberDefender)", "GCIH / GCFA (SANS)"]
      },
      {
        id: "bug_bounty",
        title: "🐞 صيد الثغرات وأمن تطبيقات الويب والـ APIs (Bug Bounty & AppSec)",
        mission: "فحص المواقع والتطبيقات والـ APIs الخاصة بالشركات العالمية على منصات HackerOne و Bugcrowd واكتشاف الثغرات مقابل مكافآت مالية.",
        skills: ["OWASP Top 10 & API Top 10", "SQLi / XSS / CSRF / SSRF / IDOR", "OAuth & JWT Vulnerabilities", "Race Conditions", "Subdomain Enumeration & Recon", "Source Code Review"],
        tools: ["Burp Suite / Caido", "Subfinder & Amass", "Nuclei", "FFUF & Dirsearch", "SQLMap", "Postman", "GitDorker"],
        certs: ["PortSwigger Academy (100% Free)", "eWPT / eWPTXv2", "HTB CBBH (Bug Bounty Hunter)", "OSWE (Web Expert)"]
      },
      {
        id: "cloud_devsecops",
        title: "☁️ أمن السحابة والأتمتة الآمنة (Cloud Security & DevSecOps)",
        mission: "تأمين البنية التحتية السحابية (AWS / Azure / GCP)، حاويات Docker و Kubernetes، ودمج الفحص الأمني التلقائي داخل خطوط إنتاج البرمجيات CI/CD.",
        skills: ["IAM Least Privilege", "Container & K8s Security", "SAST / DAST / SCA Automation", "Secrets Management (Vault)", "Infrastructure as Code Security", "Cloud Compliance"],
        tools: ["Trivy", "Snyk", "SonarQube", "OWASP ZAP", "Checkov", "AWS Security Hub", "Falco", "HashiCorp Vault"],
        certs: ["AWS Security Specialty", "AZ-500 (Azure Security)", "CKS (Certified Kubernetes Security)", "CDP (Certified DevSecOps)"]
      },
      {
        id: "malware_rev",
        title: "🧬 تحليل البرمجيات الخبيثة والهندسة العكسية (Malware Analysis & RE)",
        mission: "تفكيك الفيروسات وبرامج الفدية (Ransomware) لفهم آلية عملها وكتابة بصمات الكشف عنها (IOCs & YARA) واستخراج ثغرات الـ Zero-Day.",
        skills: ["x86 / x64 / ARM Assembly", "Static & Dynamic Analysis", "Windows API Internals", "Unpacking & Deobfuscation", "Kernel Debugging", "Exploit Development"],
        tools: ["Ghidra", "IDA Pro", "x64dbg", "WinDbg", "Process Monitor (ProcMon)", "PEStudio", "Cuckoo Sandbox"],
        certs: ["GREM (SANS Reverse Engineering)", "OSED (Exploit Developer)", "Zero2Automated Course"]
      },
      {
        id: "grc",
        title: "⚖️ الحوكمة وإدارة المخاطر والامتثال (GRC & Security Management)",
        mission: "وضع السياسات الأمنية للمؤسسات، إدارة المخاطر، والتأكد من امتثال الشركة للمعايير الدولية والبنك المركزي (ISO 27001, NIST, PCI-DSS).",
        skills: ["Risk Assessment & Management", "ISO/IEC 27001 Auditing", "NIST Cybersecurity Framework", "PCI-DSS / GDPR / NCA Compliance", "Third-Party Risk", "Business Continuity"],
        tools: ["RSA Archer", "ServiceNow GRC", "OneTrust", "Drata", "Risk Register Matrix"],
        certs: ["ISO 27001 Lead Implementer/Auditor", "CRISC", "CISM", "CISSP (للخبراء)"]
      }
    ],
    resources: [
      { name: "PortSwigger Web Security Academy", type: "منصة مجانية 100% (الأفضل عالمياً في الويب)", url: "https://portswigger.net/web-security" },
      { name: "TryHackMe (مسارات Red & Blue التفاعلية)", type: "مختبرات عملية من الصفر", url: "https://tryhackme.com" },
      { name: "HackTheBox Academy & Labs", type: "مختبرات احترافية وشهادات CPTS/CBBH", url: "https://academy.hackthebox.com" },
      { name: "أكاديمية حسوب / Ebrahim Hegazy (Zigoo0)", type: "يوتيوب عربي — أمن الويب و Bug Bounty", url: "https://www.youtube.com/user/zigoo0" },
      { name: "IppSec & John Hammond & NetworkChuck", type: "يوتيوب أجنبي — حلول HTB وتحليل الهجمات", url: "https://www.youtube.com/@ippsec" }
    ],
    nodes: [
      // Tier 0: Foundations
      { id: "n_net", label: "Networking (CCNA/N+)", tier: 0, row: 0, role: "foundation", desc: "إتقان TCP/IP, DNS, HTTP, Subnets, Routing & Firewalls" },
      { id: "n_lin", label: "Linux & Bash CLI", tier: 0, row: 1, role: "foundation", desc: "إدارة نظام لينكس والصلاحيات والـ Bash Scripting" },
      { id: "n_win", label: "Windows & Active Directory", tier: 0, row: 2, role: "foundation", desc: "إتقان Windows Internals, Kerberos, PowerShell & AD" },
      { id: "n_code", label: "Python, JS & SQL", tier: 0, row: 3, role: "foundation", desc: "البرمجة لأتمتة الفحص وفهم ثغرات الويب وقواعد البيانات" },
      // Tier 1: Core Security
      { id: "n_secplus", label: "CompTIA Security+", tier: 1, row: 1.5, role: "foundation", desc: "الأساس الأمني الشامل: التشفير، الهجمات، حماية الشبكات، وإدارة الهوية" },
      // Tier 2: Branching Tracks
      { id: "n_websec", label: "Web & API Security (OWASP)", tier: 2, row: 0, role: "bug_bounty", desc: "ثغرات SQLi, XSS, IDOR, SSRF, Auth Bypass & Burp Suite" },
      { id: "n_netpen", label: "Network & AD PenTesting", tier: 2, row: 1, role: "red_team", desc: "اختبار اختراق الشبكات ورفع الصلاحيات واستغلال Active Directory" },
      { id: "n_siem", label: "SIEM & Log Analysis (SOC)", tier: 2, row: 2, role: "blue_team", desc: "مراقبة الأنظمة بـ Splunk / Wazuh وتحليل الهجمات" },
      { id: "n_cloudsec", label: "Cloud & Container Security", tier: 2, row: 3, role: "cloud_devsecops", desc: "تأمين AWS/Azure و Docker/Kubernetes وخطوط CI/CD" },
      // Tier 3: Advanced Specialization
      { id: "n_bounty", label: "Bug Bounty & Recon", tier: 3, row: 0, role: "bug_bounty", desc: "الأتمتة بـ Nuclei/Subfinder واكتشاف الثغرات على HackerOne" },
      { id: "n_redops", label: "Red Team Ops & Evasion", tier: 3, row: 1, role: "red_team", desc: "بناء C2، تخطي الـ EDR/AV، والهندسة العكسية" },
      { id: "n_dfir", label: "DFIR & Threat Hunting", tier: 3, row: 2, role: "blue_team", desc: "التحقيق الجنائي للذاكرة والقرص بـ Volatility & Velociraptor" },
      { id: "n_grc", label: "GRC (ISO 27001 / NIST)", tier: 3, row: 3, role: "grc", desc: "الحوكمة وإدارة المخاطر والامتثال المالي والدولي" },
      // Tier 4: Pro Certifications & Career
      { id: "n_oswe", label: "🏆 CBBH / OSWE", tier: 4, row: 0, role: "bug_bounty", desc: "خبير أمن تطبيقات الويب وصيد الثغرات" },
      { id: "n_oscp", label: "🏆 eJPT ➔CPTS ➔OSCP", tier: 4, row: 1, role: "red_team", desc: "الشهادات الاحترافية لاختبار الاختراق والفريق الأحمر" },
      { id: "n_btl1", label: "🏆 BTL1 ➔ CCD / GCFA", tier: 4, row: 2, role: "blue_team", desc: "الشهادات الاحترافية لمحللي SOC والتحقيق الجنائي" },
      { id: "n_cissp", label: "🏆 CKS / CISSP / CISM", tier: 4, row: 3, role: "cloud_devsecops", desc: "شهادات مهندسي أمن السحابة وقيادة الأمن السيبراني" }
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

  /* --------------------------------------------------------------------------
     2. FULL-STACK WEB DEVELOPMENT (تطوير الويب الشامل)
     -------------------------------------------------------------------------- */
  {
    id: "fullstack",
    name: "تطوير الويب الشامل (Full-Stack Web)",
    shortTag: "Frontend / Backend / System Design",
    icon: "fa-laptop-code",
    accent: "#D4A72C",
    introTitle: "🌐 هندسة وتطوير تطبيقات الويب الحديثة (Frontend, Backend & Cloud)",
    introText: "تطوير الويب هو العمود الفقري لمنصات الـ SaaS، التجارة الإلكترونية، والأنظمة الأكاديمية والمؤسسية. المهندس القوي هو من يفهم كيف يعمل المتصفح بعمق، كيف يصمم واجهات سريعة ومتجاوبة، وكيف يبني خوادم وقواعد بيانات مؤمنة تتحمل ملايين المستخدمين.",
    whyPoints: [
      { title: "🚀 أسرع طريق لبناء منتجات حقيقية", desc: "يمكنك تحويل أي فكرة إلى منصة تعمل على كل الأجهزة في العالم خلال أيام." },
      { title: "💼 فرص عمل حرة وشركات", desc: "أكبر نسبة وظائف في سوق البرمجيات المحلي والعالمي ومواقع العمل الحر." },
      { title: "🧩 تكامل مع الـ AI", desc: "كل تطبيقات الذكاء الاصطناعي الحديثة تحتاج مهندس ويب لبناء واجهاتها وربط الـ APIs الخاصة بها." }
    ],
    foundations: [
      { id: "fs_f1", title: "1. كيف يعمل الإنترنت والمتصفح (HTTP, DNS, DOM)", desc: "فهم دورة حياة الطلب Request/Response، الـ Hosting، وكيف يرسم المتصفح الصفحة.", yt: "Elzero Web School / التأسيس البرمجي" },
      { id: "fs_f2", title: "2. HTML5 الدلالية & CSS3 المتقدمة (Flexbox & Grid)", desc: "بناء هيكل متوافق مع معايير الويب، التصميم المتجاوب Responsive، والأنيميشن.", yt: "Elzero Web School / Kevin Powell" },
      { id: "fs_f3", title: "3. لغة JavaScript العميقة (ES6+, Async/Await, DOM)", desc: "إتقان Closures, Event Loop, Fetch API, Modules والتعامل مع البيانات.", yt: "Elzero JavaScript Bootcamp / Jonas Schmedtmann" },
      { id: "fs_f4", title: "4. إدارة الإصدارات بـ Git & GitHub", desc: "Branches, Pull Requests, Merge Conflicts, GitHub Actions.", yt: "Elzero Git & GitHub / غريب الشيخ" }
    ],
    roles: [
      {
        id: "frontend",
        title: "🎨 مهندس واجهات أمامية (Frontend & UI Engineer)",
        mission: "بناء واجهات المستخدم التفاعلية فائقة السرعة وإدارة الحالة (State Management) والربط مع الـ APIs.",
        skills: ["HTML5 / CSS3 / Tailwind", "JavaScript & TypeScript", "React.js / Next.js (SSR/CSR)", "State Management (Zustand/Redux)", "Web Performance & Accessibility", "Testing (Vitest/Playwright)"],
        tools: ["VS Code", "React DevTools", "Vite", "Tailwind CSS", "Figma", "Lighthouse"],
        certs: ["Meta Front-End Developer", "Frontend Masters Path", "Vercel Next.js Mastery"]
      },
      {
        id: "backend",
        title: "⚙️ مهندس خوادم وقواعد بيانات (Backend & API Engineer)",
        mission: "تصميم منطق الأعمال، بناء REST & GraphQL APIs، إدارة قواعد البيانات، التوثيق (Auth/JWT)، وتأمين الخادم.",
        skills: ["Node.js (Express/NestJS) أو .NET أو Python", "SQL (PostgreSQL/MySQL)", "NoSQL (MongoDB / Firebase / Redis)", "Authentication (OAuth2, JWT, RBAC)", "Caching & Message Queues", "Docker Basics"],
        tools: ["PostgreSQL", "Prisma / TypeORM", "Redis", "Postman", "Docker", "Nginx"],
        certs: ["Meta Back-End Developer", "AWS Certified Developer", "MongoDB Associate"]
      },
      {
        id: "fullstack_arch",
        title: "🏛️ معماري أنظمة وشامل (Full-Stack & System Architect)",
        mission: "الجمع بين الواجهة والخادم وتصميم الأنظمة الموزعة القابلة للتوسع (Scalable Distributed Systems).",
        skills: ["Next.js Full-Stack", "Microservices vs Monolith", "Load Balancing & CDNs", "CI/CD Pipelines", "WebSockets & Real-Time Sync", "Cloud Deployment"],
        tools: ["Next.js", "Firebase / Supabase", "Docker", "GitHub Actions", "Cloudflare", "Vercel / AWS"],
        certs: ["Full-Stack Open (University of Helsinki)", "AWS Solutions Architect"]
      }
    ],
    resources: [
      { name: "أكاديمية الزيرو (Elzero Web School)", type: "مسارات ويب عربية كاملة ومجانية", url: "https://elzero.org" },
      { name: "Full Stack Open (University of Helsinki)", type: "أقوى كورس جامعي مجاني لـ React & Node", url: "https://fullstackopen.com/en/" },
      { name: "The Odin Project & freeCodeCamp", type: "تطبيق عملي ومشاريع كاملة", url: "https://www.theodinproject.com" }
    ],
    nodes: [
      { id: "w_html", label: "HTML5 & CSS3 / Tailwind", tier: 0, row: 0, role: "frontend", desc: "بناء وتنسيق الواجهات المتجاوبة" },
      { id: "w_js", label: "JavaScript (ES6+ & DOM)", tier: 0, row: 1.5, role: "frontend", desc: "قلب تطوير الويب والبرمجة غير المتزامنة" },
      { id: "w_git", label: "Git & GitHub", tier: 0, row: 3, role: "fullstack_arch", desc: "إدارة الأكواد والعمل الجماعي" },
      { id: "w_ts", label: "TypeScript", tier: 1, row: 0.5, role: "frontend", desc: "كتابة كود قوي خالٍ من الأخطاء للمشاريع الكبيرة" },
      { id: "w_node", label: "Node.js / Backend Runtime", tier: 1, row: 2.5, role: "backend", desc: "بناء الخوادم والـ APIs السريعة" },
      { id: "w_react", label: "React.js & State Mgmt", tier: 2, row: 0, role: "frontend", desc: "بناء واجهات المكونات التفاعلية الحديثة" },
      { id: "w_api", label: "REST / GraphQL & Auth", tier: 2, row: 1.5, role: "backend", desc: "تصميم الـ APIs وتأمينها بـ JWT & OAuth" },
      { id: "w_db", label: "PostgreSQL & Firebase/NoSQL", tier: 2, row: 3, role: "backend", desc: "قواعد البيانات العلائقية والسحابية الفورية" },
      { id: "w_next", label: "Next.js Full-Stack", tier: 3, row: 0.5, role: "fullstack_arch", desc: "إطار العمل الشامل للـ SSR والـ APIs" },
      { id: "w_sys", label: "Redis, Docker & System Design", tier: 3, row: 2.5, role: "fullstack_arch", desc: "الكاش، الحاويات، وهندسة الأنظمة الكبرى" },
      { id: "w_pro", label: "🏆 Production SaaS Architect", tier: 4, row: 1.5, role: "fullstack_arch", desc: "إطلاق منصات كاملة مؤمنة وقابلة للتوسع" }
    ],
    edges: [
      ["w_html", "w_js"], ["w_js", "w_ts"], ["w_js", "w_node"], ["w_git", "w_node"],
      ["w_ts", "w_react"], ["w_ts", "w_api"], ["w_node", "w_api"], ["w_node", "w_db"],
      ["w_react", "w_next"], ["w_api", "w_next"], ["w_api", "w_sys"], ["w_db", "w_sys"],
      ["w_next", "w_pro"], ["w_sys", "w_pro"]
    ]
  },

  /* --------------------------------------------------------------------------
     3. AI, MACHINE LEARNING & DATA SCIENCE (الذكاء الاصطناعي وعلوم البيانات)
     -------------------------------------------------------------------------- */
  {
    id: "ai_data",
    name: "الذكاء الاصطناعي والبيانات (AI & Data)",
    shortTag: "ML / Deep Learning / LLMs / Data",
    icon: "fa-brain",
    accent: "#10B981",
    introTitle: "🤖 هندسة الذكاء الاصطناعي، تعلم الآلة، والنماذج اللغوية العملاقة (LLMs)",
    introText: "الذكاء الاصطناعي هو القوة المحركة للثورة الصناعية الحالية. ينقسم المجال بين تحليل وهندسة البيانات، وبناء وتدريب نماذج تعلم الآلة والتعلم العميق (الرؤية الحاسوبية ومعالجة اللغات)، وصولاً إلى هندسة تطبيقات الـ Generative AI و الـ RAG.",
    whyPoints: [
      { title: "🧠 المستقبل يبنى بالبيانات", desc: "الشركات تبحث عن مهندسين قادرين على تحويل البيانات الخام إلى قرارات ونماذج ذكية." },
      { title: "📐 الأساس الرياضي يصنع الفارق", desc: "فهم الجبر الخطي والاحتمالات والتفاضل يجعلك مهندس AI حقيقي وليس مجرد مستخدم للمكتبات." },
      { title: "⚡ ثورة الـ LLMs & Agents", desc: "دمج نماذج الذكاء الاصطناعي مع الأنظمة البرمجية عبر LangChain و Vector DBs هو المهارة الأكثر طلباً اليوم." }
    ],
    foundations: [
      { id: "ai_f1", title: "1. إتقان لغة Python ومكتبات البيانات (NumPy, Pandas, Matplotlib)", desc: "معالجة وتنظيف البيانات والتعامل مع المصفوفات.", yt: "Hesham Asem / Corey Schafer / Kaggle" },
      { id: "ai_f2", title: "2. الرياضيات للذكاء الاصطناعي (Linear Algebra, Calculus, Probability)", desc: "المصفوفات، المتجهات، الاشتقاق (Gradient Descent)، والإحصاء والاحتمالات.", yt: "3Blue1Brown / StatQuest / Ana Hr" },
      { id: "ai_f3", title: "3. قواعد البيانات ولغة SQL المتقدمة", desc: "استخراج وتحليل البيانات الضخمة من قواعد البيانات.", yt: "Data with Baraa / Alex The Analyst" }
    ],
    roles: [
      {
        id: "ml_eng",
        title: "🤖 مهندس تعلم الآلة والتعلم العميق (ML & Deep Learning Engineer)",
        mission: "تصميم وتدريب نماذج التنبؤ والتصنيف والشبكات العصبية العميقة للرؤية الحاسوبية ومعالجة اللغات.",
        skills: ["Supervised & Unsupervised ML", "Feature Engineering", "Neural Networks (CNN, RNN, Transformers)", "Computer Vision (YOLO/OpenCV)", "Model Evaluation & Tuning"],
        tools: ["Scikit-Learn", "PyTorch", "TensorFlow / Keras", "Jupyter", "Weights & Biases", "OpenCV"],
        certs: ["Machine Learning Specialization (Andrew Ng)", "Deep Learning Specialization", "TensorFlow Developer"]
      },
      {
        id: "llm_genai",
        title: "✨ مهندس الذكاء الاصطناعي التوليدي والـ LLMs (GenAI & AI Agents Engineer)",
        mission: "بناء أنظمة ذكية تعتمد على النماذج اللغوية، أنظمة البحث الدلالي (RAG)، وتخصيص النماذج (Fine-Tuning).",
        skills: ["Prompt Engineering", "RAG Architecture", "Vector Databases", "LLM Fine-Tuning (LoRA/QLoRA)", "AI Agents & Tool Calling"],
        tools: ["HuggingFace", "LangChain / LlamaIndex", "Pinecone / Qdrant", "Ollama", "vLLM", "OpenAI / Gemini SDK"],
        certs: ["DeepLearning.AI GenAI Courses", "HuggingFace NLP Course", "AWS Certified AI Practitioner"]
      },
      {
        id: "data_sci",
        title: "📊 عالم ومحلل بيانات (Data Scientist & BI Analyst)",
        mission: "استخلاص الرؤى الإستراتيجية من البيانات، بناء لوحات المعلومات، وإجراء التجارب الإحصائية A/B Testing.",
        skills: ["Exploratory Data Analysis (EDA)", "Statistical Modeling", "SQL & Data Warehousing", "Data Visualization", "Storytelling with Data"],
        tools: ["Python (Pandas/Seaborn)", "SQL", "Power BI / Tableau", "Apache Spark", "dbt"],
        certs: ["Google Data Analytics", "IBM Data Science Professional", "Microsoft PL-300 (Power BI)"]
      }
    ],
    resources: [
      { name: "قناة د. هشام عاصم (Hesham Asem)", type: "يوتيوب عربي — شرح شامل لـ ML & DL من الصفر", url: "https://www.youtube.com/@HeshamAsem" },
      { name: "DeepLearning.AI (Andrew Ng) & StatQuest", type: "أفضل الكورسات التأسيسية عالمياً", url: "https://www.deeplearning.ai" },
      { name: "Kaggle (مسابقات ومجموعات بيانات وكورسات مجانية)", type: "منصة تطبيق عملي", url: "https://www.kaggle.com/learn" }
    ],
    nodes: [
      { id: "a_py", label: "Python, NumPy & Pandas", tier: 0, row: 0.5, role: "data_sci", desc: "لغة البرمجة الأساسية وتحليل البيانات" },
      { id: "a_math", label: "Math (Linear Alg & Stats)", tier: 0, row: 2.5, role: "ml_eng", desc: "الجبر الخطي والتفاضل والاحتمالات" },
      { id: "a_eda", label: "SQL, EDA & PowerBI", tier: 1, row: 0, role: "data_sci", desc: "استكشاف البيانات وبناء لوحات الأعمال" },
      { id: "a_ml", label: "Classical ML (Scikit-Learn)", tier: 1, row: 2, role: "ml_eng", desc: "خوارزميات الانحدار، التصنيف، و XGBoost" },
      { id: "a_dl", label: "Deep Learning (PyTorch)", tier: 2, row: 1, role: "ml_eng", desc: "الشبكات العصبية العميقة والتدريب على GPU" },
      { id: "a_cv", label: "Computer Vision & NLP", tier: 3, row: 0.5, role: "ml_eng", desc: "الرؤية الحاسوبية ومعالجة اللغات الطبيعية" },
      { id: "a_llm", label: "Transformers, LLMs & RAG", tier: 3, row: 2.5, role: "llm_genai", desc: "النماذج اللغوية، Vector DBs، و Fine-Tuning" },
      { id: "a_mlops", label: "🏆 MLOps & AI Production", tier: 4, row: 1.5, role: "llm_genai", desc: "نشر النماذج في بيئة الإنتاج بـ Docker & FastAPI" }
    ],
    edges: [
      ["a_py", "a_eda"], ["a_py", "a_ml"], ["a_math", "a_ml"],
      ["a_eda", "a_ml"], ["a_ml", "a_dl"], ["a_dl", "a_cv"], ["a_dl", "a_llm"],
      ["a_cv", "a_mlops"], ["a_llm", "a_mlops"]
    ]
  },

  /* --------------------------------------------------------------------------
     4. MOBILE APP DEVELOPMENT (برمجة تطبيقات الموبايل)
     -------------------------------------------------------------------------- */
  {
    id: "mobile",
    name: "تطبيقات الموبايل (Mobile Dev)",
    shortTag: "Flutter / React Native / iOS / Android",
    icon: "fa-mobile-screen-button",
    accent: "#06B6D4",
    introTitle: "📱 هندسة تطبيقات الهواتف الذكية (Cross-Platform & Native)",
    introText: "تطبيقات الهواتف هي الواجهة الأقرب للمستخدم اليومي. يمكنك التخصص في بناء التطبيقات العابرة للمنصات (Cross-Platform بـ Flutter أو React Native بكود واحد يعمل على أندرويد وآيفون) أو التخصص في الأنظمة الأصلية (Native بـ Kotlin أو Swift).",
    whyPoints: [
      { title: "⚡ كود واحد لمنصتين مع Flutter", desc: "إطار عمل Flutter بلغة Dart يتيح بناء تطبيقات بسرعة 60/120 إطاراً في الثانية لأندرويد و iOS والويب." },
      { title: "🔥 تكامل سحابي فوري", desc: "ربط تطبيقات الموبايل بـ Firebase و REST APIs والتنبيهات اللحظية Push Notifications." }
    ],
    foundations: [
      { id: "mb_f1", title: "1. البرمجة كائنية التوجه (OOP) و هياكل البيانات", desc: "Classes, Inheritance, Polymorphism, Async Programming.", yt: "عبدالله منصور / وائل أبو حمزة" },
      { id: "mb_f2", title: "2. التعامل مع REST APIs و JSON و Git", desc: "إرسال واستقبال البيانات من السيرفر وحفظ الحالة محلياً.", yt: "Elzero / Tharwat Samy" }
    ],
    roles: [
      {
        id: "flutter_dev",
        title: "🦋 مهندس تطبيقات فلاتر (Flutter & Dart Engineer)",
        mission: "بناء تطبيقات أندرويد و iOS عالية الأداء بكود موحد وهندسة نظيفة Clean Architecture.",
        skills: ["Dart Language", "Flutter Widgets & Animations", "State Management (Bloc / Cubit / Riverpod)", "Clean Architecture & MVVM", "Local DB (SQLite / Hive)", "Firebase & Push Notifications"],
        tools: ["VS Code / Android Studio", "Flutter DevTools", "Postman", "Firebase Console", "Codemagic CI/CD"],
        certs: ["Google Associate Android / Flutter Path", "Tharwat Samy / Abdullah Mansour Bootcamps"]
      },
      {
        id: "native_dev",
        title: "🤖 مهندس تطبيقات أصلية (Native Android Kotlin / iOS Swift)",
        mission: "بناء تطبيقات تستغل كامل قدرات الهاردوير والنظام في أندرويد (Jetpack Compose) أو آيفون (SwiftUI).",
        skills: ["Kotlin & Coroutines / Swift", "Jetpack Compose / SwiftUI", "Dagger Hilt / Dependency Injection", "Room DB / CoreData", "App Store & Google Play Publishing"],
        tools: ["Android Studio", "Xcode", "Gradle", "Profiler", "TestFlight"],
        certs: ["Associate Android Developer", "Apple Swift Certification"]
      }
    ],
    resources: [
      { name: "عبدالله منصور & ثروت سامي & وائل أبو حمزة", type: "يوتيوب عربي — مسارات Flutter الكاملة", url: "https://www.youtube.com/@tharwatsamy" },
      { name: "Philipp Lackner & Coding in Flow", type: "يوتيوب أجنبي — Android & Kotlin", url: "https://www.youtube.com/@PhilippLackner" }
    ],
    nodes: [
      { id: "m_oop", label: "Dart / Kotlin & OOP", tier: 0, row: 1, role: "flutter_dev", desc: "إتقان لغة البرمجة والبرمجة الكائنية" },
      { id: "m_ui", label: "UI Widgets & Responsive", tier: 1, row: 0.5, role: "flutter_dev", desc: "تصميم الشاشات المتجاوبة والأنيميشن" },
      { id: "m_api", label: "REST APIs, JSON & Auth", tier: 1, row: 2, role: "flutter_dev", desc: "ربط التطبيق بالسيرفر وقواعد البيانات" },
      { id: "m_state", label: "Bloc / Cubit / Riverpod", tier: 2, row: 0.5, role: "flutter_dev", desc: "إدارة الحالة الاحترافية للتطبيقات الكبيرة" },
      { id: "m_arch", label: "Clean Architecture & MVVM", tier: 2, row: 2, role: "native_dev", desc: "تنظيم الكود لسهولة الصيانة والاختبار" },
      { id: "m_store", label: "🏆 Store Publishing & CI/CD", tier: 3, row: 1.2, role: "flutter_dev", desc: "رفع التطبيق على Google Play و App Store" }
    ],
    edges: [
      ["m_oop", "m_ui"], ["m_oop", "m_api"], ["m_ui", "m_state"],
      ["m_api", "m_state"], ["m_api", "m_arch"], ["m_state", "m_arch"], ["m_arch", "m_store"]
    ]
  },

  /* --------------------------------------------------------------------------
     5. CLOUD COMPUTING, DEVOPS & SRE (الحوسبة السحابية و DevOps)
     -------------------------------------------------------------------------- */
  {
    id: "devops_cloud",
    name: "السحابة و الديف أوبس (Cloud & DevOps)",
    shortTag: "Docker / Kubernetes / AWS / CI-CD",
    icon: "fa-cloud-arrow-up",
    accent: "#8B5CF6",
    introTitle: "☁️ هندسة الحوسبة السحابية، الأتمتة، وموثوقية الأنظمة (Cloud, DevOps & SRE)",
    introText: "مهندس الـ DevOps والـ Cloud هو الجسر الذي يربط بين كتابة الكود وتشغيله الفعلي على السحابة لملايين المستخدمين بدون انقطاع (Zero Downtime) عبر الحاويات والأتمتة الكاملة.",
    whyPoints: [
      { title: "⚙️ أتمتة كل شيء", desc: "تحويل البنية التحتية إلى كود برمجي (IaC) يُبنى ويُختبر ويُنشر تلقائياً في دقائق." },
      { title: "🌍 عمل عن بُعد برواتب عالمية", desc: "من أكثر التخصصات الهندسية طلباً في الشركات العالمية الكبرى." }
    ],
    foundations: [
      { id: "dv_f1", title: "1. إدارة أنظمة Linux المتقدمة والشبكات", desc: "Systemd, SSH, Bash Scripting, DNS, Nginx, Load Balancing.", yt: "TechWorld with Nana / KodeKloud" },
      { id: "dv_f2", title: "2. الحاويات بـ Docker & Docker Compose", desc: "بناء الصور الخفيفة، الشبكات بين الحاويات، وتخزين البيانات.", yt: "Big Data Arabic / Nana" }
    ],
    roles: [
      {
        id: "devops_eng",
        title: "♾️ مهندس ديف أوبس وأتمتة (DevOps & CI/CD Engineer)",
        mission: "بناء خطوط النشر التلقائي CI/CD، إدارة مجموعات Kubernetes، ومراقبة أداء الخوادم.",
        skills: ["Linux & Bash/Python", "Docker & Kubernetes (K8s)", "CI/CD (GitHub Actions / GitLab CI / Jenkins)", "Infrastructure as Code (Terraform)", "Configuration Mgmt (Ansible)", "Monitoring (Prometheus & Grafana)"],
        tools: ["Docker", "Kubernetes", "Helm", "Terraform", "GitHub Actions", "ArgoCD", "Prometheus", "Grafana"],
        certs: ["AWS Solutions Architect (SAA-C03)", "CKA (Certified Kubernetes Administrator)", "HashiCorp Terraform Associate"]
      }
    ],
    resources: [
      { name: "TechWorld with Nana & KodeKloud", type: "أقوى شرح بصري لـ Docker & K8s & DevOps", url: "https://www.youtube.com/@TechWorldwithNana" }
    ],
    nodes: [
      { id: "d_lin", label: "Linux, Bash & Networking", tier: 0, row: 1, role: "devops_eng", desc: "الأساس الجوهري لإدارة السيرفرات" },
      { id: "d_dock", label: "Docker & Containers", tier: 1, row: 0.5, role: "devops_eng", desc: "تغليف التطبيقات وتشغيلها في أي بيئة" },
      { id: "d_cicd", label: "CI/CD (GitHub Actions)", tier: 1, row: 2, role: "devops_eng", desc: "أتمتة الاختبار والنشر المستمر" },
      { id: "d_aws", label: "Cloud (AWS / Azure)", tier: 2, row: 0.5, role: "devops_eng", desc: "إدارة الخدمات السحابية والشبكات الافتراضية" },
      { id: "d_k8s", label: "Kubernetes (K8s) & Helm", tier: 2, row: 2, role: "devops_eng", desc: "إدارة وتوسيع آلاف الحاويات تلقائياً" },
      { id: "d_tf", label: "🏆 Terraform, ArgoCD & Observability", tier: 3, row: 1.2, role: "devops_eng", desc: "البنية التحتية ككود والمراقبة اللحظية" }
    ],
    edges: [
      ["d_lin", "d_dock"], ["d_lin", "d_cicd"], ["d_dock", "d_aws"],
      ["d_dock", "d_k8s"], ["d_cicd", "d_k8s"], ["d_aws", "d_tf"], ["d_k8s", "d_tf"]
    ]
  },

  /* --------------------------------------------------------------------------
     6. EMBEDDED SYSTEMS, IOT & DIGITAL LOGIC (الأنظمة المدمجة والهاردوير)
     -------------------------------------------------------------------------- */
  {
    id: "embedded",
    name: "الأنظمة المدمجة والهاردوير (Embedded & Logic)",
    shortTag: "C/C++ / ARM / RTOS / FPGA / Logic",
    icon: "fa-microchip",
    accent: "#F59E0B",
    introTitle: "🔌 هندسة الأنظمة المدمجة، الكروت الذكية، والتصميم المنطقي الرقمي (Embedded & Digital Design)",
    introText: "التخصص الذي يجمع بين هندسة الكهرباء والإلكترونيات وهندسة البرمجيات؛ لبناء عقول السيارات الحديثة، الطائرات، الأجهزة الطبية، أنظمة إنترنت الأشياء (IoT)، وتصميم المعالجات والدوائر المتكاملة (ASIC/FPGA).",
    whyPoints: [
      { title: "🚗 صناعة السيارات والـ AUTOSAR", desc: "مصر والعالم يشهدان نمواً كبيراً في شركات برمجة أنظمة السيارات والـ Embedded." },
      { title: "⚡ تحكم مباشر بالهاردوير", desc: "كتابة كود C/C++ يتعامل مباشرة مع الـ Registers والذاكرة والمستشعرات في الوقت الحقيقي." }
    ],
    foundations: [
      { id: "em_f1", title: "1. الدوائر الكهربائية والتصميم المنطقي (Logic Design & Electronics)", desc: "Logic Gates, Flip-Flops, Multiplexers, K-Maps, Microprocessor Architecture.", yt: "Neso Academy / د. وليد عيسى" },
      { id: "em_f2", title: "2. لغة C العميقة للأنظمة المدمجة (Embedded C & Pointers)", desc: "Bitwise Operations, Pointers, Memory Layout, Structs, Volatile Keyword.", yt: "Eng. Amgad Samir / Mohamed Tarek" }
    ],
    roles: [
      {
        id: "emb_sw",
        title: "📟 مهندس برمجيات مدمجة وسيارات (Embedded Software & Automotive)",
        mission: "كتابة التعريفات (Drivers) وأنظمة التشغيل اللحظية (RTOS) للمتحكمات الدقيقة في السيارات والأجهزة الذكية.",
        skills: ["Embedded C & Modern C++", "AVR / ARM Cortex-M (STM32)", "Communication Protocols (UART, SPI, I2C, CAN, LIN)", "FreeRTOS", "AUTOSAR Architecture"],
        tools: ["STM32CubeIDE", "Keil uVision", "Proteus", "Logic Analyzer", "Oscilloscope", "CANoe"],
        certs: ["ARM Accredited Engineer", "ISTQB Certified Tester (Automotive)"]
      },
      {
        id: "fpga_ic",
        title: "🔬 مهندس تصميم رقمي و (Digital IC & FPGA Engineer)",
        mission: "تصميم وبناء الدوائر الرقمية والمعالجات باستخدام لغات توصيف الهاردوير.",
        skills: ["Digital Logic Design", "Verilog / SystemVerilog / VHDL", "FPGA Prototyping", "Static Timing Analysis (STA)", "UVM Verification"],
        tools: ["Xilinx Vivado", "ModelSim / QuestaSim", "Quartus", "MATLAB"],
        certs: ["AMD/Xilinx FPGA Design", "IEEE Digital Design"]
      }
    ],
    resources: [
      { name: "م. محمد طارق / م. أمجد سمير / م. كيرلس", type: "مسارات Embedded Systems العربية", url: "https://www.youtube.com" },
      { name: "Neso Academy & FastBit Embedded Brain", type: "شرح Digital Logic & STM32 & RTOS", url: "https://www.youtube.com/@nesoacademy" }
    ],
    nodes: [
      { id: "e_log", label: "Electronics & Logic Design", tier: 0, row: 0.5, role: "fpga_ic", desc: "البوابات المنطقية والدوائر الرقمية" },
      { id: "e_c", label: "Embedded C & Pointers", tier: 0, row: 2, role: "emb_sw", desc: "البرمجة قريبة المستوى والتعامل مع الذاكرة" },
      { id: "e_mcu", label: "AVR & Interfacing (GPIO/ADC)", tier: 1, row: 1, role: "emb_sw", desc: "برمجة المتحكمات الدقيقة والمستشعرات" },
      { id: "e_proto", label: "UART, SPI, I2C & CAN Bus", tier: 2, row: 0.5, role: "emb_sw", desc: "بروتوكولات الاتصال الصناعية والسيارات" },
      { id: "e_hdl", label: "Verilog / VHDL & FPGA", tier: 2, row: 2.2, role: "fpga_ic", desc: "تصميم الدوائر المتكاملة والمعالجات" },
      { id: "e_arm", label: "🏆 ARM STM32, FreeRTOS & AUTOSAR", tier: 3, row: 1, role: "emb_sw", desc: "أنظمة الوقت الحقيقي ومعايير صناعة السيارات" }
    ],
    edges: [
      ["e_log", "e_mcu"], ["e_c", "e_mcu"], ["e_mcu", "e_proto"],
      ["e_log", "e_hdl"], ["e_proto", "e_arm"], ["e_mcu", "e_arm"]
    ]
  },

  /* --------------------------------------------------------------------------
     7. COMPUTER SCIENCE & PROBLEM SOLVING (أساسيات علوم الحاسب)
     -------------------------------------------------------------------------- */
  {
    id: "cs_core",
    name: "علوم الحاسب والخوارزميات (CS Core)",
    shortTag: "DSA / OOP / OS / System Design",
    icon: "fa-code-compare",
    accent: "#3B82F6",
    introTitle: "🧠 الأساس الهندسي المتين لعلوم الحاسب وحل المشكلات (CS Fundamentals & Problem Solving)",
    introText: "اللغات وأطر العمل تتغير كل بضع سنوات، لكن أساسيات علوم الحاسب (هياكل البيانات، الخوارزميات، أنظمة التشغيل، وهندسة البرمجيات) هي ما يصنع مهندس برمجيات قادر على اجتياز مقابلات كبرى الشركات العالمية (FAANG).",
    whyPoints: [
      { title: "🏆 مفتاح مقابلات الشركات الكبرى", desc: "جميع اختبارات الشركات الكبرى تركز على Data Structures, Algorithms & System Design." },
      { title: "⚡ كتابة كود سريع ونظيف", desc: "فهم التعقيد الزمني والمكاني Big-O Notation يمنع بطء الأنظمة عند زيادة البيانات." }
    ],
    foundations: [
      { id: "cs_f1", title: "1. إتقان C++ أو Java أو Python مع البرمجة الكائنية OOP", desc: "Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID Principles.", yt: "عادل نسيم / الدسوقي / مصطفي سعد" },
      { id: "cs_f2", title: "2. هياكل البيانات والخوارزميات (Data Structures & Algorithms)", desc: "Arrays, LinkedLists, Trees, Graphs, HashMaps, Sorting, Dynamic Programming.", yt: "د. مصطفى سعد إبراهيم / Abdul Bari / NeetCode" }
    ],
    roles: [
      {
        id: "swe_core",
        title: "💎 مهندس برمجيات قياسي (Core Software Engineer)",
        mission: "حل المشكلات المعقدة، تصميم الأنظمة، وكتابة كود قابل للصيانة والاختبار.",
        skills: ["Data Structures & Algorithms", "OOP & SOLID Principles", "Design Patterns (GoF)", "Database Internals & Indexing", "Operating Systems & Concurrency", "System Design"],
        tools: ["C++ / Java / Python", "LeetCode / Codeforces", "Git", "UML", "Linux"],
        certs: ["ICPC / ECPC Participation", "NeetCode 150 Completion"]
      }
    ],
    resources: [
      { name: "د. مصطفى سعد إبراهيم & عادل نسيم", type: "يوتيوب عربي — Problem Solving & C++ & DSA", url: "https://www.youtube.com/@MustafaSaadIbrahim" },
      { name: "NeetCode.io & LeetCode & Codeforces", type: "أهم منصات التدريب على الخوارزميات", url: "https://neetcode.io" }
    ],
    nodes: [
      { id: "c_cpp", label: "C++ & Programming Basics", tier: 0, row: 1, role: "swe_core", desc: "أساسيات البرمجة والمنطق الحسابي" },
      { id: "c_oop", label: "OOP & SOLID Principles", tier: 1, row: 0.5, role: "swe_core", desc: "البرمجة الكائنية ومبادئ التصميم النظيف" },
      { id: "c_dsa", label: "Data Structures & Algorithms", tier: 1, row: 2, role: "swe_core", desc: "الأشجار، الجراف، والبرمجة الديناميكية" },
      { id: "c_pat", label: "Design Patterns & Clean Code", tier: 2, row: 0.5, role: "swe_core", desc: "أنماط التصميم القياسية للبرمجيات" },
      { id: "c_osdb", label: "OS, Concurrency & DB Internals", tier: 2, row: 2, role: "swe_core", desc: "أنظمة التشغيل، الـ Threads، وفهرسة قواعد البيانات" },
      { id: "c_sys", label: "🏆 High-Level System Design", tier: 3, row: 1.2, role: "swe_core", desc: "تصميم الأنظمة العملاقة الموزعة" }
    ],
    edges: [
      ["c_cpp", "c_oop"], ["c_cpp", "c_dsa"], ["c_oop", "c_pat"],
      ["c_dsa", "c_osdb"], ["c_pat", "c_sys"], ["c_osdb", "c_sys"]
    ]
  },

  /* --------------------------------------------------------------------------
     8. GAME DEVELOPMENT & GRAPHICS (تطوير الألعاب والرسوميات)
     -------------------------------------------------------------------------- */
  {
    id: "gamedev",
    name: "تطوير الألعاب والرسوميات (Game Dev)",
    shortTag: "Unity C# / Unreal C++ / 3D Math",
    icon: "fa-gamepad",
    accent: "#EC4899",
    introTitle: "🎮 هندسة وتطوير الألعاب والمحاكاة التفاعلية ثلاثية الأبعاد (Unity & Unreal Engine)",
    introText: "تطوير الألعاب يجمع بين البرمجة عالية الأداء، الرياضيات ثلاثية الأبعاد (المتجهات والمصفوفات)، الفيزياء، الذكاء الاصطناعي لحركة الشخصيات، وبرمجة كروت الشاشة (Shaders).",
    whyPoints: [
      { title: "🕹️ محركات عالمية مجانية", desc: "محركا Unity (C#) و Unreal Engine 5 (C++) متاحان مجاناً لبناء ألعاب PC و Mobile و Console." },
      { title: "📐 تطبيق حي للرياضيات والفيزياء", desc: "أفضل مجال تطبق فيه حساب المثلثات، المتجهات، والفيزياء الحركية." }
    ],
    foundations: [
      { id: "gm_f1", title: "1. إتقان C# (لمحرك Unity) أو C++ (لمحرك Unreal)", desc: "البرمجة الكائنية، الأحداث Events، والـ Memory Management.", yt: "Brackeys / Code Monkey" },
      { id: "gm_f2", title: "2. رياضيات وفيزياء الألعاب (3D Vectors, Matrices, Quaternions)", desc: "حساب الحركة، الدوران، التصادمات Raycasting & Collisions.", yt: "Freya Holmér / Sebastian Lague" }
    ],
    roles: [
      {
        id: "game_prog",
        title: "🎮 مبرمج ومطور ألعاب (Gameplay & Engine Programmer)",
        mission: "برمجة ميكانيكيات اللعب، الفيزياء، الذكاء الاصطناعي للأعداء، واللعب الجماعي عبر الشبكة (Multiplayer).",
        skills: ["C# & Unity / C++ & Unreal Engine", "3D Math & Physics", "Game AI (Pathfinding A*, State Machines)", "Shaders & HLSL/GLSL", "Multiplayer Netcode"],
        tools: ["Unity 6", "Unreal Engine 5", "Godot", "Blender", "Visual Studio", "RenderDoc"],
        certs: ["Unity Certified Programmer", "Epic Games Unreal Fellowship"]
      }
    ],
    resources: [
      { name: "Brackeys & Code Monkey & Sebastian Lague", type: "أشهر قنوات تطوير الألعاب عالمياً", url: "https://www.youtube.com/@CodeMonkeyUnity" }
    ],
    nodes: [
      { id: "g_lang", label: "C# / C++ & 3D Math", tier: 0, row: 1, role: "game_prog", desc: "اللغة البرمجية ورياضيات المتجهات" },
      { id: "g_eng", label: "Unity / Unreal Engine Core", tier: 1, row: 0.5, role: "game_prog", desc: "التعامل مع المشاهد، الفيزياء، والأنيميشن" },
      { id: "g_ai", label: "Gameplay Systems & Game AI", tier: 1, row: 2, role: "game_prog", desc: "برمجة الذكاء الاصطناعي وتفاعلات اللعب" },
      { id: "g_shd", label: "Shaders, Lighting & Optimization", tier: 2, row: 0.5, role: "game_prog", desc: "الرسوميات المتقدمة ورفع الـ FPS" },
      { id: "g_net", label: "🏆 Multiplayer Netcode & Steam Release", tier: 3, row: 1.2, role: "game_prog", desc: "اللعب الجماعي ونشر اللعبة" }
    ],
    edges: [
      ["g_lang", "g_eng"], ["g_lang", "g_ai"], ["g_eng", "g_shd"],
      ["g_ai", "g_net"], ["g_shd", "g_net"]
    ]
  }
];

/* ============================================================================
   3. STATE & STORAGE FOR MASTERED NODES AND SELECTED TRACK
   ============================================================================ */
const TracksState = {
  activeTrackId: localStorage.getItem("MY_LIFE_OS_ACTIVE_TRACK") || "cybersecurity",
  activeRoleFilter: "all",
  selectedNodeId: null,
  zoom: 1,
  panX: 0,
  panY: 0,
  isFullscreenGraph: false,
  masteredNodes: JSON.parse(localStorage.getItem("MY_LIFE_OS_MASTERED_NODES") || "{}"),
  animFrame: null
};

function saveMasteredNodes() {
  localStorage.setItem("MY_LIFE_OS_MASTERED_NODES", JSON.stringify(TracksState.masteredNodes));
}

function getActiveTrack() {
  return CAREER_TRACKS_DB.find(t => t.id === TracksState.activeTrackId) || CAREER_TRACKS_DB[0];
}

/* ============================================================================
   4. INJECT TAB INTO SIDEBAR & RENDER MAIN ENCYCLOPEDIA VIEW
   ============================================================================ */
function injectTracksTabIntoSidebar() {
  injectTracksStyles();
  const nav = document.querySelector(".sidebar-nav");
  const main = document.querySelector(".main-content");
  const footer = document.querySelector(".app-footer");
  if (!nav || !main || document.getElementById("view-career-tracks")) return;

  const btn = document.createElement("button");
  btn.className = "nav-item";
  btn.dataset.view = "career-tracks";
  btn.innerHTML = `<i class="fa-solid fa-diagram-project gold-text"></i> <span>موسوعة المسارات والشبكات</span>`;
  btn.onclick = () => {
    B().switchView?.("career-tracks");
    renderCareerTracksEncyclopedia();
  };

  // وضع التبويب في مكان بارز بجانب المشاريع والجامعة
  const projBtn = nav.querySelector('[data-view="projects"]');
  if (projBtn) {
    projBtn.insertAdjacentElement("afterend", btn);
  } else {
    nav.appendChild(btn);
  }

  const sec = document.createElement("section");
  sec.id = "view-career-tracks";
  sec.className = "view-section";
  main.insertBefore(sec, footer);
}

function renderCareerTracksEncyclopedia() {
  const sec = document.getElementById("view-career-tracks");
  if (!sec) return;

  const track = getActiveTrack();
  const totalNodes = track.nodes.length;
  const doneNodes = track.nodes.filter(n => TracksState.masteredNodes[n.id]).length;
  const pct = Math.round((doneNodes / Math.max(1, totalNodes)) * 100);

  const selectedNode = track.nodes.find(n => n.id === TracksState.selectedNodeId) || track.nodes[0];
  TracksState.selectedNodeId = selectedNode.id;

  sec.innerHTML = `
    <!-- 1. شريط اختيار المجال البرمجي أو الهندسي (8 مجالات كبرى) -->
    <div class="tracks-domain-bar">
      ${CAREER_TRACKS_DB.map(t => {
        const tDone = t.nodes.filter(n => TracksState.masteredNodes[n.id]).length;
        const tPct = Math.round((tDone / Math.max(1, t.nodes.length)) * 100);
        return `
          <button type="button" class="track-domain-pill ${t.id === track.id ? "active" : ""}" data-select-track="${t.id}">
            <div class="track-domain-icon"><i class="fa-solid ${t.icon}"></i></div>
            <div style="flex:1; overflow:hidden;">
              <strong style="display:block; font-size:0.86rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(t.name)}</strong>
              <small class="small-muted" style="font-size:0.72rem;">${esc(t.shortTag)} • <span class="gold-text">${tPct}%</span></small>
            </div>
          </button>
        `;
      }).join("")}
    </div>

    <!-- 2. البطاقة التعريفية الشاملة للمجال (ما هو؟ لماذا تتعلمه؟ وكيف تبدأ؟) -->
    <div class="track-hero-card">
      <div class="flex-between" style="flex-wrap:wrap; gap:12px;">
        <div>
          <span class="badge badge-gold mb-1"><i class="fa-solid ${track.icon}"></i> الدليل المرجعي الشامل والخريطة الشبكية</span>
          <h2 class="mt-1">${esc(track.introTitle)}</h2>
        </div>
        <div class="filters-row">
          <span class="badge badge-emerald">إتقانك في الشبكة: ${doneNodes} / ${totalNodes} (${pct}%)</span>
          <button type="button" id="btn-track-to-goals" class="btn btn-gold btn-sm">
            <i class="fa-solid fa-bullseye"></i> اعتماد هذا المسار في أهدافي ومهامي
          </button>
        </div>
      </div>
      <p class="mt-2" style="font-size:0.95rem; color:var(--text-primary); line-height:1.8;">${esc(track.introText)}</p>
      <div class="track-why-grid">
        ${track.whyPoints.map(w => `
          <div class="track-why-box">
            <strong class="gold-text">${esc(w.title)}</strong>
            <p class="small-muted mt-1">${esc(w.desc)}</p>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- 3. الخريطة الشبكية التفاعلية الكاملة (Interactive Network Graph — شبكة حرفياً!) -->
    <div id="network-graph-container" class="network-graph-shell ${TracksState.isFullscreenGraph ? "network-graph-Shell-fullscreen" : ""}">
      <div class="network-toolbar">
        <div class="filters-row">
          <strong class="gold-text"><i class="fa-solid fa-circle-nodes"></i> الشبكة التفاعلية للمسار:</strong>
          <button type="button" class="chip ${TracksState.activeRoleFilter === "all" ? "btn-gold" : ""}" data-role-filter="all">🌐 الشبكة الكاملة</button>
          ${track.id === "cybersecurity" ? `<button type="button" class="chip ${TracksState.activeRoleFilter === "foundation" ? "btn-gold" : ""}" data-role-filter="foundation">🧱 الأساسيات فقط</button>` : ""}
          ${track.roles.map(r => `
            <button type="button" class="chip ${TracksState.activeRoleFilter === r.id ? "btn-gold" : ""}" data-role-filter="${r.id}">
              ${esc(r.title.split("(")[0].trim())}
            </button>
          `).join("")}
        </div>
        <div class="filters-row">
          <button type="button" id="btn-net-zoom-in" class="btn btn-xs btn-outline" title="تكبير"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
          <button type="button" id="btn-net-zoom-out" class="btn btn-xs btn-outline" title="تصغير"><i class="fa-solid fa-magnifying-glass-minus"></i></button>
          <button type="button" id="btn-net-reset" class="btn btn-xs btn-outline" title="إعادة ضبط الأبعاد"><i class="fa-solid fa-compress"></i> ضبط</button>
          <button type="button" id="btn-net-fullscreen" class="btn btn-xs btn-gold">
            <i class="fa-solid ${TracksState.isFullscreenGraph ? "fa-Minimize" : "fa-expand"}"></i>
            ${TracksState.isFullscreenGraph ? "خروج من ملء الشاشة" : "تكبير الشبكة بملء الشاشة"}
          </button>
        </div>
      </div>

      <canvas id="track-network-canvas" class="network-canvas-viewport"></canvas>

      <!-- شريط تفاصيل العقدة المختارة من الشبكة (Node Inspector) -->
      <div class="network-inspector-bar">
        <div>
          <span class="badge ${TracksState.masteredNodes[selectedNode.id] ? "badge-emerald" : "badge-gold"}">
            ${TracksState.masteredNodes[selectedNode.id] ? "✅ تم إتقان هذه المحطة" : "📍 محطة مختارة من الشبكة (اضغط على أي عقدة في الشبكة لاستكشافها)"}
          </span>
          <h4 class="mt-1 gold-text" id="net-insp-title">${esc(selectedNode.label)}</h4>
          <p class="small-muted" id="net-insp-desc">${esc(selectedNode.desc)}</p>
        </div>
        <div class="filters-row">
          <button type="button" id="btn-toggle-node-mastery" class="btn btn-sm ${TracksState.masteredNodes[selectedNode.id] ? "btn-outline" : "btn-gold"}">
            <i class="fa-solid fa-check-double"></i> ${TracksState.masteredNodes[selectedNode.id] ? "إلغاء الإتقان" : "علّم كمُتقن ✅"}
          </button>
          <button type="button" id="btn-node-to-pomo" class="btn btn-sm btn-outline">
            <i class="fa-solid fa-stopwatch gold-text"></i> جلسة تركيز في هذه المهارة
          </button>
          <button type="button" id="btn-node-to-task" class="btn btn-sm btn-outline">
            <i class="fa-solid fa-plus gold-text"></i> أضف لمهامي
          </button>
        </div>
      </div>
    </div>

    <!-- 4. الأساسيات الإجبارية التي يجب تعلمها أولاً قبل التخصص (Foundations) -->
    <div class="card mb-4" style="margin-bottom:20px;">
      <div class="card-header">
        <h3><i class="fa-solid fa-layer-group gold-text"></i> أولاً: الأساسيات الإجبارية قبل التخصص (Mandatory Foundations)</h3>
        <span class="badge badge-gold">متاح بالكامل مجاناً على يوتيوب</span>
      </div>
      <div class="items-grid">
        ${track.foundations.map(f => {
          const isDone = TracksState.masteredNodes[f.id] === true;
          return `
            <div class="item-card">
              <div>
                <div class="flex-between">
                  <span class="badge ${isDone ? "badge-emerald" : "badge-gold"}">${isDone ? "مكتمل ✅" : "أساسي إجباري"}</span>
                  <button type="button" class="btn btn-xs ${isDone ? "btn-gold" : "btn-outline"}" data-toggle-found="${f.id}">
                    ${isDone ? "تم الإنجاز ✓" : "تحديد كمكتمل"}
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

    <!-- 5. التخصصات والوظائف الدقيقة داخل المجال + المهارات والأدوات والشهادات المطلوبة -->
    <div class="card mb-4" style="margin-bottom:20px;">
      <div class="card-header">
        <h3><i class="fa-solid fa-user-shield gold-text"></i> ثانياً: الوظائف والتخصصات الفرعية، أدواتها، والشهادات العالمية المطلوبة</h3>
        <small class="small-muted">اضغط "اعرض في الشبكة" لفلترة الخريطة الشبكية على التخصص المطلوب</small>
      </div>
      <div class="items-grid">
        ${track.roles.map(r => `
          <div class="role-specialist-card">
            <div>
              <div class="flex-between">
                <h4 class="gold-text">${esc(r.title)}</h4>
              </div>
              <p class="small-muted mt-1">${esc(r.mission)}</p>

              <div class="mt-2">
                <small class="gold-text font-weight-bold d-block">🛠️ المهارات المطلوبة للوظيفة:</small>
                <div class="cert-pill-row">
                  ${r.skills.map(s => `<span class="badge badge-emerald">${esc(s)}</span>`).join("")}
                </div>
              </div>

              <div class="mt-2">
                <small class="gold-text font-weight-bold d-block">⚙️ الأدوات العملية (Tools):</small>
                <div class="cert-pill-row">
                  ${r.tools.map(tl => `<span class="tool-badge">${esc(tl)}</span>`).join("")}
                </div>
              </div>

              <div class="mt-2">
                <small class="gold-text font-weight-bold d-block">📜 الشهادات العالمية المطلوبة بالترتيب:</small>
                <div class="cert-pill-row">
                  ${r.certs.map(c => `<span class="cert-badge"><i class="fa-solid fa-award"></i> ${esc(c)}</span>`).join("")}
                </div>
              </div>
            </div>

            <div class="flex-between mt-2" style="border-top:1px solid rgba(255,255,255,0.07); padding-top:10px;">
              <button type="button" class="btn btn-xs btn-gold" data-focus-role-graph="${r.id}">
                <i class="fa-solid fa-diagram-project"></i> اعرض في الشبكة
              </button>
              <button type="button" class="btn btn-xs btn-outline" data-role-to-tasks="${r.id}">
                <i class="fa-solid fa-list-check gold-text"></i> حول لمهام في جدولي
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- 6. مكتبة اليوتيوب والمنصات العملية + المستشار الذكي للمسار -->
    <div class="dashboard-grid">
      <div class="card">
        <div class="card-header">
          <h3><i class="fa-brands fa-youtube gold-text"></i> ثالثاً: المنصات العملية وقنوات اليوتيوب المعتمدة</h3>
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
          <h3><i class="fa-solid fa-wand-magic-sparkles gold-text"></i> مستشار المسارات الذكي (AI Career Mentor)</h3>
        </div>
        <p class="small-muted mb-2">اسأل أليكس أي سؤال عن مسار <strong>${esc(track.name)}</strong> أو اطلب منه جدول مذاكرة مخصص لك:</p>
        <div class="input-action-row">
          <input type="text" id="track-ai-question" placeholder="مثال: اعمل لي جدول 30 يوم لتعلم أساسيات السايبر و Red Team..." />
          <button type="button" id="btn-ask-track-ai" class="btn btn-gold btn-sm">اسأل المستشار</button>
        </div>
        <div id="track-ai-answer" class="subject-progress-box mt-2" style="white-space:pre-line; min-height:90px;">
          اضغط "اسأل المستشار" ليقوم الذكاء الاصطناعي ببناء خطة تفصيلية لك...
        </div>
      </div>
    </div>
  `;

  bindCareerTracksEvents(track);
  startInteractiveNetworkGraph(track);
}

/* ============================================================================
   5. INTERACTIVE HTML5 CANVAS NETWORK GRAPH ENGINE (WITH ANIMATED PULSES)
   ============================================================================ */
let graphNodesComputed = [];

function startInteractiveNetworkGraph(track) {
  const canvas = document.getElementById("track-network-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const resizeCanvas = () => {
    canvas.width = canvas.clientWidth || 1150;
    canvas.height = canvas.clientHeight || 520;
  };
  resizeCanvas();

  // حساب إحداثيات كل عقدة في الشبكة بشكل هندسي منظم
  const W = canvas.width;
  const H = canvas.height;
  const maxTier = Math.max(...track.nodes.map(n => n.tier), 1);

  graphNodesComputed = track.nodes.map(n => {
    const xBase = 120 + (n.tier / maxTier) * (W - 240);
    const yBase = 85 + (n.row / 3.2) * (H - 165);
    return {
      ...n,
      x: n._customX || xBase,
      y: n._customY || yBase,
      r: 22
    };
  });

  let draggingNode = null;
  let isPanning = false;
  let startPanX = 0, startPanY = 0;

  const getMouseWorldPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left - TracksState.panX) / TracksState.zoom;
    const my = (e.clientY - rect.top - TracksState.panY) / TracksState.zoom;
    return { mx, my, rawX: e.clientX - rect.left, rawY: e.clientY - rect.top };
  };

  canvas.onmousedown = (e) => {
    const { mx, my, rawX, rawY } = getMouseWorldPos(e);
    const hit = graphNodesComputed.find(nd => Math.hypot(nd.x - mx, nd.y - my) <= nd.r + 8);
    if (hit) {
      draggingNode = hit;
      TracksState.selectedNodeId = hit.id;
      updateInspectorBarOnly(track, hit);
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

  window.addEventListener("mouseup", () => {
    draggingNode = null;
    isPanning = false;
  });

  //双击 عقدة لتعليمها كمُتقنة فوراً
  canvas.ondblclick = (e) => {
    const { mx, my } = getMouseWorldPos(e);
    const hit = graphNodesComputed.find(nd => Math.hypot(nd.x - mx, nd.y - my) <= nd.r + 8);
    if (hit) {
      TracksState.masteredNodes[hit.id] = !TracksState.masteredNodes[hit.id];
      saveMasteredNodes();
      toast(TracksState.masteredNodes[hit.id] ? `تم إتقان: ${hit.label} ✅` : `تم إلغاء علامة الإتقان`, "success");
      renderCareerTracksEncyclopedia();
    }
  };

  if (TracksState.animFrame) cancelAnimationFrame(TracksState.animFrame);
  let pulseT = 0;

  function renderNetworkLoop() {
    if (!document.getElementById("track-network-canvas")) return;
    pulseT = (pulseT + 0.008) % 1;
    drawNetworkGraphFrame(ctx, canvas.width, canvas.height, track, pulseT);
    TracksState.animFrame = requestAnimationFrame(renderNetworkLoop);
  }
  renderNetworkLoop();
}

function drawNetworkGraphFrame(ctx, W, H, track, pulseT) {
  ctx.clearRect(0, 0, W, H);

  // خلفية شبكية هندسية خفيفة (Cyber Grid)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 45) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 45) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  ctx.save();
  ctx.translate(TracksState.panX, TracksState.panY);
  ctx.scale(TracksState.zoom, TracksState.zoom);

  const filter = TracksState.activeRoleFilter;
  const isNodeHighlighted = (nd) => filter === "all" || nd.role === filter || nd.role === "foundation";

  // 1. رسم الروابط والأسهم ونبضات الطاقة المتحركة بين عقد الشبكة
  track.edges.forEach(([fromId, toId]) => {
    const n1 = graphNodesComputed.find(n => n.id === fromId);
    const n2 = graphNodesComputed.find(n => n.id === toId);
    if (!n1 || !n2) return;

    const activeEdge = isNodeHighlighted(n1) && isNodeHighlighted(n2);
    const bothMastered = TracksState.masteredNodes[n1.id] && TracksState.masteredNodes[n2.id];

    ctx.strokeStyle = bothMastered
      ? "rgba(16, 185, 129, 0.85)"
      : activeEdge
      ? "rgba(212, 167, 44, 0.55)"
      : "rgba(148, 163, 184, 0.12)";
    ctx.lineWidth = activeEdge ? 2.4 : 1.2;

    ctx.beginPath();
    ctx.moveTo(n1.x, n1.y);
    ctx.lineTo(n2.x, n2.y);
    ctx.stroke();

    // نبضة ضوئية تتحرك على الخطوط النشطة في الشبكة
    if (activeEdge) {
      const px = n1.x + (n2.x - n1.x) * pulseT;
      const py = n1.y + (n2.y - n1.y) * pulseT;
      ctx.fillStyle = bothMastered ? "#10B981" : "#D4A72C";
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // 2. رسم العقد (Nodes) وحلقات التوهج والأسماء
  graphNodesComputed.forEach(nd => {
    const highlighted = isNodeHighlighted(nd);
    const mastered = TracksState.masteredNodes[nd.id] === true;
    const selected = TracksState.selectedNodeId === nd.id;

    ctx.globalAlpha = highlighted ? 1 : 0.22;

    // هالة خارجية للعقدة المختارة أو المتقنة
    if (selected || mastered) {
      ctx.fillStyle = mastered ? "rgba(16, 185, 129, 0.22)" : "rgba(212, 167, 44, 0.25)";
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, nd.r + 9, 0, Math.PI * 2);
      ctx.fill();
    }

    // جسم العقدة
    ctx.fillStyle = mastered ? "#065F46" : selected ? "#D4A72C" : "#111827";
    ctx.strokeStyle = mastered ? "#10B981" : selected ? "#FFFFFF" : track.accent || "#D4A72C";
    ctx.lineWidth = selected ? 3 : 2.2;

    ctx.beginPath();
    ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // أيقونة أو رقم المستوى داخل العقدة
    ctx.fillStyle = selected && !mastered ? "#05070e" : "#FFFFFF";
    ctx.font = "bold 12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(mastered ? "✓" : `L${nd.tier + 1}`, nd.x, nd.y);

    // كبسولة اسم المهارة أسفل العقدة
    ctx.font = "bold 12px Alexandria, Cairo, sans-serif";
    const textW = ctx.measureText(nd.label).width + 16;
    ctx.fillStyle = "rgba(9, 13, 25, 0.88)";
    ctx.fillRect(nd.x - textW / 2, nd.y + nd.r + 6, textW, 22);
    ctx.strokeStyle = mastered ? "rgba(16, 185, 129, 0.5)" : "rgba(212, 167, 44, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(nd.x - textW / 2, nd.y + nd.r + 6, textW, 22);

    ctx.fillStyle = mastered ? "#6EE7B7" : "#F8FAFC";
    ctx.fillText(nd.label, nd.x, nd.y + nd.r + 17);
  });

  ctx.globalAlpha = 1;
  ctx.restore();
}

function updateInspectorBarOnly(track, node) {
  const titleEl = document.getElementById("net-insp-title");
  const descEl = document.getElementById("net-insp-desc");
  if (titleEl) titleEl.textContent = node.label;
  if (descEl) descEl.textContent = node.desc;
}

/* ============================================================================
   6. EVENT BINDINGS FOR TRACKS, ROLES, AI MENTOR & TASK INTEGRATION
   ============================================================================ */
function bindCareerTracksEvents(track) {
  const sec = document.getElementById("view-career-tracks");
  if (!sec) return;

  // تبديل المسار الرئيسي
  sec.querySelectorAll("[data-select-track]").forEach(btn => {
    btn.onclick = () => {
      TracksState.activeTrackId = btn.dataset.selectTrack;
      TracksState.activeRoleFilter = "all";
      TracksState.selectedNodeId = null;
      TracksState.zoom = 1;
      TracksState.panX = 0;
      TracksState.panY = 0;
      localStorage.setItem("MY_LIFE_OS_ACTIVE_TRACK", TracksState.activeTrackId);
      renderCareerTracksEncyclopedia();
    };
  });

  // فلترة الشبكة حسب التخصص الفرعي (Red Team / Blue Team / إلخ)
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

  // أزرار التكبير والتصغير وملء الشاشة للشبكة
  document.getElementById("btn-net-zoom-in")?.addEventListener("click", () => {
    TracksState.zoom = Math.min(2.2, TracksState.zoom + 0.18);
  });
  document.getElementById("btn-net-zoom-out")?.addEventListener("click", () => {
    TracksState.zoom = Math.max(0.55, TracksState.zoom - 0.18);
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

  // أزرار التحكم في العقدة المختارة من الشبكة
  document.getElementById("btn-toggle-node-mastery")?.addEventListener("click", () => {
    const id = TracksState.selectedNodeId;
    if (!id) return;
    TracksState.masteredNodes[id] = !TracksState.masteredNodes[id];
    saveMasteredNodes();
    renderCareerTracksEncyclopedia();
  });

  document.getElementById("btn-node-to-pomo")?.addEventListener("click", () => {
    const nd = track.nodes.find(n => n.id === TracksState.selectedNodeId) || track.nodes[0];
    const pState = B().getPomodoroState?.();
    if (pState) pState.customTaskName = `دراسة مسار: ${nd.label}`;
    B().setCustomPomodoroTime?.(50, "work");
    B().openPomodoroModal?.();
  });

  document.getElementById("btn-node-to-task")?.addEventListener("click", async () => {
    const nd = track.nodes.find(n => n.id === TracksState.selectedNodeId) || track.nodes[0];
    await B().createRecord?.("tasks", {
      title: `إتقان محطة: ${nd.label} (${track.name})`,
      description: nd.desc,
      dueDate: today(),
      priority: "High",
      status: "Pending",
      category: track.name
    });
  });

  // تعليم الأساسيات كمكتملة
  sec.querySelectorAll("[data-toggle-found]").forEach(btn => {
    btn.onclick = () => {
      const fId = btn.dataset.toggleFound;
      TracksState.masteredNodes[fId] = !TracksState.masteredNodes[fId];
      saveMasteredNodes();
      renderCareerTracksEncyclopedia();
    };
  });

  // تحويل تخصص فرعي كامل (مثل Red Team) إلى مهام في جدول المستخدم
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

  // اعتماد المسار بالكامل في قسم الأهداف والمهام
  document.getElementById("btn-track-to-goals")?.addEventListener("click", async () => {
    await B().createRecord?.("tasks", {
      title: `البدء في مسار: ${track.name}`,
      description: track.foundations.map(f => f.title).join(" | "),
      dueDate: today(),
      priority: "Urgent",
      status: "Pending",
      category: "مسارات البرمجة"
    });
    toast(`تم اعتماد مسار "${track.name}" وإضافته لمهامك بنجاح! 🚀`);
  });

  // مستشار المسارات بالذكاء الاصطناعي
  document.getElementById("btn-ask-track-ai")?.addEventListener("click", async () => {
    const inp = document.getElementById("track-ai-question");
    const out = document.getElementById("track-ai-answer");
    const q = inp?.value.trim() || `اعمل لي خطة عملية لدراسة ${track.name} من الصفر حتى الاحتراف`;
    if (out) out.textContent = "⏳ جاري إعداد الخطة الهندسية بواسطة المستشار الذكي...";
    const reply = await B().askAI?.(`أنت خبير وموجه مهني في مجال (${track.name}). أجب على طلب المستخدم التالي بخطوات عملية مرتبة ومصادر واضحة: "${q}"`);
    if (out) out.textContent = reply;
  });
}

// تشغيل فوري وربط الزرار المباشر في الـ Sidebar والرئيسية
function initCareerTracksSystem() {
  injectTracksStyles();
  
  // تشغيل عند الضغط على أي زر يحمل مسار career-tracks
  document.addEventListener("click", (e) => {
    const btn = e.target.closest('[data-view="career-tracks"], [data-goto="career-tracks"], #nav-btn-career-tracks');
    if (btn) {
      if (B().switchView) B().switchView("career-tracks");
      setTimeout(renderCareerTracksEncyclopedia, 50);
    }
  });

  // تجهيز الصفحة أول مرة
  renderCareerTracksEncyclopedia();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCareerTracksSystem);
} else {
  initCareerTracksSystem();
}

window.renderCareerTracksEncyclopedia = renderCareerTracksEncyclopedia;
