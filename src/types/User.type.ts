import type { PlanType } from './Plan.type';

interface SubscriptionType {
  stripe_status: string;
  plan: PlanType;
}

interface UserCard {
  brand: string;
  last4: string;
}

interface UserInvoice {
  amount: string;
  card: UserCard;
  date: string;
  pdf_url: string;
  status: string;
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
  current_card: UserCard | null;
  invoices: UserInvoice[];
}
