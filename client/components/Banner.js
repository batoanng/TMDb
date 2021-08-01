import style from './scss/Banner.module.scss';
import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import Router from 'next/router';

const Banner = () => {
	const [search, setSearch] = useState('');

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (search.length === 0) return;
		Router.push(`/movies/search/${search}`);
	};

	return (
		<div className={style.banner}>
			<div className={style.wrapper}>
				<div className={style.title}>
					<h2>Welcome.</h2>
					<h3>
						Millions of movies, TV shows and people to discover.
						Explore now.
					</h3>
				</div>
				<div>
					<Form onSubmit={handleSubmit} className={style.search}>
						<Form.Control
							type="text"
							name="search"
							placeholder="Search for a movie with everything......"
							value={search}
							onChange={handleChange}
						/>
						<Button type="submit">Search</Button>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Banner;
