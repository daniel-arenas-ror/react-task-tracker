import type { CSSProperties } from 'react';

type Styles = { [key: string]: CSSProperties };

export const styles: Styles = {
  listItem: {
    borderBottom: '1px solid #eee',
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexGrow: 1,
    paddingRight: '20px',
  },
  title: {
    marginBottom: '4px',
    fontSize: '1em',
  },
  description: {
    margin: '0',
    color: '#555',
    fontSize: '0.9em',
  },
  dueDate: {
    display: 'block',
    marginTop: '5px',
    color: '#999',
    fontSize: '0.8em',
  },
};
