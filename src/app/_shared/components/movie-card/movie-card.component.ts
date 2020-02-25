import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IMovie } from '../../../_interfaces/movie.interface';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  providers: [MessageService]
})
export class MovieCardComponent implements OnInit {
  @Input() public movie: IMovie; // Pelicula con los campos basicos para mostrar en la lista
  @Input() public detailedMovie: IMovie; // Pelicula con todos los campos para mostrar en el detalle
  @Output() public onMovieSelected = new EventEmitter<string>();
  @Output() public onAddedToFavorites = new EventEmitter<IMovie>();
  @Output() public onRemovedFromFavorites = new EventEmitter<IMovie>();

  public displayDialog: boolean;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  selectMovie(event: Event, movie: IMovie) {
    this.detailedMovie = undefined;
    this.onMovieSelected.emit(movie.imdbID);
    this.displayDialog = true;
    event.preventDefault();
  }

  addToFavorites(event: Event, movie: IMovie) {
    this.onAddedToFavorites.emit(movie);
    this.messageService.add({ severity: 'success', summary: 'Movie added to Favorites', detail: movie.Title });
  }

  removeFromFavorites(event: Event, movie: IMovie) {
    this.onRemovedFromFavorites.emit(movie);
    this.messageService.add({ severity: 'success', summary: 'Movie removed from Favorites', detail: movie.Title });
  }

}
