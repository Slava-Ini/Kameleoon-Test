import React from 'react';
import styles from './barButton.module.scss';
import cnBind from 'classnames/bind';

const cx = cnBind.bind(styles);
type Props = {
	label: string,
	color: 'green' | 'gray',
	clickHandler?: () => void
}

function BarButton ({label, color, clickHandler}: Props): JSX.Element {
	return (
		<button 
			className={cx('button', `button-${color}`)}
			onClick={clickHandler}
		>
			<p>{label}</p>
		</button> 
	);
}

export default BarButton;