import React from 'react';
import styles from './test.module.scss';
import cnBind from 'classnames/bind';
import { DataItem } from '../../../context/GlobalContext';
import Button from '../../UI/BarButton/BarButton';
import getShortSite from '../../../utils/getShortSite';
import { useHistory } from 'react-router-dom';

const cx = cnBind.bind(styles);

function Test({id ,name, type, status, siteName}:DataItem): JSX.Element {

	const history = useHistory();

	const getLowerCase = (str: string): string => {
		if (str === 'SERVER_SIDE') {
			return getLowerCase(str.replace(/_/ig, '-'));
		} else if (str !== 'MVT') {
			return `${str[0]}${str.slice(1).toLowerCase()}`;
		} 
		return str;
	};

	// Function defining the class for colorful 'border-left' of the block
	const getSiteClassName = (site: string): string => {
		if (getShortSite(site).includes('market', 0)) return 'market-site';
		if (getShortSite(site).includes('games', 0)) return 'games-site';
		if (getShortSite(site).includes('delivery', 0)) return 'delivery-site';
		else throw new Error('No such site name');
	}; 	

	const clickHandler = () => {
		const routeBase = isDraft ? '/finalize/' : '/results/';
		history.push(routeBase + id);
	};	

	const isDraft = status === 'DRAFT';

	return (
		<div className={cx('test-wrapper', getSiteClassName(siteName))}>
			<div className={cx('test-name')}>{name}</div>
			<div className={cx('test-type')}>{getLowerCase(type)}</div>
			<div className={cx('test-status', `${status.toLowerCase()}`)}>{getLowerCase(status)}</div>
			<div className={cx('test-site')}>{getShortSite(siteName)}</div>
			<div className={cx('test-button-wrapper')}>
				<Button 
					clickHandler={clickHandler}
					label={isDraft ? 'Finalize' : 'Results'} 
					color={isDraft ? 'gray' : 'green'}
				/>
			</div>
		</div>
	);
}

export default Test;