// @ts-nocheck
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from './Movie';

@Entity()
export class Genre {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @ManyToMany((type) => Movie, (movie) => movie.genres)
    movies: Movie[];
}
