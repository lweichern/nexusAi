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
  },
];

export const categories = [
  { id: "all", label: "All Projects" },
  { id: "ai", label: "AI Solutions" },
  { id: "web3", label: "Web3" },
  { id: "web-mobile", label: "Web & Mobile" },
] as const;
