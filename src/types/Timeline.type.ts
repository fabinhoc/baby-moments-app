import type { MomentType } from './Moment.type';

export interface TimelineType {
  uuid: string;
  title: string;
  description: string | null;
  memory_used: number;
  created_at: Date;
  updated_at: Date;
  moments: MomentType[];
}
