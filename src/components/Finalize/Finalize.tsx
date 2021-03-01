import React, { useEffect, useState } from 'react';
import styles from './finalize.module.scss';
import cnBind from 'classnames/bind';
import { RouteComponentProps, withRouter } from 'react-router';
import axios from 'axios';
import ReturnButton from '../UI/ReturnButton/ReturnButton';

const cx = cnBind.bind(styles);

interface Test {
	id: number;
	name: string;
	type: string;
	status: string;
	siteId: string;
}

function Finalize (props: RouteComponentProps<{ testId: string }>): JSX.Element {

	const [test, setTest] = useState<Test | undefined>();

	useEffect(() => {
		const url = 'http://localhost:3100/tests/';
		
		axios.get(`${url}${props.match.params.testId}`)
			.then((result) => setTest(result.data));
	}, []);

	return (
		<div className={cx('finalize-wrapper')}>
			<div className={cx('finalize-heading')}>Finalize</div>
			<div className={cx('finalize-name')}>{test && test.name}</div>
			<ReturnButton/>
		</div>
	);
}

export default withRouter(Finalize);