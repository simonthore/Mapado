import "dotenv/config";

export default {
  expo: {
    name: "mobile-client",
    slug: "mobile-client",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    android: {
      package: "com.comicscrip.mobileclient",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    extra: {
      GRAPHQL_API_URL: process.env.GRAPHQL_API_URL || "http://localhost:4000",
    },
  },
};