import { Injectable } from "@angular/core";
import Dexie from 'dexie';
import { Genre, SearchOption } from './models';

export const normaizeSearchText = (q: string) => q.trim().toLowerCase()

@Injectable()
export class AnimeDatabase extends Dexie {

  private searchOption: Dexie.Table<SearchOption, number>;

  constructor() {
    super('anime')
    //create schema
    this.version(1).stores({
      // index q
      searchOption: '++id,q'
    })

    this.searchOption = this.table('searchOption')
  }
// hehe
  async saveSearchOption(s: SearchOption): Promise<any> {
    const gen = s.genre == Genre.Anime? 0: 1
    s.q = normaizeSearchText(s.q)
    // select count(*)  from searchOption where q = 'abc' and genre = 'anime'
    const resultCount = await this.searchOption
        .where('q').equals(s.q)
        .and(doc => doc.genre == gen)
        .count()

    if (resultCount <= 0)
      return this.searchOption.add(s)
  }

  getSearchOptions(): Promise<SearchOption[]> {
    return this.searchOption.orderBy('q').toArray()
  }
}
