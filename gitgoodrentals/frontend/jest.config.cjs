module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
            
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': '<rootDir>/styleMock.js',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/fileMock.js',
      '^./assets/(.*)$': '<rootDir>/fileMock.js',
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  };