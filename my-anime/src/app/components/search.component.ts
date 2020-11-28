import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimeDatabase, normaizeSearchText } from '../anime.database';
import { Genre, SearchOption } from '../models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  genre = 'anime'

  form: FormGroup

  constructor(private fb: FormBuilder, private animeDB: AnimeDatabase,
      private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      q: this.fb.control('', [ Validators.required ])
    })
  }

  gotoResult() {
    // search/:genre/:q
    const q = normaizeSearchText(this.form.get('q').value)
    this.router.navigate(['/search', this.genre, q ])
  }

  async saveOptions() {
    const opt: SearchOption = {
      q: this.form.get('q').value,
      genre: this.genre == 'anime'? Genre.Anime: Genre.Manga
    }

    await this.animeDB.saveSearchOption(opt)

    this.gotoResult()
  }

  setGenre(g: string) {
    this.genre = g;
    console.info(`genre: `, this.genre)
  }

}
