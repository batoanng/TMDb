import style from './scss/MovieDetailColumn.module.scss';
import NumberFormat from 'react-number-format';

const MovieDetailColumn = ({
	status,
	originalLanguage,
	revenue,
	budget,
	genres,
}) => {
	return (
		<div className={style.column}>
			<div className={style.item}>
				<div>Status</div>
				<div>{status}</div>
			</div>
			<div className={style.item}>
				<div>Original Language</div>
				<div>{originalLanguage}</div>
			</div>
			<div className={style.item}>
				<div>Budget</div>
				<div>
					<NumberFormat
						thousandSeparator={true}
						prefix={'$'}
						value={budget}
						displayType={'text'}
					/>
				</div>
			</div>
			<div className={style.item}>
				<div>Revenue</div>
				<NumberFormat
					thousandSeparator={true}
					prefix={'$'}
					value={revenue}
					displayType={'text'}
				/>
			</div>
			<div className={style.item}>
				<div>Keywords</div>
				<div>
					{genres.map((g, i) => (
						<div key={i} className={style.genres}>
							{g.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MovieDetailColumn;
