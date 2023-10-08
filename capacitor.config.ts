import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.camarm.ajc',
  appName: 'Avantages Jeunes',
  webDir: 'dist',
  plugins: {
    "SplashScreen": {
      "launchAutoHide": false,
      "androidScaleType": "CENTER_CROP",
      "splashFullScreen": true,
      "splashImmersive": false,
      "backgroundColor": "#081F32"
    }
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
