import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISearchMoviesResponse, IMovie } from '../_interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  static readonly API_KEY = 'f12ba140';
  static readonly API_URL = 'http://www.omdbapi.com/';

  constructor(private http: HttpClient) { }

  getMovies(title: string, year: string = '', page: string = '1'): Observable<ISearchMoviesResponse> {
    const params = {
      apikey: MoviesService.API_KEY,
      s: title.split(' ').join('+'),
      y: year,
      page
    };
    return this.http.get<ISearchMoviesResponse>(MoviesService.API_URL, { params });
  }

  getMovieById(IMDbId: string): Observable<IMovie> {
    const params = {
      apikey: MoviesService.API_KEY,
      i: IMDbId,
      plot: 'full'
    };
    return this.http.get<IMovie>(MoviesService.API_URL, { params });
  }

  getFavoriteMovies(): Observable<IMovie[]> {
    const favMovies = JSON.parse(localStorage.getItem('favMovies'));
    if (favMovies && favMovies.movies) {
      return of(favMovies.movies);
    }
    return of([]);
  }

  addFavorite(movie: IMovie): Observable<IMovie[]> {
    let favMovies = { movies: [] };
    if (localStorage.getItem('favMovies') !== null) {
      favMovies = JSON.parse(localStorage.getItem('favMovies'));
    }
    favMovies.movies.push(movie);
    localStorage.setItem('favMovies', JSON.stringify(favMovies));
    return of(favMovies.movies);
  }

  removeFavorite(IMDbId: string): Observable<IMovie[]> {
    if (localStorage.getItem('favMovies') !== null) {
      const favMovies = JSON.parse(localStorage.getItem('favMovies'));
      const favMoviesUpdated = { movies: [] };
      favMoviesUpdated.movies = favMovies.movies.filter((movie: IMovie) => movie.imdbID !== IMDbId);
      localStorage.setItem('favMovies', JSON.stringify(favMoviesUpdated));
      return of(favMoviesUpdated.movies);
    }
    return of([]);
  }
}
