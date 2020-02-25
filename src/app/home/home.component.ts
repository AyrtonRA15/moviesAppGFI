import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromMovie from '../_redux/reducers/movie.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public searchMode = false;

  constructor(private store$: Store<fromMovie.State>) {}

  openSearchMode() {
    this.searchMode = true;
  }
}
