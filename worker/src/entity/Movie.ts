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

    @Column({ nullable: true })
    adult: boolean;

    @Column({ nullable: true })
    backdrop_path: string;

    @ManyToOne(() => Collection, (collection) => collection.movies)
    @JoinColumn()
    belongs_to_collection: Collection;

    @Column({ nullable: true })
    budget: number;

    @ManyToMany((type) => Genre, (genre) => genre.movies)
    @JoinTable()
    genres: Genre[];

    @Column({ nullable: true })
    homepage: string;

    @Column({ nullable: true })
    imdb_id: string;

    @Column({ nullable: true })
    original_language: string;

    @Column({ nullable: true })
    original_title: string;

    @Column('varchar', { nullable: false, length: 500 })
    overview: string;

    @Column({ nullable: true })
    popularity: number;

    @Column({ nullable: true })
    poster_path: string;

    @ManyToMany((type) => Company, (company) => company.movies)
    @JoinTable()
    production_companies: Company[];

    @ManyToMany((type) => Country, (country) => country.movies)
    @JoinTable()
    production_countries: Country[];

    @Column({ nullable: true })
    release_date: Date;

    @Column({ nullable: true })
    revenue: number;

    @Column({ nullable: true })
    runtime: number;

    @ManyToMany((type) => Language, (language) => language.movies)
    @JoinTable()
    spoken_languages: Language[];

    @Column({ nullable: true })
    status: string;

    @Column({ nullable: true })
    tagline: string;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    video: boolean;

    @Column({ nullable: true })
    vote_average: number;

    @Column({ nullable: true })
    vote_count: number;
}
