import type { AlbumType } from './Album.type';
import type { AlbumFileFileTypeEnum } from './enums/AlbumFileType.enum';

export interface AlbumFileType {
  id: number;
  album: AlbumType;
  title: string;
  memory_usage: number;
  file_path: string;
  file_type: AlbumFileFileTypeEnum;
}
