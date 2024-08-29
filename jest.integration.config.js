module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js'],
    verbose: true,
    collectCoverage: false,
};
