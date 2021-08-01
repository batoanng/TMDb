// @ts-nocheck
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from './Movie';

@Entity()
export class Company {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: true })
    logo_path: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    origin_country: string;

    @ManyToMany((type) => Movie, (movie) => movie.production_companies)
    movies: Movie[];
}
