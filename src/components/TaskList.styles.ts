import type { CSSProperties } from 'react';

// Use a type alias for cleaner code
type Styles = { [key: string]: CSSProperties };

export const styles: Styles = {
  // Outer container to center the entire app
  outerContainer: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 0',
  },
  // Inner container to hold the app content
  appContainer: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: 'white',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #eee',
    margin: '20px 0',
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
  },
  errorMessage: {
    color: '#D32F2F',
    backgroundColor: '#FFEBEE',
    padding: '10px',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
  noTasksMessage: {
    textAlign: 'center',
    color: '#757575',
    padding: '20px',
    border: '1px dashed #BDBDBD',
    borderRadius: '4px',
    margin: '20px 0',
  },
};
