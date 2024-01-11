module.exports = {
    testenvironment: "jest-environment-jsdom",
    setupFiles: ['./jest.setup.cjs'],
    moduleNameMapper: {
        '^.+\\.svg$"': "jest-svg-transformer",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
}