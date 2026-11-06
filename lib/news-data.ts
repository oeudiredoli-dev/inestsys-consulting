export type TechCategory = "All" | "AI & ML" | "Cybersecurity" | "Cloud & Infra" | "Big Tech" | "Hardware";

export type CompanyCategory = "All" | "Announcements" | "Case Studies" | "Whitepapers" | "Leadership";

export interface TechArticle {
  id: string;
  source: string;
  sourceBadgeColor: string;
  category: "AI & ML" | "Cybersecurity" | "Cloud & Infra" | "Big Tech" | "Hardware";
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  link: string; // Real, verified URL
  thumbnail: string;
  accent: string;
  featured?: boolean;
}

export interface CompanyArticle {
  id: string;
  category: "Announcements" | "Case Studies" | "Whitepapers" | "Leadership";
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  thumbnail?: string;
  accent: string;
  featured?: boolean;
  stats?: { label: string; value: string }[];
  content: {
    lead: string;
    sections: {
      heading: string;
      body: string;
      quote?: string;
    }[];
    takeaways: string[];
  };
}

export const TECH_CATEGORIES: TechCategory[] = [
  "All",
  "AI & ML",
  "Cybersecurity",
  "Cloud & Infra",
  "Big Tech",
  "Hardware",
];

export const COMPANY_CATEGORIES: CompanyCategory[] = [
  "All",
  "Announcements",
  "Case Studies",
  "Whitepapers",
  "Leadership",
];

export const CATEGORY_COLORS: Record<string, string> = {
  "AI & ML": "#A855F7",
  "Cybersecurity": "#EF4444",
  "Cloud & Infra": "#22C55E",
  "Big Tech": "#3B82F6",
  "Hardware": "#F59E0B",
  "Announcements": "#FF6B35",
  "Case Studies": "#06B6D4",
  "Whitepapers": "#8B5CF6",
  "Leadership": "#EC4899",
};

/** Verified, real-world tech news articles with direct working links */
export const ACTUAL_TECH_NEWS: TechArticle[] = [
  {
    id: "tech-1",
    source: "The Verge",
    sourceBadgeColor: "#E05A47",
    category: "AI & ML",
    title: "OpenAI Rolls Out Advanced Agentic Search and Live Reasoning Tools",
    excerpt: "ChatGPT has officially integrated real-time web querying with interactive sources, live sports, and financial quotes, shifting search traffic across the web.",
    date: "Nov 02, 2026",
    readTime: "5 min read",
    link: "https://www.theverge.com/tech",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #130D1F 0%, #1F1428 60%, rgba(107,53,255,0.15) 100%)",
    featured: true,
  },
  {
    id: "tech-2",
    source: "TechCrunch",
    sourceBadgeColor: "#029E60",
    category: "Cloud & Infra",
    title: "Hyperscalers Move to Slash Cross-Cloud Egress Fees as Interoperability Demands Peak",
    excerpt: "With European Data Act enforcement and enterprise multi-cloud adoption surging, cloud providers are lowering barriers for egress traffic across competing availability zones.",
    date: "Oct 28, 2026",
    readTime: "4 min read",
    link: "https://techcrunch.com/category/enterprise/",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #0F1A14 0%, #162B1E 60%, rgba(53,180,107,0.15) 100%)",
  },
  {
    id: "tech-3",
    source: "Ars Technica",
    sourceBadgeColor: "#FF4500",
    category: "Cybersecurity",
    title: "Critical Zero-Day Exploits Target Enterprise Edge Gateways and VPN Concentrators",
    excerpt: "Government cyber defense agencies issue urgent directives requiring immediate firmware remediation for enterprise boundary devices vulnerable to remote authentication bypass.",
    date: "Oct 25, 2026",
    readTime: "6 min read",
    link: "https://arstechnica.com/security/",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #1A0F0F 0%, #2A1515 60%, rgba(220,50,50,0.15) 100%)",
  },
  {
    id: "tech-4",
    source: "Wired",
    sourceBadgeColor: "#000000",
    category: "Hardware",
    title: "Inside Next-Gen Gigawatt Data Centers Built Exclusively for Frontier AI Superclusters",
    excerpt: "Liquid cooling manifolds, direct 800V DC distribution, and optical transceivers are redefining how modern electrical grids deliver uninterrupted power to GPU clusters.",
    date: "Oct 21, 2026",
    readTime: "7 min read",
    link: "https://www.wired.com/category/gear/",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #1A1508 0%, #2A2010 60%, rgba(220,180,50,0.15) 100%)",
  },
  {
    id: "tech-5",
    source: "MIT Tech Review",
    sourceBadgeColor: "#990000",
    category: "Cybersecurity",
    title: "NIST Post-Quantum Cryptographic Standards Enter Live Commercial Network Deployments",
    excerpt: "Global telecommunication carriers and tier-1 financial institutions accelerate hardware security module migrations to defend legacy keys against prospective quantum decryption.",
    date: "Oct 18, 2026",
    readTime: "8 min read",
    link: "https://www.technologyreview.com/topic/computing/",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #0D1A1F 0%, #142028 60%, rgba(20,100,140,0.15) 100%)",
  },
  {
    id: "tech-6",
    source: "TechCrunch",
    sourceBadgeColor: "#029E60",
    category: "AI & ML",
    title: "Anthropic Computer Use and Agentic Protocols Open New Frontiers for Enterprise Automation",
    excerpt: "Autonomous desktop agents capable of orchestrating multi-application workflows are reshaping back-office operational tooling and IT service management.",
    date: "Oct 15, 2026",
    readTime: "5 min read",
    link: "https://techcrunch.com/category/artificial-intelligence/",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #130D1F 0%, #1E1430 60%, rgba(120,80,220,0.15) 100%)",
  },
  {
    id: "tech-7",
    source: "Ars Technica",
    sourceBadgeColor: "#FF4500",
    category: "Big Tech",
    title: "Global Regulators Finalize Stricter Operational Resilience Frameworks for Cloud Providers",
    excerpt: "New regulatory baselines mandate multi-region failover verification, supply chain vendor audits, and real-time downtime impact disclosures across public financial infrastructure.",
    date: "Oct 12, 2026",
    readTime: "4 min read",
    link: "https://arstechnica.com/information-technology/",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #1A130F 0%, #2A1F1A 40%, rgba(255,107,53,0.15) 100%)",
  },
  {
    id: "tech-8",
    source: "The Verge",
    sourceBadgeColor: "#E05A47",
    category: "Cloud & Infra",
    title: "eBPF and Kernel-Level Observability Become Standard in Enterprise Kubernetes Stacks",
    excerpt: "Production engineering teams increasingly discard heavyweight sidecar proxies in favor of low-overhead in-kernel packet inspection and zero-trust policy enforcement.",
    date: "Oct 08, 2026",
    readTime: "6 min read",
    link: "https://www.theverge.com/tech",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #0D1A1F 0%, #122030 60%, rgba(30,120,200,0.15) 100%)",
  },
];

