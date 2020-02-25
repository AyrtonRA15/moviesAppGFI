import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromMovie from '../../_redux/reducers/movie.reducer';
import * as movieActions from '../../_redux/actions/movie.actions';
import { Observable, Subscription } from 'rxjs';
import { ISearchMoviesResponse, IMovie } from '../../_interfaces/movie.interface';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss']
})
export class SearchMovieComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;
  public subscriptions: Subscription[] = [];
  public search$: Observable<ISearchMoviesResponse>;
  public movie$: Observable<IMovie>;
  public searchResults: ISearchMoviesResponse;
  public selectedMovie: IMovie;
  public searchObj = undefined;
  public errorMessage = '';

  constructor(private formBuilder: FormBuilder, private store$: Store<fromMovie.State>) {
    this.search$ = this.store$
      .select(fromMovie.getSearchMoviesSelector);
    this.movie$ = this.store$
      .select(fromMovie.getSelectedMovieSelector);
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      title: ['', Validators.required],
      year: ['']
    });

    this.subscriptions.push(this.search$.subscribe((results: ISearchMoviesResponse) => {
      if (results.Response === 'True') {
        this.searchResults = results;
      } else if (results.Response === 'False') {
        this.searchResults = { ...results, Search: [] };
        this.errorMessage = results.Error;
      }
    }));

    this.subscriptions.push(this.movie$.subscribe((movie: IMovie) => {
      this.selectedMovie = movie;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  get form() {
    return this.searchForm.controls;
  }

  onSearch() {
    this.searchObj = {
      s: this.form.title.value.trim(),
      y: this.form.year.value
    };

    if (this.searchForm.invalid) {
      return;
    }

    this.loadData('1');
  }

  loadData(page: string) {
    this.store$.dispatch(
      new movieActions.LoadSearch({
        ...this.searchObj,
        page
      })
    );
  }

  changePage(event) {
    const currentPage = (event.first / event.rows) + 1;
    this.loadData(currentPage.toString());
  }

  selectMovie(imdbID: string) {
    this.store$.dispatch(
      new movieActions.LoadMovie(imdbID)
    );
  }

  addToFavorites(movie: IMovie) {
    this.store$.dispatch(
      new movieActions.AddFavorite(movie)
    );
  }

  removeFromFavorites(movie: IMovie) {
    this.store$.dispatch(
      new movieActions.RemoveFavorite(movie)
    );
  }
}
