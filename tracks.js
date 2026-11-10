/**
 * ============================================================================
 * MY LIFE OS — UNIVERSITY-GRADE CAREER TRACKS & SKILL NETWORK ENGINE (tracks.js V2)
 * 13 Complete Engineering & Tech Tracks | Prerequisite Engine | 4-Pillar Mastery
 * Deep Node Syllabi (Modules, Mastery Criteria, Proof Project, AI Tutor & Interview Prep)
 * HiDPI Responsive Network Graph + True Fullscreen Mode
 * ============================================================================
 */

function B() {
  return window.MyLifeOSBridge || {};
}

// 1. حماية شاملة للنصوص والـ HTML Attributes
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

// 2. مخزن آمن ضد تلف البيانات في localStorage
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
   1. SCOPED LUXURY CSS (WITH TRUE FULLSCREEN FIX & DEEP INSPECTOR LAYOUT)
   ============================================================================ */
function injectTracksStyles() {
  if (document.getElementById("tracks-encyclopedia-styles")) return;
  const style = document.createElement("style");
  style.id = "tracks-encyclopedia-styles";
  style.textContent = `
    /* إصلاح وضع ملء الشاشة للشبكة وإلغاء تأثير الـ transform الخاص بالسكشن */
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

    .tracks-domain-bar {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(205px, 1fr));
      gap: 10px;
      margin-bottom: 18px;
    }
    .track-domain-pill {
      background: rgba(15, 20, 34, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 11px 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 11px;
      transition: all 0.2s ease;
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
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 18px rgba(212, 167, 44, 0.18);
    }
    .track-domain-icon {
      width: 40px;
      height: 40px;
      min-width: 40px;
      border-radius: 10px;
      background: rgba(212, 167, 44, 0.14);
      color: var(--gold-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.15rem;
    }
    .track-domain-pill.active .track-domain-icon {
      background: var(--gold-primary);
      color: #05070e;
    }

    .track-hero-card {
      background: linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(9, 13, 25, 0.98));
      border: 1px solid rgba(212, 167, 44, 0.38);
      border-radius: 20px;
      padding: 22px 24px;
      margin-bottom: 20px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65);
    }
    .track-why-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 12px;
      margin-top: 14px;
    }
    .track-why-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-right: 3px solid var(--gold-primary);
      border-radius: 12px;
      padding: 12px 14px;
    }

    /* حاوية الشبكة التفاعلية + لوحة فحص المهارة المعمقة */
    .network-graph-shell {
      position: relative;
      background: radial-gradient(circle at 50% 35%, #131c31 0%, #070a12 100%);
      border: 1.5px solid rgba(212, 167, 44, 0.42);
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 22px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.75);
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
    }
    .network-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      padding: 12px 18px;
      background: rgba(9, 13, 25, 0.95);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .network-workspace-split {
      display: grid;
      grid-template-columns: 1.45fr 1fr;
      min-height: 540px;
    }
    .network-graph-shell.is-fullscreen .network-workspace-split {
      flex: 1;
      height: calc(100vh - 62px);
      overflow: hidden;
    }
    @media (max-width: 1150px) {
      .network-workspace-split {
        grid-template-columns: 1fr;
      }
    }
    .network-canvas-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 480px;
      border-inline-end: 1px solid rgba(255, 255, 255, 0.08);
    }
    .network-canvas-viewport {
      width: 100%;
      height: 100%;
      min-height: 480px;
      display: block;
      cursor: grab;
    }
    .network-canvas-viewport:active {
      cursor: grabbing;
    }
    .network-legend-floating {
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: rgba(9, 13, 25, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 6px 12px;
      border-radius: 99px;
      font-size: 0.74rem;
      display: flex;
      gap: 12px;
      pointer-events: none;
    }

    /* لوحة التفاصيل العميقة للمهارة المختارة (Deep Skill Dossier) */
    .node-deep-dossier {
      background: rgba(12, 17, 30, 0.97);
      padding: 18px 20px;
      overflow-y: auto;
      max-height: 620px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .network-graph-shell.is-fullscreen .node-deep-dossier {
      max-height: calc(100vh - 62px);
    }
    .dossier-section-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 12px;
      padding: 12px 14px;
    }
    .dossier-section-box h5 {
      color: var(--gold-primary);
      font-size: 0.85rem;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .module-lesson-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 5px 0;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
      font-size: 0.83rem;
    }
    .module-lesson-item:last-child {
      border-bottom: none;
    }
    .mastery-pillar-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 6px 8px;
      background: rgba(9, 13, 25, 0.65);
      border-radius: 8px;
      margin-bottom: 6px;
      font-size: 0.8rem;
      cursor: pointer;
    }
    .mastery-pillar-row input[type="checkbox"] {
      width: 16px;
      height: 16px;
      accent-color: var(--emerald-primary);
      cursor: pointer;
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
   2. DEEP SYLLABUS ENRICHER (PROVIDES MODULES, CRITERIA & PROOF PROJECT FOR ANY NODE)
   ============================================================================ */
const DEEP_NODE_SYLLABUS = {
  // Cybersecurity Deep Nodes
  n_net: {
    phase: "Phase 1 • Beginner Foundation",
    hours: "45 ساعة",
    modules: [
      "1. Computer Networks & OSI / TCP-IP Models (Encapsulation & Packets)",
      "2. IP Addressing: IPv4, IPv6, Subnetting, CIDR & NAT/PAT",
      "3. Transport & Network Protocols: TCP 3-Way Handshake, UDP, ICMP, ARP",
      "4. Application Protocols: HTTP/HTTPS Headers, DNS Resolution, DHCP, SMB, SSH",
      "5. Network Devices & Security: Switches (VLANs), Routers, Firewalls, VPN, IDS/IPS",
      "6. Packet Analysis Lab: Wireshark Filters, PCAP Inspection & Traffic Tracing"
    ],
    criteria: "القدرة على تقسيم أي شبكة (Subnetting) يدوياً، وتحليل ملف PCAP داخل Wireshark لاستخراج طلبات HTTP و DNS وكشف جلسات الاتصال غير الطبيعية.",
    project: "بناء شبكة مؤسسية مؤمنة على Packet Tracer/GNS3 تضم 3 VLANs مع Firewall Rules وتحليل حركة المرور بـ Wireshark."
  },
  n_lin: {
    phase: "Phase 1 • Beginner Foundation",
    hours: "35 ساعة",
    modules: [
      "1. Linux Architecture, File System Hierarchy (/etc, /var, /proc) & Terminal Navigation",
      "2. Users, Groups, File Permissions (chmod, chown, SUID/SGID) & Sudoers",
      "3. Process Management (ps, top, systemctl, cronjobs) & Services",
      "4. Linux Networking (ip, netstat/ss, iptables/ufw, SSH Key Auth)",
      "5. Bash Scripting Automation (Loops, Conditions, Grep/Awk/Sed, Pipes)"
    ],
    criteria: "إدارة سيرفر لينكس بالكامل من الـ Terminal بدون واجهة رسومية، وكتابة سكربت Bash يؤتمت فحص المنافذ والسجلات.",
    project: "كتابة أداة Bash Recon & Log Analyzer تقوم بفحص السيرفر واستخراج محاولات الدخول الفاشلة عبر SSH تلقائياً."
  },
  n_win: {
    phase: "Phase 1 • Beginner Foundation",
    hours: "35 ساعة",
    modules: [
      "1. Windows Internals: Processes, Threads, Services, Registry & Win32 APIs",
      "2. Active Directory Architecture: Domains, Trees, Forests, Domain Controllers",
      "3. Authentication Protocols: Kerberos Tickets (TGT/TGS) & NTLM Hashes",
      "4. Group Policy Objects (GPOs), Organizational Units (OUs) & ACLs",
      "5. PowerShell Administration & Scripting for Security"
    ],
    criteria: "فهم كيف يعمل Active Directory وبروتوكول Kerberos، وإعداد Domain Controller محلي مع مستخدمين وصلاحيات.",
    project: "بناء مختبر Active Directory كامل على VMware (Windows Server + 2 Clients) وتطبيق سياسات تأمين GPO."
  },
  n_code: {
    phase: "Phase 1 • Beginner Foundation",
    hours: "40 ساعة",
    modules: [
      "1. Python Fundamentals & Data Structures (Lists, Dicts, Files, Exceptions)",
      "2. Network & Web Scripting in Python (Requests, Sockets, BeautifulSoup, Scapy)",
      "3. JavaScript DOM & Browser Execution (Understanding Cookies, LocalStorage, Fetch)",
      "4. Relational Databases & SQL Queries (SELECT, JOIN, UNION — Key to SQLi)"
    ],
    criteria: "القدرة على قراءة أي كود ويب أو سكربت استغلال وتعديله، وبناء أدوات فحص شبكات خاصة بك بلغة بايثون.",
    project: "برمجة أداة Multi-Threaded Port Scanner & Subdomain Enumerator بلغة Python من الصفر."
  },
  n_secplus: {
    phase: "Phase 2 • Core Security",
    hours: "40 ساعة",
    modules: [
      "1. Cryptography: Symmetric (AES), Asymmetric (RSA/ECC), Hashing (SHA) & PKI Certificates",
      "2. Identity & Access Management (IAM): MFA, SSO, OAuth2, SAML, Least Privilege",
      "3. Threats, Vulnerabilities & Mitigations (Phishing, Malware, Social Engineering)",
      "4. Security Architecture, Zero Trust, Cloud Security Basics & Incident Response"
    ],
    criteria: "التمييز الدقيق بين أنواع التشفير والتوقيع الرقمي، وفهم دورة حياة الهجمة (Cyber Kill Chain) وطرق صدها.",
    project: "إعداد وثيقة تقييم مخاطر وتأمين شامل (Security Hardening Guide) لنظام ويب وقاعدة بيانات."
  },
  n_websec: {
    phase: "Phase 2 • Intermediate Specialization",
    hours: "60 ساعة",
    modules: [
      "1. Web Proxies Mastery: Burp Suite Pro / Caido (Repeater, Intruder, Decoder)",
      "2. Injection Attacks: SQL Injection (Union, Blind, Time-based), Command Injection, SSTI",
      "3. Client-Side Attacks: XSS (Reflected, Stored, DOM), CSRF, Clickjacking, CORS",
      "4. Broken Access Control (IDOR, Privilege Escalation) & Authentication Bypass (JWT)",
      "5. Server-Side Attacks: SSRF, XXE, File Upload RCE & Business Logic Flaws"
    ],
    criteria: "إنهاء مسارات PortSwigger Web Security Academy الأساسية والمتوسطة وحل 40+ مختبراً عملياً بدون مساعدة.",
    project: "إجراء اختبار اختراق شامل لتطبيق OWASP Juice Shop وتقديم تقرير Pentest Report احترافي بالثغرات والحلول."
  },
  n_netpen: {
    phase: "Phase 2 • Intermediate Specialization",
    hours: "65 ساعة",
    modules: [
      "1. Enumeration & Scanning: Nmap Advanced Scripting, SMB, SNMP, LDAP, RPC",
      "2. Initial Access & Exploitation: Metasploit, Public Exploits Modification",
      "3. Linux & Windows Privilege Escalation (Kernel, SUID, Cron, Token Impersonation)",
      "4. Active Directory Attacks: Kerberoasting, AS-REP Roasting, Pass-the-Hash, BloodHound",
      "5. Pivoting, Port Forwarding & Tunneling (Chisel, Ligolo-ng, Proxychains)"
    ],
    criteria: "القدرة على اختراق شبكة مكونة من عدة أجهزة (Multi-Host AD Lab) والوصول لصلاحيات Domain Admin.",
    project: "حل 25 جهازاً متنوعاً على HackTheBox / TryHackMe وتوثيق منهجية الاختراق (Walkthroughs) في مدونتك."
  },
  n_siem: {
    phase: "Phase 2 • Intermediate Specialization",
    hours: "55 ساعة",
    modules: [
      "1. SOC Operations, Alert Triage & Playbooks (L1 & L2 Analyst Workflow)",
      "2. Windows Event Logs & Sysmon Deep Dive (Event IDs 4624, 4625, 4688, Sysmon 1, 3, 11)",
      "3. SIEM Engineering & Search Queries: Splunk SPL, ELK KQL & Wazuh Rules",
      "4. Network Intrusion Detection: Suricata / Snort Rules & Zeek Logs"
    ],
    criteria: "بناء استعلامات بحث متقدمة على Splunk/ELK لكشف هجمات Brute Force و PowerShell المشبوهة و Lateral Movement.",
    project: "بناء مختبر Home SOC باستخدام Wazuh + Sysmon + ELK ومحاكاة هجوم حقيقي وكتابة قاعدة كشف (Detection Rule) له."
  },
  n_dfir: {
    phase: "Phase 3 • Advanced Specialization",
    hours: "50 ساعة",
    modules: [
      "1. Digital Forensics Artifacts: Windows Registry, Prefetch, Amcache, Shimcache, MFT",
      "2. Memory Forensics with Volatility 3 (Detecting Process Hollowing & Injected Code)",
      "3. Incident Response Lifecycle (PICERL) & Ransomware Containment",
      "4. Proactive Threat Hunting with MITRE ATT&CK & Velociraptor / KAPE"
    ],
    criteria: "تحليل صورة ذاكرة (Memory Dump) وصورة قرص لجهاز مخترق وتحديد نقطة الدخول والملف الخبيث بدقة.",
    project: "حل سيناريو تحقيق جنائي كامل على منصة CyberDefenders وكتابة تقرير Incident Response رسمي."
  }
};

function getNodeRichDetails(track, node) {
  const custom = DEEP_NODE_SYLLABUS[node.id];
  const tierLabels = [
    "Phase 1 • التأسيس الإجباري (Beginner)",
    "Phase 2 • المهارات الجوهرية (Intermediate)",
    "Phase 3 • التخصص المتقدم (Advanced)",
    "Phase 4 • الاحتراف والأنظمة (Professional)",
    "Phase 5 • الإتقان والشهادات (Mastery & Career)"
  ];
  const phase = custom?.phase || tierLabels[Math.min(4, node.tier || 0)];
  const hours = custom?.hours || `${25 + (node.tier || 0) * 10} ساعة تدريبية`;

  // استخراج المتطلبات السابقة تلقائياً من روابط الشبكة (Prerequisite Engine)
  const prereqIds = (track.edges || [])
    .filter(([from, to]) => to === node.id)
    .map(([from]) => from);
  const prereqNodes = prereqIds
    .map(pid => track.nodes.find(n => n.id === pid))
    .filter(Boolean);

  const modules = custom?.modules || [
    `1. المفاهيم النظرية والمعمارية الأساسية لـ ${node.label}`,
    `2. الأدوات القياسية وإعداد بيئة العمل الخاصة بـ ${node.label}`,
    `3. التطبيق العملي المتدرج: ${node.desc}`,
    `4. أفضل الممارسات الهندسية (Best Practices) وتجنب الأخطاء الشائعة`,
    `5. اختبارات الأداء والتأمين والتوثيق الاحترافي في بيئة الإنتاج`
  ];

  const criteria = custom?.criteria || `القدرة على شرح وتطبيق (${node.label}) عملياً من الصفر بدون الاعتماد على الشروحات، وحل المشكلات التقنية المرتبطة بـ (${node.desc}) بكفاءة.`;
  const project = custom?.project || `بناء مشروع تطبيقي متكامل في (${node.label}) يوظف (${node.desc}) ورفعه على GitHub مع توثيق هندسي كامل.`;

  return { phase, hours, prereqNodes, modules, criteria, project };
}

/* ============================================================================
   3. DATABASE OF ALL 13 UNIVERSITY-GRADE CAREER TRACKS
   ============================================================================ */
const CAREER_TRACKS_DB = [
  // 1. CYBERSECURITY (الأمن السيبراني - 6 تخصصات)
  {
    id: "cybersecurity",
    name: "1. الأمن السيبراني (Cybersecurity)",
    shortTag: "Red / Blue / Bug Bounty / CloudSec",
    icon: "fa-shield-halved",
    accent: "#EF4444",
    introTitle: "🛡️ جامعة الأمن السيبراني الشاملة: من التأسيس الشبكي إلى الاحتراف العالمي",
    introText: "الأمن السيبراني هو علم حماية الأنظمة، الشبكات، الخوادم، والتطبيقات من الهجمات الرقمية. يبدأ المسار إجبارياً بإتقان الشبكات وأنظمة التشغيل والبرمجة، ثم يتفرع إلى 6 مسارات مهنية متكاملة مع خريطة شبكية توضح الدروس والمتطلبات والمشروع الإثباتي لكل مهارة.",
    whyPoints: [
      { title: "🧱 لا تتجاوز الأساسيات", desc: "محرك المتطلبات في الشبكة يوضح لك أن إتقان الشبكات ولينكس وويندوز هو الشرط الأساسي قبل الدخول في اختبار الاختراق أو الـ SOC." },
      { title: "🔬 إتقان حقيقي بـ 4 أركان", desc: "كل مهارة في الشبكة تحتوي على وحداتها الدراسية، شرط الإتقان، ومشروع عملي يثبت كفاءتك." },
      { title: "🤖 تعلم بالـ AI واليوتيوب", desc: "اضغط على أي مهارة في الشبكة ليقوم الذكاء الاصطناعي بشرح دروسها أو اختبارك بأسئلة مقابلات العمل." }
    ],
    foundations: [
      { id: "cy_f1", title: "1. هندسة الشبكات (CCNA / CompTIA Network+)", desc: "OSI, TCP/IP, IPv4/Subnetting, DNS, HTTP/S, Routing, Switching, Firewalls, Wireshark.", yt: "Eng. Ahmed Nazmy / Jeremy's IT Lab" },
      { id: "cy_f2", title: "2. إدارة نظام لينكس (Linux & Bash Scripting)", desc: "Terminal, Permissions, Processes, Networking, SSH, Cron, Bash Automation.", yt: "NetworkChuck / الدسوقي / Elzero" },
      { id: "cy_f3", title: "3. ويندوز و Active Directory Internals", desc: "Domain Controllers, Kerberos, NTLM, GPOs, PowerShell, Windows Registry & Services.", yt: "The Cyber Mentor (TCM) / John Hammond" },
      { id: "cy_f4", title: "4. البرمجة للسايبر (Python, Bash, JS & SQL)", desc: "أتمتة الأدوات بـ Python وفهم ثغرات الويب XSS & SQL Injection.", yt: "Elzero Web School / freeCodeCamp" },
      { id: "cy_f5", title: "5. أساسيات الأمن السيبراني (CompTIA Security+)", desc: "التشفير، إدارة الهوية IAM، تحليل المخاطر، أنواع الهجمات، وهندسة الدفاع.", yt: "Professor Messer Security+ SY0-701" }
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
        mission: "مراقبة الشبكات، تحليل السجلات عبر SIEM، صيد التهديدات (Threat Hunting)، والاستجابة للحوادث الجنائية.",
        skills: ["SIEM Engineering (Splunk/ELK)", "Sysmon & Event Logs", "Packet Analysis (PCAP)", "Memory & Disk Forensics", "Incident Response", "YARA & Sigma Rules"],
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
      { name: "PortSwigger Web Security Academy", type: "معامل أمن ويب مجانية بالكامل", url: "https://portswigger.net/web-security" },
      { name: "TryHackMe & HackTheBox Academy", type: "معامل Red Team & Blue Team متدرجة", url: "https://tryhackme.com" },
      { name: "CyberDefenders (Blue Team & DFIR Labs)", type: "أقوى منصة عربية/عالمية للفريق الأزرق", url: "https://cyberdefenders.org" }
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

  // 2. FULL-STACK WEB ENGINEERING (15 متكاملة المراحل + 4 تخصصات)
  {
    id: "fullstack",
    name: "2. تطوير الويب الشامل (Full-Stack Web)",
    shortTag: "15 Phases • React / Next / Backend / Arch",
    icon: "fa-laptop-code",
    accent: "#D4A72C",
    introTitle: "🌐 جامعة هندسة الويب الشاملة (15 مرحلة من الصفر إلى معماري أنظمة)",
    introText: "مسار متكامل يغطي الـ 15 مرحلة الهندسية لتطوير الويب: من أساسيات البرمجة و HTML/CSS و JavaScript العميقة و TypeScript و React و Next.js، مروراً بهندسة الخوادم وقواعد البيانات والتوثيق والاختبارات والأمن وتصميم الأنظمة (System Design) والنشر السحابي.",
    whyPoints: [
      { title: "🏛️ منهج من 15 مرحلة", desc: "كل عقدة في الشبكة تمثل مرحلة كاملة بدروسها ومتطلباتها ومشروعها التطبيقي." },
      { title: "⚡ Frontend + Backend + DevOps", desc: "تأهيل كامل لبناء منصات SaaS حقيقية عالية الأداء والأمان." }
    ],
    foundations: [
      { id: "fs_f1", title: "1. Programming Fundamentals & Internet Mechanics", desc: "HTTP/HTTPS, DNS, Browser Rendering Engine, Git & GitHub Workflow.", yt: "Elzero Web School / CS50" },
      { id: "fs_f2", title: "2. HTML5 Semantic & CSS3 Mastery (Flexbox, Grid, Responsive)", desc: "بناء واجهات متجاوبة ومعايير الوصول القياسية.", yt: "Elzero / Kevin Powell" },
      { id: "fs_f3", title: "3. JavaScript Deep Dive (ES6+, Event Loop, Closures, Async)", desc: "إتقان محرك الجافاسكريبت والتعامل مع الـ DOM والـ APIs.", yt: "Elzero JS Bootcamp / Jonas" }
    ],
    roles: [
      {
        id: "frontend_arch",
        title: "🎨 معماري واجهات أمامية (Frontend & UI Architect)",
        mission: "تصميم وبناء تطبيقات ويب تفاعلية فائقة السرعة بـ React و Next.js و TypeScript.",
        skills: ["TypeScript", "React 19 & Hooks", "Next.js App Router", "State Management (Zustand/Redux)", "Tailwind CSS & Design Systems", "Web Vitals & Performance"],
        tools: ["VS Code", "Vite", "Next.js", "Tailwind", "Playwright", "Storybook"],
        certs: ["Meta Front-End Professional", "Frontend Masters Senior Path"]
      },
      {
        id: "backend_arch",
        title: "⚙️ معماري خوادم وقواعد بيانات (Backend & Database Architect)",
        mission: "بناء APIs مؤمنة وعالية الكفاءة وإدارة قواعد البيانات العلائقية والـ NoSQL والكاش.",
        skills: ["Node.js (NestJS/Express)", "PostgreSQL & Indexing", "MongoDB / Firebase / Redis", "Authentication (OAuth2, JWT, RBAC)", "Message Queues (RabbitMQ/BullMQ)", "REST & GraphQL"],
        tools: ["Node.js", "PostgreSQL", "Prisma", "Redis", "Docker", "Postman"],
        certs: ["AWS Certified Developer", "OpenJS Node.js Services Developer"]
      },
      {
        id: "system_design",
        title: "🏛️ مهندس أنظمة موزعة وإنتاج (System Design & Production Lead)",
        mission: "تصميم الأنظمة القابلة للتوسع، تأمين التطبيقات، أتمتة الاختبارات، والنشر السحابي.",
        skills: ["System Design & Scalability", "Load Balancing & CDNs", "Unit & E2E Testing", "Web Security (OWASP)", "Docker & CI/CD Deployment"],
        tools: ["Docker", "Nginx", "GitHub Actions", "Cloudflare", "Vercel / AWS"],
        certs: ["AWS Solutions Architect", "Full-Stack Open (Helsinki)"]
      }
    ],
    resources: [
      { name: "Elzero Web School (أكاديمية الزيرو)", type: "مسارات الفرونت إند والباك إند الكاملة", url: "https://elzero.org" },
      { name: "Full Stack Open (University of Helsinki)", type: "المنهج الجامعي الكامل لـ React, Node, TS, GraphQL", url: "https://fullstackopen.com/en/" }
    ],
    nodes: [
      { id: "w_p1", label: "1. HTML5, CSS3 & Git", tier: 0, row: 0.5, role: "frontend_arch", desc: "المرحلة 1 و 2: أساسيات الويب والتصميم المتجاوب و Git" },
      { id: "w_p3", label: "2. JavaScript Deep Dive", tier: 0, row: 2.2, role: "frontend_arch", desc: "المرحلة 3: ES6+, Async/Await, Closures & DOM" },
      { id: "w_p4", label: "3. TypeScript Mastery", tier: 1, row: 0.5, role: "frontend_arch", desc: "المرحلة 4: الأنواع الصارمة والـ Generics و Interfaces" },
      { id: "w_p8", label: "4. Backend (Node.js / NestJS)", tier: 1, row: 2.2, role: "backend_arch", desc: "المرحلة 8: بناء الخوادم و REST/GraphQL APIs" },
      { id: "w_p5", label: "5. React & Advanced React", tier: 2, row: 0, role: "frontend_arch", desc: "المرحلة 5 و 6: Hooks, Context, Zustand & Performance" },
      { id: "w_p9", label: "6. Database Eng (SQL & NoSQL)", tier: 2, row: 1.5, role: "backend_arch", desc: "المرحلة 9: PostgreSQL, Prisma, Firebase & Redis Caching" },
      { id: "w_p10", label: "7. Auth & Web Security", tier: 2, row: 3, role: "backend_arch", desc: "المرحلة 10 و 12: JWT, OAuth2, RBAC & OWASP Protection" },
      { id: "w_p7", label: "8. Next.js Full-Stack SSR", tier: 3, row: 0.3, role: "frontend_arch", desc: "المرحلة 7: Server Components, Actions & Full-Stack Apps" },
      { id: "w_p11", label: "9. Testing (Vitest & Playwright)", tier: 3, row: 1.7, role: "system_design", desc: "المرحلة 11: Unit, Integration & E2E Automated Testing" },
      { id: "w_p13", label: "10. System Design & Cloud CI/CD", tier: 3, row: 3, role: "system_design", desc: "المرحلة 13 و 14: Docker, Nginx, Scalability & Deployment" },
      { id: "w_p15", label: "🏆 11. Production SaaS Capstone", tier: 4, row: 1.5, role: "system_design", desc: "المرحلة 15: بناء وإطلاق منصة SaaS إنتاجية متكاملة" }
    ],
    edges: [
      ["w_p1", "w_p3"], ["w_p3", "w_p4"], ["w_p3", "w_p8"],
      ["w_p4", "w_p5"], ["w_p8", "w_p9"], ["w_p8", "w_p10"],
      ["w_p5", "w_p7"], ["w_p9", "w_p7"], ["w_p9", "w_p13"],
      ["w_p7", "w_p11"], ["w_p10", "w_p13"], ["w_p11", "w_p15"], ["w_p13", "w_p15"]
    ]
  },

  // 3. AI, MACHINE LEARNING & DATA SCIENCE
  {
    id: "ai_data",
    name: "3. الذكاء الاصطناعي (AI & GenAI)",
    shortTag: "ML / Deep Learning / LLMs / MLOps",
    icon: "fa-brain",
    accent: "#10B981",
    introTitle: "🤖 جامعة الذكاء الاصطناعي، التعلم العميق، وهندسة الـ LLMs",
    introText: "مسار هندسي يبدأ بالرياضيات التأسيسية وبايثون، ثم يتدرج عبر خوارزميات تعلم الآلة الكلاسيكية والشبكات العصبية العميقة (PyTorch) وصولاً إلى بناء وكلاء الذكاء الاصطناعي التوليدي (AI Agents & RAG) ونشر النماذج في الإنتاج.",
    whyPoints: [
      { title: "📐 تأسيس رياضي وبرمجي", desc: "يربط بين الجبر الخطي والاحتمالات وبين كتابة الكود التطبيقي." },
      { title: "🚀 تركيز على GenAI & RAG", desc: "يغطي أحدث تقنيات ربط النماذج اللغوية بقواعد البيانات المتجهة Vector DBs." }
    ],
    foundations: [
      { id: "ai_f1", title: "1. Python, NumPy, Pandas & Data Visualization", desc: "معالجة المصفوفات وتنظيف البيانات.", yt: "Hesham Asem / Kaggle" },
      { id: "ai_f2", title: "2. Math for AI (Linear Algebra, Calculus, Probability)", desc: "المصفوفات، الاشتقاق، والإحصاء.", yt: "3Blue1Brown / StatQuest" }
    ],
    roles: [
      { id: "ml_eng", title: "🤖 مهندس تعلم آلة وتعلم عميق (ML & DL Engineer)", mission: "بناء وتدريب نماذج التنبؤ والرؤية الحاسوبية.", skills: ["Scikit-Learn", "PyTorch", "CNNs & Vision", "Model Tuning"], tools: ["PyTorch", "Jupyter", "OpenCV", "WandB"], certs: ["Andrew Ng ML & DL Specializations"] },
      { id: "llm_genai", title: "✨ مهندس نماذج لغوية ووكلاء ذكاء (LLM & RAG Engineer)", mission: "تطوير أنظمة الدردشة الذكية والبحث الدلالي و Fine-Tuning.", skills: ["Transformers", "LangChain / LlamaIndex", "Vector DBs", "LoRA Fine-Tuning", "AI Agents"], tools: ["HuggingFace", "Qdrant / Pinecone", "vLLM", "Ollama"], certs: ["DeepLearning.AI GenAI", "HuggingFace NLP"] },
      { id: "mlops_eng", title: "⚙️ مهندس نشر وتشغيل نماذج الذكاء (MLOps Engineer)", mission: "نشر النماذج عبر APIs ومراقبة أدائها في السحابة.", skills: ["FastAPI Model Serving", "Docker & K8s for GPU", "MLflow", "Model Monitoring"], tools: ["FastAPI", "MLflow", "Docker", "BentoML"], certs: ["AWS Certified Machine Learning"] }
    ],
    resources: [
      { name: "د. هشام عاصم & DeepLearning.AI", type: "كورسات الذكاء الاصطناعي الكاملة", url: "https://www.deeplearning.ai" }
    ],
    nodes: [
      { id: "a_py", label: "Python, NumPy & Pandas", tier: 0, row: 0.5, role: "ml_eng", desc: "البرمجة وتحليل وتنظيف البيانات" },
      { id: "a_math", label: "Linear Algebra, Calculus & Stats", tier: 0, row: 2.2, role: "ml_eng", desc: "الرياضيات الأساسية لتعلم الآلة" },
      { id: "a_ml", label: "Classical ML (Scikit-Learn)", tier: 1, row: 1.3, role: "ml_eng", desc: "خوارزميات الانحدار، التصنيف، و XGBoost" },
      { id: "a_dl", label: "Deep Learning (PyTorch)", tier: 2, row: 0.5, role: "ml_eng", desc: "الشبكات العصبية العميقة والتدريب" },
      { id: "a_cv", label: "Computer Vision & NLP", tier: 2, row: 2.2, role: "ml_eng", desc: "الرؤية الحاسوبية ومعالجة اللغات" },
      { id: "a_llm", label: "LLMs, RAG & AI Agents", tier: 3, row: 1.3, role: "llm_genai", desc: "النماذج اللغوية العملاقة وقواعد Vector DBs" },
      { id: "a_mlops", label: "🏆 MLOps & FastAPI Serving", tier: 4, row: 1.3, role: "mlops_eng", desc: "نشر ومراقبة نماذج الذكاء الاصطناعي في الإنتاج" }
    ],
    edges: [
      ["a_py", "a_ml"], ["a_math", "a_ml"], ["a_ml", "a_dl"], ["a_ml", "a_cv"],
      ["a_dl", "a_llm"], ["a_cv", "a_llm"], ["a_llm", "a_mlops"]
    ]
  },

  // 4. MOBILE APP ENGINEERING
  {
    id: "mobile",
    name: "4. تطبيقات الموبايل (Mobile Dev)",
    shortTag: "Flutter / React Native / Native",
    icon: "fa-mobile-screen-button",
    accent: "#06B6D4",
    introTitle: "📱 جامعة هندسة تطبيقات الهواتف الذكية (Cross-Platform & Native)",
    introText: "إتقان بناء تطبيقات الموبايل الاحترافية لأندرويد و iOS باستخدام Flutter أو React Native أو اللغات الأصلية (Kotlin / Swift) مع الهندسة النظيفة Clean Architecture.",
    whyPoints: [
      { title: "🦋 Flutter & Native", desc: "يغطي المسار بناء التطبيقات العابرة للمنصات والتطبيقات الأصلية عالية الأداء." }
    ],
    foundations: [
      { id: "mb_f1", title: "1. OOP, Data Structures & Async Programming", desc: "البرمجة الكائنية والعمليات غير المتزامنة.", yt: "ثروت سامي / عبدالله منصور" },
      { id: "mb_f2", title: "2. RESTful APIs, JSON Serialization & Git", desc: "التخاطب مع الخوادم وإدارة الكود.", yt: "Elzero / Philipp Lackner" }
    ],
    roles: [
      { id: "flutter_dev", title: "🦋 مهندس فلاتر (Flutter Architect)", mission: "بناء تطبيقات أندرويد و iOS بكود موحد.", skills: ["Dart", "Flutter UI & Animations", "Bloc / Riverpod", "Clean Architecture", "Firebase"], tools: ["VS Code", "Android Studio", "Flutter DevTools"], certs: ["Flutter Complete Bootcamp"] },
      { id: "rn_dev", title: "⚛️ مهندس React Native & Expo", mission: "بناء تطبيقات موبايل بـ TypeScript و React.", skills: ["TypeScript", "React Native & Expo", "Reanimated", "Zustand"], tools: ["Expo", "VS Code", "Metro"], certs: ["Meta React Native Specialist"] },
      { id: "native_dev", title: "🤖 مهندس أندرويد/iOS أصلي (Kotlin / Swift)", mission: "تطوير تطبيقات أصلية بـ Jetpack Compose و SwiftUI.", skills: ["Kotlin / Swift", "Jetpack Compose / SwiftUI", "Coroutines", "Room DB"], tools: ["Android Studio", "Xcode", "Gradle"], certs: ["Associate Android Developer"] }
    ],
    resources: [
      { name: "ثروت سامي & عبدالله منصور & Philipp Lackner", type: "مسارات Flutter & Android العملية", url: "https://www.youtube.com/@tharwatsamy" }
    ],
    nodes: [
      { id: "m_oop", label: "Dart / Kotlin / TS & OOP", tier: 0, row: 1.2, role: "flutter_dev", desc: "إتقان لغة البرمجة والبرمجة الكائنية" },
      { id: "m_ui", label: "Responsive UI & Animations", tier: 1, row: 0.4, role: "flutter_dev", desc: "تصميم الواجهات المتجاوبة والحركات" },
      { id: "m_api", label: "REST APIs, Auth & Local DB", tier: 1, row: 2.2, role: "rn_dev", desc: "ربط السيرفر والتخزين المحلي SQLite/Hive" },
      { id: "m_state", label: "State Mgmt (Bloc / Riverpod)", tier: 2, row: 0.4, role: "flutter_dev", desc: "إدارة الحالة المتقدمة للتطبيقات" },
      { id: "m_arch", label: "Clean Architecture & Testing", tier: 2, row: 2.2, role: "native_dev", desc: "الهندسة النظيفة واختبار الوحدات" },
      { id: "m_store", label: "🏆 CI/CD & App Store Release", tier: 3, row: 1.2, role: "flutter_dev", desc: "النشر المؤتمت على Google Play و App Store" }
    ],
    edges: [
      ["m_oop", "m_ui"], ["m_oop", "m_api"], ["m_ui", "m_state"],
      ["m_api", "m_state"], ["m_api", "m_arch"], ["m_state", "m_store"], ["m_arch", "m_store"]
    ]
  },

  // 5. CLOUD COMPUTING, DEVOPS & SRE (موسع إلى 3 تخصصات)
  {
    id: "devops_cloud",
    name: "5. السحابة والديف أوبس (Cloud & DevOps)",
    shortTag: "Docker / K8s / AWS / Terraform / SRE",
    icon: "fa-cloud-arrow-up",
    accent: "#8B5CF6",
    introTitle: "☁️ جامعة الحوسبة السحابية، الديف أوبس، وهندسة موثوقية الأنظمة (SRE)",
    introText: "تحويل البنية التحتية إلى كود مؤتمت (IaC)، إدارة مجموعات Kubernetes، بناء أنابيب النشر المستمر CI/CD، ومراقبة الخوادم السحابية.",
    whyPoints: [
      { title: "♾️ 3 تخصصات متكاملة", desc: "مهندس DevOps، معماري سحابة Cloud Architect، ومهندس موثوقية الأنظمة SRE." }
    ],
    foundations: [
      { id: "dv_f1", title: "1. Linux Server Administration & Bash/Python", desc: "إدارة السيرفرات والصلاحيات والشبكات.", yt: "TechWorld with Nana" },
      { id: "dv_f2", title: "2. Networking, DNS, Reverse Proxies (Nginx) & SSL", desc: "توجيه الترافيك وتأمين الاتصالات.", yt: "Hussein Nasser / KodeKloud" }
    ],
    roles: [
      { id: "devops_eng", title: "♾️ مهندس ديف أوبس و CI/CD (DevOps Engineer)", mission: "أتمتة بناء واختبار ونشر البرمجيات.", skills: ["Docker", "GitHub Actions / GitLab CI", "Ansible", "ArgoCD GitOps"], tools: ["Docker", "GitHub Actions", "ArgoCD", "Ansible"], certs: ["Docker Associate", "GitLab Certified"] },
      { id: "cloud_arch", title: "☁️ معماري حلول سحابية (Cloud Solutions Architect)", mission: "تصميم الشبكات والخوادم السحابية على AWS / Azure.", skills: ["AWS VPC, EC2, S3, RDS, IAM", "Serverless", "Terraform IaC", "Cost Optimization"], tools: ["AWS", "Terraform", "CloudFormation"], certs: ["AWS SAA-C03", "Terraform Associate"] },
      { id: "sre_eng", title: "🛡️ مهندس موثوقية الأنظمة والـ Kubernetes (SRE)", mission: "ضمان عمل الأنظمة بنسبة 99.99% ومراقبة الأداء.", skills: ["Kubernetes (K8s) & Helm", "Prometheus & Grafana", "ELK Logging", "Chaos Engineering"], tools: ["Kubernetes", "Helm", "Prometheus", "Grafana"], certs: ["CKA (Kubernetes Admin)", "CKAD"] }
    ],
    resources: [
      { name: "TechWorld with Nana & KodeKloud", type: "شرح عملي لـ Docker, K8s, Terraform, AWS", url: "https://www.youtube.com/@TechWorldwithNana" }
    ],
    nodes: [
      { id: "d_lin", label: "Linux, Bash & Nginx", tier: 0, row: 1.2, role: "devops_eng", desc: "إدارة السيرفرات والشبكات" },
      { id: "d_dock", label: "Docker & Containers", tier: 1, row: 0.4, role: "devops_eng", desc: "بناء وتشغيل الحاويات المعزولة" },
      { id: "d_cicd", label: "CI/CD Pipelines (GitHub/GitLab)", tier: 1, row: 2.2, role: "devops_eng", desc: "أتمتة الاختبار والنشر المستمر" },
      { id: "d_aws", label: "Cloud Infrastructure (AWS/Azure)", tier: 2, row: 0.4, role: "cloud_arch", desc: "الشبكات والخوادم السحابية" },
      { id: "d_k8s", label: "Kubernetes (K8s) & Helm", tier: 2, row: 2.2, role: "sre_eng", desc: "تنسيق وإدارة آلاف الحاويات" },
      { id: "d_tf", label: "Terraform IaC & GitOps", tier: 3, row: 0.6, role: "cloud_arch", desc: "البنية التحتية ككود برمجي" },
      { id: "d_sre", label: "🏆 Prometheus, Grafana & SRE", tier: 3, row: 2.0, role: "sre_eng", desc: "المراقبة اللحظية والاعتمادية العالية" }
    ],
    edges: [
      ["d_lin", "d_dock"], ["d_lin", "d_cicd"], ["d_dock", "d_aws"], ["d_dock", "d_k8s"],
      ["d_cicd", "d_k8s"], ["d_aws", "d_tf"], ["d_k8s", "d_sre"], ["d_tf", "d_sre"]
    ]
  },

  // 6. EMBEDDED SYSTEMS, IOT & DIGITAL LOGIC (3 تخصصات)
  {
    id: "embedded",
    name: "6. الأنظمة المدمجة والهاردوير (Embedded)",
    shortTag: "Embedded C / ARM / RTOS / FPGA",
    icon: "fa-microchip",
    accent: "#F59E0B",
    introTitle: "🔌 جامعة الأنظمة المدمجة، برمجة السيارات AUTOSAR، وتصميم الدوائر الرقمية FPGA",
    introText: "الربط الهندسي العميق بين الدوائر الرقمية والإلكترونيات وبين برمجة المتحكمات الدقيقة بلغة C/C++ وأنظمة الوقت الحقيقي.",
    whyPoints: [
      { title: "🚗 برمجة السيارات والكروت الذكية", desc: "يغطي مسار Embedded Software ومسار Digital IC / FPGA ومسار IoT." }
    ],
    foundations: [
      { id: "em_f1", title: "1. Digital Logic Design & Basic Electronics", desc: "Logic Gates, Flip-Flops, Counters, FSM, Computer Architecture.", yt: "Neso Academy / د. وليد عيسى" },
      { id: "em_f2", title: "2. Embedded C, Pointers & Memory Layout", desc: "Bitwise manipulation, Volatile, Structs, Interrupts.", yt: "م. محمد طارق / م. أمجد سمير" }
    ],
    roles: [
      { id: "emb_sw", title: "📟 مهندس برمجيات مدمجة وسيارات (Embedded & AUTOSAR)", mission: "كتابة Drivers وأنظمة RTOS للسيارات والأجهزة.", skills: ["Embedded C/C++", "AVR & ARM STM32", "UART/SPI/I2C/CAN", "FreeRTOS", "AUTOSAR"], tools: ["STM32CubeIDE", "Keil", "Proteus", "CANoe"], certs: ["ARM Accredited Engineer"] },
      { id: "fpga_ic", title: "🔬 مهندس تصميم رقمي و (Digital IC & FPGA)", mission: "تصميم المعالجات والدوائر بـ Verilog و VHDL.", skills: ["Digital Logic", "Verilog & SystemVerilog", "FPGA Synthesis", "STA & UVM"], tools: ["Vivado", "ModelSim", "Quartus"], certs: ["Xilinx FPGA Design"] },
      { id: "iot_eng", title: "📡 مهندس إنترنت الأشياء والحوسبة الطرفية (IoT & Edge)", mission: "ربط الحساسات والمتحكمات بالسحابة عبر MQTT و WiFi/BLE.", skills: ["ESP32 / Raspberry Pi", "MQTT & CoAP", "Embedded Linux", "Node-RED"], tools: ["ESP-IDF", "PlatformIO", "AWS IoT"], certs: ["AWS Certified IoT"] }
    ],
    resources: [
      { name: "Neso Academy & FastBit Embedded", type: "شرح التصميم المنطقي و ARM STM32", url: "https://www.youtube.com/@nesoacademy" }
    ],
    nodes: [
      { id: "e_log", label: "Electronics & Logic Design", tier: 0, row: 0.5, role: "fpga_ic", desc: "البوابات المنطقية والدوائر المتكاملة" },
      { id: "e_c", label: "Embedded C & Pointers", tier: 0, row: 2.2, role: "emb_sw", desc: "البرمجة منخفضة المستوى والذاكرة" },
      { id: "e_mcu", label: "Microcontrollers & GPIO/ADC", tier: 1, row: 1.3, role: "emb_sw", desc: "كتابة الـ Drivers والتعامل مع المقاطعات" },
      { id: "e_proto", label: "UART, SPI, I2C & CAN Bus", tier: 2, row: 0.4, role: "emb_sw", desc: "بروتوكولات الاتصال الصناعية والسيارات" },
      { id: "e_hdl", label: "Verilog / SystemVerilog & FPGA", tier: 2, row: 2.3, role: "fpga_ic", desc: "تصميم ومحاكاة الدوائر الرقمية" },
      { id: "e_arm", label: "🏆 ARM STM32, FreeRTOS & AUTOSAR", tier: 3, row: 1.2, role: "emb_sw", desc: "أنظمة الوقت الحقيقي ومعايير السيارات" }
    ],
    edges: [
      ["e_log", "e_mcu"], ["e_c", "e_mcu"], ["e_mcu", "e_proto"],
      ["e_log", "e_hdl"], ["e_proto", "e_arm"], ["e_mcu", "e_arm"]
    ]
  },

  // 7. COMPUTER SCIENCE & COMPETITIVE PROGRAMMING
  {
    id: "cs_core",
    name: "7. علوم الحاسب والخوارزميات (CS Core)",
    shortTag: "DSA / OOP / OS / DB / System Design",
    icon: "fa-code-compare",
    accent: "#3B82F6",
    introTitle: "🧠 جامعة علوم الحاسب، الخوارزميات، وتصميم الأنظمة الكبرى (Core CS)",
    introText: "الأساس العلمي المتين لكل مهندس برمجيات: إتقان هياكل البيانات والخوارزميات، أنظمة التشغيل، الشبكات، هندسة قواعد البيانات من الداخل، وأنماط التصميم.",
    whyPoints: [
      { title: "🏆 اجتياز مقابلات كبرى الشركات", desc: "يركز على Problem Solving و Design Patterns و System Design." }
    ],
    foundations: [
      { id: "cs_f1", title: "1. C++ / Java Programming & OOP Principles", desc: "البرمجة الكائنية ومبادئ SOLID.", yt: "د. مصطفى سعد / عادل نسيم" },
      { id: "cs_f2", title: "2. Complexity Analysis (Big-O) & Recursion", desc: "حساب كفاءة الخوارزميات في الوقت والذاكرة.", yt: "Abdul Bari / NeetCode" }
    ],
    roles: [
      { id: "algo_icpc", title: "🏅 مهندس خوارزميات ومسابقات برمجية (Algorithms & ICPC)", mission: "حل المسائل المعقدة وتحسين أداء الكود.", skills: ["Trees & Graphs", "Dynamic Programming", "Greedy & Divide/Conquer", "Number Theory"], tools: ["C++ STL", "Codeforces", "LeetCode"], certs: ["ECPC / ICPC Finalist"] },
      { id: "swe_arch", title: "💎 مهندس برمجيات ومعماري أنظمة (Software Architect)", mission: "تصميم الأنظمة النظيفة القابلة للتوسع.", skills: ["OOP & SOLID", "GoF Design Patterns", "OS Concurrency", "DB Indexing", "Distributed Systems"], tools: ["Git", "Linux", "Docker", "PostgreSQL"], certs: ["NeetCode 150 Mastery"] }
    ],
    resources: [
      { name: "د. مصطفى سعد إبراهيم & NeetCode.io", type: "أفضل مرجع للخوارزميات وحل المشكلات", url: "https://neetcode.io" }
    ],
    nodes: [
      { id: "c_cpp", label: "C++ / Java & Complexity Big-O", tier: 0, row: 1.2, role: "algo_icpc", desc: "أساسيات البرمجة وحساب التعقيد" },
      { id: "c_oop", label: "OOP, SOLID & Clean Code", tier: 1, row: 0.4, role: "swe_arch", desc: "البرمجة الكائنية والمبادئ الهندسية" },
      { id: "c_dsa", label: "Data Structures (Trees/Graphs)", tier: 1, row: 2.2, role: "algo_icpc", desc: "هياكل البيانات المتقدمة والجراف" },
      { id: "c_dp", label: "Algorithms & Dynamic Prog", tier: 2, row: 0.4, role: "algo_icpc", desc: "البرمجة الديناميكية وخوارزميات البحث" },
      { id: "c_os", label: "OS, Concurrency & DB Internals", tier: 2, row: 2.2, role: "swe_arch", desc: "أنظمة التشغيل، الـ Threads، وفهرسة قواعد البيانات" },
      { id: "c_sys", label: "🏆 Design Patterns & System Design", tier: 3, row: 1.2, role: "swe_arch", desc: "أنماط التصميم وهندسة الأنظمة الموزعة" }
    ],
    edges: [
      ["c_cpp", "c_oop"], ["c_cpp", "c_dsa"], ["c_dsa", "c_dp"],
      ["c_oop", "c_os"], ["c_dp", "c_sys"], ["c_os", "c_sys"]
    ]
  },

  // 8. GAME DEVELOPMENT & GRAPHICS (موسع إلى 3 تخصصات)
  {
    id: "gamedev",
    name: "8. تطوير الألعاب والرسوميات (Game Dev)",
    shortTag: "Unity C# / Unreal C++ / Shaders",
    icon: "fa-gamepad",
    accent: "#EC4899",
    introTitle: "🎮 جامعة تطوير الألعاب، المحاكاة الفيزيائية، وبرمجة الرسوميات (Unity & Unreal)",
    introText: "مسار متكامل يغطي برمجة ألعاب الـ Indie والـ Mobile بمحرك Unity (C#)، وألعاب الـ AAA الواقعية بمحرك Unreal Engine 5 (C++)، وبرمجة الـ Shaders.",
    whyPoints: [
      { title: "🕹️ 3 تخصصات احترافية", desc: "مطور Unity C#، مطور محرك Unreal C++، ومهندس رسوميات Technical Artist & Shaders." }
    ],
    foundations: [
      { id: "gm_f1", title: "1. C# & C++ OOP & Memory Management", desc: "البرمجة الكائنية وإدارة الذاكرة للألعاب.", yt: "Code Monkey / Cherno" },
      { id: "gm_f2", title: "2. 3D Math (Vectors, Dot/Cross Product, Matrices)", desc: "الرياضيات ثلاثية الأبعاد لتحريك الكاميرا والشخصيات.", yt: "Freya Holmér" }
    ],
    roles: [
      { id: "unity_dev", title: "🕹️ مطور ألعاب Unity (C# Gameplay Engineer)", mission: "بناء ألعاب 2D/3D و VR/Mobile بمحرك Unity.", skills: ["C# Events & Delegates", "Unity Physics & Raycasting", "Animator & Timeline", "Addressables & Optimization"], tools: ["Unity 6", "Visual Studio", "Blender"], certs: ["Unity Certified Programmer"] },
      { id: "unreal_dev", title: "🔥 مطور ألعاب Unreal Engine 5 (C++ AAA Developer)", mission: "بناء ألعاب عالية الواقعية بـ C++ و Blueprints.", skills: ["Unreal C++ & Blueprints", "Gameplay Ability System (GAS)", "Lumen & Nanite", "Dedicated Server Multiplayer"], tools: ["Unreal Engine 5", "Rider / VS"], certs: ["Unreal Engine Fellowship"] },
      { id: "tech_art", title: "✨ مهندس رسوميات و (Graphics & Shader Programmer)", mission: "كتابة الـ Shaders والمؤثرات البصرية بـ HLSL/GLSL.", skills: ["Rendering Pipeline", "Shader Graph / HLSL", "VFX Graph / Niagara", "GPU Profiling"], tools: ["ShaderGraph", "RenderDoc", "Blender"], certs: ["Graphics Programming Mastery"] }
    ],
    resources: [
      { name: "Code Monkey & Sebastian Lague & The Cherno", type: "أقوى قنوات هندسة الألعاب والمحركات", url: "https://www.youtube.com/@CodeMonkeyUnity" }
    ],
    nodes: [
      { id: "g_math", label: "C# / C++ & 3D Vector Math", tier: 0, row: 1.2, role: "unity_dev", desc: "لغات البرمجة والرياضيات ثلاثية الأبعاد" },
      { id: "g_phys", label: "Engine Core & Physics/Collisions", tier: 1, row: 0.4, role: "unity_dev", desc: "الفيزياء، التصادمات، وحركة الكاميرا" },
      { id: "g_ai", label: "Gameplay Architecture & AI (FSM/A*)", tier: 1, row: 2.2, role: "unreal_dev", desc: "ذكاء الأعداء، إيجاد المسار، وأنماط تصميم الألعاب" },
      { id: "g_shd", label: "Shaders (HLSL), Lighting & VFX", tier: 2, row: 0.4, role: "tech_art", desc: "برمجة كروت الشاشة والإضاءة والمؤثرات" },
      { id: "g_net", label: "🏆 Multiplayer Netcode & Optimization", tier: 3, row: 1.2, role: "unreal_dev", desc: "برمجة اللعب الجماعي عبر الشبكة ونشر اللعبة" }
    ],
    edges: [
      ["g_math", "g_phys"], ["g_math", "g_ai"], ["g_phys", "g_shd"],
      ["g_ai", "g_net"], ["g_shd", "g_net"]
    ]
  },

  // 9. DATA ENGINEERING (هندسة البيانات - جديد بأولوية عالية)
  {
    id: "data_eng",
    name: "9. هندسة البيانات (Data Engineering)",
    shortTag: "SQL / Spark / Kafka / Airflow / dbt",
    icon: "fa-database",
    accent: "#14B8A6",
    introTitle: "🏗️ جامعة هندسة البيانات الضخمة وأنابيب التدفق اللحظي (Big Data & Pipelines)",
    introText: "مهندس البيانات هو من يبني البنية التحتية وأنابيب نقل ومعالجة البيانات الضخمة (ETL/ELT Pipelines) ومستودعات البيانات السحابية التي تغذي لوحات الأعمال ونماذج الذكاء الاصطناعي.",
    whyPoints: [
      { title: "🔥 أولوية قصوى في سوق العمل", desc: "لا يمكن لأي مشروع ذكاء اصطناعي أو تحليلات أن يعمل بدون مهندس بيانات يجهز البيانات وينظمها." }
    ],
    foundations: [
      { id: "de_f1", title: "1. Advanced SQL & Database Internals", desc: "Window Functions, CTEs, Partitioning, Indexing, Execution Plans.", yt: "Data with Baraa / Hussein Nasser" },
      { id: "de_f2", title: "2. Python for Data Engineering & Linux/Docker", desc: "Scripting, APIs, PyArrow, Dockerizing Databases.", yt: "DataTalksClub Zoomcamp" }
    ],
    roles: [
      { id: "batch_de", title: "🛢️ مهندس أنابيب ومستودعات بيانات (Batch & Warehouse Engineer)", mission: "بناء أنابيب ETL/ELT ومستودعات Snowflake و BigQuery.", skills: ["Advanced SQL", "Airflow / Dagster", "Snowflake / BigQuery / Redshift", "Data Modeling (Star Schema)"], tools: ["Apache Airflow", "Snowflake", "BigQuery", "Docker"], certs: ["SnowPro Core", "GCP Data Engineer"] },
      { id: "stream_de", title: "⚡ مهندس بيانات ضخمة وتدفق لحظي (Spark & Kafka Engineer)", mission: "معالجة ملايين الأحداث في الثانية باستخدام Kafka و Spark.", skills: ["Apache Spark (PySpark)", "Apache Kafka", "Flink", "Data Lakes (Delta Lake / Iceberg)"], tools: ["Spark", "Kafka", "Databricks", "AWS EMR"], certs: ["Databricks Data Engineer Associate"] },
      { id: "analytics_de", title: "📐 مهندس تحليلات وجودة بيانات (Analytics Engineer — dbt)", mission: "تحويل البيانات الخام داخل المستودع إلى نماذج جاهزة للتحليل مع ضمان جودتها.", skills: ["dbt (Data Build Tool)", "Data Quality (Great Expectations)", "CI/CD for Data", "BI Modeling"], tools: ["dbt", "Git", "Great Expectations"], certs: ["dbt Analytics Engineering"] }
    ],
    resources: [
      { name: "DataTalksClub (Data Engineering Zoomcamp)", type: "أقوى معسكر مجاني عالمي لهندسة البيانات", url: "https://github.com/DataTalksClub/data-engineering-zoomcamp" },
      { name: "Data with Baraa & Seattle Data Guy", type: "شرح SQL المتقدمة ومعمارية البيانات", url: "https://www.youtube.com/@DataWithBaraa" }
    ],
    nodes: [
      { id: "de_sql", label: "Advanced SQL & DB Internals", tier: 0, row: 0.5, role: "batch_de", desc: "Window Functions, Indexing & Data Modeling" },
      { id: "de_py", label: "Python, Linux & Docker", tier: 0, row: 2.2, role: "batch_de", desc: "سحب البيانات من الـ APIs وتشغيل الحاويات" },
      { id: "de_dw", label: "Data Warehousing (BigQuery/Snowflake)", tier: 1, row: 0.5, role: "batch_de", desc: "تصميم مستودعات البيانات السحابية" },
      { id: "de_air", label: "Orchestration (Airflow / Dagster)", tier: 1, row: 2.2, role: "batch_de", desc: "جدولة وأتمتة أنابيب ETL/ELT" },
      { id: "de_dbt", label: "dbt & Data Quality Governance", tier: 2, row: 0.4, role: "analytics_de", desc: "هندسة التحليلات واختبار جودة البيانات" },
      { id: "de_spk", label: "Apache Spark & Databricks", tier: 2, row: 2.2, role: "stream_de", desc: "معالجة البيانات الضخمة الموزعة" },
      { id: "de_kfk", label: "🏆 Kafka Streaming & Lakehouse", tier: 3, row: 1.3, role: "stream_de", desc: "أنابيب التدفق اللحظي ومعمارية Delta Lake" }
    ],
    edges: [
      ["de_sql", "de_dw"], ["de_py", "de_air"], ["de_dw", "de_dbt"],
      ["de_air", "de_dbt"], ["de_air", "de_spk"], ["de_dbt", "de_kfk"], ["de_spk", "de_kfk"]
    ]
  },

  // 10. QA & TEST AUTOMATION (هندسة الجودة والاختبارات - جديد)
  {
    id: "qa_testing",
    name: "10. هندسة الجودة والاختبارات (QA & SDET)",
    shortTag: "Playwright / Selenium / API / Load Test",
    icon: "fa-vial-circle-check",
    accent: "#22C55E",
    introTitle: "✅ جامعة هندسة ضمان الجودة وأتمتة الاختبارات البرمجية (QA & Test Automation)",
    introText: "ضمان خلو الأنظمة البنكية والتجارية من الأخطاء عبر تصميم حالات الاختبار، وأتمتة اختبارات الواجهات والـ APIs والموبايل، واختبارات الضغط والأداء.",
    whyPoints: [
      { title: "🛡️ خط الدفاع عن جودة المنتج", desc: "مهندس الـ SDET يجمع بين البرمجة القوية وفكر اكتشاف الأخطاء قبل وصولها للعميل." }
    ],
    foundations: [
      { id: "qa_f1", title: "1. Software Testing Fundamentals (ISTQB Foundation)", desc: "SDLC, STLC, Test Case Design, Bug Life Cycle.", yt: "Tarek Roshdy / Nezam Academy" },
      { id: "qa_f2", title: "2. JavaScript / TypeScript or Java/Python for Automation", desc: "أساسيات البرمجة لكتابة سكربتات الفحص الآلي.", yt: "Hatem Hatamleh (QAcart)" }
    ],
    roles: [
      { id: "sdet_web", title: "🤖 مهندس أتمتة اختبارات (SDET — Playwright / Cypress)", mission: "بناء أطر عمل أتمتة اختبارات الويب والموبايل.", skills: ["Playwright / Cypress / Selenium", "Page Object Model (POM)", "Appium Mobile Testing", "CI/CD Test Pipelines"], tools: ["Playwright", "Cypress", "Selenium", "Appium"], certs: ["ISTQB CTFL", "Playwright Mastery"] },
      { id: "api_perf", title: "⚡ مهندس اختبارات APIs والأداء (API & Performance QA)", mission: "فحص الـ Endpoints واختبار قدرة الخادم على تحمل آلاف المستخدمين.", skills: ["Postman & Newman", "REST Assured", "k6 / JMeter Load & Stress Testing", "Contract Testing"], tools: ["Postman", "k6", "JMeter", "Swagger"], certs: ["Postman API Tester"] }
    ],
    resources: [
      { name: "QAcart (م. حاتم حتاملة) & Test Automation University", type: "أفضل منصة عربية وعالمية مجانية لـ QA", url: "https://testautomationu.applitools.com" }
    ],
    nodes: [
      { id: "q_man", label: "Manual Testing & Test Case Design", tier: 0, row: 1.2, role: "sdet_web", desc: "أساسيات ISTQB وتصميم حالات الاختبار وتقارير الأخطاء" },
      { id: "q_api", label: "API Testing (Postman & REST)", tier: 1, row: 0.4, role: "api_perf", desc: "فحص وأتمتة اختبارات الـ APIs" },
      { id: "q_code", label: "JS/TS or Java for Automation", tier: 1, row: 2.2, role: "sdet_web", desc: "البرمجة الخاصة بأتمتة الاختبارات" },
      { id: "q_pw", label: "Playwright / Cypress / Selenium", tier: 2, row: 0.4, role: "sdet_web", desc: "أتمتة اختبارات النهاية للنهاية E2E للويب" },
      { id: "q_perf", label: "Performance & Load Testing (k6/JMeter)", tier: 2, row: 2.2, role: "api_perf", desc: "اختبارات الضغط والتحمل للخوادم" },
      { id: "q_ci", label: "🏆 CI/CD Test Architecture & Mobile", tier: 3, row: 1.2, role: "sdet_web", desc: "ربط الاختبارات الآلية بخطوط الإنتاج" }
    ],
    edges: [
      ["q_man", "q_api"], ["q_man", "q_code"], ["q_code", "q_pw"],
      ["q_api", "q_perf"], ["q_pw", "q_ci"], ["q_perf", "q_ci"]
    ]
  },

  // 11. UI/UX & PRODUCT DESIGN (تصميم تجربة وواجهات المستخدم - جديد)
  {
    id: "ui_ux",
    name: "11. تصميم تجربة المستخدم (UI/UX Design)",
    shortTag: "UX Research / Figma / Design Systems",
    icon: "fa-pen-ruler",
    accent: "#F43F5E",
    introTitle: "🎨 جامعة هندسة تجربة المستخدم، أنظمة التصميم، وتصميم المنتجات الرقمية (UI/UX)",
    introText: "تحويل الاحتياجات البشرية والتجارية المعقدة إلى واجهات رقمية بديهية ومريحة بصرياً، بدءاً من أبحاث المستخدم (UX Research) وهيكلة المعلومات وحتى بناء Design Systems متكاملة على Figma.",
    whyPoints: [
      { title: "🧠 علم نفس + هندسة بصرية", desc: "التصميم الفاخر ليس مجرد ألوان، بل تجربة استخدام سلسة تزيد من نجاح المنتج." }
    ],
    foundations: [
      { id: "ux_f1", title: "1. Design Principles: Typography, Color Theory, Spacing & Grid", desc: "قواعد التباين، التسلسل البصري، والخطوط.", yt: "Mizko / Flux Academy / Ehab Fayez" },
      { id: "ux_f2", title: "2. User Psychology & UX Laws (Hick's, Fitts's, Jakob's Law)", desc: "قوانين تجربة المستخدم وكيف يفكر الإنسان.", yt: "Laws of UX / Google UX" }
    ],
    roles: [
      { id: "ux_res", title: "🔍 باحث ومهندس تجربة مستخدم (UX Researcher & IA)", mission: "فهم سلوك المستخدم، رسم User Flows، وبناء Wireframes واختبار القابلية للاستخدام.", skills: ["User Interviews & Personas", "Information Architecture", "User Flows & Wireframing", "Usability Testing"], tools: ["FigJam", "Miro", "Maze", "Notion"], certs: ["Google UX Design Certificate"] },
      { id: "ui_sys", title: "✨ مصمم واجهات وأنظمة تصميم (UI & Design Systems Architect)", mission: "بناء مكونات متجاوبة، متغيرات (Design Tokens)، ونماذج تفاعلية حية على Figma.", skills: ["Figma Auto-Layout & Variables", "Component Libraries & Design Systems", "Interactive Prototyping", "Accessibility (WCAG)", "Developer Handoff"], tools: ["Figma", "Framer", "Spline"], certs: ["Figma Design Systems Specialist"] }
    ],
    resources: [
      { name: "Ehab Fayez & Mizko & Google UX Path", type: "مسارات UI/UX و Figma الاحترافية", url: "https://www.Lawsofux.com" }
    ],
    nodes: [
      { id: "u_psy", label: "UX Psychology & Research", tier: 0, row: 0.5, role: "ux_res", desc: "أبحاث المستخدم وقوانين تجربة الاستخدام" },
      { id: "u_vis", label: "Visual Hierarchy, Color & Typography", tier: 0, row: 2.2, role: "ui_sys", desc: "قواعد التناسق البصري والخطوط والألوان" },
      { id: "u_wire", label: "Information Arch & Wireframing", tier: 1, row: 1.3, role: "ux_res", desc: "هيكلة المعلومات ورسم المخططات الأولية" },
      { id: "u_fig", label: "Figma Advanced (Auto-Layout/Vars)", tier: 2, row: 0.4, role: "ui_sys", desc: "إتقان Figma المتقدم والمتغيرات" },
      { id: "u_sys", label: "Design Systems & Accessibility", tier: 2, row: 2.2, role: "ui_sys", desc: "بناء مكتبات المكونات القياسية للشركات" },
      { id: "u_pro", label: "🏆 Interactive Prototyping & Handoff", tier: 3, row: 1.3, role: "ui_sys", desc: "النماذج التفاعلية واختبار المستخدمين والتسليم للمبرمجين" }
    ],
    edges: [
      ["u_psy", "u_wire"], ["u_vis", "u_wire"], ["u_wire", "u_fig"],
      ["u_fig", "u_sys"], ["u_fig", "u_pro"], ["u_sys", "u_pro"]
    ]
  },

  // 12. ROBOTICS & CONTROL ENGINEERING (هندسة الروبوتات والتحكم - جديد)
  {
    id: "robotics",
    name: "12. الروبوتات والتحكم (Robotics & ROS2)",
    shortTag: "ROS 2 / Control / Kinematics / SLAM",
    icon: "fa-robot",
    accent: "#0EA5E9",
    introTitle: "🦾 جامعة هندسة الروبوتات، الميكاترونكس، والأنظمة ذاتية القيادة (Robotics & Control)",
    introText: "الجمع بين الميكانيكا والإلكترونيات ونظرية التحكم الآلي والذكاء الاصطناعي لبناء أذرع روبوتية صناعية ومركبات ذاتية الحركة باستخدام نظام ROS 2.",
    whyPoints: [
      { title: "🤖 ROS 2 & Autonomous Systems", desc: "المعيار العالمي لبرمجة الروبوتات الحديثة والمحاكاة الفيزيائية وبناء الخرائط SLAM." }
    ],
    foundations: [
      { id: "rb_f1", title: "1. Linear Algebra, Mechanics & C++/Python", desc: "مصفوفات التحويل الدوراني والبرمجة بـ C++ و Python.", yt: "Modern Robotics (Northwestern)" },
      { id: "rb_f2", title: "2. Control Systems (PID, State-Space & Filters)", desc: "نظرية التحكم الآلي وفلاتر Kalman.", yt: "Brian Douglas Control Lectures" }
    ],
    roles: [
      { id: "ros_eng", title: "🦾 مهندس برمجيات روبوتات (ROS 2 & Kinematics Engineer)", mission: "برمجة عقد ROS 2، حساب الحركة الأمامية والعكسية (Kinematics)، والمحاكاة.", skills: ["ROS 2 (Nodes, Topics, Services, TF2)", "Forward & Inverse Kinematics", "URDF & Gazebo / Isaac Sim", "MoveIt 2 Motion Planning"], tools: ["ROS 2 Humble/Jazzy", "Gazebo", "NVIDIA Isaac Sim", "Linux"], certs: ["The Construct ROS2 Developer"] },
      { id: "auton_eng", title: "🧭 مهندس ملاحة ذاتية ورؤية (SLAM & Autonomous Navigation)", mission: "تمكين الروبوت من رسم خريطة المكان وتحديد موقعه وتفادي العوائق.", skills: ["SLAM (Lidar & Visual)", "Nav2 Stack", "Path Planning (A*, RRT*)", "Sensor Fusion (Kalman Filter)", "OpenCV & 3D PointClouds"], tools: ["Nav2", "OpenCV", "PCL", "RViz2"], certs: ["Udacity Robotics Software Engineer"] }
    ],
    resources: [
      { name: "Articulated Robotics & Brian Douglas & Modern Robotics", type: "أفضل شروحات ROS 2 والتحكم الآلي", url: "https://www.youtube.com/@ArticulatedRobotics" }
    ],
    nodes: [
      { id: "r_math", label: "Linear Algebra, C++ & Python", tier: 0, row: 0.5, role: "ros_eng", desc: "مصفوفات التحويل والبرمجة للروبوت" },
      { id: "r_ctrl", label: "Control Theory (PID & Kalman)", tier: 0, row: 2.2, role: "ros_eng", desc: "أنظمة التحكم الآلي ودمج القراءات" },
      { id: "r_kin", label: "Robot Kinematics & Dynamics", tier: 1, row: 1.3, role: "ros_eng", desc: "حساب زوايا المفاصل ومسار الحركة" },
      { id: "r_ros2", label: "ROS 2 Core, URDF & Gazebo Sim", tier: 2, row: 0.4, role: "ros_eng", desc: "نظام تشغيل الروبوت والمحاكاة ثلاثية الأبعاد" },
      { id: "r_vis", label: "Robotic Vision & Lidar Sensors", tier: 2, row: 2.2, role: "auton_eng", desc: "معالجة الكاميرات وحساسات الليزر" },
      { id: "r_slam", label: "🏆 SLAM, Nav2 & Autonomous Path", tier: 3, row: 1.3, role: "auton_eng", desc: "بناء الخرائط والملاحة الذاتية الكاملة" }
    ],
    edges: [
      ["r_math", "r_kin"], ["r_ctrl", "r_kin"], ["r_kin", "r_ros2"],
      ["r_kin", "r_vis"], ["r_ros2", "r_slam"], ["r_vis", "r_slam"]
    ]
  },

  // 13. BLOCKCHAIN & WEB3 ENGINEERING (هندسة البلوك تشين - جديد)
  {
    id: "blockchain",
    name: "13. البلوك تشين (Blockchain & Web3)",
    shortTag: "Solidity / EVM / Foundry / DeFi / Audit",
    icon: "fa-cubes",
    accent: "#F59E0B",
    introTitle: "⛓️ جامعة هندسة البلوك تشين، العقود الذكية، وأمن الأنظمة اللامركزية (Web3 & Smart Contracts)",
    introText: "تصميم وبرمجة وتأمين العقود الذكية (Smart Contracts) والتطبيقات اللامركزية (dApps) على شبكة Ethereum والشبكات المتوافقة مع EVM.",
    whyPoints: [
      { title: "🔒 برمجة العقود الذكية وتدقيقها أمنياً", desc: "يغطي تطوير العقود بلغة Solidity و Foundry، بالإضافة إلى فحص ثغرات العقود الذكية (Smart Contract Auditing)." }
    ],
    foundations: [
      { id: "bc_f1", title: "1. Cryptography (Hashes, Digital Signatures, Merkle Trees)", desc: "التشفير التطبيقي وهياكل بيانات البلوك تشين.", yt: "Cyfrin Updraft (Patrick Collins)" },
      { id: "bc_f2", title: "2. Distributed Systems, Consensus & EVM Architecture", desc: "كيف تعمل العقد الموزعة والـ Gas والـ Bytecode.", yt: "Alchemy University / Patrick Collins" }
    ],
    roles: [
      { id: "sc_dev", title: "📜 مهندس عقود ذكية وتطبيقات لامركزية (Smart Contract & dApp Dev)", mission: "كتابة عقود Solidity عالية الكفاءة وربطها بواجهات Web3.", skills: ["Solidity", "Foundry / Hardhat", "ERC-20 / ERC-721 Standards", "Oracles (Chainlink)", "Ethers.js / Viem & Wagmi"], tools: ["Foundry", "Hardhat", "Remix", "OpenZeppelin"], certs: ["Cyfrin Updraft Solidity Path"] },
      { id: "sc_audit", title: "🛡️ مدقق أمن عقود ذكية (Smart Contract Security Auditor)", mission: "اكتشاف الثغرات القاتلة في العقود الذكية وبروتوكولات DeFi قبل إطلاقها.", skills: ["Reentrancy & Flash Loan Attacks", "Oracle Manipulation", "Fuzz & Invariant Testing", "EVM Opcode Analysis"], tools: ["Foundry Fuzzing", "Slither", "Aderyn", "Echidna"], certs: ["Cyfrin Security & Auditing"] }
    ],
    resources: [
      { name: "Cyfrin Updraft (Patrick Collins) & Alchemy University", type: "أقوى منهج مجاني عالمي لـ Solidity و Foundry والتدقيق الأمني", url: "https://updraft.cyfrin.io" }
    ],
    nodes: [
      { id: "b_cry", label: "Cryptography & EVM Internals", tier: 0, row: 1.2, role: "sc_dev", desc: "التشفير، التوقيع الرقمي، ومعمارية الإيثيريوم" },
      { id: "b_sol", label: "Solidity & Token Standards (ERC)", tier: 1, row: 0.4, role: "sc_dev", desc: "برمجة العقود الذكية ومعايير OpenZeppelin" },
      { id: "b_fnd", label: "Foundry / Hardhat & Fuzz Testing", tier: 1, row: 2.2, role: "sc_dev", desc: "إطار العمل الاحترافي لاختبار ونشر العقود" },
      { id: "b_defi", label: "DeFi Protocols, Oracles & dApps", tier: 2, row: 0.4, role: "sc_dev", desc: "بناء التطبيقات اللامركزية والربط مع Chainlink" },
      { id: "b_sec", label: "🏆 Smart Contract Security & Auditing", tier: 2, row: 2.2, role: "sc_audit", desc: "كشف ثغرات العقود الذكية والتدقيق الأمني" }
    ],
    edges: [
      ["b_cry", "b_sol"], ["b_cry", "b_fnd"], ["b_sol", "b_defi"],
      ["b_fnd", "b_defi"], ["b_sol", "b_sec"], ["b_fnd", "b_sec"]
    ]
  }
];

/* ============================================================================
   4. STATE & 4-PILLAR SKILL MASTERY ENGINE
   ============================================================================ */
const TracksState = {
  activeTrackId: localStorage.getItem("MY_LIFE_OS_ACTIVE_TRACK") || "cybersecurity",
  activeRoleFilter: "all",
  selectedNodeId: null,
  zoom: 1,
  panX: 0,
  panY: 0,
  isFullscreenGraph: false,
  masteredFoundations: SafeTrackStore.get("MY_LIFE_OS_FOUNDATIONS_V2", {}),
  // هيكل التقييم الرباعي لكل عقدة: { [nodeId]: { theory: bool, lab: bool, project: bool, interview: bool } }
  nodePillars: SafeTrackStore.get("MY_LIFE_OS_NODE_PILLARS_V2", {}),
  animFrame: null
};

// التوافق مع العلامات القديمة إن وجدت
const legacyMastered = SafeTrackStore.get("MY_LIFE_OS_MASTERED_NODES", {});
Object.keys(legacyMastered).forEach(k => {
  if (legacyMastered[k] && !TracksState.nodePillars[k]) {
    TracksState.nodePillars[k] = { theory: true, lab: true, project: true, interview: true };
  }
});

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
}

function getActiveTrack() {
  return CAREER_TRACKS_DB.find(t => t.id === TracksState.activeTrackId) || CAREER_TRACKS_DB[0];
}

// حساب التقدم الحقيقي الشامل (الأساسيات + متوسط إتقان العقد)
function calculateTrackOverallProgress(track) {
  const totalFound = (track.foundations || []).length;
  const doneFoundScore = (track.foundations || []).reduce((acc, f) => acc + (TracksState.masteredFoundations[f.id] ? 100 : 0), 0);
  const totalNodes = (track.nodes || []).length;
  const doneNodesScore = (track.nodes || []).reduce((acc, n) => acc + getNodeMasteryScore(n.id), 0);

  const totalItems = Math.max(1, totalFound + totalNodes);
  return Math.round((doneFoundScore + doneNodesScore) / totalItems);
}

/* ============================================================================
   5. INJECT TAB INTO SIDEBAR & RENDER MAIN UNIVERSITY ENCYCLOPEDIA
   ============================================================================ */
function injectTracksTabIntoSidebar() {
  injectTracksStyles();
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

  sec.innerHTML = `
    <!-- 1. شريط اختيار المسار الجامعي (13 مساراً هندسياً وبرمجياً) -->
    <div class="tracks-domain-bar">
      ${CAREER_TRACKS_DB.map(t => {
        const tPct = calculateTrackOverallProgress(t);
        return `
          <button type="button" class="track-domain-pill ${t.id === track.id ? "active" : ""}" data-select-track="${esc(t.id)}">
            <div class="track-domain-icon"><i class="fa-solid ${esc(t.icon)}"></i></div>
            <div style="flex:1; overflow:hidden;">
              <strong style="display:block; font-size:0.84rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(t.name)}</strong>
              <small class="small-muted" style="font-size:0.71rem;">${esc(t.shortTag)} • <span class="gold-text">${tPct}%</span></small>
            </div>
          </button>
        `;
      }).join("")}
    </div>

    <!-- 2. البطاقة التعريفية الشاملة للمجال -->
    <div class="track-hero-card">
      <div class="flex-between" style="flex-wrap:wrap; gap:12px;">
        <div>
          <span class="badge badge-gold mb-1"><i class="fa-solid ${esc(track.icon)}"></i> المنهج الجامعي المتكامل والخريطة الشبكية</span>
          <h2 class="mt-1">${esc(track.introTitle)}</h2>
        </div>
        <div class="filters-row">
          <span class="badge badge-emerald">مؤشر الإتقان الكلي: ${overallPct}% (${masteredCount}/${track.nodes.length} عقدة متقنة)</span>
          <button type="button" id="btn-track-to-goals" class="btn btn-gold btn-sm">
            <i class="fa-solid fa-bullseye"></i> اعتماد هذا المسار في أهدافي ومهامي
          </button>
        </div>
      </div>
      <p class="mt-2" style="font-size:0.94rem; color:var(--text-primary); line-height:1.8;">${esc(track.introText)}</p>
      <div class="track-why-grid">
        ${track.whyPoints.map(w => `
          <div class="track-why-box">
            <strong class="gold-text">${esc(w.title)}</strong>
            <p class="small-muted mt-1">${esc(w.desc)}</p>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- 3. الخريطة الشبكية التفاعلية + الملف التعليمي الكامل للمهارة المختارة (Split Network & Deep Dossier) -->
    <div id="network-graph-container" class="network-graph-shell ${TracksState.isFullscreenGraph ? "is-fullscreen" : ""}">
      <div class="network-toolbar">
        <div class="filters-row">
          <strong class="gold-text"><i class="fa-solid fa-circle-nodes"></i> الشبكة التفاعلية للمسار:</strong>
          <button type="button" class="chip ${TracksState.activeRoleFilter === "all" ? "btn-gold" : ""}" data-role-filter="all">🌐 الشبكة الكاملة</button>
          ${track.nodes.some(n => n.role === "foundation") ? `<button type="button" class="chip ${TracksState.activeRoleFilter === "foundation" ? "btn-gold" : ""}" data-role-filter="foundation">🧱 الأساسيات</button>` : ""}
          ${track.roles.map(r => `
            <button type="button" class="chip ${TracksState.activeRoleFilter === r.id ? "btn-gold" : ""}" data-role-filter="${esc(r.id)}">
              ${esc(r.title.split("(")[0].trim())}
            </button>
          `).join("")}
        </div>
        <div class="filters-row">
          <button type="button" id="btn-net-zoom-in" class="btn btn-xs btn-outline" title="تكبير"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
          <button type="button" id="btn-net-zoom-out" class="btn btn-xs btn-outline" title="تصغير"><i class="fa-solid fa-magnifying-glass-minus"></i></button>
          <button type="button" id="btn-net-reset" class="btn btn-xs btn-outline" title="توسيط وضبط الأبعاد"><i class="fa-solid fa-arrows-to-circle"></i> توسيط</button>
          <button type="button" id="btn-net-fullscreen" class="btn btn-xs btn-gold">
            <i class="fa-solid ${TracksState.isFullscreenGraph ? "fa-compress" : "fa-expand"}"></i>
            ${TracksState.isFullscreenGraph ? "إغلاق ملء الشاشة (ESC)" : "تكبير الشبكة بملء الشاشة"}
          </button>
        </div>
      </div>

      <div class="network-workspace-split">
        <!-- النصف الأيمن: كانفاس الشبكة التفاعلية الحية -->
        <div class="network-canvas-wrap">
          <canvas id="track-network-canvas" class="network-canvas-viewport"></canvas>
          <div class="network-legend-floating">
            <span>🟢 متقن (80%+)</span>
            <span>🟡 جاري التعلم</span>
            <span>⚪ لم يبدأ</span>
            <span>💡 اضغط على أي عقدة لعرض دروسها ومشروعها</span>
          </div>
        </div>

        <!-- النصف الأيسر: الملف التعليمي العميق للمهارة المختارة (Deep Skill Dossier) -->
        <div id="node-deep-dossier-panel" class="node-deep-dossier">
          ${buildNodeDeepDossierHTML(track, selectedNode)}
        </div>
      </div>
    </div>

    <!-- 4. الأساسيات الإجبارية قبل التخصص (Mandatory Foundations) -->
    <div class="card mb-4" style="margin-bottom:20px;">
      <div class="card-header">
        <h3><i class="fa-solid fa-layer-group gold-text"></i> أولاً: الأساسيات الإجبارية للمجال (Mandatory Foundations)</h3>
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

    <!-- 5. التخصصات والوظائف الدقيقة داخل المجال -->
    <div class="card mb-4" style="margin-bottom:20px;">
      <div class="card-header">
        <h3><i class="fa-solid fa-user-shield gold-text"></i> ثانياً: التخصصات المهنية، المهارات، الأدوات، والشهادات الدولية</h3>
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

    <!-- 6. المنصات العملية والمستشار الذكي -->
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
          <h3><i class="fa-solid fa-wand-magic-sparkles gold-text"></i> المعلم والموجه الذكي للمسار (AI Career & Skill Tutor)</h3>
        </div>
        <p class="small-muted mb-2">اطلب شرح أي درس أو مهارة أو أسئلة مقابلات شخصية في <strong>${esc(track.name)}</strong>:</p>
        <div class="input-action-row">
          <input type="text" id="track-ai-question" placeholder="مثال: اشرحلي بالتفصيل مهارة ${esc(selectedNode.label)} مع أمثلة وأسئلة انترفيو..." />
          <button type="button" id="btn-ask-track-ai" class="btn btn-gold btn-sm">اشرح لي بالـ AI</button>
        </div>
        <div id="track-ai-answer" class="subject-progress-box mt-2" style="white-space:pre-line; min-height:110px; max-height:320px; overflow-y:auto;">
          اضغط على أي مهارة في الشبكة أو اضغط "اشرح لي بالـ AI" ليقوم المساعد الذكي بشرح الدروس بالتفصيل...
        </div>
      </div>
    </div>
  `;

  bindCareerTracksEvents(track);
  bindDossierEvents(track, selectedNode);
  startInteractiveNetworkGraph(track);
}

/* ============================================================================
   6. BUILD DEEP DOSSIER HTML FOR ANY SELECTED NODE (SOLVES ALL 4 QUESTIONS!)
   ============================================================================ */
function buildNodeDeepDossierHTML(track, node) {
  const details = getNodeRichDetails(track, node);
  const score = getNodeMasteryScore(node.id);
  const p = TracksState.nodePillars[node.id] || {};

  const prereqHtml = details.prereqNodes.length
    ? details.prereqNodes.map(pn => {
        const done = isNodeMastered(pn.id);
        return `<span class="badge ${done ? "badge-emerald" : "badge-danger"}" style="margin:2px;">
          ${done ? "✅" : "🔒"} ${esc(pn.label)}
        </span>`;
      }).join("")
    : `<span class="badge badge-emerald">🌱 محطة تأسيسية (لا توجد متطلبات سابقة)</span>`;

  return `
    <div>
      <div class="flex-between">
        <span class="badge badge-gold">${esc(details.phase)}</span>
        <span class="badge ${score >= 80 ? "badge-emerald" : "badge-warning"}">درجة الإتقان: ${score}%</span>
      </div>
      <h3 class="gold-text mt-1">${esc(node.label)}</h3>
      <p class="small-muted">${esc(node.desc)} • ⏱️ الوقت المقدر: <strong>${esc(details.hours)}</strong></p>
    </div>

    <!-- 1. المتطلبات السابقة (Prerequisite Engine) -->
    <div class="dossier-section-box">
      <h5><i class="fa-solid fa-link"></i> 1. المتطلبات السابقة لهذه المهارة (Prerequisites):</h5>
      <div>${prereqHtml}</div>
    </div>

    <!-- 2. الدروس والوحدات داخل المهارة (Modules & Lessons) -->
    <div class="dossier-section-box">
      <h5><i class="fa-solid fa-book-open"></i> 2. الدروس والوحدات التفصيلية داخل المهارة:</h5>
      <div>
        ${details.modules.map(m => `
          <div class="module-lesson-item">
            <i class="fa-solid fa-circle-check gold-text" style="margin-top:4px;"></i>
            <span>${esc(m)}</span>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- 3. متى أعتبر نفسي أتقنت المهارة؟ + المشروع الإثباتي -->
    <div class="dossier-section-box">
      <h5><i class="fa-solid fa-award"></i> 3. متى أعتبر نفسي أتقنت هذه المهارة؟ (Mastery Criteria):</h5>
      <p class="small-muted">${esc(details.criteria)}</p>
      <h5 class="mt-2"><i class="fa-solid fa-diagram-project"></i> 4. المشروع العملي الذي يثبت إتقانك (Proof Project):</h5>
      <p class="small-note">${esc(details.project)}</p>
    </div>

    <!-- 4. محرك تقييم الإتقان الرباعي (Skill Mastery Engine 0% - 100%) -->
    <div class="dossier-section-box">
      <div class="flex-between mb-1">
        <h5><i class="fa-solid fa-sliders"></i> 5. سجل تقييم إتقانك الفعلي (Skill Mastery Engine):</h5>
        <strong class="gold-text">${score}%</strong>
      </div>
      <div class="progress-bar-track mb-2"><div class="progress-bar-fill" style="width:${score}%"></div></div>

      <label class="mastery-pillar-row">
        <span>📖 1. فهم النظريات والمفاهيم الأساسية (25%)</span>
        <input type="checkbox" data-pillar-check="theory" ${p.theory ? "checked" : ""} />
      </label>
      <label class="mastery-pillar-row">
        <span>🧪 2. التطبيق العملي وحل المعامل Labs (25%)</span>
        <input type="checkbox" data-pillar-check="lab" ${p.lab ? "checked" : ""} />
      </label>
      <label class="mastery-pillar-row">
        <span>💻 3. بناء المشروع الإثباتي للمهارة (30%)</span>
        <input type="checkbox" data-pillar-check="project" ${p.project ? "checked" : ""} />
      </label>
      <label class="mastery-pillar-row">
        <span>🎯 4. اجتياز مراجعة وأسئلة المقابلات الشخصية (20%)</span>
        <input type="checkbox" data-pillar-check="interview" ${p.interview ? "checked" : ""} />
      </label>
    </div>

    <!-- 5. أزرار التعلم بالـ AI أو اليوتيوب والربط بـ MY LIFE OS -->
    <div class="filters-row" style="justify-content:space-between;">
      <button type="button" id="btn-ai-explain-node" class="btn btn-xs btn-gold">
        <i class="fa-solid fa-wand-magic-sparkles"></i> اشرحلي دروسها بالـ AI
      </button>
      <button type="button" id="btn-ai-interview-node" class="btn btn-xs btn-outline">
        <i class="fa-solid fa-clipboard-question gold-text"></i> أسئلة انترفيو بالـ AI
      </button>
      <button type="button" id="btn-proof-to-projects" class="btn btn-xs btn-outline">
        <i class="fa-solid fa-code-branch gold-text"></i> أضف المشروع لمشاريعي
      </button>
      <button type="button" id="btn-node-to-pomo" class="btn btn-xs btn-outline">
        <i class="fa-solid fa-stopwatch gold-text"></i> جلسة تركيز
      </button>
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

  panel.querySelector("#btn-ai-explain-node")?.addEventListener("click", async () => {
    const ansBox = document.getElementById("track-ai-answer");
    if (TracksState.isFullscreenGraph) {
      TracksState.isFullscreenGraph = false;
      renderCareerTracksEncyclopedia();
    }
    const targetBox = document.getElementById("track-ai-answer");
    targetBox?.scrollIntoView({ behavior: "smooth" });
    if (targetBox) targetBox.textContent = `⏳ جاري إعداد شرح أكاديمي مفصل لدروس (${node.label}) مع الأمثلة العملية...`;
    const prompt = `اشرح لي كطالب هندسة وبرمجة مهارة (${node.label}) في مسار (${track.name}). غطِّ هذه الوحدات بالتفصيل والأمثلة العملية: ${details.modules.join(" | ")}. واختم بنصيحة لتنفيذ المشروع العملي: ${details.project}`;
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
    if (targetBox) targetBox.textContent = `⏳ جاري توليد أهم 5 أسئلة مقابلات شخصية (Interview Questions) مع إجاباتها النموذجية في (${node.label})...`;
    const prompt = `أعطني أهم 5 أسئلة مقابلات عمل تقنية (Technical Interview Questions) مع إجاباتها النموذجية الدقيقة في مهارة (${node.label} - ${node.desc}) لمسار (${track.name}).`;
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
   7. HiDPI RESPONSIVE NETWORK GRAPH ENGINE (AUTO-FIT & CLEAN LISTENERS)
   ============================================================================ */
let graphNodesComputed = [];
let activeMouseUpHandler = null;

function startInteractiveNetworkGraph(track) {
  const canvas = document.getElementById("track-network-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 760;
  const cssH = canvas.clientHeight || 520;
  canvas.width = cssW * dpr;
  canvas.height = cssH * dpr;

  // توزيع متوازن للعقد مع هامش أمان يمنع خروج النصوص عن الشاشة
  const maxTier = Math.max(...track.nodes.map(n => n.tier), 1);
  const maxRow = Math.max(...track.nodes.map(n => n.row), 1);
  const padX = 95;
  const padY = 65;

  graphNodesComputed = track.nodes.map(n => {
    const xBase = padX + (n.tier / maxTier) * Math.max(220, cssW - padX * 2);
    const yBase = padY + (n.row / Math.max(2.5, maxRow)) * Math.max(180, cssH - padY * 2);
    return {
      ...n,
      x: n._customX !== undefined ? n._customX : xBase,
      y: n._customY !== undefined ? n._customY : yBase,
      r: 21
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
    const hit = graphNodesComputed.find(nd => Math.hypot(nd.x - mx, nd.y - my) <= nd.r + 8);
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

  if (activeMouseUpHandler) {
    window.removeEventListener("mouseup", activeMouseUpHandler);
  }
  activeMouseUpHandler = () => {
    draggingNode = null;
    isPanning = false;
  };
  window.addEventListener("mouseup", activeMouseUpHandler);

  // الضغط المزدوج على أي عقدة يمنحها 100% إتقان أو يصفرها فوراً
  canvas.ondblclick = (e) => {
    const { mx, my } = getMouseWorldPos(e);
    const hit = graphNodesComputed.find(nd => Math.hypot(nd.x - mx, nd.y - my) <= nd.r + 8);
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

  // خلفية شبكية هندسية دقيقة
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 42) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 42) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  ctx.translate(TracksState.panX, TracksState.panY);
  ctx.scale(TracksState.zoom, TracksState.zoom);

  const filter = TracksState.activeRoleFilter;
  const isNodeHighlighted = (nd) => filter === "all" || nd.role === filter || nd.role === "foundation";

  // 1. رسم الروابط ونبضات البيانات
  track.edges.forEach(([fromId, toId]) => {
    const n1 = graphNodesComputed.find(n => n.id === fromId);
    const n2 = graphNodesComputed.find(n => n.id === toId);
    if (!n1 || !n2) return;

    const activeEdge = isNodeHighlighted(n1) && isNodeHighlighted(n2);
    const bothMastered = isNodeMastered(n1.id) && isNodeMastered(n2.id);

    ctx.strokeStyle = bothMastered
      ? "rgba(16, 185, 129, 0.88)"
      : activeEdge
      ? "rgba(212, 167, 44, 0.55)"
      : "rgba(148, 163, 184, 0.12)";
    ctx.lineWidth = activeEdge ? 2.3 : 1.2;

    ctx.beginPath();
    ctx.moveTo(n1.x, n1.y);
    ctx.lineTo(n2.x, n2.y);
    ctx.stroke();

    if (activeEdge) {
      const px = n1.x + (n2.x - n1.x) * pulseT;
      const py = n1.y + (n2.y - n1.y) * pulseT;
      ctx.fillStyle = bothMastered ? "#10B981" : "#D4A72C";
      ctx.beginPath();
      ctx.arc(px, py, 3.3, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // 2. رسم العقد ومؤشر النسبة المئوية للإتقان حول كل عقدة
  graphNodesComputed.forEach(nd => {
    const highlighted = isNodeHighlighted(nd);
    const score = getNodeMasteryScore(nd.id);
    const mastered = score >= 80;
    const inProgress = score > 0 && score < 80;
    const selected = TracksState.selectedNodeId === nd.id;

    ctx.globalAlpha = highlighted ? 1 : 0.22;

    if (selected || mastered || inProgress) {
      ctx.fillStyle = mastered
        ? "rgba(16, 185, 129, 0.22)"
        : selected
        ? "rgba(212, 167, 44, 0.28)"
        : "rgba(245, 158, 11, 0.16)";
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, nd.r + 8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = mastered ? "#065F46" : selected ? "#D4A72C" : inProgress ? "#3B2F13" : "#111827";
    ctx.strokeStyle = mastered ? "#10B981" : selected ? "#FFFFFF" : track.accent || "#D4A72C";
    ctx.lineWidth = selected ? 3 : 2.2;

    ctx.beginPath();
    ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = selected && !mastered ? "#05070e" : "#FFFFFF";
    ctx.font = "bold 11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(mastered ? "✓" : score > 0 ? `${score}%` : `L${nd.tier + 1}`, nd.x, nd.y);

    // كبسولة العنوان أسفل العقدة
    ctx.font = "bold 11.5px Alexandria, Cairo, sans-serif";
    const textW = ctx.measureText(nd.label).width + 14;
    ctx.fillStyle = "rgba(9, 13, 25, 0.9)";
    ctx.fillRect(nd.x - textW / 2, nd.y + nd.r + 5, textW, 20);
    ctx.strokeStyle = mastered ? "rgba(16, 185, 129, 0.55)" : "rgba(212, 167, 44, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(nd.x - textW / 2, nd.y + nd.r + 5, textW, 20);

    ctx.fillStyle = mastered ? "#6EE7B7" : "#F8FAFC";
    ctx.fillText(nd.label, nd.x, nd.y + nd.r + 15);
  });

  ctx.globalAlpha = 1;
  ctx.restore();
}

/* ============================================================================
   8. EVENT BINDINGS FOR TRACKS, ROLES & GLOBAL SHORTCUTS
   ============================================================================ */
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
      localStorage.setItem("MY_LIFE_OS_ACTIVE_TRACK", TracksState.activeTrackId);
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
    TracksState.zoom = Math.min(2.2, TracksState.zoom + 0.16);
  });
  document.getElementById("btn-net-zoom-out")?.addEventListener("click", () => {
    TracksState.zoom = Math.max(0.55, TracksState.zoom - 0.16);
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
    const q = inp?.value.trim() || `اشرح لي خطة عملية لدراسة ${track.name} مع الدروس والمشاريع المطلوبة`;
    if (out) out.textContent = "⏳ جاري إعداد الشرح والخطة الهندسية بواسطة المعلم الذكي...";
    const reply = await B().askAI?.(`أنت بروفيسور وموجه مهني في مجال (${track.name}). أجب على طلب الطالب التالي بشرح وافٍ وخطوات عملية ومصادر: "${q}"`);
    if (out) out.textContent = reply;
  });
}

// تشغيل فوري وآمن للنظام + دعم زر ESC للخروج من ملء شاشة الشبكة
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
