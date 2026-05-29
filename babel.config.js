module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          node: '24',
          esmodules: true
        }
      }
    ]
  ],
  sourceType: 'unambiguous'
}
