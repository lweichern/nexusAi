export interface ProjectResult {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  image: string;
  featured: boolean;
  year: string;
  category: "ai" | "web3" | "web-mobile";
  challenge: string;
  solution: string[];
  results: ProjectResult[];
  stack: string[];
  timeline: string;
  teamSize: string;
}

export const projects: Project[] = [
  {
    id: "neural-trade",
    title: "NeuralTrade Platform",
    client: "QuantumFi Labs",
    description:
      "AI-powered trading platform combining machine learning predictions with DeFi protocols for automated portfolio management. Reduced average trade latency by 40% and improved prediction accuracy to 87%.",
    tags: ["AI", "Web3", "DeFi", "Python"],
    image: "/projects/neural-trade.svg",
    featured: true,
    year: "2025",
    category: "ai",
    challenge:
      "QuantumFi Labs needed a platform that could analyze massive volumes of market data in real-time, generate predictive signals using machine learning, and execute trades autonomously across multiple DeFi protocols — all while maintaining sub-second latency and institutional-grade risk management.",
    solution: [
      "We architected a multi-layer system with a high-throughput data ingestion pipeline capable of processing 100K+ market events per second from 15 exchanges simultaneously. The core ML engine uses an ensemble of LSTM networks and transformer models trained on 3 years of historical data.",
      "The execution layer integrates directly with Uniswap, Aave, and Compound smart contracts through custom router contracts that optimize for gas efficiency and MEV protection. A real-time risk engine monitors portfolio exposure and automatically hedges positions when volatility thresholds are breached.",
      "The frontend dashboard gives traders full visibility into model predictions, active positions, and portfolio performance with real-time WebSocket updates and interactive charting powered by D3.js.",
    ],
    results: [
      { label: "Trade Latency Reduction", value: "40%" },
      { label: "Prediction Accuracy", value: "87%" },
      { label: "Assets Under Management", value: "$180M" },
      { label: "Daily Transactions", value: "50K+" },
    ],
    stack: ["Python", "PyTorch", "FastAPI", "Solidity", "React", "Next.js", "PostgreSQL", "Redis", "Kubernetes", "AWS"],
    timeline: "8 months",
    teamSize: "12 engineers",
  },
  {
    id: "chainvault",
    title: "ChainVault Security",
    client: "Meridian Protocol",
    description:
      "Enterprise-grade multi-sig wallet infrastructure with hardware security module integration. Manages over $2B in digital assets across 12 blockchain networks with zero security incidents.",
    tags: ["Web3", "Security", "Solidity", "Infrastructure"],
    image: "/projects/chainvault.svg",
    featured: true,
    year: "2025",
    category: "web3",
    challenge:
      "Meridian Protocol required a custody solution that could secure billions in digital assets across multiple blockchains while meeting SOC 2 Type II compliance. Existing solutions were either too centralized or lacked the enterprise features needed for institutional adoption — multi-sig workflows, role-based access, audit trails, and HSM integration.",
    solution: [
      "We built a modular custody architecture where each blockchain network is abstracted behind a unified signing interface. The core security layer integrates with Thales Luna HSMs for key generation and signing, ensuring private keys never exist in software memory.",
      "The multi-sig engine supports configurable M-of-N approval workflows with time-locks, spending limits, and allowlisted addresses. Every transaction goes through a policy engine that enforces organization-specific rules before reaching the signing threshold.",
      "We implemented a real-time monitoring system that tracks all on-chain movements, flags suspicious patterns, and generates compliance reports automatically. The admin dashboard provides a complete audit trail of every approval, rejection, and policy change.",
    ],
    results: [
      { label: "Assets Secured", value: "$2B+" },
      { label: "Security Incidents", value: "0" },
      { label: "Supported Chains", value: "12" },
      { label: "SOC 2 Compliance", value: "Type II" },
    ],
    stack: ["Solidity", "Rust", "Go", "TypeScript", "React", "PostgreSQL", "HSM SDK", "Terraform", "GCP", "Grafana"],
    timeline: "10 months",
    teamSize: "9 engineers",
  },
  {
    id: "synapse-health",
    title: "SynapseHealth AI",
    client: "Vertex Medical",
    description:
      "HIPAA-compliant diagnostic assistance platform using computer vision and NLP to analyze medical imaging and patient records. Deployed across 30+ hospitals, assisting 500+ physicians daily.",
    tags: ["AI", "Computer Vision", "Healthcare", "NLP"],
    image: "/projects/synapse-health.svg",
    featured: true,
    year: "2024",
    category: "ai",
    challenge:
      "Vertex Medical wanted to reduce diagnostic errors and speed up radiology workflows without replacing physician judgment. They needed an AI system that could analyze X-rays, CT scans, and MRIs with high sensitivity, surface relevant patient history via NLP, and integrate seamlessly with existing hospital PACS and EHR systems — all while maintaining strict HIPAA compliance.",
    solution: [
      "We trained custom convolutional neural networks on 2M+ anonymized medical images across 14 pathology categories, achieving 94% sensitivity on the validation set. The models run on-premise within hospital infrastructure using NVIDIA Triton Inference Server, ensuring patient data never leaves the facility.",
      "The NLP module processes patient records, lab results, and clinical notes to surface relevant prior findings alongside each scan. It uses a fine-tuned clinical language model that understands medical terminology and abbreviations specific to radiology workflows.",
      "Integration was built using HL7 FHIR APIs to connect with major EHR systems (Epic, Cerner) and DICOM protocols for PACS interoperability. The physician-facing UI was designed with radiologists to minimize workflow disruption — AI findings appear as overlays on existing viewing software.",
    ],
    results: [
      { label: "Diagnostic Sensitivity", value: "94%" },
      { label: "Hospitals Deployed", value: "30+" },
      { label: "Physicians Assisted Daily", value: "500+" },
      { label: "Avg. Read Time Reduction", value: "35%" },
    ],
    stack: ["Python", "PyTorch", "ONNX", "NVIDIA Triton", "FastAPI", "React", "HL7 FHIR", "DICOM", "Docker", "On-Premise"],
    timeline: "12 months",
    teamSize: "14 engineers",
  },
  {
    id: "metaverse-gallery",
    title: "MetaGallery",
    client: "Prism Digital",
    description:
      "Immersive 3D NFT gallery and marketplace built on Polygon. Artists can mint, curate, and sell digital art in customizable virtual exhibition spaces. 15K+ active collectors, $8M+ in total sales volume.",
    tags: ["Web3", "NFT", "3D", "Marketplace"],
    image: "/projects/metaverse-gallery.svg",
    featured: false,
    year: "2024",
    category: "web3",
    challenge:
      "Prism Digital envisioned a next-generation art marketplace where digital art is experienced, not just browsed. They needed a platform that combines the immersive quality of a virtual gallery with the transactional infrastructure of an NFT marketplace — low gas fees, instant minting, and seamless fiat onramps for mainstream collectors.",
    solution: [
      "We built the 3D gallery engine using Three.js and React Three Fiber, enabling artists to design custom exhibition spaces with lighting, spatial audio, and interactive elements. Each gallery is shareable via a unique URL and can host virtual openings with real-time multiplayer support via WebRTC.",
      "The marketplace layer runs on Polygon for near-zero gas fees, with lazy minting that lets artists list without upfront costs. Smart contracts handle royalty enforcement, auction mechanics, and split payments to collaborators. We integrated Stripe for fiat purchases with automatic crypto settlement.",
      "The discovery engine uses collaborative filtering and visual similarity search (powered by CLIP embeddings) to help collectors find art that matches their taste. Curators can assemble themed collections and earn commission on sales.",
    ],
    results: [
      { label: "Active Collectors", value: "15K+" },
      { label: "Total Sales Volume", value: "$8M+" },
      { label: "Artists Onboarded", value: "2,500+" },
      { label: "Avg. Gallery Visit Duration", value: "4.2 min" },
    ],
    stack: ["React", "Three.js", "R3F", "Solidity", "Polygon", "Node.js", "PostgreSQL", "IPFS", "Stripe", "WebRTC"],
    timeline: "7 months",
    teamSize: "10 engineers",
  },
  {
    id: "echo-analytics",
    title: "Echo Analytics Dashboard",
    client: "Aether Technologies",
    description:
      "Real-time business intelligence platform with AI-powered anomaly detection and predictive forecasting. Processes 50M+ events daily with sub-second query performance and custom alert pipelines.",
    tags: ["AI", "SaaS", "React", "Data"],
    image: "/projects/echo-analytics.svg",
    featured: false,
    year: "2024",
    category: "web-mobile",
    challenge:
      "Aether Technologies was drowning in data from 200+ microservices. Their existing BI tools couldn't handle the volume, had 30-second query times, and required data engineering support for every new dashboard. They needed a self-service analytics platform that could ingest massive event streams and surface insights automatically.",
    solution: [
      "We designed a streaming architecture using Apache Kafka for ingestion and ClickHouse as the OLAP store, achieving sub-second queries on billions of rows. A materialized view layer pre-computes common aggregations so dashboards load instantly even on complex queries.",
      "The anomaly detection engine runs statistical models (STL decomposition + isolation forests) on every metric stream, automatically surfacing deviations and correlating them across services. Alerts are routed through configurable pipelines — Slack, PagerDuty, email — with intelligent grouping to reduce noise.",
      "The frontend is a drag-and-drop dashboard builder where anyone can create charts, set filters, and share views without writing SQL. Power users get a full SQL editor with autocomplete and query optimization hints. Everything updates in real-time via server-sent events.",
    ],
    results: [
      { label: "Daily Events Processed", value: "50M+" },
      { label: "Avg. Query Time", value: "<200ms" },
      { label: "Alert Noise Reduction", value: "75%" },
      { label: "Self-Service Adoption", value: "92%" },
    ],
    stack: ["React", "Next.js", "TypeScript", "Apache Kafka", "ClickHouse", "Python", "Node.js", "Redis", "Docker", "AWS"],
    timeline: "6 months",
    teamSize: "8 engineers",
  },
  {
    id: "defi-bridge",
    title: "Omnis Cross-Chain Bridge",
    client: "Cipher Systems",
    description:
      "Trustless cross-chain bridge protocol enabling seamless asset transfers between Ethereum, Solana, and Polygon. Processed $500M+ in cross-chain volume with an average bridge time of 45 seconds.",
    tags: ["Web3", "DeFi", "Solidity", "Rust"],
    image: "/projects/defi-bridge.svg",
    featured: false,
    year: "2024",
    category: "web3",
    challenge:
      "Cross-chain bridges are the highest-value targets in DeFi — responsible for over $2B in hacks. Cipher Systems needed a bridge that was both fast and secure, using decentralized validation rather than trusted relayers, while supporting heterogeneous chains (EVM and non-EVM) without sacrificing user experience.",
    solution: [
      "We implemented a light-client verification model where each chain maintains a lightweight consensus proof of the other. On the EVM side, Solidity contracts verify SPV proofs from Solana; on the Solana side, a Rust program verifies Ethereum block headers using the Beacon Chain light client protocol.",
      "The relayer network is permissionless — anyone can run a relayer and earn fees by submitting proofs. We added economic security through a staking mechanism where relayers bond tokens that can be slashed for fraudulent proofs. Watchtower nodes monitor all cross-chain messages for validity.",
      "The frontend abstracts all complexity behind a simple swap interface. Users select source/destination chains, input an amount, and click bridge. Gas estimation, token approval, and proof submission happen automatically. A status tracker shows real-time progress of each bridge transaction.",
    ],
    results: [
      { label: "Cross-Chain Volume", value: "$500M+" },
      { label: "Avg. Bridge Time", value: "45 sec" },
      { label: "Security Incidents", value: "0" },
      { label: "Active Relayers", value: "120+" },
    ],
    stack: ["Solidity", "Rust", "TypeScript", "React", "Ethereum", "Solana", "Polygon", "Foundry", "Anchor", "TheGraph"],
    timeline: "9 months",
    teamSize: "11 engineers",
  },
  {
    id: "aiden-assistant",
    title: "AIDEN Enterprise Assistant",
    client: "Block Protocol Inc.",
    description:
      "Conversational AI assistant for enterprise knowledge management. Integrates with internal docs, Slack, and databases to provide instant answers with source citations. Reduced internal support tickets by 60%.",
    tags: ["AI", "LLM", "Enterprise", "NLP"],
    image: "/projects/aiden-assistant.svg",
    featured: false,
    year: "2025",
    category: "ai",
    challenge:
      "Block Protocol had 50,000+ internal documents spread across Confluence, Google Drive, Notion, and Slack — and employees spent an average of 45 minutes per day searching for information. They needed an AI assistant that could understand natural language questions, find relevant answers across all sources, and cite its sources so employees could trust the responses.",
    solution: [
      "We built a RAG (Retrieval-Augmented Generation) pipeline that indexes all internal knowledge sources in real-time. Documents are chunked, embedded using a fine-tuned embedding model, and stored in a vector database (Pinecone) with metadata for access control. When a user asks a question, we retrieve the top-k relevant chunks, re-rank them, and generate an answer with inline citations.",
      "The conversational layer uses a fine-tuned LLM that understands Block Protocol's domain terminology, org structure, and common workflows. It handles follow-up questions, clarifications, and multi-turn conversations. Answers include confidence scores and links to source documents.",
      "Integration points include a Slack bot (most popular), a web app with chat history, and an API for embedding AIDEN into internal tools. An admin dashboard shows usage analytics, unanswered questions (knowledge gaps), and source freshness metrics. We implemented role-based access so AIDEN only surfaces documents the user is authorized to see.",
    ],
    results: [
      { label: "Support Tickets Reduced", value: "60%" },
      { label: "Avg. Answer Time", value: "2.3 sec" },
      { label: "Answer Accuracy", value: "91%" },
      { label: "Daily Active Users", value: "3,200+" },
    ],
    stack: ["Python", "LangChain", "OpenAI API", "Pinecone", "FastAPI", "React", "Next.js", "Slack SDK", "PostgreSQL", "GCP"],
    timeline: "5 months",
    teamSize: "7 engineers",
  },
  {
    id: "quantum-dao",
    title: "QuantumDAO Governance",
    client: "Nexus Finance",
    description:
      "Full-stack DAO governance platform with on-chain voting, proposal management, and treasury analytics. Powers governance for 5 major DAOs with $200M+ in combined treasury value.",
    tags: ["Web3", "DAO", "Governance", "React"],
    image: "/projects/quantum-dao.svg",
    featured: false,
    year: "2023",
    category: "web3",
    challenge:
      "Existing DAO governance tools were fragmented — Snapshot for off-chain voting, Gnosis Safe for treasury, separate forums for discussion. Nexus Finance needed a unified platform where communities could propose, discuss, vote, and execute governance actions seamlessly, with full on-chain transparency and gasless voting for better participation.",
    solution: [
      "We built a modular governance framework where each DAO can configure its own voting rules — token-weighted, quadratic, conviction voting, or custom strategies. Votes are collected off-chain using EIP-712 signatures for gasless participation, then aggregated and verified on-chain at proposal resolution.",
      "The proposal lifecycle integrates discussion (threaded comments with reactions), voting (with delegation support), and execution (automated on-chain transactions via Gnosis Safe). Treasury analytics give token holders real-time visibility into fund allocation, runway projections, and spending trends.",
      "We built a governance analytics engine that tracks voter participation, delegate performance, proposal success rates, and treasury health across all DAOs. Public dashboards create accountability and help communities optimize their governance processes over time.",
    ],
    results: [
      { label: "DAOs Powered", value: "5" },
      { label: "Combined Treasury", value: "$200M+" },
      { label: "Voter Participation Increase", value: "3.5x" },
      { label: "Proposals Executed", value: "850+" },
    ],
    stack: ["React", "Next.js", "TypeScript", "Solidity", "Ethereum", "Polygon", "TheGraph", "IPFS", "PostgreSQL", "Vercel"],
    timeline: "6 months",
    teamSize: "8 engineers",
  },
];

export const categories = [
  { id: "all", label: "All Projects" },
  { id: "ai", label: "AI Solutions" },
  { id: "web3", label: "Web3" },
  { id: "web-mobile", label: "Web & Mobile" },
] as const;
