export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@local/graphql(.*)$': '<rootDir>/src/graphql$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};