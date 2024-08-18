import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from '../ui/ProgressBar';
import { Link } from '@react-navigation/native';
import ScreenContainer from '../ui/ScreenContainer';
import styles from '../../screens/welcome/styles'
import DesignedText from '../ui/DesignedText';

type LayoutProps = {
    children: ReactNode;
    index: number;
}

const AccountFillLayout = ({ children, index }: LayoutProps) => {
  return (
    <ScreenContainer>
        <View>
            <ProgressBar index={index} n={5}/>
            <DesignedText isUppercase={false} size={"small"}>Заповнення профілю {index + 1}/{5}</DesignedText>
        </View>
        {children}
    </ScreenContainer>
  );
};

export default AccountFillLayout;
