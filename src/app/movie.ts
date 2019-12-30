export class Movie {
    id: number;
    Title: string;
    Rank: number;
    Genre: string;
    Description: string;
    Director: string;
    Actors: string;
    Year: number;
    Runtime: number;
    Rating: number;
    Votes: number;
    Revenue: number;
    Metascrore: number;
}

export class CartItem {
    id: number;
    movie: Movie;
    hours: number;
}