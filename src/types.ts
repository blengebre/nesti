export interface Project {
  title: string;
  description: string;
  tags: string[];
  impact: string;
}

export interface Achievement {
  title: string;
  institution: string;
  period: string;
  description: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface VolunteerWork {
  role: string;
  organization: string;
  impact: string;
}
