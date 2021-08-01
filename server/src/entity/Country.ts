// @ts-nocheck
import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { Movie } from './Movie';

@Entity()
export class Country {
    @PrimaryColumn()
    id: string;

    @Column()
    iso_3166_1: string;

    @Column()
    name: string;

    @ManyToMany((type) => Movie, (movie) => movie.production_countries)
    movies: Movie[];
}
