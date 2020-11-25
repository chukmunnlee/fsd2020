export enum Genre {
  Anime, Manga
}
export interface SearchOption {
  id?: number;
  q: string;
  genre: Genre
}
