module.exports = {
  packagerConfig: {},
  plugins: [
    [
      '@electron-forge/plugin-electronegativity',
      {
        isSarif: true,
      },
    ],
  ],
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'Tachiyomi',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
