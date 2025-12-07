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
  statusTag: (color: string): CSSProperties => ({
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: color,
    color: 'white',
    fontSize: '0.8em',
    minWidth: '90px',
    textAlign: 'center',
  }),
  dueDate: {
    display: 'block',
    marginTop: '5px',
    color: '#999',
    fontSize: '0.8em',
  },
};
