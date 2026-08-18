export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  featured?: boolean;
}

export interface ProjectObjective {
  title: string;
  description: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectVideo {
  title: string;
  description: string;
  url: string;
}

export interface ProjectArchitecture {
  label: string;
  title: string;
  description: string;
  diagram: string;
}

export interface ProjectTechnologies {
  label: string;
  frontend: string[];
  backend: string[];
  database: string[];
  tools: string[];
}

export interface ProjectDetail {
  overview: {
    label: string;
    title: string;
    description: string;
  };

  problem: {
    label: string;
    title: string;
    description: string;
  };

  solution: {
    label: string;
    title: string;
    description: string;
  };

  objectives: ProjectObjective[];

  architecture: ProjectArchitecture;

  features: ProjectFeature[];

  technologies: ProjectTechnologies;

  gallery: ProjectGalleryItem[];

  videos: ProjectVideo[];

  results: {
    label: string;
    title: string;
    description: string;
  };

  links: {
    github?: string;
    live?: string;
  };
}