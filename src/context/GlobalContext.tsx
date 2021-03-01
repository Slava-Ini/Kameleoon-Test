import React, { Dispatch, createContext, useReducer } from 'react';

// ---TYPES---
export type Filter = 'desc' | 'asc' | 'none';

export type DataItem = {
	id: number;
	name: string;
	type: 'CLASSIC' | 'MVC' | 'SERVER_SIDE';
	status: 'ONLINE' | 'PAUSED' | 'DRAFT' | 'PAUSED';
	siteName: string;
};

export type Sort = 'setNameSort' | 'setTypeSort' | 'setSiteNameSort' | 'setStatusSort'

type ActionType = 
| { type: 'setSearchTerm', payload: string }
| { type: Sort, payload: Filter }
| { type: 'setData', payload: Array<DataItem> }
| { type: 'resetSorts'}
| { type: 'resetSearch'}

export interface IState {	
	[index: string]: string | Filter | Array<DataItem>;
	searchTerm: string;
	nameSort: Filter;
	typeSort: Filter;
	siteNameSort: Filter;
	statusSort: Filter;
	data: Array<DataItem>;
}

interface IGlobalContextProviderProps {
	children: JSX.Element;
}

const initialState: IState = {
	searchTerm: '',
	nameSort: 'none',
	typeSort: 'none',
	siteNameSort: 'none',
	statusSort: 'none',
	data: []
};

// ---GLOBAL STATE LOGIC---

// Separate state and dispatch context providers
const GlobalStateContext = createContext<IState | undefined>(undefined);
const GlobalDispatchContext = createContext<Dispatch<ActionType> | undefined>(undefined);

function reducer (state: IState, action: ActionType) :IState {
	switch (action.type) {
	case 'setSearchTerm':
		return {
			...state,
			searchTerm: action.payload
		};
	case 'setNameSort':
		return {
			...state,
			nameSort: action.payload
		};
	case 'setTypeSort':
		return {
			...state,
			typeSort: action.payload
		};	
	case 'setSiteNameSort':
		return {
			...state,
			siteNameSort: action.payload
		};	
	case 'setStatusSort':
		return {
			...state,
			statusSort: action.payload
		};	
	case 'setData':
		return {
			...state,
			data: action.payload
		};	
	case 'resetSorts':
		return {
			...state,
			nameSort: 'none',
			typeSort: 'none',
			siteNameSort: 'none',
			statusSort: 'none',
		};
	case 'resetSearch':
		return {
			...state,
			searchTerm: ''
		};
	default:
		throw new Error('No such type');
	}
}

function GlobalContextProvider({ children }: IGlobalContextProviderProps): JSX.Element {

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<GlobalDispatchContext.Provider value={dispatch}>
			<GlobalStateContext.Provider value={state}>
				{children}
			</GlobalStateContext.Provider>
		</GlobalDispatchContext.Provider>
	);
}

// Couple of utility functions for using global state like a hook
function useGlobalState(): IState {
	const context = React.useContext(GlobalStateContext);
	if (context === undefined) {
		throw new Error('useGlobalState must be used within a CountProvider');
	}
	return context;
}

function useGlobalDispatch(): Dispatch<ActionType> {
	const context = React.useContext(GlobalDispatchContext);
	if (context === undefined) {
		throw new Error('useGlobalDispatch must be used within a CountProvider');
	}
	return context;
}

export { useGlobalState, useGlobalDispatch };
export default GlobalContextProvider;

