import React from 'react';
import styles from 'styles/app.scss';

const Home: React.FC = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Micro-Frontend Application</h1>
    <div className={styles.status}>
      <span>TypeScript</span>
    </div>
  </div>
);

export default Home;
