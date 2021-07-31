import axios from 'axios';
import { SERVER_API } from './constants';

const buildClient = ({ req }) => {
	if (typeof window === 'undefined') {
		return axios.create({
			baseURL: SERVER_API,
			headers: req.headers,
		});
	} else {
		return axios.create({
			baseURL: SERVER_API,
		});
	}
};

export default buildClient;
