import 'ts-node/register';
import type { ExpoConfig, ConfigContext } from 'expo/config';

/**
 * Allows us to modify the Expo config before it's exported.
 * @see https://docs.expo.dev/workflow/configuration/
 */
export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    plugins: [
      [
        'expo-build-properties',
        {
          android: {
            googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
          },
        },
      ],
    ],
  } as ExpoConfig;
};
