export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@local/graphql(.*)$': '<rootDir>/src$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
};