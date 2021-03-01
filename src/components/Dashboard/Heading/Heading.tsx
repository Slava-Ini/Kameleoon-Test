import React, { MouseEvent } from 'react';
import styles from './heading.module.scss';
import cnBind from 'classnames/bind';
import { useGlobalState, useGlobalDispatch, Sort, Filter } from '../../../context/GlobalContext';
import ArrowUp from '../../../images/ArrowUp.svg';
import ArrowDown from '../../../images/ArrowDown.svg';

const cx = cnBind.bind(styles);


function Heading (): JSX.Element {

	const state = useGlobalState();
	const dispatch = useGlobalDispatch();

	// Switching none/desc/asc sorting by given order
	const switchSortingType = (sortType: string): string => {
		switch (state[sortType]) {
		case 'none': return 'desc';
		case 'desc': return 'asc';
		case 'asc': return 'none';
		}
		return 'none';
	};

	// Showing an arrow on sorting
	const renderSortingArrow = (sortType: string): JSX.Element | void => {
		let arrow = '';

		if (state[sortType] !== 'none') {
			arrow = state[sortType] === 'desc' ? ArrowDown : ArrowUp;
			return <img src={arrow} className={cx('heading-arrow')}/>;
		} 
	};
	
	// Sort click handler
	const handleSort = (e: MouseEvent<HTMLDivElement>) => {
		const sortType = `${e.currentTarget.id}Sort`;
		const actionType = `set${e.currentTarget.id[0].toUpperCase()}${e.currentTarget.id.slice(1)}Sort`;
		const payload = switchSortingType(sortType);

		// Reset active sorts (not a searchTerm)
		dispatch({
			type: 'resetSorts'
		});

		// Activate new sort
		dispatch({
			type: actionType as Sort,
			payload: payload as Filter
		});
	};

	return (
		<div className={cx('heading-wrapper')}>
			<div className={cx('heading')}>
				<div className={cx('name')} id='name' onClick={handleSort}>NAME
					{renderSortingArrow('nameSort')}
				</div>
				<div className={cx('type')} id='type' onClick={handleSort}>TYPE
					{renderSortingArrow('typeSort')}
				</div>
				<div className={cx('status')} id='status' onClick={handleSort}>STATUS
					{renderSortingArrow('statusSort')}
				</div>
				<div className={cx('site')} id='siteName' onClick={handleSort}>SITE
					{renderSortingArrow('siteNameSort')}
				</div>
			</div>
		</div>
	);
}

export default Heading;