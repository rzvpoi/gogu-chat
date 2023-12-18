module.exports = {
  packagerConfig: {
    asar: true,
    icon: '/Users/razvan.poienariu/Documents/scripts/gogu-chat/build/icons/icon'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: '/Users/razvan.poienariu/Documents/scripts/gogu-chat/build/icons/dmg-background.png',
        format: 'ULFO'
      }
    },
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Poienariu Razvan',
        exe: 'gogu-chat-installer.exe',
        name: 'gogu-chat',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux', 'windows'],
    },
    {
      name: '@electron-forge/maker-deb',
        config: {
          options: {
            bin: 'gogu-chat',
            maintainer: 'Poienariu Razvan',
            homepage: 'https://github.com/rzvpoi/gogu-chat',
          },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
