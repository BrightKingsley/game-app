import 'ts-node/register'; // Add this to import TypeScript files

import {ConfigContext, ExpoConfig} from 'expo/config';

import withAndroidQueries from './linking.plugin';

export default withAndroidQueries(
  ({config}: ConfigContext): ExpoConfig => ({
    ...config,
    slug: 'game-app',
    name: 'Transit',
  }),
);
