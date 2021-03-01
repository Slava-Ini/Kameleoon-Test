import React, { useEffect } from 'react';
import Search from './Search/Search';
import Heading from './Heading/Heading';
import styles from './dashboard.module.scss';
import cnBind from 'classnames/bind';
import axios from 'axios';
import { useGlobalState, useGlobalDispatch } from '../../context/GlobalContext';
import mergeResults from '../../utils/mergeFetchedResults';
import selectData from '../../utils/selectData';
import Test from './Test/Test';
import BarButton from '../UI/BarButton/BarButton';

const cx = cnBind.bind(styles);

function Dashboard (): JSX.Element {

	// selectData filters and sorts the state (like Redux Selectors do)
	const state = selectData(useGlobalState());
	const dispatch = useGlobalDispatch();
	
	// Fetching the data and dispatching it to the GlobalContext state
	useEffect(() => {
		const url = 'http://localhost:3100';

		axios.all([
			axios.get(`${url}/tests`),
			axios.get(`${url}/sites`)
		])
			.then(axios.spread((testsRes, sitesRes) => {
				dispatch({
					type: 'setData',
					payload: mergeResults(testsRes.data, sitesRes.data)
				});
			}))
			.catch((err) => {
				throw new Error(err.message);
			});

	}, []);

	const resetSearchHandler = () => {
		dispatch({
			type: 'resetSearch'
		});
	};

	// Tests render
	const renderFetchedData = () => {
		return (
			state.data.map(({id, name, type, status, siteName}) => (
				<Test 
					key={id}
					id={id}
					name={name}
					type={type}
					status={status}
					siteName={siteName}
				/>
			))
		);
	};

	// Loader or No search match render
	const renderEmptyData = () => {
		if (state.searchTerm.length === 0) {
			return <div className={cx('loader')}>Loading...</div>;

		} else if (state.searchTerm.length > 0) {
			return (
				<div className={cx('nomatch-wrapper')}>
					<div className={cx('nomatch-message')}>Your search did not match any results.</div>
					<BarButton label={'Reset'} color={'green'} clickHandler={resetSearchHandler}/>
				</div>
			);
		} 
	};
	
	return (
		<div className={cx('dashboard-wrapper')}>
			<div className={cx('dashboard')}>Dashboard</div>
			<Search />
			<Heading />
			{ state.data.length > 0 ? renderFetchedData() : renderEmptyData() }
		</div>
	);
}



export default Dashboard;

