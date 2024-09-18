import React from 'react';
import { View } from 'react-native';
import styles from '../../screens/auth/styles'
import AppleIcon from './AppleIcon';
import GoogleIcon from './GoogleIcon';

function SocialLogin() {
  return (
    <View style={styles.socialLoginContainer}>
        <View style={styles.iconContainer}>
          <AppleIcon />
        </View>
        <View style={styles.iconContainer}>
            <GoogleIcon />
        </View>
    </View>
  );
};

export default SocialLogin;
