import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Movie, CartItem } from './movie';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', })
  };


  private BaseUrl = 'http://localhost:8000/api/'
  private MovieesUrl = this.BaseUrl + 'movies/';
  private cartUrl = this.BaseUrl + 'movie_cart/'
  private orderUrl = this.BaseUrl + 'movie_order/'


  constructor(
    private http: HttpClient,
    ) { }


  /** GET Moviees from the server */
  getMoviees(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.MovieesUrl).pipe(
      tap( _ => this.log(`fetched Movies`)),
      catchError(
        this.handleError<Movie[]>('getMoviees', [])
      )
    );
  }


  // getMovie(id: number): Observable<Movie> {
  //   // TODO: send the message _after_ fetching the Movie
  //   this.messageService.add(`MovieService: fetched Movie id=${id}`);
  //   return of(MovieES.find(Movie => Movie.id === id));
  // }

  getMovie(id: number): Observable<Movie> {
    const url = `${this.MovieesUrl}${id}/`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`getMovie id: ${id}`)),
      catchError(
        this.handleError<Movie>(`getMovie id=${id}`)
      )
    );
  }

  addToCart(cartItem: any): Observable<any> {
    return this.http.post(this.cartUrl, cartItem).pipe(
      tap(_ => this.log(`added Movie =${cartItem}`)),
      catchError(this.handleError<any>('addMovie'))
    );
  }


  placeOrder(cartItems: CartItem[], total: number): Observable<any> {
    return this.http.post(this.orderUrl, {"movies":cartItems, "total": total }).pipe(
      tap(_ => this.log(`placed order`)),
      catchError(this.handleError<any>('placedMovie'))
    );
  }
  
  getCart(): Observable<CartItem[]> {
    const url = this.cartUrl
    return this.http.get<CartItem[]>(url).pipe(
      tap(_ => this.log(`get Cart`)),
      catchError(
        this.handleError<CartItem[]>(`get Cart`)
      )
    );
  }


  // updateMovie(Movie: Movie): Observable<any> {
  //   return this.http.put(this.MovieesUrl, Movie, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated Movie id=${Movie.id}`)),
  //     catchError(this.handleError<any>('updateMovie'))
  //   );
  // }

  // addMovie(Movie: Movie): Observable<any> {
  //   return this.http.post(this.MovieesUrl, Movie, this.httpOptions).pipe(
  //     tap(_ => this.log(`added Movie id=${Movie.id}`)),
  //     catchError(this.handleError<any>('addMovie'))
  //   );
  // }

  // deleteMovie(Movie: Movie): Observable<any> {
  //   const id = typeof Movie === 'number' ? Movie : Movie.id;
  //   const url = `${this.MovieesUrl}/${id}`;
  //   return this.http.delete(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted Movie id=${Movie.id}`)),
  //     catchError(this.handleError<any>('deleteMovie'))
  //   );
  // }

  // searchMoviees(term: string): any {
  //   if (!term.trim()) {
  //     return of([]);
  //   }
  //   const url = `${this.MovieesUrl}/?name=${term}`;
  //   return this.http.get<Movie>(url).pipe(
  //     tap(_ => this.log(`found Moviees matching "${term}"`)),
  //     catchError(this.handleError<any>('searchMoviees'))
  //   );
  // }


  private log(message: string) {
    console.log(message);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
