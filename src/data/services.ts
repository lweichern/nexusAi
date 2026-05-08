export interface Service {
  id: string;
  title: string;
  description: string;
  icon: "brain" | "chain" | "device";
  capabilities: string[];
  technologies: string[];
}

export const services: Service[] = [
  {
    id: "ai",
    title: "AI Solutions",
    description:
      "Intelligent systems that transform data into decisions. From custom ML models and LLM-powered applications to fully autonomous AI agents — we build the intelligence layer that gives your product an unfair advantage.",
    icon: "brain",
    capabilities: [
      "Custom ML Models",
      "LLM Integration & Fine-tuning",
      "Computer Vision",
      "AI Agent Development",
      "Natural Language Processing",
      "Predictive Analytics",
      "RAG Pipelines",
      "AI Automation Workflows",
    ],
    technologies: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "OpenAI API",
      "LangChain",
      "Hugging Face",
      "Vector DBs",
      "ONNX",
    ],
  },
  {
    id: "web3",
    title: "Web3 Development",
    description:
      "Decentralized applications and blockchain infrastructure for the next generation of the internet. From smart contracts and DeFi protocols to DAO governance and cross-chain bridges — we build trustless systems that scale.",
    icon: "chain",
    capabilities: [
      "Smart Contract Development",
      "DeFi Protocol Design",
      "NFT Platforms & Marketplaces",
      "Cross-Chain Bridges",
      "DAO Governance Systems",
      "Token Engineering",
      "Security Audits",
      "Blockchain Integration",
    ],
    technologies: [
      "Solidity",
      "Rust",
      "Ethereum",
      "Solana",
      "Polygon",
      "Hardhat",
      "Foundry",
      "IPFS",
    ],
  },
  {
    id: "web-mobile",
    title: "Web & Mobile",
    description:
      "Pixel-perfect applications built for performance and scale. From responsive web apps and native mobile experiences to complex SaaS platforms and real-time dashboards — we craft digital products that users love.",
    icon: "device",
    capabilities: [
      "Web Applications",
      "Mobile Apps (iOS & Android)",
      "E-commerce Platforms",
      "SaaS Products",
      "Real-time Dashboards",
      "API Design & Development",
      "Design Systems",
      "Performance Optimization",
    ],
    technologies: [
      "React",
      "Next.js",
      "React Native",
      "Node.js",
      "PostgreSQL",
      "TypeScript",
      "GraphQL",
      "AWS / Vercel",
    ],
  },
];
