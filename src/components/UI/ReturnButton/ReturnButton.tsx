import React from 'react';
import ArrowLeft from '../../../images/ArrowLeft.svg';
import styles from './returnButton.module.scss';
import cnBind from 'classnames/bind';
import { useHistory } from 'react-router-dom';

const cx = cnBind.bind(styles);

function ReturnButton (): JSX.Element {

	const history = useHistory();

	const clickHandler = () => {
		history.push('/dashboard');
	};

	return (
		<button className={cx('return-wrapper')} onClick={clickHandler}>
			<img src={ArrowLeft} className={cx('return-image')}/>
			<div className={cx('return-link')}>Back</div>
		</button>
	);
}

export default ReturnButton;