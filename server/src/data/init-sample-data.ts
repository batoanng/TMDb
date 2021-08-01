// @ts-nocheck
import sampleMovieData from './sample-movie';
import { getConnection } from 'typeorm';
import { Movie } from '../entity/Movie';
import { Collection } from '../entity/Collection';
import { Genre } from '../entity/Genre';
import { Company } from '../entity/Company';
import { Country } from '../entity/Country';
import { Language } from '../entity/Language';

const instance = {
    async initSampleData() {
        await this.initSampleMovies();
    },

    initSampleMovies: async () => {
        const connection = await getConnection();
        const movieRepository = connection.getRepository(Movie);
        const collectionRepository = connection.getRepository(Collection);
        const genreRepository = connection.getRepository(Genre);
        const companyRepository = connection.getRepository(Company);
        const countryRepository = connection.getRepository(Country);
        const languageRepository = connection.getRepository(Language);

        for (let i = 0; i < sampleMovieData.length; i++) {
            const queryRunner = connection.createQueryRunner();
            await queryRunner.startTransaction();
            try {
                const data = sampleMovieData[i];
                if (data.belongs_to_collection) {
                    const collection = data.belongs_to_collection;
                    const existedCollection =
                        await collectionRepository.findOne(collection.id);
                    if (!existedCollection) {
                        await collectionRepository.save(collection);
                    }
                }

                if (data.genres) {
                    const genres = data.genres;
                    for (let j = 0; j < genres.length; j++) {
                        const selectedGenre = genres[j];
                        const existedGenre = await genreRepository.findOne(
                            selectedGenre.id
                        );
                        if (!existedGenre) {
                            await genreRepository.save(selectedGenre);
                        }
                    }
                }

                if (data.production_companies) {
                    const companies = data.production_companies;
                    for (let j = 0; j < companies.length; j++) {
                        const selectedCompany = companies[j];
                        const existedCompany = await genreRepository.findOne(
                            selectedCompany.id
                        );
                        if (!existedCompany) {
                            await companyRepository.save(selectedCompany);
                        }
                    }
                }

                if (data.production_countries) {
                    const countries = data.production_countries;
                    for (let j = 0; j < countries.length; j++) {
                        const selectedCountry = countries[j];
                        const existedCountry = await genreRepository.findOne(
                            selectedCountry.iso_3166_1
                        );
                        if (!existedCountry) {
                            await countryRepository.save({
                                ...selectedCountry,
                                id: selectedCountry.iso_3166_1,
                            });
                        }
                    }
                }

                if (data.spoken_languages) {
                    const languages = data.spoken_languages;
                    for (let j = 0; j < languages.length; j++) {
                        const selectedLanguage = languages[j];
                        const existedLanguage = await genreRepository.findOne(
                            selectedLanguage.iso_639_1
                        );
                        if (!existedLanguage) {
                            await languageRepository.save({
                                ...selectedLanguage,
                                id: selectedLanguage.iso_639_1,
                            });
                        }
                    }
                }

                const movie = movieRepository.create(data);
                await queryRunner.manager.save(Movie, movie);
                queryRunner.commitTransaction();
            } catch (e) {
                console.error(e);
            } finally {
                queryRunner.release();
            }
        }
    },
};

export { instance as initializationService };
