export interface IMovie {
    Title?: string;
    Year?: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Poster?: string;
    Ratings?: IRating[];
    Metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
    imdbID?: string;
    Type?: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response?: string;
    Error?: string;
    isFavorite?: boolean;
}

export interface IRating {
    Source?: string;
    Value?: string;
}

export interface ISearchMoviesResponse {
    Search?: IMovie[];
    totalResults?: string;
    Response: string;
    Error?: string;
}

export interface ISearchMoviesPayload {
    i?: string;
    t?: string;
    s?: string;
    type?: string;
    y?: string;
    plot?: string;
    page?: string;
}
