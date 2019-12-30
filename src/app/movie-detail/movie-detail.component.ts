import { Component, OnInit } from '@angular/core';
import { Movie, CartItem } from '../movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie-service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie;
  cartItem: CartItem;
  hours: number;
  msg: string;

  constructor(
    private route: ActivatedRoute,
    private service: MovieService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getMovie();
    this.msg = "";
  }

  getMovie() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getMovie(id).subscribe( movie => this.movie = movie );
    
  }

  addToCart(hours: number){
    console.log("adding  in v=cart -- >>", hours)
    // this.cartItem = new CartItem();
    // this.cartItem.movie = this.movie;
    // this.cartItem.hours = hours;
    console.log(hours);
    if (!hours) {
      this.msg = "Please enter the valid hours";
    } else {
      let cartItem = {"movie_id": this.movie.id, "hours": hours};
      console.log("adding  in v=cart -- >>");
      this.service.addToCart(cartItem).subscribe(cartItem => this.cartItem = cartItem);
      this.router.navigate(['cart']);
    }

  }

}
