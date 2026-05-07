export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "neural-trade",
    title: "NeuralTrade Platform",
    client: "QuantumFi Labs",
    description:
      "AI-powered trading platform combining machine learning predictions with DeFi protocols for automated portfolio management.",
    tags: ["AI", "Web3", "DeFi"],
    image: "/projects/placeholder.svg",
    featured: true,
  },
];
