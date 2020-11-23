import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../models';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input()
  content: CartItem[] = []

  @Output()
  onItemSelect = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void { }

  itemClicked(id: string) {
    this.onItemSelect.next(id)
  }

}
