import type { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  footer: {
    marginTop: '30px', // Space above the footer
    paddingTop: '15px',
    borderTop: '1px solid #eee',
    textAlign: 'center',
    fontSize: '0.85em',
    color: '#757575',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    margin: '5px 0',
  },
  links: {
    margin: '10px 0',
  },
  link: {
    color: '#4CAF50', // Match primary app color
    textDecoration: 'none',
    margin: '0 10px',
    transition: 'color 0.2s',
  },
  separator: {
    color: '#ccc',
  }
};

export { styles };
