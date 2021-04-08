module.exports = {
  env: {
      es6: true,
      browser: true,
  },
  extends: ['airbnb-base/legacy', 'prettier'],
  plugins: ['prettier'],
  rules: {
      'prettier/prettier': ['error'],
  },
};