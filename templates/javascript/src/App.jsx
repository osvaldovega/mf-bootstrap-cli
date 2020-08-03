import React from 'react';
import styles from './app.scss';

const App = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Micro-Frontend Application</h1>
    <div className={styles.status}>
      <span>JavaScript</span>
    </div>
  </div>
);

export default App;
