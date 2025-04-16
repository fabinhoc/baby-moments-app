interface OptionType {
  title: string;
  check: boolean;
}

export interface PlanType {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  stripe_price_id: string;
  available_memory: number;
  price: string;
  status: string;
  options: OptionType[];
}
