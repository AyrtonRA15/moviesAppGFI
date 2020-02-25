import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { IMovie } from '../_interfaces/movie.interface';
import * as movieActions from '../_redux/actions/movie.actions';
import * as fromMovie from '../_redux/reducers/movie.reducer';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  public favorites$: Observable<IMovie[]>;
  public movie$: Observable<IMovie>;
  public movies: IMovie[] = [];
  public selectedMovie: IMovie;
  public subscriptions: Subscription[] = [];

  constructor(private store$: Store<fromMovie.State>) {
    this.favorites$ = this.store$.select(fromMovie.getFavoriteMoviesSelector);
    this.movie$ = this.store$.select(fromMovie.getSelectedMovieSelector);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.favorites$.subscribe(movies => (this.movies = movies))
    );

    this.subscriptions.push(
      this.movie$.subscribe((movie: IMovie) => {
        this.selectedMovie = movie;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  selectMovie(imdbID: string) {
    this.store$.dispatch(new movieActions.LoadMovie(imdbID));
  }

  removeFromFavorites(movie: IMovie) {
    this.store$.dispatch(new movieActions.RemoveFavorite(movie));
  }
}
