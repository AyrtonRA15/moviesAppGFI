import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AppActions from './_redux/actions/app.actions';
import * as movieActions from './_redux/actions/movie.actions';
import * as fromMovie from './_redux/reducers/movie.reducer';
import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private store$: Store<fromMovie.State>
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.store$.dispatch(new movieActions.LoadFavorites());
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.store$.dispatch(new AppActions.ClearState());
  }
}
