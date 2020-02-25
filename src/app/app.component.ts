import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
import { Store } from '@ngrx/store';

import * as fromMovie from './_redux/reducers/movie.reducer';
import * as AppActions from './_redux/actions/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private store$: Store<fromMovie.State>
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.store$.dispatch(new AppActions.ClearState());
  }
}