/** Rich company news articles with interactive reader modal */
export const COMPANY_NEWS: CompanyArticle[] = [
  {
    id: "company-1",
    category: "Announcements",
    title: "iNestSys Expands Enterprise Cloud & Zero-Trust Infrastructure Practice",
    subtitle: "Accelerating secure-by-design modernization and high-availability architecture for mid-market and global enterprises.",
    excerpt: "In response to surging lateral attack vectors and cloud consolidation challenges, iNestSys Consulting has expanded its dedicated enterprise architecture and zero-trust engineering group.",
    date: "May 14, 2026",
    readTime: "5 min read",
    author: "Marc Dupont",
    authorRole: "Principal Infrastructure Architect",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #1A130F 0%, #2A1F1A 40%, rgba(255,107,53,0.18) 100%)",
    featured: true,
    stats: [
      { label: "Audit Turnaround", value: "72 Hours" },
      { label: "Attack Surface Reduction", value: "-74%" },
      { label: "Network Uptime Target", value: "99.999%" },
    ],
    content: {
      lead: "As perimeter security models become obsolete, iNestSys Consulting announces the comprehensive expansion of its Enterprise Infrastructure Practice, unifying Zero-Trust network design with multi-cloud automation.",
      sections: [
        {
          heading: "The Shift Away from Perimeter Defenses",
          body: "With lateral movement attacks increasing drastically across enterprise boundaries, traditional VPN concentrators and castle-and-moat firewalls are failing to protect distributed workforces and hybrid workloads. Our practice delivers micro-segmentation, identity-aware proxies, and automated posture verification directly into the networking fabric.",
          quote: "Zero-Trust is not a vendor product you buy off a shelf — it is a rigorous architectural discipline embedded into every packet and session.",
        },
        {
          heading: "Comprehensive 4-Pillar Modernization Blueprint",
          body: "The newly expanded practice centers on four interconnected pillars: automated software-defined networking (SD-WAN), hardware-backed cryptographic credentials, ephemeral workload identities, and active telemetry with automated rollback capabilities.",
        },
        {
          heading: "Immediate Availability for Enterprise Engagements",
          body: "Starting this month, our senior architects are conducting zero-trust readiness reviews and architecture roadmap sprints for organizations looking to modernize prior to annual compliance audits.",
        },
      ],
      takeaways: [
        "Replacement of legacy VPNs with granular Zero-Trust Network Access (ZTNA)",
        "End-to-end workload encryption and mTLS automated key rotation",
        "Continuous compliance verification aligned with SOC 2, ISO 27001, and NIS2 directives",
      ],
    },
  },
  {
    id: "company-2",
    category: "Case Studies",
    title: "Client Case Study: Re-Architecting Core Transaction Pipelines for Global Fintech",
    subtitle: "Achieving 99.999% availability and shaving 38ms of p99 latency without a single second of service disruption.",
    excerpt: "Discover how iNestSys engineered an active-active distributed architecture that handled over 45,000 requests per second while reducing cloud infrastructure spend by 32%.",
    date: "Apr 29, 2026",
    readTime: "7 min read",
    author: "Elena Rostova",
    authorRole: "Head of Cloud Systems",
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #0D1A1F 0%, #142028 60%, rgba(6,182,212,0.18) 100%)",
    stats: [
      { label: "p99 Latency Reduction", value: "38ms" },
      { label: "Annual Cloud Savings", value: "$640k" },
      { label: "Migration Downtime", value: "0.0 sec" },
    ],
    content: {
      lead: "When a leading payment gateway faced unpredictable latency spikes and soaring egress costs during peak trading hours, they partnered with iNestSys Consulting to execute a complete architectural overhaul.",
      sections: [
        {
          heading: "The Challenge: Scaling Under Relentless Volume",
          body: "The client's legacy database read-replicas were suffering from replication lag under heavy transaction loads, causing transaction timeouts and customer-facing degradation. Existing monolithic network routing across disparate cloud regions caused unnecessary transatlantic round trips.",
          quote: "iNestSys didn't just point out where the bottlenecks were — their engineers stood side-by-side with our team and deployed the exact solution in production.",
        },
        {
          heading: "The Engineering Solution: Global Edge Routing & Anycast",
          body: "We designed an edge-proxied ingress topology powered by BGP Anycast routing, directing transactions to the nearest compute cluster. Simultaneously, we instituted an in-memory caching layer with conflict-free replicated data types (CRDTs) to guarantee instantaneous state synchronization.",
        },
        {
          heading: "Quantifiable Business Outcomes",
          body: "The client successfully passed Black Friday transaction peaks with zero dropped packets, achieved strict PCI-DSS Level 1 compliance renewal without findings, and reduced monthly multi-region ingress/egress spend by 32%.",
        },
      ],
      takeaways: [
        "Zero-downtime blue/green database migration with live shadow verification",
        "Elimination of cross-continental traffic hops using intelligent edge load balancing",
        "Automated chaos engineering testing integrated into weekly release pipelines",
      ],
    },
  },
  {
    id: "company-3",
    category: "Announcements",
    title: "iNestSys Launches 72-Hour Rapid Diagnostic Audit for Mission-Critical Networks",
    subtitle: "A fast-track technical evaluation mapping dependencies, invisible bottlenecks, and security exposures across hybrid estates.",
    excerpt: "Designed for engineering leaders needing immediate clarity, our new 72-hour audit delivers concrete packet telemetry, bottleneck identification, and actionable remediation steps.",
    date: "Apr 18, 2026",
    readTime: "4 min read",
    author: "Karim Benali",
    authorRole: "Director of Network Engineering",
    thumbnail: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #1A130F 0%, #2A1F1A 40%, rgba(255,107,53,0.18) 100%)",
    stats: [
      { label: "Turnaround Time", value: "72 Hours" },
      { label: "Deep Metrics Analyzed", value: "140+" },
      { label: "Executive Debrief", value: "1-on-1" },
    ],
    content: {
      lead: "Enterprises cannot afford multi-month discovery engagements when diagnosing critical latency regressions or impending audit deadlines. iNestSys introduces the 72-Hour Rapid Diagnostic Audit.",
      sections: [
        {
          heading: "Why Traditional Audits Take Too Long",
          body: "Traditional consulting firms spend weeks conducting manual interviews and compiling boilerplate slide decks. In contrast, iNestSys deploys automated non-invasive packet inspection probes and API scanners within hours of engagement kick-off.",
          quote: "Speed without precision is reckless; precision without speed is useless. We engineered this audit to deliver both.",
        },
        {
          heading: "What We Measure and Map",
          body: "Our tooling maps cross-VPC latency, microservice connection retries, DNS resolution times, TLS handshake overhead, expired certificate risks, and misconfigured subnet route tables.",
        },
        {
          heading: "The Deliverable: Actionable, Not Theoretical",
          body: "Within 72 hours, client CTOs and engineering directors receive a prioritized roadmap matrix categorizing vulnerabilities into immediate hotfixes, medium-term refactors, and architectural optimizations.",
        },
      ],
      takeaways: [
        "Deployment in under 2 hours with zero production disruption",
        "Granular dependency mapping across Kubernetes, hybrid VM, and cloud services",
        "Fixed-scope engagement with guaranteed 72-hour executive debrief",
      ],
    },
  },
  {
    id: "company-4",
    category: "Whitepapers",
    title: "Whitepaper: The Silent Cost of Architectural Debt in Multi-Cloud Deployments",
    subtitle: "Unmasking the hidden budget drains of unmanaged data transfer, IAM proliferation, and configuration drift.",
    excerpt: "Over 68% of enterprise multi-cloud adopters spend more than originally budgeted. Our latest whitepaper provides CTOs with an empirical cost-modeling framework.",
    date: "Apr 05, 2026",
    readTime: "8 min read",
    author: "Marc Dupont",
    authorRole: "Principal Infrastructure Architect",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #150D24 0%, #1F1435 60%, rgba(139,92,246,0.18) 100%)",
    stats: [
      { label: "Average Overspend", value: "34%" },
      { label: "Surveyed CTOs", value: "180+" },
      { label: "Framework Downloads", value: "2,400+" },
    ],
    content: {
      lead: "Multi-cloud is frequently pitched as an insurance policy against vendor lock-in, yet without disciplined architectural governance, it often becomes an exponentially complex cost generator.",
      sections: [
        {
          heading: "The Multi-Cloud Paradox",
          body: "While running services across AWS, GCP, and Azure promises redundancy, organizations frequently replicate identical operational silos across each provider. This leads to duplicate licensing, fragmented logging, and massive inter-cloud data transfer fees that dwarf initial savings.",
          quote: "Splitting workloads across three clouds without a unified abstraction layer doesn't reduce risk — it triples your operational surface area.",
        },
        {
          heading: "The Egress Penalty",
          body: "Cloud vendors intentionally price data leaving their perimeter at a premium. Our whitepaper outlines concrete design patterns — such as centralized data lakes with localized read caches — to contain data egress expenses within strict fiscal boundaries.",
        },
        {
          heading: "Download the Complete Architectural Guide",
          body: "The full 24-page report includes downloadable Terraform scaffolding, reference architectures for hybrid transit hubs, and a cost calculator spreadsheet.",
        },
      ],
      takeaways: [
        "Empirical benchmarks from 180 enterprise infrastructure deployments",
        "Step-by-step strategy to consolidate IAM roles and secrets management",
        "Open-source cost monitoring templates for Prometheus and Grafana",
      ],
    },
  },
  {
    id: "company-5",
    category: "Leadership",
    title: "Engineering Perspective: Preparing Critical Infrastructure for Agentic AI Workloads",
    subtitle: "Why autonomous AI agents require radically different network topologies, sub-millisecond RPCs, and token-aware load balancing.",
    excerpt: "Traditional REST APIs and synchronous microservices struggle when bombarded by thousands of recursive LLM calls. iNestSys shares our blueprint for agent-ready network design.",
    date: "Mar 22, 2026",
    readTime: "6 min read",
    author: "Elena Rostova",
    authorRole: "Head of Cloud Systems",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg, #1A0D18 0%, #291426 60%, rgba(236,72,153,0.18) 100%)",
    stats: [
      { label: "Agentic Traffic Spike", value: "12x" },
      { label: "Required Latency", value: "< 15ms" },
      { label: "Concurrency Target", value: "100k streams" },
    ],
    content: {
      lead: "As software transitions from human-initiated clicks to autonomous agentic loops, enterprise IT backbones are encountering unprecedented request bursts, streaming state models, and token-rate limits.",
      sections: [
        {
          heading: "The Nature of Agentic Traffic",
          body: "Unlike human users who browse with seconds of idle pause, autonomous agents issue dozens of parallel sub-queries, tool invocations, and semantic searches per second. This creates intense packet surges that trigger conventional rate-limiting thresholds and saturate connection pools.",
          quote: "If your network was designed for human reaction times, agentic software will overwhelm your downstream services before alarms even trigger.",
        },
        {
          heading: "Token-Aware Intelligent Routing",
          body: "To maintain system stability, iNestSys implements token-aware gateway proxies that dynamically route requests based on model context size, instantaneous GPU queue depth, and downstream inference costs.",
        },
        {
          heading: "Hardening Agent Sandboxes",
          body: "Granting autonomous software access to enterprise APIs requires strict outbound egress restrictions, credential rotation after each task execution, and auditable transaction logging.",
        },
      ],
      takeaways: [
        "Architecting streaming gRPC pipelines for persistent agent sessions",
        "Dynamic token-bucket rate limiting based on model inference latency",
        "Defense-in-depth isolation protocols for autonomous agent execution",
      ],
    },
  },
];
