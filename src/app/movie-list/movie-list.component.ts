import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie-service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];
  pageOfItems: Array<any>;

  constructor( private movieService: MovieService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.movieService.getMoviees().subscribe(
      movies => this.movies = movies);
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
