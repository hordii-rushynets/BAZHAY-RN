import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressBar from '../ui/ProgressBar';
import { Link } from '@react-navigation/native';
import ScreenContainer from '../ui/ScreenContainer';
import styles from '../../screens/welcome/styles'
import DesignedText from '../ui/DesignedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/AuthContext';

type LayoutProps = {
    children: ReactNode;
    index: number;
    displaySkip?: boolean;
}

const Layout = ({ children, index, displaySkip = true }: LayoutProps) => {
  const { completeWelcome } = useAuth();
  return (
    <ScreenContainer>
        <View>
            <ProgressBar index={index} n={3}/>
            {displaySkip && <TouchableOpacity onPress={() => {completeWelcome()}} style={styles.link}><DesignedText size="small" isUppercase={false}>Пропустити</DesignedText></TouchableOpacity>}
        </View>
        {children}
    </ScreenContainer>
  );
};

export default Layout;
