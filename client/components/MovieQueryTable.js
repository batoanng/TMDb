import style from './scss/MovieQueryTable.module.scss';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const MovieQueryTable = ({ query, setQuery, search }) => {
	const [showSearch, setShowSearch] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	return (
		<div className={style.table}>
			<div className={style.item}>
				<div
					className={style.title}
					onClick={() => setShowSearch(!showSearch)}
				>
					<span>Sort</span>
					<img
						src="/arrow-right.svg"
						className={showSearch ? style.arrowDown : ''}
					/>
				</div>
				<div
					style={{
						display: `${showSearch ? 'block' : 'none'}`,
					}}
					className={style.content}
				>
					test
				</div>
			</div>
			<div className={style.item}>
				<div
					className={style.title}
					onClick={() => setShowFilter(!showFilter)}
				>
					<span>Filters</span>
					<img
						src="/arrow-right.svg"
						className={showFilter ? style.arrowDown : ''}
					/>
				</div>
				<div
					style={{
						display: `${showFilter ? 'block' : 'none'}`,
					}}
					className={style.content}
				>
					test
				</div>
			</div>
			<Button block onClick={() => search(query)} className="main-btn">
				Search
			</Button>
		</div>
	);
};

export default MovieQueryTable;
