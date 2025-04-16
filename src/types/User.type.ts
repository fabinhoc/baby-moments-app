import type { PlanType } from './Plan.type';

interface SubscriptionType {
  type: string;
  stripe_status: string;
  trial_ends_at: Date;
  ends_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface UserType {
  name: string;
  uuid: string;
  avatar: string | null;
  email: string;
  created_at: Date;
  updated_at: Date;
  email_verified_at: Date | null;
  available_memory: number | null;
  memory_used: number | null;
  subscription: SubscriptionType;
  plan: PlanType | null;
}
