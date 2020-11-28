import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { SearchResult } from '../models';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  genre = ''
  q = ''
  searchResults: SearchResult[] = []
  canShare = false

  constructor(private router: Router, private activatedRoute: ActivatedRoute
        , private http: HttpClient, private webShare: NgNavigatorShareService) { }

  ngOnInit(): void {

    // @ts-check
    this.canShare = !!navigator['share']

    this.genre = this.activatedRoute.snapshot.params['genre']
    this.q = this.activatedRoute.snapshot.params['q']

    const url = `https://api.jikan.moe/v3/search/${this.genre}`
    let params = (new HttpParams()).set('q', this.q)

    this.http.get<any>(url, { params: params })
      .toPromise()
      .then(resp => {
        const results = resp['results'] as any[]
        this.searchResults = results.map(r => {
          return {
            image: r['image_url'],
            title: r['title'],
            synopsis: r['synopsis']
          } as SearchResult
        })
        console.info('>>> searchResults: ', this.searchResults)
      })
  }

  shareThis(idx: number) {
    console.info('>>> idx = ', idx)
    const r = this.searchResults[idx]
    console.info('>>> r = ', r)
    navigator.share({
      title: r.title,
      text: r.synopsis,
      url: r.image
    })
    .catch(e => console.error('WebShare: ', e))
  }
}
