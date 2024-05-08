export interface ImageData {
  comments: number;
  downloads: number;
  duration: number;
  id: number;
  likes: number;
  pageURL: string;
  tags: string;
  type: string;
  user: string;
  userImageURL: string;
  user_id: number;
  videos: Videos;
  views: number;
}

interface Videos {
  large: Large;
  medium: Large;
  small: Large;
  tiny: Large;
}

interface Large {
  height: number;
  size: number;
  thumbnail: string;
  url: string;
  width: number;
}

export interface Filters {
  order: string[];
  orientation: string[];
  type: string[];
  colors: string[];
}
