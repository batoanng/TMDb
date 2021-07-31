import style from './scss/MovieCollection.module.scss';
import { Button, Col, Container, Row } from 'react-bootstrap';
import getImageUrl from '../hooks/get-image-url';
import moment from 'moment';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const MovieCollection = ({ collection }) => {
	return (
		<div className={style.outer}>
			<div
				className={style.collection}
				style={{
					backgroundImage: `url(${getImageUrl(
						collection.backdrop_path,
						'lg',
					)})`,
				}}
			>
				<div className={style.layer}>
					<div className={style.name}>
						Part of the {collection.name}
					</div>
					<Button className={style.view}>VIEW THE COLLECTION</Button>
				</div>
			</div>
		</div>
	);
};

export default MovieCollection;
