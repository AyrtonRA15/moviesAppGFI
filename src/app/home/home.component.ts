import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromMovie from '../_redux/reducers/movie.reducer';
import * as AppActions from '../_redux/actions/app.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  public searchMode = false;

  constructor(private store$: Store<fromMovie.State>) { }

  ngOnDestroy() {
    this.store$.dispatch(new AppActions.ClearState());
  }

  openSearchMode() {
    this.searchMode = true;
  }
}
