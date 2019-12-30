import { Component, OnInit } from '@angular/core';
import { CartItem } from '../movie';
import { MovieService } from '../movie-service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  displayedColumns: string[] = ['time',
  'movie', 'price'
 ];

  constructor( private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    this.getCart();
  }

  getCart(): void {
    this.movieService.getCart().subscribe(
      cartItems => this.cartItems = cartItems);
  }

  getTotal(): number {
    this.total = 0;
    for (let item of this.cartItems) {
      this.total += item.hours;
    }
    return this.total;
  }

  placeOrder(): void {
    let movies = [];
    for (let item of this.cartItems) {
      movies.push({"movie":item.movie.id, "hours": item.hours})
    }
    this.movieService.placeOrder(movies, this.total).subscribe();
    this.router.navigate(['success']);
  }

}
