import style from './scss/RecommendationMovieCard.module.scss';
import { Card } from 'react-bootstrap';
import getImageUrl from '../hooks/get-image-url';
import Link from 'next/link';

const RecommendationMovieCard = ({ movie }) => {
	const calculatePercentage = (vote_average) => {
		try {
			return Number.parseFloat(vote_average) * 10;
		} catch (e) {
			return 0;
		}
	};

	return (
		<Link href={`/movies/${movie.id}`}>
			<a>
				<div className={style.movie}>
					<Card>
						<Card.Img
							className={style.movieImage}
							variant="top"
							src={getImageUrl(movie.backdrop_path)}
						/>
						<Card.Body className={style.overview}>
							<div>{movie.title}</div>
							<div>{calculatePercentage(movie.vote_average)}</div>
						</Card.Body>
					</Card>
				</div>
			</a>
		</Link>
	);
};

export default RecommendationMovieCard;
