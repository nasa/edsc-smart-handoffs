module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          node: '22',
          esmodules: true
        }
      }
    ]
  ],
  sourceType: 'unambiguous'
}
