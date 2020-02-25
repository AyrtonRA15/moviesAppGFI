import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as MovieActions from '../actions/movie.actions';
import * as fromMovie from '../reducers/movie.reducer';
import { switchMap, map, catchError, withLatestFrom, take } from 'rxjs/operators';
import { IMovie } from '../../_interfaces/movie.interface';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MoviesService } from '../../_services';

@Injectable()
export class MovieEffects {
    constructor(
        private actions$: Actions,
        private movieService: MoviesService,
        private store$: Store<fromMovie.State>
    ) { }

    // MOVIE //

    @Effect()
    public loadMovie$ = this.actions$.pipe(
        ofType(MovieActions.LOAD_MOVIE),
        switchMap((action: MovieActions.LoadMovie) => {
            return this.movieService.getMovieById(action.payload).pipe(
                map(
                    (response: IMovie) => new MovieActions.LoadMovieSuccess(response)
                ),
                catchError(error =>
                    of(new MovieActions.LoadMovieFail(error))
                )
            );
        })
    );

    // SEARCH MOVIES //

    @Effect()
    public loadSearchMovies$ = this.actions$.pipe(
        ofType(MovieActions.LOAD_SEARCH),
        switchMap((action: MovieActions.LoadSearch) => {
            return this.movieService.getMovies(action.payload.s, action.payload.y, action.payload.page).pipe(
                // Verificar si existen peliculas favoritas en las peliculas que se buscaron para actualizar la bandera isFavorite
                withLatestFrom(this.store$.pipe(select(fromMovie.getFavoriteMoviesSelector))),
                map(([searchMovieResponse, favoriteMovies]) => {
                    if (searchMovieResponse.Response === 'True') {
                        searchMovieResponse.Search.map(searchMovie => {
                            if (favoriteMovies.find(favMovie => favMovie.imdbID === searchMovie.imdbID)) {
                                searchMovie.isFavorite = true;
                            }
                        });
                    }
                    return new MovieActions.LoadSearchSuccess(searchMovieResponse);
                }),
                catchError(error =>
                    of(new MovieActions.LoadSearchFail(error))
                )
            );
        })
    );

    // FAVORITE MOVIES //

    @Effect()
    public loadFavoriteMovies$ = this.actions$.pipe(
        ofType(MovieActions.LOAD_FAVORITES),
        switchMap((action: MovieActions.LoadFavorites) => {
            return this.movieService.getFavoriteMovies().pipe(
                map(
                    (response: IMovie[]) => new MovieActions.LoadFavoritesSuccess(response)
                ),
                catchError(error =>
                    of(new MovieActions.LoadFavoritesFail(error))
                )
            );
        })
    );

    @Effect()
    public addFavoriteMovie$ = this.actions$.pipe(
        ofType(MovieActions.ADD_FAVORITE),
        switchMap((action: MovieActions.AddFavorite) => {
            action.payload.isFavorite = true;
            return this.movieService.addFavorite(action.payload).pipe(
                map(
                    (response: IMovie[]) => new MovieActions.LoadFavoritesSuccess(response)
                )
            );
        })
    );

    @Effect()
    public removeFavoriteMovie$ = this.actions$.pipe(
        ofType(MovieActions.REMOVE_FAVORITE),
        switchMap((action: MovieActions.RemoveFavorite) => {
            action.payload.isFavorite = false;
            return this.movieService.removeFavorite(action.payload.imdbID).pipe(
                map(
                    (response: IMovie[]) => new MovieActions.LoadFavoritesSuccess(response)
                )
            );
        })
    );
}
