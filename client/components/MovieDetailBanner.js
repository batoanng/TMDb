import style from './scss/MovieDetailBanner.module.scss';
import { Col, Container, Form, Row } from 'react-bootstrap';
import getImageUrl from '../hooks/get-image-url';
import moment from 'moment';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const MovieDetailBanner = ({
	backdropPath,
	posterPath,
	overview,
	title,
	tagline,
	productionCompanies,
	genres,
	adult,
	voteAverage,
	runtime,
	releaseDate,
}) => {
	const formatGenres = () => {
		return genres.map((g) => g.name).join(', ');
	};

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
		<div
			className={style.banner}
			style={{
				backgroundImage: `url(${getImageUrl(backdropPath, 'lg')})`,
			}}
		>
			<div className={style.layer}>
				<Container className={style.container}>
					<div>
						<img
							className={style.poster}
							src={getImageUrl(posterPath)}
						/>
					</div>
					<div className={style.content}>
						<div>
							<span className={style.title}>{title}</span>
							<span className={style.year}>
								({moment(releaseDate).year()})
							</span>
						</div>
						<div>
							<span className={style.type}>
								{adult ? 'PG-13' : 'PG'}
							</span>
							<span className={style.date}>
								{moment(releaseDate).format('MM/DD/YYYY')} (US)
							</span>
							<span className={style.genres}>
								{formatGenres()}
							</span>
							<span>{runtime}m</span>
						</div>
						<div className="my-3">
							<CircularProgressbar
								value={calculatePercentage(voteAverage)}
								text={`${calculatePercentage(voteAverage)}%`}
								styles={buildStyles({
									textSize: '32px',
									pathColor: calculateColor(
										calculatePercentage(voteAverage),
									),
									textColor: '#fff',
								})}
								className={style.progressBar}
							/>
							<span className={style.score}>User Score</span>
						</div>
						<div className={style.tagline}>{tagline}</div>
						<div className={style.overview}>
							<div>Overview</div>
							<div>{overview}</div>
						</div>
						<Row>
							{productionCompanies.map((p, i) => (
								<Col className={style.company} xs={4} key={i}>
									{p.name}
								</Col>
							))}
						</Row>
					</div>
				</Container>
			</div>
		</div>
	);
};

export default MovieDetailBanner;
