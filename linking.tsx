import { Linking, Platform } from "react-native";
interface LinkingConfig {
    prefixes: string[];
    getInitialURL: () => Promise<string | null>;
    subscribe: (listener: (url: string) => void) => () => void;
    isAppInstalled: () => Promise<boolean>;
    openPlayStore: () => void;
    config: {
        screens: {
          BottomNavigation: {
            screens:{
              Home: {
                screens: {
                  SingleProduct: string
                },
              },
              Activities:string
              Counseling: string
              Helpline: string
            }
          }
        },
      }
}
export const linking: LinkingConfig = {
    prefixes: ['graphbar'],


    async getInitialURL(): Promise<string | null> {
        const url = await Linking.getInitialURL();
        return url;
    },

    subscribe(listener: (arg0: string) => void) {
        const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
            listener(url);
        });

        return () => {

            linkingSubscription.remove();
        };
    },
    isAppInstalled: async () => {
        const packageName = 'com.graphbar';
        try {
            const scheme: string = Platform.OS === 'ios' ? `graphbar://` : `package:${packageName}`
            const isInstalled = await Linking.canOpenURL(scheme);
            return isInstalled;
        } catch (error) {
            return false;
        }
    },

    openPlayStore: () => {
        const packageName = 'com.graphbar';
        const playStoreUrl = `market://details?id=${packageName}`;
        const appStoreUrl = 'https://apps.apple.com/app/your-app-id';

        const url: string = Platform.OS === 'android' ? playStoreUrl : appStoreUrl;
        Linking.openURL(url);
    },
    config: {
        screens: {
          BottomNavigation: {
            screens:{
              Home: {
                screens: {
                  SingleProduct: 'product/:id',
                },
              },
              Activities: 'activities',
              Counseling: 'counseling',
              Helpline: 'helpline',
            }
          }
        },
      }
};