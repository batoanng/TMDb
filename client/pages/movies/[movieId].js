import Router from 'next/router';
import { useEffect } from 'react';
import { MOVIE_API, PEOPLE_API } from '../../apis/constants';
import MovieDetailBanner from '../../components/MovieDetailBanner';
import MovieDetailColumn from '../../components/MovieDetailColumn';
import { Container } from 'react-bootstrap';
import PeopleList from '../../components/PeopleList';
import MovieCollection from '../../components/MovieCollection';
import RecommendationMovieList from '../../components/RecommendationMovieList';

const MovieDetail = ({ movie, people, recommendationMovies }) => {
	useEffect(() => {
		if (!movie) {
			Router.push('/');
		}
	}, []);

	return (
		<div>
			<MovieDetailBanner
				backdropPath={movie.backdrop_path}
				posterPath={movie.poster_path}
				overview={movie.overview}
				title={movie.title}
				tagline={movie.tagline}
				productionCompanies={movie.production_companies}
				genres={movie.genres}
				adult={movie.adult}
				voteAverage={movie.vote_average}
				runtime={movie.runtime}
				releaseDate={movie.release_date}
			/>
			<Container className="d-flex">
				<div className="flex-grow-1 px-5">
					<PeopleList people={people} />
					{movie.belongs_to_collection ? (
						<MovieCollection
							collection={movie.belongs_to_collection}
						/>
					) : null}
					<RecommendationMovieList movies={recommendationMovies} />
				</div>
				<div>
					<MovieDetailColumn
						status={movie.status}
						originalLanguage={movie.original_language}
						revenue={movie.revenue}
						budget={movie.budget}
						genres={movie.genres}
					/>
				</div>
			</Container>
		</div>
	);
};

MovieDetail.getInitialProps = async (context, client) => {
	const { movieId } = context.query;

	try {
		const { data: movie } = await client.get(`${MOVIE_API}/${movieId}`);
		const { data: people } = await client.get(`${PEOPLE_API}`);
		const { data: recommendationMovies } = await client.get(`${MOVIE_API}`);
		return {
			movie,
			people: people.docs,
			recommendationMovies: recommendationMovies.docs,
		};
	} catch (e) {
		return { movie: null, people: [] };
	}
};

export default MovieDetail;
