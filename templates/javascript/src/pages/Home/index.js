import React from 'react';
import styles from 'styles/app.scss';

const Home = () => (
	<div className={styles.wrapper}>
		<h1 className={styles.title}>Micro-Frontend Application</h1>
		<div className={styles.status}>
			<span>JavaScript</span>
		</div>
	</div>
);

export default Home;
