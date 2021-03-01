import { IState, DataItem } from '../context/GlobalContext';
import getShortSite from '../utils/getShortSite';

// --- TYPES ---
type Key = keyof Omit<DataItem, 'id'>;
type Order = {
	'ONLINE': 1,
	'PAUSED': 2,
	'STOPPED': 3,
	'DRAFT': 4
}

// --- SORTING ---
// Sorting name/type/siteName
const getSortedData = (state: IState): IState => {

	let key: Key;
	let filter: string;

	if (state.nameSort !== 'none') key = 'name', filter = 'nameSort';
	else if (state.typeSort !== 'none') key = 'type', filter = 'typeSort';
	else if (state.siteNameSort !== 'none') key = 'siteName', filter = 'siteNameSort';
	else return state;

	
	// In case site name is filtered all the values are given to getShortSite 
	// function as an argument
	switch (state[filter]) {	
	case 'asc': 
		return {
			...state,
			data: state.data.sort((a, b) => (getShortSite(a[key]) < getShortSite(b[key])) ? 1 : -1)
		};
	case 'desc': 
		return {
			...state,
			data: state.data.sort((a, b) => (getShortSite(a[key]) > getShortSite(b[key])) ? 1 : -1)
		};
	default: return state;
	}
};

// Sorting status
const getSortedStatus = (state: IState): IState => {

	const order: Order = {
		'ONLINE': 1,
		'PAUSED': 2,
		'STOPPED': 3,
		'DRAFT': 4
	};

	if (state.statusSort !== 'none') {
		switch (state.statusSort) {	
		case 'asc': 
			return {
				...state,
				data: state.data.sort((a, b) => (order[a.status] < order[b.status]) ? 1 : -1)
			};
		case 'desc': 
			return {
				...state,
				data: state.data.sort((a, b) => (order[a.status] > order[b.status]) ? 1 : -1)
			};
		}
	}

	return state;
};

// Filtering data by searchTerm
const getFilteredData = (state: IState): IState => {

	if (state.searchTerm !== '') {
		return {
			...state,
			data : state.data.filter(item => (
				item.name.toLowerCase().includes(state.searchTerm.toLowerCase())
			))
		};
	}

	return state;
}; 

// Combining filtered and sorted data
function selectData(state: IState): IState {

	const sortedData = getSortedData(state);
	const sortedStatus = getSortedStatus(sortedData);
	const filteredData = getFilteredData(sortedStatus);

	return filteredData;
}

export default selectData;
