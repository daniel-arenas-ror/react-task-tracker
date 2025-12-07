import React from 'react';
import { styles } from './Spinner.styles';

const Spinner: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading tasks...</p>
    </div>
  );
};

export default Spinner;
