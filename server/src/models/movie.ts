import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

//attrs for type checking with typescript
interface MovieAttrs {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: object;
    budget: number;
    genres: [];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [];
    production_countries: [];
    release_date: object;
    revenue: number;
    runtime: number;
    spoken_languages: [];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

//interface for type checking of schema
interface MovieModel extends mongoose.Model<MovieDoc> {
    build(attrs: MovieAttrs): MovieDoc;
}

//interface for type checking of each Movie document
//solve the issue unpredicted additional properties in mongoose model
interface MovieDoc extends mongoose.Document {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: object;
    budget: number;
    genres: [];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [];
    production_countries: [];
    release_date: object;
    revenue: number;
    runtime: number;
    spoken_languages: [];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

const MovieSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        adult: {
            type: Boolean,
            required: false,
            default: false,
        },
        backdrop_path: {
            type: String,
            required: false,
        },
        belongs_to_collection: {
            type: Object,
            required: false,
            default: {},
        },
        budget: {
            type: Number,
            required: true,
        },
        genres: {
            type: Array,
            required: false,
            default: [],
        },
        homepage: {
            type: String,
            required: false,
        },
        imdb_id: {
            type: String,
            required: true,
        },
        original_language: {
            type: String,
            required: false,
            default: 'en',
        },
        original_title: {
            type: String,
            required: false,
        },
        overview: {
            type: String,
            required: false,
        },
        popularity: {
            type: Number,
            required: true,
        },
        poster_path: {
            type: String,
            required: false,
        },
        production_companies: {
            type: Array,
            required: false,
            default: [],
        },
        production_countries: {
            type: Array,
            required: false,
            default: [],
        },
        release_date: {
            type: Date,
            required: true,
        },
        revenue: {
            type: Number,
            required: true,
        },
        runtime: {
            type: Number,
            required: true,
        },
        spoken_languages: {
            type: Array,
            required: false,
            default: [],
        },
        status: {
            type: String,
            required: true,
        },
        tagline: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: true,
        },
        video: {
            type: String,
            required: false,
            default: false,
        },
        vote_average: {
            type: Number,
            required: false,
            default: 0,
        },
        vote_count: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

MovieSchema.index({ release_date: 1 });

MovieSchema.plugin(mongoosePaginate);
MovieSchema.statics.build = (attrs: MovieAttrs) => {
    return new Movie(attrs);
};

const Movie = mongoose.model<MovieDoc, MovieModel>('Movie', MovieSchema);

export { Movie };
