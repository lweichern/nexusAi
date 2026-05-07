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
      "Intelligent systems that transform data into decisions. From custom ML models to LLM-powered applications.",
    icon: "brain",
    capabilities: [
      "Machine Learning",
      "LLM Integration",
      "Computer Vision",
      "AI Automation",
      "Data Analytics",
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "LangChain"],
  },
  {
    id: "web3",
    title: "Web3 Development",
    description:
      "Decentralized applications and blockchain infrastructure. Building the next generation of the internet.",
    icon: "chain",
    capabilities: [
      "Smart Contracts",
      "DeFi Protocols",
      "NFT Platforms",
      "Blockchain Integration",
      "Token Development",
    ],
    technologies: ["Solidity", "Ethereum", "Polygon", "Hardhat", "IPFS"],
  },
  {
    id: "web-mobile",
    title: "Web & Mobile",
    description:
      "Pixel-perfect applications that scale. From responsive web apps to native mobile experiences.",
    icon: "device",
    capabilities: [
      "Web Applications",
      "Mobile Apps",
      "E-commerce",
      "SaaS Platforms",
      "API Development",
    ],
    technologies: ["React", "Next.js", "React Native", "Node.js", "PostgreSQL"],
  },
];
