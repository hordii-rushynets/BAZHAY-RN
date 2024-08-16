import React from 'react';
import { Image, View } from 'react-native';
import styles from '../../screens/auth/styles'

function SocialLogin() {
  return (
    <View style={styles.socialLoginContainer}>
        <View style={styles.iconContainer}>
            <Image src={"../../screens/auth/static/Apple.svg"}/>
        </View>
        <View style={styles.iconContainer}>
            <Image src={"../../screens/auth/static/Google.svg"}/>
        </View>
    </View>
  );
};

export default SocialLogin;
