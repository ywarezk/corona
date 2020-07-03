module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
    [ "@babel/plugin-proposal-decorators", {"legacy": true }]
    [ "babel-plugin-module-alias", [
      { "src": "../corona-typeorm", "expose": "@nerdeez/corona-typeorm" },
    ]]
  ]
};
