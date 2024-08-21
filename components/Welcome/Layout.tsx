import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from '../ui/ProgressBar';
import { Link } from '@react-navigation/native';
import ScreenContainer from '../ui/ScreenContainer';
import styles from '../../screens/welcome/styles'
import DesignedText from '../ui/DesignedText';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LayoutProps = {
    children: ReactNode;
    index: number;
    displaySkip?: boolean;
}

const Layout = ({ children, index, displaySkip = true }: LayoutProps) => {
  return (
    <ScreenContainer>
        <View>
            <ProgressBar index={index} n={3}/>
            {displaySkip && <Link to="/Authentication" onPress={async () => {await AsyncStorage.setItem("standartScreen", "Authentication");}} style={styles.link}><DesignedText size="small" isUppercase={false}>Пропустити</DesignedText></Link>}
        </View>
        {children}
    </ScreenContainer>
  );
};

export default Layout;
