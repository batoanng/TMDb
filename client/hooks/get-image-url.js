import { ASSET_API } from '../apis/constants';

const getImageUrl = (shortenUrl, size = 'md') => {
	if (size === 'lg') {
		return `${ASSET_API}/w1280${shortenUrl}`;
	}
	return `${ASSET_API}/w500${shortenUrl}`;
};

export default getImageUrl;
