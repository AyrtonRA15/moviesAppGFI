import { Action } from '@ngrx/store';
import { ISearchMoviesPayload, ISearchMoviesResponse, IMovie } from '../../_interfaces/movie.interface';

export const LOAD_MOVIE = '[MOVIE] LOAD_MOVIE';
export const LOAD_MOVIE_SUCCESS = '[MOVIE] LOAD_MOVIE_SUCCESS';
export const LOAD_MOVIE_FAIL = '[MOVIE] LOAD_MOVIE_FAIL';
export const LOAD_SEARCH = '[MOVIE] LOAD_SEARCH';
export const LOAD_SEARCH_SUCCESS = '[MOVIE] LOAD_SEARCH_SUCCESS';
export const LOAD_SEARCH_FAIL = '[MOVIE] LOAD_SEARCH_FAIL';
export const LOAD_FAVORITES = '[MOVIE] LOAD_FAVORITES';
export const LOAD_FAVORITES_SUCCESS = '[MOVIE] LOAD_FAVORITES_SUCCESS';
export const LOAD_FAVORITES_FAIL = '[MOVIE] LOAD_FAVORITES_FAIL';
export const ADD_FAVORITE = '[MOVIE] ADD_FAVORITE';
export const REMOVE_FAVORITE = '[MOVIE] REMOVE_FAVORITE';

// Movie Actions

export class LoadMovie implements Action {
    public readonly type = LOAD_MOVIE;

    constructor(public payload: string) { }
}

export class LoadMovieSuccess implements Action {
    public readonly type = LOAD_MOVIE_SUCCESS;

    constructor(public payload: IMovie) { }
}

export class LoadMovieFail implements Action {
    public readonly type = LOAD_MOVIE_FAIL;

    constructor(public error: any) { }
}

// Search Movies Actions

export class LoadSearch implements Action {
    public readonly type = LOAD_SEARCH;

    constructor(public payload: ISearchMoviesPayload) { }
}

export class LoadSearchSuccess implements Action {
    public readonly type = LOAD_SEARCH_SUCCESS;

    constructor(public payload: ISearchMoviesResponse) { }
}

export class LoadSearchFail implements Action {
    public readonly type = LOAD_SEARCH_FAIL;

    constructor(public error: any) { }
}

// Favorite Movies Actions

export class LoadFavorites implements Action {
    public readonly type = LOAD_FAVORITES;

    constructor() { }
}

export class LoadFavoritesSuccess implements Action {
    public readonly type = LOAD_FAVORITES_SUCCESS;

    constructor(public payload: IMovie[]) { }
}

export class LoadFavoritesFail implements Action {
    public readonly type = LOAD_FAVORITES_FAIL;

    constructor(public error: any) { }
}

export class AddFavorite implements Action {
    public readonly type = ADD_FAVORITE;

    constructor(public payload: IMovie) { }
}

export class RemoveFavorite implements Action {
    public readonly type = REMOVE_FAVORITE;

    constructor(public payload: IMovie) { }
}

export type Actions =
    LoadMovie |
    LoadMovieSuccess |
    LoadMovieFail |
    LoadSearch |
    LoadSearchSuccess |
    LoadSearchFail |
    LoadFavorites |
    LoadFavoritesSuccess |
    LoadFavoritesFail |
    AddFavorite |
    RemoveFavorite;
