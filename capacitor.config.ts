import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.camarm.dule',
  appName: 'Dule',
  webDir: 'dist',
  plugins: {
    "SplashScreen": {
      "launchAutoHide": false,
      "androidScaleType": "CENTER_CROP",
      "splashFullScreen": true,
      "splashImmersive": false,
      "backgroundColor": "#EBF8EF"
    },
    "LocalNotifications": {
      "smallIcon": "ic_stat_notify",
      "iconColor": "#EBF8EF",
      "sound": "/public/tone.ogg"
    }
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
