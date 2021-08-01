// @ts-nocheck
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Person {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: true })
    adult: boolean;

    @Column({ nullable: true, length: 2000 })
    biography: string;

    @Column({ nullable: true })
    birthday: Date;

    @Column({ nullable: true })
    deathday: Date;

    @Column({ nullable: true })
    gender: number;

    @Column({ nullable: true })
    homepage: string;

    @Column({ nullable: true })
    imdb_id: string;

    @Column({ nullable: true })
    known_for_department: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    place_of_birth: string;

    @Column({ nullable: true })
    popularity: number;

    @Column({ nullable: true })
    profile_path: string;
}
