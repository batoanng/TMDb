import axios from 'axios';

const buildClient = ({ req }) => {
	if (typeof window === 'undefined') {
		return axios.create({
			baseURL: process.env.SERVER_API,
			headers: req.headers,
		});
	} else {
		return axios.create({
			baseURL: process.env.SERVER_API,
		});
	}
};

export default buildClient;
