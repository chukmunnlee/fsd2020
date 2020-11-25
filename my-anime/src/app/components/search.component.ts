import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  genre = 'anime'

  form: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      q: this.fb.control('', [ Validators.required ])
    })
  }

  setGenre(g: string) {
    this.genre = g;
    console.info(`genre: `, this.genre)
  }

}
