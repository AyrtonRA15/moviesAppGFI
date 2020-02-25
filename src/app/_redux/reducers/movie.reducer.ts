import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IMovie, ISearchMoviesResponse } from '../../_interfaces/movie.interface';
import * as MovieActions from '../actions/movie.actions';

export interface State {
  selectedMovie: IMovie;
  searchResults: ISearchMoviesResponse;
  favorites: IMovie[];
}

export const initialState: State = {
  selectedMovie: { Response: undefined },
  searchResults: { Response: undefined },
  favorites: []
};

export function reducer(
  state: State = initialState,
  action: MovieActions.Actions
): State {
  switch (action.type) {
    case MovieActions.LOAD_MOVIE_SUCCESS:
      return {
        ...state,
        selectedMovie: action.payload
      };

    case MovieActions.LOAD_SEARCH_SUCCESS:
      return {
        ...state,
        searchResults: action.payload
      };

    case MovieActions.CLEAR_SEARCH:
      return {
        ...state,
        searchResults: initialState.searchResults
      };

    case MovieActions.LOAD_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: action.payload
      };

    default:
      return state;
  }
}

export const getListState = createFeatureSelector('listState');

export const getSelectedMovie = (state: State) => state.selectedMovie;
export const getSearchMovies = (state: State) => state.searchResults;
export const getFavoriteMovies = (state: State) => state.favorites;

export const getSelectedMovieSelector = createSelector(
  getListState,
  getSelectedMovie
);

export const getSearchMoviesSelector = createSelector(
  getListState,
  getSearchMovies
);

export const getFavoriteMoviesSelector = createSelector(
  getListState,
  getFavoriteMovies
);
