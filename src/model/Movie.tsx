import Actor from "./Actor";
import Rating from "./rating";

class Movie {
    id: number;
    title: string;
    releaseYear: number;
    thumbnailLarge: string;
    thumbnailMedium: string;
    thumbnailSmall: string;
    categories: string[];
    credits: Actor[];
    rating: Rating[];
    description: string;
    imdbId: string;
    contentType: string;

    constructor(id: number, title: string, director: string, releaseYear: number, categories: string[],
        thumbnailLarge: string, thumbnailSmall: string, imdbId: string, credits: Actor[], thumbnailMedium: string,
        rating: Rating[]
        , description: string, contentType: string) {
        this.id = id;
        this.title = title;
        this.thumbnailLarge = thumbnailLarge;
        this.thumbnailSmall = thumbnailSmall;
        this.imdbId = imdbId;
        this.thumbnailMedium = thumbnailMedium;
        this.credits = credits;
        this.releaseYear = releaseYear;
        this.categories = categories;
        this.rating = rating;
        this.description = description;
        this.contentType = contentType;
    }
}

export default Movie;