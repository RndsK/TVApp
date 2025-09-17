import type { MediaItem } from '../navigation';
import rawCatalog from '../../assets/catalog.json';

type RawItem = {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  streamUrl: string;
  duration?: number;
};

export async function loadCatalog(): Promise<MediaItem[]> {
  const items = (rawCatalog.items as RawItem[]).map(i => ({
    id: i.id,
    title: i.title,
    description: i.description,
    thumb: i.thumbnail,
    videoUrl: i.streamUrl,
    duration: i.duration,
  }));
  return items;
}
