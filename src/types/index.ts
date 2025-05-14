export type Reward = {
  _id: string;
  tier: string;
  amount: number;
  description: string;
};

export type SocialLink = {
  _id: string;
  platform: string;
  url: string;
};

export type Creator = {
  _id: string;
  name: string;
  email: string;
  image: string;
};

export type ICampaign = {
  _id: string;
  title: string;
  contributors: string;
  description: string;
  country: string;
  fundingGoal: number;
  amountRaised: number;
  category: string;
  image: string;
  rewards: Reward[];
  socialLinks: SocialLink[];
  creator: Creator;
  status: "draft" | "active" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface ITestimonial {
  id: string;
  testimonial: string;
  createdBy: string;
  createdByImage: string;
  company: string;
  jobPosition: string;
}

export interface ICountry {
  name: string;
  code: string;
  emoji: string;
  unicode: string;
  image: string;
}

export interface ICurrency {
  cc: string;
  symbol: string;
  name: string;
}
