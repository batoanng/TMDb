// @ts-nocheck
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Movie } from './Movie';

@Entity()
export class Collection {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    poster_path: string;

    @Column({ nullable: true })
    backdrop_path: string;

    @OneToMany(() => Movie, (movie) => movie.id)
    movies: Movie[];
}
