import React from 'react';
import { View } from 'react-native';
import styles from '../../screens/auth/styles'
import AppleIcon from './AppleIcon';
import GoogleIcon from './GoogleIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { AccountService } from '../../screens/auth/services';
import { useAuth } from '../../contexts/AuthContext';
import config from '../../config.json';

let RNGoogleSignIn: typeof import('@react-native-google-signin/google-signin') | null = null;

if (Constants.executionEnvironment !== 'storeClient') { // Not in Expo Go
  try {
    RNGoogleSignIn = require('@react-native-google-signin/google-signin'); // Load the native module
  } catch (error) {
    console.error("Failed to load native library:", error);
  }
}

if (RNGoogleSignIn) {
  RNGoogleSignIn.GoogleSignin.configure({
    webClientId: config.webClientId, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    iosClientId: config.iosClientId, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });
}

function SocialLogin() {
  const accountService = new AccountService();
  const { login, completeFillingAccount } = useAuth();

  const getTokens = async () => {
    if (RNGoogleSignIn) {
      try {
        await RNGoogleSignIn.GoogleSignin.hasPlayServices();
        const response = await RNGoogleSignIn.GoogleSignin.signIn();
        if (response) {
          const tokens = await RNGoogleSignIn.GoogleSignin.getTokens();
          accountService.googleSignIn(tokens.idToken).then(async (authtokens) => {
            await login(authtokens.access, authtokens.refresh);
            completeFillingAccount();
          });
        }
      }
      catch (error: any) {
        if (RNGoogleSignIn.isErrorWithCode(error)) {
          switch (error.code) {
            case RNGoogleSignIn.statusCodes.IN_PROGRESS:
              console.log("Sign in already in progress");
              break;
            case RNGoogleSignIn.statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              console.log("Play services not available or outdated");
              break;
            default:
              console.log("Error with google authentification: ", error);
          } 
        } else {
          console.log("An error that's not related to google sign in occurred", error);
        }
      }
    }
  }

  return (
    <View style={styles.socialLoginContainer}>
        <View style={styles.iconContainer}>
          <AppleIcon />
        </View>
        <TouchableOpacity onPress={getTokens}>
          <View style={styles.iconContainer}>
              <GoogleIcon />
          </View>
        </TouchableOpacity>
    </View>
  );
};

export default SocialLogin;
