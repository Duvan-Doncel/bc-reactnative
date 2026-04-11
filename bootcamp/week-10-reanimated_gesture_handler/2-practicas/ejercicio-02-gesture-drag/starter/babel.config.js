module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // IMPORTANTE: 'react-native-reanimated/plugin' debe ser siempre el ÚLTIMO plugin.
      // Sin este plugin, useSharedValue y useAnimatedStyle no funcionarán.
      'react-native-reanimated/plugin',
    ],
  };
};
