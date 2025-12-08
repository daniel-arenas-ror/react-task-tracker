import React from 'react';
import { styles } from './Footer.styles';

// Define your personal URLs here
const GITHUB_URL = "https://github.com/daniel-arenas-ror";
const LINKEDIN_URL = "https://www.linkedin.com/in/dev-darenas/?locale=en_US";

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        Built with ❤️ by Daniel Arenas
      </p>
      <div style={styles.links}>
        <a 
          href={GITHUB_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.link}
        >
          GitHub
        </a>
        <span style={styles.separator}>|</span>
        <a 
          href={LINKEDIN_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.link}
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
