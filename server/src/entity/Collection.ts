// @ts-nocheck
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Movie } from './Movie';

@Entity()
export class Collection {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    poster_path: string;

    @Column()
    backdrop_path: string;

    @OneToMany(() => Movie, (movie) => movie.id)
    movies: Movie[];
}
