import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';

const useRequest = (url, method, body, onSuccess) => {
	const [error, setError] = useState(null);

	const doRequest = async (props = {}) => {
		try {
			const res = await axios[method](url, { ...body, ...props });
			setError(null);
			onSuccess && onSuccess(res.data);
			return res.data;
		} catch (e) {
			const errors =
				e.response && e.response.data && e.response.data.errors;
			errors &&
				errors.length > 0 &&
				setError(
					<Alert variant="danger">
						<h4>Oops...</h4>
						<ul className="my-0">
							{errors.map((error) => (
								<li key={error.message}>{error.message}</li>
							))}
						</ul>
					</Alert>,
				);
		}
	};

	return { doRequest, error };
};

export default useRequest;
