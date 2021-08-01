// @ts-nocheck
import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Genre } from './Genre';
import { Company } from './Company';
import { Collection } from './Collection';
import { Country } from './Country';
import { Language } from './Language';

@Entity()
export class Movie {
    @PrimaryColumn()
    id: number;

    @Column()
    adult: boolean;

    @Column()
    backdrop_path: string;

    @ManyToOne(() => Collection, (collection) => collection.movies)
    @JoinColumn()
    belongs_to_collection: Collection;

    @Column()
    budget: number;

    @ManyToMany((type) => Genre, (genre) => genre.movies)
    @JoinTable()
    genres: Genre[];

    @Column()
    homepage: string;

    @Column()
    imdb_id: string;

    @Column()
    original_language: string;

    @Column()
    original_title: string;

    @Column('varchar', { nullable: false, length: 500 })
    overview: string;

    @Column()
    popularity: number;

    @Column()
    poster_path: string;

    @ManyToMany((type) => Company, (company) => company.movies)
    @JoinTable()
    production_companies: Company[];

    @ManyToMany((type) => Country, (country) => country.movies)
    @JoinTable()
    production_countries: Country[];

    @Column()
    release_date: Date;

    @Column()
    revenue: number;

    @Column()
    runtime: number;

    @ManyToMany((type) => Language, (language) => language.movies)
    @JoinTable()
    spoken_languages: Language[];

    @Column()
    status: string;

    @Column()
    tagline: string;

    @Column()
    title: string;

    @Column()
    video: boolean;

    @Column()
    vote_average: number;

    @Column()
    vote_count: number;
}
