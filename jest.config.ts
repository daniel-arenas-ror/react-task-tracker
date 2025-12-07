/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
export default {
  // Use the ts-jest preset for common TypeScript project configuration
  preset: 'ts-jest',

  // Specify the environment for testing (simulates a browser DOM)
  testEnvironment: 'jsdom',

  // How to transform files: use ts-jest for TypeScript/TSX files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // Module mapping for non-code assets
  moduleNameMapper: {
    // Mock CSS/Style imports: returns an empty object/proxy
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    // Mock static asset imports (images): points to a mock file
    '\\.(png|jpg|jpeg|svg)$': '<rootDir>/mocks/fileMock.js',
  },

  // Files to run before every test suite is loaded
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // Files Jest should consider as tests
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  // File extensions Jest looks for when resolving modules
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
