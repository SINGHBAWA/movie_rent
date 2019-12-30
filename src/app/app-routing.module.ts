import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderSuccessComponent } from './order-success/order-success.component';


const routes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'success', component: OrderSuccessComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
  { path: '', redirectTo: '/movies', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
