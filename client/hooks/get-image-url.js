import { ASSET_API } from '../apis/constants';

const getImageUrl = (shortenUrl) => {
	return `${ASSET_API}${shortenUrl}`;
};

export default getImageUrl;
