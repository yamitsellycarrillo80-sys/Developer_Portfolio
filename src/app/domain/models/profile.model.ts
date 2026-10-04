export interface SocialLink {
  id: 'github' | 'linkedin' | 'instagram' | 'tiktok';
  label: string;
  handle: string;
  url: string;
}

export interface Profile {
  fullName: string;
  level: number;
  socialLinks: SocialLink[];
}
