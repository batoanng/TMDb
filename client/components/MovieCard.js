import style from './scss/MovieCard.module.scss';
import { Card } from 'react-bootstrap';
import getImageUrl from '../hooks/get-image-url';
import Moment from 'react-moment';
import Link from 'next/link';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const MovieCard = ({ movie }) => {
	const calculatePercentage = (vote_average) => {
		try {
			return Number.parseFloat(vote_average) * 10;
		} catch (e) {
			return 0;
		}
	};

	const calculateColor = (vote_average) => {
		const average = Number.parseFloat(vote_average);
		if (average === 0) {
			return '#aaa';
		} else if (average < 50) {
			return '#B51F53';
		} else if (average < 75) {
			return '#D2D531';
		} else {
			return '#186C46';
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
							src={getImageUrl(movie.poster_path)}
						/>
						<Card.Body className={style.overview}>
							<CircularProgressbar
								value={calculatePercentage(movie.vote_average)}
								text={`${calculatePercentage(
									movie.vote_average,
								)}%`}
								styles={buildStyles({
									textSize: '32px',
									pathColor: calculateColor(
										calculatePercentage(movie.vote_average),
									),
									textColor: '#fff',
								})}
								className={style.progressBar}
							/>
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
