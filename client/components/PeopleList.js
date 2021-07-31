import style from './scss/PeopleList.module.scss';
import PersonCard from './PersonCard';

const PeopleList = ({ people, fetchError = false }) => {
	return (
		<div className={style.outer}>
			{fetchError === false ? (
				<div className={style.list}>
					{people.map((person, i) => (
						<PersonCard person={person} key={i} />
					))}
				</div>
			) : (
				<div></div>
			)}
			<div className={style.cast}>Full Cast & Crew</div>
		</div>
	);
};

export default PeopleList;
