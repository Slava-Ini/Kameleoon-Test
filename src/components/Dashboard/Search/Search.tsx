import React, { ChangeEvent } from 'react';
import styles from './search.module.scss';
import cnBind from 'classnames/bind';
import { useGlobalState, useGlobalDispatch } from '../../../context/GlobalContext';

const cx = cnBind.bind(styles);

function Search (): JSX.Element {
	
	const state = useGlobalState();
	const dispatch = useGlobalDispatch();
	
	// Search
	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: 'setSearchTerm',
			payload: e.target.value
		});
	};

	return (
		<div className={cx('search-wrapper')}>
			<input 
				onChange={handleInput}
				className={cx('search')} 
				type="text" 
				value={state.searchTerm}
				placeholder='What test are you looking for?'
			/>
			<div className={cx('search-test-number')}>{
				state.data.length === 1 ?
					`${state.data.length} task` :
					`${state.data.length} tasks`
			}</div>
		</div>
	);
}

export default Search;