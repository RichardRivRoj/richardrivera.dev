export interface ProjectMedia {
  type: "image" | "video" | "gif";
  src: string;
  poster?: string;
  alt: string;
  caption: string;
}

export interface ProjectVideo {
  type: "local" | "youtube" | "vimeo";
  url: string;
  title: string;
  description: string;
}

export interface ProjectObjective {
  title: string;
  description: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectArchitecture {
  title: string;
  description: string;
  diagram: string;
}

export interface ProjectTechnologies {
  frontend: string[];
  backend: string[];
  database: string[];
  tools: string[];
}

export interface ProjectLinks {
  github?: string;
  live?: string;
}

export interface ProjectDetail {
  overview: {
    title: string;
    description: string;
    heroImage: string;
  };

  problem: {
    title: string;
    description: string;
  };

  solution: {
    title: string;
    description: string;
  };

  objectives: ProjectObjective[];

  architecture: ProjectArchitecture;

  features: ProjectFeature[];

  technologies: ProjectTechnologies;

  gallery: {
    description: string;
    visual: ProjectMedia[];
  }

  videos: ProjectVideo[];

  results: {
    title: string;
    description: string;
  };

  links: ProjectLinks;
}