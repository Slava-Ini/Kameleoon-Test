import { DataItem } from '../context/GlobalContext';

// Util function for merging two responses in one data array
const mergeResults = (tests: [], sites: []): Array<DataItem> => {
		
	const result = tests.map( ({id, name, type, status, siteId}) => {
		const siteIndex = sites.findIndex(({id}) => id === siteId);
		return ({
			id,
			name,
			type,
			status,
			siteName: sites[siteIndex]['url']
		});
	});
	return result;
};

export default mergeResults;