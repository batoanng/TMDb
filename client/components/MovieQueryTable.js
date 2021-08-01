import style from './scss/MovieQueryTable.module.scss';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const MovieQueryTable = ({ query, setQuery, search }) => {
	const [showSearch, setShowSearch] = useState(false);
	const [showFilter, setShowFilter] = useState(false);

	const handleChangeSort = (e) => {
		setQuery({
			...query,
			sort_by: e.target.value,
		});
	};

	const handleChangeFilter = (e) => {
		setQuery({
			...query,
			title: e.target.value,
		});
	};

	const handleSearch = async () => {
		const newQuery = {
			...query,
			page: 1,
		};
		setQuery(newQuery);
		await search(newQuery);
	};

	return (
		<div className={style.table}>
			<div>
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
						<h6>Sort Results By</h6>
						<select
							className={style.selectSort}
							onChange={handleChangeSort}
						>
							<option value="popularity.desc">
								Popularity Descending
							</option>
							<option value="popularity.asc">
								Popularity Ascending
							</option>
							<option value="title.desc">Title Descending</option>
							<option value="title.asc">Title Ascending</option>
						</select>
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
						<input
							className={style.filterName}
							onChange={handleChangeFilter}
							type="text"
							placeholder="Movie name..."
						/>
					</div>
				</div>
			</div>
			<Button
				onClick={handleSearch}
				className={`${style.search} main-btn`}
			>
				Search
			</Button>
		</div>
	);
};

export default MovieQueryTable;
