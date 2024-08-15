import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';
import { Link } from '@react-navigation/native';
import ScreenContainer from '../ui/ScreenContainer';
import styles from '../../screens/welcome/styles'
import DesignedText from '../ui/DesignedText';

type LayoutProps = {
    children: ReactNode;
    index: number;
}

const Layout = ({ children, index }: LayoutProps) => {
  return (
    <ScreenContainer>
        <View>
            <ProgressBar index={index} />
            <Link to="Authentication" style={styles.link}><DesignedText size="small" isUppercase={false}>Пропустити</DesignedText></Link>
        </View>
        {children}
    </ScreenContainer>
  );
};

export default Layout;
