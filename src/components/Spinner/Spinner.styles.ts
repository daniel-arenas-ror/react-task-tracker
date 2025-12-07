import type { CSSProperties } from 'react';

type Styles = { [key: string]: CSSProperties };

export const styles: Styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0',
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #4CAF50',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
  },
  text: {
    marginTop: '10px',
    color: '#4CAF50',
  },
};
