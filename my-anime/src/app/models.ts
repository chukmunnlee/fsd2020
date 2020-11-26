export enum Genre {
  Anime, Manga
}
export interface SearchOption {
  id?: number;
  q: string;
  genre: Genre
}

export interface SearchResult {
  image: string
  title: string
  synopsis: string
}
