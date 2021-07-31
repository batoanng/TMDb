import style from './scss/MovieCard.module.scss';
import { Card } from 'react-bootstrap';
import getImageUrl from '../hooks/get-image-url';
import Moment from 'react-moment';
import Link from 'next/link';

const MovieCard = ({ movie }) => {
	return (
		<Link href={`/movies/${movie.id}`}>
			<a>
				<div className={style.movie}>
					<Card>
						<Card.Img
							className={style.movieImage}
							variant="top"
							src={getImageUrl(movie.poster_path)}
						/>
						<Card.Body className={style.overview}>
							<Card.Title className={style.title}>
								{movie.title}
							</Card.Title>
							<Card.Text className={style.date}>
								<Moment format="MMM DD, YYYY">
									{movie.release_date}
								</Moment>
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			</a>
		</Link>
	);
};

export default MovieCard;
