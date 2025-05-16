import type { AlbumType } from './Album.type';
import type { TimelineType } from './Timeline.type';

export interface MomentType {
  id: number;
  title: string;
  description: string | null;
  avatar: string | null;
  theme: string | null;
  album: AlbumType;
  timeline: TimelineType;
  position: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  isVisible?: boolean | null;
  moment_date: string | null;
  memory_used: number | null;
}
