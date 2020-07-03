/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 * 
 * Some updates i did
 * apperatnly metro does not react good to symlinks
 * we need to point the symlink to the true directory
 * 
 * also im not sure if babel is looking at the paths config?
 *
 * @format
 */

const path = require('path');

const extraNodeModules = new Proxy(
  {
    '@nerdeez/corona-typeorm': path.resolve(__dirname, '../corona-typeorm'),
    'typeorm': path.resolve(__dirname, 'node_modules/typeorm/browser')
  },
  {
    get: (target, name) => {
      if (target.hasOwnProperty(name)) {
        return target[name];
      }
      return path.join(process.cwd(), `node_modules/${name}`);
    },
  },
);

const watchFolders = [
  path.resolve(__dirname, '../corona-typeorm'),
  path.resolve(__dirname, '../../node_modules'),
];

module.exports = {
  projectRoot: path.resolve(__dirname),
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  // resolver: {
  //   extraNodeModules,
  //   sourceExts: ['js', 'jsx', 'ts', 'tsx'],
  // },
  // watchFolders,
};