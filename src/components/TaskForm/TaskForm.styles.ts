import type { CSSProperties } from 'react';

type Styles = { [key: string]: CSSProperties };

export const styles: Styles = {
  form: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    background: '#f0f8ff',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#A5D6A7',
    cursor: 'not-allowed',
  },
};
